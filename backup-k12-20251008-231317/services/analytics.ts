import type { ClassData } from '../types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { fetchClassAnalyticsDemo } from '../data/demo-analytics';

/**
 * Read the classes document for a teacher (document path: classes/{teacherUid})
 * Returns a map of classId -> ClassData or null if not found.
 */
export async function getClassAnalyticsFromTeacher(teacherUid: string): Promise<Record<string, ClassData> | null> {
  if (!db) return null;
  try {
    const ref = doc(db, 'classes', teacherUid);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    // Expect the document to be a map of classes keyed by id
    return snap.data() as Record<string, ClassData>;
  } catch (e) {
    console.error('Failed to fetch class analytics from Firestore', e);
    return null;
  }
}

/**
 * Convenience helper to return a single ClassData by teacherUid + classId
 */
export async function getClassFromTeacher(teacherUid: string, classId: string): Promise<ClassData | null> {
  const classes = await getClassAnalyticsFromTeacher(teacherUid);
  if (!classes) return null;
  return (classes as Record<string, ClassData>)[classId] ?? null;
}

export async function getClassAnalytics(classId: string): Promise<ClassData | null> {
  // Simple facade used by older callers: currently returns demo data only.
  return Promise.resolve(fetchClassAnalyticsDemo(classId));
}

export default {
  getClassAnalyticsFromTeacher,
  getClassFromTeacher,
  getClassAnalytics
};