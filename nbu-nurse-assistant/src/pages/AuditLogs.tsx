import React, { useState } from 'react';
import { 
  ShieldCheck, Search, Filter, Download, 
  CheckCircle2, History, ArrowRight,
  Lock, Terminal
} from 'lucide-react';

const AuditLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const logs = [
    { id: 1, time: '09:45:22 AM', date: '2026-06-07', user: 'Patrick Kamau', role: 'Staff Nurse', action: 'Dose Calculation', detail: 'Dopamine for NBU-001', status: 'Success' },
    { id: 2, time: '09:30:10 AM', date: '2026-06-07', user: 'Teresa Njoroge', role: 'In-Charge', action: 'System Login', detail: 'Session started from IP 192.168.1.45', status: 'Success' },
    { id: 3, time: '08:15:45 AM', date: '2026-06-07', user: 'System Core', role: 'Automated', action: 'Data Backup', detail: 'Cloud synchronization completed', status: 'Success' },
    { id: 4, time: '07:45:12 AM', date: '2026-06-07', user: 'Dr. Cynthia Wekesa', role: 'Medical Officer', action: 'Patient Admission', detail: 'Baby Mary Jane (NBU-001) registered', status: 'Success' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-28">
      {/* Structural Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Forensic Audit Ledger</h2>
          <p className="text-slate-500 font-medium">Immutable record of system-wide clinical actions and security events.</p>
        </div>
        <button className="bg-slate-50 border border-slate-200 text-slate-600 flex items-center space-x-2 px-8 py-3 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all shadow-sm">
          <Download size={16} />
          <span>Export Compliance CSV</span>
        </button>
      </div>

      {/* Stats Quick-Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Total Events', val: '2,456', icon: History, color: 'text-slate-600', bg: 'bg-slate-50' },
           { label: 'Security Alerts', val: '00', icon: Lock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
           { label: 'Dose Calculations', val: '156', icon: Terminal, color: 'text-blue-600', bg: 'bg-blue-50' },
           { label: 'System Uptime', val: '100%', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
         ].map(s => (
           <div key={s.label} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${s.bg} ${s.color}`}>
                 <s.icon size={18} />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{s.label}</p>
                 <p className="text-xl font-bold text-slate-900 tracking-tight">{s.val}</p>
              </div>
           </div>
         ))}
      </div>

      {/* Main Ledger Table */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row items-center gap-4 bg-slate-50/50">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Filter by clinician, hospital ID, or event type..."
              className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all placeholder:text-slate-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">
            <Filter size={14} />
            <span>Time Range</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 bg-slate-50/30">
                <th className="px-10 py-5">Timestamp</th>
                <th className="px-10 py-5">Clinician</th>
                <th className="px-10 py-5">Event Signature</th>
                <th className="px-10 py-5">Trace Details</th>
                <th className="px-10 py-5 text-right">Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-6 whitespace-nowrap">
                    <div className="text-xs font-black text-slate-700 font-mono tracking-tighter">{log.time}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{log.date}</div>
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                       <div className="w-9 h-9 rounded-[0.8rem] bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500 shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                          {log.user.split(' ').map(n => n[0]).join('')}
                       </div>
                       <div>
                          <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{log.user}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{log.role}</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="inline-flex px-3 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest border border-slate-200 group-hover:bg-white transition-all">
                      {log.action}
                    </div>
                  </td>
                  <td className="px-10 py-6 max-w-xs">
                    <p className="truncate text-xs font-bold text-slate-500 group-hover:text-slate-700 transition-colors leading-relaxed">
                       {log.detail}
                    </p>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2 text-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity">
                       <CheckCircle2 size={16} strokeWidth={3} />
                       <span className="text-[10px] font-black uppercase tracking-[0.15em]">SHA-256 Valid</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-8 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
           <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Showing 4 of 2,456 high-fidelity events</p>
           <div className="flex items-center space-x-2">
              <button className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">Previous</button>
              <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                 <button className="w-8 h-8 flex items-center justify-center bg-slate-900 text-white rounded-lg text-xs font-bold">1</button>
                 <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:bg-slate-50 rounded-lg text-xs font-bold transition-all">2</button>
                 <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:bg-slate-50 rounded-lg text-xs font-bold transition-all">3</button>
              </div>
              <button className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors flex items-center space-x-2 group">
                 <span>Next</span>
                 <ArrowRight size={14} className="group-hover:translate-x-1 transition-all" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
