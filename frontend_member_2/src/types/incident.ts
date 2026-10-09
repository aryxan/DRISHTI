export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';
export type IncidentStatus = 'open' | 'acknowledged' | 'investigating' | 'resolved' | 'review';

export interface Incident {
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

export interface IncidentFilterOptions {
  searchQuery: string;
  severities: IncidentSeverity[];
  statuses: IncidentStatus[];
  camera_id: string;
  minThreatScore: number;
  selectedReasonCode: string | null;
}
