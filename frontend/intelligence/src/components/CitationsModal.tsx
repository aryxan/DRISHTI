import React from 'react';
import { BookOpen, X, ExternalLink } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const CitationsModal: React.FC = () => {
  const { activeCitation, closeCitation } = useIntelligence();

  if (!activeCitation) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-300 rounded-xl max-w-lg w-full p-5 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-cyan-700" />
            <div>
              <h3 className="text-sm font-mono font-bold text-slate-900 uppercase">
                CITATION INSPECTOR
              </h3>
              <p className="text-[10px] font-mono text-slate-500">
                VERIFIED PROVENANCE AUDIT TRAIL
              </p>
            </div>
          </div>
          <button
            onClick={closeCitation}
            className="p-1 rounded text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="space-y-3 text-xs font-mono">
          <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <div>
              <span className="text-slate-500 uppercase text-[10px] font-bold block">SOURCE TYPE & ID</span>
              <span className="text-cyan-800 font-bold">{activeCitation.source_type.toUpperCase()} :: {activeCitation.source_id}</span>
            </div>
            {activeCitation.confidence_score && (
              <div className="text-right">
                <span className="text-slate-500 uppercase text-[10px] font-bold block">CONFIDENCE</span>
                <span className="text-emerald-700 font-bold">{(activeCitation.confidence_score * 100).toFixed(0)}%</span>
              </div>
            )}
          </div>

          <div>
            <span className="text-slate-500 text-[10px] font-bold uppercase block mb-1">CITATION TITLE</span>
            <div className="text-slate-900 font-bold text-sm bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              {activeCitation.title}
            </div>
          </div>

          <div>
            <span className="text-slate-500 text-[10px] font-bold uppercase block mb-1">RAW TELEMETRY / EVIDENCE SNIPPET</span>
            <div className="bg-slate-900 text-slate-100 border border-slate-700 rounded-lg p-3 font-mono text-xs leading-relaxed overflow-x-auto">
              {activeCitation.snippet}
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-200">
            <span className="font-semibold">TIMESTAMP: {new Date(activeCitation.timestamp).toLocaleString()}</span>
            {activeCitation.url && (
              <a
                href={activeCitation.url}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-700 hover:underline flex items-center gap-1 font-bold"
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
            className="px-4 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-xs font-mono text-white font-bold cursor-pointer transition"
          >
            CLOSE INSPECTOR
          </button>
        </div>
      </div>
    </div>
  );
};
