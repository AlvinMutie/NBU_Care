import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  ShieldCheck, Calculator, ClipboardList, 
  ArrowRight, CheckCircle2, PlayCircle, GraduationCap,
  Lock, Globe, Sun, Moon, MessageSquare, Mail, MapPin, Phone,
  Activity, Heart, Shield, Plus
} from 'lucide-react';
import { useTheme } from '../services/ThemeContext';
import babyImage from '../assets/baby2.jpg';

const Landing: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 selection:bg-emerald-500/10 overflow-x-hidden font-sans transition-colors duration-500">
      {/* Structural Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-24 border-b border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-[#0f172a]/70 backdrop-blur-xl transition-all duration-500">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 lg:px-12">
          <div className="flex items-center space-x-12">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-600/20 group-hover:rotate-12 transition-transform duration-500">
                <ShieldCheck className="text-white" size={24} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">NeoDesk</span>
            </Link>
            
            <div className="hidden lg:flex items-center space-x-10 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
               <a href="#services" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Services</a>
               <a href="#impact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Safety</a>
               <a href="#contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Contact</a>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <div className="h-6 w-px bg-slate-100 dark:bg-slate-800 hidden sm:block" />
            <Link to="/login" className="hidden sm:block text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white hover:text-emerald-600 transition-colors">Sign In</Link>
            <Link to="/register" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 transition-all active:scale-95">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - High Fidelity Professional Medical Aesthetic */}
      <section className="relative pt-32 lg:pt-0 lg:h-[100vh] flex items-center bg-white dark:bg-[#0f172a] transition-colors duration-500 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-20">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-10"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">Institutional Clinical OS</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-6xl lg:text-[100px] font-black tracking-tight leading-[0.85] text-slate-900 dark:text-white">
              Precision Care <br />
              <span className="text-emerald-600">Unified.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed font-medium">
              Eliminating variables in neonatal care through surgical precision and automated clinical intelligence. The benchmark for NICU safety.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6">
              <Link to="/register" className="w-full sm:w-auto bg-slate-900 dark:bg-emerald-600 hover:bg-black dark:hover:bg-emerald-700 text-white px-12 py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-2xl transition-all hover:-translate-y-1 active:translate-y-0 text-center">
                Book Institutional Demo
              </Link>
              <div className="flex items-center space-x-4 cursor-pointer group">
                 <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                    <PlayCircle size={32} fill="currentColor" className="text-white dark:text-[#0f172a]" />
                 </div>
                 <span className="text-xs font-black uppercase tracking-widest text-slate-400">Watch Core Protocol</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-10 flex items-center space-x-12 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000">
               <ShieldCheck size={40} />
               <Activity size={40} />
               <Heart size={40} />
               <Globe size={40} />
            </motion.div>
          </motion.div>

          {/* Hero Image - Not Stretched, Professional Clip */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="relative h-[400px] lg:h-[700px] w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-[4rem] blur-[100px] opacity-30 animate-pulse" />
            <div className="relative h-full w-full rounded-[4rem] overflow-hidden border-[12px] border-white dark:border-slate-800 shadow-2xl transition-all duration-500 group">
               <img 
                  src={babyImage} 
                  alt="Neonatal Excellence" 
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-[3000ms] ease-out"
               />
               {/* Quick Info Overlay */}
               <div className="absolute bottom-10 left-10 right-10 bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/20 dark:border-white/10 p-6 rounded-[2.5rem] shadow-2xl animate-in slide-in-from-bottom-10 duration-1000 delay-1000">
                  <div className="flex items-center justify-between">
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-emerald-200 uppercase tracking-widest">Active Monitoring</p>
                        <p className="text-sm font-bold text-white tracking-tight">Standardized v16.0 Core</p>
                     </div>
                     <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                        <Plus size={20} />
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Background Accents */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50 dark:bg-emerald-950/20 z-0 transition-colors duration-500 hidden lg:block" />
      </section>

      {/* Services Section - Clean Behance Style */}
      <motion.section 
        id="services" 
        className="py-40 bg-white dark:bg-[#0f172a] transition-colors duration-500"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-32 space-y-6">
            <motion.p variants={itemVariants} className="text-xs font-black uppercase tracking-[0.4em] text-emerald-600">Our Expertise</motion.p>
            <motion.h2 variants={itemVariants} className="text-5xl lg:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]">Complete medical services for your unit.</motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                title: 'Weight-Based Dosing', 
                desc: 'Automated 5-step precision dosing mapping directly to stock concentrations.', 
                icon: Calculator 
              },
              { 
                title: 'Clinical Academy', 
                desc: 'Validated Knowledge Hub featuring CPAP and Oxygen Therapy protocols.', 
                icon: GraduationCap 
              },
              { 
                title: 'Shift Continuity', 
                desc: 'Structured handover reports synchronized with workforce scheduling.', 
                icon: ClipboardList 
              },
            ].map((f, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="group p-12 rounded-[3.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-900 hover:bg-white dark:hover:bg-slate-800 transition-all duration-500 shadow-sm hover:shadow-2xl"
              >
                <div className={`w-16 h-16 rounded-[1.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white flex items-center justify-center mb-10 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-lg`}>
                  <f.icon size={28} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-lg">{f.desc}</p>
                <div className="pt-8">
                   <button className="flex items-center space-x-3 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-600 transition-colors">
                      <span>Learn More</span>
                      <ArrowRight size={14} />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Impact Section */}
      <motion.section 
        id="impact" 
        className="py-40 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-500"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
         <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
               <div className="space-y-6 text-center lg:text-left">
                  <h2 className="text-5xl lg:text-8xl font-black tracking-tighter leading-[0.85] text-slate-900 dark:text-white">Safety first. <br /> Always.</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed font-medium max-w-lg">
                    Institutional trust is earned through precision. We provide the forensic tools required to maintain 100% protocol adherence.
                  </p>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { label: 'Secondary Verification', icon: CheckCircle2 },
                    { label: 'SHA-256 Audit Trails', icon: Lock },
                    { label: 'Threshold Alerts', icon: Activity },
                    { label: 'Global Compliance', icon: Globe },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-4 p-4 bg-white dark:bg-slate-800 rounded-[1.5rem] shadow-sm transition-colors">
                       <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                          <item.icon size={18} strokeWidth={3} />
                       </div>
                       <span className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-slate-300">{item.label}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="relative group">
               <div className="absolute inset-0 bg-emerald-600 rounded-[4rem] rotate-3 opacity-10 group-hover:rotate-6 transition-transform duration-1000" />
               <div className="bg-slate-900 rounded-[4rem] p-16 lg:p-24 text-center relative overflow-hidden shadow-2xl transition-all duration-500 border border-white/5">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/20 to-transparent opacity-50" />
                  <div className="relative z-10 space-y-16">
                     <div>
                        <p className="text-[100px] font-black text-emerald-500 tracking-tighter leading-none">-94%</p>
                        <p className="text-xs font-black text-emerald-200/40 uppercase tracking-[0.4em] mt-6">Dosing Variables</p>
                     </div>
                     <div className="h-px bg-white/5 w-24 mx-auto" />
                     <div>
                        <p className="text-[100px] font-black text-white tracking-tighter leading-none">100%</p>
                        <p className="text-xs font-black text-white/20 uppercase tracking-[0.4em] mt-6">Protocol Integrity</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-40 px-6 lg:px-12 bg-white dark:bg-[#0f172a] transition-colors duration-500"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
         <div className="max-w-7xl mx-auto rounded-[4rem] bg-emerald-600 p-20 lg:p-32 text-center space-y-12 shadow-[0_50px_100px_-20px_rgba(16,185,129,0.3)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none transform translate-x-1/2 -translate-y-1/2 text-white group-hover:scale-110 transition-transform duration-1000">
               <Shield size={400} strokeWidth={1} />
            </div>
            
            <div className="relative z-10 space-y-10">
               <h2 className="text-6xl lg:text-9xl font-black text-white tracking-tighter leading-none whitespace-nowrap">Upgrade your Unit.</h2>
               <p className="text-emerald-50 max-w-2xl mx-auto text-2xl font-medium leading-relaxed">
                 Deploy the clinical operating system trusted by hundreds of neonatal specialists worldwide.
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
                  <Link to="/register" className="w-full sm:w-auto bg-slate-900 text-white px-16 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-sm transition-all hover:bg-black active:scale-95 shadow-2xl">
                    Get Early Access
                  </Link>
                  <Link to="/login" className="w-full sm:w-auto bg-white/20 backdrop-blur-3xl text-white border border-white/30 px-16 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-sm hover:bg-white/30 transition-all active:scale-95">
                    Sign In
                  </Link>
               </div>
            </div>
         </div>
      </motion.section>

      {/* Enhanced Multi-Column Footer */}
      <footer id="contact" className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white pt-32 pb-16 transition-colors duration-500 border-t border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20 mb-32">
            <div className="lg:col-span-4 space-y-10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-[1.2rem] flex items-center justify-center shadow-2xl shadow-emerald-600/30">
                  <ShieldCheck className="text-white" size={24} strokeWidth={2.5} />
                </div>
                <span className="text-3xl font-black tracking-tighter uppercase">NeoDesk</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
                The gold standard in clinical operating systems. Standardizing neonatal care through precision engineering.
              </p>
              <div className="flex items-center space-x-4">
                {[MessageSquare, Mail, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-900 flex items-center justify-center transition-all">
                    <Icon size={20} strokeWidth={2.5} />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-10">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-600">Platform</h4>
              <ul className="space-y-6 text-sm font-bold text-slate-500 dark:text-slate-400">
                {['Overview', 'Registry', 'Dosing', 'Academy'].map(item => (
                  <li key={item}><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-10">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-600">Governance</h4>
              <ul className="space-y-6 text-sm font-bold text-slate-500 dark:text-slate-400">
                {['Privacy', 'Audit', 'Compliance', 'Security'].map(item => (
                  <li key={item}><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-10 bg-slate-50 dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-600">Global Operations</h4>
              <ul className="space-y-8">
                <li className="flex items-start space-x-4">
                  <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm"><MapPin className="text-emerald-600" size={18} /></div>
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-200 leading-snug">Precision Medical Center,<br />Westlands, Nairobi, KE</span>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm"><Phone className="text-emerald-600" size={18} /></div>
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-200">+254 (0) 700 000 000</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-16 border-t border-slate-100 dark:border-slate-900 flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="flex flex-col md:flex-row items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 dark:text-slate-600">
               <span>&copy; 2026 NeoDesk Clinical Systems</span>
               <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800" />
               <span>Precision. Integrity. Accuracy.</span>
            </div>
            
            <div className="flex items-center space-x-12">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest mb-2">Developed By</p>
                <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter">AlvinMutie</p>
              </div>
              <div className="w-px h-12 bg-slate-100 dark:bg-slate-900" />
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest mb-2">Build Signature</p>
                <p className="text-sm font-black text-emerald-600 uppercase tracking-tighter">v16.0 Stable</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
