import React, { useState } from 'react';
import { 
  User, Bell, Shield, Lock, Save, Camera, 
  ShieldCheck, CheckCircle2,
  AlertCircle, ChevronRight, Globe, Zap
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeSection, setActiveTab] = useState('Profile');

  const menuItems = [
    { name: 'Profile', icon: User },
    { name: 'Notifications', icon: Bell },
    { name: 'Security', icon: Shield },
    { name: 'Permissions', icon: Lock },
    { name: 'Localization', icon: Globe },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700 pb-28 text-[var(--text-main)]">
      {/* Structural Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-main)]">System Configurations</h2>
          <p className="text-slate-500 font-medium">Orchestrate your clinical profile and institutional preferences.</p>
        </div>
        <div className="flex items-center space-x-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 p-2 px-4 rounded-xl">
           <ShieldCheck className="text-emerald-600" size={18} />
           <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest leading-none">Security Cleared: v16.0</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Modern Sidebar Navigation (Mobbin Style) */}
        <div className="lg:col-span-3 space-y-2">
           {menuItems.map(item => (
             <button 
                key={item.name} 
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all group ${activeSection === item.name ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-xl shadow-slate-200 dark:shadow-none' : 'text-slate-400 hover:bg-[var(--card-bg)] hover:text-[var(--text-main)] hover:shadow-sm'}`}
             >
               <div className="flex items-center space-x-4">
                  <item.icon size={18} className={`${activeSection === item.name ? 'text-emerald-400' : 'text-slate-300 group-hover:text-slate-500'}`} />
                  <span className="font-bold text-sm tracking-tight">{item.name}</span>
               </div>
               <ChevronRight size={14} className={`${activeSection === item.name ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'} transition-all`} />
             </button>
           ))}
           
           <div className="pt-10 space-y-6">
              <div className="p-6 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-[2rem] space-y-4">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Integrity</p>
                 <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>Calculations v16.42</span>
                 </div>
                 <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>Academy v16.0.2</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Dynamic Settings Content */}
        <div className="lg:col-span-9 space-y-8">
          <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2.5rem] p-8 sm:p-12 shadow-sm space-y-12">
            <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-8">
               <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">{activeSection} Management</h3>
                  <p className="text-sm text-slate-500 font-medium">Customize your {activeSection.toLowerCase()} settings and validation status.</p>
               </div>
               <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-emerald-100 dark:shadow-none transition-all flex items-center space-x-2 active:scale-95">
                  <Save size={18} />
                  <span>Update Changes</span>
               </button>
            </div>

            {activeSection === 'Profile' && (
              <div className="space-y-10 animate-in fade-in duration-500">
                 {/* Profile Image Section */}
                 <div className="flex flex-col sm:flex-row sm:items-center gap-8">
                    <div className="relative group cursor-pointer">
                       <div className="w-24 h-24 rounded-[2rem] bg-[var(--bg-main)] border border-[var(--border-main)] overflow-hidden shadow-inner flex items-center justify-center">
                          <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-slate-900 dark:text-white">
                             <Camera size={24} strokeWidth={2.5} />
                          </div>
                       </div>
                    </div>
                    <div>
                       <h4 className="text-xl font-bold text-[var(--text-main)]">Patrick Kamau</h4>
                       <p className="text-sm text-slate-500 font-medium mb-3">Institutional Clinician Account</p>
                       <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[9px] font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800">Staff Nurse</span>
                          <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-800 flex items-center space-x-1"><ShieldCheck size={10} strokeWidth={3} /> <span>Verified</span></span>
                       </div>
                    </div>
                 </div>

                 {/* Information Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Full Legal Name</label>
                       <input type="text" defaultValue="Patrick Kamau" className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl py-4 px-5 text-sm font-bold text-[var(--text-main)] focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Institutional Email</label>
                       <input type="email" defaultValue="patrick@hospital.go.ke" className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl py-4 px-5 text-sm font-bold text-[var(--text-main)] focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Clinical Department</label>
                       <input type="text" defaultValue="Neonatal Building Unit" disabled className="w-full bg-slate-100 dark:bg-slate-800 border border-[var(--border-main)] rounded-2xl py-4 px-5 text-sm font-bold text-slate-400 cursor-not-allowed" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Direct Contact</label>
                       <input type="text" defaultValue="+254 712 345 678" className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl py-4 px-5 text-sm font-bold text-[var(--text-main)] focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all" />
                    </div>
                 </div>
              </div>
            )}

            {activeSection !== 'Profile' && (
              <div className="py-24 text-center space-y-4 animate-in fade-in duration-500">
                 <div className="w-16 h-16 bg-[var(--bg-main)] rounded-2xl mx-auto flex items-center justify-center text-slate-200 dark:text-slate-700 border border-[var(--border-main)]">
                    <Zap size={32} />
                 </div>
                 <div className="space-y-1">
                    <h4 className="text-xl font-bold text-[var(--text-main)]">Optimization Interface</h4>
                    <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">This system module is being performance-tuned for the NeoDesk Institutional v16.0 Core.</p>
                 </div>
              </div>
            )}
          </div>

          <div className="p-8 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-800 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm shadow-rose-100/50 dark:shadow-none transition-all hover:bg-rose-100/30 dark:hover:bg-rose-900/20 group">
             <div className="flex items-center space-x-5">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-500 shadow-sm group-hover:scale-110 transition-transform">
                   <AlertCircle size={24} />
                </div>
                <div>
                   <p className="text-base font-bold text-rose-900 dark:text-rose-300 tracking-tight">Zone of Critical Control</p>
                   <p className="text-xs text-rose-700 dark:text-rose-400 font-medium">Permanent deletion of account or data records.</p>
                </div>
             </div>
             <button className="px-8 py-3 bg-rose-600 text-white rounded-xl font-bold text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-rose-200 dark:shadow-none hover:bg-rose-700 transition-all active:scale-95">
                Request Termination
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
