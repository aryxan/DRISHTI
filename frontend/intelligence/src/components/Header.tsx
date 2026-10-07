import React from 'react';
import { Radio, Activity, Sparkles, RefreshCw, Cpu, User } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';
import { CurrentTime } from './CurrentTime';
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
    <header className="px-5 py-3 bg-white/95 border-b border-slate-300 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20 backdrop-blur-xs shadow-2xs">
      {/* Portal Title */}
      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-cyan-600 animate-pulse" />
        <div>
          <div className="text-xs font-mono font-bold text-slate-800">
            10. Frontend Portal 2 — AI Intelligence (frontend/intelligence)
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            AI-Driven Multi-Modal Threat Reasoning & Forensic Intelligence
          </div>
        </div>
      </div>

      {/* Telemetry & User Bar */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* System Counters */}
        <div className="hidden lg:flex items-center gap-3 bg-slate-100 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-mono">
          <div className="flex items-center gap-1 text-slate-700 font-semibold">
            <Activity className="h-3.5 w-3.5 text-cyan-600" />
            <span>INCIDENTS: <strong className="text-slate-900">{incidents.length}</strong></span>
          </div>
          <div className="h-3 w-px bg-slate-300" />
          <div className="flex items-center gap-1 text-rose-600 font-semibold">
            <span className="h-2 w-2 rounded-full bg-rose-600 animate-ping" />
            <span>CRITICAL: <strong>{criticalCount}</strong></span>
          </div>
          <div className="h-3 w-px bg-slate-300" />
          <div className="flex items-center gap-1 text-amber-600 font-semibold">
            <span>HIGH: <strong>{highCount}</strong></span>
          </div>
        </div>

        {/* Connection Indicator & Mock Toggle */}
        <div className="flex items-center gap-2 bg-slate-100 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-mono">
          <Radio className={`h-3.5 w-3.5 ${wsConnectionState === 'OPEN' || wsConnectionState === 'SIMULATED' ? 'text-emerald-600 animate-pulse' : 'text-rose-600'}`} />
          <span className="text-slate-700 font-bold">{wsConnectionState}</span>
          <button
            onClick={() => toggleMockMode(!isMockMode)}
            className="ml-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-2xs transition"
          >
            {isMockMode ? 'MOCK FEED' : 'LIVE FEED'}
          </button>
        </div>

        {/* Test WS Event Menu */}
        <div className="relative group">
          <button className="flex items-center gap-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-300 rounded-lg px-2.5 py-1 text-xs font-mono font-semibold transition">
            <Sparkles className="h-3.5 w-3.5 text-cyan-600" />
            <span>TEST WS EVENT</span>
          </button>
          <div className="absolute right-0 top-full mt-1 hidden group-hover:flex flex-col bg-white border border-slate-300 rounded-lg shadow-xl p-1.5 min-w-[200px] z-50">
            <span className="text-[10px] font-mono text-slate-400 px-2 py-1 uppercase border-b border-slate-100 font-bold">
              Simulate WebSocket Dispatch
            </span>
            <button
              onClick={() => simulateWSMessage('incident.created' as WebSocketMessageType)}
              className="text-left px-2 py-1.5 hover:bg-slate-100 text-xs text-emerald-700 rounded flex items-center gap-2 font-mono font-semibold"
            >
              <Cpu className="h-3 w-3 text-emerald-600" /> incident.created
            </button>
            <button
              onClick={() => simulateWSMessage('incident.updated' as WebSocketMessageType)}
              className="text-left px-2 py-1.5 hover:bg-slate-100 text-xs text-amber-700 rounded flex items-center gap-2 font-mono font-semibold"
            >
              <RefreshCw className="h-3 w-3 text-amber-600" /> incident.updated
            </button>
            <button
              onClick={() => simulateWSMessage('ai.analysis.completed' as WebSocketMessageType)}
              className="text-left px-2 py-1.5 hover:bg-slate-100 text-xs text-cyan-700 rounded flex items-center gap-2 font-mono font-semibold"
            >
              <Sparkles className="h-3 w-3 text-cyan-600" /> ai.analysis.completed
            </button>
          </div>
        </div>

        {/* Clock Component */}
        <CurrentTime />

        {/* User Profile Pill */}
        <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-100 rounded-lg border border-slate-300 shadow-2xs font-sans">
          <div className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center text-[10px] font-bold font-mono">
            <User className="h-3.5 w-3.5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 leading-tight">
              operator.b
            </span>
            <span className="text-[9px] text-slate-500 uppercase font-mono font-semibold leading-none">
              AI ANALYST
            </span>
          </div>
        </div>
      </div>

      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="w-full mt-1">
          <div className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center justify-between ${
            toastMessage.type === 'warning' ? 'bg-rose-50 border-rose-300 text-rose-800' :
            toastMessage.type === 'success' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' :
            'bg-cyan-50 border-cyan-300 text-cyan-800'
          }`}>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-current animate-ping" />
              <span>{toastMessage.text}</span>
            </div>
            <button onClick={dismissToast} className="text-slate-400 hover:text-slate-700 font-bold ml-4">
              ✕
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
