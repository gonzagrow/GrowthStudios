
import React, { useState, useEffect } from 'react';
import { View, User } from './types';
import { db } from './services/dbService';
import LoginView from './components/LoginView';
import FunnelView from './components/FunnelView';
import OfferBuilder from './components/OfferBuilder';
import ScriptHub from './components/ScriptHub';
import ProfileView from './components/ProfileView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LOGIN);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = db.getUser();
    if (savedUser) {
      setUser(savedUser);
      setCurrentView(View.FUNNEL);
    }
  }, []);

  const handleLogin = (name: string, email: string) => {
    const newUser = { id: Date.now().toString(), name, email };
    db.setUser(newUser);
    setUser(newUser);
    setCurrentView(View.FUNNEL);
  };

  const handleLogout = () => {
    db.logout();
    setUser(null);
    setCurrentView(View.LOGIN);
  };

  if (!user || currentView === View.LOGIN) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative bg-bg-dark border-x border-border-dark">
      <main className="flex-1 overflow-y-auto pb-32">
        {currentView === View.FUNNEL && <FunnelView />}
        {currentView === View.OFFER && <OfferBuilder />}
        {currentView === View.SCRIPTS && <ScriptHub />}
        {currentView === View.PROFILE && <ProfileView user={user} onLogout={handleLogout} />}
      </main>

      <nav className="fixed bottom-0 inset-x-0 glass-nav px-8 pb-10 pt-6 flex items-center justify-between z-50 max-w-md mx-auto border-x border-border-dark">
        <button 
          onClick={() => setCurrentView(View.FUNNEL)}
          className={`${currentView === View.FUNNEL ? 'text-white' : 'text-zinc-600'} transition-colors`}
        >
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: `'wght' 200, 'FILL' ${currentView === View.FUNNEL ? 1 : 0}` }}>bubble_chart</span>
        </button>
        <button 
          onClick={() => setCurrentView(View.SCRIPTS)}
          className={`${currentView === View.SCRIPTS ? 'text-white' : 'text-zinc-600'} transition-colors`}
        >
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: `'wght' 200, 'FILL' ${currentView === View.SCRIPTS ? 1 : 0}` }}>all_inclusive</span>
        </button>
        <button 
          onClick={() => setCurrentView(View.OFFER)}
          className={`${currentView === View.OFFER ? 'text-white' : 'text-zinc-600'} transition-colors`}
        >
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: `'wght' 200, 'FILL' ${currentView === View.OFFER ? 1 : 0}` }}>query_stats</span>
        </button>
        <button 
          onClick={() => setCurrentView(View.PROFILE)}
          className={`${currentView === View.PROFILE ? 'text-white' : 'text-zinc-600'} transition-colors`}
        >
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: `'wght' 200, 'FILL' ${currentView === View.PROFILE ? 1 : 0}` }}>account_circle</span>
        </button>
      </nav>

      <div className="fixed bottom-2 inset-x-0 flex justify-center z-[60] pointer-events-none">
        <div className="w-32 h-1 bg-zinc-800 rounded-full"></div>
      </div>
    </div>
  );
};

export default App;
