import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DistrictPsSelector } from '../components/DistrictPsSelector';
import { mockOfficers, mockPoliceStations } from '../data/mockData';
import { Users, Phone, Shield, Search, CheckCircle2 } from 'lucide-react';

interface OfficerDirectoryProps {
  selectedDistrictId: string;
  selectedPsId: string;
  onDistrictChange: (id: string) => void;
  onPsChange: (id: string) => void;
}

export const OfficerDirectory: React.FC<OfficerDirectoryProps> = ({
  selectedDistrictId,
  selectedPsId,
  onDistrictChange,
  onPsChange
}) => {
  const { t, mode } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const activePsIds = selectedPsId
    ? [selectedPsId]
    : mockPoliceStations
        .filter(ps => !selectedDistrictId || ps.districtId === selectedDistrictId)
        .map(ps => ps.id);

  const filteredOfficers = mockOfficers.filter(o => {
    if (!activePsIds.includes(o.policeStationId)) return false;
    if (searchTerm && !o.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) && !o.nameHi.includes(searchTerm) && !o.pno.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-police-navy-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-police-gold-600" />
            <span>{t('अधिकारी एवं संपर्क निर्देशिका', 'Contacts & Officer Directory')}</span>
          </h2>
          <p className="text-xs text-slate-500 font-hindi">
            {t('थाना प्रभारी, विवेचना अधिकारी (IOs), PNO नंबर एवं संपर्क सूची', 'Station house officers, IO directory, PNO numbers and official contacts')}
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder={t('अधिकारी का नाम / PNO खोजें...', 'Search Officer / PNO...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-police-navy-600"
          />
        </div>
      </div>

      <DistrictPsSelector
        selectedDistrictId={selectedDistrictId}
        selectedPsId={selectedPsId}
        onDistrictChange={onDistrictChange}
        onPsChange={onPsChange}
        showAllPsOption={true}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOfficers.map(officer => {
          const ps = mockPoliceStations.find(p => p.id === officer.policeStationId);
          return (
            <div key={officer.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-police-navy-100 flex items-center justify-center text-police-navy-800 font-bold">
                    <Shield className="w-5 h-5 text-police-gold-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {mode === 'bilingual' ? `${officer.nameHi} (${officer.nameEn})` : (mode === 'hi' ? officer.nameHi : officer.nameEn)}
                    </h4>
                    <p className="text-xs text-slate-500 font-semibold">{officer.rankHi}</p>
                  </div>
                </div>

                {officer.isActiveIO && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {t('सक्रिय IO', 'Active IO')}
                  </span>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-mono">PNO:</span>
                  <span className="font-mono font-bold text-slate-800">{officer.pno}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t('थाना:', 'Station:')}</span>
                  <span className="font-medium text-slate-800">{ps?.nameHi}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-slate-400">{t('मोबाइल:', 'Mobile:')}</span>
                  <a href={`tel:${officer.mobile}`} className="font-mono font-bold text-police-navy-800 flex items-center gap-1 hover:underline">
                    <Phone className="w-3 h-3 text-emerald-600" />
                    <span>{officer.mobile}</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
