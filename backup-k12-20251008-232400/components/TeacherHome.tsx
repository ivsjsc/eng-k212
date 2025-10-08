import React, { useMemo } from 'react';
import type { User, Course, View, Classes, ClassScheduleItem, ClassData } from '../types';
import { curriculumData } from '../data/curriculum';
import CourseCard from './CourseCard';
import ClassOverviewCard from './ClassOverviewCard';

interface TeacherHomeProps {
  user: User;
  onSelectCourse: (course: Course) => void;
  language: 'en' | 'vi';
  setView: (view: View) => void;
  classes: Classes;
}

const TeacherHome: React.FC<TeacherHomeProps> = ({ user, onSelectCourse, language, setView, classes }) => {

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

  const todaysSchedule = useMemo(() => {
    const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
    const scheduleItems: (ClassScheduleItem & { className: string })[] = [];
    
    // FIX: Cast Object.values(classes) to ClassData[] to prevent 'property does not exist on type unknown' errors.
    (Object.values(classes) as ClassData[]).forEach(classData => {
        if (classData.schedule) {
            classData.schedule.forEach(item => {
                if (item.day === dayOfWeek) {
                    scheduleItems.push({ ...item, className: classData.name });
                }
            });
        }
    });

    return scheduleItems.sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [classes]);
  
  const t = {
    en: {
        welcome: `Welcome, ${user.name}!`,
        subtitle: "Here's a quick overview of your classes and schedule.",
        scheduleTitle: "Today's Schedule",
        timeHeader: "Time",
        classHeader: "Class",
        periodHeader: "Period",
        noClasses: "No classes scheduled for today. Enjoy your day!",
        curriculumTitle: "My Curriculum",
        pinPrompt: "Pin the curriculum you teach here for quick access.",
        goToCurriculum: "Go to Curriculum",
    },
    vi: {
        welcome: `Chào mừng, ${user.name}!`,
        subtitle: "Đây là tổng quan nhanh về các lớp học và lịch trình của bạn.",
        scheduleTitle: "Lịch dạy hôm nay",
        timeHeader: "Thời gian",
        classHeader: "Lớp",
        periodHeader: "Tiết",
        noClasses: "Không có lớp nào được lên lịch hôm nay. Chúc bạn một ngày tốt lành!",
        curriculumTitle: "Chương trình của tôi",
        pinPrompt: "Ghim các chương trình bạn dạy ở đây để truy cập nhanh chóng.",
        goToCurriculum: "Tới trang Chương trình",
    }
  }[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-teal-950 p-4 sm:p-6 lg:p-8 animate-fade-in">
        <header className="mb-12 relative">
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 rounded-full blur-3xl animate-pulse-glow"></div>
            <div className="absolute top-10 -right-20 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse-glow" style={{animationDelay: '1s'}}></div>
            <div className="relative z-10">
                <h1 className="text-5xl md:text-6xl font-black text-gradient-green mb-4 leading-tight drop-shadow-sm">{t.welcome}</h1>
                <p className="text-xl md:text-2xl font-bold text-slate-700 dark:text-slate-200">{t.subtitle}</p>
            </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Area */}
            <main className="flex-1">
                <section>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                        <i className="fa-solid fa-book-bookmark mr-2 text-green-500"></i>
                        {t.curriculumTitle}
                    </h2>
                    {pinnedCourses.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {pinnedCourses.map(course => (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                    onSelect={() => onSelectCourse(course)}
                                    isPinned={true}
                                    onPinToggle={() => {}}
                                    language={language}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 card-glass">
                            <div className="bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900/30 dark:to-emerald-800/30 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                                <i className="fa-solid fa-thumbtack text-5xl text-green-600 dark:text-green-400"></i>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 mb-8 font-semibold text-lg">{t.pinPrompt}</p>
                            <button onClick={() => setView('curriculum')} className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                                <i className="fa-solid fa-arrow-right mr-2"></i>
                                {t.goToCurriculum}
                            </button>
                        </div>
                    )}
                </section>
            </main>

            {/* Sidebar Area */}
            <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0 space-y-8">
                <section className="card-glass p-6">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                        <i className="fa-solid fa-calendar-day mr-2 text-blue-500"></i>
                        {t.scheduleTitle}
                    </h2>
                    {todaysSchedule.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-100 dark:bg-slate-700/50">
                                    <tr>
                                        <th className="p-3 font-semibold">{t.timeHeader}</th>
                                        <th className="p-3 font-semibold">{t.classHeader}</th>
                                        <th className="p-3 font-semibold text-center">{t.periodHeader}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {todaysSchedule.map(item => (
                                        <tr key={item.id} className="border-b dark:border-slate-700 last:border-b-0">
                                            <td className="p-3 whitespace-nowrap">{item.startTime} - {item.endTime}</td>
                                            <td className="p-3 font-medium">{item.className}</td>
                                            <td className="p-3 text-center">{item.period}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-800/30 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <i className="fa-solid fa-mug-hot text-4xl text-blue-600 dark:text-blue-400"></i>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 font-semibold">{t.noClasses}</p>
                        </div>
                    )}
                </section>
                
                <ClassOverviewCard classes={classes} language={language} setView={setView} />
            </aside>
        </div>
    </div>
  );
};

export default TeacherHome;
