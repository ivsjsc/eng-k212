import type { User, Classes } from './types';

export const MOCK_USER: User = {
  id: 'user-01',
  name: 'Alex',
  avatar: 'fa-user-astronaut',
  level: 'N/A',
  points: 0,
  badges: [],
  role: 'student',
  age: '',
  gradeLevel: '',
  gender: '',
  streak: 0,
  pinnedCourses: [],
  title: '',
  subject: '',
};

export const MOCK_CLASSES: Classes = {
  'grade-5': {
    name: 'Grade 5',
    students: [
      { id: 's1', name: 'An Nguyen', avatar: 'https://i.pravatar.cc/150?u=an', lastActivity: '2 hours ago', progress: 75, averageScore: 8.5, timeSpent: '5h 30m', isStruggling: false, scoreHistory: [], assignments: [], grades: [] },
      { id: 's2', name: 'Binh Pham', avatar: 'https://i.pravatar.cc/150?u=binh', lastActivity: '1 day ago', progress: 40, averageScore: 6.2, timeSpent: '2h 15m', isStruggling: true, scoreHistory: [], assignments: [], grades: [] },
      { id: 's3', name: 'Chi Tran', avatar: 'https://i.pravatar.cc/150?u=chi', lastActivity: '5 minutes ago', progress: 92, averageScore: 9.1, timeSpent: '8h 05m', isStruggling: false, scoreHistory: [], assignments: [], grades: [] },
    ],
    schedule: [
      { id: 'sch1', day: 'Tuesday', period: 2, startTime: '08:25', endTime: '09:10' },
      { id: 'sch2', day: 'Thursday', period: 4, startTime: '10:20', endTime: '11:05' },
    ]
  },
  'grade-6': {
    name: 'Grade 6',
    students: [
      { id: 's4', name: 'Dung Le', avatar: 'https://i.pravatar.cc/150?u=dung', lastActivity: 'Yesterday', progress: 25, averageScore: 5.5, timeSpent: '1h 45m', isStruggling: true, scoreHistory: [], assignments: [], grades: [] },
      { id: 's5', name: 'Giang Hoang', avatar: 'https://i.pravatar.cc/150?u=giang', lastActivity: '3 days ago', progress: 88, averageScore: 8.9, timeSpent: '7h 15m', isStruggling: false, scoreHistory: [], assignments: [], grades: [] },
    ],
    schedule: [
      { id: 'sch3', day: 'Monday', period: 1, startTime: '07:30', endTime: '08:15' },
      { id: 'sch4', day: 'Wednesday', period: 2, startTime: '08:25', endTime: '09:10' },
    ]
  }
};