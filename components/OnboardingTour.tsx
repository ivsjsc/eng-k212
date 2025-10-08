import React, { useState, useEffect } from 'react';
import type { User, View } from '../types';

interface OnboardingTourProps {
  user: User;
  language: 'en' | 'vi';
  onComplete: () => void;
  onNavigate: (view: View) => void;
}

interface TourStep {
  title: string;
  description: string;
  icon: string;
  action?: {
    label: string;
    view: View;
  };
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ 
  user, 
  language, 
  onComplete,
  onNavigate 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('ivs-onboarding-tour-completed');
    if (!hasSeenTour) {
      setIsVisible(true);
    }
  }, []);

  const studentSteps: TourStep[] = language === 'vi' ? [
    {
      title: '👋 Chào mừng đến với IVS English!',
      description: 'Hãy cùng tìm hiểu các tính năng chính để bắt đầu hành trình học tiếng Anh của bạn.',
      icon: 'fa-graduation-cap',
    },
    {
      title: '📚 Chương trình học',
      description: 'Khám phá chương trình học đầy đủ từ lớp 10 đến lớp 12, được thiết kế theo chuẩn Bộ Giáo dục.',
      icon: 'fa-book-open',
      action: {
        label: 'Xem chương trình',
        view: 'curriculum',
      },
    },
    {
      title: '🗺️ Lộ trình cá nhân hóa',
      description: 'AI sẽ tạo lộ trình học tập riêng dựa trên trình độ và mục tiêu của bạn.',
      icon: 'fa-map',
      action: {
        label: 'Khám phá lộ trình',
        view: 'learning-path',
      },
    },
    {
      title: '🏆 Theo dõi tiến độ',
      description: 'Xem S-Score và thống kê học tập của bạn ngay trên trang chủ.',
      icon: 'fa-chart-line',
      action: {
        label: 'Về trang chủ',
        view: 'home',
      },
    },
    {
      title: '⚙️ Cài đặt',
      description: 'Tùy chỉnh giao diện, ngôn ngữ, và nhiều thiết lập khác theo sở thích của bạn.',
      icon: 'fa-cog',
      action: {
        label: 'Mở cài đặt',
        view: 'settings',
      },
    },
  ] : [
    {
      title: '👋 Welcome to IVS English!',
      description: 'Let\'s explore the main features to start your English learning journey.',
      icon: 'fa-graduation-cap',
    },
    {
      title: '📚 Curriculum',
      description: 'Explore the complete curriculum from grade 10 to 12, designed according to Ministry of Education standards.',
      icon: 'fa-book-open',
      action: {
        label: 'View curriculum',
        view: 'curriculum',
      },
    },
    {
      title: '🗺️ Personalized Path',
      description: 'AI creates a personalized learning path based on your level and goals.',
      icon: 'fa-map',
      action: {
        label: 'Explore path',
        view: 'learning-path',
      },
    },
    {
      title: '🏆 Track Progress',
      description: 'View your S-Score and learning statistics right on the home page.',
      icon: 'fa-chart-line',
      action: {
        label: 'Go to home',
        view: 'home',
      },
    },
    {
      title: '⚙️ Settings',
      description: 'Customize interface, language, and many other settings to your preference.',
      icon: 'fa-cog',
      action: {
        label: 'Open settings',
        view: 'settings',
      },
    },
  ];

  const teacherSteps: TourStep[] = language === 'vi' ? [
    {
      title: '👋 Chào mừng Giáo viên!',
      description: 'Khám phá các công cụ mạnh mẽ để quản lý lớp học và hỗ trợ học sinh.',
      icon: 'fa-chalkboard-user',
    },
    {
      title: '📊 Bảng điều khiển',
      description: 'Quản lý lớp học, theo dõi tiến độ học sinh, và chấm điểm bài tập.',
      icon: 'fa-dashboard',
      action: {
        label: 'Xem bảng điều khiển',
        view: 'teacher-dashboard',
      },
    },
    {
      title: '🤖 Tạo nội dung AI',
      description: 'Sử dụng AI để tạo bài kiểm tra, bài tập, và tài liệu giảng dạy tự động.',
      icon: 'fa-robot',
      action: {
        label: 'Thử AI Tools',
        view: 'ai-content-generator',
      },
    },
    {
      title: '📈 Phân tích chi tiết',
      description: 'Xem báo cáo chi tiết về hiệu suất học tập của từng lớp và học sinh.',
      icon: 'fa-chart-line',
      action: {
        label: 'Xem phân tích',
        view: 'teacher-analytics',
      },
    },
  ] : [
    {
      title: '👋 Welcome Teacher!',
      description: 'Discover powerful tools to manage classes and support students.',
      icon: 'fa-chalkboard-user',
    },
    {
      title: '📊 Dashboard',
      description: 'Manage classes, track student progress, and grade assignments.',
      icon: 'fa-dashboard',
      action: {
        label: 'View dashboard',
        view: 'teacher-dashboard',
      },
    },
    {
      title: '🤖 AI Content Generator',
      description: 'Use AI to automatically create tests, exercises, and teaching materials.',
      icon: 'fa-robot',
      action: {
        label: 'Try AI Tools',
        view: 'ai-content-generator',
      },
    },
    {
      title: '📈 Detailed Analytics',
      description: 'View detailed reports on learning performance of each class and student.',
      icon: 'fa-chart-line',
      action: {
        label: 'View analytics',
        view: 'teacher-analytics',
      },
    },
  ];

  const steps = user.role === 'teacher' ? teacherSteps : studentSteps;
  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('ivs-onboarding-tour-completed', 'true');
    setIsVisible(false);
    onComplete();
  };

  const handleAction = () => {
    if (step.action) {
      onNavigate(step.action.view);
      handleComplete();
    }
  };

  if (!isVisible) return null;

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg">
        {/* Card */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-2xl">
          {/* Progress indicator */}
          <div className="mb-6 flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600'
                    : index < currentStep
                    ? 'bg-sky-500/50'
                    : 'bg-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/30">
              <i className={`fa-solid ${step.icon} text-3xl text-white`}></i>
            </div>
          </div>

          {/* Content */}
          <div className="text-center">
            <h2 className="mb-3 text-2xl font-bold text-white">{step.title}</h2>
            <p className="text-base leading-relaxed text-slate-300">{step.description}</p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3">
            {step.action && (
              <button
                onClick={handleAction}
                className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-500/30 transition-all hover:shadow-xl hover:shadow-sky-500/40 active:scale-95"
              >
                {step.action.label}
              </button>
            )}

            <div className="flex gap-3">
              {!isFirstStep && (
                <button
                  onClick={handlePrevious}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
                >
                  {language === 'vi' ? '← Trước' : '← Previous'}
                </button>
              )}
              
              <button
                onClick={handleNext}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
              >
                {isLastStep 
                  ? language === 'vi' ? '✓ Hoàn thành' : '✓ Complete'
                  : language === 'vi' ? 'Tiếp →' : 'Next →'}
              </button>
            </div>

            {!isLastStep && (
              <button
                onClick={handleSkip}
                className="mt-2 text-sm text-slate-400 transition-colors hover:text-white"
              >
                {language === 'vi' ? 'Bỏ qua hướng dẫn' : 'Skip tour'}
              </button>
            )}
          </div>

          {/* Step counter */}
          <div className="mt-6 text-center text-sm text-slate-400">
            {currentStep + 1} / {steps.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTour;
