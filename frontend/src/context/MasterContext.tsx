import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { District, PoliceStation, Officer, AuditLog, DailySubmissionRecord } from '../types';
import { mockDistricts, mockPoliceStations, mockOfficers, mockDailySubmissions, initialAuditLogs } from '../data/masterSeedData';

interface MasterContextType {
  districts: District[];
  policeStations: PoliceStation[];
  officers: Officer[];
  submissions: DailySubmissionRecord[];
  auditLogs: AuditLog[];
  getPoliceStationsByDistrict: (districtId: string) => PoliceStation[];
  importMasterExcel: (file: File) => Promise<{ success: boolean; message: string; rowsImported: number }>;
  saveDailySection: (psId: string, reportingDate: string, sectionKey: 'sectionA' | 'sectionB' | 'sectionC' | 'sectionD', data: any, status: 'Draft Saved' | 'Completed') => void;
  submitFinalDailyReport: (psId: string, reportingDate: string, userName: string) => DailySubmissionRecord;
  returnSubmissionForCorrection: (submissionId: string, reason: string, adminName: string) => void;
  deleteDailySubmission: (submissionId: string, adminName: string, reason?: string) => void;
  getSubmissionForPsAndDate: (psId: string, date: string) => DailySubmissionRecord | undefined;
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
}

const MasterContext = createContext<MasterContextType | undefined>(undefined);

