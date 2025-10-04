import React, { useState, useRef, useEffect } from 'react';

interface RoleSelectionPageProps {
  onSelectRole: (role: 'student' | 'teacher') => void;
  onGuestLogin: (role: 'student' | 'teacher') => void;
  language: 'en' | 'vi';
  setLanguage: (language: 'en' | 'vi') => void;
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
      guest: 'Try with a guest account',
      login: 'Login / Sign Up',
      toggle: 'vn Tiếng Việt'
    },
    vi: {
      welcome: 'Chào mừng đến IVS English',
      subtitle: 'Nền tảng học tiếng Anh dành cho Người Việt',
      student: 'Tôi là Học sinh',
      studentDesc:
        'Bắt đầu hành trình học tiếng Anh với lộ trình cá nhân hóa và AI.',
      teacher: 'Tôi là Giáo viên',
      teacherDesc:
        'Quản lý lớp học, giao bài và theo dõi tiến độ của học sinh.',
      guest: 'Dùng thử với vai trò khách',
      login: 'Đăng nhập / Đăng ký',
      toggle: 'us English'
    }
  }[language];

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      if (!langRef.current) return;
      if (langRef.current.contains(e.target as Node)) return;
      setLangMenuOpen(false);
    }
    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, []);

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  const RoleCard = ({
    role,
    title,
    description,
    icon,
    color,
    buttonColor
  }: {
    role: 'student' | 'teacher';
    title: string;
    description: string;
    icon: string;
    color: string;
    buttonColor: string;
  }) => (
    <div
      className={`w-full max-w-sm text-center p-6 sm:p-8 transition-all duration-300 flex flex-col border-t-4 ${color} rounded-2xl shadow-lg card interactive-scale interactive-glow`
      }
      style={{
        background: 'linear-gradient(180deg, rgba(15,23,42,0.88), rgba(2,6,23,0.95))',
        backdropFilter: 'blur(6px)'
      }}
    >
      <div className="flex-grow">
        <div
          className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6 ${buttonColor.replace(
            'bg-',
            'bg-opacity-20 '
          )}`}
        >
          <i
            className={`fa-solid ${icon} text-4xl ${buttonColor.replace(
              'bg-',
              'text-'
            )}`}
          ></i>
        </div>
        <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-base text-slate-300 mb-6">
          {description}
        </p>
      </div>
      <div className="space-y-3">
        <button
          onClick={() => onGuestLogin(role)}
          className="btn bg-slate-700/80 text-slate-100 hover:bg-slate-700 w-full py-3 sm:py-2"
        >
          {t.guest}
        </button>
        <button
          onClick={() => onSelectRole(role)}
          className={`btn ${buttonColor} text-white w-full py-3 sm:py-2`}
          style={{ boxShadow: '0 8px 24px rgba(2,6,23,0.35)' }}
        >
          {t.login}
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-full flex flex-col items-center justify-center p-6 text-center animate-fade-in relative overflow-hidden"
      style={{
        backgroundImage: `url('/banner/ivsenglish-banner.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dark overlay to ensure text contrast */}
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70" aria-hidden></div>

      <header className="absolute top-6 right-6 z-20" ref={langRef}>
        <div className="relative inline-block text-left">
          <button
            onClick={() => setLangMenuOpen(v => !v)}
            aria-haspopup="true"
            aria-expanded={langMenuOpen}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 text-white/90 shadow backdrop-blur-sm"
            title="Language"
          >
            <i className="fa-solid fa-globe text-lg"></i>
            <span className="sr-only">Language</span>
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white/95 dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden z-30">
              <button
                onClick={() => { setLanguage('en'); setLangMenuOpen(false); }}
                className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                English
              </button>
              <button
                onClick={() => { setLanguage('vi'); setLangMenuOpen(false); }}
                className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Tiếng Việt
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="relative z-20 w-full max-w-4xl">
        <img
          src="/images/logo/logo-lighting.png"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/logo/logo.svg'; }}
          alt="IVS English Logo"
          className="w-28 h-28 mx-auto mb-4 rounded-full border-4 border-white/20 shadow-xl"
        />

        <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-2">
          {t.welcome}
        </h1>
        <p className="text-lg text-white/90 mb-12">
          {t.subtitle}
        </p>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
          <RoleCard
            role="student"
            title={t.student}
            description={t.studentDesc}
            icon="fa-graduation-cap"
            color="border-blue-500"
            buttonColor="bg-blue-500"
          />
          <RoleCard
            role="teacher"
            title={t.teacher}
            description={t.teacherDesc}
            icon="fa-person-chalkboard"
            color="border-green-500"
            buttonColor="bg-green-500"
          />
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;