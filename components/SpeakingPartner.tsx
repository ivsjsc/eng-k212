  import React, { useState, useEffect, useRef } from 'react';
  import { createChat, isAiConfigured } from '../services/geminiService';
  import type { ChatMessage, View } from '../types';
  import type { Chat, GenerateContentResponse } from '@google/genai';

  interface SpeakingPartnerProps {
    language: 'en' | 'vi';
    setView: (view: View) => void;
  }

  const SpeakingPartner: React.FC<SpeakingPartnerProps> = ({ language, setView }) => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const isMounted = useRef(true);
    const [aiConfigured, setAiConfigured] = useState(true);

    // FIX: Updated translations to reflect new API key policy.
    const t = {
      en: {
        initialMessage: "Hello! I'm Sparky, your friendly English tutor. What would you like to talk about today? 😊",
        initError: "Could not initialize AI chat partner.",
        sendError: "Sorry, I encountered an error: ",
        title: "Speaking Partner",
        subtitle: "Practice your English with Sparky the AI tutor!",
        placeholder: "Type your message...",
        goToAiSettings: "Check AI Status",
        aiWarningTitle: "AI Service Inactive",
        aiWarningBody: "AI features are not available because an API key has not been configured by the administrator.",
        typing: "Sparky is typing"
      },
      vi: {
        initialMessage: "Xin chào! Tôi là Sparky, gia sư tiếng Anh thân thiện của bạn. Hôm nay bạn muốn nói về chủ đề gì? 😊",
        initError: "Không thể khởi tạo đối tác trò chuyện AI.",
        sendError: "Xin lỗi, tôi đã gặp lỗi: ",
        title: "Luyện nói",
        subtitle: "Luyện tập tiếng Anh của bạn với gia sư AI Sparky!",
        placeholder: "Nhập tin nhắn của bạn...",
        goToAiSettings: "Kiểm tra Trạng thái AI",
        aiWarningTitle: "Dịch vụ AI không hoạt động",
        aiWarningBody: "Các tính năng AI không khả dụng vì khóa API chưa được quản trị viên định cấu hình.",
        typing: "Sparky đang nhập"
      }
    }[language];

    useEffect(() => {
      isMounted.current = true;
      const configured = isAiConfigured();
      setAiConfigured(configured);

      if (configured) {
        try {
          const newChat = createChat();
          setChat(newChat);
          setMessages([{ role: 'model', text: t.initialMessage }]);
        } catch (err) {
          setError(err instanceof Error ? err.message : t.initError);
        }
      } else {
        console.warn("AI is not configured. Chat feature is disabled.");
      }
      return () => { isMounted.current = false; };
    }, [t.initialMessage, t.initError]);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || isLoading || !chat) return;

      const userMessage: ChatMessage = { role: 'user', text: input };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);
      setError(null);

      try {
          const stream = await chat.sendMessageStream({ message: userMessage.text });
          let fullResponseText = '';
          let modelMessage: ChatMessage = { role: 'model', text: '' };
          setMessages(prev => [...prev, modelMessage]);

          for await (const chunk of stream) {
              if (!isMounted.current) return;
              fullResponseText += chunk.text;
              setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = { role: 'model', text: fullResponseText + '...' };
                  return newMessages;
              });
          }
          setMessages(prev => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1] = { role: 'model', text: fullResponseText };
              return newMessages;
          });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        setError(errorMessage);
        setMessages(prev => [...prev, { role: 'model', text: `${t.sendError}${errorMessage}` }]);
      } finally {
          if (isMounted.current) {
              setIsLoading(false);
          }
      }
    };

    return (
      <div className="h-full flex flex-col max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
          <div className="text-center mb-6">
              <i className="fa-solid fa-comments text-5xl text-blue-500 mb-4"></i>
              <h1 className="text-4xl font-bold">{t.title}</h1>
              <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">{t.subtitle}</p>
          </div>

          {!aiConfigured && (
            <div className="bg-amber-100 dark:bg-amber-900/50 border-l-4 border-amber-500 text-amber-800 dark:text-amber-200 p-4 rounded-r-lg mb-6 flex items-center justify-between gap-4 animate-fade-in">
              <div>
                <h4 className="font-bold">{t.aiWarningTitle}</h4>
                <p className="text-sm">{t.aiWarningBody}</p>
              </div>
              <button onClick={() => setView('settings')} className="btn bg-amber-500 hover:bg-amber-600 text-white flex-shrink-0">
                <i className="fa-solid fa-cogs mr-2"></i>
                {t.goToAiSettings}
              </button>
            </div>
          )}
          
          <div className="card-glass flex-grow flex flex-col p-0">
              <div className="flex-grow p-6 overflow-y-auto space-y-4 custom-scrollbar">
                  {messages.map((msg, index) => (
                      <div key={index} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                          {msg.role === 'model' && <i className="fa-solid fa-robot text-2xl text-blue-500 mb-2"></i>}
                          <div className={`max-w-md lg:max-w-lg p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-slate-200 dark:bg-slate-700 rounded-bl-none'}`}>
                              <p className="text-sm leading-relaxed">{msg.text}</p>
                          </div>
                      </div>
                  ))}
                  {isLoading && (
                      <div className="flex items-end gap-3">
                          <i className="fa-solid fa-robot text-2xl text-blue-500 mb-2"></i>
                          <div className="max-w-md lg:max-w-lg p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 rounded-bl-none">
                              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                  <span>{t.typing}</span>
                                  <div className="typing-indicator">
                                    <span></span><span></span><span></span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}
                  <div ref={messagesEndRef} />
              </div>
              {error && <div className="p-4 border-t dark:border-slate-700 text-center text-red-500">{error}</div>}
              <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                  <form onSubmit={handleSend} className="flex items-center gap-4">
                      <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          className="form-input flex-grow"
                          placeholder={t.placeholder}
                          disabled={isLoading || !chat || !aiConfigured}
                      />
                      <button type="submit" className="btn btn-primary btn-icon" disabled={isLoading || !input.trim() || !chat || !aiConfigured}>
                          <i className="fa-solid fa-paper-plane"></i>
                      </button>
                  </form>
              </div>
          </div>
      </div>
    );
  };

  export default SpeakingPartner;
