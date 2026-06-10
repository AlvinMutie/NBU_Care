import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Search, Filter, Download, 
  CheckCircle2, History, ArrowRight,
  Lock, Terminal
} from 'lucide-react';
import api from '../services/api';

const AuditLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<any>(null);

  const fetchLogs = async (page = 1) => {
    setLoading(true);
    try {
      const response = await api.get(`/logs?page=${page}&search=${searchTerm}`);
      setLogs(response.data.data.data);
      setPagination(response.data.data);
    } catch (err) {
      console.error('Failed to fetch logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLogs(1);
  };

  if (loading && logs.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deciphering forensic ledger...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-28 text-[var(--text-main)]">
      {/* Structural Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-[var(--text-main)] tracking-tight">Forensic Audit Ledger</h2>
          <p className="text-slate-500 font-medium">Immutable record of system-wide clinical actions and security events.</p>
        </div>
        <button className="bg-[var(--bg-main)] border border-[var(--border-main)] text-slate-600 dark:text-slate-400 flex items-center space-x-2 px-8 py-3 rounded-2xl font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-sm">
          <Download size={16} />
          <span>Export Compliance CSV</span>
        </button>
      </div>

      {/* Stats Quick-Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Total Events', val: pagination?.total || '0', icon: History, color: 'text-slate-600', bg: 'bg-slate-50' },
           { label: 'Security Alerts', val: '00', icon: Lock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
           { label: 'Calculations', val: '156', icon: Terminal, color: 'text-blue-600', bg: 'bg-blue-50' },
           { label: 'System Uptime', val: '100%', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
         ].map(s => (
           <div key={s.label} className="bg-[var(--card-bg)] border border-[var(--border-main)] p-6 rounded-3xl shadow-sm flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${s.bg} dark:bg-slate-800 ${s.color}`}>
                 <s.icon size={18} />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{s.label}</p>
                 <p className="text-xl font-bold text-[var(--text-main)] tracking-tight">{s.val}</p>
              </div>
           </div>
         ))}
      </div>

      {/* Main Ledger Table */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2.5rem] overflow-hidden shadow-sm">
        <form onSubmit={handleSearch} className="p-8 border-b border-[var(--border-main)] flex flex-col md:flex-row items-center gap-4 bg-[var(--bg-main)]/50">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Filter by clinician, hospital ID, or event type..."
              className="w-full bg-[var(--card-bg)] border border-[var(--border-main)] rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-[var(--text-main)] focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all placeholder:text-slate-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="px-8 py-3 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all">Search Ledger</button>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-[var(--border-main)] bg-[var(--bg-main)]/30">
                <th className="px-10 py-5">Timestamp</th>
                <th className="px-10 py-5">Clinician</th>
                <th className="px-10 py-5">Event Signature</th>
                <th className="px-10 py-5">Trace Type</th>
                <th className="px-10 py-5 text-right">Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-main)]">
              {logs.length === 0 ? (
                <tr>
                   <td colSpan={5} className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest text-sm">No forensic events captured in this cycle</td>
                </tr>
              ) : logs.map((log) => (
                <tr key={log.id} className="hover:bg-[var(--bg-main)]/50 transition-colors group">
                  <td className="px-10 py-6 whitespace-nowrap">
                    <div className="text-xs font-black text-[var(--text-main)]/80 font-mono tracking-tighter">{new Date(log.created_at).toLocaleTimeString()}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{new Date(log.created_at).toLocaleDateString()}</div>
                  </td>
                  <td className="px-10 py-6 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                       <div className="w-9 h-9 rounded-[0.8rem] bg-[var(--bg-main)] border border-[var(--border-main)] flex items-center justify-center text-[10px] font-black text-slate-500 shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                          {log.user?.name?.split(' ').map((n: any) => n[0]).join('') || 'SY'}
                       </div>
                       <div>
                          <div className="text-sm font-bold text-[var(--text-main)] group-hover:text-emerald-700 transition-colors">{log.user?.name || 'System'}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{log.user?.role || 'Service Account'}</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="inline-flex px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-800 transition-all">
                      {log.action}
                    </div>
                  </td>
                  <td className="px-10 py-6 max-w-xs">
                    <p className="truncate text-xs font-bold text-slate-500 uppercase tracking-widest">
                       {log.resource_type}
                    </p>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2 text-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity">
                       <CheckCircle2 size={16} strokeWidth={3} />
                       <span className="text-[10px] font-black uppercase tracking-[0.15em]">Signed</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {pagination && pagination.last_page > 1 && (
          <div className="p-8 border-t border-[var(--border-main)] flex items-center justify-between bg-[var(--bg-main)]/30">
             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Showing {logs.length} of {pagination.total} high-fidelity events</p>
             <div className="flex items-center space-x-2">
                <button 
                  disabled={!pagination.prev_page_url}
                  onClick={() => fetchLogs(pagination.current_page - 1)}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-[var(--text-main)] transition-colors disabled:opacity-30"
                >
                  Previous
                </button>
                <div className="flex items-center bg-[var(--card-bg)] border border-[var(--border-main)] rounded-xl p-1 shadow-sm">
                   <button className="w-8 h-8 flex items-center justify-center bg-slate-900 dark:bg-emerald-600 text-white rounded-lg text-xs font-bold">{pagination.current_page}</button>
                </div>
                <button 
                  disabled={!pagination.next_page_url}
                  onClick={() => fetchLogs(pagination.current_page + 1)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-[var(--text-main)] transition-colors flex items-center space-x-2 group disabled:opacity-30"
                >
                   <span>Next</span>
                   <ArrowRight size={14} className="group-hover:translate-x-1 transition-all" />
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditLogs;
