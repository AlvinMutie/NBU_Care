import React, { useState } from 'react';
import { ShieldCheck, Search, Filter, Download } from 'lucide-react';

const AuditLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const logs = [
    { id: 1, time: '09:45:22 AM', date: '2026-06-07', user: 'Patrick Kamau', role: 'Staff Nurse', action: 'Dose Calculation', detail: 'Dopamine for NBU-001', status: 'Success' },
    { id: 2, time: '09:30:10 AM', date: '2026-06-07', user: 'Teresa Njoroge', role: 'In-Charge', action: 'System Login', detail: 'Session started from IP 192.168.1.45', status: 'Success' },
    { id: 3, time: '08:15:45 AM', date: '2026-06-07', user: 'System', role: 'Automated', action: 'Data Backup', detail: 'Cloud synchronization completed', status: 'Success' },
    { id: 4, time: '07:45:12 AM', date: '2026-06-07', user: 'Cynthia Wekesa', role: 'MO', action: 'Patient Admission', detail: 'Baby Mary Jane (NBU-001) registered', status: 'Success' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Audit Records</h2>
          <p className="text-slate-400">Forensic clinical action ledger and system security logs.</p>
        </div>
        <button className="glass-card flex items-center space-x-2 w-full lg:w-auto justify-center py-2.5 px-6 text-slate-300 hover:text-white transition-all">
          <Download size={18} />
          <span className="font-bold text-sm">Export CSV</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by clinician, action or ID..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="glass-card px-6 py-3 flex items-center justify-center space-x-2 text-slate-400 hover:text-white transition-colors border-white/10">
          <Filter size={18} />
          <span className="font-medium text-sm">Filter</span>
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Clinician</th>
                <th className="px-6 py-4">Action Event</th>
                <th className="px-6 py-4">Context Details</th>
                <th className="px-6 py-4 text-right">Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="font-mono text-slate-300 group-hover:text-emerald-400 transition-colors">{log.time}</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{log.date}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="font-bold text-slate-100">{log.user}</div>
                    <div className="text-xs text-slate-500">{log.role}</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-5 max-w-xs">
                    <p className="truncate text-slate-400 group-hover:text-slate-300 transition-colors">{log.detail}</p>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2 text-emerald-400/70">
                       <ShieldCheck size={16} />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Verified</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
           <span>Showing 4 of 2,456 audit events</span>
           <div className="flex items-center space-x-2">
              <button className="px-3 py-1 hover:text-white transition-colors">Previous</button>
              <div className="flex items-center space-x-1">
                 <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20 font-bold">1</span>
                 <span className="px-2 py-0.5 hover:bg-white/5 rounded transition-colors cursor-pointer">2</span>
                 <span className="px-2 py-0.5 hover:bg-white/5 rounded transition-colors cursor-pointer">3</span>
              </div>
              <button className="px-3 py-1 hover:text-white transition-colors">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
