# DRISHTI — AI-Powered Multi-Camera Intelligence & Situational Awareness

**See. Correlate. Understand.**

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue)](https://www.python.org/)
[![Computer Vision](https://img.shields.io/badge/Computer%20Vision-OpenCV%20%7C%20YOLO-green)](https://opencv.org/)
[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688)](https://fastapi.tiangolo.com/)
[![AI](https://img.shields.io/badge/AI-Ollama%20%7C%20Local%20Inference-purple)](https://ollama.com/)
[![Status](https://img.shields.io/badge/Status-Hackathon%20Prototype-orange)]()

**GitHub:** https://github.com/aryxan/DRISHTI.git

DRISHTI is a modular, AI-assisted situational-awareness platform designed to transform authorized CCTV video and permitted public contextual information into structured events, explainable incident summaries, and reviewable intelligence for human operators.

The platform combines computer vision, event processing, contextual enrichment, local AI inference, secure backend services, and two distinct operational portals.

> **Core principle:** Computer Vision provides observations. OSINT provides context. AI assists with correlation and explanation. Authorized humans make decisions.

---

## Table of Contents

- [Problem Statement](#problem-statement)
- [Proposed Solution](#proposed-solution)
- [Key Features](#key-features)
- [Conceptual Architecture](#conceptual-architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [API Overview](#api-overview)
- [Data Flow](#data-flow)
- [Computer Vision Pipeline](#computer-vision-pipeline)
- [AI/ML and OSINT](#aiml-and-osint)
- [Security and Privacy](#security-and-privacy)
- [Testing and Evaluation](#testing-and-evaluation)
- [Team Responsibilities](#team-responsibilities)
- [Current Limitations](#current-limitations)
- [Roadmap](#roadmap)
- [Datasets and References](#datasets-and-references)
- [Contributing](#contributing)
- [License](#license)

---

## Problem Statement

Security and monitoring teams may have to review multiple camera feeds, identify relevant events, correlate observations across time and location, and manually gather external context.

Traditional CCTV monitoring and isolated analytics can create information overload, delay investigations, and make it difficult to connect observations into a coherent incident timeline.

**DRISHTI addresses the challenge of securely converting authorized video observations and permitted contextual information into timely, explainable, and auditable incident intelligence.**

## Proposed Solution

DRISHTI uses a modular processing pipeline:

1. Ingest authorized video from recorded MP4 files or approved RTSP sources.
2. Detect and track relevant objects using Computer Vision.
3. Identify configurable events such as restricted-zone intrusion, perimeter crossing, and loitering.
4. Validate events over time and preserve associated evidence.
5. Enrich events with permitted contextual sources such as public maps, weather, news, alerts, and open datasets.
6. Generate an explainable rule-based score and, where implemented and validated, optional ML-based analysis.
7. Use a locally hosted LLM to summarize structured incident information.
8. Deliver events and analysis to the Command Center and Intelligence & Investigation portals.
9. Keep incident verification, escalation, and resolution under authorized human control.

## Key Features

### Computer Vision

- OpenCV and FFmpeg-based video input and preprocessing.
- YOLO-family object detection for supported object classes.
- ByteTrack-based object tracking.
- Configurable polygon zones and virtual tripwires.
- Temporal validation of events to reduce one-frame false alarms.
- Loitering and dwell-time analysis.
- Event evidence using keyframes and short video clips.
- SHA-256 evidence hashes for integrity verification.
- Basic camera-health checks for frozen frames, blur, and abnormal brightness.

### AI/ML and Contextual Intelligence

- Explainable, configurable threat scoring.
- Structured feature extraction from CV events.
- Approved OSINT/context enrichment with source provenance.
- Optional supervised tabular ML when suitable labeled data is available.
- Local LLM inference through Ollama.
- Versioned prompts and schema-validated AI responses.
- Human-review flags for high-severity or uncertain results.

### Two Separate Operational Portals

**1. Command Center**

Designed for real-time operational monitoring:

- Live camera wall.
- Live map and camera locations.
- Active alerts and incident queue.
- Camera and system health.
- Real-time event updates.

**2. Intelligence & Investigation**

Designed for incident analysis:

- Incident details and event history.
- AI-generated summaries and explanations.
- Threat-score factors and reason codes.
- Event timeline and available track information.
- Evidence preview and integrity metadata.
- OSINT context with source citations.
- Incident review and status management.

*Portal features depend on their actual implementation and backend integration.*

---

## Conceptual Architecture

```text
        AUTHORIZED VIDEO SOURCES
         MP4 / CCTV / RTSP
                  |
                  v
        VIDEO INPUT & PREPROCESSING
           OpenCV / FFmpeg
                  |
                  v
        COMPUTER VISION PIPELINE
         YOLO + ByteTrack
                  |
                  v
          EVENT DETECTION
       Zones / Crossing / Loitering
                  |
                  v
       STRUCTURED CV EVENT JSON
                  |
          +-------+--------+
          |                |
          v                v
    CONTEXT / OSINT    EVENT FEATURES
    Maps / Weather     Duration / Zone
    Public News        Confidence / Rules
    Public Alerts          |
          |                v
          |         THREAT SCORING
          |         Optional Validated ML
          +-------+--------+
                  |
                  v
          LOCAL AI / OLLAMA
        Structured Explanation
                  |
                  v
           RESPONSE VALIDATION
                  |
                  v
           SECURE BACKEND
        FastAPI / PostgreSQL
            WebSockets
                  |
          +-------+--------+
          |                |
          v                v
     COMMAND CENTER   INTELLIGENCE &
                      INVESTIGATION
          |                |
          +-------+--------+
                  |
                  v
       AUTHORIZED HUMAN REVIEW
       Verify / Investigate / Resolve
```

Security controls span the architecture: authentication, role-based authorization, network segmentation, protected evidence, audit logging, and secure configuration.

## Technology Stack

| Layer | Technologies |
|---|---|
| Programming | Python 3.10+ |
| Video processing | OpenCV, FFmpeg |
| Object detection | YOLO-family models |
| Object tracking | ByteTrack |
| Geometry | NumPy, Shapely or OpenCV |
| Deep learning | PyTorch |
| Backend API | FastAPI, Pydantic |
| Database | PostgreSQL, SQLAlchemy, asyncpg |
| Real-time delivery | WebSockets |
| Local AI | Ollama |
| Optional tabular ML | XGBoost, scikit-learn |
| Explainability | SHAP, when an appropriate ML model is implemented |
| Evidence integrity | Python hashlib, SHA-256 |
| CV annotation | CVAT |
| CV evaluation | Ultralytics validation tools, pycocotools, TrackEval |
| RTSP simulation | MediaMTX, FFmpeg |
| Packaging | Docker, where configured |

The final detector and dependency versions should be selected and tested against the team's hardware, licensing requirements, and actual recordings.

## Project Structure

The following is the intended repository organization. Adjust paths to match the files actually committed to GitHub.

```text
DRISHTI/
├── frontend/
│   ├── command-center/
│   └── intelligence/
├── backend/
│   ├── main.py
│   ├── auth.py
│   ├── database.py
│   ├── models.py
│   └── schemas.py
├── cv/
│   ├── video_input/
│   ├── detection/
│   ├── tracking/
│   ├── zones/
│   ├── events/
│   └── evidence/
├── ai/
│   ├── feature_engineering/
│   ├── threat_scoring/
│   ├── inference/
│   └── validation/
├── osint/
│   ├── sources/
│   ├── enrichment/
│   └── provenance/
├── shared/
│   ├── schemas/
│   └── config/
├── infra/
│   ├── docker/
│   └── nginx/
├── tests/
├── docs/
├── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites

Install or prepare:

- Python 3.10 or later.
- Git.
- PostgreSQL.
- FFmpeg.
- A compatible PyTorch installation.
- Ollama and a locally available model, if using the AI inference component.
- Node.js and the relevant package manager if the frontends use a Node-based framework.
- NVIDIA GPU/CUDA only if required by the selected inference configuration.

### 1. Clone the repository

```bash
git clone https://github.com/aryxan/DRISHTI.git
cd DRISHTI
```

### 2. Create a Python environment

```bash
python -m venv .venv
```

Activate it:

**Windows PowerShell**

```powershell
.venv\Scripts\Activate.ps1
```

**Linux/macOS**

```bash
source .venv/bin/activate
```

### 3. Install dependencies

Use the dependency files committed by the team:

```bash
pip install -r requirements.txt
```

If the repository does not yet contain a root `requirements.txt`, install the dependencies from the relevant module-specific requirements file. Do not assume all components share one environment.

### 4. Configure environment variables

Create a local `.env` from the project's example file, when available:

```bash
cp .env.example .env
```

On Windows, copy `.env.example` to `.env` manually if `cp` is unavailable.

Configure the database, strong JWT secret, allowed frontend origins, evidence directory, and optional Ollama settings. Never commit `.env` or real credentials.

### 5. Start PostgreSQL

Create the development database and configure `DATABASE_URL` to match the local PostgreSQL instance.

The backend's database initialization and migration strategy should be verified before running against a non-disposable database.

### 6. Run the backend

From the repository root, use the actual location of the FastAPI application. If it is `backend/main.py` and exports `app`:

```bash
uvicorn backend.main:app --reload
```

If the package layout differs, adjust the module path accordingly.

Once running, open the FastAPI documentation at:

```text
http://127.0.0.1:8000/docs
```

**Development warning:** do not expose this initial development configuration to the public internet. Authentication, authorization, secret handling, and CORS must be hardened and tested first.

### 7. Run the Computer Vision pipeline

Start with a recorded MP4 file before connecting a physical camera.

The CV module should read the video, detect objects, maintain track IDs, apply configured zone rules, validate event persistence, and send structured event JSON to the backend.

RTSP testing can subsequently use an authorized stream or a simulated stream produced with MediaMTX and FFmpeg.

The exact CV launch command depends on the final entry point committed by the CV team.

### 8. Run the frontend portals

Install dependencies separately in each frontend directory, using its committed package manifest.

Start the Command Center and Intelligence & Investigation independently and configure their API base URL and permitted origins to match the backend.

The final commands depend on the selected frontend framework and package scripts.

---

## Configuration

Example environment-variable names:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection URL |
| `JWT_SECRET` | Secure JWT signing secret; must not use a default placeholder |
| `JWT_EXPIRY_MINUTES` | Intended access-token lifetime |
| `CORS_ORIGINS` | Explicit list of permitted frontend origins |
| `RATE_LIMIT_PER_MINUTE` | API rate limit |
| `AUDIT_LOG_ENABLED` | Audit logging configuration |
| `EVIDENCE_RETENTION_DAYS` | Evidence retention policy |
| `OLLAMA_BIND_HOST` | Local inference service binding |
| `DATABASE_SSL_MODE` | Database transport security configuration |

This list describes intended configuration. Verify that each variable is implemented and consumed correctly before relying on it. In particular, token-expiry configuration must be passed through to the token creation function.

Use a secret manager or secure deployment configuration for production credentials. Do not place real secrets in this file or in Git.

---

## API Overview

The backend is designed around versioned REST endpoints and WebSocket event delivery.

| Method | Endpoint | Intended purpose |
|---|---|---|
| POST | `/api/v1/auth/login` | Authenticate a user |
| GET | `/api/v1/cameras` | List cameras |
| POST | `/api/v1/cameras` | Register a camera |
| GET | `/api/v1/events` | List events |
| GET | `/api/v1/events/{event_id}` | Retrieve an event |
| POST | `/api/v1/events/{event_id}/acknowledge` | Acknowledge an event |
| GET | `/api/v1/incidents` | List incidents |
| GET | `/api/v1/incidents/{incident_id}` | Retrieve an incident |
| POST | `/api/v1/incidents/{incident_id}/status` | Update incident status |
| POST | `/api/v1/ai/analyze` | Request incident analysis |
| GET | `/api/v1/health` | Health check |
| WS | `/ws/events` | Real-time event delivery |

These are intended API contracts, not a guarantee that every endpoint is fully implemented or secure. Verify each route's authentication, persistence, validation, and error handling before connecting it to a production frontend.

### WebSocket event types

The shared design anticipates messages such as:

- `camera.status`
- `event.created`
- `incident.created`
- `incident.updated`
- `ai.analysis.completed`
- `system.alert`

The team should agree on a single message envelope, schema version, timestamp format, and error format across the backend and both portals.

### Roles

| Role | Intended permissions |
|---|---|
| `ADMIN` | Manage users, cameras, zones, and system settings |
| `OPERATOR` | View monitoring data and acknowledge events |
| `ANALYST` | Investigate incidents, evidence, and reports |
| `VIEWER` | Read-only access |

Permissions must be enforced by the backend, not merely hidden in the frontend.

---

## Data Flow

A typical incident follows this path:

1. **Video ingestion:** an authorized MP4 or RTSP source supplies frames.
2. **Detection and tracking:** the CV module produces detections, track metadata, and trajectories.
3. **Event validation:** configurable rules evaluate zone intrusion, crossing, dwell time, or other supported conditions.
4. **Evidence capture:** the system saves relevant frames/clips and associates their integrity hashes with the event.
5. **Structured event delivery:** the CV module sends an agreed JSON payload to FastAPI.
6. **Context enrichment:** approved OSINT sources contribute contextual information with provenance and timestamps.
7. **Risk analysis:** a configured scoring engine computes a transparent score; optional ML is separate and must be validated.
8. **AI explanation:** Ollama receives structured event information and approved context, not unnecessary raw video.
9. **Response validation:** Pydantic validates the returned JSON before it is accepted by the application.
10. **Human review:** the two portals display relevant information for authorized review and follow-up.

### Example event types

- `person_detected`
- `vehicle_detected`
- `restricted_zone_intrusion`
- `perimeter_crossing`
- `loitering`
- `crowd_anomaly`
- `abandoned_object`
- `fire_smoke`
- `camera_offline`
- `system_anomaly`

The final enum values must match the shared schema and the actual CV event implementation.

---

## Computer Vision Pipeline

The CV module's documented responsibilities are:

```text
Frame Source
    ↓
Preprocessing
    ↓
Object Detection
    ↓
Multi-Object Tracking
    ↓
Zone / Line Geometry
    ↓
Event Candidate
    ↓
Temporal Validation
    ↓
Evidence Capture
    ↓
Structured JSON → FastAPI
```

### MVP priorities

1. Video input from recorded MP4.
2. YOLO-family detection with ByteTrack.
3. Restricted-zone intrusion.
4. Perimeter/line crossing.
5. Loitering/dwell-time validation.
6. Event evidence and SHA-256 hashing.
7. Retry-safe event delivery.
8. A small, documented evaluation dataset.

Abandoned-object detection, advanced anomaly detection, TensorRT acceleration, and cross-camera subject correlation should be treated as optional until the core pipeline is reliable.

### Evaluation

Report measured results rather than estimated or fabricated performance:

- Detection precision, recall, and mAP where appropriate.
- Tracking metrics such as IDF1 and MOTA where applicable.
- Event precision and recall.
- False alerts per camera-hour.
- Processing FPS and end-to-end event latency.
- Results by lighting, occlusion, camera view, and event type.

---

## AI/ML and OSINT

### Threat scoring

The initial system can use a transparent, configurable weighted score based on validated event features. A manually configured score must not be described as a trained ML prediction.

Potential features include:

- Event type and persistence.
- Configured zone weight.
- Detection confidence.
- Crowd or vehicle context where relevant.
- Historical/contextual information where appropriate.
- Event corroboration and anomaly signals.

A score is a prioritization aid, not a scientifically validated probability of a threat unless a separate, appropriately labeled and evaluated model establishes that interpretation.

### Local LLM

Ollama is intended to provide local inference over structured incident information. The integration should:

- Use a versioned prompt.
- Send only necessary, approved context.
- Validate output using Pydantic.
- Reject malformed responses and follow a defined fallback path.
- Record model and prompt versions.
- Keep human review required for consequential findings.

### OSINT

Permitted public context may include:

- Public maps and points of interest.
- Weather observations.
- Public news and RSS feeds.
- Public alerts.
- Appropriate open datasets.

Each context item should retain its source, URL, retrieval timestamp, publication timestamp where available, and a summary or citation. External content must be treated as untrusted input.

Public context is not proof of an individual's identity or intent, and unrelated datasets must not be combined as though they represented one coherent ground-truth record.

---

## Security and Privacy

DRISHTI is intended as an authorized, human-in-the-loop decision-support system.

Security requirements include:

- Use only authorized camera feeds and permitted data sources.
- Segment camera networks from application and database networks.
- Avoid exposing RTSP streams directly to the public internet.
- Enforce authentication and role-based authorization on every relevant API.
- Authenticate and authorize WebSocket connections.
- Use strong secrets and secure password hashing.
- Restrict CORS to known frontend origins.
- Protect database credentials and evidence storage.
- Use TLS and appropriate device/service authentication in deployment.
- Maintain audit logs for incident access and reviewer actions.
- Apply rate limits, input validation, retention controls, and secure error handling.
- Validate AI output and preserve OSINT provenance.
- Require human verification for consequential findings.

The CV blueprint specifies behaviour-based event analysis and does not require face recognition or an identity database for its MVP.

Optional subject-of-interest correlation should be explicitly authorized, privacy-reviewed, and presented as candidate matching with uncertainty—not as confirmed identity.

**Do not deploy the prototype operationally until the authentication, authorization, secret-management, evidence-protection, and audit requirements have been tested.**

---

## Testing and Evaluation

Recommended test coverage:

### Backend

- Authentication and invalid-token rejection.
- Role-based access control.
- Schema validation and malformed event payloads.
- Event persistence and status transitions.
- WebSocket authentication and reconnection.
- Database failure and recovery.
- AI response validation and error handling.
- Audit logging and evidence-access restrictions.

### Computer Vision

- Normal movement and difficult lighting.
- Zone-boundary cases.
- Short-lived detections and occlusion.
- Repeated-event suppression and cooldown.
- Camera disconnection and frozen frames.
- False-positive and false-negative event analysis.

### End-to-end integration

Use a reproducible MP4 scenario to test:

```text
MP4 → CV Event JSON → FastAPI → Database
    → Context / AI Analysis → WebSocket
    → Command Center + Intelligence Portal
    → Human Review
```

Document the exact dataset, test split, configuration, and observed results for every performance claim.

---

## Team Responsibilities

The intended division of work is:

| Role | Responsibility |
|---|---|
| Computer Vision | Video ingestion, detection, tracking, event detection, evidence |
| AI/ML + OSINT | Feature engineering, explainable scoring, approved context enrichment, local LLM integration |
| Security & Implementation Lead | Authentication, authorization, API contracts, database integration, auditability, deployment |
| Frontend — Command Center | Live monitoring, maps, alerts, event queue, camera health |
| Frontend — Intelligence & Investigation | Incident analysis, timelines, evidence, AI explanation, OSINT citations |

Coordinate through a shared schema, agreed environment variables, version-controlled configuration, and integration tests before merging changes.

---

## Current Limitations

This repository describes a hackathon prototype and its intended architecture. The following capabilities must not be assumed complete without implementation and testing:

- Secure production authentication and role enforcement.
- Fully persistent incident lifecycle and audit trail.
- Real-time camera connectivity and multi-camera throughput.
- Complete OSINT gateway and source verification.
- Actual Ollama inference and validated AI responses.
- A trained and independently evaluated risk-prediction model.
- Reliable abandoned-object or advanced anomaly detection.
- Cross-camera subject correlation.
- Production-grade evidence retention and integrity verification.
- Deployment-ready containers and frontend builds.

The team should update this section as features are implemented and independently verified.

## Roadmap

- [ ] Secure backend authentication and authorization.
- [ ] Finalize shared schemas and WebSocket message contracts.
- [ ] Implement CV event persistence and retry-safe ingestion.
- [ ] Complete MP4-based detection, tracking, and core event rules.
- [ ] Add evidence capture and hash verification.
- [ ] Integrate approved OSINT context.
- [ ] Implement explainable scoring and validated local LLM output.
- [ ] Connect the Command Center.
- [ ] Connect Intelligence & Investigation.
- [ ] Add end-to-end integration and security tests.
- [ ] Benchmark on representative data and document limitations.
- [ ] Package the verified demo for reproducible deployment.

---

## Datasets and References

The team documents the following public datasets and reference sources. Review each dataset's current terms, access requirements, and suitability before use.

### Computer Vision

- [COCO](https://cocodataset.org/) — common object-detection classes and pretrained-model ecosystem.
- [CrowdHuman](https://sshao0516.github.io/CrowdHuman/) — crowded-person detection.
- [MOTChallenge](https://motchallenge.net/) — multi-object tracking benchmarks, including MOT17/MOT20.
- [UCF-Crime](https://www.crcv.ucf.edu/projects/real-world/) — surveillance anomaly research.
- [PETS2006](http://www.cvg.rdg.ac.uk/) — abandoned-luggage scenarios.
- [AI City Challenge](https://www.aicitychallenge.org/) — multi-camera tracking and traffic anomaly research.

### Contextual and tabular data

- [NYPD Complaint Data Historic](https://data.cityofnewyork.us/Public-Safety/NYPD-Complaint-Data-Historic/qgea-i56i)
- [NYC Bicycle and Pedestrian Counts](https://data.cityofnewyork.us/Transportation/Bicycle-and-Pedestrian-Counts/ct66-47at)
- [NYC Department of Transportation data feeds](https://www.nyc.gov/html/dot/html/about/datafeeds.shtml)

These datasets have different geographic coverage, definitions, and collection processes. They are not a single prebuilt DRISHTI training dataset, and historical contextual statistics should not be treated as proof of an individual threat.

### Licensing

Review the licenses of models, packages, datasets, and frontend dependencies before redistribution or commercial use. In particular, check the applicable Ultralytics licensing terms for the selected detector and deployment model.

---

## Contributing

1. Create a feature branch from the agreed development branch.
2. Follow the shared API schemas and configuration contracts.
3. Keep secrets, local video, model weights, generated evidence, and environment files out of Git unless explicitly approved and appropriately licensed.
4. Add tests for schema changes and new behaviours.
5. Run relevant checks before opening a pull request.
6. Obtain integration review before merging changes affecting other modules.

Suggested branches:

```text
main
dev
feature/cv
feature/ai
feature/security
feature/frontend-ui
feature/frontend-ai
```

The project lead should coordinate integration and release decisions.

## License

A repository-wide license has not been specified in the supplied project documents. Add a `LICENSE` file only after the team agrees on the project's distribution terms and verifies the licenses of included dependencies and assets.

---

**DRISHTI — See. Correlate. Understand.**

*Turning authorized observations into contextual, explainable, human-reviewed intelligence.*
