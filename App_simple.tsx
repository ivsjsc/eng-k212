import React, { useState, useEffect } from 'react';
import { User } from './types';
import RoleSelectionPage from './components/RoleSelectionPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import Loading from './components/Loading';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authStep, setAuthStep] = useState<'roleSelection' | 'login'>('roleSelection');
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'foreigner-teacher'>('student');
  const [language, setLanguage] = useState<'en' | 'vi'>('vi');

  const handleGuestLogin = (role: 'student' | 'teacher' | 'foreigner-teacher') => {
    const guestUser: User = {
      id: `guest-${role}-01`,
      name: role === 'student' ? 'Học sinh Khách' : 'Giáo viên Khách',
      avatar: 'fa-user',
      level: 'Beginner',
      points: 0,
      badges: [],
      role: role,
      streak: 0
    };
    setUser(guestUser);
  };

  if (isAuthLoading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="h-screen bg-slate-100 dark:bg-slate-900">
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Dashboard 
        user={user} 
        onUpdateUser={setUser}
        onSelectCourse={(course) => console.log('Selected course:', course)}
        language={language}
        setView={() => {}}
        classes={{}}
      />
    </div>
  );
}

export default App;