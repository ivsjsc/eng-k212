import React, { useState, useEffect, Suspense, lazy } from 'react';
import type { View, User, Course, Classes } from './types';
import { MOCK_CLASSES, MOCK_USER } from './constants.ts';
import { auth, db, firebaseError, onAuthStateChanged, signOut, doc, getDoc, setDoc, updateDoc, getRedirectResult } from './services/firebase.ts';
import { logger } from './utils/logger';

// Lazy load heavy components
const Sidebar = lazy(() => import('./components/Sidebar.tsx'));
const Header = lazy(() => import('./components/Header'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const Home = lazy(() => import('./components/Home'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const CourseDetail = lazy(() => import('./components/CourseDetail'));
const TeacherDashboard = lazy(() => import('./components/TeacherDashboard'));
const ClassAnalyticsDashboard = lazy(() => import('./components/ClassAnalyticsDashboard')); // (mới)
const AIContentGenerator = lazy(() => import('./components/AIContentGenerator'));          // (giữ từ main)
const WritingGrader = lazy(() => import('./components/WritingGrader'));
const SpeakingPartner = lazy(() => import('./components/SpeakingPartner'));
const Settings = lazy(() => import('./components/Settings'));
const UserGuide = lazy(() => import('./components/UserGuide'));
const AssistiveTouch = lazy(() => import('./components/AssistiveTouch.tsx'));
const AuthPage = lazy(() => import('./components/AuthPage.tsx'));
const RoleSelectionPage = lazy(() => import('./components/RoleSelectionPage.tsx'));

// Keep Loading component as regular import since it's needed immediately
import Loading from './components/Loading.tsx';
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
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher'>('student');

  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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
      if (firebaseUser) {
        try {
          const idTokenResult = await firebaseUser.getIdTokenResult();
          setIsAdmin(!!idTokenResult?.claims?.admin);
        } catch (e) {
          logger.warn('Failed to read idTokenResult for claims', e);
          setIsAdmin(false);
        }
        const userDocRef = doc(db!, "users", firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = { id: userDoc.id, ...userDoc.data() } as User;
          setUser(userData);
          if (userData.role === 'teacher') {
            const classesDocRef = doc(db!, "classes", firebaseUser.uid);
            const classesDoc = await getDoc(classesDocRef);
            if (classesDoc.exists()) {
              setClasses(classesDoc.data() as Classes);
            } else {
              const teacherClassesDoc = doc(db!, 'classes', firebaseUser.uid);
              await setDoc(teacherClassesDoc, MOCK_CLASSES);
              setClasses(MOCK_CLASSES);
            }
          }
        } else {
          logger.warn("User document not found for UID:", firebaseUser.uid);
        }
      } else {
        setUser(null);
        setClasses({});
        setAuthStep('roleSelection');
        setIsAdmin(false);
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('ivs-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
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

  const handleGuestLogin = (role: 'student' | 'teacher') => {
    if (role === 'student') {
      const guestStudent: User = {
        ...MOCK_USER,
        id: 'guest-student-01',
        name: language === 'vi' ? 'Học sinh Khách' : 'Guest Student',
        role: 'student',
      };
      setUser(guestStudent);
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
        return <Home user={user!} onSelectCourse={handleSelectCourse} language={language} setView={handleSetView} classes={classes} />;
      case 'curriculum':
        return <Dashboard onSelectCourse={handleSelectCourse} user={user!} onUpdateUser={handleUpdateUser} language={language} />;
      case 'teacher-dashboard':
        return <TeacherDashboard classes={classes} setClasses={handleUpdateClasses} language={language} />;
      case 'teacher-analytics':
        return <ClassAnalyticsDashboard classes={classes} language={language} />;
      case 'ai-content-generator':
        return <AIContentGenerator language={language} />;
      case 'writing-grader':
        return <WritingGrader language={language} setView={handleSetView} />;
      case 'speaking-partner':
        return <SpeakingPartner language={language} setView={handleSetView} />;
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
        return isAdmin ? <AdminPanel /> : <Home user={user!} onSelectCourse={handleSelectCourse} language={language} setView={handleSetView} classes={classes} />;
      default:
        return <Home user={user!} onSelectCourse={handleSelectCourse} language={language} setView={handleSetView} classes={classes} />;
    }
  };

  if (firebaseError) {
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
            <p>{firebaseError}</p>
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
      <div className="flex h-screen bg-slate-100 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200">
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
        <div className="flex-1 flex flex-col h-screen">
          <Suspense fallback={<LoadingFallback />}>
            <ErrorBoundary>
              <Header currentView={currentView} language={language} onMenuClick={() => setIsSidebarOpen(true)} />
            </ErrorBoundary>
          </Suspense>
          <main className="flex-1 overflow-y-auto custom-scrollbar relative">
            <Suspense fallback={<LoadingFallback />}>
              <ErrorBoundary>{renderView()}</ErrorBoundary>
            </Suspense>
            <Suspense fallback={<LoadingFallback />}>
              <ErrorBoundary>
                <AssistiveTouch setView={handleSetView} language={language} />
              </ErrorBoundary>
            </Suspense>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
