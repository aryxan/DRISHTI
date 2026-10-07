import React from 'react';
import { CheckCircle2, ShieldAlert, Search, AlertCircle, FileCheck } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';
import { IncidentStatus } from '../types/incident';

export const StatusControls: React.FC = () => {
  const { selectedIncident, updateIncidentStatus } = useIntelligence();

  if (!selectedIncident) return null;

  const currentStatus = selectedIncident.status;

  const statusList: { status: IncidentStatus; label: string; icon: React.ReactNode; color: string }[] = [
    { status: 'open', label: 'OPEN', icon: <ShieldAlert className="h-3.5 w-3.5" />, color: 'text-rose-800 border-rose-300 bg-rose-50 hover:bg-rose-100' },
    { status: 'acknowledged', label: 'ACKNOWLEDGED', icon: <AlertCircle className="h-3.5 w-3.5" />, color: 'text-amber-800 border-amber-300 bg-amber-50 hover:bg-amber-100' },
    { status: 'investigating', label: 'INVESTIGATING', icon: <Search className="h-3.5 w-3.5" />, color: 'text-cyan-800 border-cyan-300 bg-cyan-50 hover:bg-cyan-100' },
    { status: 'review', label: 'REVIEW', icon: <FileCheck className="h-3.5 w-3.5" />, color: 'text-purple-800 border-purple-300 bg-purple-50 hover:bg-purple-100' },
    { status: 'resolved', label: 'RESOLVED', icon: <CheckCircle2 className="h-3.5 w-3.5" />, color: 'text-emerald-800 border-emerald-300 bg-emerald-50 hover:bg-emerald-100' }
  ];

  return (
    <div className="bg-white border border-slate-300 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono font-bold text-slate-500 uppercase">
          TRIAGE STATUS CONTROL:
        </span>
        <span className="px-2 py-0.5 rounded text-xs font-mono font-bold uppercase bg-slate-100 text-slate-800 border border-slate-300">
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition border cursor-pointer ${
                isActive
                  ? `${item.color} ring-1 ring-cyan-600 shadow-xs font-bold`
                  : 'bg-slate-50 border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
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
