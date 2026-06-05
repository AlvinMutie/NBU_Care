import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { 
  Users, ShieldAlert, BadgeCheck, Search, 
  X, Check, FileCode, ExternalLink, 
  ArrowUpRight, Activity, Zap, ShieldCheck
} from 'lucide-react';

export default function Dashboard({ auth, allUsers = [], initialAuditLogs = [] }) {
  const [adminSubTab, setAdminSubTab] = useState('overview'); // 'overview', 'vetting', 'directory', 'audit'
  const [adminSearchTerm, setAdminSearchTerm] = useState('');
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs || []);

  // Sync subTab from URL if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const subTab = params.get('subTab');
    if (subTab) setAdminSubTab(subTab);
  }, []);

  const stats = [
    { title: 'Total Registered Staff', value: allUsers.length, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
    { title: 'Awaiting Vetting', value: allUsers.filter(u => u.status === 'Pending').length, icon: ShieldAlert, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', highlight: allUsers.filter(u => u.status === 'Pending').length > 0 },
    { title: 'Verified Clinicians', value: allUsers.filter(u => u.status === 'Approved').length, icon: BadgeCheck, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  ];

  return (
    <AdminLayout>
      <Head title="Admin Dashboard" />
      
      <div className="space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
              {adminSubTab === 'overview' && 'System Analytics'}
              {adminSubTab === 'vetting' && 'Credential Vetting'}
              {adminSubTab === 'directory' && 'Staff Management'}
              {adminSubTab === 'audit' && 'Clinical Ledger'}
            </h2>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {adminSubTab === 'overview' && 'Real-time overview of staff distribution and clinical credentials.'}
              {adminSubTab === 'vetting' && 'Perform administrative review of medical staff registration requests.'}
              {adminSubTab === 'directory' && 'Audit clinical roles and modify database access permissions.'}
              {adminSubTab === 'audit' && 'Comprehensive immutable log of every clinical action and system event.'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-500 font-mono shadow-sm">
              Last Updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* SUBTAB: OVERVIEW */}
        {adminSubTab === 'overview' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className={`p-8 rounded-[32px] border bg-white dark:bg-slate-900 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl ${stat.border} dark:border-slate-800`}>
                  <div className="flex flex-col gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} dark:bg-slate-800/50 ${stat.color}`}>
                      <stat.icon className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <span className={`text-4xl font-black tracking-tighter dark:text-white ${stat.highlight ? 'animate-pulse' : ''}`}>
                        {stat.value}
                      </span>
                      <span className="text-[10px] block font-black uppercase tracking-[0.15em] text-slate-450 dark:text-slate-500">
                        {stat.title}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Protocol Banner */}
            <div className="relative p-12 rounded-[48px] bg-indigo-600 border border-indigo-500 shadow-2xl shadow-indigo-200 dark:shadow-none overflow-hidden group">
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-black text-white uppercase tracking-widest">
                      Security Protocol v4.2
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <h3 className="text-4xl font-black text-white tracking-tighter leading-[1.1]">
                    Credential Integrity <br />& Clinical Access Protocols
                  </h3>
                  <p className="text-indigo-100 font-medium leading-relaxed max-w-2xl opacity-90">
                    Access to neonatal medical records is strictly governed by institutional vetting. Every clinical action is tied to a verified ID, ensuring high-fidelity audit trails for all neonatal interventions and medication calculations.
                  </p>
                  <div className="flex items-center gap-4 pt-4">
                    <button 
                      onClick={() => setAdminSubTab('vetting')}
                      className="px-8 py-5 rounded-2xl bg-white text-indigo-600 font-black text-xs uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
                    >
                      Launch Vetting Interface
                    </button>
                    <div className="flex items-center gap-3 ml-4">
                        <div className="flex -space-x-3">
                          {[1,2,3].map(i => (
                            <div key={i} className="w-9 h-9 rounded-full border-2 border-indigo-600 bg-indigo-400 flex items-center justify-center text-[9px] font-black text-white">
                              {String.fromCharCode(64 + i)}
                            </div>
                          ))}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200">
                          3 Admins Online
                        </span>
                    </div>
                  </div>
                </div>
                
                <div className="hidden lg:block relative w-64 h-64">
                   <ShieldCheck className="w-64 h-64 text-white/5 absolute -right-8 -bottom-8 rotate-12" />
                   <Activity className="w-32 h-32 text-white/10 absolute left-0 top-0 animate-pulse" />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-1000" />
              <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-indigo-400/10 rounded-full blur-2xl" />
            </div>

            {/* Quick Actions / Activity Feed Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Recent Audit Logs</h4>
                        <Link href={route('admin.dashboard', { subTab: 'audit' })} className="text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:underline">View Ledger</Link>
                    </div>
                    <div className="space-y-6">
                        {initialAuditLogs.slice(0, 5).map((log, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100/50 dark:border-slate-800 transition-all hover:border-indigo-100">
                                <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                                    <FileCode className="w-4 h-4 text-slate-400" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">{log.action}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{log.user_name || 'System'}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                                        <span className="text-[9px] font-medium text-slate-400">{new Date(log.created_at).toLocaleTimeString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-center items-center text-center space-y-6">
                    <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-500/10 rounded-[28px] flex items-center justify-center border border-emerald-100 dark:border-emerald-500/20">
                        <BadgeCheck className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">System Status: Optimal</h4>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto">All security modules are active and clinical data integrity is validated.</p>
                    </div>
                    <div className="pt-4 grid grid-cols-2 gap-4 w-full max-w-md">
                        <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                            <span className="block text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1">Database</span>
                            <span className="text-xs font-black text-emerald-600 uppercase">Synchronized</span>
                        </div>
                        <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                            <span className="block text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1">Auth Engine</span>
                            <span className="text-xs font-black text-emerald-600 uppercase">Secure</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )}

        {/* SUBTAB: VETTING */}
        {adminSubTab === 'vetting' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
            {allUsers.filter(u => u.status === 'Pending').length === 0 ? (
                <div className="p-32 bg-white dark:bg-slate-900 rounded-[48px] border border-slate-100 dark:border-slate-800 text-center space-y-8 shadow-sm">
                    <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-500/10 rounded-[36px] mx-auto flex items-center justify-center border-2 border-emerald-100 dark:border-emerald-500/20 text-emerald-600 transition-transform hover:rotate-12 duration-500">
                        <Check className="w-12 h-12" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Queue Fully Audited</h3>
                        <p className="text-sm text-slate-500 font-medium">No pending clinician credentials require validation at this time.</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {allUsers.filter(u => u.status === 'Pending').map((user) => (
                        <div key={user.id} className="p-8 rounded-[40px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-2xl hover:border-indigo-100 dark:hover:border-indigo-500/30 group">
                            <div className="flex flex-col h-full justify-between gap-10">
                                <div className="space-y-8">
                                    <div className="flex gap-6">
                                        <div className="w-20 h-20 rounded-[28px] bg-indigo-50 dark:bg-indigo-500/10 border-2 border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center text-2xl font-black text-indigo-600 dark:text-indigo-400 shrink-0 transition-transform group-hover:scale-110">
                                            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                        </div>
                                        <div className="space-y-2 pt-2">
                                            <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{user.name}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-black uppercase tracking-widest text-slate-500">{user.role}</span>
                                                <span className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-[10px] font-black text-indigo-600 dark:text-indigo-400">{user.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-6 p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                                        <div className="space-y-1">
                                            <span className="block text-[9px] font-black uppercase text-slate-400 tracking-widest">Employee ID</span>
                                            <span className="text-sm font-black text-slate-800 dark:text-slate-200 font-mono">{user.id_number || 'UNASSIGNED'}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="block text-[9px] font-black uppercase text-slate-400 tracking-widest">Contact Vector</span>
                                            <span className="text-sm font-black text-slate-800 dark:text-slate-200 font-mono">{user.phone || 'NO RECORD'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button 
                                        onClick={() => router.post(route('admin.users.approve', user.id))}
                                        className="flex-1 py-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-emerald-100 dark:shadow-none transition-all active:scale-95"
                                    >
                                        Grant Authorization
                                    </button>
                                    <button 
                                        onClick={() => router.post(route('admin.users.reject', user.id))}
                                        className="px-8 py-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-600 hover:border-rose-100 transition-all active:scale-95"
                                    >
                                        Refuse
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
          </div>
        )}

        {/* SUBTAB: DIRECTORY */}
        {adminSubTab === 'directory' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="relative w-full md:w-96 group">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Filter staff by name, role or email..." 
                        value={adminSearchTerm}
                        onChange={(e) => setAdminSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-black uppercase tracking-widest outline-none focus:border-indigo-400 focus:shadow-xl focus:shadow-indigo-100/50 dark:focus:shadow-none transition-all"
                    />
                </div>
                
                <button className="px-6 py-4 rounded-2xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all hover:scale-105 active:scale-95">
                    Add Staff Member
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[48px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase tracking-[0.2em] text-slate-450 dark:text-slate-500">
                                <th className="px-10 py-8">Medical Professional</th>
                                <th className="px-10 py-8 text-center">Ward Role</th>
                                <th className="px-10 py-8 text-center">Security Clearance</th>
                                <th className="px-10 py-8 text-right">Administrative Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800/40">
                            {allUsers.filter(u => 
                                u.name.toLowerCase().includes(adminSearchTerm.toLowerCase()) || 
                                u.role.toLowerCase().includes(adminSearchTerm.toLowerCase()) ||
                                u.email.toLowerCase().includes(adminSearchTerm.toLowerCase())
                            ).map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-indigo-500/5 transition-colors group">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center font-black text-slate-400 shrink-0 group-hover:border-indigo-100 group-hover:text-indigo-600 transition-all">
                                                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">{user.name}</span>
                                                    {user.status === 'Approved' && <BadgeCheck className="w-4 h-4 text-indigo-500" />}
                                                </div>
                                                <span className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-widest">{user.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-center">
                                        <span className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex justify-center">
                                            {user.status === 'Approved' ? (
                                                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active Clearance
                                                </div>
                                            ) : user.status === 'Pending' ? (
                                                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px] font-black uppercase tracking-widest">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> Access Locked
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[9px] font-black uppercase tracking-widest">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Revoked
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <select 
                                            defaultValue={user.role}
                                            onChange={(e) => router.post(route('admin.users.update-role', user.id), { role: e.target.value })}
                                            className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-black uppercase tracking-widest outline-none focus:border-indigo-400 appearance-none pr-10 bg-no-repeat bg-[right_1rem_center] cursor-pointer"
                                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236366f1' stroke-width='3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E")` }}
                                        >
                                            <option value="Nursing In-Charge">Nursing In-Charge</option>
                                            <option value="Nurse">Nurse</option>
                                            <option value="Consultant Pediatrician">Consultant Pediatrician</option>
                                            <option value="CO Pediatrics / MO">CO Pediatrics / MO</option>
                                            <option value="Student">Student</option>
                                            <option value="ICT / IT Support">ICT / IT Support</option>
                                            <option value="Hospital Management">Hospital Management</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
        )}

        {/* SUBTAB: AUDIT */}
        {adminSubTab === 'audit' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600">
                        <FileCode className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Active Audit Session</h4>
                        <p className="text-[10px] font-medium text-slate-450 uppercase tracking-widest">Live ledger streaming active</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Filter Ledger</button>
                    <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all active:scale-95">Export CSV</button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[48px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase tracking-[0.2em] text-slate-450 dark:text-slate-500">
                                <th className="px-10 py-8">Timestamp</th>
                                <th className="px-10 py-8">Medical Actor</th>
                                <th className="px-10 py-8">Event Signature</th>
                                <th className="px-10 py-8 text-right">Origin Vector</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800/40">
                            {auditLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-indigo-500/5 transition-colors group">
                                    <td className="px-10 py-8">
                                        <span className="text-[11px] font-black font-mono text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                            {new Date(log.created_at).toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center font-black text-xs text-slate-400">
                                                {log.user_name ? log.user_name[0] : 'S'}
                                            </div>
                                            <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">{log.user_name || 'System'}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-3">
                                            <span className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${
                                                log.action.includes('error') || log.action.includes('failed')
                                                    ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-400'
                                                    : 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400'
                                            }`}>
                                                {log.type}
                                            </span>
                                            <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">{log.action}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <span className="text-[10px] font-black font-mono text-slate-400 tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                                            {log.ip_address || '127.0.0.1'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
