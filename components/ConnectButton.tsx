
import React from 'react';
import { Send, Download } from 'lucide-react';
import { TELEGRAM_URL } from '../constants';

interface ConnectButtonProps {
  className?: string;
  label?: string;
  icon?: React.ReactNode;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ 
  className = "", 
  label = "CONNECT TO TRADE COPIER",
  icon
}) => {
  const handleConnect = () => {
    window.open(TELEGRAM_URL, '_blank');
  };

  const defaultIcon = label.toLowerCase().includes('download') ? <Download className="w-5 h-5" /> : <Send className="w-5 h-5" />;

  return (
    <button
      onClick={handleConnect}
      className={`w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-3 transition-all duration-300 shadow-lg shadow-blue-500/20 active:scale-95 ${className}`}
    >
      {icon || defaultIcon}
      <span className="uppercase tracking-tight">{label}</span>
    </button>
  );
};

export default ConnectButton;
