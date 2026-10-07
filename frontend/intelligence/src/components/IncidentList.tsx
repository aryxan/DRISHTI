import React from 'react';
import { AlertTriangle, Clock, MapPin, Video } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';
import { Incident } from '../types/incident';

export const IncidentList: React.FC = () => {
  const { filteredIncidents, selectedIncidentId, selectIncident } = useIntelligence();

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col h-full overflow-hidden">
      <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-cyan-400" />
          <h2 className="text-xs font-mono font-bold uppercase text-slate-200 tracking-wider">
            ACTIVE INCIDENTS QUEUE
          </h2>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
          {filteredIncidents.length} LOADED
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
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
                className={`p-3 rounded-lg border transition cursor-pointer relative ${
                  isSelected
                    ? 'tactical-card-active'
                    : 'tactical-card hover:border-slate-700'
                }`}
              >
                {/* Header line: Title & Threat Score */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[11px] text-cyan-400 font-bold">
                        {inc.incident_id}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                          isCritical
                            ? 'bg-rose-950 text-rose-300 border border-rose-600/50'
                            : isHigh
                            ? 'bg-amber-950 text-amber-300 border border-amber-600/50'
                            : 'bg-cyan-950 text-cyan-300 border border-cyan-600/50'
                        }`}
                      >
                        {inc.severity}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono capitalize bg-slate-800 text-slate-300">
                        {inc.status}
                      </span>
                    </div>
                    <h3 className="text-xs font-semibold text-slate-100 truncate">
                      {inc.title}
                    </h3>
                  </div>

                  {/* Threat Score Circle Gauge */}
                  <div
                    className={`flex flex-col items-center justify-center h-10 w-10 rounded-lg border font-mono ${
                      inc.threat_score >= 80
                        ? 'bg-rose-950/60 border-rose-500/60 text-rose-400'
                        : inc.threat_score >= 60
                        ? 'bg-amber-950/60 border-amber-500/60 text-amber-400'
                        : 'bg-cyan-950/60 border-cyan-500/60 text-cyan-400'
                    }`}
                  >
                    <span className="text-[9px] text-slate-400 leading-none">SCORE</span>
                    <span className="text-xs font-bold leading-none mt-0.5">{inc.threat_score}</span>
                  </div>
                </div>

                {/* Sub-line: Camera, Location, Time */}
                <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <div className="flex items-center gap-2 truncate">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Video className="h-3 w-3 text-cyan-400" />
                      {inc.camera_id}
                    </span>
                    <span className="flex items-center gap-1 truncate text-slate-400">
                      <MapPin className="h-3 w-3 text-slate-500" />
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
