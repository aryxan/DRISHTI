export type CitationSourceType = 'cv_event' | 'osint' | 'logs' | 'rule_engine';

export interface Citation {
  citation_id: string;
  source_id: string;
  source_type: CitationSourceType;
  title: string;
  snippet: string;
  timestamp: string;
  url?: string;
  confidence_score?: number;
}

export interface ThreatFactor {
  factor: string;
  weight: number;
  impact: 'high' | 'medium' | 'low';
  description: string;
}

export interface ThreatScoreExplanation {
  overall_score: number;
  base_score: number;
  primary_factors: ThreatFactor[];
  mitigating_factors: string[];
  risk_assessment: string;
}

export interface AISummary {
  incident_id: string;
  summary_text: string;
  key_findings: string[];
  recommended_actions: string[];
  threat_score_explanation: ThreatScoreExplanation;
  confidence: number;
  generated_at: string;
  model_version: string;
  citations: Citation[];
}

export type AISummaryByIncident = Record<string, AISummary>;
