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
  AlertCircle
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
    <div className="p-4 lg:p-10 bg-slate-50 min-h-screen pb-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
           <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <BookOpen className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Clinical Knowledge Hub</h1>
           </div>
           <p className="text-slate-500 font-medium">Standardized NBU protocols and pediatric guidelines.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Sidebar: Protocol List */}
           <div className="lg:col-span-4 space-y-6">
              <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Search protocols..." 
                   className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-100 shadow-sm focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm font-bold"
                   value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value)}
                 />
              </div>

              <div className="space-y-3">
                 {filteredProtocols.map(p => (
                   <button
                     key={p.id}
                     onClick={() => setSelectedProtocol(p)}
                     className={`w-full p-6 rounded-[2rem] border transition-all flex items-center justify-between group ${
                       selectedProtocol?.id === p.id 
                         ? 'bg-slate-900 border-slate-900 text-white shadow-xl' 
                         : 'bg-white border-slate-100 text-slate-600 hover:border-primary/30'
                     }`}
                   >
                     <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          selectedProtocol?.id === p.id ? 'bg-white/10' : 'bg-slate-50'
                        }`}>
                           <p.icon className={`w-6 h-6 ${selectedProtocol?.id === p.id ? 'text-white' : 'text-primary'}`} />
                        </div>
                        <div className="text-left">
                           <h3 className="font-black text-sm tracking-tight">{p.title}</h3>
                           <p className={`text-[10px] font-bold uppercase tracking-widest ${
                             selectedProtocol?.id === p.id ? 'text-white/50' : 'text-slate-400'
                           }`}>{p.category}</p>
                        </div>
                     </div>
                     <ChevronRight className={`w-5 h-5 transition-transform ${selectedProtocol?.id === p.id ? 'translate-x-1' : 'group-hover:translate-x-1'}`} />
                   </button>
                 ))}
              </div>

              <div className="p-8 rounded-[2.5rem] bg-amber-50 border border-amber-100 mt-10">
                 <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <h4 className="text-xs font-black text-amber-900 uppercase tracking-widest">Safety Reminder</h4>
                 </div>
                 <p className="text-xs font-bold text-amber-700 leading-relaxed">
                   Protocols are for guidance only. Clinical judgement and senior consultation are mandatory for critical decisions.
                 </p>
              </div>
           </div>

           {/* Content Area */}
           <div className="lg:col-span-8">
              {selectedProtocol ? (
                <div className="bg-white rounded-[40px] border border-slate-100 shadow-tiny overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                      <div className="flex items-center gap-5">
                         <div className="w-16 h-16 bg-white rounded-[24px] border border-slate-100 shadow-sm flex items-center justify-center text-primary">
                            <selectedProtocol.icon className="w-8 h-8" />
                         </div>
                         <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selectedProtocol.title}</h2>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{selectedProtocol.category} Protocol</span>
                         </div>
                      </div>
                      <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary hover:border-primary transition-all">
                         <FileText className="w-4 h-4" /> PDF Version
                      </button>
                   </div>
                   
                   <div className="p-10">
                      <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:font-medium prose-p:text-slate-600 prose-li:font-medium prose-li:text-slate-600">
                         {selectedProtocol.content.split('\n').map((line, i) => {
                           if (line.startsWith('### ')) return <h3 key={i} className="text-2xl font-black text-slate-900 mt-8 mb-4">{line.replace('### ', '')}</h3>;
                           if (line.startsWith('#### ')) return <h4 key={i} className="text-lg font-black text-slate-800 mt-6 mb-3">{line.replace('#### ', '')}</h4>;
                           if (line.startsWith('* ')) return <li key={i} className="ml-4 list-disc mb-2">{line.replace('* ', '')}</li>;
                           if (line.match(/^\d\./)) return <li key={i} className="ml-4 list-decimal mb-2">{line}</li>;
                           return <p key={i} className="mb-4">{line}</p>;
                         })}
                      </div>

                      <div className="mt-12 pt-10 border-t border-slate-50 grid grid-cols-2 gap-6">
                         <div className="p-6 bg-slate-50 rounded-3xl flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                               <Clock className="w-6 h-6" />
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Last Updated</p>
                               <p className="text-sm font-bold text-slate-700">Oct 24, 2024</p>
                            </div>
                         </div>
                         <div className="p-6 bg-slate-50 rounded-3xl flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                               <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Status</p>
                               <p className="text-sm font-bold text-slate-700">Unit Verified</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="bg-white rounded-[40px] border border-dashed border-slate-200 py-40 flex flex-col items-center justify-center text-center">
                   <div className="w-24 h-24 bg-slate-50 rounded-[40px] flex items-center justify-center text-slate-300 mb-8">
                      <BookOpen className="w-12 h-12" />
                   </div>
                   <h2 className="text-2xl font-black text-slate-900 mb-2">Select a Protocol</h2>
                   <p className="text-slate-500 font-medium max-w-xs">Access clinical guidelines for CPAP, Oxygen therapy, and general pediatrics.</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
