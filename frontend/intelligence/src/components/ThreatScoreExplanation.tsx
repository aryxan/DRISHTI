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
    if (score >= 80) return { label: 'DEFCON 1 — CRITICAL BREACH', color: 'text-rose-800 border-rose-300 bg-rose-50' };
    if (score >= 60) return { label: 'DEFCON 2 — HIGH ALERT', color: 'text-amber-800 border-amber-300 bg-amber-50' };
    if (score >= 40) return { label: 'DEFCON 3 — ELEVATED RISK', color: 'text-blue-800 border-blue-300 bg-blue-50' };
    return { label: 'DEFCON 4 — NORMAL POSTURE', color: 'text-emerald-800 border-emerald-300 bg-emerald-50' };
  };

  const defcon = getDefconLabel(explanation.overall_score);

  return (
    <div className="bg-white border border-slate-300 rounded-xl p-4 flex flex-col gap-4 shadow-2xs text-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              EXPLAINABLE THREAT SCORE DECOMPOSITION
            </h3>
            <p className="text-[10px] font-mono text-slate-500">
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
        <div className="md:col-span-4 bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-widest mb-1">
            COMPUTED THREAT INDEX
          </span>
          <div className="text-4xl font-extrabold font-mono text-rose-700 my-1">
            {explanation.overall_score}
            <span className="text-xs text-slate-400 font-normal">/100</span>
          </div>
          <p className="text-[11px] font-mono text-slate-600">
            Base Prior Score: <strong className="text-slate-900">{explanation.base_score}</strong>
          </p>
        </div>

        {/* Factors Breakdown Bars */}
        <div className="md:col-span-8 bg-slate-50/80 border border-slate-200 rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-800 mb-1">
            <TrendingUp className="h-3.5 w-3.5 text-rose-600" />
            <span>PRIMARY RISK WEIGHT CONTRIBUTION FACTORS</span>
          </div>

          {explanation.primary_factors.map((factor, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-900 font-semibold">{factor.factor}</span>
                <span className="font-mono text-rose-700 font-bold">+{factor.weight}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden border border-slate-300">
                <div
                  className="bg-gradient-to-r from-amber-500 to-rose-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(factor.weight * 3, 100)}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500 font-sans">{factor.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mitigating Factors & Risk Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {explanation.mitigating_factors.length > 0 && (
          <div className="bg-slate-50/80 border border-slate-200 rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800 mb-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>MITIGATING FACTORS (-WEIGHT)</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-700 font-sans">
              {explanation.mitigating_factors.map((m, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
          <span className="text-[10px] font-mono text-slate-700 uppercase font-bold tracking-wider block mb-1">
            INTELLIGENCE SYNTHESIS ASSESSMENT
          </span>
          <p className="text-xs text-slate-700 leading-relaxed font-sans">
            {explanation.risk_assessment}
          </p>
        </div>
      </div>
    </div>
  );
};
