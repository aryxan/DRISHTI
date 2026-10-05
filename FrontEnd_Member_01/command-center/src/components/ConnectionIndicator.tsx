import React from 'react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { Radio, RefreshCw, Wifi, WifiOff } from 'lucide-react';

export const ConnectionIndicator: React.FC = () => {
  const { wsState, isMockMode, toggleMockMode } = useCommandCenter();

  const getStatusConfig = () => {
    switch (wsState) {
      case 'OPEN':
        return {
          label: 'WS LIVE FEED',
          color: 'bg-emerald-500',
          textColor: 'text-emerald-400',
          borderColor: 'border-emerald-500/30',
          icon: <Wifi className="w-3.5 h-3.5 text-emerald-400" />,
        };
      case 'CONNECTING':
        return {
          label: 'CONNECTING...',
          color: 'bg-amber-500 animate-pulse',
          textColor: 'text-amber-400',
          borderColor: 'border-amber-500/30',
          icon: <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />,
        };
      case 'MOCK_STREAM':
        return {
          label: 'SIMULATED STREAM',
          color: 'bg-cyan-500',
          textColor: 'text-cyan-400',
          borderColor: 'border-cyan-500/30',
          icon: <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />,
        };
      case 'CLOSED':
      case 'CLOSING':
      default:
        return {
          label: 'DISCONNECTED',
          color: 'bg-rose-500',
          textColor: 'text-rose-400',
          borderColor: 'border-rose-500/30',
          icon: <WifiOff className="w-3.5 h-3.5 text-rose-400" />,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono font-medium border bg-slate-900/80 ${config.borderColor} ${config.textColor}`}
        title={`WebSocket status: ${wsState}`}
      >
        <span className={`w-2 h-2 rounded-full ${config.color}`} />
        {config.icon}
        <span>{config.label}</span>
      </div>

      <button
        onClick={toggleMockMode}
        className="px-2 py-1 text-xs rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
        title="Toggle between live backend and simulated mock event stream"
      >
        {isMockMode ? 'Use Live WS' : 'Use Mock Feed'}
      </button>
    </div>
  );
};
