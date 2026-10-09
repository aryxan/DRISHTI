import { TrackTrajectory } from '../types/track';

export const mockTracksByIncident: Record<string, TrackTrajectory[]> = {
  "inc-1042": [
    {
      track_id: "TRK-1042-A",
      object_type: "person",
      bounding_box: { x: 18, y: 35, width: 12, height: 28 },
      color: "#ef4444", // Red for intruder
      status: "active",
      trajectory_points: [
        { x: 5, y: 80, timestamp: "2026-10-06T02:13:00Z", speed_px_s: 4.2 },
        { x: 10, y: 65, timestamp: "2026-10-06T02:13:10Z", speed_px_s: 3.8 },
        { x: 15, y: 48, timestamp: "2026-10-06T02:13:20Z", speed_px_s: 2.1 },
        { x: 18, y: 35, timestamp: "2026-10-06T02:13:30Z", speed_px_s: 0.8 }
      ]
    },
    {
      track_id: "TRK-1042-B",
      object_type: "unattended_bag",
      bounding_box: { x: 42, y: 68, width: 8, height: 10 },
      color: "#f59e0b", // Amber for dropped package
      status: "active",
      trajectory_points: [
        { x: 42, y: 68, timestamp: "2026-10-06T02:13:20Z", speed_px_s: 0.0 }
      ]
    }
  ],
  "inc-1041": [
    {
      track_id: "TRK-1041-V1",
      object_type: "vehicle",
      bounding_box: { x: 30, y: 40, width: 35, height: 30 },
      color: "#06b6d4",
      status: "active",
      trajectory_points: [
        { x: 10, y: 40, timestamp: "2026-10-06T01:50:00Z", speed_px_s: 12.0 },
        { x: 30, y: 40, timestamp: "2026-10-06T01:52:00Z", speed_px_s: 0.0 }
      ]
    }
  ],
  "inc-1040": [
    {
      track_id: "TRK-1040-CROWD-1",
      object_type: "person",
      bounding_box: { x: 25, y: 20, width: 50, height: 55 },
      color: "#a855f7",
      status: "active",
      trajectory_points: [
        { x: 20, y: 10, timestamp: "2026-10-06T01:28:00Z", speed_px_s: 6.5 },
        { x: 25, y: 20, timestamp: "2026-10-06T01:30:00Z", speed_px_s: 1.2 }
      ]
    }
  ]
};
