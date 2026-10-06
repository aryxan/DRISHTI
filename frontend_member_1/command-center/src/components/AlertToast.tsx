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
          bg: 'bg-white border-red-300 text-slate-900 shadow-xl shadow-red-500/10',
          icon: <Flame className="w-5 h-5 text-red-600 animate-bounce" />,
        };
      case 'high':
        return {
          bg: 'bg-white border-amber-300 text-slate-900 shadow-xl shadow-amber-500/10',
          icon: <ShieldAlert className="w-5 h-5 text-amber-600" />,
        };
      default:
        return {
          bg: 'bg-white border-slate-300 text-slate-900 shadow-xl',
          icon: <AlertCircle className="w-5 h-5 text-slate-700" />,
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
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-xl transition-all duration-300 animate-in slide-in-from-bottom-5 ${style.bg}`}
          >
            <div className="shrink-0 mt-0.5">{style.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h5 className="text-xs font-bold font-mono tracking-wide text-slate-900">
                  {toast.title}
                </h5>
                <span className="text-[10px] text-slate-400 font-mono">
                  {toast.timestamp}
                </span>
              </div>
              <p className="text-xs mt-1 text-slate-600 leading-snug break-words">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
