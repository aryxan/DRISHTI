import React from 'react';
import { CheckCircle2, ShieldAlert, Search, AlertCircle, FileCheck } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';
import { IncidentStatus } from '../types/incident';

export const StatusControls: React.FC = () => {
  const { selectedIncident, updateIncidentStatus } = useIntelligence();

  if (!selectedIncident) return null;

  const currentStatus = selectedIncident.status;

  const statusList: { status: IncidentStatus; label: string; icon: React.ReactNode; color: string }[] = [
    { status: 'open', label: 'OPEN', icon: <ShieldAlert className="h-3.5 w-3.5" />, color: 'text-rose-400 border-rose-500/50 bg-rose-950/40 hover:bg-rose-900/60' },
    { status: 'acknowledged', label: 'ACKNOWLEDGED', icon: <AlertCircle className="h-3.5 w-3.5" />, color: 'text-amber-400 border-amber-500/50 bg-amber-950/40 hover:bg-amber-900/60' },
    { status: 'investigating', label: 'INVESTIGATING', icon: <Search className="h-3.5 w-3.5" />, color: 'text-cyan-400 border-cyan-500/50 bg-cyan-950/40 hover:bg-cyan-900/60' },
    { status: 'review', label: 'REVIEW', icon: <FileCheck className="h-3.5 w-3.5" />, color: 'text-purple-400 border-purple-500/50 bg-purple-950/40 hover:bg-purple-900/60' },
    { status: 'resolved', label: 'RESOLVED', icon: <CheckCircle2 className="h-3.5 w-3.5" />, color: 'text-emerald-400 border-emerald-500/50 bg-emerald-950/40 hover:bg-emerald-900/60' }
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase">
          TRIAGE STATUS CONTROL:
        </span>
        <span className="px-2 py-0.5 rounded text-xs font-mono font-bold uppercase bg-slate-800 text-cyan-400 border border-slate-700">
          CURRENT: {currentStatus}
        </span>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        {statusList.map((item) => {
          const isActive = currentStatus === item.status;
          return (
            <button
              key={item.status}
              onClick={() => updateIncidentStatus(selectedIncident.incident_id, item.status)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition border ${
                isActive
                  ? `${item.color} ring-1 ring-cyan-400 shadow-md`
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
