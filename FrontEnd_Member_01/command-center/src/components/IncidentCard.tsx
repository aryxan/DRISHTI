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
          <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-red-50 text-red-800 border border-red-300 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
            CRITICAL
          </span>
        );
      case 'high':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-orange-50 text-orange-800 border border-orange-300 shadow-2xs">
            HIGH
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-50 text-amber-800 border border-amber-300 shadow-2xs">
            MEDIUM
          </span>
        );
      case 'low':
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-700 border border-slate-300 shadow-2xs">
            LOW
          </span>
        );
    }
  };

  const getStatusBadge = (status: IncidentStatus) => {
    switch (status) {
      case 'open':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-red-50 text-red-700 border border-red-200">
            OPEN
          </span>
        );
      case 'acknowledged':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            ACKNOWLEDGED
          </span>
        );
      case 'investigating':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            INVESTIGATING
          </span>
        );
      case 'resolved':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
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
      className={`p-3.5 bg-white rounded-xl border transition-all duration-200 cursor-pointer flex flex-col gap-2.5 shadow-xs ${
        isSelected
          ? 'border-slate-900 ring-2 ring-slate-900/20 shadow-md'
          : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      {/* Header: ID, Severity, Status */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-slate-800">
            {incident.incident_id}
          </span>
          <span className="text-[10px] font-mono text-slate-400">
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
        <h4 className="text-sm font-bold text-slate-900 leading-snug">
          {incident.title}
        </h4>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{incident.location_name}</span>
          <span className="text-slate-400 font-mono text-[10px]">({incident.camera_id})</span>
        </div>
      </div>

      {/* Threat Score & AI Confidence Gauges */}
      <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex flex-col gap-1.5 shadow-2xs">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-600 flex items-center gap-1 font-medium">
            <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
            Threat Score:
          </span>
          <span
            className={`font-bold ${
              incident.threat_score >= 80
                ? 'text-red-700'
                : incident.threat_score >= 50
                ? 'text-amber-700'
                : 'text-emerald-700'
            }`}
          >
            {incident.threat_score}/100
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              incident.threat_score >= 80
                ? 'bg-red-600'
                : incident.threat_score >= 50
                ? 'bg-amber-600'
                : 'bg-emerald-600'
            }`}
            style={{ width: `${incident.threat_score}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-0.5">
          <span>AI Confidence: {(incident.confidence * 100).toFixed(0)}%</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
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
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono bg-slate-100 text-slate-700 border border-slate-200"
            >
              <Tag className="w-2.5 h-2.5 text-slate-500" />
              {code}
            </span>
          ))}
        </div>
      )}

      {/* Actions Footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewEvidence?.(incident.evidence_uri, incident.title);
          }}
          className="text-xs text-slate-700 hover:text-slate-900 font-mono font-medium flex items-center gap-1 transition-colors cursor-pointer"
        >
          <ExternalLink className="w-3 h-3" />
          Evidence Clip
        </button>

        {incident.status === 'open' && (
          <button
            onClick={handleAcknowledge}
            disabled={!canAcknowledge || isUpdating}
            className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-2xs ${
              canAcknowledge
                ? 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer'
                : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
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
            className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
          >
            Investigate
          </button>
        )}
      </div>
    </div>
  );
};
