import React, { useState } from 'react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { IncidentCard } from './IncidentCard';
import type { IncidentStatus } from '../types/incident';
import { AlertCircle, Search, ShieldAlert } from 'lucide-react';

interface IncidentPanelProps {
  onViewEvidence: (uri: string, title: string) => void;
}

export const IncidentPanel: React.FC<IncidentPanelProps> = ({ onViewEvidence }) => {
  const {
    incidents,
    selectedIncident,
    setSelectedIncident,
    filterSeverity,
    setFilterSeverity,
    filterStatus,
    setFilterStatus,
  } = useCommandCenter();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredIncidents = incidents.filter((inc) => {
    // Severity filter
    if (filterSeverity !== 'ALL' && inc.severity !== filterSeverity) {
      return false;
    }
    // Status filter
    if (filterStatus !== 'ALL' && inc.status !== filterStatus) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = inc.title.toLowerCase().includes(q);
      const matchLocation = inc.location_name.toLowerCase().includes(q);
      const matchCam = inc.camera_id.toLowerCase().includes(q);
      const matchId = inc.incident_id.toLowerCase().includes(q);
      const matchReason = inc.reason_codes.some((r) => r.toLowerCase().includes(q));
      return matchTitle || matchLocation || matchCam || matchId || matchReason;
    }
    return true;
  });

  const openCount = incidents.filter((i) => i.status === 'open').length;

  return (
    <div className="flex flex-col h-full bg-[#0a0f1d] border border-slate-800 rounded-xl overflow-hidden shadow-lg">
      {/* Header */}
      <div className="p-3.5 bg-[#0d1424] border-b border-slate-800 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider font-mono">
              Active Incident Queue
            </h3>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800">
              {openCount} OPEN
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">{incidents.length} TOTAL</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search incident, location, or reason code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Severity Filters */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto text-[11px] font-mono no-scrollbar">
          <div className="flex items-center gap-1">
            {(['ALL', 'critical', 'high', 'medium', 'low'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-2 py-0.5 rounded uppercase transition-colors shrink-0 ${
                  filterSeverity === sev
                    ? 'bg-slate-700 text-white font-bold'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            {(['ALL', 'open', 'acknowledged'] as (IncidentStatus | 'ALL')[]).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-1.5 py-0.5 rounded text-[10px] uppercase transition-colors shrink-0 ${
                  filterStatus === st
                    ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-800'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Incidents List */}
      <div className="p-3 flex-1 overflow-y-auto space-y-3">
        {filteredIncidents.length === 0 ? (
          <div className="h-48 flex flex-col items-center justify-center text-slate-500 text-xs">
            <AlertCircle className="w-6 h-6 mb-2 text-slate-600" />
            No incidents match current filters.
          </div>
        ) : (
          filteredIncidents.map((incident) => (
            <IncidentCard
              key={incident.incident_id}
              incident={incident}
              isSelected={selectedIncident?.incident_id === incident.incident_id}
              onSelect={(inc) => setSelectedIncident(inc)}
              onViewEvidence={onViewEvidence}
            />
          ))
        )}
      </div>
    </div>
  );
};
