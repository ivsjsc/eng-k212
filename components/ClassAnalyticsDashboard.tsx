import React, { useMemo } from 'react';
import { ClassData, Student, Classes } from '../types';

interface ClassAnalyticsDashboardProps {
  classes: Classes;
  language: 'en' | 'vi';
}

const ClassAnalyticsDashboard: React.FC<ClassAnalyticsDashboardProps> = ({ classes, language }) => {
  const t = {
    en: {
      title: "Analytics & Insights",
      subtitle: "Comprehensive overview of class performance and engagement",
      overviewTitle: "Overview",
      totalStudents: "Total Students",
      totalClasses: "Total Classes",
      averageGrade: "Average Grade",
      attendanceRate: "Attendance Rate",
      classPerformance: "Class Performance",
      classHeader: "Class",
      studentsHeader: "Students",
      avgGradeHeader: "Avg Grade",
      topPerformers: "Top Performers",
      needsAttention: "Needs Attention",
      engagementMetrics: "Engagement Metrics",
      assignmentCompletion: "Assignment Completion",
      activeStudents: "Active Students",
      trend: "Trend",
      improving: "Improving",
      stable: "Stable",
      declining: "Declining",
      noData: "No data available yet",
      viewDetails: "View Details"
    },
    vi: {
      title: "Phân tích & Thống kê",
      subtitle: "Tổng quan toàn diện về hiệu suất và tương tác của lớp",
      overviewTitle: "Tổng quan",
      totalStudents: "Tổng số Học sinh",
      totalClasses: "Tổng số Lớp",
      averageGrade: "Điểm Trung bình",
      attendanceRate: "Tỷ lệ Điểm danh",
      classPerformance: "Hiệu suất Lớp học",
      classHeader: "Lớp",
      studentsHeader: "Học sinh",
      avgGradeHeader: "Điểm TB",
      topPerformers: "Học sinh Xuất sắc",
      needsAttention: "Cần Chú ý",
      engagementMetrics: "Chỉ số Tương tác",
      assignmentCompletion: "Hoàn thành Bài tập",
      activeStudents: "Học sinh Tích cực",
      trend: "xu hướng",
      improving: "Cải thiện",
      stable: "Ổn định",
      declining: "Giảm sút",
      noData: "Chưa có dữ liệu",
      viewDetails: "Xem Chi tiết"
    }
  }[language];

  const analytics = useMemo(() => {
    const classDataArray = Object.values(classes) as ClassData[];
    const totalStudents = classDataArray.reduce((sum, c) => sum + c.students.length, 0);
    const totalClasses = classDataArray.length;
    
    // Calculate average grade across all students
    let totalGrade = 0;
    let studentCount = 0;
    classDataArray.forEach(classData => {
      classData.students.forEach(student => {
        totalGrade += student.averageScore;
        studentCount++;
      });
    });
    const averageGrade = studentCount > 0 ? (totalGrade / studentCount).toFixed(1) : 'N/A';

    // Mock attendance rate (in a real system, this would be calculated from actual attendance data)
    const attendanceRate = '94.5%';

    // Get top performers (students with highest grades)
    const allStudents: (Student & { className: string })[] = [];
    Object.entries(classes).forEach(([classId, classData]) => {
      (classData as ClassData).students.forEach(student => {
        allStudents.push({ ...student, className: (classData as ClassData).name });
      });
    });
    
    const topPerformers = allStudents
      .sort((a, b) => b.averageScore - a.averageScore)
      .slice(0, 5);

    const needsAttention = allStudents
      .filter(s => s.isStruggling)
      .sort((a, b) => a.averageScore - b.averageScore)
      .slice(0, 5);

    // Class-level performance
    const classPerformance = classDataArray.map(classData => {
      const students = classData.students;
      const avgGrade = students.length > 0
        ? (students.reduce((sum, s) => sum + s.averageScore, 0) / students.length).toFixed(1)
        : 'N/A';
      
      return {
        name: classData.name,
        studentCount: students.length,
        avgGrade,
        struggling: students.filter(s => s.isStruggling).length
      };
    });

    return {
      totalStudents,
      totalClasses,
      averageGrade,
      attendanceRate,
      topPerformers,
      needsAttention,
      classPerformance
    };
  }, [classes]);

  if (Object.keys(classes).length === 0) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
        <div className="text-center py-12">
          <i className="fa-solid fa-chart-line text-6xl text-slate-400 mb-4"></i>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">{t.title}</h2>
          <p className="text-slate-500">{t.noData}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">{t.title}</h1>
        <p className="mt-1 text-lg text-slate-600 dark:text-slate-400">{t.subtitle}</p>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card-glass p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{t.totalStudents}</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{analytics.totalStudents}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <i className="fa-solid fa-users text-blue-500 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="card-glass p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{t.totalClasses}</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{analytics.totalClasses}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <i className="fa-solid fa-school text-green-500 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="card-glass p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{t.averageGrade}</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{analytics.averageGrade}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <i className="fa-solid fa-star text-amber-500 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="card-glass p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{t.attendanceRate}</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{analytics.attendanceRate}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <i className="fa-solid fa-calendar-check text-purple-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Class Performance */}
        <div className="card-glass p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            <i className="fa-solid fa-chart-bar mr-2 text-blue-500"></i>
            {t.classPerformance}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b dark:border-slate-700">
                  <th className="text-left p-2 font-semibold">{t.classHeader}</th>
                  <th className="text-center p-2 font-semibold">{t.studentsHeader}</th>
                  <th className="text-center p-2 font-semibold">{t.avgGradeHeader}</th>
                  <th className="text-center p-2 font-semibold">{t.needsAttention}</th>
                </tr>
              </thead>
              <tbody>
                {analytics.classPerformance.map((cp, index) => (
                  <tr key={index} className="border-b dark:border-slate-700 last:border-b-0">
                    <td className="p-2 font-medium">{cp.name}</td>
                    <td className="p-2 text-center">{cp.studentCount}</td>
                    <td className="p-2 text-center">
                      <span className={`font-bold ${
                        parseFloat(cp.avgGrade) >= 8 ? 'text-green-500' :
                        parseFloat(cp.avgGrade) >= 6 ? 'text-amber-500' :
                        'text-red-500'
                      }`}>
                        {cp.avgGrade}
                      </span>
                    </td>
                    <td className="p-2 text-center">
                      {cp.struggling > 0 && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-full text-xs font-medium">
                          {cp.struggling}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Performers */}
        <div className="card-glass p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            <i className="fa-solid fa-trophy mr-2 text-amber-500"></i>
            {t.topPerformers}
          </h2>
          <div className="space-y-3">
            {analytics.topPerformers.map((student, index) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-sm mr-3">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-xs text-slate-500">{student.className}</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-green-500">{student.averageScore.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Students Needing Attention */}
      {analytics.needsAttention.length > 0 && (
        <div className="card-glass p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            <i className="fa-solid fa-triangle-exclamation mr-2 text-red-500"></i>
            {t.needsAttention}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analytics.needsAttention.map(student => (
              <div key={student.id} className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/10">
                <div className="flex items-center mb-2">
                  <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full mr-3" />
                  <div className="flex-1">
                    <p className="font-medium">{student.name}</p>
                    <p className="text-xs text-slate-500">{student.className}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">{t.avgGradeHeader}:</span>
                  <span className="font-bold text-red-500">{student.averageScore.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassAnalyticsDashboard;
