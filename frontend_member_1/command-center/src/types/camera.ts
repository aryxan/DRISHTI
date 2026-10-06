export type StreamStatus = 'online' | 'offline' | 'degraded';

export interface CameraCardData {
  camera_id: string;
  camera_name: string;
  location_name: string;
  stream_status: StreamStatus;
  fps: number;
  resolution_width: number;
  resolution_height: number;
  active_track_count: number;
  latest_event_type: string;
  latest_event_time: string;
  thumbnail_url: string;
  stream_url: string;
  // Spatial coordinates for MapPanel integration
  latitude?: number;
  longitude?: number;
}
