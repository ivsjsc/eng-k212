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
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
        <header className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">{t.welcome}</h1>
            <p className="mt-1 text-lg text-slate-600 dark:text-slate-400">{t.subtitle}</p>
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
                        <div className="text-center py-12 card-glass">
                            <i className="fa-solid fa-thumbtack text-4xl text-slate-400 mb-4"></i>
                            <p className="text-slate-500 mb-6">{t.pinPrompt}</p>
                            <button onClick={() => setView('curriculum')} className="btn btn-primary">
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
                        <div className="text-center py-10">
                            <i className="fa-solid fa-mug-hot text-4xl text-slate-400 mb-4"></i>
                            <p className="text-slate-500">{t.noClasses}</p>
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
