import React from 'react';
import { PsStationDashboard } from './PsStationDashboard';

interface DistrictAdminDashboardProps {
  onViewPsEntry?: (psId: string) => void;
  onNavigateToUserManagement?: () => void;
}

export const DistrictAdminDashboard: React.FC<DistrictAdminDashboardProps> = (props) => {
  return <PsStationDashboard scope="DISTRICT" {...props} />;
};
