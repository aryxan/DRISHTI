import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { CameraCardData } from '../types/camera';
import type { IncidentCardData, IncidentSeverity, IncidentStatus, ThreatSummaryData } from '../types/incident';
import type { WSConnectionState, WebSocketMessage } from '../types/websocket';
import { apiService } from '../services/api';
import { wsService } from '../services/websocket';
import mockEventsData from '../fixtures/mockEvents.json';

export interface TimelineEvent {
  event_id: string;
  incident_id?: string;
  camera_id: string;
  camera_name: string;
  location_name: string;
  event_type: string;
  timestamp: string;
  severity: IncidentSeverity;
  description: string;
}

export interface ToastAlert {
  id: string;
  title: string;
  message: string;
  severity: IncidentSeverity;
  timestamp: string;
}

interface CommandCenterContextType {
  cameras: CameraCardData[];
  incidents: IncidentCardData[];
  events: TimelineEvent[];
  selectedIncident: IncidentCardData | null;
  selectedCamera: CameraCardData | null;
  toasts: ToastAlert[];
  wsState: WSConnectionState;
  isMockMode: boolean;
  threatSummary: ThreatSummaryData;
  filterSeverity: IncidentSeverity | 'ALL';
  filterStatus: IncidentStatus | 'ALL';
  setSelectedIncident: (inc: IncidentCardData | null) => void;
  setSelectedCamera: (cam: CameraCardData | null) => void;
  setFilterSeverity: (sev: IncidentSeverity | 'ALL') => void;
  setFilterStatus: (st: IncidentStatus | 'ALL') => void;
  acknowledgeIncident: (incidentId: string) => Promise<void>;
  updateIncidentStatus: (incidentId: string, status: IncidentStatus) => Promise<void>;
  dismissToast: (id: string) => void;
  toggleMockMode: () => void;
  refreshData: () => Promise<void>;
}

const CommandCenterContext = createContext<CommandCenterContextType | undefined>(undefined);

