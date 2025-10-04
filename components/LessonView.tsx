import React, { useState, useEffect } from 'react';
import type { Lesson, VocabularyItem, QuizQuestion, GeneratedSentence, View } from '../types';
import { 
  translateToVietnamese, 
  isAiConfigured 
} from '../services/aiContentService';
import {
  generateQuizCached as generateQuiz,
  generateSampleSentencesCached as generateSampleSentences,
  generateStoryStarterCached as generateStoryStarter
} from '../services/aiContentService';

interface LessonViewProps {
  lesson: Lesson;
  language: 'en' | 'vi';
  setView: (view: View) => void;
  // optional prop to indicate if the current user is on the free tier
  isFreeTier?: boolean;
}

import LessonQuickQuiz from './LessonQuickQuiz';
import LessonConversationPractice from './LessonConversationPractice';
import LessonAIAssistant from './LessonAIAssistant';

const LessonView: React.FC<LessonViewProps> = ({ lesson, language, setView, isFreeTier = true }) => {
  const [activeTab, setActiveTab] = useState('aims');
  const [translation, setTranslation] = useState<Record<string, string>>({});
  const [isTranslating, setIsTranslating] = useState<Record<string, boolean>>({});
  const [aiConfigured, setAiConfigured] = useState(false);
  
  // AI Tools State
  const [aiToolView, setAiToolView] = useState<'selection' | 'quiz' | 'sentences' | 'story'>('selection');
  const [aiData, setAiData] = useState<any>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  
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

  const handleTranslate = async (term: string) => {
    if (!aiConfigured) {
        // FIX: Updated alert message according to new API key policy.
        alert("AI features are not available. Please contact your administrator.");
        return;
    }
    if (translation[term]) return; // Already translated
    setIsTranslating(prev => ({ ...prev, [term]: true }));
    try {
      const translatedText = await translateToVietnamese(term);
      setTranslation(prev => ({ ...prev, [term]: translatedText }));
    } catch (error) {
      console.error("Translation failed:", error);
      setTranslation(prev => ({ ...prev, [term]: "Translation failed" }));
    } finally {
      setIsTranslating(prev => ({ ...prev, [term]: false }));
    }
  };

  const resetAiTool = () => {
    setAiToolView('selection');
    setAiData(null);
    setAiError(null);
    setRevealedAnswers({});
  };

  const handleGenerateQuiz = async () => {
    setAiToolView('quiz');
    setIsAiLoading(true);
    setAiError(null);
    try {
      const questions = await generateQuiz(lesson.rawLesson, language, {
        numQuestions: 5,
        difficulty: 'Intermediate',
        questionTypes: ['multiple-choice']
      });
      setAiData(questions);
    } catch (err) {
      setAiError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsAiLoading(false);
    }
  };
  
  const handleGenerateSentences = async () => {
    setAiToolView('sentences');
    setIsAiLoading(true);
    setAiError(null);
    try {
      const sentences = await generateSampleSentences(lesson.rawLesson, language);
      setAiData(sentences);
    } catch (err) {
      setAiError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsAiLoading(false);
    }
  };
  
  const handleGenerateStory = async () => {
    setAiToolView('story');
    setIsAiLoading(true);
    setAiError(null);
    try {
      const story = await generateStoryStarter(lesson.rawLesson, language);
      setAiData(story);
    } catch (err) {
      setAiError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsAiLoading(false);
    }
  };
  
  const renderVocabulary = (item: VocabularyItem) => (
    <div key={item.term} className="card-glass p-4 flex flex-col sm:flex-row items-center gap-4">
      {item.imageUrl && (
        <img src={item.imageUrl} alt={item.term} className="w-24 h-24 object-cover rounded-lg" />
      )}
      <div className="flex-1 text-center sm:text-left">
        <h4 className="text-xl font-bold">{item.term}</h4>
        <p className="text-slate-500 dark:text-slate-400">{item.pronunciation}</p>
        <p className="text-blue-600 dark:text-blue-400 font-medium">{item.vietnamese}</p>
         {language === 'en' && (
            <div className="mt-2">
                 <button 
                    onClick={() => handleTranslate(item.term)}
                    disabled={isTranslating[item.term] || !aiConfigured}
                    className="text-xs btn btn-secondary-outline"
                    title={!aiConfigured ? TABS[language].find(t => t.id === 'ai-tools')?.aiWarningBody : ''}
                  >
                     {isTranslating[item.term] ? 'Translating...' : (translation[item.term] ? translation[item.term] : `Translate with AI`)}
                 </button>
            </div>
         )}
      </div>
    </div>
  );
  
  // Helper component for compact premium tool buttons
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

  // FIX: Explicitly type TabButton as React.FC to resolve issue where TypeScript incorrectly treats the 'key' prop as a standard prop.
  const TabButton: React.FC<{ id: string, icon: string, label: string }> = ({ id, icon, label }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        if (id !== 'ai-tools') {
            resetAiTool();
        }
      }}
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
  
  // FIX: Updated AI warning messages to align with new API key policy.
  const TABS = {
    en: [
      { id: 'aims', icon: 'fa-bullseye-arrow', label: 'Lesson Aims' },
      { id: 'vocabulary', icon: 'fa-book-sparkles', label: 'Vocabulary' },
      { id: 'grammar', icon: 'fa-spell-check', label: 'Grammar' },
      { id: 'activities', icon: 'fa-pencil-ruler', label: 'Activities' },
      { id: 'ai-tools', icon: 'fa-robot', label: 'AI Tools', aiWarningBody: "AI features are not available. Please contact your administrator to enable them." },
    ],
    vi: [
      { id: 'aims', icon: 'fa-bullseye-arrow', label: 'Mục tiêu' },
      { id: 'vocabulary', icon: 'fa-book-sparkles', label: 'Từ vựng' },
      { id: 'grammar', icon: 'fa-spell-check', label: 'Ngữ pháp' },
      { id: 'activities', icon: 'fa-pencil-ruler', label: 'Hoạt động' },
      { id: 'ai-tools', icon: 'fa-robot', label: 'Công cụ AI', aiWarningBody: "Các tính năng AI không khả dụng. Vui lòng liên hệ quản trị viên để kích hoạt." },
    ]
  };
  const t = TABS[language];

  const renderAiToolContent = () => {
    if (!aiConfigured) {
        return (
            <div className="text-center p-8 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                <i className="fa-solid fa-triangle-exclamation text-4xl text-amber-500 mb-4"></i>
                <h3 className="text-xl font-bold text-amber-800 dark:text-amber-200">{t.find(tab => tab.id === 'ai-tools')?.label}</h3>
                <p className="text-amber-700 dark:text-amber-300 mt-2 mb-4">{t.find(tab => tab.id === 'ai-tools')?.aiWarningBody}</p>
                <button onClick={() => setView('settings')} className="btn bg-amber-500 hover:bg-amber-600 text-white">
                    <i className="fa-solid fa-cogs mr-2"></i> {language === 'vi' ? 'Xem trạng thái AI' : 'Check AI Status'}
                </button>
            </div>
        );
    }

    if (isAiLoading) {
      return (
        <div className="text-center py-8">
            <i className="fa-solid fa-robot text-4xl text-blue-500 animate-bounce"></i>
            <p className="mt-4 text-slate-500 dark:text-slate-400">{language === 'vi' ? 'AI đang làm việc...' : 'AI is working...'}</p>
        </div>
      );
    }
    
    if (aiError) {
        return (
            <div className="text-center p-6">
                <div className="alert-danger mb-4">{aiError}</div>
                <button onClick={resetAiTool} className="btn btn-secondary-outline">
                    <i className="fa-solid fa-arrow-left mr-2"></i> {language === 'vi' ? 'Thử lại' : 'Try Again'}
                </button>
            </div>
        );
    }
    
    switch (aiToolView) {
        case 'quiz':
            const quizData = aiData as QuizQuestion[] | null;
            return (
                <div>
                    <button onClick={resetAiTool} className="btn btn-secondary-outline mb-4 text-sm">
                        <i className="fa-solid fa-arrow-left mr-2"></i> {language === 'vi' ? 'Công cụ khác' : 'Other Tools'}
                    </button>
                    <div className="space-y-6">
                        {quizData?.map((q, index) => (
                            <div key={index} className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-lg">
                                <p className="font-semibold mb-3"><strong>{index + 1}.</strong> {q.question}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {q.options.map((opt, i) => (
                                        <div key={i} className={`p-2 rounded border-2 ${revealedAnswers[index] ? (opt === q.answer ? 'border-green-500 bg-green-100 dark:bg-green-900/50' : 'border-slate-300 dark:border-slate-600') : 'border-slate-300 dark:border-slate-600'}`}>
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-3 text-right">
                                    <button onClick={() => setRevealedAnswers(prev => ({ ...prev, [index]: !prev[index] }))} className="btn btn-secondary text-xs !py-1 !px-2">
                                        {revealedAnswers[index] ? (language === 'vi' ? 'Ẩn đáp án' : 'Hide Answer') : (language === 'vi' ? 'Hiện đáp án' : 'Show Answer')}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'sentences':
             const sentenceData = aiData as GeneratedSentence[] | null;
             return (
                <div>
                     <button onClick={resetAiTool} className="btn btn-secondary-outline mb-4 text-sm">
                        <i className="fa-solid fa-arrow-left mr-2"></i> {language === 'vi' ? 'Công cụ khác' : 'Other Tools'}
                    </button>
                    <div className="space-y-4">
                        {sentenceData?.map((s, index) => (
                            <div key={index} className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-lg">
                                <p className="text-lg mb-1">"{s.sentence}"</p>
                                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{language === 'vi' ? 'Tập trung vào' : 'Focus'}: {s.focus}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'story':
            return (
                <div>
                    <button onClick={resetAiTool} className="btn btn-secondary-outline mb-4 text-sm">
                        <i className="fa-solid fa-arrow-left mr-2"></i> {language === 'vi' ? 'Công cụ khác' : 'Other Tools'}
                    </button>
                    <div className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-lg prose prose-slate dark:prose-invert max-w-none">
                        <h4 className="!mt-0">{language === 'vi' ? 'Bắt đầu câu chuyện của bạn!' : 'Start Your Story!'}</h4>
                        <p>{aiData}</p>
                    </div>
                </div>
            );
        case 'selection':
        default:
            return (
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <button onClick={handleGenerateQuiz} className="card-glass p-6 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:shadow-lg hover:-translate-y-1 transition-all">
                        <i className="fa-solid fa-file-circle-question text-4xl text-blue-500 mb-3"></i>
                        <h4 className="font-bold">{language === 'vi' ? 'Tạo Câu đố' : 'Generate Quiz'}</h4>
                        <p className="text-xs text-slate-500 mt-1">{language === 'vi' ? 'Kiểm tra kiến thức bài học' : 'Test your lesson knowledge'}</p>
                    </button>
                    <button onClick={handleGenerateSentences} className="card-glass p-6 hover:bg-green-50 dark:hover:bg-green-900/30 hover:shadow-lg hover:-translate-y-1 transition-all">
                        <i className="fa-solid fa-comment-lines text-4xl text-green-500 mb-3"></i>
                        <h4 className="font-bold">{language === 'vi' ? 'Tạo câu mẫu' : 'Sample Sentences'}</h4>
                        <p className="text-xs text-slate-500 mt-1">{language === 'vi' ? 'Xem ví dụ về từ vựng & ngữ pháp' : 'See vocab & grammar in action'}</p>
                    </button>
                    <button onClick={handleGenerateStory} className="card-glass p-6 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:shadow-lg hover:-translate-y-1 transition-all">
                        <i className="fa-solid fa-feather-pointed text-4xl text-purple-500 mb-3"></i>
                        <h4 className="font-bold">{language === 'vi' ? 'Bắt đầu câu chuyện' : 'Story Starter'}</h4>
                        <p className="text-xs text-slate-500 mt-1">{language === 'vi' ? 'Lấy cảm hứng viết sáng tạo' : 'Get creative writing inspiration'}</p>
                    </button>
                </div>
            );
    }
  };


  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
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
              {activeTab === 'ai-tools' && renderAiToolContent()}
            </div>
          </div>
        </div>

        {/* Right column: ebook preview + compact AI tool buttons */}
        <aside className="space-y-4">
          <div className="card-glass p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <i className="fa-solid fa-book-open text-blue-500"></i>
              {language === 'vi' ? 'Sách điện tử' : 'E-book'}
            </h4>
            <div className="h-64 overflow-auto bg-white dark:bg-slate-900 rounded-md p-3 text-sm text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <p className="whitespace-pre-line">{lesson.rawLesson.bookExcerpt?.[language] ?? lesson.rawLesson.intro?.[language] ?? 'No preview available.'}</p>
            </div>
          </div>

          {/* Compact Premium Tools - click to expand */}
          <div className="card-glass p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <i className="fa-solid fa-sparkles text-purple-500"></i>
              {language === 'vi' ? 'Tiện ích Premium' : 'Premium Tools'}
            </h4>
            <div className="space-y-2">
              {/* Quick Quiz Button */}
              <PremiumToolButton
                icon="fa-clipboard-question"
                label={language === 'vi' ? 'Quiz Nhanh' : 'Quick Quiz'}
                color="purple"
                onClick={() => setShowQuizModal(true)}
              />
              {/* Conversation Practice Button */}
              <PremiumToolButton
                icon="fa-comments"
                label={language === 'vi' ? 'Luyện Hội thoại' : 'Conversation Practice'}
                color="green"
                onClick={() => setShowConversationModal(true)}
              />
              {/* AI Assistant Button */}
              <PremiumToolButton
                icon="fa-robot"
                label={language === 'vi' ? 'Trợ lý AI Bài học' : 'Lesson AI Assistant'}
                color="indigo"
                onClick={() => setShowAssistantModal(true)}
              />
            </div>
          </div>
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
              <LessonQuickQuiz language={language} isFreeTier={isFreeTier} lessonTitle={lesson.title} />
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
