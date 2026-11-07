import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DistrictPsSelector } from '../components/DistrictPsSelector';
import { mockBnsCustodyCases, mockPoliceStations } from '../data/mockData';
import { BnsCustodyCase } from '../types';
import { 
  CalendarClock, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Scale, 
  Send, 
  FileCheck2, 
  Gavel, 
  Search, 
  Filter,
  CheckCircle2,
  XCircle,
  HelpCircle,
  PhoneCall,
  User,
  ArrowRight
} from 'lucide-react';

interface BnsMonitoring6090Props {
  selectedDistrictId: string;
  selectedPsId: string;
  onDistrictChange: (id: string) => void;
  onPsChange: (id: string) => void;
}

export const BnsMonitoring6090: React.FC<BnsMonitoring6090Props> = ({
  selectedDistrictId,
  selectedPsId,
  onDistrictChange,
  onPsChange
}) => {
  const { t, mode } = useLanguage();
  const [cases, setCases] = useState<BnsCustodyCase[]>(mockBnsCustodyCases);
  const [filterType, setFilterType] = useState<'all' | 'due-today' | '60-days' | '90-days' | 'challan-ready' | 'cctns-pending'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal for entering CCTNS details after court presentation
  const [editingCaseForCctns, setEditingCaseForCctns] = useState<BnsCustodyCase | null>(null);
  const [cctnsDispatchInput, setCctnsDispatchInput] = useState('');
  const [cisCaseInput, setCisCaseInput] = useState('');
  const [cctnsOperatorInput, setCctnsOperatorInput] = useState('HC Rameshwar (CCTNS Writer)');

  // Filter cases by district and PS
  const activePsIds = selectedPsId
    ? [selectedPsId]
    : mockPoliceStations
        .filter(ps => !selectedDistrictId || ps.districtId === selectedDistrictId)
        .map(ps => ps.id);

  const filteredCases = cases.filter(c => {
    const matchesPs = activePsIds.includes(c.policeStationId);
    if (!matchesPs) return false;

    // Search query
    const matchesSearch = searchTerm === '' ||
      c.firNumber.includes(searchTerm) ||
      c.accusedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.ioNameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.ioNameHi.includes(searchTerm);
    if (!matchesSearch) return false;

    // Filter type
    if (filterType === 'due-today') return c.isDueTodayInCourt && !c.isPresentedInCourt;
    if (filterType === '60-days') return c.statutoryDays === 60;
    if (filterType === '90-days') return c.statutoryDays === 90;
    if (filterType === 'challan-ready') return c.challanStatus === 'Ready';
    if (filterType === 'cctns-pending') return c.cctnsEntryStatus === 'Pending';

    return true;
  });

  // Calculate high-level metrics
  const totalBnsCases = cases.filter(c => activePsIds.includes(c.policeStationId)).length;
  const count60Days = cases.filter(c => activePsIds.includes(c.policeStationId) && c.statutoryDays === 60).length;
  const count90Days = cases.filter(c => activePsIds.includes(c.policeStationId) && c.statutoryDays === 90).length;
  const countDueToday = cases.filter(c => activePsIds.includes(c.policeStationId) && c.isDueTodayInCourt && !c.isPresentedInCourt).length;
  const countChallanReady = cases.filter(c => activePsIds.includes(c.policeStationId) && (c.challanStatus === 'Ready' || c.challanStatus === 'Presented')).length;
  const countCctnsPending = cases.filter(c => activePsIds.includes(c.policeStationId) && c.cctnsEntryStatus === 'Pending').length;

  // Handler to mark case as presented in court
  const handleMarkPresented = (caseId: string) => {
    setCases(prev => prev.map(item => {
      if (item.id === caseId) {
        return {
          ...item,
          isPresentedInCourt: true,
          isDueTodayInCourt: false,
          challanStatus: 'Presented',
          challanStatusHi: 'कोर्ट में प्रस्तुत',
          courtPresentationDate: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));
  };

  // Handler to submit CCTNS entry
  const handleSaveCctnsEntry = () => {
    if (!editingCaseForCctns) return;

    setCases(prev => prev.map(item => {
      if (item.id === editingCaseForCctns.id) {
        return {
          ...item,
          cctnsEntryStatus: 'Completed',
          cctnsEntryStatusHi: 'CCTNS में दर्ज',
          cctnsDispatchNo: cctnsDispatchInput || 'DISP-CG-2026-9041',
          cisCaseNo: cisCaseInput || 'CIS-DURG-2026-3021',
          cctnsOperatorName: cctnsOperatorInput,
          cctnsEntryDate: new Date().toISOString().split('T')[0],
          isPresentedInCourt: true,
          challanStatus: 'Presented',
          challanStatusHi: 'कोर्ट में प्रस्तुत'
        };
      }
      return item;
    }));

    setEditingCaseForCctns(null);
    setCctnsDispatchInput('');
    setCisCaseInput('');
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-police-navy-900 flex items-center gap-2">
            <CalendarClock className="w-6 h-6 text-police-gold-600" />
            <span>{t('60/90 दिवस BNS मामला निगरानी', '60/90 Days BNS Case Monitoring')}</span>
          </h2>
          <p className="text-xs text-slate-500 font-hindi">
            {t('भारतीय नागरिक सुरक्षा संहिता (BNSS धारा 187) - 60 व 90 दिवसीय वैधानिक चालान, कोर्ट पेशी व CCTNS प्रविष्टि ट्रैकर', 'BNSS Section 187 Statutory Custody Timeline, Challan Preparation, Court Submission, and CCTNS Entry')}
          </p>
        </div>

        {/* Legal Advisory Pill */}
        <div className="bg-amber-50 border border-amber-300 text-amber-900 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{t('डिफ़ॉल्ट बेल से बचाव हेतु समय-सीमा अनुपालन अनिवार्य', 'Strict statutory timeline to prevent default bail')}</span>
        </div>
      </div>

      {/* 1. Cascading Selector: District -> Police Station */}
      <DistrictPsSelector
        selectedDistrictId={selectedDistrictId}
        selectedPsId={selectedPsId}
        onDistrictChange={onDistrictChange}
        onPsChange={onPsChange}
        showAllPsOption={true}
      />

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Total Cases */}
        <div 
          onClick={() => setFilterType('all')}
          className={`bg-white border rounded-xl p-3 shadow-sm cursor-pointer transition-all ${filterType === 'all' ? 'ring-2 ring-police-navy-800 border-police-navy-800' : 'border-slate-200 hover:border-slate-300'}`}
        >
          <p className="text-[11px] font-semibold text-slate-500">{t('कुल BNS मामले', 'Total BNS Cases')}</p>
          <p className="text-xl font-black text-police-navy-900 mt-1">{totalBnsCases}</p>
          <p className="text-[10px] text-slate-400">{t('न्यायिक रिमांड पर', 'In Custody')}</p>
        </div>

        {/* 60 Days Limit */}
        <div 
          onClick={() => setFilterType('60-days')}
          className={`bg-white border rounded-xl p-3 shadow-sm cursor-pointer transition-all ${filterType === '60-days' ? 'ring-2 ring-blue-600 border-blue-600' : 'border-slate-200 hover:border-slate-300'}`}
        >
          <p className="text-[11px] font-semibold text-blue-700">{t('60 दिवस सीमा', '60 Days Limit')}</p>
          <p className="text-xl font-black text-blue-700 mt-1">{count60Days}</p>
          <p className="text-[10px] text-slate-400">{t('<10 वर्ष सजा अपराध', '<10 Yrs Penalty')}</p>
        </div>

        {/* 90 Days Limit */}
        <div 
          onClick={() => setFilterType('90-days')}
          className={`bg-white border rounded-xl p-3 shadow-sm cursor-pointer transition-all ${filterType === '90-days' ? 'ring-2 ring-purple-600 border-purple-600' : 'border-slate-200 hover:border-slate-300'}`}
        >
          <p className="text-[11px] font-semibold text-purple-700">{t('90 दिवस सीमा', '90 Days Limit')}</p>
          <p className="text-xl font-black text-purple-700 mt-1">{count90Days}</p>
          <p className="text-[10px] text-slate-400">{t('गंभीर/आजीवन अपराध', 'Heinous Offence')}</p>
        </div>

        {/* Challan Ready */}
        <div 
          onClick={() => setFilterType('challan-ready')}
          className={`bg-white border rounded-xl p-3 shadow-sm cursor-pointer transition-all ${filterType === 'challan-ready' ? 'ring-2 ring-emerald-600 border-emerald-600' : 'border-slate-200 hover:border-slate-300'}`}
        >
          <p className="text-[11px] font-semibold text-emerald-700">{t('चालान तैयार', 'Challan Ready')}</p>
          <p className="text-xl font-black text-emerald-600 mt-1">{countChallanReady}</p>
          <p className="text-[10px] text-emerald-600">{t('पेशी हेतु पूर्ण', 'Ready for Court')}</p>
        </div>

        {/* Due Today in Court */}
        <div 
          onClick={() => setFilterType('due-today')}
          className={`bg-rose-50 border border-rose-300 rounded-xl p-3 shadow-sm cursor-pointer transition-all ${filterType === 'due-today' ? 'ring-2 ring-rose-600' : 'hover:bg-rose-100/50'}`}
        >
          <p className="text-[11px] font-bold text-rose-800 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
            {t('आज कोर्ट में पेशी', 'Due Today in Court')}
          </p>
          <p className="text-xl font-black text-rose-700 mt-1">{countDueToday}</p>
          <p className="text-[10px] text-rose-700">{t('तत्काल चालान पेश करें', 'Submit Today!')}</p>
        </div>

        {/* CCTNS Entry Pending */}
        <div 
          onClick={() => setFilterType('cctns-pending')}
          className={`bg-amber-50 border border-amber-300 rounded-xl p-3 shadow-sm cursor-pointer transition-all ${filterType === 'cctns-pending' ? 'ring-2 ring-amber-600' : 'hover:bg-amber-100/50'}`}
        >
          <p className="text-[11px] font-bold text-amber-800">{t('CCTNS एंट्री लंबित', 'CCTNS Entry Pending')}</p>
          <p className="text-xl font-black text-amber-700 mt-1">{countCctnsPending}</p>
          <p className="text-[10px] text-amber-700">{t('कोर्ट के बाद प्रविष्टि', 'Post-Court Entry')}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-semibold text-slate-500 shrink-0">{t('फ़िल्टर:', 'Filter:')}</span>
          {[
            { id: 'all', labelHi: 'सभी प्रकरण', labelEn: 'All Cases' },
            { id: 'due-today', labelHi: '🔔 आज पेशी (Due Today)', labelEn: 'Due Today' },
            { id: '60-days', labelHi: '60 दिवस', labelEn: '60 Days' },
            { id: '90-days', labelHi: '90 दिवस', labelEn: '90 Days' },
            { id: 'challan-ready', labelHi: 'चालान तैयार', labelEn: 'Challan Ready' },
            { id: 'cctns-pending', labelHi: 'CCTNS एंट्री शेष', labelEn: 'CCTNS Entry Pending' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterType === f.id
                  ? 'bg-police-navy-800 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {mode === 'bilingual' ? `${f.labelHi} / ${f.labelEn}` : (mode === 'hi' ? f.labelHi : f.labelEn)}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder={t('FIR नं / अभियुक्त / विवेचक खोजें...', 'Search FIR / Accused / IO...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-police-navy-600"
          />
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">{t('FIR विवरण एवं अपराध', 'FIR Details & Crime')}</th>
                <th className="px-4 py-3">{t('अभियुक्त एवं गिरफ़्तारी दिनांक', 'Accused & Arrest Date')}</th>
                <th className="px-4 py-3 text-center">{t('वैधानिक सीमा (दिन)', 'Timeline (60/90)')}</th>
                <th className="px-4 py-3 text-center">{t('शेष दिन (अंतिम तिथि)', 'Days Remaining (Deadline)')}</th>
                <th className="px-4 py-3 text-center">{t('चालान निर्माण स्थिति', 'Challan Status')}</th>
                <th className="px-4 py-3 text-center">{t('कोर्ट में पेशी स्थिति', 'Court Submission')}</th>
                <th className="px-4 py-3 text-center">{t('CCTNS में एंट्री स्थिति', 'CCTNS Entry Status')}</th>
                <th className="px-4 py-3 text-right">{t('कार्रवाई', 'Action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredCases.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-400 font-medium">
                    {t('कोई प्रकरण नहीं मिला', 'No cases found matching the criteria')}
                  </td>
                </tr>
              ) : (
                filteredCases.map((c) => {
                  const isUrgent = c.daysRemaining <= 5 && !c.isPresentedInCourt;

                  return (
                    <tr key={c.id} className={`hover:bg-slate-50 transition-colors ${c.isDueTodayInCourt && !c.isPresentedInCourt ? 'bg-rose-50/40' : ''}`}>
                      {/* FIR details */}
                      <td className="px-4 py-3">
                        <div className="font-mono font-extrabold text-sm text-police-navy-900">
                          {c.firNumber}
                        </div>
                        <div className="font-semibold text-slate-800 text-[11px]">
                          {mode === 'bilingual' ? `${c.crimeHeadHi} (${c.crimeHead})` : (mode === 'hi' ? c.crimeHeadHi : c.crimeHead)}
                        </div>
                        <div className="text-[10px] text-police-navy-700 font-mono bg-slate-100 px-1 py-0.5 rounded inline-block mt-0.5">
                          {c.actsSections}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1">
                          IO: <strong>{c.ioNameHi}</strong> ({c.ioMobile})
                        </div>
                      </td>

                      {/* Accused & Arrest date */}
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900">{c.accusedName}</div>
                        <div className="text-[11px] text-slate-600 font-mono flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{t('गिरफ़्तारी:', 'Arrested:')} {c.arrestDate}</span>
                        </div>
                      </td>

                      {/* 60 or 90 days limit */}
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-black ${c.statutoryDays === 60 ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-purple-100 text-purple-800 border border-purple-300'}`}>
                          {c.statutoryDays} {t('दिन', 'Days')}
                        </span>
                      </td>

                      {/* Days Elapsed / Days remaining */}
                      <td className="px-4 py-3 text-center">
                        {c.isPresentedInCourt ? (
                          <div>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              {t('पेश हो चुका', 'Presented')}
                            </span>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">{c.courtPresentationDate}</div>
                          </div>
                        ) : (
                          <div>
                            <span className={`inline-block font-mono font-extrabold text-sm px-2 py-0.5 rounded ${
                              isUrgent 
                                ? 'bg-rose-600 text-white animate-pulse' 
                                : c.daysRemaining <= 15 
                                ? 'bg-amber-100 text-amber-800 font-bold' 
                                : 'bg-slate-100 text-slate-800'
                            }`}>
                              {c.daysRemaining} {t('दिन शेष', 'days left')}
                            </span>
                            <div className="text-[10px] text-slate-500 font-mono mt-1">
                              {t('अंतिम:', 'Due:')} {c.deadlineDate}
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Challan preparation status */}
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                          c.challanStatus === 'Ready' || c.challanStatus === 'Presented'
                            ? 'bg-emerald-100 text-emerald-800 font-bold'
                            : c.challanStatus === 'Supervisory Review'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {c.challanStatusHi}
                        </span>
                      </td>

                      {/* Court Submission Status */}
                      <td className="px-4 py-3 text-center">
                        {c.isPresentedInCourt ? (
                          <div className="text-emerald-700 font-bold flex items-center justify-center gap-1">
                            <Gavel className="w-3.5 h-3.5" />
                            <span>{t('पेश किया गया', 'Submitted')}</span>
                          </div>
                        ) : c.isDueTodayInCourt ? (
                          <div className="space-y-1">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-rose-600 text-white animate-bounce shadow">
                              <AlertTriangle className="w-3 h-3" />
                              {t('आज कोर्ट पेशी!', 'Due Today!')}
                            </span>
                            <button
                              onClick={() => handleMarkPresented(c.id)}
                              className="block mx-auto text-[10px] bg-police-navy-800 hover:bg-police-navy-900 text-white px-2 py-0.5 rounded font-medium"
                            >
                              {t('पेश हुआ दर्ज करें', 'Mark Presented')}
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-500 text-[11px] italic font-medium">
                            {t('पेशी लंबित', 'Pending')}
                          </span>
                        )}
                        <div className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[140px] mx-auto">
                          {c.courtName}
                        </div>
                      </td>

                      {/* Post-Court CCTNS Entry Status */}
                      <td className="px-4 py-3 text-center">
                        {c.cctnsEntryStatus === 'Completed' ? (
                          <div className="bg-emerald-50 border border-emerald-200 rounded p-1.5 text-center">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800">
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              {t('CCTNS में दर्ज', 'CCTNS Done')}
                            </span>
                            <div className="text-[10px] text-slate-600 font-mono mt-0.5">
                              No: {c.cctnsDispatchNo}
                            </div>
                            <div className="text-[9px] text-slate-400 font-mono">
                              CIS: {c.cisCaseNo}
                            </div>
                          </div>
                        ) : (
                          <div className="bg-rose-50 border border-rose-200 rounded p-1.5 text-center">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-800 animate-pulse">
                              <XCircle className="w-3 h-3 text-rose-600" />
                              {t('CCTNS एंट्री शेष', 'Entry Pending')}
                            </span>
                            <p className="text-[10px] text-rose-600 mt-0.5 font-hindi">
                              {t('कोर्ट प्रविष्टि बाकी', 'Post-court form left')}
                            </p>
                          </div>
                        )}
                      </td>

                      {/* Action */}
                      <td className="px-4 py-3 text-right">
                        {c.cctnsEntryStatus === 'Pending' ? (
                          <button
                            onClick={() => {
                              setEditingCaseForCctns(c);
                              setCctnsDispatchInput(c.cctnsDispatchNo || `DISP-DURG-${c.firNumber.replace('/', '-')}`);
                              setCisCaseInput(c.cisCaseNo || `CIS-2026-${c.id.toUpperCase()}`);
                            }}
                            className="bg-police-navy-800 hover:bg-police-navy-900 text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1 shadow-sm whitespace-nowrap"
                          >
                            <Send className="w-3 h-3 text-police-gold-400" />
                            <span>{t('CCTNS एंट्री करें', 'Enter in CCTNS')}</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingCaseForCctns(c);
                              setCctnsDispatchInput(c.cctnsDispatchNo || '');
                              setCisCaseInput(c.cisCaseNo || '');
                            }}
                            className="text-police-navy-700 hover:text-police-navy-900 font-semibold underline text-xs whitespace-nowrap"
                          >
                            {t('विवरण देखें', 'View Entry')}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CCTNS Entry Modal */}
      {editingCaseForCctns && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-police-navy-100 rounded-lg text-police-navy-800">
                  <Send className="w-5 h-5 text-police-gold-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-police-navy-900">
                    {t('कोर्ट पेशी उपरांत CCTNS प्रविष्टि दर्ज करें', 'Post-Court CCTNS Entry Form')}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    FIR No. {editingCaseForCctns.firNumber} | अभियुक्त: {editingCaseForCctns.accusedName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingCaseForCctns(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 py-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {t('न्यायालय का नाम (Court Name)', 'Court Name')}
                </label>
                <input
                  type="text"
                  disabled
                  value={editingCaseForCctns.courtName}
                  className="w-full bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-slate-700 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {t('CCTNS चालान जावक क्रमांक (Dispatch No.) *', 'CCTNS Challan Dispatch No. *')}
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. DISP-2026-9041"
                    value={cctnsDispatchInput}
                    onChange={(e) => setCctnsDispatchInput(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-mono font-bold focus:ring-2 focus:ring-police-navy-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {t('ई-कोर्ट्स केस नंबर (CIS No.)', 'e-Courts Case No. (CIS No.)')}
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. CIS-DURG-2026-4412"
                    value={cisCaseInput}
                    onChange={(e) => setCisCaseInput(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-mono focus:ring-2 focus:ring-police-navy-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {t('CCTNS ऑपरेटर / लेखक का नाम (Operator Name)', 'CCTNS Operator Name')}
                </label>
                <input
                  type="text"
                  value={cctnsOperatorInput}
                  onChange={(e) => setCctnsOperatorInput(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium focus:ring-2 focus:ring-police-navy-600 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-[11px] flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  {t('इस प्रविष्टि को सहेजने के बाद CCTNS पोर्टल एवं डैशबोर्ड पर प्रकरण की स्थिति "कोर्ट में प्रस्तुत (Presented)" तथा "CCTNS दर्ज" हो जाएगी।', 'Saving will mark the case as Presented in Court and Completed in CCTNS across all reports.')}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                onClick={() => setEditingCaseForCctns(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                {t('रद्द करें', 'Cancel')}
              </button>
              <button
                onClick={handleSaveCctnsEntry}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-police-navy-800 hover:bg-police-navy-900 text-white shadow"
              >
                {t('CCTNS प्रविष्टि सहेजें', 'Save CCTNS Entry')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
