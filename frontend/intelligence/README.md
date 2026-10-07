# DRISHTI — Frontend Member 02: AI Intelligence Dashboard (`frontend/intelligence`)

**Module**: AI Threat Intelligence & Forensic Analysis Panel  
**Role**: Frontend Engineer B  
**Repository Branch**: `feature/frontend-ai`  
**Target Repository**: `https://github.com/aryxan/DRISHTI.git`  
**Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React

---

## 1. Mission & Capabilities

The **Intelligence Dashboard** (`frontend/intelligence`) provides real-time C4I threat intelligence visualization, explainable risk scoring, target spatial trajectory overlays, open-source intelligence (OSINT) correlations, forensic evidence playback, and incident triage controls.

All components strictly comply with **Canonical Schema V1.0** contracts without inventing ad-hoc field names.

---

## 2. Canonical Schema Compliance

- **`Incident`**: `incident_id`, `event_id`, `title`, `severity`, `threat_score`, `confidence`, `camera_id`, `location_name`, `timestamp_start`, `timestamp_end`, `status`, `reason_codes`, `evidence_uri`
- **`AISummary`**: `summary_text`, `key_findings`, `recommended_actions`, `threat_score_explanation` (with `primary_factors` & `mitigating_factors`), `confidence`, `generated_at`, `model_version`, `citations`
- **`OSINTContext`**: `cards` (with `relevance_score`, `category`, `verification_status`, `content_snippet`, `author_or_handle`), `global_threat_correlation`
- **`TrackTrajectory`**: `track_id`, `object_type`, `bounding_box`, `trajectory_points`, `color`, `status`
- **WebSocket Messages**: Handles `incident.created`, `incident.updated`, and `ai.analysis.completed`

---

## 3. Implemented Components

1. `Header.tsx`: C4I Header with system counters, connection state, mock/live toggle, and WebSocket test dispatch bar.
2. `IncidentFilters.tsx`: Multi-attribute filtering across search text, severities, statuses, threat range, and reason codes.
3. `IncidentList.tsx`: Master incident queue list with real-time selection state and threat gauges.
4. `IncidentDetailPanel.tsx`: Central intelligence container organizing AI summaries, spatial overlays, OSINT feeds, and timelines.
5. `AISummaryCard.tsx`: Executive summary narrative, key findings, recommended operational response, confidence accuracy, and interactive citation chips.
6. `ThreatScoreExplanation.tsx`: Explainable threat score gauge, factor weight impact bars, base score, mitigating factors, and risk assessment box.
7. `ReasonCodeChips.tsx`: Explainable threat reason code tags with tooltips and quick filter hooks.
8. `TrackTrajectoryOverlay.tsx`: HTML5 canvas rendering real-time target bounding boxes, trajectory keyframe paths with animated dash lines, and target selection toggles.
9. `EvidencePreview.tsx`: Forensic video player preview with play/pause simulation, scrubber, pre/post buffer telemetry, and SHA-256 integrity indicator.
10. `TimelineView.tsx`: Chronological event audit trail with actor labels and event-type icons.
11. `OSINTContextCards.tsx`: Intelligence stream cards displaying threat relevance scores, category icons, verification badges, source links, tags, and global threat correlation.
12. `CitationsModal.tsx`: Citation provenance inspector popup.
13. `StatusControls.tsx`: Workflow triage state transition controls.
14. `StateIndicators.tsx`: Loading shimmer skeletons, error fallback state, and stale AI analysis alerts.

---

## 4. Execution Commands

```bash
# Navigate to intelligence directory
cd frontend/intelligence

# Install dependencies
npm install

# Run dev server
npm run dev

# Run TypeScript check & Production build
npm run build
```
