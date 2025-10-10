import React, { useState, useEffect, Suspense, lazy } from 'react';
import { View, User, Course, Classes } from './types';
import { MOCK_CLASSES, MOCK_USER } from './constants';
import { auth, db, firebaseInitError, onAuthStateChanged, signOut, doc, getDoc, setDoc, updateDoc } from './services/firebase';
import { getRedirectResult } from 'firebase/auth';
import { logger } from './utils/logger';

// Lazy load heavy components
const Sidebar = lazy(() => import('./components/Sidebar'));
const Header = lazy(() => import('./components/Header'));
const BottomNavigation = lazy(() => import('./components/BottomNavigation'));
const OnboardingTour = lazy(() => import('./components/OnboardingTour'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const Home = lazy(() => import('./components/Home'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const CourseDetail = lazy(() => import('./components/CourseDetail'));
const TeacherDashboard = lazy(() => import('./components/TeacherDashboard'));
const ClassAnalyticsDashboard = lazy(() => import('./components/ClassAnalyticsDashboard'));
const AIContentGenerator = lazy(() => import('./components/AIContentGenerator'));
const PersonalizedLearningPath = lazy(() => import('./components/PersonalizedLearningPath'));
const IVSAssistant = lazy(() => import('./components/IVSAssistant'));
const Settings = lazy(() => import('./components/Settings'));
const UserGuide = lazy(() => import('./components/UserGuide'));
const AssistiveTouch = lazy(() => import('./components/AssistiveTouch'));
const AuthPage = lazy(() => import('./components/AuthPage'));
const RoleSelectionPage = lazy(() => import('./components/RoleSelectionPage'));
const KeyboardShortcutsHelp = lazy(() => import('./components/KeyboardShortcutsHelp'));
const GlobalSearch = lazy(() => import('./components/GlobalSearch'));
const PWAInstallPrompt = lazy(() => import('./components/PWAInstallPrompt'));
import FirstUseOverlay from './components/FirstUseOverlay';
import ProfileSetupModal from './components/ProfileSetupModal';
import LinkPasswordModal from './components/LinkPasswordModal';

// Keep Loading component as regular import since it's needed immediately
import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';

// Loading fallback component for Suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  // State for application
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [classes, setClasses] = useState<Classes>({});

  // New state for multi-step authentication flow
  const [authStep, setAuthStep] = useState<'roleSelection' | 'login'>('roleSelection');
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'foreigner-teacher'>('student');

  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showFirstUseOverlay, setShowFirstUseOverlay] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [showLinkPassword, setShowLinkPassword] = useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const [showOnboardingTour, setShowOnboardingTour] = useState(false);

  // Appearance states
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('ivs-theme') as 'light' | 'dark';
    return savedTheme || 'dark';
  });
  const [language, setLanguage] = useState<'en' | 'vi'>(() => {
    const savedLang = localStorage.getItem('ivs-language') as 'en' | 'vi';
    return savedLang || 'vi';
  });
  const [fontSize, setFontSize] = useState<string>(() => {
    return localStorage.getItem('ivs-fontSize') || '16px';
  });
  const [fontWeight, setFontWeight] = useState<number>(() => {
    return parseInt(localStorage.getItem('ivs-fontWeight') || '400', 10);
  });

  // Auth state listener & redirect handler
  useEffect(() => {
    if (!auth || !db) {
      setIsAuthLoading(false);
      return;
    }

    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth!);
        if (result && result.user) {
          const firebaseUser = result.user;
            const userDocRef = doc(db!, "users", firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
              const savedRole = sessionStorage.getItem('authRole') as 'student' | 'teacher' || 'student';
              const newUser: User = {
                id: firebaseUser.uid,
                name: firebaseUser.displayName || 'New User',
                avatar: 'fa-user-astronaut',
                level: 'N/A',
                points: 0,
                badges: [],
                role: savedRole,
                streak: 0
              };
              await setDoc(userDocRef, newUser);
              sessionStorage.removeItem('authRole');
            }
        }
      } catch (error) {
        logger.error("Error handling redirect result:", error);
      }
    };
    handleRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Wrapped try/catch to capture unexpected errors during auth resolution
      try {
        console.info('onAuthStateChanged fired. firebaseUser:', firebaseUser);

        if (!firebaseUser) {
          // Not signed in
          setUser(null);
          setClasses({});
          setAuthStep('roleSelection');
          setIsAdmin(false);
          setIsAuthLoading(false);
          return;
        }

        // expose a few debug helpers on window for quick inspection
        try { (window as any).__DEBUG_AUTH__ = { uid: firebaseUser.uid, email: firebaseUser.email, phone: firebaseUser.phoneNumber }; } catch (e) {}

        try {
          const idTokenResult = await firebaseUser.getIdTokenResult();
          setIsAdmin(!!idTokenResult?.claims?.admin);
        } catch (e) {
          logger.warn('Failed to read idTokenResult for claims', e);
          setIsAdmin(false);
        }

        let resolvedUser: User | null = null;
        const userDocRef = doc(db!, "users", firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          resolvedUser = { id: userDoc.id, ...userDoc.data() } as User;
        } else {
          logger.warn("User document not found for UID:", firebaseUser.uid);
          const storedRole = sessionStorage.getItem('authRole') as 'student' | 'teacher' | null;
          const fallbackRole: 'student' | 'teacher' = storedRole || 'student';
          const fallbackName = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || (fallbackRole === 'teacher' ? 'New Teacher' : 'New Student');

          const fallbackUser: User = {
            ...MOCK_USER,
            id: firebaseUser.uid,
            name: fallbackName,
            email: firebaseUser.email || undefined,
            role: fallbackRole,
            avatar: MOCK_USER.avatar,
            phone: firebaseUser.phoneNumber || undefined,
          };

          await setDoc(userDocRef, { ...fallbackUser, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }, { merge: true });
          sessionStorage.removeItem('authRole');
          resolvedUser = fallbackUser;
        }

        if (resolvedUser) {
          setUser(resolvedUser);

          // Improve discoverability: open sidebar on first sign-in and steer students
          // without enrolled courses to the curriculum page so they can explore content.
          setIsSidebarOpen(true);

          if (resolvedUser.role === 'teacher') {
            const classesDocRef = doc(db!, 'classes', firebaseUser.uid);
            const classesDoc = await getDoc(classesDocRef);
            if (classesDoc.exists()) {
              setClasses(classesDoc.data() as Classes);
            } else {
              await setDoc(classesDocRef, MOCK_CLASSES);
              setClasses(MOCK_CLASSES);
            }
            setCurrentView('teacher-dashboard');
          } else {
            // Students: if no classes/content available, send them to curriculum so they can
            // discover and enroll in courses. Otherwise go to home/dashboard.
            setClasses({});
            // If the student has no classes yet, show the curriculum page for discovery
            const hasClasses = false; // student classes are stored elsewhere; default to false to promote discovery
            if (!hasClasses) {
              setCurrentView('curriculum');
            } else {
              setCurrentView('home');
            }
          }

          console.info('Resolved user set:', resolvedUser);
          
          // Check if user needs to complete profile setup
          if (!resolvedUser.profileCompleted) {
            setShowProfileSetup(true);
          } else {
            // Check if Google user needs to link password
            const hasGoogleProvider = firebaseUser.providerData.some(p => p.providerId === 'google.com');
            const hasPasswordProvider = firebaseUser.providerData.some(p => p.providerId === 'password');
            const linkPasswordShown = localStorage.getItem('ivs-link-password-shown');
            
            if (hasGoogleProvider && !hasPasswordProvider && !linkPasswordShown) {
              setShowLinkPassword(true);
            } else {
              // Check for onboarding tour
              const tourCompleted = localStorage.getItem('ivs-onboarding-tour-completed');
              if (!tourCompleted) {
                setShowOnboardingTour(true);
              } else {
                // Trigger first-use overlay for new or returning users if not shown yet
                const shown = localStorage.getItem('ivs-first-use-shown');
                if (!shown) setShowFirstUseOverlay(true);
              }
            }
          }
        } else {
          setUser(null);
          setClasses({});
          setAuthStep('roleSelection');
          setIsAdmin(false);
        }

      } catch (error) {
        logger.error('Error resolving authenticated user', error);
        setUser(null);
        setClasses({});
        setIsAdmin(false);
      } finally {
        setIsAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('ivs-theme', theme);
    // Apply dark class to both html and body for full page theme
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

  useEffect(() => {
    document.documentElement.style.fontSize = fontSize;
    localStorage.setItem('ivs-fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.style.fontWeight = fontWeight.toString();
    localStorage.setItem('ivs-fontWeight', fontWeight.toString());
  }, [fontWeight]);

  // Initialize UI sounds and attach global click handler to play sounds for elements with data-sound
  useEffect(() => {
    try {
      // Default to ENABLED for better UX (opt-out instead of opt-in)
      const saved = localStorage.getItem('ivs-sounds-enabled');
      let enabled = true; // Default enabled
      if (saved === null) {
        // First time user - enable by default
        localStorage.setItem('ivs-sounds-enabled', '1');
        enabled = true;
      } else {
        enabled = saved === '1';
      }
      if (!enabled) return;
      // initSounds is safe to call multiple times
      const mod = require('./utils/sound');
      if (mod && typeof mod.initSounds === 'function') {
        mod.initSounds('/sounds');
      }
      if (mod && typeof mod.attachGlobalSoundHandler === 'function') {
        const detach = mod.attachGlobalSoundHandler();
        return () => {
          try { detach(); } catch (e) { /* ignore */ }
        };
      }
    } catch (err) {
      // ignore if sound utilities or files are not available
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keyboard shortcuts handler
  useEffect(() => {
    // Feature flag: enable keyboard shortcuts by DEFAULT (opt-out instead of opt-in)
    let shortcutsEnabled = true; // Default to enabled
    try { 
      const saved = localStorage.getItem('ivs-enable-shortcuts');
      if (saved === null) {
        // First time user - enable by default
        localStorage.setItem('ivs-enable-shortcuts', '1');
        shortcutsEnabled = true;
      } else {
        shortcutsEnabled = saved === '1';
      }
    } catch (e) { 
      shortcutsEnabled = true; // Default to enabled even on error
    }
    if (!shortcutsEnabled) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        // Allow Ctrl+F even in inputs
        if (!(e.ctrlKey && e.key === 'f')) {
          return;
        }
      }

      // Help shortcuts
      if (e.key === '?' || e.key === 'F1') {
        e.preventDefault();
        setShowKeyboardHelp(prev => !prev);
        return;
      }

      // Close modals with Escape
      if (e.key === 'Escape') {
        if (showKeyboardHelp) {
          setShowKeyboardHelp(false);
        } else if (selectedCourse) {
          setSelectedCourse(null);
        } else if (currentView !== 'home' && currentView !== 'curriculum') {
          handleSetView('home');
        }
        return;
      }

      // Search with Ctrl+F -> open GlobalSearch overlay
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        setShowGlobalSearch(true);
        return;
      }

      // Save with Ctrl+S
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        // Trigger save if in a form context
        return;
      }

      // Command palette with Ctrl+K
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setIsSidebarOpen(true);
        return;
      }

      // Open settings with Ctrl+,
      if (e.ctrlKey && e.key === ',') {
        e.preventDefault();
        handleSetView('settings');
        return;
      }

      // Toggle theme with Ctrl+Shift+T
      if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        // Show toast notification (optional)
        console.log(`Theme switched to ${newTheme}`);
        return;
      }

      // Navigate to home with Ctrl+H
      if (e.ctrlKey && e.key === 'h') {
        e.preventDefault();
        handleSetView('home');
        return;
      }

      // Navigate to curriculum with Ctrl+L
      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        handleSetView('curriculum');
        return;
      }

      // Quick navigation (only if no modifiers and not in modal)
      if (!e.ctrlKey && !e.altKey && !e.metaKey && !showKeyboardHelp && user) {
        // Enhanced arrow key navigation - works with all focusable elements
        const isArrow = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key);
        if (isArrow) {
          e.preventDefault();
          
          // Get all focusable elements (buttons, links, inputs, etc.)
          const focusableElements = Array.from(
            document.querySelectorAll<HTMLElement>(
              'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [data-nav-target]'
            )
          ).filter(el => {
            // Only visible elements
            if (el.offsetParent === null) return false;
            // Exclude elements in hidden modals/panels
            const style = window.getComputedStyle(el);
            return style.display !== 'none' && style.visibility !== 'hidden';
          });
          
          const activeElement = document.activeElement as HTMLElement;
          const currentIndex = focusableElements.indexOf(activeElement);
          
          // If nothing focused, focus first element
          if (currentIndex === -1) {
            focusableElements[0]?.focus();
            focusableElements[0]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
          }
          
          let nextIndex = currentIndex;
          
          // Forward: ArrowRight or ArrowDown
          if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            nextIndex = (currentIndex + 1) % focusableElements.length;
          } 
          // Backward: ArrowLeft or ArrowUp
          else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
          }
          
          const nextElement = focusableElements[nextIndex];
          if (nextElement) {
            nextElement.focus();
            // Smooth scroll to keep element in view
            nextElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
          }
          return;
        }

        switch (e.key.toLowerCase()) {
          case 'h':
            e.preventDefault();
            handleSetView('home');
            break;
          case 'c':
            e.preventDefault();
            handleSetView('curriculum');
            break;
          case 's':
            e.preventDefault();
            handleSetView('settings');
            break;
          case 'a':
            e.preventDefault();
            handleSetView('ivs-assistant');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView, selectedCourse, showKeyboardHelp, user]);

  const handleSetView = (view: View) => {
    setSelectedCourse(null);
    setCurrentView(view);
    setIsSidebarOpen(false);
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleUpdateUser = async (updatedUser: User) => {
    if (user && db && !user.id.startsWith('guest-')) {
      try {
        const userDocRef = doc(db, "users", user.id);
        await updateDoc(userDocRef, { ...updatedUser });
        setUser(updatedUser);
      } catch (error) {
        logger.error("Error updating user profile:", error);
      }
    } else if (user && user.id.startsWith('guest-')) {
      setUser(updatedUser);
    }
  };

  const handleUpdateClasses = async (updatedClasses: Classes) => {
    if (user && user.role === 'teacher' && db && !user.id.startsWith('guest-')) {
      try {
        const classesDocRef = doc(db, "classes", user.id);
        await setDoc(classesDocRef, updatedClasses);
        setClasses(updatedClasses);
      } catch (error) {
        logger.error("Error updating classes:", error);
      }
    } else if (user && user.id.startsWith('guest-')) {
      setClasses(updatedClasses);
    }
  };

  const handleLogout = async () => {
    if (auth && user && !user.id.startsWith('guest-')) {
      await signOut(auth);
    } else {
      setUser(null);
      setClasses({});
      setAuthStep('roleSelection');
    }
    setCurrentView('home');
  };

  const handleGuestLogin = (role: 'student' | 'teacher' | 'foreigner-teacher') => {
    if (role === 'student') {
      const guestStudent: User = {
        ...MOCK_USER,
        id: 'guest-student-01',
        name: language === 'vi' ? 'Học sinh Khách' : 'Guest Student',
        role: 'student',
        // Do not force a gradeLevel for guest students so they can explore the full curriculum
        // Load any previously pinned courses for guest users from localStorage
        pinnedCourses: (() => {
          try {
            const raw = localStorage.getItem('ivs-guest-pinned');
            if (!raw) return undefined;
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed as string[] : undefined;
          } catch (e) {
            return undefined;
          }
        })(),
      };
      setUser(guestStudent);
    } else if (role === 'foreigner-teacher') {
      const guestForeignerTeacher: User = {
        ...MOCK_USER,
        id: 'guest-foreigner-teacher-01',
        name: language === 'vi' ? 'Giáo viên Nước ngoài Khách' : 'Guest Foreign Teacher',
        role: 'foreigner-teacher',
      };
      setUser(guestForeignerTeacher);
      setClasses(MOCK_CLASSES);
      // Set default language to English for foreigner teacher
      setLanguage('en');
    } else {
      const guestTeacher: User = {
        ...MOCK_USER,
        id: 'guest-teacher-01',
        name: language === 'vi' ? 'Giáo viên Khách' : 'Guest Teacher',
        role: 'teacher',
      };
      setUser(guestTeacher);
      setClasses(MOCK_CLASSES);
    }
  };

  const renderView = () => {
    if (selectedCourse) {
      return <CourseDetail course={selectedCourse} onBack={() => setSelectedCourse(null)} language={language} setView={handleSetView} />;
    }

    switch (currentView) {
      case 'home':
        return <Home user={user!} onUpdateUser={handleUpdateUser} onSelectCourse={handleSelectCourse} language={language} setView={handleSetView} classes={classes} />;
      case 'curriculum':
        return <Dashboard user={user!} onUpdateUser={handleUpdateUser} onSelectCourse={handleSelectCourse} language={language} setView={handleSetView} classes={classes} />;
      case 'teacher-dashboard':
        return <TeacherDashboard classes={classes} setClasses={handleUpdateClasses} language={language} />;
      case 'teacher-analytics':
        return <ClassAnalyticsDashboard classes={classes} language={language} />;
      case 'ai-content-generator':
        return <AIContentGenerator language={language} />;
      case 'learning-path':
        return <PersonalizedLearningPath user={user!} language={language} />;
      case 'ivs-assistant':
        return <IVSAssistant user={user!} language={language} />;
      case 'settings':
        return (
          <Settings
            user={user!}
            onUpdateUser={handleUpdateUser}
            classes={classes}
            onUpdateClasses={handleUpdateClasses}
            theme={theme}
            setTheme={setTheme}
            language={language}
            setLanguage={setLanguage}
            fontSize={fontSize}
            setFontSize={setFontSize}
            fontWeight={fontWeight}
            setFontWeight={setFontWeight}
          />
        );
      case 'user-guide':
        return <UserGuide language={language} />;
      case 'admin':
        return isAdmin ? <AdminPanel /> : <Home user={user!} onUpdateUser={handleUpdateUser} onSelectCourse={handleSelectCourse} language={language} setView={handleSetView} classes={classes} />;
      default:
        return <Home user={user!} onUpdateUser={handleUpdateUser} onSelectCourse={handleSelectCourse} language={language} setView={handleSetView} classes={classes} />;
    }
  };

  if (firebaseInitError) {
    return (
      <div className="h-screen flex items-center justify-center p-4 bg-red-50 dark:bg-red-900/50">
        <div className="card-glass text-center p-8 max-w-lg border-2 border-red-200 dark:border-red-800">
          <i className="fa-solid fa-triangle-exclamation text-5xl text-red-500 mb-4"></i>
          <h1 className="text-2xl font-bold text-red-800 dark:text-red-200">Application Error</h1>
          <p className="text-red-700 dark:text-red-300 mt-2">
            The application could not connect to its backend services. Please contact the administrator.
          </p>
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-800/50 rounded-md text-xs text-red-900 dark:text-red-200 text-left font-mono">
            <strong>Error Details:</strong>
            <p>{firebaseInitError}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthLoading) {
    return <Loading />;
  }

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

  return (
    <ErrorBoundary>
      <div className="relative h-screen overflow-hidden bg-slate-950 font-sans text-slate-100">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950/80 to-black" />
          <div className="pointer-events-none absolute -top-24 -left-32 h-[520px] w-[520px] rounded-full bg-sky-500/25 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-[-160px] h-[560px] w-[560px] rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 top-1/3 h-96 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_55%)]" />
        </div>

        <div className="relative z-10 flex h-full w-full">
          <Suspense fallback={<LoadingFallback />}>
            <ErrorBoundary>
              <Sidebar
                user={user}
                currentView={currentView}
                setView={handleSetView}
                language={language}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onLogout={handleLogout}
                isAdmin={isAdmin}
              />
            </ErrorBoundary>
          </Suspense>

          <div className="flex min-w-0 flex-1 flex-col">
            <Suspense fallback={<LoadingFallback />}>
              <ErrorBoundary>
                <Header currentView={currentView} language={language} onMenuClick={() => setIsSidebarOpen(true)} user={user} />
              </ErrorBoundary>
            </Suspense>

            <main className="relative flex-1 overflow-y-auto custom-scrollbar px-4 py-6 sm:px-6 lg:px-10">
              <div className="pointer-events-none absolute inset-x-12 top-6 h-48 rounded-full bg-sky-500/15 blur-3xl" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />

              <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 pb-12">
                <Suspense fallback={<LoadingFallback />}>
                  <ErrorBoundary>{renderView()}</ErrorBoundary>
                </Suspense>
              </div>

              {showFirstUseOverlay && (
                <FirstUseOverlay
                  language={language}
                  onClose={() => setShowFirstUseOverlay(false)}
                  onGoToCurriculum={() => {
                    setCurrentView('curriculum');
                    setIsSidebarOpen(true);
                    setShowFirstUseOverlay(false);
                    localStorage.setItem('ivs-first-use-shown', '1');
                  }}
                />
              )}

              {showLinkPassword && (
                <LinkPasswordModal
                  language={language}
                  onComplete={() => {
                    setShowLinkPassword(false);
                    localStorage.setItem('ivs-link-password-shown', '1');
                    // Show first-use overlay after password is set
                    const shown = localStorage.getItem('ivs-first-use-shown');
                    if (!shown) setShowFirstUseOverlay(true);
                  }}
                  onSkip={() => {
                    setShowLinkPassword(false);
                    localStorage.setItem('ivs-link-password-shown', '1');
                    // Show first-use overlay after skipping
                    const shown = localStorage.getItem('ivs-first-use-shown');
                    if (!shown) setShowFirstUseOverlay(true);
                  }}
                />
              )}

              {showOnboardingTour && user && (
                <Suspense fallback={null}>
                  <OnboardingTour
                    user={user}
                    language={language}
                    onComplete={() => {
                      setShowOnboardingTour(false);
                      const shown = localStorage.getItem('ivs-first-use-shown');
                      if (!shown) setShowFirstUseOverlay(true);
                    }}
                    onNavigate={(view) => {
                      handleSetView(view);
                    }}
                  />
                </Suspense>
              )}

              {showProfileSetup && user && (
                <ProfileSetupModal
                  user={user}
                  language={language}
                  onComplete={async (updates) => {
                    await handleUpdateUser({ ...user, ...updates });
                    setShowProfileSetup(false);
                    const tourCompleted = localStorage.getItem('ivs-onboarding-tour-completed');
                    if (!tourCompleted) {
                      setShowOnboardingTour(true);
                    } else {
                      const shown = localStorage.getItem('ivs-first-use-shown');
                      if (!shown) setShowFirstUseOverlay(true);
                    }
                  }}
                />
              )}

              {showKeyboardHelp && (
                <Suspense fallback={<LoadingFallback />}>
                  <KeyboardShortcutsHelp
                    language={language}
                    onClose={() => setShowKeyboardHelp(false)}
                  />
                </Suspense>
              )}

              {showGlobalSearch && (
                <Suspense fallback={<LoadingFallback />}>
                  <GlobalSearch
                    language={language}
                    onClose={() => setShowGlobalSearch(false)}
                    onOpenCourse={(levelIndex, unitIndex, lessonId) => {
                      // Navigate to curriculum view and open selected course / lesson
                      try {
                        const category = require('./data/curriculum').curriculumData as any[];
                        const level = category.flatMap(c => c.levels)[levelIndex];
                        if (!level) return;
                        // Build a Course object similar to other parts of the app
                        const course: any = {
                          id: `course-${level.title.en.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
                          title: language === 'vi' ? level.title.vi : level.title.en,
                          series: language === 'vi' ? category.find((c:any)=>c.levels.includes(level))?.category.vi : category.find((c:any)=>c.levels.includes(level))?.category.en,
                          level: level.subtitle.en.split(' - ')[0],
                          imageUrl: `https://picsum.photos/seed/${level.level}/400/225`,
                          description: language === 'vi' ? level.subtitle.vi : level.subtitle.en,
                          lessons: [],
                          color: '#4A90E2',
                          progress: 0,
                          rawLevel: level
                        };

                        setSelectedCourse(course);
                        setCurrentView('curriculum');

                        if (lessonId) {
                          // find the lesson in the raw level and open LessonView directly
                          const unit = level.units[unitIndex ?? 0];
                          const lesson = unit?.lessons.find((l:any) => l.id.toString() === lessonId.toString());
                          if (lesson) {
                            const mappedLesson = {
                              id: lesson.id.toString(),
                              title: language === 'vi' ? lesson.title.vi : lesson.title.en,
                              type: 'ebook',
                              content: '',
                              rawLesson: lesson
                            } as any;
                            // open LessonView by setting selectedCourse then selected lesson after small tick
                            setTimeout(() => {
                              setSelectedCourse(course);
                              // rely on CourseDetail to render LessonView when selectedLesson state is set via CourseDetail flow
                              // But we can also set a temporary global selectedLesson here by emulating CourseDetail behaviour
                              // For simplicity, we'll set current view to curriculum and let user click the lesson.
                              setShowGlobalSearch(false);
                            }, 30);
                          }
                        } else {
                          setShowGlobalSearch(false);
                        }
                      } catch (err) {
                        console.error('Error opening course from search', err);
                        setShowGlobalSearch(false);
                      }
                    }}
                  />
                </Suspense>
              )}

              <div className="relative z-20">
                <Suspense fallback={<LoadingFallback />}>
                  <ErrorBoundary>
                    <AssistiveTouch user={user!} language={language} />
                  </ErrorBoundary>
                </Suspense>
              </div>
            </main>

            {/* Bottom Navigation for Mobile */}
            <Suspense fallback={null}>
              <BottomNavigation
                user={user}
                currentView={currentView}
                setView={handleSetView}
                language={language}
                isAdmin={isAdmin}
              />
            </Suspense>
          </div>
        </div>

        {/* Keyboard shortcut indicator */}
        <div className="fixed bottom-4 left-4 z-[90] hidden lg:block">
          <button
            onClick={() => setShowKeyboardHelp(true)}
            className="group flex items-center gap-2 px-3 py-2 bg-slate-800/90 hover:bg-slate-700/90 backdrop-blur-sm text-slate-300 hover:text-white rounded-lg border border-slate-700 hover:border-slate-600 transition-all shadow-lg"
            title={language === 'vi' ? 'Xem phím tắt' : 'View keyboard shortcuts'}
          >
            <i className="fa-solid fa-keyboard text-sm"></i>
            <span className="text-xs font-medium">
              {language === 'vi' ? 'Phím tắt' : 'Shortcuts'}
            </span>
            <kbd className="ml-1 px-1.5 py-0.5 text-xs bg-slate-700 group-hover:bg-slate-600 rounded">?</kbd>
          </button>
        </div>

        {/* PWA Install Prompt */}
        {user && (
          <Suspense fallback={null}>
            <PWAInstallPrompt />
          </Suspense>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
