import React, { useEffect, useMemo, useState } from 'react';
import ClassAnalyticsDetails from './ClassAnalyticsDetails';
import { useClassAnalytics } from '../src/hooks/useClassAnalytics';
import type { Classes, ClassData, Student } from '../types';
import { demoClassOptions } from '../data/demo-analytics';

interface ClassAnalyticsDashboardProps {
  classes?: Classes;
  language?: 'en' | 'vi';
}

const translations = {
  en: {
    title: 'Analytics & Insights',
    subtitle: 'Explore class performance with real-time and demo data',
    selectClass: 'Select class',
    totalStudents: 'Students',
    averageScore: 'Average score',
    averageProgress: 'Average progress',
    struggling: 'Needs support',
    topStudents: 'Top performers',
    actions: 'Actions',
    loading: 'Loading analytics...',
    error: 'Unable to load analytics data',
    retry: 'Try again',
    noStudents: 'No student data for this class yet',
    viewDetails: 'View details',
    demoNotice: 'Showing demo data. Connect a real class to see live analytics.'
  },
  vi: {
    title: 'Phân tích & Thống kê',
    subtitle: 'Khám phá hiệu suất lớp học với dữ liệu thời gian thực và demo',
    selectClass: 'Chọn lớp',
    totalStudents: 'Sĩ số',
    averageScore: 'Điểm trung bình',
    averageProgress: 'Tiến độ trung bình',
    struggling: 'Cần hỗ trợ',
    topStudents: 'Học sinh nổi bật',
    actions: 'Hành động',
    loading: 'Đang tải thống kê...',
    error: 'Không thể tải dữ liệu thống kê',
    retry: 'Thử lại',
    noStudents: 'Chưa có dữ liệu học sinh cho lớp này',
    viewDetails: 'Xem chi tiết',
    demoNotice: 'Đang hiển thị dữ liệu demo. Kết nối lớp thực để xem thống kê thực tế.'
  }
} as const;

const fallbackMap = new Map(demoClassOptions.map((option) => [option.id, option.classData] as const));

const ClassAnalyticsDashboard: React.FC<ClassAnalyticsDashboardProps> = ({ classes = {}, language = 'vi' }) => {
  const t = translations[language];

  const classEntries = useMemo(() => Object.entries(classes || {}), [classes]);

  const classOptions = useMemo(() => {
    if (classEntries.length > 0) {
      return classEntries.map(([id, classData]) => ({ id, name: (classData as ClassData).name || id }));
    }
    return demoClassOptions.map(({ id, name }) => ({ id, name }));
  }, [classEntries]);

  const [selectedClassId, setSelectedClassId] = useState<string>(() => classOptions[0]?.id ?? demoClassOptions[0]?.id ?? '');

  useEffect(() => {
    if (!selectedClassId && classOptions.length > 0) {
      setSelectedClassId(classOptions[0].id);
      return;
    }
    if (selectedClassId && !classOptions.some((option) => option.id === selectedClassId) && classOptions.length > 0) {
      setSelectedClassId(classOptions[0].id);
    }
  }, [classOptions, selectedClassId]);

  // NOTE: useClassAnalytics currently accepts only classId — if you want "retry" without full reload,
  // consider adding a second dependency parameter (e.g., refreshKey) to the hook.
  const { data: hookData, loading, error } = useClassAnalytics(selectedClassId);

  const currentClassData = useMemo<ClassData | null>(() => {
    if (selectedClassId && classes[selectedClassId]) {
      return classes[selectedClassId];
    }
    if (hookData) {
      return hookData;
    }
    return (selectedClassId && fallbackMap.get(selectedClassId)) || null;
  }, [classes, hookData, selectedClassId]);

  const analytics = useMemo(() => {
    const students = (currentClassData?.students ?? []) as Student[];
    if (!students.length) {
      return {
        totalStudents: 0,
        averageScore: 'N/A',
        averageProgress: 'N/A',
        struggling: 0,
        topStudents: [] as Student[]
      };
    }

    const totalStudents = students.length;
    const averageScore = (students.reduce((sum, s) => sum + (s.averageScore ?? 0), 0) / totalStudents).toFixed(1);
    const averageProgress = (students.reduce((sum, s) => sum + (s.progress ?? 0), 0) / totalStudents).toFixed(0);
    const struggling = students.filter((s) => s.isStruggling).length;
    const topStudents = [...students]
      .sort((a, b) => (b.averageScore ?? 0) - (a.averageScore ?? 0))
      .slice(0, 5);

    return { totalStudents, averageScore, averageProgress: `${averageProgress}%`, struggling, topStudents };
  }, [currentClassData]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">{t.title}</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">{t.subtitle}</p>
        </div>
        {classOptions.length > 0 && (
          <label className="flex flex-col text-sm text-slate-600 dark:text-slate-400">
            <span className="font-medium mb-1">{t.selectClass}</span>
            <select
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
            >
              {classOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>
        )}
      </header>

      {classEntries.length === 0 && (
        <div className="flex items-start gap-3 p-4 rounded-md bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-slate-700 dark:text-slate-200">
          <i className="fa-solid fa-circle-info mt-1" />
          <span>{t.demoNotice}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-between gap-4 p-4 rounded-md bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200">
          <span>{t.error}</span>
          <button
            className="px-3 py-1 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-500 transition-colors"
            onClick={() => window.location.reload()}
          >
            {t.retry}
          </button>
        </div>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-glass p-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">{t.totalStudents}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{analytics.totalStudents}</p>
        </div>
        <div className="card-glass p-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">{t.averageScore}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{analytics.averageScore}</p>
        </div>
        <div className="card-glass p-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">{t.averageProgress}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{analytics.averageProgress}</p>
        </div>
        <div className="card-glass p-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">{t.struggling}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{analytics.struggling}</p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-glass p-6">
          {loading ? (
            <div className="flex items-center justify-center h-40 text-slate-500 dark:text-slate-400">
              <i className="fa-solid fa-circle-notch animate-spin mr-3" />
              {t.loading}
            </div>
          ) : currentClassData ? (
            <ClassAnalyticsDetails classData={currentClassData} />
          ) : (
            <div className="flex items-center justify-center h-40 text-slate-500 dark:text-slate-400">
              {t.noStudents}
            </div>
          )}
        </div>

        <div className="card-glass p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            <i className="fa-solid fa-star mr-2 text-amber-500" />
            {t.topStudents}
          </h2>
          {analytics.topStudents.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">{t.noStudents}</p>
          ) : (
            <ul className="space-y-3">
              {analytics.topStudents.map((student) => (
                <li key={student.id} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 px-3 py-2 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-100">{student.name}</p>
                    <p className="text-xs text-slate-500">{(student.averageScore ?? 0).toFixed(1)}</p>
                  </div>
                  <span className="text-sm font-semibold text-green-500">{student.progress ?? 0}%</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default ClassAnalyticsDashboard;