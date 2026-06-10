import React, { useState, useEffect } from 'react';
import { 
  Users, Activity, Beaker, ShieldCheck, TrendingUp, 
  Phone, ArrowRight, ClipboardCheck,
  Clock, Zap, BookOpen, BarChart3, PieChart, RefreshCcw, AlertCircle,
  GraduationCap, CheckCircle2, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart as RePieChart, Pie, Cell
} from 'recharts';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total_staff: 0,
    live_cases: 0,
    doses_given: 0
  });
  const [alerts, setAlerts] = useState<any[]>([]);
  const [recentLogs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const user = JSON.parse(localStorage.getItem('user_data') || '{}');
  const isStudent = user.role === 'Student';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, logsRes, alertsRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/logs/recent'),
        api.get('/admin/alerts')
      ]);
      setStats(statsRes.data.data);
      setLogs(logsRes.data.data);
      setAlerts(alertsRes.data.data);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEndShift = () => {
    if (window.confirm('Terminate active clinical session and log out?')) {
       localStorage.removeItem('auth_token');
       localStorage.removeItem('user_data');
       navigate('/');
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

  const unitActivityData = [
    { time: '08:00', load: 45 }, { time: '10:00', load: 52 },
    { time: '12:00', load: 48 }, { time: '14:00', load: 61 },
    { time: '16:00', load: 55 }, { time: '18:00', load: 67 },
    { time: '20:00', load: 58 },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-28 text-[var(--text-main)]">
      {/* Header with New Ward Load Infographic */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{isStudent ? 'Learning Command' : 'Command Center'}</h2>
          <p className="text-slate-500 font-medium tracking-tight">
             {isStudent ? 'Your clinical competency and study progress overview.' : 'Real-time clinical orchestration and ward monitoring.'}
          </p>
        </div>
        
        <div className="flex items-center gap-6 bg-[var(--card-bg)] border border-[var(--border-main)] p-3 px-6 rounded-3xl shadow-sm">
           <div className="flex flex-col">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Ward Load Index</p>
              <div className="flex items-center space-x-3">
                 <span className="text-xl font-black text-[var(--text-main)]">67.4%</span>
                 <div className="w-24 h-8">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={unitActivityData}>
                          <Area type="monotone" dataKey="load" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>
           <div className="w-px h-10 bg-[var(--border-main)]" />
           <button onClick={fetchDashboardData} className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
              <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
           <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
              {[
                { label: isStudent ? 'Academy Modules' : 'Live Cases', value: isStudent ? '24' : stats.live_cases, icon: isStudent ? GraduationCap : Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: isStudent ? 'Study Hours' : 'Active Staff', value: isStudent ? '12.5' : stats.total_staff, icon: isStudent ? Clock : Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: isStudent ? 'Tests Taken' : (user.role === 'Nursing In-Charge' ? 'Doses Given' : 'Meds Audit'), value: isStudent ? '8' : stats.doses_given, icon: isStudent ? ClipboardCheck : Beaker, color: 'text-rose-600', bg: 'bg-rose-50' },
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

           {isStudent ? (
             <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                   <BookOpen size={300} />
                </div>
                <div className="relative z-10 space-y-8">
                   <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                      <Zap size={12} fill="currentColor" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Recommended Study Module</span>
                   </div>
                   <div className="space-y-3">
                      <h3 className="text-3xl font-bold tracking-tight">Neonatal Resuscitation <br /> Protocols (v16.0)</h3>
                      <p className="text-slate-400 text-sm max-w-lg font-medium leading-relaxed">
                         Master the latest evidence-based resuscitation guidelines for extremely preterm neonates.
                      </p>
                   </div>
                   <Link to="/academy" className="inline-flex items-center space-x-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-xl shadow-emerald-500/20 active:scale-95">
                      <span>Enter Academy</span>
                      <ArrowRight size={18} />
                   </Link>
                </div>
             </div>
           ) : (
             <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[3rem] p-8 shadow-sm overflow-hidden">
                <div className="space-y-6">
                   <div className="flex items-center space-x-3 text-rose-600">
                      <AlertCircle size={20} />
                      <h3 className="text-xl font-bold tracking-tight">Active Ward Alerts</h3>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {alerts.length === 0 ? (
                        <div className="col-span-full p-8 text-center bg-[var(--bg-main)] rounded-2xl border border-dashed border-[var(--border-main)]">
                           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No Active Critical Flags</p>
                        </div>
                      ) : alerts.map((alert, i) => (
                        <div 
                         key={i} 
                         onClick={() => navigate(`/neonates/${alert.id}`)}
                         className="p-4 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl flex items-center justify-between hover:border-rose-200 transition-all cursor-pointer group/alert"
                        >
                           <div className="flex items-center space-x-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-[10px] ${alert.type === 'Critical' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>
                                 {alert.baby.split(' ')[0][0]}
                              </div>
                              <div>
                                 <p className="text-xs font-bold group-hover/alert:text-emerald-600 transition-colors">{alert.baby}</p>
                                 <p className="text-[10px] text-slate-500 font-medium">{alert.alert}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{alert.time}</p>
                              <ChevronRight size={14} className="text-slate-300 group-hover/alert:translate-x-1 transition-all ml-auto mt-1" />
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
           )}
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className={`bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group`}>
              <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:rotate-12 transition-transform duration-700">
                 {isStudent ? <GraduationCap size={140} /> : <Zap size={140} />}
              </div>
              <div className="space-y-6 relative z-10">
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em]">{isStudent ? 'Current Objective' : 'Current Assignment'}</p>
                    <h4 className="text-2xl font-black tracking-tight">{isStudent ? 'Clinical Intern' : 'Unit Command'}</h4>
                 </div>
                 <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    Account: {user.name}<br/>
                    Role: {user.role}
                 </p>
                 <div className="pt-2">
                    <button 
                      onClick={handleEndShift}
                      className="px-6 py-2.5 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                    >
                       {isStudent ? 'Update Study Goal' : 'End Active Shift'}
                    </button>
                 </div>
              </div>
           </div>

           {user.role !== 'Nursing In-Charge' && (
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
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
