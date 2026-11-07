import { District, PoliceStation, Officer, CraDailyLogin, ESakshyaSid, FirRecord, BnsCustodyCase, DailyProgressEntry, TaskRecord } from '../types';

export const mockDistricts: District[] = [
  { id: 'dist-1', nameEn: 'Durg', nameHi: 'दुर्ग', code: 'DURG' },
  { id: 'dist-2', nameEn: 'Raipur', nameHi: 'रायपुर', code: 'RPR' },
  { id: 'dist-3', nameEn: 'Bilaspur', nameHi: 'बिलासपुर', code: 'BSP' },
  { id: 'dist-4', nameEn: 'Mungeli', nameHi: 'मुंगेली', code: 'MGL' },
  { id: 'dist-5', nameEn: 'Rajnandgaon', nameHi: 'राजनांदगांव', code: 'RJN' }
];

export const mockPoliceStations: PoliceStation[] = [
  // Durg PS
  { id: 'ps-durg-1', districtId: 'dist-1', nameEn: 'Kotwali Durg', nameHi: 'कोतवाली दुर्ग', code: 'KTW_DURG' },
  { id: 'ps-durg-2', districtId: 'dist-1', nameEn: 'Supela', nameHi: 'सुपेला', code: 'SUPL' },
  { id: 'ps-durg-3', districtId: 'dist-1', nameEn: 'Chhawani', nameHi: 'छावनी', code: 'CHWN' },
  { id: 'ps-durg-4', districtId: 'dist-1', nameEn: 'Mohan Nagar', nameHi: 'मोहन नगर', code: 'MHNR' },
  { id: 'ps-durg-5', districtId: 'dist-1', nameEn: 'Bhilai Bhatti', nameHi: 'भिलाई भट्टी', code: 'BHBT' },

  // Raipur PS
  { id: 'ps-rpr-1', districtId: 'dist-2', nameEn: 'Kotwali Raipur', nameHi: 'कोतवाली रायपुर', code: 'KTW_RPR' },
  { id: 'ps-rpr-2', districtId: 'dist-2', nameEn: 'Civil Lines Raipur', nameHi: 'सिविल लाइन्स रायपुर', code: 'CVL_RPR' },
  { id: 'ps-rpr-3', districtId: 'dist-2', nameEn: 'Telibandha', nameHi: 'तेलीबांधा', code: 'TLBD' },

  // Mungeli PS
  { id: 'ps-mgl-1', districtId: 'dist-4', nameEn: 'City Kotwali Mungeli', nameHi: 'सिटी कोतवाली मुंगेली', code: 'KTW_MGL' },
  { id: 'ps-mgl-2', districtId: 'dist-4', nameEn: 'Lormi', nameHi: 'लोरमी', code: 'LRMI' },
  { id: 'ps-mgl-3', districtId: 'dist-4', nameEn: 'Pathariya', nameHi: 'पथरिया', code: 'PTHR' }
];

