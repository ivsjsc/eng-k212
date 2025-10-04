import React, { useMemo, useState } from 'react';
import type { User, Course, View } from '../types';
import CourseCard from './CourseCard';
import ProgressChart from './ProgressChart';
import LearningCalendar from './LearningCalendar';
import SkillRadar from './SkillRadar';
import RecommendedLessons from './RecommendedLessons';
import StudyGroup from './StudyGroup';
import AchievementBadges from './AchievementBadges';
import { curriculumData } from '../data/curriculum';

interface StudentHomeProps {
  user: User;
  onSelectCourse: (course: Course) => void;
  language: 'en' | 'vi';
  setView: (view: View) => void;
}

const StudentHome: React.FC<StudentHomeProps> = ({ user, onSelectCourse, language, setView }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'achievements' | 'social'>('overview');

  const allCourses = useMemo(() => {
    const colorPalette = ['#4A90E2', '#50E3C2', '#F5A623', '#BD10E0', '#9013FE', '#D0021B', '#F8E71C', '#7ED321'];
    let colorIndex = 0;
    const slug = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    return curriculumData.flatMap(category =>
      category.levels.map(level => {
        const courseId = `course-${slug(level.title.en)}`;
        return {
          id: courseId,
          title: language === 'vi' ? level.title.vi : level.title.en,
          series: language === 'vi' ? category.category.vi : category.category.en,
          level: (level.subtitle.en.split(' - ')[0]) as Course['level'],
          imageUrl: `https://picsum.photos/seed/${level.level}/400/225`,
          description: language === 'vi' ? level.subtitle.vi : level.subtitle.en,
          lessons: [], // Not needed for card view
          color: colorPalette[colorIndex++ % colorPalette.length],
          progress: Math.floor(Math.random() * 100), // Mock progress
          rawLevel: level,
        } as Course;
      })
    );
  }, [language]);
    
  const pinnedCourses = useMemo(() => {
      return allCourses.filter(course => user.pinnedCourses?.includes(course.id));
  }, [allCourses, user.pinnedCourses]);

  // Mock data for progress tracking
  const skillsData = [
    { skill: language === 'vi' ? 'Nghe' : 'Listening', level: 75 },
    { skill: language === 'vi' ? 'Nói' : 'Speaking', level: 60 },
    { skill: language === 'vi' ? 'Đọc' : 'Reading', level: 85 },
    { skill: language === 'vi' ? 'Viết' : 'Writing', level: 70 },
    { skill: language === 'vi' ? 'Ngữ pháp' : 'Grammar', level: 80 },
    { skill: language === 'vi' ? 'Từ vựng' : 'Vocabulary', level: 90 }
  ];

  const progressData = [
    { label: language === 'vi' ? 'Hoàn thành bài học' : 'Lessons Completed', value: 65, color: '#4A90E2' },
    { label: language === 'vi' ? 'Bài tập đã nộp' : 'Assignments Submitted', value: 80, color: '#50E3C2' },
    { label: language === 'vi' ? 'Điểm trung bình' : 'Average Score', value: 85, color: '#F5A623' },
    { label: language === 'vi' ? 'Tiến độ tổng thể' : 'Overall Progress', value: 70, color: '#BD10E0' }
  ];

  const calendarEvents = [
    { id: '1', title: language === 'vi' ? 'Bài 5: Ngữ pháp' : 'Lesson 5: Grammar', date: new Date(), type: 'lesson' as const },
    { id: '2', title: language === 'vi' ? 'Bài tập về nhà' : 'Homework Assignment', date: new Date(Date.now() + 86400000), type: 'assignment' as const },
    { id: '3', title: language === 'vi' ? 'Kiểm tra giữa kỳ' : 'Midterm Test', date: new Date(Date.now() + 86400000 * 3), type: 'test' as const }
  ];

  const recommendations = pinnedCourses.slice(0, 2).map(course => ({
    course,
    reason: language === 'vi' 
      ? 'Tiếp tục từ nơi bạn đã dừng lại' 
      : 'Continue from where you left off',
    priority: 'high' as const
  }));

  const mockBadges = [
    { id: '1', name: language === 'vi' ? 'Người học siêng năng' : 'Eager Learner', icon: 'fa-book', color: 'bg-blue-500', description: language === 'vi' ? 'Hoàn thành 10 bài học' : 'Complete 10 lessons', earned: true },
    { id: '2', name: language === 'vi' ? 'Chuỗi 7 ngày' : '7-Day Streak', icon: 'fa-fire', color: 'bg-red-500', description: language === 'vi' ? 'Học liên tục 7 ngày' : 'Learn for 7 days straight', earned: true },
    { id: '3', name: language === 'vi' ? 'Thạc sĩ Từ vựng' : 'Vocabulary Master', icon: 'fa-spell-check', color: 'bg-green-500', description: language === 'vi' ? 'Học 100 từ mới' : 'Learn 100 new words', earned: false, progress: 65 },
    { id: '4', name: language === 'vi' ? 'Người giúp đỡ' : 'Helper', icon: 'fa-hands-helping', color: 'bg-purple-500', description: language === 'vi' ? 'Giúp 5 bạn học' : 'Help 5 classmates', earned: false, progress: 40 },
    { id: '5', name: language === 'vi' ? 'Nhà vô địch Quiz' : 'Quiz Champion', icon: 'fa-trophy', color: 'bg-yellow-500', description: language === 'vi' ? 'Đạt điểm 100% trong quiz' : 'Score 100% in a quiz', earned: false }
  ];
  
  const t = {
    en: {
      welcome: `Welcome back, ${user.name}!`,
      subtitle: "Let's continue your awesome learning journey.",
      points: "Points",
      streak: "Day Streak",
      badges: "Badges",
      myCourses: "My Courses",
      noPinned: "No Pinned Courses",
      pinPrompt: "Go to the Curriculum to pin a course and get started!",
      explore: "Explore Curriculum",
      overview: "Overview",
      progress: "Progress",
      achievements: "Achievements",
      social: "Social",
      continueLearning: "Continue Learning",
      timeSpent: "Time Spent Today",
      lessonsCompleted: "Lessons Completed",
      nextLesson: "Next Lesson"
    },
    vi: {
      welcome: `Chào mừng trở lại, ${user.name}!`,
      subtitle: "Hãy tiếp tục hành trình học tập tuyệt vời của bạn.",
      points: "Điểm",
      streak: "Chuỗi ngày học",
      badges: "Huy hiệu",
      myCourses: "Các khóa học của tôi",
      noPinned: "Chưa có khóa học nào được ghim",
      pinPrompt: "Vào mục Chương trình để ghim một khóa học và bắt đầu học!",
      explore: "Khám phá Chương trình",
      overview: "Tổng quan",
      progress: "Tiến độ",
      achievements: "Thành tựu",
      social: "Xã hội",
      continueLearning: "Tiếp tục học",
      timeSpent: "Thời gian học hôm nay",
      lessonsCompleted: "Bài học đã hoàn thành",
      nextLesson: "Bài học tiếp theo"
    }
  }[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 p-4 sm:p-6 lg:p-8 animate-fade-in">
      <header className="mb-12 relative">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute top-10 -right-20 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse-glow" style={{animationDelay: '1s'}}></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-black text-gradient-blue mb-4 leading-tight drop-shadow-sm">{t.welcome}</h1>
          <p className="text-xl md:text-2xl font-bold text-slate-700 dark:text-slate-200">{t.subtitle}</p>
        </div>
      </header>

      {/* Stats Cards - Redesigned with Gradients */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="group relative bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="bg-white/25 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <i className="fa-solid fa-star text-5xl text-white drop-shadow-lg"></i>
            </div>
            <div>
              <p className="text-4xl font-black text-white drop-shadow-md mb-1">{user.points}</p>
              <p className="text-sm font-bold text-white/95 uppercase tracking-wide">{t.points}</p>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/15 rounded-full blur-3xl"></div>
        </div>
        
        <div className="group relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="bg-white/25 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <i className="fa-solid fa-fire text-5xl text-white drop-shadow-lg"></i>
            </div>
            <div>
              <p className="text-4xl font-black text-white drop-shadow-md mb-1">{user.streak || 0}</p>
              <p className="text-sm font-bold text-white/95 uppercase tracking-wide">{t.streak}</p>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/15 rounded-full blur-3xl"></div>
        </div>
        
        <div className="group relative bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden" onClick={() => setActiveTab('achievements')}>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="bg-white/25 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <i className="fa-solid fa-trophy text-5xl text-white drop-shadow-lg"></i>
            </div>
            <div>
              <p className="text-4xl font-black text-white drop-shadow-md mb-1">{mockBadges.filter(b => b.earned).length}</p>
              <p className="text-sm font-bold text-white/95 uppercase tracking-wide">{t.badges}</p>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/15 rounded-full blur-3xl"></div>
        </div>
        
        <div className="group relative bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="bg-white/25 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <i className="fa-solid fa-clock text-5xl text-white drop-shadow-lg"></i>
            </div>
            <div>
              <p className="text-4xl font-black text-white drop-shadow-md mb-1">2h 30m</p>
              <p className="text-sm font-bold text-white/95 uppercase tracking-wide">{t.timeSpent}</p>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/15 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Navigation Tabs - Enhanced with Gradient */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: t.overview, icon: 'fa-home' },
          { id: 'progress', label: t.progress, icon: 'fa-chart-line' },
          { id: 'achievements', label: t.achievements, icon: 'fa-trophy' },
          { id: 'social', label: t.social, icon: 'fa-users' }
        ].map(tab => (
          <button
            key={tab.id}
            className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 whitespace-nowrap shadow-lg ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white shadow-2xl scale-105'
                : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:scale-105 hover:shadow-xl backdrop-blur-sm'
            }`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            <i className={`fa-solid ${tab.icon} mr-3 text-lg`}></i>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                <i className="fa-solid fa-book-open mr-2 text-blue-500"></i>
                {t.continueLearning}
              </h2>
              {pinnedCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pinnedCourses.map(course => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onSelect={() => onSelectCourse(course)}
                      isPinned={true}
                      onPinToggle={() => { /* This would be handled in curriculum view */ }}
                      language={language}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 card-glass">
                  <i className="fa-solid fa-thumbtack text-4xl text-slate-400 mb-4"></i>
                  <h3 className="text-xl font-semibold mb-2">{t.noPinned}</h3>
                  <p className="text-slate-500 mb-6">{t.pinPrompt}</p>
                  <button onClick={() => setView('curriculum')} className="btn btn-primary">
                      {t.explore}
                  </button>
                </div>
              )}
            </div>
            
            {recommendations.length > 0 && (
              <RecommendedLessons
                recommendations={recommendations}
                onSelectCourse={onSelectCourse}
                language={language}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <LearningCalendar events={calendarEvents} language={language} />
            <ProgressChart data={progressData} language={language} />
          </div>
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkillRadar skills={skillsData} language={language} />
          <ProgressChart data={progressData} language={language} />
          <div className="lg:col-span-2">
            <LearningCalendar events={calendarEvents} language={language} />
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <AchievementBadges badges={mockBadges} language={language} />
      )}

      {activeTab === 'social' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StudyGroup language={language} />
          <div className="card-glass p-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              <i className="fa-solid fa-comments mr-2 text-green-500"></i>
              {language === 'vi' ? 'Diễn đàn Học tập' : 'Learning Forum'}
            </h3>
            <div className="text-center py-12">
              <i className="fa-solid fa-message-lines text-4xl text-slate-400 mb-3"></i>
              <p className="text-slate-500">{language === 'vi' ? 'Tính năng sắp ra mắt!' : 'Coming soon!'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentHome;