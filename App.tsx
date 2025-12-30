
import React, { useState, useEffect } from 'react';
import { AppView } from './types';
import Layout from './components/Layout';
import SplashScreen from './views/SplashScreen';
import Dashboard from './views/Dashboard';
import Copiers from './views/Copiers';
import HowItWorks from './views/HowItWorks';
import Disclaimer from './views/Disclaimer';
import CopierSetup from './views/CopierSetup';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('splash');
  const [selectedCopierId, setSelectedCopierId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    // Default to 'light' for new users if no preference is found
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Handle incoming PWA Entry Points (Shortcuts, Share Target, Protocol Handlers)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const action = params.get('action');
    const shareText = params.get('text');
    const protocol = params.get('protocol');

    if (action === 'setup') {
      setView('copiers');
    } else if (action === 'guides') {
      setView('how-it-works');
    } else if (action === 'dashboard') {
      setView('dashboard');
    } else if (shareText || protocol) {
      setView('copiers');
      console.log("PWA received incoming data:", shareText || protocol);
    }
  }, []);

  const handleSelectCopier = (id: string) => {
    setSelectedCopierId(id);
    setView('setup');
  };

  const renderView = () => {
    switch (view) {
      case 'splash':
        return <SplashScreen onFinish={() => {
          const params = new URLSearchParams(window.location.search);
          if (params.get('action')) {
            const action = params.get('action');
            if (action === 'setup') setView('copiers');
            else if (action === 'guides') setView('how-it-works');
            else setView('dashboard');
          } else {
            setView('dashboard');
          }
        }} />;
      case 'dashboard':
        return <Dashboard />;
      case 'copiers':
        return <Copiers onSelect={handleSelectCopier} />;
      case 'setup':
        return <CopierSetup copierId={selectedCopierId} onBack={() => setView('copiers')} />;
      case 'how-it-works':
        return <HowItWorks />;
      case 'disclaimer':
        return <Disclaimer />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeView={view} setView={setView} theme={theme} toggleTheme={toggleTheme}>
      {renderView()}
    </Layout>
  );
};

export default App;
