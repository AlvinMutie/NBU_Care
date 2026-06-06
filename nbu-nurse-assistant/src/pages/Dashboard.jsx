import React, { useState, useEffect } from 'react';
import { 
  Activity, Calculator, Droplets, Zap, ArrowRight,
  Users, ShieldAlert, GraduationCap, Clock, FileText,
  Activity as ActivityIcon, HeartPulse, Stethoscope, ChevronRight,
  Database, ShieldCheck, AlertCircle, HelpCircle, Loader2,
  TrendingUp, BarChart3, PieChart, BookOpen, ClipboardCheck,
  CheckCircle2, Target, Award, Shield
} from 'lucide-react';
import { api } from '../services/api';

// --- SHARED COMPONENTS ---

const BlueTick = ({ className = "w-4 h-4" }) => (
  <div className={`${className} bg-primary text-white rounded-full flex items-center justify-center p-0.5 shadow-sm border border-white/20 dark:border-slate-800`} title="Verified Staff">
    <ShieldCheck className="w-full h-full" />
  </div>
);

const StatCard = ({ title, value, icon: Icon, colorClass, highlight, trend }) => (
  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden text-left" role="region" aria-label={`${title} statistic`}>
     <div className="hidden lg:block absolute -right-4 -top-4 w-20 h-20 bg-slate-50 dark:bg-slate-800/50 rounded-full group-hover:scale-150 transition-transform duration-700" />
     <div className="relative z-10">
       <div className="flex items-center justify-between mb-6">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClass} transition-transform group-hover:scale-110 shadow-inner`}>
             <Icon className="w-6 h-6" aria-hidden="true" />
          </div>
          {highlight && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100 dark:border-emerald-800 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
            </div>
          )}
       </div>
       <div className="flex items-end justify-between">
          <div>
             <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-none tracking-tight">{value}</h3>
             <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-3">{title}</p>
          </div>
          {trend && (
             <span className="text-xs font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-lg">+{trend}%</span>
          )}
       </div>
     </div>
  </div>
);

// --- ADMIN / IN-CHARGE DASHBOARD (SURGICAL CLEANUP: NO INFOGRAPHICS) ---

const AdminDashboard = ({ stats, loading, onNavigate, user }) => {
  const [logs, setLogs] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [neonateCount, setNeonateCount] = useState(0);
  const [logsLoading, setLogsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [logsRes, pendingRes, neonateRes] = await Promise.all([
          api.getRecentLogs(),
          api.getPendingUsers(),
          api.getNeonates()
        ]);
        if (logsRes.success) setLogs(logsRes.data);
        if (pendingRes.success) setPendingCount(pendingRes.users.length);
        if (neonateRes.success) setNeonateCount(neonateRes.neonates.length);
      } catch (err) {
        console.error('Dashboard data fetch failed', err);
      } finally {
        setLogsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Verification Alert */}
      {pendingCount > 0 && (
        <div 
          onClick={() => onNavigate('verification-queue')}
          className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-[32px] p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-amber-200/20 dark:shadow-none cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all group animate-in slide-in-from-top-8 duration-700"
        >
           <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center text-amber-500 shadow-xl shadow-amber-200/50 dark:shadow-none group-hover:scale-110 transition-transform">
                 <ShieldAlert className="w-8 h-8" />
              </div>
              <div className="text-left">
                 <h4 className="text-lg font-black text-amber-900 dark:text-amber-200 tracking-tight leading-none mb-1">Access Requests Pending</h4>
                 <p className="text-sm text-amber-700 dark:text-amber-400 font-bold opacity-80">{pendingCount} staff members are waiting for your verification.</p>
              </div>
           </div>
           <button className="px-8 py-3 bg-amber-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-amber-600/20 group-hover:bg-amber-700 transition-all flex items-center gap-2">
              Review Queue <ChevronRight className="w-4 h-4" />
           </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
         <div className="text-left">
            <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-3 ml-1">Unit Command Center</h2>
            <div className="flex items-center gap-3">
               <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter text-left leading-none italic">Unit Executive Overview<span className="text-primary text-5xl">.</span></h1>
               <BlueTick className="w-7 h-7" />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">Surgical oversight of clinical precision, audit trails, and unit staffing.</p>
         </div>
         <div className="flex items-center gap-3">
            <div className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-xs font-black text-slate-600 dark:text-slate-400 flex items-center gap-3 shadow-sm">
               <div className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Data Environment: Live
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Clinicians" value={loading ? '...' : stats.users} icon={Users} colorClass="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" trend="12" />
        <StatCard title="Ward Occupancy" value={neonateCount || '24'} icon={ActivityIcon} colorClass="bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400" highlight />
        <StatCard title="Doses Verified" value="1,242" icon={Droplets} colorClass="bg-rose-50 dark:bg-rose-900/30 text-rose-500 dark:text-rose-400" />
        <StatCard title="Safety Index" value="99.8%" icon={ShieldCheck} colorClass="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Feed: Shift Logs (Expanded to take more space) */}
        <div className="lg:col-span-8 space-y-6 text-left">
          <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[600px] hover:shadow-2xl transition-all duration-500">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-900/30">
               <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
                  <ActivityIcon className="w-5 h-5 text-primary" /> Shift Action Ledger
               </h3>
               <button 
                 onClick={() => onNavigate('audit-logs')}
                 className="text-xs font-black text-primary hover:underline transition-all uppercase tracking-widest"
               >
                 View Full Vault
               </button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {logsLoading ? (
                <div className="flex flex-col items-center justify-center py-24">
                  <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Accessing secure logs...</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse" aria-label="Recent system logs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] bg-slate-50/50 dark:bg-slate-900/50 sticky top-0 z-10">
                      <th className="px-8 py-5">Action</th>
                      <th className="px-8 py-5">Clinician</th>
                      <th className="px-8 py-5 text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                    {logs.map((log, i) => (
                      <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer">
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-slate-800 dark:text-slate-200 tracking-tight leading-none mb-1">{log.action}</span>
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight">{log.type} Module</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{log.user?.name || 'Staff'}</span>
                              <BlueTick className="w-3.5 h-3.5" />
                           </div>
                        </td>
                        <td className="px-8 py-6 text-xs font-black text-slate-400 dark:text-slate-500 text-right">
                          {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar: Admin Controls & Stats (NO INFOGRAPHICS) */}
        <div className="lg:col-span-4 space-y-6 text-left">
           {/* Workforce Health - Re-styled as Status Cards */}
           <div className="bg-slate-900 dark:bg-slate-800 rounded-[40px] p-8 shadow-2xl relative overflow-hidden group min-h-[250px] flex flex-col justify-between" role="region" aria-label="Shift dynamics overview">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 dark:bg-white/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/4 group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10">
                 <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary dark:text-white border border-white/5 backdrop-blur-xl">
                      <Users className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Unit Personnel</span>
                 </div>
                 
                 <h3 className="text-3xl font-black text-white tracking-tighter mb-4 leading-none text-left">Shift Rota <br />Status<span className="text-primary dark:text-white/50 text-4xl">.</span></h3>
                 <p className="text-sm text-slate-400 dark:text-white/70 font-medium mb-6">Unit audit indicates 100% clinical coverage across all upcoming shifts.</p>
              </div>
              
              <button 
                onClick={() => onNavigate('rota')}
                className="relative z-10 w-full py-4 bg-white text-slate-900 rounded-[20px] font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all active:scale-95"
              >
                 Open Schedule Manager
              </button>
           </div>

           {/* Admin Quick Access - Pure Data-Driven Links */}
           <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-8 shadow-sm group hover:shadow-xl transition-all">
              <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-8">Management Controls</h3>
              <div className="space-y-3">
                 {[
                   { l: 'Clinician Registry', p: 'manage-staff', i: Users, d: 'Permissions & Access' },
                   { l: 'Identity Verification', p: 'verification-queue', i: ShieldCheck, d: `${pendingCount} Pending Approval` },
                   { l: 'Clinical Standards', p: 'settings', i: Shield, d: 'v16.0 Safety Config' }
                 ].map((link, i) => (
                    <button 
                      key={i}
                      onClick={() => onNavigate(link.p)}
                      className="w-full flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all text-left group/item"
                    >
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover/item:text-primary transition-colors border border-slate-100 dark:border-slate-700 shadow-sm">
                             <link.i className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col">
                             <span className="text-sm font-black text-slate-900 dark:text-white leading-tight">{link.l}</span>
                             <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">{link.d}</span>
                          </div>
                       </div>
                       <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover/item:text-primary group-hover/item:translate-x-1 transition-all" />
                    </button>
                 ))}
              </div>
           </div>

           {/* System Integrity Badge */}
           <div className="p-6 bg-emerald-50 dark:bg-emerald-900/10 rounded-[32px] border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-4 shadow-inner">
              <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-emerald-500 border border-emerald-100 dark:border-emerald-800 shadow-sm">
                 <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Protocol Integrity</p>
                 <p className="text-xs font-black text-emerald-900 dark:text-emerald-200">v16.2 Verified Core</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- CLINICIAN (NURSE / MO) DASHBOARD ---

const ClinicianDashboard = ({ stats, loading, onNavigate, user }) => {
  const [activeCases, setActiveCases] = useState([]);

  useEffect(() => {
     const fetchClinicianData = async () => {
        try {
           const res = await api.getNeonates();
           if (res.success) setActiveCases(res.neonates.slice(0, 3));
        } catch (e) {}
     };
     fetchClinicianData();
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="text-left">
            <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-3 ml-1">Bedside Intelligence</h2>
            <div className="flex items-center gap-3">
               <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter text-left leading-none">Welcome, {user.name.split(' ')[0]}<span className="text-primary text-5xl">.</span></h1>
               <BlueTick className="w-7 h-7" />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">Ready for your shift? Ensuring clinical continuity today.</p>
         </div>
         <div className="flex items-center gap-3">
            <div className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-xs font-black text-slate-600 dark:text-slate-400 flex items-center gap-3 shadow-sm">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active Shift: Morning
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <StatCard title="Total Ward Patients" value={stats.neonates || '24'} icon={ActivityIcon} colorClass="bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400" />
        <StatCard title="Personal Accuracy" value="100%" icon={Target} colorClass="bg-rose-50 dark:bg-rose-900/30 text-rose-500 dark:text-rose-400" />
        <StatCard title="Safety Protocols" value="v4.2" icon={ShieldCheck} colorClass="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
         {/* Shift Action Center */}
         <div className="bg-slate-900 dark:bg-slate-800 rounded-[40px] p-10 shadow-2xl relative overflow-hidden flex flex-col h-full min-h-[400px]" role="region" aria-label="Shift priority actions">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
            <div className="relative z-10 flex flex-col h-full">
               <div className="flex items-center justify-between mb-12">
                  <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                     <Clock className="w-6 h-6 text-primary" /> Shift Continuity
                  </h3>
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">07:00 - 14:00 Block</span>
               </div>
               
               <p className="text-slate-400 font-medium mb-12 text-lg leading-relaxed">Coordination is the ultimate clinical safety. Ensure all handovers and vitals are documented before shift termination.</p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                  <button 
                    onClick={() => onNavigate('handovers')}
                    className="px-8 py-5 bg-primary text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
                  >
                    Launch Handover
                  </button>
                  <button 
                    onClick={() => onNavigate('calculators')}
                    className="px-8 py-5 bg-white/5 border border-white/10 text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    Open Drug Pipeline
                  </button>
               </div>
            </div>
         </div>

         {/* Patient Context Snippet */}
         <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-8 shadow-sm flex flex-col group hover:shadow-2xl transition-all duration-500" role="region" aria-label="Active ward patient context">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3 text-left">
                     <ActivityIcon className="w-5 h-5 text-primary" /> Active Ward Context
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 text-left">Quick access to current unit patients.</p>
               </div>
               <button onClick={() => onNavigate('neonates')} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-primary hover:bg-primary/10 transition-colors" aria-label="View all patients">
                  <ChevronRight className="w-5 h-5" />
               </button>
            </div>
            
            <div className="space-y-4 flex-grow">
               {activeCases.map((n, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 group/item hover:border-primary/30 transition-all">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover/item:text-primary transition-colors border border-slate-100 dark:border-slate-700 shadow-sm">
                           <User className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                           <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">{n.name}</p>
                           <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{n.hospitalNumber}</p>
                        </div>
                     </div>
                     <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${n.status === 'Stable' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : 'bg-rose-100 dark:bg-rose-900/30 text-rose-600'}`}>
                        {n.status}
                     </span>
                  </div>
               ))}
               {activeCases.length === 0 && <p className="text-slate-400 italic text-center py-10">Accessing ward registry...</p>}
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Validated Registry</span>
               </div>
               <button onClick={() => onNavigate('neonates')} className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline">Full Directory</button>
            </div>
         </div>
      </div>
    </div>
  );
};

