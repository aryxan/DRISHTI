import React from 'react';
import { Tag } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

const REASON_CODE_DESCRIPTIONS: Record<string, string> = {
  ZONE_INTRUSION: 'Target passed virtual intrusion line in restricted perimeter',
  PERIMETER_CROSSING: 'Physical security boundary barrier crossed without authorization badge',
  UNATTENDED_OBJECT: 'Stationary object isolated without human owner for > 180 seconds',
  NIGHTTIME_ANOMALY: 'Activity detected outside standard operational hours (00:00 - 05:00 UTC)',
  SUSPICIOUS_VEHICLE: 'Vehicle idling without active permit in sensitive access corridor',
  UNAUTHORIZED_DWELL: 'Target lingering in restricted spatial area beyond maximum dwell timer',
  PLATE_NOT_REGISTERED: 'ALPR camera check returned 0 records in authorization database',
  CROWD_ANOMALY: 'Spatial crowd density exceeded 3.5 persons per square meter',
  SURGE_DETECTION: 'Sudden high optical flow velocity surge toward turnstile bottlenecks',
  FLOW_BOTTLENECK: 'Throughput capacity degraded by > 50%',
  CROWD_THRESHOLD_EXCEEDED: 'Pedestrian count exceeded safety threshold',
  NO_PARKING_ZONE_STATIONARY: 'Stationary vehicle detected in designated clear emergency lane',
  CATWALK_DIRECTION_REVERSED: 'Subject moving against designated directional corridor flow'
};

export const ReasonCodeChips: React.FC = () => {
  const { selectedIncident, filters, setFilter } = useIntelligence();

  if (!selectedIncident || !selectedIncident.reason_codes) return null;

  const handleChipClick = (code: string) => {
    if (filters.selectedReasonCode === code) {
      setFilter({ selectedReasonCode: null });
    } else {
      setFilter({ selectedReasonCode: code });
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Tag className="h-3.5 w-3.5 text-cyan-400" />
        <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
          EXPLAINABLE REASON-CODE TAGS ({selectedIncident.reason_codes.length})
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {selectedIncident.reason_codes.map((code) => {
          const isSelected = filters.selectedReasonCode === code;
          const description = REASON_CODE_DESCRIPTIONS[code] || 'Inference engine detected anomaly factor';

          return (
            <div key={code} className="relative group">
              <button
                onClick={() => handleChipClick(code)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold transition border ${
                  isSelected
                    ? 'bg-cyan-950 border-cyan-400 text-cyan-300 ring-1 ring-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                #{code}
              </button>

              {/* Hover Tooltip */}
              <div className="absolute left-0 bottom-full mb-1 hidden group-hover:block z-30 bg-slate-950 border border-slate-800 rounded-lg p-2 shadow-xl min-w-[200px] text-[10px] text-slate-300 font-sans pointer-events-none">
                <span className="font-mono text-cyan-400 font-bold block mb-0.5">#{code}</span>
                <span>{description}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
