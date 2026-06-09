import React, { useState, useEffect } from 'react';
import { 
  Users2, Search, Filter, Mail, Phone, 
  ShieldCheck, MoreVertical, ShieldAlert,
  ArrowRight, CheckCircle2, UserCheck
} from 'lucide-react';
import api from '../services/api';

const ManageStaff: React.FC = () => {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/users');
      setStaff(response.data.data);
    } catch (err) {
      console.error('Failed to fetch staff directory:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4 text-slate-400">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Accessing Institutional Directory...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-28 text-[var(--text-main)]">
      {/* Structural Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-main)]">Institutional Directory</h2>
          <p className="text-slate-500 font-medium">Manage clinical access and personnel profiles for the neonatal unit.</p>
        </div>
        <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-2 px-5 rounded-2xl shadow-sm flex items-center space-x-3">
           <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center shadow-sm">
              <UserCheck size={20} />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Active Personnel</p>
              <p className="text-sm font-bold text-[var(--text-main)]">{staff.length} Verified Clinicians</p>
           </div>
        </div>
      </div>

      {/* Control Surface */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-4 sm:p-6 rounded-[2rem] shadow-sm flex flex-col md:flex-row gap-6">
         <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by name, role or institutional ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all placeholder:text-slate-300" 
            />
         </div>
         <button className="flex items-center space-x-3 px-8 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all font-bold text-xs uppercase tracking-widest">
            <Filter size={18} />
            <span>Refine Criteria</span>
         </button>
      </div>

      {/* Modern Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredStaff.map((person) => (
          <div key={person.id} className="bg-[var(--card-bg)] border border-[var(--border-main)] p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden group hover:border-emerald-200 transition-all">
             <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center space-x-5">
                   <div className="w-16 h-16 rounded-[1.2rem] bg-[var(--bg-main)] border border-[var(--border-main)] flex items-center justify-center text-slate-400 font-black text-xl shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                      {person.name.split(' ').map((n: any) => n[0]).join('')}
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-[var(--text-main)]">{person.name}</h3>
                      <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 mt-1">
                         <ShieldCheck size={12} />
                         <span>{person.status} Access</span>
                      </div>
                   </div>
                </div>
                <button className="p-2 text-slate-300 hover:text-emerald-600 transition-colors">
                   <MoreVertical size={20} />
                </button>
             </div>

             <div className="mt-8 space-y-4 relative z-10">
                <div className="p-4 bg-[var(--bg-main)] rounded-2xl space-y-3">
                   <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Role Profile</span>
                      <span className="text-xs font-bold text-[var(--text-main)]">{person.role}</span>
                   </div>
                   <div className="h-px bg-[var(--border-main)]" />
                   <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Staff ID</span>
                      <span className="text-xs font-black text-[var(--text-main)] font-mono">{person.staff_id || 'NEO-SYS-00'+person.id}</span>
                   </div>
                </div>
                
                <div className="flex items-center space-x-3 text-slate-400 font-medium text-xs truncate">
                   <Mail size={14} className="shrink-0" />
                   <span>{person.email}</span>
                </div>
             </div>

             <div className="mt-8 pt-6 border-t border-[var(--border-main)] flex justify-between items-center relative z-10">
                <button className="text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-emerald-600 transition-colors">View Audit Log</button>
                <div className="flex -space-x-2">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="w-6 h-6 rounded-full border-2 border-[var(--card-bg)] bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-400">P{i}</div>
                   ))}
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-[var(--border-main)] flex items-center justify-between">
         <div className="flex items-center space-x-3 text-slate-400">
            <ShieldAlert size={14} />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Personnel access is forensically logged and audited</p>
         </div>
         <button className="text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-[var(--text-main)] transition-colors flex items-center space-x-2">
            <span>Security Compliance Center</span>
            <ArrowRight size={12} />
         </button>
      </div>
    </div>
  );
};

export default ManageStaff;
