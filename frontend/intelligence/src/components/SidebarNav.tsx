import React from 'react';
import { Sparkles, Target, Globe, Clock, Tag, Radio, ShieldAlert, Activity } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export type NavTab = 'overview' | 'spatial' | 'osint' | 'timeline' | 'reasons' | 'threat';

interface SidebarNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ activeTab, onSelectTab }) => {
  const { selectedIncident, osintContextByIncident, tracksByIncident, timelineByIncident } = useIntelligence();

  const osintCount = selectedIncident ? (osintContextByIncident[selectedIncident.incident_id]?.cards.length || 0) : 0;
  const tracksCount = selectedIncident ? (tracksByIncident[selectedIncident.incident_id]?.length || 0) : 0;
  const timelineCount = selectedIncident ? (timelineByIncident[selectedIncident.incident_id]?.length || 0) : 0;
  const reasonCount = selectedIncident ? (selectedIncident.reason_codes.length || 0) : 0;

  const navItems = [
    {
      id: 'overview' as NavTab,
      label: 'AI Summary & Scores',
      icon: Sparkles,
      badge: selectedIncident ? `${selectedIncident.threat_score} PTS` : undefined
    },
    {
      id: 'spatial' as NavTab,
      label: 'Trajectory & Forensics',
      icon: Target,
      badge: `${tracksCount}`
    },
    {
      id: 'osint' as NavTab,
      label: 'OSINT Context',
      icon: Globe,
      badge: `${osintCount}`
    },
    {
      id: 'timeline' as NavTab,
      label: 'Audit Timeline',
      icon: Clock,
      badge: `${timelineCount}`
    },
    {
      id: 'reasons' as NavTab,
      label: 'Reason Code Tags',
      icon: Tag,
      badge: `${reasonCount}`
    },
    {
      id: 'threat' as NavTab,
      label: 'Threat Overview',
      icon: ShieldAlert,
      badge: selectedIncident ? selectedIncident.severity.toUpperCase() : undefined
    }
  ];

  return (
    <aside className="w-60 xl:w-64 bg-slate-200/90 border-r border-slate-300 flex flex-col justify-between p-4 shrink-0 sticky top-0 self-start h-screen overflow-y-auto select-none text-slate-700">
      <div className="flex flex-col gap-5">
        {/* Top Brand Header */}
        <div className="flex items-center gap-2.5 px-1 py-1">
          <div className="p-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 shadow-xs flex items-center justify-center font-bold">
            <Radio className="w-5 h-5 text-slate-700" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wider text-slate-900 font-sans uppercase">
              DRISHTI
            </h1>
            <p className="text-[11px] text-slate-500 font-sans font-medium">
              AI Intelligence Portal
            </p>
          </div>
        </div>

        {/* Vertical Navigation Menu */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-300/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/60'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-700' : 'text-slate-500'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                    isActive ? 'bg-slate-100 text-slate-700 border border-slate-300' : 'bg-slate-300/70 text-slate-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="pt-3 border-t border-slate-300 flex flex-col gap-2">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 px-1">
          <span className="flex items-center gap-1.5 font-semibold">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            AI ENGINE ACTIVE
          </span>
          <span>v2.4.0</span>
        </div>
      </div>
    </aside>
  );
};
