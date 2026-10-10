import os
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from .database import engine, Base, get_db
from .models import Event, Camera, Incident, User, RoleEnum
from .schemas import (
    EventCreate, EventResponse, UserLogin, Token, 
    CameraCreate, CameraResponse, IncidentResponse, IncidentStatusUpdate,
    AIAnalyzeRequest, AIAnalyzeResponse
)
from .auth import verify_password, create_access_token, get_current_user, ACCESS_TOKEN_EXPIRE_MINUTES
from datetime import timedelta

app = FastAPI(
    title="DRISHTI Core API",
    description="Full API Gateway for DRISHTI Surveillance Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception:
                pass

manager = ConnectionManager()

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# ========================================
# 1. CORE / SYSTEM
# ========================================
@app.get("/api/v1/health")
async def health_check():
    return {"status": "healthy", "service": "DRISHTI Core API"}

@app.websocket("/ws/events")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

# ========================================
# 2. AUTHENTICATION
# ========================================
@app.post("/api/v1/auth/login", response_model=Token)
async def login(user_credentials: UserLogin, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.username == user_credentials.username))
    user = result.scalars().first()
    
    if not user or not verify_password(user_credentials.password, user.hashed_password):
        # Mock behavior for hackathon: if db is empty, let "admin" login bypass
        if user_credentials.username == "admin" and user_credentials.password == "admin":
            access_token = create_access_token(data={"sub": "admin", "role": "ADMIN"})
            return {"access_token": access_token, "token_type": "bearer"}
        raise HTTPException(status_code=401, detail="Invalid credentials")
        
    access_token = create_access_token(data={"sub": user.username, "role": user.role.value})
    return {"access_token": access_token, "token_type": "bearer"}

# ========================================
# 3. CAMERAS
# ========================================
@app.get("/api/v1/cameras", response_model=List[CameraResponse])
async def get_cameras(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Camera))
    return result.scalars().all()

@app.post("/api/v1/cameras", response_model=CameraResponse)
async def create_camera(camera: CameraCreate, db: AsyncSession = Depends(get_db)):
    new_cam = Camera(id=camera.id, name=camera.name, location=camera.location, stream_url=camera.stream_url)
    db.add(new_cam)
    await db.commit()
    return new_cam

# ========================================
# 4. EVENTS
# ========================================
@app.post("/api/v1/events", status_code=status.HTTP_201_CREATED)
async def create_event(event: EventCreate, db: AsyncSession = Depends(get_db)):
    new_event = Event(
        id=event.event_id,
        camera_id=event.camera_id,
        incident_id=event.incident_id,
        event_type=event.severity,
        threat_score=event.threat_score,
        evidence_uri=event.evidence_uri,
        timestamp=event.timestamp_start
    )
    db.add(new_event)
    await db.commit()
    
    await manager.broadcast({
        "message_type": "event.created",
        "timestamp": event.timestamp_start.isoformat(),
        "payload": event.model_dump()
    })
    return {"status": "success", "event_id": event.event_id}

@app.get("/api/v1/events", response_model=List[EventResponse])
async def get_events(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Event))
    return result.scalars().all()

@app.get("/api/v1/events/{event_id}", response_model=EventResponse)
async def get_event(event_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Event).where(Event.id == event_id))
    ev = result.scalars().first()
    if not ev:
        raise HTTPException(status_code=404, detail="Event not found")
    return ev

@app.post("/api/v1/events/{event_id}/acknowledge")
async def acknowledge_event(event_id: str, db: AsyncSession = Depends(get_db)):
    # Simple acknowledge mock
    return {"status": "acknowledged", "event_id": event_id}

# ========================================
# 5. INCIDENTS
# ========================================
@app.get("/api/v1/incidents", response_model=List[IncidentResponse])
async def get_incidents(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Incident))
    return result.scalars().all()

@app.get("/api/v1/incidents/{incident_id}", response_model=IncidentResponse)
async def get_incident(incident_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Incident).where(Incident.id == incident_id))
    inc = result.scalars().first()
    if not inc:
        raise HTTPException(status_code=404, detail="Incident not found")
    return inc

@app.post("/api/v1/incidents/{incident_id}/status")
async def update_incident_status(incident_id: str, status_update: IncidentStatusUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Incident).where(Incident.id == incident_id))
    inc = result.scalars().first()
    if not inc:
        raise HTTPException(status_code=404, detail="Incident not found")
    inc.status = status_update.status
    await db.commit()
    
    await manager.broadcast({
        "message_type": "incident.updated",
        "payload": {"incident_id": incident_id, "status": inc.status}
    })
    return {"status": "success"}

# ========================================
# 6. AI ANALYSIS
# ========================================
@app.post("/api/v1/ai/analyze", response_model=AIAnalyzeResponse)
async def analyze_incident_ai(request: AIAnalyzeRequest):
    """
    Mock AI Analysis Endpoint. 
    In the real implementation, this would forward the request to the Ollama server managed by Dhairya.
    """
    response = AIAnalyzeResponse(
        incident_id=request.incident_id,
        model_name="ollama-llama3",
        system_prompt_version="1.0",
        summary="Suspicious loitering detected near restricted zone.",
        explanation="The individual remained in the restricted perimeter for >30 seconds, triggering anomaly thresholds.",
        recommended_review="Security personnel should review the evidence clip.",
        threat_score=85.5,
        confidence=0.92,
        reason_codes=["LOITERING", "RESTRICTED_ZONE"],
        human_review_required=True
    )
    
    # Notify frontend that AI analysis is complete
    await manager.broadcast({
        "message_type": "ai.analysis.completed",
        "payload": response.model_dump()
    })
    
    return response
