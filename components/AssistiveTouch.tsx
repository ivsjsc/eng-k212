import React, { useState } from 'react';
import IVSAssistant from './IVSAssistant';
import type { User } from '../types';

interface AssistiveTouchProps {
  user: User;
  language: 'en' | 'vi';
}

const AssistiveTouch: React.FC<AssistiveTouchProps> = ({ user, language }) => {
  const [isOpen, setIsOpen] = useState(false);

  const t = {
    en: {
      toggleAssistant: 'IVS Assistant - Click for help!',
      close: 'Close',
      free: 'FREE'
    },
    vi: {
      toggleAssistant: 'Trợ lý IVS - Click để được trợ giúp!',
      close: 'Đóng',
      free: 'MIỄN PHÍ'
    }
  };

  return (
    <>
      {/* Floating IVS Assistant Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-blue-500/50 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 animate-pulse-glow"
          title={t[language].toggleAssistant}
        >
          {/* Small info badge (icon only) */}
          <span className="absolute -top-2 -right-2 w-7 h-7 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center">
            <i className="fa-solid fa-info text-xs" aria-hidden></i>
          </span>
          
          <i
            className={`fa-solid ${isOpen ? 'fa-times' : 'fa-robot'} text-2xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          ></i>
        </button>
      </div>

      {/* IVS Assistant Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center md:p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full h-[80vh] md:h-[85vh] md:max-w-4xl md:rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-700/80 hover:bg-slate-600 text-white flex items-center justify-center transition-all hover:scale-110"
              title={t[language].close}
            >
              <i className="fa-solid fa-times"></i>
            </button>

            {/* IVS Assistant Component */}
            <div className="w-full h-full">
              <IVSAssistant user={user} language={language} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AssistiveTouch;
