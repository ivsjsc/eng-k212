import type { ClassData } from '../types';

const DEMO: Record<string, ClassData> = {
  'class-1': {
    name: 'Lớp 6A1',
    teacherId: 'teacher-demo-001',
    students: [
      { id: 's1', name: 'Nguyễn Văn A', avatar: 'fa-user', averageScore: 8.2, progress: 80, isStruggling: false, lastActivity: '2025-09-01', scoreHistory: [], assignments: [], grades: [], timeSpent: '3h' },
      { id: 's2', name: 'Trần Thị B', avatar: 'fa-user', averageScore: 6.5, progress: 60, isStruggling: true, lastActivity: '2025-09-02', scoreHistory: [], assignments: [], grades: [], timeSpent: '2h' }
    ]
  },
  'class-2': {
    name: 'Lớp 7B2',
    teacherId: 'teacher-demo-002',
    students: [
      { id: 's3', name: 'Phạm C', avatar: 'fa-user', averageScore: 7.4, progress: 70, isStruggling: false, lastActivity: '2025-09-01', scoreHistory: [], assignments: [], grades: [], timeSpent: '2.5h' }
    ]
  }
};

export function fetchClassAnalyticsDemo(classId: string): ClassData | null {
  return DEMO[classId] || null;
}

export const demoClassOptions = Object.entries(DEMO).map(([id, classData]) => ({
  id,
  name: classData.name,
  classData
}));