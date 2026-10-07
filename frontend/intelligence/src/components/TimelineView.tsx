import React from 'react';
import { Clock, Eye, Sparkles, RefreshCcw, Globe, UserCheck } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';
import { TimelineEvent } from '../types/timeline';

export const TimelineView: React.FC = () => {
  const { selectedIncident, timelineByIncident } = useIntelligence();

  if (!selectedIncident) return null;

  const events: TimelineEvent[] = timelineByIncident[selectedIncident.incident_id] || [];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'detection':
        return <Eye className="h-3.5 w-3.5 text-cyan-700" />;
      case 'ai_analysis':
        return <Sparkles className="h-3.5 w-3.5 text-purple-700" />;
      case 'status_change':
        return <RefreshCcw className="h-3.5 w-3.5 text-amber-700" />;
      case 'osint_correlation':
        return <Globe className="h-3.5 w-3.5 text-emerald-700" />;
      case 'operator_action':
        return <UserCheck className="h-3.5 w-3.5 text-rose-700" />;
      default:
        return <Clock className="h-3.5 w-3.5 text-slate-500" />;
    }
  };

  return (
    <div className="bg-white border border-slate-300 rounded-xl p-4 flex flex-col gap-3 shadow-2xs text-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-cyan-700" />
          <span className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
            EVENT TIMELINE & CHRONOLOGICAL AUDIT TRAIL ({events.length})
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-500 font-semibold">SORT: CHRONOLOGICAL</span>
      </div>

      <div className="relative pl-4 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-300">
        {events.length === 0 ? (
          <div className="text-slate-500 font-mono text-xs py-4">
            No timeline events recorded.
          </div>
        ) : (
          events.map((evt) => (
            <div key={evt.event_id} className="relative flex items-start gap-3 group">
              {/* Point Node on Vertical Line */}
              <div className="absolute -left-[18px] top-1 p-1 rounded-full bg-white border border-slate-300 shadow-xs">
                {getEventIcon(evt.event_type)}
              </div>

              {/* Event Box */}
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-3 hover:border-slate-300 transition">
                <div className="flex items-center justify-between gap-2 mb-1 font-mono text-[10px]">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 font-bold uppercase">
                      {evt.event_type.replace('_', ' ')}
                    </span>
                    <span className="text-slate-600">ACTOR: <strong className="text-slate-900">{evt.actor}</strong></span>
                  </div>
                  <span className="text-slate-500 font-semibold">
                    {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-slate-800 font-sans leading-relaxed">
                  {evt.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
