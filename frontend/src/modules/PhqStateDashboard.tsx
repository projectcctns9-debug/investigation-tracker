import React from 'react';
import { PsStationDashboard } from './PsStationDashboard';

interface PhqStateDashboardProps {
  onSelectDistrict?: (distId: string) => void;
  onNavigateToModule?: (moduleKey: string) => void;
  onNavigateToUserManagement?: () => void;
}

export const PhqStateDashboard: React.FC<PhqStateDashboardProps> = (props) => {
  return <PsStationDashboard scope="PHQ" {...props} />;
};
