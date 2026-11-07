import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DistrictPsSelector } from '../components/DistrictPsSelector';
import { mockTasks } from '../data/mockData';
import { CheckSquare, AlertTriangle, Clock, PlusCircle, CheckCircle2 } from 'lucide-react';

interface TasksPendingWorkProps {
  selectedDistrictId: string;
  selectedPsId: string;
  onDistrictChange: (id: string) => void;
  onPsChange: (id: string) => void;
}

export const TasksPendingWork: React.FC<TasksPendingWorkProps> = ({
  selectedDistrictId,
  selectedPsId,
  onDistrictChange,
  onPsChange
}) => {
  const { t, mode } = useLanguage();
  const [taskList, setTaskList] = useState(mockTasks);

  const toggleTaskStatus = (taskId: string) => {
    setTaskList(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status: t.status === 'Completed' ? 'Pending' : 'Completed'
        };
      }
      return t;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-police-navy-900 flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-police-gold-600" />
            <span>{t('कार्य एवं लंबित कार्य (टास्क बोर्ड)', 'Tasks and Pending Work')}</span>
          </h2>
          <p className="text-xs text-slate-500 font-hindi">
            {t('महत्वपूर्ण समय-सीमा कार्य, FSL रिपोर्ट फॉलोअप, साक्ष्य लिंकिंग व गिरफ्तारी वारंट तामीली', 'Critical timeline tasks, FSL report tracking, evidence tagging, and supervisory action items')}
          </p>
        </div>
      </div>

      <DistrictPsSelector
        selectedDistrictId={selectedDistrictId}
        selectedPsId={selectedPsId}
        onDistrictChange={onDistrictChange}
        onPsChange={onPsChange}
        showAllPsOption={true}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {taskList.map(task => {
          const isDone = task.status === 'Completed';
          return (
            <div
              key={task.id}
              className={`border rounded-xl p-4 transition-all shadow-sm ${
                isDone 
                  ? 'bg-slate-50 border-slate-200 opacity-70' 
                  : task.priority === 'High' 
                  ? 'bg-rose-50/50 border-rose-300' 
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    task.priority === 'High' 
                      ? 'bg-rose-600 text-white' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {task.priority} Priority
                  </span>
                  <span className="text-[11px] font-mono font-bold text-police-navy-800 bg-slate-200 px-1.5 py-0.5 rounded">
                    FIR {task.firNumber}
                  </span>
                </div>

                <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {task.deadline}
                </span>
              </div>

              <h4 className={`text-sm font-bold mt-2 ${isDone ? 'line-through text-slate-500' : 'text-slate-900'} font-hindi`}>
                {mode === 'bilingual' ? `${task.titleHi} (${task.titleEn})` : (mode === 'hi' ? task.titleHi : task.titleEn)}
              </h4>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200 text-xs">
                <span className="text-slate-600">
                  {t('प्रभारी IO:', 'Assigned IO:')} <strong className="text-slate-800">{task.assignedToIo}</strong>
                </span>

                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    isDone 
                      ? 'bg-slate-200 text-slate-700' 
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isDone ? t('पूर्ण हुआ', 'Done') : t('पूर्ण मार्क करें', 'Mark Done')}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
