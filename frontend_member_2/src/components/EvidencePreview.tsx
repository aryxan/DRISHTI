import React, { useState, useEffect } from 'react';
import { Play, Pause, Film, ShieldCheck, Download, Maximize2, Minimize2 } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export const EvidencePreview: React.FC = () => {
  const { selectedIncident } = useIntelligence();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(35);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Allow pressing Escape to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  if (!selectedIncident) return null;

  return (
    <div
      className={
        isFullscreen
          ? 'fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col p-4 md:p-6 animate-fadeIn'
          : 'bg-white border border-slate-300 rounded-xl p-3 flex flex-col gap-2 shadow-2xs'
      }
    >
      {/* Tab Header */}
      <div className={`flex items-center justify-between ${isFullscreen ? 'pb-3 border-b border-slate-800' : ''}`}>
        <div className="flex items-center gap-2">
          <Film className={`h-4 w-4 ${isFullscreen ? 'text-slate-300' : 'text-slate-600'}`} />
          <span
            className={`text-xs font-mono font-bold uppercase tracking-wider ${
              isFullscreen ? 'text-white' : 'text-slate-800'
            }`}
          >
            FORENSIC EVIDENCE CLIP PREVIEW {isFullscreen ? '— FULLSCREEN VIEW' : ''}
          </span>
          {isFullscreen && (
            <span className="font-mono text-xs text-slate-400 ml-2 hidden sm:inline">
              ({selectedIncident.incident_id} • {selectedIncident.camera_id})
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border ${
              isFullscreen
                ? 'text-emerald-400 bg-emerald-950/50 border-emerald-700'
                : 'text-emerald-700 bg-emerald-50 border-emerald-300'
            }`}
          >
            <ShieldCheck className="h-3 w-3" /> SHA-256 VERIFIED INTEGRITY
          </span>

          {isFullscreen && (
            <button
              onClick={() => setIsFullscreen(false)}
              className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-mono font-bold transition cursor-pointer"
              title="Exit Fullscreen (Esc)"
            >
              <Minimize2 className="h-3.5 w-3.5" />
              <span>EXIT FULLSCREEN</span>
            </button>
          )}
        </div>
      </div>

      {/* Simulated Video Player Surface */}
      <div
        className={`relative w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-700 flex flex-col items-center justify-center group ${
          isFullscreen ? 'flex-1 mt-3' : 'h-[220px]'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/60 z-10 pointer-events-none" />

        {/* Video Frame Overlay Simulation — Centered in the video view */}
        <div className="flex flex-col items-center justify-center text-center space-y-2 z-20 mb-8">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`${
              isFullscreen ? 'h-20 w-20' : 'h-14 w-14'
            } rounded-full bg-slate-800/95 hover:bg-slate-700 border-2 border-slate-500/80 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer`}
            title={isPlaying ? 'Pause forensic clip' : 'Play forensic clip'}
            aria-label={isPlaying ? 'Pause forensic clip' : 'Play forensic clip'}
          >
            {isPlaying ? (
              <Pause className={isFullscreen ? 'h-9 w-9' : 'h-6 w-6'} />
            ) : (
              <Play className={`${isFullscreen ? 'h-9 w-9 ml-1' : 'h-6 w-6 ml-0.5'}`} />
            )}
          </button>
          <div className={`${isFullscreen ? 'text-sm' : 'text-xs'} text-slate-300 font-semibold tracking-wide`}>
            {isPlaying ? 'PLAYING FORENSIC CLIP (SIMULATED)' : 'CLICK TO SCRUB FORENSIC BUFFER'}
          </div>
        </div>

        {/* Player Controls & Scrubber Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-3 z-30 bg-slate-900/95 border-t border-slate-700/80 flex flex-col gap-1.5">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-400"
          />

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <span>00:14 / 00:45</span>
              <span>PRE-BUFFER: 15s</span>
              <span>POST-BUFFER: 30s</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-300 truncate max-w-[200px] md:max-w-md">
                {selectedIncident.evidence_uri.split('/').pop()}
              </span>
              <button
                onClick={() => alert(`Downloading evidence clip: ${selectedIncident.evidence_uri}`)}
                className="p-1 hover:text-white transition cursor-pointer"
                title="Download forensic evidence clip"
              >
                <Download className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1 hover:text-white transition cursor-pointer"
                title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Expand Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

