import React, { useState } from 'react';
import { User } from '../types';

interface Props {
  language: 'en' | 'vi';
  user: User | null;
}

const AITutorChat: React.FC<Props> = ({ language }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, `You: ${input}`]);
    setInput('');
    setTimeout(() => setMessages((m) => [...m, language === 'vi' ? 'Sparky: Đây là trả lời mẫu.' : 'Sparky: This is a sample reply.']), 600);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-6">
        <i className="fa-solid fa-robot text-5xl text-blue-500 mb-4" />
        <h1 className="text-3xl font-bold">{language === 'vi' ? 'Chat AI Gia sư' : 'AI Tutor Chat'}</h1>
      </div>
      <div className="card-glass p-4">
        <div className="mb-4 space-y-2">
          {messages.map((m, i) => (
            <div key={i} className="text-sm p-2 bg-white/60 dark:bg-slate-800 rounded">{m}</div>
          ))}
        </div>
        <div className="flex gap-2">
          <input className="form-input flex-1" value={input} onChange={(e) => setInput(e.target.value)} />
          <button className="btn" onClick={send}>{language === 'vi' ? 'Gửi' : 'Send'}</button>
        </div>
      </div>
    </div>
  );
};

export default AITutorChat;
