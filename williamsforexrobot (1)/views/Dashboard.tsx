
import React from 'react';
import ConnectButton from '../components/ConnectButton';
import { Shield, Zap, Globe, Cpu } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 h-full flex flex-col justify-between py-2">
      {/* Cloud Infrastructure Status */}
      <section className="mb-4">
        <div className="bg-gradient-to-br from-blue-600/10 dark:from-blue-600/20 via-blue-900/5 dark:via-blue-900/10 to-transparent border border-blue-500/20 p-5 md:p-8 rounded-3xl md:rounded-[2.5rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 md:w-64 h-32 md:h-64 bg-blue-500/10 blur-[60px] md:blur-[100px] rounded-full group-hover:bg-blue-500/20 transition-all duration-700"></div>
          
          <h2 className="text-blue-600 dark:text-blue-400 text-[8px] md:text-xs font-black uppercase tracking-[0.3em] mb-2 md:mb-4">CONNECTION: LIVE</h2>
          <div className="flex justify-between items-end relative z-10">
            <div>
              <p className="text-2xl md:text-5xl font-black text-slate-900 dark:text-white mb-1 md:mb-2 tracking-tighter leading-tight">Williams Forex Trade Copier</p>
              <p className="text-slate-600 dark:text-gray-400 text-[10px] md:text-base max-w-[200px] md:max-w-sm leading-tight">Automated MT4, MT5 & Telegram signal copying by WilliamsForexRobot.</p>
            </div>
            <div className="bg-white/50 dark:bg-blue-500/20 p-2.5 md:p-4 rounded-2xl md:rounded-3xl backdrop-blur-md border border-slate-200 dark:border-blue-500/20 shadow-sm">
              <Zap className="text-blue-600 dark:text-blue-400 w-5 h-5 md:w-10 md:h-10 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-10">
        <StatCard 
          icon={<Globe className="text-yellow-600 dark:text-yellow-400 w-4 h-4 md:w-6 md:h-6" />} 
          title="Edge Nodes" 
          value="Global" 
          desc="Robot CDN"
        />
        <StatCard 
          icon={<Cpu className="text-purple-600 dark:text-purple-400 w-4 h-4 md:w-6 md:h-6" />} 
          title="Assets" 
          value="FX/Crypto" 
          desc="Multi-Asset"
        />
        <StatCard 
          icon={<Shield className="text-green-600 dark:text-green-400 w-4 h-4 md:w-6 md:h-6" />} 
          title="Security" 
          value="Robot Armor" 
          desc="DDoS Protection"
        />
        <StatCard 
          icon={<Zap className="text-blue-600 dark:text-blue-400 w-4 h-4 md:w-6 md:h-6" />} 
          title="Latency" 
          value="< 1ms" 
          desc="VPC Peering"
        />
      </div>

      {/* Bottom Action Area */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-2">
        <div className="hidden md:block bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/5 rounded-[2rem] p-8 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center">
            <span className="w-2 h-8 bg-blue-500 rounded-full mr-4 shadow-[0_0_15px_rgba(59,130,246,0.3)] dark:shadow-[0_0_15px_rgba(59,130,246,0.5)]"></span>
            System Advantages
          </h3>
          <ul className="space-y-4">
            <BenefitItem text="99.99% Uptime SLA" />
            <BenefitItem text="Military-Grade Encryption" />
            <BenefitItem text="Scalable Signal Processing" />
          </ul>
        </div>

        <div className="flex flex-col justify-end space-y-3">
          <div className="bg-slate-100 dark:bg-blue-900/10 p-3 md:p-6 rounded-2xl md:rounded-[2rem] border-l-2 md:border-l-4 border-blue-600">
            <p className="text-slate-700 dark:text-gray-300 text-[10px] md:text-sm leading-tight md:leading-relaxed italic">
              "Automated trade copying made simple and reliable."
            </p>
          </div>
          <ConnectButton 
            label="DOWNLOAD PC VERSION" 
            className="py-3 md:py-4 text-xs md:text-base" 
          />
          <p className="text-center text-[8px] md:text-[11px] text-slate-400 dark:text-gray-500 px-4 uppercase tracking-widest font-bold opacity-50">
            Secure Robot Infrastructure
          </p>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, title: string, value: string, desc: string }> = ({ icon, title, value, desc }) => (
  <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/5 p-3 md:p-6 rounded-2xl md:rounded-[2rem] hover:border-blue-500/30 transition-all duration-300 group shadow-sm">
    <div className="mb-2 md:mb-4 bg-slate-50 dark:bg-white/5 w-8 h-8 md:w-12 md:h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">{icon}</div>
    <p className="text-slate-500 dark:text-gray-500 text-[7px] md:text-[10px] uppercase font-black tracking-widest mb-0.5">{title}</p>
    <p className="text-slate-900 dark:text-white text-xs md:text-lg font-black tracking-tight leading-none">{value}</p>
    <p className="hidden md:block text-slate-400 dark:text-gray-600 text-[9px] font-bold uppercase mt-2 tracking-widest">{desc}</p>
  </div>
);

const BenefitItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-center space-x-3 text-sm text-slate-600 dark:text-gray-300 font-medium">
    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.3)]"></div>
    <span>{text}</span>
  </li>
);

export default Dashboard;
