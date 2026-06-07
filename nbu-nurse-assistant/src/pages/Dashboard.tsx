import React from 'react';
import { 
  Users, Activity, Beaker, ShieldCheck, TrendingUp, 
  Phone, ArrowRight, ClipboardCheck,
  Clock, Zap, BookOpen
} from 'lucide-react';
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
    { name: 'Live Cases', value: '24', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Critical Alerts', value: '03', icon: Activity, color: 'text-rose-600', bg: 'bg-rose-50' },
    { name: 'On CPAP / O2', value: '08', icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Safety Score', value: '98%', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Ward Command Center</h2>
          <p className="text-slate-500 font-medium">Real-time clinical intelligence and unit oversight.</p>
        </div>
        <div className="flex items-center space-x-3 bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
           <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg transition-all">Overview</button>
           <button className="px-4 py-2 text-slate-500 text-xs font-bold rounded-lg hover:bg-slate-50 transition-all">Analytics</button>
        </div>
      </div>

      {/* Emergency & Leadership Quick-Bar (High Fidelity) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm relative overflow-hidden group hover:border-emerald-200 transition-all">
           <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
              <div className="space-y-6">
                 <div className="flex items-center space-x-2 text-rose-600">
                    <div className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Active Emergencies</span>
                 </div>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="space-y-1">
                       <p className="text-2xl font-bold text-slate-900">03</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Critical <br /> Neonates</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-2xl font-bold text-slate-900">05</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Oxygen <br /> Therapy</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-2xl font-bold text-slate-900">03</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">CPAP <br /> Patients</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-2xl font-bold text-rose-600">04</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Pending <br /> Labs</p>
                    </div>
                 </div>
              </div>
              <div className="md:w-px md:h-24 bg-slate-100 hidden md:block" />
              <div className="space-y-4 min-w-[280px]">
                 <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Shift Leadership</p>
                 <div className="flex items-center justify-between group/lead cursor-pointer">
                    <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 font-bold text-xs border border-slate-200">TN</div>
                       <div>
                          <p className="text-sm font-bold text-slate-900 group-hover/lead:text-emerald-600 transition-colors">Teresa Njoroge</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Nursing In-Charge</p>
                       </div>
                    </div>
                    <a href="tel:+254712345678" className="p-2.5 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                       <Phone size={16} strokeWidth={2.5} />
                    </a>
                 </div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col justify-between shadow-xl shadow-slate-200">
           <div className="flex justify-between items-start">
              <div className="space-y-1">
                 <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">System Status</p>
                 <p className="text-2xl font-bold">Operational</p>
              </div>
              <ShieldCheck className="text-emerald-400" size={24} />
           </div>
           <div className="pt-8 space-y-4">
              <div className="flex justify-between text-xs font-medium">
                 <span className="text-slate-400">Clinical Uptime</span>
                 <span>99.98%</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 w-[99.9%]" />
              </div>
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                 Verify Audit Ledger
              </button>
           </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all group">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon size={24} />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.name}</p>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Clinical Workload Chart (Clean Professional) */}
          <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center space-x-3">
                 <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                    <TrendingUp size={18} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 tracking-tight">Ward Workload Analytics</h3>
              </div>
              <select className="bg-slate-50 border border-slate-200 text-[11px] font-bold uppercase tracking-widest rounded-lg px-3 py-1.5 outline-none">
                 <option>Last 24 Hours</option>
                 <option>Last 7 Days</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorWorkload" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#94a3b8" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                      color: '#0f172a'
                    }}
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

          {/* Recent Logs (Clean Professional) */}
          <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
               <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                     <ClipboardCheck size={18} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">Shift Verification Logs</h3>
               </div>
               <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-[0.15em] transition-colors">Audit All Records</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                    <th className="px-8 py-4">Timeline</th>
                    <th className="px-8 py-4">Clinician</th>
                    <th className="px-8 py-4">Clinical Action</th>
                    <th className="px-8 py-4 text-right">Integrity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="text-xs font-bold text-slate-700">08:45 AM</div>
                        <div className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">Today</div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center space-x-3">
                           <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">PK</div>
                           <div>
                              <div className="text-sm font-bold text-slate-900">Patrick Kamau</div>
                              <div className="text-[10px] text-slate-500 font-medium">Staff Nurse</div>
                           </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm text-slate-600 font-medium">Medication: Gentamicin 4.2mg</span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold border border-emerald-100 uppercase">Verified</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
           {/* Quick Actions (Mobbin Inspired) */}
           <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm space-y-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Quick Deployment</h4>
              <div className="grid grid-cols-1 gap-3">
                 <button className="flex items-center justify-between p-4 bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-100 rounded-2xl transition-all group/btn">
                    <div className="flex items-center space-x-3">
                       <div className="p-2 bg-white border border-slate-200 rounded-lg group-hover/btn:border-emerald-200 group-hover/btn:text-emerald-600">
                          <Clock size={16} />
                       </div>
                       <span className="text-sm font-bold text-slate-700">Start Handover</span>
                    </div>
                    <ArrowRight size={16} className="text-slate-300 group-hover/btn:text-emerald-600 group-hover/btn:translate-x-1 transition-all" />
                 </button>
                 <button className="flex items-center justify-between p-4 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-100 rounded-2xl transition-all group/btn">
                    <div className="flex items-center space-x-3">
                       <div className="p-2 bg-white border border-slate-200 rounded-lg group-hover/btn:border-blue-200 group-hover/btn:text-blue-600">
                          <Beaker size={16} />
                       </div>
                       <span className="text-sm font-bold text-slate-700">Drug Calculation</span>
                    </div>
                    <ArrowRight size={16} className="text-slate-300 group-hover/btn:text-blue-600 group-hover/btn:translate-x-1 transition-all" />
                 </button>
                 <button className="flex items-center justify-between p-4 bg-slate-50 hover:bg-purple-50 border border-slate-100 hover:border-purple-100 rounded-2xl transition-all group/btn">
                    <div className="flex items-center space-x-3">
                       <div className="p-2 bg-white border border-slate-200 rounded-lg group-hover/btn:border-purple-200 group-hover/btn:text-purple-600">
                          <Clock size={16} />
                       </div>
                       <span className="text-sm font-bold text-slate-700">Admission Portal</span>
                    </div>
                    <ArrowRight size={16} className="text-slate-300 group-hover/btn:text-purple-600 group-hover/btn:translate-x-1 transition-all" />
                 </button>
              </div>
           </div>

           {/* Unit Integrity Status (Professional Design) */}
           <div className="bg-emerald-600 rounded-[2rem] p-8 text-white space-y-6 shadow-lg shadow-emerald-100">
              <div className="space-y-2">
                 <h4 className="text-[11px] font-bold text-emerald-200 uppercase tracking-[0.2em]">Safety Protocol</h4>
                 <p className="text-xl font-bold leading-tight tracking-tight">Active Shift Verification Active</p>
              </div>
              <p className="text-sm text-emerald-50/80 font-medium leading-relaxed">
                 The v16.0 core is currently enforcing secondary clinician verification on all high-alert medications.
              </p>
              <div className="pt-2">
                 <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-white/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    <span>Compliance Confirmed</span>
                 </div>
              </div>
           </div>

           <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm flex items-center justify-between hover:border-emerald-500 transition-all cursor-pointer group">
              <div className="space-y-1">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Knowledge Hub</p>
                 <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">CPAP Protocol v16.42</p>
              </div>
              <BookOpen size={20} className="text-slate-300 group-hover:text-emerald-600 transition-all" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
