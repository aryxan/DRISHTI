import React from 'react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { AlertCircle, Flame, ShieldAlert, X } from 'lucide-react';
import type { IncidentSeverity } from '../types/incident';

export const AlertToast: React.FC = () => {
  const { toasts, dismissToast } = useCommandCenter();

  if (toasts.length === 0) return null;

  const getToastStyle = (sev: IncidentSeverity) => {
    switch (sev) {
      case 'critical':
        return {
          bg: 'bg-rose-950/95 border-rose-600 text-rose-100 shadow-rose-950/80',
          icon: <Flame className="w-5 h-5 text-rose-400 animate-bounce" />,
        };
      case 'high':
        return {
          bg: 'bg-amber-950/95 border-amber-600 text-amber-100 shadow-amber-950/80',
          icon: <ShieldAlert className="w-5 h-5 text-amber-400" />,
        };
      default:
        return {
          bg: 'bg-slate-900/95 border-cyan-600 text-slate-100 shadow-cyan-950/80',
          icon: <AlertCircle className="w-5 h-5 text-cyan-400" />,
        };
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const style = getToastStyle(toast.severity);
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-2xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5 ${style.bg}`}
          >
            <div className="shrink-0 mt-0.5">{style.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h5 className="text-xs font-bold font-mono tracking-wide">
                  {toast.title}
                </h5>
                <span className="text-[10px] opacity-70 font-mono">
                  {toast.timestamp}
                </span>
              </div>
              <p className="text-xs mt-1 opacity-90 leading-snug break-words">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
