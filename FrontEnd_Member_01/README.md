# DRISHTI — Frontend Member 01: Command Center (`frontend/command-center`)

**Module**: Command Center Operational Dashboard  
**Role**: Frontend Engineer A  
**Repository Branch**: `feature/frontend-ui`  
**Target Repository**: `https://github.com/aryxan/DRISHTI.git`  
**Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React

---

## 1. Mission & Overview

The **Command Center** serves as the primary tactical C4I operational dashboard for the DRISHTI platform. It turns multi-camera video streams and real-time inference telemetry into actionable situational awareness for security operators, analysts, and administrators.

The interface adheres strictly to **Schema Version 1.0** contracts, supporting full offline execution with realistic mock fixtures and automatic live fallback to FastAPI REST and WebSocket feeds.

---

## 2. Shared Schema Contract Adherence

All entities strictly use the exact field names defined in the team specification:

### CameraCard Contract (`CameraCardData`)
| Field | Type | Description |
| :--- | :--- | :--- |
| `camera_id` | `string` | Unique camera stream identifier |
| `camera_name` | `string` | Human-readable camera label |
| `location_name` | `string` | Facility location / sector name |
| `stream_status` | `'online' \| 'offline' \| 'degraded'` | Operational connection state |
| `fps` | `number` | Real-time stream frames per second |
| `resolution_width` | `number` | Frame width (e.g. 1920) |
| `resolution_height` | `number` | Frame height (e.g. 1080) |
| `active_track_count` | `number` | Count of active targets currently tracked |
| `latest_event_type` | `string` | Type of most recent event (`intrusion`, `loitering`, etc.) |
| `latest_event_time` | `string` (ISO 8601) | Timestamp of latest event |
| `thumbnail_url` | `string` | Stream preview snapshot URL |
| `stream_url` | `string` | Internal RTSP / HLS feed link |

### IncidentCard Contract (`IncidentCardData`)
| Field | Type | Description |
| :--- | :--- | :--- |
| `incident_id` | `string` | Unique incident identifier (e.g. `inc-10427`) |
| `event_id` | `string` | Source CV event identifier (e.g. `evt-10427`) |
| `title` | `string` | Incident title |
| `severity` | `'low' \| 'medium' \| 'high' \| 'critical'` | Computed severity classification |
| `threat_score` | `number` (0–100) | Explainable threat score |
| `confidence` | `number` (0.0–1.0) | AI model inference confidence |
| `camera_id` | `string` | Originating camera identifier |
| `location_name` | `string` | Physical zone location |
| `timestamp_start` | `string` (ISO 8601) | Start timestamp |
| `timestamp_end` | `string \| null` | Resolution timestamp |
| `status` | `'open' \| 'acknowledged' \| 'investigating' \| 'resolved'` | Workflow triage state |
| `reason_codes` | `string[]` | Explainable threat factor tags |
| `evidence_uri` | `string` | Path to recorded forensic buffer clip |

---

## 3. Implemented Components & Screens

1. **Login & Session Management (`LoginModal.tsx`, `AuthContext.tsx`)**:
   - RBAC session management supporting `ADMIN`, `OPERATOR`, `ANALYST`, and `VIEWER`.
   - Role-gated actions (e.g. only `OPERATOR` and `ADMIN` can acknowledge incidents).
2. **Top Bar (`TopBar.tsx`)**:
   - **SystemStatus**: Live cluster health indicator, online streams counter (`5/6`), and active tracked targets.
   - **CurrentTime**: Synchronized local 24h clock, UTC time display, and date.
   - **ConnectionIndicator**: Real-time WebSocket connection badge (`OPEN`, `CONNECTING`, `SIMULATED STREAM`, `DISCONNECTED`) with manual Mock/Live toggle.
   - **UserMenu**: Operator profile badge, session expiration, and role switcher for demo testing.
3. **Live Camera Matrix Wall (`CameraGrid.tsx`, `CameraCard.tsx`)**:
   - High-density CCTV grid with simulated scanlines, live target tracking bounding boxes, FPS, resolution, and status badges.
   - Spotlight mode for expanding any feed to primary focus.
4. **Tactical GIS Map (`MapPanel.tsx`)**:
   - Spatial blueprint radar grid with defined sector zones (`ZONE ALPHA`, `BRAVO`, `CHARLIE`, `DELTA`).
   - Dynamic radar pulse rings (`radar-ping`) emitting on cameras with active incidents.
   - Interactive hover cards and camera selection.
5. **Active Incident Queue (`IncidentPanel.tsx`, `IncidentCard.tsx`)**:
   - Filter by severity (`ALL`, `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`) and status (`OPEN`, `ACKNOWLEDGED`).
   - Search across title, location, camera ID, and reason codes.
   - Direct inline incident acknowledgement triggering `POST /api/v1/events/{id}/acknowledge`.
6. **Threat Posture Banner (`ThreatSummary.tsx`)**:
   - Tactical DEFCON indicator (`DEFCON-1 Critical Breach` to `DEFCON-4 Normal`).
   - Average threat score gauge, critical alerts count, and total tracked targets.
7. **Event Stream Timeline (`EventTimeline.tsx`)**:
   - Real-time chronological timeline logging timestamped events with event-type icons.
8. **Real-time Alert Toasts (`AlertToast.tsx`)**:
   - Animated popups triggered on high/critical WebSocket events.
9. **Forensic Evidence Viewer (`EvidenceModal.tsx`)**:
   - Playback simulation with bounding boxes, pre/post buffer telemetry, and SHA-256 integrity indicator.
10. **System Diagnostics (`SystemHealth.tsx`)**:
    - Cluster telemetry popup displaying API latency (ms), global FPS, GPU utilization (%), and microservice health checks.

---

## 4. Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation & Run
```bash
# Navigate to the command-center workspace
cd FrontEnd_Member_01/command-center

# Install dependencies
npm install

# Start development server
npm run dev

# Run production build & type checks
npm run build
```

### Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default parameters:
- `VITE_API_BASE_URL`: `http://localhost:8000`
- `VITE_WS_BASE_URL`: `ws://localhost:8000/ws/events`
