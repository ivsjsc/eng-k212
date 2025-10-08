/**
 * Caching utility for improving application performance
 * Provides in-memory caching with TTL support
 */

import React from 'react';

interface CacheItem<T> {
  value: T;
  expiry: number;
  createdAt: number;
}

class CacheManager {
  private cache = new Map<string, CacheItem<any>>();
  private maxSize: number;
  private defaultTTL: number;

  constructor(maxSize = 100, defaultTTL = 5 * 60 * 1000) { // 5 minutes default
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL;
    
    // Clean up expired items every minute
    setInterval(() => this.cleanup(), 60 * 1000);
  }

  /**
   * Set a value in the cache
   */
  set<T>(key: string, value: T, ttl?: number): void {
    // Remove oldest items if cache is full
    if (this.cache.size >= this.maxSize) {
      this.evictOldest();
    }

    const now = Date.now();
    const expiry = now + (ttl || this.defaultTTL);

    this.cache.set(key, {
      value,
      expiry,
      createdAt: now
    });
  }

  /**
   * Get a value from the cache
   */
  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    // Check if expired
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  /**
   * Get or set a value using a factory function
   */
  async getOrSet<T>(key: string, factory: () => Promise<T>, ttl?: number): Promise<T> {
    const cached = this.get<T>(key);
    
    if (cached !== null) {
      return cached;
    }

    const value = await factory();
    this.set(key, value, ttl);
    return value;
  }

  /**
   * Remove a specific key from cache
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all cached items
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const now = Date.now();
    let expired = 0;
    
    for (const [_, item] of this.cache) {
      if (now > item.expiry) {
        expired++;
      }
    }

    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      expired,
      hitRate: this.getHitRate()
    };
  }

  private hitRate = {
    hits: 0,
    misses: 0
  };

  private getHitRate(): number {
    const total = this.hitRate.hits + this.hitRate.misses;
    return total === 0 ? 0 : this.hitRate.hits / total;
  }

  private evictOldest(): void {
    let oldestKey = '';
    let oldestTime = Date.now();

    for (const [key, item] of this.cache) {
      if (item.createdAt < oldestTime) {
        oldestTime = item.createdAt;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, item] of this.cache) {
      if (now > item.expiry) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => this.cache.delete(key));
  }
}

// Create a global cache instance
export const cache = new CacheManager();

/**
 * Cache decorator for functions
 */
export function cached(ttl?: number) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const key = `${propertyName}:${JSON.stringify(args)}`;
      
      return cache.getOrSet(key, () => method.apply(this, args), ttl);
    };

    return descriptor;
  };
}

/**
 * React hook for caching API calls
 */
export function useCache<T>(
  key: string,
  factory: () => Promise<T>,
  dependencies: any[] = [],
  ttl?: number
): { data: T | null; loading: boolean; error: Error | null } {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await cache.getOrSet(key, factory, ttl);
        
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [key, ...dependencies]);

  return { data, loading, error };
}

/**
 * Cache keys for different data types
 */
export const CACHE_KEYS = {
  USER_PROFILE: (userId: string) => `user:${userId}`,
  CLASS_DATA: (userId: string) => `classes:${userId}`,
  CURRICULUM: 'curriculum:all',
  COURSE_PROGRESS: (userId: string, courseId: string) => `progress:${userId}:${courseId}`,
  AI_RESPONSE: (prompt: string) => `ai:${btoa(prompt)}`,
} as const;