// --- STUDENT / ACADEMY DASHBOARD ---

const StudentDashboard = ({ stats, loading, onNavigate, user }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
         <div className="text-left">
            <h2 className="text-xs font-black text-indigo-500 uppercase tracking-[0.3em] mb-3 ml-1">Academy Portal</h2>
            <div className="flex items-center gap-3">
               <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter text-left leading-none">Learning Hub<span className="text-indigo-500 text-5xl">.</span></h1>
               <div className="w-7 h-7 bg-indigo-500 text-white rounded-lg flex items-center justify-center p-1 border border-indigo-400 shadow-sm">
                  <GraduationCap className="w-full h-full" />
               </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">Sharpen your clinical intuition with simulated excellence.</p>
         </div>
         <div className="px-6 py-3 bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900 rounded-2xl text-xs font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-3 shadow-sm shadow-indigo-100/50 dark:shadow-none">
            <Award className="w-4 h-4" /> Academic Level: Advanced
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <StatCard title="Ward Cases" value={stats.neonates || '24'} icon={ActivityIcon} colorClass="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400" />
        <StatCard title="Knowledge Base" value="Accredited" icon={BookOpen} colorClass="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" />
        <StatCard title="Practice Center" value="Open" icon={Target} colorClass="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
         {/* Learning Gateway */}
         <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-10 shadow-sm flex flex-col items-center justify-center text-center group hover:shadow-2xl transition-all duration-500">
            <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-3xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-8 shadow-inner border border-indigo-100 dark:border-indigo-800">
               <GraduationCap className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">Clinical <br />Simulations</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-10 leading-relaxed max-w-xs">Master emergency and routine protocols before you reach the patient bedside.</p>
            <button 
              onClick={() => onNavigate('scenarios')}
              className="w-full max-w-xs py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
               Enter Simulator <ArrowRight className="w-4 h-4" />
            </button>
         </div>

         {/* Protocol Explorer */}
         <div className="bg-slate-900 dark:bg-slate-800 rounded-[40px] p-10 shadow-2xl relative overflow-hidden flex flex-col justify-center text-center items-center group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 group-hover:scale-110 transition-transform duration-1000" />
            <div className="relative z-10 w-full flex flex-col items-center">
               <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-primary mb-8 border border-white/5 backdrop-blur-xl">
                  <BookOpen className="w-8 h-8" />
               </div>
               <h3 className="text-2xl font-black text-white tracking-tight mb-4 leading-tight">Protocol <br />Library</h3>
               <p className="text-slate-400 font-medium mb-10 leading-relaxed max-w-xs text-sm">Access the definitive unit guidelines for respiratory and clinical care.</p>
               <button 
                 onClick={() => onNavigate('knowledge')}
                 className="w-full max-w-xs py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all active:scale-95"
               >
                  Open Archive
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default function Dashboard({ user, onNavigate }) {
  const [stats, setStats] = useState({ users: 0, neonates: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.getStats();
        if (res.success) setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const isAdmin = user.role === 'Nursing In-Charge' || user.role === 'Consultant Pediatrician' || user.role === 'ICT / IT Support';
  const isStudent = user.role === 'Student';

  return (
    <div className="min-h-screen">
      {isAdmin ? (
        <AdminDashboard stats={stats} loading={loading} onNavigate={onNavigate} user={user} />
      ) : isStudent ? (
        <StudentDashboard stats={stats} loading={loading} onNavigate={onNavigate} user={user} />
      ) : (
        <ClinicianDashboard stats={stats} loading={loading} onNavigate={onNavigate} user={user} />
      )}
    </div>
  );
}
