import React from 'react';
import { Sparkles, Target, Globe, Clock, Activity } from 'lucide-react';
import { useIntelligence } from '../context/IntelligenceContext';

export type NavTab = 'overview' | 'spatial' | 'osint' | 'timeline';

interface SidebarNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ activeTab, onSelectTab }) => {
  const { selectedIncident, osintContextByIncident, tracksByIncident, timelineByIncident } = useIntelligence();

  const osintCount = selectedIncident ? (osintContextByIncident[selectedIncident.incident_id]?.cards.length || 0) : 0;
  const tracksCount = selectedIncident ? (tracksByIncident[selectedIncident.incident_id]?.length || 0) : 0;
  const timelineCount = selectedIncident ? (timelineByIncident[selectedIncident.incident_id]?.length || 0) : 0;

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; color: string; badge?: string }[] = [
    {
      id: 'overview',
      label: 'AI SUMMARY & THREAT SCORES',
      icon: <Sparkles className="h-4 w-4" />,
      color: 'text-cyan-400',
      badge: selectedIncident ? `${selectedIncident.threat_score} SCORE` : undefined
    },
    {
      id: 'spatial',
      label: 'TRAJECTORY OVERLAY & FORENSICS',
      icon: <Target className="h-4 w-4" />,
      color: 'text-cyan-400',
      badge: `${tracksCount} TARGETS`
    },
    {
      id: 'osint',
      label: 'OSINT CONTEXT CARDS',
      icon: <Globe className="h-4 w-4" />,
      color: 'text-emerald-400',
      badge: `${osintCount} FEEDS`
    },
    {
      id: 'timeline',
      label: 'AUDIT TIMELINE',
      icon: <Clock className="h-4 w-4" />,
      color: 'text-amber-400',
      badge: `${timelineCount} EVENTS`
    }
  ];

  return (
    <aside className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-col gap-2 w-full lg:w-64 shrink-0 shadow-lg">
      <div className="px-2 py-1.5 border-b border-slate-800/80 mb-1 flex items-center justify-between">
        <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Activity className="h-3.5 w-3.5 text-cyan-400" />
          <span>INTELLIGENCE NAVIGATION</span>
        </span>
        <span className="text-[9px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-1.5 py-0.5 rounded">
          SIDEBAR
        </span>
      </div>

      <nav className="flex flex-col gap-1.5">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex items-center justify-between p-2.5 rounded-lg font-mono text-xs text-left transition border group ${
                isActive
                  ? 'bg-slate-950 border-cyan-500/60 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`p-1.5 rounded-md bg-slate-900 border border-slate-800 ${item.color} group-hover:scale-105 transition`}>
                  {item.icon}
                </span>
                <span className="font-semibold tracking-tight truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ml-2 whitespace-nowrap ${
                  isActive ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' : 'bg-slate-900 text-slate-500'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
