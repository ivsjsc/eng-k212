// components/TestTaking.tsx
import React, { useState, useEffect } from 'react';
import type { Test, TestQuestion, User } from '../types';
import { submitTest } from '../services/testService';

interface TestTakingProps {
  test: Test;
  user: User;
  onComplete: (score: number, passed: boolean) => void;
  onClose: () => void;
  language: 'en' | 'vi';
}

export const TestTaking: React.FC<TestTakingProps> = ({
  test,
  user,
  onComplete,
  onClose,
  language,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [timeRemaining, setTimeRemaining] = useState(test.timeLimit ? test.timeLimit * 60 : null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [startTime] = useState(Date.now());

  const currentQuestion = test.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  const t = {
    en: {
      question: 'Question',
      of: 'of',
      timeRemaining: 'Time Remaining',
      minutes: 'min',
      seconds: 'sec',
      answered: 'Answered',
      previous: 'Previous',
      next: 'Next',
      submit: 'Submit Test',
      confirmSubmit: 'Confirm Submission',
      confirmMessage: 'Are you sure you want to submit? You have answered',
      outOf: 'out of',
      questions: 'questions',
      cancel: 'Cancel',
      yesSubmit: 'Yes, Submit',
      selectAnswer: 'Select your answer',
      typeAnswer: 'Type your answer',
      submitting: 'Submitting...',
      timeUp: 'Time\'s Up!',
      autoSubmit: 'Test will be auto-submitted.',
    },
    vi: {
      question: 'Câu hỏi',
      of: 'trong số',
      timeRemaining: 'Thời gian còn lại',
      minutes: 'phút',
      seconds: 'giây',
      answered: 'Đã trả lời',
      previous: 'Trước',
      next: 'Tiếp',
      submit: 'Nộp bài',
      confirmSubmit: 'Xác nhận nộp bài',
      confirmMessage: 'Bạn chắc chắn muốn nộp bài? Bạn đã trả lời',
      outOf: 'trong số',
      questions: 'câu hỏi',
      cancel: 'Hủy',
      yesSubmit: 'Đồng ý, Nộp bài',
      selectAnswer: 'Chọn câu trả lời',
      typeAnswer: 'Nhập câu trả lời',
      submitting: 'Đang nộp bài...',
      timeUp: 'Hết giờ!',
      autoSubmit: 'Bài test sẽ tự động được nộp.',
    },
  }[language];

  // Timer countdown
  useEffect(() => {
    if (timeRemaining === null) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 0) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}${t.minutes} ${secs}${t.seconds}`;
  };

  const handleAnswerChange = (questionId: string, answer: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleAutoSubmit = async () => {
    await handleSubmitTest();
  };

  const handleSubmitTest = async () => {
    setIsSubmitting(true);

    const timeSpent = Math.floor((Date.now() - startTime) / 1000 / 60); // minutes

    try {
      const result = await submitTest(test.id, user.id, answers, timeSpent);

      if (result.success) {
        onComplete(result.score || 0, result.passed || false);
      } else {
        alert(result.error || 'Failed to submit test');
      }
    } catch (error) {
      console.error('Error submitting test:', error);
      alert('An error occurred while submitting the test');
    } finally {
      setIsSubmitting(false);
      setShowConfirmSubmit(false);
    }
  };

  const renderQuestion = (question: TestQuestion) => {
    const userAnswer = answers[question.id];

    switch (question.type) {
      case 'multiple_choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, idx) => (
              <label
                key={idx}
                className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  userAnswer === option
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={userAnswer === option}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="mt-1"
                />
                <span className="flex-1 text-slate-800 dark:text-slate-200">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'fill_blank':
        return (
          <div>
            <input
              type="text"
              value={typeof userAnswer === 'string' ? userAnswer : ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder={t.typeAnswer}
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        );

      case 'essay':
        return (
          <div>
            <textarea
              value={typeof userAnswer === 'string' ? userAnswer : ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder={t.typeAnswer}
              rows={6}
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        );

      default:
        return <div>Unsupported question type</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{test.title}</h2>
            {timeRemaining !== null && (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                timeRemaining < 300 ? 'bg-red-500/30 animate-pulse' : 'bg-white/20'
              }`}>
                <i className="fas fa-clock"></i>
                <span className="font-semibold">{formatTime(timeRemaining)}</span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>
                {t.question} {currentQuestionIndex + 1} {t.of} {test.questions.length}
              </span>
              <span>
                {t.answered}: {answeredCount}/{test.questions.length}
              </span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            {/* Question Number & Points */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {t.question} {currentQuestionIndex + 1}
              </span>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {currentQuestion.points} {language === 'vi' ? 'điểm' : 'points'}
              </span>
            </div>

            {/* Question Text */}
            <div className="mb-6">
              <p className="text-lg font-medium text-slate-800 dark:text-white leading-relaxed">
                {currentQuestion.question}
              </p>
            </div>

            {/* Answer Options */}
            {renderQuestion(currentQuestion)}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <i className="fas fa-chevron-left mr-2"></i>
              {t.previous}
            </button>

            <div className="flex items-center gap-2">
              {test.questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                    idx === currentQuestionIndex
                      ? 'bg-blue-600 text-white'
                      : answers[test.questions[idx].id]
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {currentQuestionIndex < test.questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all"
              >
                {t.next}
                <i className="fas fa-chevron-right ml-2"></i>
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmSubmit(true)}
                disabled={isSubmitting}
                className="px-6 py-2 rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 transition-all"
              >
                {isSubmitting ? t.submitting : t.submit}
                {!isSubmitting && <i className="fas fa-check ml-2"></i>}
              </button>
            )}
          </div>
        </div>

        {/* Confirm Submit Modal */}
        {showConfirmSubmit && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full shadow-2xl">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                {t.confirmSubmit}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {t.confirmMessage} <span className="font-semibold">{answeredCount}</span> {t.outOf}{' '}
                <span className="font-semibold">{test.questions.length}</span> {t.questions}.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  className="flex-1 px-4 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleSubmitTest}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? t.submitting : t.yesSubmit}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestTaking;
