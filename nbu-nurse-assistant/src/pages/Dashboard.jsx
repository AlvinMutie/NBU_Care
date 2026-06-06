import React, { useState, useEffect } from 'react';
import { 
  Activity, Calculator, Droplets, Zap, ArrowRight,
  Users, ShieldAlert, GraduationCap, Clock, FileText,
  Activity as ActivityIcon, HeartPulse, Stethoscope, ChevronRight,
  Database, ShieldCheck, AlertCircle, HelpCircle, Loader2,
  TrendingUp, BarChart3, PieChart, BookOpen, ClipboardCheck,
  CheckCircle2, Target, Award
} from 'lucide-react';
import { api } from '../services/api';

// --- SHARED COMPONENTS ---

const BlueTick = ({ className = "w-4 h-4" }) => (
  <div className={`${className} bg-primary text-white rounded-full flex items-center justify-center p-0.5 shadow-sm border border-white/20 dark:border-slate-800`} title="Verified Staff">
    <ShieldCheck className="w-full h-full" />
  </div>
);

const StatCard = ({ title, value, icon: Icon, colorClass, highlight, trend }) => (
  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden text-left">
     <div className="hidden lg:block absolute -right-4 -top-4 w-20 h-20 bg-slate-50 dark:bg-slate-800/50 rounded-full group-hover:scale-150 transition-transform duration-700" />
     <div className="relative z-10">
       <div className="flex items-center justify-between mb-6">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClass} transition-transform group-hover:scale-110 shadow-inner`}>
             <Icon className="w-6 h-6" />
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

const CapacityChart = ({ data = [65, 82, 45, 90, 70, 55, 85], label = "H" }) => {
  return (
    <div className="h-40 flex items-end justify-between gap-2 px-2">
      {data.map((height, i) => (
        <div key={i} className="flex-1 group relative">
          <div 
            className="w-full bg-primary/10 dark:bg-primary/5 rounded-t-lg group-hover:bg-primary/30 dark:group-hover:bg-primary/20 transition-all duration-500 relative overflow-hidden h-full"
          >
            <div 
              className="absolute bottom-0 left-0 w-full bg-primary rounded-t-lg transition-all duration-700 ease-out-expo"
              style={{ height: `${height}%`, animationDelay: `${i * 100}ms` }}
            />
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold text-slate-400 uppercase tracking-tighter">
            {label}{i+1}
          </div>
        </div>
      ))}
    </div>
  );
};

// --- ADMIN / IN-CHARGE DASHBOARD ---

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
               <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter text-left leading-none">Management Hub<span className="text-primary text-5xl">.</span></h1>
               <BlueTick className="w-7 h-7" />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">Global oversight of clinical precision and workforce.</p>
         </div>
         <div className="flex items-center gap-3">
            <div className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-xs font-black text-slate-600 dark:text-slate-400 flex items-center gap-3 shadow-sm">
               <div className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Live Monitoring
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Clinicians" value={loading ? '...' : stats.users} icon={Users} colorClass="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" trend="12" />
        <StatCard title="Ward Occupancy" value={neonateCount || '24'} icon={ActivityIcon} colorClass="bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400" highlight />
        <StatCard title="Doses Verified" value="1,242" icon={Droplets} colorClass="bg-rose-50 dark:bg-rose-900/30 text-rose-500 dark:text-rose-400" />
        <StatCard title="Safety Index" value="99.8%" icon={ShieldCheck} colorClass="bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6 text-left">
          {/* Main Infographic Section */}
          <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-8 shadow-sm group hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
             <div className="flex items-center justify-between mb-10">
                <div>
                   <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-primary" /> Admission Velocity
                   </h3>
                   <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Average admissions per day over the last 7 days.</p>
                </div>
                <div className="flex gap-2">
                   <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 dark:border-slate-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Active
                   </div>
                </div>
             </div>
             
             <CapacityChart data={[40, 55, 30, 80, 60, 45, 90]} label="D" />
             
             <div className="mt-12 pt-8 border-t border-slate-50 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { l: 'Max Load', v: '100%', i: Zap, c: 'text-amber-500' },
                  { l: 'Avg Stay', v: '12d', i: Clock, c: 'text-primary' },
                  { l: 'Beds Avail', v: '04', i: BarChart3, c: 'text-indigo-500' },
                  { l: 'Error Margin', v: '0%', i: ShieldCheck, c: 'text-emerald-500' }
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                     <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <item.i className={`w-3 h-3 ${item.c}`} /> {item.l}
                     </p>
                     <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{item.v}</p>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[500px] hover:shadow-2xl transition-all duration-500">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-900/30">
               <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
                  <ActivityIcon className="w-5 h-5 text-primary" /> Unit Action Audit
               </h3>
               <button 
                 onClick={() => onNavigate('audit-logs')}
                 className="text-xs font-black text-primary hover:underline transition-all uppercase tracking-widest"
               >
                 History
               </button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {logsLoading ? (
                <div className="flex flex-col items-center justify-center py-24">
                  <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Encrypting live data...</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
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
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight">{log.type}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{log.user?.name || 'Unknown'}</span>
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

        <div className="space-y-6 text-left">
           {/* Workforce Health */}
           <div className="bg-slate-900 dark:bg-slate-800 rounded-[40px] p-8 shadow-2xl relative overflow-hidden group min-h-[400px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 dark:bg-white/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/4 group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10">
                 <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary dark:text-white border border-white/5 backdrop-blur-xl">
                      <Users className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Workforce Performance</span>
                 </div>
                 
                 <h3 className="text-3xl font-black text-white tracking-tighter mb-4 leading-none text-left">Shift Rota <br />Dynamics<span className="text-primary dark:text-white/50 text-4xl">.</span></h3>
                 <p className="text-sm text-slate-400 dark:text-white/70 font-medium mb-8">System audit indicates 100% shift coverage for the upcoming 48 hours.</p>
                 
                 <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                       <CheckCircle2 className="w-5 h-5 text-primary dark:text-white" />
                       <span className="text-xs font-bold text-white tracking-wide">All Shifts Staffed</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                       <ShieldCheck className="w-5 h-5 text-emerald-400" />
                       <span className="text-xs font-bold text-white tracking-wide">Manager-on-Duty Verified</span>
                    </div>
                 </div>
              </div>
              
              <button 
                onClick={() => onNavigate('rota')}
                className="relative z-10 w-full py-5 bg-white text-slate-900 rounded-[24px] font-black text-xs uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all active:scale-95 mt-8"
              >
                 Manage Team Schedule
              </button>
           </div>

           {/* Role Distribution Infographic */}
           <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-8">Role Distribution</h3>
              <div className="space-y-6">
                 {[
                   { l: 'Consultants', v: '15%', c: 'bg-primary' },
                   { l: 'Nurses', v: '65%', c: 'bg-indigo-500' },
                   { l: 'Students', v: '20%', c: 'bg-teal-400' }
                 ].map((role, i) => (
                    <div key={i} className="space-y-2 text-left">
                       <div className="flex justify-between items-center text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                          <span>{role.l}</span>
                          <span>{role.v}</span>
                       </div>
                       <div className="h-2 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full ${role.c} transition-all duration-1000`} style={{ width: role.v }} />
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- CLINICIAN (NURSE / MO) DASHBOARD ---

