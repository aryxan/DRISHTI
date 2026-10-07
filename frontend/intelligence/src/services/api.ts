import { Incident, IncidentStatus } from '../types/incident';
import { AISummary } from '../types/ai';
import { OSINTContext } from '../types/osint';
import { mockIncidents } from '../fixtures/mockIncidents';
import { mockAISummaries } from '../fixtures/mockAISummaries';
import { mockOSINTContexts } from '../fixtures/mockOSINT';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export class IntelligenceAPIService {
  private useMock: boolean;

  constructor(useMock: boolean = true) {
    this.useMock = useMock;
  }

  public setMockMode(enabled: boolean): void {
    this.useMock = enabled;
  }

  public isMockMode(): boolean {
    return this.useMock;
  }

  public async getIncidents(): Promise<Incident[]> {
    if (this.useMock) {
      // Simulate slight network delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      return [...mockIncidents];
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/incidents`);
      if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to fetch incidents`);
      return await response.json();
    } catch (err) {
      console.warn('Backend unavailable, falling back to mock incidents data:', err);
      return [...mockIncidents];
    }
  }

  public async getAISummary(incidentId: string): Promise<AISummary | null> {
    if (this.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return mockAISummaries[incidentId] || null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/ai/summary/${incidentId}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to fetch AI summary`);
      return await response.json();
    } catch (err) {
      console.warn(`Backend error for AI summary ${incidentId}, using mock:`, err);
      return mockAISummaries[incidentId] || null;
    }
  }

  public async getOSINTContext(incidentId: string): Promise<OSINTContext | null> {
    if (this.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      return mockOSINTContexts[incidentId] || null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/osint/context/${incidentId}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to fetch OSINT context`);
      return await response.json();
    } catch (err) {
      console.warn(`Backend error for OSINT context ${incidentId}, using mock:`, err);
      return mockOSINTContexts[incidentId] || null;
    }
  }

  public async updateIncidentStatus(incidentId: string, status: IncidentStatus): Promise<Incident> {
    if (this.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const inc = mockIncidents.find((i) => i.incident_id === incidentId);
      if (inc) {
        inc.status = status;
        return { ...inc };
      }
      throw new Error(`Incident ${incidentId} not found`);
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/incidents/${incidentId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) throw new Error(`Failed to update status to ${status}`);
    return await response.json();
  }
}

export const apiService = new IntelligenceAPIService(true);
