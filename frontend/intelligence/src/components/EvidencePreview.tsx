import React, { useState } from 'react';
import { Play, Pause, Film, ShieldCheck, Download, Maximize2 } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const EvidencePreview: React.FC = () => {
  const { selectedIncident } = useIntelligence();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(35);

  if (!selectedIncident) return null;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Film className="h-4 w-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
            FORENSIC EVIDENCE CLIP PREVIEW
          </span>
        </div>

        <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
          <ShieldCheck className="h-3 w-3" /> SHA-256 VERIFIED INTEGRITY
        </span>
      </div>

      {/* Simulated Video Player Surface */}
      <div className="relative w-full h-[200px] bg-slate-950 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center group">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60 z-10" />

        {/* Video Frame Overlay Simulation */}
        <div className="text-center space-y-2 z-20">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="h-12 w-12 rounded-full bg-cyan-950/90 border border-cyan-400 text-cyan-300 flex items-center justify-center hover:scale-105 transition shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
          </button>
          <div className="font-mono text-xs text-slate-300">
            {isPlaying ? 'PLAYING FORENSIC CLIP (SIMULATED)' : 'CLICK TO SCRUB FORENSIC BUFFER'}
          </div>
        </div>

        {/* Player Controls & Scrubber Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-2 z-30 bg-slate-950/90 border-t border-slate-800/80 flex flex-col gap-1.5">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <span>00:14 / 00:45</span>
              <span>PRE-BUFFER: 15s</span>
              <span>POST-BUFFER: 30s</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-300 truncate max-w-[200px]">
                {selectedIncident.evidence_uri.split('/').pop()}
              </span>
              <button
                onClick={() => alert(`Downloading evidence clip: ${selectedIncident.evidence_uri}`)}
                className="p-1 hover:text-cyan-400 transition"
                title="Download forensic evidence clip"
              >
                <Download className="h-3.5 w-3.5" />
              </button>
              <button className="p-1 hover:text-cyan-400 transition" title="Expand Fullscreen">
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
