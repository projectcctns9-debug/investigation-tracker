export type LanguageMode = 'bilingual' | 'hi' | 'en';

export type UserRole = 'SUPER_ADMIN' | 'DISTRICT_ADMIN' | 'SHO';

export interface UserAccount {
  id: string;
  username: string;
  fullNameEn: string;
  fullNameHi: string;
  role: UserRole;
  roleLabelHi: string;
  districtId?: string;
  districtNameEn?: string;
  districtNameHi?: string;
  districtCode?: string;
  policeStationId?: string;
  policeStationNameEn?: string;
  policeStationNameHi?: string;
  policeStationCode?: string;
  badgeNumber?: string;
  mobile?: string;
  email?: string;
  password?: string;
  isActive: boolean;
  lastLoginAt?: string;
}

export interface District {
  id: string;
  nameEn: string;
  nameHi: string;
  code: string;
  totalPoliceStations?: number;
}

export interface PoliceStation {
  id: string;
  districtId: string;
  nameEn: string;
  nameHi: string;
  code: string;
  shoName?: string;
  shoMobile?: string;
}

export interface Officer {
  id: string;
  policeStationId: string;
  pno: string;
  nameEn: string;
  nameHi: string;
  rank: 'Inspector' | 'Sub-Inspector' | 'Asst. Sub-Inspector' | 'Head Constable' | 'Constable';
  rankHi: string;
  mobile: string;
  isActiveIO: boolean;
}

export interface EditHistoryEntry {
  modifiedBy: string;
  modifiedByRole: string;
  modifiedAt: string;
  reason?: string;
  changesSummary?: string;
}

// Section A: e-Sakshya & FIR SID Tracking
export interface FirSidItem {
  id: string;
  firNumber: string;
  firYear: number;
  firRegistrationDate: string;
  ioName?: string;
  ioRank?: string;
  sidCreated: boolean;
  sidCount?: number;
  sidNumbers?: string[];
  sidNumber?: string;
  finalLinkCompleted: boolean;
  pendingReason?: string;
  remarks?: string;
  editHistory?: EditHistoryEntry[];
}

export interface DailySectionESakshya {
  status: 'Not Started' | 'Draft Saved' | 'Completed';
  totalFirsToday: number;
  sidCreatedCount: number;
  finalLinkCompletedCount: number;
  pendingSidCount: number;
  pendingFinalLinkCount: number;
  firRecords: FirSidItem[];
  generalRemarks?: string;
  savedAt?: string;
}

// Section B: CRA Login Tracking
export interface CraIoItem {
  id: string;
  ioName: string;
  ioCodePno?: string;
  rank: string;
  hasLoggedIn: boolean;
  loginCount?: number;
  notLoggedInReason?: string;
  loginTime?: string;
  remarks?: string;
  editHistory?: EditHistoryEntry[];
}

export interface DailySectionCra {
  status: 'Not Started' | 'Draft Saved' | 'Completed';
  totalIosPosted: number;
  iosLoggedInToday: number;
  iosNotLoggedInToday: number;
  craLoginPercentage: number;
  ioRecords: CraIoItem[];
  generalRemarks?: string;
  savedAt?: string;
}

// Section C: Chargesheet Tracking
export interface ChargesheetFirItem {
  id: string;
  firNumber: string;
  firYear: number;
  chargesheetPrepared: boolean;
  statutoryDays?: 60 | 90 | string; // 60 या 90 दिवस श्रेणी
  preparationDate?: string;
  courtSubmissionStatus: 'Pending' | 'Presented' | 'Returned';
  courtSubmissionDate?: string;
  courtEstablishmentName?: string;
  cctnsEntryStatus: 'Pending' | 'Completed';
  cctnsEntryDate?: string;
  cctnsDispatchNo?: string;
  cisCaseNo?: string;
  pendingReason?: string;
  remarks?: string;
  editHistory?: EditHistoryEntry[];
}

