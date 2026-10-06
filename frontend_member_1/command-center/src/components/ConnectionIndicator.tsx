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
          color: 'bg-emerald-600',
          textColor: 'text-emerald-800',
          borderColor: 'border-emerald-300',
          icon: <Wifi className="w-3.5 h-3.5 text-emerald-600" />,
        };
      case 'CONNECTING':
        return {
          label: 'CONNECTING...',
          color: 'bg-amber-600 animate-pulse',
          textColor: 'text-amber-800',
          borderColor: 'border-amber-300',
          icon: <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin" />,
        };
      case 'MOCK_STREAM':
        return {
          label: 'SIMULATED STREAM',
          color: 'bg-slate-700',
          textColor: 'text-slate-800',
          borderColor: 'border-slate-300',
          icon: <Radio className="w-3.5 h-3.5 text-slate-700" />,
        };
      case 'CLOSED':
      case 'CLOSING':
      default:
        return {
          label: 'DISCONNECTED',
          color: 'bg-rose-600',
          textColor: 'text-rose-800',
          borderColor: 'border-rose-300',
          icon: <WifiOff className="w-3.5 h-3.5 text-rose-600" />,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border bg-white ${config.borderColor} ${config.textColor} shadow-2xs`}
        title={`WebSocket status: ${wsState}`}
      >
        <span className={`w-2 h-2 rounded-full ${config.color}`} />
        {config.icon}
        <span>{config.label}</span>
      </div>

      <button
        onClick={toggleMockMode}
        className="px-2.5 py-1 text-xs rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium transition-colors shadow-2xs cursor-pointer"
        title="Toggle between live backend and simulated mock event stream"
      >
        {isMockMode ? 'Use Live WS' : 'Use Mock Feed'}
      </button>
    </div>
  );
};
