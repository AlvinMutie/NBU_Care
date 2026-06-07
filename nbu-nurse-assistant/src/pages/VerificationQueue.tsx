import React from 'react';
import { 
  CheckCircle, XCircle, IdCard, Clock, 
  ShieldAlert, FileText, ArrowRight, CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const VerificationQueue: React.FC = () => {
  const pendingRequests = [
    { id: 1, name: 'Dr. Cynthia Wekesa', role: 'Medical Officer', hospitalId: 'HOSP-2026-045', date: '2026-06-07', email: 'cynthia@hospital.go.ke' },
    { id: 2, name: 'John Doe', role: 'Staff Nurse', hospitalId: 'NURSE-112-90', date: '2026-06-06', email: 'john.doe@hospital.go.ke' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-28 text-[var(--text-main)]">
      {/* Structural Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-main)]">Institutional Vetting</h2>
          <p className="text-slate-500 font-medium">Screen and authenticate new clinical staff registrations for unit access.</p>
        </div>
        <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-2 px-5 rounded-2xl shadow-sm flex items-center space-x-3">
           <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 flex items-center justify-center shadow-sm">
              <ShieldAlert size={20} />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Pending Requests</p>
              <p className="text-sm font-bold text-[var(--text-main)]">{pendingRequests.length} Applications</p>
           </div>
        </div>
      </div>

      {pendingRequests.length === 0 ? (
        <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[3rem] p-24 flex flex-col items-center justify-center text-center space-y-6 shadow-sm">
           <div className="w-20 h-20 rounded-[2rem] bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center shadow-inner">
              <CheckCircle2 size={40} strokeWidth={2.5} />
           </div>
           <div className="space-y-2">
              <h3 className="text-2xl font-bold text-[var(--text-main)]">Institutional Queue Clear</h3>
              <p className="text-slate-500 max-w-xs mx-auto font-medium leading-relaxed">All clinical registration requests have been successfully processed and audited.</p>
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {pendingRequests.map(request => (
             <motion.div 
               key={request.id} 
               whileHover={{ y: -5 }}
               className="bg-[var(--card-bg)] border border-[var(--border-main)] p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden group hover:border-emerald-200 transition-all flex flex-col justify-between"
             >
                {/* Background Decor */}
                <div className="absolute -right-10 -bottom-10 opacity-[0.03] text-[var(--text-main)] group-hover:scale-110 transition-transform duration-700">
                   <IdCard size={240} />
                </div>
                
                <div className="space-y-8 relative z-10">
                   <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-5">
                         <div className="w-16 h-16 rounded-[1.2rem] bg-[var(--bg-main)] border border-[var(--border-main)] flex items-center justify-center text-slate-400 font-black text-xl shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                            {request.name.split(' ').map(n => n[0]).join('')}
                         </div>
                         <div>
                            <h3 className="text-xl font-bold text-[var(--text-main)]">{request.name}</h3>
                            <div className="flex items-center space-x-2 text-[11px] font-black uppercase tracking-widest text-emerald-600">
                               <CheckCircle size={12} />
                               <span>Credentials Attached</span>
                            </div>
                         </div>
                      </div>
                      <div className="flex items-center space-x-1.5 text-slate-300 dark:text-slate-600 font-bold text-[10px] uppercase tracking-widest bg-[var(--bg-main)] px-3 py-1 rounded-lg">
                         <Clock size={12} />
                         <span>{request.date}</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 gap-4">
                      <div className="p-5 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl space-y-4 group-hover:bg-[var(--card-bg)] group-hover:border-emerald-100 dark:group-hover:border-emerald-900 transition-all">
                         <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Clinical Role</span>
                            <span className="text-xs font-bold text-[var(--text-main)]">{request.role}</span>
                         </div>
                         <div className="h-px bg-[var(--border-main)]" />
                         <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hospital ID</span>
                            <span className="text-xs font-black text-[var(--text-main)] font-mono tracking-wider">{request.hospitalId}</span>
                         </div>
                         <div className="h-px bg-[var(--border-main)]" />
                         <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Institutional Email</span>
                            <span className="text-xs font-bold text-slate-500 italic">{request.email}</span>
                         </div>
                      </div>
                   </div>

                   <div className="flex items-center space-x-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400">
                      <FileText size={16} strokeWidth={2.5} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Passport Image Verified (SHA-256)</span>
                   </div>
                </div>

                <div className="flex space-x-4 pt-10 relative z-10">
                   <button className="flex-1 flex items-center justify-center space-x-2 py-4 bg-[var(--card-bg)] border border-[var(--border-main)] text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:border-rose-100 dark:hover:border-rose-800 rounded-2xl transition-all text-xs font-bold uppercase tracking-widest">
                      <XCircle size={16} />
                      <span>Reject</span>
                   </button>
                   <button className="flex-[2] flex items-center justify-center space-x-2 py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl shadow-xl shadow-slate-200 dark:shadow-none hover:bg-black dark:hover:bg-emerald-600 transition-all text-xs font-bold uppercase tracking-widest group-hover:bg-emerald-600 group-hover:shadow-emerald-100">
                      <CheckCircle2 size={16} />
                      <span>Approve Institutional Access</span>
                   </button>
                </div>
             </motion.div>
           ))}
        </div>
      )}

      {/* Governance Footer */}
      <div className="pt-12 border-t border-[var(--border-main)] flex items-center justify-between">
         <div className="flex items-center space-x-3 text-slate-400">
            <AlertCircle size={14} />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Mandatory Vetting Protocol ND-HQ-SEC-2026</p>
         </div>
         <button className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest hover:text-[var(--text-main)] transition-colors flex items-center space-x-2">
            <span>View Full Compliance Manual</span>
            <ArrowRight size={12} />
         </button>
      </div>
    </div>
  );
};

export default VerificationQueue;
