import React from 'react';
import { useCommandCenter } from '../context/CommandCenterContext';
import type { IncidentCardData } from '../types/incident';

interface IncidentTableProps {
  onSelectIncident?: (incident: IncidentCardData) => void;
}

export const IncidentTable: React.FC<IncidentTableProps> = ({ onSelectIncident }) => {
  const { incidents, selectedIncident, setSelectedIncident } = useCommandCenter();

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return '12:00 AM';
    }
  };

  const getThreatScoreColor = (score: number) => {
    if (score >= 75) return 'text-red-600 font-bold';
    if (score >= 50) return 'text-emerald-600 font-bold';
    return 'text-slate-600 font-semibold';
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'text-red-600 font-bold';
      case 'review':
        return 'text-amber-500 font-bold';
      case 'investigating':
        return 'text-emerald-600 font-bold';
      case 'acknowledged':
        return 'text-blue-600 font-bold';
      default:
        return 'text-slate-600 font-semibold';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'Open';
      case 'review':
        return 'Review';
      case 'investigating':
        return 'Investigating';
      case 'acknowledged':
        return 'Acknowledged';
      case 'resolved':
        return 'Resolved';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-300 shadow-xs p-4 w-full text-slate-800">
      {/* Table Title matching reference screenshot */}
      <div className="flex items-center justify-between pb-3 mb-1 border-b border-slate-100">
        <h3 className="text-sm md:text-base font-bold text-slate-900 tracking-tight flex items-center gap-1.5 font-sans">
          Active Incidents <span className="text-slate-500 font-medium">(Live)</span>
        </h3>
        <span className="text-[11px] font-mono text-slate-400 font-semibold">
          {incidents.length} Detected
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[620px]">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
              <th className="py-2.5 px-3">ID</th>
              <th className="py-2.5 px-3">Type</th>
              <th className="py-2.5 px-3">Camera</th>
              <th className="py-2.5 px-3">Time</th>
              <th className="py-2.5 px-3">Threat Score</th>
              <th className="py-2.5 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-xs font-sans">
            {incidents.slice(0, 5).map((inc) => {
              const isSelected = selectedIncident?.incident_id === inc.incident_id;
              return (
                <tr
                  key={inc.incident_id}
                  onClick={() => {
                    setSelectedIncident(inc);
                    onSelectIncident?.(inc);
                  }}
                  className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                    isSelected ? 'bg-slate-100/70 font-semibold' : ''
                  }`}
                >
                  {/* ID */}
                  <td className="py-3 px-3 font-mono font-semibold text-slate-700">
                    {inc.event_id || inc.incident_id}
                  </td>

                  {/* Type */}
                  <td className="py-3 px-3 font-medium text-slate-900">
                    {inc.title}
                  </td>

                  {/* Camera */}
                  <td className="py-3 px-3 font-mono text-slate-600">
                    {inc.camera_id}
                  </td>

                  {/* Time */}
                  <td className="py-3 px-3 font-mono text-slate-600">
                    {formatTime(inc.timestamp_start)}
                  </td>

                  {/* Threat Score */}
                  <td className={`py-3 px-3 font-mono text-sm ${getThreatScoreColor(inc.threat_score)}`}>
                    {inc.threat_score}
                  </td>

                  {/* Status */}
                  <td className={`py-3 px-3 text-xs capitalize ${getStatusColor(inc.status)}`}>
                    {getStatusLabel(inc.status)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
