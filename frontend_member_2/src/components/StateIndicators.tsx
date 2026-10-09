import React from 'react';
import { AlertTriangle, RefreshCw, AlertOctagon } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const ErrorBanner: React.FC<{ message: string; onRetry?: () => void }> = ({ message, onRetry }) => (
  <div className="bg-rose-950/80 border border-rose-500/60 rounded-xl p-4 flex items-center justify-between text-rose-200 font-mono text-xs shadow-lg my-2">
    <div className="flex items-center gap-3">
      <AlertOctagon className="h-5 w-5 text-rose-400 shrink-0" />
      <div>
        <span className="font-bold block text-rose-100">SYSTEM TELEMETRY ERROR</span>
        <span>{message}</span>
      </div>
    </div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-3 py-1 rounded bg-rose-900 hover:bg-rose-800 border border-rose-600 text-xs font-semibold text-white transition flex items-center gap-1.5"
      >
        <RefreshCw className="h-3.5 w-3.5" /> RETRY
      </button>
    )}
  </div>
);

export const StaleAnalysisBanner: React.FC = () => {
  const { isStale, staleReason, selectedIncidentId, refreshAnalysis, isDetailLoading } = useIntelligence();

  if (!isStale || !selectedIncidentId) return null;

  return (
    <div className="bg-amber-950/80 border border-amber-500/60 rounded-xl p-3 flex items-center justify-between text-amber-200 font-mono text-xs my-2">
      <div className="flex items-center gap-2.5">
        <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 animate-bounce" />
        <div>
          <span className="font-bold block text-amber-100">STALE AI ANALYSIS DETECTED</span>
          <span className="text-[11px] text-amber-300 font-sans">
            {staleReason || 'Incident state transitioned. Current AI summary may be outdated.'}
          </span>
        </div>
      </div>
      <button
        disabled={isDetailLoading}
        onClick={() => refreshAnalysis(selectedIncidentId)}
        className="px-3 py-1.5 rounded bg-amber-900 hover:bg-amber-800 border border-amber-500 text-xs font-semibold text-white transition flex items-center gap-1.5 disabled:opacity-50"
      >
        <RefreshCw className={`h-3.5 w-3.5 ${isDetailLoading ? 'animate-spin' : ''}`} />
        <span>RE-RUN AI ENGINE</span>
      </button>
    </div>
  );
};

export const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4 animate-pulse p-4">
    <div className="h-10 bg-slate-800/80 rounded-xl w-full" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="h-48 bg-slate-800/60 rounded-xl" />
      <div className="h-48 bg-slate-800/60 rounded-xl" />
    </div>
    <div className="h-64 bg-slate-800/40 rounded-xl" />
  </div>
);
