import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMaster } from '../context/MasterContext';
import { Building2, MapPin, Filter } from 'lucide-react';

interface DistrictPsSelectorProps {
  selectedDistrictId: string;
  selectedPsId: string;
  onDistrictChange: (districtId: string) => void;
  onPsChange: (psId: string) => void;
  showAllPsOption?: boolean;
}

export const DistrictPsSelector: React.FC<DistrictPsSelectorProps> = ({
  selectedDistrictId,
  selectedPsId,
  onDistrictChange,
  onPsChange,
  showAllPsOption = true
}) => {
  const { t, mode } = useLanguage();
  const { districts, getPoliceStationsByDistrict } = useMaster();

  const filteredPoliceStations = selectedDistrictId
    ? getPoliceStationsByDistrict(selectedDistrictId)
    : [];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-police-navy-800 font-semibold text-sm">
          <Filter className="w-4 h-4 text-police-gold-600" />
          <span>{t('क्षेत्रीय चयन (फ़िल्टर)', 'Jurisdiction Filter')}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 max-w-2xl">
          {/* District Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-police-navy-700" />
              <span>{t('जिला / इकाई चुनें', 'Select District / Unit')}</span>
            </label>
            <select
              value={selectedDistrictId}
              onChange={(e) => {
                const newDistId = e.target.value;
                onDistrictChange(newDistId);
                const psList = getPoliceStationsByDistrict(newDistId);
                onPsChange(showAllPsOption ? '' : (psList.length > 0 ? psList[0].id : ''));
              }}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-police-navy-600 focus:border-transparent font-medium"
            >
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {mode === 'bilingual' ? `${d.nameHi} (${d.nameEn})` : (mode === 'hi' ? d.nameHi : d.nameEn)} [{d.code}]
                </option>
              ))}
            </select>
          </div>

          {/* Police Station Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-police-navy-700" />
              <span>{t('थाना (PS) चुनें', 'Select Police Station')}</span>
            </label>
            <select
              value={selectedPsId}
              onChange={(e) => onPsChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-police-navy-600 focus:border-transparent font-medium"
            >
              {showAllPsOption && (
                <option value="">
                  {t('सभी थाने (All Police Stations)', 'All Police Stations')} ({filteredPoliceStations.length})
                </option>
              )}
              {filteredPoliceStations.map((ps) => (
                <option key={ps.id} value={ps.id}>
                  {ps.nameEn}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
