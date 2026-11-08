import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  Shield, 
  Search, 
  LogOut,
  UserCheck
} from 'lucide-react';
import { InstallPwaButton } from './InstallPwaButton';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ searchQuery, onSearchChange }) => {
  const { t } = useLanguage();
  const { currentUser, logout } = useAuth();

  return (
    <header className="bg-police-navy-950 text-white shadow-lg border-b-2 border-police-gold-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Portal Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-police-gold-400 to-police-gold-600 flex items-center justify-center text-police-navy-950 font-black shadow">
              <Shield className="w-6 h-6 text-police-navy-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-wide text-police-gold-300">
                  NCLI Daily Entry Monitoring
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-hindi truncate max-w-xs sm:max-w-md">
                छत्तीसगढ़ पुलिस – विवेचना, ई-साक्ष्य एवं BNS 60/90 दिवस निगरानी प्रणाली
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="FIR क्रमांक या विवेचक खोजें..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-police-navy-900 border border-police-navy-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-police-gold-400"
            />
          </div>

          {/* Logged in User Profile Info (Strictly the Authenticated User) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 bg-police-navy-900 border border-police-navy-700/80 px-3 py-1.5 rounded-xl text-xs shadow-inner">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                currentUser.role === 'SUPER_ADMIN'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : currentUser.role === 'DISTRICT_ADMIN'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}>
                {currentUser.role === 'SUPER_ADMIN' ? 'PHQ' : (currentUser.role === 'DISTRICT_ADMIN' ? 'जिला' : 'थाना')}
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-[11px] leading-tight truncate max-w-[150px] sm:max-w-[200px]">
                  {currentUser.fullNameHi}
                </div>
                <div className="text-[9px] text-police-gold-400 font-sans truncate max-w-[150px] sm:max-w-[200px]">
                  {currentUser.roleLabelHi}
                  {currentUser.policeStationNameHi ? ` (${currentUser.policeStationNameHi})` : (currentUser.districtNameHi ? ` (${currentUser.districtNameHi})` : '')}
                </div>
              </div>
            </div>

            {/* Mobile App Install Button */}
            <InstallPwaButton variant="navbar" />

            {/* Logout Button */}
            <button
              onClick={logout}
              title="लॉगआउट करें"
              className="flex items-center gap-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">लॉगआउट</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
