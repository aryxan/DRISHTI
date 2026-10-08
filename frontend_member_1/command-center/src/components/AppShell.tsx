import React, { useState } from 'react';
import { CameraGrid } from './CameraGrid';
import { MapPanel } from './MapPanel';
import { IncidentTable } from './IncidentTable';
import { IncidentPanel } from './IncidentPanel';
import { ThreatSummary } from './ThreatSummary';
import { EventTimeline } from './EventTimeline';
import { AlertToast } from './AlertToast';
import { SystemHealth } from './SystemHealth';
import { EvidenceModal } from './EvidenceModal';
import { LoginModal } from './LoginModal';
import { UserMenu } from './UserMenu';
import { CurrentTime } from './CurrentTime';
import {
  Activity,
  FileText,
  MapPin,
  Radio,
  Radar,
  Settings,
  ShieldAlert,
  SlidersHorizontal,
  Video,
} from 'lucide-react';

export type DashboardView =
  | 'all'
  | 'cameras'
  | 'map'
  | 'incidents'
  | 'threat'
  | 'status'
  | 'management'
  | 'reports'
  | 'settings';

export const AppShell: React.FC = () => {
  const [activeView, setActiveView] = useState<DashboardView>('cameras');
  const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [evidencePreview, setEvidencePreview] = useState<{ uri: string; title: string } | null>(
    null
  );

  const navItems = [
    { id: 'cameras', label: 'Live Cameras', icon: Video },
    { id: 'map', label: 'Map View', icon: MapPin },
    { id: 'incidents', label: 'Active Incidents', icon: ShieldAlert },
    { id: 'threat', label: 'Threat Overview', icon: Radar },
    { id: 'status', label: 'System Status', icon: Activity },
    { id: 'management', label: 'Camera Management', icon: SlidersHorizontal },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-row font-sans selection:bg-slate-300 selection:text-slate-900">
      {/* 1. Left Navigation Sidebar: White & Grey Theme */}
      <aside className="w-60 xl:w-64 bg-slate-200/90 border-r border-slate-300 flex flex-col justify-between p-4 shrink-0 select-none min-h-screen text-slate-700">
        <div className="flex flex-col gap-5">
          {/* Top Logo & Title */}
          <div className="flex items-center gap-2.5 px-1 py-1">
            <div className="p-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 shadow-xs flex items-center justify-center font-bold">
              <Radio className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-wider text-slate-900 font-sans uppercase">
                DRISHTI
              </h1>
              <p className="text-[11px] text-slate-500 font-sans font-medium">
                Command Center
              </p>
            </div>
          </div>

          {/* Sidebar Menu Items */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                activeView === item.id || (item.id === 'cameras' && activeView === 'all');
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-300/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/60'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: System Status */}
        <div className="pt-3 border-t border-slate-300 flex flex-col gap-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-pulse" />
              SYSTEM ONLINE
            </span>
            <span>v1.0.4</span>
          </div>
        </div>
      </aside>

      {/* 2. Main Stage */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar: Clean White & Grey Theme */}
        <header className="px-5 py-3 bg-white/95 border-b border-slate-300 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20 backdrop-blur-xs shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-slate-700 animate-pulse" />
            <div>
              <div className="text-xs font-mono font-bold text-slate-800">
                10. Frontend Portal 1 – Command Center (frontend/command-center)
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Real-time Monitoring & Operational Dashboard
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CurrentTime />
            <UserMenu onOpenLogin={() => setIsLoginModalOpen(true)} />
          </div>
        </header>

        {/* Dynamic View Routing */}
        <main className="p-4 md:p-6 flex-1 flex flex-col gap-4">
          {/* Main Dashboard Layout (Live Cameras Overview + Tactical Side Bar) */}
          {(activeView === 'cameras' || activeView === 'all') && (
            <div className="flex flex-col xl:flex-row gap-4 w-full items-start">
              {/* Primary Content: 2x2 Cameras + Tactical Map + Incidents Table */}
              <div className="flex-1 flex flex-col gap-4 w-full min-w-0">
                {/* Top Row: 2x2 Cameras + Tactical Map */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  {/* Left 7 Cols: 2x2 Camera Monitors */}
                  <div className="lg:col-span-7 xl:col-span-7 min-h-[340px] md:min-h-[380px] flex">
                    <CameraGrid is2x2Mode={true} />
                  </div>

                  {/* Right 5 Cols: Interactive Tactical Map */}
                  <div className="lg:col-span-5 xl:col-span-5 min-h-[340px] md:min-h-[380px] flex">
                    <MapPanel isCompactMap={true} />
                  </div>
                </div>

                {/* Bottom Row: Active Incidents (Live) Table */}
                <div className="w-full">
                  <IncidentTable
                    onSelectIncident={(inc) => {
                      if (inc.evidence_uri) {
                        setEvidencePreview({ uri: inc.evidence_uri, title: inc.title });
                      }
                    }}
                  />
                </div>
              </div>

              {/* Tactical Side Bar: Threat Telemetry & KPI Panel */}
              <aside className="w-full xl:w-72 2xl:w-80 shrink-0 flex flex-col gap-3">
                <div className="bg-white border border-slate-300 rounded-xl p-3.5 shadow-2xs">
                  <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-800 font-mono">
                      <Radar className="w-4 h-4 text-slate-700" />
                      <span>Threat Telemetry</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-700 font-bold">
                      LIVE
                    </span>
                  </div>
                  <ThreatSummary />
                </div>
              </aside>
            </div>
          )}

          {/* Full Map View */}
          {activeView === 'map' && (
            <div className="h-[calc(100vh-120px)] min-h-[600px] w-full">
              <MapPanel isCompactMap={false} />
            </div>
          )}

          {/* Full Incident Queue View */}
          {activeView === 'incidents' && (
            <div className="h-[calc(100vh-120px)] min-h-[600px] max-w-5xl mx-auto w-full">
              <IncidentPanel
                onViewEvidence={(uri, title) => setEvidencePreview({ uri, title })}
              />
            </div>
          )}

          {/* Threat Overview View */}
          {activeView === 'threat' && (
            <div className="max-w-4xl mx-auto w-full flex flex-col gap-5 py-4">
              <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <Radar className="w-5 h-5 text-blue-500" />
                DEFCON Threat Telemetry & Posture
              </h2>
              <ThreatSummary />
              <div className="mt-4">
                <IncidentTable
                  onSelectIncident={(inc) => {
                    if (inc.evidence_uri) {
                      setEvidencePreview({ uri: inc.evidence_uri, title: inc.title });
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* System Status View */}
          {activeView === 'status' && (
            <div className="max-w-4xl mx-auto w-full flex flex-col gap-5 py-4">
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
                <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Live Operational Telemetry
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                    <div className="text-[10px] font-mono text-slate-400">STATUS</div>
                    <div className="text-lg font-black text-emerald-400 font-mono mt-1">HEALTHY</div>
                  </div>
                  <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                    <div className="text-[10px] font-mono text-slate-400">LATENCY</div>
                    <div className="text-lg font-black text-white font-mono mt-1">24 ms</div>
                  </div>
                  <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                    <div className="text-[10px] font-mono text-slate-400">GLOBAL FPS</div>
                    <div className="text-lg font-black text-white font-mono mt-1">29.4</div>
                  </div>
                  <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                    <div className="text-[10px] font-mono text-slate-400">GPU LOAD</div>
                    <div className="text-lg font-black text-blue-400 font-mono mt-1">42%</div>
                  </div>
                </div>
              </div>
              <EventTimeline />
            </div>
          )}

          {/* Camera Management View */}
          {activeView === 'management' && (
            <div className="h-[calc(100vh-120px)] min-h-[600px] w-full">
              <CameraGrid is2x2Mode={false} />
            </div>
          )}

          {/* Reports View */}
          {activeView === 'reports' && (
            <div className="max-w-4xl mx-auto w-full py-4 flex flex-col gap-4">
              <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-500" />
                Operational Incident Reports
              </h2>
              <IncidentTable />
            </div>
          )}

          {/* Settings View */}
          {activeView === 'settings' && (
            <div className="max-w-2xl mx-auto w-full p-6 bg-slate-900 border border-slate-800 rounded-xl my-4">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-slate-400" />
                Command Center Settings
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Configure local CCTV stream pipelines, WebSocket heartbeat intervals, and operator notification thresholds.
              </p>
              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-lg border border-slate-700">
                  <span>Stream Refresh Interval</span>
                  <span className="text-blue-400">30 FPS (Low Latency)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-lg border border-slate-700">
                  <span>WebSocket Gateway</span>
                  <span className="text-emerald-400">ws://localhost:8000/ws</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/60 rounded-lg border border-slate-700">
                  <span>Sound Alerts on DEFCON-1</span>
                  <span className="text-emerald-400">Enabled</span>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Command Center Tactical Footer */}
        <footer className="mt-auto bg-white/95 border-t border-slate-300 px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 font-sans shadow-2xs">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>DEFENSE GRID: OPERATIONAL</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <div className="text-[11px] font-mono text-slate-500">
              SECURITY: <span className="font-semibold text-slate-700">RESTRICTED // LEVEL-4</span>
            </div>
            <span className="text-slate-300 hidden md:inline">|</span>
            <div className="text-[11px] font-mono text-slate-500 hidden md:flex items-center gap-3">
              <span>LATENCY: <strong className="text-slate-800 font-mono">24ms</strong></span>
              <span>GLOBAL FPS: <strong className="text-slate-800 font-mono">29.4</strong></span>
              <span>UPTIME: <strong className="text-emerald-600 font-mono">99.98%</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
            <span>DRISHTI Command Center</span>
            <span className="text-slate-300">•</span>
            <span>v1.0.4</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 font-medium">UTC+05:30</span>
          </div>
        </footer>
      </div>

      {/* Floating Alert Toasts for Real-Time Warnings */}
      <AlertToast />

      {/* Modals */}
      <SystemHealth
        isOpen={isHealthModalOpen}
        onClose={() => setIsHealthModalOpen(false)}
      />
      <EvidenceModal
        evidenceUri={evidencePreview?.uri || null}
        title={evidencePreview?.title || null}
        onClose={() => setEvidencePreview(null)}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};
