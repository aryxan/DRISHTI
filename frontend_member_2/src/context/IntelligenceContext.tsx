import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Incident, IncidentFilterOptions, IncidentStatus } from '../types/incident';
import { AISummary, AISummaryByIncident, Citation } from '../types/ai';
import { OSINTContextByIncident } from '../types/osint';
import { TrackTrajectory } from '../types/track';
import { TimelineEvent } from '../types/timeline';
import { WebSocketMessage, WebSocketMessageType, WSConnectionState } from '../types/websocket';

import { apiService } from '../services/api';
import { wsService } from '../services/websocket';

import { mockTracksByIncident } from '../fixtures/mockTracks';
import { mockTimelineEventsByIncident } from '../fixtures/mockTimeline';

interface IntelligenceContextType {
  incidents: Incident[];
  selectedIncident: Incident | null;
  selectedIncidentId: string | null;
  aiSummaryByIncident: AISummaryByIncident;
  osintContextByIncident: OSINTContextByIncident;
  tracksByIncident: Record<string, TrackTrajectory[]>;
  timelineByIncident: Record<string, TimelineEvent[]>;
  
  filters: IncidentFilterOptions;
  setFilter: (updater: Partial<IncidentFilterOptions>) => void;
  resetFilters: () => void;
  filteredIncidents: Incident[];
  isFilterOpen: boolean;
  toggleFilterOpen: () => void;

  isLoading: boolean;
  isDetailLoading: boolean;
  error: string | null;
  isStale: boolean;
  staleReason: string | null;
  
  wsConnectionState: WSConnectionState;
  isMockMode: boolean;
  toggleMockMode: (enabled: boolean) => void;

  selectIncident: (id: string) => void;
  updateIncidentStatus: (id: string, status: IncidentStatus) => Promise<void>;
  refreshAnalysis: (id: string) => Promise<void>;
  
  activeCitation: Citation | null;
  openCitation: (citation: Citation) => void;
  closeCitation: () => void;

  toastMessage: { text: string; type: 'info' | 'success' | 'warning' } | null;
  dismissToast: () => void;
  simulateWSMessage: (type: WebSocketMessageType) => void;
}

const defaultFilters: IncidentFilterOptions = {
  searchQuery: '',
  severities: [],
  statuses: [],
  camera_id: '',
  minThreatScore: 0,
  selectedReasonCode: null,
};

const IntelligenceContext = createContext<IntelligenceContextType | undefined>(undefined);

