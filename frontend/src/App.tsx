import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MasterProvider } from './context/MasterContext';
import { Navbar } from './components/Navbar';
import { Sidebar, ActiveTab } from './components/Sidebar';

// Dashboards & Modules
import { PhqStateDashboard } from './modules/PhqStateDashboard';
import { DistrictAdminDashboard } from './modules/DistrictAdminDashboard';
import { PsDailyDataEntry } from './modules/PsDailyDataEntry';
import { PsStationDashboard } from './modules/PsStationDashboard';
import { UserManagement } from './modules/UserManagement';
import { LoginPage } from './components/LoginPage';

const MainLayout: React.FC = () => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();

  // Active tab state
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(currentUser.districtId || 'dist-durg');
  const [selectedPsId, setSelectedPsId] = useState<string>(currentUser.policeStationId || '');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Badges
  const urgentBnsCount = 0;
  const craPendingCount = 0;

  const handleSelectDistrictFromState = (distId: string) => {
    setSelectedDistrictId(distId);
    setActiveTab('dashboard');
  };

  const handleViewPsEntry = (psId: string) => {
    setSelectedPsId(psId);
    setActiveTab('ps-daily-entry');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans w-full max-w-full overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Main Body */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto my-2 sm:my-4 px-2 sm:px-6 lg:px-8 gap-3 md:gap-6 min-w-0 overflow-x-hidden">
        
        {/* Navigation Sidebar: Role-based simplified navigation */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          urgentBnsCount={urgentBnsCount}
          craPendingCount={craPendingCount}
        />

        {/* Content Area */}
        <main className="flex-1 min-w-0 w-full max-w-full bg-white rounded-2xl border border-slate-200/80 shadow-sm p-3 sm:p-5 md:p-6 overflow-x-hidden">
          
          {/* 1. Dashboard Tab (Renders appropriate view based on User Role) */}
          {activeTab === 'dashboard' && (
            currentUser.role === 'SUPER_ADMIN' ? (
              <PhqStateDashboard 
                onSelectDistrict={handleSelectDistrictFromState} 
                onNavigateToUserManagement={() => setActiveTab('user-management')}
              />
            ) : currentUser.role === 'DISTRICT_ADMIN' ? (
              <DistrictAdminDashboard 
                onViewPsEntry={handleViewPsEntry} 
                onNavigateToUserManagement={() => setActiveTab('user-management')}
              />
            ) : (
              <PsStationDashboard 
                onNavigateToDailyEntry={() => setActiveTab('ps-daily-entry')}
              />
            )
          )}

          {/* 2. PS Daily Data Entry (The Core SHO Module: Section A, B, C, D) */}
          {activeTab === 'ps-daily-entry' && (
            <PsDailyDataEntry />
          )}

          {/* 3. User Management (PHQ creates District Admin/SHO, District Admin creates SHO) */}
          {activeTab === 'user-management' && (
            <UserManagement />
          )}

        </main>
      </div>

      {/* Footer */}
      <footer className="bg-police-navy-950 text-slate-400 text-xs py-3 border-t border-police-navy-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-semibold text-police-gold-400 tracking-wide text-sm">
            NCLI Daily Entry Monitoring
          </span>
        </div>
      </footer>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <MainLayout />;
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MasterProvider>
          <AppContent />
        </MasterProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
