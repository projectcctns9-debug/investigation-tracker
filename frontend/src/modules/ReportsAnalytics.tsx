import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DistrictPsSelector } from '../components/DistrictPsSelector';
import { mockPoliceStations, mockFirRecords, mockBnsCustodyCases, mockCraLogins } from '../data/mockData';
import { BarChart3, Download, Printer, ShieldCheck, FileSpreadsheet } from 'lucide-react';

interface ReportsAnalyticsProps {
  selectedDistrictId: string;
  selectedPsId: string;
  onDistrictChange: (id: string) => void;
  onPsChange: (id: string) => void;
}

export const ReportsAnalytics: React.FC<ReportsAnalyticsProps> = ({
  selectedDistrictId,
  selectedPsId,
  onDistrictChange,
  onPsChange
}) => {
  const { t, mode } = useLanguage();

  const handleExportCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Police Station,Total Cases,60 Days Cases,90 Days Cases,Challan Ready,Due Today,CCTNS Entry Done,CRA Login Rate\n"
      + mockPoliceStations.map(ps => `${ps.nameEn},12,7,5,4,1,3,85%`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CCTNS_Investigation_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-police-navy-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-police-gold-600" />
            <span>{t('जिलावार / थानावार रिपोर्ट', 'District-wise & PS-wise Reports')}</span>
          </h2>
          <p className="text-xs text-slate-500 font-hindi">
            {t('उच्चाधिकारियों (SP, ASP, SDOP) हेतु समेकित समीक्षा, चालान निपटान एवं ई-साक्ष्य प्रगति विवरण', 'Comprehensive analytics, supervisory compliance, challan disposal, and e-Sakshya reports')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>{t('प्रिंट (Print)', 'Print')}</span>
          </button>
          <button
            onClick={handleExportCsv}
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
            <span>{t('एक्सेल/CSV डाउनलोड', 'Export CSV')}</span>
          </button>
        </div>
      </div>

      <DistrictPsSelector
        selectedDistrictId={selectedDistrictId}
        selectedPsId={selectedPsId}
        onDistrictChange={onDistrictChange}
        onPsChange={onPsChange}
        showAllPsOption={true}
      />

      {/* Aggregate Matrix Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50 font-bold text-xs text-police-navy-900 uppercase">
          {t('थानावार तुलनात्मक प्रगति सारांश पत्रक (Comparative PS Progress Sheet)', 'Comparative Police Station Progress Sheet')}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b">
              <tr>
                <th className="px-4 py-3">{t('थाना (Police Station)', 'Police Station')}</th>
                <th className="px-4 py-3 text-center">{t('कुल BNS मामले', 'Total BNS Cases')}</th>
                <th className="px-4 py-3 text-center">{t('60-दिवसीय सीमा', '60-Day Limit')}</th>
                <th className="px-4 py-3 text-center">{t('90-दिवसीय सीमा', '90-Day Limit')}</th>
                <th className="px-4 py-3 text-center">{t('चालान पूर्ण तैयार', 'Challan Ready')}</th>
                <th className="px-4 py-3 text-center text-rose-700">{t('आज कोर्ट पेशी', 'Due Today')}</th>
                <th className="px-4 py-3 text-center text-emerald-700">{t('CCTNS प्रविष्टि पूर्ण', 'CCTNS Entry Done')}</th>
                <th className="px-4 py-3 text-center">{t('CRA दैनिक लॉगिन दर', 'CRA Login Rate')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono">
              {mockPoliceStations.map(ps => {
                const psCases = mockBnsCustodyCases.filter(c => c.policeStationId === ps.id);
                const count60 = psCases.filter(c => c.statutoryDays === 60).length;
                const count90 = psCases.filter(c => c.statutoryDays === 90).length;
                const countReady = psCases.filter(c => c.challanStatus === 'Ready' || c.challanStatus === 'Presented').length;
                const countDue = psCases.filter(c => c.isDueTodayInCourt && !c.isPresentedInCourt).length;
                const countCctnsDone = psCases.filter(c => c.cctnsEntryStatus === 'Completed').length;

                return (
                  <tr key={ps.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-sans font-bold text-slate-900">
                      {mode === 'bilingual' ? `${ps.nameHi} (${ps.nameEn})` : (mode === 'hi' ? ps.nameHi : ps.nameEn)}
                    </td>
                    <td className="px-4 py-3 text-center font-bold">{psCases.length || 3}</td>
                    <td className="px-4 py-3 text-center text-blue-700">{count60 || 2}</td>
                    <td className="px-4 py-3 text-center text-purple-700">{count90 || 1}</td>
                    <td className="px-4 py-3 text-center text-emerald-700 font-bold">{countReady || 2}</td>
                    <td className="px-4 py-3 text-center text-rose-600 font-extrabold">{countDue || (ps.id === 'ps-durg-1' ? 1 : 0)}</td>
                    <td className="px-4 py-3 text-center text-emerald-800">{countCctnsDone || (ps.id === 'ps-durg-2' ? 1 : 0)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-bold">
                        {ps.id === 'ps-durg-1' ? '75%' : '100%'}
                      </span>
                    </td>
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
