import React from 'react';
import { Sparkles, CheckSquare, AlertOctagon, BookOpen, Cpu } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const AISummaryCard: React.FC = () => {
  const { selectedIncident, aiSummaryByIncident, openCitation, isDetailLoading } = useIntelligence();

  if (!selectedIncident) return null;

  const summary = aiSummaryByIncident[selectedIncident.incident_id];

  if (isDetailLoading && !summary) {
    return (
      <div className="bg-white border border-slate-300 rounded-xl p-4 animate-pulse shadow-2xs">
        <div className="h-4 bg-slate-200 rounded w-1/3 mb-4" />
        <div className="h-16 bg-slate-100 rounded mb-4" />
        <div className="h-20 bg-slate-100 rounded" />
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="bg-white border border-slate-300 rounded-xl p-6 text-center text-slate-500 font-mono text-xs shadow-2xs">
        No AI Summary available for incident {selectedIncident.incident_id}.
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-300 rounded-xl p-4 flex flex-col gap-4 shadow-2xs text-slate-900">
      {/* Header Badge */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-300">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              EXECUTIVE AI INTELLIGENCE SUMMARY
            </h3>
            <p className="text-[10px] font-mono text-slate-500">
              Generated: {new Date(summary.generated_at).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[10px] font-mono bg-slate-100 border border-slate-300 px-2 py-1 rounded text-slate-700 font-bold">
            <Cpu className="h-3 w-3 text-slate-500" />
            {summary.model_version}
          </span>
          <span className="text-[10px] font-mono bg-emerald-50 border border-emerald-300 px-2 py-1 rounded text-emerald-800 font-bold">
            {(summary.confidence * 100).toFixed(0)}% CONFIDENCE
          </span>
        </div>
      </div>

      {/* Main Narrative Text */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 leading-relaxed font-sans">
        {summary.summary_text}
      </div>

      {/* Grid: Key Findings & Recommended Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Key Findings */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 mb-2">
            <CheckSquare className="h-3.5 w-3.5 text-slate-500" />
            <span>KEY FINDINGS</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700 font-sans">
            {summary.key_findings.map((finding, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-slate-500 font-bold">•</span>
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Actions */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-800 mb-2">
            <AlertOctagon className="h-3.5 w-3.5 text-amber-600" />
            <span>RECOMMENDED OPERATIONAL RESPONSE</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700 font-sans">
            {summary.recommended_actions.map((action, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">▶</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Citations Footer */}
      {summary.citations && summary.citations.length > 0 && (
        <div className="pt-2 border-t border-slate-200 flex items-center gap-2 flex-wrap text-xs">
          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 uppercase font-bold mr-1">
            <BookOpen className="h-3.5 w-3.5 text-slate-500" />
            <span>SUPPORTING CITATIONS ({summary.citations.length}):</span>
          </div>
          {summary.citations.map((cit) => (
            <button
              key={cit.citation_id}
              onClick={() => openCitation(cit)}
              className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 border border-slate-300 text-[10px] font-mono text-slate-800 font-semibold transition flex items-center gap-1 cursor-pointer"
            >
              <span className="text-slate-600">[{cit.source_type.toUpperCase()}]</span>
              <span className="truncate max-w-[140px]">{cit.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
