import React, { useState } from 'react';
import { useCommandCenter } from '../context/CommandCenterContext';
import type { CameraCardData } from '../types/camera';
import type { IncidentCardData } from '../types/incident';
import {
  Camera,
  Compass,
  Layers,
  Navigation,
  ShieldAlert,
} from 'lucide-react';

export const MapPanel: React.FC = () => {
  const { cameras, incidents, selectedCamera, setSelectedCamera, setSelectedIncident } =
    useCommandCenter();

  const [showZones, setShowZones] = useState(true);
  const [showIncidents, setShowIncidents] = useState(true);
  const [activeTooltip, setActiveTooltip] = useState<{
    camera?: CameraCardData;
    incident?: IncidentCardData;
    x: number;
    y: number;
  } | null>(null);

  // Map coordinates relative positions normalized to percentage grid
  const cameraCoordinates: Record<string, { x: number; y: number }> = {
    'cam-01-perimeter-north': { x: 35, y: 18 },
    'cam-02-main-gate': { x: 75, y: 72 },
    'cam-03-server-room': { x: 52, y: 48 },
    'cam-04-cargo-bay': { x: 22, y: 68 },
    'cam-05-rooftop-helipad': { x: 68, y: 28 },
    'cam-06-substation-west': { x: 15, y: 40 },
  };

  const zones = [
    { name: 'ZONE ALPHA (NORTH PERIMETER)', x: 18, y: 10, w: 42, h: 22, color: 'border-red-400/50 bg-red-500/5' },
    { name: 'ZONE BRAVO (SERVER VAULT)', x: 42, y: 38, w: 26, h: 26, color: 'border-amber-400/50 bg-amber-500/5' },
    { name: 'ZONE CHARLIE (MAIN GATE / ACCESS)', x: 62, y: 60, w: 32, h: 30, color: 'border-blue-400/50 bg-blue-500/5' },
    { name: 'ZONE DELTA (LOGISTICS YARD)', x: 8, y: 55, w: 30, h: 35, color: 'border-emerald-400/50 bg-emerald-500/5' },
  ];

  return (
    <div className="flex flex-col h-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs relative">
      {/* Header bar */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-slate-700 rotate-45" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider font-mono">
            Tactical GIS Map & Spatial Radar
          </h3>
        </div>

        {/* Layer Toggles */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setShowZones(!showZones)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
              showZones
                ? 'bg-slate-900 text-white border-slate-900 shadow-2xs font-semibold'
                : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            ZONES
          </button>
          <button
            onClick={() => setShowIncidents(!showIncidents)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
              showIncidents
                ? 'bg-red-700 text-white border-red-700 shadow-2xs font-semibold'
                : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            INCIDENTS ({incidents.filter((i) => i.status === 'open').length})
          </button>
        </div>
      </div>

      {/* Map Graphic Stage */}
      <div className="relative flex-1 min-h-[360px] bg-slate-100/80 overflow-hidden select-none">
        {/* Tactical Grid Background */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Circular Radar Sweep Effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-[500px] h-[500px] rounded-full border border-slate-300 flex items-center justify-center">
            <div className="w-[350px] h-[350px] rounded-full border border-slate-300 flex items-center justify-center">
              <div className="w-[200px] h-[200px] rounded-full border border-slate-300" />
            </div>
          </div>
        </div>

        {/* Sector Zones Overlay */}
        {showZones &&
          zones.map((zone, idx) => (
            <div
              key={idx}
              className={`absolute border border-dashed rounded-lg flex items-start p-2 pointer-events-none transition-all ${zone.color}`}
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                width: `${zone.w}%`,
                height: `${zone.h}%`,
              }}
            >
              <span className="text-[9px] font-mono tracking-wider text-slate-700 font-bold bg-white/95 px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">
                {zone.name}
              </span>
            </div>
          ))}

        {/* Render Camera Markers */}
        {cameras.map((camera) => {
          const coords = cameraCoordinates[camera.camera_id] || { x: 50, y: 50 };
          const activeIncident = incidents.find(
            (i) => i.camera_id === camera.camera_id && i.status !== 'resolved'
          );
          const isSelected = selectedCamera?.camera_id === camera.camera_id;

          const getStatusDotColor = () => {
            if (camera.stream_status === 'online') return 'bg-emerald-500 border-white';
            if (camera.stream_status === 'degraded') return 'bg-amber-500 border-white';
            return 'bg-red-500 border-white';
          };

          return (
            <div
              key={camera.camera_id}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
              onClick={() => {
                setSelectedCamera(camera);
                if (activeIncident) setSelectedIncident(activeIncident);
              }}
              onMouseEnter={() =>
                setActiveTooltip({
                  camera,
                  incident: activeIncident,
                  x: coords.x,
                  y: coords.y,
                })
              }
              onMouseLeave={() => setActiveTooltip(null)}
            >
              {/* Radar Ping animation if an incident is active at this camera */}
              {showIncidents && activeIncident && (
                <div className="absolute -inset-3 rounded-full bg-red-500/30 radar-ping pointer-events-none" />
              )}

              {/* Marker Icon */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-125 border shadow-2xs ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-110'
                    : activeIncident
                    ? 'bg-red-600 text-white border-red-700 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-slate-800'
                }`}
              >
                <Camera className="w-4 h-4" />
                {/* Status Dot */}
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border ${getStatusDotColor()}`}
                />
              </div>

              {/* Camera Name Tag */}
              <div className="mt-1 px-1.5 py-0.5 bg-white/95 border border-slate-200 rounded text-[9px] font-mono text-slate-700 font-bold whitespace-nowrap shadow-2xs text-center">
                {camera.camera_id.split('-')[0].toUpperCase()}
              </div>
            </div>
          );
        })}

        {/* Hover Tooltip Overlay */}
        {activeTooltip && activeTooltip.camera && (
          <div
            className="absolute z-30 pointer-events-none bg-white border border-slate-200 rounded-xl p-3 shadow-xl text-xs w-60 -translate-x-1/2 -translate-y-full mb-3 text-slate-800"
            style={{
              left: `${Math.min(Math.max(activeTooltip.x, 15), 85)}%`,
              top: `${Math.max(activeTooltip.y - 4, 15)}%`,
            }}
          >
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>{activeTooltip.camera.camera_name}</span>
              <span className="text-[10px] uppercase font-mono text-slate-500 font-semibold">
                {activeTooltip.camera.stream_status}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {activeTooltip.camera.location_name}
            </div>
            <div className="mt-2 pt-1.5 border-t border-slate-100 text-[10px] font-mono flex items-center justify-between text-slate-700">
              <span className="font-medium">{activeTooltip.camera.fps} FPS</span>
              <span className="text-slate-900 font-bold">{activeTooltip.camera.active_track_count} ACTIVE TRACKS</span>
            </div>
            {activeTooltip.incident && (
              <div className="mt-1.5 pt-1.5 border-t border-red-100 text-red-700 font-mono text-[10px] flex items-center gap-1 font-semibold">
                <ShieldAlert className="w-3 h-3 text-red-600" />
                <span>INCIDENT: {activeTooltip.incident.title}</span>
              </div>
            )}
          </div>
        )}

        {/* Compass Rose */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-white/90 border border-slate-200 rounded-lg font-mono text-[10px] text-slate-600 shadow-2xs font-medium">
          <Compass className="w-3.5 h-3.5 text-slate-500" />
          <span>NORTH 000°</span>
        </div>
      </div>
    </div>
  );
};
