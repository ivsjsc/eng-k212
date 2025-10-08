import React from 'react';
import type { User, View } from '../types';

interface SidebarProps {
  user: User;
  currentView: View;
  setView: (view: View) => void;
  language: 'en' | 'vi';
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  isAdmin?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ user, currentView, setView, language, isOpen, onClose, onLogout, isAdmin }) => {
  const t = {
    en: {
      home: 'Home',
      curriculum: 'Curriculum',
      teacherDashboard: 'Dashboard',
      analytics: 'Analytics',
      aiContentGenerator: 'AI Content Creator',
      learningPath: 'Learning Path',
      ivsAssistant: 'IVS Assistant',
      settings: 'Settings',
      userGuide: 'User Guide',
      admin: 'Admin',
      logout: 'Logout',
    },
    vi: {
      home: 'Trang chủ',
      curriculum: 'Chương trình',
      teacherDashboard: 'Bảng điều khiển',
      analytics: 'Phân tích',
      aiContentGenerator: 'Tạo nội dung AI',
      learningPath: 'Lộ trình học tập',
      ivsAssistant: 'Trợ lý IVS',
      settings: 'Cài đặt',
      userGuide: 'Hướng dẫn',
      admin: 'Quản trị',
      logout: 'Đăng xuất',
    }
  };

  const studentNavItems: { view: View; icon: string; label: keyof typeof t.en }[] = [
    { view: 'home', icon: 'fa-home', label: 'home' },
    { view: 'curriculum', icon: 'fa-book-open', label: 'curriculum' },
  ];

  const teacherNavItems: { view: View; icon: string; label: keyof typeof t.en }[] = [
    { view: 'home', icon: 'fa-home', label: 'home' },
    { view: 'teacher-dashboard', icon: 'fa-chalkboard-user', label: 'teacherDashboard' },
    { view: 'teacher-analytics', icon: 'fa-chart-line', label: 'analytics' },
    { view: 'ai-content-generator', icon: 'fa-robot', label: 'aiContentGenerator' },
    { view: 'curriculum', icon: 'fa-book-open', label: 'curriculum' },
  ];

  const commonNavItems: { view: View; icon: string; label: keyof typeof t.en; badge?: 'free' | 'premium' }[] = [
    { view: 'learning-path', icon: 'fa-map', label: 'learningPath', badge: 'premium' },
  ];
  
  const bottomNavItems: { view: View; icon: string; label: keyof typeof t.en }[] = [
    { view: 'settings', icon: 'fa-cog', label: 'settings' },
    { view: 'user-guide', icon: 'fa-circle-question', label: 'userGuide' },
  ];

  const navItems = user.role === 'teacher' ? teacherNavItems : studentNavItems;
  const adminNavItem = { view: 'admin' as View, icon: 'fa-shield-halved', label: 'admin' as keyof typeof t.en };

  const NavLink: React.FC<{ item: { view: View; icon: string; label: keyof typeof t.en; badge?: 'free' | 'premium' } }> = ({ item }) => {
    const isActive = currentView === item.view;
    return (
      <li>
        <button
          onClick={() => setView(item.view)}
          className={`group flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
            isActive
              ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/30'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-xl border text-base transition ${
              isActive
                ? 'border-white/40 bg-white/20 text-white'
                : 'border-white/10 bg-white/5 text-slate-200 group-hover:border-white/30 group-hover:bg-white/10'
            }`}
          >
            <i className={`fa-solid ${item.icon}`}></i>
          </span>
          <span className="flex-1 truncate">{t[language][item.label]}</span>
          {item.badge && (
            <span 
              className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                item.badge === 'premium'
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900'
                  : 'bg-blue-500/30 text-blue-200 border border-blue-400/30'
              }`}
            >
              {item.badge === 'premium' ? '💎' : 'FREE'}
            </span>
          )}
        </button>
      </li>
    );
  };

  return (
    <>
      {/* Backdrop (mobile) */}
      <div
        className={`fixed inset-0 z-30 bg-slate-900/80 backdrop-blur-sm transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>
      
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 flex h-full w-72 flex-col border-r border-white/10 bg-white/80 backdrop-blur-xl transition-transform duration-300 dark:border-slate-800/60 dark:bg-slate-900/70 md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="h-[var(--header-height)] border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg">
              <i className="fa-solid fa-graduation-cap text-xl"></i>
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">IVS</p>
              <h1 className="text-xl font-bold text-white">English</h1>
            </div>
          </div>
        </div>
        
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 text-sm text-white shadow-inner shadow-white/10">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/30 text-white">
              <i className={`fa-solid ${user.avatar} text-2xl`}></i>
            </span>
            <div className="truncate">
              <p className="text-base font-semibold leading-tight text-white">{user.name}</p>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-300">{user.role}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <ul className="space-y-2">
            {navItems.map(item => <NavLink key={item.view} item={item} />)}
            <hr className="my-4 border-white/10" />
            {commonNavItems.map(item => <NavLink key={item.view} item={item} />)}
            {isAdmin ? <NavLink key={adminNavItem.view} item={adminNavItem} /> : null}
          </ul>
        </nav>
        
        <div className="border-t border-white/10 px-4 py-5">
          <ul className="space-y-2">
            {bottomNavItems.map(item => <NavLink key={item.view} item={item} />)}
            <li>
              <button
                onClick={onLogout}
                className="group flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-rose-500/10 hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/20 text-rose-200 transition group-hover:border-rose-400 group-hover:bg-rose-500/40 group-hover:text-white">
                  <i className="fa-solid fa-right-from-bracket"></i>
                </span>
                <span className="truncate">{t[language].logout}</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
