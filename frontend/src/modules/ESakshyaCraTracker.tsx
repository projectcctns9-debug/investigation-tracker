import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DistrictPsSelector } from '../components/DistrictPsSelector';
import { 
  mockCraLogins, 
  mockOfficers, 
  mockFirRecords, 
  mockESakshyaSids,
  mockPoliceStations
} from '../data/mockData';
import { 
  Camera, 
  UserCheck, 
  UserX, 
  Link as LinkIcon, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  FileCheck, 
  Eye, 
  Hash, 
  MapPin, 
  Video, 
  Image, 
  Mic, 
  FileText,
  Search,
  ExternalLink
} from 'lucide-react';

interface ESakshyaCraTrackerProps {
  selectedDistrictId: string;
  selectedPsId: string;
  onDistrictChange: (id: string) => void;
  onPsChange: (id: string) => void;
}

export const ESakshyaCraTracker: React.FC<ESakshyaCraTrackerProps> = ({
  selectedDistrictId,
  selectedPsId,
  onDistrictChange,
  onPsChange
}) => {
  const { t, mode } = useLanguage();
  const getTodayDateString = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());
  const [selectedFirForSids, setSelectedFirForSids] = useState<string | null>('fir-1');
  const [sidList, setSidList] = useState(mockESakshyaSids);
  const [subTab, setSubTab] = useState<'cra-logins' | 'io-firs' | 'sids-linking'>('cra-logins');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter officers and CRA logins by District & PS
  const activePsIds = selectedPsId
    ? [selectedPsId]
    : mockPoliceStations
        .filter(ps => !selectedDistrictId || ps.districtId === selectedDistrictId)
        .map(ps => ps.id);

  const filteredCraLogins = mockCraLogins.filter(cra => 
    activePsIds.includes(cra.policeStationId) &&
    (searchTerm === '' || 
      cra.officerNameEn.toLowerCase().includes(searchTerm.toLowerCase()) || 
      cra.officerNameHi.includes(searchTerm) || 
      cra.pno.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalIos = filteredCraLogins.length;
  const loggedInCount = filteredCraLogins.filter(c => c.hasLoggedIn).length;
  const notLoggedInCount = totalIos - loggedInCount;

  // Filter FIRs
  const filteredFirs = mockFirRecords.filter(fir =>
    activePsIds.includes(fir.policeStationId) &&
    (searchTerm === '' ||
      fir.firNumber.includes(searchTerm) ||
      fir.ioNameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fir.ioNameHi.includes(searchTerm))
  );

  // Toggle SID final link
  const toggleSidFinalLink = (sidId: string) => {
    setSidList(prev => prev.map(s => {
      if (s.id === sidId) {
        const nextState = !s.isFinalLinkedToChallan;
        return {
          ...s,
          isFinalLinkedToChallan: nextState,
          finalLinkDate: nextState ? '2026-11-06' : undefined
        };
      }
      return s;
    }));
  };

  const currentFir = mockFirRecords.find(f => f.id === selectedFirForSids);
  const currentFirSids = sidList.filter(s => s.firId === selectedFirForSids);

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-police-navy-900 flex items-center gap-2">
            <Camera className="w-6 h-6 text-police-gold-600" />
            <span>{t('ई-साक्ष्य एवं CRA ट्रैकिंग', 'e-Sakshya & CRA Tracking')}</span>
          </h2>
          <p className="text-xs text-slate-500 font-hindi">
            {t('तारीख अनुसार CRA लॉगिन, विवेचक-वार FIR एवं ई-साक्ष्य SID लिंकिंग स्थिति', 'Date-wise CRA Login compliance, IO-wise FIR assignment, and e-Sakshya SID final linking status')}
          </p>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
          <Calendar className="w-4 h-4 text-police-navy-700" />
          <span className="text-xs font-semibold text-slate-600">{t('तारीख', 'Date')}:</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="text-xs font-medium text-slate-800 bg-transparent focus:outline-none cursor-pointer"
          />
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

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">
              {t('कुल विवेचक (IO)', 'Total Investigating Officers')}
            </p>
            <p className="text-2xl font-black text-police-navy-900 mt-1">{totalIos}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{t('पोर्टल पर सक्रिय', 'Active on Portal')}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-emerald-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-emerald-800">
              {t('आज CRA लॉगिन किया', 'CRA Logged-in Today')}
            </p>
            <p className="text-2xl font-black text-emerald-600 mt-1">{loggedInCount}</p>
            <p className="text-[11px] text-emerald-700 mt-0.5">
              {totalIos > 0 ? `${Math.round((loggedInCount / totalIos) * 100)}% उपस्थिति (Attendance)` : '0%'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-rose-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-rose-800">
              {t('लॉगिन नहीं किया (लंबित)', 'Not Logged-in (Pending)')}
            </p>
            <p className="text-2xl font-black text-rose-600 mt-1">{notLoggedInCount}</p>
            <p className="text-[11px] text-rose-700 mt-0.5">{t('समीक्षा एवं अनुपालन अपेक्षित', 'Action Required')}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <UserX className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Sub Tabs Navigation */}
      <div className="flex border-b border-slate-200 bg-white px-4 rounded-t-xl">
        <button
          onClick={() => setSubTab('cra-logins')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            subTab === 'cra-logins'
              ? 'border-police-navy-800 text-police-navy-900 bg-slate-50/80'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>{t('1. तारीख-वार CRA लॉगिन रिपोर्ट', '1. Date-wise CRA Login Report')}</span>
          <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-full font-mono">
            {filteredCraLogins.length}
          </span>
        </button>

        <button
          onClick={() => setSubTab('io-firs')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            subTab === 'io-firs'
              ? 'border-police-navy-800 text-police-navy-900 bg-slate-50/80'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>{t('2. IO-वार FIR एवं SID संख्या', '2. IO-wise FIR & SID Count')}</span>
          <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-full font-mono">
            {filteredFirs.length}
          </span>
        </button>

        <button
          onClick={() => setSubTab('sids-linking')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            subTab === 'sids-linking'
              ? 'border-police-navy-800 text-police-navy-900 bg-slate-50/80'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <LinkIcon className="w-4 h-4" />
          <span>{t('3. FIR-वार SID एवं फाइनल लिंकिंग', '3. FIR-wise SID & Final Linking')}</span>
        </button>
      </div>

      {/* Sub Tab 1: CRA Logins Table */}
      {subTab === 'cra-logins' && (
        <div className="bg-white border border-slate-200 rounded-b-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-3">
            <h3 className="text-sm font-bold text-police-navy-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-police-gold-600" />
              <span>{t('विवेचक (IO) दैनिक CRA लॉगिन स्थिति', 'IO Daily CRA Login Tracking Table')}</span>
              <span className="text-xs text-slate-500 font-normal">({selectedDate})</span>
            </h3>
            
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder={t('विवेचक / PNO खोजें...', 'Search IO name / PNO...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-police-navy-600"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">{t('क्र.', 'S.N.')}</th>
                  <th className="px-4 py-3">{t('विवेचक (IO) का नाम एवं PNO', 'IO Name & PNO')}</th>
                  <th className="px-4 py-3">{t('थाना (Police Station)', 'Police Station')}</th>
                  <th className="px-4 py-3 text-center">{t('CRA लॉगिन स्थिति', 'CRA Login Status')}</th>
                  <th className="px-4 py-3">{t('लॉगिन समय', 'Login Time')}</th>
                  <th className="px-4 py-3 text-center">{t('अद्यतन केस संख्या', 'Cases Updated')}</th>
                  <th className="px-4 py-3">{t('अंतिम गतिविधि विवरण', 'Last Registered Activity')}</th>
                  <th className="px-4 py-3 text-right">{t('कार्रवाई', 'Action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredCraLogins.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-slate-400 font-medium">
                      {t('कोई डेटा नहीं मिला', 'No records found for selected jurisdiction')}
                    </td>
                  </tr>
                ) : (
                  filteredCraLogins.map((cra, idx) => {
                    const psObj = mockPoliceStations.find(p => p.id === cra.policeStationId);
                    return (
                      <tr key={cra.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-slate-500">{idx + 1}</td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-900">
                            {mode === 'bilingual' ? `${cra.officerNameHi} (${cra.officerNameEn})` : (mode === 'hi' ? cra.officerNameHi : cra.officerNameEn)}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">PNO: {cra.pno}</div>
                        </td>
                        <td className="px-4 py-3 text-slate-700 font-medium">
                          {psObj ? (mode === 'bilingual' ? `${psObj.nameHi} (${psObj.nameEn})` : (mode === 'hi' ? psObj.nameHi : psObj.nameEn)) : '-'}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {cra.hasLoggedIn ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              {t('लॉगिन किया (Yes)', 'Logged In')}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300 animate-pulse">
                              <AlertCircle className="w-3 h-3 text-rose-600" />
                              {t('लॉगिन नहीं (No)', 'Not Logged In')}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-700">
                          {cra.loginTime || <span className="text-rose-500 italic font-sans">{t('लंबित', 'Pending')}</span>}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-block font-mono font-bold px-2 py-0.5 rounded text-xs ${cra.casesUpdatedCount > 0 ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-500'}`}>
                            {cra.casesUpdatedCount}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600 text-[11px] max-w-xs truncate">
                          {cra.lastActiveAction}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => {
                              setSubTab('io-firs');
                              setSearchTerm(cra.officerNameEn);
                            }}
                            className="text-police-navy-700 hover:text-police-navy-900 font-semibold underline text-[11px]"
                          >
                            {t('FIRs देखें', 'View FIRs')}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub Tab 2: IO-wise FIR details & SIDs generated */}
      {subTab === 'io-firs' && (
        <div className="bg-white border border-slate-200 rounded-b-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <h3 className="text-sm font-bold text-police-navy-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-police-gold-600" />
                <span>{t('विवेचक-वार FIR एवं ई-साक्ष्य SID विवरण', 'IO-wise FIR Allocation & SIDs Generated')}</span>
              </h3>
              <p className="text-[11px] text-slate-500 font-hindi">
                {t('प्रत्येक FIR के लिए उत्पन्न कुल SID एवं लिंकिंग की स्थिति', 'Total SIDs generated per FIR and final linking verification')}
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder={t('FIR नं / विवेचक खोजें...', 'Search FIR / IO...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-police-navy-600"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">{t('FIR नं. व वर्ष', 'FIR No & Year')}</th>
                  <th className="px-4 py-3">{t('अपराध शीर्ष एवं धाराएं (BNS)', 'Crime Head & BNS Sections')}</th>
                  <th className="px-4 py-3">{t('जांच अधिकारी (IO)', 'Investigating Officer')}</th>
                  <th className="px-4 py-3 text-center">{t('कुल उत्पन्न SID', 'Total SIDs Generated')}</th>
                  <th className="px-4 py-3 text-center">{t('लिंक की गई SID', 'Linked SIDs')}</th>
                  <th className="px-4 py-3 text-center">{t('फाइनल लिंक स्थिति', 'Final Link Status')}</th>
                  <th className="px-4 py-3 text-right">{t('SID विवरण व लिंकिंग', 'SID Details & Link')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredFirs.map((fir) => {
                  return (
                    <tr key={fir.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-extrabold text-police-navy-900 font-mono text-sm">
                          {fir.firNumber}
                        </span>
                        <div className="text-[11px] text-slate-500 font-mono">Dt: {fir.firDate}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-800">
                          {mode === 'bilingual' ? `${fir.crimeHeadHi} (${fir.crimeHead})` : (mode === 'hi' ? fir.crimeHeadHi : fir.crimeHead)}
                        </div>
                        <div className="text-[11px] text-police-navy-700 font-mono bg-slate-100 px-1.5 py-0.5 rounded inline-block mt-0.5">
                          {fir.actsSections}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900">
                          {mode === 'bilingual' ? `${fir.ioNameHi} (${fir.ioNameEn})` : (mode === 'hi' ? fir.ioNameHi : fir.ioNameEn)}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">{fir.ioMobile}</div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-blue-50 text-blue-800 border border-blue-200">
                          <Camera className="w-3 h-3 text-blue-600" />
                          {fir.totalSids} SIDs
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center font-mono font-bold text-slate-800">
                        {fir.linkedSids} / {fir.totalSids}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {fir.isAllSidsLinked ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            {t('पूर्णतः लिंक (100% Linked)', 'Final Linked')}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                            <AlertCircle className="w-3 h-3 text-amber-600" />
                            {t('लिंकिंग शेष (Pending Link)', 'Pending')}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => {
                            setSelectedFirForSids(fir.id);
                            setSubTab('sids-linking');
                          }}
                          className="bg-police-navy-800 hover:bg-police-navy-900 text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1 shadow-sm"
                        >
                          <LinkIcon className="w-3 h-3 text-police-gold-400" />
                          <span>{t('SID देखें / लिंक करें', 'View / Link SIDs')}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub Tab 3: FIR-wise SID list & Final Report Linking */}
      {subTab === 'sids-linking' && (
        <div className="bg-white border border-slate-200 rounded-b-xl shadow-sm overflow-hidden p-5 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-500 tracking-wide">
                {t('चयनित FIR विवरण (Selected FIR)', 'Selected FIR Details')}
              </span>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-lg font-black text-police-navy-900 font-mono">
                  FIR No. {currentFir?.firNumber || '142/2026'}
                </span>
                <span className="bg-police-gold-100 text-police-gold-900 px-2 py-0.5 rounded font-mono text-xs font-bold border border-police-gold-300">
                  {currentFir?.actsSections}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 font-hindi">
                {t('जांच अधिकारी:', 'Investigating Officer:')} <strong className="text-slate-900">{currentFir?.ioNameHi} ({currentFir?.ioNameEn})</strong> | {t('फरियादी:', 'Complainant:')} {currentFir?.complainantName}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold">{t('अन्य FIR चुनें:', 'Change FIR:')}</span>
              <select
                value={selectedFirForSids || ''}
                onChange={(e) => setSelectedFirForSids(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-police-navy-600"
              >
                {filteredFirs.map(f => (
                  <option key={f.id} value={f.id}>
                    FIR {f.firNumber} - {f.crimeHead}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* SIDs Cards */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-police-gold-600" />
              <span>{t('ई-साक्ष्य आईडी (SID) सूची एवं चालान लिंकिंग स्थिति', 'e-Sakshya SID Inventory & Final Challan Linking')}</span>
            </h4>

            <div className="space-y-3">
              {currentFirSids.length === 0 ? (
                <div className="text-center py-8 bg-slate-50 rounded-lg text-slate-400 text-xs">
                  {t('इस FIR के लिए अभी तक कोई SID दर्ज नहीं हुई है।', 'No SIDs recorded for this FIR yet.')}
                </div>
              ) : (
                currentFirSids.map((sid) => {
                  const getEvidenceIcon = (type: string) => {
                    switch (type) {
                      case 'Video': return <Video className="w-4 h-4 text-purple-600" />;
                      case 'Photo': return <Image className="w-4 h-4 text-blue-600" />;
                      case 'Audio': return <Mic className="w-4 h-4 text-amber-600" />;
                      default: return <FileText className="w-4 h-4 text-emerald-600" />;
                    }
                  };

                  return (
                    <div
                      key={sid.id}
                      className={`border rounded-xl p-4 transition-all ${
                        sid.isFinalLinkedToChallan 
                          ? 'bg-emerald-50/40 border-emerald-300' 
                          : 'bg-white border-amber-300 shadow-sm'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="p-1.5 bg-slate-100 rounded-lg border border-slate-200">
                              {getEvidenceIcon(sid.evidenceType)}
                            </span>
                            <span className="font-mono font-extrabold text-sm text-police-navy-900">
                              {sid.sidNumber}
                            </span>
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                              {sid.evidenceTypeHi}
                            </span>
                            <span className="text-xs text-slate-500 font-mono">
                              ⏱ {sid.collectedAt}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="truncate">{sid.locationDetails} ({sid.geoCoords})</span>
                            </div>
                            <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500 truncate">
                              <Hash className="w-3 h-3 text-slate-400 shrink-0" />
                              <span title={sid.hashValue}>SHA256: {sid.hashValue.substring(0, 24)}...</span>
                            </div>
                          </div>
                        </div>

                        {/* Linking Action Button */}
                        <div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-200">
                          {sid.isFinalLinkedToChallan ? (
                            <div className="text-right">
                              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-400">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                {t('फाइनल चालान से लिंक', 'Final Linked with Challan')}
                              </div>
                              <p className="text-[10px] text-emerald-700 font-mono mt-0.5">Linked on: {sid.finalLinkDate}</p>
                            </div>
                          ) : (
                            <div className="text-right">
                              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-400 animate-pulse">
                                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                                {t('चालान लिंकिंग शेष', 'Pending Link with Challan')}
                              </div>
                              <p className="text-[10px] text-amber-700 font-hindi mt-0.5">कोर्ट पेशी पूर्व लिंक आवश्यक</p>
                            </div>
                          )}

                          <button
                            onClick={() => toggleSidFinalLink(sid.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              sid.isFinalLinkedToChallan
                                ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                            }`}
                          >
                            {sid.isFinalLinkedToChallan ? t('अनलिंक करें', 'Unlink') : t('फाइनल लिंक करें', 'Final Link Now')}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
