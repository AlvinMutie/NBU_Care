import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  ChevronRight, 
  FileText, 
  Wind, 
  Droplets, 
  Baby, 
  Activity, 
  Info,
  Clock,
  ExternalLink,
  Zap,
  CheckCircle2,
  AlertCircle,
  Database,
  ArrowLeft
} from 'lucide-react';

const PROTOCOLS = [
  {
    id: 'cpap',
    title: 'CPAP Support',
    category: 'Respiratory',
    icon: Wind,
    color: 'primary',
    content: `
      ### CPAP (Continuous Positive Airway Pressure)
      Used for neonates with respiratory distress syndrome (RDS) to maintain lung recruitment.

      #### Standard Settings:
      * **Pressure (PEEP):** 5-8 cm H2O
      * **FiO2:** Adjusted to maintain saturation 90-95%
      * **Flow Rate:** 6-10 L/min

      #### Monitoring Checklist:
      1. Ensure prongs are correctly positioned (avoid nasal septum pressure).
      2. Check for abdominal distension (CPAP belly).
      3. Monitor respiratory effort and saturation every 1-2 hours.
    `
  },
  {
    id: 'oxygen',
    title: 'Oxygen Therapy',
    category: 'Respiratory',
    icon: Droplets,
    color: 'teal',
    content: `
      ### Oxygen Therapy Protocol
      Guidelines for safe oxygen administration to prevent ROP (Retinopathy of Prematurity).

      #### Saturation Targets:
      * **Preterm (<32 weeks):** 90-94%
      * **Term Neonates:** 94-98%

      #### Delivery Methods:
      * **Nasal Cannula:** 0.1 - 2 L/min
      * **Headbox:** 5-10 L/min
      * **High Flow Nasal Cannula (HFNC):** 2-8 L/min
    `
  },
  {
    id: 'pediatrics',
    title: 'Basic Pediatrics',
    category: 'General',
    icon: Baby,
    color: 'amber',
    content: `
      ### Basic Pediatrics Protocol
      Core assessment principles for newborn care.

      #### Vitals Ranges (Term):
      * **Heart Rate:** 120-160 bpm
      * **Resp Rate:** 40-60 cpm
      * **Temperature:** 36.5-37.5 °C

      #### Danger Signs:
      * Poor feeding / lethargy
      * Convulsions
      * Severe chest indrawing
      * Fever (>38°C) or hypothermia (<35.5°C)
    `
  }
];

