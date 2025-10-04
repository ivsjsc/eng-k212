import React, { useState } from 'react';
import { lessonPremiumDemos } from '../data/lesson-premium-demos';
import PricingModal from './PricingModal';

interface Props {
  language: 'en' | 'vi';
  isFreeTier: boolean;
  lessonTitle: string;
}

const LessonQuickQuiz: React.FC<Props> = ({ language, isFreeTier, lessonTitle }) => {
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<number, boolean>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const demo = lessonPremiumDemos[language].quickQuiz;

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (isFreeTier) {
      setShowPricingModal(true);
      return;
    }
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: optionIndex });
  };

  const handleCheckAnswer = (questionIndex: number) => {
    if (isFreeTier) {
      setShowPricingModal(true);
      return;
    }
    setShowExplanations({ ...showExplanations, [questionIndex]: true });
  };

  const calculateScore = () => {
    let correct = 0;
    demo.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) correct++;
    });
    return correct;
  };

  const t = {
    en: {
      generateQuiz: 'Generate Quiz',
      checkAnswer: 'Check Answer',
      showExplanation: 'Show Explanation',
      correct: 'Correct!',
      incorrect: 'Incorrect',
      score: 'Your Score',
      tryAgain: 'Try Again',
      upgrade: 'Upgrade to Premium',
      demoNotice: '⚡ This is a demo quiz. Upgrade for unlimited AI-generated quizzes!',
      premiumFeatures: 'Premium Features:',
      question: 'Question'
    },
    vi: {
      generateQuiz: 'Tạo Quiz',
      checkAnswer: 'Kiểm Tra',
      showExplanation: 'Xem Giải Thích',
      correct: 'Đúng!',
      incorrect: 'Sai',
      score: 'Điểm Của Bạn',
      tryAgain: 'Thử Lại',
      upgrade: 'Nâng Cấp Premium',
      demoNotice: '⚡ Đây là quiz mẫu. Nâng cấp để có quiz AI không giới hạn!',
      premiumFeatures: 'Tính Năng Premium:',
      question: 'Câu hỏi'
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-glass p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {demo.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-1">{demo.subtitle}</p>
          </div>
          {isFreeTier && (
            <span className="badge-free px-3 py-1 text-sm">DEMO</span>
          )}
        </div>

        {isFreeTier && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4 mb-4">
            <p className="text-purple-800 dark:text-purple-200 text-sm">
              {t[language].demoNotice}
            </p>
          </div>
        )}
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {demo.questions.map((question, qIdx) => (
          <div key={qIdx} className="card-glass p-6">
            <div className="flex items-start gap-3 mb-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                {qIdx + 1}
              </span>
              <p className="text-lg font-semibold flex-1">{question.question}</p>
            </div>

            <div className="space-y-2 ml-11">
              {question.options.map((option, oIdx) => {
                const isSelected = selectedAnswers[qIdx] === oIdx;
                const isCorrect = oIdx === question.correctAnswer;
                const showResult = showExplanations[qIdx];

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleAnswerSelect(qIdx, oIdx)}
                    className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                      isSelected && !showResult
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                        : showResult && isSelected && isCorrect
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                        : showResult && isSelected && !isCorrect
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                        : showResult && isCorrect
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                        : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600'
                    }`}
                    disabled={showResult && !isFreeTier}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && isCorrect && (
                        <i className="fa-solid fa-check-circle text-green-500"></i>
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <i className="fa-solid fa-times-circle text-red-500"></i>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedAnswers[qIdx] !== undefined && !showExplanations[qIdx] && (
              <button
                onClick={() => handleCheckAnswer(qIdx)}
                className="ml-11 mt-4 btn bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                {t[language].checkAnswer}
              </button>
            )}

            {showExplanations[qIdx] && (
              <div className="ml-11 mt-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <i className="fa-solid fa-lightbulb text-yellow-500 mt-1"></i>
                  <div>
                    <p className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                      {t[language].showExplanation}:
                    </p>
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Premium Features CTA */}
      {isFreeTier && (
        <div className="card-glass p-6">
          <h3 className="text-xl font-bold mb-3">{t[language].premiumFeatures}</h3>
          <ul className="space-y-2 mb-4">
            {demo.premiumFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-purple-500">{feature}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowPricingModal(true)}
            className="btn bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white w-full"
          >
            <i className="fa-solid fa-crown mr-2"></i>
            {t[language].upgrade}
          </button>
        </div>
      )}

      <PricingModal
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
        language={language}
        userRole="student"
      />
    </div>
  );
};

export default LessonQuickQuiz;
