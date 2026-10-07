import React, { useState } from 'react';
import { Shield, Sparkles, Clock, MapPin, Video } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';
import { StatusControls } from './StatusControls';
import { SidebarNav, NavTab } from './SidebarNav';
import { AISummaryCard } from './AISummaryCard';
import { ThreatScoreExplanation } from './ThreatScoreExplanation';
import { ReasonCodeChips } from './ReasonCodeChips';
import { TrackTrajectoryOverlay } from './TrackTrajectoryOverlay';
import { EvidencePreview } from './EvidencePreview';
import { TimelineView } from './TimelineView';
import { OSINTContextCards } from './OSINTContextCards';
import { StaleAnalysisBanner, LoadingSkeleton, ErrorBanner } from './StateIndicators';

export const IncidentDetailPanel: React.FC = () => {
  const { selectedIncident, isLoading, error, isDetailLoading } = useIntelligence();
  const [activeTab, setActiveTab] = useState<NavTab>('overview');

  if (isLoading) return <LoadingSkeleton />;

  if (error) return <ErrorBanner message={error} />;

  if (!selectedIncident) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-12 text-center text-slate-500 font-mono text-sm">
        Select an incident from the queue to inspect AI threat intelligence.
      </div>
    );
  }

  const isCritical = selectedIncident.severity === 'critical';
  const isHigh = selectedIncident.severity === 'high';

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Master Incident Header Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-start gap-3">
          <div
            className={`p-2.5 rounded-xl border font-mono flex flex-col items-center justify-center shrink-0 ${
              selectedIncident.threat_score >= 80
                ? 'bg-rose-950 border-rose-500 text-rose-300'
                : selectedIncident.threat_score >= 60
                ? 'bg-amber-950 border-amber-500 text-amber-300'
                : 'bg-cyan-950 border-cyan-500 text-cyan-300'
            }`}
          >
            <Shield className="h-6 w-6 mb-0.5" />
            <span className="text-[10px] font-bold">THREAT</span>
            <span className="text-base font-extrabold">{selectedIncident.threat_score}</span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-500/40 px-2 py-0.5 rounded">
                {selectedIncident.incident_id}
              </span>
              <span className="font-mono text-xs text-slate-400">
                EVT: <strong className="text-slate-200">{selectedIncident.event_id}</strong>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-mono font-bold uppercase border ${
                  isCritical
                    ? 'bg-rose-950 text-rose-300 border-rose-600'
                    : isHigh
                    ? 'bg-amber-950 text-amber-300 border-amber-600'
                    : 'bg-cyan-950 text-cyan-300 border-cyan-600'
                }`}
              >
                {selectedIncident.severity}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-mono capitalize bg-slate-800 text-slate-200 border border-slate-700">
                {selectedIncident.status}
              </span>
            </div>

            <h2 className="text-base font-bold text-slate-100 mb-1">
              {selectedIncident.title}
            </h2>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-400 flex-wrap">
              <span className="flex items-center gap-1 text-slate-300">
                <Video className="h-3.5 w-3.5 text-cyan-400" />
                {selectedIncident.camera_id}
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                {selectedIncident.location_name}
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="h-3.5 w-3.5" />
                START: {new Date(selectedIncident.timestamp_start).toUTCString()}
              </span>
            </div>
          </div>
        </div>

        {/* AI Model Confidence Badge */}
        <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-lg p-2 font-mono text-xs">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">CONFIDENCE</span>
            <span className="text-cyan-300 font-bold">{(selectedIncident.confidence * 100).toFixed(0)}% ACCURACY</span>
          </div>
        </div>
      </div>

      {/* 2. Triage Status Workflow Control Bar */}
      <StatusControls />

      {/* 3. Stale AI Analysis Banner (if status updated or data stale) */}
      <StaleAnalysisBanner />

      {/* 4. Main Tactical Layout with Sidebar Navigation */}
      <div className="flex flex-col lg:flex-row items-start gap-4">
        {/* Navigation Sidebar */}
        <SidebarNav activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Selected Tab Content Area */}
        <div className="flex-1 w-full space-y-4 min-w-0">
          {isDetailLoading && (
            <div className="flex items-center justify-center p-3 text-xs font-mono text-cyan-400 gap-2 bg-slate-950/60 rounded-lg border border-slate-800">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Fetching deep AI reasoning telemetry for {selectedIncident.incident_id}...</span>
            </div>
          )}

          {activeTab === 'overview' && (
            <>
              <ReasonCodeChips />
              <AISummaryCard />
              <ThreatScoreExplanation />
            </>
          )}

          {activeTab === 'spatial' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <TrackTrajectoryOverlay />
              <EvidencePreview />
            </div>
          )}

          {activeTab === 'osint' && <OSINTContextCards />}

          {activeTab === 'timeline' && <TimelineView />}
        </div>
      </div>
    </div>
  );
};
