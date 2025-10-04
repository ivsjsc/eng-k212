import React from 'react';
import type { View } from '../types';

interface HeaderProps {
  currentView: View;
  language: 'en' | 'vi';
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, language, onMenuClick }) => {
  const translations = {
    en: {
      home: 'Home',
      curriculum: 'Curriculum',
      'teacher-dashboard': 'Dashboard',
      'writing-grader': 'Writing Grader',
      'speaking-partner': 'Speaking Partner',
      settings: 'Settings',
      'user-guide': 'User Guide',
    },
    vi: {
      home: 'Trang chủ',
      curriculum: 'Chương trình',
      'teacher-dashboard': 'Bảng điều khiển',
      'writing-grader': 'Chấm bài viết',
      'speaking-partner': 'Luyện nói',
      settings: 'Cài đặt',
      'user-guide': 'Hướng dẫn',
    }
  };

  const title = translations[language][currentView] || 'IVS English';

  return (
    <header className="md:hidden sticky top-0 z-30 px-4 pt-4">
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-xl shadow-[0_15px_40px_-20px_rgba(15,23,42,0.9)]">
        <button
          onClick={onMenuClick}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/20 text-white shadow-inner shadow-white/20"
          aria-label="Open navigation"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="flex flex-col items-center text-center text-white">
          <span className="text-xs uppercase tracking-[0.35em] text-slate-200">IVS</span>
          <h1 className="text-base font-semibold">{title}</h1>
        </div>
        <div className="h-11 w-11"></div>
      </div>
    </header>
  );
};

export default Header;
