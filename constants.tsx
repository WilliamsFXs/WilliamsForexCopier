
import React from 'react';
import { 
  ArrowRightLeft, 
  Bot, 
  Layers, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Cpu, 
  Globe, 
  Clock, 
  Target 
} from 'lucide-react';

export const TELEGRAM_URL = "https://t.me/williamsforexrobot";

export const COPIER_TYPES = [
  {
    id: 'mt5-mt5',
    title: 'MT5 → MT5 Copier',
    description: 'Direct account-to-account bridge with full parameter control.',
    icon: <ArrowRightLeft className="w-6 h-6 text-blue-400" />
  },
  {
    id: 'mt4-mt5',
    title: 'MT4 → MT5 Copier',
    description: 'Cross-platform legacy bridge with symbol mapping.',
    icon: <Layers className="w-6 h-6 text-yellow-400" />
  },
  {
    id: 'tg-mt5',
    title: 'Telegram → MT5 Copier',
    description: 'Advanced signal parsing from channels directly to MT5.',
    icon: <Bot className="w-6 h-6 text-sky-400" />
  },
  {
    id: 'multi-mt5',
    title: 'Multiple MT5 Copier',
    description: 'One master account distributing to up to 5 slave accounts.',
    icon: <Zap className="w-6 h-6 text-purple-400" />
  }
];

export const SYMBOLS = [
  'EURUSD', 'GBPUSD', 'XAUUSD', 'BTCUSD', 'USDJPY', 
  'NAS100', 'ETHUSD', 'US30', 'DAX40', 'AUDUSD', 
  'USDCAD', 'USDCHF', 'NZDUSD', 'GBPJPY', 'EURJPY', 
  'XAGUSD', 'SOLUSD', 'US100', 'GER30', 'SPX500'
];

export const FEATURES = [
  {
    id: 'one-click',
    title: 'One-Click Copying',
    description: 'Sync your accounts with a single click.',
    icon: <Target className="w-6 h-6" />
  },
  {
    id: 'lot-sizing',
    title: 'Auto Lot Sizing',
    description: 'Manual or automated risk-adjusted lot sizing.',
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    id: 'sl-tp',
    title: 'SL & TP Sync',
    description: 'Perfectly synchronized exit strategies.',
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    id: 'symbol-mapping',
    title: 'Symbol Mapping',
    description: 'Gold, Crypto, and major Forex pairs support.',
    icon: <Globe className="w-6 h-6" />
  },
  {
    id: 'latency',
    title: 'Low Latency',
    description: 'Ultra-fast execution across global servers.',
    icon: <Clock className="w-6 h-6" />
  },
  {
    id: 'vps',
    title: 'VPS Friendly',
    description: 'Designed to run 24/7 on Virtual Private Servers.',
    icon: <Cpu className="w-6 h-6" />
  }
];
