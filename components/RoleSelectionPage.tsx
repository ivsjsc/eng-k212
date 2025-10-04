import React from 'react';

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
      className={`card-glass w-full max-w-sm text-center p-8 transition-all duration-300 flex flex-col border-t-4 ${color}`}
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
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-base text-slate-600 dark:text-slate-400 mb-6">
          {description}
        </p>
      </div>
      <div className="space-y-3">
        <button
          onClick={() => onGuestLogin(role)}
          className="btn bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 w-full"
        >
          {t.guest}
        </button>
        <button
          onClick={() => onSelectRole(role)}
          className={`btn ${buttonColor} text-white w-full`}
        >
          {t.login}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 text-center animate-fade-in">
      <header className="absolute top-6 right-6">
        <button
          onClick={handleLanguageToggle}
            className="btn bg-white/20 dark:bg-slate-800/50 backdrop-blur-sm text-sm"
        >
          {t.toggle}
        </button>
      </header>

      <div className="w-full">
        <img
          src="/images/logo/logo.svg"
          alt="IVS English Logo"
          className="w-24 h-24 mx-auto mb-4"
        />
        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-2">
          {t.welcome}
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-12">
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