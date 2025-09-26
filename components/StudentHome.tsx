import React, { useMemo } from 'react';
import type { User, Course, View } from '../types';
import CourseCard from './CourseCard';
import { curriculumData } from '../data/curriculum';

interface StudentHomeProps {
  user: User;
  onSelectCourse: (course: Course) => void;
  language: 'en' | 'vi';
  setView: (view: View) => void;
}

const StudentHome: React.FC<StudentHomeProps> = ({ user, onSelectCourse, language, setView }) => {

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
    }
  }[language];

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">{t.welcome}</h1>
        <p className="mt-1 text-lg text-slate-600 dark:text-slate-400">{t.subtitle}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card-glass p-6 flex items-center gap-4">
            <i className="fa-solid fa-star text-4xl text-amber-400"></i>
            <div>
                <p className="text-2xl font-bold">{user.points}</p>
                <p className="text-sm text-slate-500">{t.points}</p>
            </div>
        </div>
        <div className="card-glass p-6 flex items-center gap-4">
            <i className="fa-solid fa-fire-flame-curved text-4xl text-red-500"></i>
            <div>
                <p className="text-2xl font-bold">{user.streak}</p>
                <p className="text-sm text-slate-500">{t.streak}</p>
            </div>
        </div>
        <div className="card-glass p-6 flex items-center gap-4">
            <i className="fa-solid fa-gem text-4xl text-sky-500"></i>
            <div>
                <p className="text-2xl font-bold">{user.badges.length}</p>
                <p className="text-sm text-slate-500">{t.badges}</p>
            </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            {t.myCourses}
        </h2>
        {pinnedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    </div>
  );
};

export default StudentHome;