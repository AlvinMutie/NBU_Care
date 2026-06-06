import React, { useState, useEffect } from 'react';
import { 
  User, 
  Lock, 
  ShieldCheck, 
  Save, 
  Building2, 
  CheckCircle2,
  Activity,
  ShieldAlert,
  AlertTriangle,
  Settings as SettingsIcon,
  ToggleLeft,
  ToggleRight,
  Mail,
  Loader2
} from 'lucide-react';
import { api } from '../services/api';

const SettingSection = ({ title, description, children, icon: Icon }) => (
  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-8 text-left">
    <div className="flex flex-col lg:flex-row gap-10 p-8 lg:p-10">
      <div className="lg:w-1/3">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center text-primary shadow-sm">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{title}</h3>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{description}</p>
      </div>
      <div className="lg:w-2/3 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 pt-8 lg:pt-0 lg:pl-10">
        {children}
      </div>
    </div>
  </div>
);

const InputWrapper = ({ label, children }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{label}</label>
    {children}
  </div>
);

export default function Settings({ user, onUpdateUser, onNavigate }) {
  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '', currentPassword: '', newPassword: '' });
  const [sysSettings, setSysSettings] = useState({ wardName: '', hospitalName: '', broadcastMessage: '', globalOverrideActive: false });
  const [loading, setLoading] = useState(false);
  const [sysLoading, setSysLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const isAdmin = user?.role === 'Nursing In-Charge' || user?.role === 'Consultant Pediatrician';

  useEffect(() => {
    if (isAdmin) {
      const fetchSys = async () => {
        const res = await api.getSettings();
        if (res.success) setSysSettings(res.data);
        setSysLoading(false);
      };
      fetchSys();
    }
  }, [isAdmin]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    
    try {
      const res = await api.updateProfile({
        name: profile.name,
        currentPassword: profile.currentPassword,
        newPassword: profile.newPassword
      });

      if (res.success) {
        setSuccess('Your profile has been updated!');
        if (onUpdateUser) onUpdateUser(res.user);
        setProfile({ ...profile, currentPassword: '', newPassword: '' });
      } else {
        setError(res.message || 'Update failed');
      }
    } catch (err) {
      setError('A connection error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSysSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const res = await api.updateSettings(sysSettings);
      if (res.success) {
        setSuccess('Ward settings saved successfully!');
      } else {
        setError(res.message || 'System update failed');
      }
    } catch (err) {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full p-4 lg:p-10 pb-32 text-left">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 border-b border-slate-200 dark:border-slate-800 pb-10 px-2">
        <div className="text-left">
          <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-3 ml-1">Identity & Prefs</h2>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">Settings</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Manage your unit profile and clinical environment.</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          {success && (
            <div className="px-6 py-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3 animate-in slide-in-from-top-4 duration-500">
              <CheckCircle2 className="w-4 h-4" /> {success}
            </div>
          )}
          {error && (
            <div className="px-6 py-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 text-rose-700 dark:text-rose-400 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3 animate-in slide-in-from-top-4 duration-500">
              <AlertTriangle className="w-4 h-4" /> {error}
            </div>
          )}
        </div>
      </div>

      {/* Profile Section */}
      <SettingSection 
        title="Your Profile" 
        description="Update your name and account credentials for clinical identification."
        icon={User}
      >
        <form onSubmit={handleProfileSubmit} className="space-y-8">
          <div className="grid sm:grid-cols-2 gap-8">
            <InputWrapper label="Your Full Name">
              <div className="relative group">
                 <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                 <input 
                   type="text" 
                   value={profile.name} 
                   onChange={e => setProfile({...profile, name: e.target.value})}
                   className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all shadow-sm" 
                 />
              </div>
            </InputWrapper>
            <InputWrapper label="Hospital Email (Fixed)">
              <div className="relative group opacity-60">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                   type="email" 
                   value={profile.email} 
                   disabled
                   className="w-full pl-11 pr-4 py-4 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold text-slate-500 cursor-not-allowed outline-none shadow-sm" 
                 />
              </div>
            </InputWrapper>
          </div>

          <div className="pt-8 border-t border-slate-50 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-6 text-left">
              <Lock className="w-4 h-4 text-slate-400" />
              <h4 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Credential Management</h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              <InputWrapper label="Current Password">
                <input 
                  type="password" 
                  value={profile.currentPassword}
                  onChange={e => setProfile({...profile, currentPassword: e.target.value})}
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all shadow-sm" 
                />
              </InputWrapper>
              <InputWrapper label="New Secure Password">
                <input 
                  type="password" 
                  value={profile.newPassword}
                  onChange={e => setProfile({...profile, newPassword: e.target.value})}
                  placeholder="••••••••"
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all shadow-sm" 
                />
              </InputWrapper>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-3 px-10 py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Profile
          </button>
        </form>
      </SettingSection>

      {/* Admin Section: Ward Settings */}
      {isAdmin && (
        <div className="mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 px-2">
            <div className="text-left">
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <ShieldCheck className="w-6 h-6" />
                 </div>
                 <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Ward Administration</h1>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium ml-1">Manage global unit parameters and safety protocols.</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800 text-amber-700 dark:text-amber-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] self-start md:self-center shadow-inner">
              High Authority Access
            </div>
          </div>

          {sysLoading ? (
            <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-sm">
              <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Accessing Unit Config...</p>
            </div>
          ) : (
            <div className="space-y-10">
              <SettingSection 
                title="Unit Information" 
                description="Global labels and unit notices visible to all authenticated clinical staff."
                icon={Building2}
              >
                <form onSubmit={handleSysSubmit} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <InputWrapper label="Full Hospital Name">
                      <input 
                        type="text" 
                        value={sysSettings.hospitalName} 
                        onChange={e => setSysSettings({...sysSettings, hospitalName: e.target.value})}
                        className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all shadow-sm" 
                      />
                    </InputWrapper>
                    <InputWrapper label="Unit / Ward Designation">
                      <input 
                        type="text" 
                        value={sysSettings.wardName} 
                        onChange={e => setSysSettings({...sysSettings, wardName: e.target.value})}
                        className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all shadow-sm" 
                      />
                    </InputWrapper>
                  </div>
                  <InputWrapper label="Broadcast Message (Pinned to Dashboard)">
                    <textarea 
                      rows="3"
                      value={sysSettings.broadcastMessage} 
                      onChange={e => setSysSettings({...sysSettings, broadcastMessage: e.target.value})}
                      className="w-full px-6 py-5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl text-sm font-bold text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all resize-none shadow-sm" 
                      placeholder="e.g. Mandatory audit completion required by end of shift."
                    />
                  </InputWrapper>
                  <button className="flex items-center justify-center gap-3 px-10 py-4 bg-slate-900 dark:bg-primary hover:bg-black dark:hover:bg-primary-dark text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl active:scale-95">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Commit Unit Settings
                  </button>
                </form>
              </SettingSection>

              <SettingSection 
                title="Safety Override" 
                description="Activate high-fidelity validation layers. This forces second-clinician witnessing for all high-risk drug dosing."
                icon={ShieldAlert}
              >
                 <div className="flex items-center justify-between p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-inner">
                    <div className="flex items-center gap-6">
                       <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center transition-all duration-500 shadow-lg ${sysSettings.globalOverrideActive ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 shadow-amber-200/50 dark:shadow-none animate-pulse' : 'bg-white dark:bg-slate-900 text-slate-300 dark:text-slate-700 border border-slate-100 dark:border-slate-800 shadow-sm'}`}>
                          <AlertTriangle className="w-8 h-8" />
                       </div>
                       <div className="text-left">
                          <p className="text-lg font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1.5">v16.0 Override Mode</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
                             Status: {sysSettings.globalOverrideActive ? 'Active & Forced' : 'Standard Logic'}
                          </p>
                       </div>
                    </div>
                    <button 
                      onClick={() => setSysSettings({...sysSettings, globalOverrideActive: !sysSettings.globalOverrideActive})}
                      className="transition-all active:scale-95"
                    >
                       {sysSettings.globalOverrideActive ? (
                         <ToggleRight className="w-16 h-16 text-primary cursor-pointer" />
                       ) : (
                         <ToggleLeft className="w-16 h-16 text-slate-300 dark:text-slate-700 cursor-pointer" />
                       )}
                    </button>
                 </div>
                 <p className="mt-6 text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em] text-center">Note: Toggling affects all active clinical sessions unit-wide.</p>
              </SettingSection>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
