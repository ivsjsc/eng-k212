// Small analytics service wrapper – currently demo-only
import type { ClassData } from '../types';
import { fetchClassAnalyticsDemo } from '../data/demo-analytics';

export async function getClassAnalytics(classId: string): Promise<ClassData | null> {
  // Placeholder: swap with Firestore call when backend is ready
  return Promise.resolve(fetchClassAnalyticsDemo(classId));
}