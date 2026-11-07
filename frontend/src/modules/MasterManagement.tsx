import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMaster } from '../context/MasterContext';
import { 
  Building, 
  Building2, 
  Upload, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertCircle, 
  Search, 
  Download, 
  ShieldCheck, 
  Plus, 
  Filter
} from 'lucide-react';

export const MasterManagement: React.FC = () => {
  const { t, mode } = useLanguage();
  const { districts, policeStations, importMasterExcel } = useMaster();

  const [activeTab, setActiveTab] = useState<'districts' | 'police_stations' | 'import'>('districts');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('dist-1');
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [importResult, setImportResult] = useState<{ success: boolean; message: string; rowsImported: number } | null>(null);

  const filteredPsList = policeStations.filter(p => 
    (!selectedDistrictId || p.districtId === selectedDistrictId) &&
    (searchTerm === '' || p.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) || p.nameHi.includes(searchTerm) || p.code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const res = await importMasterExcel(file);
      setIsUploading(false);
      setImportResult(res);
    }
  };

  const downloadMasterTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "district_name_en,district_name_hi,district_code,ps_name_en,ps_name_hi,ps_code,sho_name,sho_mobile\n"
      + "Durg,दुर्ग,DURG,Kotwali Durg,कोतवाली दुर्ग,KTW_DURG,TI Santosh Mishra,98261XXXX3\n"
      + "Durg,दुर्ग,DURG,Supela,सुपेला,SUPL,TI Rajesh Baghel,98261XXXX4\n"
      + "Raipur,रायपुर,RPR,Kotwali Raipur,कोतवाली रायपुर,KTW_RPR,TI Ramesh Soni,98261XXXX5\n"
      + "Bilaspur,बिलासपुर,BSP,City Kotwali Bilaspur,सिटी कोतवाली बिलासपुर,KTW_BSP,TI Manish Chandra,98261XXXX1\n"
      + "Mungeli,मुंगेली,MGL,City Kotwali Mungeli,सिटी कोतवाली मुंगेली,KTW_MGL,TI Arvind Sahu,98261XXXX4\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Chhattisgarh_Police_District_PS_Master_Template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-police-navy-900 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-police-gold-600" />
            <span>{t('मास्टर डेटा प्रबंधन (Master Management)', 'District & Police Station Master Management')}</span>
          </h2>
          <p className="text-xs text-slate-500 font-hindi">
            {t('आधिकारिक जिला मास्टर, थाना मास्टर एवं एक्सेल/CSV आयात प्रणाली', 'Authoritative District & Police Station master catalog with Excel/CSV import')}
          </p>
        </div>

        <button
          onClick={downloadMasterTemplate}
          className="bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
        >
          <Download className="w-4 h-4 text-emerald-200" />
          <span>{t('मास्टर एक्सेल टेम्पलेट डाउनलोड', 'Download Master Template')}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white px-4 rounded-t-xl">
        <button
          onClick={() => setActiveTab('districts')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'districts'
              ? 'border-police-navy-800 text-police-navy-900 bg-slate-50/80'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>{t('1. जिला मास्टर (Districts Master)', '1. Districts Master')}</span>
          <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-full font-mono">
            {districts.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('police_stations')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'police_stations'
              ? 'border-police-navy-800 text-police-navy-900 bg-slate-50/80'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>{t('2. थाना मास्टर (Police Station Master)', '2. Police Station Master')}</span>
          <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-full font-mono">
            {policeStations.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('import')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'import'
              ? 'border-police-navy-800 text-police-navy-900 bg-slate-50/80'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>{t('3. एक्सेल/CSV मास्टर आयात (Excel Import)', '3. Import Master Excel')}</span>
        </button>
      </div>

      {/* Tab 1: Districts Master */}
      {activeTab === 'districts' && (
        <div className="bg-white border border-slate-200 rounded-b-xl shadow-sm p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {districts.map((d) => (
              <div key={d.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-police-gold-400 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-police-navy-900">{d.nameHi}</span>
                  <span className="bg-police-navy-900 text-police-gold-300 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {d.code}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1">{d.nameEn} District</div>
                <div className="text-[11px] text-slate-400 font-mono mt-2">
                  Total PS: <strong>{d.totalPoliceStations || 10}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Police Station Master with Cascading Selection */}
      {activeTab === 'police_stations' && (
        <div className="bg-white border border-slate-200 rounded-b-xl shadow-sm p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-700">{t('जिला चुनें (Filter District):', 'Filter District:')}</span>
              <select
                value={selectedDistrictId}
                onChange={(e) => setSelectedDistrictId(e.target.value)}
                className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-bold focus:ring-1 focus:ring-police-navy-600"
              >
                <option value="">{t('सभी जिले (All Districts)', 'All Districts')}</option>
                {districts.map(d => (
                  <option key={d.id} value={d.id}>{d.nameHi} ({d.nameEn}) [{d.code}]</option>
                ))}
              </select>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder={t('थाना खोजें...', 'Search PS...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b">
                <tr>
                  <th className="px-4 py-3">{t('क्र.', 'S.N.')}</th>
                  <th className="px-4 py-3">{t('थाना नाम (हिंदी)', 'PS Name (Hi)')}</th>
                  <th className="px-4 py-3">{t('थाना नाम (English)', 'PS Name (En)')}</th>
                  <th className="px-4 py-3">{t('थाना कोड (PS Code)', 'PS Code')}</th>
                  <th className="px-4 py-3">{t('संबंधित जिला (District)', 'District')}</th>
                  <th className="px-4 py-3">{t('थाना प्रभारी (SHO)', 'Assigned SHO')}</th>
                  <th className="px-4 py-3">{t('संपर्क मोबाइल', 'Mobile')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                {filteredPsList.map((ps, idx) => {
                  const dist = districts.find(d => d.id === ps.districtId);
                  return (
                    <tr key={ps.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-500">{idx + 1}</td>
                      <td className="px-4 py-3 font-sans font-bold text-slate-900">{ps.nameHi}</td>
                      <td className="px-4 py-3 font-sans text-slate-700">{ps.nameEn}</td>
                      <td className="px-4 py-3 font-bold text-police-navy-900">{ps.code}</td>
                      <td className="px-4 py-3 font-sans text-slate-800">{dist?.nameHi} [{dist?.code}]</td>
                      <td className="px-4 py-3 font-sans text-slate-700">{ps.shoName || '-'}</td>
                      <td className="px-4 py-3 text-slate-500">{ps.shoMobile || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Excel Import */}
      {activeTab === 'import' && (
        <div className="bg-white border border-slate-200 rounded-b-xl shadow-sm p-6 space-y-6">
          <div className="border-2 border-dashed border-slate-300 hover:border-police-navy-700 rounded-2xl p-8 text-center space-y-3 bg-slate-50/50">
            <div className="w-16 h-16 rounded-full bg-police-navy-100 text-police-navy-800 flex items-center justify-center mx-auto">
              <FileSpreadsheet className="w-8 h-8 text-police-gold-600" />
            </div>

            <div>
              <h4 className="text-base font-black text-police-navy-900">
                {t('आधिकारिक जिला एवं थाना मास्टर फ़ाइल आयात करें', 'Import Official District & Police Station Master')}
              </h4>
              <p className="text-xs text-slate-500 font-hindi mt-1 max-w-md mx-auto">
                {t('Excel (.xlsx) या CSV फ़ाइल अपलोड करें। सिस्टम डुप्लीकेट रिकॉर्ड्स की स्वतः पहचान कर डेटाबेस को अद्यतन करेगा।', 'Supports Excel/CSV. Strictly maps District Code with Police Station Code without duplicates.')}
              </p>
            </div>

            <div className="pt-2">
              <label className="bg-police-navy-800 hover:bg-police-navy-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer inline-flex items-center gap-2 shadow">
                <Upload className="w-4 h-4 text-police-gold-400" />
                <span>{isUploading ? t('सत्यापित किया जा रहा है...', 'Validating...') : t('मास्टर फ़ाइल चुनें (Choose File)', 'Choose Master File')}</span>
                <input
                  type="file"
                  accept=".csv, .xlsx, .xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {importResult && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-emerald-900 text-xs flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <strong>{t('सफलतापूर्वक आयात!', 'Import Successful!')}</strong>
                <p className="mt-0.5">{importResult.message}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
