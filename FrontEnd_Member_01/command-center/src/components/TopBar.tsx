import React from 'react';
import { SystemStatus } from './SystemStatus';
import { CurrentTime } from './CurrentTime';
import { ConnectionIndicator } from './ConnectionIndicator';
import { UserMenu } from './UserMenu';
import { Shield } from 'lucide-react';

interface TopBarProps {
  onOpenHealthModal: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenHealthModal }) => {
  return (
    <header className="h-16 bg-[#0c111d] border-b border-slate-800 px-4 md:px-6 flex items-center justify-between gap-4 sticky top-0 z-40 select-none shadow-md shadow-black/40">
      {/* Brand & Platform Identification */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-600 via-indigo-600 to-purple-700 flex items-center justify-center shadow-lg shadow-cyan-900/40 border border-cyan-400/30">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-black tracking-wider text-base text-slate-100 font-mono">
              DRISHTI
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/80 uppercase font-semibold">
              C4I Core v1.0
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden sm:block">
            Autonomous Video Surveillance & Threat Intelligence Command Center
          </p>
        </div>
      </div>

      {/* Middle: System Telemetry Status */}
      <div className="hidden lg:flex items-center">
        <SystemStatus onOpenHealthModal={onOpenHealthModal} />
      </div>

      {/* Right Controls: Clock, WS Indicator, User Profile */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:block">
          <CurrentTime />
        </div>
        <ConnectionIndicator />
        <UserMenu />
      </div>
    </header>
  );
};
