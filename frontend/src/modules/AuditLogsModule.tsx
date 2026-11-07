import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMaster } from '../context/MasterContext';
import { ShieldCheck, Clock, Search, Filter, History } from 'lucide-react';

export const AuditLogsModule: React.FC = () => {
  const { t } = useLanguage();
  const { auditLogs } = useMaster();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLogs.filter(l => 
    searchTerm === '' ||
    l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-police-navy-900 flex items-center gap-2">
            <History className="w-6 h-6 text-police-gold-600" />
            <span>{t('सिस्टम ऑडिट एवं सुरक्षा लॉग (Audit Logs)', 'System Audit & Activity Logs')}</span>
          </h2>
          <p className="text-xs text-slate-500 font-hindi">
            {t('डेटा प्रविष्टि, सुधार, मास्टर परिवर्तन एवं यूजर गतिविधियों का अपरिवर्तनीय ऑडिट ट्रेल', 'Tamper-evident audit logs of data submissions, corrections, master imports, and logins')}
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder={t('ऑडिट लॉग खोजें...', 'Search Audit Trail...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b">
              <tr>
                <th className="px-4 py-3">{t('समय (Timestamp)', 'Timestamp')}</th>
                <th className="px-4 py-3">{t('उपयोगकर्ता (User)', 'User')}</th>
                <th className="px-4 py-3">{t('भूमिका (Role)', 'Role')}</th>
                <th className="px-4 py-3">{t('कार्रवाई (Action)', 'Action')}</th>
                <th className="px-4 py-3">{t('विवरण (Details)', 'Details')}</th>
                <th className="px-4 py-3">{t('IP पता (IP Address)', 'IP Address')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{log.timestamp}</td>
                  <td className="px-4 py-3 font-sans font-bold text-slate-900">{log.userName}</td>
                  <td className="px-4 py-3 font-sans">
                    <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded text-[10px] font-bold">
                      {log.userRole}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-police-navy-900">{log.action}</td>
                  <td className="px-4 py-3 font-sans text-slate-700 max-w-md">{log.details}</td>
                  <td className="px-4 py-3 text-slate-500">{log.ipAddress || '10.152.0.1'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
