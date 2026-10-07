import React from 'react';
import { Shield, Sparkles, Clock, MapPin, Video } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';
import { StatusControls } from './StatusControls';
import { NavTab } from './SidebarNav';
import { AISummaryCard } from './AISummaryCard';
import { ThreatScoreExplanation } from './ThreatScoreExplanation';
import { ReasonCodeChips } from './ReasonCodeChips';
import { TrackTrajectoryOverlay } from './TrackTrajectoryOverlay';
import { EvidencePreview } from './EvidencePreview';
import { TimelineView } from './TimelineView';
import { OSINTContextCards } from './OSINTContextCards';
import { StaleAnalysisBanner, LoadingSkeleton, ErrorBanner } from './StateIndicators';

interface IncidentDetailPanelProps {
  activeTab: NavTab;
}

export const IncidentDetailPanel: React.FC<IncidentDetailPanelProps> = ({ activeTab }) => {
  const { selectedIncident, isLoading, error, isDetailLoading } = useIntelligence();

  if (isLoading) return <LoadingSkeleton />;

  if (error) return <ErrorBanner message={error} />;

  if (!selectedIncident) {
    return (
      <div className="bg-white border border-slate-300 rounded-xl p-12 text-center text-slate-500 font-mono text-sm shadow-2xs">
        Select an incident from the queue to inspect AI threat intelligence.
      </div>
    );
  }

  const isCritical = selectedIncident.severity === 'critical';
  const isHigh = selectedIncident.severity === 'high';

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Master Incident Header Card */}
      <div className="bg-white border border-slate-300 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start gap-3">
          <div
            className={`p-2.5 rounded-xl border font-mono flex flex-col items-center justify-center shrink-0 ${
              selectedIncident.threat_score >= 80
                ? 'bg-rose-50 border-rose-300 text-rose-700'
                : selectedIncident.threat_score >= 60
                ? 'bg-amber-50 border-amber-300 text-amber-700'
                : 'bg-cyan-50 border-cyan-300 text-cyan-700'
            }`}
          >
            <Shield className="h-6 w-6 mb-0.5" />
            <span className="text-[10px] font-bold">THREAT</span>
            <span className="text-base font-extrabold">{selectedIncident.threat_score}</span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded">
                {selectedIncident.incident_id}
              </span>
              <span className="font-mono text-xs text-slate-500">
                EVT: <strong className="text-slate-900">{selectedIncident.event_id}</strong>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-mono font-bold uppercase border ${
                  isCritical
                    ? 'bg-rose-100 text-rose-800 border-rose-300'
                    : isHigh
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-cyan-100 text-cyan-800 border-cyan-300'
                }`}
              >
                {selectedIncident.severity}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-mono capitalize bg-slate-100 text-slate-800 border border-slate-300">
                {selectedIncident.status}
              </span>
            </div>

            <h2 className="text-base font-bold text-slate-900 mb-1">
              {selectedIncident.title}
            </h2>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-500 flex-wrap">
              <span className="flex items-center gap-1 text-slate-800 font-semibold">
                <Video className="h-3.5 w-3.5 text-cyan-700" />
                {selectedIncident.camera_id}
              </span>
              <span className="flex items-center gap-1 text-slate-700">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                {selectedIncident.location_name}
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <Clock className="h-3.5 w-3.5" />
                START: {new Date(selectedIncident.timestamp_start).toUTCString()}
              </span>
            </div>
          </div>
        </div>

        {/* AI Model Confidence Badge */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-mono text-xs">
          <Sparkles className="h-4 w-4 text-cyan-700" />
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase block">CONFIDENCE</span>
            <span className="text-cyan-800 font-bold">{(selectedIncident.confidence * 100).toFixed(0)}% ACCURACY</span>
          </div>
        </div>
      </div>

      {/* 2. Triage Status Workflow Control Bar */}
      <StatusControls />

      {/* 3. Stale AI Analysis Banner (if status updated or data stale) */}
      <StaleAnalysisBanner />

      {/* 4. Selected Tab View Area */}
      <div className="space-y-4">
        {isDetailLoading && (
          <div className="flex items-center justify-center p-3 text-xs font-mono text-cyan-800 font-bold gap-2 bg-slate-50 rounded-lg border border-slate-300">
            <span className="h-2 w-2 rounded-full bg-cyan-600 animate-ping" />
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

        {activeTab === 'reasons' && <ReasonCodeChips />}

        {activeTab === 'threat' && <ThreatScoreExplanation />}

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
  );
};
