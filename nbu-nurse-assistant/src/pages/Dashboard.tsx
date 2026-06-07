import React from 'react';
import { Users, Activity, Beaker, ShieldCheck, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '00:00', workload: 12 },
  { name: '04:00', workload: 15 },
  { name: '08:00', workload: 28 },
  { name: '12:00', workload: 22 },
  { name: '16:00', workload: 32 },
  { name: '20:00', workload: 25 },
  { name: '23:59', workload: 18 },
];

const Dashboard: React.FC = () => {
  const stats = [
    { name: 'Live Cases', value: '24', icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
    { name: 'Critical Alerts', value: '3', icon: Activity, color: 'text-red-400', bg: 'bg-red-500/20' },
    { name: 'Calculations', value: '156', icon: Beaker, color: 'text-amber-400', bg: 'bg-amber-500/20' },
    { name: 'Safety Score', value: '98%', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Emergency Command Center */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 glass-card p-6 border-l-4 border-red-500 bg-red-500/5 relative overflow-hidden group">
           <ShieldCheck className="absolute -right-8 -bottom-8 text-white/[0.02] -rotate-12 group-hover:scale-110 transition-transform" size={200} />
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-4">
                 <div className="flex items-center space-x-2 text-red-400">
                    <Activity size={20} className="animate-pulse" />
                    <h2 className="text-xl font-bold uppercase tracking-widest">Emergency Command Center</h2>
                 </div>
                 <div className="flex flex-wrap gap-3">
                    <div className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20">
                       <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Critical Patients</p>
                       <p className="text-2xl font-bold text-slate-100">03</p>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                       <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">On CPAP/O2</p>
                       <p className="text-2xl font-bold text-slate-100">08</p>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                       <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Pending Labs</p>
                       <p className="text-2xl font-bold text-slate-100">05</p>
                    </div>
                 </div>
              </div>
              <div className="flex flex-col space-y-3 min-w-[240px]">
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Shift Lead Contact</p>
                 <div className="glass-card p-3 flex items-center justify-between border-white/10 hover:border-emerald-500/30 transition-all cursor-pointer group/call">
                    <div className="flex items-center space-x-3">
                       <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">TN</div>
                       <div>
                          <p className="text-xs font-bold text-slate-200">Teresa Njoroge</p>
                          <p className="text-[8px] text-slate-500 font-bold uppercase">Nursing In-Charge</p>
                       </div>
                    </div>
                    <button className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover/call:bg-emerald-500 group-hover/call:text-white transition-all">
                       <TrendingUp size={14} className="rotate-90" />
                    </button>
                 </div>
              </div>
           </div>
        </div>

        <div className="xl:col-span-1 glass-card p-6 flex flex-col justify-center space-y-4 bg-emerald-500/5">
           <div className="flex items-center space-x-2 text-emerald-400">
              <ShieldCheck size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">System Integrity</span>
           </div>
           <div>
              <p className="text-3xl font-bold text-slate-100">99.9%</p>
              <p className="text-xs text-slate-500 font-medium">Uptime & Accuracy</p>
           </div>
           <button className="w-full py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[10px] font-bold text-emerald-400 uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">
              View Audit Ledger
           </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Ward Overview</h2>
          <p className="text-slate-400">Real-time clinical metrics and unit status.</p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">System Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="stat-card p-5 sm:p-6 group hover:border-white/30 transition-all">
            <div className={`p-3 rounded-full ${stat.bg} ${stat.color} mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon size={28} />
            </div>
            <p className="text-sm font-medium text-slate-400">{stat.name}</p>
            <p className="text-3xl font-bold text-slate-100">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Clinical Workload Trend Chart */}
      <div className="glass-card p-6">
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="text-emerald-400" size={20} />
          <h3 className="text-xl font-bold text-slate-100">Ward Workload Trend</h3>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorWorkload" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#f1f5f9'
                }}
                itemStyle={{ color: '#10b981' }}
              />
              <Area 
                type="monotone" 
                dataKey="workload" 
                stroke="#10b981" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorWorkload)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-100">Recent Shift Logs</h3>
            <button className="text-xs font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-widest transition-colors">View All</button>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-sm">
                  <th className="pb-4 font-medium">Time</th>
                  <th className="pb-4 font-medium">Clinician</th>
                  <th className="pb-4 font-medium">Action</th>
                  <th className="pb-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                    <td className="py-4 text-slate-400 font-mono">08:45 AM</td>
                    <td className="py-4">
                      <div className="font-medium text-slate-100 group-hover:text-emerald-400 transition-colors">Patrick Kamau</div>
                      <div className="text-xs text-slate-500">Staff Nurse</div>
                    </td>
                    <td className="py-4 text-slate-300">Dose Calculation: Dopamine</td>
                    <td className="py-4 text-right">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 uppercase tracking-tight">
                        Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Log Cards */}
          <div className="sm:hidden space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="font-mono text-xs text-slate-400">08:45 AM</div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 uppercase">
                    Verified
                  </span>
                </div>
                <div>
                  <div className="font-medium text-slate-100">Patrick Kamau</div>
                  <div className="text-xs text-slate-500">Staff Nurse</div>
                </div>
                <div className="text-sm text-slate-300 bg-black/20 p-2 rounded-lg border border-white/5">
                  Dose Calculation: Dopamine
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 border-l-4 border-amber-500">
            <h3 className="text-lg font-bold text-slate-100 mb-2">Pending Verifications</h3>
            <p className="text-sm text-slate-400 mb-4">3 new clinical staff members are awaiting approval.</p>
            <button className="text-amber-400 hover:text-amber-300 font-medium text-sm flex items-center space-x-2">
              <span>Review Requests</span>
              <span>&rarr;</span>
            </button>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-slate-100 mb-4">Ward Statistics</h3>
            <div className="space-y-4">
              {[
                { label: 'Bed Occupancy', value: 85 },
                { label: 'Critical Care Ratio', value: 30 },
                { label: 'Medication Accuracy', value: 100 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="text-slate-100 font-medium">{item.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500" 
                      style={{ width: `${item.value}%` }}
                    />
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

export default Dashboard;
