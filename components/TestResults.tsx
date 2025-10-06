// components/TestResults.tsx
import React from 'react';
import type { Test } from '../types';

interface TestResultsProps {
  test: Test;
  score: number;
  passed: boolean;
  sscoreAwarded: number;
  onClose: () => void;
  onRetake?: () => void;
  language: 'en' | 'vi';
}

export const TestResults: React.FC<TestResultsProps> = ({
  test,
  score,
  passed,
  sscoreAwarded,
  onClose,
  onRetake,
  language,
}) => {
  const t = {
    en: {
      congratulations: 'Congratulations!',
      passed: 'You Passed!',
      failed: 'Not Passed',
      failedMessage: 'Keep practicing and try again!',
      yourScore: 'Your Score',
      passingScore: 'Passing Score',
      sscoreEarned: 'S-Score Earned',
      noReward: 'No S-Score awarded (did not pass)',
      close: 'Close',
      retake: 'Retake Test',
      performance: 'Performance',
      excellent: 'Excellent!',
      good: 'Good job!',
      needsImprovement: 'Needs improvement',
    },
    vi: {
      congratulations: 'Chúc mừng!',
      passed: 'Bạn đã đậu!',
      failed: 'Chưa đạt',
      failedMessage: 'Hãy luyện tập thêm và thử lại!',
      yourScore: 'Điểm của bạn',
      passingScore: 'Điểm đạt',
      sscoreEarned: 'S-Score nhận được',
      noReward: 'Không nhận S-Score (chưa đạt)',
      close: 'Đóng',
      retake: 'Làm lại',
      performance: 'Kết quả',
      excellent: 'Xuất sắc!',
      good: 'Tốt lắm!',
      needsImprovement: 'Cần cải thiện',
    },
  }[language];

  const getPerformanceLevel = () => {
    if (score >= 90) return { text: t.excellent, color: 'text-green-600' };
    if (score >= 70) return { text: t.good, color: 'text-blue-600' };
    return { text: t.needsImprovement, color: 'text-orange-600' };
  };

  const performance = getPerformanceLevel();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className={`p-8 text-white text-center ${
          passed
            ? 'bg-gradient-to-br from-green-500 to-emerald-600'
            : 'bg-gradient-to-br from-red-500 to-pink-600'
        }`}>
          <div className="mb-4">
            {passed ? (
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm">
                <i className="fas fa-trophy text-5xl"></i>
              </div>
            ) : (
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm">
                <i className="fas fa-times text-5xl"></i>
              </div>
            )}
          </div>
          <h2 className="text-3xl font-bold mb-2">
            {passed ? t.congratulations : t.failed}
          </h2>
          <p className="text-lg opacity-90">
            {passed ? t.passed : t.failedMessage}
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Test Title */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
              {test.title}
            </h3>
          </div>

          {/* Score Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Your Score */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 text-center border-2 border-blue-200 dark:border-blue-800">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                {t.yourScore}
              </p>
              <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {score}%
              </div>
              <p className={`text-sm font-semibold ${performance.color}`}>
                {performance.text}
              </p>
            </div>

            {/* Passing Score */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 text-center border-2 border-slate-200 dark:border-slate-600">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                {t.passingScore}
              </p>
              <div className="text-5xl font-bold text-slate-700 dark:text-slate-300 mb-2">
                {test.passingScore}%
              </div>
              <div className="flex items-center justify-center gap-2">
                {passed ? (
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    <i className="fas fa-check-circle mr-1"></i>
                    {t.passed}
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                    <i className="fas fa-times-circle mr-1"></i>
                    {t.failed}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* S-Score Reward */}
          <div className={`rounded-xl p-6 text-center mb-6 ${
            passed
              ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-300 dark:border-yellow-700'
              : 'bg-slate-100 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600'
          }`}>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              {t.sscoreEarned}
            </p>
            {passed ? (
              <div className="flex items-center justify-center gap-2">
                <i className="fas fa-star text-3xl text-yellow-500"></i>
                <span className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                  +{sscoreAwarded}
                </span>
              </div>
            ) : (
              <div className="text-slate-500 dark:text-slate-400">
                <i className="fas fa-ban text-2xl mb-2"></i>
                <p className="text-sm">{t.noReward}</p>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
              <span>0%</span>
              <span>{t.passingScore}: {test.passingScore}%</span>
              <span>100%</span>
            </div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  passed ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-orange-600'
                }`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-lg font-medium text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all"
            >
              {t.close}
            </button>
            {onRetake && !passed && (
              <button
                onClick={onRetake}
                className="flex-1 px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
              >
                <i className="fas fa-redo mr-2"></i>
                {t.retake}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResults;
