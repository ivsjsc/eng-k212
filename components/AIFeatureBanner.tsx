import React from 'react';

interface AIFeatureBannerProps {
  language: 'en' | 'vi';
  featureName: string;
  currentUsage?: number;
  maxUsage?: number;
  isDemo?: boolean;
  onUpgrade?: () => void;
}

const AIFeatureBanner: React.FC<AIFeatureBannerProps> = ({ 
  language, 
  featureName, 
  currentUsage = 0, 
  maxUsage = 3,
  isDemo = false,
  onUpgrade 
}) => {
  const t = {
    en: {
      demoMode: '🎭 Demo Mode',
      demoDescription: 'This is a demo feature. Responses are pre-written samples, not real AI.',
      freeMode: '🆓 Free Tier',
      usage: 'Daily Usage',
      remaining: 'remaining',
      upgrade: 'Upgrade to Premium',
      premiumFeatures: {
        title: '💎 Premium Benefits:',
        items: [
          'Unlimited AI requests',
          'Real-time AI responses',
          'Personalized learning paths',
          'Advanced AI features',
          'Priority support'
        ]
      }
    },
    vi: {
      demoMode: '🎭 Chế độ Demo',
      demoDescription: 'Đây là tính năng demo. Câu trả lời là mẫu có sẵn, không phải AI thực.',
      freeMode: '🆓 Gói Miễn phí',
      usage: 'Sử dụng Hàng ngày',
      remaining: 'còn lại',
      upgrade: 'Nâng cấp lên Premium',
      premiumFeatures: {
        title: '💎 Quyền lợi Premium:',
        items: [
          'Yêu cầu AI không giới hạn',
          'Phản hồi AI thời gian thực',
          'Lộ trình học cá nhân hóa',
          'Tính năng AI nâng cao',
          'Hỗ trợ ưu tiên'
        ]
      }
    }
  }[language];

  const usagePercentage = (currentUsage / maxUsage) * 100;
  const remainingUsage = maxUsage - currentUsage;

  return (
    <div className="mb-4">
      {isDemo ? (
        // Demo Mode Banner
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-2 border-amber-300 dark:border-amber-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-3xl">🎭</div>
            <div className="flex-1">
              <h3 className="font-bold text-amber-900 dark:text-amber-200 mb-1">
                {t.demoMode} - {featureName}
              </h3>
              <p className="text-sm text-amber-800 dark:text-amber-300 mb-3">
                {t.demoDescription}
              </p>
              
              {onUpgrade && (
                <button
                  onClick={onUpgrade}
                  className="btn btn-sm bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <i className="fa-solid fa-crown mr-2"></i>
                  {t.upgrade}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Free Tier with Usage
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-lg p-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🆓</span>
              <div>
                <h3 className="font-bold text-blue-900 dark:text-blue-200">
                  {t.freeMode} - {featureName}
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {t.usage}: <span className="font-bold">{currentUsage}/{maxUsage}</span>
                  {remainingUsage > 0 && (
                    <span className="ml-2">({remainingUsage} {t.remaining})</span>
                  )}
                </p>
              </div>
            </div>

            {onUpgrade && (
              <button
                onClick={onUpgrade}
                className="btn btn-sm bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <i className="fa-solid fa-crown mr-1"></i>
                {t.upgrade}
              </button>
            )}
          </div>

          {/* Usage Progress Bar */}
          <div className="mb-3">
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  usagePercentage >= 100 
                    ? 'bg-red-500' 
                    : usagePercentage >= 70 
                    ? 'bg-yellow-500' 
                    : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
              ></div>
            </div>
          </div>

          {remainingUsage === 0 && (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded p-2 mb-3">
              <p className="text-sm text-red-800 dark:text-red-200 text-center">
                <i className="fa-solid fa-exclamation-circle mr-1"></i>
                {language === 'en' 
                  ? 'Daily limit reached! Upgrade for unlimited access.' 
                  : 'Đã đạt giới hạn hàng ngày! Nâng cấp để truy cập không giới hạn.'}
              </p>
            </div>
          )}

          {/* Premium Features Teaser */}
          <details className="text-sm">
            <summary className="cursor-pointer font-semibold text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100">
              {t.premiumFeatures.title}
            </summary>
            <ul className="mt-2 space-y-1 ml-4">
              {t.premiumFeatures.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-green-500 mt-0.5"></i>
                  <span className="text-slate-700 dark:text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </details>
        </div>
      )}
    </div>
  );
};

export default AIFeatureBanner;
