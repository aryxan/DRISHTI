import React from 'react';
import { BookOpen, X, ExternalLink } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const CitationsModal: React.FC = () => {
  const { activeCitation, closeCitation } = useIntelligence();

  if (!activeCitation) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-lg w-full p-4 shadow-2xl space-y-4 animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-mono font-bold text-slate-100 uppercase">
                CITATION INSPECTOR
              </h3>
              <p className="text-[10px] font-mono text-slate-400">
                VERIFIED PROVENANCE AUDIT TRAIL
              </p>
            </div>
          </div>
          <button
            onClick={closeCitation}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="space-y-3 text-xs font-mono">
          <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded border border-slate-800">
            <div>
              <span className="text-slate-500 uppercase text-[10px] block">SOURCE TYPE & ID</span>
              <span className="text-cyan-400 font-bold">{activeCitation.source_type.toUpperCase()} :: {activeCitation.source_id}</span>
            </div>
            {activeCitation.confidence_score && (
              <div className="text-right">
                <span className="text-slate-500 uppercase text-[10px] block">CONFIDENCE</span>
                <span className="text-emerald-400 font-bold">{(activeCitation.confidence_score * 100).toFixed(0)}%</span>
              </div>
            )}
          </div>

          <div>
            <span className="text-slate-400 text-[10px] uppercase block mb-1">CITATION TITLE</span>
            <div className="text-slate-100 font-semibold text-sm bg-slate-950/40 p-2 rounded border border-slate-800">
              {activeCitation.title}
            </div>
          </div>

          <div>
            <span className="text-slate-400 text-[10px] uppercase block mb-1">RAW TELEMETRY / EVIDENCE SNIPPET</span>
            <div className="bg-slate-950 border border-slate-800 rounded p-3 text-slate-300 font-mono text-xs leading-relaxed overflow-x-auto">
              {activeCitation.snippet}
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800">
            <span>TIMESTAMP: {new Date(activeCitation.timestamp).toLocaleString()}</span>
            {activeCitation.url && (
              <a
                href={activeCitation.url}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Open Source Link</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={closeCitation}
            className="px-4 py-1.5 rounded bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-xs font-mono text-cyan-300 font-semibold"
          >
            CLOSE INSPECTOR
          </button>
        </div>
      </div>
    </div>
  );
};
