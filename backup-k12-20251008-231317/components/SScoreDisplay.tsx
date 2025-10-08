// components/SScoreDisplay.tsx
import React from 'react';
import { User, RewardTier } from '../types';
import { REWARD_TIERS } from '../constants';

interface SScoreDisplayProps {
  user: User;
  showDetails?: boolean;
  compact?: boolean;
}

export const SScoreDisplay: React.FC<SScoreDisplayProps> = ({ 
  user, 
  showDetails = false,
  compact = false
}) => {
  const sscore = user.sscore || 0;
  const aiTokens = user.aiTokens || 0;
  const tier = user.tier || 'Bronze';
  const currentStreak = user.currentStreak || 0;
  
  const tierConfig = REWARD_TIERS.find(t => t.tier === tier) || REWARD_TIERS[0];
  const nextTier = REWARD_TIERS.find(t => t.minPoints > sscore);
  
  const progressToNextTier = nextTier
    ? ((sscore - tierConfig.minPoints) / (nextTier.minPoints - tierConfig.minPoints)) * 100
    : 100;

  if (compact) {
    return (
      <div className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-lg px-3 py-2 shadow-sm">
        {/* S-Score */}
        <div className="flex items-center gap-1.5">
          <i className="fas fa-star text-yellow-500 text-sm"></i>
          <span className="font-semibold text-slate-800 dark:text-white text-sm">
            {sscore.toLocaleString()}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">S-Score</span>
        </div>
        
        {/* Divider */}
        <div className="w-px h-4 bg-slate-200 dark:bg-slate-700"></div>
        
        {/* AI Tokens */}
        <div className="flex items-center gap-1.5">
          <i className="fas fa-coins text-blue-500 text-sm"></i>
          <span className="font-semibold text-slate-800 dark:text-white text-sm">
            {aiTokens}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">Tokens</span>
        </div>
        
        {/* Tier Badge */}
        <div 
          className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium"
          style={{ 
            backgroundColor: `${tierConfig.color}20`,
            color: tierConfig.color 
          }}
        >
          <i className={`fas ${tierConfig.icon}`}></i>
          <span>{tier}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <i className="fas fa-trophy text-yellow-500"></i>
          Your S-Score Progress
        </h3>
        
        {currentStreak > 0 && (
          <div className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full">
            <i className="fas fa-fire text-orange-500"></i>
            <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">
              {currentStreak} day streak
            </span>
          </div>
        )}
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* S-Score */}
        <div className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <i className="fas fa-star text-yellow-500 text-xl"></i>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              S-Score
            </span>
          </div>
          <div className="text-3xl font-bold text-slate-800 dark:text-white">
            {sscore.toLocaleString()}
          </div>
        </div>

        {/* AI Tokens */}
        <div className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <i className="fas fa-coins text-blue-500 text-xl"></i>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              AI Tokens
            </span>
          </div>
          <div className="text-3xl font-bold text-slate-800 dark:text-white">
            {aiTokens}
          </div>
        </div>
      </div>

      {/* Tier Progress */}
      <div className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <i 
              className={`fas ${tierConfig.icon} text-xl`}
              style={{ color: tierConfig.color }}
            ></i>
            <span className="font-semibold text-slate-800 dark:text-white">
              {tier} Tier
            </span>
          </div>
          
          {nextTier && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {nextTier.minPoints - sscore} points to {nextTier.tier}
            </span>
          )}
        </div>

        {/* Progress Bar */}
        {nextTier && (
          <div className="relative h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
              style={{ 
                width: `${Math.min(progressToNextTier, 100)}%`,
                backgroundColor: tierConfig.color 
              }}
            ></div>
          </div>
        )}
        
        {!nextTier && (
          <div className="text-center py-2">
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              🎉 Maximum Tier Achieved!
            </span>
          </div>
        )}
      </div>

      {/* Tier Benefits (if showDetails) */}
      {showDetails && (
        <div className="mt-4 bg-white dark:bg-slate-700 rounded-lg p-4 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {tier} Tier Benefits:
          </h4>
          <ul className="space-y-1">
            {tierConfig.benefits.map((benefit, idx) => (
              <li 
                key={idx}
                className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2"
              >
                <i className="fas fa-check-circle text-green-500 text-xs"></i>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Additional Stats */}
      {showDetails && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="text-center bg-white dark:bg-slate-700 rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-slate-800 dark:text-white">
              {user.completedLessons?.length || 0}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Lessons Completed
            </div>
          </div>
          
          <div className="text-center bg-white dark:bg-slate-700 rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-slate-800 dark:text-white">
              {user.totalTestsPassed || 0}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Tests Passed
            </div>
          </div>
          
          <div className="text-center bg-white dark:bg-slate-700 rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-slate-800 dark:text-white">
              {user.achievements?.length || 0}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Achievements
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SScoreDisplay;
