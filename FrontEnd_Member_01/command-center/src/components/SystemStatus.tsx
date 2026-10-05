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
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
          isAllGood
            ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100 shadow-2xs'
            : 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100 shadow-2xs'
        }`}
        title="View System Health Telemetry"
      >
        <span
          className={`w-2 h-2 rounded-full ${
            isAllGood ? 'bg-emerald-600' : 'bg-amber-600 animate-ping'
          }`}
        />
        <Activity className="w-3.5 h-3.5" />
        <span>{isAllGood ? 'SYSTEM OPTIMAL' : 'ATTENTION REQUIRED'}</span>
      </button>

      {/* Online Cameras Ticker */}
      <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono text-slate-700">
        <Camera className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-900 font-bold">{onlineCameras}/{totalCameras}</span>
        <span className="text-slate-500 text-[11px]">STREAMS</span>
      </div>

      {/* Active Tracks Ticker */}
      <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono text-slate-700">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
        <span className="text-slate-900 font-bold">{threatSummary.active_tracks}</span>
        <span className="text-slate-500 text-[11px]">TARGETS TRACKED</span>
      </div>
    </div>
  );
};
