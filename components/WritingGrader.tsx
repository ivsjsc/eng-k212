import React, { useState } from 'react';
import { User } from '../types';

interface Props {
  language: 'en' | 'vi';
  setView: (v: string) => void;
  user: User | null;
}

const WritingGrader: React.FC<Props> = ({ language, setView, user }) => {
  const [topic, setTopic] = useState('');
  const [text, setText] = useState('');
  const [grading, setGrading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const t = {
    en: {
      title: 'AI Writing Grader',
      subtitle: 'Get instant feedback on your writing (demo).',
      topicPlaceholder: 'e.g., My Summer Vacation',
      textPlaceholder: 'Write your essay or paragraph here...',
      gradeButton: 'Grade My Writing',
    },
    vi: {
      title: 'AI Chấm bài viết',
      subtitle: 'Nhận phản hồi tức thì về bài viết (mẫu).',
      topicPlaceholder: 'VD: Kỳ nghỉ hè của tôi',
      textPlaceholder: 'Viết bài luận hoặc đoạn văn của bạn vào đây...',
      gradeButton: 'Chấm bài của tôi',
    },
  } as const;

  const handleGrade = async () => {
    if (!topic.trim() || !text.trim()) {
      setResult(language === 'vi' ? 'Vui lòng nhập chủ đề và bài viết.' : 'Please enter both a topic and your text.');
      return;
    }
    setGrading(true);
    setResult(null);
    // Demo behaviour: fake grading delay and return a placeholder message
    await new Promise((r) => setTimeout(r, 900));
    setResult(language === 'vi' ? 'Đây là phản hồi mẫu. Nâng cấp lên Premium để nhận phản hồi AI thực tế.' : 'This is a demo response. Upgrade to Premium for real AI-powered feedback!');
    setGrading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="text-center mb-8">
        <i className="fa-solid fa-pen-ruler text-5xl text-blue-500 mb-4" />
        <h1 className="text-3xl font-bold">{t[language].title}</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t[language].subtitle}</p>
      </div>

      <div className="card-glass p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">{language === 'vi' ? 'Chủ đề' : 'Topic'}</label>
          <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder={t[language].topicPlaceholder} className="form-input w-full" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-800 dark:text-slate-300 mb-1">{language === 'vi' ? 'Bài viết của bạn' : 'Your Text'}</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t[language].textPlaceholder} className="form-textarea w-full h-48" />
        </div>

        <div className="flex items-center justify-between">
          <button onClick={handleGrade} className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white" disabled={grading}>
            {grading ? (language === 'vi' ? 'Đang chấm...' : 'Grading...') : t[language].gradeButton}
          </button>
          <button onClick={() => setView('home')} className="btn-ghost text-sm">
            {language === 'vi' ? 'Quay lại' : 'Back'}
          </button>
        </div>

        {result && (
          <div className="mt-6 bg-white/70 dark:bg-slate-900 p-4 rounded">
            <strong>{language === 'vi' ? 'Phản hồi (mẫu):' : 'Feedback (demo):'}</strong>
            <p className="mt-2">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WritingGrader;
