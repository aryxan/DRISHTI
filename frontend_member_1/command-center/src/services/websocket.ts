import type { WebSocketMessage, WSConnectionState } from '../types/websocket';

const WS_BASE = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8000/ws/events';

type MessageHandler = (msg: WebSocketMessage) => void;
type StateHandler = (state: WSConnectionState) => void;

export class CommandCenterWebSocket {
  private socket: WebSocket | null = null;
  private messageListeners: Set<MessageHandler> = new Set();
  private stateListeners: Set<StateHandler> = new Set();
  private reconnectTimer: number | null = null;
  private mockIntervalTimer: number | null = null;
  private state: WSConnectionState = 'CLOSED';
  private manualMockMode: boolean = false;

  constructor() {
    this.connect();
  }

  public connect(): void {
    if (this.manualMockMode) {
      this.startMockStream();
      return;
    }

    this.setState('CONNECTING');
    try {
      this.socket = new WebSocket(WS_BASE);

      this.socket.onopen = () => {
        this.stopMockStream();
        this.setState('OPEN');
      };

      this.socket.onmessage = (event) => {
        try {
          const data: WebSocketMessage = JSON.parse(event.data);
          this.emitMessage(data);
        } catch (err) {
          console.error('[WebSocket] Malformed message received:', err);
        }
      };

      this.socket.onerror = () => {
        this.socket?.close();
      };

      this.socket.onclose = () => {
        this.setState('CLOSED');
        // If live server is down, automatically fallback to mock simulation stream for presentation/dev
        this.startMockStream();
        this.scheduleReconnect();
      };
    } catch {
      this.startMockStream();
      this.scheduleReconnect();
    }
  }

  public setMockMode(enabled: boolean): void {
    this.manualMockMode = enabled;
    if (enabled) {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }
      this.startMockStream();
    } else {
      this.stopMockStream();
      this.connect();
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer) return;
    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null;
      if (!this.manualMockMode && this.state !== 'OPEN') {
        this.connect();
      }
    }, 10000);
  }

  private startMockStream(): void {
    if (this.mockIntervalTimer) return;
    this.setState('MOCK_STREAM');

    // Simulate periodic live telemetry & event notifications
    this.mockIntervalTimer = window.setInterval(() => {
      const types: Array<'camera.status' | 'event.created'> = [
        'camera.status',
        'camera.status',
        'event.created',
      ];
      const selectedType = types[Math.floor(Math.random() * types.length)];

      const cameras = [
        'cam-01-perimeter-north',
        'cam-02-main-gate',
        'cam-03-server-room',
        'cam-04-cargo-bay',
      ];
      const randomCam = cameras[Math.floor(Math.random() * cameras.length)];

      if (selectedType === 'camera.status') {
        const msg: WebSocketMessage = {
          message_type: 'camera.status',
          timestamp: new Date().toISOString(),
          payload: {
            camera_id: randomCam,
            stream_status: 'online',
            fps: Number((28 + Math.random() * 4).toFixed(1)),
            active_track_count: Math.floor(Math.random() * 7),
          },
        };
        this.emitMessage(msg);
      } else if (selectedType === 'event.created') {
        const msg: WebSocketMessage = {
          message_type: 'event.created',
          timestamp: new Date().toISOString(),
          payload: {
            event_id: `evt-${Date.now().toString().slice(-5)}`,
            camera_id: randomCam,
            event_type: 'loitering',
            threat_score: Math.floor(50 + Math.random() * 45),
            severity: Math.random() > 0.5 ? 'high' : 'medium',
          },
        };
        this.emitMessage(msg);
      }
    }, 4500);
  }

  private stopMockStream(): void {
    if (this.mockIntervalTimer) {
      clearInterval(this.mockIntervalTimer);
      this.mockIntervalTimer = null;
    }
  }

  private setState(state: WSConnectionState): void {
    this.state = state;
    this.stateListeners.forEach((fn) => fn(state));
  }

  private emitMessage(msg: WebSocketMessage): void {
    this.messageListeners.forEach((fn) => fn(msg));
  }

  public onMessage(handler: MessageHandler): () => void {
    this.messageListeners.add(handler);
    return () => this.messageListeners.delete(handler);
  }

  public onStateChange(handler: StateHandler): () => void {
    this.stateListeners.add(handler);
    handler(this.state);
    return () => this.stateListeners.delete(handler);
  }

  public getState(): WSConnectionState {
    return this.state;
  }

  public isMockMode(): boolean {
    return this.manualMockMode || this.state === 'MOCK_STREAM';
  }
}

export const wsService = new CommandCenterWebSocket();
