import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMaster } from '../context/MasterContext';
import { DistrictPsSelector } from '../components/DistrictPsSelector';
import { 
  FileCheck2, 
  Gavel, 
  Send, 
  Clock, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  Calendar,
  Building2,
  FileSpreadsheet
} from 'lucide-react';

interface ChargesheetTrackingModuleProps {
  selectedDistrictId: string;
  selectedPsId: string;
  onDistrictChange: (id: string) => void;
  onPsChange: (id: string) => void;
}

export const ChargesheetTrackingModule: React.FC<ChargesheetTrackingModuleProps> = ({
  selectedDistrictId,
  selectedPsId,
  onDistrictChange,
  onPsChange
}) => {
  const { t, mode } = useLanguage();
  const { submissions, policeStations } = useMaster();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Collect all chargesheet records across submissions
  const allChargesheets = submissions.flatMap(s => 
    (s.sectionC?.firRecords || []).map(r => ({
      ...r,
      psId: s.policeStationId,
      districtId: s.districtId,
      reportingDate: s.reportingDate
    }))
  );

  const filteredChargesheets = allChargesheets.filter(c => {
    if (selectedDistrictId && c.districtId !== selectedDistrictId) return false;
    if (selectedPsId && c.psId !== selectedPsId) return false;
    if (filterStatus === 'prepared' && !c.chargesheetPrepared) return false;
    if (filterStatus === 'presented' && c.courtSubmissionStatus !== 'Presented') return false;
    if (filterStatus === 'cctns-pending' && c.cctnsEntryStatus !== 'Pending') return false;
    if (filterStatus === 'cctns-done' && c.cctnsEntryStatus !== 'Completed') return false;
    if (searchTerm && !c.firNumber.includes(searchTerm) && !(c.courtEstablishmentName || '').toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-police-navy-900 flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-police-gold-600" />
            <span>{t('चालान निगरानी मॉड्यूल (Chargesheet Tracking)', 'Chargesheet Tracking & Court Presentation')}</span>
          </h2>
          <p className="text-xs text-slate-500 font-hindi">
            {t('चालान निर्माण, न्यायालय में पेशी एवं CCTNS प्रविष्टि का स्वतंत्र 3-स्तरीय कैरी-फॉरवर्ड रिकॉर्ड', 'Independent tracking: A. Chargesheet Prepared, B. Presented in Court, C. Entered in CCTNS')}
          </p>
        </div>
      </div>

      <DistrictPsSelector
        selectedDistrictId={selectedDistrictId}
        selectedPsId={selectedPsId}
        onDistrictChange={onDistrictChange}
        onPsChange={onPsChange}
        showAllPsOption={true}
      />

      {/* 3-Level Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
          <span className="text-[11px] font-semibold text-blue-700">{t('चालान तैयार (Prepared)', 'Prepared')}</span>
          <p className="text-2xl font-black text-blue-900 mt-1">3</p>
          <p className="text-[10px] text-blue-700">{t('दैनिक पूर्ण', 'Completed Today')}</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-center">
          <span className="text-[11px] font-semibold text-purple-700">{t('कोर्ट में पेश (Presented)', 'Court Presented')}</span>
          <p className="text-2xl font-black text-purple-900 mt-1">2</p>
          <p className="text-[10px] text-purple-700">{t('न्यायालय में जमा', 'Submitted in Court')}</p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
          <span className="text-[11px] font-semibold text-emerald-700">{t('CCTNS में दर्ज (Entered)', 'CCTNS Entered')}</span>
          <p className="text-2xl font-black text-emerald-900 mt-1">2</p>
          <p className="text-[10px] text-emerald-700">{t('जावक प्रविष्टि पूर्ण', 'Dispatch Done')}</p>
        </div>

        <div className="bg-rose-50 border border-rose-300 rounded-xl p-3 text-center">
          <span className="text-[11px] font-bold text-rose-800">{t('CCTNS प्रविष्टि शेष (Pending)', 'Pending CCTNS Entry')}</span>
          <p className="text-2xl font-black text-rose-700 mt-1">1</p>
          <p className="text-[10px] text-rose-700 font-bold">{t('कैरी फॉरवर्ड प्रविष्टि', 'Carry Forward')}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-semibold text-slate-500">{t('फ़िल्टर:', 'Filter:')}</span>
            {[
              { id: 'all', labelHi: 'सभी चालान', labelEn: 'All' },
              { id: 'presented', labelHi: 'कोर्ट में पेश', labelEn: 'Presented' },
              { id: 'cctns-done', labelHi: 'CCTNS दर्ज', labelEn: 'CCTNS Done' },
              { id: 'cctns-pending', labelHi: 'CCTNS प्रविष्टि शेष', labelEn: 'CCTNS Pending' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterStatus(f.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  filterStatus === f.id ? 'bg-police-navy-800 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {mode === 'bilingual' ? `${f.labelHi} / ${f.labelEn}` : (mode === 'hi' ? f.labelHi : f.labelEn)}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('FIR नं / कोर्ट खोजें...', 'Search FIR / Court...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b">
              <tr>
                <th className="px-4 py-3">{t('FIR नंबर', 'FIR No.')}</th>
                <th className="px-4 py-3">{t('थाना (PS)', 'Police Station')}</th>
                <th className="px-4 py-3 text-center">{t('चालान निर्माण दिनांक', 'Prep. Date')}</th>
                <th className="px-4 py-3 text-center">{t('कोर्ट पेशी स्थिति', 'Court Submission')}</th>
                <th className="px-4 py-3">{t('न्यायालय का नाम', 'Court Name')}</th>
                <th className="px-4 py-3 text-center">{t('CCTNS स्थिति', 'CCTNS Entry')}</th>
                <th className="px-4 py-3">{t('जावक क्रमांक (Dispatch No.)', 'Dispatch No.')}</th>
                <th className="px-4 py-3">{t('रिमार्क', 'Remarks')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono">
              {filteredChargesheets.map((cs, idx) => {
                const ps = policeStations.find(p => p.id === cs.psId);
                return (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-bold text-police-navy-900 text-sm">{cs.firNumber}</td>
                    <td className="px-4 py-3 font-sans text-slate-800 font-medium">{ps?.nameHi}</td>
                    <td className="px-4 py-3 text-center text-slate-600">{cs.preparationDate || cs.reportingDate}</td>
                    <td className="px-4 py-3 text-center font-sans">
                      {cs.courtSubmissionStatus === 'Presented' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          {t('पेश हुआ', 'Presented')}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          <Clock className="w-3 h-3 text-amber-600" />
                          {t('पेशी लंबित', 'Pending')}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-sans text-slate-700">{cs.courtEstablishmentName || 'CJM Court Durg'}</td>
                    <td className="px-4 py-3 text-center font-sans">
                      {cs.cctnsEntryStatus === 'Completed' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          {t('CCTNS दर्ज', 'Completed')}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 animate-pulse">
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                          {t('CCTNS शेष', 'Pending')}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-800">{cs.cctnsDispatchNo || '-'}</td>
                    <td className="px-4 py-3 font-sans text-slate-600 text-[11px]">{cs.remarks || cs.pendingReason || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
