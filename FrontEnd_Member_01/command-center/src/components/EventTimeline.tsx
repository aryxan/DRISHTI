import React from 'react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { Clock, Radio, ShieldAlert, UserX, Users, Zap } from 'lucide-react';
import type { IncidentSeverity } from '../types/incident';

export const EventTimeline: React.FC = () => {
  const { events, cameras, setSelectedCamera } = useCommandCenter();

  const getEventIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'intrusion':
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />;
      case 'loitering':
        return <UserX className="w-3.5 h-3.5 text-amber-400" />;
      case 'crowd_density':
        return <Users className="w-3.5 h-3.5 text-yellow-400" />;
      default:
        return <Zap className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  const getSeverityPill = (sev: IncidentSeverity) => {
    switch (sev) {
      case 'critical':
        return 'text-rose-400 border-rose-800 bg-rose-950/70';
      case 'high':
        return 'text-amber-400 border-amber-800 bg-amber-950/70';
      case 'medium':
        return 'text-yellow-400 border-yellow-800 bg-yellow-950/70';
      default:
        return 'text-slate-400 border-slate-700 bg-slate-800/70';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0f1d] border border-slate-800 rounded-xl overflow-hidden shadow-lg">
      {/* Header */}
      <div className="px-4 py-3 bg-[#0d1424] border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider font-mono">
            Event Stream Timeline
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/70">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>REAL-TIME</span>
        </div>
      </div>

      {/* Events List */}
      <div className="p-3 flex-1 overflow-y-auto space-y-2.5">
        {events.map((evt, idx) => {
          const timeFormatted = new Date(evt.timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          });

          return (
            <div
              key={`${evt.event_id}-${idx}`}
              onClick={() => {
                const targetCam = cameras.find((c) => c.camera_id === evt.camera_id);
                if (targetCam) setSelectedCamera(targetCam);
              }}
              className="p-2.5 bg-slate-900/70 hover:bg-slate-800/80 border border-slate-800/80 rounded-lg transition-colors cursor-pointer flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  {getEventIcon(evt.event_type)}
                  <span className="font-semibold text-slate-200 capitalize">
                    {evt.event_type.replace('_', ' ')}
                  </span>
                </div>
                <span className={`px-1.5 py-0.2 rounded text-[10px] uppercase border font-semibold ${getSeverityPill(evt.severity)}`}>
                  {evt.severity}
                </span>
              </div>

              <p className="text-[11px] text-slate-300 leading-tight">
                {evt.description}
              </p>

              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-800/50">
                <span className="truncate max-w-[150px]">{evt.camera_name}</span>
                <span>{timeFormatted}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
