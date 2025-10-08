import React from 'react';

interface GuestWelcomeProps {
  language: 'en' | 'vi';
  onUpgrade?: () => void;
}

const GuestWelcome: React.FC<GuestWelcomeProps> = ({ language, onUpgrade }) => {
  const t = {
    en: {
      title: '👋 Welcome, Guest!',
      subtitle: 'Explore IVS English K-12 Learning Platform',
      features: {
        title: 'What You Can Try:',
        list: [
          { icon: '📚', title: 'Browse Curriculum', desc: 'Explore courses for all grade levels (K-12)' },
          { icon: '📖', title: 'View Ebooks', desc: 'Access sample pages from our textbooks' },
          { icon: '🎯', title: 'Sample Lessons', desc: 'Try out interactive lesson content' },
          { icon: '🤖', title: 'AI Demo', desc: 'Test basic AI features with limited access' },
        ]
      },
      limitations: {
        title: '⚠️ Guest Limitations:',
        list: [
          'Cannot save progress',
          'Limited AI interactions (3 per day)',
          'Sample learning paths only',
          'No personalized recommendations',
        ]
      },
      benefits: {
        title: '✨ Create a Free Account to:',
        list: [
          'Save your learning progress',
          'Access full curriculum',
          'Get 10 AI requests per day',
          'Receive personalized recommendations',
          'Track your achievements',
        ]
      },
      cta: {
        signup: 'Create Free Account',
        login: 'Already have an account? Log in',
        premium: 'See Premium Features',
      }
    },
    vi: {
      title: '👋 Chào mừng Khách!',
      subtitle: 'Khám phá Nền tảng Học tiếng Anh IVS K-12',
      features: {
        title: 'Bạn có thể dùng thử:',
        list: [
          { icon: '📚', title: 'Xem Chương trình', desc: 'Khám phá khóa học cho tất cả cấp lớp (K-12)' },
          { icon: '📖', title: 'Xem Ebook', desc: 'Truy cập trang mẫu từ sách giáo khoa' },
          { icon: '🎯', title: 'Bài học Mẫu', desc: 'Dùng thử nội dung bài học tương tác' },
          { icon: '🤖', title: 'AI Demo', desc: 'Thử nghiệm tính năng AI cơ bản với quyền hạn chế' },
        ]
      },
      limitations: {
        title: '⚠️ Giới hạn Khách:',
        list: [
          'Không lưu được tiến độ',
          'Giới hạn tương tác AI (3 lần/ngày)',
          'Chỉ xem lộ trình học mẫu',
          'Không có đề xuất cá nhân hóa',
        ]
      },
      benefits: {
        title: '✨ Tạo Tài khoản Miễn phí để:',
        list: [
          'Lưu tiến độ học tập của bạn',
          'Truy cập toàn bộ chương trình',
          'Nhận 10 yêu cầu AI mỗi ngày',
          'Nhận đề xuất cá nhân hóa',
          'Theo dõi thành tích của bạn',
        ]
      },
      cta: {
        signup: 'Tạo Tài khoản Miễn phí',
        login: 'Đã có tài khoản? Đăng nhập',
        premium: 'Xem Tính năng Premium',
      }
    }
  }[language];

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-4">
          <i className="fa-solid fa-user-astronaut text-5xl text-blue-600 dark:text-blue-400"></i>
        </div>
        <h1 className="text-4xl font-bold mb-2">{t.title}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">{t.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Features Card */}
        <div className="card-glass p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <i className="fa-solid fa-rocket text-blue-500"></i>
            {t.features.title}
          </h2>
          <div className="space-y-4">
            {t.features.list.map((feature, index) => (
              <div key={index} className="flex gap-3 items-start">
                <span className="text-3xl">{feature.icon}</span>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Limitations Card */}
        <div className="card-glass p-6 bg-yellow-50/50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-700">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <i className="fa-solid fa-exclamation-triangle text-yellow-600"></i>
            {t.limitations.title}
          </h2>
          <ul className="space-y-2">
            {t.limitations.list.map((limitation, index) => (
              <li key={index} className="flex items-start gap-2">
                <i className="fa-solid fa-times-circle text-red-500 mt-1"></i>
                <span className="text-slate-700 dark:text-slate-300">{limitation}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Benefits Card */}
      <div className="card-glass p-6 mb-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <i className="fa-solid fa-gift text-green-600"></i>
          {t.benefits.title}
        </h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {t.benefits.list.map((benefit, index) => (
            <div key={index} className="flex items-start gap-2">
              <i className="fa-solid fa-check-circle text-green-500 mt-1"></i>
              <span className="text-slate-700 dark:text-slate-300">{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            className="btn bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white flex-1"
            onClick={() => {
              // Navigate to signup
              window.location.hash = '#auth?mode=signup';
            }}
          >
            <i className="fa-solid fa-user-plus mr-2"></i>
            {t.cta.signup}
          </button>
          
          <button 
            className="btn btn-secondary flex-1"
            onClick={() => {
              // Navigate to login
              window.location.hash = '#auth?mode=login';
            }}
          >
            <i className="fa-solid fa-sign-in-alt mr-2"></i>
            {t.cta.login}
          </button>
        </div>

        <div className="mt-4 text-center">
          <button 
            onClick={onUpgrade}
            className="text-purple-600 dark:text-purple-400 hover:underline font-semibold"
          >
            <i className="fa-solid fa-crown mr-1"></i>
            {t.cta.premium}
          </button>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="card-glass p-6 bg-blue-50/50 dark:bg-blue-900/10">
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <i className="fa-solid fa-lightbulb text-yellow-500"></i>
          {language === 'en' ? '💡 Quick Tips' : '💡 Mẹo Nhanh'}
        </h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="flex gap-2">
            <span className="text-2xl">1️⃣</span>
            <p>{language === 'en' 
              ? 'Browse the curriculum to see what courses are available' 
              : 'Xem chương trình để biết các khóa học có sẵn'}</p>
          </div>
          <div className="flex gap-2">
            <span className="text-2xl">2️⃣</span>
            <p>{language === 'en' 
              ? 'Try viewing some ebook samples to see the content quality' 
              : 'Thử xem một số mẫu ebook để biết chất lượng nội dung'}</p>
          </div>
          <div className="flex gap-2">
            <span className="text-2xl">3️⃣</span>
            <p>{language === 'en' 
              ? 'Test the AI assistant with 3 free questions per day' 
              : 'Dùng thử trợ lý AI với 3 câu hỏi miễn phí mỗi ngày'}</p>
          </div>
          <div className="flex gap-2">
            <span className="text-2xl">4️⃣</span>
            <p>{language === 'en' 
              ? 'Create an account to unlock full features and save progress' 
              : 'Tạo tài khoản để mở khóa đầy đủ tính năng và lưu tiến độ'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestWelcome;
