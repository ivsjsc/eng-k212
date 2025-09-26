import React, { useState } from 'react';
import type { Course, Unit as CurriculumUnit, Lesson, View } from '../types';
import LessonView from './LessonView';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
  language: 'en' | 'vi';
  setView: (view: View) => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack, language, setView }) => {
  const [expandedUnit, setExpandedUnit] = useState<number | null>(course.rawLevel.units[0]?.id || null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isUnitListOpen, setIsUnitListOpen] = useState(false);

  const toggleUnit = (unitId: number) => {
    setExpandedUnit(prev => (prev === unitId ? null : unitId));
  };
  
  if (selectedLesson) {
    return (
        <div>
            <button onClick={() => setSelectedLesson(null)} className="m-4 btn btn-secondary-outline">
                <i className="fa-solid fa-arrow-left mr-2"></i> {language === 'vi' ? 'Quay lại Khóa học' : 'Back to Course'}
            </button>
            <LessonView lesson={selectedLesson} language={language} setView={setView} />
        </div>
    );
  }

  const UnitList = () => (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{language === 'vi' ? 'Các bài học' : 'Units'}</h2>
        <div className="space-y-2">
            {course.rawLevel.units.map((unit: CurriculumUnit) => (
                <div key={unit.id}>
                    <button
                        onClick={() => toggleUnit(unit.id)}
                        className="w-full text-left p-3 rounded-lg flex justify-between items-center bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                        <span className="font-semibold">{language === 'vi' ? unit.title.vi : unit.title.en}</span>
                        <i className={`fa-solid fa-chevron-down transition-transform ${expandedUnit === unit.id ? 'rotate-180' : ''}`}></i>
                    </button>
                    {expandedUnit === unit.id && (
                        <ul className="mt-2 pl-4 space-y-1">
                            {unit.lessons.map(lesson => {
                                const mappedLesson: Lesson = {
                                    id: lesson.id.toString(),
                                    title: language === 'vi' ? lesson.title.vi : lesson.title.en,
                                    type: 'ebook',
                                    content: '',
                                    rawLesson: lesson
                                };
                                return (
                                    <li key={lesson.id}>
                                        <button onClick={() => {
                                            setSelectedLesson(mappedLesson);
                                            setIsUnitListOpen(false);
                                        }} className="w-full text-left p-2 rounded text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/50">
                                            {language === 'vi' ? lesson.title.vi : lesson.title.en}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="mb-6">
        <button onClick={onBack} className="btn btn-secondary-outline mb-4">
          <i className="fa-solid fa-arrow-left mr-2"></i> {language === 'vi' ? 'Tất cả khóa học' : 'All Courses'}
        </button>
        <div className="card-glass p-6 flex flex-col md:flex-row items-start gap-6">
            <img src={course.imageUrl} alt={course.title} className="w-full md:w-64 h-auto object-cover rounded-lg shadow-md" />
            <div className="flex-1">
                <h1 className="text-3xl font-bold mb-1">{course.title}</h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-3">{course.description}</p>
                <div className="flex items-center gap-4 text-sm mb-4">
                    <span className="font-semibold">{course.series}</span>
                    <span className="text-slate-500">•</span>
                    <span>{course.level}</span>
                </div>
                 <a href={course.rawLevel.ebookPdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <i className="fa-solid fa-book-reader mr-2"></i> {language === 'vi' ? 'Xem Ebook' : 'View Ebook'}
                 </a>
            </div>
        </div>
      </div>
      
      {/* Mobile "Show Units" button */}
      <div className="md:hidden mb-4">
        <button onClick={() => setIsUnitListOpen(true)} className="btn btn-secondary w-full">
          <i className="fa-solid fa-list-ul mr-2"></i> {language === 'vi' ? 'Hiển thị Danh sách Bài học' : 'Show Unit List'}
        </button>
      </div>
      
      {/* Mobile Unit List Drawer */}
      <div className={`fixed inset-0 z-40 md:hidden ${!isUnitListOpen && 'pointer-events-none'}`}>
        <div 
            className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity ${isUnitListOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsUnitListOpen(false)}
        ></div>
        <div className={`absolute inset-y-0 left-0 w-80 max-w-full bg-white dark:bg-slate-800 shadow-xl transform transition-transform custom-scrollbar overflow-y-auto ${isUnitListOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <UnitList />
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="hidden md:block md:col-span-1">
            <div className="card-glass sticky top-6">
                <UnitList />
            </div>
        </div>
        
        <div className="md:col-span-2">
             <div className="card-glass h-[80vh] flex flex-col">
                <div className="p-4 border-b dark:border-slate-700">
                    <h3 className="font-bold">{language === 'vi' ? 'Sách điện tử' : 'Ebook Viewer'}</h3>
                </div>
                 <iframe 
                    src={`${course.rawLevel.ebookPdfUrl.replace('/view?usp=sharing', '/preview').replace('/view?usp=drive_link', '/preview')}`}
                    className="w-full flex-grow border-0"
                    title={`${course.title} Ebook`}
                    allow="fullscreen"
                ></iframe>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;