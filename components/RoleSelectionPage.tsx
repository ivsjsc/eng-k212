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
      welcome: 'Welcome to ENGLISH LEARNERS',
      byline: 'by IVS',
      subtitle: 'An English learning platform for every learner, harmonizing Vietnamese and international standards in a world shaped by accelerating technology.',
      slogan: 'From local roots to global routes.' ,
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
      welcome: 'Chào mừng đến ENGLISH LEARNERS',
      byline: 'bởi IVS',
      subtitle: 'Nền tảng học tiếng Anh dành cho mọi người, kết nối tinh thần Việt và chuẩn mực toàn cầu giữa thời đại công nghệ bùng nổ.',
      slogan: 'Từ gốc Việt đến đường quốc tế.',
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
        backgroundImage: `url('/banner/ivsenglish-banner.png')`,
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
          <p className="text-sm text-slate-200 italic mb-6">{language === 'en' ? t.slogan : t.slogan}</p>
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
                    {/* Microsoft icon (inline SVG) */}
                    <svg width="20" height="20" viewBox="0 0 102 102" className="inline-block" aria-hidden>
                      <path d="M0 0 C14.85 0 29.7 0 45 0 C45 14.85 45 29.7 45 45 C30.15 45 15.3 45 0 45 C0 30.15 0 15.3 0 0 Z " fill="#FEBA08" transform="translate(54,54)"/>
                      <path d="M0 0 C14.85 0 29.7 0 45 0 C45 14.85 45 29.7 45 45 C30.15 45 15.3 45 0 45 C0 30.15 0 15.3 0 0 Z " fill="#06A6F0" transform="translate(5,54)"/>
                      <path d="M0 0 C14.85 0 29.7 0 45 0 C45 14.85 45 29.7 45 45 C30.15 45 15.3 45 0 45 C0 30.15 0 15.3 0 0 Z " fill="#F35325" transform="translate(5,5)"/>
                      <path d="M0 0 C14.85 0 29.7 0 45 0 C45 14.85 45 29.7 45 45 C30.15 45 15.3 45 0 45 C0 30.15 0 15.3 0 0 Z " fill="#81BC06" transform="translate(54,5)"/>
                    </svg>
                    {/* LinkedIn icon (inline SVG) */}
                    <svg width="18" height="18" viewBox="0 0 40 40" className="inline-block" aria-hidden>
                      <path d="M0 0 C4.65691145 2.81558035 7.6560708 6.50056202 9.625 11.5625 C10.80071849 18.96360562 10.65221783 25.63429647 6.3046875 31.9140625 C1.08755535 37.03413173 -3.18139041 38.31310603 -10.25 38.25 C-11.04994385 38.24564941 -11.8498877 38.24129883 -12.67407227 38.23681641 C-17.37618296 38.05483649 -20.59631488 37.57020933 -24.3125 34.4375 C-26.02734375 32.47265625 -26.02734375 32.47265625 -27.375 30.5625 C-28.035 29.675625 -28.695 28.78875 -29.375 27.875 C-31.23017538 21.72973154 -31.23017538 15.39526846 -29.375 9.25 C-22.16296788 -0.44116816 -11.79797149 -5.0204134 0 0 Z " fill="#0B64C1" transform="translate(30.375,2.4375)"/>
                      <path d="M0 0 C0.33 0 0.66 0 1 0 C1 6.27 1 12.54 1 19 C1.66 19 2.32 19 3 19 C3 12.73 3 6.46 3 0 C3.33 0 3.66 0 4 0 C4 6.27 4 12.54 4 19 C5.98 19 7.96 19 10 19 C10 14.71 10 10.42 10 6 C11.65 5.67 13.3 5.34 15 5 C16 6 16 6 16.09765625 8.94140625 C16.08605469 10.13636719 16.07445313 11.33132812 16.0625 12.5625 C16.05347656 13.76003906 16.04445313 14.95757812 16.03515625 16.19140625 C16.02355469 17.11824219 16.01195313 18.04507813 16 19 C17.98 19 19.96 19 22 19 C22 14.38 22 9.76 22 5 C22.33 5 22.66 5 23 5 C23.16249454 7.41936317 23.28097817 9.82781859 23.375 12.25 C23.42527344 12.93191406 23.47554687 13.61382812 23.52734375 14.31640625 C23.5859375 16.328125 23.5859375 16.328125 23 20 C19.14303782 23.84469839 15.54689187 24.53007301 10.31835938 24.59570312 C9.13983398 24.57926758 9.13983398 24.57926758 7.9375 24.5625 C6.75317383 24.59827148 6.75317383 24.59827148 5.54492188 24.63476562 C1.09524603 24.62357616 -0.50416993 24.41097537 -4.05859375 21.46484375 C-4.69925781 20.65144531 -5.33992187 19.83804688 -6 19 C-4.02 19 -2.04 19 0 19 C0 12.73 0 6.46 0 0 Z " fill="#166BC4" transform="translate(12,16)"/>
                      <path d="M0 0 C2.1484375 1.50390625 2.1484375 1.50390625 4 4 C4.2906124 6.89449949 4.38186045 9.37949935 4.25 12.25 C4.23195313 12.99507812 4.21390625 13.74015625 4.1953125 14.5078125 C4.14835649 16.33909701 4.07661652 18.16971649 4 20 C2.02 20 0.04 20 -2 20 C-2.33 15.71 -2.66 11.42 -3 7 C-4.32 7 -5.64 7 -7 7 C-7.33 11.29 -7.66 15.58 -8 20 C-9.98 20 -11.96 20 -14 20 C-14 13.73 -14 7.46 -14 1 C-12.35 1 -10.7 1 -9 1 C-9 1.66 -9 2.32 -9 3 C-8.34 3 -7.68 3 -7 3 C-7 2.34 -7 1.68 -7 1 C-4.4086487 -0.29567565 -2.87704151 -0.34250494 0 0 Z " fill="#F4F8FC" transform="translate(30,15)"/>
                      <path d="M0 0 C0.66 0.99 1.32 1.98 2 3 C5.05429073 4.21284876 5.05429073 4.21284876 8 5 C8 5.33 8 5.66 8 6 C6.35 6 4.7 6 3 6 C3 12.6 3 19.2 3 26 C-2.36396743 20.63603257 -3.14374956 19.22659138 -3.25 12.1875 C-3.22590362 7.21762197 -2.74672261 4.12008392 0 0 Z " fill="#0762C0" transform="translate(3,9)"/>
                      <path d="M0 0 C1.98 0 3.96 0 6 0 C6 6.27 6 12.54 6 19 C4.02 19 2.04 19 0 19 C0 12.73 0 6.46 0 0 Z " fill="#F9FBFD" transform="translate(6,16)"/>
                      <path d="M0 0 C2.0625 0.4375 2.0625 0.4375 4 1 C4.625 2.875 4.625 2.875 5 5 C4.34 5.66 3.68 6.32 3 7 C0.375 6.625 0.375 6.625 -2 6 C-1.125 1.125 -1.125 1.125 0 0 Z " fill="#EAF2F9" transform="translate(8,6)"/>
                    </svg>
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
        <div className="mt-8 text-center">
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
        
        {/* Bilingual footer block */}
        <div className="mt-8 text-sm text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {language === 'en' ? (
            <>
              <div className="text-slate-100 font-medium mb-1">English Version – 2025 Standard</div>
              <div className="mb-2">Developed by IVS Education &amp; IVS Celestech, under IVS JSC, this platform delivers a Vietnamese-rooted yet globally-aligned English learning experience. Designed for all levels, it integrates AI, adaptive learning, and international standards to meet the demands of a rapidly evolving digital era.</div>
            </>
          ) : (
            <>
              <div className="text-slate-100 font-medium mb-1">🇻🇳 Phiên bản tiếng Việt tương đương</div>
              <div className="mb-2">Ứng dụng được phát triển bởi IVS Education &amp; IVS Celestech, trực thuộc IVS JSC. Nền tảng học tiếng Anh này kết hợp tinh thần Thuần Việt với chuẩn mực Quốc tế, dành cho mọi cấp độ. Tích hợp AI, học tập thích ứng và tiêu chuẩn toàn cầu, ứng dụng đáp ứng nhu cầu giáo dục trong thời đại số phát triển vượt bậc.</div>
            </>
          )}

          <div className="mt-2 text-slate-400">{language === 'en' ? 'Slogan:' : 'Slogan:'} <span className="font-semibold">{language === 'en' ? t.slogan : t.slogan}</span></div>
          <div className="mt-2 text-slate-400">Tích hợp Firebase Firestore để lưu dữ liệu học tập</div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;