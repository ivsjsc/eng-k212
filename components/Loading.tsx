import React from 'react';

const Loading: React.FC<{ message?: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center h-full w-full bg-slate-50 dark:bg-slate-900">
    <div className="spinner h-12 w-12 animate-spin rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-blue-600 dark:border-t-blue-500"></div>
    <p className="mt-4 text-lg font-medium text-slate-600 dark:text-slate-300 tracking-wide">
      {message || 'Loading...'}
    </p>
  </div>
);

export default Loading;
