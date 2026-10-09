import React, { useState, useEffect, useRef } from 'react';
import { Target, Eye, EyeOff, Navigation, Layers } from 'lucide-react';
import { TrackTrajectory } from '../types/track';
import { useIntelligence } from '../context/IntelligenceContext';

export const TrackTrajectoryOverlay: React.FC = () => {
  const { selectedIncident, tracksByIncident } = useIntelligence();
  const [showBoxes, setShowBoxes] = useState<boolean>(true);
  const [showTrajectories, setShowTrajectories] = useState<boolean>(true);
  const [showPoints, setShowPoints] = useState<boolean>(true);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const tracks: TrackTrajectory[] = selectedIncident
    ? tracksByIncident[selectedIncident.incident_id] || []
    : [];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    tracks.forEach((track) => {
      const isFocused = !selectedTrackId || selectedTrackId === track.track_id;
      const alpha = isFocused ? 1.0 : 0.25;

      // 1. Draw Trajectory Keyframe Path Line
      if (showTrajectories && track.trajectory_points.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = track.color;
        ctx.lineWidth = isFocused ? 3 : 1.5;
        ctx.globalAlpha = alpha;
        ctx.setLineDash([6, 4]);

        track.trajectory_points.forEach((pt, idx) => {
          const px = (pt.x / 100) * width;
          const py = (pt.y / 100) * height;
          if (idx === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 2. Draw Trajectory Points (Keyframe Dots)
      if (showPoints) {
        track.trajectory_points.forEach((pt) => {
          const px = (pt.x / 100) * width;
          const py = (pt.y / 100) * height;

          ctx.beginPath();
          ctx.arc(px, py, isFocused ? 4 : 2, 0, 2 * Math.PI);
          ctx.fillStyle = track.color;
          ctx.globalAlpha = alpha;
          ctx.fill();

          ctx.strokeStyle = '#000';
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      }

      // 3. Draw Target Bounding Box
      if (showBoxes) {
        const box = track.bounding_box;
        const bx = (box.x / 100) * width;
        const by = (box.y / 100) * height;
        const bw = (box.width / 100) * width;
        const bh = (box.height / 100) * height;

        ctx.strokeStyle = track.color;
        ctx.lineWidth = isFocused ? 2 : 1;
        ctx.globalAlpha = alpha;
        ctx.strokeRect(bx, by, bw, bh);

        const cornerLen = 6;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(bx, by + cornerLen);
        ctx.lineTo(bx, by);
        ctx.lineTo(bx + cornerLen, by);
        ctx.stroke();

        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.fillRect(bx, Math.max(by - 18, 0), Math.max(bw, 90), 16);

        ctx.font = 'bold 9px "JetBrains Mono", monospace';
        ctx.fillStyle = track.color;
        ctx.globalAlpha = 1.0;
        ctx.fillText(`${track.track_id} [${track.object_type.toUpperCase()}]`, bx + 4, Math.max(by - 6, 11));
      }
    });
  }, [tracks, showBoxes, showTrajectories, showPoints, selectedTrackId]);

  if (!selectedIncident) return null;

  return (
    <div className="bg-white border border-slate-300 rounded-xl p-3 flex flex-col gap-2 shadow-2xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-slate-600" />
          <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
            TRACK TRAJECTORY OVERLAY &amp; SPATIAL PATTERNS ({tracks.length} TARGETS)
          </span>
        </div>

        {/* Overlay Layers Controls */}
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <button
            onClick={() => setShowBoxes(!showBoxes)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded border transition ${
              showBoxes
                ? 'bg-slate-800 border-slate-600 text-white'
                : 'bg-slate-100 border-slate-300 text-slate-500'
            }`}
          >
            {showBoxes ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            <span>BOUNDING BOXES</span>
          </button>

          <button
            onClick={() => setShowTrajectories(!showTrajectories)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded border transition ${
              showTrajectories
                ? 'bg-slate-800 border-slate-600 text-white'
                : 'bg-slate-100 border-slate-300 text-slate-500'
            }`}
          >
            <Navigation className="h-3 w-3" />
            <span>TRAJECTORIES</span>
          </button>

          <button
            onClick={() => setShowPoints(!showPoints)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded border transition ${
              showPoints
                ? 'bg-slate-800 border-slate-600 text-white'
                : 'bg-slate-100 border-slate-300 text-slate-500'
            }`}
          >
            <Layers className="h-3 w-3" />
            <span>KEYFRAMES</span>
          </button>
        </div>
      </div>

      {/* Spatial Radar Canvas Overlay Box */}
      <div className="relative w-full h-[220px] bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
        {/* Simulated CCTV Background Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
        <div className="absolute top-2 left-2 font-mono text-[10px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
          CAM: {selectedIncident.camera_id} • 1920x1080 • 30 FPS
        </div>

        {/* HTML5 Canvas overlay */}
        <canvas
          ref={canvasRef}
          width={640}
          height={220}
          className="w-full h-full relative z-10"
        />
      </div>

      {/* Target Track List Selector */}
      {tracks.length > 0 && (
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase">SELECT TRACK:</span>
          <button
            onClick={() => setSelectedTrackId(null)}
            className={`px-2 py-0.5 rounded text-[10px] font-mono transition border ${
              !selectedTrackId
                ? 'bg-slate-800 border-slate-600 text-white'
                : 'bg-slate-100 border-slate-300 text-slate-500'
            }`}
          >
            ALL TARGETS
          </button>
          {tracks.map((t) => (
            <button
              key={t.track_id}
              onClick={() => setSelectedTrackId(t.track_id)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition border flex items-center gap-1 ${
                selectedTrackId === t.track_id
                  ? 'bg-slate-800 border-slate-600 text-white'
                  : 'bg-slate-100 border-slate-300 text-slate-500'
              }`}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: t.color }} />
              <span>{t.track_id}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
