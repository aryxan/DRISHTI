import React from 'react';
import type { CameraCardData } from '../types/camera';
import { Camera, Eye, AlertCircle, Maximize2, Zap } from 'lucide-react';

interface CameraCardProps {
  camera: CameraCardData;
  isSelected?: boolean;
  onSelect?: (camera: CameraCardData) => void;
  onFocus?: (camera: CameraCardData) => void;
}

export const CameraCard: React.FC<CameraCardProps> = ({
  camera,
  isSelected = false,
  onSelect,
  onFocus,
}) => {
  const getStatusBadge = () => {
    switch (camera.stream_status) {
      case 'online':
        return (
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
        );
      case 'degraded':
        return (
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-amber-950/80 text-amber-400 border border-amber-800/80">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            DEGRADED
          </span>
        );
      case 'offline':
      default:
        return (
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-rose-950/80 text-rose-400 border border-rose-800/80">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            OFFLINE
          </span>
        );
    }
  };

  const formattedEventTime = new Date(camera.latest_event_time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return (
    <div
      onClick={() => onSelect?.(camera)}
      className={`group relative bg-[#0f172a] border rounded-xl overflow-hidden transition-all duration-200 cursor-pointer flex flex-col ${
        isSelected
          ? 'border-cyan-400 ring-2 ring-cyan-500/30 shadow-xl shadow-cyan-950/50'
          : 'border-slate-800 hover:border-slate-700 shadow-md'
      }`}
    >
      {/* Video Viewport Area */}
      <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
        {camera.stream_status !== 'offline' ? (
          <>
            <img
              src={camera.thumbnail_url}
              alt={camera.camera_name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
            />
            {/* Tactical Camera Grid & Scanline */}
            <div className="absolute inset-0 pointer-events-none camera-scanline" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40 pointer-events-none" />

            {/* Simulated AI Object Detection Bounding Boxes if active tracks exist */}
            {camera.active_track_count > 0 && (
              <div className="absolute inset-0 pointer-events-none p-4 flex items-center justify-center">
                <div className="w-24 h-36 border-2 border-dashed border-cyan-400/80 rounded bg-cyan-500/10 relative animate-pulse">
                  <span className="absolute -top-5 left-0 px-1 py-0.2 bg-cyan-900/90 text-cyan-300 font-mono text-[9px] rounded border border-cyan-700">
                    TRACK #{camera.active_track_count} (YOLOv8)
                  </span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-600 gap-2">
            <AlertCircle className="w-8 h-8 text-rose-500/70" />
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400/80">
              NO SIGNAL / STREAM OFFLINE
            </span>
            <span className="text-[10px] text-slate-500">{camera.stream_url}</span>
          </div>
        )}

        {/* Viewport Top Overlay: Name & Stream Status */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-950/80 backdrop-blur border border-slate-800 rounded text-xs font-mono text-slate-200">
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold truncate max-w-[140px]">{camera.camera_id}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {getStatusBadge()}
            {onFocus && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFocus(camera);
                }}
                className="p-1 bg-slate-950/80 hover:bg-cyan-950/80 text-slate-400 hover:text-cyan-300 border border-slate-800 rounded transition-colors"
                title="Spotlight Camera"
              >
                <Maximize2 className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Viewport Bottom Overlay: Live Telemetry (FPS, Resolution, Tracks) */}
        <div className="absolute bottom-2 inset-x-2.5 flex items-center justify-between text-[10px] font-mono text-slate-300 z-10">
          <div className="flex items-center gap-2 px-1.5 py-0.5 bg-black/70 backdrop-blur rounded border border-slate-800">
            <span className="text-emerald-400 font-semibold">{camera.fps.toFixed(1)} FPS</span>
            <span className="text-slate-500">|</span>
            <span>
              {camera.resolution_width}x{camera.resolution_height}
            </span>
          </div>

          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-black/70 backdrop-blur rounded border border-slate-800">
            <Eye className="w-3 h-3 text-cyan-400" />
            <span className="text-cyan-300 font-bold">{camera.active_track_count}</span>
            <span className="text-slate-400 text-[9px]">TRACKS</span>
          </div>
        </div>
      </div>

      {/* Card Metadata Footer */}
      <div className="p-3 bg-[#0d1322] border-t border-slate-800/80 flex flex-col gap-1.5 flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold text-slate-200 truncate group-hover:text-cyan-300 transition-colors">
              {camera.camera_name}
            </h4>
          </div>
          <div className="text-[11px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600 inline-block" />
            {camera.location_name}
          </div>
        </div>

        {/* Latest Event Pill */}
        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-1 text-slate-400 font-mono">
            <Zap className="w-3 h-3 text-amber-400" />
            <span className="text-slate-300 capitalize">
              {camera.latest_event_type.replace('_', ' ')}
            </span>
          </div>
          <span className="text-slate-500 font-mono">{formattedEventTime}</span>
        </div>
      </div>
    </div>
  );
};
