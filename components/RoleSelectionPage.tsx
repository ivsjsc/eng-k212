import React, { useState, useRef, useEffect } from 'react';

interface RoleSelectionPageProps {
  onSelectRole: (role: 'student' | 'teacher' | 'foreigner-teacher') => void;
  onGuestLogin: (role: 'student' | 'teacher' | 'foreigner-teacher') => void;
  language: 'en' | 'vi';
  setLanguage: (language: 'en' | 'vi') => void;
  onShowIntroduction?: () => void;
}

const RoleSelectionPage: React.FC<RoleSelectionPageProps> = ({
  onSelectRole,
  onGuestLogin,
  language,
  setLanguage
}) => {
  const t = {
    en: {
      welcome: 'Welcome to IVS English',
      subtitle: 'The English learning platform for Vietnamese people',
      student: 'I am a Student',
      studentDesc:
        'Start your English learning journey with a personalized and AI-powered curriculum.',
      teacher: 'I am a Teacher',
      teacherDesc:
        'Manage your classes, assign lessons, and track student progress.',
      foreignerTeacher: 'Foreigner Teacher',
      vietnameseTeacher: 'Vietnamese Teacher',
      guest: 'Try with a guest account',
      login: 'Login / Sign Up',
      signInSignUp: 'Sign in / Sign up',
      aboutApp: 'About IVS English',
      toggle: 'vn Tiếng Việt'
    },
    vi: {
      welcome: 'Chào mừng đến với IVS English',
      subtitle: 'Nền tảng học tiếng Anh dành cho người Việt Nam',
      student: 'Tôi là Học sinh',
      studentDesc:
        'Bắt đầu hành trình học tiếng Anh với lộ trình cá nhân hóa và AI.',
      teacher: 'Tôi là Giáo viên',
      teacherDesc:
        'Quản lý lớp học, giao bài và theo dõi tiến độ của học sinh.',
      foreignerTeacher: 'Foreigner Teacher',
      vietnameseTeacher: 'Vietnamese Teacher',
      guest: 'Dùng thử với tài khoản khách',
      login: 'Đăng nhập / Đăng ký',
      signInSignUp: 'Đăng nhập / Đăng ký',
      aboutApp: 'Giới thiệu về IVS English',
      toggle: 'us English'
    }
  }[language];

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  // Ensure landing page defaults to Vietnamese (per requirement)
  useEffect(() => {
    if (language !== 'vi') setLanguage('vi');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      if (!langRef.current) return;
      if (langRef.current.contains(e.target as Node)) return;
      setLangMenuOpen(false);
    }
    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, []);

  const RoleCard: React.FC<{
    role: 'student' | 'teacher' | 'foreigner-teacher';
    title: string;
    description: string;
    icon: string;
    bgColor: string;
    iconBg: string;
    actions?: React.ReactNode;
  }> = ({ role, title, description, icon, bgColor, iconBg, actions }) => {
    return (
      <div
        className={`w-full max-w-md text-center p-8 transition-all duration-300 flex flex-col rounded-3xl shadow-2xl ${bgColor}`}
        style={{
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div className="flex-grow">
          <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6 ${iconBg} shadow-lg`}>
            <i className={`fa-solid ${icon} text-5xl text-white`}></i>
          </div>
          <h3 className="text-3xl font-bold mb-4 text-white">{title}</h3>
          <p className="text-base text-slate-200 mb-8 leading-relaxed">{description}</p>
        </div>
        <div className="space-y-4">
          {actions || (
            <>
              <button
                onClick={() => {
                  if (role === 'foreigner-teacher') setLanguage('en');
                  else setLanguage('vi');
                  onGuestLogin(role);
                }}
                className="w-full py-3.5 rounded-xl bg-slate-700/60 text-white hover:bg-slate-700 transition-all duration-200 font-medium text-base backdrop-blur-sm border border-white/10"
              >
                {t.guest}
              </button>
              <button
                onClick={() => {
                  if (role === 'foreigner-teacher') setLanguage('en');
                  else setLanguage('vi');
                  onSelectRole(role);
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold text-base shadow-xl"
              >
                {t.login}
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-full flex flex-col items-center justify-center p-6 text-center animate-fade-in relative overflow-hidden"
      style={{
        backgroundImage: `url('/banner/ivsenglish-banner.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      onClick={(e) => {
        // if user clicks outside the inner content, treat as selecting foreigner teacher and switch to English
        if (innerRef.current && !innerRef.current.contains(e.target as Node)) {
          setLanguage('en');
          onSelectRole('foreigner-teacher');
        }
      }}
    >
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70" aria-hidden />

      <header className="absolute top-6 right-6 z-20" ref={langRef}>
        <div className="relative inline-block text-left">
          <button
            onClick={() => setLangMenuOpen(v => !v)}
            aria-haspopup="true"
            aria-expanded={langMenuOpen}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/60 text-white font-semibold shadow-lg backdrop-blur-sm hover:bg-black/70 transition-colors"
            title="Language"
          >
            <i className="fa-solid fa-globe text-lg" />
            <span className="text-sm font-medium">{language === 'en' ? 'ENGLISH' : 'TIẾNG VIỆT'}</span>
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white/95 dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden z-30">
              <button
                onClick={() => {
                  setLanguage('en');
                  setLangMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                English
              </button>
              <button
                onClick={() => {
                  setLanguage('vi');
                  setLangMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Tiếng Việt
              </button>
            </div>
          )}
        </div>
      </header>

  <div className="relative z-20 w-full max-w-7xl px-4" ref={innerRef}>
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <img
            src="/images/logo/logo-lighting.png"
            onError={e => {
              (e.currentTarget as HTMLImageElement).src = '/images/logo/logo.svg';
            }}
            alt="IVS English Logo"
            className="w-24 h-24 mx-auto mb-6 rounded-full shadow-2xl ring-4 ring-white/20"
          />
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-3 tracking-tight">
            {t.welcome}
          </h1>
          <p className="text-xl text-white/90">{t.subtitle}</p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch max-w-6xl mx-auto">
          {/* LEFT: Student Card */}
          <RoleCard
            role="student"
            title={t.student}
            description={t.studentDesc}
            icon="fa-graduation-cap"
            bgColor="bg-gradient-to-br from-blue-900/70 to-blue-800/60"
            iconBg="bg-gradient-to-br from-blue-500 to-blue-600"
            actions={
              <>
                <button
                  onClick={() => {
                    setLanguage('vi');
                    onGuestLogin('student');
                  }}
                  className="w-full py-3.5 rounded-xl bg-slate-700/60 text-white hover:bg-slate-700 transition-all duration-200 font-medium text-base backdrop-blur-sm border border-white/10"
                >
                  {t.guest}
                </button>
                <button
                  onClick={() => {
                    setLanguage('vi');
                    onSelectRole('student');
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold text-base shadow-xl"
                >
                  {t.login}
                </button>
              </>
            }
          />

          {/* RIGHT: Teacher Card with TWO options */}
          <RoleCard
            role="teacher"
            title={t.teacher}
            description={t.teacherDesc}
            icon="fa-person-chalkboard"
            bgColor="bg-gradient-to-br from-green-900/70 to-green-800/60"
            iconBg="bg-gradient-to-br from-green-500 to-green-600"
            actions={
              <>
                {/* Option 1: Foreigner Teacher - purple highlight */}
                <button
                  onClick={() => {
                    setLanguage('en');
                    onSelectRole('foreigner-teacher');
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white hover:from-purple-600 hover:to-fuchsia-700 transition-all duration-200 font-semibold text-base shadow-xl"
                >
                  {t.signInSignUp}
                </button>
                <div className="text-sm text-slate-300 -mt-2 mb-1">{t.foreignerTeacher}</div>

                {/* Guest option */}
                <button
                  onClick={() => {
                    setLanguage('vi');
                    onGuestLogin('teacher');
                  }}
                  className="w-full py-3.5 rounded-xl bg-slate-700/60 text-white hover:bg-slate-700 transition-all duration-200 font-medium text-base backdrop-blur-sm border border-white/10"
                >
                  {t.guest}
                </button>

                {/* Option 2: Vietnamese Teacher - green highlight */}
                <button
                  onClick={() => {
                    setLanguage('vi');
                    onSelectRole('teacher');
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold text-base shadow-xl"
                >
                  {t.signInSignUp}
                </button>
                <div className="text-sm text-slate-300 -mt-2">{t.vietnameseTeacher}</div>
              </>
            }
          />
        </div>
        
        {/* About App Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              const introUrl = window.location.origin + '/IVS_APP_INTRODUCTION.md';
              window.open(introUrl, '_blank', 'noopener,noreferrer');
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30 text-base font-medium shadow-lg"
          >
            <i className="fa-solid fa-info-circle text-lg"></i>
            {t.aboutApp}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;