
import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Info, CheckCircle2, ShieldAlert, ChevronRight, Users, Clock, ExternalLink } from 'lucide-react';
import { COPIER_TYPES, SYMBOLS, TELEGRAM_URL } from '../constants';
import { SetupStep } from '../types';

interface CopierSetupProps {
  copierId: string | null;
  onBack: () => void;
}

const CopierSetup: React.FC<CopierSetupProps> = ({ copierId, onBack }) => {
  const [step, setStep] = useState<SetupStep>('form');
  const [formData, setFormData] = useState<any>({
    symbols: [],
    receivers: [{ login: '', server: '', password: '', accountType: 'Real' }],
    receiverAccountType: 'Real',
    masterAccountType: 'Real',
    copySLTP: true,
    lotMode: 'Multiplier',
    lotValue: '1.0',
    profitTarget: '',
    tradeComment: '',
    startTime: '00:00',
    stopTime: '23:59',
    entriesPerSignal: '1',
    maxDrawdown: ''
  });
  
  const copier = COPIER_TYPES.find(c => c.id === copierId);
  if (!copier) return null;

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleReceiverChange = (index: number, field: string, value: string) => {
    const newReceivers = [...formData.receivers];
    newReceivers[index] = { ...newReceivers[index], [field]: value };
    setFormData((prev: any) => ({ ...prev, receivers: newReceivers }));
  };

  const addReceiver = () => {
    if (formData.receivers.length < 5) {
      setFormData((prev: any) => ({
        ...prev, 
        receivers: [...prev.receivers, { login: '', server: '', password: '', accountType: 'Real' }]
      }));
    }
  };

  const removeReceiver = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      receivers: prev.receivers.filter((_: any, i: number) => i !== index)
    }));
  };

  const toggleSymbol = (symbol: string) => {
    const current = formData.symbols || [];
    if (current.includes(symbol)) {
      handleInputChange('symbols', current.filter((s: string) => s !== symbol));
    } else {
      handleInputChange('symbols', [...current, symbol]);
    }
  };

  const validate = () => {
    setStep('summary');
    window.scrollTo(0, 0);
  };

  const handleFinalSubmit = () => {
    setStep('waitlist');
    window.scrollTo(0, 0);
  };

  const handleJoinWaitlist = () => {
    let message = `🚀 NEW TRADE COPIER SETUP REQUEST\n\n`;
    message += `Type: ${copier.title}\n\n`;

    if (copierId === 'mt5-mt5' || copierId === 'mt4-mt5') {
      const platform = copierId === 'mt4-mt5' ? 'MT4' : 'MT5';
      message += `MASTER ACCOUNT (${platform}):\nLogin: ${formData.masterLogin || 'N/A'}\nServer: ${formData.masterServer || 'N/A'}\nType: ${formData.masterAccountType || 'Real'}\n\n`;
      message += `RECEIVER ACCOUNT (MT5):\nLogin: ${formData.receiverLogin || 'N/A'}\nServer: ${formData.receiverServer || 'N/A'}\nType: ${formData.receiverAccountType || 'Real'}\n\n`;
    } else if (copierId === 'tg-mt5') {
      message += `TELEGRAM CREDENTIALS:\nPhone: ${formData.tgPhone || 'N/A'}\nAPI ID: ${formData.tgApiId || 'N/A'}\nAPI Hash: ${formData.tgApiHash || 'N/A'}\nSource: ${formData.tgSource || 'N/A'}\n\n`;
      message += `RECEIVER ACCOUNT (MT5):\nLogin: ${formData.receiverLogin || 'N/A'}\nServer: ${formData.receiverServer || 'N/A'}\nType: ${formData.receiverAccountType || 'Real'}\n\n`;
    } else if (copierId === 'multi-mt5') {
      message += `MASTER ACCOUNT (MT5):\nLogin: ${formData.masterLogin || 'N/A'}\nServer: ${formData.masterServer || 'N/A'}\nType: ${formData.masterAccountType || 'Real'}\n\n`;
      message += `RECEIVER ACCOUNTS (MT5):\n`;
      formData.receivers.forEach((r: any, i: number) => {
        message += `${i+1}. Login: ${r.login}, Server: ${r.server}, Type: ${r.accountType}\n`;
      });
      message += `\n`;
    }

    message += `SETTINGS:\nLot Mode: ${formData.lotMode}\nValue: ${formData.lotValue}\nProfit Target: ${formData.profitTarget || 'None'}\nComment: ${formData.tradeComment || 'None'}\nSchedule: ${formData.startTime} to ${formData.stopTime}\nEntries/Signal: ${formData.entriesPerSignal}\nDrawdown Prot: ${formData.maxDrawdown || '0'}%\nSymbols: ${formData.symbols?.length > 0 ? formData.symbols.join(', ') : 'ALL'}\nSL/TP Sync: ${formData.copySLTP ? 'YES' : 'NO'}\n\n`;
    message += `I'm joining the waitlist for Williams Trade Copier.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`${TELEGRAM_URL}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="animate-in slide-in-from-right-4 duration-500 pb-20 max-w-4xl mx-auto">
      {/* Navigation */}
      {step !== 'waitlist' && (
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <button onClick={step === 'summary' ? () => setStep('form') : onBack} className="flex items-center space-x-2 md:space-x-3 text-blue-500 group bg-blue-500/10 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl border border-blue-500/20 hover:bg-blue-500/20 transition-all">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">{step === 'summary' ? 'Back' : 'Change Copier'}</span>
          </button>
          <div className="flex space-x-2">
            <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${step === 'form' ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-blue-900/40'}`}></div>
            <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${step === 'summary' ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-blue-900/40'}`}></div>
          </div>
        </div>
      )}

      {step !== 'waitlist' && (
        <div className="flex items-center space-x-4 md:space-x-6 mb-8 md:mb-12 bg-white dark:bg-white/5 p-5 md:p-8 rounded-2xl md:rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-sm">
          <div className="bg-blue-600 p-3 md:p-5 rounded-xl md:rounded-[1.5rem] shadow-xl shadow-blue-600/20 shrink-0">
            {React.cloneElement(copier.icon as React.ReactElement, { className: "w-6 h-6 md:w-8 md:h-8 text-white" })}
          </div>
          <div>
            <h2 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">{step === 'form' ? 'Configuration' : 'Review & Deploy'}</h2>
            <p className="text-blue-600 dark:text-blue-400/70 text-[9px] md:text-sm font-black uppercase tracking-[0.2em]">{copier.title}</p>
          </div>
        </div>
      )}

      {step === 'form' && (
        <div className="space-y-6 md:space-y-10">
          <FormSection title="Account Credentials">
            {copierId !== 'tg-mt5' && (
              <div className="space-y-6 mb-8 md:mb-10">
                <h4 className="text-blue-600 dark:text-blue-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] px-1 flex items-center">
                  <span className="w-1 h-3 bg-blue-500 rounded-full mr-2"></span>
                  Master Node
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <Input label="Login ID" placeholder="Account Number" onChange={(e) => handleInputChange('masterLogin', e.target.value)} value={formData.masterLogin} />
                  <Input label="Broker Server" placeholder="Server Host" onChange={(e) => handleInputChange('masterServer', e.target.value)} value={formData.masterServer} />
                </div>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <Input label="Password" type="password" placeholder="••••" onChange={(e) => handleInputChange('masterPassword', e.target.value)} value={formData.masterPassword} />
                  <Select label="Account Type" options={['Real', 'Demo']} onChange={(val) => handleInputChange('masterAccountType', val)} value={formData.masterAccountType} />
                </div>
              </div>
            )}

            {copierId === 'tg-mt5' && (
              <div className="space-y-6 mb-8 md:mb-10">
                 <h4 className="text-blue-600 dark:text-blue-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] px-1 flex items-center">
                  <span className="w-1 h-3 bg-blue-500 rounded-full mr-2"></span>
                  Telegram Protocol
                 </h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                   <Input label="Verified Phone" placeholder="+1234..." onChange={(e) => handleInputChange('tgPhone', e.target.value)} value={formData.tgPhone} />
                   <Input label="API ID" placeholder="1234567" onChange={(e) => handleInputChange('tgApiId', e.target.value)} value={formData.tgApiId} />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                   <Input label="API Hash" placeholder="hash_key" onChange={(e) => handleInputChange('tgApiHash', e.target.value)} value={formData.tgApiHash} />
                   <Input label="Source (@handle)" placeholder="@signals" onChange={(e) => handleInputChange('tgSource', e.target.value)} value={formData.tgSource} />
                 </div>
              </div>
            )}

            {copierId !== 'multi-mt5' ? (
              <div className="space-y-6">
                <h4 className="text-blue-600 dark:text-blue-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] px-1 flex items-center">
                  <span className="w-1 h-3 bg-blue-500 rounded-full mr-2"></span>
                  Receiver Terminal (MT5)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <Input label="MT5 Login" placeholder="Account Number" onChange={(e) => handleInputChange('receiverLogin', e.target.value)} value={formData.receiverLogin} />
                  <Input label="Broker Server" placeholder="Server Host" onChange={(e) => handleInputChange('receiverServer', e.target.value)} value={formData.receiverServer} />
                </div>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <Input label="Password" type="password" placeholder="••••" onChange={(e) => handleInputChange('receiverPassword', e.target.value)} value={formData.receiverPassword} />
                  <Select label="Account Type" options={['Real', 'Demo']} onChange={(val) => handleInputChange('receiverAccountType', val)} value={formData.receiverAccountType} />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                   <h4 className="text-blue-600 dark:text-blue-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] px-1 flex items-center">
                     <span className="w-1 h-3 bg-blue-500 rounded-full mr-2"></span>
                     Slave Fleet
                   </h4>
                   <button onClick={addReceiver} className="bg-blue-600 hover:bg-blue-500 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl flex items-center transition-colors">
                     <Plus size={12} className="mr-2" /> ADD NODE
                   </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {formData.receivers.map((r: any, i: number) => (
                    <div key={i} className="bg-slate-50 dark:bg-black/30 p-4 md:p-6 rounded-xl md:rounded-[2rem] border border-slate-200 dark:border-white/5 space-y-4 relative group shadow-sm">
                      {formData.receivers.length > 1 && (
                        <button onClick={() => removeReceiver(i)} className="absolute top-3 right-3 text-slate-400 dark:text-gray-700 hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      )}
                      <div className="grid grid-cols-2 gap-3">
                        <Input label={`MT5 #${i+1}`} placeholder="ID" value={r.login} onChange={(e) => handleReceiverChange(i, 'login', e.target.value)} />
                        <Input label="Server" placeholder="Host" value={r.server} onChange={(e) => handleReceiverChange(i, 'server', e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Input label="Pass" type="password" placeholder="••••" value={r.password} onChange={(e) => handleReceiverChange(i, 'password', e.target.value)} />
                        <Select label="Type" options={['Real', 'Demo']} value={r.accountType} onChange={(val) => handleReceiverChange(i, 'accountType', val)} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </FormSection>

          <FormSection title="Trading Parameters">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                <Select label="Mode" options={['Multiplier', 'Fixed Lot', 'Risk %']} onChange={(val) => handleInputChange('lotMode', val)} value={formData.lotMode} />
                <Input label="Value" placeholder="1.0" type="number" onChange={(e) => handleInputChange('lotValue', e.target.value)} value={formData.lotValue} />
                <Input label="Daily Target ($)" placeholder="e.g. 500" type="number" onChange={(e) => handleInputChange('profitTarget', e.target.value)} value={formData.profitTarget} />
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                <Input label="Comment" placeholder="Trade Tag" onChange={(e) => handleInputChange('tradeComment', e.target.value)} value={formData.tradeComment} />
                <Input label="Entries/Signal" placeholder="1" type="number" onChange={(e) => handleInputChange('entriesPerSignal', e.target.value)} value={formData.entriesPerSignal} />
             </div>

             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
                <Input label="Start (GMT)" type="time" onChange={(e) => handleInputChange('startTime', e.target.value)} value={formData.startTime} />
                <Input label="Stop (GMT)" type="time" onChange={(e) => handleInputChange('stopTime', e.target.value)} value={formData.stopTime} />
                <div className="col-span-2 md:col-span-1">
                  <Input label="Drawdown Guard (%)" placeholder="5.0" type="number" onChange={(e) => handleInputChange('maxDrawdown', e.target.value)} value={formData.maxDrawdown} />
                </div>
             </div>

             <div className="mb-8 md:mb-10">
                <label className="block text-[9px] md:text-[10px] uppercase font-black text-slate-500 dark:text-gray-500 mb-4 ml-1 tracking-[0.3em]">Asset Filter (Max 20)</label>
                <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-3">
                   {SYMBOLS.map(s => (
                     <button 
                        key={s} 
                        onClick={() => toggleSymbol(s)}
                        className={`px-2 py-2 md:py-3 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black border transition-all duration-300 ${formData.symbols?.includes(s) ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-600 dark:text-gray-500 hover:border-blue-400 dark:hover:border-white/20'}`}
                      >
                       {s}
                     </button>
                   ))}
                </div>
             </div>

             <div className="flex items-center justify-between p-4 md:p-6 bg-blue-600/5 rounded-xl md:rounded-[1.5rem] border border-blue-500/20">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className={`p-1.5 md:p-2 rounded-lg ${formData.copySLTP ? 'bg-blue-600/20 text-blue-600' : 'bg-slate-200 dark:bg-gray-800 text-slate-400 dark:text-gray-600'}`}>
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] md:text-sm text-slate-900 dark:text-white font-black uppercase tracking-widest block">SL/TP Sync</span>
                    <span className="text-[8px] md:text-[10px] text-slate-500 dark:text-gray-500 font-bold uppercase hidden md:inline">Matches Master Account Exits</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleInputChange('copySLTP', !formData.copySLTP)}
                  className={`w-12 h-6 md:w-14 md:h-7 rounded-full transition-all relative ${formData.copySLTP ? 'bg-blue-600' : 'bg-slate-300 dark:bg-gray-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-white shadow-md transition-all ${formData.copySLTP ? 'left-7 md:left-8' : 'left-1'}`}></div>
                </button>
             </div>
          </FormSection>

          <button 
            onClick={validate}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 md:py-6 rounded-2xl md:rounded-[2rem] flex items-center justify-center space-x-3 md:space-x-4 transition-all active:scale-[0.98] shadow-2xl shadow-blue-600/30 group text-base md:text-lg"
          >
            <span className="tracking-tighter uppercase">CONNECT</span>
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {step === 'summary' && (
        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
           <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/5 rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 shadow-xl">
              <h3 className="text-slate-900 dark:text-white text-lg md:text-xl font-black mb-6 md:mb-8 flex items-center">
                <span className="w-1.5 h-5 bg-blue-600 rounded-full mr-3 md:mr-4"></span>
                Deployment Review
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                 <SummaryItem label="Copier Bridge" value={copier.title} />
                 <SummaryItem label="Lot Algorithm" value={`${formData.lotMode} (×${formData.lotValue})`} />
                 <SummaryItem label="Safety Cap" value={formData.profitTarget ? `$${formData.profitTarget}` : 'Disabled'} />
                 <SummaryItem label="Schedule" value={`${formData.startTime} to ${formData.stopTime}`} />
                 <SummaryItem label="Entries" value={formData.entriesPerSignal} />
                 <SummaryItem label="Cluster" value={formData.symbols?.length > 0 ? `${formData.symbols.length} Assets` : 'Universal'} />
              </div>
           </div>

           <div className="bg-yellow-500/5 border border-yellow-500/20 p-5 md:p-8 rounded-xl md:rounded-[2rem] flex items-start space-x-4 md:space-x-6">
              <div className="bg-yellow-500/20 p-2 md:p-3 rounded-xl shrink-0">
                <ShieldAlert className="text-yellow-600 dark:text-yellow-500 w-5 h-5 md:w-8 md:h-8" />
              </div>
              <div>
                 <h4 className="text-yellow-600 dark:text-yellow-500 font-black text-[9px] md:text-xs uppercase tracking-[0.2em] mb-1 md:mb-2">Copier Confirmation</h4>
                 <p className="text-slate-600 dark:text-gray-400 text-[10px] md:text-sm leading-relaxed font-medium">
                   Finalize your request by confirming your node configuration. You will be added to the high-performance deployment queue.
                 </p>
              </div>
           </div>

           <button 
            onClick={handleFinalSubmit}
            className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-black py-5 md:py-6 rounded-2xl md:rounded-[2rem] flex items-center justify-center text-lg md:text-xl shadow-2xl shadow-blue-600/40 hover:scale-[1.01] active:scale-[0.98] transition-all uppercase tracking-tight"
          >
            CONFIRM
          </button>
        </div>
      )}

      {step === 'waitlist' && (
        <div className="min-h-[70vh] flex flex-col items-center justify-center animate-in zoom-in-95 duration-500 text-center px-4">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full animate-pulse"></div>
            <div className="relative bg-white dark:bg-[#111111] border border-slate-200 dark:border-blue-500/30 w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center shadow-2xl">
              <Clock className="text-blue-600 dark:text-blue-500 w-10 h-10 md:w-14 md:h-14 animate-[spin_10s_linear_infinite]" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-lg shadow-xl">
              <Users size={20} />
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter uppercase italic">
            YOU'RE IN LINE!
          </h2>
          
          <div className="bg-blue-600/10 border border-blue-500/20 px-6 py-3 rounded-2xl mb-8 backdrop-blur-md">
            <span className="text-blue-600 dark:text-blue-400 font-black text-lg md:text-2xl mr-2">1,306</span>
            <span className="text-slate-500 dark:text-white/60 text-[10px] md:text-sm uppercase font-black tracking-widest">users already joined</span>
          </div>

          <p className="text-slate-600 dark:text-gray-400 max-w-md mb-12 text-xs md:text-base leading-relaxed font-medium">
            Our high-performance trading nodes are currently at peak capacity. 
            Join the official telegram waitlist to receive your activation key and license.
          </p>

          <button 
            onClick={handleJoinWaitlist}
            className="group w-full max-w-sm bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl flex items-center justify-center space-x-3 transition-all active:scale-[0.98] shadow-[0_0_30px_rgba(37,99,235,0.4)]"
          >
            <span className="uppercase tracking-widest">JOIN WAITING LIST</span>
            <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>

          <p className="mt-8 text-[9px] text-slate-400 dark:text-gray-600 uppercase font-black tracking-[0.4em]">
            Activation time: soon.
          </p>
        </div>
      )}
    </div>
  );
};

const FormSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white dark:bg-[#0e0e0e] border border-slate-200 dark:border-white/5 rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 shadow-xl relative overflow-hidden transition-colors">
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[60px] rounded-full"></div>
    <h3 className="text-slate-500 dark:text-gray-500 font-black text-[10px] uppercase tracking-[0.4em] mb-6 md:mb-10 flex items-center relative z-10">
      <div className="w-1 h-3 bg-blue-600 rounded-full mr-2 md:mr-3 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
      {title}
    </h3>
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

const Input: React.FC<{ label: string, placeholder?: string, type?: string, value?: string, onChange?: (e: any) => void }> = ({ label, placeholder, type = 'text', value, onChange }) => (
  <div className="w-full">
    <label className="block text-[9px] uppercase font-black text-slate-500 dark:text-gray-500 mb-2 ml-1 tracking-widest">{label}</label>
    <input 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-xs md:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-800 focus:outline-none focus:border-blue-500/50 transition-all shadow-sm"
    />
  </div>
);

const Select: React.FC<{ label: string, options: string[], value?: string, onChange?: (val: string) => void }> = ({ label, options, value, onChange }) => (
  <div className="w-full">
    <label className="block text-[9px] uppercase font-black text-slate-500 dark:text-gray-500 mb-2 ml-1 tracking-widest">{label}</label>
    <div className="relative">
      <select 
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-xs md:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer font-bold shadow-sm"
      >
        {options.map(o => <option key={o} value={o} className="bg-white dark:bg-[#141414] text-slate-900 dark:text-white">{o}</option>)}
      </select>
      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-40">
        <ChevronRight size={14} className="rotate-90 text-slate-900 dark:text-white" />
      </div>
    </div>
  </div>
);

const SummaryItem: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="flex justify-between md:flex-col md:space-y-1 py-3 md:py-4 border-b border-slate-100 dark:border-white/5 last:border-0">
    <span className="text-slate-500 dark:text-gray-600 text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-black">{label}</span>
    <span className="text-slate-900 dark:text-white text-xs md:text-base font-black tracking-tight truncate max-w-[150px] md:max-w-none text-right md:text-left">{value}</span>
  </div>
);

export default CopierSetup;
