import React from 'react';
import { PRICING_PLANS } from '../data/demo-ai-responses';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'vi';
  userRole: 'student' | 'teacher';
}

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, language, userRole }) => {
  if (!isOpen) return null;

  const plans = PRICING_PLANS[language];
  const t = {
    en: {
      title: "Upgrade to Premium",
      subtitle: "Unlock all AI-powered features and accelerate your learning",
      currentPlan: "Current Plan: Free",
      mostPopular: "Most Popular",
      comingSoon: "Coming Soon",
      note: "* All prices in Vietnamese Dong (₫). Payment methods: Bank transfer, Momo, ZaloPay"
    },
    vi: {
      title: "Nâng cấp lên Premium",
      subtitle: "Mở khóa tất cả tính năng AI và tăng tốc quá trình học",
      currentPlan: "Gói hiện tại: Miễn phí",
      mostPopular: "Phổ biến nhất",
      comingSoon: "Sắp ra mắt",
      note: "* Tất cả giá bằng Đồng Việt Nam (₫). Phương thức thanh toán: Chuyển khoản, Momo, ZaloPay"
    }
  }[language];

  const handleUpgrade = (planType: string) => {
    // TODO: Integrate with payment gateway
    alert(`Upgrade to ${planType} - Payment integration coming soon!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-3xl shadow-2xl border border-white/10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all z-10"
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark text-white text-xl"></i>
        </button>

        {/* Header */}
        <div className="text-center pt-12 pb-8 px-6">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-4">
            <span className="text-blue-300 font-semibold text-sm">{t.currentPlan}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-lg text-slate-300">{t.subtitle}</p>
        </div>

        {/* Pricing cards */}
        <div className="px-6 pb-12">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Student Plan */}
            <div className={`relative rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 ${
              userRole === 'student' 
                ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-400 shadow-xl shadow-blue-500/20' 
                : 'bg-white/5 border-white/10 hover:border-blue-400/50'
            }`}>
              {userRole === 'student' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                  <span className="text-white text-xs font-bold">{t.mostPopular}</span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plans.student.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="text-4xl font-black text-white">{plans.student.price}</span>
                </div>
                <p className="text-slate-400 text-sm">{plans.student.period}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plans.student.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-200 text-sm">
                    <i className="fa-solid fa-check text-green-400 mt-1"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleUpgrade('student')}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                {plans.student.cta}
              </button>
            </div>

            {/* Teacher Plan */}
            <div className={`relative rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 ${
              userRole === 'teacher' 
                ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-400 shadow-xl shadow-emerald-500/20' 
                : 'bg-white/5 border-white/10 hover:border-emerald-400/50'
            }`}>
              {userRole === 'teacher' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full">
                  <span className="text-white text-xs font-bold">{t.mostPopular}</span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plans.teacher.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="text-4xl font-black text-white">{plans.teacher.price}</span>
                </div>
                <p className="text-slate-400 text-sm">{plans.teacher.period}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plans.teacher.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-200 text-sm">
                    <i className="fa-solid fa-check text-green-400 mt-1"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleUpgrade('teacher')}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
              >
                {plans.teacher.cta}
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="relative rounded-2xl p-6 border-2 bg-white/5 border-white/10 hover:border-amber-400/50 transition-all duration-300 hover:scale-105">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plans.enterprise.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-1">
                  <span className="text-4xl font-black text-white">{plans.enterprise.price}</span>
                </div>
                <p className="text-slate-400 text-sm">{plans.enterprise.period}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plans.enterprise.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-200 text-sm">
                    <i className="fa-solid fa-check text-green-400 mt-1"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => window.open('mailto:sales@ivsenglish.com', '_blank')}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all"
              >
                {plans.enterprise.cta}
              </button>
            </div>
          </div>

          {/* Note */}
          <p className="text-center text-slate-400 text-xs mt-8 max-w-2xl mx-auto">{t.note}</p>

          {/* Coming soon badge */}
          <div className="text-center mt-6">
            <span className="inline-block px-4 py-2 bg-amber-500/20 text-amber-300 rounded-full text-sm font-semibold">
              <i className="fa-solid fa-clock mr-2"></i>
              {t.comingSoon}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
