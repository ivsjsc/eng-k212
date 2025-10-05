import React, { useState } from 'react';
import { User } from '../types';

interface Props {
  language: 'en' | 'vi';
  setView: (v: string) => void;
  user: User | null;
}

const SpeakingPartner: React.FC<Props> = ({ language, setView, user }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<string[]>([]);

  const t = {
    en: { title: 'Speaking Partner', subtitle: 'Practice conversation with demo scenarios.' },
    vi: { title: 'Luyện nói', subtitle: 'Luyện hội thoại với các kịch bản mẫu.' },
  } as const;

  const send = () => {
    if (!message.trim()) return;
    setChat((c) => [...c, `You: ${message}`]);
    setMessage('');
    // Demo reply
    setTimeout(() => setChat((c) => [...c, `Sparky: ${language === 'vi' ? 'Câu trả lời mẫu.' : 'This is a sample response.'}`]), 700);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-6">
        <i className="fa-solid fa-comments text-5xl text-blue-500 mb-4" />
        <h1 className="text-3xl font-bold">{t[language].title}</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t[language].subtitle}</p>
      </div>

      <div className="card-glass p-4">
        <div className="mb-4 space-y-2">
          {chat.map((m, idx) => (
            <div key={idx} className="text-sm p-2 bg-white/60 dark:bg-slate-800 rounded">
              {m}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input className="form-input flex-1" value={message} onChange={(e) => setMessage(e.target.value)} placeholder={language === 'vi' ? 'Nhập tin nhắn...' : 'Type your message...'} />
          <button className="btn" onClick={send}>{language === 'vi' ? 'Gửi' : 'Send'}</button>
        </div>

        <div className="mt-4 text-sm text-slate-500">
          {language === 'vi' ? 'Lưu ý: Đây là kịch bản mẫu. Nâng cấp để có hội thoại AI thời gian thực.' : 'Note: This is a demo scenario. Upgrade for real-time AI conversation.'}
        </div>
      </div>
    </div>
  );
};

export default SpeakingPartner;
