
import React from 'react';
import { COPIER_TYPES } from '../constants';
import ConnectButton from '../components/ConnectButton';
import { ChevronRight } from 'lucide-react';

interface CopiersProps {
  onSelect: (id: string) => void;
}

const Copiers: React.FC<CopiersProps> = ({ onSelect }) => {
  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 h-full flex flex-col justify-between py-2">
      <div className="mb-4">
        <h2 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white mb-1 md:mb-3 tracking-tighter">Forex Copier Setup</h2>
        <p className="text-slate-500 dark:text-gray-400 text-[10px] md:text-base max-w-xl">Choose how you want to copy trades.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 md:gap-6 mb-4 md:mb-16">
        {COPIER_TYPES.map((copier) => (
          <button 
            key={copier.id} 
            onClick={() => onSelect(copier.id)}
            className="w-full text-left bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/5 p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] flex flex-col items-start hover:border-blue-500/50 hover:bg-blue-600/5 transition-all group relative overflow-hidden shadow-sm"
          >
            <div className="absolute top-0 right-0 p-3 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight size={16} className="text-blue-500 md:size-24" />
            </div>
            
            <div className="bg-blue-600/10 p-3 md:p-5 rounded-xl md:rounded-[1.5rem] mb-3 md:mb-6 group-hover:scale-110 transition-transform border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white">
              {React.cloneElement(copier.icon as React.ReactElement, { className: "w-5 h-5 md:w-8 md:h-8 transition-colors" })}
            </div>
            <div>
              <h3 className="text-slate-900 dark:text-white text-[11px] md:text-lg font-black mb-1 md:mb-2 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">{copier.title}</h3>
              <p className="hidden md:block text-slate-500 dark:text-gray-500 text-xs leading-relaxed font-medium">{copier.description}</p>
              <p className="md:hidden text-blue-600 dark:text-blue-500/70 text-[7px] font-black uppercase tracking-widest">Setup Node</p>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-600/10 to-blue-900/10 dark:from-blue-600/10 dark:to-blue-900/10 border border-blue-500/20 p-5 md:p-10 rounded-[1.5rem] md:rounded-[3rem] relative overflow-hidden shrink-0">
        <div className="relative z-10 grid md:grid-cols-3 gap-4 md:gap-8 items-center">
          <div className="md:col-span-2">
            <h3 className="text-blue-600 dark:text-blue-400 font-black mb-1 md:mb-3 text-[9px] md:text-sm uppercase tracking-[0.3em]">24/7 Forex Copier Support</h3>
            <p className="text-slate-700 dark:text-gray-300 text-xs md:text-lg mb-1 md:mb-4 font-semibold leading-tight">
              Our support team available 24/7.
            </p>
          </div>
          <div className="flex justify-end">
            <ConnectButton label="DOWNLOAD PC VERSION" className="bg-blue-600 py-3 md:py-5 text-xs md:text-base" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Copiers;
