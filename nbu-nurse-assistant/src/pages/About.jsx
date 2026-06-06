import React from 'react';
import { 
  ArrowLeft, 
  Stethoscope, 
  ShieldCheck, 
  Zap, 
  Database,
  Heart,
  ChevronRight,
  Activity,
  Lock
} from 'lucide-react';

export default function About({ onBack }) {
  return (
    <div className="max-w-[1200px] mx-auto p-4 lg:p-8 py-10 lg:py-16 text-left">
      
      {/* Header */}
      <div className="text-center mb-16 max-w-3xl mx-auto animate-in fade-in slide-in-from-top-4 duration-700">
         <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-8 border border-primary/20">
            <Activity className="w-4 h-4" /> Better care for babies
         </div>
         <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 leading-none">
           Clinical <br /><span className="text-primary italic">Intelligence</span> Assistant.
         </h1>
         <p className="text-base lg:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
           NeoDesk is a professional-grade digital ecosystem designed to help neonatal teams work with absolute precision, surgical confidence, and safety during high-stakes shifts.
         </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
        {[
          { t: "Safety First", d: "Intelligent validation layers that eliminate calculation variables before they reach the patient.", i: Zap },
          { t: "Verified Hub", d: "Instant bedside access to WHO and Ministry standards for neonatal build units.", i: ShieldCheck },
          { t: "Human Design", d: "An editorial design system that reduces cognitive load so you focus on the baby, not the screen.", i: Heart }
        ].map((v, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group">
             <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform shadow-inner">
                <v.i className="w-7 h-7" />
             </div>
             <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{v.t}</h3>
             <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
               {v.d}
             </p>
          </div>
        ))}
      </div>

      {/* Narrative Section */}
      <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col lg:flex-row mb-16 shadow-2xl shadow-slate-200/50 dark:shadow-none">
         <div className="p-10 lg:p-16 lg:w-1/2 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-50 dark:border-slate-800">
           <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 mb-8 border border-slate-100 dark:border-slate-700">
               <Database className="w-6 h-6" />
           </div>
           <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Always Operational.</h3>
           <p className="text-slate-500 dark:text-slate-400 mb-10 leading-relaxed font-medium">
             NeoDesk architecture is built for clinical resilience. Our offline-first synchronization ensures that your tools remain active even during network outages.
           </p>
           <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800">
                 <span className="block text-3xl font-black text-primary mb-1 tracking-tighter">99.9%</span>
                 <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Clinical Uptime</span>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800 flex flex-col justify-center">
                 <Lock className="w-6 h-6 text-primary mb-2" />
                 <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">AES-256 Vault</span>
              </div>
           </div>
         </div>
         
         <div className="p-10 lg:p-16 lg:w-1/2 bg-slate-50 dark:bg-slate-800/50 flex flex-col justify-center text-center items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-0" />
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight relative z-10">Surgical Origins</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-10 max-w-sm font-medium relative z-10">
              Forged at the bedside to solve the complex variables of neonatal math. Tested by clinical leads to ensure every child receives precision care.
            </p>
            <button 
              onClick={onBack} 
              className="bg-slate-900 dark:bg-primary hover:bg-black dark:hover:bg-primary-dark text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 shadow-xl active:scale-95 relative z-10"
            >
               Resume Session
               <ChevronRight className="w-4 h-4" />
            </button>
         </div>
      </div>

      {/* Footer Branding */}
      <div className="text-center py-10">
         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 dark:text-slate-700 flex items-center justify-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            v16.2 Deployment • Clinical Standard
         </p>
      </div>

    </div>
  );
}
