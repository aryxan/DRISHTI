export type WebSocketMessageType =
  | 'camera.status'
  | 'event.created'
  | 'incident.created'
  | 'incident.updated'
  | 'ai.analysis.completed'
  | 'system.alert';

export interface WebSocketMessage<T = unknown> {
  message_type: WebSocketMessageType;
  timestamp: string;
  payload: T;
}

export type WSConnectionState = 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED' | 'MOCK_STREAM';

export interface SystemHealthData {
  status: 'healthy' | 'degraded' | 'critical';
  api_latency_ms: number;
  fps_global: number;
  gpu_utilization_pct: number;
  active_cameras_count: number;
  total_cameras_count: number;
  open_incidents_count: number;
  uptime_seconds: number;
}
