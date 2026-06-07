import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  ShieldCheck, Activity, Calculator, ClipboardList, 
  BookOpen, ArrowRight, Shield, Sparkles, CheckCircle2,
  Lock, Globe, Users
} from 'lucide-react';

const Landing: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-emerald-500/10 overflow-x-hidden font-sans">
      {/* Structural Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 lg:px-12">
          <div className="flex items-center space-x-10">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                <ShieldCheck className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#0F172A]">NeoDesk</span>
            </Link>
            
            <div className="hidden lg:flex items-center space-x-8 text-[13px] font-semibold uppercase tracking-wider text-slate-500">
               <a href="#solutions" className="hover:text-emerald-600 transition-colors">Solutions</a>
               <a href="#platform" className="hover:text-emerald-600 transition-colors">Platform</a>
               <a href="#security" className="hover:text-emerald-600 transition-colors">Security</a>
               <a href="#impact" className="hover:text-emerald-600 transition-colors">Impact</a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors px-4">Sign In</Link>
            <Link to="/register" className="bg-[#0F172A] hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all active:scale-95">
              Deploy to Unit
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Clean, High-End Professional */}
      <section className="relative pt-48 pb-32 px-6 lg:px-12 bg-white">
        <motion.div 
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-8">
              <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700">
                <Sparkles size={14} className="fill-current" />
                <span className="text-[11px] font-bold uppercase tracking-[0.1em]">Clinical Intelligence v16.0</span>
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-6xl lg:text-[84px] font-bold tracking-tight leading-[0.9] text-[#0F172A]">
                The Gold Standard in <br />
                <span className="text-emerald-600">Neonatal Precision.</span>
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-xl text-slate-500 max-w-2xl leading-relaxed font-normal">
                NeoDesk is a professional-grade clinical operating system designed to eliminate calculation variables and orchestrate team transitions with surgical accuracy.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Link to="/register" className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-xl font-bold flex items-center space-x-3 text-lg shadow-lg shadow-emerald-600/20 transition-all">
                  <span>Start Institutional Trial</span>
                  <ArrowRight size={20} />
                </Link>
                <Link to="/login" className="px-10 py-4 border border-slate-200 rounded-xl font-bold text-[#0F172A] hover:bg-slate-50 transition-all">
                  Book a Demo
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-12 border-t border-slate-100 grid grid-cols-3 gap-8">
                 <div className="space-y-1">
                    <p className="text-2xl font-bold text-[#0F172A]">94%</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Error Reduction</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-2xl font-bold text-[#0F172A]">100%</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Compliance</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-2xl font-bold text-[#0F172A]">2.4s</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Decision Speed</p>
                 </div>
              </motion.div>
            </div>

            {/* High-Fidelity UI Interface Mockup */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-5 relative hidden lg:block"
            >
              <div className="bg-slate-100 rounded-[2rem] p-3 shadow-2xl border border-white">
                 <div className="bg-white rounded-[1.5rem] overflow-hidden border border-slate-200 shadow-inner">
                    {/* Mock Browser/App UI */}
                    <div className="h-8 bg-slate-50 border-b border-slate-200 flex items-center px-4 space-x-1.5">
                       <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                       <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                       <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                    </div>
                    <div className="p-6 space-y-6">
                       <div className="flex items-center justify-between">
                          <div className="space-y-2">
                             <div className="h-4 w-32 bg-slate-100 rounded-md" />
                             <div className="h-2 w-20 bg-slate-50 rounded-md" />
                          </div>
                          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                             <Activity size={20} />
                          </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="h-24 bg-slate-50 rounded-xl border border-slate-100 p-4 space-y-3">
                             <div className="h-2 w-8 bg-emerald-100 rounded" />
                             <div className="h-4 w-12 bg-slate-200 rounded" />
                          </div>
                          <div className="h-24 bg-slate-50 rounded-xl border border-slate-100 p-4 space-y-3">
                             <div className="h-2 w-8 bg-blue-100 rounded" />
                             <div className="h-4 w-12 bg-slate-200 rounded" />
                          </div>
                       </div>
                       <div className="h-32 bg-emerald-600 rounded-xl p-5 flex flex-col justify-between">
                          <div className="flex justify-between">
                             <div className="w-8 h-8 rounded-full bg-white/20" />
                             <Shield size={16} className="text-white/60" />
                          </div>
                          <div className="space-y-2">
                             <div className="h-1.5 w-full bg-white/20 rounded-full" />
                             <div className="h-1.5 w-2/3 bg-white/40 rounded-full" />
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
              {/* Subtle accent */}
              <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-emerald-100 rounded-full blur-[80px] opacity-60" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Solutions Grid - Minimal & Functional */}
      <section id="solutions" className="py-32 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-20 space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-[#0F172A]">Engineered for Clinical Safety.</h2>
            <p className="text-slate-500 text-lg leading-relaxed font-normal">
              Every interface in NeoDesk is built to reduce cognitive load and eliminate human error in high-pressure environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                title: 'Weight-Based Dosing', 
                desc: 'Automated calculation engine with 5-step validation and stock concentration mapping.', 
                icon: Calculator, 
                color: 'emerald' 
              },
              { 
                title: 'Structured Handovers', 
                desc: 'Managed care transitions with real-time vital trend synchronization and shift audit logs.', 
                icon: ClipboardList, 
                color: 'blue' 
              },
              { 
                title: 'Institutional Protocols', 
                desc: 'A searchable Knowledge Hub for standardized clinical procedures and resuscitation pathways.', 
                icon: BookOpen, 
                color: 'slate' 
              },
            ].map((f, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5">
                <div className={`w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500`}>
                  <f.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-[#0F172A]">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed text-[15px]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statement */}
      <section id="impact" className="py-32 bg-white">
         <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
               <div className="space-y-4">
                  <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-[#0F172A]">Zero margin for error. <br /> Total peace of mind.</h2>
                  <p className="text-slate-500 text-lg leading-relaxed font-normal">
                    In neonatal care, the smallest details are the most significant. NeoDesk provides the guardrails necessary to protect your patients and your clinical staff.
                  </p>
               </div>
               
               <div className="space-y-6">
                  {[
                    { label: 'Secondary Clinician Verification', icon: CheckCircle2 },
                    { label: 'Immutable Audit Traceability', icon: Lock },
                    { label: 'Real-time Vital Threshold Alerts', icon: Globe },
                    { label: 'Unified Ward-Wide Coverage', icon: Users },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-4">
                       <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                          <item.icon size={14} strokeWidth={3} />
                       </div>
                       <span className="text-slate-700 font-semibold">{item.label}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-16 text-center relative overflow-hidden group shadow-2xl">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/20 to-transparent opacity-50" />
               <div className="relative z-10 space-y-12">
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-500">Unit Performance Impact</p>
                  <div className="space-y-2">
                     <p className="text-7xl font-bold text-white tracking-tighter">-94%</p>
                     <p className="text-slate-400 font-medium tracking-wide">Reduction in Dosing Variables</p>
                  </div>
                  <div className="h-px bg-white/10 w-24 mx-auto" />
                  <div className="space-y-2">
                     <p className="text-7xl font-bold text-white tracking-tighter">100%</p>
                     <p className="text-slate-400 font-medium tracking-wide">Protocol Adherence Rate</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* CTA Section - Professional & Clear */}
      <section className="py-32 px-6 lg:px-12 bg-[#F8FAFC]">
         <div className="max-w-7xl mx-auto rounded-[2rem] bg-[#0F172A] p-16 lg:p-24 text-center space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none transform translate-x-1/2 -translate-y-1/2">
               <Globe size={400} strokeWidth={1} className="text-white" />
            </div>
            
            <div className="relative z-10 space-y-8">
               <h2 className="text-5xl lg:text-6xl font-bold text-white tracking-tight leading-none">Modernize your Unit today.</h2>
               <p className="text-slate-400 max-w-xl mx-auto text-xl font-normal leading-relaxed">
                 Deploy the clinical operating system trusted by hundreds of neonatal specialists worldwide.
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                  <Link to="/register" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-emerald-600/20">
                    Deploy NeoDesk
                  </Link>
                  <Link to="/login" className="w-full sm:w-auto bg-white/10 text-white border border-white/10 px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all active:scale-95">
                    Clinician Access
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-20 px-6 lg:px-12 max-w-7xl mx-auto bg-white border-t border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="space-y-6">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                <ShieldCheck className="text-white" size={18} />
              </div>
              <span className="font-bold tracking-tight text-[#0F172A] text-lg">NeoDesk</span>
            </div>
            <p className="text-[13px] text-slate-500 max-w-xs font-medium leading-relaxed">
              Professional decision-support tool designed for Neonatal Building Units. Built with precision in Nairobi.
            </p>
            <div className="flex items-center space-x-6 text-[11px] font-bold uppercase tracking-widest text-slate-400">
               <span>&copy; 2026 NeoDesk Clinical Systems</span>
               <a href="#" className="hover:text-emerald-600">Privacy</a>
               <a href="#" className="hover:text-emerald-600">Legal</a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-16 text-right">
             <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Platform</p>
                <div className="flex flex-col space-y-1 text-sm font-bold text-[#0F172A]">
                   <span className="text-emerald-600">v16.0 Stable</span>
                   <span className="text-slate-300">v17.1 (Beta)</span>
                </div>
             </div>
             <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Leadership</p>
                <div className="flex flex-col space-y-1 text-sm font-bold text-[#0F172A]">
                   <span>AlvinMutie</span>
                   <span className="text-slate-300 italic font-medium tracking-tight">Design Lead</span>
                </div>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
