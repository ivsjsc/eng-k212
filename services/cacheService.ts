/**
 * Cache service for Firebase data
 * Provides cached access to frequently accessed data
 */

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { cache, CACHE_KEYS } from '../utils/cache';
import type { User, Classes } from '../types';
import { logger } from '../utils/logger';

const CACHE_TTL = {
  USER_DATA: 10 * 60 * 1000, // 10 minutes
  CLASS_DATA: 5 * 60 * 1000, // 5 minutes
  CURRICULUM: 30 * 60 * 1000, // 30 minutes
};

/**
 * Get user data with caching
 */
export async function getCachedUser(userId: string): Promise<User | null> {
  if (!db) {
    logger.error('Firebase not initialized');
    return null;
  }

  try {
    return await cache.getOrSet(
      CACHE_KEYS.USER_PROFILE(userId),
      async () => {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          return { id: userDoc.id, ...userDoc.data() } as User;
        }
        return null;
      },
      CACHE_TTL.USER_DATA
    );
  } catch (error) {
    logger.error('Error getting cached user:', error);
    return null;
  }
}

/**
 * Get class data with caching
 */
export async function getCachedClasses(userId: string): Promise<Classes | null> {
  if (!db) {
    logger.error('Firebase not initialized');
    return null;
  }

  try {
    return await cache.getOrSet(
      CACHE_KEYS.CLASS_DATA(userId),
      async () => {
        const classesDocRef = doc(db, "classes", userId);
        const classesDoc = await getDoc(classesDocRef);
        
        if (classesDoc.exists()) {
          return classesDoc.data() as Classes;
        }
        return null;
      },
      CACHE_TTL.CLASS_DATA
    );
  } catch (error) {
    logger.error('Error getting cached classes:', error);
    return null;
  }
}

/**
 * Invalidate user cache
 */
export function invalidateUserCache(userId: string): void {
  cache.delete(CACHE_KEYS.USER_PROFILE(userId));
}

/**
 * Invalidate class cache
 */
export function invalidateClassCache(userId: string): void {
  cache.delete(CACHE_KEYS.CLASS_DATA(userId));
}

/**
 * Invalidate all caches for a user
 */
export function invalidateUserCaches(userId: string): void {
  invalidateUserCache(userId);
  invalidateClassCache(userId);
  
  // Clear any course progress caches
  const keys = Array.from(cache['cache'].keys());
  keys.forEach(key => {
    if (key.includes(`progress:${userId}:`)) {
      cache.delete(key);
    }
  });
}

/**
 * Preload user data for better performance
 */
export async function preloadUserData(userId: string): Promise<void> {
  try {
    await Promise.all([
      getCachedUser(userId),
      getCachedClasses(userId)
    ]);
  } catch (error) {
    logger.error('Error preloading user data:', error);
  }
}

/**
 * Cache AI responses to avoid redundant API calls
 */
export async function getCachedAIResponse<T>(
  prompt: string,
  factory: () => Promise<T>,
  ttl: number = 60 * 60 * 1000 // 1 hour default
): Promise<T> {
  const key = CACHE_KEYS.AI_RESPONSE(prompt);
  return cache.getOrSet(key, factory, ttl);
}

/**
 * Get cache statistics for debugging
 */
export function getCacheStats() {
  return cache.getStats();
}

/**
 * Clear all caches (useful for logout)
 */
export function clearAllCaches(): void {
  cache.clear();
}