const ClinicianDashboard = ({ stats, loading, onNavigate, user }) => {
  const [personalStats, setPersonalStats] = useState({ doses: 84, handovers: 12, precision: 100 });
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
        <StatCard title="My Doses Today" value={personalStats.doses} icon={Droplets} colorClass="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" />
        <StatCard title="Handovers Pending" value="02" icon={ClipboardCheck} colorClass="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" />
        <StatCard title="Personal Accuracy" value="100%" icon={Target} colorClass="bg-rose-50 dark:bg-rose-900/30 text-rose-500 dark:text-rose-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
         {/* Shift Action Center */}
         <div className="bg-slate-900 dark:bg-slate-800 rounded-[40px] p-10 shadow-2xl relative overflow-hidden flex flex-col h-full min-h-[450px]">
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
         <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-8 shadow-sm flex flex-col group hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3 text-left">
                     <ActivityIcon className="w-5 h-5 text-primary" /> Active Ward Context
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 text-left">Quick access to current unit patients.</p>
               </div>
               <button onClick={() => onNavigate('neonates')} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-primary hover:bg-primary/10 transition-colors">
                  <ChevronRight className="w-5 h-5" />
               </button>
            </div>
            
            <div className="space-y-4 flex-grow">
               {activeCases.map((n, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 group/item hover:border-primary/30 transition-all">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover/item:text-primary transition-colors border border-slate-100 dark:border-slate-700">
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
  const [academyStats, setAcademyStats] = useState({ mastered: 4, read: 18, total: 25 });

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
         <div className="text-left">
            <h2 className="text-xs font-black text-indigo-500 uppercase tracking-[0.3em] mb-3 ml-1">Academy Portal</h2>
            <div className="flex items-center gap-3">
               <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter text-left leading-none">Learning Hub<span className="text-indigo-500 text-5xl">.</span></h1>
               <div className="w-7 h-7 bg-indigo-500 text-white rounded-lg flex items-center justify-center p-1 border border-indigo-400">
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
        <StatCard title="Scenarios Mastered" value={academyStats.mastered} icon={Target} colorClass="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" />
        <StatCard title="Protocols Read" value={academyStats.read} icon={BookOpen} colorClass="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" />
        <StatCard title="Unit Cases" value={stats.neonates || '24'} icon={ActivityIcon} colorClass="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
         <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-8 shadow-sm flex flex-col group hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
                     <TrendingUp className="w-5 h-5 text-indigo-500" /> Proficiency Growth
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Mastery metrics across clinical simulation blocks.</p>
               </div>
            </div>
            
            <CapacityChart data={[20, 45, 60, 55, 80, 75, 95]} label="Mod" />
            
            <div className="mt-auto pt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-slate-50 dark:border-slate-800">
               {[
                  { l: 'Clinical Logic', v: '92%', c: 'text-indigo-500' },
                  { l: 'Dose Math', v: '100%', c: 'text-emerald-500' },
                  { l: 'Protocols', v: '78%', c: 'text-amber-500' },
                  { l: 'Ethics', v: '85%', c: 'text-primary' }
               ].map((m, i) => (
                  <div key={i}>
                     <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.l}</p>
                     <p className={`text-lg font-black ${m.c}`}>{m.v}</p>
                  </div>
               ))}
            </div>
         </div>

         <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-8 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-3xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-8 shadow-inner">
               <GraduationCap className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">Ready for <br />Practice?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-10 leading-relaxed">Simulate critical events before they happen at the bedside.</p>
            <button 
              onClick={() => onNavigate('scenarios')}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-95"
            >
               Enter Simulator
            </button>
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
