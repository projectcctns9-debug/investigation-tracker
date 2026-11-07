import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DistrictPsSelector } from '../components/DistrictPsSelector';
import { mockDailyProgressEntries, mockFirRecords } from '../data/mockData';
import { BookOpenCheck, PlusCircle, CheckCircle2, User, Calendar, FileText, Send } from 'lucide-react';

interface DailyProgressEntryProps {
  selectedDistrictId: string;
  selectedPsId: string;
  onDistrictChange: (id: string) => void;
  onPsChange: (id: string) => void;
}

export const DailyProgressEntry: React.FC<DailyProgressEntryProps> = ({
  selectedDistrictId,
  selectedPsId,
  onDistrictChange,
  onPsChange
}) => {
  const { t, mode } = useLanguage();
  const [entries, setEntries] = useState(mockDailyProgressEntries);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [selectedFir, setSelectedFir] = useState('142/2026');
  const [diaryNo, setDiaryNo] = useState('CD-15');
  const [summaryHi, setSummaryHi] = useState('');
  const [arrests, setArrests] = useState(0);
  const [witnesses, setWitnesses] = useState(2);
  const [seizures, setSeizures] = useState(false);
  const [seizureDetails, setSeizureDetails] = useState('');
  const [nextPlan, setNextPlan] = useState('');

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      id: `dp-${Date.now()}`,
      firId: 'fir-1',
      firNumber: selectedFir,
      policeStationId: selectedPsId || 'ps-durg-1',
      entryDate: new Date().toISOString().split('T')[0],
      ioOfficerId: 'off-1',
      ioName: 'SI Rajesh Sharma',
      diaryNumber: diaryNo,
      progressSummary: summaryHi,
      progressSummaryHi: summaryHi,
      accusedArrestedCount: arrests,
      witnessesExaminedCount: witnesses,
      seizureMade: seizures,
      seizureDetails: seizureDetails,
      nextStepPlan: nextPlan
    };

    setEntries([newEntry, ...entries]);
    setShowAddForm(false);
    setSummaryHi('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-police-navy-900 flex items-center gap-2">
            <BookOpenCheck className="w-6 h-6 text-police-gold-600" />
            <span>{t('दैनिक विवेचना प्रगति प्रविष्टि', 'Daily Investigation Progress Entry')}</span>
          </h2>
          <p className="text-xs text-slate-500 font-hindi">
            {t('केस डायरी (CD), गवाह बयान, साक्ष्य जब्ती एवं आगामी विवेचना योजना का दैनिक रिकॉर्ड', 'Daily record of Case Diary entries, witness statements, seizures, and investigation milestones')}
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-police-navy-800 hover:bg-police-navy-900 text-white px-3.5 py-2 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
        >
          <PlusCircle className="w-4 h-4 text-police-gold-400" />
          <span>{showAddForm ? t('फॉर्म बंद करें', 'Close Form') : t('प्रगति प्रविष्टि जोड़ें', 'Add Progress Entry')}</span>
        </button>
      </div>

      <DistrictPsSelector
        selectedDistrictId={selectedDistrictId}
        selectedPsId={selectedPsId}
        onDistrictChange={onDistrictChange}
        onPsChange={onPsChange}
        showAllPsOption={true}
      />

      {/* Add Entry Form Modal/Accordion */}
      {showAddForm && (
        <form onSubmit={handleAddEntry} className="bg-white border-2 border-police-navy-700 rounded-2xl p-5 shadow-lg space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="text-sm font-bold text-police-navy-900">
              {t('केस डायरी (CD) दैनिक प्रगति प्रविष्टि फॉर्म', 'New Case Diary Daily Progress Form')}
            </h3>
            <span className="text-xs text-slate-500 font-mono">Date: {new Date().toISOString().split('T')[0]}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t('FIR नंबर चुनें', 'Select FIR Number')}</label>
              <select
                value={selectedFir}
                onChange={(e) => setSelectedFir(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono font-bold"
              >
                {mockFirRecords.map(f => (
                  <option key={f.id} value={f.firNumber}>FIR {f.firNumber} - {f.crimeHead}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t('केस डायरी क्रमांक (CD No.)', 'Case Diary No.')}</label>
              <input
                type="text"
                value={diaryNo}
                onChange={(e) => setDiaryNo(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t('परीक्षित गवाह संख्या', 'Witnesses Examined')}</label>
              <input
                type="number"
                value={witnesses}
                onChange={(e) => setWitnesses(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-slate-700 mb-1">{t('दैनिक विवेचना सारांश (Summary of Action Taken) *', 'Daily Progress Summary *')}</label>
            <textarea
              required
              rows={3}
              value={summaryHi}
              onChange={(e) => setSummaryHi(e.target.value)}
              placeholder="उदा. गवाहों के 161 BNSS बयान लिए गए, घटनास्थल का नक्शा मौका तैयार किया गया..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t('जब्ती विवरण (यदि हो)', 'Seizure Details (if any)')}</label>
              <input
                type="text"
                value={seizureDetails}
                onChange={(e) => setSeizureDetails(e.target.value)}
                placeholder="उदा. घटना में प्रयुक्त लाठी / मोबाइल"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">{t('आगामी विवेचना योजना (Next Plan of Action)', 'Next Plan of Action')}</label>
              <input
                type="text"
                value={nextPlan}
                onChange={(e) => setNextPlan(e.target.value)}
                placeholder="उदा. FSL रिपोर्ट प्राप्त कर कोर्ट में चालान पेश करना"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              {t('रद्द करें', 'Cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs font-bold bg-police-navy-800 hover:bg-police-navy-900 text-white shadow"
            >
              {t('प्रगति दर्ज करें', 'Save Daily Progress')}
            </button>
          </div>
        </form>
      )}

      {/* Progress Timeline List */}
      <div className="space-y-4">
        {entries.map(entry => (
          <div key={entry.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-police-gold-400 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-black text-sm text-police-navy-900">
                  FIR {entry.firNumber}
                </span>
                <span className="bg-police-navy-100 text-police-navy-900 text-[11px] font-mono font-bold px-2 py-0.5 rounded">
                  {entry.diaryNumber}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {entry.entryDate}
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-700">
                {t('विवेचक:', 'IO:')} <strong className="text-slate-900">{entry.ioName}</strong>
              </div>
            </div>

            <p className="text-xs text-slate-800 mt-3 leading-relaxed font-hindi">
              {entry.progressSummaryHi}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
              <div>
                {t('गवाह बयान:', 'Witnesses Examined:')} <strong>{entry.witnessesExaminedCount}</strong>
              </div>
              <div>
                {t('जब्ती:', 'Seizure:')} <strong>{entry.seizureDetails || 'निरंक (None)'}</strong>
              </div>
              <div className="text-police-navy-800 font-semibold truncate">
                {t('अगला कदम:', 'Next:')} {entry.nextStepPlan}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
