import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DistrictPsSelector } from '../components/DistrictPsSelector';
import { mockFirRecords, mockPoliceStations } from '../data/mockData';
import { FileText, Search, PlusCircle, CheckCircle, Clock, AlertTriangle, ArrowUpRight } from 'lucide-react';

interface InvestigationRegisterProps {
  selectedDistrictId: string;
  selectedPsId: string;
  onDistrictChange: (id: string) => void;
  onPsChange: (id: string) => void;
}

export const InvestigationRegister: React.FC<InvestigationRegisterProps> = ({
  selectedDistrictId,
  selectedPsId,
  onDistrictChange,
  onPsChange
}) => {
  const { t, mode } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const activePsIds = selectedPsId
    ? [selectedPsId]
    : mockPoliceStations
        .filter(ps => !selectedDistrictId || ps.districtId === selectedDistrictId)
        .map(ps => ps.id);

  const filteredFirs = mockFirRecords.filter(f => {
    if (!activePsIds.includes(f.policeStationId)) return false;
    if (statusFilter !== 'all' && f.currentStatus !== statusFilter) return false;
    if (searchTerm && !f.firNumber.includes(searchTerm) && !f.ioNameEn.toLowerCase().includes(searchTerm.toLowerCase()) && !f.ioNameHi.includes(searchTerm) && !f.complainantName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-police-navy-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-police-gold-600" />
            <span>{t('थानावार विवेचना रजिस्टर', 'PS-wise Investigation Register')}</span>
          </h2>
          <p className="text-xs text-slate-500 font-hindi">
            {t('थानों में दर्ज FIRs, आवंटित जांच अधिकारी (IO), वर्तमान स्थिति एवं साक्ष्य संकलन रजिस्टर', 'Police station FIR register, assigned IOs, progress milestones and case diary status')}
          </p>
        </div>

        <button className="bg-police-navy-800 hover:bg-police-navy-900 text-white px-3.5 py-2 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 shadow-sm">
          <PlusCircle className="w-4 h-4 text-police-gold-400" />
          <span>{t('नई FIR दर्ज करें', 'Add New FIR')}</span>
        </button>
      </div>

      {/* Cascading Selector */}
      <DistrictPsSelector
        selectedDistrictId={selectedDistrictId}
        selectedPsId={selectedPsId}
        onDistrictChange={onDistrictChange}
        onPsChange={onPsChange}
        showAllPsOption={true}
      />

      {/* Filter and Search */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-semibold text-slate-500">{t('स्थिति:', 'Status:')}</span>
          {[
            { id: 'all', hi: 'सभी FIRs', en: 'All' },
            { id: 'Under Investigation', hi: 'विवेचनाधीन', en: 'Under Investigation' },
            { id: 'Challan Ready', hi: 'चालान तैयार', en: 'Challan Ready' },
            { id: 'Challan Presented', hi: 'कोर्ट में पेश', en: 'Presented' }
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setStatusFilter(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === s.id
                  ? 'bg-police-navy-800 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {mode === 'bilingual' ? `${s.hi} / ${s.en}` : (mode === 'hi' ? s.hi : s.en)}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder={t('FIR नं / फरियादी / IO खोजें...', 'Search FIR / Complainant / IO...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-police-navy-600"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">{t('FIR नं. व वर्ष', 'FIR No & Year')}</th>
                <th className="px-4 py-3">{t('दर्ज दिनांक', 'Date of FIR')}</th>
                <th className="px-4 py-3">{t('अपराध शीर्ष एवं धाराएं (BNS)', 'Crime Head & Sections')}</th>
                <th className="px-4 py-3">{t('फरियादी / अभियुक्त', 'Complainant / Accused')}</th>
                <th className="px-4 py-3">{t('जांच अधिकारी (IO)', 'Investigating Officer')}</th>
                <th className="px-4 py-3 text-center">{t('ई-साक्ष्य स्थिति', 'e-Sakshya Status')}</th>
                <th className="px-4 py-3 text-center">{t('विवेचना स्थिति', 'Status')}</th>
                <th className="px-4 py-3 text-right">{t('कार्रवाई', 'Action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredFirs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-400 font-medium">
                    {t('कोई FIR नहीं मिली', 'No FIR records found')}
                  </td>
                </tr>
              ) : (
                filteredFirs.map(fir => (
                  <tr key={fir.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono font-extrabold text-sm text-police-navy-900">
                      {fir.firNumber}
                    </td>
                    <td className="px-4 py-3 text-slate-600 font-mono">
                      {fir.firDate}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">
                        {mode === 'bilingual' ? `${fir.crimeHeadHi} (${fir.crimeHead})` : (mode === 'hi' ? fir.crimeHeadHi : fir.crimeHead)}
                      </div>
                      <div className="text-[10px] text-police-navy-700 font-mono bg-slate-100 px-1 py-0.5 rounded inline-block mt-0.5">
                        {fir.actsSections}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-slate-800 font-medium">
                        {t('फरियादी:', 'By:')} {fir.complainantName}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {t('अभियुक्त:', 'Accused:')} {fir.accusedNames.join(', ')}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900">
                        {mode === 'bilingual' ? `${fir.ioNameHi} (${fir.ioNameEn})` : (mode === 'hi' ? fir.ioNameHi : fir.ioNameEn)}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">{fir.ioMobile}</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        fir.isAllSidsLinked ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {fir.linkedSids}/{fir.totalSids} SIDs
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-block px-2.5 py-1 rounded text-[11px] font-bold bg-blue-100 text-blue-800">
                        {fir.currentStatusHi}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-police-navy-800 hover:text-police-navy-950 font-bold inline-flex items-center gap-1">
                        <span>{t('विवरण', 'View')}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-police-gold-600" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
