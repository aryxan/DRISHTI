export interface TrajectoryPoint {
  x: number;
  y: number;
  timestamp: string;
  speed_px_s?: number;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type TrackObjectType = 'person' | 'vehicle' | 'drone' | 'unattended_bag';
export type TrackStatus = 'active' | 'lost' | 'coalesced';

export interface TrackTrajectory {
  track_id: string;
  object_type: TrackObjectType;
  bounding_box: BoundingBox;
  trajectory_points: TrajectoryPoint[];
  color: string;
  status: TrackStatus;
}
