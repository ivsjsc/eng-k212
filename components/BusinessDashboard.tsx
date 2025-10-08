/**
 * BusinessDashboard Component
 * Mobile-First Design for English for Business
 * 
 * Features:
 * - Touch-optimized interface
 * - Bottom navigation for mobile
 * - Quick access to business modules
 * - Progress tracking
 */

import React, { useState, useEffect } from 'react';
import type { User } from '../types';
import { foundationModules, industryModules, allBusinessModules } from '../data/business-modules-full';
import LearningRoadmap from './LearningRoadmap';
import AccentTraining from './AccentTraining';
import VideoEmbed, { ChannelShowcase } from './VideoEmbed';

interface BusinessDashboardProps {
  user: User;
  onNavigate: (view: string) => void;
}

const BusinessDashboard: React.FC<BusinessDashboardProps> = ({ user, onNavigate }) => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'foundation' | 'industry' | 'roadmap' | 'accent'>('home');

  // Mobile-optimized module cards
  const ModuleCard = ({ module, icon, color }: any) => (
    <div 
      onClick={() => setActiveModule(module.id)}
      className={`
        relative overflow-hidden rounded-2xl p-6 
        bg-gradient-to-br ${color}
        shadow-mobile hover:shadow-mobile-lg
        active:scale-95 transition-all duration-200
        cursor-pointer touch-manipulation
        min-h-[140px] flex flex-col justify-between
      `}
    >
      {/* Module Icon */}
      <div className="text-4xl mb-3">{icon}</div>
      
      {/* Module Title */}
      <div>
        <h3 className="text-mobile-lg font-bold text-white mb-1">
          {module.title.en}
        </h3>
        <p className="text-mobile-sm text-white/80">
          {module.lessons.length} lessons
        </p>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div 
          className="h-full bg-white/60 transition-all duration-300"
          style={{ width: '0%' }} // Calculate from user progress
        />
      </div>
    </div>
  );

  // Handle tab navigation
  if (activeTab === 'roadmap') {
    return <LearningRoadmap user={user} onLessonSelect={(day, lessonId) => console.log('Lesson:', day, lessonId)} />;
  }

  if (activeTab === 'accent') {
    return <AccentTraining phrase="" />;
  }

  if (activeTab === 'foundation') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setActiveTab('home')} className="p-2 rounded-full bg-slate-100 dark:bg-slate-700">
              <i className="fas fa-arrow-left text-slate-600 dark:text-slate-300"></i>
            </button>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              📚 Foundation Skills (7 Modules)
            </h1>
          </div>
        </div>

        {/* All Foundation Modules */}
        <div className="px-4 py-6 space-y-4">
          {foundationModules.map((module, idx) => (
            <ModuleCard 
              key={module.id}
              module={module}
              icon={['📧', '👥', '📊', '🤝', '📞', '📖', '🌏'][idx]}
              color={['from-blue-500 to-blue-600', 'from-green-500 to-green-600', 'from-purple-500 to-purple-600', 'from-orange-500 to-orange-600', 'from-pink-500 to-pink-600', 'from-indigo-500 to-indigo-600', 'from-teal-500 to-teal-600'][idx]}
            />
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'industry') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setActiveTab('home')} className="p-2 rounded-full bg-slate-100 dark:bg-slate-700">
              <i className="fas fa-arrow-left text-slate-600 dark:text-slate-300"></i>
            </button>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              🏢 Industry-Specific (7 Modules)
            </h1>
          </div>
        </div>

        {/* All Industry Modules */}
        <div className="px-4 py-6 space-y-4">
          {industryModules.map((module, idx) => (
            <ModuleCard 
              key={module.id}
              module={module}
              icon={['💼', '👔', '💰', '📦', '💻', '⚖️', '🏨'][idx]}
              color={['from-red-500 to-red-600', 'from-yellow-500 to-yellow-600', 'from-cyan-500 to-cyan-600', 'from-lime-500 to-lime-600', 'from-violet-500 to-violet-600', 'from-rose-500 to-rose-600', 'from-amber-500 to-amber-600'][idx]}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
      {/* Mobile Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-mobile-xl font-bold text-slate-900 dark:text-white">
                Welcome back, {user.name}!
              </h1>
              <p className="text-mobile-sm text-slate-600 dark:text-slate-400">
                Continue your business English journey
              </p>
            </div>
            <button 
              onClick={() => onNavigate('settings')}
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-700 
                       active:scale-95 transition-transform"
            >
              <i className="fas fa-cog text-slate-600 dark:text-slate-300"></i>
            </button>
          </div>
        </div>

        {/* Progress Stats - Horizontal Scroll */}
        <div className="overflow-x-auto px-4 pb-3 hide-scrollbar">
          <div className="flex gap-3 min-w-max">
            {/* S-Score */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full 
                          bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <i className="fas fa-star text-blue-600 dark:text-blue-400"></i>
              <span className="text-mobile-sm font-semibold text-blue-900 dark:text-blue-100">
                {user.sscore || 0} points
              </span>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full 
                          bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
              <i className="fas fa-fire text-orange-600 dark:text-orange-400"></i>
              <span className="text-mobile-sm font-semibold text-orange-900 dark:text-orange-100">
                {user.currentStreak || 0} days
              </span>
            </div>

            {/* AI Tokens */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full 
                          bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
              <i className="fas fa-robot text-purple-600 dark:text-purple-400"></i>
              <span className="text-mobile-sm font-semibold text-purple-900 dark:text-purple-100">
                {user.aiTokens || 0} tokens
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <section>
          <h2 className="text-mobile-lg font-bold text-slate-900 dark:text-white mb-4">
            Quick Practice
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 
                             dark:border-slate-700 shadow-mobile active:scale-95 transition-transform">
              <i className="fas fa-envelope text-2xl text-blue-600 mb-2"></i>
              <p className="text-mobile-sm font-semibold text-slate-900 dark:text-white">
                Email Practice
              </p>
            </button>
            
            <button className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 
                             dark:border-slate-700 shadow-mobile active:scale-95 transition-transform">
              <i className="fas fa-users text-2xl text-green-600 mb-2"></i>
              <p className="text-mobile-sm font-semibold text-slate-900 dark:text-white">
                Meeting Sim
              </p>
            </button>
            
            <button className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 
                             dark:border-slate-700 shadow-mobile active:scale-95 transition-transform">
              <i className="fas fa-presentation text-2xl text-purple-600 mb-2"></i>
              <p className="text-mobile-sm font-semibold text-slate-900 dark:text-white">
                Presentation
              </p>
            </button>
            
            <button className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 
                             dark:border-slate-700 shadow-mobile active:scale-95 transition-transform">
              <i className="fas fa-handshake text-2xl text-orange-600 mb-2"></i>
              <p className="text-mobile-sm font-semibold text-slate-900 dark:text-white">
                Negotiation
              </p>
            </button>
          </div>
        </section>

        {/* Foundation Modules (7) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-mobile-lg font-bold text-slate-900 dark:text-white">
              📚 Foundation Skills
            </h2>
            <button 
              onClick={() => setActiveTab('foundation')}
              className="text-mobile-sm text-blue-600 dark:text-blue-400 font-semibold"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <ModuleCard 
              module={foundationModules[0]} 
              icon="📧" 
              color="from-blue-500 to-blue-600" 
            />
            <ModuleCard 
              module={foundationModules[1]} 
              icon="👥" 
              color="from-green-500 to-green-600" 
            />
            <ModuleCard 
              module={foundationModules[2]} 
              icon="📊" 
              color="from-purple-500 to-purple-600" 
            />
          </div>
        </section>

        {/* Industry Modules (7) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-mobile-lg font-bold text-slate-900 dark:text-white">
              🏢 Industry-Specific
            </h2>
            <button 
              onClick={() => setActiveTab('industry')}
              className="text-mobile-sm text-purple-600 dark:text-purple-400 font-semibold"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <ModuleCard 
              module={industryModules[0]} 
              icon="💼" 
              color="from-orange-500 to-orange-600" 
            />
            <ModuleCard 
              module={industryModules[1]} 
              icon="�" 
              color="from-pink-500 to-pink-600" 
            />
            <ModuleCard 
              module={industryModules[2]} 
              icon="💰" 
              color="from-indigo-500 to-indigo-600" 
            />
          </div>
        </section>

        {/* Daily Challenge */}
        <section className="bg-gradient-to-r from-yellow-400 to-orange-500 
                          rounded-2xl p-6 text-white shadow-mobile-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-mobile-sm font-semibold mb-1 opacity-90">
                Daily Challenge
              </p>
              <h3 className="text-mobile-xl font-bold mb-2">
                Write 3 Professional Emails
              </h3>
              <p className="text-mobile-sm opacity-90 mb-4">
                Earn 50 bonus points
              </p>
              <button className="px-6 py-2 bg-white text-orange-600 rounded-full 
                               text-mobile-sm font-bold active:scale-95 transition-transform">
                Start Challenge
              </button>
            </div>
            <div className="text-5xl">🎯</div>
          </div>
        </section>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 
                    border-t border-slate-200 dark:border-slate-700 
                    pb-safe z-50 shadow-lg">
        <div className="flex items-center justify-around py-2">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center p-2 ${activeTab === 'home' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}
          >
            <i className="fas fa-home text-xl mb-1"></i>
            <span className="text-mobile-xs font-semibold">Home</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('roadmap')}
            className={`flex flex-col items-center p-2 ${activeTab === 'roadmap' ? 'text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-400'}`}
          >
            <i className="fas fa-map text-xl mb-1"></i>
            <span className="text-mobile-xs">30-Day</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('accent')}
            className={`flex flex-col items-center p-2 ${activeTab === 'accent' ? 'text-purple-600 dark:text-purple-400' : 'text-slate-500 dark:text-slate-400'}`}
          >
            <i className="fas fa-microphone text-xl mb-1"></i>
            <span className="text-mobile-xs">Accent</span>
          </button>
          
          <button 
            onClick={() => onNavigate('progress')}
            className="flex flex-col items-center p-2 text-slate-500 dark:text-slate-400"
          >
            <i className="fas fa-chart-line text-xl mb-1"></i>
            <span className="text-mobile-xs">Progress</span>
          </button>
          
          <button 
            onClick={() => onNavigate('profile')}
            className="flex flex-col items-center p-2 text-slate-500 dark:text-slate-400"
          >
            <i className="fas fa-user text-xl mb-1"></i>
            <span className="text-mobile-xs">Profile</span>
          </button>
        </div>
      </nav>

      {/* Hide scrollbar but keep functionality */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .touch-manipulation {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default BusinessDashboard;
