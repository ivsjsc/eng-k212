import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import type { User } from '../types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Props {
  user: User;
  language: 'en' | 'vi';
}

const AITutorChat: React.FC<Props> = ({ user, language }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = {
    en: {
      title: 'AI English Tutor',
      subtitle: 'Ask me anything about English learning!',
      placeholder: 'Type your question here...',
      send: 'Send',
      sending: 'Sending...',
      greeting: `Hello ${user.name}! 👋 I'm your AI English tutor. Ask me anything about grammar, vocabulary, pronunciation, or practice conversations!`,
      error: 'Sorry, I encountered an error. Please try again.',
      examples: [
        'What is the difference between "affect" and "effect"?',
        'How do I use present perfect tense?',
        'Can you help me practice a job interview?',
        'Explain phrasal verbs with examples',
      ],
      examplesTitle: 'Try asking:',
    },
    vi: {
      title: 'Gia sư AI tiếng Anh',
      subtitle: 'Hỏi tôi bất cứ điều gì về học tiếng Anh!',
      placeholder: 'Nhập câu hỏi của bạn...',
      send: 'Gửi',
      sending: 'Đang gửi...',
      greeting: `Xin chào ${user.name}! 👋 Tôi là gia sư AI tiếng Anh của bạn. Hỏi tôi bất cứ điều gì về ngữ pháp, từ vựng, phát âm hoặc luyện hội thoại!`,
      error: 'Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại.',
      examples: [
        'Sự khác biệt giữa "affect" và "effect" là gì?',
        'Làm thế nào để sử dụng thì hiện tại hoàn thành?',
        'Bạn có thể giúp tôi luyện tập phỏng vấn xin việc không?',
        'Giải thích phrasal verb với ví dụ',
      ],
      examplesTitle: 'Thử hỏi:',
    }
  }[language];

  useEffect(() => {
    // Add greeting message on mount
    if (messages.length === 0) {
      setMessages([{
        id: Date.now().toString(),
        role: 'assistant',
        content: t.greeting,
        timestamp: new Date(),
      }]);
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        throw new Error('AI service not configured');
      }

      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const systemPrompt = `You are an expert English language tutor helping ${user.name}, a ${user.role === 'student' ? `${user.gradeLevel || 'student'}` : 'teacher'}. Provide clear, encouraging, and educational responses about English learning. Use examples and be patient. Respond in ${language === 'vi' ? 'Vietnamese' : 'English'}.`;
      
      const conversationHistory = messages.map(m => `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.content}`).join('\n');
      const prompt = `${systemPrompt}\n\nConversation:\n${conversationHistory}\nStudent: ${userMessage.content}\nTutor:`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          temperature: 0.7,
        }
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text.trim(),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Tutor error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: t.error,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setInput(example);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="text-center mb-6">
        <i className="fa-solid fa-robot text-5xl text-blue-500 mb-4"></i>
        <h1 className="text-4xl font-bold">{t.title}</h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">{t.subtitle}</p>
      </div>

      <div className="card-glass flex flex-col h-[600px]">
        {/* Messages container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-200 dark:bg-slate-700 rounded-2xl px-4 py-3">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Examples (shown when no user messages yet) */}
        {messages.filter(m => m.role === 'user').length === 0 && (
          <div className="px-4 pb-4">
            <p className="text-sm font-semibold mb-2">{t.examplesTitle}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {t.examples.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => handleExampleClick(example)}
                  className="text-left text-sm p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="border-t border-slate-300 dark:border-slate-600 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              className="form-input flex-1"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? t.sending : t.send}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AITutorChat;