export interface DailySectionChargesheet {
  status: 'Not Started' | 'Draft Saved' | 'Completed';
  chargesheetsPreparedToday: number;
  presentedInCourtToday: number;
  enteredInCctnsToday: number;
  pendingCctnsEntriesCumulative: number;
  awaitingCourtPresentationCumulative: number;
  firRecords: ChargesheetFirItem[];
  generalRemarks?: string;
  savedAt?: string;
}

// Section D: 60/90 Days BNS Cases Monitoring
export interface BnsCustodyCaseItem {
  id: string;
  firNumber: string;
  firYear: number;
  registrationDate: string;
  arrestDate: string;
  bnsSections: string;
  ioName: string;
  accusedName: string;
  statutoryDays: 60 | 90;
  deadlineDate: string;
  daysElapsed: number;
  daysRemaining: number;
  isDueToday: boolean;
  isOverdue: boolean;
  chargesheetPrepared: boolean;
  courtPresented: boolean;
  cctnsEntry: boolean;
  pendingReason?: string;
  remarks?: string;
}

export interface DailySectionBns6090 {
  status: 'Not Started' | 'Draft Saved' | 'Completed';
  // 60 Days Subsection
  bns60TotalCases: number;
  bns60PreparedToday: number;
  bns60PresentedToday: number;
  bns60CctnsEnteredToday: number;
  bns60PendingPreparation: number;
  bns60PendingCourt: number;
  bns60PendingCctns: number;
  // 90 Days Subsection
  bns90TotalCases: number;
  bns90PreparedToday: number;
  bns90PresentedToday: number;
  bns90CctnsEnteredToday: number;
  bns90PendingPreparation: number;
  bns90PendingCourt: number;
  bns90PendingCctns: number;
  caseRecords: BnsCustodyCaseItem[];
  generalRemarks?: string;
  savedAt?: string;
}

// Combined Daily Submission Record
export interface DailySubmissionRecord {
  id: string;
  referenceNumber: string;
  districtId: string;
  districtCode: string;
  districtNameHi?: string;
  districtNameEn?: string;
  policeStationId: string;
  policeStationCode: string;
  policeStationNameHi?: string;
  policeStationNameEn?: string;
  reportingDate: string;
  submittedByUserId: string;
  submittedByUserName: string;
  overallStatus: 'Not Started' | 'Draft Saved' | 'Partially Completed' | 'Submitted' | 'Returned for Correction' | 'Corrected and Resubmitted';
  overallStatusHi: string;
  returnReason?: string;
  sectionA: DailySectionESakshya;
  sectionB: DailySectionCra;
  sectionC: DailySectionChargesheet;
  sectionD: DailySectionBns6090;
  createdAt: string;
  updatedAt: string;
  correctionHistory?: {
    timestamp: string;
    modifiedBy: string;
    sectionName: string;
    reason: string;
    oldSummary: string;
    newSummary: string;
  }[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  entityType: 'DAILY_SUBMISSION' | 'MASTER_IMPORT' | 'USER_MANAGEMENT' | 'CORRECTION_RETURN' | 'LOGIN';
  entityId?: string;
  districtCode?: string;
  psCode?: string;
  details: string;
  ipAddress?: string;
}

export interface LoginHistoryRecord {
  id: string;
  userId: string;
  username: string;
  role: UserRole;
  loginTime: string;
  ipAddress: string;
  status: 'SUCCESS' | 'FAILED';
}

export interface MasterImportSummary {
  fileName: string;
  importDate: string;
  totalRows: number;
  validRecords: number;
  invalidRecords: number;
  duplicateRecords: number;
  importedBy: string;
  status: 'COMPLETED' | 'FAILED' | 'PARTIAL';
}

// Backward-compatible type aliases for legacy mock fixtures
export type BnsCustodyCase = any;
export type CraDailyLogin = any;
export type ESakshyaSid = any;
export type FirRecord = any;
export type DailyProgressEntry = any;
export type TaskRecord = any;
