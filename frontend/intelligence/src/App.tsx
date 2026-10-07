import React from 'react';
import { IntelligenceProvider } from './context/IntelligenceContext';
import { Header } from './components/Header';
import { IncidentFilters } from './components/IncidentFilters';
import { IncidentList } from './components/IncidentList';
import { IncidentDetailPanel } from './components/IncidentDetailPanel';
import { CitationsModal } from './components/CitationsModal';

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Bar Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 space-y-4">
        {/* Incident Filter Toolbar */}
        <IncidentFilters />

        {/* Tactical 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left Column: Active Incidents Queue */}
          <div className="lg:col-span-4 h-[calc(100vh-180px)] sticky top-20">
            <IncidentList />
          </div>

          {/* Right Column: Detailed AI Intelligence Panel */}
          <div className="lg:col-span-8 space-y-4">
            <IncidentDetailPanel />
          </div>
        </div>
      </main>

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