export const mockOfficers: Officer[] = [
  { id: 'off-1', policeStationId: 'ps-durg-1', pno: 'CG-980412', nameEn: 'SI Rajesh Sharma', nameHi: 'उ.नि. राजेश शर्मा', rank: 'Sub-Inspector', rankHi: 'उप-निरीक्षक', mobile: '98261XXXX1', isActiveIO: true },
  { id: 'off-2', policeStationId: 'ps-durg-1', pno: 'CG-020519', nameEn: 'ASI Vinod Kumar Sahu', nameHi: 'स.उ.नि. विनोद कुमार साहू', rank: 'Asst. Sub-Inspector', rankHi: 'सहा. उप-निरीक्षक', mobile: '98261XXXX2', isActiveIO: true },
  { id: 'off-3', policeStationId: 'ps-durg-1', pno: 'CG-080124', nameEn: 'Inspector Santosh Mishra (TI)', nameHi: 'निरी. संतोष मिश्रा (थाना प्रभारी)', rank: 'Inspector', rankHi: 'निरीक्षक', mobile: '98261XXXX3', isActiveIO: false },
  { id: 'off-4', policeStationId: 'ps-durg-1', pno: 'CG-110293', nameEn: 'SI Anita Verma', nameHi: 'उ.नि. अनिता वर्मा', rank: 'Sub-Inspector', rankHi: 'उप-निरीक्षक', mobile: '98261XXXX4', isActiveIO: true },
  { id: 'off-5', policeStationId: 'ps-durg-1', pno: 'CG-140882', nameEn: 'ASI Ramesh Dewangan', nameHi: 'स.उ.नि. रमेश देवांगन', rank: 'Asst. Sub-Inspector', rankHi: 'सहा. उप-निरीक्षक', mobile: '98261XXXX5', isActiveIO: true },

  // Supela Officers
  { id: 'off-6', policeStationId: 'ps-durg-2', pno: 'CG-050311', nameEn: 'SI Bhupendra Singh', nameHi: 'उ.नि. भूपेंद्र सिंह', rank: 'Sub-Inspector', rankHi: 'उप-निरीक्षक', mobile: '98261XXXX6', isActiveIO: true },
  { id: 'off-7', policeStationId: 'ps-durg-2', pno: 'CG-090422', nameEn: 'ASI D. K. Markam', nameHi: 'स.उ.नि. डी. के. मरकाम', rank: 'Asst. Sub-Inspector', rankHi: 'सहा. उप-निरीक्षक', mobile: '98261XXXX7', isActiveIO: true },

  // Mungeli Officers
  { id: 'off-8', policeStationId: 'ps-mgl-1', pno: 'CG-120789', nameEn: 'SI Pradeep Kashyap', nameHi: 'उ.नि. प्रदीप कश्यप', rank: 'Sub-Inspector', rankHi: 'उप-निरीक्षक', mobile: '98261XXXX8', isActiveIO: true },
  { id: 'off-9', policeStationId: 'ps-mgl-1', pno: 'CG-150993', nameEn: 'ASI G. R. Banjare', nameHi: 'स.उ.नि. जी. आर. बंजारे', rank: 'Asst. Sub-Inspector', rankHi: 'सहा. उप-निरीक्षक', mobile: '98261XXXX9', isActiveIO: true }
];

export const mockCraLogins: CraDailyLogin[] = [
  { id: 'cra-1', officerId: 'off-1', officerNameEn: 'SI Rajesh Sharma', officerNameHi: 'उ.नि. राजेश शर्मा', policeStationId: 'ps-durg-1', pno: 'CG-980412', date: '2026-11-06', hasLoggedIn: true, loginTime: '09:42 AM', casesUpdatedCount: 3, lastActiveAction: 'Case Diary No. 12 updated for FIR 142/2026' },
  { id: 'cra-2', officerId: 'off-2', officerNameEn: 'ASI Vinod Kumar Sahu', officerNameHi: 'स.उ.नि. विनोद कुमार साहू', policeStationId: 'ps-durg-1', pno: 'CG-020519', date: '2026-11-06', hasLoggedIn: true, loginTime: '11:15 AM', casesUpdatedCount: 1, lastActiveAction: 'e-Sakshya SID 88321 link requested' },
  { id: 'cra-3', officerId: 'off-4', officerNameEn: 'SI Anita Verma', officerNameHi: 'उ.नि. अनिता वर्मा', policeStationId: 'ps-durg-1', pno: 'CG-110293', date: '2026-11-06', hasLoggedIn: false, casesUpdatedCount: 0, lastActiveAction: 'No activity registered today' },
  { id: 'cra-4', officerId: 'off-5', officerNameEn: 'ASI Ramesh Dewangan', officerNameHi: 'स.उ.नि. रमेश देवांगन', policeStationId: 'ps-durg-1', pno: 'CG-140882', date: '2026-11-06', hasLoggedIn: false, casesUpdatedCount: 0, lastActiveAction: 'No activity registered today' },

  { id: 'cra-5', officerId: 'off-6', officerNameEn: 'SI Bhupendra Singh', officerNameHi: 'उ.नि. भूपेंद्र सिंह', policeStationId: 'ps-durg-2', pno: 'CG-050311', date: '2026-11-06', hasLoggedIn: true, loginTime: '10:05 AM', casesUpdatedCount: 2, lastActiveAction: 'Uploaded Scene photos for FIR 89/2026' },
  { id: 'cra-6', officerId: 'off-7', officerNameEn: 'ASI D. K. Markam', officerNameHi: 'स.उ.नि. डी. के. मरकाम', policeStationId: 'ps-durg-2', pno: 'CG-090422', date: '2026-11-06', hasLoggedIn: false, casesUpdatedCount: 0, lastActiveAction: 'No activity registered today' },

  { id: 'cra-7', officerId: 'off-8', officerNameEn: 'SI Pradeep Kashyap', officerNameHi: 'उ.नि. प्रदीप कश्यप', policeStationId: 'ps-mgl-1', pno: 'CG-120789', date: '2026-11-06', hasLoggedIn: true, loginTime: '10:30 AM', casesUpdatedCount: 4, lastActiveAction: 'Recorded 60-day review note' },
  { id: 'cra-8', officerId: 'off-9', officerNameEn: 'ASI G. R. Banjare', officerNameHi: 'स.उ.नि. जी. आर. बंजारे', policeStationId: 'ps-mgl-1', pno: 'CG-150993', date: '2026-11-06', hasLoggedIn: true, loginTime: '12:20 PM', casesUpdatedCount: 1, lastActiveAction: 'FIR 55/2026 CD-4 generated' }
];

