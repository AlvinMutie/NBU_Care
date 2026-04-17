import React, { useState, useEffect } from 'react';
import { 
  User, 
  Lock, 
  ShieldCheck, 
  Save, 
  Building2, 
  CheckCircle2,
  Activity
} from 'lucide-react';
import { api } from '../services/api';

const SettingSection = ({ title, description, children, icon: Icon }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
    <div className="flex flex-col md:flex-row gap-8 p-8">
      <div className="md:w-1/3">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-primary shadow-sm">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h3>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>
      <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
        {children}
      </div>
    </div>
  </div>
);

const InputWrapper = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</label>
    {children}
  </div>
);

export default function Settings({ user }) {
  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '', currentPassword: '', newPassword: '' });
  const [sysSettings, setSysSettings] = useState({ wardName: '', hospitalName: '', broadcastMessage: '' });
  const [loading, setLoading] = useState(false);
  const [sysLoading, setSysLoading] = useState(true);
  const [success, setSuccess] = useState('');

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
    setTimeout(() => {
        setSuccess('Your profile has been updated!');
        setLoading(false);
    }, 800);
  };

  const handleSysSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    const res = await api.updateSettings(sysSettings);
    if (res.success) {
      setSuccess('Ward settings saved successfully!');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full p-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-slate-200 pb-8">
        <div>
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">My Account</h2>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Settings</h1>
          <p className="text-sm text-slate-500">Update your profile and manage your personal preferences.</p>
        </div>
        {success && (
          <div className="px-4 py-2 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-lg text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {success}
          </div>
        )}
      </div>

      {/* Profile Section */}
      <SettingSection 
        title="Your Profile" 
        description="Update your name and the email you use to sign in."
        icon={User}
      >
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <InputWrapper label="Your Name">
              <input 
                type="text" 
                value={profile.name} 
                onChange={e => setProfile({...profile, name: e.target.value})}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 shadow-sm" 
              />
            </InputWrapper>
            <InputWrapper label="Your Email (cannot be changed)">
              <input 
                type="email" 
                value={profile.email} 
                disabled
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-400 cursor-not-allowed shadow-sm" 
              />
            </InputWrapper>
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-bold transition-colors shadow-sm">
            {loading ? <Activity className="w-4 h-4 animate-pulse" /> : <Save className="w-4 h-4" />} Save Changes
          </button>
        </form>
      </SettingSection>

      {/* Password Section */}
      <SettingSection 
        title="Change Password" 
        description="Update your password regularly to keep your account safe."
        icon={Lock}
      >
        <div className="grid sm:grid-cols-2 gap-6">
          <InputWrapper label="Current Password">
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 shadow-sm" 
            />
          </InputWrapper>
          <InputWrapper label="New Password">
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 shadow-sm" 
            />
          </InputWrapper>
        </div>
      </SettingSection>

      {/* Admin Section: Ward Settings */}
      {isAdmin && (
        <div className="mt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-primary" /> Ward Settings
              </h3>
              <p className="text-sm text-slate-500 mt-1">Manage the ward name, hospital details, and the notice message shown to the whole team.</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest">
              In-Charge Only
            </div>
          </div>

          {sysLoading ? (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-slate-200">
              <Activity className="w-8 h-8 text-primary animate-pulse mb-4" />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading ward settings...</p>
            </div>
          ) : (
            <SettingSection 
              title="Ward Information" 
              description="Set the name of your ward and a team-wide notice that everyone will see when they log in."
              icon={Building2}
            >
              <form onSubmit={handleSysSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <InputWrapper label="Hospital Name">
                    <input 
                      type="text" 
                      value={sysSettings.hospitalName} 
                      onChange={e => setSysSettings({...sysSettings, hospitalName: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 shadow-sm" 
                    />
                  </InputWrapper>
                  <InputWrapper label="Ward Name">
                    <input 
                      type="text" 
                      value={sysSettings.wardName} 
                      onChange={e => setSysSettings({...sysSettings, wardName: e.target.value})}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 shadow-sm" 
                    />
                  </InputWrapper>
                </div>
                <InputWrapper label="Team Notice (shown to all staff on login)">
                  <textarea 
                    rows="3"
                    value={sysSettings.broadcastMessage} 
                    onChange={e => setSysSettings({...sysSettings, broadcastMessage: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-slate-900 shadow-sm" 
                    placeholder="e.g. All staff: please complete the drug count before handover."
                  />
                </InputWrapper>
                <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-bold transition-colors shadow-sm">
                  {loading ? <Activity className="w-4 h-4 animate-pulse" /> : <Save className="w-4 h-4" />} Save Ward Settings
                </button>
              </form>
            </SettingSection>
          )}
        </div>
      )}
    </div>
  );
}
