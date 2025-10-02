import React from 'react';
import type { Course } from '../types';

interface RecommendedLessonsProps {
  recommendations: {
    course: Course;
    reason: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  onSelectCourse: (course: Course) => void;
  language: 'en' | 'vi';
}

const RecommendedLessons: React.FC<RecommendedLessonsProps> = ({
  recommendations,
  onSelectCourse,
  language
}) => {
  const t = {
    en: {
      title: 'Recommended for You',
      subtitle: 'Based on your learning progress',
      startLearning: 'Start Learning',
      highPriority: 'High Priority',
      mediumPriority: 'Medium Priority',
      lowPriority: 'Low Priority',
      noRecommendations: 'No recommendations available yet. Keep learning!'
    },
    vi: {
      title: 'Đề xuất cho bạn',
      subtitle: 'Dựa trên tiến độ học tập của bạn',
      startLearning: 'Bắt đầu học',
      highPriority: 'Ưu tiên cao',
      mediumPriority: 'Ưu tiên trung bình',
      lowPriority: 'Ưu tiên thấp',
      noRecommendations: 'Chưa có đề xuất nào. Hãy tiếp tục học tập!'
    }
  }[language];

  const priorityColors = {
    high: 'text-red-500 bg-red-50 dark:bg-red-900/30',
    medium: 'text-amber-500 bg-amber-50 dark:bg-amber-900/30',
    low: 'text-blue-500 bg-blue-50 dark:bg-blue-900/30'
  };

  const priorityLabels = {
    high: t.highPriority,
    medium: t.mediumPriority,
    low: t.lowPriority
  };

  return (
    <div className="card-glass p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
          <i className="fa-solid fa-lightbulb mr-2 text-yellow-500"></i>
          {t.title}
        </h3>
        <p className="text-sm text-slate-500 mt-1">{t.subtitle}</p>
      </div>

      {recommendations.length > 0 ? (
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:shadow-md transition-all cursor-pointer"
              onClick={() => onSelectCourse(rec.course)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">
                  {rec.course.title}
                </h4>
                <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[rec.priority]}`}>
                  {priorityLabels[rec.priority]}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                {rec.reason}
              </p>
              <button
                className="btn btn-sm btn-primary w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCourse(rec.course);
                }}
              >
                <i className="fa-solid fa-play mr-2"></i>
                {t.startLearning}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <i className="fa-solid fa-graduation-cap text-4xl text-slate-400 mb-3"></i>
          <p className="text-slate-500">{t.noRecommendations}</p>
        </div>
      )}
    </div>
  );
};

export default RecommendedLessons;
