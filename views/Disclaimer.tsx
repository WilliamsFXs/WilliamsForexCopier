
import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

const Disclaimer: React.FC = () => {
  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 h-full flex flex-col justify-between py-2">
      <div className="flex flex-col items-center mb-4 shrink-0">
        <div className="bg-yellow-500/10 p-3 rounded-full mb-2">
          <AlertTriangle className="text-yellow-500 w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white text-center">Safety Protocol</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 flex-1">
        <LegalBox 
          title="Risk Notice" 
          content="Trading involves significant risk. High leverage can work against you."
        />
        <LegalBox 
          title="Not Advice" 
          content="We provide automation software only. No financial advice included."
        />
        <LegalBox 
          title="Results" 
          content="Past performance does not guarantee future results."
        />
        <LegalBox 
          title="Official Link" 
          content="Direct Robot activation is only available via official @williamsforexrobot channels."
        />
      </div>

      <div className="bg-blue-600/10 dark:bg-blue-600/10 p-3 rounded-xl flex items-start space-x-3 mb-2 shrink-0 border border-blue-500/10 shadow-sm">
        <Info className="text-blue-600 dark:text-blue-400 w-4 h-4 shrink-0 mt-0.5" />
        <p className="text-slate-700 dark:text-gray-400 text-[9px] leading-tight font-medium">
          Users are solely responsible for their trading decisions and risk settings (Lot Multipliers) on their MT4/MT5 platforms.
        </p>
      </div>
    </div>
  );
};

const LegalBox: React.FC<{ title: string, content: string }> = ({ title, content }) => (
  <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-slate-200 dark:border-white/5 flex flex-col justify-center shadow-sm">
    <h3 className="text-blue-600 dark:text-blue-400 font-bold mb-1 text-[9px] uppercase tracking-wide">{title}</h3>
    <p className="text-slate-500 dark:text-gray-500 text-[9px] leading-tight font-medium">{content}</p>
  </div>
);

export default Disclaimer;
