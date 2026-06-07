import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Activity, 
  Thermometer, Zap, GraduationCap,
  ClipboardList, Heart, Lock, ArrowRight,
  Stethoscope, UserCheck, BarChart3,
  Waves, Sun, Moon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../services/ThemeContext';

const Landing: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  // Mock Operational Data as per REQUEST.md
  const stats = [
    { label: 'Active Unit Occupancy', value: '42 / 50', sub: 'Cots Occupied', trend: '84% Capacity', icon: Stethoscope },
    { label: 'Acuity Status Summary', value: '12 Critical', sub: '18 High-Dep | 12 Stable', trend: 'Level 3 NICU', icon: Activity },
    { label: 'Active Unit Leadership', value: 'Dr. Alamin', sub: 'SN. Grace (Charge)', trend: 'Shift: 08:00 - 20:00', icon: UserCheck },
    { label: 'Global Safety Override', value: 'v16.2 Initialized', sub: 'Safety Protocol Active', trend: 'System: Secure', icon: ShieldCheck, status: 'emerald' },
  ];

  const weightBands = [
    { band: 'ELBW (<1000g)', count: 8, survival: '92.4%', infection: '1.2%' },
    { band: 'VLBW (1000g-1500g)', count: 14, survival: '96.1%', infection: '0.8%' },
    { band: 'LBW (1500g-2500g)', count: 20, survival: '99.2%', infection: '0.4%' },
  ];

  const respiratoryCensus = [
    { mode: 'Mechanical Ventilation', count: 6, status: 'Critical', icon: Activity },
    { mode: 'Bubble CPAP', count: 18, status: 'Serious', icon: Waves },
    { mode: 'Oxygen Therapy', count: 12, status: 'Stable', icon: Thermometer },
    { mode: 'Room Air', count: 6, status: 'Pre-Discharge', icon: Heart },
  ];

  type EquipmentItem = {
    name: string;
    available: number | string;
    total: number | string;
    pressure: string;
  };

  const equipmentRegistry: EquipmentItem[] = [
    { name: 'Radiant Warmers', available: 38, total: 42, pressure: 'Optimal' },
    { name: 'Phototherapy Lamps', available: 18, total: 24, pressure: 'Optimal' },
    { name: 'Pipeline Oxygen', available: 'Active', total: 'Pipeline', pressure: '4.2 Bar' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0f172a] text-[#0F172A] dark:text-slate-100 font-sans transition-colors duration-500 overflow-x-hidden scroll-smooth">
      {/* Institutional Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-xl flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
              <ShieldCheck className="text-white" size={22} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter uppercase leading-none">NeoDesk</span>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-1">Operational Command</span>
            </div>
          </Link>
        </div>
        
        <div className="flex items-center space-x-10">
           <div className="hidden lg:flex items-center space-x-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <a href="#demographics" className="hover:text-emerald-600 transition-colors">Demographics</a>
              <a href="#respiratory" className="hover:text-emerald-600 transition-colors">Respiratory</a>
              <a href="#registry" className="hover:text-emerald-600 transition-colors">Equipment</a>
           </div>
           <div className="flex items-center space-x-4">
              <button 
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
              <Link to="/login" className="bg-[#0F172A] dark:bg-emerald-600 text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">
                Secure Gateway
              </Link>
           </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24 space-y-12">
        
        {/* HERO OVERVIEW (Top Row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm relative overflow-hidden group hover:border-emerald-200 dark:hover:border-emerald-900/50 transition-all"
            >
              <div className="relative z-10 flex justify-between items-start mb-5">
                 <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 transition-colors">
                    <stat.icon size={24} />
                 </div>
                 <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${stat.status === 'emerald' ? 'bg-emerald-500 text-white animate-pulse' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700'}`}>
                    {stat.trend}
                 </div>
              </div>
              <div className="relative z-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black tracking-tighter text-[#0F172A] dark:text-white leading-none mb-1">{stat.value}</h3>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{stat.sub}</p>
              </div>
              {/* Capacity Bar for Card 1 */}
              {i === 0 && (
                <div className="mt-4 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[84%]" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CORE COMMAND SPLIT-GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMNS (Span 2) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Patient Demographics & Survival Indices */}
            <section id="demographics" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm scroll-mt-24">
               <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl text-emerald-600">
                       <BarChart3 size={20} />
                    </div>
                    <div>
                       <h2 className="text-xl font-black tracking-tight text-[#0F172A] dark:text-white">Patient Demographics & Survival Indices</h2>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Categorized by Birth Weight Bands</p>
                    </div>
                  </div>
                  <div className="hidden sm:block text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-xl">
                     Audit Protocol v16.2
                  </div>
               </div>
               <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 dark:bg-slate-800/30">
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Weight Band</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Active Census</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Survival Index</th>
                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Nosocomial Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {weightBands.map((w, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                           <td className="px-8 py-6">
                              <div className="font-black text-[#0F172A] dark:text-white tracking-tight">{w.band}</div>
                           </td>
                           <td className="px-8 py-6">
                              <div className="text-lg font-black text-slate-700 dark:text-slate-300">{w.count} Cases</div>
                           </td>
                           <td className="px-8 py-6">
                              <div className="inline-flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 px-3 py-1 rounded-lg text-xs font-black">
                                 <Activity size={12} />
                                 <span>{w.survival}</span>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <div className="text-sm font-bold text-rose-500 uppercase tracking-tighter">Rolling {w.infection}</div>
                           </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
            </section>

            {/* Respiratory Support Census Grid */}
            <div id="respiratory" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm scroll-mt-24">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 flex items-center space-x-3">
                     <Thermometer size={18} className="text-emerald-500" />
                     <span>Respiratory Support Census</span>
                  </h3>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {respiratoryCensus.map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 rounded-[1.5rem] border border-slate-100 dark:border-slate-700/50 group hover:border-emerald-300 transition-all">
                       <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors shadow-sm">
                             <r.icon size={20} />
                          </div>
                          <div>
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{r.mode}</p>
                             <p className="text-lg font-black text-[#0F172A] dark:text-white tracking-tight">{r.count} Devices</p>
                          </div>
                       </div>
                       <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                          r.status === 'Critical' ? 'text-rose-500 bg-rose-50 dark:bg-rose-900/20' : 
                          r.status === 'Serious' ? 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' :
                          'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                       }`}>
                          {r.status}
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Span 1) */}
          <div className="space-y-8">
            
            {/* Biomedical Engineering Equipment Registry */}
            <section id="registry" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm scroll-mt-24">
               <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center space-x-3">
                  <Zap size={18} className="text-amber-500" />
                  <span>Biomedical Registry</span>
               </h3>
               <div className="space-y-8">
                  {equipmentRegistry.map((eq, i) => (
                    <div key={i} className="space-y-3">
                       <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-[#0F172A] dark:text-white uppercase tracking-tight">{eq.name}</span>
                          <span className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em] bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-lg border border-emerald-100 dark:border-emerald-800">{eq.pressure}</span>
                       </div>
                       <div className="flex items-center space-x-4">
                          <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: (typeof eq.available === 'number' && typeof eq.total === 'number') ? `${(eq.available/eq.total)*100}%` : '100%' }}
                               transition={{ duration: 1.5, ease: "easeOut" }}
                               className="h-full bg-[#0F172A] dark:bg-emerald-500" 
                             />
                          </div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{eq.available} / {eq.total}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            {/* Academic Hub Registry */}
            <section className="bg-[#0F172A] dark:bg-slate-800/40 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <GraduationCap size={100} className="text-white" />
               </div>
               <div className="relative z-10 mb-10">
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-1">Knowledge Hub</p>
                  <h3 className="text-2xl font-black text-white tracking-tighter">Academic Hub Registry</h3>
               </div>
               <div className="space-y-6 relative z-10">
                  {[
                    { label: 'Active Clinician Sims', value: '14 Modules', icon: Activity },
                    { label: 'Student Progress Index', value: '82.4% Comp.', icon: ClipboardList },
                    { label: 'Shift Rota Coverage', value: '100% Active', icon: Heart },
                  ].map((ac, i) => (
                    <div key={i} className="flex items-center space-x-5 p-4 bg-white/5 rounded-2xl border border-white/5">
                       <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-500"><ac.icon size={20} /></div>
                       <div>
                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">{ac.label}</p>
                          <p className="text-sm font-black text-white tracking-tight leading-none">{ac.value}</p>
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-10 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-emerald-950/20 active:scale-95">
                  Access Institutional Academy
               </button>
            </section>

            {/* Secure Gateway Login Portal Shortcut */}
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm group hover:border-emerald-500/50 transition-all cursor-pointer">
               <Link to="/login" className="flex flex-col space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-[#0F172A] dark:bg-emerald-600 flex items-center justify-center text-white shadow-xl shadow-slate-200 dark:shadow-emerald-900/20 group-hover:scale-110 transition-transform">
                     <Lock size={28} />
                  </div>
                  <div>
                     <h3 className="text-2xl font-black text-[#0F172A] dark:text-white tracking-tighter uppercase">Secure Gateway</h3>
                     <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">Authorized Entry Portal</p>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-emerald-600 transition-colors">Initiate Auth Session</span>
                     <ArrowRight size={18} className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                  </div>
               </Link>
            </section>

          </div>
        </div>
      </main>

      {/* Footer - Legal & Versioning */}
      <footer id="contact" className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 py-16 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
           <div className="flex flex-col md:flex-row items-center gap-6">
              <span className="text-slate-900 dark:text-white">&copy; 2026 NeoDesk Clinical Systems</span>
              <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="flex items-center space-x-4">
                 <a href="#demographics" className="hover:text-emerald-600 transition-colors">Demographics</a>
                 <a href="#respiratory" className="hover:text-emerald-600 transition-colors">Respiratory</a>
                 <a href="#registry" className="hover:text-emerald-600 transition-colors">Equipment</a>
              </div>
           </div>
           <div className="flex items-center space-x-12">
              <span className="text-slate-400 dark:text-slate-700">Build: v16.2.844.STABLE</span>
              <span className="text-emerald-600/60 dark:text-emerald-500/30">AES-256 Validated Signature</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