export const mockFirRecords: FirRecord[] = [
  {
    id: 'fir-1',
    policeStationId: 'ps-durg-1',
    districtId: 'dist-1',
    firNumber: '142/2026',
    firYear: 2026,
    firDate: '2026-09-12',
    actsSections: 'BNS 103(1), 3(5)',
    crimeHead: 'Murder / हत्या',
    crimeHeadHi: 'हत्या',
    ioOfficerId: 'off-1',
    ioNameEn: 'SI Rajesh Sharma',
    ioNameHi: 'उ.नि. राजेश शर्मा',
    ioMobile: '98261XXXX1',
    complainantName: 'Kishore Patel',
    accusedNames: ['Suraj @ Golu', 'Deepak Yadav'],
    currentStatus: 'Challan Ready',
    currentStatusHi: 'चालान तैयार',
    totalSids: 4,
    linkedSids: 4,
    isAllSidsLinked: true
  },
  {
    id: 'fir-2',
    policeStationId: 'ps-durg-1',
    districtId: 'dist-1',
    firNumber: '168/2026',
    firYear: 2026,
    firDate: '2026-09-25',
    actsSections: 'BNS 303(2), 317(2)',
    crimeHead: 'Theft & Stolen Property / चोरी एवं माल बरामदगी',
    crimeHeadHi: 'चोरी एवं माल बरामदगी',
    ioOfficerId: 'off-2',
    ioNameEn: 'ASI Vinod Kumar Sahu',
    ioNameHi: 'स.उ.नि. विनोद कुमार साहू',
    ioMobile: '98261XXXX2',
    complainantName: 'Mohd. Salim',
    accusedNames: ['Ravi Gond'],
    currentStatus: 'Under Investigation',
    currentStatusHi: 'विवेचनाधीन',
    totalSids: 3,
    linkedSids: 1,
    isAllSidsLinked: false
  },
  {
    id: 'fir-3',
    policeStationId: 'ps-durg-1',
    districtId: 'dist-1',
    firNumber: '185/2026',
    firYear: 2026,
    firDate: '2026-10-05',
    actsSections: 'BNS 115(2), 351(2), 3(5)',
    crimeHead: 'Voluntarily Causing Hurt / मारपीट एवं धमकी',
    crimeHeadHi: 'मारपीट एवं धमकी',
    ioOfficerId: 'off-4',
    ioNameEn: 'SI Anita Verma',
    ioNameHi: 'उ.नि. अनिता वर्मा',
    ioMobile: '98261XXXX4',
    complainantName: 'Rameshwar Tandon',
    accusedNames: ['Manoj Tiwari', 'Ashok Baghel'],
    currentStatus: 'Under Investigation',
    currentStatusHi: 'विवेचनाधीन',
    totalSids: 2,
    linkedSids: 0,
    isAllSidsLinked: false
  },
  {
    id: 'fir-4',
    policeStationId: 'ps-durg-2',
    districtId: 'dist-1',
    firNumber: '89/2026',
    firYear: 2026,
    firDate: '2026-08-15',
    actsSections: 'BNS 318(4), 336(3), 340(2)',
    crimeHead: 'Cheating & Forgery / धोखाधड़ी एवं कूटरचना',
    crimeHeadHi: 'धोखाधड़ी एवं कूटरचना',
    ioOfficerId: 'off-6',
    ioNameEn: 'SI Bhupendra Singh',
    ioNameHi: 'उ.नि. भूपेंद्र सिंह',
    ioMobile: '98261XXXX6',
    complainantName: 'Dr. Vivek Chandrakar',
    accusedNames: ['Pramod Kumar Agrawal'],
    currentStatus: 'Challan Presented',
    currentStatusHi: 'कोर्ट में पेश',
    totalSids: 5,
    linkedSids: 5,
    isAllSidsLinked: true
  },
  {
    id: 'fir-5',
    policeStationId: 'ps-mgl-1',
    districtId: 'dist-4',
    firNumber: '55/2026',
    firYear: 2026,
    firDate: '2026-09-08',
    actsSections: 'BNS 109(1), 117(2)',
    crimeHead: 'Attempt to Murder / हत्या का प्रयास',
    crimeHeadHi: 'हत्या का प्रयास',
    ioOfficerId: 'off-8',
    ioNameEn: 'SI Pradeep Kashyap',
    ioNameHi: 'उ.नि. प्रदीप कश्यप',
    ioMobile: '98261XXXX8',
    complainantName: 'Balram Sahu',
    accusedNames: ['Dharmendra Netam'],
    currentStatus: 'Challan Ready',
    currentStatusHi: 'चालान तैयार',
    totalSids: 4,
    linkedSids: 4,
    isAllSidsLinked: true
  }
];

