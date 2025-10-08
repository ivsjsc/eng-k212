import { useEffect, useState } from 'react';
import type { ClassData } from '../../types';
import { auth } from '../../services/firebase';
import { getClassFromTeacher } from '../../services/analytics';
import { fetchClassAnalyticsDemo } from '../../data/demo-analytics';

export function useClassAnalytics(classId?: string, refreshToken = 0) {
  const [data, setData] = useState<ClassData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!classId) return;
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        // Try to fetch using current authenticated teacher UID
        const teacherUid = auth?.currentUser?.uid ?? null;
        if (teacherUid) {
          const c = await getClassFromTeacher(teacherUid, classId);
          if (!cancelled) setData(c);
          setLoading(false);
          return;
        }

        // Fall back to demo data in dev / unauthenticated scenarios
        const d = fetchClassAnalyticsDemo(classId);
        if (!cancelled) setData(d || null);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load analytics');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [classId, refreshToken]);

  return { data, loading, error } as const;
}