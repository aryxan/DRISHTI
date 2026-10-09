# DRISHTI — Frontend Member 02: AI Threat Intelligence (`frontend_member_2`)

**Module**: AI-Driven Multi-Modal Threat Reasoning & Forensic Intelligence  
**Role**: Frontend Engineer B  
**Target Repository**: `https://github.com/aryxan/DRISHTI.git`  
**Branch**: `main`  
**Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React

---

## 1. Overview & Architecture

Frontend Member 02 delivers the **AI Intelligence & Threat Reasoning Dashboard** for the DRISHTI platform. It provides operators and forensic analysts with:

1. **Executive AI Intelligence Summaries**: Multi-modal generative reasoning narratives, key forensic observations, and recommended tactical actions with citation inspectability.
2. **Explainable Threat Score Decomposition**: DEFCON risk posture indexing (1–4), with algorithmic breakdowns across kinematic trajectory anomaly, zone intrusion, historical recidivism, and multi-sensor correlation.
3. **Forensic Evidence Clip Preview**: Interactive forensic video player with full-screen inspection mode, scrubbing controls, buffer telemetry, and SHA-256 integrity verification.
4. **Active Incidents Queue**: Collapsible drop-down queue just below the header with real-time severity metrics, live search, and multi-column responsive card layouts.
5. **Spatial Track & Trajectory Radar**: HTML5 canvas rendering keyframe paths, bounding boxes, target velocity vectors, and directional anomaly tracking.
6. **OSINT Context & Audit Timeline**: Correlated open-source intelligence feeds and chronological audit logs.
7. **Operator Session & Profile**: Authenticated operator pill with interactive dropdown, duty status, clearance info, and secure session termination.

---

## 2. Directory Structure

```
frontend_member_2/
├── public/                 # Static assets
├── src/
│   ├── components/         # Tactical UI components
│   │   ├── AISummaryCard.tsx
│   │   ├── CitationsModal.tsx
│   │   ├── CurrentTime.tsx
│   │   ├── EvidencePreview.tsx      # Video player with full-screen view
│   │   ├── Header.tsx               # Header with Operator dropdown
│   │   ├── IncidentDetailPanel.tsx  # Full-width adaptive intelligence canvas
│   │   ├── IncidentFilters.tsx
│   │   ├── IncidentList.tsx         # Collapsible queue dropdown button
│   │   ├── OSINTContextCards.tsx
│   │   ├── ReasonCodeChips.tsx
│   │   ├── SidebarNav.tsx           # Collapsible DRISHTI sidebar
│   │   ├── StateIndicators.tsx
│   │   ├── StatusControls.tsx       # Triage status workflow buttons
│   │   ├── ThreatScoreExplanation.tsx
│   │   ├── TimelineView.tsx
│   │   └── TrackTrajectoryOverlay.tsx
│   ├── context/            # IntelligenceContext (State management & WebSocket)
│   ├── fixtures/           # Offline mock telemetry fixtures
│   ├── services/           # REST API & WebSocket service connectors
│   ├── types/              # Canonical TypeScript schemas
│   ├── App.tsx             # Root application shell
│   ├── index.css           # Global Tailwind CSS & Inter typography
│   └── main.tsx            # Application entry point
├── index.html              # HTML entry point (Inter font)
├── package.json            # Project dependencies and build scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

---

## 3. Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation & Development
```bash
# Navigate to the workspace
cd frontend_member_2

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
```
