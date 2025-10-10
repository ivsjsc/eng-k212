// components/TestCreator.tsx
import React, { useState } from 'react';
import { User, Test, TestQuestion, TestQuestionType } from '../types';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';

interface TestCreatorProps {
  user: User;
  courseId: string;
  unitId?: string;
  language: 'en' | 'vi';
  onClose: () => void;
  onTestCreated?: (test: Test) => void;
}

export const TestCreator: React.FC<TestCreatorProps> = ({
  user,
  courseId,
  unitId,
  language,
  onClose,
  onTestCreated,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [passingScore, setPassingScore] = useState(70);
  const [timeLimit, setTimeLimit] = useState(30);
  const [sscoreReward, setSscoreReward] = useState(20);
  const [questions, setQuestions] = useState<Omit<TestQuestion, 'id'>[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Omit<TestQuestion, 'id'>>({
    type: 'multiple_choice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    points: 10,
    explanation: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = {
    en: {
      createTest: 'Create Test',
      testInfo: 'Test Information',
      title: 'Title',
      description: 'Description',
      passingScore: 'Passing Score (%)',
      timeLimit: 'Time Limit (minutes)',
      sscoreReward: 'S-Score Reward',
      questions: 'Questions',
      addQuestion: 'Add Question',
      questionType: 'Question Type',
      multipleChoice: 'Multiple Choice',
      fillBlank: 'Fill in the Blank',
      essay: 'Essay',
      listening: 'Listening',
      speaking: 'Speaking',
      questionText: 'Question',
      options: 'Options',
      correctAnswer: 'Correct Answer',
      points: 'Points',
      explanation: 'Explanation (optional)',
      save: 'Save Question',
      cancel: 'Cancel',
      createTestBtn: 'Create Test',
      questionAdded: 'Question added!',
      testCreated: 'Test created successfully!',
      error: 'Error',
      required: 'This field is required',
      optionPlaceholder: 'Option',
    },
    vi: {
      createTest: 'Tạo bài kiểm tra',
      testInfo: 'Thông tin bài kiểm tra',
      title: 'Tiêu đề',
      description: 'Mô tả',
      passingScore: 'Điểm đạt (%)',
      timeLimit: 'Thời gian (phút)',
      sscoreReward: 'Thưởng S-Score',
      questions: 'Câu hỏi',
      addQuestion: 'Thêm câu hỏi',
      questionType: 'Loại câu hỏi',
      multipleChoice: 'Trắc nghiệm',
      fillBlank: 'Điền vào chỗ trống',
      essay: 'Tự luận',
      listening: 'Nghe',
      speaking: 'Nói',
      questionText: 'Câu hỏi',
      options: 'Các lựa chọn',
      correctAnswer: 'Đáp án đúng',
      points: 'Điểm',
      explanation: 'Giải thích (tùy chọn)',
      save: 'Lưu câu hỏi',
      cancel: 'Hủy',
      createTestBtn: 'Tạo bài kiểm tra',
      questionAdded: 'Đã thêm câu hỏi!',
      testCreated: 'Tạo bài kiểm tra thành công!',
      error: 'Lỗi',
      required: 'Trường này bắt buộc',
      optionPlaceholder: 'Lựa chọn',
    },
  }[language];

  const handleAddQuestion = () => {
    if (!currentQuestion.question.trim()) {
      setError(t.required);
      return;
    }

    if (currentQuestion.type === 'multiple_choice' && 
        (!currentQuestion.options || currentQuestion.options.some(o => !o.trim()))) {
      setError('All options are required for multiple choice questions');
      return;
    }

    const questionWithId = {
      ...currentQuestion,
      id: `q${questions.length + 1}`,
    } as TestQuestion;

    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      type: 'multiple_choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 10,
      explanation: '',
    });
    setError(null);
  };

  const handleCreateTest = async () => {
    if (!title.trim()) {
      setError('Test title is required');
      return;
    }

    if (questions.length === 0) {
      setError('Add at least one question');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const testData: Omit<Test, 'id'> = {
        courseId,
        unitId,
        title,
        description,
        questions: questions.map((q, idx) => ({ ...q, id: `q${idx + 1}` })),
        passingScore,
        timeLimit,
        sscoreReward,
        createdBy: user.id,
        createdAt: new Date().toISOString(),
        isPublished: true,
      };

      const docRef = await addDoc(collection(db, 'tests'), {
        ...testData,
        createdAt: serverTimestamp(),
      });

      const createdTest: Test = {
        ...testData,
        id: docRef.id,
      };

      if (onTestCreated) {
        onTestCreated(createdTest);
      }

      onClose();
    } catch (err) {
      console.error('Error creating test:', err);
      setError(err instanceof Error ? err.message : 'Failed to create test');
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionTypeChange = (type: TestQuestionType) => {
    setCurrentQuestion({
      ...currentQuestion,
      type,
      options: type === 'multiple_choice' ? ['', '', '', ''] : undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">{t.createTest}</h2>
              <p className="text-indigo-100 text-sm">
                {questions.length} {t.questions.toLowerCase()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="mb-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg flex items-center gap-2">
              <i className="fas fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
          )}

          {/* Test Info */}
          <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-5 mb-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              {t.testInfo}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t.title} *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Unit 1 Grammar Test"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t.description}
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Brief description of the test..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t.passingScore}
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={passingScore}
                  onChange={(e) => setPassingScore(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t.timeLimit}
                </label>
                <input
                  type="number"
                  min="1"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t.sscoreReward}
                </label>
                <input
                  type="number"
                  min="0"
                  value={sscoreReward}
                  onChange={(e) => setSscoreReward(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Questions List */}
          {questions.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                {t.questions} ({questions.length})
              </h3>
              <div className="space-y-3">
                {questions.map((q, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded text-xs font-medium">
                            Q{idx + 1}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {q.type.replace('_', ' ')} • {q.points} pts
                          </span>
                        </div>
                        <p className="text-slate-800 dark:text-white font-medium">
                          {q.question}
                        </p>
                        {q.type === 'multiple_choice' && q.options && (
                          <div className="mt-2 space-y-1">
                            {q.options.map((opt, optIdx) => (
                              <div
                                key={optIdx}
                                className={`text-sm ${
                                  opt === q.correctAnswer
                                    ? 'text-green-600 dark:text-green-400 font-medium'
                                    : 'text-slate-600 dark:text-slate-400'
                                }`}
                              >
                                {String.fromCharCode(65 + optIdx)}. {opt}
                                {opt === q.correctAnswer && ' ✓'}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => setQuestions(questions.filter((_, i) => i !== idx))}
                        className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add Question Form */}
          <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              {t.addQuestion}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t.questionType}
                </label>
                <select
                  value={currentQuestion.type}
                  onChange={(e) => handleQuestionTypeChange(e.target.value as TestQuestionType)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="multiple_choice">{t.multipleChoice}</option>
                  <option value="fill_blank">{t.fillBlank}</option>
                  <option value="essay">{t.essay}</option>
                  <option value="listening">{t.listening}</option>
                  <option value="speaking">{t.speaking}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t.questionText} *
                </label>
                <textarea
                  value={currentQuestion.question}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your question here..."
                />
              </div>

              {currentQuestion.type === 'multiple_choice' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {t.options} *
                  </label>
                  <div className="space-y-2">
                    {currentQuestion.options?.map((opt, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const newOptions = [...(currentQuestion.options || [])];
                          newOptions[idx] = e.target.value;
                          setCurrentQuestion({ ...currentQuestion, options: newOptions });
                        }}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder={`${t.optionPlaceholder} ${String.fromCharCode(65 + idx)}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t.correctAnswer} *
                </label>
                {currentQuestion.type === 'multiple_choice' ? (
                  <select
                    value={currentQuestion.correctAnswer}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select correct option...</option>
                    {currentQuestion.options?.map((opt, idx) => (
                      <option key={idx} value={opt}>
                        {String.fromCharCode(65 + idx)}. {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={currentQuestion.correctAnswer}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter correct answer..."
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {t.points}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={currentQuestion.points}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, points: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t.explanation}
                </label>
                <textarea
                  value={currentQuestion.explanation}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, explanation: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Why is this the correct answer?"
                />
              </div>

              <button
                onClick={handleAddQuestion}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <i className="fas fa-plus"></i>
                {t.save}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-6 bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {t.cancel}
            </button>
            <button
              onClick={handleCreateTest}
              disabled={loading || questions.length === 0}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Creating...
                </>
              ) : (
                <>
                  <i className="fas fa-check"></i>
                  {t.createTestBtn}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCreator;
