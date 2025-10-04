import { useEffect, useState } from 'react';
import type { ClassData } from '../../types';
import { fetchClassAnalyticsDemo } from '../../data/demo-analytics';

export function useClassAnalytics(classId?: string) {
  const [data, setData] = useState<ClassData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!classId) return;
    setLoading(true);
    setError(null);
    // For now use demo data; later replace with Firestore fetch
    try {
      const d = fetchClassAnalyticsDemo(classId);
      setData(d || null);
    } catch (e: any) {
      setError(e?.message || 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  }, [classId]);

  return { data, loading, error } as const;
}