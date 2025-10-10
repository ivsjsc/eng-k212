// components/TestTaker.tsx
import React, { useState, useEffect } from 'react';
import { User, Test, TestResult, TestQuestion } from '../types';
import { collection, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { awardSScore } from '../services/sscoreService';

interface TestTakerProps {
  user: User;
  test: Test;
  language: 'en' | 'vi';
  onClose: () => void;
  onComplete?: (result: TestResult) => void;
}

export const TestTaker: React.FC<TestTakerProps> = ({
  user,
  test,
  language,
  onClose,
  onComplete,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [timeRemaining, setTimeRemaining] = useState(test.timeLimit ? test.timeLimit * 60 : 0);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(false);

  const t = {
    en: {
      question: 'Question',
      of: 'of',
      timeRemaining: 'Time Remaining',
      minutes: 'min',
      seconds: 'sec',
      previous: 'Previous',
      next: 'Next',
      submit: 'Submit Test',
      confirmSubmit: 'Are you sure you want to submit? You cannot change answers after submission.',
      yourAnswer: 'Your Answer',
      correctAnswer: 'Correct Answer',
      explanation: 'Explanation',
      score: 'Your Score',
      passed: 'Passed',
      failed: 'Failed',
      congratulations: 'Congratulations!',
      tryAgain: 'Keep practicing!',
      sscoreAwarded: 'S-Score Awarded',
      viewResults: 'View Detailed Results',
      backToCourse: 'Back to Course',
      selectOption: 'Select an option',
      writeAnswer: 'Write your answer here...',
    },
    vi: {
      question: 'Câu hỏi',
      of: 'trong',
      timeRemaining: 'Thời gian còn lại',
      minutes: 'phút',
      seconds: 'giây',
      previous: 'Trước',
      next: 'Tiếp',
      submit: 'Nộp bài',
      confirmSubmit: 'Bạn có chắc muốn nộp bài? Không thể thay đổi sau khi nộp.',
      yourAnswer: 'Câu trả lời của bạn',
      correctAnswer: 'Đáp án đúng',
      explanation: 'Giải thích',
      score: 'Điểm của bạn',
      passed: 'Đạt',
      failed: 'Chưa đạt',
      congratulations: 'Chúc mừng!',
      tryAgain: 'Cố gắng lần sau!',
      sscoreAwarded: 'S-Score nhận được',
      viewResults: 'Xem kết quả chi tiết',
      backToCourse: 'Về khóa học',
      selectOption: 'Chọn một đáp án',
      writeAnswer: 'Viết câu trả lời tại đây...',
    },
  }[language];

  useEffect(() => {
    if (test.timeLimit && timeRemaining > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining, showResults]);

  const currentQuestion = test.questions[currentQuestionIndex];

  const handleAnswerChange = (questionId: string, answer: string | string[]) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const calculateScore = (): number => {
    let totalPoints = 0;
    let earnedPoints = 0;

    test.questions.forEach((q) => {
      totalPoints += q.points;
      const userAnswer = answers[q.id];
      
      if (!userAnswer) return;

      if (q.type === 'multiple_choice') {
        if (userAnswer === q.correctAnswer) {
          earnedPoints += q.points;
        }
      } else if (q.type === 'fill_blank') {
        const correctAnswers = Array.isArray(q.correctAnswer) 
          ? q.correctAnswer 
          : [q.correctAnswer];
        const userAnswerStr = String(userAnswer).trim().toLowerCase();
        
        if (correctAnswers.some(ca => 
          String(ca).trim().toLowerCase() === userAnswerStr
        )) {
          earnedPoints += q.points;
        }
      }
      // Essay, listening, speaking need manual grading
    });

    return totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
  };

  const handleSubmit = async () => {
    if (!window.confirm(t.confirmSubmit)) {
      return;
    }

    setLoading(true);

    try {
      const score = calculateScore();
      const passed = score >= test.passingScore;
      const timeSpent = test.timeLimit ? test.timeLimit - Math.floor(timeRemaining / 60) : 0;

      const testResult: Omit<TestResult, 'id'> = {
        testId: test.id,
        userId: user.id,
        answers,
        score,
        passed,
        timeSpent,
        completedAt: new Date().toISOString(),
        sscoreAwarded: passed ? test.sscoreReward : 0,
      };

      const docRef = await addDoc(collection(db, 'testResults'), {
        ...testResult,
        completedAt: serverTimestamp(),
      });

      const resultWithId: TestResult = {
        ...testResult,
        id: docRef.id,
      };

      // Award S-Score if passed
      if (passed) {
        await awardSScore(user.id, 'test_passed', {
          testId: test.id,
          score,
          courseId: test.courseId,
        });

        // Update user stats
        await updateDoc(doc(db, 'users', user.id), {
          totalTestsPassed: (user.totalTestsPassed || 0) + 1,
        });
      }

      setResult(resultWithId);
      setShowResults(true);

      if (onComplete) {
        onComplete(resultWithId);
      }
    } catch (error) {
      console.error('Error submitting test:', error);
      alert('Failed to submit test. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}${t.minutes} ${secs}${t.seconds}`;
  };

  if (showResults && result) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Results Header */}
          <div className={`p-6 text-white ${
            result.passed 
              ? 'bg-gradient-to-r from-green-600 to-emerald-600'
              : 'bg-gradient-to-r from-orange-600 to-red-600'
          }`}>
            <div className="text-center">
              <div className="text-6xl mb-4">
                {result.passed ? '🎉' : '📚'}
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {result.passed ? t.congratulations : t.tryAgain}
              </h2>
              <div className="text-5xl font-black mb-2">
                {result.score}%
              </div>
              <div className="text-xl font-medium">
                {result.passed ? t.passed : t.failed}
              </div>
              {result.passed && result.sscoreAwarded && (
                <div className="mt-4 bg-white/20 rounded-lg py-3 px-6 inline-block">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-star text-yellow-300 text-2xl"></i>
                    <span className="text-2xl font-bold">+{result.sscoreAwarded}</span>
                    <span className="text-lg">{t.sscoreAwarded}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Results */}
          <div className="flex-1 overflow-y-auto p-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
              {t.viewResults}
            </h3>

            <div className="space-y-4">
              {test.questions.map((q, idx) => {
                const userAnswer = answers[q.id];
                const isCorrect = userAnswer === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`bg-white dark:bg-slate-700 rounded-xl p-5 border-2 ${
                      isCorrect
                        ? 'border-green-500 dark:border-green-600'
                        : 'border-red-500 dark:border-red-600'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm font-medium">
                          Q{idx + 1}
                        </span>
                        <span className={`text-lg ${
                          isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {isCorrect ? '✓' : '✗'}
                        </span>
                      </div>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {q.points} pts
                      </span>
                    </div>

                    <p className="text-slate-800 dark:text-white font-medium mb-3">
                      {q.question}
                    </p>

                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          {t.yourAnswer}:
                        </span>
                        <p className={`mt-1 ${
                          isCorrect 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {userAnswer || '(No answer)'}
                        </p>
                      </div>

                      {!isCorrect && (
                        <div>
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            {t.correctAnswer}:
                          </span>
                          <p className="text-green-600 dark:text-green-400 mt-1">
                            {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer}
                          </p>
                        </div>
                      )}

                      {q.explanation && (
                        <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                          <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                            {t.explanation}:
                          </span>
                          <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                            {q.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 dark:border-slate-700 p-6 bg-slate-50 dark:bg-slate-900">
            <button
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              {t.backToCourse}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">{test.title}</h2>
              <p className="text-indigo-100 text-sm">
                {t.question} {currentQuestionIndex + 1} {t.of} {test.questions.length}
              </p>
            </div>
            {test.timeLimit && (
              <div className="text-right">
                <div className="text-sm text-indigo-100 mb-1">{t.timeRemaining}</div>
                <div className={`text-2xl font-bold ${
                  timeRemaining < 300 ? 'text-red-300' : ''
                }`}>
                  {formatTime(timeRemaining)}
                </div>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / test.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-medium flex-shrink-0">
                  {currentQuestion.points} pts
                </span>
                <p className="text-lg text-slate-800 dark:text-white font-medium flex-1">
                  {currentQuestion.question}
                </p>
              </div>

              {/* Answer Options */}
              {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        answers[currentQuestion.id] === option
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                          : 'border-slate-200 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        value={option}
                        checked={answers[currentQuestion.id] === option}
                        onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                        className="w-5 h-5 text-indigo-600"
                      />
                      <span className="flex-1 text-slate-800 dark:text-white">
                        <span className="font-medium mr-2">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {(currentQuestion.type === 'fill_blank' || currentQuestion.type === 'essay') && (
                <textarea
                  value={String(answers[currentQuestion.id] || '')}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  rows={currentQuestion.type === 'essay' ? 6 : 2}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder={t.writeAnswer}
                />
              )}
            </div>

            {/* Question Navigation Grid */}
            <div className="bg-white dark:bg-slate-700 rounded-xl p-4 mb-4">
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">
                Quick Navigation:
              </div>
              <div className="grid grid-cols-10 gap-2">
                {test.questions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`aspect-square rounded-lg font-medium text-sm transition-all ${
                      idx === currentQuestionIndex
                        ? 'bg-indigo-600 text-white'
                        : answers[q.id]
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-500'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-6 bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              {t.previous}
            </button>

            <div className="text-sm text-slate-600 dark:text-slate-400">
              {Object.keys(answers).length} / {test.questions.length} answered
            </div>

            {currentQuestionIndex < test.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
              >
                {t.next}
                <i className="fas fa-arrow-right ml-2"></i>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check mr-2"></i>
                    {t.submit}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestTaker;
