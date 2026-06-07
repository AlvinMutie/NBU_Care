import React, { useState } from 'react';
import { BookOpen, GraduationCap, PlayCircle, Search, Filter, ShieldCheck, ChevronRight, FileText, Activity } from 'lucide-react';

const Academy: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const modules = [
    { title: 'Neonatal Resuscitation', category: 'Emergency', icon: PlayCircle, level: 'Advanced', duration: '45m' },
    { title: 'CPAP Management', category: 'Respiratory', icon: Activity, level: 'Intermediate', duration: '30m' },
    { title: 'Fluid Balance Protocols', category: 'Clinical', icon: GraduationCap, level: 'Basic', duration: '20m' },
    { title: 'Oxygen Therapy Pathways', category: 'Respiratory', icon: BookOpen, level: 'Basic', duration: '15m' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Clinical Academy</h2>
          <p className="text-slate-400">Standardized educational protocols and competency validation.</p>
        </div>
        <div className="flex items-center space-x-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">
           <ShieldCheck className="text-emerald-400" size={20} />
           <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Your Status</p>
              <p className="text-xs font-bold text-emerald-500">Fully Validated</p>
           </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search clinical protocols, CPAP, Resuscitation..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="glass-card px-6 py-3.5 flex items-center justify-center space-x-2 text-slate-400 hover:text-white transition-all border-white/10">
          <Filter size={18} />
          <span className="font-bold text-sm tracking-wide">Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((item) => (
          <div key={item.title} className="glass-card p-6 group hover:border-emerald-500/30 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-64">
            <div className="absolute -right-4 -top-4 p-8 text-white/[0.03] group-hover:scale-110 group-hover:text-emerald-500/10 transition-all">
               <item.icon size={120} />
            </div>
            
            <div className="relative z-10">
               <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <item.icon size={24} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-lg bg-black/20">{item.level}</span>
               </div>
               <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">{item.category}</p>
               <h3 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">{item.title}</h3>
            </div>

            <div className="flex items-center justify-between relative z-10">
               <div className="flex items-center space-x-2 text-slate-500 text-xs font-medium">
                  <FileText size={14} />
                  <span>{item.duration} Module</span>
               </div>
               <button className="text-xs font-bold text-slate-400 group-hover:text-emerald-400 transition-colors uppercase tracking-widest flex items-center space-x-1">
                  <span>Start</span>
                  <ChevronRight size={14} />
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Protocol Reference Preview */}
      <div className="glass-card p-8 border-l-4 border-blue-500 bg-blue-500/5">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4">
               <div className="flex items-center space-x-2 text-blue-400">
                  <BookOpen size={20} />
                  <h3 className="text-lg font-bold uppercase tracking-widest">Active Knowledge Hub: CPAP Management</h3>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-400 font-medium">
                  <li className="list-none flex items-center space-x-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                     <span>Initial PEEP setting: 5-8 cmH2O</span>
                  </li>
                  <li className="list-none flex items-center space-x-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                     <span>FiO2 titration targets: 88-92% SpO2</span>
                  </li>
                  <li className="list-none flex items-center space-x-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                     <span>Pressure relief valve validation</span>
                  </li>
                  <li className="list-none flex items-center space-x-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                     <span>Nasal prong size verification</span>
                  </li>
               </div>
            </div>
            <button className="px-8 py-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs font-bold text-blue-400 uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all whitespace-nowrap">
               Open Full Protocol
            </button>
         </div>
      </div>

      {/* Forensic Legal Footer */}
      <footer className="pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">
         <div>Protocol Library Version: 16.0.42 (Released June 2026)</div>
         <div>Validated by NeoDesk Clinical Compliance Committee</div>
      </footer>
    </div>
  );
};

export default Academy;

