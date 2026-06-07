import React, { useState } from 'react';
import { Search, UserPlus, MoreVertical, ShieldCheck, Mail, Trash2 } from 'lucide-react';

const ManageStaff: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const staff = [
    { id: 1, name: 'Patrick Kamau', role: 'Staff Nurse', email: 'patrick@hospital.go.ke', status: 'Active', verified: true },
    { id: 2, name: 'Angela Omwansa', role: 'Consultant', email: 'angela@hospital.go.ke', status: 'Active', verified: true },
    { id: 3, name: 'Cynthia Wekesa', role: 'Medical Officer', email: 'cynthia@hospital.go.ke', status: 'Inactive', verified: false },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Team Management</h2>
          <p className="text-slate-400">Manage clinical staff access, roles, and verification status.</p>
        </div>
        <button className="glass-button flex items-center space-x-2 w-full lg:w-auto justify-center py-3 px-6">
          <UserPlus size={20} />
          <span className="font-bold">Add Staff Member</span>
        </button>
      </div>

      <div className="relative group max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Search by name, role or email..."
          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                <th className="px-6 py-4">Clinician</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {staff.map((member) => (
                <tr key={member.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                           <span className="font-bold text-slate-100">{member.name}</span>
                           {member.verified && <ShieldCheck size={14} className="text-blue-400" />}
                        </div>
                        <p className="text-xs text-slate-500">{member.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                       <div className="flex items-center space-x-2 text-xs text-slate-400">
                          <Mail size={12} className="text-slate-600" />
                          <span>{member.email}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                       <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-tighter ${member.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                         {member.status}
                       </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                       <button className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                          <MoreVertical size={18} />
                       </button>
                       <button className="p-2 text-red-500/50 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-all">
                          <Trash2 size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageStaff;
