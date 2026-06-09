import React, { useState, useEffect } from 'react';
import { 
  Users, Activity, Beaker, ShieldCheck, TrendingUp, 
  Phone, ArrowRight, ClipboardCheck,
  Clock, Zap, BookOpen, BarChart3, PieChart, RefreshCcw, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart as RePieChart, Pie, Cell
} from 'recharts';
import api from '../services/api';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    total_staff: 0,
    live_cases: 0,
    doses_given: 0,
    safety_score: 98
  });
  const [analytics, setAnalytics] = useState({
    distribution: [],
    staffing: []
  });
  const [recentLogs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, analyticsRes, logsRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/analytics'),
        api.get('/logs/recent')
      ]);
      setStats(statsRes.data.data);
      setAnalytics(analyticsRes.data.data);
      setLogs(logsRes.data.data);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && stats.total_staff === 0) {
     return (
        <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
           <div className="w-10 h-10 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin" />
           <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Initializing Command Center...</p>
        </div>
     );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-28 text-[var(--text-main)]">
      {/* Structural Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Command Center</h2>
          <p className="text-slate-500 font-medium">Real-time clinical orchestration and ward monitoring.</p>
        </div>
        <div className="flex items-center gap-4 bg-[var(--card-bg)] border border-[var(--border-main)] p-2 px-6 rounded-2xl shadow-sm">
           <button onClick={fetchDashboardData} className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
              <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
           </button>
           <div className="w-px h-8 bg-[var(--border-main)]" />
           <div className="flex flex-col items-end">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">System Status</p>
              <p className="text-xs font-bold text-emerald-600 mt-1">Operational</p>
           </div>
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Core Operational Statistics */}
        <div className="lg:col-span-8 space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Live Cases', value: stats.live_cases, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Active Staff', value: stats.total_staff, icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Safety Score', value: `${stats.safety_score}%`, icon: ShieldCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
                { label: 'Meds Audit', value: stats.doses_given, icon: Beaker, color: 'text-rose-600', bg: 'bg-rose-50' },
              ].map((stat, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={stat.label} 
                  className="bg-[var(--card-bg)] border border-[var(--border-main)] p-6 rounded-[2rem] shadow-sm group hover:border-emerald-200 transition-all"
                >
                   <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-2xl ${stat.bg} dark:bg-slate-800 ${stat.color} transition-colors duration-500`}>
                         <stat.icon size={20} />
                      </div>
                      <TrendingUp size={16} className="text-slate-300" />
                   </div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                   <p className="text-2xl font-black">{stat.value}</p>
                </motion.div>
              ))}
           </div>

           {/* Active Ward Alerts - Redesigned to fit better */}
           <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[3rem] p-8 shadow-sm overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between gap-10">
                 <div className="flex-1 space-y-6">
                    <div className="space-y-1">
                       <div className="flex items-center space-x-3 text-rose-600">
                          <AlertCircle size={20} />
                          <h3 className="text-xl font-bold tracking-tight">Active Ward Alerts</h3>
                       </div>
                       <p className="text-xs text-slate-500 font-medium">Real-time flags requiring clinical validation.</p>
                    </div>
                    
                    <div className="space-y-3">
                       {[
                         { baby: 'Baby Liam', id: 'N-001', alert: 'Tachycardia Trend', time: '5m ago', type: 'Critical' },
                         { baby: 'Baby Chloe', id: 'N-002', alert: 'Dextrose Dilution', time: '12m ago', type: 'Serious' },
                         { baby: 'Baby Ethan', id: 'N-005', alert: 'Low SpO2 Alert', time: '15m ago', type: 'Critical' },
                       ].map((alert, i) => (
                         <div key={i} className="p-4 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl flex items-center justify-between hover:border-rose-200 transition-all">
                            <div className="flex items-center space-x-4">
                               <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-[10px] ${alert.type === 'Critical' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>
                                  {alert.baby.split(' ')[1][0]}
                               </div>
                               <div>
                                  <p className="text-xs font-bold">{alert.baby}</p>
                                  <p className="text-[10px] text-slate-500 font-medium">{alert.alert}</p>
                               </div>
                            </div>
                            <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-all">Resolve</button>
                         </div>
                       ))}
                    </div>
                 </div>
                 
                 <div className="w-px bg-[var(--border-main)] hidden md:block" />

                 <div className="flex-1 space-y-6">
                    <div className="space-y-1">
                       <div className="flex items-center space-x-3 text-emerald-600">
                          <ShieldCheck size={20} />
                          <h3 className="text-xl font-bold tracking-tight">Institutional Health</h3>
                       </div>
                       <p className="text-xs text-slate-500 font-medium">Aggregated ward health metrics.</p>
                    </div>
                    
                    <div className="space-y-5 pt-2">
                       {[
                         { label: 'Calculation Accuracy', val: 100, color: 'bg-emerald-500' },
                         { label: 'Training Compliance', val: 92, color: 'bg-blue-500' },
                         { label: 'Protocol Adherence', val: 98, color: 'bg-amber-500' },
                       ].map((metric) => (
                         <div key={metric.label} className="space-y-2">
                            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                               <span className="text-slate-400">{metric.label}</span>
                               <span className="text-[var(--text-main)]">{metric.val}%</span>
                            </div>
                            <div className="h-1.5 bg-[var(--bg-main)] rounded-full overflow-hidden">
                               <motion.div 
                                 initial={{ width: 0 }}
                                 animate={{ width: `${metric.val}%` }}
                                 className={`h-full ${metric.color}`}
                               />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Global Registry Sidebar */}
        <div className="lg:col-span-4 space-y-8">
           {/* Shift Context Card */}
           <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:rotate-12 transition-transform duration-700">
                 <Zap size={140} />
              </div>
              <div className="space-y-6 relative z-10">
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em]">Current Assignment</p>
                    <h4 className="text-2xl font-black tracking-tight">Unit Command</h4>
                 </div>
                 <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    Account: {JSON.parse(localStorage.getItem('user_data') || '{}').name}<br/>
                    Role: {JSON.parse(localStorage.getItem('user_data') || '{}').role}
                 </p>
                 <div className="pt-2">
                    <button className="px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                       End Active Shift
                    </button>
                 </div>
              </div>
           </div>

           <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2.5rem] p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                 <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Recent Activity</h4>
                 <Clock size={16} className="text-slate-300" />
              </div>
              <div className="space-y-5">
                 {recentLogs.slice(0, 4).map((log, i) => (
                   <div key={i} className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--bg-main)] flex items-center justify-center text-[10px] font-bold text-emerald-600">
                         {log.action[0].toUpperCase()}
                      </div>
                      <div className="flex-1 space-y-0.5">
                         <p className="text-xs font-bold capitalize">{log.action.replace('_', ' ')}</p>
                         <p className="text-[10px] text-slate-400 font-medium">By {log.user?.name || 'System'}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-8 py-4 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-all">
                 Full Audit Trail
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
