import React, { useState } from 'react';
import { lessonPremiumDemos } from '../data/lesson-premium-demos';
import PricingModal from './PricingModal';

interface Props {
  language: 'en' | 'vi';
  isFreeTier: boolean;
  lessonTitle?: string;
}

const LessonConversationPractice: React.FC<Props> = ({ language, isFreeTier, lessonTitle }) => {
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);

  const demo = lessonPremiumDemos[language].conversationPractice;

  const handleScenarioClick = (index: number) => {
    setSelectedScenario(index);
  };

  const handleStartPractice = () => {
    if (isFreeTier) {
      setShowPricingModal(true);
    } else {
      // Premium behavior placeholder
      alert('Starting interactive practice... (premium feature)');
    }
  };

  const t = {
    en: {
      back: 'Back to Scenarios',
      startPractice: 'Start Voice Practice',
      practicePoints: 'Practice Points:',
      upgrade: 'Upgrade to Premium',
      demoNotice: '⚡ This is a demo scenario. Upgrade for interactive voice practice!',
      premiumFeatures: 'Premium Features:',
      selectScenario: 'Select a scenario to practice'
    },
    vi: {
      back: 'Quay lại Kịch bản',
      startPractice: 'Bắt đầu Luyện Giọng',
      practicePoints: 'Điểm Luyện Tập:',
      upgrade: 'Nâng Cấp Premium',
      demoNotice: '⚡ Đây là kịch bản mẫu. Nâng cấp để luyện tập giọng nói tương tác!',
      premiumFeatures: 'Tính Năng Premium:',
      selectScenario: 'Chọn kịch bản để luyện tập'
    }
  };

  return (
    <div className="space-y-6">
      <div className="card-glass p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">{demo.title}</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-1">{demo.subtitle}</p>
            {lessonTitle && <p className="text-sm text-slate-400 mt-2">{lessonTitle}</p>}
          </div>
          {isFreeTier && <span className="badge-free px-3 py-1 text-sm">DEMO</span>}
        </div>
        {isFreeTier && (
          <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-4">
            <p className="text-green-800 dark:text-green-200 text-sm">{t[language].demoNotice}</p>
          </div>
        )}
      </div>

      {selectedScenario === null ? (
        <div>
          <h3 className="text-lg font-semibold mb-3">{t[language].selectScenario}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {demo.scenarios.map((s, idx) => (
              <button key={idx} onClick={() => handleScenarioClick(idx)} className="card-glass p-4 text-left hover:scale-[1.02] transition">
                <div className="text-3xl mb-2">{s.icon}</div>
                <h4 className="font-bold mb-1">{s.name}</h4>
                <p className="text-sm text-slate-500">{s.practicePoints?.slice(0,2).join(' • ')}</p>
              </button>
            ))}
          </div>

          {isFreeTier && (
            <div className="card-glass p-4 mt-4">
              <h4 className="font-semibold">{t[language].premiumFeatures}</h4>
              <ul className="mt-2 list-disc list-inside text-sm text-slate-600">
                {demo.premiumFeatures.map((pf, i) => (
                  <li key={i}>{pf}</li>
                ))}
              </ul>
              <div className="mt-4">
                <button onClick={() => setShowPricingModal(true)} className="btn bg-gradient-to-r from-green-500 to-teal-500 text-white w-full">
                  <i className="fa-solid fa-crown mr-2"></i>{t[language].upgrade}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <button onClick={() => setSelectedScenario(null)} className="btn btn-secondary-outline">
            <i className="fa-solid fa-arrow-left mr-2"></i>{t[language].back}
          </button>

          <div className="card-glass p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">{demo.scenarios[selectedScenario].icon}</div>
              <div>
                <h3 className="text-xl font-bold">{demo.scenarios[selectedScenario].name}</h3>
                <p className="text-sm text-slate-500">{demo.scenarios[selectedScenario].dialogue.length} {language === 'vi' ? 'câu thoại' : 'exchanges'}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              {demo.scenarios[selectedScenario].dialogue.map((line, i) => (
                <div key={i} className={`flex gap-3 ${line.speaker.toLowerCase().includes('you') ? 'justify-end' : 'justify-start'}`}>
                  {!line.speaker.toLowerCase().includes('you') && (
                    <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center"><i className="fa-solid fa-user-tie"></i></div>
                  )}
                  <div className={`rounded-2xl px-4 py-3 ${line.speaker.toLowerCase().includes('you') ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'}`}>
                    <div className="text-xs opacity-70 mb-1">{line.speaker}</div>
                    <div>{line.text}</div>
                  </div>
                  {line.speaker.toLowerCase().includes('you') && (
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center"><i className="fa-solid fa-user"></i></div>
                  )}
                </div>
              ))}
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">{t[language].practicePoints}</h4>
              <ul className="list-disc list-inside text-sm text-slate-600">
                {demo.scenarios[selectedScenario].practicePoints.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            <button onClick={handleStartPractice} className="btn bg-gradient-to-r from-green-500 to-teal-500 text-white w-full">
              <i className="fa-solid fa-microphone mr-2"></i>{t[language].startPractice}
            </button>
          </div>
        </div>
      )}

      <PricingModal isOpen={showPricingModal} onClose={() => setShowPricingModal(false)} language={language} userRole="student" />
    </div>
  );
};

export default LessonConversationPractice;
