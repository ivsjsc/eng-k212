import React from 'react';
import type { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onSelect: () => void;
  isPinned: boolean;
  onPinToggle: () => void;
  language: 'en' | 'vi';
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect, isPinned, onPinToggle, language }) => {
  const handlePinClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card selection when pinning
    onPinToggle();
  };
  
  const translations = {
    en: {
      pin: "Pin course",
      unpin: "Unpin course",
      progress: "Progress"
    },
    vi: {
      pin: "Ghim khóa học",
      unpin: "Bỏ ghim khóa học",
      progress: "Tiến độ"
    }
  };
  const t = translations[language];

  return (
    <div 
      className="card-glass flex flex-col cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
      onClick={onSelect}
    >
      <div className="relative">
        <img className="w-full h-40 object-cover rounded-t-lg" src={course.imageUrl} alt={course.title} />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
        <button 
          onClick={handlePinClick}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
            isPinned ? 'bg-amber-400 text-white' : 'bg-white/30 text-white hover:bg-white/50'
          }`}
          title={isPinned ? t.unpin : t.pin}
        >
          <i className="fa-solid fa-thumbtack"></i>
        </button>
        <div className="absolute bottom-3 left-4">
            <span className="text-xs bg-black/50 text-white px-2 py-1 rounded">{course.series}</span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg mb-1 leading-tight">{course.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 flex-grow">{course.description}</p>
        
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-auto">
          <div className="h-2 rounded-full" style={{ width: `${course.progress}%`, backgroundColor: course.color }}></div>
        </div>
        <div className="flex justify-between text-xs mt-1 text-slate-500 dark:text-slate-400">
          <span>{t.progress}</span>
          <span>{course.progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CourseCard);