import React from 'react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { AlertOctagon, Flame, ShieldAlert, Users } from 'lucide-react';

export const ThreatSummary: React.FC = () => {
  const { threatSummary } = useCommandCenter();

  const getDefconColor = () => {
    if (threatSummary.threat_level.includes('DEFCON-1')) {
      return {
        badgeBg: 'bg-red-50 border-red-200',
        textColor: 'text-red-700',
      };
    }
    if (threatSummary.threat_level.includes('DEFCON-2')) {
      return {
        badgeBg: 'bg-orange-50 border-orange-200',
        textColor: 'text-orange-700',
      };
    }
    if (threatSummary.threat_level.includes('DEFCON-3')) {
      return {
        badgeBg: 'bg-amber-50 border-amber-200',
        textColor: 'text-amber-700',
      };
    }
    return {
      badgeBg: 'bg-emerald-50 border-emerald-200',
      textColor: 'text-emerald-700',
    };
  };

  const colors = getDefconColor();

  return (
    <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-3 w-full">
      {/* Floating Card 1: System Threat Posture */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-[0_4px_14px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between gap-3">
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-mono tracking-wider uppercase text-slate-500 font-semibold truncate">
            SYSTEM POSTURE
          </span>
          <span className="text-sm font-black tracking-wide font-mono text-slate-900 mt-1 truncate">
            {threatSummary.threat_level}
          </span>
        </div>
        <div className={`p-2 rounded-xl border ${colors.badgeBg} ${colors.textColor} shrink-0 shadow-2xs`}>
          <AlertOctagon className="w-4 h-4" />
        </div>
      </div>

      {/* Floating Card 2: Average Threat Score */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-[0_4px_14px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-2">
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-mono tracking-wider uppercase text-slate-500 font-semibold truncate">
            AVG THREAT SCORE
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
              {threatSummary.average_threat_score}
            </span>
            <span className="text-xs text-slate-400 font-mono font-medium">/100</span>
          </div>
        </div>
        {/* Visual score bar */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              threatSummary.average_threat_score >= 75
                ? 'bg-rose-500'
                : threatSummary.average_threat_score >= 50
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(100, Math.max(0, threatSummary.average_threat_score))}%` }}
          />
        </div>
      </div>

      {/* Floating Card 3: Critical Alerts */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-[0_4px_14px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between gap-3">
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-mono tracking-wider uppercase text-red-600 font-semibold truncate">
            CRITICAL ALERTS
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-black text-red-700 font-mono tracking-tight">
              {threatSummary.critical_alerts_count}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 font-bold">
              DEFCON
            </span>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-700 shrink-0 shadow-2xs">
          <Flame className="w-4 h-4" />
        </div>
      </div>

      {/* Floating Card 4: High Alerts */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-[0_4px_14px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between gap-3">
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-mono tracking-wider uppercase text-amber-600 font-semibold truncate">
            HIGH ALERTS
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-black text-amber-700 font-mono tracking-tight">
              {threatSummary.high_alerts_count}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-bold">
              PRIORITY
            </span>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 shrink-0 shadow-2xs">
          <ShieldAlert className="w-4 h-4" />
        </div>
      </div>

      {/* Floating Card 5: Active Target Tracks */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-[0_4px_14px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between gap-3">
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-mono tracking-wider uppercase text-slate-500 font-semibold truncate">
            ACTIVE TRACKS
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">
              {threatSummary.active_tracks}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300 font-bold">
              LIVE
            </span>
          </div>
        </div>
        <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 shrink-0 shadow-2xs">
          <Users className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
