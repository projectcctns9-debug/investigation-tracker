import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useMaster } from '../context/MasterContext';
import { DailySubmissionRecord, FirSidItem, CraIoItem, ChargesheetFirItem } from '../types';
import * as XLSX from 'xlsx';
import { 
  Building2, 
  Calendar, 
  FileText, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  Download,
  FileSpreadsheet, 
  Eye, 
  ShieldCheck, 
  UserCheck, 
  Camera, 
  ArrowRight,
  X,
  Shield,
  RotateCcw,
  Check,
  Building
} from 'lucide-react';

interface PsStationDashboardProps {
  onNavigateToDailyEntry?: () => void;
  scope?: 'SHO' | 'DISTRICT' | 'PHQ';
  onSelectDistrict?: (distId: string) => void;
  onViewPsEntry?: (psId: string) => void;
  onNavigateToUserManagement?: () => void;
}

export const PsStationDashboard: React.FC<PsStationDashboardProps> = ({ 
  onNavigateToDailyEntry,
  scope,
  onSelectDistrict,
  onViewPsEntry,
  onNavigateToUserManagement
}) => {
  const { currentUser } = useAuth();
  const { policeStations, districts, submissions, returnSubmissionForCorrection } = useMaster();

  const effectiveScope: 'SHO' | 'DISTRICT' | 'PHQ' = scope || (
    currentUser.role === 'SUPER_ADMIN' 
      ? 'PHQ' 
      : (currentUser.role === 'DISTRICT_ADMIN' ? 'DISTRICT' : 'SHO')
  );

  // Active District identification for District Admin
  const assignedDistrict = districts.find(d => 
    (currentUser.districtId && d.id === currentUser.districtId) ||
    (currentUser.districtCode && d.code?.toLowerCase() === currentUser.districtCode?.toLowerCase()) ||
    (currentUser.districtNameEn && d.nameEn?.toLowerCase() === currentUser.districtNameEn?.toLowerCase())
  ) || districts.find(d => d.code === 'DURG') || districts[0];

  // Active PS identification for SHO
  const activePsId = currentUser.policeStationId || (policeStations.length > 0 ? policeStations[0].id : '');
  const activePs = policeStations.find(p => p.id === activePsId) || policeStations[0];
  const activeDistrict = districts.find(d => d.id === activePs?.districtId) || districts[0];

  // Selected filters for PHQ / District level
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(
    effectiveScope === 'DISTRICT' ? (assignedDistrict?.id || 'dist-durg') : ''
  );
  const [selectedPsId, setSelectedPsId] = useState<string>(
    effectiveScope === 'SHO' ? (activePsId || '') : ''
  );

  // Return submission modal state
  const [showReturnModal, setShowReturnModal] = useState<boolean>(false);
  const [returnSubmissionTarget, setReturnSubmissionTarget] = useState<DailySubmissionRecord | null>(null);
  const [returnReasonText, setReturnReasonText] = useState<string>('कृपया ई-साक्ष्य अथवा चालान विसंगति की जांच कर सुधार करें।');

  // Available police stations for dropdown based on scope & selected district
  const availableDistrictStations = useMemo(() => {
    if (effectiveScope === 'DISTRICT') {
      const distId = assignedDistrict?.id || selectedDistrictId;
      return policeStations.filter(p => p.districtId === distId);
    }
    if (effectiveScope === 'PHQ') {
      if (selectedDistrictId) {
        return policeStations.filter(p => p.districtId === selectedDistrictId);
      }
      return policeStations;
    }
    return [activePs];
  }, [effectiveScope, assignedDistrict, selectedDistrictId, policeStations, activePs]);

  // Helper to format date string YYYY-MM-DD
  const formatDateStr = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayStr = useMemo(() => formatDateStr(new Date()), []);
  const thirtyDaysAgoStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return formatDateStr(d);
  }, []);

  const sevenDaysAgoStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return formatDateStr(d);
  }, []);

  const firstDayOfMonthStr = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
  }, []);

  // Date Range State
  const [fromDate, setFromDate] = useState<string>(sevenDaysAgoStr);
  const [toDate, setToDate] = useState<string>(todayStr);
  const [activeDatePreset, setActiveDatePreset] = useState<'today' | '7days' | 'month' | '30days' | 'custom'>('7days');

  // Filter & Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [reportTab, setReportTab] = useState<'summary' | 'esakshya' | 'cra' | 'chargesheet'>('summary');
  const [selectedSubmissionForModal, setSelectedSubmissionForModal] = useState<DailySubmissionRecord | null>(null);

  // Quick preset handlers
  const handleSetPreset = (preset: 'today' | '7days' | 'month' | '30days') => {
    setActiveDatePreset(preset);
    if (preset === 'today') {
      setFromDate(todayStr);
      setToDate(todayStr);
    } else if (preset === '7days') {
      setFromDate(sevenDaysAgoStr);
      setToDate(todayStr);
    } else if (preset === 'month') {
      setFromDate(firstDayOfMonthStr);
      setToDate(todayStr);
    } else if (preset === '30days') {
      setFromDate(thirtyDaysAgoStr);
      setToDate(todayStr);
    }
  };

  // Filter submissions matching Scope, District, PS, and Date Range
  const filteredSubmissions = useMemo(() => {
    return submissions.filter(s => {
      // Scope filtering
      if (effectiveScope === 'SHO') {
        const myPsId = currentUser.policeStationId || activePsId;
        if (s.policeStationId !== myPsId) return false;
      } else if (effectiveScope === 'DISTRICT') {
        const targetDistId = assignedDistrict?.id || selectedDistrictId;
        if (s.districtId !== targetDistId) return false;
        if (selectedPsId && s.policeStationId !== selectedPsId) return false;
      } else if (effectiveScope === 'PHQ') {
        if (selectedDistrictId && s.districtId !== selectedDistrictId) return false;
        if (selectedPsId && s.policeStationId !== selectedPsId) return false;
      }

      // Date range filtering
      const d = s.reportingDate;
      if (fromDate && d < fromDate) return false;
      if (toDate && d > toDate) return false;
      return true;
    }).sort((a, b) => b.reportingDate.localeCompare(a.reportingDate));
  }, [submissions, effectiveScope, currentUser, activePsId, assignedDistrict, selectedDistrictId, selectedPsId, fromDate, toDate]);

  const stationSubmissions = filteredSubmissions;

  // Aggregate KPI metrics for the selected date range
  const kpis = useMemo(() => {
    let totalFirs = 0;
    let totalSidsCreated = 0;
    let totalFinalLink = 0;
    let totalPendingFinalLink = 0;
    let totalIosLogged = 0;
    let totalIosPosted = 0;
    let totalChallanReady = 0;
    let totalCourtPresented = 0;
    let totalCctnsDone = 0;
    let total60Days = 0;
    let total90Days = 0;
    let bns60Prepared = 0;
    let bns60Presented = 0;
    let bns90Prepared = 0;
    let bns90Presented = 0;

    stationSubmissions.forEach(sub => {
      // Section A
      if (sub.sectionA) {
        totalFirs += sub.sectionA.totalFirsToday || 0;
        totalSidsCreated += sub.sectionA.sidCreatedCount || 0;
        totalFinalLink += sub.sectionA.finalLinkCompletedCount || 0;
        totalPendingFinalLink += sub.sectionA.pendingFinalLinkCount || 0;
      }
      // Section B
      if (sub.sectionB) {
        totalIosPosted += sub.sectionB.totalIosPosted || 0;
        totalIosLogged += sub.sectionB.iosLoggedInToday || 0;
      }
      // Section C
      if (sub.sectionC) {
        const prepCount = sub.sectionC.chargesheetsPreparedToday ?? (sub.sectionC.firRecords ? sub.sectionC.firRecords.filter((r: any) => r.chargesheetPrepared).length : 0);
        totalChallanReady += prepCount;
        const presCount = sub.sectionC.presentedInCourtToday ?? (sub.sectionC.firRecords ? sub.sectionC.firRecords.filter((r: any) => r.courtSubmissionStatus === 'Presented' || r.courtPresented).length : 0);
        totalCourtPresented += presCount;
        totalCctnsDone += sub.sectionC.enteredInCctnsToday || 0;

        if (sub.sectionC.firRecords) {
          sub.sectionC.firRecords.forEach((r: any) => {
            const days = String(r.statutoryDays || r.caseCategory || '');
            const isPrep = Boolean(r.chargesheetPrepared);
            const isPres = r.courtSubmissionStatus === 'Presented' || Boolean(r.courtPresented);

            if (days.includes('90')) {
              total90Days += 1;
              if (isPrep) bns90Prepared += 1;
              if (isPres) bns90Presented += 1;
            } else if (days.includes('60')) {
              total60Days += 1;
              if (isPrep) bns60Prepared += 1;
              if (isPres) bns60Presented += 1;
            }
          });
        }
      }
      // Section D (if any)
      if (sub.sectionD && (sub.sectionD as any).caseRecords) {
        (sub.sectionD as any).caseRecords.forEach((r: any) => {
          const days = String(r.statutoryDays || '');
          const isPrep = Boolean(r.chargesheetPrepared);
          const isPres = Boolean(r.courtPresented);
          if (days.includes('90')) {
            total90Days += 1;
            if (isPrep) bns90Prepared += 1;
            if (isPres) bns90Presented += 1;
          } else if (days.includes('60')) {
            total60Days += 1;
            if (isPrep) bns60Prepared += 1;
            if (isPres) bns60Presented += 1;
          }
        });
      }
    });

    const craPercent = totalIosPosted > 0 ? Math.round((totalIosLogged / totalIosPosted) * 100) : 100;

    return {
      totalSubmissions: stationSubmissions.length,
      totalFirs,
      totalSidsCreated,
      totalFinalLink,
      totalPendingFinalLink,
      craPercent,
      totalIosLogged,
      totalIosPosted,
      totalChallanReady,
      totalCourtPresented,
      totalCctnsDone,
      total60Days,
      total90Days,
      bns60Prepared,
      bns60Presented,
      bns90Prepared,
      bns90Presented
    };
  }, [stationSubmissions]);

  // Flattened e-Sakshya FIR list for date range
  const allSecAFirs = useMemo(() => {
    const list: (FirSidItem & { reportingDate: string; districtNameHi?: string; policeStationNameHi?: string })[] = [];
    stationSubmissions.forEach(s => {
      const distName = s.districtNameHi || districts.find(d => d.id === s.districtId)?.nameHi || 'दुर्ग';
      const psName = s.policeStationNameHi || policeStations.find(p => p.id === s.policeStationId)?.nameHi || 'कोतवाली';
      if (s.sectionA?.firRecords) {
        s.sectionA.firRecords.forEach((item: any) => {
          list.push({
            id: item.id || `fir-${Math.random()}`,
            firNumber: item.firNumber || 'अज्ञात',
            firYear: item.firYear || 2026,
            firRegistrationDate: item.firRegistrationDate || s.reportingDate,
            ioName: item.ioName || '',
            ioRank: item.ioRank || '',
            sidCreated: Boolean(item.sidCreated),
            sidCount: item.sidCount || (item.sidNumber ? 1 : 0),
            sidNumbers: item.sidNumbers || (item.sidNumber ? [item.sidNumber] : []),
            finalLinkCompleted: Boolean(item.finalLinkCompleted),
            pendingReason: item.pendingReason || '',
            remarks: item.remarks || '',
            reportingDate: s.reportingDate,
            districtNameHi: distName,
            policeStationNameHi: psName
          });
        });
      }
    });
    return list.filter(f => 
      !searchTerm || 
      f.firNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.ioName && f.ioName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (f.policeStationNameHi && f.policeStationNameHi.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [stationSubmissions, searchTerm, districts, policeStations]);

  // Flattened CRA IO login list for date range
  const allSecBIos = useMemo(() => {
    const list: (CraIoItem & { reportingDate: string; districtNameHi?: string; policeStationNameHi?: string })[] = [];
    stationSubmissions.forEach(s => {
      const distName = s.districtNameHi || districts.find(d => d.id === s.districtId)?.nameHi || 'दुर्ग';
      const psName = s.policeStationNameHi || policeStations.find(p => p.id === s.policeStationId)?.nameHi || 'कोतवाली';
      if (s.sectionB?.ioRecords) {
        s.sectionB.ioRecords.forEach((item: any) => {
          list.push({
            id: item.id || `io-${Math.random()}`,
            ioName: item.ioName || '',
            rank: item.rank || 'उप-निरीक्षक (SI)',
            hasLoggedIn: Boolean(item.hasLoggedIn),
            loginCount: item.loginCount || 1,
            loginTime: item.loginTime || '',
            notLoggedInReason: item.notLoggedInReason || '',
            remarks: item.remarks || '',
            reportingDate: s.reportingDate,
            districtNameHi: distName,
            policeStationNameHi: psName
          });
        });
      }
    });
    return list.filter(io => 
      !searchTerm || 
      io.ioName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (io.policeStationNameHi && io.policeStationNameHi.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [stationSubmissions, searchTerm, districts, policeStations]);

  // Flattened Chargesheet case list for date range
  const allSecCChargesheets = useMemo(() => {
    const list: (ChargesheetFirItem & { reportingDate: string; districtNameHi?: string; policeStationNameHi?: string })[] = [];
    stationSubmissions.forEach(s => {
      const distName = s.districtNameHi || districts.find(d => d.id === s.districtId)?.nameHi || 'दुर्ग';
      const psName = s.policeStationNameHi || policeStations.find(p => p.id === s.policeStationId)?.nameHi || 'कोतवाली';
      if (s.sectionC?.firRecords) {
        s.sectionC.firRecords.forEach((item: any) => {
          list.push({
            id: item.id || `cs-${Math.random()}`,
            firNumber: item.firNumber || 'अज्ञात',
            firYear: item.firYear || 2026,
            chargesheetPrepared: Boolean(item.chargesheetPrepared),
            statutoryDays: item.statutoryDays || '60',
            courtSubmissionStatus: item.courtSubmissionStatus || (item.courtPresented ? 'Presented' : 'Pending'),
            courtEstablishmentName: item.courtEstablishmentName || item.courtName || '',
            cctnsEntryStatus: item.cctnsEntryStatus || (item.cctnsEntry ? 'Completed' : 'Pending'),
            pendingReason: item.pendingReason || '',
            remarks: item.remarks || '',
            reportingDate: s.reportingDate,
            districtNameHi: distName,
            policeStationNameHi: psName
          });
        });
      }
    });
    return list.filter(c => 
      !searchTerm || 
      c.firNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.policeStationNameHi && c.policeStationNameHi.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [stationSubmissions, searchTerm, districts, policeStations]);

  // Export complete data to Excel (.xlsx) workbook with multiple sheets
  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();

    // Sheet 1: दैनिक रिपोर्ट सारांश
    const summaryData = stationSubmissions.map(s => {
      const row: any = {
        'रिपोर्टिंग दिनांक': s.reportingDate,
      };
      if (effectiveScope === 'PHQ') {
        row['जिला'] = s.districtNameHi || districts.find(d => d.id === s.districtId)?.nameHi || 'दुर्ग';
      }
      if (effectiveScope !== 'SHO') {
        row['थाना'] = s.policeStationNameHi || policeStations.find(p => p.id === s.policeStationId)?.nameHi || 'कोतवाली';
      }
      row['कुल दर्ज FIRs'] = s.sectionA?.totalFirsToday || 0;
      row['निर्मित SID संख्या'] = s.sectionA?.sidCreatedCount || 0;
      row['फाइनल लिंक पूर्ण'] = s.sectionA?.finalLinkCompletedCount || 0;
      row['फाइनल लिंक लंबित'] = s.sectionA?.pendingFinalLinkCount || 0;
      row['CRA पदस्थ विवेचक'] = s.sectionB?.totalIosPosted || 0;
      row['CRA लॉगिन किया'] = s.sectionB?.iosLoggedInToday || 0;
      row['CRA लॉगिन दर (%)'] = `${s.sectionB?.craLoginPercentage || 0}%`;
      row['चालान तैयार'] = s.sectionC?.chargesheetsPreparedToday || 0;
      row['कोर्ट में पेश'] = s.sectionC?.presentedInCourtToday || 0;
      row['CCTNS में दर्ज'] = s.sectionC?.enteredInCctnsToday || 0;
      row['समीक्षा स्थिति'] = s.overallStatusHi || s.overallStatus;
      return row;
    });
    const wsSummary = XLSX.utils.json_to_sheet(summaryData.length > 0 ? summaryData : [{ 'सूचना': 'चुनी गई दिनांक अवधि में कोई रिकॉर्ड नहीं है' }]);
    XLSX.utils.book_append_sheet(wb, wsSummary, 'दैनिक रिपोर्ट सारांश');

    // Sheet 2: ई-साक्ष्य एवं SID रिकॉर्ड्स
    const esakshyaData = allSecAFirs.map(f => {
      const row: any = {
        'दिनांक': f.reportingDate,
      };
      if (effectiveScope === 'PHQ') row['जिला'] = f.districtNameHi || 'दुर्ग';
      if (effectiveScope !== 'SHO') row['थाना'] = f.policeStationNameHi || 'कोतवाली';
      row['FIR नंबर'] = f.firNumber;
      row['विवेचक का नाम'] = f.ioName || '-';
      row['पद'] = f.ioRank || '-';
      row['SID संख्या'] = f.sidCount || f.sidNumbers?.length || 0;
      row['SID नंबर सूची'] = (f.sidNumbers || []).join(', ');
      row['फाइनल लिंक स्थिति'] = f.finalLinkCompleted ? 'हाँ (पूर्ण)' : 'नहीं (लंबित)';
      row['लंबित कारण'] = f.pendingReason || '-';
      row['रिमार्क'] = f.remarks || '-';
      return row;
    });
    const wsEsakshya = XLSX.utils.json_to_sheet(esakshyaData.length > 0 ? esakshyaData : [{ 'सूचना': 'चुनी गई दिनांक अवधि में कोई रिकॉर्ड नहीं है' }]);
    XLSX.utils.book_append_sheet(wb, wsEsakshya, 'ई-साक्ष्य एवं SID');

    // Sheet 3: CRA विवेचक लॉगिन
    const craData = allSecBIos.map(io => {
      const row: any = {
        'दिनांक': io.reportingDate,
      };
      if (effectiveScope === 'PHQ') row['जिला'] = io.districtNameHi || 'दुर्ग';
      if (effectiveScope !== 'SHO') row['थाना'] = io.policeStationNameHi || 'कोतवाली';
      row['विवेचक का नाम'] = io.ioName;
      row['पद / रैंक'] = io.rank;
      row['लॉगिन किया?'] = io.hasLoggedIn ? 'हाँ' : 'नहीं';
      row['लॉगिन बार'] = io.hasLoggedIn ? `${io.loginCount || 1} बार` : '-';
      row['अनुपस्थिति कारण / रिमार्क'] = io.notLoggedInReason || io.remarks || '-';
      return row;
    });
    const wsCra = XLSX.utils.json_to_sheet(craData.length > 0 ? craData : [{ 'सूचना': 'चुनी गई दिनांक अवधि में कोई रिकॉर्ड नहीं है' }]);
    XLSX.utils.book_append_sheet(wb, wsCra, 'CRA विवेचक लॉगिन');

    // Sheet 4: चालान एवं 60/90 दिवस
    const csData = allSecCChargesheets.map(c => {
      const row: any = {
        'दिनांक': c.reportingDate,
      };
      if (effectiveScope === 'PHQ') row['जिला'] = c.districtNameHi || 'दुर्ग';
      if (effectiveScope !== 'SHO') row['थाना'] = c.policeStationNameHi || 'कोतवाली';
      row['FIR नंबर'] = c.firNumber;
      row['प्रकरण श्रेणी'] = String(c.statutoryDays) === '90' ? '90 दिवस प्रकरण' : '60 दिवस प्रकरण';
      row['चालान तैयार?'] = c.chargesheetPrepared ? 'हाँ' : 'नहीं';
      row['कोर्ट में पेश?'] = c.courtSubmissionStatus === 'Presented' ? 'हाँ' : 'नहीं';
      row['न्यायालय का नाम'] = c.courtEstablishmentName || '-';
      row['CCTNS में दर्ज?'] = c.cctnsEntryStatus === 'Completed' ? 'हाँ' : 'नहीं';
      row['रिमार्क'] = c.remarks || '-';
      return row;
    });
    const wsCs = XLSX.utils.json_to_sheet(csData.length > 0 ? csData : [{ 'सूचना': 'चुनी गई दिनांक अवधि में कोई रिकॉर्ड नहीं है' }]);
    XLSX.utils.book_append_sheet(wb, wsCs, 'चालान एवं 60-90 दिवस');

    // Write file
    const filename = effectiveScope === 'PHQ'
      ? `राज्य_मुख्यालय_समीक्षा_रिपोर्ट_${fromDate}_से_${toDate}.xlsx`
      : (effectiveScope === 'DISTRICT'
        ? `जिला_समीक्षा_रिपोर्ट_${assignedDistrict?.nameHi || 'Durg'}_${fromDate}_से_${toDate}.xlsx`
        : `थाना_रिपोर्ट_${activePs?.nameHi || 'Kotwali'}_${fromDate}_से_${toDate}.xlsx`);
    XLSX.writeFile(wb, filename);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-police-navy-950 via-police-navy-900 to-police-navy-800 text-white rounded-2xl p-5 shadow-lg border border-police-navy-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-police-gold-500 text-police-navy-950 font-black text-xs px-2.5 py-0.5 rounded uppercase tracking-wider">
                {effectiveScope === 'PHQ' 
                  ? 'राज्य मुख्यालय समीक्षा एवं निगरानी डैशबोर्ड'
                  : (effectiveScope === 'DISTRICT' 
                    ? 'जिला पुलिस अधीक्षक कार्यालय डैशबोर्ड' 
                    : 'थाना समीक्षा एवं निगरानी डैशबोर्ड')}
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                {effectiveScope === 'PHQ' 
                  ? 'छत्तीसगढ़ राज्य समेकित नियंत्रण' 
                  : (effectiveScope === 'DISTRICT' ? `जिला: ${assignedDistrict?.nameHi}` : `थाना: ${activePs?.nameHi}`)}
              </span>
            </div>
            
            <h2 className="text-xl font-black mt-1.5 flex items-center gap-2">
              {effectiveScope === 'PHQ' ? (
                <Shield className="w-5 h-5 text-police-gold-400" />
              ) : (
                <Building2 className="w-5 h-5 text-police-gold-400" />
              )}
              <span>
                {effectiveScope === 'PHQ' 
                  ? 'छत्तीसगढ़ पुलिस मुख्यालय (समस्त 33 जिले)' 
                  : (effectiveScope === 'DISTRICT' ? `जिला: ${assignedDistrict?.nameHi}` : activePs?.nameHi)}
              </span>
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-1 font-hindi">
              {effectiveScope === 'PHQ' ? (
                <>
                  <span>कार्यक्षेत्र: <strong className="text-white">समस्त छत्तीसगढ़ (राज्यव्यापी)</strong></span>
                  <span>•</span>
                  <span>प्रशासक: <strong className="text-police-gold-300">{currentUser.fullNameHi}</strong></span>
                  <span>•</span>
                  <span>पद: <strong className="text-white">{currentUser.roleLabelHi}</strong></span>
                </>
              ) : effectiveScope === 'DISTRICT' ? (
                <>
                  <span>जिला: <strong className="text-white">{assignedDistrict?.nameHi}</strong></span>
                  <span>•</span>
                  <span>अधीनस्थ थाने: <strong className="text-white">{availableDistrictStations.length} थाने</strong></span>
                  <span>•</span>
                  <span>जिला प्रशासक: <strong className="text-police-gold-300">{currentUser.fullNameHi}</strong></span>
                  <span>•</span>
                  <span>पद: <strong className="text-white">{currentUser.roleLabelHi}</strong></span>
                </>
              ) : (
                <>
                  <span>जिला: <strong className="text-white">{activeDistrict?.nameHi}</strong></span>
                  <span>•</span>
                  <span>थाना प्रभारी / यूजर: <strong className="text-police-gold-300">{currentUser.fullNameHi || activePs?.shoName}</strong></span>
                  <span>•</span>
                  <span>पद: <strong className="text-white">{currentUser.roleLabelHi}</strong></span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Date Range Selection Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-police-navy-800" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                रिपोर्ट दिनांक रेंज (Date Range)
              </h3>
              <p className="text-[11px] text-slate-500">
                वांछित समयावधि चुनकर थाने की विवेचना, ई-साक्ष्य एवं चालान प्रगति रिपोर्ट देखें
              </p>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => handleSetPreset('today')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeDatePreset === 'today'
                  ? 'bg-police-navy-900 text-police-gold-400 shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              आज
            </button>
            <button
              onClick={() => handleSetPreset('7days')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeDatePreset === '7days'
                  ? 'bg-police-navy-900 text-police-gold-400 shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              पिछले 7 दिन
            </button>
            <button
              onClick={() => handleSetPreset('month')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeDatePreset === 'month'
                  ? 'bg-police-navy-900 text-police-gold-400 shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              इस माह
            </button>
            <button
              onClick={() => handleSetPreset('30days')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeDatePreset === '30days'
                  ? 'bg-police-navy-900 text-police-gold-400 shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              पिछले 30 दिन
            </button>
          </div>
        </div>

        {/* Custom Date Pickers */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">से दिनांक:</span>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
                setActiveDatePreset('custom');
              }}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 font-mono font-bold focus:outline-none focus:border-police-gold-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">तक दिनांक:</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
                setActiveDatePreset('custom');
              }}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 font-mono font-bold focus:outline-none focus:border-police-gold-500"
            />
          </div>

          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-[11px] text-slate-500 font-hindi">
            चुनी गई अवधि में कुल <strong>{stationSubmissions.length}</strong> दैनिक रिपोर्ट उपलब्ध हैं
          </span>
        </div>

        {/* Scope Entity Filters (District & Police Station) */}
        {(effectiveScope === 'PHQ' || effectiveScope === 'DISTRICT') && (
          <div className="flex flex-wrap items-center gap-3 pt-2.5 border-t border-slate-100 text-xs">
            {effectiveScope === 'PHQ' && (
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700">जिला चुनें:</span>
                <select
                  value={selectedDistrictId}
                  onChange={(e) => {
                    setSelectedDistrictId(e.target.value);
                    setSelectedPsId('');
                  }}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-police-navy-900 focus:outline-none focus:ring-1 focus:ring-police-navy-800 cursor-pointer shadow-xs"
                >
                  <option value="">समस्त 33 जिले (राज्यव्यापी)</option>
                  {districts.map(d => (
                    <option key={d.id} value={d.id}>{d.nameHi} [{d.code}]</option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">थाना चुनें:</span>
              <select
                value={selectedPsId}
                onChange={(e) => setSelectedPsId(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-bold text-police-navy-900 focus:outline-none focus:ring-1 focus:ring-police-navy-800 cursor-pointer shadow-xs"
              >
                <option value="">
                  {effectiveScope === 'DISTRICT' ? `सभी थाने (${availableDistrictStations.length})` : 'समस्त थाने'}
                </option>
                {availableDistrictStations.map(p => (
                  <option key={p.id} value={p.id}>{p.nameHi || p.nameEn}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* KPI Summary Cards for Selected Date Range */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {/* 1. कुल दर्ज FIRs */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 block">कुल दर्ज FIRs</span>
          <span className="text-2xl font-black text-slate-900 block mt-1">{kpis.totalFirs}</span>
          <span className="text-[10px] text-slate-500 mt-0.5 block">{stationSubmissions.length} दिनों में</span>
        </div>

        {/* 2. निर्मित ई-साक्ष्य SID */}
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 text-center shadow-xs">
          <span className="text-[11px] font-bold text-sky-800 block">निर्मित ई-साक्ष्य SID</span>
          <span className="text-2xl font-black text-sky-700 block mt-1">{kpis.totalSidsCreated}</span>
          <span className="text-[10px] text-sky-600 mt-0.5 block">साक्ष्य आईडी</span>
        </div>

        {/* 3. फाइनल लिंक पूर्ण */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center shadow-xs">
          <span className="text-[11px] font-bold text-emerald-800 block">फाइनल लिंक पूर्ण</span>
          <span className="text-2xl font-black text-emerald-700 block mt-1">{kpis.totalFinalLink}</span>
          <span className="text-[10px] text-emerald-600 mt-0.5 block">लंबित: {kpis.totalPendingFinalLink}</span>
        </div>

        {/* 4. CRA दैनिक लॉगिन दर */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-center shadow-xs">
          <span className="text-[11px] font-bold text-indigo-800 block">CRA लॉगिन दर</span>
          <span className="text-2xl font-black text-indigo-700 block mt-1">{kpis.craPercent}%</span>
          <span className="text-[10px] text-indigo-600 mt-0.5 block">{kpis.totalIosLogged} / {kpis.totalIosPosted} उपस्थित</span>
        </div>

        {/* 5. चालान तैयार (सिर्फ चालान तैयार संख्या 2) */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center shadow-xs">
          <span className="text-[11px] font-bold text-amber-800 block">चालान तैयार</span>
          <span className="text-2xl font-black text-amber-700 block mt-1">{kpis.totalChallanReady}</span>
          <span className="text-[10px] text-amber-600 mt-0.5 block">कोर्ट पेश: {kpis.totalCourtPresented}</span>
        </div>

        {/* 6. 60 दिवस प्रकरण (अलग कार्ड) */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-center shadow-xs">
          <span className="text-[11px] font-bold text-purple-800 block">60 दिवस प्रकरण</span>
          <span className="text-2xl font-black text-purple-700 block mt-1">{kpis.total60Days}</span>
          <span className="text-[10px] text-purple-700 font-semibold mt-0.5 block">
            तैयार: <strong>{kpis.bns60Prepared}</strong> • कोर्ट पेश: <strong>{kpis.bns60Presented}</strong>
          </span>
        </div>

        {/* 7. 90 दिवस प्रकरण (अलग कार्ड) */}
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-center shadow-xs">
          <span className="text-[11px] font-bold text-rose-800 block">90 दिवस प्रकरण</span>
          <span className="text-2xl font-black text-rose-700 block mt-1">{kpis.total90Days}</span>
          <span className="text-[10px] text-rose-700 font-semibold mt-0.5 block">
            तैयार: <strong>{kpis.bns90Prepared}</strong> • कोर्ट पेश: <strong>{kpis.bns90Presented}</strong>
          </span>
        </div>
      </div>

      {/* Main Reports View & Filter Tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Navigation Tabs Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 p-4 gap-3 bg-slate-50/70">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setReportTab('summary')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                reportTab === 'summary'
                  ? 'bg-police-navy-900 text-police-gold-400 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>दैनिक रिपोर्ट सारांश</span>
              <span className="bg-police-gold-400/20 text-police-gold-400 text-[10px] px-1.5 py-0.2 rounded-full">
                {stationSubmissions.length}
              </span>
            </button>

            <button
              onClick={() => setReportTab('esakshya')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                reportTab === 'esakshya'
                  ? 'bg-police-navy-900 text-police-gold-400 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>ई-साक्ष्य एवं SID रिकॉर्ड्स</span>
              <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full">
                {allSecAFirs.length}
              </span>
            </button>

            <button
              onClick={() => setReportTab('cra')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                reportTab === 'cra'
                  ? 'bg-police-navy-900 text-police-gold-400 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>CRA विवेचक लॉगिन</span>
              <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full">
                {allSecBIos.length}
              </span>
            </button>

            <button
              onClick={() => setReportTab('chargesheet')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                reportTab === 'chargesheet'
                  ? 'bg-police-navy-900 text-police-gold-400 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>चालान एवं 60/90 दिवस</span>
              <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full">
                {allSecCChargesheets.length}
              </span>
            </button>
          </div>

          {/* Search bar & Export */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="खोजें..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-police-gold-500"
              />
            </div>

            <button
              onClick={handleExportExcel}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm shrink-0 transition-all active:scale-95"
              title="एक्सेल (.xlsx) फाइल डाउनलोड करें"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
              <span>एक्सेल डाउनलोड</span>
            </button>

            <button
              onClick={() => window.print()}
              className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm shrink-0"
              title="प्रिंट करें"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab 1: Daily Submissions Summary Table */}
        {reportTab === 'summary' && (
          <div className="overflow-x-auto">
            {stationSubmissions.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs font-hindi">
                चुने गए दिनांक रेंज ({fromDate} से {toDate}) में कोई दैनिक रिपोर्ट दर्ज नहीं है।
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                    <th className="p-3">रिपोर्टिंग दिनांक</th>
                    {effectiveScope === 'PHQ' && <th className="p-3">जिला</th>}
                    {effectiveScope !== 'SHO' && <th className="p-3">थाना</th>}
                    <th className="p-3">ई-साक्ष्य (FIRs / SIDs)</th>
                    <th className="p-3">फाइनल लिंक</th>
                    <th className="p-3">CRA लॉगिन</th>
                    <th className="p-3">चालान प्रगति</th>
                    <th className="p-3">समीक्षा स्थिति</th>
                    <th className="p-3 text-center">कार्रवाई</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stationSubmissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono font-bold text-police-navy-950">
                        {sub.reportingDate}
                      </td>
                      {effectiveScope === 'PHQ' && (
                        <td className="p-3 font-bold text-slate-800">
                          {sub.districtNameHi || districts.find(d => d.id === sub.districtId)?.nameHi || 'दुर्ग'}
                        </td>
                      )}
                      {effectiveScope !== 'SHO' && (
                        <td className="p-3 font-semibold text-police-navy-900">
                          {sub.policeStationNameHi || policeStations.find(p => p.id === sub.policeStationId)?.nameHi || 'कोतवाली'}
                        </td>
                      )}
                      <td className="p-3">
                        <span className="font-semibold text-slate-900">{sub.sectionA?.totalFirsToday || 0} FIRs</span>
                        <span className="text-slate-400 mx-1">•</span>
                        <span className="text-sky-700 font-semibold">{sub.sectionA?.sidCreatedCount || 0} SID</span>
                      </td>
                      <td className="p-3">
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[11px] font-semibold">
                          {sub.sectionA?.finalLinkCompletedCount || 0} पूर्ण
                        </span>
                        {Boolean(sub.sectionA?.pendingFinalLinkCount) && (
                          <span className="ml-1.5 text-rose-600 text-[11px]">
                            ({sub.sectionA?.pendingFinalLinkCount} लंबित)
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-slate-800">
                          {sub.sectionB?.iosLoggedInToday || 0} / {sub.sectionB?.totalIosPosted || 0}
                        </span>
                        <span className="ml-1 text-[11px] text-slate-500">
                          ({sub.sectionB?.craLoginPercentage || 0}%)
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-slate-800">
                          तैयार: {sub.sectionC?.chargesheetsPreparedToday || 0}
                        </span>
                        <span className="text-slate-400 mx-1">•</span>
                        <span className="text-amber-700">कोर्ट: {sub.sectionC?.presentedInCourtToday || 0}</span>
                      </td>
                      <td className="p-3">
                        {sub.overallStatus === 'Returned for Correction' ? (
                          <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold text-[10px] inline-flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 text-rose-600" />
                            <span>सुधार हेतु वापस</span>
                          </span>
                        ) : (
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold text-[10px] inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>प्रस्तुत</span>
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setSelectedSubmissionForModal(sub)}
                          className="bg-police-navy-100 hover:bg-police-navy-200 text-police-navy-900 px-3 py-1 rounded-lg text-xs font-bold inline-flex items-center gap-1 transition-all"
                        >
                          <Eye className="w-3.5 h-3.5 text-police-navy-700" />
                          <span>रिपोर्ट देखें</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Tab 2: e-Sakshya & SIDs Table */}
        {reportTab === 'esakshya' && (
          <div className="overflow-x-auto">
            {allSecAFirs.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs font-hindi">
                चुने गए दिनांक रेंज में कोई ई-साक्ष्य प्रविष्टि उपलब्ध नहीं है।
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                    <th className="p-3">दिनांक</th>
                    {effectiveScope === 'PHQ' && <th className="p-3">जिला</th>}
                    {effectiveScope !== 'SHO' && <th className="p-3">थाना</th>}
                    <th className="p-3">FIR नंबर</th>
                    <th className="p-3">विवेचक एवं पद</th>
                    <th className="p-3">SID संख्या</th>
                    <th className="p-3">SID नंबर सूची</th>
                    <th className="p-3">फाइनल लिंक</th>
                    <th className="p-3">कारण / रिमार्क</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allSecAFirs.map((f, idx) => (
                    <tr key={`${f.reportingDate}-${f.firNumber}-${idx}`} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono text-slate-600 font-semibold">{f.reportingDate}</td>
                      {effectiveScope === 'PHQ' && (
                        <td className="p-3 font-bold text-slate-800">{f.districtNameHi || 'दुर्ग'}</td>
                      )}
                      {effectiveScope !== 'SHO' && (
                        <td className="p-3 font-semibold text-police-navy-900">{f.policeStationNameHi || 'कोतवाली'}</td>
                      )}
                      <td className="p-3 font-mono font-bold text-police-navy-950">{f.firNumber}</td>
                      <td className="p-3">
                        <div className="font-bold text-slate-800">{f.ioName || '-'}</div>
                        <div className="text-[10px] text-slate-500">{f.ioRank || ''}</div>
                      </td>
                      <td className="p-3 font-bold text-sky-700">{f.sidCount || f.sidNumbers?.length || 0}</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {(f.sidNumbers && f.sidNumbers.length > 0) ? (
                            f.sidNumbers.map((sid, sIdx) => (
                              <span key={sIdx} className="bg-sky-50 text-sky-800 border border-sky-200 px-1.5 py-0.5 rounded text-[10px] font-mono">
                                {sid}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400 text-[11px]">-</span>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        {f.finalLinkCompleted ? (
                          <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-bold">
                            हाँ (पूर्ण)
                          </span>
                        ) : (
                          <span className="bg-rose-100 text-rose-800 border border-rose-300 px-2 py-0.5 rounded-full text-[10px] font-bold">
                            नहीं (लंबित)
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-slate-600">
                        {f.pendingReason ? <span className="text-rose-700 block text-[11px]">{f.pendingReason}</span> : null}
                        {f.remarks ? <span className="text-[11px]">{f.remarks}</span> : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Tab 3: CRA Logins Table */}
        {reportTab === 'cra' && (
          <div className="overflow-x-auto">
            {allSecBIos.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs font-hindi">
                चुने गए दिनांक रेंज में कोई CRA लॉगिन रिकॉर्ड उपलब्ध नहीं है।
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                    <th className="p-3">दिनांक</th>
                    {effectiveScope === 'PHQ' && <th className="p-3">जिला</th>}
                    {effectiveScope !== 'SHO' && <th className="p-3">थाना</th>}
                    <th className="p-3">विवेचक का नाम</th>
                    <th className="p-3">पद</th>
                    <th className="p-3">लॉगिन किया?</th>
                    <th className="p-3">लॉगिन बार / समय</th>
                    <th className="p-3">विवरण / अनुपस्थिति कारण</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allSecBIos.map((io, idx) => (
                    <tr key={`${io.reportingDate}-${io.ioName}-${idx}`} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono text-slate-600 font-semibold">{io.reportingDate}</td>
                      {effectiveScope === 'PHQ' && (
                        <td className="p-3 font-bold text-slate-800">{io.districtNameHi || 'दुर्ग'}</td>
                      )}
                      {effectiveScope !== 'SHO' && (
                        <td className="p-3 font-semibold text-police-navy-900">{io.policeStationNameHi || 'कोतवाली'}</td>
                      )}
                      <td className="p-3 font-bold text-slate-900">{io.ioName}</td>
                      <td className="p-3 text-slate-600">{io.rank}</td>
                      <td className="p-3">
                        {io.hasLoggedIn ? (
                          <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-bold">
                            हाँ
                          </span>
                        ) : (
                          <span className="bg-rose-100 text-rose-800 border border-rose-300 px-2 py-0.5 rounded-full text-[10px] font-bold">
                            नहीं
                          </span>
                        )}
                      </td>
                      <td className="p-3 font-mono text-slate-700">
                        {io.hasLoggedIn ? `${io.loginCount || 1} बार` : '-'}
                      </td>
                      <td className="p-3 text-slate-600">
                        {io.notLoggedInReason ? <span className="text-rose-700 font-semibold block">{io.notLoggedInReason}</span> : null}
                        {io.remarks ? <span>{io.remarks}</span> : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Tab 4: Chargesheet & 60/90 Days Table */}
        {reportTab === 'chargesheet' && (
          <div className="overflow-x-auto">
            {allSecCChargesheets.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs font-hindi">
                चुने गए दिनांक रेंज में कोई चालान रिकॉर्ड उपलब्ध नहीं है।
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                    <th className="p-3">दिनांक</th>
                    {effectiveScope === 'PHQ' && <th className="p-3">जिला</th>}
                    {effectiveScope !== 'SHO' && <th className="p-3">थाना</th>}
                    <th className="p-3">FIR नंबर</th>
                    <th className="p-3">प्रकरण श्रेणी</th>
                    <th className="p-3">चालान तैयार?</th>
                    <th className="p-3">कोर्ट में पेश?</th>
                    <th className="p-3">न्यायालय</th>
                    <th className="p-3">CCTNS में दर्ज?</th>
                    <th className="p-3">रिमार्क</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allSecCChargesheets.map((c, idx) => (
                    <tr key={`${c.reportingDate}-${c.firNumber}-${idx}`} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-mono text-slate-600 font-semibold">{c.reportingDate}</td>
                      {effectiveScope === 'PHQ' && (
                        <td className="p-3 font-bold text-slate-800">{c.districtNameHi || 'दुर्ग'}</td>
                      )}
                      {effectiveScope !== 'SHO' && (
                        <td className="p-3 font-semibold text-police-navy-900">{c.policeStationNameHi || 'कोतवाली'}</td>
                      )}
                      <td className="p-3 font-mono font-bold text-police-navy-950">{c.firNumber}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          String(c.statutoryDays) === '90'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-indigo-100 text-indigo-900 border border-indigo-300'
                        }`}>
                          {String(c.statutoryDays) === '90' ? '90 दिवस प्रकरण' : '60 दिवस प्रकरण'}
                        </span>
                      </td>
                      <td className="p-3">
                        {c.chargesheetPrepared ? (
                          <span className="text-emerald-700 font-bold">हाँ</span>
                        ) : (
                          <span className="text-rose-600 font-semibold">नहीं</span>
                        )}
                      </td>
                      <td className="p-3">
                        {c.courtSubmissionStatus === 'Presented' ? (
                          <span className="text-emerald-700 font-bold">हाँ</span>
                        ) : (
                          <span className="text-rose-600 font-semibold">नहीं</span>
                        )}
                      </td>
                      <td className="p-3 text-slate-700 font-semibold">{c.courtEstablishmentName || '-'}</td>
                      <td className="p-3">
                        {c.cctnsEntryStatus === 'Completed' ? (
                          <span className="text-emerald-700 font-bold">हाँ</span>
                        ) : (
                          <span className="text-slate-400">लंबित</span>
                        )}
                      </td>
                      <td className="p-3 text-slate-600">{c.remarks || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* Full Daily Report Details Modal */}
      {selectedSubmissionForModal && (
        <div className="fixed inset-0 bg-police-navy-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-extrabold text-police-navy-950 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-police-gold-600" />
                  <span>दैनिक रिपोर्ट विवरण: {selectedSubmissionForModal.reportingDate}</span>
                </h3>
                <p className="text-xs text-slate-500 font-hindi">
                  थाना: {activePs?.nameHi} • प्रस्तुतकर्ता: {selectedSubmissionForModal.submittedByUserName}
                </p>
              </div>
              <button
                onClick={() => setSelectedSubmissionForModal(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Section A Summary */}
            <div className="bg-sky-50/60 border border-sky-200 rounded-xl p-3.5 space-y-2">
              <h4 className="text-xs font-bold text-sky-900 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-sky-700" />
                <span>सेक्शन A: ई-साक्ष्य एवं SID स्थिति</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-white p-2 rounded border border-sky-100">
                  <span className="text-slate-500 text-[10px] block">कुल FIRs:</span>
                  <span className="font-bold text-slate-900">{selectedSubmissionForModal.sectionA?.totalFirsToday || 0}</span>
                </div>
                <div className="bg-white p-2 rounded border border-sky-100">
                  <span className="text-slate-500 text-[10px] block">SID बनी:</span>
                  <span className="font-bold text-sky-700">{selectedSubmissionForModal.sectionA?.sidCreatedCount || 0}</span>
                </div>
                <div className="bg-white p-2 rounded border border-sky-100">
                  <span className="text-slate-500 text-[10px] block">फाइनल लिंक पूर्ण:</span>
                  <span className="font-bold text-emerald-700">{selectedSubmissionForModal.sectionA?.finalLinkCompletedCount || 0}</span>
                </div>
                <div className="bg-white p-2 rounded border border-sky-100">
                  <span className="text-slate-500 text-[10px] block">फाइनल लिंक लंबित:</span>
                  <span className="font-bold text-rose-700">{selectedSubmissionForModal.sectionA?.pendingFinalLinkCount || 0}</span>
                </div>
              </div>
            </div>

            {/* Section B Summary */}
            <div className="bg-indigo-50/60 border border-indigo-200 rounded-xl p-3.5 space-y-2">
              <h4 className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-indigo-700" />
                <span>सेक्शन B: CRA दैनिक लॉगिन स्थिति</span>
              </h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-white p-2 rounded border border-indigo-100">
                  <span className="text-slate-500 text-[10px] block">कुल पदस्थ विवेचक:</span>
                  <span className="font-bold text-slate-900">{selectedSubmissionForModal.sectionB?.totalIosPosted || 0}</span>
                </div>
                <div className="bg-white p-2 rounded border border-indigo-100">
                  <span className="text-slate-500 text-[10px] block">लॉगिन किया:</span>
                  <span className="font-bold text-emerald-700">{selectedSubmissionForModal.sectionB?.iosLoggedInToday || 0}</span>
                </div>
                <div className="bg-white p-2 rounded border border-indigo-100">
                  <span className="text-slate-500 text-[10px] block">लॉगिन प्रतिशत:</span>
                  <span className="font-bold text-indigo-700">{selectedSubmissionForModal.sectionB?.craLoginPercentage || 0}%</span>
                </div>
              </div>
            </div>

            {/* Section C Summary */}
            <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3.5 space-y-2">
              <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>सेक्शन C: चालान एवं 60/90 दिवस प्रगति</span>
              </h4>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-white p-2 rounded border border-amber-100">
                  <span className="text-slate-500 text-[10px] block">चालान तैयार:</span>
                  <span className="font-bold text-slate-900">{selectedSubmissionForModal.sectionC?.chargesheetsPreparedToday || 0}</span>
                </div>
                <div className="bg-white p-2 rounded border border-amber-100">
                  <span className="text-slate-500 text-[10px] block">कोर्ट में पेश:</span>
                  <span className="font-bold text-amber-800">{selectedSubmissionForModal.sectionC?.presentedInCourtToday || 0}</span>
                </div>
                <div className="bg-white p-2 rounded border border-amber-100">
                  <span className="text-slate-500 text-[10px] block">CCTNS में दर्ज:</span>
                  <span className="font-bold text-emerald-700">{selectedSubmissionForModal.sectionC?.enteredInCctnsToday || 0}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <div>
                {(currentUser.role === 'DISTRICT_ADMIN' || currentUser.role === 'SUPER_ADMIN') && (
                  <button
                    type="button"
                    onClick={() => {
                      setReturnSubmissionTarget(selectedSubmissionForModal);
                      setShowReturnModal(true);
                    }}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                    <span>सुधार हेतु वापस भेजें</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => setSelectedSubmissionForModal(null)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-4 py-2 rounded-xl text-xs"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Return for Correction Confirmation Modal */}
      {showReturnModal && returnSubmissionTarget && (
        <div className="fixed inset-0 bg-police-navy-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl border border-slate-300 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-2.5">
              <h3 className="font-bold text-rose-800 flex items-center gap-2 text-sm">
                <RotateCcw className="w-4 h-4 text-rose-600" />
                <span>दैनिक रिपोर्ट सुधार हेतु वापस भेजें</span>
              </h3>
              <button onClick={() => setShowReturnModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div>
              <p className="text-xs text-slate-600 mb-2 font-hindi">
                थाना: <strong>{returnSubmissionTarget.policeStationNameHi || policeStations.find(p => p.id === returnSubmissionTarget.policeStationId)?.nameHi || returnSubmissionTarget.policeStationCode}</strong> | दिनांक: <strong>{returnSubmissionTarget.reportingDate}</strong>
              </p>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                सुधार / विसंगति का कारण दर्ज करें:
              </label>
              <textarea
                value={returnReasonText}
                onChange={(e) => setReturnReasonText(e.target.value)}
                rows={3}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500 font-hindi"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setShowReturnModal(false)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                रद्द करें
              </button>
              <button
                type="button"
                onClick={() => {
                  returnSubmissionForCorrection(returnSubmissionTarget.id, returnReasonText, currentUser.fullNameHi || 'एडमिन');
                  setShowReturnModal(false);
                  setSelectedSubmissionForModal(null);
                  alert('रिपोर्ट संशोधन हेतु थाने को वापस भेज दी गई है!');
                }}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1 shadow"
              >
                <Check className="w-4 h-4" />
                <span>पुष्टि करें व वापस भेजें</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
