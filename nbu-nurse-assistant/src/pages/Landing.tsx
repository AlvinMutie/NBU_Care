import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  ShieldCheck, Calculator, ClipboardList, 
  BookOpen, ArrowRight, Sparkles, CheckCircle2,
  Lock, Globe, Users, Sun, Moon, MessageSquare, Mail, MapPin, Phone
} from 'lucide-react';
import { useTheme } from '../services/ThemeContext';
import babyImage from '../assets/baby.jpg';

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
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] selection:bg-emerald-500/10 overflow-x-hidden font-sans transition-colors duration-300">
      {/* Structural Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-[var(--border-main)] bg-[var(--bg-header)]/80 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 lg:px-12">
          <div className="flex items-center space-x-10">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                <ShieldCheck className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight text-[var(--text-main)]">NeoDesk</span>
            </Link>
            
            <div className="hidden lg:flex items-center space-x-8 text-[13px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
               <a href="#solutions" className="hover:text-emerald-600 transition-colors">Solutions</a>
               <a href="#platform" className="hover:text-emerald-600 transition-colors">Platform</a>
               <a href="#security" className="hover:text-emerald-600 transition-colors">Security</a>
               <a href="#impact" className="hover:text-emerald-600 transition-colors">Impact</a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <Link to="/login" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors px-4">Sign In</Link>
            <Link to="/register" className="bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all active:scale-95">
              Deploy to Unit
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Redesigned with provided image */}
      <section className="relative pt-48 pb-32 px-6 lg:px-12 bg-[var(--card-bg)] transition-colors duration-300 overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Image Container */}
        <div className="absolute top-0 right-0 w-full lg:w-3/4 h-full pointer-events-none z-0">
           <div className="absolute inset-0 bg-gradient-to-r from-[var(--card-bg)] via-[var(--card-bg)]/80 lg:via-[var(--card-bg)]/40 to-transparent z-10" />
           <img 
            src={babyImage} 
            alt="Neonatal Care" 
            className="w-full h-full object-cover object-right opacity-40 dark:opacity-30 mix-blend-luminosity lg:mix-blend-normal grayscale-[20%] lg:grayscale-0"
           />
        </div>

        <motion.div 
          className="max-w-7xl mx-auto relative z-20 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="lg:w-3/5 space-y-8">
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400">
              <Sparkles size={14} className="fill-current" />
              <span className="text-[11px] font-bold uppercase tracking-[0.1em]">Clinical Intelligence v16.0</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-6xl lg:text-[84px] font-bold tracking-tight leading-[0.9] text-[var(--text-main)] drop-shadow-sm">
              The Gold Standard in <br />
              <span className="text-emerald-600">Neonatal Precision.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-normal">
              NeoDesk is a professional-grade clinical operating system designed to eliminate calculation variables and orchestrate team transitions with surgical accuracy.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link to="/register" className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-xl font-bold flex items-center justify-center space-x-3 text-lg shadow-lg shadow-emerald-600/20 transition-all">
                <span>Start Institutional Trial</span>
                <ArrowRight size={20} />
              </Link>
              <Link to="/login" className="w-full sm:w-auto px-10 py-4 border border-[var(--border-main)] rounded-xl font-bold text-[var(--text-main)] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-center backdrop-blur-sm">
                Book a Demo
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-12 border-t border-[var(--border-main)] grid grid-cols-3 gap-8">
               <div className="space-y-1">
                  <p className="text-2xl font-bold text-[var(--text-main)]">94%</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Error Reduction</p>
               </div>
               <div className="space-y-1">
                  <p className="text-2xl font-bold text-[var(--text-main)]">100%</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Compliance</p>
               </div>
               <div className="space-y-1">
                  <p className="text-2xl font-bold text-[var(--text-main)]">2.4s</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Decision Speed</p>
               </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Solutions Grid - with scroll animation */}
      <motion.section 
        id="solutions" 
        className="py-32 bg-[var(--bg-main)] transition-colors duration-300"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-20 space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-[var(--text-main)]">Engineered for Clinical Safety.</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-normal">
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
              <div key={i} className="group p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-main)] hover:border-emerald-500 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5">
                <div className={`w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500`}>
                  <f.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-[var(--text-main)]">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[15px]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Impact Statement - with scroll animation */}
      <motion.section 
        id="impact" 
        className="py-32 bg-[var(--card-bg)] transition-colors duration-300"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
         <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
               <div className="space-y-4">
                  <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-[var(--text-main)]">Zero margin for error. <br /> Total peace of mind.</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-normal">
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
                       <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 transition-colors">
                          <item.icon size={14} strokeWidth={3} />
                       </div>
                       <span className="text-slate-700 dark:text-slate-300 font-semibold">{item.label}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-16 text-center relative overflow-hidden group shadow-2xl transition-all duration-500">
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
      </motion.section>

      {/* CTA Section - with scroll animation */}
      <motion.section 
        className="py-32 px-6 lg:px-12 bg-[var(--bg-main)] transition-colors duration-300"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
         <div className="max-w-7xl mx-auto rounded-[2rem] bg-slate-900 dark:bg-slate-800 p-16 lg:p-24 text-center space-y-8 shadow-2xl relative overflow-hidden transition-colors duration-300">
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
      </motion.section>

      {/* Enhanced Footer */}
      <footer className="bg-slate-900 text-white pt-24 pb-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <ShieldCheck className="text-white" size={24} />
                </div>
                <span className="text-2xl font-bold tracking-tighter">NeoDesk</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
                Professional-grade clinical operating system built to standardize neonatal care through precision engineering.
              </p>
              <div className="flex items-center space-x-5">
                {[MessageSquare, Mail, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="p-2.5 bg-white/5 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-white/10 transition-all">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500">Platform</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-300">
                {['Ward Command Center', 'Patient Registry', 'Medication Pipeline', 'Clinical Academy'].map(item => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500">Legal & Security</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-300">
                {['Privacy Standards', 'Audit Traceability', 'Institutional SSO', 'Compliance Ledger'].map(item => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500">Institutional HQ</h4>
              <ul className="space-y-5">
                <li className="flex items-start space-x-3">
                  <MapPin className="text-slate-500 shrink-0 mt-0.5" size={16} />
                  <span className="text-sm font-bold text-slate-300 leading-snug">Precision Medical Center,<br />Nairobi, Kenya</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="text-slate-500 shrink-0" size={16} />
                  <span className="text-sm font-bold text-slate-300">+254 (0) 700 000 000</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="text-slate-500 shrink-0" size={16} />
                  <span className="text-sm font-bold text-slate-300">ops@neodesk.clinical</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
               <span>&copy; 2026 NeoDesk Clinical Systems</span>
               <div className="hidden md:block w-1 h-1 rounded-full bg-slate-700" />
               <span>All Institutional Rights Reserved</span>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="text-right">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Design Lead</p>
                <p className="text-xs font-bold text-slate-300">AlvinMutie</p>
              </div>
              <div className="w-px h-8 bg-white/5" />
              <div className="text-right">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Version</p>
                <p className="text-xs font-bold text-emerald-500">v16.0 Stable</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
