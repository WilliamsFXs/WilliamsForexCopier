
import React, { useEffect } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-1000">
      <div className="relative mb-10 group">
        {/* Cinematic glow effect */}
        <div className="absolute -inset-10 bg-blue-600/20 blur-[80px] rounded-full animate-pulse"></div>
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-400 blur-2xl opacity-20 rounded-[3rem]"></div>
        
        <div className="relative w-56 h-56 bg-gradient-to-br from-blue-600 to-transparent p-[1px] rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-500/30">
          <div className="w-full h-full bg-[#0a0a0a] rounded-[3rem] overflow-hidden flex items-center justify-center relative">
            {/* Optimized for fast load: WebP, lower quality, specific size */}
            <img 
              src="https://images.unsplash.com/photo-1535378917042-10a22c95931a?fit=crop&q=60&w=384&h=384&fm=webp" 
              alt="Forex Robot Logo" 
              className="w-full h-full object-cover animate-scale-subtle"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Floating status indicator */}
        <div className="absolute -bottom-2 -right-2 bg-[#0a0a0a] border border-blue-500/40 px-3 py-1.5 rounded-full backdrop-blur-xl shadow-xl flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
          <span className="text-[8px] font-black text-white uppercase tracking-widest">v2.0 version</span>
        </div>
      </div>
      
      <div className="space-y-3 mb-16 relative">
        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
          WILLIAMS<span className="text-blue-500">FOREX</span>
        </h1>
        <div className="flex items-center justify-center space-x-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-blue-500/50"></div>
          <p className="text-blue-400/80 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">
            BEST FOREX COPIER
          </p>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-blue-500/50"></div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full max-w-[240px]">
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-700 via-blue-400 to-blue-700 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-loading-progress"></div>
        </div>
        <p className="mt-5 text-[9px] text-gray-500 uppercase font-black tracking-[0.5em] animate-pulse">
          CONNECTING TO SERVER
        </p>
      </div>

      <style>{`
        @keyframes loading-progress {
          0% { width: 0%; left: 0; }
          20% { width: 30%; left: 0; }
          60% { width: 75%; left: 0; }
          100% { width: 100%; left: 0; }
        }
        @keyframes scale-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-loading-progress {
          animation: loading-progress 3.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        .animate-scale-subtle {
          animation: scale-subtle 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
