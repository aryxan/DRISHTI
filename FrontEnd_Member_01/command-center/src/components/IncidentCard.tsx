import React, { useState } from 'react';
import type { IncidentCardData, IncidentSeverity, IncidentStatus } from '../types/incident';
import { useCommandCenter } from '../context/CommandCenterContext';
import { useAuth } from '../context/AuthContext';
import {
  CheckCircle,
  Clock,
  ExternalLink,
  MapPin,
  ShieldAlert,
  Tag,
} from 'lucide-react';

interface IncidentCardProps {
  incident: IncidentCardData;
  isSelected?: boolean;
  onSelect?: (incident: IncidentCardData) => void;
  onViewEvidence?: (uri: string, title: string) => void;
}

export const IncidentCard: React.FC<IncidentCardProps> = ({
  incident,
  isSelected = false,
  onSelect,
  onViewEvidence,
}) => {
  const { acknowledgeIncident, updateIncidentStatus } = useCommandCenter();
  const { user } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  // Can acknowledge if role is ADMIN or OPERATOR
  const canAcknowledge =
    user?.role === 'ADMIN' || user?.role === 'OPERATOR';

  const getSeverityBadge = (severity: IncidentSeverity) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-rose-950 text-rose-300 border border-rose-800">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
            CRITICAL
          </span>
        );
      case 'high':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-950 text-amber-300 border border-amber-800">
            HIGH
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-yellow-950/70 text-yellow-300 border border-yellow-800">
            MEDIUM
          </span>
        );
      case 'low':
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
            LOW
          </span>
        );
    }
  };

  const getStatusBadge = (status: IncidentStatus) => {
    switch (status) {
      case 'open':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30">
            OPEN
          </span>
        );
      case 'acknowledged':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
            ACKNOWLEDGED
          </span>
        );
      case 'investigating':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            INVESTIGATING
          </span>
        );
      case 'resolved':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            RESOLVED
          </span>
        );
    }
  };

  const handleAcknowledge = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canAcknowledge || isUpdating) return;
    setIsUpdating(true);
    await acknowledgeIncident(incident.incident_id);
    setIsUpdating(false);
  };

  const formattedStartTime = new Date(incident.timestamp_start).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return (
    <div
      onClick={() => onSelect?.(incident)}
      className={`p-3.5 bg-[#0f172a] rounded-xl border transition-all duration-200 cursor-pointer flex flex-col gap-2.5 ${
        isSelected
          ? 'border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-950/40'
          : 'border-slate-800 hover:border-slate-700'
      }`}
    >
      {/* Header: ID, Severity, Status */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-cyan-400">
            {incident.incident_id}
          </span>
          <span className="text-[10px] font-mono text-slate-500">
            (evt: {incident.event_id})
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {getSeverityBadge(incident.severity)}
          {getStatusBadge(incident.status)}
        </div>
      </div>

      {/* Incident Title */}
      <div>
        <h4 className="text-sm font-semibold text-slate-100 leading-snug">
          {incident.title}
        </h4>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="truncate">{incident.location_name}</span>
          <span className="text-slate-600 font-mono text-[10px]">({incident.camera_id})</span>
        </div>
      </div>

      {/* Threat Score & AI Confidence Gauges */}
      <div className="p-2 bg-slate-950/60 rounded-lg border border-slate-800/80 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            Threat Score:
          </span>
          <span
            className={`font-bold ${
              incident.threat_score >= 80
                ? 'text-rose-400'
                : incident.threat_score >= 50
                ? 'text-amber-400'
                : 'text-emerald-400'
            }`}
          >
            {incident.threat_score}/100
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              incident.threat_score >= 80
                ? 'bg-rose-500'
                : incident.threat_score >= 50
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${incident.threat_score}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-0.5">
          <span>AI Confidence: {(incident.confidence * 100).toFixed(0)}%</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-500" />
            {formattedStartTime}
          </span>
        </div>
      </div>

      {/* Reason Codes Chips */}
      {incident.reason_codes && incident.reason_codes.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {incident.reason_codes.map((code, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono bg-slate-800/90 text-slate-300 border border-slate-700"
            >
              <Tag className="w-2.5 h-2.5 text-cyan-400" />
              {code}
            </span>
          ))}
        </div>
      )}

      {/* Actions Footer */}
      <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewEvidence?.(incident.evidence_uri, incident.title);
          }}
          className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1 transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Evidence Clip
        </button>

        {incident.status === 'open' && (
          <button
            onClick={handleAcknowledge}
            disabled={!canAcknowledge || isUpdating}
            className={`px-2.5 py-1 text-xs font-medium rounded flex items-center gap-1.5 transition-colors ${
              canAcknowledge
                ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40'
                : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
            }`}
            title={canAcknowledge ? 'Acknowledge this incident' : 'Operator or Admin role required'}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            {isUpdating ? 'Acking...' : 'Acknowledge'}
          </button>
        )}

        {incident.status === 'acknowledged' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              updateIncidentStatus(incident.incident_id, 'investigating');
            }}
            className="px-2 py-1 text-xs font-medium rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 transition-colors"
          >
            Investigate
          </button>
        )}
      </div>
    </div>
  );
};
