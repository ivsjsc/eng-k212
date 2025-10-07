import React, { useState, useRef, useEffect } from 'react';
import AboutModal from './AboutModal';

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
  const [aboutOpen, setAboutOpen] = useState(false);
  const t = {
    en: {
      welcome: 'Welcome to ENGLISH LEARNERS',
      byline: 'by IVS',
      subtitle: 'An English learning platform for every learner, harmonizing Vietnamese and international standards in a world shaped by accelerating technology.',
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
      aboutApp: 'About English Learners',
      toggle: 'vn Tiếng Việt'
    },
    vi: {
      welcome: 'Chào mừng đến ENGLISH LEARNERS',
      byline: 'bởi IVS',
      subtitle: 'Nền tảng học tiếng Anh dành cho mọi người, kết nối tinh thần Việt và chuẩn mực toàn cầu giữa thời đại công nghệ bùng nổ.',
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
      signInSignUp: 'Sign in / Sign up',
      aboutApp: 'Giới thiệu về English Learners',
      toggle: 'us English'
    }
  }[language];

  // Language switching is handled inside the app (sidebar). Removed local language control from login page.
  const innerRef = useRef<HTMLDivElement | null>(null);

  // Ensure landing page defaults to Vietnamese (per requirement)
  useEffect(() => {
    if (language !== 'vi') setLanguage('vi');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Removed language menu event listener (login page no longer shows language menu)

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
          <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6 ${iconBg} shadow-lg overflow-hidden`}>
            {icon && (icon.startsWith('/') || icon.includes('.webp') || icon.includes('.png')) ? (
              <img src={icon} alt={`${title} icon`} className="w-16 h-16 object-contain" />
            ) : (
              <i className={`fa-solid ${icon} text-5xl text-white`}></i>
            )}
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
        backgroundImage: `url('/images/ivs-login-preview.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      // No outer click quick-select behavior; language switching is available in the app sidebar only.
      onClick={() => { /* intentionally no-op */ }}
    >
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70" aria-hidden />

  <div className="relative z-20 w-full max-w-7xl px-4" ref={innerRef}>
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <picture>
            <source srcSet="/images/logo/logo-lighting.webp" type="image/webp" />
            <source srcSet="/images/logo/logo-lighting.png" type="image/png" />
            <img
              src="/images/logo/logo-lighting.png"
              onError={e => { (e.currentTarget as HTMLImageElement).src = '/images/logo/logo.svg'; }}
              alt="IVS English Logo"
              className="w-24 h-24 mx-auto mb-6 rounded-full shadow-2xl ring-4 ring-white/20"
            />
          </picture>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-1 tracking-tight">
            {t.welcome} <span className="text-sm align-super font-light ml-3">{t.byline}</span>
          </h1>
          <p className="text-xl text-white/90 mb-2">{t.subtitle}</p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-stretch max-w-6xl mx-auto">
          {/* LEFT: Student Card */}
          <RoleCard
            role="student"
            title={t.student}
            description={t.studentDesc}
            icon="/images/logo/icon-student.webp"
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
                  <span className="inline-flex items-center justify-center gap-2">
                    <img src="/images/logo/logo-lighting.webp" alt="logo" className="w-5 h-5 inline-block" />
                    <span>{t.guest}</span>
                  </span>
                </button>
                <button
                  onClick={() => {
                    setLanguage('vi');
                    onSelectRole('student');
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold text-base shadow-xl"
                >
                  <span className="inline-flex items-center justify-center gap-3">
                    <img src="/google-icon.svg" alt="google" className="w-5 h-5" />
                    <img src="/microsoft-icon.svg" alt="microsoft" className="w-5 h-5" />
                    <img src="/linkedin-icon.svg" alt="linkedin" className="w-5 h-5" />
                    <span>{t.login}</span>
                  </span>
                </button>
              </>
            }
          />

          {/* RIGHT: Teacher Card with TWO options */}
          <RoleCard
            role="teacher"
            title={t.teacher}
            description={t.teacherDesc}
            icon="/images/logo/icon-teacher.webp"
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
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white hover:from-purple-600 hover:to-fuchsia-700 transition-all duration-200 font-semibold text-base shadow-xl flex items-center justify-center gap-3"
                >
                  <span className="flex items-center gap-3">
                    <img src="/google-icon.svg" alt="google" className="w-5 h-5" />
                    <img src="/microsoft-icon.svg" alt="microsoft" className="w-5 h-5" />
                    <img src="/linkedin-icon.svg" alt="linkedin" className="w-5 h-5" />
                    <span>{t.signInSignUp}</span>
                  </span>
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
                  <span className="inline-flex items-center justify-center gap-2">
                    <img src="/images/logo/logo-lighting.webp" alt="logo" className="w-5 h-5 inline-block" />
                    <span>{t.guest}</span>
                  </span>
                </button>

                {/* Option 2: Vietnamese Teacher - green highlight */}
                <button
                  onClick={() => {
                    setLanguage('vi');
                    onSelectRole('teacher');
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold text-base shadow-xl"
                >
                  <span className="inline-flex items-center justify-center gap-3">
                    <img src="/google-icon.svg" alt="google" className="w-5 h-5" />
                    <img src="/microsoft-icon.svg" alt="microsoft" className="w-5 h-5" />
                    <img src="/linkedin-icon.svg" alt="linkedin" className="w-5 h-5" />
                    <span>{t.signInSignUp}</span>
                  </span>
                </button>
                <div className="text-sm text-slate-300 -mt-2">{t.vietnameseTeacher}</div>
              </>
            }
          />
        </div>
        
        {/* About App Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setAboutOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30 text-base font-medium shadow-lg"
          >
            <i className="fa-solid fa-info-circle text-lg"></i>
            {t.aboutApp}
          </button>
        </div>

        <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} language={language} />
        
        {/* Bilingual footer block */}
        <div className="mt-8 text-sm text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {language === 'en' ? (
            <>
              <div className="text-slate-100 font-medium mb-1">@2025</div>
                <div className="mb-2">Published by <a href="https://ivsacademy.edu.vn" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">IVS Education &amp; IVS Celestech, IVS JSC.</a></div>
            </>
          ) : (
            <>
              <div className="text-slate-100 font-medium mb-1">From local roots to global routes.</div>
              <div className="mb-2">Developed by IVS Education &amp; IVS Celestech, IVS JSC.</div>
            </>
          )}

            <div className="mt-2 text-slate-400">©2025 All rights reserved IVS JSC</div>
      
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;