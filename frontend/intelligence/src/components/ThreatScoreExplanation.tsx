import React from 'react';
import { ShieldAlert, TrendingUp, ShieldCheck } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const ThreatScoreExplanation: React.FC = () => {
  const { selectedIncident, aiSummaryByIncident } = useIntelligence();

  if (!selectedIncident) return null;

  const summary = aiSummaryByIncident[selectedIncident.incident_id];
  const explanation = summary?.threat_score_explanation;

  if (!explanation) return null;

  const getDefconLabel = (score: number) => {
    if (score >= 80) return { label: 'DEFCON 1 — CRITICAL BREACH', color: 'text-rose-400 border-rose-500 bg-rose-950/60' };
    if (score >= 60) return { label: 'DEFCON 2 — HIGH ALERT', color: 'text-amber-400 border-amber-500 bg-amber-950/60' };
    if (score >= 40) return { label: 'DEFCON 3 — ELEVATED RISK', color: 'text-cyan-400 border-cyan-500 bg-cyan-950/60' };
    return { label: 'DEFCON 4 — NORMAL POSTURE', color: 'text-emerald-400 border-emerald-500 bg-emerald-950/60' };
  };

  const defcon = getDefconLabel(explanation.overall_score);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-950 text-rose-400 border border-rose-500/30">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              EXPLAINABLE THREAT SCORE DECOMPOSITION
            </h3>
            <p className="text-[10px] font-mono text-slate-400">
              Algorithmic Risk Factor Weights & Threat Matrix
            </p>
          </div>
        </div>

        <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold border ${defcon.color}`}>
          {defcon.label}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Score Gauge & Base Info */}
        <div className="md:col-span-4 bg-slate-950/60 border border-slate-800 rounded-lg p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">
            COMPUTED THREAT INDEX
          </span>
          <div className="text-4xl font-extrabold font-mono text-rose-400 my-1">
            {explanation.overall_score}
            <span className="text-xs text-slate-500 font-normal">/100</span>
          </div>
          <p className="text-[11px] font-mono text-slate-400">
            Base Prior Score: <strong className="text-slate-200">{explanation.base_score}</strong>
          </p>
        </div>

        {/* Factors Breakdown Bars */}
        <div className="md:col-span-8 bg-slate-950/40 border border-slate-800/60 rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-300 mb-1">
            <TrendingUp className="h-3.5 w-3.5 text-rose-400" />
            <span>PRIMARY RISK WEIGHT CONTRIBUTION FACTORS</span>
          </div>

          {explanation.primary_factors.map((factor, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-200 font-medium">{factor.factor}</span>
                <span className="font-mono text-rose-400 font-bold">+{factor.weight}%</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(factor.weight * 3, 100)}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 font-sans">{factor.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mitigating Factors & Risk Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {explanation.mitigating_factors.length > 0 && (
          <div className="bg-slate-950/40 border border-slate-800/60 rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400 mb-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>MITIGATING FACTORS (-WEIGHT)</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-300 font-sans">
              {explanation.mitigating_factors.map((m, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
          <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider block mb-1">
            INTELLIGENCE SYNTHESIS ASSESSMENT
          </span>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {explanation.risk_assessment}
          </p>
        </div>
      </div>
    </div>
  );
};
