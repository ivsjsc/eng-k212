import React, { useState } from 'react';
import { lessonPremiumDemos } from '../data/lesson-premium-demos';
import PricingModal from './PricingModal';

interface Props {
  language: 'en' | 'vi';
  isFreeTier: boolean;
  lessonTitle?: string;
  lessonContent?: string;
}

const LessonAIAssistant: React.FC<Props> = ({ language, isFreeTier, lessonTitle, lessonContent }) => {
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [question, setQuestion] = useState('');
  const [selectedCapability, setSelectedCapability] = useState<number | null>(null);

  const demo = lessonPremiumDemos[language].lessonContent;

  const handleAsk = () => {
    if (isFreeTier) {
      setShowPricingModal(true);
      return;
    }
    // Premium: call AI service
    alert('Ask AI: ' + question);
    setQuestion('');
  };

  const handleCapabilityClick = (index: number) => {
    setSelectedCapability(index);
    if (isFreeTier) setShowPricingModal(true);
  };

  const t = {
    en: {
      askQuestion: 'Ask about this lesson...',
      send: 'Ask AI',
      capabilities: 'What I can help with:',
      upgrade: 'Upgrade to Premium',
      demoNotice: '⚡ Interactive AI assistance available with Premium!',
      premiumFeatures: 'Premium Features:',
      exampleQuestion: 'Example: "Why do we use present perfect here?"'
    },
    vi: {
      askQuestion: 'Hỏi về bài học này...',
      send: 'Hỏi AI',
      capabilities: 'Tôi có thể giúp gì:',
      upgrade: 'Nâng Cấp Premium',
      demoNotice: '⚡ Trợ lý AI tương tác có với Premium!',
      premiumFeatures: 'Tính Năng Premium:',
      exampleQuestion: 'Ví dụ: "Tại sao dùng thì hiện tại hoàn thành ở đây?"'
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
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg p-4 mb-6">
            <p className="text-indigo-800 dark:text-indigo-200 text-sm">{t[language].demoNotice}</p>
          </div>
        )}

        <div className="flex gap-3 mb-3">
          <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder={t[language].askQuestion} className="form-input flex-1" />
          <button onClick={handleAsk} className="btn bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6">{t[language].send}</button>
        </div>
        <p className="text-xs text-slate-500 italic">{t[language].exampleQuestion}</p>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">{t[language].capabilities}</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {demo.capabilities.map((c, idx) => (
            <button key={idx} onClick={() => handleCapabilityClick(idx)} className={`card-glass p-4 text-left hover:scale-[1.02] transition ${selectedCapability === idx ? 'ring-2 ring-indigo-500' : ''}`}>
              <div className="text-2xl mb-2">{c.icon}</div>
              <div className="font-semibold mb-1">{c.title}</div>
              <div className="text-sm text-slate-500">{c.description}</div>
              <div className="mt-2 text-xs italic text-slate-400">{c.example}</div>
            </button>
          ))}
        </div>
      </div>

      {isFreeTier && (
        <div className="card-glass p-6">
          <h4 className="font-semibold mb-2">{t[language].premiumFeatures}</h4>
          <ul className="list-disc list-inside text-sm text-slate-600 mb-4">
            {demo.premiumFeatures.map((pf, i) => (
              <li key={i}>{pf}</li>
            ))}
          </ul>
          <button onClick={() => setShowPricingModal(true)} className="btn bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-full">
            <i className="fa-solid fa-crown mr-2"></i>{t[language].upgrade}
          </button>
        </div>
      )}

      <PricingModal isOpen={showPricingModal} onClose={() => setShowPricingModal(false)} language={language} userRole="student" />
    </div>
  );
};

export default LessonAIAssistant;
