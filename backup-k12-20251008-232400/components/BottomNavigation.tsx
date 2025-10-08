import React from 'react';
import type { User, View } from '../types';

interface BottomNavigationProps {
  user: User;
  currentView: View;
  setView: (view: View) => void;
  language: 'en' | 'vi';
  isAdmin?: boolean;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  user, 
  currentView, 
  setView, 
  language,
  isAdmin 
}) => {
  const t = {
    en: {
      home: 'Home',
      curriculum: 'Curriculum',
      teacherDashboard: 'Dashboard',
      analytics: 'Analytics',
      aiContentGenerator: 'AI Tools',
      learningPath: 'Path',
      more: 'More',
    },
    vi: {
      home: 'Trang chủ',
      curriculum: 'Học tập',
      teacherDashboard: 'Bảng điều khiển',
      analytics: 'Phân tích',
      aiContentGenerator: 'AI',
      learningPath: 'Lộ trình',
      more: 'Thêm',
    }
  };

  // Define main navigation items based on role
  const studentNavItems = [
    { view: 'home' as View, icon: 'fa-home', label: t[language].home },
    { view: 'curriculum' as View, icon: 'fa-book-open', label: t[language].curriculum },
    { view: 'learning-path' as View, icon: 'fa-map', label: t[language].learningPath, badge: true },
    { view: 'settings' as View, icon: 'fa-cog', label: t[language].more },
  ];

  const teacherNavItems = [
    { view: 'home' as View, icon: 'fa-home', label: t[language].home },
    { view: 'teacher-dashboard' as View, icon: 'fa-chalkboard-user', label: t[language].teacherDashboard },
    { view: 'ai-content-generator' as View, icon: 'fa-robot', label: t[language].aiContentGenerator },
    { view: 'settings' as View, icon: 'fa-cog', label: t[language].more },
  ];

  const navItems = user.role === 'teacher' ? teacherNavItems : studentNavItems;

  const NavButton: React.FC<{ 
    item: { view: View; icon: string; label: string; badge?: boolean } 
  }> = ({ item }) => {
    const isActive = currentView === item.view;
    
    return (
      <button
        onClick={() => setView(item.view)}
        className={`relative flex flex-col items-center justify-center gap-1 py-2 px-2 transition-all duration-200 ${
          isActive ? 'text-sky-500' : 'text-slate-400'
        }`}
        aria-label={item.label}
      >
        {/* Active indicator bar */}
        {isActive && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-12 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600" />
        )}
        
        {/* Icon container with badge */}
        <div className="relative">
          <div className={`flex h-7 w-7 items-center justify-center rounded-xl transition-all ${
            isActive 
              ? 'bg-gradient-to-br from-sky-500/20 to-indigo-600/20 text-sky-500 scale-110' 
              : 'text-slate-400'
          }`}>
            <i className={`fa-solid ${item.icon} text-lg`}></i>
          </div>
          
          {/* Premium badge */}
          {item.badge && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center text-xs">
              💎
            </span>
          )}
        </div>
        
        {/* Label */}
        <span className={`text-[10px] font-medium leading-tight ${
          isActive ? 'font-semibold' : ''
        }`}>
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-white/95 backdrop-blur-xl dark:bg-slate-900/95 dark:border-slate-800/60 safe-area-inset-bottom">
      <div className="flex items-center justify-around px-2">
        {navItems.map(item => (
          <NavButton key={item.view} item={item} />
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
