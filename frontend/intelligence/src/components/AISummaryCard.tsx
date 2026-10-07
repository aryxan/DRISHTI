import React from 'react';
import { Sparkles, CheckSquare, AlertOctagon, BookOpen, Cpu } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const AISummaryCard: React.FC = () => {
  const { selectedIncident, aiSummaryByIncident, openCitation, isDetailLoading } = useIntelligence();

  if (!selectedIncident) return null;

  const summary = aiSummaryByIncident[selectedIncident.incident_id];

  if (isDetailLoading && !summary) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 animate-pulse">
        <div className="h-4 bg-slate-800 rounded w-1/3 mb-4" />
        <div className="h-16 bg-slate-800/60 rounded mb-4" />
        <div className="h-20 bg-slate-800/40 rounded" />
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 text-center text-slate-500 font-mono text-xs">
        No AI Summary available for incident {selectedIncident.incident_id}.
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col gap-4">
      {/* Header Badge */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/30">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              EXECUTIVE AI INTELLIGENCE SUMMARY
            </h3>
            <p className="text-[10px] font-mono text-slate-400">
              Generated: {new Date(summary.generated_at).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[10px] font-mono bg-slate-950 border border-slate-800 px-2 py-1 rounded text-cyan-300">
            <Cpu className="h-3 w-3" />
            {summary.model_version}
          </span>
          <span className="text-[10px] font-mono bg-emerald-950/80 border border-emerald-500/40 px-2 py-1 rounded text-emerald-300 font-bold">
            {(summary.confidence * 100).toFixed(0)}% CONFIDENCE
          </span>
        </div>
      </div>

      {/* Main Narrative Text */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3 text-xs text-slate-200 leading-relaxed font-sans">
        {summary.summary_text}
      </div>

      {/* Grid: Key Findings & Recommended Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Key Findings */}
        <div className="bg-slate-950/40 border border-slate-800/60 rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-cyan-400 mb-2">
            <CheckSquare className="h-3.5 w-3.5" />
            <span>KEY FINDINGS</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {summary.key_findings.map((finding, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-cyan-500 font-bold">•</span>
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Actions */}
        <div className="bg-slate-950/40 border border-slate-800/60 rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-400 mb-2">
            <AlertOctagon className="h-3.5 w-3.5" />
            <span>RECOMMENDED OPERATIONAL RESPONSE</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {summary.recommended_actions.map((action, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">▶</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Citations Footer */}
      {summary.citations && summary.citations.length > 0 && (
        <div className="pt-2 border-t border-slate-800 flex items-center gap-2 flex-wrap text-xs">
          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 uppercase mr-1">
            <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
            <span>SUPPORTING CITATIONS ({summary.citations.length}):</span>
          </div>
          {summary.citations.map((cit) => (
            <button
              key={cit.citation_id}
              onClick={() => openCitation(cit)}
              className="px-2 py-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-[10px] font-mono text-cyan-300 transition flex items-center gap-1"
            >
              <span>[{cit.source_type.toUpperCase()}]</span>
              <span className="font-semibold truncate max-w-[140px]">{cit.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
