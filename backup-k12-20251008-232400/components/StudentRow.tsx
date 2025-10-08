import React from 'react';
import { Student } from '../types';

interface StudentRowProps {
  student: Student;
  onReportClick: () => void;
  language: 'en' | 'vi';
}

const StudentRow: React.FC<StudentRowProps> = ({ student, onReportClick, language }) => {
  const t = {
    en: {
      avgScore: "Avg.",
      viewReport: "Report",
    },
    vi: {
      avgScore: "Điểm TB",
      viewReport: "Báo cáo",
    }
  }[language];

  return (
    <div className="flex items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50">
      <img className="w-10 h-10 rounded-full mr-3" src={student.avatar} alt={student.name} />
      <div className="flex-grow">
        <p className="font-semibold">{student.name}</p>
        <p className="text-xs text-slate-500">
          {t.avgScore}: <span className="font-bold">{student.averageScore}</span>
          {student.isStruggling && <i className="fa-solid fa-triangle-exclamation text-amber-500 ml-2"></i>}
        </p>
      </div>
      <button onClick={onReportClick} className="btn btn-secondary-outline !py-1 !px-3 text-xs">
        {t.viewReport}
      </button>
    </div>
  );
};

export default StudentRow;