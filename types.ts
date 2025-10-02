// types.ts

export type View = 'home' | 'curriculum' | 'teacher-dashboard' | 'writing-grader' | 'speaking-partner' | 'settings' | 'user-guide' | 'admin';

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar: string; // font-awesome class
  level: string;
  points: number;
  badges: string[];
  role: 'student' | 'teacher';
  age?: string | number;
  gradeLevel?: string;
  gender?: string;
  streak: number;
  pinnedCourses?: string[];
  title?: string; // For teachers, e.g., "English Teacher"
  subject?: string; // For teachers, e.g., "English, Literature"
  phone?: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'ebook' | 'video' | 'quiz';
  content: string;
  rawLesson: CurriculumLesson;
}

export interface Course {
  id: string;
  title: string;
  series: string;
  level: 'Preschool' | 'Primary' | 'Junior High' | 'High School';
  imageUrl: string;
  description: string;
  lessons: Lesson[];
  color: string;
  progress: number;
  rawLevel: CurriculumLevel;
}

export interface WritingFeedback {
  overall: string;
  grammar: string;
  vocabulary: string;
  coherence: string;
  score: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank';

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  type?: QuestionType;
  difficulty?: DifficultyLevel;
}

export interface GeneratedSentence {
  sentence: string;
  focus: string;
}

export interface Dialogue {
  speaker: string;
  text: string;
}

export interface GeneratedConversation {
  scenario: string;
  level: string;
  dialogues: Dialogue[];
}

export interface LessonPlan {
  title: string;
  objectives: string[];
  warmUp: string;
  presentation: string;
  practice: string;
  production: string;
  coolDown: string;
  duration: string;
}

export interface ReadingPassage {
  title: string;
  text: string;
  level: string;
  comprehensionQuestions: QuizQuestion[];
}

export interface GrammarExercise {
  title: string;
  instructions: string;
  questions: {
    prompt: string;
    answer: string;
  }[];
}

// Based on data/curriculum.ts and other data files

interface LocalizedString {
    en: string;
    vi: string;
}

export interface VocabularyItem {
    term: string;
    pronunciation: string;
    vietnamese: string;
    imageUrl?: string;
}

export interface GrammarPoint {
    title: LocalizedString;
    explanation: {
        en: string[];
        vi: string[];
    };
}

export interface Activity {
    type: string;
    description: {
        en: string[];
        vi: string[];
    };
}

export interface CurriculumLesson {
    id: number;
    title: LocalizedString;
    aims: {
        en: string[];
        vi: string[];
    };
    vocabulary: VocabularyItem[];
    grammar: GrammarPoint[];
    activities: Activity[];
    day?: number;
}

export interface Unit {
    id: number;
    title: LocalizedString;
    lessons: CurriculumLesson[];
}

export interface ReviewSection {
  id: number;
  title: LocalizedString;
  lessons: CurriculumLesson[];
  pageRange: LocalizedString;
}

export interface GlossarySection {
  title: LocalizedString;
  pageRange: LocalizedString;
}


export interface CurriculumLevel {
    level: number;
    title: LocalizedString;
    subtitle: LocalizedString;
    ebookPdfUrl: string;
    units: Unit[];
    reviews?: ReviewSection[];
    glossary?: GlossarySection;
}

export interface CurriculumCategory {
    category: LocalizedString;
    levels: CurriculumLevel[];
}

export type Curriculum = CurriculumCategory[];

export interface OtherProgram {
    title: LocalizedString;
    description: LocalizedString;
    driveLink: string;
}

// For TeacherDashboard
export interface Assignment {
    id: string;
    title: string;
    dueDate: string;
    status: 'Completed' | 'Pending' | 'Overdue';
}

export interface Grade {
  id: string;
  name: string;
  score: number;
  coefficient: 1 | 2 | 3;
  date: string;
}

export interface Student {
    id: string;
    name: string;
    avatar: string;
    lastActivity: string;
    progress: number;
    averageScore: number;
    timeSpent: string;
    isStruggling: boolean;
    scoreHistory: { date: string; score: number }[];
    assignments: Assignment[];
    grades: Grade[];
    notes?: string;
    dob?: string; // Date of Birth
    gender?: string;
}

export interface ClassScheduleItem {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  period: number;
  startTime: string; // "HH:MM"
  endTime: string;   // "HH:MM"
}

export interface ClassData {
    name: string;
    students: Student[];
    schedule?: ClassScheduleItem[];
}

export type Classes = Record<string, ClassData>;