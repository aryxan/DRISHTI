import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';
import { IncidentSeverity, IncidentStatus } from '../types/incident';

export const IncidentFilters: React.FC = () => {
  const { filters, setFilter, resetFilters, filteredIncidents, incidents } = useIntelligence();

  const severities: IncidentSeverity[] = ['critical', 'high', 'medium', 'low'];
  const statuses: IncidentStatus[] = ['open', 'acknowledged', 'investigating', 'resolved', 'review'];

  const toggleSeverity = (sev: IncidentSeverity) => {
    const current = filters.severities;
    const next = current.includes(sev)
      ? current.filter((s) => s !== sev)
      : [...current, sev];
    setFilter({ severities: next });
  };

  const toggleStatus = (st: IncidentStatus) => {
    const current = filters.statuses;
    const next = current.includes(st)
      ? current.filter((s) => s !== st)
      : [...current, st];
    setFilter({ statuses: next });
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-300">
          <Filter className="h-4 w-4 text-cyan-400" />
          <span>INCIDENT FILTERS</span>
          <span className="text-[10px] text-slate-500 font-normal">
            ({filteredIncidents.length} of {incidents.length} match)
          </span>
        </div>
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-cyan-400 transition"
        >
          <RotateCcw className="h-3 w-3" /> RESET
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Search Query */}
        <div className="md:col-span-4 relative">
          <Search className="h-3.5 w-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search by ID, title, camera, or tag..."
            value={filters.searchQuery}
            onChange={(e) => setFilter({ searchQuery: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        {/* Severities Chips */}
        <div className="md:col-span-4 flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono text-slate-500 uppercase mr-1">Severity:</span>
          {severities.map((sev) => {
            const isSelected = filters.severities.includes(sev);
            return (
              <button
                key={sev}
                onClick={() => toggleSeverity(sev)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold transition border ${
                  isSelected
                    ? sev === 'critical'
                      ? 'bg-rose-950 border-rose-500 text-rose-300'
                      : sev === 'high'
                      ? 'bg-amber-950 border-amber-500 text-amber-300'
                      : sev === 'medium'
                      ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                      : 'bg-slate-800 border-slate-600 text-slate-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                {sev}
              </button>
            );
          })}
        </div>

        {/* Status Chips */}
        <div className="md:col-span-4 flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono text-slate-500 uppercase mr-1">Status:</span>
          {statuses.map((st) => {
            const isSelected = filters.statuses.includes(st);
            return (
              <button
                key={st}
                onClick={() => toggleStatus(st)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono capitalize transition border ${
                  isSelected
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