export const CommandCenterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cameras, setCameras] = useState<CameraCardData[]>([]);
  const [incidents, setIncidents] = useState<IncidentCardData[]>([]);
  const [events, setEvents] = useState<TimelineEvent[]>(mockEventsData as TimelineEvent[]);
  const [selectedIncident, setSelectedIncident] = useState<IncidentCardData | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<CameraCardData | null>(null);
  const [toasts, setToasts] = useState<ToastAlert[]>([]);
  const [wsState, setWsState] = useState<WSConnectionState>(wsService.getState());
  const [isMockMode, setIsMockMode] = useState<boolean>(wsService.isMockMode());
  const [filterSeverity, setFilterSeverity] = useState<IncidentSeverity | 'ALL'>('ALL');
  const [filterStatus, setFilterStatus] = useState<IncidentStatus | 'ALL'>('ALL');

  const addToast = useCallback((alert: Omit<ToastAlert, 'id' | 'timestamp'>) => {
    const newAlert: ToastAlert = {
      ...alert,
      id: `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toLocaleTimeString(),
    };
    setToasts((prev) => [newAlert, ...prev.slice(0, 4)]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const refreshData = useCallback(async () => {
    const [cams, incs] = await Promise.all([
      apiService.fetchCameras(),
      apiService.fetchIncidents(),
    ]);
    setCameras(cams);
    setIncidents(incs);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Handle incoming real-time WebSocket messages
  useEffect(() => {
    const unsubState = wsService.onStateChange((state) => {
      setWsState(state);
      setIsMockMode(wsService.isMockMode());
    });

    const unsubMsg = wsService.onMessage((msg: WebSocketMessage) => {
      if (msg.message_type === 'camera.status') {
        const payload = msg.payload as Partial<CameraCardData> & { camera_id: string };
        setCameras((prev) =>
          prev.map((cam) =>
            cam.camera_id === payload.camera_id
              ? { ...cam, ...payload }
              : cam
          )
        );
      } else if (msg.message_type === 'event.created') {
        const p = msg.payload as {
          event_id: string;
          camera_id: string;
          event_type: string;
          threat_score: number;
          severity: IncidentSeverity;
        };
        const matchingCam = cameras.find((c) => c.camera_id === p.camera_id);
        const newEvent: TimelineEvent = {
          event_id: p.event_id,
          camera_id: p.camera_id,
          camera_name: matchingCam ? matchingCam.camera_name : p.camera_id,
          location_name: matchingCam ? matchingCam.location_name : 'Monitored Perimeter',
          event_type: p.event_type,
          timestamp: msg.timestamp,
          severity: p.severity,
          description: `Live Alert: New ${p.event_type.replace('_', ' ')} detected (Threat: ${p.threat_score})`,
        };
        setEvents((prev) => [newEvent, ...prev.slice(0, 49)]);

        if (p.severity === 'critical' || p.severity === 'high') {
          addToast({
            title: `Alert: ${p.event_type.toUpperCase()}`,
            message: `${matchingCam?.camera_name || p.camera_id} reported threat level ${p.threat_score}`,
            severity: p.severity,
          });
        }
      } else if (msg.message_type === 'incident.created') {
        const inc = msg.payload as IncidentCardData;
        setIncidents((prev) => [inc, ...prev]);
        addToast({
          title: `NEW INCIDENT: ${inc.severity.toUpperCase()}`,
          message: inc.title,
          severity: inc.severity,
        });
      }
    });

    return () => {
      unsubState();
      unsubMsg();
    };
  }, [cameras, addToast]);

  const toggleMockMode = useCallback(() => {
    const next = !isMockMode;
    wsService.setMockMode(next);
    setIsMockMode(next);
  }, [isMockMode]);

  const acknowledgeIncident = useCallback(async (incidentId: string) => {
    const target = incidents.find((i) => i.incident_id === incidentId);
    if (!target) return;

    await apiService.acknowledgeEvent(target.event_id);
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.incident_id === incidentId ? { ...inc, status: 'acknowledged' } : inc
      )
    );
    addToast({
      title: 'Incident Acknowledged',
      message: `Incident ${incidentId} was acknowledged by operator`,
      severity: 'low',
    });
  }, [incidents, addToast]);

  const updateIncidentStatus = useCallback(async (incidentId: string, status: IncidentStatus) => {
    await apiService.updateIncidentStatus(incidentId, status);
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.incident_id === incidentId ? { ...inc, status } : inc
      )
    );
  }, []);

  const threatSummary: ThreatSummaryData = useMemo(() => {
    const total = incidents.length;
    const avgScore = total
      ? Math.round(incidents.reduce((sum, i) => sum + i.threat_score, 0) / total)
      : 0;
    const crit = incidents.filter((i) => i.severity === 'critical').length;
    const high = incidents.filter((i) => i.severity === 'high').length;
    const activeTracks = cameras.reduce((sum, c) => sum + (c.active_track_count || 0), 0);

    let level: ThreatSummaryData['threat_level'] = 'DEFCON-4 (Normal)';
    if (crit > 0 || avgScore > 75) level = 'DEFCON-1 (Critical Breach)';
    else if (high > 1 || avgScore > 60) level = 'DEFCON-2 (High Alert)';
    else if (high === 1 || avgScore > 40) level = 'DEFCON-3 (Elevated)';

    return {
      total_incidents: total,
      average_threat_score: avgScore,
      critical_alerts_count: crit,
      high_alerts_count: high,
      active_tracks: activeTracks,
      threat_level: level,
    };
  }, [incidents, cameras]);

  return (
    <CommandCenterContext.Provider
      value={{
        cameras,
        incidents,
        events,
        selectedIncident,
        selectedCamera,
        toasts,
        wsState,
        isMockMode,
        threatSummary,
        filterSeverity,
        filterStatus,
        setSelectedIncident,
        setSelectedCamera,
        setFilterSeverity,
        setFilterStatus,
        acknowledgeIncident,
        updateIncidentStatus,
        dismissToast,
        toggleMockMode,
        refreshData,
      }}
    >
      {children}
    </CommandCenterContext.Provider>
  );
};

export const useCommandCenter = (): CommandCenterContextType => {
  const ctx = useContext(CommandCenterContext);
  if (!ctx) {
    throw new Error('useCommandCenter must be used within CommandCenterProvider');
  }
  return ctx;
};
