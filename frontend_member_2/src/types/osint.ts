export type OSINTCategory = 'social_media' | 'threat_intel' | 'public_records' | 'geospatial' | 'news';
export type OSINTVerificationStatus = 'verified' | 'unverified' | 'flagged';

export interface OSINTCard {
  card_id: string;
  source_name: string;
  category: OSINTCategory;
  title: string;
  content_snippet: string;
  relevance_score: number;
  published_at: string;
  author_or_handle?: string | null;
  url?: string | null;
  tags: string[];
  verification_status: OSINTVerificationStatus;
}

export interface OSINTContext {
  incident_id: string;
  cards: OSINTCard[];
  global_threat_correlation: string;
}

export type OSINTContextByIncident = Record<string, OSINTContext>;
