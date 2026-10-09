export type WebSocketMessageType =
  | 'incident.created'
  | 'incident.updated'
  | 'ai.analysis.completed'
  | 'system.alert';

export interface WebSocketMessage<T = unknown> {
  message_type: WebSocketMessageType;
  timestamp: string;
  payload: T;
}

export type WSConnectionState = 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED' | 'SIMULATED';
