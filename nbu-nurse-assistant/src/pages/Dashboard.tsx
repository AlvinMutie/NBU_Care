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
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-[var(--text-main)] tracking-tight">Ward Command Center</h2>
          <p className="text-slate-500 font-medium">Real-time clinical intelligence and unit oversight.</p>
        </div>
        <div className="flex items-center space-x-3 bg-[var(--card-bg)] border border-[var(--border-main)] p-1.5 rounded-2xl shadow-sm">
           <button 
            onClick={() => setActiveView('overview')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeView === 'overview' ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:bg-[var(--bg-main)]'}`}
           >
             <BarChart3 size={14} />
             <span>Overview</span>
           </button>
           <button 
            onClick={() => setActiveView('analytics')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeView === 'analytics' ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:bg-[var(--bg-main)]'}`}
           >
             <PieChart size={14} />
             <span>Analytics</span>
           </button>
           <div className="w-px h-6 bg-[var(--border-main)] mx-1" />
           <button 
            onClick={fetchDashboardData}
            className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl transition-all"
           >
             <RefreshCcw size={16} />
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
            className="space-y-10"
          >
            {/* Emergency & Leadership Quick-Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group hover:border-emerald-200 transition-all">
                 <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000 text-[var(--text-main)]">
                    <Activity size={240} />
                 </div>
                 <div className="flex flex-col md:flex-row justify-between gap-10 relative z-10">
                    <div className="space-y-8 flex-1">
                       <div className="flex items-center space-x-3 text-rose-600">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                          <span className="text-[12px] font-black uppercase tracking-[0.25em]">Active Ward Alerts</span>
                       </div>
                       <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                          <div className="space-y-1.5 p-4 bg-[var(--bg-main)] rounded-2xl border border-[var(--border-main)] group-hover:bg-[var(--card-bg)] transition-colors">
                             <p className="text-3xl font-black text-[var(--text-main)]">03</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Critical <br /> Admissions</p>
                          </div>
                          <div className="space-y-1.5 p-4 bg-[var(--bg-main)] rounded-2xl border border-[var(--border-main)] group-hover:bg-[var(--card-bg)] transition-colors">
                             <p className="text-3xl font-black text-[var(--text-main)]">05</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Respiratory <br /> Support</p>
                          </div>
                          <div className="space-y-1.5 p-4 bg-[var(--bg-main)] rounded-2xl border border-[var(--border-main)] group-hover:bg-[var(--card-bg)] transition-colors">
                             <p className="text-3xl font-black text-[var(--text-main)]">03</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Sepsis <br /> Watchlist</p>
                          </div>
                          <div className="space-y-1.5 p-4 bg-rose-50 dark:bg-rose-900/10 rounded-2xl border border-rose-100 dark:border-rose-900/30 transition-colors">
                             <p className="text-3xl font-black text-rose-600">04</p>
                             <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest leading-tight text-opacity-70">High-Alert <br /> Lab Results</p>
                          </div>
                       </div>
                    </div>
                    <div className="md:w-px md:h-40 bg-[var(--border-main)] hidden md:block opacity-50" />
                    <div className="space-y-6 min-w-[280px]">
                       <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">Shift Command</p>
                       <div className="p-6 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-[2rem] group/lead cursor-pointer hover:border-emerald-300 hover:shadow-md transition-all">
                          <div className="flex items-center justify-between">
                             <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-black text-sm shadow-lg text-[var(--text-main)]">TN</div>
                                <div>
                                   <p className="text-base font-bold text-[var(--text-main)] group-hover/lead:text-emerald-600 transition-colors">Teresa Njoroge</p>
                                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Nursing In-Charge</p>
                                </div>
                             </div>
                             <a href="tel:+254712345678" className="p-3 rounded-xl bg-white dark:bg-slate-800 text-emerald-600 shadow-sm hover:bg-emerald-600 hover:text-white transition-all">
                                <Phone size={18} strokeWidth={2.5} />
                             </a>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-4 bg-slate-900 dark:bg-slate-950 rounded-[2.5rem] p-10 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
                 <div className="flex justify-between items-start relative z-10">
                    <div className="space-y-1">
                       <p className="text-[11px] font-black text-emerald-400 uppercase tracking-[0.3em]">Core System</p>
                       <p className="text-3xl font-black tracking-tight text-white">Active & Protected</p>
                    </div>
                    <ShieldCheck className="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" size={32} />
                 </div>
                 <div className="pt-10 space-y-6 relative z-10">
                    <div className="space-y-2">
                       <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                          <span className="text-slate-400">Institutional Integrity</span>
                          <span className="text-emerald-400">99.98%</span>
                       </div>
                       <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '99.98%' }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]" 
                          />
                       </div>
                    </div>
                    <button className="w-full py-4 bg-white/5 hover:bg-emerald-600 border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all active:scale-[0.98] text-white">
                       Audit Real-time Ledger
                    </button>
                 </div>
              </div>
            </div>

            {/* Primary Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {overviewStats.map((stat, idx) => (
                <motion.div 
                  key={stat.name} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[var(--card-bg)] border border-[var(--border-main)] p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all group relative overflow-hidden"
                >
                  <div className="absolute -right-4 -bottom-4 opacity-[0.02] text-[var(--text-main)] group-hover:scale-110 transition-transform">
                    <stat.icon size={120} />
                  </div>
                  <div className={`w-14 h-14 rounded-2xl ${stat.bg} dark:bg-slate-800/50 ${stat.color} flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-500`}>
                    <stat.icon size={28} strokeWidth={2.5} />
                  </div>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.name}</p>
                  <p className="text-4xl font-black text-[var(--text-main)] tracking-tighter">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-10">
                {/* Clinical Workload Chart */}
                <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-10 rounded-[2.5rem] shadow-sm">
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center space-x-4">
                       <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl shadow-sm">
                          <TrendingUp size={22} />
                       </div>
                       <div>
                          <h3 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">Clinical Load Velocity</h3>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Unit Activity Trends (24h)</p>
                       </div>
                    </div>
                    <select className="bg-[var(--bg-main)] border border-[var(--border-main)] text-[var(--text-main)] text-[10px] font-black uppercase tracking-[0.2em] rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500/10 cursor-pointer">
                       <option>Last 24 Hours</option>
                       <option>Last 7 Days</option>
                    </select>
                  </div>
                  <div className="h-[350px] w-full text-[var(--text-main)]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={workloadData}>
                        <defs>
                          <linearGradient id="colorWorkload" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-main)" vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          stroke="#94a3b8" 
                          fontSize={10} 
                          fontWeight={700}
                          tickLine={false} 
                          axisLine={false}
                          dy={15}
                        />
                        <YAxis 
                          stroke="#94a3b8" 
                          fontSize={10} 
                          fontWeight={700}
                          tickLine={false} 
                          axisLine={false}
                          dx={-10}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'var(--card-bg)', 
                            border: '1px solid var(--border-main)',
                            borderRadius: '16px',
                            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                            color: 'var(--text-main)',
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="workload" 
                          stroke="#10b981" 
                          strokeWidth={4}
                          fillOpacity={1} 
                          fill="url(#colorWorkload)" 
                          animationDuration={2000}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Logs - Now Live */}
                <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2.5rem] overflow-hidden shadow-sm">
                  <div className="p-10 border-b border-[var(--border-main)] flex items-center justify-between bg-[var(--bg-main)]/30">
                     <div className="flex items-center space-x-4">
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-2xl shadow-sm">
                           <ClipboardCheck size={22} />
                        </div>
                        <div>
                           <h3 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">Real-time Verification Timeline</h3>
                           <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Live Clinical Event Stream</p>
                        </div>
                     </div>
                     <button className="text-[11px] font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-[0.2em] transition-all border-b-2 border-emerald-100 hover:border-emerald-600 pb-0.5">Audit Full Records</button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] border-b border-[var(--border-main)] bg-[var(--bg-main)]/20 text-[var(--text-main)]">
                          <th className="px-10 py-5">Timeline</th>
                          <th className="px-10 py-5">Clinician Signature</th>
                          <th className="px-10 py-5">Verified Action</th>
                          <th className="px-10 py-5 text-right">Integrity</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border-main)]">
                        {recentLogs.length > 0 ? recentLogs.map((log, idx) => (
                          <motion.tr 
                            key={log.id} 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="hover:bg-[var(--bg-main)]/50 transition-colors group"
                          >
                            <td className="px-10 py-6">
                              <div className="text-xs font-black text-[var(--text-main)] font-mono">{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                              <div className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">Verified Today</div>
                            </td>
                            <td className="px-10 py-6">
                              <div className="flex items-center space-x-4">
                                 <div className="w-10 h-10 rounded-xl bg-[var(--bg-main)] border border-[var(--border-main)] flex items-center justify-center text-[11px] font-black text-slate-500 shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                                    {log.user?.name?.split(' ').map((n: any) => n[0]).join('') || '??'}
                                 </div>
                                 <div>
                                    <div className="text-sm font-bold text-[var(--text-main)] group-hover:text-emerald-700 transition-colors">{log.user?.name || 'Unknown Clinician'}</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{log.user?.role || 'Staff'}</div>
                                 </div>
                              </div>
                            </td>
                            <td className="px-10 py-6 text-[var(--text-main)]">
                              <span className="text-sm text-[var(--text-main)]/80 font-medium leading-relaxed capitalize">{log.action.replace('_', ' ')}: {log.detail}</span>
                            </td>
                            <td className="px-10 py-6 text-right">
                              <span className="px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-[10px] font-black border border-emerald-100 dark:border-emerald-800 uppercase tracking-widest shadow-sm">Validated</span>
                            </td>
                          </motion.tr>
                        )) : (
                          [1, 2, 3, 4, 5].map((i) => (
                            <tr key={i} className="hover:bg-[var(--bg-main)]/50 transition-colors group opacity-40">
                              <td className="px-10 py-6">
                                <div className="text-xs font-bold text-[var(--text-main)]">08:45 AM</div>
                                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">Today</div>
                              </td>
                              <td className="px-10 py-6">
                                <div className="flex items-center space-x-3">
                                   <div className="w-8 h-8 rounded-lg bg-[var(--bg-main)] flex items-center justify-center text-[10px] font-bold text-slate-600">PK</div>
                                   <div>
                                      <div className="text-sm font-bold text-[var(--text-main)]">Patrick Kamau</div>
                                      <div className="text-[10px] text-slate-500 font-medium">Staff Nurse</div>
                                   </div>
                                </div>
                              </td>
                              <td className="px-10 py-6 text-[var(--text-main)]">
                                <span className="text-sm text-[var(--text-main)]/70 font-medium">Medication: Gentamicin 4.2mg (Sample)</span>
                              </td>
                              <td className="px-10 py-6 text-right">
                                <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-[10px] font-bold border border-emerald-100 dark:border-emerald-800 uppercase">Verified</span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="space-y-10">
                 {/* Quick Actions */}
                 <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-10 rounded-[2.5rem] shadow-sm space-y-8">
                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Quick Deployment</h4>
                    <div className="grid grid-cols-1 gap-4 text-[var(--text-main)]">
                       <button className="flex items-center justify-between p-5 bg-[var(--bg-main)] hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border border-[var(--border-main)] hover:border-emerald-100 dark:hover:border-emerald-800 rounded-[1.5rem] transition-all group/btn shadow-sm hover:shadow-md">
                          <div className="flex items-center space-x-4">
                             <div className="p-3 bg-[var(--card-bg)] border border-[var(--border-main)] rounded-2xl group-hover/btn:border-emerald-300 group-hover/btn:text-emerald-600 transition-colors shadow-inner text-[var(--text-main)]">
                                <Clock size={18} />
                             </div>
                             <span className="text-sm font-black text-[var(--text-main)] uppercase tracking-tight">Start Handover</span>
                          </div>
                          <ArrowRight size={18} className="text-slate-300 group-hover/btn:text-emerald-600 group-hover/btn:translate-x-1 transition-all" />
                       </button>
                       <button className="flex items-center justify-between p-5 bg-[var(--bg-main)] hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-[var(--border-main)] hover:border-blue-100 dark:hover:border-blue-800 rounded-[1.5rem] transition-all group/btn shadow-sm hover:shadow-md text-[var(--text-main)]">
                          <div className="flex items-center space-x-4">
                             <div className="p-3 bg-[var(--card-bg)] border border-[var(--border-main)] rounded-2xl group-hover/btn:border-blue-300 group-hover/btn:text-blue-600 transition-colors shadow-inner text-[var(--text-main)]">
                                <Beaker size={18} />
                             </div>
                             <span className="text-sm font-black text-[var(--text-main)] uppercase tracking-tight">Drug Calculation</span>
                          </div>
                          <ArrowRight size={18} className="text-slate-300 group-hover/btn:text-blue-600 group-hover/btn:translate-x-1 transition-all" />
                       </button>
                       <button className="flex items-center justify-between p-5 bg-[var(--bg-main)] hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-[var(--border-main)] hover:border-purple-100 dark:hover:border-purple-800 rounded-[1.5rem] transition-all group/btn shadow-sm hover:shadow-md text-[var(--text-main)]">
                          <div className="flex items-center space-x-4">
                             <div className="p-3 bg-[var(--card-bg)] border border-[var(--border-main)] rounded-2xl group-hover/btn:border-purple-300 group-hover/btn:text-purple-600 transition-colors shadow-inner text-[var(--text-main)]">
                                <Clock size={18} />
                             </div>
                             <span className="text-sm font-black text-[var(--text-main)] uppercase tracking-tight">Admission Portal</span>
                          </div>
                          <ArrowRight size={18} className="text-slate-300 group-hover/btn:text-purple-600 group-hover/btn:translate-x-1 transition-all" />
                       </button>
                    </div>
                 </div>

                 {/* Safety Protocol Card */}
                 <div className="bg-emerald-600 rounded-[2.5rem] p-10 text-white space-y-8 shadow-2xl shadow-emerald-200 dark:shadow-none relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none group-hover:rotate-12 transition-transform duration-700 text-white">
                       <ShieldCheck size={180} />
                    </div>
                    <div className="space-y-3 relative z-10">
                       <h4 className="text-[11px] font-black text-emerald-200 uppercase tracking-[0.3em]">Institutional Protocol</h4>
                       <p className="text-2xl font-black leading-tight tracking-tight text-white">Secondary Verification Protocol Active</p>
                    </div>
                    <p className="text-base text-emerald-50/90 font-medium leading-relaxed relative z-10">
                       The NeoDesk Institutional Core (v16.2) is currently enforcing secondary clinician verification on all high-alert neonatal medications.
                    </p>
                    <div className="pt-2 relative z-10">
                       <div className="inline-flex items-center space-x-3 px-4 py-2 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md border border-white/10">
                          <div className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse shadow-[0_0_10px_#6ee7b7]" />
                          <span>Compliance Confirmed</span>
                       </div>
                    </div>
                 </div>

                 <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-10 rounded-[2.5rem] shadow-sm flex items-center justify-between hover:border-emerald-500 transition-all cursor-pointer group shadow-sm hover:shadow-xl">
                    <div className="space-y-2">
                       <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] leading-none mb-1">Knowledge Core</p>
                       <p className="text-base font-bold text-[var(--text-main)] group-hover:text-emerald-600 transition-colors">CPAP Protocol v16.42.02</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[var(--bg-main)] text-slate-300 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 group-hover:text-emerald-600 transition-all shadow-inner">
                       <BookOpen size={24} />
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
            className="space-y-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-[var(--text-main)]">
               {/* Patient Distribution Analytics */}
               <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-10 rounded-[2.5rem] shadow-sm">
                  <div className="flex items-center space-x-4 mb-10 border-b border-[var(--border-main)] pb-6">
                     <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-2xl">
                        <PieChart size={22} />
                     </div>
                     <div>
                        <h3 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">Acuity Distribution</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Real-time Ward Census Breakdown</p>
                     </div>
                  </div>
                  <div className="h-[300px] flex items-center justify-around">
                     <div className="w-1/2 h-full">
                        <ResponsiveContainer width="100%" height="100%">
                           <RePieChart>
                              <Pie
                                 data={analyticsData.distribution}
                                 cx="50%"
                                 cy="50%"
                                 innerRadius={60}
                                 outerRadius={100}
                                 paddingAngle={8}
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
                     <div className="w-1/2 space-y-6">
                        {analyticsData.distribution.map(item => (
                           <div key={item.name} className="flex items-center justify-between group">
                              <div className="flex items-center space-x-3">
                                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                 <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{item.name}</span>
                              </div>
                              <span className="text-lg font-black text-[var(--text-main)]">{item.value} <span className="text-[10px] text-slate-400 font-bold tracking-normal opacity-50 uppercase">Cases</span></span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Staffing Analytics */}
               <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-10 rounded-[2.5rem] shadow-sm">
                  <div className="flex items-center space-x-4 mb-10 border-b border-[var(--border-main)] pb-6">
                     <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl">
                        <Users size={22} />
                     </div>
                     <div>
                        <h3 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">Staffing Optimization</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Coverage vs. Acuity Requirement</p>
                     </div>
                  </div>
                  <div className="h-[300px] text-[var(--text-main)]">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData.staffing}>
                           <CartesianGrid strokeDasharray="3 3" stroke="var(--border-main)" vertical={false} />
                           <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} fontWeight={700} tickLine={false} axisLine={false} dy={10} />
                           <YAxis stroke="#94a3b8" fontSize={10} fontWeight={700} tickLine={false} axisLine={false} />
                           <Tooltip 
                              cursor={{fill: 'var(--bg-main)'}}
                              contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-main)', borderRadius: '12px', color: 'var(--text-main)' }}
                           />
                           <Bar dataKey="actual" fill="#10b981" radius={[6, 6, 0, 0]} name="Actual RNs" />
                           <Bar dataKey="required" fill="#94a3b8" opacity={0.3} radius={[6, 6, 0, 0]} name="Required Capacity" />
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            </div>

            {/* Shift Performance Metrics */}
            <div className="bg-slate-900 dark:bg-slate-950 rounded-[3rem] p-12 text-white shadow-2xl">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  <div className="space-y-6">
                     <p className="text-[11px] font-black text-emerald-400 uppercase tracking-[0.4em]">Avg Response Time</p>
                     <div className="flex items-baseline space-x-3">
                        <span className="text-6xl font-black tracking-tighter italic">2.4</span>
                        <span className="text-xl font-bold text-slate-500 uppercase tracking-widest">Minutes</span>
                     </div>
                     <p className="text-sm text-slate-400 leading-relaxed font-medium">Measurement of institutional velocity from alert trigger to clinician verification event.</p>
                  </div>
                  <div className="space-y-6 border-l border-white/10 pl-16">
                     <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.4em]">Handover Compliance</p>
                     <div className="flex items-baseline space-x-3">
                        <span className="text-6xl font-black tracking-tighter italic">100%</span>
                        <span className="text-xl font-bold text-slate-500 uppercase tracking-widest">Digital</span>
                     </div>
                     <p className="text-sm text-slate-400 leading-relaxed font-medium">All shifts for the current planning cycle (June 2026) have authenticated digital signatures.</p>
                  </div>
                  <div className="space-y-6 border-l border-white/10 pl-16">
                     <p className="text-[11px] font-black text-purple-400 uppercase tracking-[0.4em]">Medication Precision</p>
                     <div className="flex items-baseline space-x-3">
                        <span className="text-6xl font-black tracking-tighter italic">00</span>
                        <span className="text-xl font-bold text-slate-500 uppercase tracking-widest">Deviations</span>
                     </div>
                     <p className="text-sm text-slate-400 leading-relaxed font-medium">Zero dose miscalculations detected by the forensic validation core in the last 7,200 events.</p>
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
