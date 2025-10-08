// components/AchievementBadgesModal.tsx
import React from 'react';
import { User, Badge } from '../types';

interface AchievementBadgesModalProps {
  user: User;
  onClose: () => void;
}

// Sample badges - in production, these would come from Firestore
const ALL_BADGES: Badge[] = [
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: 'fa-shoe-prints',
    rarity: 'common',
    criteria: { type: 'lessons', value: 1 },
    sscoreReward: 10,
  },
  {
    id: 'week-warrior',
    name: 'Week Warrior',
    description: 'Maintain a 7-day login streak',
    icon: 'fa-fire',
    rarity: 'rare',
    criteria: { type: 'streak', value: 7 },
    sscoreReward: 50,
  },
  {
    id: 'perfect-ten',
    name: 'Perfect Ten',
    description: 'Get 10 perfect quiz scores',
    icon: 'fa-star',
    rarity: 'rare',
    criteria: { type: 'perfect_scores', value: 10 },
    sscoreReward: 100,
  },
  {
    id: 'test-master',
    name: 'Test Master',
    description: 'Pass 5 tests with 90% or higher',
    icon: 'fa-graduation-cap',
    rarity: 'epic',
    criteria: { type: 'tests', value: 5 },
    sscoreReward: 150,
  },
  {
    id: 'point-collector',
    name: 'Point Collector',
    description: 'Earn 1000 S-Score points',
    icon: 'fa-coins',
    rarity: 'epic',
    criteria: { type: 'sscore', value: 1000 },
    sscoreReward: 200,
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable',
    description: 'Maintain a 30-day login streak',
    icon: 'fa-rocket',
    rarity: 'legendary',
    criteria: { type: 'streak', value: 30 },
    sscoreReward: 500,
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Get 50 perfect quiz scores',
    icon: 'fa-crown',
    rarity: 'legendary',
    criteria: { type: 'perfect_scores', value: 50 },
    sscoreReward: 500,
  },
  {
    id: 'legend',
    name: 'Legend',
    description: 'Reach 5000 S-Score points',
    icon: 'fa-trophy',
    rarity: 'legendary',
    criteria: { type: 'sscore', value: 5000 },
    sscoreReward: 1000,
  },
];

export const AchievementBadgesModal: React.FC<AchievementBadgesModalProps> = ({ 
  user, 
  onClose 
}) => {
  const unlockedBadges = user.achievements || [];
  const sscore = user.sscore || 0;
  const currentStreak = user.currentStreak || 0;
  const completedLessons = user.completedLessons?.length || 0;
  const totalTestsPassed = user.totalTestsPassed || 0;
  const perfectScores = user.perfectScores || 0;

  const checkBadgeProgress = (badge: Badge): { unlocked: boolean; progress: number } => {
    const unlocked = unlockedBadges.includes(badge.id);
    
    let currentValue = 0;
    switch (badge.criteria.type) {
      case 'sscore':
        currentValue = sscore;
        break;
      case 'streak':
        currentValue = currentStreak;
        break;
      case 'lessons':
        currentValue = completedLessons;
        break;
      case 'tests':
        currentValue = totalTestsPassed;
        break;
      case 'perfect_scores':
        currentValue = perfectScores;
        break;
    }

    const progress = Math.min((currentValue / badge.criteria.value) * 100, 100);
    return { unlocked, progress };
  };

  const getRarityColor = (rarity: Badge['rarity']): string => {
    const colors = {
      common: 'text-slate-500 border-slate-300 dark:border-slate-600',
      rare: 'text-blue-600 border-blue-400 dark:border-blue-500',
      epic: 'text-purple-600 border-purple-400 dark:border-purple-500',
      legendary: 'text-yellow-600 border-yellow-400 dark:border-yellow-500',
    };
    return colors[rarity];
  };

  const getRarityBg = (rarity: Badge['rarity']): string => {
    const colors = {
      common: 'bg-slate-100 dark:bg-slate-700',
      rare: 'bg-blue-100 dark:bg-blue-900/30',
      epic: 'bg-purple-100 dark:bg-purple-900/30',
      legendary: 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30',
    };
    return colors[rarity];
  };

  const unlockedCount = ALL_BADGES.filter(badge => 
    unlockedBadges.includes(badge.id)
  ).length;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Achievement Badges</h2>
              <p className="text-yellow-100 text-sm">
                {unlockedCount} of {ALL_BADGES.length} badges unlocked
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 bg-white/20 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${(unlockedCount / ALL_BADGES.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALL_BADGES.map((badge) => {
              const { unlocked, progress } = checkBadgeProgress(badge);

              return (
                <div
                  key={badge.id}
                  className={`relative rounded-xl border-2 p-5 transition-all ${
                    unlocked 
                      ? `${getRarityBg(badge.rarity)} ${getRarityColor(badge.rarity)} shadow-lg` 
                      : 'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 opacity-60'
                  }`}
                >
                  {/* Unlocked Badge */}
                  {unlocked && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <i className="fas fa-check text-white text-sm"></i>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="text-center mb-3">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                      unlocked 
                        ? getRarityBg(badge.rarity)
                        : 'bg-slate-200 dark:bg-slate-600'
                    }`}>
                      <i className={`fas ${badge.icon} text-3xl ${
                        unlocked 
                          ? getRarityColor(badge.rarity).split(' ')[0]
                          : 'text-slate-400'
                      }`}></i>
                    </div>
                  </div>

                  {/* Badge Info */}
                  <div className="text-center mb-3">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-1">
                      {badge.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                      {badge.description}
                    </p>
                    
                    {/* Rarity Badge */}
                    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${
                      unlocked 
                        ? getRarityColor(badge.rarity).split(' ')[0] + ' ' + getRarityBg(badge.rarity)
                        : 'text-slate-500 bg-slate-200 dark:bg-slate-600'
                    }`}>
                      {badge.rarity.toUpperCase()}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  {!unlocked && (
                    <div>
                      <div className="flex items-center justify-between mb-1 text-xs text-slate-600 dark:text-slate-400">
                        <span>Progress</span>
                        <span>{Math.floor(progress)}%</span>
                      </div>
                      <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Reward */}
                  {unlocked && (
                    <div className="flex items-center justify-center gap-1 text-sm font-medium">
                      <i className="fas fa-star text-yellow-500"></i>
                      <span className="text-slate-700 dark:text-slate-300">
                        +{badge.sscoreReward} S-Score
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Stats Summary */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-5">
            <h3 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
              <i className="fas fa-chart-line"></i>
              Your Progress
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800 dark:text-white">
                  {sscore}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  S-Score
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800 dark:text-white">
                  {currentStreak}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Day Streak
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800 dark:text-white">
                  {completedLessons}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Lessons
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800 dark:text-white">
                  {totalTestsPassed}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Tests Passed
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800 dark:text-white">
                  {perfectScores}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Perfect Scores
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadgesModal;
