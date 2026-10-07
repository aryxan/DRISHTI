import React from 'react';
import { Radio, Activity, Sparkles, RefreshCw, Cpu, User, Filter, Search, RotateCcw } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';
import { CurrentTime } from './CurrentTime';
import { WebSocketMessageType } from '../types/websocket';
import { IncidentSeverity, IncidentStatus } from '../types/incident';

export const Header: React.FC = () => {
  const {
    wsConnectionState,
    isMockMode,
    toggleMockMode,
    incidents,
    simulateWSMessage,
    toastMessage,
    dismissToast,
    isFilterOpen,
    toggleFilterOpen,
    filters,
    setFilter,
    resetFilters,
    filteredIncidents
  } = useIntelligence();

  const criticalCount = incidents.filter((i) => i.severity === 'critical').length;
  const highCount = incidents.filter((i) => i.severity === 'high').length;

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

  const activeFilterCount =
    (filters.searchQuery ? 1 : 0) +
    filters.severities.length +
    filters.statuses.length +
    (filters.selectedReasonCode ? 1 : 0);

  return (
    <header className="bg-white border-b border-slate-300 sticky top-0 z-30 shadow-2xs">
      <div className="px-5 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Portal Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700 animate-pulse" />
          <div>
            <div className="text-xs font-mono font-bold text-slate-800">
              10. Frontend Portal 2 – AI Intelligence (frontend/intelligence)
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              AI-Driven Multi-Modal Threat Reasoning & Forensic Intelligence
            </div>
          </div>
        </div>

        {/* Telemetry, Filter Button, and User Bar */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Incidents Summary Badge */}
          <div className="hidden lg:flex items-center gap-3 bg-slate-100 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
              <Activity className="h-3.5 w-3.5 text-slate-600" />
              <span>INCIDENTS: <strong className="text-slate-900">{incidents.length}</strong></span>
            </div>
            <div className="h-3.5 w-px bg-slate-300" />
            <div className="flex items-center gap-1 text-rose-700 font-semibold">
              <span className="h-2 w-2 rounded-full bg-rose-600" />
              <span>CRITICAL: <strong>{criticalCount}</strong></span>
            </div>
            <div className="h-3.5 w-px bg-slate-300" />
            <div className="flex items-center gap-1 text-amber-700 font-semibold">
              <span>HIGH: <strong>{highCount}</strong></span>
            </div>
          </div>

          {/* INCIDENT FILTERS BUTTON (Placed before Simulated Box) */}
          <button
            onClick={toggleFilterOpen}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition cursor-pointer shadow-2xs ${
              isFilterOpen || activeFilterCount > 0
                ? 'bg-slate-800 text-white border-slate-900 shadow-xs'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
            }`}
            title="Toggle Incident Filters Dropdown"
          >
            <Filter className={`h-3.5 w-3.5 ${isFilterOpen || activeFilterCount > 0 ? 'text-white' : 'text-slate-600'}`} />
            <span>INCIDENT FILTERS</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-cyan-600 text-white text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* SIMULATED Box */}
          <div className="flex items-center gap-2 bg-slate-100 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono">
            <Radio className={`h-3.5 w-3.5 ${wsConnectionState === 'OPEN' || wsConnectionState === 'SIMULATED' ? 'text-emerald-700' : 'text-rose-700'}`} />
            <span className="text-slate-800 font-bold">{wsConnectionState}</span>
            <button
              onClick={() => toggleMockMode(!isMockMode)}
              className="ml-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition cursor-pointer shadow-2xs"
            >
              {isMockMode ? 'MOCK FEED' : 'LIVE FEED'}
            </button>
          </div>

          {/* TEST WS EVENT Button */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono font-bold transition cursor-pointer shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-slate-600" />
              <span>TEST WS EVENT</span>
            </button>
            <div className="absolute right-0 top-full mt-1 hidden group-hover:flex flex-col bg-white border border-slate-300 rounded-lg shadow-xl p-1.5 min-w-[200px] z-50">
              <span className="text-[10px] font-mono text-slate-400 px-2 py-1 uppercase border-b border-slate-100 font-bold">
                Simulate WebSocket Dispatch
              </span>
              <button
                onClick={() => simulateWSMessage('incident.created' as WebSocketMessageType)}
                className="text-left px-2 py-1.5 hover:bg-slate-100 text-xs text-emerald-800 rounded flex items-center gap-2 font-mono font-semibold"
              >
                <Cpu className="h-3 w-3 text-emerald-700" /> incident.created
              </button>
              <button
                onClick={() => simulateWSMessage('incident.updated' as WebSocketMessageType)}
                className="text-left px-2 py-1.5 hover:bg-slate-100 text-xs text-amber-800 rounded flex items-center gap-2 font-mono font-semibold"
              >
                <RefreshCw className="h-3 w-3 text-amber-700" /> incident.updated
              </button>
              <button
                onClick={() => simulateWSMessage('ai.analysis.completed' as WebSocketMessageType)}
                className="text-left px-2 py-1.5 hover:bg-slate-100 text-xs text-slate-800 rounded flex items-center gap-2 font-mono font-semibold"
              >
                <Sparkles className="h-3 w-3 text-slate-700" /> ai.analysis.completed
              </button>
            </div>
          </div>

          {/* Current Clock Component */}
          <CurrentTime />

          {/* Operator Profile Pill */}
          <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-100 rounded-lg border border-slate-300 shadow-2xs font-sans">
            <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold font-mono">
              <User className="h-3.5 w-3.5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                operator.b
              </span>
              <span className="text-[9px] text-slate-500 uppercase font-mono font-semibold leading-none">
                AI ANALYST
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DROPDOWN TAB: INCIDENT FILTERS PANEL (Screenshot 2) */}
      {isFilterOpen && (
        <div className="border-t border-slate-200 bg-slate-50/90 p-4 shadow-inner animate-fadeIn">
          <div className="max-w-7xl mx-auto bg-white border border-slate-300 rounded-xl p-4 flex flex-col gap-3 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-900">
                <Filter className="h-4 w-4 text-slate-700" />
                <span>INCIDENT FILTERS</span>
                <span className="text-[10px] text-slate-500 font-normal">
                  ({filteredIncidents.length} of {incidents.length} match)
                </span>
              </div>
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-[11px] font-mono text-slate-500 hover:text-slate-900 font-semibold transition cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" /> RESET
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-1">
              {/* Search Query Input Box */}
              <div className="md:col-span-4 relative">
                <Search className="h-3.5 w-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by ID, title, camera, or tag..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilter({ searchQuery: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-600 focus:bg-white"
                />
              </div>

              {/* Severity Filter Chips */}
              <div className="md:col-span-4 flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-mono text-slate-500 font-bold uppercase mr-1">SEVERITY:</span>
                {severities.map((sev) => {
                  const isSelected = filters.severities.includes(sev);
                  return (
                    <button
                      key={sev}
                      onClick={() => toggleSeverity(sev)}
                      className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold transition border cursor-pointer ${
                        isSelected
                          ? sev === 'critical'
                            ? 'bg-rose-800 text-white border-rose-900'
                            : sev === 'high'
                            ? 'bg-amber-800 text-white border-amber-900'
                            : 'bg-slate-800 text-white border-slate-900'
                          : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {sev}
                    </button>
                  );
                })}
              </div>

              {/* Status Filter Chips */}
              <div className="md:col-span-4 flex items-center gap-1.5 flex-wrap justify-end">
                <span className="text-[10px] font-mono text-slate-500 font-bold uppercase mr-1">STATUS:</span>
                {statuses.map((st) => {
                  const isSelected = filters.statuses.includes(st);
                  return (
                    <button
                      key={st}
                      onClick={() => toggleStatus(st)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono capitalize font-semibold transition border cursor-pointer ${
                        isSelected
                          ? 'bg-slate-800 text-white border-slate-900'
                          : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alert Toast Notification */}
      {toastMessage && (
        <div className="w-full p-2 bg-slate-50 border-t border-slate-200">
          <div className={`max-w-7xl mx-auto px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center justify-between ${
            toastMessage.type === 'warning' ? 'bg-rose-50 border-rose-300 text-rose-800' :
            toastMessage.type === 'success' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' :
            'bg-slate-100 border-slate-300 text-slate-800'
          }`}>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-current" />
              <span>{toastMessage.text}</span>
            </div>
            <button onClick={dismissToast} className="text-slate-400 hover:text-slate-700 font-bold ml-4">
              ✕
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
