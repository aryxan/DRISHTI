export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';
export type IncidentStatus = 'open' | 'acknowledged' | 'investigating' | 'resolved';

export interface IncidentCardData {
  incident_id: string;
  event_id: string;
  title: string;
  severity: IncidentSeverity;
  threat_score: number;
  confidence: number;
  camera_id: string;
  location_name: string;
  timestamp_start: string;
  timestamp_end: string | null;
  status: IncidentStatus;
  reason_codes: string[];
  evidence_uri: string;
}

export interface ThreatSummaryData {
  total_incidents: number;
  average_threat_score: number;
  critical_alerts_count: number;
  high_alerts_count: number;
  active_tracks: number;
  threat_level: 'DEFCON-4 (Normal)' | 'DEFCON-3 (Elevated)' | 'DEFCON-2 (High Alert)' | 'DEFCON-1 (Critical Breach)';
}
