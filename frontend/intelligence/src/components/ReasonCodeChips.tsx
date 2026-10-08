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
  CATWALK_DIRECTION_REVERSED: 'Subject moving against designated directional corridor flow',
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
    <div className="bg-white border border-slate-300 rounded-xl p-3.5 flex flex-col gap-2 shadow-2xs">
      <div className="flex items-center gap-2">
        <Tag className="h-4 w-4 text-slate-600" />
        <span className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
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
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition border cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 text-white border-slate-700 shadow-xs'
                    : 'bg-slate-100 border-slate-300 hover:border-slate-500 text-slate-700 hover:text-slate-900'
                }`}
              >
                #{code}
              </button>

              {/* Hover Tooltip */}
              <div className="absolute left-0 bottom-full mb-1.5 hidden group-hover:block z-30 bg-slate-900 border border-slate-700 text-white rounded-lg p-2.5 shadow-xl min-w-[220px] text-[11px] font-sans pointer-events-none">
                <span className="font-mono text-slate-300 font-bold block mb-0.5">#{code}</span>
                <span className="text-slate-400">{description}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
