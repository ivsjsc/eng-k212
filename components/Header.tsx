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
    <header className="md:hidden sticky top-0 z-20 flex items-center justify-between p-4 h-[var(--header-height)] bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
      <button onClick={onMenuClick} className="btn btn-icon btn-secondary">
        <i className="fa-solid fa-bars"></i>
      </button>
      <h1 className="text-lg font-bold">{title}</h1>
      <div className="w-10"></div> {/* Spacer to balance the title */}
    </header>
  );
};

export default Header;
