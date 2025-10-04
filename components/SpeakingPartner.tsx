  import React, { useState, useEffect, useRef } from 'react';
  import { createChat, isAiConfigured } from '../services/geminiService';
  import type { ChatMessage, View } from '../types';
  import type { Chat, GenerateContentResponse } from '@google/genai';
  import { demoAIResponses } from '../data/demo-ai-responses';
  import { checkSpeakingPartnerLimit, trackSpeakingPartnerUsage, getRemainingRequests } from '../utils/usageTracker';
  import PricingModal from './PricingModal';

  interface SpeakingPartnerProps {
    language: 'en' | 'vi';
    setView: (view: View) => void;
    user: { subscription?: { tier: 'free' | 'student' | 'teacher' | 'enterprise'; expiresAt?: Date } };
  }

  const SpeakingPartner: React.FC<SpeakingPartnerProps> = ({ language, setView, user }) => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const isMounted = useRef(true);
    const [aiConfigured, setAiConfigured] = useState(true);
    const [showPricingModal, setShowPricingModal] = useState(false);
    const isFreeTier = !user.subscription || user.subscription.tier === 'free';
    const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
    const remaining = getRemainingRequests();

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
        typing: "Sparky is typing",
        freeTierBadge: '🆓 Free Tier',
        premiumBadge: '💎 Premium',
        limitReached: 'Daily limit reached!',
        limitReachedDesc: 'You\'ve used your free speaking practice for today. Upgrade to Premium for unlimited practice.',
        upgradeButton: 'Upgrade to Premium',
        remainingUses: `${remaining.speakingPartnerMinutes} minute${remaining.speakingPartnerMinutes !== 1 ? 's' : ''} remaining today`,
        demoTitle: '🎭 Demo Scenarios (Free Tier)',
        demoSubtitle: 'Select a scenario to practice:',
        scenarioButton: 'View Scenario',
        demoNotice: '💡 This is a demo scenario. Upgrade to Premium for real-time AI conversation practice.',
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
        typing: "Sparky đang nhập",
        freeTierBadge: '🆓 Miễn phí',
        premiumBadge: '💎 Premium',
        limitReached: 'Đã hết lượt dùng hôm nay!',
        limitReachedDesc: 'Bạn đã hết lượt luyện nói miễn phí trong ngày. Nâng cấp lên Premium để luyện không giới hạn.',
        upgradeButton: 'Nâng cấp lên Premium',
        remainingUses: `Còn ${remaining.speakingPartnerMinutes} phút hôm nay`,
        demoTitle: '🎭 Kịch bản mẫu (Miễn phí)',
        demoSubtitle: 'Chọn một kịch bản để luyện tập:',
        scenarioButton: 'Xem kịch bản',
        demoNotice: '💡 Đây là kịch bản mẫu. Nâng cấp lên Premium để luyện hội thoại AI thời gian thực.',
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

    const demoScenarios = demoAIResponses.speakingPartner[language];

    const handleScenarioSelect = (index: number) => {
      setSelectedScenario(index);
      trackSpeakingPartnerUsage(1); // Track 1 minute usage
    };

    // For free tier, show demo scenarios
    if (isFreeTier) {
      return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
          <div className="text-center mb-6">
            <i className="fa-solid fa-comments text-5xl text-blue-500 mb-4"></i>
            <h1 className="text-4xl font-bold">{t.title}</h1>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">{t.subtitle}</p>
            
            {/* Free Tier Badge */}
            <div className="mt-4 inline-block">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                {t.freeTierBadge} • {t.remainingUses}
              </span>
            </div>
          </div>

          {/* Limit Reached Warning */}
          {!checkSpeakingPartnerLimit() && (
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border-l-4 border-purple-500 p-4 rounded-r-lg mb-6 animate-fade-in">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-purple-800 dark:text-purple-200">{t.limitReached}</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300">{t.limitReachedDesc}</p>
                </div>
                <button 
                  onClick={() => setShowPricingModal(true)} 
                  className="btn bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex-shrink-0"
                >
                  <i className="fa-solid fa-crown mr-2"></i>
                  {t.upgradeButton}
                </button>
              </div>
            </div>
          )}

          <div className="card-glass p-6">
            <h2 className="text-2xl font-bold mb-2">{t.demoTitle}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">{t.demoSubtitle}</p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {demoScenarios.map((scenario, index) => (
                <div
                  key={index}
                  className="stat-card stat-card-blue p-6 cursor-pointer"
                  onClick={() => handleScenarioSelect(index)}
                >
                  <h3 className="text-xl font-bold mb-2">{scenario.scenario}</h3>
                  <p className="text-sm opacity-90 mb-4">{scenario.dialogue[0]}</p>
                  <button className="btn bg-white/20 hover:bg-white/30 text-white">
                    <i className="fa-solid fa-play mr-2"></i>
                    {t.scenarioButton}
                  </button>
                </div>
              ))}
            </div>

            {/* Selected Scenario Display */}
            {selectedScenario !== null && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border-2 border-blue-400 animate-fade-in">
                <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                  {demoScenarios[selectedScenario].scenario}
                </h3>
                
                <div className="space-y-4 mb-6">
                  {demoScenarios[selectedScenario].dialogue.map((line, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <i className={`fa-solid ${idx % 2 === 0 ? 'fa-user' : 'fa-robot'} text-xl ${idx % 2 === 0 ? 'text-blue-500' : 'text-purple-500'} mt-1`}></i>
                      <p className="flex-1 text-slate-700 dark:text-slate-300">{line}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4">
                  <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">
                    <i className="fa-solid fa-lightbulb mr-2"></i>
                    {language === 'en' ? 'Tips:' : 'Gợi ý:'}
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-blue-700 dark:text-blue-300">
                    {demoScenarios[selectedScenario].tips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
                  <p className="text-sm text-purple-800 dark:text-purple-200 mb-3">
                    <i className="fa-solid fa-info-circle mr-2"></i>
                    {t.demoNotice}
                  </p>
                  <button 
                    onClick={() => setShowPricingModal(true)}
                    className="btn bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white w-full"
                  >
                    <i className="fa-solid fa-crown mr-2"></i>
                    {t.upgradeButton}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Pricing Modal */}
          <PricingModal 
            isOpen={showPricingModal}
            onClose={() => setShowPricingModal(false)}
            language={language}
            userRole="student"
          />
        </div>
      );
    }

    // Premium users get the full chat interface
    return (
      <div className="h-full flex flex-col max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
          <div className="text-center mb-6">
              <i className="fa-solid fa-comments text-5xl text-blue-500 mb-4"></i>
              <h1 className="text-4xl font-bold">{t.title}</h1>
              <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">{t.subtitle}</p>
              
              {/* Premium Badge */}
              <div className="mt-4 inline-block">
                <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold">
                  {t.premiumBadge}
                </span>
              </div>
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
