import React from 'react';
import type { User } from '../../types';

const Home: React.FC<{ user: any }> = ({ user }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name || 'Learner'}</h1>
      <p className="text-mobile-sm text-slate-600">Quick actions and progress overview</p>
      {/* ...existing code... */}
    </div>
  );
};

export default Home;
