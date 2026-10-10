from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

# --- Events ---
class EventCreate(BaseModel):
    camera_id: str
    camera_name: str
    location_name: str
    stream_status: str
    fps: int
    active_track_count: int
    incident_id: Optional[str] = None
    event_id: str
    severity: str
    threat_score: float = Field(..., ge=0.0, le=100.0)
    confidence: float = Field(..., ge=0.0, le=1.0)
    reason_codes: List[str]
    timestamp_start: datetime
    timestamp_end: datetime
    evidence_uri: Optional[str] = None

class EventResponse(BaseModel):
    id: str
    camera_id: str
    incident_id: Optional[str]
    event_type: str
    threat_score: float
    evidence_uri: Optional[str]
    timestamp: datetime
    class Config:
        from_attributes = True

# --- Users / Auth ---
class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# --- Cameras ---
class CameraCreate(BaseModel):
    id: str
    name: str
    location: str
    stream_url: str

class CameraResponse(CameraCreate):
    status: str
    class Config:
        from_attributes = True

# --- Incidents ---
class IncidentResponse(BaseModel):
    id: str
    title: str
    severity: str
    status: str
    created_at: datetime
    class Config:
        from_attributes = True

class IncidentStatusUpdate(BaseModel):
    status: str

# --- AI Analyze ---
class AIAnalyzeRequest(BaseModel):
    incident_id: str
    event_ids: List[str]
    osint_context: List[Dict[str, Any]] = []
    camera_context: List[Dict[str, Any]] = []
    requested_output: str = "summary"

class AIAnalyzeResponse(BaseModel):
    incident_id: str
    model_name: str
    system_prompt_version: str
    summary: str
    explanation: str
    recommended_review: str
    threat_score: float
    confidence: float
    reason_codes: List[str]
    human_review_required: bool