export const mockESakshyaSids: ESakshyaSid[] = [
  // FIR 142/2026 SIDs
  { id: 'sid-1', firId: 'fir-1', sidNumber: 'SID-2026-DURG-0912-01', evidenceType: 'Video', evidenceTypeHi: 'वीडियो (सीन ऑफ क्राइम)', collectedAt: '2026-09-12 14:30', locationDetails: 'घटना स्थल मुख्य कक्ष, स्टेशन रोड', geoCoords: '21.1904° N, 81.2849° E', hashValue: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', isFinalLinkedToChallan: true, finalLinkDate: '2026-11-04' },
  { id: 'sid-2', firId: 'fir-1', sidNumber: 'SID-2026-DURG-0912-02', evidenceType: 'Photo', evidenceTypeHi: 'फोटोग्राफ (शव स्थिति एवं निशान)', collectedAt: '2026-09-12 15:10', locationDetails: 'घटना स्थल, मोहन नगर क्रॉसिंग', geoCoords: '21.1910° N, 81.2855° E', hashValue: '8754b73243f65cd6c47847c23f1396b7978255b8efd848602b489a7cb17fb508', isFinalLinkedToChallan: true, finalLinkDate: '2026-11-04' },
  { id: 'sid-3', firId: 'fir-1', sidNumber: 'SID-2026-DURG-0912-03', evidenceType: 'Photo', evidenceTypeHi: 'फोटोग्राफ (जब्ती चाकू/हथियार)', collectedAt: '2026-09-13 11:20', locationDetails: 'झाड़ियों के पास, नाला पुलिया', geoCoords: '21.1925° N, 81.2870° E', hashValue: '5561b3cd9987978255b8efd848602b489a7cb17fb508976b782914ca495991b7', isFinalLinkedToChallan: true, finalLinkDate: '2026-11-04' },
  { id: 'sid-4', firId: 'fir-1', sidNumber: 'SID-2026-DURG-0912-04', evidenceType: 'Audio', evidenceTypeHi: 'ऑडियो (चश्मदीद गवाह बयान)', collectedAt: '2026-09-14 16:45', locationDetails: 'थाना परिसर कक्ष क्रमांक 2', geoCoords: '21.1890° N, 81.2840° E', hashValue: '9845cb17fb508976b782914ca495991b7e3b0c44298fc1c149afbf4c8996fb92', isFinalLinkedToChallan: true, finalLinkDate: '2026-11-05' },

  // FIR 168/2026 SIDs
  { id: 'sid-5', firId: 'fir-2', sidNumber: 'SID-2026-DURG-0925-01', evidenceType: 'Video', evidenceTypeHi: 'वीडियो (दुकान शटर कटाव स्थल)', collectedAt: '2026-09-25 08:30', locationDetails: 'गांधी चौक, मोबाइल शॉप', geoCoords: '21.1872° N, 81.2815° E', hashValue: '7721ab892914ca495991b7e3b0c44298fc1c149afbf4c8996fb921827498cbaa', isFinalLinkedToChallan: true, finalLinkDate: '2026-11-02' },
  { id: 'sid-6', firId: 'fir-2', sidNumber: 'SID-2026-DURG-0925-02', evidenceType: 'Photo', evidenceTypeHi: 'फोटोग्राफ (बरामद चोरी के 8 मोबाइल)', collectedAt: '2026-09-28 17:15', locationDetails: 'अभियुक्त का किराए का कमरा', geoCoords: '21.1950° N, 81.2890° E', hashValue: '3341ff991b7e3b0c44298fc1c149afbf4c8996fb921827498cbaacc987210982', isFinalLinkedToChallan: false },
  { id: 'sid-7', firId: 'fir-2', sidNumber: 'SID-2026-DURG-0925-03', evidenceType: 'Document', evidenceTypeHi: 'दस्तावेज़ (सीसीटीवी फुटेज पंचनामा)', collectedAt: '2026-10-01 12:00', locationDetails: 'थाना कंप्यूटर कक्ष', geoCoords: '21.1890° N, 81.2840° E', hashValue: '8812ee44298fc1c149afbf4c8996fb921827498cbaacc9872109827651aab890', isFinalLinkedToChallan: false },

  // FIR 185/2026 SIDs
  { id: 'sid-8', firId: 'fir-3', sidNumber: 'SID-2026-DURG-1005-01', evidenceType: 'Photo', evidenceTypeHi: 'फोटोग्राफ (आहत की चोट एवं एमएलसी)', collectedAt: '2026-10-05 21:00', locationDetails: 'जिला अस्पताल दुर्ग कैजुअल्टी', geoCoords: '21.1932° N, 81.2861° E', hashValue: '9921aa5c149afbf4c8996fb921827498cbaacc9872109827651aab8901239845', isFinalLinkedToChallan: false },
  { id: 'sid-9', firId: 'fir-3', sidNumber: 'SID-2026-DURG-1005-02', evidenceType: 'Video', evidenceTypeHi: 'वीडियो (विवाद स्थल पंचनामा)', collectedAt: '2026-10-06 10:30', locationDetails: 'पचरी पारा दुर्ग', geoCoords: '21.1945° N, 81.2835° E', hashValue: '4452cc996fb921827498cbaacc9872109827651aab890123984577881902bcdd', isFinalLinkedToChallan: false }
];

export const mockBnsCustodyCases: BnsCustodyCase[] = [
  {
    id: 'bns-1',
    firId: 'fir-1',
    policeStationId: 'ps-durg-1',
    districtId: 'dist-1',
    firNumber: '142/2026',
    firYear: 2026,
    actsSections: 'BNS 103(1) (Murder)',
    crimeHead: 'Murder (Sec 103 BNS)',
    crimeHeadHi: 'हत्या (धारा 103 बीएनएस)',
    accusedName: 'Suraj @ Golu (न्यायिक रिमांड)',
    arrestDate: '2026-08-10', // 88 days ago
    statutoryDays: 90,
    deadlineDate: '2026-11-08',
    daysElapsed: 88,
    daysRemaining: 2, // Critical!
    challanStatus: 'Ready',
    challanStatusHi: 'चालान पूर्ण तैयार',
    isDueTodayInCourt: true, // आज पेशी हेतु देय!
    isPresentedInCourt: false,
    courtName: 'CJJM Court No. 1, Durg / मुख्य न्यायिक मजिस्ट्रेट न्यायालय दुर्ग',
    cctnsEntryStatus: 'Pending', // Post court CCTNS entry pending!
    cctnsEntryStatusHi: 'CCTNS में प्रविष्टि शेष',
    ioNameEn: 'SI Rajesh Sharma',
    ioNameHi: 'उ.नि. राजेश शर्मा',
    ioMobile: '98261XXXX1'
  },
  {
    id: 'bns-2',
    firId: 'fir-2',
    policeStationId: 'ps-durg-1',
    districtId: 'dist-1',
    firNumber: '168/2026',
    firYear: 2026,
    actsSections: 'BNS 303(2) (Theft)',
    crimeHead: 'Theft (Sec 303 BNS)',
    crimeHeadHi: 'चोरी (धारा 303 बीएनएस)',
    accusedName: 'Ravi Gond (न्यायिक रिमांड)',
    arrestDate: '2026-09-15', // 52 days ago
    statutoryDays: 60,
    deadlineDate: '2026-11-14',
    daysElapsed: 52,
    daysRemaining: 8, // Urgent alert
    challanStatus: 'Supervisory Review',
    challanStatusHi: 'पर्यवेक्षण हेतु एसडीओपी कार्यालय में',
    isDueTodayInCourt: false,
    isPresentedInCourt: false,
    courtName: 'JMFC Court No. 3, Durg',
    cctnsEntryStatus: 'Pending',
    cctnsEntryStatusHi: 'लंबित',
    ioNameEn: 'ASI Vinod Kumar Sahu',
    ioNameHi: 'स.उ.नि. विनोद कुमार साहू',
    ioMobile: '98261XXXX2'
  },
  {
    id: 'bns-3',
    firId: 'fir-3',
    policeStationId: 'ps-durg-1',
    districtId: 'dist-1',
    firNumber: '185/2026',
    firYear: 2026,
    actsSections: 'BNS 115(2), 351(2)',
    crimeHead: 'Hurt & Criminal Intimidation',
    crimeHeadHi: 'चोट एवं आपराधिक धमकी',
    accusedName: 'Manoj Tiwari',
    arrestDate: '2026-10-06', // 31 days ago
    statutoryDays: 60,
    deadlineDate: '2026-12-05',
    daysElapsed: 31,
    daysRemaining: 29,
    challanStatus: 'Drafting',
    challanStatusHi: 'विवेचना एवं चालान प्रारूपण जारी',
    isDueTodayInCourt: false,
    isPresentedInCourt: false,
    courtName: 'JMFC Court No. 2, Durg',
    cctnsEntryStatus: 'Pending',
    cctnsEntryStatusHi: 'लंबित',
    ioNameEn: 'SI Anita Verma',
    ioNameHi: 'उ.नि. अनिता वर्मा',
    ioMobile: '98261XXXX4'
  },
  {
    id: 'bns-4',
    policeStationId: 'ps-durg-2',
    districtId: 'dist-1',
    firId: 'fir-4',
    firNumber: '89/2026',
    firYear: 2026,
    actsSections: 'BNS 318(4) (Cheating)',
    crimeHead: 'Cheating / धोखाधड़ी',
    crimeHeadHi: 'धोखाधड़ी (धारा 318 बीएनएस)',
    accusedName: 'Pramod Kumar Agrawal',
    arrestDate: '2026-08-20',
    statutoryDays: 60,
    deadlineDate: '2026-10-19',
    daysElapsed: 60,
    daysRemaining: 0,
    challanStatus: 'Presented',
    challanStatusHi: 'कोर्ट में प्रस्तुत',
    isDueTodayInCourt: false,
    isPresentedInCourt: true,
    courtPresentationDate: '2026-10-18',
    courtName: 'CJM Court Durg',
    cctnsEntryStatus: 'Completed', // CCTNS entry done!
    cctnsEntryStatusHi: 'CCTNS में दर्ज',
    cctnsDispatchNo: 'DISP-DURG-2026-4491',
    cctnsEntryDate: '2026-10-19',
    cctnsOperatorName: 'HC Santosh Dewangan (CCTNS Writer)',
    cisCaseNo: 'CIS-DURG-CR-2026-8819',
    ioNameEn: 'SI Bhupendra Singh',
    ioNameHi: 'उ.नि. भूपेंद्र सिंह',
    ioMobile: '98261XXXX6'
  },
  {
    id: 'bns-5',
    policeStationId: 'ps-mgl-1',
    districtId: 'dist-4',
    firId: 'fir-5',
    firNumber: '55/2026',
    firYear: 2026,
    actsSections: 'BNS 109(1) (Attempt to Murder)',
    crimeHead: 'Attempt to Murder',
    crimeHeadHi: 'हत्या का प्रयास (धारा 109 बीएनएस)',
    accusedName: 'Dharmendra Netam',
    arrestDate: '2026-08-12',
    statutoryDays: 90,
    deadlineDate: '2026-11-10',
    daysElapsed: 86,
    daysRemaining: 4, // Critical
    challanStatus: 'Ready',
    challanStatusHi: 'चालान तैयार',
    isDueTodayInCourt: true, // Due today!
    isPresentedInCourt: false,
    courtName: 'Sessions Court, Mungeli',
    cctnsEntryStatus: 'Pending',
    cctnsEntryStatusHi: 'CCTNS प्रविष्टि शेष',
    ioNameEn: 'SI Pradeep Kashyap',
    ioNameHi: 'उ.नि. प्रदीप कश्यप',
    ioMobile: '98261XXXX8'
  }
];

export const mockDailyProgressEntries: DailyProgressEntry[] = [
  {
    id: 'dp-1',
    firId: 'fir-1',
    firNumber: '142/2026',
    policeStationId: 'ps-durg-1',
    entryDate: '2026-11-06',
    ioOfficerId: 'off-1',
    ioName: 'SI Rajesh Sharma',
    diaryNumber: 'CD-14',
    progressSummary: 'Prepared final Charge-sheet memo and verified FSL ballistic receipt. All 4 e-Sakshya SIDs linked to Challan file.',
    progressSummaryHi: 'अंतिम आरोप पत्र ज्ञापन तैयार किया गया एवं एफएसएल रसीद सत्यापित की गई। सभी 4 ई-साक्ष्य एसआईडी चालान से लिंक किए गए।',
    accusedArrestedCount: 2,
    witnessesExaminedCount: 7,
    seizureMade: true,
    seizureDetails: 'Weapon of offence (knife) with FSL seal',
    nextStepPlan: 'Submit final charge-sheet before CJM Court Durg today.'
  },
  {
    id: 'dp-2',
    firId: 'fir-2',
    firNumber: '168/2026',
    policeStationId: 'ps-durg-1',
    entryDate: '2026-11-05',
    ioOfficerId: 'off-2',
    ioName: 'ASI Vinod Kumar Sahu',
    diaryNumber: 'CD-08',
    progressSummary: 'Interrogated receiver of stolen property. Seized 3 more mobile IMEI records from shop owner.',
    progressSummaryHi: 'चोरी का माल खरीदने वाले से पूछताछ की। दुकान मालिक से 3 अन्य मोबाइलों के आईएमईआई रिकॉर्ड जब्त किए।',
    accusedArrestedCount: 1,
    witnessesExaminedCount: 3,
    seizureMade: true,
    seizureDetails: '3 Smartphones IMEI matched',
    nextStepPlan: 'Complete linking remaining 2 e-Sakshya SIDs on CCTNS.'
  }
];

export const mockTasks: TaskRecord[] = [
  {
    id: 'task-1',
    policeStationId: 'ps-durg-1',
    firNumber: '142/2026',
    titleEn: 'Submit 90-day Challan before CJM Court Durg today',
    titleHi: 'आज सीजेएम कोर्ट दुर्ग में 90-दिवसीय चालान पेश करें (डिफॉल्ट बेल से बचाव हेतु)',
    priority: 'High',
    assignedToIo: 'SI Rajesh Sharma',
    deadline: '2026-11-06',
    status: 'In Progress',
    category: 'BNS 60/90 Timeline'
  },
  {
    id: 'task-2',
    policeStationId: 'ps-durg-1',
    firNumber: '168/2026',
    titleEn: 'Final link 2 pending e-Sakshya SIDs to CCTNS Investigation module',
    titleHi: 'CCTNS विवेचना मॉड्यूल में शेष 2 ई-साक्ष्य SID को अंतिम लिंक करें',
    priority: 'High',
    assignedToIo: 'ASI Vinod Kumar Sahu',
    deadline: '2026-11-07',
    status: 'Pending',
    category: 'e-Sakshya Tagging'
  },
  {
    id: 'task-3',
    policeStationId: 'ps-durg-1',
    firNumber: '185/2026',
    titleEn: 'Collect MLC Report from District Hospital Casualty Durg',
    titleHi: 'जिला अस्पताल दुर्ग कैजुअल्टी से डॉक्टर की अंतिम एमएलसी रिपोर्ट प्राप्त करें',
    priority: 'Medium',
    assignedToIo: 'SI Anita Verma',
    deadline: '2026-11-09',
    status: 'Pending',
    category: 'Supervisory Remarks'
  },
  {
    id: 'task-4',
    policeStationId: 'ps-mgl-1',
    firNumber: '55/2026',
    titleEn: 'Court submission of Attempt to Murder case (86/90 days expired)',
    titleHi: 'हत्या के प्रयास मामले में कोर्ट में चालान प्रस्तुतीकरण (86/90 दिन बीत चुके हैं)',
    priority: 'High',
    assignedToIo: 'SI Pradeep Kashyap',
    deadline: '2026-11-06',
    status: 'In Progress',
    category: 'BNS 60/90 Timeline'
  }
];
