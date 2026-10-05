import React from 'react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { AlertOctagon, Flame, ShieldAlert, Users, Zap } from 'lucide-react';

export const ThreatSummary: React.FC = () => {
  const { threatSummary } = useCommandCenter();

  const getDefconColor = () => {
    if (threatSummary.threat_level.includes('DEFCON-1')) {
      return {
        bg: 'bg-red-50 border-red-200 text-red-800',
        iconBg: 'bg-red-100 text-red-700',
      };
    }
    if (threatSummary.threat_level.includes('DEFCON-2')) {
      return {
        bg: 'bg-orange-50 border-orange-200 text-orange-800',
        iconBg: 'bg-orange-100 text-orange-700',
      };
    }
    if (threatSummary.threat_level.includes('DEFCON-3')) {
      return {
        bg: 'bg-amber-50 border-amber-200 text-amber-800',
        iconBg: 'bg-amber-100 text-amber-700',
      };
    }
    return {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      iconBg: 'bg-emerald-100 text-emerald-700',
    };
  };

  const colors = getDefconColor();

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col md:flex-row items-stretch justify-between gap-4">
      {/* Threat Posture Level Indicator */}
      <div
        className={`flex items-center gap-3.5 px-4 py-3 rounded-lg border ${colors.bg} shadow-2xs`}
      >
        <div className={`p-2.5 rounded-lg ${colors.iconBg} shrink-0`}>
          <AlertOctagon className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[10px] font-mono tracking-widest uppercase opacity-75">
            SYSTEM THREAT POSTURE
          </div>
          <div className="text-sm md:text-base font-black tracking-wide font-mono mt-0.5">
            {threatSummary.threat_level}
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
        {/* Average Threat Score */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3 shadow-2xs">
          <div className="p-2 rounded bg-slate-200/80 text-slate-700">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 font-mono">AVG THREAT</div>
            <div className="text-lg font-bold text-slate-900 font-mono">
              {threatSummary.average_threat_score}
              <span className="text-xs text-slate-500">/100</span>
            </div>
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="p-3 bg-red-50/60 border border-red-200 rounded-lg flex items-center gap-3 shadow-2xs">
          <div className="p-2 rounded bg-red-100 text-red-700">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-red-600 font-mono font-medium">CRITICAL</div>
            <div className="text-lg font-bold text-red-700 font-mono">
              {threatSummary.critical_alerts_count}
            </div>
          </div>
        </div>

        {/* High Alerts */}
        <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg flex items-center gap-3 shadow-2xs">
          <div className="p-2 rounded bg-amber-100 text-amber-700">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-amber-600 font-mono font-medium">HIGH ALERTS</div>
            <div className="text-lg font-bold text-amber-700 font-mono">
              {threatSummary.high_alerts_count}
            </div>
          </div>
        </div>

        {/* Active Tracked Targets */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3 shadow-2xs">
          <div className="p-2 rounded bg-slate-200/80 text-slate-700">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 font-mono">ACTIVE TRACKS</div>
            <div className="text-lg font-bold text-slate-900 font-mono">
              {threatSummary.active_tracks}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
