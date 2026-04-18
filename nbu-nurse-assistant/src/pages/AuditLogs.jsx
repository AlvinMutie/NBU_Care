import React, { useState, useEffect } from 'react';
import { ShieldCheck, FileText, Search, Filter, AlertTriangle, Clock, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
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
    log.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <Activity className="w-8 h-8 text-primary animate-pulse mb-4" />
        <p className="text-sm font-bold text-slate-400">Loading shift records...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto w-full p-8 pb-32">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Unit Records</h2>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Shift Records</h1>
          <p className="text-sm text-slate-500">A history of everything that has happened in the portal during this shift.</p>
        </div>
        
        <div className="flex gap-4">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search records..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 w-72 outline-none shadow-sm" 
              />
           </div>
           <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm">
             <Filter className="w-4 h-4" /> Filter
           </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {filteredLogs.length === 0 ? (
            <div className="p-20 text-center">
              <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-sm font-bold text-slate-400">No shift records found.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">When</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Who</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">What happened</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log, i) => (
                  <tr key={log._id || i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-500 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" /> 
                        {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-slate-900">{log.user?.name || 'Unknown'}</span>
                      <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">{log.user?.role || 'Staff'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600 font-medium">{log.action}</p>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">{log.type} Tool</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        log.status === 'Review' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 
                        log.status === 'Checked' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {log.status === 'Review' ? <AlertTriangle className="w-3.5 h-3.5"/> : <ShieldCheck className="w-3.5 h-3.5" />}
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/50">
          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
            Unit Audit Log • {filteredLogs.length} Records Shown
          </span>
          <div className="flex gap-2">
            <button className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-slate-900 transition-colors shadow-sm">
               <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-slate-900 transition-colors shadow-sm">
               <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
