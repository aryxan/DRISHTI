import React from 'react';
import { Film, ShieldAlert, X } from 'lucide-react';

interface EvidenceModalProps {
  evidenceUri: string | null;
  title: string | null;
  onClose: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  evidenceUri,
  title,
  onClose,
}) => {
  if (!evidenceUri) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-5 shadow-2xl relative text-slate-900">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900 font-mono">
              Evidence Forensic Clip Viewer
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-3">
          <p className="text-xs text-slate-900 font-bold">{title}</p>
          <p className="text-[10px] text-slate-500 font-mono mt-0.5">{evidenceUri}</p>
        </div>

        {/* Video Simulation Container */}
        <div className="relative aspect-video w-full bg-slate-950 rounded-xl overflow-hidden mt-3 border border-slate-200 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80"
            alt="Forensic Evidence"
            className="w-full h-full object-cover"
          />

          {/* Bounding Box on Target */}
          <div className="absolute w-32 h-48 border-2 border-red-500 rounded bg-red-500/20 flex flex-col justify-between p-1">
            <span className="text-[9px] font-mono font-bold bg-red-600 text-white px-1.5 py-0.5 rounded self-start">
              INTRUDER #01 (CONF: 96%)
            </span>
            <span className="text-[8px] font-mono text-white bg-black/75 px-1 py-0.5 rounded font-medium">
              ZONE INTRUSION ALPHA-4
            </span>
          </div>

          <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/80 rounded font-mono text-[10px] text-emerald-400 border border-white/20">
            RECORDED EVIDENCE BUFFER (PRE: 5s | POST: 10s)
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-mono">
          <span className="flex items-center gap-1.5 text-slate-800 font-medium">
            <ShieldAlert className="w-4 h-4 text-emerald-600" /> Cryptographic Hash Verified (SHA-256)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors cursor-pointer shadow-xs font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
