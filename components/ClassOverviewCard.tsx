import React, { useMemo } from 'react';
import type { Classes, View, ClassData } from '../types';

interface ClassOverviewCardProps {
  classes: Classes;
  language: 'en' | 'vi';
  setView: (view: View) => void;
}

const ClassOverviewCard: React.FC<ClassOverviewCardProps> = ({ classes, language, setView }) => {
  const t = {
    en: {
      title: "Class Overview",
      classes: "Classes",
      students: "Students",
      struggling: "Struggling",
      viewDashboard: "Go to Full Dashboard",
      studentCount: (count: number) => `${count} student${count !== 1 ? 's' : ''}`
    },
    vi: {
      title: "Tổng quan Lớp học",
      classes: "Lớp học",
      students: "Học sinh",
      struggling: "Cần chú ý",
      viewDashboard: "Xem Bảng điều khiển",
      studentCount: (count: number) => `${count} học sinh`
    }
  }[language];

  const stats = useMemo(() => {
    // FIX: Cast Object.values(classes) to ClassData[] to prevent type errors.
    const classList = Object.values(classes) as ClassData[];
    const totalClasses = classList.length;
    const totalStudents = classList.reduce((sum, c) => sum + c.students.length, 0);
    const totalStruggling = classList.reduce((sum, c) => sum + c.students.filter(s => s.isStruggling).length, 0);
    return { totalClasses, totalStudents, totalStruggling };
  }, [classes]);

  return (
    <section className="card-glass p-6">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
        <i className="fa-solid fa-chalkboard mr-2 text-purple-500"></i>
        {t.title}
      </h2>

      <div className="grid grid-cols-3 gap-4 my-4 text-center">
        <div>
          <p className="text-2xl font-bold">{stats.totalClasses}</p>
          <p className="text-xs text-slate-500">{t.classes}</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{stats.totalStudents}</p>
          <p className="text-xs text-slate-500">{t.students}</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-amber-500">{stats.totalStruggling}</p>
          <p className="text-xs text-slate-500">{t.struggling}</p>
        </div>
      </div>
      
      <ul className="space-y-2 text-sm mb-4">
        {/* FIX: Cast Object.values(classes) to ClassData[] to prevent type errors during mapping. */}
        {(Object.values(classes) as ClassData[]).map((classData, index) => (
          <li key={index} className="flex justify-between items-center p-2 rounded-md bg-slate-50 dark:bg-slate-700/30">
            <span className="font-medium">{classData.name}</span>
            <span className="text-slate-500 dark:text-slate-400 text-xs">{t.studentCount(classData.students.length)}</span>
          </li>
        ))}
      </ul>

      <button onClick={() => setView('teacher-dashboard')} className="btn btn-primary w-full">
        {t.viewDashboard}
      </button>
    </section>
  );
};

export default ClassOverviewCard;
