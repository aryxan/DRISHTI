import React from 'react';
import { Globe, ShieldCheck, AlertCircle, ExternalLink, Hash } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const OSINTContextCards: React.FC = () => {
  const { selectedIncident, osintContextByIncident } = useIntelligence();

  if (!selectedIncident) return null;

  const osintContext = osintContextByIncident[selectedIncident.incident_id];
  const cards = osintContext?.cards || [];

  return (
    <div className="bg-white border border-slate-300 rounded-xl p-4 flex flex-col gap-3 shadow-2xs text-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-300">
            <Globe className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              OSINT INTELLIGENCE STREAM & CONTEXT CARDS
            </h3>
            <p className="text-[10px] font-mono text-slate-500">
              Correlated Open Source Threat Feeds & Public Records
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-300 text-emerald-800 font-bold">
          {cards.length} FEEDS LINKED
        </span>
      </div>

      {/* Global Threat Correlation Box */}
      {osintContext?.global_threat_correlation && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-2.5 flex items-start gap-2 text-xs font-mono text-emerald-900">
          <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
          <span className="font-semibold">{osintContext.global_threat_correlation}</span>
        </div>
      )}

      {/* OSINT Context Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {cards.length === 0 ? (
          <div className="md:col-span-2 text-center py-6 text-slate-500 font-mono text-xs">
            No OSINT context cards correlated for this incident.
          </div>
        ) : (
          cards.map((card) => {
            const isVerified = card.verification_status === 'verified';
            return (
              <div
                key={card.card_id}
                className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-col justify-between gap-2 hover:border-slate-300 transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5 font-mono text-[10px]">
                    <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 font-bold uppercase">
                      {card.category.replace('_', ' ')}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600 font-bold">
                        RELEVANCE: <strong className="text-emerald-700">{card.relevance_score}%</strong>
                      </span>
                      <span
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded font-bold ${
                          isVerified ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {isVerified ? <ShieldCheck className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                        {card.verification_status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-xs font-semibold text-slate-900 mb-1">{card.title}</h4>
                  <p className="text-[11px] text-slate-700 font-sans leading-relaxed line-clamp-3">
                    "{card.content_snippet}"
                  </p>
                </div>

                {/* Card Footer Info */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-900 font-bold">{card.source_name}</span>
                    {card.author_or_handle && <span>({card.author_or_handle})</span>}
                  </div>

                  <div className="flex items-center gap-2">
                    {card.tags.map((t) => (
                      <span key={t} className="flex items-center text-slate-500">
                        <Hash className="h-2.5 w-2.5 text-slate-400" />
                        {t}
                      </span>
                    ))}
                    {card.url && (
                      <a
                        href={card.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-700 hover:text-cyan-900 flex items-center gap-0.5 font-bold"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
