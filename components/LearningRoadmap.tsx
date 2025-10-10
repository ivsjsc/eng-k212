/**
 * 30-Day Learning Roadmap Component
 * Mobile-First Microlearning Path
 * 
 * Features:
 * - 5-7 minute daily lessons
 * - Progress tracking
 * - Unlock system
 * - Daily reminders
 */

import React, { useState } from 'react';
import type { User } from '../types';

interface RoadmapProps {
  user: User;
  onLessonSelect: (day: number, lessonId: string) => void;
}

interface DayLesson {
  day: number;
  week: number;
  theme: string;
  title: string;
  focus: string;
  duration: string; // "5-7 min"
  moduleId: number;
  lessonId: number;
  activities: string[];
  microsoftLearn?: string;
  youtubeChannel?: string;
  isCompleted: boolean;
  isUnlocked: boolean;
}

const roadmapData: DayLesson[] = [
  // ===== WEEK 1: Email Writing =====
  {
    day: 1,
    week: 1,
    theme: 'Email Writing Basics',
    title: 'Email Structure & Professional Tone',
    focus: 'Subject lines, salutations, body, closing',
    duration: '6 min',
    moduleId: 1,
    lessonId: 101,
    activities: ['Watch video', 'Complete quiz', 'Write 1 email'],
    microsoftLearn: 'https://learn.microsoft.com/training/modules/write-professional-emails-outlook/',
    youtubeChannel: 'BBC Learning English',
    isCompleted: false,
    isUnlocked: true
  },
  {
    day: 2,
    week: 1,
    theme: 'Email Writing Basics',
    title: 'Formal vs. Informal Emails',
    focus: 'Tone adjustment, context awareness',
    duration: '5 min',
    moduleId: 1,
    lessonId: 101,
    activities: ['Read examples', 'Practice rewriting', 'Peer review'],
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 3,
    week: 1,
    theme: 'Email Writing Basics',
    title: 'Request Emails',
    focus: 'Polite requests, clear purpose',
    duration: '7 min',
    moduleId: 1,
    lessonId: 102,
    activities: ['Template practice', 'Write 2 requests', 'AI feedback'],
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 4,
    week: 1,
    theme: 'Email Writing Basics',
    title: 'Response & Follow-up Emails',
    focus: 'Timely responses, follow-up etiquette',
    duration: '6 min',
    moduleId: 1,
    lessonId: 102,
    activities: ['Response templates', 'Practice scenarios', 'Timing tips'],
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 5,
    week: 1,
    theme: 'Email Writing Basics',
    title: 'Complaint & Apology Emails',
    focus: 'Diplomatic language, problem-solving',
    duration: '7 min',
    moduleId: 1,
    lessonId: 102,
    activities: ['Handle complaints', 'Write apologies', 'Role-play'],
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 6,
    week: 1,
    theme: 'Email Writing Review',
    title: 'Email Writing Practice Day',
    focus: 'Mixed scenarios, AI grading',
    duration: '10 min',
    moduleId: 1,
    lessonId: 102,
    activities: ['Write 3 emails', 'Get AI feedback', 'Peer review'],
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 7,
    week: 1,
    theme: 'Weekly Review',
    title: 'Week 1 Assessment',
    focus: 'Email writing test',
    duration: '15 min',
    moduleId: 1,
    lessonId: 102,
    activities: ['Complete quiz', 'Write final email', 'Self-assessment'],
    isCompleted: false,
    isUnlocked: false
  },

  // ===== WEEK 2: Meetings =====
  {
    day: 8,
    week: 2,
    theme: 'Meeting Communication',
    title: 'Meeting Preparation & Agenda',
    focus: 'Planning, agenda creation',
    duration: '6 min',
    moduleId: 2,
    lessonId: 201,
    activities: ['Create agenda', 'Meeting invitation', 'Time management'],
    microsoftLearn: 'https://learn.microsoft.com/training/modules/collaborate-effectively-teams/',
    youtubeChannel: 'English With Lucy',
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 9,
    week: 2,
    theme: 'Meeting Communication',
    title: 'Opening & Closing Meetings',
    focus: 'Professional phrases, summarizing',
    duration: '5 min',
    moduleId: 2,
    lessonId: 201,
    activities: ['Learn phrases', 'Practice opening', 'Practice closing'],
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 10,
    week: 2,
    theme: 'Meeting Communication',
    title: 'Expressing Opinions',
    focus: 'Agreeing, disagreeing politely',
    duration: '7 min',
    moduleId: 2,
    lessonId: 202,
    activities: ['Opinion phrases', 'Debate practice', 'Tone control'],
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 11,
    week: 2,
    theme: 'Meeting Communication',
    title: 'Asking Questions & Clarifying',
    focus: 'Effective questioning, active listening',
    duration: '6 min',
    moduleId: 2,
    lessonId: 202,
    activities: ['Question types', 'Clarification phrases', 'Listen & respond'],
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 12,
    week: 2,
    theme: 'Meeting Communication',
    title: 'Interrupting & Turn-taking',
    focus: 'Polite interruptions, floor management',
    duration: '6 min',
    moduleId: 2,
    lessonId: 202,
    activities: ['Interruption phrases', 'Practice timing', 'Group discussion'],
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 13,
    week: 2,
    theme: 'Meeting Communication',
    title: 'Meeting Simulation',
    focus: 'Full meeting role-play',
    duration: '10 min',
    moduleId: 2,
    lessonId: 202,
    activities: ['AI meeting sim', 'Record yourself', 'Get feedback'],
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 14,
    week: 2,
    theme: 'Weekly Review',
    title: 'Week 2 Assessment',
    focus: 'Meeting skills test',
    duration: '15 min',
    moduleId: 2,
    lessonId: 202,
    activities: ['Complete quiz', 'Final meeting sim', 'Self-assessment'],
    isCompleted: false,
    isUnlocked: false
  },

  // ===== WEEK 3: Presentations =====
  {
    day: 15,
    week: 3,
    theme: 'Business Presentations',
    title: 'Presentation Structure',
    focus: 'Opening, body, conclusion',
    duration: '6 min',
    moduleId: 3,
    lessonId: 301,
    activities: ['Learn structure', 'Outline creation', 'Hook techniques'],
    microsoftLearn: 'https://learn.microsoft.com/training/modules/create-impactful-presentations-powerpoint/',
    youtubeChannel: 'Speak English With Tiffani',
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 16,
    week: 3,
    theme: 'Business Presentations',
    title: 'Opening & Grabbing Attention',
    focus: 'Strong starts, audience engagement',
    duration: '5 min',
    moduleId: 3,
    lessonId: 301,
    activities: ['Opening phrases', 'Practice hooks', 'Record opening'],
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 17,
    week: 3,
    theme: 'Business Presentations',
    title: 'Signposting & Transitions',
    focus: 'Guiding audience, smooth flow',
    duration: '6 min',
    moduleId: 3,
    lessonId: 301,
    activities: ['Transition phrases', 'Practice linking', 'Outlining'],
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 18,
    week: 3,
    theme: 'Business Presentations',
    title: 'Visual Aids & Slides',
    focus: 'PowerPoint best practices',
    duration: '7 min',
    moduleId: 3,
    lessonId: 301,
    activities: ['Design tips', 'Create 3 slides', 'Practice explaining'],
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 19,
    week: 3,
    theme: 'Business Presentations',
    title: 'Handling Q&A',
    focus: 'Answering questions confidently',
    duration: '6 min',
    moduleId: 3,
    lessonId: 301,
    activities: ['Q&A phrases', 'Practice responses', 'Handling difficult questions'],
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 20,
    week: 3,
    theme: 'Business Presentations',
    title: 'Full Presentation Practice',
    focus: '5-minute presentation',
    duration: '10 min',
    moduleId: 3,
    lessonId: 301,
    activities: ['Prepare slides', 'Record presentation', 'AI coaching feedback'],
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 21,
    week: 3,
    theme: 'Weekly Review',
    title: 'Week 3 Assessment',
    focus: 'Presentation skills test',
    duration: '15 min',
    moduleId: 3,
    lessonId: 301,
    activities: ['Complete quiz', 'Final presentation', 'Peer feedback'],
    isCompleted: false,
    isUnlocked: false
  },

  // ===== WEEK 4: Negotiation & Culture =====
  {
    day: 22,
    week: 4,
    theme: 'Negotiation Skills',
    title: 'Negotiation Basics',
    focus: 'Win-win strategies, preparation',
    duration: '6 min',
    moduleId: 4,
    lessonId: 401,
    activities: ['Learn strategies', 'Prep checklist', 'Role identification'],
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 23,
    week: 4,
    theme: 'Negotiation Skills',
    title: 'Making & Responding to Offers',
    focus: 'Proposal language, counteroffers',
    duration: '7 min',
    moduleId: 4,
    lessonId: 401,
    activities: ['Offer phrases', 'Practice proposals', 'Counteroffer tactics'],
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 24,
    week: 4,
    theme: 'Negotiation Skills',
    title: 'Handling Objections',
    focus: 'Overcoming resistance, compromise',
    duration: '6 min',
    moduleId: 4,
    lessonId: 401,
    activities: ['Objection phrases', 'Practice responses', 'Find middle ground'],
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 25,
    week: 4,
    theme: 'Negotiation Skills',
    title: 'Closing Deals',
    focus: 'Agreement language, next steps',
    duration: '6 min',
    moduleId: 4,
    lessonId: 401,
    activities: ['Closing phrases', 'Practice finalizing', 'Documentation'],
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 26,
    week: 4,
    theme: 'Cross-cultural Communication',
    title: 'Cultural Awareness',
    focus: 'Understanding differences, respect',
    duration: '7 min',
    moduleId: 7,
    lessonId: 701,
    activities: ['Cultural tips', 'Case studies', 'Adaptation strategies'],
    youtubeChannel: 'Accent\'s Way English with Hadar',
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 27,
    week: 4,
    theme: 'Cross-cultural Communication',
    title: 'Diplomatic Language',
    focus: 'Politeness, indirect communication',
    duration: '6 min',
    moduleId: 7,
    lessonId: 701,
    activities: ['Diplomatic phrases', 'Practice scenarios', 'Tone awareness'],
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 28,
    week: 4,
    theme: 'Cross-cultural Communication',
    title: 'Working with Global Teams',
    focus: 'Time zones, virtual collaboration',
    duration: '7 min',
    moduleId: 7,
    lessonId: 701,
    activities: ['Virtual tips', 'Schedule practice', 'Team building'],
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 29,
    week: 4,
    theme: 'Final Practice',
    title: 'Full Negotiation Simulation',
    focus: 'Complete negotiation scenario',
    duration: '10 min',
    moduleId: 4,
    lessonId: 401,
    activities: ['AI negotiation sim', 'Record session', 'Analyze results'],
    isCompleted: false,
    isUnlocked: false
  },
  {
    day: 30,
    week: 4,
    theme: 'Course Completion',
    title: 'Final Assessment & Certificate',
    focus: 'Comprehensive test',
    duration: '20 min',
    moduleId: 0,
    lessonId: 0,
    activities: ['Complete final exam', 'Get certificate', 'Plan next steps'],
    isCompleted: false,
    isUnlocked: false
  }
];

