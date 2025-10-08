import React, { useState } from 'react';
import { demoAIResponses } from '../data/demo-ai-responses';
import PricingModal from './PricingModal';

interface EnhancedLearningPathProps {
  language: 'en' | 'vi';
  user: any;
}

const EnhancedLearningPath: React.FC<EnhancedLearningPathProps> = ({ language, user }) => {
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(0);

  const demoPath = demoAIResponses.learningPath[language];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
      {/* Header với Warning Banner */}
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-full mb-4">
          <i className="fa-solid fa-route text-5xl text-orange-600 dark:text-orange-400"></i>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">{demoPath.title}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">{demoPath.subtitle}</p>
        
        {/* Warning Alert */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-300 dark:border-red-700 rounded-lg p-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <i className="fa-solid fa-exclamation-triangle text-2xl text-red-600"></i>
            <h3 className="text-xl font-bold text-red-800 dark:text-red-200">
              {language === 'en' ? '⚠️ FREE TIER PREVIEW ONLY' : '⚠️ CHỈ LÀ BẢN XEM TRƯỚC MIỄN PHÍ'}
            </h3>
          </div>
          <p className="text-red-700 dark:text-red-300 text-center">
            {demoPath.description}
          </p>
        </div>
      </div>

      {/* Demo Limitations Card - PROMINENT */}
      <div className="mb-8 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/10 dark:via-orange-900/10 dark:to-red-900/10 border-2 border-orange-400 dark:border-orange-600 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4 text-orange-900 dark:text-orange-100 flex items-center justify-center gap-2">
          <i className="fa-solid fa-lock text-3xl"></i>
          {demoPath.demoLimitations.title}
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {demoPath.demoLimitations.items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-white/50 dark:bg-slate-800/50 p-3 rounded-lg">
              <span className="text-2xl">{item.split(' ')[0]}</span>
              <span className="text-slate-700 dark:text-slate-300">{item.substring(item.indexOf(' ') + 1)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Week Preview */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-3">
          <i className="fa-solid fa-calendar-week text-blue-500"></i>
          {language === 'en' ? 'Basic 4-Week Preview' : 'Xem Trước 4 Tuần Cơ Bản'}
          <span className="text-sm bg-yellow-200 dark:bg-yellow-800 px-3 py-1 rounded-full">DEMO</span>
        </h2>

        <div className="space-y-4">
          {demoPath.weeks.map((week, index) => (
            <div key={index} className="card-glass overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 transition-all">
              {/* Week Header */}
              <div 
                className="p-6 cursor-pointer bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
                onClick={() => setExpandedWeek(expandedWeek === index ? null : index)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {language === 'en' ? 'Week' : 'Tuần'} {week.week}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                        {week.level}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{week.topic}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 italic mb-2">{week.subtitle}</p>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="flex items-center gap-1">
                        <i className="fa-solid fa-clock text-purple-500"></i>
                        {week.dailyCommitment}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="fa-solid fa-hourglass-half text-green-500"></i>
                        {week.estimatedHours}
                      </span>
                    </div>
                  </div>
                  <button className="text-2xl text-blue-500">
                    <i className={`fa-solid fa-chevron-${expandedWeek === index ? 'up' : 'down'}`}></i>
                  </button>
                </div>
              </div>

              {/* Week Details */}
              {expandedWeek === index && (
                <div className="p-6 bg-white dark:bg-slate-800 border-t-2 border-slate-200 dark:border-slate-700">
                  {/* Focus */}
                  <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-bold mb-2 text-blue-800 dark:text-blue-200">
                      <i className="fa-solid fa-bullseye mr-2"></i>
                      {language === 'en' ? 'Focus Area:' : 'Trọng Tâm:'}
                    </h4>
                    <p className="text-slate-700 dark:text-slate-300">{week.focus}</p>
                  </div>

                  {/* Exercises */}
                  <div className="mb-6">
                    <h4 className="font-bold mb-3 text-lg">
                      <i className="fa-solid fa-dumbbell mr-2 text-purple-500"></i>
                      {language === 'en' ? 'Training Exercises:' : 'Bài Tập Luyện Tập:'}
                    </h4>
                    <div className="space-y-3">
                      {week.exercises.map((exercise, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition">
                          <span className="text-2xl">{exercise.split(' ')[0]}</span>
                          <div className="flex-1">
                            <span dangerouslySetInnerHTML={{ __html: exercise.substring(exercise.indexOf(' ') + 1) }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learning Outcomes */}
                  <div className="mb-6">
                    <h4 className="font-bold mb-3 text-lg">
                      <i className="fa-solid fa-trophy mr-2 text-yellow-500"></i>
                      {language === 'en' ? 'Learning Outcomes:' : 'Kết Quả Học Tập:'}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {week.outcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                          <i className="fa-solid fa-check-circle text-green-500 mt-1"></i>
                          <span className="text-sm text-slate-700 dark:text-slate-300">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Premium Extras Teaser */}
                  <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border-2 border-purple-300 dark:border-purple-700 rounded-lg">
                    <h5 className="font-bold mb-2 text-purple-800 dark:text-purple-200">
                      <i className="fa-solid fa-crown mr-2"></i>
                      {week.premiumExtras}
                    </h5>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="stat-card stat-card-blue p-4">
            <div className="text-center">
              <i className="fa-solid fa-calendar text-3xl text-blue-500 mb-2"></i>
              <div className="text-2xl font-bold">{demoPath.totalDuration}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {language === 'en' ? 'Preview Duration' : 'Thời Lượng Xem Trước'}
              </div>
            </div>
          </div>
          <div className="stat-card stat-card-purple p-4">
            <div className="text-center">
              <i className="fa-solid fa-clock text-3xl text-purple-500 mb-2"></i>
              <div className="text-2xl font-bold">{demoPath.totalHours}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {language === 'en' ? 'Total Learning Hours' : 'Tổng Giờ Học'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* THE REAL PREMIUM PROGRAM - Very Prominent */}
      <div className="mb-8 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 text-white rounded-2xl p-8 shadow-2xl border-4 border-yellow-400">
        <div className="text-center mb-6">
          <i className="fa-solid fa-crown text-6xl text-yellow-400 mb-4 animate-pulse"></i>
          <h2 className="text-4xl font-bold mb-3">
            {language === 'en' ? '💎 THE REAL PREMIUM PROGRAM' : '💎 CHƯƠNG TRÌNH PREMIUM THỰC SỰ'}
          </h2>
          <p className="text-xl text-yellow-200">
            {language === 'en' ? 'What you ACTUALLY get with Premium!' : 'Những gì bạn THỰC SỰ nhận với Premium!'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur p-4 rounded-xl text-center">
            <div className="text-4xl font-bold text-yellow-400">{demoPath.actualPremiumProgram.duration.split(' ')[0]}</div>
            <div className="text-sm">{language === 'en' ? 'Full Program' : 'Chương Trình Đầy Đủ'}</div>
          </div>
          <div className="bg-white/10 backdrop-blur p-4 rounded-xl text-center">
            <div className="text-4xl font-bold text-yellow-400">{demoPath.actualPremiumProgram.totalHours}</div>
            <div className="text-sm">{language === 'en' ? 'Learning Hours' : 'Giờ Học'}</div>
          </div>
          <div className="bg-white/10 backdrop-blur p-4 rounded-xl text-center">
            <div className="text-4xl font-bold text-yellow-400">84</div>
            <div className="text-sm">{language === 'en' ? 'Daily Lessons' : 'Bài Học Hàng Ngày'}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3 mb-6">
          {demoPath.actualPremiumProgram.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2 bg-white/10 backdrop-blur p-3 rounded-lg">
              <span className="text-xl">{feature.split(' ')[0]}</span>
              <span className="text-sm">{feature.substring(feature.indexOf(' ') + 1)}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowPricingModal(true)}
          className="btn bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-lg w-full py-4 shadow-lg transform hover:scale-105 transition"
        >
          <i className="fa-solid fa-rocket mr-2"></i>
          {language === 'en' ? 'UPGRADE TO PREMIUM NOW!' : 'NÂNG CẤP LÊN PREMIUM NGAY!'}
        </button>
      </div>

      {/* Comparison Table */}
      <div className="mb-8 card-glass p-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          {demoPath.premiumComparison.title}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2">
                <th className="text-left p-3">{language === 'en' ? 'Feature' : 'Tính năng'}</th>
                <th className="text-center p-3 bg-slate-100 dark:bg-slate-800">{language === 'en' ? 'Free' : 'Miễn phí'}</th>
                <th className="text-center p-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                  <i className="fa-solid fa-crown text-yellow-500 mr-1"></i>
                  Premium
                </th>
              </tr>
            </thead>
            <tbody>
              {demoPath.premiumComparison.comparison.map((row, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-3 font-semibold">{row.feature}</td>
                  <td className="p-3 text-center text-red-600 dark:text-red-400">{row.free}</td>
                  <td className="p-3 text-center text-green-600 dark:text-green-400 font-bold">{row.premium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Success Stories */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          {demoPath.successStories.title}
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {demoPath.successStories.testimonials.map((story, idx) => (
            <div key={idx} className="card-glass p-6 hover:scale-105 transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {story.name[0]}
                </div>
                <div>
                  <div className="font-bold">{story.name}</div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    <i className="fa-solid fa-check-circle mr-1"></i>
                    {story.achievement}
                  </div>
                </div>
              </div>
              <p className="text-sm italic text-slate-600 dark:text-slate-400">
                "{story.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Upgrade Section */}
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          {demoPath.upgradeReasons.title}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {demoPath.upgradeReasons.reasons.map((reason, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="text-5xl">{reason.icon}</div>
              <div>
                <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white rounded-2xl p-8 shadow-2xl">
        <h2 className="text-4xl font-bold mb-4">
          {language === 'en' ? '🎯 Ready to Transform Your English?' : '🎯 Sẵn Sàng Thay Đổi Tiếng Anh Của Bạn?'}
        </h2>
        <p className="text-xl mb-6">
          {language === 'en' 
            ? 'Join 10,000+ students who achieved their goals with Premium!' 
            : 'Tham gia cùng 10,000+ học viên đã đạt mục tiêu với Premium!'}
        </p>
        <button
          onClick={() => setShowPricingModal(true)}
          className="btn bg-white text-purple-600 hover:bg-yellow-400 hover:text-black font-bold text-xl px-8 py-4 shadow-lg transform hover:scale-110 transition"
        >
          <i className="fa-solid fa-crown mr-2"></i>
          {language === 'en' ? 'START PREMIUM TODAY - ONLY ₫99K/MONTH' : 'BẮT ĐẦU PREMIUM HÔM NAY - CHỈ ₫99K/THÁNG'}
        </button>
        <p className="text-sm mt-4 text-yellow-200">
          <i className="fa-solid fa-shield-halved mr-1"></i>
          {language === 'en' ? '30-day money-back guarantee' : 'Đảm bảo hoàn tiền trong 30 ngày'}
        </p>
      </div>

      {/* Pricing Modal */}
      <PricingModal 
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
        language={language}
        userRole={user.role}
      />
    </div>
  );
};

export default EnhancedLearningPath;
