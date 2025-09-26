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
}

const Sidebar: React.FC<SidebarProps> = ({ user, currentView, setView, language, isOpen, onClose, onLogout }) => {
  const t = {
    en: {
      home: 'Home',
      curriculum: 'Curriculum',
      teacherDashboard: 'Dashboard',
      writingGrader: 'Writing Grader',
      speakingPartner: 'Speaking Partner',
      settings: 'Settings',
      userGuide: 'User Guide',
      logout: 'Logout',
    },
    vi: {
      home: 'Trang chủ',
      curriculum: 'Chương trình',
      teacherDashboard: 'Bảng điều khiển',
      writingGrader: 'Chấm bài viết',
      speakingPartner: 'Luyện nói',
      settings: 'Cài đặt',
      userGuide: 'Hướng dẫn',
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
    { view: 'curriculum', icon: 'fa-book-open', label: 'curriculum' },
  ];

  const commonNavItems: { view: View; icon: string; label: keyof typeof t.en }[] = [
    { view: 'writing-grader', icon: 'fa-pen-ruler', label: 'writingGrader' },
    { view: 'speaking-partner', icon: 'fa-comments', label: 'speakingPartner' },
  ];
  
  const bottomNavItems: { view: View; icon: string; label: keyof typeof t.en }[] = [
      { view: 'settings', icon: 'fa-cog', label: 'settings' },
      { view: 'user-guide', icon: 'fa-circle-question', label: 'userGuide' },
  ];

  const navItems = user.role === 'teacher' ? teacherNavItems : studentNavItems;

  // FIX: Explicitly type NavLink as React.FC to resolve issue where TypeScript incorrectly treats the 'key' prop as a standard prop.
  const NavLink: React.FC<{ item: { view: View; icon: string; label: keyof typeof t.en } }> = ({ item }) => (
    <li>
      <button
        onClick={() => setView(item.view)}
        className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
          currentView === item.view
            ? 'bg-blue-500 text-white font-semibold'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
        }`}
      >
        <i className={`fa-solid ${item.icon} w-6 text-center text-lg`}></i>
        <span className="ml-4">{t[language][item.label]}</span>
      </button>
    </li>
  );

  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>
      
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-40 transform transition-transform md:relative md:translate-x-0 md:w-64 md:flex-shrink-0 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 h-[var(--header-height)] flex items-center">
            <i className="fa-solid fa-graduation-cap text-3xl text-blue-500"></i>
            <h1 className="text-xl font-bold ml-3">IVS English</h1>
        </div>
        
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <i className={`fa-solid ${user.avatar} text-2xl text-blue-500`}></i>
            </div>
            <div className="ml-3">
              <p className="font-semibold text-slate-800 dark:text-slate-200">{user.name}</p>
              <p className="text-sm text-slate-500 capitalize">{user.role}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map(item => <NavLink key={item.view} item={item} />)}
            <hr className="my-4 border-slate-200 dark:border-slate-700" />
            {commonNavItems.map(item => <NavLink key={item.view} item={item} />)}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
             <ul className="space-y-2">
                {bottomNavItems.map(item => <NavLink key={item.view} item={item} />)}
                <li>
                  <button
                    onClick={onLogout}
                    className="flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    <i className="fa-solid fa-right-from-bracket w-6 text-center text-lg"></i>
                    <span className="ml-4">{t[language].logout}</span>
                  </button>
                </li>
            </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