const RoadmapComponent: React.FC<RoadmapProps> = ({ user, onLessonSelect }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [expandedWeek, setExpandedWeek] = useState<number>(1);

  // Calculate user progress
  const completedDays = roadmapData.filter(day => day.isCompleted).length;
  const progressPercent = (completedDays / 30) * 100;

  // Group days by week
  const weekGroups = [1, 2, 3, 4].map(weekNum => ({
    week: weekNum,
    days: roadmapData.filter(day => day.week === weekNum),
    theme: roadmapData.find(day => day.week === weekNum)?.theme.split(' ')[0] || ''
  }));

  const DayCard: React.FC<{ day: DayLesson }> = ({ day }) => {
    const isLocked = !day.isUnlocked;
    const isCurrent = day.day === completedDays + 1;

    return (
      <div
        onClick={() => !isLocked && onLessonSelect(day.day, `${day.moduleId}-${day.lessonId}`)}
        className={`
          relative p-4 rounded-xl border-2 transition-all
          ${isLocked ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 opacity-50' : ''}
          ${day.isCompleted ? 'bg-green-50 dark:bg-green-900/20 border-green-500' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700'}
          ${isCurrent ? 'ring-4 ring-blue-500 ring-opacity-50' : ''}
          ${!isLocked && 'hover:shadow-lg active:scale-98 cursor-pointer'}
        `}
      >
        {/* Day number badge */}
        <div className={`
          absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
          ${day.isCompleted ? 'bg-green-500 text-white' : isCurrent ? 'bg-blue-500 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}
        `}>
          {day.isCompleted ? '✓' : day.day}
        </div>

        {/* Lock icon for locked days */}
        {isLocked && (
          <div className="absolute top-4 right-4">
            <i className="fas fa-lock text-slate-400"></i>
          </div>
        )}

        {/* Content */}
        <div className="mt-2">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
            {day.theme}
          </p>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            {day.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            {day.focus}
          </p>

          {/* Duration */}
          <div className="flex items-center gap-2 mb-2">
            <i className="fas fa-clock text-blue-500 text-xs"></i>
            <span className="text-xs text-slate-600 dark:text-slate-400">
              {day.duration}
            </span>
          </div>

          {/* Activities */}
          <div className="flex flex-wrap gap-1 mb-2">
            {day.activities.map((activity, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
              >
                {activity}
              </span>
            ))}
          </div>

          {/* Resources */}
          {(day.microsoftLearn || day.youtubeChannel) && (
            <div className="flex items-center gap-3 mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              {day.microsoftLearn && (
                <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                  <i className="fas fa-graduation-cap text-blue-500"></i>
                  <span>MS Learn</span>
                </div>
              )}
              {day.youtubeChannel && (
                <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                  <i className="fab fa-youtube text-red-500"></i>
                  <span>{day.youtubeChannel}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-4">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          30-Day Learning Roadmap
        </h1>
        
        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Day {completedDays} of 30
            </span>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Daily streak */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fas fa-fire text-orange-500"></i>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {user.currentStreak || 0} day streak
            </span>
          </div>
          <button className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
            Set Reminder
          </button>
        </div>
      </div>

      {/* Week sections */}
      <div className="px-4 py-6 space-y-6">
        {weekGroups.map(({ week, days, theme }) => (
          <div key={week} className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm">
            {/* Week header */}
            <button
              onClick={() => setExpandedWeek(expandedWeek === week ? 0 : week)}
              className="w-full flex items-center justify-between mb-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  W{week}
                </div>
                <div className="text-left">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Week {week}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {theme}
                  </p>
                </div>
              </div>
              <i className={`fas fa-chevron-${expandedWeek === week ? 'up' : 'down'} text-slate-400`}></i>
            </button>

            {/* Days grid */}
            {expandedWeek === week && (
              <div className="grid grid-cols-1 gap-4">
                {days.map(day => (
                  <DayCard key={day.day} day={day} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Floating action button */}
      {completedDays < 30 && (
        <button
          onClick={() => onLessonSelect(completedDays + 1, '')}
          className="fixed bottom-24 right-4 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg flex items-center justify-center active:scale-95 transition-transform z-40"
        >
          <i className="fas fa-play text-xl"></i>
        </button>
      )}
    </div>
  );
};

export default RoadmapComponent;
export { roadmapData };
export type { DayLesson };
