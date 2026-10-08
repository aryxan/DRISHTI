import React, { useState } from 'react';
import { AlertTriangle, Clock, MapPin, Video, ChevronDown, Search, Check, X } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';
import { Incident, IncidentSeverity } from '../types/incident';

export const IncidentList: React.FC = () => {
  const {
    incidents,
    selectedIncidentId,
    selectedIncident,
    selectIncident
  } = useIntelligence();

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState<IncidentSeverity | 'all'>('all');

  const criticalCount = incidents.filter((i) => i.severity === 'critical').length;
  const highCount = incidents.filter((i) => i.severity === 'high').length;

  // Filter incidents for this dropdown
  const displayedIncidents = incidents.filter((inc) => {
    const matchesSearch =
      search === '' ||
      inc.incident_id.toLowerCase().includes(search.toLowerCase()) ||
      inc.title.toLowerCase().includes(search.toLowerCase()) ||
      inc.camera_id.toLowerCase().includes(search.toLowerCase()) ||
      inc.location_name.toLowerCase().includes(search.toLowerCase());

    const matchesSeverity = severityFilter === 'all' || inc.severity === severityFilter;

    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="w-full flex flex-col gap-2">
      {/* 1. Single Trigger Button just below the dashboard */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 bg-white border rounded-xl shadow-2xs transition-all cursor-pointer group text-left ${
          isOpen
            ? 'border-slate-500 bg-slate-50 ring-2 ring-slate-400/20'
            : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50/70'
        }`}
        aria-expanded={isOpen}
      >
        {/* Left Info: Icon, Queue Name, Counts, Current Selection */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold tracking-wider text-slate-900 uppercase">
                ACTIVE INCIDENTS QUEUE
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 font-bold">
                {incidents.length} LOADED
              </span>
              {criticalCount > 0 && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                  {criticalCount} CRITICAL
                </span>
              )}
              {highCount > 0 && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 font-bold">
                  {highCount} HIGH
                </span>
              )}
            </div>

            {selectedIncident ? (
              <div className="text-xs text-slate-500 font-mono mt-0.5 truncate flex items-center gap-1.5">
                <span className="text-slate-400 font-normal">Active:</span>
                <strong className="text-slate-800 font-bold">{selectedIncident.incident_id}</strong>
                <span className="text-slate-300">•</span>
                <span className="text-slate-700 truncate">{selectedIncident.title}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-semibold">Threat: {selectedIncident.threat_score}/100</span>
              </div>
            ) : (
              <span className="text-xs text-slate-400 font-mono mt-0.5">
                Click to expand and select an active incident
              </span>
            )}
          </div>
        </div>

        {/* Right Toggle Action Button */}
        <div className="flex items-center gap-2 pl-3 shrink-0">
          <span className="text-[11px] font-mono font-bold text-slate-700 hidden sm:inline-block">
            {isOpen ? 'COLLAPSE QUEUE' : 'VIEW ALL INCIDENTS'}
          </span>
          <div
            className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all ${
              isOpen
                ? 'bg-slate-800 text-white border-slate-900'
                : 'bg-slate-100 text-slate-600 border-slate-300 group-hover:bg-slate-200 group-hover:text-slate-900'
            }`}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      </button>

      {/* 2. Expanded Dropdown Tab Containing All Incidents */}
      {isOpen && (
        <div className="bg-white border border-slate-300 rounded-xl shadow-lg p-4 animate-fadeIn flex flex-col gap-3">
          {/* Controls Bar inside Dropdown: Search & Severity Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 flex-1 max-w-md relative">
              <Search className="h-3.5 w-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search incidents by ID, title, camera, or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-600 focus:bg-white"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Severity Quick Filters */}
            <div className="flex items-center gap-1.5 flex-wrap justify-between sm:justify-end">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase mr-1">
                SEVERITY:
              </span>
              {(['all', 'critical', 'high', 'medium', 'low'] as const).map((sev) => {
                const isSelected = severityFilter === sev;
                return (
                  <button
                    key={sev}
                    onClick={() => setSeverityFilter(sev)}
                    className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold transition border cursor-pointer ${
                      isSelected
                        ? sev === 'critical'
                          ? 'bg-rose-800 text-white border-rose-900'
                          : sev === 'high'
                          ? 'bg-amber-800 text-white border-amber-900'
                          : 'bg-slate-800 text-white border-slate-900'
                        : 'bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {sev}
                  </button>
                );
              })}

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="ml-2 p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                title="Close dropdown queue"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Grid of All Incident Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 max-h-[460px] overflow-y-auto p-1">
            {displayedIncidents.length === 0 ? (
              <div className="col-span-full text-center py-12 text-slate-400 font-mono text-xs">
                No active incidents matching your filter criteria.
              </div>
            ) : (
              displayedIncidents.map((inc: Incident) => {
                const isSelected = inc.incident_id === selectedIncidentId;
                const isCritical = inc.severity === 'critical';
                const isHigh = inc.severity === 'high';

                return (
                  <div
                    key={inc.incident_id}
                    onClick={() => {
                      selectIncident(inc.incident_id);
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-50 border-slate-600 ring-2 ring-slate-400/30 shadow-md'
                        : 'bg-white border-slate-200 hover:border-slate-400 hover:bg-slate-50/70 shadow-2xs'
                    }`}
                  >
                    {/* Header Row: ID, Badges & Threat Score */}
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-mono text-xs text-slate-900 font-bold bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded">
                            {inc.incident_id}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                              isCritical
                                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                : isHigh
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-blue-50 text-blue-800 border border-blue-200'
                            }`}
                          >
                            {inc.severity}
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono capitalize bg-slate-100 text-slate-700 border border-slate-300">
                            {inc.status}
                          </span>
                        </div>

                        {/* Threat Score Gauge */}
                        <div
                          className={`flex flex-col items-center justify-center h-10 w-10 rounded-lg border font-mono shrink-0 ${
                            inc.threat_score >= 80
                              ? 'bg-rose-50 border-rose-300 text-rose-700'
                              : inc.threat_score >= 60
                              ? 'bg-amber-50 border-amber-300 text-amber-700'
                              : 'bg-slate-50 border-slate-300 text-slate-600'
                          }`}
                        >
                          <span className="text-[7px] text-slate-500 font-bold leading-none">THREAT</span>
                          <span className="text-xs font-bold leading-none mt-0.5">{inc.threat_score}</span>
                        </div>
                      </div>

                      {/* Incident Title */}
                      <h4 className="text-xs font-semibold text-slate-900 mb-2 leading-snug line-clamp-2">
                        {inc.title}
                      </h4>
                    </div>

                    {/* Footer Row: Metadata & Selection Indicator */}
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <div className="flex items-center gap-2 truncate">
                        <span className="flex items-center gap-1 text-slate-700 font-medium">
                          <Video className="h-3 w-3 text-slate-500" />
                          {inc.camera_id}
                        </span>
                        <span className="flex items-center gap-1 truncate text-slate-500">
                          <MapPin className="h-3 w-3 text-slate-400" />
                          {inc.location_name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 ml-2">
                        <span className="flex items-center gap-0.5 text-slate-500 whitespace-nowrap">
                          <Clock className="h-3 w-3" />
                          {new Date(inc.timestamp_start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {isSelected && (
                          <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-800 text-white text-[9px] font-bold">
                            <Check className="h-2.5 w-2.5" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

