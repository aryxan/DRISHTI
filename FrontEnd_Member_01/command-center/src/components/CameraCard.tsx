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
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            LIVE
          </span>
        );
      case 'degraded':
        return (
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-50 text-amber-800 border border-amber-300 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            DEGRADED
          </span>
        );
      case 'offline':
      default:
        return (
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-red-50 text-red-800 border border-red-300 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
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
      className={`group relative bg-slate-100 border rounded-xl overflow-hidden transition-all duration-200 cursor-pointer flex flex-col shadow-xs ${
        isSelected
          ? 'border-slate-900 ring-2 ring-slate-900/25 shadow-md bg-slate-200/80'
          : 'border-slate-200/90 hover:border-slate-300 hover:bg-slate-100/80 hover:shadow-sm'
      }`}
    >
      {/* Video Viewport Area */}
      <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
        {camera.stream_status !== 'offline' ? (
          <>
            <img
              src={camera.thumbnail_url}
              alt={camera.camera_name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

            {/* Simulated Object Detection Bounding Boxes if active tracks exist */}
            {camera.active_track_count > 0 && (
              <div className="absolute inset-0 pointer-events-none p-4 flex items-center justify-center">
                <div className="w-24 h-36 border-2 border-dashed border-red-500 rounded bg-red-500/10 relative animate-pulse">
                  <span className="absolute -top-5 left-0 px-1.5 py-0.5 bg-red-600 text-white font-mono text-[9px] rounded font-bold">
                    TRACK #{camera.active_track_count}
                  </span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400 gap-2">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold">
              NO SIGNAL / STREAM OFFLINE
            </span>
            <span className="text-[10px] text-slate-500">{camera.stream_url}</span>
          </div>
        )}

        {/* Viewport Top Overlay: Name & Stream Status */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/75 backdrop-blur-xs border border-white/20 rounded-md text-xs font-mono text-white">
            <Camera className="w-3.5 h-3.5 text-slate-300" />
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
                className="p-1 bg-black/75 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 rounded-md transition-colors cursor-pointer"
                title="Spotlight Camera"
              >
                <Maximize2 className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Viewport Bottom Overlay: Live Telemetry (FPS, Resolution, Tracks) */}
        <div className="absolute bottom-2 inset-x-2.5 flex items-center justify-between text-[10px] font-mono text-slate-200 z-10">
          <div className="flex items-center gap-2 px-2 py-0.5 bg-black/75 backdrop-blur-xs rounded-md border border-white/20">
            <span className="text-emerald-400 font-semibold">{camera.fps.toFixed(1)} FPS</span>
            <span className="text-slate-400">|</span>
            <span>
              {camera.resolution_width}x{camera.resolution_height}
            </span>
          </div>

          <div className="flex items-center gap-1 px-2 py-0.5 bg-black/75 backdrop-blur-xs rounded-md border border-white/20">
            <Eye className="w-3 h-3 text-slate-300" />
            <span className="text-white font-bold">{camera.active_track_count}</span>
            <span className="text-slate-300 text-[9px]">TRACKS</span>
          </div>
        </div>
      </div>

      {/* Card Metadata Footer */}
      <div className="p-3.5 bg-slate-100 border-t border-slate-200 flex flex-col gap-1.5 flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-slate-700 transition-colors">
              {camera.camera_name}
            </h4>
          </div>
          <div className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
            {camera.location_name}
          </div>
        </div>

        {/* Latest Event Pill */}
        <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-1 text-slate-600 font-mono">
            <Zap className="w-3 h-3 text-amber-600" />
            <span className="text-slate-700 capitalize font-medium">
              {camera.latest_event_type.replace('_', ' ')}
            </span>
          </div>
          <span className="text-slate-500 font-mono">{formattedEventTime}</span>
        </div>
      </div>
    </div>
  );
};
