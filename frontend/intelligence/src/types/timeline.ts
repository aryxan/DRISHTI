export type TimelineEventType = 'detection' | 'ai_analysis' | 'status_change' | 'osint_correlation' | 'operator_action';

export interface TimelineEvent {
  event_id: string;
  incident_id: string;
  timestamp: string;
  event_type: TimelineEventType;
  description: string;
  actor: string;
  severity: 'info' | 'low' | 'medium' | 'high' | 'critical';
}
