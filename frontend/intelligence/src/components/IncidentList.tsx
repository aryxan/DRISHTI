import React from 'react';
import { AlertTriangle, Clock, MapPin, Video } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';
import { Incident } from '../types/incident';

export const IncidentList: React.FC = () => {
  const { filteredIncidents, selectedIncidentId, selectIncident } = useIntelligence();

  return (
    <div className="bg-white border border-slate-300 rounded-xl flex flex-col h-full overflow-hidden shadow-2xs">
      <div className="p-3.5 border-b border-slate-300 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-cyan-700" />
          <h2 className="text-xs font-mono font-bold uppercase text-slate-900 tracking-wider">
            ACTIVE INCIDENTS QUEUE
          </h2>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold">
          {filteredIncidents.length} LOADED
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5">
        {filteredIncidents.length === 0 ? (
          <div className="text-center py-10 px-4 text-slate-500 font-mono text-xs">
            No active incidents matching selected criteria.
          </div>
        ) : (
          filteredIncidents.map((inc: Incident) => {
            const isSelected = inc.incident_id === selectedIncidentId;
            const isCritical = inc.severity === 'critical';
            const isHigh = inc.severity === 'high';

            return (
              <div
                key={inc.incident_id}
                onClick={() => selectIncident(inc.incident_id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-slate-50 border-cyan-600 ring-1 ring-cyan-500/40 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                {/* Header line: Title & Threat Score */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="font-mono text-xs text-slate-900 font-bold">
                        {inc.incident_id}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                          isCritical
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : isHigh
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-cyan-100 text-cyan-800 border border-cyan-300'
                        }`}
                      >
                        {inc.severity}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono capitalize bg-slate-100 text-slate-700 border border-slate-300">
                        {inc.status}
                      </span>
                    </div>
                    <h3 className="text-xs font-semibold text-slate-900 truncate">
                      {inc.title}
                    </h3>
                  </div>

                  {/* Threat Score Circle Gauge */}
                  <div
                    className={`flex flex-col items-center justify-center h-10 w-10 rounded-lg border font-mono shrink-0 ${
                      inc.threat_score >= 80
                        ? 'bg-rose-50 border-rose-300 text-rose-700'
                        : inc.threat_score >= 60
                        ? 'bg-amber-50 border-amber-300 text-amber-700'
                        : 'bg-cyan-50 border-cyan-300 text-cyan-700'
                    }`}
                  >
                    <span className="text-[8px] text-slate-500 font-bold leading-none">SCORE</span>
                    <span className="text-xs font-bold leading-none mt-0.5">{inc.threat_score}</span>
                  </div>
                </div>

                {/* Sub-line: Camera, Location, Time */}
                <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <div className="flex items-center gap-2 truncate">
                    <span className="flex items-center gap-1 text-slate-700 font-medium">
                      <Video className="h-3 w-3 text-cyan-600" />
                      {inc.camera_id}
                    </span>
                    <span className="flex items-center gap-1 truncate text-slate-500">
                      <MapPin className="h-3 w-3 text-slate-400" />
                      {inc.location_name}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-slate-500 ml-2 whitespace-nowrap">
                    <Clock className="h-3 w-3" />
                    {new Date(inc.timestamp_start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
