import React from 'react';
import { Shield, Radio, Activity, Sparkles, RefreshCw, Cpu } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';
import { WebSocketMessageType } from '../types/websocket';

export const Header: React.FC = () => {
  const {
    wsConnectionState,
    isMockMode,
    toggleMockMode,
    incidents,
    simulateWSMessage,
    toastMessage,
    dismissToast
  } = useIntelligence();

  const criticalCount = incidents.filter((i) => i.severity === 'critical').length;
  const highCount = incidents.filter((i) => i.severity === 'high').length;

  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & Platform Info */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Shield className="h-6 w-6 animate-pulse-glow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-wider text-slate-100 uppercase">
                DRISHTI <span className="text-cyan-400 text-xs font-mono font-normal">v2.4 AI-INTEL</span>
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                C4I SYSTEM
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              AI-Driven Multi-Modal Threat Reasoning & Forensic Intelligence
            </p>
          </div>
        </div>

        {/* System Telemetry Badges */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-4 bg-slate-950/60 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Activity className="h-3.5 w-3.5 text-cyan-400" />
              <span>INCIDENTS: <strong className="text-slate-100">{incidents.length}</strong></span>
            </div>
            <div className="h-3 w-px bg-slate-800" />
            <div className="flex items-center gap-1.5 text-rose-400">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
              <span>CRITICAL: <strong>{criticalCount}</strong></span>
            </div>
            <div className="h-3 w-px bg-slate-800" />
            <div className="flex items-center gap-1.5 text-amber-400">
              <span>HIGH: <strong>{highCount}</strong></span>
            </div>
          </div>

          {/* Connection Indicator */}
          <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-1.5 text-xs">
            <Radio className={`h-4 w-4 ${wsConnectionState === 'OPEN' || wsConnectionState === 'SIMULATED' ? 'text-emerald-400 animate-pulse' : 'text-rose-400'}`} />
            <span className="font-mono text-slate-300 font-medium">{wsConnectionState}</span>
            <button
              onClick={() => toggleMockMode(!isMockMode)}
              className="ml-2 px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Toggle between Mock Fixtures and Live REST/WebSocket backend"
            >
              {isMockMode ? 'MOCK FEED' : 'LIVE FEED'}
            </button>
          </div>

          {/* Trigger Test WS Events */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 bg-cyan-950/70 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-500/40 rounded-lg px-3 py-1.5 text-xs font-mono transition">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>TEST WS EVENT</span>
            </button>
            <div className="absolute right-0 top-full mt-1 hidden group-hover:flex flex-col bg-slate-900 border border-slate-800 rounded-lg shadow-xl p-1.5 min-w-[200px] z-50">
              <span className="text-[10px] font-mono text-slate-400 px-2 py-1 uppercase border-b border-slate-800">
                Simulate WebSocket Dispatch
              </span>
              <button
                onClick={() => simulateWSMessage('incident.created' as WebSocketMessageType)}
                className="text-left px-2 py-1.5 hover:bg-slate-800 text-xs text-emerald-400 rounded flex items-center gap-2"
              >
                <Cpu className="h-3 w-3" /> incident.created
              </button>
              <button
                onClick={() => simulateWSMessage('incident.updated' as WebSocketMessageType)}
                className="text-left px-2 py-1.5 hover:bg-slate-800 text-xs text-amber-400 rounded flex items-center gap-2"
              >
                <RefreshCw className="h-3 w-3" /> incident.updated
              </button>
              <button
                onClick={() => simulateWSMessage('ai.analysis.completed' as WebSocketMessageType)}
                className="text-left px-2 py-1.5 hover:bg-slate-800 text-xs text-cyan-400 rounded flex items-center gap-2"
              >
                <Sparkles className="h-3 w-3" /> ai.analysis.completed
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Toast Alert Notification Bar */}
      {toastMessage && (
        <div className="max-w-7xl mx-auto mt-2">
          <div className={`px-4 py-2 rounded-lg border text-xs font-mono flex items-center justify-between animate-fadeIn ${
            toastMessage.type === 'warning' ? 'bg-rose-950/80 border-rose-500/50 text-rose-200' :
            toastMessage.type === 'success' ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' :
            'bg-cyan-950/80 border-cyan-500/50 text-cyan-200'
          }`}>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-current animate-ping" />
              <span>{toastMessage.text}</span>
            </div>
            <button onClick={dismissToast} className="text-slate-400 hover:text-white font-bold ml-4">
              ✕
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
