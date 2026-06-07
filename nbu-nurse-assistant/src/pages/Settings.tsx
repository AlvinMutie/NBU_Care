import React from 'react';
import { User, Bell, Shield, Lock } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-bold text-slate-100">System Settings</h2>
        <p className="text-slate-400">Manage your clinical profile and unit preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-2">
           {[
             { name: 'Profile', icon: User, active: true },
             { name: 'Notifications', icon: Bell, active: false },
             { name: 'Security', icon: Shield, active: false },
             { name: 'Permissions', icon: Lock, active: false },
           ].map(item => (
             <button key={item.name} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${item.active ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:bg-white/5'}`}>
               <item.icon size={18} />
               <span className="font-bold text-sm tracking-wide">{item.name}</span>
             </button>
           ))}
        </div>

        <div className="md:col-span-3 space-y-6">
          <div className="glass-card p-6 space-y-6">
            <h3 className="text-xl font-bold text-slate-100 border-b border-white/5 pb-4">Clinical Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Full Name</label>
                <input type="text" defaultValue="Patrick Kamau" className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-slate-100 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Clinical Role</label>
                <input type="text" defaultValue="Staff Nurse" disabled className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-slate-400 cursor-not-allowed" />
              </div>
            </div>
            <button className="glass-button px-8 shadow-lg shadow-emerald-500/20">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
