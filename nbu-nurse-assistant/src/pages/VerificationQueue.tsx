import React from 'react';
import { CheckCircle, XCircle, User, IdCard, Clock } from 'lucide-react';

const VerificationQueue: React.FC = () => {
  const pendingRequests = [
    { id: 1, name: 'Dr. Cynthia Wekesa', role: 'Medical Officer', hospitalId: 'HOSP-2026-045', date: '2026-06-07' },
    { id: 2, name: 'Staff Nurse John Doe', role: 'Staff Nurse', hospitalId: 'NURSE-112-90', date: '2026-06-06' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-bold text-slate-100">Verification Queue</h2>
        <p className="text-slate-400 text-sm sm:text-base">Screen and approve new clinical staff registrations.</p>
      </div>

      {pendingRequests.length === 0 ? (
        <div className="glass-card p-12 flex flex-col items-center justify-center text-center space-y-4">
           <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle size={32} />
           </div>
           <h3 className="text-xl font-bold text-slate-100">Queue is Clear</h3>
           <p className="text-slate-400 max-w-xs">All registration requests have been processed.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {pendingRequests.map(request => (
             <div key={request.id} className="glass-card p-6 space-y-6 border-l-4 border-amber-500 relative overflow-hidden group">
                {/* Background ID Badge watermarker */}
                <IdCard className="absolute -right-4 -bottom-4 text-white/[0.02] -rotate-12 group-hover:scale-110 transition-transform" size={160} />
                
                <div className="flex items-start justify-between relative z-10">
                   <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                         <User size={28} />
                      </div>
                      <div>
                         <h3 className="text-lg font-bold text-slate-100">{request.name}</h3>
                         <p className="text-xs text-amber-400 font-bold uppercase tracking-widest">{request.role}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="flex items-center space-x-1 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                         <Clock size={12} />
                         <span>{request.date}</span>
                      </div>
                   </div>
                </div>

                <div className="bg-black/20 rounded-xl p-4 border border-white/5 space-y-3 relative z-10">
                   <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-bold uppercase tracking-widest">Hospital ID</span>
                      <span className="text-slate-100 font-mono font-bold tracking-wider">{request.hospitalId}</span>
                   </div>
                   <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-bold uppercase tracking-widest">Verification Documents</span>
                      <span className="text-emerald-400 font-bold">Uploaded (JPG)</span>
                   </div>
                </div>

                <div className="flex space-x-3 pt-2 relative z-10">
                   <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/20 transition-all text-xs font-bold uppercase tracking-widest">
                      <XCircle size={16} />
                      <span>Reject</span>
                   </button>
                   <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/20 transition-all text-xs font-bold uppercase tracking-widest">
                      <CheckCircle size={16} />
                      <span>Approve Access</span>
                   </button>
                </div>
             </div>
           ))}
        </div>
      )}
    </div>
  );
};

export default VerificationQueue;
