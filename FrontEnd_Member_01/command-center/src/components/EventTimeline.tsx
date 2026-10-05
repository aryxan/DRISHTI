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
        return 'text-red-800 border-red-200 bg-red-50';
      case 'high':
        return 'text-orange-800 border-orange-200 bg-orange-50';
      case 'medium':
        return 'text-amber-800 border-amber-200 bg-amber-50';
      default:
        return 'text-slate-700 border-slate-200 bg-slate-100';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      {/* Header */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-700" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider font-mono">
            Event Stream Timeline
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-300 font-semibold shadow-2xs">
          <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
          <span>REAL-TIME</span>
        </div>
      </div>

      {/* Events List */}
      <div className="p-3 flex-1 overflow-y-auto space-y-2.5 bg-slate-50/50">
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
              className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer flex flex-col gap-1.5 shadow-2xs"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  {getEventIcon(evt.event_type)}
                  <span className="font-bold text-slate-900 capitalize">
                    {evt.event_type.replace('_', ' ')}
                  </span>
                </div>
                <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase border font-semibold ${getSeverityPill(evt.severity)}`}>
                  {evt.severity}
                </span>
              </div>

              <p className="text-[11px] text-slate-600 leading-snug">
                {evt.description}
              </p>

              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1.5 border-t border-slate-100">
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
