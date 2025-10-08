import React, { useState } from 'react';
import BusinessDashboard from './components/BusinessDashboard';
import AccentTraining from './components/AccentTraining';
import LearningRoadmap from './components/LearningRoadmap';
import VideoEmbed, { ChannelShowcase } from './components/VideoEmbed';
import type { User } from './types';

// Mock user for testing
const mockUser: User = {
  id: 'test-user-1',
  name: 'Test User',
  avatar: 'fa-user',
  level: 'Beginner',
  points: 1250,
  badges: ['first-lesson', 'week-streak'],
  role: 'student',
  streak: 7,
  sscore: 1250,
  aiTokens: 50,
  currentStreak: 7
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'roadmap' | 'accent' | 'videos'>('home');

  const renderView = () => {
    switch (currentView) {
      case 'roadmap':
        return <LearningRoadmap user={mockUser} onLessonSelect={(day, lessonId) => console.log('Lesson:', day, lessonId)} />;
      case 'accent':
        return <AccentTraining phrase="" />;
      case 'videos':
        return (
          <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            <div className="px-4 py-6">
              <ChannelShowcase />
            </div>
          </div>
        );
      default:
        return <BusinessDashboard user={mockUser} onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="App">
      {renderView()}
    </div>
  );
};

export default App;