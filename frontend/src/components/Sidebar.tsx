import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard,
  FileEdit,
  Users,
  Shield
} from 'lucide-react';

export type ActiveTab = 
  | 'dashboard'
  | 'ps-daily-entry'
  | 'user-management';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  urgentBnsCount?: number;
  craPendingCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  urgentBnsCount = 0
}) => {
  const { t } = useLanguage();
  const { currentUser } = useAuth();

  const isSho = currentUser.role === 'SHO';
  const isDistrictAdmin = currentUser.role === 'DISTRICT_ADMIN';
  const isSuperAdmin = currentUser.role === 'SUPER_ADMIN';

  const menuItems: { 
    id: ActiveTab; 
    hi: string; 
    icon: React.ReactNode; 
    badge?: number; 
    badgeColor?: string; 
    isHighlight?: boolean;
  }[] = [];

  // 1. Dashboard (Role-specific view)
  menuItems.push({
    id: 'dashboard',
    hi: isSuperAdmin ? 'राज्य मुख्यालय डैशबोर्ड' : (isDistrictAdmin ? 'जिला निगरानी डैशबोर्ड' : 'थाना डैशबोर्ड'),
    icon: <LayoutDashboard className="w-5 h-5" />
  });

  // 2. Data Entry ONLY for SHO (थाना स्तर पर ही प्रविष्टि)
  if (isSho) {
    menuItems.push({
      id: 'ps-daily-entry',
      hi: 'दैनिक डेटा प्रविष्टि',
      icon: <FileEdit className="w-5 h-5" />,
      isHighlight: true,
      badge: urgentBnsCount > 0 ? urgentBnsCount : undefined,
      badgeColor: 'bg-rose-600 text-white animate-pulse'
    });
  }

  // 3. User ID Management for District Admin (creates PS) & Super Admin (creates District/PS)
  if (isDistrictAdmin || isSuperAdmin) {
    menuItems.push({
      id: 'user-management',
      hi: isDistrictAdmin ? 'थाना यूजर प्रबंधन (ID)' : 'उपयोगकर्ता प्रबंधन (ID निर्माण)',
      icon: <Users className="w-5 h-5" />,
      isHighlight: isDistrictAdmin
    });
  }

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200 shrink-0 shadow-sm flex flex-col justify-between">
      <div className="p-3">
        <div className="px-3 py-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
          <span>मुख्य मेन्यू</span>
          <span className="text-[10px] bg-police-navy-100 text-police-navy-900 px-2 py-0.5 rounded font-black">
            {currentUser.roleLabelHi}
          </span>
        </div>

        <nav className="space-y-1.5 mt-2">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-police-navy-900 text-white shadow-md'
                    : item.isHighlight
                    ? 'text-slate-900 hover:bg-slate-100 bg-slate-50 border border-slate-200'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3 text-left">
                  <span className={`${isActive ? 'text-police-gold-400' : 'text-slate-500'}`}>
                    {item.icon}
                  </span>
                  <span className="font-extrabold text-[14px] leading-snug">
                    {item.hi}
                  </span>
                </div>

                {item.badge !== undefined && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-slate-200 text-slate-800'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Role info card at bottom */}
      <div className="p-3 m-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs">
        <div className="flex items-center gap-1.5 font-bold mb-1 text-police-navy-900">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>{currentUser.roleLabelHi}</span>
        </div>
        <p className="text-[11px] text-slate-500 font-mono leading-tight">
          {currentUser.districtNameHi ? `${currentUser.districtNameHi}` : 'समस्त छत्तीसगढ़'}
          {currentUser.policeStationNameHi ? ` ➔ ${currentUser.policeStationNameHi}` : ''}
        </p>
      </div>
    </aside>
  );
};
