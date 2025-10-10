import React, { useState, useEffect, Suspense, lazy } from 'react';
import { View, User, Course, Classes } from './types';
import { MOCK_CLASSES, MOCK_USER } from './constants';

// Lazy load components cho performance
const Sidebar = lazy(() => import('./components/Sidebar'));
const Header = lazy(() => import('./components/Header'));
const Home = lazy(() => import('./components/Home'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Curriculum = lazy(() => import('./components/Curriculum'));
const TeacherDashboard = lazy(() => import('./components/TeacherDashboard'));
const CourseDetail = lazy(() => import('./components/CourseDetail'));
const Settings = lazy(() => import('./components/Settings'));
const AuthPage = lazy(() => import('./components/AuthPage'));
const RoleSelectionPage = lazy(() => import('./components/RoleSelectionPage'));
const PersonalizedLearningPath = lazy(() => import('./components/PersonalizedLearningPath'));
const AssistiveTouch = lazy(() => import('./components/AssistiveTouch'));
const PWAInstallPrompt = lazy(() => import('./components/PWAInstallPrompt'));
const ClassAnalyticsDashboard = lazy(() => import('./components/ClassAnalyticsDashboard'));
const IVSAssistant = lazy(() => import('./components/IVSAssistant'));
const AIContentGenerator = lazy(() => import('./components/AIContentGenerator'));
const UserGuide = lazy(() => import('./components/UserGuide'));

// Import trực tiếp các component cần thiết ngay lập tức
import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';

// Loading fallback cho Suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

// Mobile Bottom Navigation Component
const MobileBottomNav = ({ currentView, setView, language }: {
  currentView: View;
  setView: (view: View) => void;
  language: 'en' | 'vi';
}) => {
  const navItems = [
    { view: 'home' as View, icon: 'fa-home', label: language === 'vi' ? 'Trang chủ' : 'Home' },
    { view: 'curriculum' as View, icon: 'fa-book-open', label: language === 'vi' ? 'Học tập' : 'Learn' },
    { view: 'learning-path' as View, icon: 'fa-route', label: language === 'vi' ? 'Lộ trình' : 'Path' },
    { view: 'settings' as View, icon: 'fa-cog', label: language === 'vi' ? 'Cài đặt' : 'Settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 z-50 md:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => setView(item.view)}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              currentView === item.view
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <i className={`fas ${item.icon} text-lg mb-1`}></i>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

function App() {
  // Auth states
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authStep, setAuthStep] = useState<'roleSelection' | 'login'>('roleSelection');
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'foreigner-teacher'>('student');

  // App states
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [classes, setClasses] = useState<Classes>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mobile và responsive states
  const [isMobile, setIsMobile] = useState(false);
  
  // Appearance states
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('ivs-theme') as 'light' | 'dark';
    return savedTheme || 'dark';
  });
  const [language, setLanguage] = useState<'en' | 'vi'>(() => {
    const savedLang = localStorage.getItem('ivs-language') as 'en' | 'vi';
    return savedLang || 'vi';
  });

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Theme management
  useEffect(() => {
    localStorage.setItem('ivs-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('ivs-language', language);
  }, [language]);

  // Guest login handler
  const handleGuestLogin = (role: 'student' | 'teacher' | 'foreigner-teacher') => {
    const guestUser: User = {
      id: `guest-${role}-01`,
      name: role === 'student' 
        ? (language === 'vi' ? 'Học sinh Khách' : 'Guest Student')
        : role === 'foreigner-teacher'
        ? (language === 'vi' ? 'Giáo viên Nước ngoài Khách' : 'Guest Foreign Teacher')
        : (language === 'vi' ? 'Giáo viên Khách' : 'Guest Teacher'),
      avatar: 'fa-user',
      level: 'Beginner',
      points: 0,
      badges: [],
      role: role,
      streak: 0,
      sscore: 0,
      aiTokens: 50,
      currentStreak: 0
    };
    setUser(guestUser);
    
    if (role === 'teacher' || role === 'foreigner-teacher') {
      setClasses(MOCK_CLASSES);
      setCurrentView('teacher-dashboard');
    } else {
      setCurrentView('home');
    }
  };

  // Navigation handlers
  const handleSetView = (view: View) => {
    setCurrentView(view);
    setIsSidebarOpen(false);
    setSelectedCourse(null);
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView('curriculum');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleLogout = () => {
    setUser(null);
    setClasses({});
    setAuthStep('roleSelection');
    setCurrentView('home');
  };

  // Render main content based on current view
  const renderMainContent = () => {
    if (selectedCourse) {
      return (
        <Suspense fallback={<LoadingFallback />}>
          <CourseDetail
            course={selectedCourse}
            onBack={() => setSelectedCourse(null)}
            language={language}
            setView={handleSetView}
          />
        </Suspense>
      );
    }

    switch (currentView) {
      case 'home':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Home 
              user={user!} 
              onUpdateUser={handleUpdateUser} 
              onSelectCourse={handleSelectCourse} 
              language={language} 
              setView={handleSetView} 
              classes={classes} 
            />
          </Suspense>
        );
      
      case 'curriculum':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Curriculum 
              language={language} 
              user={user!} 
              onSelectCourse={handleSelectCourse} 
              setView={handleSetView} 
            />
          </Suspense>
        );
      
      case 'teacher-dashboard':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <TeacherDashboard 
              classes={classes} 
              setClasses={setClasses} 
              language={language} 
            />
          </Suspense>
        );
      
      case 'teacher-analytics':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <ClassAnalyticsDashboard classes={classes} language={language} />
          </Suspense>
        );

      case 'ai-content-generator':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <AIContentGenerator language={language} />
          </Suspense>
        );

      case 'ivs-assistant':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <IVSAssistant user={user!} language={language} />
          </Suspense>
        );

      case 'user-guide':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <UserGuide language={language} />
          </Suspense>
        );

      case 'learning-path':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <PersonalizedLearningPath 
              user={user!} 
              language={language} 
            />
          </Suspense>
        );
      
      case 'settings':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Settings
              user={user!}
              onUpdateUser={handleUpdateUser}
              classes={classes}
              onUpdateClasses={setClasses}
              theme={theme}
              setTheme={setTheme}
              language={language}
              setLanguage={setLanguage}
              fontSize="16px"
              setFontSize={() => {}}
              fontWeight={400}
              setFontWeight={() => {}}
            />
          </Suspense>
        );
      
      default:
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Dashboard 
              user={user!} 
              onUpdateUser={handleUpdateUser}
              onSelectCourse={handleSelectCourse}
              language={language}
            />
          </Suspense>
        );
    }
  };

  // Loading state
  if (isAuthLoading) {
    return <Loading />;
  }

  // Authentication flow
  if (!user) {
    return (
      <div className="h-screen bg-slate-100 dark:bg-slate-900">
        <Suspense fallback={<Loading />}>
          {authStep === 'roleSelection' ? (
            <RoleSelectionPage
              onSelectRole={(role) => {
                setSelectedRole(role);
                setAuthStep('login');
              }}
              onGuestLogin={handleGuestLogin}
              language={language}
              setLanguage={setLanguage}
            />
          ) : (
            <AuthPage
              language={language}
              selectedRole={selectedRole}
              onBack={() => setAuthStep('roleSelection')}
            />
          )}
        </Suspense>
      </div>
    );
  }

  // Main app layout - Mobile First Design
  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-950 dark:to-black"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex min-h-screen">
          {/* Desktop Sidebar */}
          {!isMobile && (
            <Suspense fallback={<div className="w-64 bg-white dark:bg-slate-800"></div>}>
              <Sidebar
                user={user}
                currentView={currentView}
                setView={handleSetView}
                language={language}
                isOpen={true}
                onClose={() => {}}
                onLogout={handleLogout}
                isAdmin={false}
              />
            </Suspense>
          )}

          {/* Mobile Sidebar Overlay */}
          {isMobile && isSidebarOpen && (
            <>
              <div 
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsSidebarOpen(false)}
              ></div>
              <div className="fixed left-0 top-0 h-full w-80 z-50">
                <Suspense fallback={<div className="w-80 h-full bg-white dark:bg-slate-800"></div>}>
                  <Sidebar
                    user={user}
                    currentView={currentView}
                    setView={handleSetView}
                    language={language}
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    onLogout={handleLogout}
                    isAdmin={false}
                  />
                </Suspense>
              </div>
            </>
          )}

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <Suspense fallback={<div className="h-16 bg-white dark:bg-slate-800 border-b"></div>}>
              <Header
                currentView={currentView}
                language={language}
                onMenuClick={() => setIsSidebarOpen(true)}
                user={user}
              />
            </Suspense>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 md:pb-8 overflow-auto">
              <div className="max-w-7xl mx-auto">
                <ErrorBoundary>
                  {renderMainContent()}
                </ErrorBoundary>
              </div>
            </main>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <MobileBottomNav
            currentView={currentView}
            setView={handleSetView}
            language={language}
          />
        )}

        {/* Assistive Touch for mobile */}
        {isMobile && (
          <Suspense fallback={null}>
              <AssistiveTouch user={user!} language={language} />
            </Suspense>
        )}

        {/* PWA Install prompt UI */}
        <Suspense fallback={null}>
          <PWAInstallPrompt />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;