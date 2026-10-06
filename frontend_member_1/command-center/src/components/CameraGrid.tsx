import React, { useState } from 'react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { CameraCard } from './CameraCard';
import type { CameraCardData } from '../types/camera';
import { Minimize2, Video } from 'lucide-react';

interface CameraGridProps {
  is2x2Mode?: boolean;
}

export const CameraGrid: React.FC<CameraGridProps> = ({ is2x2Mode = false }) => {
  const { cameras, selectedCamera, setSelectedCamera } = useCommandCenter();
  const [filter, setFilter] = useState<'all' | 'online' | 'attention'>('all');
  const [spotlightCamera, setSpotlightCamera] = useState<CameraCardData | null>(null);

  if (is2x2Mode) {
    const top4 = cameras.slice(0, 4);
    return (
      <div className="grid grid-cols-2 gap-2.5 w-full h-full">
        {top4.map((cam) => {
          const isSelected = selectedCamera?.camera_id === cam.camera_id;
          return (
            <div
              key={cam.camera_id}
              onClick={() => setSelectedCamera(cam)}
              className={`relative aspect-video rounded-lg overflow-hidden bg-slate-950 border transition-all cursor-pointer group shadow-xs ${
                isSelected
                  ? 'border-slate-900 ring-2 ring-slate-900/30'
                  : 'border-slate-300 hover:border-slate-400'
              }`}
            >
              <img
                src={cam.thumbnail_url}
                alt={cam.camera_name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80';
                }}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Exact reference overlay: CAM-01 Live */}
              <div className="absolute bottom-2 left-2.5 flex items-center gap-2 z-10 select-none">
                <span className="text-xs font-mono font-bold text-white tracking-wide drop-shadow-sm">
                  {cam.camera_id}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Live
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const filteredCameras = cameras.filter((cam) => {
    if (filter === 'online') return cam.stream_status === 'online';
    if (filter === 'attention') return cam.stream_status !== 'online' || cam.active_track_count > 0;
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-slate-100/60 border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      {/* Header bar for Camera Wall */}
      <div className="px-4 py-3 bg-slate-200/50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Video className="w-4 h-4 text-slate-700" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider font-mono">
            Live Camera Matrix ({filteredCameras.length}/{cameras.length})
          </h3>
        </div>

        {/* View and filter controls */}
        <div className="flex items-center gap-2">
          {spotlightCamera && (
            <button
              onClick={() => setSpotlightCamera(null)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 border border-slate-300 transition-colors font-medium cursor-pointer"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              Exit Spotlight
            </button>
          )}

          <div className="flex items-center bg-slate-200/70 border border-slate-300 rounded-lg p-0.5 text-xs font-mono">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-slate-900 font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setFilter('online')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filter === 'online'
                  ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ONLINE
            </button>
            <button
              onClick={() => setFilter('attention')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                filter === 'attention'
                  ? 'bg-amber-600 text-white font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ACTIVE EVENTS
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="p-4 flex-1 overflow-y-auto">
        {spotlightCamera ? (
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <CameraCard
                camera={spotlightCamera}
                isSelected={true}
                onSelect={(cam) => setSelectedCamera(cam)}
                onFocus={() => setSpotlightCamera(null)}
              />
            </div>
            <div className="border-t border-slate-200 pt-3">
              <h4 className="text-xs font-mono uppercase text-slate-500 mb-2">
                Secondary Feeds
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {cameras
                  .filter((c) => c.camera_id !== spotlightCamera.camera_id)
                  .map((cam) => (
                    <CameraCard
                      key={cam.camera_id}
                      camera={cam}
                      isSelected={selectedCamera?.camera_id === cam.camera_id}
                      onSelect={(c) => setSelectedCamera(c)}
                      onFocus={(c) => setSpotlightCamera(c)}
                    />
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredCameras.map((cam) => (
              <CameraCard
                key={cam.camera_id}
                camera={cam}
                isSelected={selectedCamera?.camera_id === cam.camera_id}
                onSelect={(c) => setSelectedCamera(c)}
                onFocus={(c) => setSpotlightCamera(c)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
