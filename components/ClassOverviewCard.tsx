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
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">
        <i className="fa-solid fa-chalkboard mr-2 text-purple-500"></i>
        {t.title}
      </h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="group relative bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl p-4 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 text-center">
            <p className="text-3xl font-black text-white drop-shadow-md mb-1">{stats.totalClasses}</p>
            <p className="text-xs font-bold text-white/95 uppercase tracking-wide">{t.classes}</p>
          </div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/15 rounded-full blur-2xl"></div>
        </div>
        
        <div className="group relative bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl p-4 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 text-center">
            <p className="text-3xl font-black text-white drop-shadow-md mb-1">{stats.totalStudents}</p>
            <p className="text-xs font-bold text-white/95 uppercase tracking-wide">{t.students}</p>
          </div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/15 rounded-full blur-2xl"></div>
        </div>
        
        <div className="group relative bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-4 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 text-center">
            <p className="text-3xl font-black text-white drop-shadow-md mb-1">{stats.totalStruggling}</p>
            <p className="text-xs font-bold text-white/95 uppercase tracking-wide">{t.struggling}</p>
          </div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/15 rounded-full blur-2xl"></div>
        </div>
      </div>
      
      <ul className="space-y-3 text-sm mb-6">
        {/* FIX: Cast Object.values(classes) to ClassData[] to prevent type errors during mapping. */}
        {(Object.values(classes) as ClassData[]).map((classData, index) => (
          <li key={index} className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-600/50 hover:shadow-md transition-all duration-200 border border-slate-200 dark:border-slate-600">
            <span className="font-bold text-slate-800 dark:text-slate-100">{classData.name}</span>
            <span className="text-slate-600 dark:text-slate-300 text-xs font-semibold bg-white/70 dark:bg-slate-800/70 px-3 py-1 rounded-full">{t.studentCount(classData.students.length)}</span>
          </li>
        ))}
      </ul>

      <button onClick={() => setView('teacher-dashboard')} className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
        <i className="fa-solid fa-chart-line mr-2"></i>
        {t.viewDashboard}
      </button>
    </section>
  );
};

export default ClassOverviewCard;
