import React, { useState, useEffect } from 'react';
import type { Lesson, VocabularyItem, QuizQuestion, GeneratedSentence, View } from '../types';
import { 
  translateToVietnamese, 
  isAiConfigured 
} from '../services/aiContentService';

interface LessonViewProps {
  lesson: Lesson;
  language: 'en' | 'vi';
  setView: (view: View) => void;
  // optional prop to indicate if the current user is on the free tier
  isFreeTier?: boolean;
  // optional course-level ebook PDF URL so the lesson view can show the full ebook side-by-side
  ebookPdfUrl?: string;
}

import LessonQuickQuiz from './LessonQuickQuiz';
import LessonConversationPractice from './LessonConversationPractice';
import LessonAIAssistant from './LessonAIAssistant';

const LessonView: React.FC<LessonViewProps> = ({ lesson, language, setView, isFreeTier = true, ebookPdfUrl }) => {
  const [activeTab, setActiveTab] = useState('aims');
  const [translation, setTranslation] = useState<Record<string, string>>({});
  const [isTranslating, setIsTranslating] = useState<Record<string, boolean>>({});
  const [aiConfigured, setAiConfigured] = useState(false);
  
  // Premium Tool Modals State
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showConversationModal, setShowConversationModal] = useState(false);
  const [showAssistantModal, setShowAssistantModal] = useState(false);

  useEffect(() => {
    setAiConfigured(isAiConfigured());
  }, []);
  
  const aims = lesson.rawLesson.aims[language];
  const grammar = lesson.rawLesson.grammar;
  const activities = lesson.rawLesson.activities;

  // Simple TABS definition for lesson sections
  const TABS = {
    en: [
      { id: 'aims', icon: 'fa-bullseye-arrow', label: 'Lesson Aims' },
      { id: 'vocabulary', icon: 'fa-book-sparkles', label: 'Vocabulary' },
      { id: 'grammar', icon: 'fa-spell-check', label: 'Grammar' },
      { id: 'activities', icon: 'fa-pencil-ruler', label: 'Activities' }
    ],
    vi: [
      { id: 'aims', icon: 'fa-bullseye-arrow', label: 'Mục tiêu' },
      { id: 'vocabulary', icon: 'fa-book-sparkles', label: 'Từ vựng' },
      { id: 'grammar', icon: 'fa-spell-check', label: 'Ngữ pháp' },
      { id: 'activities', icon: 'fa-pencil-ruler', label: 'Hoạt động' }
    ]
  };
  const t = TABS[language];

  // Tab button helper
  const TabButton: React.FC<{ id: string, icon: string, label: string }> = ({ id, icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 text-sm sm:text-base font-semibold border-b-4 transition-all duration-300 ${
        activeTab === id
          ? 'border-blue-500 text-blue-500'
          : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-200'
      }`}
    >
      <i className={`fa-solid ${icon}`}></i>
      <span>{label}</span>
    </button>
  );

  // render vocabulary item (compact)
  const renderVocabulary = (item: VocabularyItem) => (
    <div key={item.term} className="card-glass p-4 flex flex-col sm:flex-row items-center gap-4">
      {item.imageUrl && (
        <img src={item.imageUrl} alt={item.term} className="w-24 h-24 object-cover rounded-lg" />
      )}
      <div className="flex-1 text-center sm:text-left">
        <h4 className="text-xl font-bold">{item.term}</h4>
        <p className="text-slate-500 dark:text-slate-400">{item.pronunciation}</p>
        <p className="text-blue-600 dark:text-blue-400 font-medium">{item.vietnamese}</p>
      </div>
    </div>
  );

  // PremiumToolButton (used elsewhere previously)
  const PremiumToolButton: React.FC<{ icon: string, label: string, color: string, onClick: () => void }> = ({ icon, label, color, onClick }) => {
    const colorMap: Record<string, string> = {
      purple: 'hover:bg-purple-50 dark:hover:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      green: 'hover:bg-green-50 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400',
      indigo: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
    };
    return (
      <button 
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition-all hover:shadow-md hover:-translate-y-0.5 ${colorMap[color]}`}
      >
        <i className={`fa-solid ${icon} text-xl`}></i>
        <span className="font-semibold text-sm">{label}</span>
        <i className="fa-solid fa-chevron-right ml-auto text-xs opacity-50"></i>
      </button>
    );
  };


  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
      {/* Premium Tools banner */}
      <div className="w-full flex justify-center mb-3">
        <div className="px-6 py-2 rounded-md bg-gradient-to-r from-slate-800 to-slate-900 text-white font-semibold shadow-md border border-slate-700">
          Premium Tools
        </div>
      </div>

      {/* Pill toolbar for premium tool quick actions */}
      <div className="flex items-center justify-center md:justify-end gap-3 mb-6">
        <button onClick={() => setShowQuizModal(true)} className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-sm hover:opacity-95">
          <i className="fa-solid fa-clipboard-question mr-2"></i> {language === 'vi' ? 'Quiz Nhanh' : 'Quick Quiz'}
        </button>
        <button onClick={() => setShowConversationModal(true)} className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-green-500 to-green-400 text-white shadow-sm hover:opacity-95">
          <i className="fa-solid fa-comments mr-2"></i> {language === 'vi' ? 'Luyện Hội thoại' : 'Conversation Practice'}
        </button>
        <button onClick={() => setShowAssistantModal(true)} className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-sm hover:opacity-95">
          <i className="fa-solid fa-robot mr-2"></i> {language === 'vi' ? 'Trợ lý AI Bài học' : 'Lesson AI Assistant'}
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main lesson content - left two columns on large screens */}
        <div className="lg:col-span-2">
          <div className="card-glass p-0 mb-6">
            <div className="flex flex-wrap sm:flex-nowrap border-b border-slate-200 dark:border-slate-700">
              {t.map(tab => (
                <TabButton key={tab.id} id={tab.id} icon={tab.icon} label={tab.label} />
              ))}
            </div>
            
            <div className="p-6 animate-fade-in min-h-[300px]">
              {activeTab === 'aims' && (
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <ul className="list-disc list-inside space-y-2">
                    {aims.map((aim, index) => <li key={index}>{aim}</li>)}
                  </ul>
                </div>
              )}

              {activeTab === 'vocabulary' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lesson.rawLesson.vocabulary.map(renderVocabulary)}
                </div>
              )}

              {activeTab === 'grammar' && (
                <div className="space-y-6">
                  {grammar.map((point, index) => (
                    <div key={index} className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-3">{point.title[language]}</h3>
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                          {point.explanation[language].map((line, i) => <p key={i}>{line}</p>)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'activities' && (
                 <div className="space-y-6">
                  {activities.map((activity, index) => (
                    <div key={index} className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-3">{activity.type}</h3>
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                          {activity.description[language].map((line, i) => <p key={i}>{line}</p>)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* AI tools moved to premium modals; no inline AI tools here */}
            </div>
          </div>
        </div>

  {/* Right column: ebook viewer */}
        <aside className="space-y-4">
          <div className="card-glass p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <i className="fa-solid fa-book-open text-blue-500"></i>
              {language === 'vi' ? 'Sách điện tử' : 'E-book'}
            </h4>
            {ebookPdfUrl ? (
              <div className="h-[60vh] bg-white dark:bg-slate-900 rounded-md overflow-hidden border border-slate-200 dark:border-slate-700">
                <iframe
                  src={`${ebookPdfUrl.replace('/view?usp=sharing', '/preview').replace('/view?usp=drive_link', '/preview')}`}
                  className="w-full h-full border-0"
                  title={`${lesson.title} Ebook`}
                  allow="fullscreen"
                ></iframe>
              </div>
            ) : (
              <div className="h-64 overflow-auto bg-white dark:bg-slate-900 rounded-md p-3 text-sm text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <p className="whitespace-pre-line">{lesson.rawLesson.bookExcerpt?.[language] ?? lesson.rawLesson.intro?.[language] ?? 'No preview available.'}</p>
              </div>
            )}
          </div>

          {/* (premium tools moved to top toolbar) */}
        </aside>
      </div>

      {/* Premium Tool Modals */}
      {showQuizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl">
            <button
              onClick={() => setShowQuizModal(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-700/80 hover:bg-slate-600 text-white flex items-center justify-center transition-all hover:scale-110 z-10"
            >
              <i className="fa-solid fa-times"></i>
            </button>
            <div className="p-6">
              <LessonQuickQuiz 
                language={language} 
                isFreeTier={isFreeTier} 
                lessonTitle={lesson.title}
                grade={lesson.grade}
              />
            </div>
          </div>
        </div>
      )}

      {showConversationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl">
            <button
              onClick={() => setShowConversationModal(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-700/80 hover:bg-slate-600 text-white flex items-center justify-center transition-all hover:scale-110 z-10"
            >
              <i className="fa-solid fa-times"></i>
            </button>
            <div className="p-6">
              <LessonConversationPractice language={language} isFreeTier={isFreeTier} lessonTitle={lesson.title} />
            </div>
          </div>
        </div>
      )}

      {showAssistantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl">
            <button
              onClick={() => setShowAssistantModal(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-700/80 hover:bg-slate-600 text-white flex items-center justify-center transition-all hover:scale-110 z-10"
            >
              <i className="fa-solid fa-times"></i>
            </button>
            <div className="p-6">
              <LessonAIAssistant language={language} isFreeTier={isFreeTier} lessonTitle={lesson.title} lessonContent={lesson.rawLesson.intro?.[language] ?? ''} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonView;
