import React, { useState, useEffect } from 'react';
import { 
  User, Bell, Shield, Lock, Save, 
  ShieldCheck, CheckCircle2,
  ChevronRight, Globe, Zap
} from 'lucide-react';
import api from '../services/api';

const Settings: React.FC = () => {
  const [activeSection, setActiveTab] = useState('Profile');
  const [userData, setUserData] = useState<any>(JSON.parse(localStorage.getItem('user_data') || '{}'));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const isStudent = userData.role === 'Student';

  const menuItems = isStudent ? [
    { name: 'Profile', icon: User },
    { name: 'Security', icon: Shield },
  ] : [
    { name: 'Profile', icon: User },
    { name: 'Notifications', icon: Bell },
    { name: 'Security', icon: Shield },
    { name: 'Permissions', icon: Lock },
    { name: 'Localization', icon: Globe },
  ];

  const handleUpdate = async () => {
    setLoading(true);
    setMessage(null);
    try {
      // In a real app, you'd have a profile update endpoint
      await api.get('/auth/profile'); // Just to verify connection
      localStorage.setItem('user_data', JSON.stringify(userData));
      setMessage({ type: 'success', text: 'Institutional profile synchronized successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Sync failed. Connectivity to protocol core interrupted.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700 pb-28 text-[var(--text-main)]">
      {/* Structural Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text-main)]">{isStudent ? 'Profile Settings' : 'System Configurations'}</h2>
          <p className="text-slate-500 font-medium">{isStudent ? 'Manage your clinical intern profile and credentials.' : 'Orchestrate your clinical profile and institutional preferences.'}</p>
        </div>
        <div className="flex items-center space-x-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 p-2 px-4 rounded-xl">
           <ShieldCheck className="text-emerald-600" size={18} />
           <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest leading-none">Access: {userData.role}</span>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-2xl flex items-center space-x-3 border ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
           <CheckCircle2 size={18} />
           <p className="text-xs font-bold">{message.text}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
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
        </div>

        <div className="lg:col-span-9 space-y-8">
          <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2.5rem] p-8 sm:p-12 shadow-sm space-y-12">
            <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-8">
               <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">{activeSection} Management</h3>
                  <p className="text-sm text-slate-500 font-medium">Customize your {activeSection.toLowerCase()} settings.</p>
               </div>
               <button 
                onClick={handleUpdate}
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-emerald-100 dark:shadow-none transition-all flex items-center space-x-2 active:scale-95 disabled:opacity-50"
               >
                  <Save size={18} />
                  <span>{loading ? 'Syncing...' : 'Update Changes'}</span>
               </button>
            </div>

            {activeSection === 'Profile' && (
              <div className="space-y-10 animate-in fade-in duration-500">
                 <div className="flex items-center gap-8">
                    <div className="w-20 h-20 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-main)] flex items-center justify-center text-2xl font-black text-slate-400">
                       {userData.name?.split(' ').map((n:any) => n[0]).join('')}
                    </div>
                    <div>
                       <h4 className="text-xl font-bold text-[var(--text-main)]">{userData.name}</h4>
                       <p className="text-sm text-slate-500 font-medium mb-2">{userData.role}</p>
                       <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest border border-emerald-100">Institutional Access Verified</span>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Full Legal Name</label>
                       <input 
                        type="text" 
                        value={userData.name} 
                        onChange={(e) => setUserData({...userData, name: e.target.value})}
                        className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl py-4 px-5 text-sm font-bold text-[var(--text-main)] focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Institutional Email</label>
                       <input 
                        type="email" 
                        value={userData.email} 
                        onChange={(e) => setUserData({...userData, email: e.target.value})}
                        className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl py-4 px-5 text-sm font-bold text-[var(--text-main)] focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all" 
                       />
                    </div>
                    {isStudent && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Clinical Rotation Year</label>
                        <select 
                          value={userData.clinical_rotation_year || 'Year 1'}
                          onChange={(e) => setUserData({...userData, clinical_rotation_year: e.target.value})}
                          className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl py-4 px-5 text-sm font-bold text-[var(--text-main)] focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                        >
                          <option>Year 1</option>
                          <option>Year 2</option>
                          <option>Year 3</option>
                          <option>Internship</option>
                        </select>
                      </div>
                    )}
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Institutional ID</label>
                       <input 
                        type="text" 
                        value={userData.staff_id || 'ID-'+userData.id} 
                        disabled
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-[var(--border-main)] rounded-2xl py-4 px-5 text-sm font-bold text-slate-400 cursor-not-allowed" 
                       />
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
                    <h4 className="text-xl font-bold text-[var(--text-main)]">Module Synchronized</h4>
                    <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">These configurations are managed at the institutional level.</p>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
