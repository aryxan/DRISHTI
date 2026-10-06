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
    <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between gap-4 sticky top-0 z-40 select-none shadow-xs">
      {/* Brand & Platform Identification */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center shadow-xs border border-slate-700">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-black tracking-wider text-base text-slate-900 font-mono">
              DRISHTI
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300 uppercase font-semibold">
              C4I Core v1.0
            </span>
          </div>
          <p className="text-[11px] text-slate-500 hidden sm:block">
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
