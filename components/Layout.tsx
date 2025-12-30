
import React from 'react';
import { Home, Grid, Shield, HelpCircle, Sun, Moon } from 'lucide-react';
import { AppView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  setView: (view: AppView) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setView, theme, toggleTheme }) => {
  if (activeView === 'splash') return <>{children}</>;

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      <div className="flex-1 flex flex-col w-full max-w-5xl mx-auto md:border-x border-slate-200 dark:border-white/5 bg-white/50 dark:bg-[#080808]/50 shadow-2xl relative h-full">
        
        {/* Header - Robot Logo */}
        <header className="px-5 md:px-10 pt-8 md:pt-12 pb-4 bg-gradient-to-b from-blue-600/10 to-transparent shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 md:space-x-4 group cursor-pointer" onClick={() => setView('dashboard')}>
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl border border-blue-500/40 bg-white dark:bg-[#0a0a0a] overflow-hidden flex items-center justify-center shadow-lg shadow-blue-500/10 transition-transform active:scale-95 group-hover:border-blue-500">
                <img 
                  src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?fit=crop&q=60&w=96&h=96&fm=webp" 
                  alt="Robot Logo" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white leading-none tracking-tighter uppercase">Williams<span className="text-blue-500">Forex</span></h1>
                <span className="text-[8px] md:text-xs text-blue-500 dark:text-blue-400 font-bold uppercase tracking-[0.2em]">Trading Automation</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Theme Toggle Button */}
              <button 
                onClick={toggleTheme}
                className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all active:scale-90"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <div className="flex items-center space-x-1.5 bg-blue-600/10 border border-blue-500/20 px-2.5 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl">
                <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse"></div>
                <span className="text-[8px] md:text-xs text-green-600 dark:text-green-500 font-black uppercase tracking-widest">Connected</span>
              </div>
            </div>
          </div>
        </header>

        {/* Primary Content Container */}
        <main className="flex-1 overflow-y-auto px-5 md:px-10 pb-32 md:pb-40 scroll-smooth">
          {children}
        </main>
      </div>

      {/* Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center md:px-4 pb-4 md:pb-8 pointer-events-none">
        <nav className="w-full md:max-w-xl bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-2xl border-t md:border border-slate-200 dark:border-white/10 md:rounded-3xl py-3 md:py-4 px-6 md:px-8 flex justify-between items-center shadow-2xl dark:shadow-black/50 pointer-events-auto transition-colors duration-300">
          <NavButton 
            icon={<Home size={20} />} 
            label="Home" 
            active={activeView === 'dashboard'} 
            onClick={() => setView('dashboard')} 
          />
          <NavButton 
            icon={<Grid size={20} />} 
            label="Copier" 
            active={activeView === 'copiers' || activeView === 'setup'} 
            onClick={() => setView('copiers')} 
          />
          <NavButton 
            icon={<HelpCircle size={20} />} 
            label="Guide" 
            active={activeView === 'how-it-works'} 
            onClick={() => setView('how-it-works')} 
          />
          <NavButton 
            icon={<Shield size={20} />} 
            label="Legal" 
            active={activeView === 'disclaimer'} 
            onClick={() => setView('disclaimer')} 
          />
        </nav>
      </div>
    </div>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center space-y-1 md:space-y-1.5 transition-all duration-300 ${active ? 'text-blue-500 scale-105 md:scale-110' : 'text-slate-500 dark:text-gray-500 hover:text-blue-500 dark:hover:text-gray-300'}`}
  >
    <div className={`p-1 md:p-1.5 rounded-lg md:rounded-xl transition-all ${active ? 'bg-blue-600/10' : ''}`}>
      {icon}
    </div>
    <span className="text-[7px] md:text-[10px] font-black uppercase tracking-widest">{label}</span>
    {active && <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-blue-500 rounded-full animate-pulse mt-0.5"></div>}
  </button>
);

export default Layout;
