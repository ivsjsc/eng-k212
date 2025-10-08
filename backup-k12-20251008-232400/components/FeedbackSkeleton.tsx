import React from 'react';

const SkeletonLine: React.FC<{ width: string; height?: string }> = ({ width, height = 'h-4' }) => (
  <div className={`bg-slate-200 dark:bg-slate-700 rounded ${width} ${height}`}></div>
);

const FeedbackSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse-slow">
      <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-700/50">
        <SkeletonLine width="w-1/2 mx-auto" height="h-3 mb-2" />
        <SkeletonLine width="w-1/3 mx-auto" height="h-10" />
      </div>
      <div className="space-y-2">
        <SkeletonLine width="w-1/4" />
        <SkeletonLine width="w-full" height="h-3" />
        <SkeletonLine width="w-5/6" height="h-3" />
      </div>
      <div className="space-y-2">
        <SkeletonLine width="w-1/4" />
        <SkeletonLine width="w-full" height="h-3" />
        <SkeletonLine width="w-4/6" height="h-3" />
      </div>
      <div className="space-y-2">
        <SkeletonLine width="w-1/4" />
        <SkeletonLine width="w-full" height="h-3" />
        <SkeletonLine width="w-5/6" height="h-3" />
      </div>
      <div className="space-y-2">
        <SkeletonLine width="w-1/4" />
        <SkeletonLine width="w-full" height="h-3" />
        <SkeletonLine width="w-2/3" height="h-3" />
      </div>
    </div>
  );
};

export default FeedbackSkeleton;
