import React, { useState } from 'react';
import { 
  GraduationCap, PlayCircle, Search, 
  ShieldCheck, ChevronRight, FileText, 
  Activity, CheckCircle2, Bookmark, Clock, ArrowRight,
  Info, Zap, Droplets, Thermometer
} from 'lucide-react';
import { motion } from 'framer-motion';

const Academy: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const modules = [
    { title: 'Neonatal Resuscitation Protocol', category: 'Emergency', icon: PlayCircle, level: 'Advanced', duration: '45m', completed: true },
    { title: 'Continuous Positive Airway Pressure (CPAP)', category: 'Respiratory', icon: Activity, level: 'Intermediate', duration: '30m', completed: false },
    { title: 'Fluid Balance & Electrolyte Management', category: 'Clinical', icon: Droplets, level: 'Intermediate', duration: '25m', completed: false },
    { title: 'Advanced Oxygen Therapy Pathways', category: 'Respiratory', icon: Zap, level: 'Basic', duration: '15m', completed: true },
    { title: 'Thermal Chain & Baby Warm Care', category: 'Routine', icon: Thermometer, level: 'Basic', duration: '20m', completed: false },
    { title: 'Sepsis Identification & Management', category: 'Clinical', icon: ShieldCheck, level: 'Advanced', duration: '40m', completed: false },
  ];

  const categories = ['All', 'Emergency', 'Respiratory', 'Clinical', 'Routine'];

  const filteredModules = modules.filter(m => 
    (selectedCategory === 'All' || m.category === selectedCategory) &&
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-28">
      {/* Structural Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h2 className="text-3xl font-bold text-[var(--text-main)] tracking-tight">Institutional Knowledge Hub</h2>
          <p className="text-slate-500 font-medium max-w-xl">Standardized clinical protocols, bedside guides, and competency validation pathways.</p>
        </div>
        <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-2 px-5 rounded-2xl shadow-sm flex items-center space-x-3">
           <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center shadow-sm">
              <GraduationCap size={20} />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Your Progress</p>
              <p className="text-sm font-bold text-[var(--text-main)]">12 / 48 Modules</p>
           </div>
        </div>
      </div>

      {/* Modern Search & Filter Bar */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-2 rounded-2xl flex flex-col md:flex-row items-center gap-2 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input 
            type="text" 
            placeholder="Search protocols (e.g. CPAP, Sepsis, Resuscitation)..."
            className="w-full bg-transparent py-3.5 pl-12 pr-4 text-sm font-bold text-[var(--text-main)] outline-none placeholder:text-slate-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1 p-1 bg-[var(--bg-main)] rounded-xl w-full md:w-auto">
           {categories.map(cat => (
             <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-[var(--card-bg)] text-[var(--text-main)] shadow-sm border border-[var(--border-main)]' : 'text-slate-400 hover:text-slate-600'}`}
             >
                {cat}
             </button>
           ))}
        </div>
      </div>

      {/* Featured Protocol (REQUEST.md focus) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
         <div className="lg:col-span-8 space-y-8">
            <div className="bg-slate-900 dark:bg-slate-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl dark:shadow-none">
               <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                  <Activity size={300} />
               </div>
               <div className="relative z-10 space-y-8">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                     <Bookmark size={12} fill="currentColor" />
                     <span className="text-[10px] font-black uppercase tracking-widest">Featured High-Alert Protocol</span>
                  </div>
                  <div className="space-y-4">
                     <h3 className="text-4xl font-bold tracking-tight">CPAP Management & <br /> Respiratory Transitions</h3>
                     <p className="text-slate-400 text-lg max-w-xl font-normal leading-relaxed">
                        A comprehensive bedside guide for initializing, titrating, and weaning neonatal patients from CPAP support as per institutional v16.42 standards.
                     </p>
                  </div>
                  <div className="flex flex-wrap gap-8 items-center pt-4">
                     <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center"><Clock size={18} /></div>
                        <div><p className="text-[9px] font-bold text-slate-500 uppercase">Duration</p><p className="text-sm font-bold">30 Minutes</p></div>
                     </div>
                     <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center"><ShieldCheck size={18} /></div>
                        <div><p className="text-[9px] font-bold text-slate-500 uppercase">Validation</p><p className="text-sm font-bold">Required</p></div>
                     </div>
                     <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-2xl font-bold flex items-center space-x-3 shadow-xl transition-all">
                        <span>Initiate Module</span>
                        <ArrowRight size={20} />
                     </button>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {filteredModules.map((item, idx) => (
                 <motion.div 
                    layout
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-[var(--card-bg)] border border-[var(--border-main)] p-8 rounded-[2rem] shadow-sm hover:border-emerald-200 hover:shadow-md transition-all group flex flex-col justify-between h-72"
                 >
                    <div>
                       <div className="flex justify-between items-start mb-6">
                          <div className={`p-3 rounded-xl bg-[var(--bg-main)] text-slate-400 border border-[var(--border-main)] group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 group-hover:text-emerald-600 group-hover:border-emerald-100 dark:group-hover:border-emerald-800 transition-all duration-500`}>
                             <item.icon size={22} />
                          </div>
                          {item.completed ? (
                             <span className="flex items-center space-x-1 text-[9px] font-black uppercase text-emerald-600 tracking-widest"><CheckCircle2 size={12} /> <span>Mastered</span></span>
                          ) : (
                             <span className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">{item.level}</span>
                          )}
                       </div>
                       <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">{item.category}</p>
                       <h3 className="text-xl font-bold text-[var(--text-main)] tracking-tight leading-tight">{item.title}</h3>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-[var(--border-main)]">
                       <div className="flex items-center space-x-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                          <FileText size={12} />
                          <span>Bedside Guide</span>
                       </div>
                       <button className="text-slate-300 group-hover:text-emerald-600 transition-all">
                          <ChevronRight size={20} />
                       </button>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>

         {/* Sidebar: Knowledge Quick-Reference */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2.5rem] p-8 shadow-sm space-y-10">
               <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-[var(--border-main)] pb-4">Bedside Checklists</h4>
               <div className="space-y-8">
                  <div className="space-y-4">
                     <p className="text-xs font-black text-[var(--text-main)] uppercase tracking-widest flex items-center space-x-2">
                        <Zap size={14} className="text-emerald-600" />
                        <span>CPAP Initialization</span>
                     </p>
                     <ul className="space-y-3 pl-2">
                        {['Water level verification', 'Circuit integrity check', 'Nasal prong fitting', 'PEEP setting calibration'].map(i => (
                          <li key={i} className="flex items-center space-x-3 text-sm text-slate-500 font-medium">
                             <div className="w-1 h-1 rounded-full bg-emerald-500" />
                             <span>{i}</span>
                          </li>
                        ))}
                     </ul>
                  </div>
                  <div className="space-y-4">
                     <p className="text-xs font-black text-[var(--text-main)] uppercase tracking-widest flex items-center space-x-2">
                        <Info size={14} className="text-blue-600" />
                        <span>Oxygen Target Ranges</span>
                     </p>
                     <div className="p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl space-y-3">
                        <div className="flex justify-between text-[10px] font-black uppercase text-blue-700 dark:text-blue-400 tracking-widest">
                           <span>Condition</span>
                           <span>Target SpO2</span>
                        </div>
                        <div className="h-px bg-blue-100 dark:bg-blue-800" />
                        <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                           <span>Preterm (&lt; 32w)</span>
                           <span>91% - 95%</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                           <span>Term Infants</span>
                           <span>94% - 98%</span>
                        </div>
                     </div>
                  </div>
               </div>
               <button className="w-full py-4 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all">
                  Open Institutional Formulary
               </button>
            </div>

            <div className="bg-emerald-600 rounded-[2rem] p-8 text-white space-y-6 shadow-xl shadow-emerald-100 dark:shadow-none">
               <div className="flex items-center space-x-3 text-emerald-200">
                  <ShieldCheck size={20} />
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em]">Validated Protocols</h4>
               </div>
               <p className="text-sm font-medium leading-relaxed">
                  All clinical guides are reviewed semi-annually by the NeoDesk Clinical Compliance Board to ensure alignment with latest WHO standards.
               </p>
               <div className="pt-2">
                  <p className="text-[10px] font-black text-emerald-300 uppercase tracking-widest">Version: 16.0.42</p>
               </div>
            </div>
         </div>
      </div>

      {/* Legal Forensic Footer */}
      <footer className="pt-12 border-t border-[var(--border-main)] flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
         <div>Protocol Library ID: ND-HQ-LIB-2026-6C</div>
         <div className="flex items-center space-x-4">
            <span className="text-emerald-600 font-black">Secure. Validated. Verified.</span>
         </div>
      </footer>
    </div>
  );
};

export default Academy;
