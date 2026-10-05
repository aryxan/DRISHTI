import React, { useState } from 'react';
import { TopBar } from './TopBar';
import { ThreatSummary } from './ThreatSummary';
import { CameraGrid } from './CameraGrid';
import { MapPanel } from './MapPanel';
import { IncidentPanel } from './IncidentPanel';
import { EventTimeline } from './EventTimeline';
import { AlertToast } from './AlertToast';
import { SystemHealth } from './SystemHealth';
import { EvidenceModal } from './EvidenceModal';
import { LoginModal } from './LoginModal';
import { useAuth } from '../context/AuthContext';
import {
  Activity,
  Compass,
  Grid,
  LayoutDashboard,
  ShieldAlert,
  Clock,
  LogIn,
} from 'lucide-react';

export type DashboardView = 'all' | 'cameras' | 'map' | 'incidents' | 'timeline';

export const AppShell: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeView, setActiveView] = useState<DashboardView>('all');
  const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [evidencePreview, setEvidencePreview] = useState<{ uri: string; title: string } | null>(
    null
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-slate-200 selection:text-slate-900">
      {/* Top Bar with SystemStatus, CurrentTime, and UserMenu */}
      <TopBar onOpenHealthModal={() => setIsHealthModalOpen(true)} />

      {/* Secondary Tactical Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 px-4 md:px-6 py-2.5 flex items-center justify-between gap-3 overflow-x-auto select-none shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setActiveView('all')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
              activeView === 'all'
                ? 'bg-slate-900 border-slate-900 text-white font-semibold shadow-xs'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>COMMAND WALL</span>
          </button>

          <button
            onClick={() => setActiveView('cameras')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
              activeView === 'cameras'
                ? 'bg-slate-900 border-slate-900 text-white font-semibold shadow-xs'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>CAMERA MATRIX</span>
          </button>

          <button
            onClick={() => setActiveView('map')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
              activeView === 'map'
                ? 'bg-slate-900 border-slate-900 text-white font-semibold shadow-xs'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>TACTICAL MAP</span>
          </button>

          <button
            onClick={() => setActiveView('incidents')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
              activeView === 'incidents'
                ? 'bg-slate-900 border-slate-900 text-white font-semibold shadow-xs'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
            <span>INCIDENT QUEUE</span>
          </button>

          <button
            onClick={() => setActiveView('timeline')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
              activeView === 'timeline'
                ? 'bg-slate-900 border-slate-900 text-white font-semibold shadow-xs'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>EVENT TIMELINE</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-semibold shadow-xs cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign In
            </button>
          ) : (
            <button
              onClick={() => setIsHealthModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors shadow-2xs cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5 text-slate-600" />
              Diagnostics
            </button>
          )}
        </div>
      </nav>

      {/* Main Dashboard Stage */}
      <main className="flex-1 p-4 md:p-6 flex flex-col gap-5 overflow-y-auto">
        {/* Threat Summary Banner */}
        <ThreatSummary />

        {/* View Routing */}
        {activeView === 'all' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-start">
            {/* Left 8 Cols: Camera Matrix + Map */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              <div className="min-h-[480px]">
                <CameraGrid />
              </div>
              <div className="h-[420px]">
                <MapPanel />
              </div>
            </div>

            {/* Right 4 Cols: Incidents Queue + Event Timeline */}
            <div className="lg:col-span-4 flex flex-col gap-5">
              <div className="h-[480px]">
                <IncidentPanel
                  onViewEvidence={(uri, title) => setEvidencePreview({ uri, title })}
                />
              </div>
              <div className="h-[420px]">
                <EventTimeline />
              </div>
            </div>
          </div>
        )}

        {activeView === 'cameras' && (
          <div className="h-[calc(100vh-210px)] min-h-[600px]">
            <CameraGrid />
          </div>
        )}

        {activeView === 'map' && (
          <div className="h-[calc(100vh-210px)] min-h-[600px]">
            <MapPanel />
          </div>
        )}

        {activeView === 'incidents' && (
          <div className="h-[calc(100vh-210px)] min-h-[600px] max-w-4xl mx-auto w-full">
            <IncidentPanel
              onViewEvidence={(uri, title) => setEvidencePreview({ uri, title })}
            />
          </div>
        )}

        {activeView === 'timeline' && (
          <div className="h-[calc(100vh-210px)] min-h-[600px] max-w-3xl mx-auto w-full">
            <EventTimeline />
          </div>
        )}
      </main>

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
