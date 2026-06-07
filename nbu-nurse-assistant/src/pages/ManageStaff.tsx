import React, { useState } from 'react';
import { 
  Search, UserPlus, MoreVertical, ShieldCheck, 
  Mail, Trash2, Filter
} from 'lucide-react';

const ManageStaff: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const staff = [
    { id: 1, name: 'Patrick Kamau', role: 'Staff Nurse', email: 'patrick@hospital.go.ke', status: 'Active', verified: true },
    { id: 2, name: 'Angela Omwansa', role: 'Consultant', email: 'angela@hospital.go.ke', status: 'Active', verified: true },
    { id: 3, name: 'Cynthia Wekesa', role: 'Medical Officer', email: 'cynthia@hospital.go.ke', status: 'Restricted', verified: false },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-28 text-[var(--text-main)]">
      {/* Structural Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-main)]">Institutional Directory</h2>
          <p className="text-slate-500 font-medium">Manage clinical team access, role-based permissions, and verification cycles.</p>
        </div>
        <button className="bg-slate-900 dark:bg-emerald-600 text-white flex items-center space-x-2 px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 dark:shadow-none hover:bg-black dark:hover:bg-emerald-700 transition-all active:scale-95">
          <UserPlus size={18} strokeWidth={3} />
          <span>Provision New Clinician</span>
        </button>
      </div>

      {/* Modern Directory Table */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-[var(--border-main)] flex flex-col md:flex-row items-center gap-4 bg-[var(--bg-main)]/50">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Search by clinician name, institutional email or role..."
              className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-[var(--text-main)] focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all placeholder:text-slate-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl text-slate-500 font-bold text-xs uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            <Filter size={14} />
            <span>Role Filter</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-[var(--border-main)] bg-[var(--bg-main)]/30">
                <th className="px-10 py-5">Clinician Identity</th>
                <th className="px-10 py-5">Communication</th>
                <th className="px-10 py-5 text-center">Protocol Status</th>
                <th className="px-10 py-5 text-right">Governance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-main)] text-sm">
              {staff.map((member) => (
                <tr key={member.id} className="hover:bg-[var(--bg-main)]/50 transition-colors group">
                  <td className="px-10 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-[1rem] bg-[var(--bg-main)] border border-[var(--border-main)] flex items-center justify-center text-slate-500 font-black text-xs shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                           <span className="font-bold text-[var(--text-main)] group-hover:text-emerald-700 transition-colors">{member.name}</span>
                           {member.verified && (
                             <div className="bg-blue-500 rounded-full p-0.5 shadow-sm">
                                <ShieldCheck size={10} className="text-white" strokeWidth={3} />
                             </div>
                           )}
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{member.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                     <div className="flex items-center space-x-2 text-slate-500 font-medium italic">
                        <Mail size={14} className="text-slate-300" />
                        <span>{member.email}</span>
                     </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex justify-center">
                       <span className={`px-4 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest ${member.status === 'Active' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-800'}`}>
                         {member.status}
                       </span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-20 group-hover:opacity-100 transition-opacity">
                       <button className="p-2.5 text-slate-400 hover:text-[var(--text-main)] hover:bg-[var(--card-bg)] rounded-xl border border-transparent hover:border-[var(--border-main)] transition-all">
                          <MoreVertical size={18} />
                       </button>
                       <button className="p-2.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl border border-transparent hover:border-rose-100 dark:hover:border-rose-800 transition-all">
                          <Trash2 size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-8 border-t border-[var(--border-main)] flex items-center justify-between bg-[var(--bg-main)]/30">
           <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">v16.0 Unified Staff Registry</p>
           <div className="flex items-center space-x-4 text-[10px] font-black uppercase tracking-widest text-slate-300">
              <span>Verified Identity Core</span>
              <ShieldCheck size={14} className="text-emerald-500" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default ManageStaff;