export default function KnowledgeHub() {
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProtocols = PROTOCOLS.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-10 bg-slate-50 dark:bg-slate-950 min-h-screen pb-32 text-left">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 dark:border-slate-800 pb-10">
           <div className="text-left">
              <div className="flex items-center gap-3 mb-2">
                 <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                   <BookOpen className="w-6 h-6" />
                 </div>
                 <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Clinical Knowledge Hub</h1>
              </div>
              <p className="text-sm lg:text-base text-slate-500 dark:text-slate-400 font-medium ml-1">Standardized NBU protocols and pediatric guidelines.</p>
           </div>
           
           {selectedProtocol && (
             <button 
               onClick={() => setSelectedProtocol(null)}
               className="lg:hidden flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest px-4 py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
             >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to list
             </button>
           )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Sidebar: Protocol List (Hidden on mobile if a protocol is selected) */}
           <div className={`lg:col-span-4 space-y-6 ${selectedProtocol ? 'hidden lg:block' : 'block'}`}>
              <div className="relative group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-600 group-focus-within:text-primary transition-colors" />
                 <input 
                   type="text" 
                   placeholder="Search protocols..." 
                   className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm font-black text-slate-900 dark:text-white"
                   value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value)}
                 />
              </div>

              <div className="space-y-3">
                 {filteredProtocols.map(p => (
                   <button
                     key={p.id}
                     onClick={() => setSelectedProtocol(p)}
                     className={`w-full p-6 rounded-[2.5rem] border transition-all flex items-center justify-between group active:scale-[0.98] ${
                       selectedProtocol?.id === p.id 
                         ? 'bg-slate-900 dark:bg-primary border-slate-900 dark:border-primary text-white shadow-xl shadow-slate-200/50 dark:shadow-none' 
                         : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary/30 dark:hover:border-primary/50 hover:shadow-md'
                     }`}
                   >
                     <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 shadow-inner ${
                          selectedProtocol?.id === p.id ? 'bg-white/10 border-white/20' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700'
                        }`}>
                           <p.icon className={`w-6 h-6 ${selectedProtocol?.id === p.id ? 'text-white' : 'text-primary'}`} />
                        </div>
                        <div className="text-left min-w-0">
                           <h3 className={`font-black text-sm tracking-tight truncate max-w-[140px] md:max-w-none ${selectedProtocol?.id === p.id ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{p.title}</h3>
                           <p className={`text-[10px] font-bold uppercase tracking-widest ${
                             selectedProtocol?.id === p.id ? 'text-white/50' : 'text-slate-400 dark:text-slate-500'
                           }`}>{p.category}</p>
                        </div>
                     </div>
                     <ChevronRight className={`w-5 h-5 transition-transform ${selectedProtocol?.id === p.id ? 'translate-x-1' : 'group-hover:translate-x-1 opacity-40'}`} />
                   </button>
                 ))}
              </div>

              <div className="p-8 rounded-[32px] bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/50 mt-10 text-left">
                 <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <h4 className="text-xs font-black text-amber-900 dark:text-amber-200 uppercase tracking-widest">Clinical Reminder</h4>
                 </div>
                 <p className="text-xs font-bold text-amber-700 dark:text-amber-400 leading-relaxed opacity-90">
                   Protocols provide a baseline. Bedside evaluation and senior consultation remain mandatory for all non-routine procedures.
                 </p>
              </div>
           </div>

           {/* Content Area */}
           <div className={`lg:col-span-8 ${!selectedProtocol ? 'hidden lg:flex' : 'block'}`}>
              {selectedProtocol ? (
                <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500 text-left">
                   <div className="p-8 lg:p-12 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between bg-slate-50/50 dark:bg-slate-950/30 gap-6">
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-center text-primary shrink-0">
                            <selectedProtocol.icon className="w-8 h-8" />
                         </div>
                         <div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-2">{selectedProtocol.title}</h2>
                            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{selectedProtocol.category} Protocol</span>
                         </div>
                      </div>
                      <button className="flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-primary hover:border-primary transition-all active:scale-95 shadow-sm">
                         <FileText className="w-4 h-4" /> Download PDF
                      </button>
                   </div>
                   
                   <div className="p-8 lg:p-12">
                      <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:font-bold prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-li:font-bold prose-li:text-slate-600 dark:prose-li:text-slate-400">
                         {selectedProtocol.content.split('\n').map((line, i) => {
                           if (line.trim() === '') return null;
                           if (line.startsWith('      ### ')) return <h3 key={i} className="text-2xl font-black text-slate-900 dark:text-white mt-8 mb-6 flex items-center gap-3"><div className="w-1.5 h-6 bg-primary rounded-full" /> {line.replace('      ### ', '')}</h3>;
                           if (line.startsWith('      #### ')) return <h4 key={i} className="text-lg font-black text-slate-800 dark:text-slate-200 mt-10 mb-4">{line.replace('      #### ', '')}</h4>;
                           if (line.startsWith('      * ')) return <li key={i} className="ml-6 list-disc mb-3 pl-2">{line.replace('      * ', '')}</li>;
                           if (line.match(/^\s+\d\./)) return <li key={i} className="ml-6 list-decimal mb-3 pl-2">{line.trim()}</li>;
                           return <p key={i} className="mb-6">{line.trim()}</p>;
                         })}
                      </div>

                      <div className="mt-12 pt-10 border-t border-slate-50 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-6">
                         <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-700 flex items-center gap-5">
                            <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-50 dark:border-slate-700">
                               <Clock className="w-6 h-6" />
                            </div>
                            <div>
                               <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1.5">Last Audited</p>
                               <p className="text-sm font-black text-slate-700 dark:text-slate-200">Oct 24, 2024</p>
                            </div>
                         </div>
                         <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-700 flex items-center gap-5">
                            <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm border border-slate-50 dark:border-slate-700">
                               <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div>
                               <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1.5">Verification</p>
                               <p className="text-sm font-black text-slate-700 dark:text-slate-200">Standard v4.8</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center justify-center text-center bg-white dark:bg-slate-900 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800 py-40 px-10">
                   <div className="w-24 h-24 bg-slate-50 dark:bg-slate-950 rounded-[40px] flex items-center justify-center text-slate-300 dark:text-slate-700 mb-10 shadow-inner border border-slate-100 dark:border-slate-800">
                      <BookOpen className="w-12 h-12" />
                   </div>
                   <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Select a Clinical Protocol</h2>
                   <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xs leading-relaxed">Choose a procedure from the archive to access deep clinical guidance and checklists.</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
