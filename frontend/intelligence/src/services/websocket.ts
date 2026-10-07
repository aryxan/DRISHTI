import { WebSocketMessage, WebSocketMessageType, WSConnectionState } from '../types/websocket';

const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8000/ws/events';

type MessageHandler = (message: WebSocketMessage) => void;
type ConnectionStateListener = (state: WSConnectionState) => void;

export class IntelligenceWebSocketService {
  private socket: WebSocket | null = null;
  private messageListeners: Map<WebSocketMessageType | '*', Set<MessageHandler>> = new Map();
  private stateListeners: Set<ConnectionStateListener> = new Set();
  private state: WSConnectionState = 'CLOSED';
  private reconnectTimer: number | null = null;
  private isSimulated: boolean = true;

  constructor(isSimulated: boolean = true) {
    this.isSimulated = isSimulated;
    if (isSimulated) {
      this.setState('SIMULATED');
    }
  }

  public setSimulatedMode(enabled: boolean): void {
    this.isSimulated = enabled;
    if (enabled) {
      this.disconnect();
      this.setState('SIMULATED');
    } else {
      this.connect();
    }
  }

  public isSimulatedMode(): boolean {
    return this.isSimulated;
  }

  public getState(): WSConnectionState {
    return this.state;
  }

  public connect(): void {
    if (this.isSimulated) {
      this.setState('SIMULATED');
      return;
    }

    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      return;
    }

    this.setState('CONNECTING');

    try {
      this.socket = new WebSocket(WS_BASE_URL);

      this.socket.onopen = () => {
        this.setState('OPEN');
        if (this.reconnectTimer) {
          window.clearTimeout(this.reconnectTimer);
          this.reconnectTimer = null;
        }
      };

      this.socket.onmessage = (event) => {
        try {
          const parsed: WebSocketMessage = JSON.parse(event.data);
          this.dispatchMessage(parsed);
        } catch (e) {
          console.error('Failed to parse WebSocket message:', e);
        }
      };

      this.socket.onerror = (err) => {
        console.warn('WebSocket error:', err);
      };

      this.socket.onclose = () => {
        this.setState('CLOSED');
        this.scheduleReconnect();
      };
    } catch (e) {
      console.error('WebSocket connection failed:', e);
      this.setState('CLOSED');
      this.scheduleReconnect();
    }
  }

  public disconnect(): void {
    if (this.reconnectTimer) {
      window.clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.setState(this.isSimulated ? 'SIMULATED' : 'CLOSED');
  }

  public onMessage(type: WebSocketMessageType | '*', handler: MessageHandler): () => void {
    if (!this.messageListeners.has(type)) {
      this.messageListeners.set(type, new Set());
    }
    this.messageListeners.get(type)!.add(handler);

    return () => {
      const set = this.messageListeners.get(type);
      if (set) {
        set.delete(handler);
      }
    };
  }

  public onStateChange(listener: ConnectionStateListener): () => void {
    this.stateListeners.add(listener);
    listener(this.state);
    return () => {
      this.stateListeners.delete(listener);
    };
  }

  /**
   * Helper to manually broadcast a message (useful for mock trigger buttons & testing)
   */
  public dispatchMessage(message: WebSocketMessage): void {
    const specific = this.messageListeners.get(message.message_type);
    if (specific) {
      specific.forEach((fn) => fn(message));
    }
    const wildcard = this.messageListeners.get('*');
    if (wildcard) {
      wildcard.forEach((fn) => fn(message));
    }
  }

  private setState(newState: WSConnectionState): void {
    this.state = newState;
    this.stateListeners.forEach((fn) => fn(newState));
  }

  private scheduleReconnect(): void {
    if (this.isSimulated) return;
    if (!this.reconnectTimer) {
      this.reconnectTimer = window.setTimeout(() => {
        this.reconnectTimer = null;
        this.connect();
      }, 5000);
    }
  }
}

export const wsService = new IntelligenceWebSocketService(true);
