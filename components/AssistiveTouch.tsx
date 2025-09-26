import React, { useState } from 'react';
import type { View } from '../types';

interface AssistiveTouchProps {
  setView: (view: View) => void;
  language: 'en' | 'vi';
}

const AssistiveTouch: React.FC<AssistiveTouchProps> = ({ setView, language }) => {
  const [isOpen, setIsOpen] = useState(false);

  // FIX: Defined the full translations object first to allow TypeScript to correctly infer types for keys.
  const translations = {
    en: {
      home: 'Home',
      writingGrader: 'Writing Grader',
      speakingPartner: 'Speaking Partner',
      toggleMenu: 'Toggle Menu'
    },
    vi: {
      home: 'Trang chủ',
      writingGrader: 'Chấm bài viết',
      speakingPartner: 'Luyện nói',
      toggleMenu: 'Mở/Đóng Menu'
    }
  };

  const t = translations[language];

  const menuItems: { view: View; icon: string; label: keyof typeof translations.en }[] = [
    { view: 'home', icon: 'fa-home', label: 'home' },
    { view: 'writing-grader', icon: 'fa-pen-ruler', label: 'writingGrader' },
    { view: 'speaking-partner', icon: 'fa-comments', label: 'speakingPartner' },
  ];

  const handleNavigation = (view: View) => {
    setView(view);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu items, shown when open */}
      <div
        className={`transition-all duration-300 ease-in-out flex flex-col items-center gap-4 mb-4 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {menuItems.map((item) => (
          <button
            key={item.view}
            onClick={() => handleNavigation(item.view)}
            className="w-14 h-14 rounded-full bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 shadow-lg flex items-center justify-center transition-transform hover:scale-110"
            title={t[item.label]}
          >
            <i className={`fa-solid ${item.icon} text-xl`}></i>
          </button>
        ))}
      </div>

      {/* Main toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-blue-500 text-white shadow-xl flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        title={t.toggleMenu}
      >
        <i
          className={`fa-solid ${isOpen ? 'fa-times' : 'fa-wand-magic-sparkles'} text-2xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        ></i>
      </button>
    </div>
  );
};

export default AssistiveTouch;
