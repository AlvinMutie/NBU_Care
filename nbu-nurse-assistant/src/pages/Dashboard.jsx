import React, { useState, useEffect } from 'react';
import { 
  Activity, Calculator, Droplets, Zap, ArrowRight,
  Users, ShieldAlert, GraduationCap, Clock, FileText,
  Activity as ActivityIcon, HeartPulse, Stethoscope, ChevronRight,
  Database, ShieldCheck, AlertCircle
} from 'lucide-react';
import { api } from '../services/api';

// --- SHARED COMPONENTS ---

const StatCard = ({ title, value, icon: Icon, colorClass, highlight, trend }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all group">
     <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass} transition-transform group-hover:scale-110`}>
           <Icon className="w-5 h-5" />
        </div>
        {highlight && (
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
          </div>
        )}
     </div>
     <div className="flex items-end justify-between">
        <div>
           <h3 className="text-2xl font-bold text-slate-900 leading-none">{value}</h3>
           <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">{title}</p>
        </div>
        {trend && (
           <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded leading-none">+{trend}%</span>
        )}
     </div>
  </div>
);

// --- ROLE-SPECIFIC VIEWS ---

const AdminDashboard = ({ stats, loading }) => (
  <div className="space-y-6">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
       <div>
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Unit Overview</h2>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">How our unit is doing</h1>
          <p className="text-sm text-slate-500 mt-1">A live look at our nursing tools and team progress.</p>
       </div>
       <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-2">
             <Clock className="w-3.5 h-3.5" /> Shift 2A
          </div>
          <button className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-lg shadow-sm hover:bg-primary-dark transition-colors">
             Export Records
          </button>
       </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Team Members" value={loading ? '...' : stats.users} icon={Users} colorClass="bg-indigo-50 text-indigo-600" trend="2.4" />
      <StatCard title="Procedure Cards" value={loading ? '...' : stats.flashcards} icon={FileText} colorClass="bg-teal-50 text-teal-600" />
      <StatCard title="Learning Cases" value={loading ? '...' : stats.scenarios} icon={GraduationCap} colorClass="bg-amber-50 text-amber-600" />
      <StatCard title="Tools Online" value="14" icon={ShieldCheck} colorClass="bg-primary/10 text-primary" highlight />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-tiny overflow-hidden flex flex-col h-full">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
             <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ActivityIcon className="w-4 h-4 text-primary" /> Recent Calculations
             </h3>
             <button className="text-xs font-bold text-primary hover:underline transition-all">View All</button>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50">
                  <th className="px-5 py-3 font-bold">What was done</th>
                  <th className="px-5 py-3 font-bold">Done By</th>
                  <th className="px-5 py-3 font-bold">Status</th>
                  <th className="px-5 py-3 font-bold text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { action: 'IV Fluids: 1.4kg baby', by: 'Nurse Joy', time: '2m ago', status: 'Checked', type: 'Fluids' },
                  { action: 'Gentamicin: 2.1kg baby', by: 'Nurse Amina', time: '18m ago', status: 'Checked', type: 'Meds' },
                  { action: 'Daily TPN: 3.2kg baby', by: 'Dr. Sarah', time: '45m ago', status: 'Checked', type: 'Nutrition' },
                  { action: 'Emergency Bolus: 3.5kg', by: 'Nurse Joy', time: '1h ago', status: 'Review', type: 'Urgent' },
                ].map((log, i) => (
                  <tr key={i} className="group hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className="px-5 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 tracking-tight">{log.action}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{log.type} Tool</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-600">{log.by}</td>
                    <td className="px-5 py-4">
                      {log.status === 'Checked' ? <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md border border-emerald-100">Checked</span> : 
                       log.status === 'Review' ? <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-md border border-rose-100">Needs Review</span> :
                       <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-md border border-amber-100">Waiting</span>}
                    </td>
                    <td className="px-5 py-4 text-xs font-bold text-slate-400 text-right">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="space-y-4">
         <div className="bg-slate-900 rounded-xl p-5 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/4 group-hover:scale-150 transition-transform duration-1000" />
            <div className="relative z-10">
               <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-primary border border-white/5">
                    <Database className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">System Status</span>
               </div>
               <h4 className="text-white font-bold text-sm mb-1 tracking-tight">App Health</h4>
               <p className="text-xs text-slate-400 mb-6 leading-relaxed">Guidelines are up to date and verified.</p>
               <div className="space-y-2">
                 <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                   <span>Stability</span>
                   <span className="text-primary font-black">99.9%</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="w-[99.9%] h-full bg-primary shadow-[0_0_10px_rgba(13,148,136,0.5)]" />
                 </div>
               </div>
            </div>
         </div>

         <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-tiny">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Things to do</h4>
            <div className="space-y-3">
               {[
                 { t: 'Check Nurse Schedule', s: 'Done', c: 'emerald' },
                 { t: 'Audit Bedside Tools', s: 'In Progress', c: 'primary' },
                 { t: 'Review Emergency Doses', s: '1 Flagged', c: 'rose' },
               ].map((task, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-50 hover:border-slate-100 transition-all cursor-pointer group">
                   <span className="text-xs font-bold text-slate-700 tracking-tight">{task.t}</span>
                   <ChevronRight className={`w-3.5 h-3.5 text-${task.c}-500 opacity-0 group-hover:opacity-100 transition-all`} />
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  </div>
);

const ClinicalDashboard = () => (
  <div className="space-y-8">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
       <div>
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-1">My Tools</h2>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome to NeoDesk</h1>
          <p className="text-sm text-slate-500 mt-1">Use our friendly tools to help with doses and fluid rates.</p>
       </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { t: "Fluid Help", d: "Calculate IV fluid rates.", icon: Droplets, c: "primary", h: "bg-primary/10", tCol: "text-primary" },
        { t: "Quick Doses", d: "For urgent medications.", icon: Zap, c: "rose", h: "bg-rose-50", tCol: "text-rose-500" },
        { t: "Our Guidelines", d: "Neonatal care pathways.", icon: Activity, c: "teal", h: "bg-teal-50", tCol: "text-teal-600" },
        { t: "Nutrition Tool", d: "Help with TPN math.", icon: Calculator, c: "indigo", h: "bg-indigo-50", tCol: "text-indigo-600" }
      ].map((module, i) => (
        <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group flex flex-col items-start min-h-[160px]">
           <div className={`w-10 h-10 ${module.h} ${module.tCol} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <module.icon className="w-5 h-5" />
           </div>
           <h3 className="text-sm font-bold text-slate-900 mb-1">{module.t}</h3>
           <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-4">{module.d}</p>
           <div className={`mt-auto flex items-center gap-1.5 ${module.tCol} text-[10px] font-bold uppercase tracking-widest group-hover:gap-2.5 transition-all`}>
              Open Tool <ArrowRight className="w-3.5 h-3.5" />
           </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
             <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Important Notices</h3>
             <span className="text-[10px] font-bold text-slate-400">Ref: UN-24-99</span>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-tiny overflow-hidden flex flex-col">
            {[
              { title: 'Helping Babies Breathe', type: 'Clinical Guideline', icon: ShieldAlert, color: 'rose', status: 'Important' },
              { title: 'KMC Procedure Update', type: 'Daily Routine', icon: HeartPulse, color: 'teal', status: 'Standard' },
              { title: 'Medication Handover Policy', type: 'Unit Update', icon: Stethoscope, color: 'indigo', status: 'New' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors cursor-pointer border-b last:border-0 border-slate-100 group">
                <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-lg bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center border border-${item.color}-100`}>
                      <item.icon className="w-5 h-5" />
                   </div>
                   <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="text-xs font-medium text-slate-500">{item.type} • V2.4</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <span className={`px-2 py-0.5 bg-${item.color}-50 text-${item.color}-600 text-[9px] font-bold rounded uppercase tracking-wider`}>{item.status}</span>
                   <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>
       </div>

       <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Your Impact</h3>
          <div className="bg-indigo-600 text-white rounded-xl p-6 shadow-md relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 group-hover:scale-125 transition-transform duration-1000" />
             <div className="relative z-10 flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest leading-none">Your Daily Help</span>
                   <h4 className="text-3xl font-black tracking-tight flex items-center gap-2">
                     12 <span className="text-sm font-bold opacity-60">Calculations</span>
                   </h4>
                </div>
                <div className="p-4 bg-white/10 rounded-lg border border-white/10 backdrop-blur-sm">
                   <p className="text-[10px] font-medium leading-relaxed text-indigo-50">
                     "Every precise calculation helps keep our newborns safe. Thank you for all you do."
                   </p>
                </div>
                <button className="bg-white text-indigo-600 font-bold text-[10px] uppercase tracking-widest py-2 px-4 rounded-lg transition-all hover:bg-slate-50 shadow-sm active:scale-95">
                   View History
                </button>
             </div>
          </div>
       </div>
    </div>
  </div>
);

// --- MAIN WRAPPER ---

export default function Dashboard({ user }) {
  const [stats, setStats] = useState({ users: 0, flashcards: 0, scenarios: 0 });
  const [loading, setLoading] = useState(true);

  const isAdminView = user?.role === 'Nursing In-Charge' || user?.role === 'Consultant Pediatrician';

  useEffect(() => {
    if (isAdminView) {
      const fetchStats = async () => {
        try {
          const res = await api.getStats();
          if (res.success) {
             setStats(res.data);
          }
        } catch (err) {
          console.error('Stats fetch failed', err);
        } finally {
          setLoading(false);
        }
      };
      fetchStats();
    }
  }, [isAdminView]);

  return (
    <div className="max-w-[1200px] mx-auto w-full p-8 pb-32">
      {user?.role === 'Student' && (
        <div className="mb-8 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between shadow-tiny">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white border border-amber-200 rounded-lg flex items-center justify-center text-amber-600 shadow-sm">
                 <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                 <h4 className="text-sm font-bold text-amber-900 tracking-tight">Practice Mode Active</h4>
                 <p className="text-xs text-amber-700 font-medium opacity-80">You can practice here safely. These won't be saved to the main shift records.</p>
              </div>
           </div>
           <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-lg uppercase tracking-widest">
              <AlertCircle className="w-3.5 h-3.5" /> No Logs
           </div>
        </div>
      )}

      {isAdminView ? <AdminDashboard stats={stats} loading={loading} /> : <ClinicalDashboard />}
    </div>
  );
}
