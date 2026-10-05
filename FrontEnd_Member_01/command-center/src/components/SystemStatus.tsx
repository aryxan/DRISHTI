import React from 'react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { Activity, Camera, ShieldAlert } from 'lucide-react';

interface SystemStatusProps {
  onOpenHealthModal: () => void;
}

export const SystemStatus: React.FC<SystemStatusProps> = ({ onOpenHealthModal }) => {
  const { cameras, threatSummary } = useCommandCenter();

  const onlineCameras = cameras.filter((c) => c.stream_status === 'online').length;
  const totalCameras = cameras.length;
  const isAllGood = onlineCameras === totalCameras && threatSummary.critical_alerts_count === 0;

  return (
    <div className="flex items-center gap-3">
      {/* Overall Health Status Indicator */}
      <button
        onClick={onOpenHealthModal}
        className={`flex items-center gap-2 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
          isAllGood
            ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/50'
            : 'bg-amber-950/40 border-amber-800/60 text-amber-300 hover:bg-amber-900/50'
        }`}
        title="View System Health Telemetry"
      >
        <span
          className={`w-2 h-2 rounded-full ${
            isAllGood ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'
          }`}
        />
        <Activity className="w-3.5 h-3.5" />
        <span>{isAllGood ? 'SYSTEM OPTIMAL' : 'ATTENTION REQUIRED'}</span>
      </button>

      {/* Online Cameras Ticker */}
      <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-300">
        <Camera className="w-3.5 h-3.5 text-cyan-400" />
        <span className="text-slate-100 font-semibold">{onlineCameras}/{totalCameras}</span>
        <span className="text-slate-500 text-[11px]">STREAMS</span>
      </div>

      {/* Active Tracks Ticker */}
      <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-300">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-slate-100 font-semibold">{threatSummary.active_tracks}</span>
        <span className="text-slate-500 text-[11px]">TARGETS TRACKED</span>
      </div>
    </div>
  );
};
