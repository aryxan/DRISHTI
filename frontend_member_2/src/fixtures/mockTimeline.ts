import { TimelineEvent } from '../types/timeline';

export const mockTimelineEventsByIncident: Record<string, TimelineEvent[]> = {
  "inc-1042": [
    {
      event_id: "tl-1042-01",
      incident_id: "inc-1042",
      timestamp: "2026-10-06T02:13:00Z",
      event_type: "detection",
      description: "Motion vector threshold exceeded near South Perimeter Fence.",
      actor: "YOLOv8-Perimeter-CV",
      severity: "medium"
    },
    {
      event_id: "tl-1042-02",
      incident_id: "inc-1042",
      timestamp: "2026-10-06T02:13:05Z",
      event_type: "detection",
      description: "Bounding box classification changed: Target identified as unauthorized human intruder T-1042.",
      actor: "DeepInference-Core",
      severity: "high"
    },
    {
      event_id: "tl-1042-03",
      incident_id: "inc-1042",
      timestamp: "2026-10-06T02:13:20Z",
      event_type: "detection",
      description: "Secondary object dropped at Sub-station B coordinate.",
      actor: "ObjectTracking-Engine",
      severity: "critical"
    },
    {
      event_id: "tl-1042-04",
      incident_id: "inc-1042",
      timestamp: "2026-10-06T02:13:45Z",
      event_type: "ai_analysis",
      description: "AI Summary generated with Threat Score 88/100 (DeepSeek-R1-v2.4).",
      actor: "DRISHTI-LLM-Reasoning",
      severity: "critical"
    },
    {
      event_id: "tl-1042-05",
      incident_id: "inc-1042",
      timestamp: "2026-10-06T02:14:10Z",
      event_type: "osint_correlation",
      description: "Correlated 3 OSINT cards including Darkweb Recon Chatter & Drone Sighting.",
      actor: "OSINT-Crawler-Bot",
      severity: "high"
    }
  ],
  "inc-1041": [
    {
      event_id: "tl-1041-01",
      incident_id: "inc-1041",
      timestamp: "2026-10-06T01:50:00Z",
      event_type: "detection",
      description: "Vehicle entered Tier 3 Access Ramp.",
      actor: "ALPR-Camera-03",
      severity: "info"
    },
    {
      event_id: "tl-1041-02",
      incident_id: "inc-1041",
      timestamp: "2026-10-06T01:52:00Z",
      event_type: "ai_analysis",
      description: "Dwell time timer started. Threat score computed at 58/100.",
      actor: "RuleEngine-V2",
      severity: "medium"
    }
  ],
  "inc-1040": [
    {
      event_id: "tl-1040-01",
      incident_id: "inc-1040",
      timestamp: "2026-10-06T01:30:00Z",
      event_type: "detection",
      description: "Crowd count reached 340 individuals (4.2 p/m²).",
      actor: "CrowdAnalytics-Engine",
      severity: "high"
    }
  ]
};
