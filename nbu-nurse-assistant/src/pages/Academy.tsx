import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, PlayCircle, Search, 
  ShieldCheck, ChevronRight, FileText, 
  Activity, CheckCircle2, Bookmark, Clock, ArrowRight,
  Info, Zap, Droplets, Thermometer
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const Academy: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    setLoading(true);
    try {
      const [flashRes, scenariosRes] = await Promise.all([
        api.get('/learning/flashcards'),
        api.get('/learning/scenarios')
      ]);
      
      const mappedModules = [
        ...flashRes.data.data.map((f: any) => ({ 
          ...f, 
          title: f.title, 
          category: f.category || 'Clinical Quiz', 
          icon: Zap, 
          level: 'Essential',
          completed: false 
        })),
        ...scenariosRes.data.data.map((s: any) => ({ 
          ...s, 
          category: 'Bedside Simulation', 
          icon: Activity, 
          level: 'Advanced',
          completed: false
        }))
      ];
      setModules(mappedModules);
    } catch (err) {
      console.error('Failed to fetch modules:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Clinical Quiz', 'Bedside Simulation', 'Respiratory', 'Emergency'];

  const filteredModules = modules.filter(m => 
    (selectedCategory === 'All' || m.category === selectedCategory) &&
    (m.title.toLowerCase().includes(searchTerm.toLowerCase()) || m.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading && modules.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4 text-slate-400">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest">Opening Protocol Library...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-28 text-[var(--text-main)]">
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
              <p className="text-sm font-bold text-[var(--text-main)]">{modules.filter(m => m.completed).length} / {modules.length} Modules</p>
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

      {/* Featured Protocol */}
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

         {/* Sidebar */}
         <div className="lg:col-span-4 space-y-8">
            <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2.5rem] p-8 shadow-sm space-y-10 text-[var(--text-main)]">
               <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-[var(--border-main)] pb-4">Bedside Checklists</h4>
               <div className="space-y-8">
                  <div className="space-y-4">
                     <p className="text-xs font-black text-[var(--text-main)] uppercase tracking-widest flex items-center space-x-2">
                        <Zap size={14} className="text-emerald-600" />
                        <span>CPAP Initialization</span>
                     </p>
                     <ul className="space-y-3 pl-2 text-slate-500">
                        {['Water level verification', 'Circuit integrity check', 'Nasal prong fitting', 'PEEP setting calibration'].map(i => (
                          <li key={i} className="flex items-center space-x-3 text-sm font-medium">
                             <div className="w-1 h-1 rounded-full bg-emerald-500" />
                             <span>{i}</span>
                          </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Footer */}
      <footer className="pt-12 border-t border-[var(--border-main)] flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
         <div>Protocol Library ID: ND-HQ-LIB-2026-6C</div>
         <span className="text-emerald-600 font-black">Secure. Validated. Verified.</span>
      </footer>
    </div>
  );
};

export default Academy;