export const IntelligenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>("inc-1042");
  
  const [aiSummaryByIncident, setAiSummaryByIncident] = useState<AISummaryByIncident>({});
  const [osintContextByIncident, setOsintContextByIncident] = useState<OSINTContextByIncident>({});
  const [tracksByIncident] = useState<Record<string, TrackTrajectory[]>>(mockTracksByIncident);
  const [timelineByIncident, setTimelineByIncident] = useState<Record<string, TimelineEvent[]>>(mockTimelineEventsByIncident);

  const [filters, setFiltersState] = useState<IncidentFilterOptions>(defaultFilters);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const toggleFilterOpen = useCallback(() => setIsFilterOpen((prev) => !prev), []);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isStale, setIsStale] = useState<boolean>(false);
  const [staleReason, setStaleReason] = useState<string | null>(null);

  const [wsConnectionState, setWsConnectionState] = useState<WSConnectionState>('SIMULATED');
  const [isMockMode, setIsMockMode] = useState<boolean>(true);

  const [activeCitation, setActiveCitation] = useState<Citation | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'info' | 'success' | 'warning' } | null>(null);

  const setFilter = useCallback((updater: Partial<IncidentFilterOptions>) => {
    setFiltersState((prev) => ({ ...prev, ...updater }));
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(defaultFilters);
  }, []);

  const dismissToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  // Initial load of incidents list
  const loadIncidents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiService.getIncidents();
      setIncidents(data);
      if (data.length > 0 && !selectedIncidentId) {
        setSelectedIncidentId(data[0].incident_id);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load incidents dataset';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [selectedIncidentId]);

  // Load details for selected incident (AI summary & OSINT context)
  const loadIncidentDetail = useCallback(async (id: string) => {
    setIsDetailLoading(true);
    setIsStale(false);
    setStaleReason(null);
    try {
      const [aiData, osintData] = await Promise.all([
        apiService.getAISummary(id),
        apiService.getOSINTContext(id)
      ]);

      if (aiData) {
        setAiSummaryByIncident((prev) => ({ ...prev, [id]: aiData }));
      }
      if (osintData) {
        setOsintContextByIncident((prev) => ({ ...prev, [id]: osintData }));
      }
    } catch (err: unknown) {
      console.error(`Error loading detail for ${id}:`, err);
    } finally {
      setIsDetailLoading(false);
    }
  }, []);

  useEffect(() => {
    loadIncidents();
  }, [loadIncidents]);

  useEffect(() => {
    if (selectedIncidentId) {
      loadIncidentDetail(selectedIncidentId);
    }
  }, [selectedIncidentId, loadIncidentDetail]);

  // Handle WebSocket Connection & Message Dispatching
  useEffect(() => {
    const unsubState = wsService.onStateChange((state) => {
      setWsConnectionState(state);
    });

    const unsubMsg = wsService.onMessage('*', (msg: WebSocketMessage) => {
      console.log('[WebSocket Incoming]', msg.message_type, msg.payload);

      if (msg.message_type === 'incident.created') {
        const newInc = msg.payload as Incident;
        if (newInc && newInc.incident_id) {
          setIncidents((prev) => [newInc, ...prev.filter((i) => i.incident_id !== newInc.incident_id)]);
          setToastMessage({
            text: `NEW INCIDENT CREATED: ${newInc.title} (${newInc.severity.toUpperCase()})`,
            type: 'warning'
          });
        }
      } else if (msg.message_type === 'incident.updated') {
        const updatedInc = msg.payload as Incident;
        if (updatedInc && updatedInc.incident_id) {
          setIncidents((prev) =>
            prev.map((i) => (i.incident_id === updatedInc.incident_id ? updatedInc : i))
          );
          if (updatedInc.incident_id === selectedIncidentId) {
            setIsStale(true);
            setStaleReason(`Incident status changed to ${updatedInc.status.toUpperCase()}. AI reasoning model should be re-evaluated.`);
          }
          setToastMessage({
            text: `INCIDENT UPDATED: ${updatedInc.incident_id} state changed to ${updatedInc.status.toUpperCase()}`,
            type: 'info'
          });
        }
      } else if (msg.message_type === 'ai.analysis.completed') {
        const payload = msg.payload as { incident_id: string; summary: AISummary };
        if (payload && payload.incident_id && payload.summary) {
          setAiSummaryByIncident((prev) => ({ ...prev, [payload.incident_id]: payload.summary }));
          if (payload.incident_id === selectedIncidentId) {
            setIsStale(false);
            setStaleReason(null);
          }
          setToastMessage({
            text: `AI ANALYSIS COMPLETED for ${payload.incident_id}`,
            type: 'success'
          });
        }
      }
    });

    return () => {
      unsubState();
      unsubMsg();
    };
  }, [selectedIncidentId]);

  const toggleMockMode = useCallback((enabled: boolean) => {
    setIsMockMode(enabled);
    apiService.setMockMode(enabled);
    wsService.setSimulatedMode(enabled);
  }, []);

  const selectIncident = useCallback((id: string) => {
    setSelectedIncidentId(id);
  }, []);

  const updateIncidentStatus = useCallback(async (id: string, status: IncidentStatus) => {
    try {
      const updated = await apiService.updateIncidentStatus(id, status);
      setIncidents((prev) => prev.map((inc) => (inc.incident_id === id ? updated : inc)));
      
      // Dispatch WebSocket update event
      wsService.dispatchMessage({
        message_type: 'incident.updated',
        timestamp: new Date().toISOString(),
        payload: updated
      });

      // Append timeline event
      const newTimelineEvt: TimelineEvent = {
        event_id: `tl-opt-${Date.now()}`,
        incident_id: id,
        timestamp: new Date().toISOString(),
        event_type: 'operator_action',
        description: `Operator changed incident status to ${status.toUpperCase()}`,
        actor: 'Operator-Admin',
        severity: 'info'
      };

      setTimelineByIncident((prev) => ({
        ...prev,
        [id]: [newTimelineEvt, ...(prev[id] || [])]
      }));

    } catch (err: unknown) {
      console.error('Failed to update incident status:', err);
      setToastMessage({ text: 'Failed to update incident status', type: 'warning' });
    }
  }, []);

  const refreshAnalysis = useCallback(async (id: string) => {
    setIsDetailLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Generate updated timestamp & refreshed summary
    const currentSummary = aiSummaryByIncident[id];
    if (currentSummary) {
      const refreshed: AISummary = {
        ...currentSummary,
        generated_at: new Date().toISOString(),
        summary_text: currentSummary.summary_text + " [Refreshed with real-time operational context]"
      };

      wsService.dispatchMessage({
        message_type: 'ai.analysis.completed',
        timestamp: new Date().toISOString(),
        payload: { incident_id: id, summary: refreshed }
      });
    }
    setIsDetailLoading(false);
  }, [aiSummaryByIncident]);

  const openCitation = useCallback((citation: Citation) => {
    setActiveCitation(citation);
  }, []);

  const closeCitation = useCallback(() => {
    setActiveCitation(null);
  }, []);

  const simulateWSMessage = useCallback((type: WebSocketMessageType) => {
    const timestamp = new Date().toISOString();
    if (type === 'incident.created') {
      const newId = `inc-${Math.floor(1000 + Math.random() * 9000)}`;
      const mockNew: Incident = {
        incident_id: newId,
        event_id: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
        title: "Unscheduled UAV Hovering over Substation",
        severity: "high",
        threat_score: 81,
        confidence: 0.89,
        camera_id: "CAM-09",
        location_name: "North Radar Boundary Tower",
        timestamp_start: timestamp,
        timestamp_end: null,
        status: "open",
        reason_codes: ["UAV_DETECTION", "AIRSPACE_BREACH"],
        evidence_uri: "/evidence/clips/clip_uav_demo.mp4"
      };
      wsService.dispatchMessage({ message_type: 'incident.created', timestamp, payload: mockNew });
    } else if (type === 'incident.updated') {
      if (selectedIncidentId) {
        const target = incidents.find(i => i.incident_id === selectedIncidentId);
        if (target) {
          const updated: Incident = { ...target, status: 'investigating' };
          wsService.dispatchMessage({ message_type: 'incident.updated', timestamp, payload: updated });
        }
      }
    } else if (type === 'ai.analysis.completed') {
      if (selectedIncidentId && aiSummaryByIncident[selectedIncidentId]) {
        const existing = aiSummaryByIncident[selectedIncidentId];
        const updatedSummary: AISummary = {
          ...existing,
          generated_at: timestamp,
          summary_text: existing.summary_text + " [Updated with fresh multi-modal sensor fusion metrics]."
        };
        wsService.dispatchMessage({
          message_type: 'ai.analysis.completed',
          timestamp,
          payload: { incident_id: selectedIncidentId, summary: updatedSummary }
        });
      }
    }
  }, [incidents, selectedIncidentId, aiSummaryByIncident]);

  // Filtered Incidents calculation
  const filteredIncidents = useMemo(() => {
    return incidents.filter((inc) => {
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesQuery =
          inc.title.toLowerCase().includes(q) ||
          inc.incident_id.toLowerCase().includes(q) ||
          inc.location_name.toLowerCase().includes(q) ||
          inc.camera_id.toLowerCase().includes(q) ||
          inc.reason_codes.some((r) => r.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      if (filters.severities.length > 0 && !filters.severities.includes(inc.severity)) {
        return false;
      }

      if (filters.statuses.length > 0 && !filters.statuses.includes(inc.status)) {
        return false;
      }

      if (filters.camera_id && inc.camera_id !== filters.camera_id) {
        return false;
      }

      if (filters.minThreatScore > 0 && inc.threat_score < filters.minThreatScore) {
        return false;
      }

      if (filters.selectedReasonCode && !inc.reason_codes.includes(filters.selectedReasonCode)) {
        return false;
      }

      return true;
    });
  }, [incidents, filters]);

  const selectedIncident = useMemo(() => {
    return incidents.find((i) => i.incident_id === selectedIncidentId) || null;
  }, [incidents, selectedIncidentId]);

  return (
    <IntelligenceContext.Provider
      value={{
        incidents,
        selectedIncident,
        selectedIncidentId,
        aiSummaryByIncident,
        osintContextByIncident,
        tracksByIncident,
        timelineByIncident,
        filters,
        setFilter,
        resetFilters,
        filteredIncidents,
        isFilterOpen,
        toggleFilterOpen,
        isLoading,
        isDetailLoading,
        error,
        isStale,
        staleReason,
        wsConnectionState,
        isMockMode,
        toggleMockMode,
        selectIncident,
        updateIncidentStatus,
        refreshAnalysis,
        activeCitation,
        openCitation,
        closeCitation,
        toastMessage,
        dismissToast,
        simulateWSMessage
      }}
    >
      {children}
    </IntelligenceContext.Provider>
  );
};

export const useIntelligence = () => {
  const context = useContext(IntelligenceContext);
  if (!context) {
    throw new Error('useIntelligence must be used within an IntelligenceProvider');
  }
  return context;
};
