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
    <div className="bg-white border border-slate-300 rounded-xl p-3.5 flex flex-col gap-3 shadow-2xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800">
          <Filter className="h-4 w-4 text-slate-600" />
          <span>INCIDENT FILTERS</span>
          <span className="text-[10px] text-slate-500 font-normal">
            ({filteredIncidents.length} of {incidents.length} match)
          </span>
        </div>
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-slate-800 transition"
        >
          <RotateCcw className="h-3 w-3" /> RESET
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Search Query */}
        <div className="md:col-span-4 relative">
          <Search className="h-3.5 w-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID, title, camera, or tag..."
            value={filters.searchQuery}
            onChange={(e) => setFilter({ searchQuery: e.target.value })}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-500 focus:bg-white"
          />
        </div>

        {/* Severities Chips */}
        <div className="md:col-span-4 flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono text-slate-500 font-bold uppercase mr-1">Severity:</span>
          {severities.map((sev) => {
            const isSelected = filters.severities.includes(sev);
            return (
              <button
                key={sev}
                onClick={() => toggleSeverity(sev)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold transition border cursor-pointer ${
                  isSelected
                    ? sev === 'critical'
                      ? 'bg-rose-100 border-rose-400 text-rose-800'
                      : sev === 'high'
                      ? 'bg-amber-100 border-amber-400 text-amber-800'
                      : sev === 'medium'
                      ? 'bg-blue-100 border-blue-400 text-blue-800'
                      : 'bg-slate-200 border-slate-400 text-slate-800'
                    : 'bg-slate-100 border-slate-300 text-slate-500 hover:text-slate-800'
                }`}
              >
                {sev}
              </button>
            );
          })}
        </div>

        {/* Status Chips */}
        <div className="md:col-span-4 flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono text-slate-500 font-bold uppercase mr-1">Status:</span>
          {statuses.map((st) => {
            const isSelected = filters.statuses.includes(st);
            return (
              <button
                key={st}
                onClick={() => toggleStatus(st)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono capitalize font-bold transition border cursor-pointer ${
                  isSelected
                    ? 'bg-slate-200 border-slate-500 text-slate-800'
                    : 'bg-slate-100 border-slate-300 text-slate-500 hover:text-slate-800'
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
