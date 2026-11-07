import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useMaster } from '../context/MasterContext';
import { 
  FirSidItem, 
  CraIoItem, 
  ChargesheetFirItem, 
  BnsCustodyCaseItem,
  DailySubmissionRecord
} from '../types';
import { 
  Calendar, 
  Building2, 
  Shield, 
  Save, 
  Send, 
  PlusCircle, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Camera, 
  UserCheck, 
  FileCheck, 
  CalendarClock, 
  Info,
  Check,
  AlertCircle,
  FileSpreadsheet,
  Edit3,
  Plus,
  X
} from 'lucide-react';

export const POLICE_RANKS = [
  'आरक्षक (Constable)',
  'सीनियर कांस्टेबल (Senior Constable)',
  'प्रधान आरक्षक (Head Constable)',
  'सहायक उप-निरीक्षक (ASI)',
  'उप-निरीक्षक (SI)',
  'निरीक्षक (Inspector)',
  'डीएसपी / सीएसपी / एसडीओपी (DSP / CSP / SDOP)'
];

export const PsDailyDataEntry: React.FC = () => {
  const { t, mode } = useLanguage();
  const { currentUser } = useAuth();
  const { 
    policeStations, 
    districts, 
    getSubmissionForPsAndDate, 
    saveDailySection, 
    submitFinalDailyReport 
  } = useMaster();

  // If SHO is logged in, their PS is locked. If Admin is testing, allow testing the PS.
  const activePsId = currentUser.policeStationId || (policeStations.length > 0 ? policeStations[0].id : '');
  const activePs = policeStations.find(p => p.id === activePsId) || policeStations[0];
  const activeDistrict = districts.find(d => d.id === activePs?.districtId) || districts[0];

  const getTodayDateString = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [reportingDate, setReportingDate] = useState<string>(getTodayDateString());
  const [activeSection, setActiveSection] = useState<'A' | 'B' | 'C'>('A');
  const [submitSuccessModal, setSubmitSuccessModal] = useState<DailySubmissionRecord | null>(null);

  // SECTION A: e-Sakshya State (Starts fresh and empty)
  const [secAFirs, setSecAFirs] = useState<FirSidItem[]>([]);
  const [secAGeneralRemarks, setSecAGeneralRemarks] = useState('');

  // SECTION A: Modal Form State for Adding / Editing FIR
  const [showFirModal, setShowFirModal] = useState<boolean>(false);
  const [editingFirId, setEditingFirId] = useState<string | null>(null);
  const [modalFirNumber, setModalFirNumber] = useState<string>('');
  const [modalFirDate, setModalFirDate] = useState<string>(reportingDate);
  const [modalIoName, setModalIoName] = useState<string>('');
  const [modalIoRank, setModalIoRank] = useState<string>('');
  const [modalSidCreated, setModalSidCreated] = useState<boolean>(true);
  const [modalSidCount, setModalSidCount] = useState<number>(1);
  const [modalSidList, setModalSidList] = useState<string[]>(['']);
  const [modalFinalLink, setModalFinalLink] = useState<boolean>(false);
  const [modalPendingReason, setModalPendingReason] = useState<string>('');
  const [modalRemarks, setModalRemarks] = useState<string>('');

  // SECTION B: CRA Login State (Starts empty)
  const [secBIos, setSecBIos] = useState<CraIoItem[]>([]);
  const [secBGeneralRemarks, setSecBGeneralRemarks] = useState('');

  // SECTION B Modal Form State (Starts unselected / no default)
  const [showIoModal, setShowIoModal] = useState<boolean>(false);
  const [editingIoId, setEditingIoId] = useState<string | null>(null);
  const [modalIoNameB, setModalIoNameB] = useState<string>('');
  const [modalIoRankB, setModalIoRankB] = useState<string>('');
  const [modalIoLoggedInB, setModalIoLoggedInB] = useState<string>(''); // '' | 'yes' | 'no' (default empty)
  const [modalIoLoginCountB, setModalIoLoginCountB] = useState<number>(1);
  const [modalIoNotLoggedInReasonB, setModalIoNotLoggedInReasonB] = useState<string>('');
  const [modalIoRemarksB, setModalIoRemarksB] = useState<string>('');

  // SECTION C: Chargesheet Tracking State (Starts empty)
  const [secCChargesheets, setSecCChargesheets] = useState<ChargesheetFirItem[]>([]);
  const [secCGeneralRemarks, setSecCGeneralRemarks] = useState('');

  // SECTION C Modal Form State (Starts unselected / no default)
  const [showCsModal, setShowCsModal] = useState<boolean>(false);
  const [editingCsId, setEditingCsId] = useState<string | null>(null);
  const [modalCsFirNumber, setModalCsFirNumber] = useState<string>('');
  const [modalCsPrepared, setModalCsPrepared] = useState<string>(''); // '' | 'yes' | 'no' (default empty)
  const [modalCsStatutoryDays, setModalCsStatutoryDays] = useState<string>(''); // '' | '60' | '90' (default empty)
  const [modalCsCourtStatus, setModalCsCourtStatus] = useState<string>(''); // '' | 'Pending' | 'Presented' | 'Returned' (default empty)
  const [modalCsCourtName, setModalCsCourtName] = useState<string>('');
  const [modalCsCctnsStatus, setModalCsCctnsStatus] = useState<string>(''); // '' | 'Pending' | 'Completed' (default empty)
  const [modalCsRemarks, setModalCsRemarks] = useState<string>('');

  // SECTION D: BNS 60/90 Days State (Starts empty)
  const [secDCases, setSecDCases] = useState<BnsCustodyCaseItem[]>([]);
  const [secDGeneralRemarks, setSecDGeneralRemarks] = useState('');

  // Current submission record
  const currentSubmission = getSubmissionForPsAndDate(activePsId, reportingDate);

  // SECTION A Calculations
  const secATotalFirs = secAFirs.length;
  // Total SIDs generated across all FIRs
  const secATotalSidsCount = secAFirs.reduce((acc, f) => {
    if (f.sidNumbers && f.sidNumbers.length > 0) return acc + f.sidNumbers.length;
    if (f.sidCreated) return acc + (f.sidCount || 1);
    return acc;
  }, 0);
  const secASidCreatedCount = secAFirs.filter(f => f.sidCreated).length;
  const secAFinalLinkCount = secAFirs.filter(f => f.finalLinkCompleted).length;
  const secAPendingSidCount = secATotalFirs - secASidCreatedCount;
  const secAPendingFinalLinkCount = secATotalFirs - secAFinalLinkCount;

  // Handlers for Section A Form & Modal
  const openAddFirModal = () => {
    setEditingFirId(null);
    setModalFirNumber(''); // Blank by default, no pre-fill
    setModalFirDate(reportingDate);
    setModalIoName('');
    setModalIoRank('');
    setModalSidCreated(true);
    setModalSidCount(1);
    setModalSidList(['']); // Blank by default, no pre-fill
    setModalFinalLink(false);
    setModalPendingReason('');
    setModalRemarks('');
    setShowFirModal(true);
  };

  const openEditFirModal = (fir: FirSidItem) => {
    setEditingFirId(fir.id);
    setModalFirNumber(fir.firNumber);
    setModalFirDate(fir.firRegistrationDate);
    setModalIoName(fir.ioName || '');
    setModalIoRank(fir.ioRank || 'उप-निरीक्षक (SI)');
    setModalSidCreated(fir.sidCreated);
    const sids = fir.sidNumbers && fir.sidNumbers.length > 0 
      ? [...fir.sidNumbers] 
      : (fir.sidNumber ? [fir.sidNumber] : []);
    const count = sids.length > 0 ? sids.length : (fir.sidCreated ? (fir.sidCount || 1) : 0);
    setModalSidCount(count);
    setModalSidList(sids.length > 0 ? sids : (fir.sidCreated ? [''] : []));
    setModalFinalLink(fir.finalLinkCompleted);
    setModalPendingReason(fir.pendingReason || '');
    setModalRemarks(fir.remarks || '');
    setShowFirModal(true);
  };

  const handleSidCountChange = (countVal: number) => {
    const count = Math.max(0, Math.min(50, countVal));
    setModalSidCount(count);
    if (count === 0) {
      setModalSidCreated(false);
      setModalSidList([]);
      return;
    }
    setModalSidCreated(true);
    const updated = [...modalSidList];
    if (updated.length < count) {
      for (let i = updated.length; i < count; i++) {
        updated.push(''); // Blank by default, no pre-fill
      }
    } else if (updated.length > count) {
      updated.splice(count);
    }
    setModalSidList(updated);
  };

  const addAnotherSidField = () => {
    const updated = [...modalSidList, '']; // Blank by default, no pre-fill
    setModalSidList(updated);
    setModalSidCount(updated.length);
    setModalSidCreated(true);
  };

  const removeSingleSidField = (index: number) => {
    const updated = modalSidList.filter((_, i) => i !== index);
    setModalSidList(updated);
    setModalSidCount(updated.length);
    if (updated.length === 0) {
      setModalSidCreated(false);
    }
  };

  const handleSaveFirModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalFirNumber.trim()) {
      alert('त्रुटि (अस्वीकृत): FIR नंबर दर्ज करना अनिवार्य है!');
      return;
    }
    if (!modalIoRank) {
      alert('त्रुटि (अस्वीकृत): कृपया विवेचक का पद / रैंक चुनें!');
      return;
    }
    if (modalSidCreated && modalSidCount > 0) {
      const anyEmpty = modalSidList.some(s => !s.trim());
      if (anyEmpty) {
        alert('त्रुटि (अस्वीकृत): सभी दर्ज किए गए SID नंबर भरें अथवा अवांछित SID बॉक्स को हटा दें!');
        return;
      }
    }
    if (!modalSidCreated && !modalPendingReason.trim()) {
      alert('त्रुटि (अस्वीकृत): SID न बनने (लंबित रहने) का कारण दर्ज करना अनिवार्य है!');
      return;
    }

    const cleanedSids = modalSidCreated 
      ? modalSidList.map(s => s.trim()).filter(Boolean)
      : [];

    const item: FirSidItem = {
      id: editingFirId || `fir-${Date.now()}`,
      firNumber: modalFirNumber.trim(),
      firYear: parseInt(modalFirNumber.split('/')[1]) || 2026,
      firRegistrationDate: modalFirDate,
      ioName: modalIoName.trim() || 'विवेचक',
      ioRank: modalIoRank || 'उप-निरीक्षक (SI)',
      sidCreated: modalSidCreated && cleanedSids.length > 0,
      sidCount: cleanedSids.length,
      sidNumbers: cleanedSids,
      sidNumber: cleanedSids[0] || '',
      finalLinkCompleted: modalFinalLink,
      pendingReason: modalFinalLink ? '' : modalPendingReason,
      remarks: modalRemarks
    };

    if (editingFirId) {
      setSecAFirs(secAFirs.map(f => f.id === editingFirId ? item : f));
    } else {
      setSecAFirs([...secAFirs, item]);
    }

    setShowFirModal(false);
  };

  const removeFirFromSectionA = (id: string) => {
    setSecAFirs(prev => prev.filter(f => f.id !== id));
  };

  // Handlers for Section B Form & Modal
  const openAddIoModal = () => {
    setEditingIoId(null);
    setModalIoNameB('');
    setModalIoRankB('');
    setModalIoLoggedInB(''); // डिफ़ॉल्ट में कोई चयन नहीं
    setModalIoLoginCountB(1);
    setModalIoNotLoggedInReasonB('');
    setModalIoRemarksB('');
    setShowIoModal(true);
  };

  const openEditIoModal = (io: CraIoItem) => {
    setEditingIoId(io.id);
    setModalIoNameB(io.ioName || '');
    setModalIoRankB(io.rank || '');
    setModalIoLoggedInB(io.hasLoggedIn ? 'yes' : 'no');
    setModalIoLoginCountB(io.loginCount || 1);
    setModalIoNotLoggedInReasonB(io.notLoggedInReason || '');
    setModalIoRemarksB(io.remarks || '');
    setShowIoModal(true);
  };

  const handleSaveIoModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalIoNameB.trim()) {
      alert('त्रुटि (अस्वीकृत): विवेचक का नाम दर्ज करना अनिवार्य है!');
      return;
    }
    if (!modalIoRankB) {
      alert('त्रुटि (अस्वीकृत): कृपया पद / रैंक का चयन करें!');
      return;
    }
    if (!modalIoLoggedInB) {
      alert('त्रुटि (अस्वीकृत): कृपया लॉगिन स्थिति (हाँ या नहीं) चुनें!');
      return;
    }
    if (modalIoLoggedInB === 'no' && !modalIoNotLoggedInReasonB.trim()) {
      alert('त्रुटि (अस्वीकृत): लॉगिन न करने का कारण दर्ज करना अनिवार्य है!');
      return;
    }

    const isYes = modalIoLoggedInB === 'yes';
    const item: CraIoItem = {
      id: editingIoId || `io-${Date.now()}`,
      ioName: modalIoNameB.trim(),
      rank: modalIoRankB,
      hasLoggedIn: isYes,
      loginCount: isYes ? Number(modalIoLoginCountB || 1) : 0,
      notLoggedInReason: isYes ? '' : modalIoNotLoggedInReasonB.trim(),
      remarks: modalIoRemarksB.trim()
    };

    if (editingIoId) {
      setSecBIos(secBIos.map(i => i.id === editingIoId ? item : i));
    } else {
      setSecBIos([...secBIos, item]);
    }
    setShowIoModal(false);
  };

  const removeIoFromSectionB = (id: string) => {
    setSecBIos(prev => prev.filter(i => i.id !== id));
  };

  // Handlers for Section C Form & Modal
  const openAddCsModal = () => {
    setEditingCsId(null);
    setModalCsFirNumber('');
    setModalCsPrepared(''); // डिफ़ॉल्ट में कोई चयन नहीं
    setModalCsStatutoryDays(''); // डिफ़ॉल्ट में कोई चयन नहीं
    setModalCsCourtStatus(''); // डिफ़ॉल्ट में कोई चयन नहीं
    setModalCsCourtName('');
    setModalCsCctnsStatus(''); // डिफ़ॉल्ट में कोई चयन नहीं
    setModalCsRemarks('');
    setShowCsModal(true);
  };

  const openEditCsModal = (cs: ChargesheetFirItem) => {
    setEditingCsId(cs.id);
    setModalCsFirNumber(cs.firNumber || '');
    setModalCsPrepared(cs.chargesheetPrepared ? 'yes' : 'no');
    setModalCsStatutoryDays(cs.statutoryDays ? String(cs.statutoryDays) : '');
    setModalCsCourtStatus(cs.courtSubmissionStatus || '');
    setModalCsCourtName(cs.courtEstablishmentName || '');
    setModalCsCctnsStatus(cs.cctnsEntryStatus || '');
    setModalCsRemarks(cs.remarks || '');
    setShowCsModal(true);
  };

  const handleSaveCsModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalCsFirNumber.trim()) {
      alert('त्रुटि (अस्वीकृत): FIR नंबर दर्ज करना अनिवार्य है!');
      return;
    }
    if (!modalCsPrepared) {
      alert('त्रुटि (अस्वीकृत): कृपया चालान तैयार स्थिति (हाँ या नहीं) चुनें!');
      return;
    }
    if (!modalCsStatutoryDays) {
      alert('त्रुटि (अस्वीकृत): कृपया प्रकरण श्रेणी (60 या 90 दिवस) चुनें!');
      return;
    }
    if (!modalCsCourtStatus) {
      alert('त्रुटि (अस्वीकृत): कृपया कोर्ट में पेश स्थिति (हाँ या नहीं) चुनें!');
      return;
    }
    if (!modalCsCourtName.trim()) {
      alert('त्रुटि (अस्वीकृत): कृपया न्यायालय का नाम दर्ज करें!');
      return;
    }
    if (!modalCsCctnsStatus) {
      alert('त्रुटि (अस्वीकृत): कृपया CCTNS में एंट्री स्थिति (हाँ या नहीं) चुनें!');
      return;
    }

    const item: ChargesheetFirItem = {
      id: editingCsId || `cs-${Date.now()}`,
      firNumber: modalCsFirNumber.trim(),
      firYear: parseInt(modalCsFirNumber.split('/')[1]) || 2026,
      chargesheetPrepared: modalCsPrepared === 'yes',
      statutoryDays: modalCsStatutoryDays ? (parseInt(modalCsStatutoryDays) as 60 | 90) : undefined,
      courtSubmissionStatus: (modalCsCourtStatus as any) || 'Pending',
      courtEstablishmentName: modalCsCourtName.trim(),
      cctnsEntryStatus: (modalCsCctnsStatus as any) || 'Pending',
      remarks: modalCsRemarks.trim()
    };

    if (editingCsId) {
      setSecCChargesheets(secCChargesheets.map(c => c.id === editingCsId ? item : c));
    } else {
      setSecCChargesheets([...secCChargesheets, item]);
    }
    setShowCsModal(false);
  };

  const removeChargesheetFromSectionC = (id: string) => {
    setSecCChargesheets(prev => prev.filter(c => c.id !== id));
  };

  // Handlers for Section D
  const addCaseToSectionD = (statutoryDays: 60 | 90) => {
    const newCase: BnsCustodyCaseItem = {
      id: `bns-${Date.now()}`,
      firNumber: `${170 + secDCases.length}/2026`,
      firYear: 2026,
      registrationDate: reportingDate,
      arrestDate: reportingDate,
      bnsSections: statutoryDays === 60 ? 'BNS 303(2)' : 'BNS 103(1)',
      ioName: 'SI Rajesh Sharma',
      accusedName: 'Accused Person',
      statutoryDays,
      deadlineDate: '2026-12-05',
      daysElapsed: 1,
      daysRemaining: statutoryDays - 1,
      isDueToday: false,
      isOverdue: false,
      chargesheetPrepared: false,
      courtPresented: false,
      cctnsEntry: false,
      remarks: ''
    };
    setSecDCases([...secDCases, newCase]);
  };

  const removeCaseFromSectionD = (id: string) => {
    setSecDCases(secDCases.filter(c => c.id !== id));
  };

  // SECTION B Calculations
  const secBTotalIos = secBIos.length;
  const secBIosLoggedIn = secBIos.filter(i => i.hasLoggedIn).length;
  const secBIosNotLoggedIn = secBTotalIos - secBIosLoggedIn;
  const secBPercentage = secBTotalIos > 0 ? Math.round((secBIosLoggedIn / secBTotalIos) * 100) : 0;

  // SECTION C Calculations
  const secCPreparedCount = secCChargesheets.filter(c => c.chargesheetPrepared).length;
  const secCPresentedCount = secCChargesheets.filter(c => c.courtSubmissionStatus === 'Presented').length;
  const secCEnteredCount = secCChargesheets.filter(c => c.cctnsEntryStatus === 'Completed').length;
  const secCPendingCctns = secCChargesheets.filter(c => c.cctnsEntryStatus === 'Pending').length;
  const secCAwaitingCourt = secCChargesheets.filter(c => c.courtSubmissionStatus === 'Pending').length;

  // SECTION D Calculations
  const secD60Cases = secDCases.filter(c => c.statutoryDays === 60);
  const secD90Cases = secDCases.filter(c => c.statutoryDays === 90);

  // Section Save functions (Submits and Syncs directly from Form)
  const handleSaveSectionA = (status: 'Draft Saved' | 'Completed') => {
    if (status === 'Completed' && secAFirs.length === 0) {
      if (!confirm('चेतावनी: सेक्शन A में अभी कोई FIR दर्ज नहीं है। क्या आप शून्य प्रविष्टि के साथ सबमिट करना चाहते हैं?')) {
        return;
      }
    }
    saveDailySection(activePsId, reportingDate, 'sectionA', {
      totalFirsToday: secATotalFirs,
      sidCreatedCount: secASidCreatedCount,
      finalLinkCompletedCount: secAFinalLinkCount,
      pendingSidCount: secAPendingSidCount,
      pendingFinalLinkCount: secAPendingFinalLinkCount,
      firRecords: secAFirs,
      generalRemarks: secAGeneralRemarks
    }, status);

    if (status === 'Completed') {
      submitFinalDailyReport(activePsId, reportingDate, currentUser.fullNameHi || activePs?.shoName || 'थाना प्रभारी');
      alert('सेक्शन A (ई-साक्ष्य एवं SID) सफलतापूर्वक सबमिट हो गया और जिला व PHQ डैशबोर्ड पर तुरंत सिंक हो गया है!');
    } else {
      alert('सेक्शन A का ड्राफ्ट सहेज लिया गया है!');
    }
  };

  const handleSaveSectionB = (status: 'Draft Saved' | 'Completed') => {
    if (status === 'Completed' && secBIos.length === 0) {
      if (!confirm('चेतावनी: सेक्शन B में अभी कोई विवेचक दर्ज नहीं है। क्या आप शून्य प्रविष्टि के साथ सबमिट करना चाहते हैं?')) {
        return;
      }
    }
    saveDailySection(activePsId, reportingDate, 'sectionB', {
      totalIosPosted: secBTotalIos,
      iosLoggedInToday: secBIosLoggedIn,
      iosNotLoggedInToday: secBIosNotLoggedIn,
      craLoginPercentage: secBPercentage,
      ioRecords: secBIos,
      generalRemarks: secBGeneralRemarks
    }, status);

    if (status === 'Completed') {
      submitFinalDailyReport(activePsId, reportingDate, currentUser.fullNameHi || activePs?.shoName || 'थाना प्रभारी');
      alert('सेक्शन B (CRA लॉगिन विवरण) सफलतापूर्वक सबमिट हो गया और जिला व PHQ डैशबोर्ड पर तुरंत सिंक हो गया है!');
    } else {
      alert('सेक्शन B का ड्राफ्ट सहेज लिया गया है!');
    }
  };

  const handleSaveSectionC = (status: 'Draft Saved' | 'Completed') => {
    if (status === 'Completed' && secCChargesheets.length === 0) {
      if (!confirm('चेतावनी: सेक्शन C में अभी कोई चालान दर्ज नहीं है। क्या आप शून्य प्रविष्टि के साथ सबमिट करना चाहते हैं?')) {
        return;
      }
    }
    saveDailySection(activePsId, reportingDate, 'sectionC', {
      chargesheetsPreparedToday: secCPreparedCount,
      presentedInCourtToday: secCPresentedCount,
      enteredInCctnsToday: secCEnteredCount,
      pendingCctnsEntriesCumulative: secCPendingCctns,
      awaitingCourtPresentationCumulative: secCAwaitingCourt,
      firRecords: secCChargesheets,
      generalRemarks: secCGeneralRemarks
    }, status);

    if (status === 'Completed') {
      submitFinalDailyReport(activePsId, reportingDate, currentUser.fullNameHi || activePs?.shoName || 'थाना प्रभारी');
      alert('सेक्शन C (चालान एवं 60/90 दिवस) सफलतापूर्वक सबमिट हो गया और जिला व PHQ डैशबोर्ड पर तुरंत सिंक हो गया है!');
    } else {
      alert('सेक्शन C का ड्राफ्ट सहेज लिया गया है!');
    }
  };

  const handleSaveSectionD = (status: 'Draft Saved' | 'Completed') => {
    saveDailySection(activePsId, reportingDate, 'sectionD', {
      bns60TotalCases: secD60Cases.length,
      bns60PreparedToday: secD60Cases.filter(c => c.chargesheetPrepared).length,
      bns60PresentedToday: secD60Cases.filter(c => c.courtPresented).length,
      bns60CctnsEnteredToday: secD60Cases.filter(c => c.cctnsEntry).length,
      bns60PendingPreparation: secD60Cases.filter(c => !c.chargesheetPrepared).length,
      bns60PendingCourt: secD60Cases.filter(c => !c.courtPresented).length,
      bns60PendingCctns: secD60Cases.filter(c => !c.cctnsEntry).length,
      bns90TotalCases: secD90Cases.length,
      bns90PreparedToday: secD90Cases.filter(c => c.chargesheetPrepared).length,
      bns90PresentedToday: secD90Cases.filter(c => c.courtPresented).length,
      bns90CctnsEnteredToday: secD90Cases.filter(c => c.cctnsEntry).length,
      bns90PendingPreparation: secD90Cases.filter(c => !c.chargesheetPrepared).length,
      bns90PendingCourt: secD90Cases.filter(c => !c.courtPresented).length,
      bns90PendingCctns: secD90Cases.filter(c => !c.cctnsEntry).length,
      caseRecords: secDCases,
      generalRemarks: secDGeneralRemarks
    }, status);
    alert(status === 'Completed' ? 'Section D saved & marked completed!' : 'Section D draft saved!');
  };

  const handleFinalSubmit = () => {
    // Save all active sections as completed first
    handleSaveSectionA('Completed');
    handleSaveSectionB('Completed');
    handleSaveSectionC('Completed');

    const res = submitFinalDailyReport(activePsId, reportingDate, currentUser.fullNameHi || activePs?.shoName || 'SHO');
    setSubmitSuccessModal(res);
  };

  return (
    <div className="space-y-6">
      {/* Top Police Station Header (Strict identification - SHO cannot change assigned PS) */}
      <div className="bg-gradient-to-r from-police-navy-900 to-police-navy-800 text-white rounded-2xl p-5 shadow-lg border border-police-navy-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-police-gold-500 text-police-navy-950 font-black text-xs px-2.5 py-0.5 rounded uppercase tracking-wider">
                थाना दैनिक डेटा प्रविष्टि
              </span>
            </div>
            
            <h2 className="text-xl font-black mt-1.5 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-police-gold-400" />
              <span>{activePs?.nameHi}</span>
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-1 font-hindi">
              <span>जिला: <strong className="text-white">{activeDistrict?.nameHi}</strong></span>
              <span>•</span>
              <span>थाना प्रभारी / यूजर: <strong className="text-police-gold-300">{currentUser.fullNameHi || activePs?.shoName}</strong></span>
              <span>•</span>
              <span>पद: <strong className="text-white">{currentUser.roleLabelHi}</strong></span>
            </div>
          </div>

          {/* Reporting Date Selector */}
          <div className="bg-police-navy-950/80 p-3 rounded-xl border border-police-navy-700 text-xs flex flex-col gap-1 shrink-0">
            <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-police-gold-400" />
              <span>रिपोर्टिंग दिनांक:</span>
            </label>
            <input
              type="date"
              value={reportingDate}
              onChange={(e) => setReportingDate(e.target.value)}
              className="bg-police-navy-900 border border-police-navy-600 rounded px-2.5 py-1 text-white font-mono font-bold focus:outline-none focus:border-police-gold-400 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Return for correction notification banner (if returned by District Admin) */}
      {currentSubmission?.overallStatus === 'Returned for Correction' && (
        <div className="bg-rose-50 border-2 border-rose-400 rounded-xl p-4 text-rose-900 flex items-start gap-3 shadow-md animate-pulse">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <h4 className="font-extrabold text-sm text-rose-950">
              जिला एडमिन द्वारा रिपोर्ट सुधार हेतु वापस की गई है
            </h4>
            <p className="mt-1 text-rose-800">
              <strong>कारण:</strong> {currentSubmission.returnReason || 'कृपया ई-साक्ष्य एवं BNS 60/90 दिवस धाराओं की पुनः जांच कर सही डाटा भरें।'}
            </p>
          </div>
        </div>
      )}

      {/* 3 Independent Sections Tabs Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-200/80 p-1.5 rounded-xl">
        {[
          { key: 'A', titleHi: 'सेक्शन A: ई-साक्ष्य एवं SID', icon: <Camera className="w-4 h-4" /> },
          { key: 'B', titleHi: 'सेक्शन B: CRA दैनिक लॉगिन', icon: <UserCheck className="w-4 h-4" /> },
          { key: 'C', titleHi: 'सेक्शन C: चालान एवं कोर्ट पेशी', icon: <FileCheck className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveSection(tab.key as any)}
            className={`py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeSection === tab.key
                ? 'bg-police-navy-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.titleHi}</span>
          </button>
        ))}
      </div>

      {/* ============================================================== */}
      {/* SECTION A: e-SAKSHYA / FIR SID TRACKING */}
      {/* ============================================================== */}
      {activeSection === 'A' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
            <div>
              <h3 className="text-base font-extrabold text-police-navy-900 flex items-center gap-2">
                <Camera className="w-5 h-5 text-police-gold-600" />
                <span>सेक्शन A: ई-साक्ष्य एवं FIR SID ट्रैकिंग</span>
              </h3>
              <p className="text-xs text-slate-500 font-hindi">
                आज दर्ज कुल FIRs, बनाई गई SID (साक्ष्य ID) एवं FIR से फाइनल लिंकिंग की स्थिति
              </p>
            </div>

            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={() => handleSaveSectionA('Completed')}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>सेक्शन A पूर्ण करें</span>
              </button>
            </div>
          </div>



          {/* Section A FIR-wise Table with Form Trigger */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  FIR-वार ई-साक्ष्य एवं SID प्रविष्टि तालिका
                </h4>
                <p className="text-[11px] text-slate-500">प्रत्येक FIR के लिए एक या अधिक (10+ तक) SID जोड़ सकते हैं</p>
              </div>
              <div className="flex items-center gap-2">
                {secAFirs.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSecAFirs([])}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>सभी हटाएं</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={openAddFirModal}
                  className="bg-police-navy-800 hover:bg-police-navy-900 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all transform active:scale-95"
                >
                  <PlusCircle className="w-4 h-4 text-police-gold-400" />
                  <span>नया FIR जोड़ें</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b">
                  <tr>
                    <th className="px-3 py-3">FIR नंबर</th>
                    <th className="px-3 py-3">दर्ज दिनांक</th>
                    <th className="px-3 py-3">विवेचक एवं पद</th>
                    <th className="px-3 py-3 text-center">SID संख्या</th>
                    <th className="px-3 py-3">SID नंबर सूची (Sakshya IDs)</th>
                    <th className="px-3 py-3 text-center">FIR से फाइनल लिंक स्थिति</th>
                    <th className="px-3 py-3">लंबित कारण</th>
                    <th className="px-3 py-3">रिमार्क</th>
                    <th className="px-3 py-3 text-center sticky right-0 bg-slate-100 z-10 border-l border-slate-200 min-w-[90px] shadow-xs">कार्रवाई</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {secAFirs.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-4 py-10 text-center font-hindi bg-slate-50/50">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Camera className="w-8 h-8 text-slate-300" />
                          <p className="text-sm font-bold text-slate-600">कोई ई-साक्ष्य FIR दर्ज नहीं है</p>
                          <p className="text-xs text-slate-400">नया प्रकरण जोड़ने हेतु ऊपर '+ नया FIR जोड़ें' बटन दबाएं</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    secAFirs.map((fir) => {
                      const sids = fir.sidNumbers && fir.sidNumbers.length > 0 
                        ? fir.sidNumbers 
                        : (fir.sidNumber ? [fir.sidNumber] : []);
                      const sidTotal = sids.length || (fir.sidCreated ? (fir.sidCount || 1) : 0);

                      return (
                        <tr key={fir.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-3 py-3 font-mono font-bold text-police-navy-900 text-sm">
                            {fir.firNumber}
                          </td>
                          <td className="px-3 py-3 text-slate-600 font-mono">
                            {fir.firRegistrationDate}
                          </td>
                          <td className="px-3 py-3">
                            <div className="font-extrabold text-police-navy-900 text-xs flex items-center gap-1">
                              <UserCheck className="w-3.5 h-3.5 text-police-gold-600 shrink-0" />
                              <span>{fir.ioName || 'विवेचक'}</span>
                            </div>
                            <div className="text-[10px] text-police-navy-800 font-bold bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 inline-block mt-0.5">
                              {fir.ioRank || 'उप-निरीक्षक (SI)'}
                            </div>
                          </td>
                          <td className="px-3 py-3 text-center font-sans">
                            {fir.sidCreated && sidTotal > 0 ? (
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-blue-100 text-blue-800 border border-blue-200 inline-flex items-center gap-1">
                                <Camera className="w-3 h-3 text-blue-600" />
                                <span>{sidTotal} SID</span>
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                                लंबित (0)
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-3 max-w-xs">
                            {sids.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {sids.slice(0, 3).map((sid, sIdx) => (
                                  <span 
                                    key={sIdx} 
                                    className="bg-slate-100 text-slate-800 border border-slate-300 font-mono text-[10px] px-2 py-0.5 rounded font-semibold"
                                  >
                                    {sid}
                                  </span>
                                ))}
                                {sids.length > 3 && (
                                  <span className="bg-police-navy-100 text-police-navy-900 font-mono text-[10px] px-1.5 py-0.5 rounded font-bold">
                                    +{sids.length - 3} अन्य
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-slate-400 font-hindi italic text-[11px]">कोई SID नहीं</span>
                            )}
                          </td>
                          <td className="px-3 py-3 text-center font-sans">
                            {fir.finalLinkCompleted ? (
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>हाँ (पूर्ण)</span>
                              </span>
                            ) : (
                              <span className="px-2 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200 inline-flex items-center gap-1">
                                <Clock className="w-3 h-3 text-rose-600" />
                                <span>नहीं (लंबित)</span>
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-3 text-slate-600 font-hindi max-w-xs truncate">
                            {fir.pendingReason || '-'}
                          </td>
                          <td className="px-3 py-3 text-slate-600 font-hindi max-w-xs truncate">
                            {fir.remarks || '-'}
                          </td>
                          <td className="px-3 py-3 text-center sticky right-0 bg-white hover:bg-slate-50 z-10 border-l border-slate-200 min-w-[90px] shadow-xs">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                type="button"
                                title="संपादित करें"
                                onClick={() => openEditFirModal(fir)}
                                className="p-1.5 text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                title="हटाएं"
                                onClick={() => removeFirFromSectionA(fir.id)}
                                className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors border border-rose-200"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section A Bottom Submit Bar */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/70 p-4 rounded-xl border">
            <div>
              <span className="text-xs font-bold text-police-navy-950 block">
                ई-साक्ष्य प्रविष्टि सत्यापन
              </span>
              <p className="text-[11px] text-slate-500 font-hindi">
                डाटा जांच कर यहीं से सीधे सबमिट करें। सबमिट करने पर जिला एडमिन व PHQ पर तुरंत सिंक हो जाएगा।
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">

              <button
                type="button"
                onClick={() => handleSaveSectionA('Completed')}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-2 transition-transform active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>सेक्शन A सबमिट करें</span>
              </button>
            </div>
          </div>

          {/* Section A Remarks */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              सामान्य रिमार्क (सेक्शन A):
            </label>
            <input
              type="text"
              value={secAGeneralRemarks}
              onChange={(e) => setSecAGeneralRemarks(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-police-navy-800"
              placeholder="ई-साक्ष्य एवं FIR SID प्रविष्टि संबंधी सामान्य टीप..."
            />
          </div>

          {/* ============================================================== */}
          {/* POPUP MODAL: ई-साक्ष्य FIR एवं SID प्रविष्टि फॉर्म */}
          {/* ============================================================== */}
          {showFirModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl my-8 overflow-hidden">
                {/* Modal Header */}
                <div className="bg-police-navy-950 text-white p-4 flex items-center justify-between border-b-2 border-police-gold-500">
                  <div className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-police-gold-400" />
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {editingFirId ? 'ई-साक्ष्य FIR एवं SID प्रविष्टि संशोधित करें' : 'नई ई-साक्ष्य FIR एवं SID प्रविष्टि फॉर्म'}
                      </h3>
                      <p className="text-[11px] text-slate-300">
                        थाना: {activePs?.nameHi} [{activePs?.code}]
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowFirModal(false)}
                    className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-police-navy-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Form Body */}
                <form onSubmit={handleSaveFirModal} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
                  
                  {/* Row 1: FIR Number & Registration Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        1. FIR नंबर <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="उदा. 150/2026"
                        value={modalFirNumber}
                        onChange={(e) => setModalFirNumber(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800"
                      />
                      <span className="text-[10px] text-slate-400 font-hindi">प्रारूप: संख्या/वर्ष (जैसे 142/2026)</span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        2. दर्ज दिनांक <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={modalFirDate}
                        onChange={(e) => setModalFirDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-police-navy-800"
                      />
                    </div>
                  </div>

                  {/* Row 2: Investigating Officer (विवेचक) Name & Rank Dropdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-police-gold-600" />
                        <span>3. विवेचक का नाम (IO Name)</span> <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="उदा. राजेश शर्मा / आरक्षक राहुल"
                        value={modalIoName}
                        onChange={(e) => setModalIoName(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800"
                      />
                      <span className="text-[10px] text-slate-500 font-hindi">मामले के जांच/विवेचना अधिकारी का नाम</span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-police-gold-600" />
                        <span>4. विवेचक का पद / रैंक (Rank)</span> <span className="text-rose-600">*</span>
                      </label>
                      <select
                        value={modalIoRank}
                        onChange={(e) => setModalIoRank(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800 cursor-pointer shadow-2xs"
                      >
                        <option value="">-- पद / रैंक चुनें --</option>
                        {POLICE_RANKS.map((rk) => (
                          <option key={rk} value={rk}>
                            {rk}
                          </option>
                        ))}
                      </select>
                      <span className="text-[10px] text-slate-500 font-hindi">आरक्षक से लेकर डीएसपी/सीएसपी तक</span>
                    </div>
                  </div>

                  {/* Row 3: SID Created & SID Count */}
                  <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-200/80 pb-3">
                      <div>
                        <label className="block text-xs font-bold text-blue-950">
                          5. क्या इस FIR में ई-साक्ष्य (SID) बनाई गई है? <span className="text-rose-600">*</span>
                        </label>
                        <span className="text-[11px] text-blue-700">ई-साक्ष्य पोर्टल में साक्ष्य ID तैयार होने की स्थिति</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs font-bold text-slate-800">
                          <input
                            type="radio"
                            name="modalSidStatus"
                            checked={modalSidCreated}
                            onChange={() => {
                              setModalSidCreated(true);
                              if (modalSidCount === 0) handleSidCountChange(1);
                            }}
                            className="text-police-navy-900 focus:ring-police-navy-800"
                          />
                          <span>हाँ (SID बनी)</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs font-bold text-slate-800">
                          <input
                            type="radio"
                            name="modalSidStatus"
                            checked={!modalSidCreated}
                            onChange={() => {
                              setModalSidCreated(false);
                              setModalSidCount(0);
                              setModalSidList([]);
                            }}
                            className="text-rose-600 focus:ring-rose-500"
                          />
                          <span>नहीं (लंबित)</span>
                        </label>
                      </div>
                    </div>

                    {modalSidCreated && (
                      <div className="space-y-3 pt-1">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <label className="block text-xs font-bold text-blue-950">
                              कुल कितने SID बनाए गए हैं? (संख्या दर्ज करें) <span className="text-rose-600">*</span>
                            </label>
                            <span className="text-[10px] text-blue-700">यदि 10 SID बनी हैं तो 10 लिखें या नीचे '+ अन्य SID जोड़ें' दबाएं</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {[1, 2, 3, 5, 10].map((num) => (
                              <button
                                key={num}
                                type="button"
                                onClick={() => handleSidCountChange(num)}
                                className={`px-2 py-0.5 rounded text-xs font-mono font-bold transition-all ${
                                  modalSidCount === num 
                                    ? 'bg-police-navy-900 text-white shadow' 
                                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                                }`}
                              >
                                {num}
                              </button>
                            ))}
                            <input
                              type="number"
                              min="1"
                              max="50"
                              value={modalSidCount || ''}
                              onChange={(e) => handleSidCountChange(parseInt(e.target.value) || 0)}
                              className="w-16 bg-white border border-blue-300 rounded px-2 py-1 text-xs font-mono font-bold text-center"
                            />
                          </div>
                        </div>

                        {/* Dynamic SID input fields */}
                        <div className="space-y-2 pt-2 border-t border-blue-200">
                          <div className="flex items-center justify-between">
                            <label className="block text-xs font-bold text-slate-800">
                              सभी SID नंबर दर्ज करें ({modalSidList.length} SID): <span className="text-rose-600 font-extrabold">* (अनिवार्य / Mandatory)</span>
                            </label>
                            <button
                              type="button"
                              onClick={addAnotherSidField}
                              className="bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>+ अन्य SID जोड़ें</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto p-1 bg-white/70 rounded-xl border border-blue-200">
                            {modalSidList.map((sidVal, sIdx) => (
                              <div key={sIdx} className="flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200 shadow-2xs">
                                <span className="w-6 text-[10px] font-mono font-bold text-slate-500 text-center">
                                  #{sIdx + 1}
                                </span>
                                <input
                                  type="text"
                                  required
                                  placeholder="SID नंबर दर्ज करें (उदा. SID-2026-001) *"
                                  value={sidVal}
                                  onChange={(e) => {
                                    const updated = [...modalSidList];
                                    updated[sIdx] = e.target.value;
                                    setModalSidList(updated);
                                  }}
                                  className="flex-1 bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs font-mono font-semibold focus:outline-none focus:border-police-navy-900"
                                />
                                {modalSidList.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeSingleSidField(sIdx)}
                                    className="text-slate-400 hover:text-rose-600 p-1"
                                    title="इस SID को हटाएं"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Row 3: Final Link Status & Reason */}
                  <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200 pb-2.5">
                      <div>
                        <label className="block text-xs font-bold text-emerald-950">
                          6. क्या ई-साक्ष्य का फाइनल लिंक FIR से (Final Link) पूर्ण हुआ है? <span className="text-rose-600">*</span>
                        </label>
                        <span className="text-[11px] text-emerald-700">FIR के साथ सभी SID की अंतिम लिंकिंग</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs font-bold text-slate-800">
                          <input
                            type="radio"
                            name="modalFinalLink"
                            checked={modalFinalLink}
                            onChange={() => setModalFinalLink(true)}
                            className="text-emerald-700 focus:ring-emerald-600"
                          />
                          <span className="text-emerald-800">हाँ (FIR से फाइनल लिंक पूर्ण)</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs font-bold text-slate-800">
                          <input
                            type="radio"
                            name="modalFinalLink"
                            checked={!modalFinalLink}
                            onChange={() => setModalFinalLink(false)}
                            className="text-rose-600 focus:ring-rose-500"
                          />
                          <span className="text-rose-800">नहीं (लंबित)</span>
                        </label>
                      </div>
                    </div>

                    {!modalFinalLink && (
                      <div>
                        <label className="block text-xs font-bold text-rose-900 mb-1">
                          लंबित रहने का कारण (Pending Reason): <span className="text-rose-600">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="उदा. विवेचक द्वारा केस डायरी समीक्षाधीन / FSL रिपोर्ट प्रतीक्षित"
                          value={modalPendingReason}
                          onChange={(e) => setModalPendingReason(e.target.value)}
                          className="w-full bg-white border border-rose-300 rounded-xl px-3 py-1.5 text-xs text-rose-950 focus:outline-none focus:ring-1 focus:ring-rose-600"
                        />
                      </div>
                    )}
                  </div>

                  {/* Row 4: Remarks */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      7. रिमार्क / विशेष टीप (वैकल्पिक)
                    </label>
                    <input
                      type="text"
                      placeholder="उदा. घटनास्थल वीडियो एवं फोटोग्राफ्स SID तैयार, जब्ती साक्ष्य संलग्न"
                      value={modalRemarks}
                      onChange={(e) => setModalRemarks(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-police-navy-800"
                    />
                  </div>

                  {/* Modal Footer Actions */}
                  <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowFirModal(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-300 transition-colors"
                    >
                      रद्द करें
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-police-navy-900 hover:bg-police-navy-950 text-police-gold-400 shadow-md flex items-center gap-1.5 transition-all transform active:scale-95"
                    >
                      <Check className="w-4 h-4" />
                      <span>{editingFirId ? 'संशोधन सुरक्षित करें' : 'FIR एवं SID सुरक्षित करें'}</span>
                    </button>
                  </div>

                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION B: CRA APPLICATION LOGIN TRACKING */}
      {/* ============================================================== */}
      {activeSection === 'B' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
            <div>
              <h3 className="text-base font-extrabold text-police-navy-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-police-gold-600" />
                <span>{t('सेक्शन B: CRA Application Login Details', 'Section B: CRA Application Login Tracking')}</span>
              </h3>
              <p className="text-xs text-slate-500 font-hindi">
                {t('थाने में पदस्थ कुल विवेचक एवं आज CRA में लॉगिन करने वाले विवेचकों की स्थिति', 'Investigating Officers CRA application login compliance')}
              </p>
            </div>

            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={() => handleSaveSectionB('Completed')}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{t('सेक्शन B पूर्ण करें', 'Save Section B')}</span>
              </button>
            </div>
          </div>



          {/* Section B IO Table with Modal Form Trigger */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {t('विवेचक-वार CRA लॉगिन प्रविष्टि', 'IO-wise CRA Login Records')}
                </h4>
                <p className="text-[11px] text-slate-500">प्रत्येक पदस्थ विवेचक की दैनिक लॉगिन स्थिति दर्ज करें</p>
              </div>
              <div className="flex items-center gap-2">
                {secBIos.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSecBIos([])}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>सभी हटाएं</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={openAddIoModal}
                  className="bg-police-navy-800 hover:bg-police-navy-900 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all transform active:scale-95"
                >
                  <PlusCircle className="w-4 h-4 text-police-gold-400" />
                  <span>{t('नया IO जोड़ें', 'Add IO')}</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b">
                  <tr>
                    <th className="px-3 py-3 w-12 text-center">क्र.</th>
                    <th className="px-3 py-3">विवेचक (IO) का नाम</th>
                    <th className="px-3 py-3">पद (Rank)</th>
                    <th className="px-3 py-3 text-center">लॉगिन किया?</th>
                    <th className="px-3 py-3">लॉगिन विवरण / न करने का कारण</th>
                    <th className="px-3 py-3">रिमार्क</th>
                    <th className="px-3 py-3 text-center sticky right-0 bg-slate-100 z-10 border-l border-slate-200 min-w-[90px] shadow-xs">कार्रवाई</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {secBIos.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-10 text-center font-hindi bg-slate-50/50">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <UserCheck className="w-8 h-8 text-slate-300" />
                          <p className="text-sm font-bold text-slate-600">कोई विवेचक (IO) प्रविष्टि दर्ज नहीं है</p>
                          <p className="text-xs text-slate-400">नया विवेचक जोड़ने हेतु ऊपर '+ नया IO जोड़ें' बटन दबाएं</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    secBIos.map((io, idx) => (
                      <tr key={io.id} className="hover:bg-slate-50">
                        <td className="px-3 py-3 text-center font-mono text-slate-400 font-bold">{idx + 1}</td>
                        <td className="px-3 py-3 font-bold text-police-navy-900">{io.ioName}</td>
                        <td className="px-3 py-3">
                          <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-xs font-semibold border border-slate-200">
                            {io.rank}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-center">
                          {io.hasLoggedIn ? (
                            <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>हाँ (लॉगिन किया)</span>
                            </span>
                          ) : (
                            <span className="bg-rose-100 text-rose-800 border border-rose-200 px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-rose-600" />
                              <span>नहीं (लॉगिन नहीं)</span>
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-3">
                          {io.hasLoggedIn ? (
                            <span className="font-semibold text-emerald-900 text-xs">
                              कितनी बार: <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{io.loginCount || 1}</span> बार
                            </span>
                          ) : (
                            <span className="text-rose-900 font-semibold text-xs bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                              कारण: {io.notLoggedInReason || '-'}
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-3 text-slate-600 text-xs">{io.remarks || '-'}</td>
                        <td className="px-3 py-3 text-center sticky right-0 bg-white hover:bg-slate-50 z-10 border-l border-slate-200 min-w-[90px] shadow-xs">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              title="संपादित करें"
                              onClick={() => openEditIoModal(io)}
                              className="p-1.5 text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              title="हटाएं"
                              onClick={() => removeIoFromSectionB(io.id)}
                              className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors border border-rose-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section B Bottom Submit Bar */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/70 p-4 rounded-xl border">
            <div>
              <span className="text-xs font-bold text-police-navy-950 block">
                CRA दैनिक लॉगिन सत्यापन
              </span>
              <p className="text-[11px] text-slate-500 font-hindi">
                विवेचक लॉगिन स्थिति जांच कर यहीं से सबमिट करें।
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">

              <button
                type="button"
                onClick={() => handleSaveSectionB('Completed')}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-2 transition-transform active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>सेक्शन B सबमिट करें</span>
              </button>
            </div>
          </div>

          {/* Section B Modal Popup Form */}
          {showIoModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl my-8 overflow-hidden">
                <div className="bg-police-navy-950 text-white p-4 flex items-center justify-between border-b-2 border-police-gold-500">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-police-gold-400" />
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {editingIoId ? 'विवेचक CRA लॉगिन विवरण संपादित करें' : 'नया विवेचक (IO) CRA लॉगिन प्रविष्टि फॉर्म'}
                      </h3>
                      <p className="text-[11px] text-slate-300">
                        थाना: {activePs?.nameHi} [{activePs?.code}]
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowIoModal(false)}
                    className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-police-navy-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveIoModal} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      1. विवेचक (IO) का नाम <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="विवेचक का नाम दर्ज करें (उदा. राजेश शर्मा)"
                      value={modalIoNameB}
                      onChange={(e) => setModalIoNameB(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      2. विवेचक का पद / रैंक (Rank) <span className="text-rose-600">*</span>
                    </label>
                    <select
                      required
                      value={modalIoRankB}
                      onChange={(e) => setModalIoRankB(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800 cursor-pointer shadow-2xs"
                    >
                      <option value="">-- पद / रैंक चुनें --</option>
                      {POLICE_RANKS.map((rk) => (
                        <option key={rk} value={rk}>
                          {rk}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      3. क्या आज CRA लॉगिन किया? <span className="text-rose-600">*</span>
                    </label>
                    <select
                      required
                      value={modalIoLoggedInB}
                      onChange={(e) => setModalIoLoggedInB(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800 cursor-pointer shadow-2xs"
                    >
                      <option value="">-- लॉगिन स्थिति चुनें --</option>
                      <option value="yes">हाँ (आज CRA में लॉगिन किया)</option>
                      <option value="no">नहीं (आज लॉगिन नहीं किया)</option>
                    </select>
                  </div>

                  {modalIoLoggedInB === 'yes' && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 space-y-1">
                      <label className="block text-xs font-bold text-emerald-900">
                        4. आज कुल कितनी बार CRA लॉगिन किया? (संख्या)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={modalIoLoginCountB}
                          onChange={(e) => setModalIoLoginCountB(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-24 bg-white border border-emerald-300 rounded-lg px-3 py-1.5 text-xs font-mono font-bold text-emerald-900 text-center"
                        />
                        <span className="text-xs text-emerald-700 font-bold">बार</span>
                      </div>
                    </div>
                  )}

                  {modalIoLoggedInB === 'no' && (
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 space-y-1">
                      <label className="block text-xs font-bold text-rose-900">
                        4. लॉगिन न करने का कारण <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="लॉगिन न करने का कारण दर्ज करें (उदा. न्यायालय ड्यूटी / अवकाश)"
                        value={modalIoNotLoggedInReasonB}
                        onChange={(e) => setModalIoNotLoggedInReasonB(e.target.value)}
                        className="w-full bg-white border border-rose-300 rounded-lg px-3 py-2 text-xs text-rose-900"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      5. रिमार्क (वैकल्पिक):
                    </label>
                    <input
                      type="text"
                      placeholder="रिमार्क दर्ज करें"
                      value={modalIoRemarksB}
                      onChange={(e) => setModalIoRemarksB(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                    />
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowIoModal(false)}
                      className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100"
                    >
                      रद्द करें
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-police-navy-800 hover:bg-police-navy-900 text-white rounded-xl text-xs font-bold shadow"
                    >
                      {editingIoId ? 'अद्यतन करें (Update)' : 'सहेजें (Save)'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION C: CHARGESHEET TRACKING / चालान निगरानी */}
      {/* ============================================================== */}
      {activeSection === 'C' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
            <div>
              <h3 className="text-base font-extrabold text-police-navy-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-police-gold-600" />
                <span>{t('सेक्शन C: Chargesheet Tracking / चालान निगरानी (60 एवं 90 दिवस)', 'Section C: Chargesheet Tracking')}</span>
              </h3>
              <p className="text-xs text-slate-500 font-hindi">
                {t('चालान निर्माण, 60/90 दिवस श्रेणी, कोर्ट पेशी एवं CCTNS प्रविष्टि की निगरानी', 'Tracking of 60/90 Days Chargesheet Preparation, Court Presentation & CCTNS Entry')}
              </p>
            </div>

            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={() => handleSaveSectionC('Completed')}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{t('सेक्शन C पूर्ण करें', 'Save Section C')}</span>
              </button>
            </div>
          </div>



          {/* Section C FIR Table with Modal Trigger */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {t('FIR-वार चालान प्रगति प्रविष्टि (60/90 दिवस निगरानी सहित)', 'FIR-wise Chargesheet Records')}
                </h4>
                <p className="text-[11px] text-slate-500">प्रत्येक चालान की 60/90 दिवस समय-सीमा व कोर्ट पेशी दर्ज करें</p>
              </div>
              <div className="flex items-center gap-2">
                {secCChargesheets.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSecCChargesheets([])}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>सभी हटाएं</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={openAddCsModal}
                  className="bg-police-navy-800 hover:bg-police-navy-900 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all transform active:scale-95"
                >
                  <PlusCircle className="w-4 h-4 text-police-gold-400" />
                  <span>{t('नया चालान जोड़ें', 'Add Chargesheet')}</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b">
                  <tr>
                    <th className="px-3 py-3 w-12 text-center">क्र.</th>
                    <th className="px-3 py-3">FIR नंबर</th>
                    <th className="px-3 py-3 text-center">चालान तैयार?</th>
                    <th className="px-3 py-3">प्रकरण श्रेणी</th>
                    <th className="px-3 py-3">कोर्ट में पेश?</th>
                    <th className="px-3 py-3">न्यायालय का नाम</th>
                    <th className="px-3 py-3">CCTNS में एंट्री?</th>
                    <th className="px-3 py-3">रिमार्क / कारण</th>
                    <th className="px-3 py-3 text-center sticky right-0 bg-slate-100 z-10 border-l border-slate-200 min-w-[90px] shadow-xs">कार्रवाई</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {secCChargesheets.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-4 py-10 text-center font-hindi bg-slate-50/50">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <FileCheck className="w-8 h-8 text-slate-300" />
                          <p className="text-sm font-bold text-slate-600">कोई चालान प्रविष्टि दर्ज नहीं है</p>
                          <p className="text-xs text-slate-400">नया चालान जोड़ने हेतु ऊपर '+ नया चालान जोड़ें' बटन दबाएं</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    secCChargesheets.map((cs, idx) => (
                      <tr key={cs.id} className="hover:bg-slate-50">
                        <td className="px-3 py-3 text-center font-mono text-slate-400 font-bold">{idx + 1}</td>
                        <td className="px-3 py-3 font-mono font-bold text-police-navy-900">{cs.firNumber}</td>
                        <td className="px-3 py-3 text-center">
                          {cs.chargesheetPrepared ? (
                            <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>हाँ (तैयार)</span>
                            </span>
                          ) : (
                            <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-500" />
                              <span>नहीं (लंबित)</span>
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-3">
                          {cs.statutoryDays == 60 ? (
                            <span className="bg-blue-100 text-blue-900 font-bold px-2.5 py-1 rounded-full text-[11px] border border-blue-200">
                              60 दिवस प्रकरण
                            </span>
                          ) : cs.statutoryDays == 90 ? (
                            <span className="bg-purple-100 text-purple-900 font-bold px-2.5 py-1 rounded-full text-[11px] border border-purple-200">
                              90 दिवस प्रकरण
                            </span>
                          ) : (
                            <span className="text-slate-400 font-medium">-</span>
                          )}
                        </td>
                        <td className="px-3 py-3">
                          {cs.courtSubmissionStatus === 'Presented' ? (
                            <span className="bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded text-[11px]">
                              हाँ (कोर्ट पेश)
                            </span>
                          ) : cs.courtSubmissionStatus === 'Returned' ? (
                            <span className="bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded text-[11px]">
                              वापस (Returned)
                            </span>
                          ) : (
                            <span className="text-slate-600 font-medium">लंबित (Pending)</span>
                          )}
                        </td>
                        <td className="px-3 py-3 text-slate-700 text-xs">{cs.courtEstablishmentName || '-'}</td>
                        <td className="px-3 py-3">
                          {cs.cctnsEntryStatus === 'Completed' ? (
                            <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">
                              हाँ (CCTNS दर्ज)
                            </span>
                          ) : (
                            <span className="text-slate-500 font-medium">लंबित (Pending)</span>
                          )}
                        </td>
                        <td className="px-3 py-3 text-slate-600 text-xs">{cs.remarks || '-'}</td>
                        <td className="px-3 py-3 text-center sticky right-0 bg-white hover:bg-slate-50 z-10 border-l border-slate-200 min-w-[90px] shadow-xs">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              title="संपादित करें"
                              onClick={() => openEditCsModal(cs)}
                              className="p-1.5 text-blue-700 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              title="हटाएं"
                              onClick={() => removeChargesheetFromSectionC(cs.id)}
                              className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors border border-rose-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section C Bottom Submit Bar */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/70 p-4 rounded-xl border">
            <div>
              <span className="text-xs font-bold text-police-navy-950 block">
                चालान एवं 60/90 दिवस सत्यापन
              </span>
              <p className="text-[11px] text-slate-500 font-hindi">
                चालान व कोर्ट पेशी डाटा जांच कर यहीं से सबमिट करें।
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">

              <button
                type="button"
                onClick={() => handleSaveSectionC('Completed')}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-2 transition-transform active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>सेक्शन C सबमिट करें</span>
              </button>
            </div>
          </div>

          {/* Section C Modal Popup Form */}
          {showCsModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl my-8 overflow-hidden">
                <div className="bg-police-navy-950 text-white p-4 flex items-center justify-between border-b-2 border-police-gold-500">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-police-gold-400" />
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {editingCsId ? 'चालान प्रविष्टि संपादित करें' : 'नया चालान प्रविष्टि फॉर्म (60/90 दिवस निगरानी)'}
                      </h3>
                      <p className="text-[11px] text-slate-300">
                        थाना: {activePs?.nameHi} [{activePs?.code}]
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCsModal(false)}
                    className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-police-navy-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveCsModal} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        1. FIR नंबर <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="FIR नंबर (उदा. 89/2026)"
                        value={modalCsFirNumber}
                        onChange={(e) => setModalCsFirNumber(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        2. चालान तैयार? <span className="text-rose-600">*</span>
                      </label>
                      <select
                        required
                        value={modalCsPrepared}
                        onChange={(e) => setModalCsPrepared(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800 cursor-pointer shadow-2xs"
                      >
                        <option value="">-- चालान तैयार स्थिति चुनें --</option>
                        <option value="yes">हाँ (चालान तैयार हो गया)</option>
                        <option value="no">नहीं (चालान अभी लंबित है)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      3. प्रकरण श्रेणी (60 या 90 दिवस) <span className="text-rose-600">*</span>
                    </label>
                    <select
                      required
                      value={modalCsStatutoryDays}
                      onChange={(e) => setModalCsStatutoryDays(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800 cursor-pointer shadow-2xs"
                    >
                      <option value="">-- 60 या 90 दिवस चुनें --</option>
                      <option value="60">60 दिवस प्रकरण</option>
                      <option value="90">90 दिवस प्रकरण</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        4. कोर्ट में पेश? <span className="text-rose-600">*</span>
                      </label>
                      <select
                        required
                        value={modalCsCourtStatus}
                        onChange={(e) => setModalCsCourtStatus(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800 cursor-pointer shadow-2xs"
                      >
                        <option value="">-- कोर्ट पेशी स्थिति चुनें --</option>
                        <option value="Presented">हाँ (कोर्ट में पेश हुआ)</option>
                        <option value="Pending">नहीं (लंबित)</option>
                        <option value="Returned">वापस (Returned)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        5. न्यायालय का नाम <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="न्यायालय का नाम (उदा. CJM Court Durg)"
                        value={modalCsCourtName}
                        onChange={(e) => setModalCsCourtName(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-police-navy-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      6. CCTNS में एंट्री? <span className="text-rose-600">*</span>
                    </label>
                    <select
                      required
                      value={modalCsCctnsStatus}
                      onChange={(e) => setModalCsCctnsStatus(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-police-navy-900 focus:outline-none focus:ring-2 focus:ring-police-navy-800 cursor-pointer shadow-2xs"
                    >
                      <option value="">-- CCTNS एंट्री स्थिति चुनें --</option>
                      <option value="Completed">हाँ (CCTNS में दर्ज)</option>
                      <option value="Pending">नहीं (लंबित)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      7. रिमार्क / कारण:
                    </label>
                    <input
                      type="text"
                      placeholder="रिमार्क अथवा लंबित होने का कारण दर्ज करें"
                      value={modalCsRemarks}
                      onChange={(e) => setModalCsRemarks(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-police-navy-800"
                    />
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowCsModal(false)}
                      className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100"
                    >
                      रद्द करें
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-police-navy-800 hover:bg-police-navy-900 text-white rounded-xl text-xs font-bold shadow"
                    >
                      {editingCsId ? 'अद्यतन करें (Update)' : 'सहेजें (Save)'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Success Confirmation Modal */}
      {submitSuccessModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-emerald-400 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-lg font-black text-police-navy-900">
                {t('दैनिक रिपोर्ट सफलतापूर्वक प्रस्तुत!', 'Daily Report Submitted Successfully!')}
              </h3>
              <p className="text-xs text-slate-500 font-hindi mt-1">
                {t('थाना दैनिक विवेचना रिपोर्ट जिला एवं राज्य पोर्टल पर दर्ज हो चुकी है।', 'Daily investigation data is now recorded on District & State monitoring dashboards.')}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-left space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Date:</span>
                <span className="text-slate-800">{submitSuccessModal.reportingDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Submitted By:</span>
                <span className="text-slate-800">{submitSuccessModal.submittedByUserName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="text-emerald-700 font-bold">{submitSuccessModal.overallStatusHi}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSubmitSuccessModal(null)}
              className="w-full bg-police-navy-800 hover:bg-police-navy-900 text-white font-bold py-2.5 rounded-xl text-xs shadow"
            >
              {t('ठीक है (Done)', 'Done')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
