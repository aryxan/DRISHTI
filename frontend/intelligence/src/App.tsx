import React, { useState } from 'react';
import { IntelligenceProvider } from './context/IntelligenceContext';
import { SidebarNav, NavTab } from './components/SidebarNav';
import { Header } from './components/Header';
import { IncidentList } from './components/IncidentList';
import { IncidentDetailPanel } from './components/IncidentDetailPanel';
import { CitationsModal } from './components/CitationsModal';

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-row font-sans selection:bg-slate-300 selection:text-slate-900">
      {/* 1. Left Navigation Sidebar */}
      <SidebarNav activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* 2. Main Operational Stage */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar with Filter Button & Dropdown Tab */}
        <Header />

        {/* Main Content Area */}
        <main className="p-4 md:p-6 flex-1 flex flex-col">
          {/* 2-Column Responsive Layout — both columns stretch to same height */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch flex-1">
            {/* Left 4 Cols: Active Incidents Queue — stretches full height */}
            <div className="xl:col-span-4 flex flex-col">
              <IncidentList />
            </div>

            {/* Right 8 Cols: Detailed AI Intelligence Panel */}
            <div className="xl:col-span-8 flex flex-col gap-4 min-w-0">
              <IncidentDetailPanel activeTab={activeTab} />
            </div>
          </div>
        </main>
      </div>

      {/* Citations Inspector Modal */}
      <CitationsModal />
    </div>
  );
};


export const App: React.FC = () => {
  return (
    <IntelligenceProvider>
      <AppContent />
    </IntelligenceProvider>
  );
};

export default App;
