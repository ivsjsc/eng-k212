import React from 'react';

interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  earned: boolean;
  progress?: number; // 0-100
}

interface AchievementBadgesProps {
  badges: Badge[];
  language: 'en' | 'vi';
}

const AchievementBadges: React.FC<AchievementBadgesProps> = ({ badges, language }) => {
  const t = {
    en: {
      title: 'Achievement Badges',
      earned: 'Earned',
      inProgress: 'In Progress',
      locked: 'Locked',
      shareAchievement: 'Share Achievement'
    },
    vi: {
      title: 'Huy hiệu Thành tựu',
      earned: 'Đã đạt',
      inProgress: 'Đang tiến hành',
      locked: 'Khóa',
      shareAchievement: 'Chia sẻ thành tựu'
    }
  }[language];

  const earnedBadges = badges.filter(b => b.earned);
  const inProgressBadges = badges.filter(b => !b.earned && b.progress && b.progress > 0);
  const lockedBadges = badges.filter(b => !b.earned && (!b.progress || b.progress === 0));

  const renderBadge = (badge: Badge) => (
    <div
      key={badge.id}
      className={`p-4 rounded-lg text-center transition-all ${
        badge.earned
          ? 'bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30 hover:shadow-lg cursor-pointer'
          : 'bg-slate-100 dark:bg-slate-800/50 opacity-60'
      }`}
    >
      <div
        className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center text-3xl ${
          badge.earned ? badge.color : 'bg-slate-300 dark:bg-slate-700 text-slate-500'
        }`}
        style={{ backgroundColor: badge.earned ? undefined : undefined }}
      >
        <i className={`fa-solid ${badge.icon} ${badge.earned ? '' : 'text-slate-400'}`}></i>
      </div>
      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-1">{badge.name}</h4>
      <p className="text-xs text-slate-500 mb-2">{badge.description}</p>
      {badge.progress !== undefined && badge.progress > 0 && !badge.earned && (
        <div className="mt-2">
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
            <div
              className="bg-blue-500 h-1.5 rounded-full transition-all"
              style={{ width: `${badge.progress}%` }}
            />
          </div>
          <span className="text-xs text-slate-500 mt-1 block">{badge.progress}%</span>
        </div>
      )}
      {badge.earned && (
        <button className="mt-2 text-xs text-blue-500 hover:text-blue-600 font-medium">
          <i className="fa-solid fa-share-nodes mr-1"></i>
          {t.shareAchievement}
        </button>
      )}
    </div>
  );

  return (
    <div className="card-glass p-6">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
        <i className="fa-solid fa-trophy mr-2 text-yellow-500"></i>
        {t.title}
      </h3>

      {earnedBadges.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-3 uppercase tracking-wide">
            {t.earned} ({earnedBadges.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {earnedBadges.map(renderBadge)}
          </div>
        </div>
      )}

      {inProgressBadges.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3 uppercase tracking-wide">
            {t.inProgress} ({inProgressBadges.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {inProgressBadges.map(renderBadge)}
          </div>
        </div>
      )}

      {lockedBadges.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3 uppercase tracking-wide">
            {t.locked} ({lockedBadges.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {lockedBadges.map(renderBadge)}
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementBadges;
