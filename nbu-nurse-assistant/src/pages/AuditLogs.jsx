import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Search, 
  Filter, 
  AlertTriangle, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Activity,
  User,
  Calendar,
  Zap,
  Loader2
} from 'lucide-react';
import { api } from '../services/api';

export default function AuditLogs({ user, onNavigate }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.getRecentLogs();
        if (res.success) setLogs(res.data);
      } catch (err) {
        console.error('Failed to fetch logs');
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.user?.name && log.user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Accessing Audit Vault...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto w-full p-4 lg:p-10 pb-32 text-left">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 border-b border-slate-200 dark:border-slate-800 pb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <FileText className="w-6 h-6" />
             </div>
             <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Shift Records</h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium ml-1">Immutable ledger of clinical and system actions.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
           <div className="relative flex-1 sm:min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-600 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search clinician or action..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-slate-900 dark:text-white outline-none shadow-sm" 
              />
           </div>
           <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-sm">
             <Filter className="w-4 h-4" /> Filter
           </button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {filteredLogs.length === 0 ? (
            <div className="p-32 text-center">
              <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-200 dark:text-slate-700 border border-slate-100 dark:border-slate-800">
                 <FileText className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">Empty Registry</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">No records match your current criteria.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Timeline</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Clinician</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Clinical Action</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {filteredLogs.map((log, i) => (
                  <tr key={log._id || i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all cursor-pointer group">
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                           <Clock className="w-4 h-4" /> 
                        </div>
                        <span className="text-xs font-black text-slate-600 dark:text-slate-400 tracking-tight">
                           {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-black text-sm border border-slate-200 dark:border-slate-700">
                            {log.user?.name ? log.user.name[0] : '?'}
                         </div>
                         <div>
                            <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">{log.user?.name || 'Unknown'}</p>
                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1 opacity-80">{log.user?.role || 'Staff'}</p>
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300 max-w-md truncate">{log.action}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                         <Zap className="w-3 h-3 text-amber-500" />
                         <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{log.type} Module</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] border ${
                        log.status === 'Review' ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-800' : 
                        log.status === 'Checked' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800' : 
                        'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-800'
                      }`}>
                        {log.status === 'Review' ? <AlertTriangle className="w-3 h-3"/> : <ShieldCheck className="w-3 h-3" />}
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {filteredLogs.map((log, i) => (
           <div key={log._id || i} className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-6 shadow-sm active:scale-[0.98] transition-all">
              <div className="flex justify-between items-start mb-6">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-black border border-slate-200 dark:border-slate-700">
                       {log.user?.name ? log.user.name[0] : '?'}
                    </div>
                    <div>
                       <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight">{log.user?.name || 'Unknown'}</h4>
                       <p className="text-[9px] font-bold text-primary uppercase tracking-widest mt-0.5">{log.user?.role}</p>
                    </div>
                 </div>
                 <span className={`px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border ${
                    log.status === 'Review' ? 'bg-rose-50 text-rose-700 border-rose-100' : 
                    log.status === 'Checked' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                    'bg-amber-50 text-amber-700 border-amber-100'
                 }`}>
                    {log.status}
                 </span>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800/50 mb-6">
                 <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-relaxed">{log.action}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                 <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase">
                    <Clock className="w-3.5 h-3.5 text-primary" /> {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                 </div>
                 <div className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">{log.type}</div>
              </div>
           </div>
        ))}
        {filteredLogs.length === 0 && (
           <div className="py-20 text-center bg-slate-50 dark:bg-slate-900 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800">
              <FileText className="w-10 h-10 text-slate-200 dark:text-slate-700 mx-auto mb-4" />
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No matching records</p>
           </div>
        )}
      </div>
      
      {/* Pagination Footer */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 px-2">
        <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 dark:text-slate-600 uppercase">
          Unit Audit Log • {filteredLogs.length} Records
        </span>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 hover:text-slate-900 dark:hover:text-white transition-all active:scale-95 shadow-sm">
             <ChevronLeft className="w-4 h-4" />
             <span className="text-[10px] font-black uppercase tracking-widest">Previous</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 hover:text-slate-900 dark:hover:text-white transition-all active:scale-95 shadow-sm">
             <span className="text-[10px] font-black uppercase tracking-widest">Next</span>
             <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
