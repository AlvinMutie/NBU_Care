import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  ShieldCheck, Calculator, ClipboardList, 
  CheckCircle2, GraduationCap,
  Globe, Sun, Moon, MessageSquare, Mail, MapPin, Phone,
  Activity, Shield, Database, Fingerprint, Award,
  Cpu, Zap, History as HistoryIcon, Users, PlayCircle
} from 'lucide-react';
import { useTheme } from '../services/ThemeContext';
import babyImage from '../assets/baby2.jpg';

const Landing: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

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

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 selection:bg-emerald-500/10 overflow-x-hidden font-sans transition-colors duration-500 scroll-smooth">
      {/* Structural Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl transition-all duration-500">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 lg:px-12">
          <div className="flex items-center space-x-12">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20 group-hover:rotate-12 transition-transform duration-500">
                <ShieldCheck className="text-white" size={22} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white uppercase">NeoDesk</span>
            </Link>
            
            <div className="hidden lg:flex items-center space-x-8 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
               <a href="#vision" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Vision</a>
               <a href="#modules" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Modules</a>
               <a href="#governance" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Governance</a>
               <a href="#stack" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Stack</a>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <div className="h-6 w-px bg-slate-100 dark:bg-slate-800 hidden sm:block" />
            <Link to="/login" className="hidden sm:block text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white hover:text-emerald-600 transition-colors">Sign In</Link>
            <Link to="/register" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 transition-all active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-white dark:bg-[#0f172a] transition-colors duration-500 overflow-hidden pt-20">
        {/* Background Image Container with advanced blending */}
        <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full pointer-events-none z-0">
           {/* Multi-stage gradient mask for blending */}
           <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 dark:from-[#0f172a] dark:via-[#0f172a]/95 to-transparent z-10" />
           <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent dark:from-[#0f172a] to-white dark:to-[#0f172a] z-10 opacity-40" />
           <img 
            src={babyImage} 
            alt="Neonatal Excellence" 
            className="w-full h-full object-cover object-[75%_center] mix-blend-multiply dark:mix-blend-overlay opacity-90 dark:opacity-50 transition-all duration-1000"
           />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-20">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:w-3/5 space-y-10"
          >
            <motion.h1 variants={itemVariants} className="text-6xl lg:text-[90px] font-black tracking-tight leading-[0.85] text-slate-900 dark:text-white drop-shadow-sm">
              Smarter Care. <br />
              <span className="text-emerald-600">Zero Variables.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed font-medium">
              Eliminating manual risk in neonatal wards through high-fidelity digital orchestration. Transition from manual workflows to a unified, safety-validated environment.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6">
              <Link to="/register" className="w-full sm:w-auto bg-slate-900 dark:bg-emerald-600 hover:bg-black dark:hover:bg-emerald-700 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-slate-200 dark:shadow-emerald-900/20 transition-all hover:-translate-y-1 active:translate-y-0 text-center">
                Deploy Institutional Core
              </Link>
              <div className="flex items-center space-x-4 cursor-pointer group">
                 <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform shadow-inner border border-emerald-100 dark:border-emerald-800">
                    <PlayCircle size={28} fill="currentColor" className="text-white dark:text-[#0f172a]" />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Core Protocol Demo</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-10 flex items-center space-x-12 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
               <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900 dark:text-white tracking-widest uppercase">Verified</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Security Core</span>
               </div>
               <div className="w-px h-10 bg-slate-200 dark:bg-slate-800" />
               <div className="flex flex-col text-left">
                  <span className="text-2xl font-black text-slate-900 dark:text-white tracking-widest uppercase">Validated</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Calculations</span>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <motion.section 
        id="vision" 
        className="py-32 bg-white dark:bg-[#0f172a] border-y border-slate-100 dark:border-slate-800 transition-colors duration-500 scroll-mt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-32">
             <div className="space-y-8 text-center lg:text-left">
                <motion.p variants={itemVariants} className="text-xs font-black uppercase tracking-[0.4em] text-emerald-600">The Vision</motion.p>
                <motion.h2 variants={itemVariants} className="text-5xl lg:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]">Safety is a <br /> Precision Science.</motion.h2>
                <motion.p variants={itemVariants} className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                  In high-stakes Neonatal Building Units (NBU), variables are the enemy. NeoDesk provides a high-fidelity interface that enforces clinical protocols and automates precision calculations.
                </motion.p>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {[
                  { title: 'Precision Safety', desc: 'Real-time validation layer monitoring every clinical input against physiological boundaries.', icon: Shield },
                  { title: 'Editorial Design', desc: 'Warm Emerald & Professional Slate aesthetic optimized for low cognitive load.', icon: Award },
                  { title: 'Clinical Orchestration', desc: 'Bridges the gap between roles with structured handovers and a unified hub.', icon: Activity },
                  { title: 'Offline Resilience', desc: 'Calculators and protocols remain functional even during network instability.', icon: Database },
                ].map((p, i) => (
                  <motion.div key={i} variants={itemVariants} className="space-y-4 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all">
                     <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-950 flex items-center justify-center text-emerald-600 shadow-sm transition-colors"><p.icon size={24} strokeWidth={2.5} /></div>
                     <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-sm">{p.title}</h4>
                     <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{p.desc}</p>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      </motion.section>

      {/* Modules Section */}
      <motion.section 
        id="modules" 
        className="py-40 bg-slate-50 dark:bg-slate-900/20 transition-colors duration-500 scroll-mt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-32 space-y-8">
            <motion.p variants={itemVariants} className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">Functional Architecture</motion.p>
            <motion.h2 variants={itemVariants} className="text-5xl lg:text-8xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.85]">Unified Modules. <br /> Surgical Accuracy.</motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                id: 'registry',
                title: 'Patient Registry', 
                desc: 'Digital census of patient status, including admissions and clinical biodata.', 
                icon: Users 
              },
              { 
                id: 'handover',
                title: 'Shift Handover', 
                desc: 'Structured transition reports with vital trend visualization and validation.', 
                icon: ClipboardList 
              },
              { 
                id: 'dosing',
                title: 'Precision Dosing', 
                desc: 'Intelligent engines for drug calculations, IV fluid rates, and dilution logic.', 
                icon: Calculator 
              },
              { 
                id: 'academy',
                title: 'Clinical Academy', 
                desc: 'Validated Knowledge Hub for clinical competency and standardized procedures.', 
                icon: GraduationCap 
              },
            ].map((f, i) => (
              <motion.div 
                id={f.id}
                key={i} 
                variants={itemVariants}
                className="group p-10 rounded-[3rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-900 transition-all duration-500 shadow-sm hover:shadow-2xl scroll-mt-24"
              >
                <div className={`w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 text-slate-400 flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-lg`}>
                  <f.icon size={26} strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-black mb-4 text-slate-900 dark:text-white tracking-tight leading-tight uppercase">{f.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Governance Section */}
      <motion.section 
        id="governance" 
        className="py-40 bg-white dark:bg-[#0f172a] transition-colors duration-500 scroll-mt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
         <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
               <div className="space-y-8 text-center lg:text-left">
                  <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]">Forensic Trust. <br /> Immutable Safety.</h2>
                  <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    Every clinical action is tracked, every calculation derivation preserved. NeoDesk enforces governance through a strict identity layer and forensic audit trails.
                  </p>
               </div>
               
               <div className="space-y-6">
                  {[
                    { label: 'Role-Based Access Control', icon: Fingerprint, desc: 'Nurses, Consultants, Students, and Managers have bespoke portals.' },
                    { label: 'Blue-Tick Verified Identity', icon: ShieldCheck, desc: 'Every staff registration is vetted by Unit Leadership.' },
                    { label: 'Full Compliance Ledger', icon: HistoryIcon, desc: 'Immutable tracking of clinical actions for forensic shift reviews.' },
                  ].map((item, i) => (
                    <motion.div key={i} variants={itemVariants} className="flex items-start space-x-6 p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 transition-all hover:bg-white dark:hover:bg-slate-800 shadow-sm hover:shadow-xl">
                       <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center text-emerald-600 shadow-sm border border-slate-200 dark:border-slate-700">
                          <item.icon size={22} strokeWidth={2.5} />
                       </div>
                       <div>
                          <span className="text-base font-black uppercase tracking-widest text-slate-900 dark:text-white">{item.label}</span>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium leading-relaxed">{item.desc}</p>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            <div className="bg-slate-900 rounded-[4rem] p-16 lg:p-24 text-center relative overflow-hidden shadow-2xl border border-white/5 group transition-all duration-700 hover:scale-[1.02]">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/20 to-transparent opacity-50 transition-opacity duration-1000 group-hover:opacity-80" />
               <div className="relative z-10 space-y-16">
                  <div className="space-y-2">
                     <p className="text-[120px] font-black text-emerald-500 tracking-tighter leading-none">99.9%</p>
                     <p className="text-[10px] font-black text-emerald-200/40 uppercase tracking-[0.5em]">Clinical Uptime</p>
                  </div>
                  <div className="h-px bg-white/5 w-24 mx-auto" />
                  <div className="space-y-6 text-center">
                     <p className="text-2xl font-bold text-white tracking-tight uppercase tracking-widest">Security Core v16.0</p>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Bank-Grade Encryption</div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Relational Data Core</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </motion.section>

      {/* Tech Stack Section */}
      <motion.section 
        id="stack" 
        className="py-40 bg-slate-50 dark:bg-slate-900/20 transition-colors duration-500 scroll-mt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
           <motion.p variants={itemVariants} className="text-xs font-black uppercase tracking-[0.4em] text-emerald-600 mb-8">Technical Specification</motion.p>
           <motion.h2 variants={itemVariants} className="text-4xl lg:text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-20 uppercase tracking-widest">Modern Institutional Stack.</motion.h2>
           <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
              {[
                { name: 'React 18+', icon: Cpu, label: 'Framework' },
                { name: 'Laravel Core', icon: Globe, label: 'Relational Backend' },
                { name: 'PostgreSQL', icon: Database, label: 'Data Engine' },
                { name: 'Motion', icon: Zap, label: 'Animation' },
                { name: 'Tailwind v4', icon: CheckCircle2, label: 'Design System' },
              ].map((s, i) => (
                <motion.div key={i} variants={itemVariants} className="space-y-4">
                   <div className="w-16 h-16 rounded-[1.5rem] bg-white dark:bg-slate-800 mx-auto flex items-center justify-center text-slate-300 dark:text-slate-600 shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:text-emerald-500 hover:border-emerald-200"><s.icon size={28} /></div>
                   <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{s.label}</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">{s.name}</p>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </motion.section>

      {/* Enhanced Multi-Column Footer */}
      <footer id="contact" className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white pt-40 pb-16 transition-colors duration-500 border-t border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-24 mb-32">
            <div className="lg:col-span-4 space-y-12">
              <div className="flex items-center space-x-4 text-left">
                <div className="w-14 h-14 bg-emerald-600 rounded-[1.4rem] flex items-center justify-center shadow-2xl shadow-emerald-600/30">
                  <ShieldCheck className="text-white" size={28} strokeWidth={2.5} />
                </div>
                <div className="space-y-1">
                   <span className="text-3xl font-black tracking-tighter uppercase leading-none">NeoDesk</span>
                   <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em]">Precision Core</p>
                </div>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium text-left">
                The gold standard in clinical operating systems. Standardizing neonatal care through precision engineering.
              </p>
              <div className="flex items-center space-x-5">
                {[MessageSquare, Mail, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-900 flex items-center justify-center transition-all shadow-sm">
                    <Icon size={20} strokeWidth={2.5} />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-10 text-left">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-600">Platform</h4>
              <ul className="space-y-6 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                <li><a href="#vision" className="hover:text-slate-900 dark:hover:text-white transition-colors">Vision</a></li>
                <li><a href="#modules" className="hover:text-slate-900 dark:hover:text-white transition-colors">Modules</a></li>
                <li><a href="#governance" className="hover:text-slate-900 dark:hover:text-white transition-colors">Governance</a></li>
                <li><a href="#stack" className="hover:text-slate-900 dark:hover:text-white transition-colors">Stack</a></li>
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-10 text-left">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-600">Security</h4>
              <ul className="space-y-6 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                <li><a href="#governance" className="hover:text-slate-900 dark:hover:text-white transition-colors">Audit Trail</a></li>
                <li><a href="#governance" className="hover:text-slate-900 dark:hover:text-white transition-colors">Compliance</a></li>
                <li><a href="#stack" className="hover:text-slate-900 dark:hover:text-white transition-colors">Technical</a></li>
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-10 bg-slate-50 dark:bg-slate-900 p-12 rounded-[4rem] border border-slate-100 dark:border-slate-800 shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-emerald-600 opacity-[0.03] rotate-12"><Globe size={160} /></div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-600 relative z-10 text-left uppercase tracking-widest">Institutional HQ</h4>
              <ul className="space-y-8 relative z-10 text-left">
                <li className="flex items-start space-x-4 text-left">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 text-emerald-600"><MapPin size={20} strokeWidth={2.5} /></div>
                  <span className="text-base font-bold text-slate-900 dark:text-slate-200 leading-snug tracking-tight">Precision Medical Center,<br />Westlands, Nairobi, KE</span>
                </li>
                <li className="flex items-center space-x-4 text-left">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 text-emerald-600"><Phone size={20} strokeWidth={2.5} /></div>
                  <span className="text-base font-bold text-slate-900 dark:text-slate-200">+254 (0) 700 000 000</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-20 border-t border-slate-100 dark:border-slate-900 flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 dark:text-slate-700">
               &copy; 2026 NeoDesk Clinical Systems. All Rights Reserved.
            </div>
            
            <div className="flex items-center space-x-12">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest mb-2">Institutional Build</p>
                <p className="text-sm font-black text-emerald-600 uppercase tracking-tighter italic leading-none">v16.0 Unified Core</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
