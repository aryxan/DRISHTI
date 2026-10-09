import { AISummaryByIncident } from '../types/ai';

export const mockAISummaries: AISummaryByIncident = {
  "inc-1042": {
    incident_id: "inc-1042",
    summary_text: "At 02:13:00 UTC, target subject T-1042 crossed the secondary perimeter fence into Restricted Zone 4. Subject dropped a dark metallic briefcase at coordinate (X:42, Y:88) near power sub-station B and retreated towards the treeline. Thermal vision confirms target heat signature matches unauthorized intruder profile. Multi-modal OSINT feeds indicate concurrent elevated local chatter regarding security drills.",
    key_findings: [
      "Perimeter fence breach confirmed by thermal and optical sensors on CAM-07.",
      "Unattended package (dark metallic container ~40x30cm) detected stationary for > 180 seconds.",
      "Target trajectory shows deliberate avoiding of primary lighting cones.",
      "Zero active authorization badges registered in Zone 4 during timeframe."
    ],
    recommended_actions: [
      "Dispatch Tactical Rapid Response Unit 3 to Sector 4 South Perimeter immediately.",
      "Initiate EOD protocol 4-B for unattended object inspection.",
      "Lock down automated security turnstiles at Perimeter Gate 2.",
      "Maintain active tracking on subject T-1042 using adjacent CAM-08 infrared feed."
    ],
    threat_score_explanation: {
      overall_score: 88,
      base_score: 50,
      primary_factors: [
        {
          factor: "Perimeter Security Boundary Breach",
          weight: 25,
          impact: "high",
          description: "Physical fence line crossing detected without active RFID authorization badge."
        },
        {
          factor: "Unattended Object Deployment",
          weight: 20,
          impact: "high",
          description: "Subject placed container near critical infrastructure power sub-station B."
        },
        {
          factor: "Nighttime Covert Movement",
          weight: 10,
          impact: "medium",
          description: "Off-hours entry (02:13 UTC) with evasive maneuvering."
        },
        {
          factor: "High AI Confidence Alignment",
          weight: 8,
          impact: "medium",
          description: "94% multi-model visual inference confidence across dual streams."
        }
      ],
      mitigating_factors: [
        "No firearm or kinetic weapon identified on high-res spatial frame.",
        "Security fence alarm triggered automated security lights."
      ],
      risk_assessment: "CRITICAL HIGH: Immediate physical response required due to proximity to critical power grid."
    },
    confidence: 0.94,
    generated_at: "2026-10-06T02:13:45Z",
    model_version: "DeepSeek-R1-DRISHTI-v2.4",
    citations: [
      {
        citation_id: "cit-1042-1",
        source_id: "EVT-1042-CV",
        source_type: "cv_event",
        title: "Perimeter Crossing Sensor Trigger",
        snippet: "YOLOv8-Security detection: person (confidence 0.94) at bbox [120, 340, 85, 190]",
        timestamp: "2026-10-06T02:13:02Z",
        url: "/evidence/clips/clip_inc_1042_20261006_021300.mp4",
        confidence_score: 0.94
      },
      {
        citation_id: "cit-1042-2",
        source_id: "OSINT-TW-8842",
        source_type: "osint",
        title: "Geospatial Social Feed Monitor",
        snippet: "Public tweet from @SecWatch_Local: 'Unscheduled maintenance lights active near Zone 4 sub-station.'",
        timestamp: "2026-10-06T02:11:30Z",
        url: "https://osint.drishti.internal/feed/8842",
        confidence_score: 0.82
      },
      {
        citation_id: "cit-1042-3",
        source_id: "RULE-SEC-402",
        source_type: "rule_engine",
        title: "Automated Policy Engine Alert",
        snippet: "Rule #402 breached: Unattended object within 15 meters of High Voltage Substation.",
        timestamp: "2026-10-06T02:13:15Z",
        confidence_score: 1.0
      }
    ]
  },
  "inc-1041": {
    incident_id: "inc-1041",
    summary_text: "Unregistered dark sedan (Plate state ambiguous) idling at Tier 3 Access Vault Ramp for 12+ minutes. Vehicle engine remains running with hazard lights extinguished. Driver has not exited.",
    key_findings: [
      "Stationary duration exceeds 10-minute maximum authorization limit.",
      "License plate camera failed database match in Tier 3 whitelist.",
      "Two occupants observed inside vehicle using cabin IR sensor."
    ],
    recommended_actions: [
      "Send ramp security guard to conduct verbal query.",
      "Verify vehicle credentials against visitor pre-registration system."
    ],
    threat_score_explanation: {
      overall_score: 58,
      base_score: 35,
      primary_factors: [
        {
          factor: "Unauthorized Dwell Time Exceeded",
          weight: 15,
          impact: "medium",
          description: "Stationary in sensitive ramp zone > 720 seconds."
        },
        {
          factor: "Unregistered License Plate",
          weight: 10,
          impact: "medium",
          description: "ALPR match failure in security database."
        }
      ],
      mitigating_factors: [
        "Vehicle engine idled normally without suspicious movement.",
        "Ramp hazard barriers remain fully deployed."
      ],
      risk_assessment: "MODERATE AMBIGUOUS: Standard security check required."
    },
    confidence: 0.88,
    generated_at: "2026-10-06T01:53:10Z",
    model_version: "DeepSeek-R1-DRISHTI-v2.4",
    citations: [
      {
        citation_id: "cit-1041-1",
        source_id: "EVT-1041-ALPR",
        source_type: "cv_event",
        title: "ALPR Database Lookup Miss",
        snippet: "Plate DB lookup: Result NOT_FOUND for license plate query 'XY-902-TR'.",
        timestamp: "2026-10-06T01:52:15Z",
        confidence_score: 0.88
      }
    ]
  },
  "inc-1040": {
    incident_id: "inc-1040",
    summary_text: "Crowd density at North Gate Plaza reached 4.2 persons/m² following sudden influx from main transit terminal. Flow velocity dropped by 65%, indicating severe physical bottleneck.",
    key_findings: [
      "Crowd density exceeds safe operating threshold of 3.0 p/m².",
      "Turnstile #3 operating at reduced capacity due to scanner jam."
    ],
    recommended_actions: [
      "Open auxiliary overflow gates B1 and B2.",
      "Deploy crowd direction personnel to clear turnstile approach."
    ],
    threat_score_explanation: {
      overall_score: 72,
      base_score: 40,
      primary_factors: [
        {
          factor: "Dangerous Crowd Density Surge",
          weight: 20,
          impact: "high",
          description: "Density threshold breached posing crush hazard."
        },
        {
          factor: "Access Control Bottleneck",
          weight: 12,
          impact: "medium",
          description: "Turnstile throughput degradation."
        }
      ],
      mitigating_factors: [
        "No aggressive or violent behavior detected by audio analytics.",
        "Medical first response team pre-positioned nearby."
      ],
      risk_assessment: "ELEVATED CROWD SAFETY: Immediate flow redirection required."
    },
    confidence: 0.91,
    generated_at: "2026-10-06T01:31:00Z",
    model_version: "DeepSeek-R1-DRISHTI-v2.4",
    citations: [
      {
        citation_id: "cit-1040-1",
        source_id: "EVT-1040-FLOW",
        source_type: "cv_event",
        title: "Optical Flow Density Metric",
        snippet: "Crowd Counting Model: 340 individuals in 80m² ROI (4.25 p/m²).",
        timestamp: "2026-10-06T01:30:12Z",
        confidence_score: 0.91
      }
    ]
  }
};
