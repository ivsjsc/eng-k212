import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './src/pages/Home';
import Learn from './src/pages/Learn';
import Practice from './src/pages/Practice';
import Resources from './src/pages/Resources';
import Profile from './src/pages/Profile';

const mockUser = { id: 'test-user-1', name: 'Test User' };

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <header className="p-4 border-b bg-white">
          <nav className="flex gap-4">
            <Link to="/" className="font-semibold">Home</Link>
            <Link to="/learn">Learn</Link>
            <Link to="/practice">Practice</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/profile">Profile</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home user={mockUser} />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;