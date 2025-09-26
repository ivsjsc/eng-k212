import React, { useState, useEffect } from 'react';
import { gradeWriting, isAiConfigured } from '../services/geminiService';
import type { WritingFeedback, View } from '../types';
import FeedbackSkeleton from './FeedbackSkeleton';

interface WritingGraderProps {
  language: 'en' | 'vi';
  setView: (view: View) => void;
}

const WritingGrader: React.FC<WritingGraderProps> = ({ language, setView }) => {
  const [topic, setTopic] = useState('');
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiConfigured, setAiConfigured] = useState(true);

  useEffect(() => {
    setAiConfigured(isAiConfigured());
  }, []);

  // FIX: Updated translations to reflect new API key policy.
  const t = {
    en: {
      title: "AI Writing Grader",
      subtitle: "Get instant feedback on your writing.",
      goToAiSettings: "Check AI Status",
      topicLabel: "Topic",
      topicPlaceholder: "e.g., My Summer Vacation",
      textLabel: "Your Text",
      textPlaceholder: "Write your essay or paragraph here...",
      buttonGrading: "Grading...",
      buttonGrade: "Grade My Writing",
      feedbackTitle: "Feedback",
      scoreLabel: "Overall Score",
      overallLabel: "Overall",
      grammarLabel: "Grammar",
      vocabularyLabel: "Vocabulary",
      coherenceLabel: "Coherence",
      placeholder: "Your feedback will appear here once you submit your text.",
      errorEmpty: "Please enter both a topic and your text.",
      aiWarningTitle: "AI Service Inactive",
      aiWarningBody: "AI features are not available because an API key has not been configured by the administrator.",
    },
    vi: {
      title: "AI Chấm bài viết",
      subtitle: "Nhận phản hồi tức thì về bài viết của bạn.",
      goToAiSettings: "Kiểm tra Trạng thái AI",
      topicLabel: "Chủ đề",
      topicPlaceholder: "VD: Kỳ nghỉ hè của tôi",
      textLabel: "Bài viết của bạn",
      textPlaceholder: "Viết bài luận hoặc đoạn văn của bạn vào đây...",
      buttonGrading: "Đang chấm...",
      buttonGrade: "Chấm bài của tôi",
      feedbackTitle: "Phản hồi",
      scoreLabel: "Điểm Tổng thể",
      overallLabel: "Tổng quan",
      grammarLabel: "Ngữ pháp",
      vocabularyLabel: "Từ vựng",
      coherenceLabel: "Mạch lạc",
      placeholder: "Phản hồi của bạn sẽ xuất hiện ở đây sau khi bạn nộp bài.",
      errorEmpty: "Vui lòng nhập cả chủ đề và bài viết.",
      aiWarningTitle: "Dịch vụ AI không hoạt động",
      aiWarningBody: "Các tính năng AI không khả dụng vì khóa API chưa được quản trị viên định cấu hình.",
    }
  }[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !text.trim()) {
      setError(t.errorEmpty);
      return;
    }
    setIsLoading(true);
    setError(null);
    setFeedback(null);
    try {
      const result = await gradeWriting(topic, text);
      setFeedback(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="text-center mb-8">
        <i className="fa-solid fa-pen-ruler text-5xl text-blue-500 mb-4"></i>
        <h1 className="text-4xl font-bold">{t.title}</h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">{t.subtitle}</p>
      </div>

      {!aiConfigured && (
        <div className="bg-amber-100 dark:bg-amber-900/50 border-l-4 border-amber-500 text-amber-800 dark:text-amber-200 p-4 rounded-r-lg mb-6 flex items-center justify-between gap-4 animate-fade-in">
          <div>
            <h4 className="font-bold">{t.aiWarningTitle}</h4>
            <p className="text-sm">{t.aiWarningBody}</p>
          </div>
          <button onClick={() => setView('settings')} className="btn bg-amber-500 hover:bg-amber-600 text-white flex-shrink-0">
            <i className="fa-solid fa-cogs mr-2"></i>
            {t.goToAiSettings}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card-glass p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="topic" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">{t.topicLabel}</label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="form-input"
                placeholder={t.topicPlaceholder}
                disabled={isLoading || !aiConfigured}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="text" className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">{t.textLabel}</label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="form-textarea h-64"
                placeholder={t.textPlaceholder}
                disabled={isLoading || !aiConfigured}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={isLoading || !aiConfigured}>
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin mr-2"></i>
                  {t.buttonGrading}
                </>
              ) : (
                <>
                  <i className="fa-solid fa-magic-sparkles mr-2"></i>
                  {t.buttonGrade}
                </>
              )}
            </button>
          </form>
        </div>

        <div className="flex flex-col">
          <div className="card-glass p-6 flex-grow">
            <h2 className="text-2xl font-bold mb-4">{t.feedbackTitle}</h2>
            {error && <div className="alert-danger">{error}</div>}
            {isLoading && <FeedbackSkeleton />}
            {feedback && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/50">
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t.scoreLabel}</p>
                    <p className={`text-6xl font-bold ${getScoreColor(feedback.score)}`}>{feedback.score}<span className="text-3xl">/100</span></p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold flex items-center"><i className="fa-solid fa-star text-amber-400 mr-2"></i>{t.overallLabel}</h3>
                  <p className="text-slate-700 dark:text-slate-300 mt-1">{feedback.overall}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold flex items-center"><i className="fa-solid fa-spell-check text-green-500 mr-2"></i>{t.grammarLabel}</h3>
                  <p className="text-slate-700 dark:text-slate-300 mt-1">{feedback.grammar}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold flex items-center"><i className="fa-solid fa-book-bookmark text-blue-500 mr-2"></i>{t.vocabularyLabel}</h3>
                  <p className="text-slate-700 dark:text-slate-300 mt-1">{feedback.vocabulary}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold flex items-center"><i className="fa-solid fa-stream text-purple-500 mr-2"></i>{t.coherenceLabel}</h3>
                  <p className="text-slate-700 dark:text-slate-300 mt-1">{feedback.coherence}</p>
                </div>
              </div>
            )}
            {!isLoading && !feedback && !error && (
                <div className="text-center text-slate-500 dark:text-slate-400 py-8">
                    <i className="fa-solid fa-file-lines text-4xl mb-4"></i>
                    <p>{t.placeholder}</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingGrader;