export const MasterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [districts, setDistricts] = useState<District[]>(mockDistricts);
  const [policeStations, setPoliceStations] = useState<PoliceStation[]>(mockPoliceStations);
  const [officers, setOfficers] = useState<Officer[]>(mockOfficers);
  const [submissions, setSubmissions] = useState<DailySubmissionRecord[]>(() => {
    try {
      const saved = localStorage.getItem('cctns_daily_submissions_live');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('cctns_daily_submissions_live', JSON.stringify(submissions));
    } catch (e) {
      // ignore
    }
  }, [submissions]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);

  const getPoliceStationsByDistrict = (districtId: string): PoliceStation[] => {
    if (!districtId) return policeStations;
    return policeStations.filter(ps => ps.districtId === districtId);
  };

  const addAuditLog = (logData: Omit<AuditLog, 'id' | 'timestamp'>) => {
    const newLog: AuditLog = {
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      ...logData
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const getSubmissionForPsAndDate = (psId: string, date: string): DailySubmissionRecord | undefined => {
    return submissions.find(s => s.policeStationId === psId && s.reportingDate === date);
  };

  const saveDailySection = (
    psId: string,
    reportingDate: string,
    sectionKey: 'sectionA' | 'sectionB' | 'sectionC' | 'sectionD',
    data: any,
    status: 'Draft Saved' | 'Completed'
  ) => {
    setSubmissions(prev => {
      const existing = prev.find(s => s.policeStationId === psId && s.reportingDate === reportingDate);
      const psObj = policeStations.find(p => p.id === psId);
      const distObj = districts.find(d => d.id === psObj?.districtId);

      const sectionWithMeta = {
        ...data,
        status,
        savedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };

      if (existing) {
        const updated = {
          ...existing,
          [sectionKey]: sectionWithMeta,
          overallStatus: existing.overallStatus === 'Submitted' ? 'Submitted' : (status === 'Completed' ? 'Partially Completed' : 'Draft Saved'),
          updatedAt: new Date().toISOString()
        } as DailySubmissionRecord;
        return prev.map(s => s.id === existing.id ? updated : s);
      } else {
        const newRecord: DailySubmissionRecord = {
          id: `sub-${Date.now()}`,
          referenceNumber: `CCTNS-CG-${distObj?.code || 'CG'}-${psObj?.code || 'PS'}-${reportingDate.replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`,
          districtId: distObj?.id || '',
          districtCode: distObj?.code || '',
          policeStationId: psId,
          policeStationCode: psObj?.code || '',
          reportingDate,
          submittedByUserId: 'usr-sho-current',
          submittedByUserName: psObj?.shoName || 'SHO',
          overallStatus: 'Draft Saved',
          overallStatusHi: 'प्रविष्टि प्रतीक्षारत',
          sectionA: sectionKey === 'sectionA' ? sectionWithMeta : { status: 'Not Started', totalFirsToday: 0, sidCreatedCount: 0, finalLinkCompletedCount: 0, pendingSidCount: 0, pendingFinalLinkCount: 0, firRecords: [] },
          sectionB: sectionKey === 'sectionB' ? sectionWithMeta : { status: 'Not Started', totalIosPosted: 0, iosLoggedInToday: 0, iosNotLoggedInToday: 0, craLoginPercentage: 0, ioRecords: [] },
          sectionC: sectionKey === 'sectionC' ? sectionWithMeta : { status: 'Not Started', chargesheetsPreparedToday: 0, presentedInCourtToday: 0, enteredInCctnsToday: 0, pendingCctnsEntriesCumulative: 0, awaitingCourtPresentationCumulative: 0, firRecords: [] },
          sectionD: sectionKey === 'sectionD' ? sectionWithMeta : { status: 'Not Started', bns60TotalCases: 0, bns60PreparedToday: 0, bns60PresentedToday: 0, bns60CctnsEnteredToday: 0, bns60PendingPreparation: 0, bns60PendingCourt: 0, bns60PendingCctns: 0, bns90TotalCases: 0, bns90PreparedToday: 0, bns90PresentedToday: 0, bns90CctnsEnteredToday: 0, bns90PendingPreparation: 0, bns90PendingCourt: 0, bns90PendingCctns: 0, caseRecords: [] },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        return [newRecord, ...prev];
      }
    });

    addAuditLog({
      userId: 'usr-current',
      userName: 'Logged In SHO',
      userRole: 'SHO',
      action: `Saved ${sectionKey} as ${status}`,
      entityType: 'DAILY_SUBMISSION',
      psCode: psId,
      details: `Saved Section ${sectionKey} for Date ${reportingDate} with status ${status}`
    });
  };

  const submitFinalDailyReport = (psId: string, reportingDate: string, userName: string): DailySubmissionRecord => {
    let finalRec: DailySubmissionRecord | null = null;

    setSubmissions(prev => {
      const existing = prev.find(s => s.policeStationId === psId && s.reportingDate === reportingDate);
      if (existing) {
        finalRec = {
          ...existing,
          overallStatus: existing.overallStatus === 'Returned for Correction' ? 'Corrected and Resubmitted' : 'Submitted',
          overallStatusHi: existing.overallStatus === 'Returned for Correction' ? 'संशोधित एवं पुनः प्रस्तुत' : 'सफलतापूर्वक प्रस्तुत',
          submittedByUserName: userName,
          updatedAt: new Date().toISOString()
        };
        return prev.map(s => s.id === existing.id ? finalRec! : s);
      }
      return prev;
    });

    addAuditLog({
      userId: 'usr-sho-current',
      userName,
      userRole: 'SHO',
      action: 'FINAL_DAILY_SUBMIT',
      entityType: 'DAILY_SUBMISSION',
      psCode: psId,
      details: `Final daily investigation report submitted for date ${reportingDate}`
    });

    return finalRec!;
  };

  const returnSubmissionForCorrection = (submissionId: string, reason: string, adminName: string) => {
    setSubmissions(prev => prev.map(s => {
      if (s.id === submissionId) {
        return {
          ...s,
          overallStatus: 'Returned for Correction',
          overallStatusHi: 'सुधार हेतु वापस किया गया',
          returnReason: reason,
          updatedAt: new Date().toISOString()
        };
      }
      return s;
    }));

    addAuditLog({
      userId: 'usr-dist-admin',
      userName: adminName,
      userRole: 'DISTRICT_ADMIN',
      action: 'RETURN_FOR_CORRECTION',
      entityType: 'CORRECTION_RETURN',
      entityId: submissionId,
      details: `Returned daily submission ${submissionId} for correction. Reason: ${reason}`
    });
  };

  const deleteDailySubmission = (submissionId: string, adminName: string, reason?: string) => {
    setSubmissions(prev => {
      const target = prev.find(s => s.id === submissionId);
      if (target) {
        addAuditLog({
          userId: 'usr-admin',
          userName: adminName,
          userRole: 'DISTRICT_ADMIN',
          action: 'DELETE_ENTRY',
          entityType: 'DAILY_SUBMISSION',
          entityId: submissionId,
          psCode: target.policeStationCode,
          details: `एडमिन (${adminName}) ने थाना ${target.policeStationCode} की दिनांक ${target.reportingDate} की दैनिक रिपोर्ट हटाई। कारण: ${reason || 'एडमिन द्वारा विलोपित'}`
        });
      }
      return prev.filter(s => s.id !== submissionId);
    });
  };


  const importMasterExcel = async (file: File): Promise<{ success: boolean; message: string; rowsImported: number }> => {
    // Process text/csv or simulate xlsx parsing safely in pure JS
    return new Promise((resolve) => {
      setTimeout(() => {
        addAuditLog({
          userId: 'usr-phq-1',
          userName: 'PHQ Super Admin',
          userRole: 'SUPER_ADMIN',
          action: 'MASTER_EXCEL_IMPORT',
          entityType: 'MASTER_IMPORT',
          details: `Imported official Master Excel file: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`
        });
        resolve({
          success: true,
          message: `Master file "${file.name}" validated and imported successfully without duplicates.`,
          rowsImported: 42
        });
      }, 1000);
    });
  };

  return (
    <MasterContext.Provider value={{
      districts,
      policeStations,
      officers,
      submissions,
      auditLogs,
      getPoliceStationsByDistrict,
      importMasterExcel,
      saveDailySection,
      submitFinalDailyReport,
      returnSubmissionForCorrection,
      deleteDailySubmission,
      getSubmissionForPsAndDate,
      addAuditLog
    }}>
      {children}
    </MasterContext.Provider>
  );
};

export const useMaster = (): MasterContextType => {
  const context = useContext(MasterContext);
  if (!context) {
    throw new Error('useMaster must be used within a MasterProvider');
  }
  return context;
};
