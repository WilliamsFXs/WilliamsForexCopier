
import React, { useState } from 'react';
import ConnectButton from '../components/ConnectButton';
import { Smartphone, Download, Settings, PlayCircle, Apple, Clock } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'android' | 'ios'>('android');

  const steps = [
    { number: '01', title: 'Select Robot Mode', desc: 'Choose your copying strategy.' },
    { number: '02', title: 'Link MT4/MT5 Account', desc: 'Secure your trading terminal.' },
    { number: '03', title: 'Activate Robot License', desc: 'Receive your unique license key.' },
    { number: '04', title: 'Start Williams Copier', desc: 'Begin automated trade syncing.' }
  ];

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 h-full flex flex-col py-2">
      {/* Step Process Section */}
      <div className="mb-6 text-center shrink-0">
        <h2 className="text-xl font-black text-slate-900 dark:text-white mb-1 uppercase tracking-tighter">Process Map</h2>
        <p className="text-slate-500 dark:text-gray-500 text-[10px] font-bold uppercase tracking-widest">Start automated copying in 4 steps.</p>
      </div>

      <div className="relative mb-10 px-4 shrink-0">
        <div className="absolute left-[1.125rem] top-4 bottom-4 w-px bg-blue-500/20"></div>
        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.number} className="relative flex items-start space-x-5">
              <div className="z-10 bg-blue-600 w-8 h-8 md:w-11 md:h-11 rounded-full flex items-center justify-center text-white font-black text-[10px] md:text-sm shadow-lg shadow-blue-500/20 shrink-0 mt-0.5">
                {step.number}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-slate-900 dark:text-white text-xs md:text-base font-black leading-tight mb-1 uppercase tracking-tight">{step.title}</h3>
                <p className="text-slate-500 dark:text-gray-500 text-[9px] md:text-xs font-medium leading-tight">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Device Toggle */}
      <div className="flex bg-slate-200 dark:bg-[#111111] rounded-xl p-1 mb-6 border border-slate-300 dark:border-white/5 shrink-0">
        <button 
          onClick={() => setActiveTab('android')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'android' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 dark:text-gray-500'}`}
        >
          <Smartphone size={12} />
          <span>Android</span>
        </button>
        <button 
          onClick={() => setActiveTab('ios')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'ios' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 dark:text-gray-500'}`}
        >
          <Apple size={12} />
          <span>iOS</span>
        </button>
      </div>

      {/* Mobile Installation Guide Section */}
      <div className="mb-8">
        <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl md:rounded-[2rem] p-6 md:p-8 relative overflow-hidden min-h-[220px] flex flex-col justify-center shadow-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full"></div>
          
          {activeTab === 'android' && (
            <>
              <div className="flex items-center space-x-3 mb-6 relative z-10">
                <Smartphone className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                <h3 className="text-slate-900 dark:text-white text-sm md:text-base font-black uppercase tracking-wider text-wrap">APP SETUP</h3>
              </div>
              <div className="space-y-4 relative z-10">
                <InstallStep icon={<PlayCircle size={14}/>} text="Go to @WilliamsForexRobot on telegram" />
                <InstallStep icon={<Settings size={14}/>} text="Download the bot" />
                <InstallStep icon={<Download size={14}/>} text="Install App and add to home screen" />
              </div>
            </>
          )}

          {activeTab === 'ios' && (
            <div className="flex flex-col items-center justify-center space-y-4 relative z-10 py-4">
              <div className="bg-blue-500/20 p-4 rounded-full">
                <Clock className="text-blue-600 dark:text-blue-400 w-10 h-10 animate-pulse" />
              </div>
              <div className="text-center">
                <h3 className="text-slate-900 dark:text-white text-base md:text-xl font-black uppercase tracking-widest mb-1">Coming Soon</h3>
                <p className="text-slate-500 dark:text-gray-400 text-[10px] md:text-sm font-medium">Apple iOS support is currently under heavy testing.</p>
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/5 relative z-10">
            <p className="text-[9px] md:text-xs text-slate-500 dark:text-gray-500 leading-tight font-medium italic">
              WilliamsForexRobot ensures sub-millisecond sync between your Master and Slave accounts.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111111] p-4 rounded-2xl mb-8 border border-slate-200 dark:border-white/5 shrink-0 shadow-sm">
        <p className="text-blue-600 dark:text-blue-400/80 text-[10px] italic text-center leading-relaxed font-bold">
          "For custom WilliamsForexRobot configurations or multi-account setups, contact support via Telegram."
        </p>
      </div>

      <ConnectButton className="mb-4 py-5 md:py-6 text-sm md:text-base" />
    </div>
  );
};

const InstallStep: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
  <div className="flex items-start space-x-3">
    <div className="text-blue-600 dark:text-blue-400 mt-0.5 shrink-0">{icon}</div>
    <span className="text-[10px] md:text-xs text-slate-700 dark:text-gray-300 font-bold leading-tight">{text}</span>
  </div>
);

export default HowItWorks;
