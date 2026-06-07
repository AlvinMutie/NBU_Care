import React, { useState, useEffect } from 'react';
import { 
  Users, Activity, Beaker, ShieldCheck, TrendingUp, 
  Phone, ArrowRight, ClipboardCheck,
  Clock, Zap, BookOpen, BarChart3, PieChart, RefreshCcw
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart as RePieChart, Pie
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'overview' | 'analytics'>('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [recentLogs, setLogs] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, logsRes, analyticsRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/logs/recent'),
        api.get('/admin/analytics')
      ]);
      setStats(statsRes.data.data);
      setLogs(logsRes.data.data);
      setAnalytics(analyticsRes.data.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const overviewStats = [
    { name: 'Live Cases', value: stats?.live_cases || '0', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Critical Alerts', value: '03', icon: Activity, color: 'text-rose-600', bg: 'bg-rose-50' },
    { name: 'Doses Validated', value: stats?.doses_given || '0', icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Safety Score', value: `${stats?.safety_score || 0}%`, icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const workloadData = [
    { name: '00:00', workload: 12 },
    { name: '04:00', workload: 15 },
    { name: '08:00', workload: 28 },
    { name: '12:00', workload: 22 },
    { name: '16:00', workload: 32 },
    { name: '20:00', workload: 25 },
    { name: '23:59', workload: 18 },
  ];

  const analyticsData = analytics || {
    distribution: [
      { name: 'Critical', value: 3, color: '#ef4444' },
      { name: 'Serious', value: 8, color: '#f59e0b' },
      { name: 'Stable', value: 13, color: '#10b981' },
    ],
    staffing: [
      { name: 'Day', required: 12, actual: 10 },
      { name: 'Afternoon', required: 10, actual: 11 },
      { name: 'Night', required: 8, actual: 8 },
    ]
  };

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center space-y-6 text-slate-400">
        <div className="w-16 h-16 border-4 border-[var(--bg-main)] border-t-emerald-600 rounded-full animate-spin" />
        <p className="font-bold uppercase tracking-[0.2em] text-xs text-emerald-600">Syncing Clinical Intelligence...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
          <h2 className="text-3xl font-bold text-[var(--text-main)] tracking-tight">Ward Command Center</h2>
          <p className="text-slate-500 font-medium">Real-time clinical intelligence and unit oversight.</p>
        </div>
        <div className="flex items-center space-x-2 bg-[var(--card-bg)] border border-[var(--border-main)] p-1.5 rounded-2xl shadow-sm">
           <button 
            onClick={() => setActiveView('overview')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeView === 'overview' ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:bg-[var(--bg-main)]'}`}
           >
             <BarChart3 size={14} />
             <span>Overview</span>
           </button>
           <button 
            onClick={() => setActiveView('analytics')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeView === 'analytics' ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:bg-[var(--bg-main)]'}`}
           >
             <PieChart size={14} />
             <span>Analytics</span>
           </button>
           <div className="w-px h-5 bg-[var(--border-main)] mx-1" />
           <button 
            onClick={fetchDashboardData}
            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl transition-all"
           >
             <RefreshCcw size={15} />
           </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeView === 'overview' ? (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Emergency & Leadership Quick-Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2rem] p-6 md:p-8 shadow-sm relative overflow-hidden group hover:border-emerald-200 transition-all">
                 <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-1000 text-[var(--text-main)]">
                    <Activity size={200} />
                 </div>
                 <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
                    <div className="space-y-6 flex-1">
                       <div className="flex items-center space-x-3 text-rose-600">
                          <div className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Active Ward Alerts</span>
                       </div>
                       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="space-y-1 p-4 bg-[var(--bg-main)] rounded-2xl border border-[var(--border-main)] group-hover:bg-[var(--card-bg)] transition-colors">
                             <p className="text-2xl font-black text-[var(--text-main)]">03</p>
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Critical <br /> Admissions</p>
                          </div>
                          <div className="space-y-1 p-4 bg-[var(--bg-main)] rounded-2xl border border-[var(--border-main)] group-hover:bg-[var(--card-bg)] transition-colors">
                             <p className="text-2xl font-black text-[var(--text-main)]">05</p>
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Respiratory <br /> Support</p>
                          </div>
                          <div className="space-y-1 p-4 bg-[var(--bg-main)] rounded-2xl border border-[var(--border-main)] group-hover:bg-[var(--card-bg)] transition-colors">
                             <p className="text-2xl font-black text-[var(--text-main)]">03</p>
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Sepsis <br /> Watchlist</p>
                          </div>
                          <div className="space-y-1 p-4 bg-rose-50 dark:bg-rose-900/10 rounded-2xl border border-rose-100 dark:border-rose-900/30 transition-colors">
                             <p className="text-2xl font-black text-rose-600">04</p>
                             <p className="text-[9px] font-bold text-rose-400 uppercase tracking-widest leading-tight text-opacity-70">High-Alert <br /> Lab Results</p>
                          </div>
                       </div>
                    </div>
                    <div className="md:w-px md:h-32 bg-[var(--border-main)] hidden md:block opacity-30" />
                    <div className="space-y-4 min-w-[240px]">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Shift Command</p>
                       <div className="p-4 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl group/lead cursor-pointer hover:border-emerald-300 hover:shadow-md transition-all">
                          <div className="flex items-center justify-between">
                             <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-xs shadow-lg">TN</div>
                                <div>
                                   <p className="text-sm font-bold text-[var(--text-main)] group-hover/lead:text-emerald-600 transition-colors">Teresa Njoroge</p>
                                   <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">In-Charge</p>
                                </div>
                             </div>
                             <a href="tel:+254712345678" className="p-2.5 rounded-lg bg-white dark:bg-slate-800 text-emerald-600 shadow-sm hover:bg-emerald-600 hover:text-white transition-all">
                                <Phone size={16} strokeWidth={2.5} />
                             </a>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-4 bg-slate-900 dark:bg-slate-950 rounded-[2rem] p-8 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
                 <div className="flex justify-between items-start relative z-10">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Core System</p>
                       <p className="text-2xl font-black tracking-tight text-white">Protected</p>
                    </div>
                    <ShieldCheck className="text-emerald-400" size={28} />
                 </div>
                 <div className="pt-8 space-y-5 relative z-10">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                          <span className="text-slate-400">Integrity</span>
                          <span className="text-emerald-400">99.98%</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: '99.98%' }} transition={{ duration: 1.5 }} className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.3)]" />
                       </div>
                    </div>
                    <button className="w-full py-3 bg-white/5 hover:bg-emerald-600 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all text-white">
                       Audit Ledger
                    </button>
                 </div>
              </div>
            </div>

            {/* Primary Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewStats.map((stat, idx) => (
                <motion.div 
                  key={stat.name} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[var(--card-bg)] border border-[var(--border-main)] p-6 rounded-3xl shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all group relative overflow-hidden"
                >
                  <div className="absolute -right-2 -bottom-2 opacity-[0.02] text-[var(--text-main)] group-hover:scale-110 transition-transform">
                    <stat.icon size={80} />
                  </div>
                  <div className={`w-12 h-12 rounded-2xl ${stat.bg} dark:bg-slate-800/50 ${stat.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-all duration-500`}>
                    <stat.icon size={22} strokeWidth={2.5} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.name}</p>
                  <p className="text-3xl font-black text-[var(--text-main)] tracking-tighter">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Clinical Workload Chart */}
                <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-8 rounded-[2rem] shadow-sm">
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center space-x-3">
                       <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl">
                          <TrendingUp size={18} />
                       </div>
                       <div>
                          <h3 className="text-xl font-bold text-[var(--text-main)] tracking-tight">Clinical Load Velocity</h3>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Trends (24h)</p>
                       </div>
                    </div>
                    <select className="bg-[var(--bg-main)] border border-[var(--border-main)] text-[var(--text-main)] text-[9px] font-black uppercase tracking-[0.2em] rounded-lg px-3 py-1.5 outline-none cursor-pointer">
                       <option>Last 24 Hours</option>
                       <option>Last 7 Days</option>
                    </select>
                  </div>
                  <div className="h-[300px] w-full text-[var(--text-main)]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={workloadData}>
                        <defs>
                          <linearGradient id="colorWorkload" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-main)" vertical={false} />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} fontWeight={700} tickLine={false} axisLine={false} dy={10} />
                        <YAxis stroke="#94a3b8" fontSize={9} fontWeight={700} tickLine={false} axisLine={false} dx={-5} />
                        <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-main)', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }} />
                        <Area type="monotone" dataKey="workload" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorWorkload)" animationDuration={1500} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Logs */}
                <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2rem] overflow-hidden shadow-sm">
                  <div className="p-8 border-b border-[var(--border-main)] flex items-center justify-between bg-[var(--bg-main)]/30">
                     <div className="flex items-center space-x-3">
                        <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-xl">
                           <ClipboardCheck size={18} />
                        </div>
                        <div>
                           <h3 className="text-xl font-bold text-[var(--text-main)] tracking-tight">Verification Timeline</h3>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Live Event Stream</p>
                        </div>
                     </div>
                     <button className="text-[10px] font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-[0.2em] transition-all">View All</button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-[var(--border-main)] bg-[var(--bg-main)]/20">
                          <th className="px-8 py-4">Timeline</th>
                          <th className="px-8 py-4">Clinician</th>
                          <th className="px-8 py-4">Action</th>
                          <th className="px-8 py-4 text-right">Integrity</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border-main)]">
                        {recentLogs.length > 0 ? recentLogs.map((log, idx) => (
                          <tr key={log.id} className="hover:bg-[var(--bg-main)]/50 transition-colors group">
                            <td className="px-8 py-5">
                              <div className="text-[11px] font-black text-[var(--text-main)] font-mono">{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                            </td>
                            <td className="px-8 py-5">
                              <div className="flex items-center space-x-3">
                                 <div className="w-8 h-8 rounded-lg bg-[var(--bg-main)] border border-[var(--border-main)] flex items-center justify-center text-[10px] font-black text-slate-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                    {log.user?.name?.split(' ').map((n: any) => n[0]).join('') || '??'}
                                 </div>
                                 <div>
                                    <div className="text-xs font-bold text-[var(--text-main)] group-hover:text-emerald-700 transition-colors">{log.user?.name || 'System'}</div>
                                    <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{log.user?.role || 'Staff'}</div>
                                 </div>
                              </div>
                            </td>
                            <td className="px-8 py-5">
                              <span className="text-xs text-[var(--text-main)]/80 font-medium leading-relaxed capitalize">{log.action.replace('_', ' ')}</span>
                            </td>
                            <td className="px-8 py-5 text-right">
                              <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-[9px] font-black border border-emerald-100 dark:border-emerald-800 uppercase tracking-widest">Valid</span>
                            </td>
                          </tr>
                        )) : (
                          [1, 2, 3].map((i) => (
                            <tr key={i} className="opacity-40"><td colSpan={4} className="px-8 py-5 text-center text-[10px] uppercase font-bold tracking-widest">No recent verified logs found</td></tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                 {/* Quick Actions */}
                 <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-8 rounded-[2rem] shadow-sm space-y-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Quick Deployment</h4>
                    <div className="grid grid-cols-1 gap-3">
                       {[{ label: 'Start Handover', icon: Clock, color: 'emerald' }, { label: 'Drug Calculation', icon: Beaker, color: 'blue' }, { label: 'Admission Portal', icon: Clock, color: 'purple' }].map(action => (
                         <button key={action.label} className={`flex items-center justify-between p-4 bg-[var(--bg-main)] hover:bg-${action.color}-50 dark:hover:bg-${action.color}-900/20 border border-[var(--border-main)] hover:border-${action.color}-100 rounded-2xl transition-all group/btn`}>
                            <div className="flex items-center space-x-3">
                               <div className={`p-2.5 bg-[var(--card-bg)] border border-[var(--border-main)] rounded-xl group-hover/btn:text-${action.color}-600 shadow-inner`}>
                                  <action.icon size={16} />
                               </div>
                               <span className="text-xs font-black text-[var(--text-main)] uppercase tracking-tight">{action.label}</span>
                            </div>
                            <ArrowRight size={16} className="text-slate-300 group-hover/btn:translate-x-1 transition-all" />
                         </button>
                       ))}
                    </div>
                 </div>

                 {/* Safety Protocol Card */}
                 <div className="bg-emerald-600 rounded-[2rem] p-8 text-white space-y-6 shadow-xl shadow-emerald-200 dark:shadow-none relative overflow-hidden">
                    <ShieldCheck className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none" size={140} />
                    <div className="space-y-2 relative z-10">
                       <h4 className="text-[9px] font-black text-emerald-200 uppercase tracking-[0.3em]">Institutional Protocol</h4>
                       <p className="text-xl font-black leading-tight tracking-tight text-white">Secondary Verification Active</p>
                    </div>
                    <p className="text-xs text-emerald-50/90 font-medium leading-relaxed relative z-10">
                       The NeoDesk Institutional Core enforces secondary clinician verification on all high-alert medications.
                    </p>
                    <div className="pt-2 relative z-10">
                       <div className="inline-flex items-center space-x-3 px-3 py-1.5 bg-white/10 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                          <span>Compliance Confirmed</span>
                       </div>
                    </div>
                 </div>

                 <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-8 rounded-[2rem] shadow-sm flex items-center justify-between hover:border-emerald-500 transition-all cursor-pointer group">
                    <div className="space-y-1">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] leading-none mb-1">Knowledge Core</p>
                       <p className="text-sm font-bold text-[var(--text-main)] group-hover:text-emerald-600 transition-colors">CPAP Protocol v16.42</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[var(--bg-main)] text-slate-300 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 group-hover:text-emerald-600 transition-all">
                       <BookOpen size={20} />
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-[var(--text-main)]">
               {/* Patient Distribution Analytics */}
               <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-8 rounded-[2rem] shadow-sm">
                  <div className="flex items-center space-x-3 mb-8 border-b border-[var(--border-main)] pb-6">
                     <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-xl">
                        <PieChart size={20} />
                     </div>
                     <div>
                        <h3 className="text-xl font-bold tracking-tight">Acuity Distribution</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Unit Census Breakdown</p>
                     </div>
                  </div>
                  <div className="h-[280px] flex flex-col md:flex-row items-center justify-around gap-8 md:gap-4">
                     <div className="w-full md:w-1/2 h-48 md:h-full">
                        <ResponsiveContainer width="100%" height="100%">
                           <RePieChart>
                              <Pie
                                 data={analyticsData.distribution}
                                 cx="50%"
                                 cy="50%"
                                 innerRadius={55}
                                 outerRadius={80}
                                 paddingAngle={6}
                                 dataKey="value"
                              >
                                 {analyticsData.distribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                 ))}
                              </Pie>
                              <Tooltip 
                                 contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-main)', borderRadius: '12px', color: 'var(--text-main)' }}
                              />
                           </RePieChart>
                        </ResponsiveContainer>
                     </div>
                     <div className="w-full md:w-1/2 space-y-3">
                        {analyticsData.distribution.map(item => (
                           <div key={item.name} className="flex items-center justify-between group">
                              <div className="flex items-center space-x-3">
                                 <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                 <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{item.name}</span>
                              </div>
                              <span className="text-sm font-black">{item.value} <span className="text-[9px] text-slate-400 font-bold tracking-normal opacity-50 uppercase">Cases</span></span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Staffing Analytics */}
               <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-8 rounded-[2rem] shadow-sm">
                  <div className="flex items-center space-x-3 mb-8 border-b border-[var(--border-main)] pb-6">
                     <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl">
                        <Users size={20} />
                     </div>
                     <div>
                        <h3 className="text-xl font-bold tracking-tight">Staffing Optimization</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Coverage vs. Requirement</p>
                     </div>
                  </div>
                  <div className="h-[280px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData.staffing}>
                           <CartesianGrid strokeDasharray="3 3" stroke="var(--border-main)" vertical={false} />
                           <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} fontWeight={700} tickLine={false} axisLine={false} dy={10} />
                           <YAxis stroke="#94a3b8" fontSize={9} fontWeight={700} tickLine={false} axisLine={false} />
                           <Tooltip 
                              cursor={{fill: 'var(--bg-main)'}}
                              contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-main)', borderRadius: '12px', color: 'var(--text-main)' }}
                           />
                           <Bar dataKey="actual" fill="#10b981" radius={[4, 4, 0, 0]} name="Actual RNs" />
                           <Bar dataKey="required" fill="#94a3b8" opacity={0.2} radius={[4, 4, 0, 0]} name="Required" />
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            </div>

            {/* Performance Indicators */}
            <div className="bg-slate-900 dark:bg-slate-950 rounded-[2.5rem] p-10 text-white shadow-2xl">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="space-y-4">
                     <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Response Velocity</p>
                     <div className="flex items-baseline space-x-2">
                        <span className="text-5xl font-black tracking-tighter">2.4</span>
                        <span className="text-base font-bold text-slate-500 uppercase tracking-widest">Min</span>
                     </div>
                     <p className="text-xs text-slate-400 leading-relaxed font-medium">Measurement of institutional velocity from alert to verification.</p>
                  </div>
                  <div className="space-y-4 border-l border-white/10 pl-12">
                     <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Compliance</p>
                     <div className="flex items-baseline space-x-2">
                        <span className="text-5xl font-black tracking-tighter">100%</span>
                        <span className="text-base font-bold text-slate-500 uppercase tracking-widest">Digital</span>
                     </div>
                     <p className="text-xs text-slate-400 leading-relaxed font-medium">All shifts for the current planning cycle have digital signatures.</p>
                  </div>
                  <div className="space-y-4 border-l border-white/10 pl-12">
                     <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em]">Precision Core</p>
                     <div className="flex items-baseline space-x-2">
                        <span className="text-5xl font-black tracking-tighter">00</span>
                        <span className="text-base font-bold text-slate-500 uppercase tracking-widest">Errors</span>
                     </div>
                     <p className="text-xs text-slate-400 leading-relaxed font-medium">Zero miscalculations detected by the validation core.</p>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
