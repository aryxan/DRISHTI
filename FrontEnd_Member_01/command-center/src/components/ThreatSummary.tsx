import React from 'react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { AlertOctagon, Flame, ShieldAlert, Users, Zap } from 'lucide-react';

export const ThreatSummary: React.FC = () => {
  const { threatSummary } = useCommandCenter();

  const getDefconColor = () => {
    if (threatSummary.threat_level.includes('DEFCON-1')) {
      return {
        bg: 'bg-rose-950/90 border-rose-700 text-rose-300',
        badge: 'bg-rose-600 text-white',
        ring: 'ring-rose-500/50',
      };
    }
    if (threatSummary.threat_level.includes('DEFCON-2')) {
      return {
        bg: 'bg-orange-950/90 border-orange-700 text-orange-300',
        badge: 'bg-orange-600 text-white',
        ring: 'ring-orange-500/50',
      };
    }
    if (threatSummary.threat_level.includes('DEFCON-3')) {
      return {
        bg: 'bg-amber-950/90 border-amber-700 text-amber-300',
        badge: 'bg-amber-600 text-white',
        ring: 'ring-amber-500/50',
      };
    }
    return {
      bg: 'bg-emerald-950/90 border-emerald-700 text-emerald-300',
      badge: 'bg-emerald-600 text-white',
      ring: 'ring-emerald-500/50',
    };
  };

  const colors = getDefconColor();

  return (
    <div className="bg-[#0c1220] border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col md:flex-row items-stretch justify-between gap-4">
      {/* Threat Posture Level Indicator */}
      <div
        className={`flex items-center gap-3.5 px-4 py-3 rounded-lg border ${colors.bg} ${colors.ring} ring-1`}
      >
        <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 shrink-0">
          <AlertOctagon className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <div className="text-[10px] font-mono tracking-widest uppercase opacity-80">
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
        <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg flex items-center gap-3">
          <div className="p-2 rounded bg-slate-800 text-cyan-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-mono">AVG THREAT</div>
            <div className="text-lg font-bold text-slate-100 font-mono">
              {threatSummary.average_threat_score}
              <span className="text-xs text-slate-500">/100</span>
            </div>
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg flex items-center gap-3">
          <div className="p-2 rounded bg-rose-950/80 text-rose-400 border border-rose-900/50">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-mono">CRITICAL</div>
            <div className="text-lg font-bold text-rose-400 font-mono">
              {threatSummary.critical_alerts_count}
            </div>
          </div>
        </div>

        {/* High Alerts */}
        <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg flex items-center gap-3">
          <div className="p-2 rounded bg-amber-950/80 text-amber-400 border border-amber-900/50">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-mono">HIGH ALERTS</div>
            <div className="text-lg font-bold text-amber-400 font-mono">
              {threatSummary.high_alerts_count}
            </div>
          </div>
        </div>

        {/* Active Tracked Targets */}
        <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg flex items-center gap-3">
          <div className="p-2 rounded bg-slate-800 text-cyan-400">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-mono">ACTIVE TRACKS</div>
            <div className="text-lg font-bold text-cyan-300 font-mono">
              {threatSummary.active_tracks}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
