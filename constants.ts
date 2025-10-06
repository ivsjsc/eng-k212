import type { User, Classes, RewardTierConfig, TokenExchangeRate } from './types';

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
  // S-Score defaults
  sscore: 0,
  aiTokens: 100, // Starting tokens
  achievements: [],
  completedLessons: [],
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: undefined,
  tier: 'Bronze',
  totalTestsPassed: 0,
  perfectScores: 0,
};

// ===== S-Score System Constants =====

export const SSCORE_POINT_VALUES: Record<string, number> = {
  lesson_complete: 10,
  test_passed: 20,
  quiz_perfect: 30,
  daily_streak_bonus: 5,
  first_try_bonus: 15,
  help_peer: 5,
  weekly_challenge: 50,
};

export const REWARD_TIERS: RewardTierConfig[] = [
  {
    tier: 'Bronze',
    minPoints: 0,
    maxPoints: 500,
    color: '#CD7F32',
    icon: 'fa-medal',
    benefits: ['Basic AI features', 'Weekly progress reports', '100 AI tokens/month'],
  },
  {
    tier: 'Silver',
    minPoints: 501,
    maxPoints: 1500,
    color: '#C0C0C0',
    icon: 'fa-trophy',
    benefits: ['Enhanced AI features', 'Daily insights', '250 AI tokens/month', 'Custom themes'],
  },
  {
    tier: 'Gold',
    minPoints: 1501,
    maxPoints: 3000,
    color: '#FFD700',
    icon: 'fa-crown',
    benefits: ['Premium AI access', 'Priority support', '500 AI tokens/month', 'Exclusive badges', 'Ad-free experience'],
  },
  {
    tier: 'Platinum',
    minPoints: 3001,
    maxPoints: null,
    color: '#E5E4E2',
    icon: 'fa-star',
    benefits: ['Unlimited AI access', '24/7 support', '1000 AI tokens/month', 'All badges unlocked', 'VIP features', 'Custom learning paths'],
  },
];

export const TOKEN_EXCHANGE_RATES: TokenExchangeRate[] = [
  {
    feature: 'ai_writing_grader',
    cost: 50,
    displayName: 'AI Writing Grader',
    description: 'Get detailed feedback on your essays',
  },
  {
    feature: 'ai_speaking_partner',
    cost: 100,
    displayName: 'AI Speaking Partner',
    description: '15-minute conversation practice session',
  },
  {
    feature: 'ai_personalized_lesson',
    cost: 200,
    displayName: 'Personalized Lesson',
    description: 'Custom lesson tailored to your needs',
  },
  {
    feature: 'ai_instant_feedback',
    cost: 30,
    displayName: 'Instant Feedback',
    description: 'Quick AI feedback on exercises',
  },
];

export const MOCK_CLASSES: Classes = {
  'grade-5': {
    name: 'Grade 5',
    teacherId: 'teacher-01',
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
    teacherId: 'teacher-01',
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