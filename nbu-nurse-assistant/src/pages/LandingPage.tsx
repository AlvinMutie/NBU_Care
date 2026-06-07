import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  ShieldCheck, Activity, Bell, Users, FileText, 
  Heart, CheckCircle2, Shield,
  Mail, MapPin, Stethoscope, Database,
  Play, Zap, Share2, Globe, MessageSquare
} from 'lucide-react';
import babyImage from '../assets/baby2.jpg';

const LandingPage: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const fadeInScale: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500 overflow-x-hidden scroll-smooth selection:bg-emerald-500/10">
      
      {/* 🏛️ 1. STICKY NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 lg:px-12">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-all">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">NeoDesk</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-10 text-[13px] font-semibold text-slate-500 dark:text-slate-400">
            <a href="#features" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Features</a>
            <a href="#why-neodesk" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Safety</a>
            <a href="#about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">About</a>
            <a href="#contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Contact</a>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login" className="hidden sm:block px-6 py-2.5 rounded-xl text-[13px] font-bold text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all">
              Login
            </Link>
            <Link to="/register" className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-[13px] font-bold shadow-lg shadow-emerald-500/20 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* 🖼️ 2. HERO SECTION (Full Screen with Integrated Background) */}
      <section className="relative h-[95vh] min-h-[700px] flex items-center pt-20 overflow-hidden">
        {/* Background Image with clinical blending */}
        <div className="absolute inset-0 z-0">
           <img 
            src={babyImage} 
            alt="Clinical Context" 
            className="w-full h-full object-cover object-[70%_center] filter saturate-[0.8] grayscale-[0.2]"
           />
           <div className="absolute inset-0 bg-gradient-to-tr from-white via-white/80 to-white/10 dark:from-[#0f172a] dark:via-[#0f172a]/80 dark:to-[#0f172a]/20 z-10" />
           <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white dark:from-[#0f172a]/20 dark:to-[#0f172a] z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-20 w-full">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-3xl space-y-8"
          >
            <motion.div variants={itemFadeUp} className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-50/80 dark:bg-emerald-900/40 border border-emerald-100/50 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              <Activity size={14} className="animate-pulse" />
              <span>NeoDesk Clinical OS v16.2</span>
            </motion.div>
            
            <motion.h1 variants={itemFadeUp} className="text-6xl lg:text-[88px] font-bold tracking-tight text-slate-900 dark:text-white leading-[0.95]">
              Smarter Care. <br />
              <span className="text-emerald-500">Better Outcomes.</span>
            </motion.h1>
            
            <motion.p variants={itemFadeUp} className="text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed font-medium">
              Eliminating variables in neonatal care through surgical precision and automated clinical intelligence.
            </motion.p>

            <motion.div variants={itemFadeUp} className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link to="/register" className="w-full sm:w-auto bg-[#0f172a] dark:bg-emerald-600 text-white px-12 py-5 rounded-2xl font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 text-center text-sm uppercase tracking-widest">
                Access Platform
              </Link>
              <div className="flex items-center space-x-4 cursor-pointer group">
                 <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-md">
                    <Play size={20} fill="currentColor" />
                 </div>
                 <span className="font-bold text-slate-500 dark:text-slate-400 uppercase text-xs tracking-widest group-hover:text-emerald-500 transition-colors">Watch Overview</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 🚀 3. CORE FEATURES SECTION */}
      <section id="features" className="py-32 bg-white dark:bg-[#0f172a] transition-colors duration-500 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
             <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-500"
             >
                Clinical Modules
             </motion.p>
             <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white"
             >
                Precision NICU Tools.
             </motion.h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                title: 'Physiological Monitoring', 
                desc: 'Real-time telemetry tracking for high-acuity neonatal patients.', 
                icon: Activity 
              },
              { 
                title: 'Structured Documentation', 
                desc: 'Forensic digital medical records designed for clinician speed.', 
                icon: FileText 
              },
              { 
                title: 'Safety Alert Engine', 
                desc: 'Intelligent threshold monitoring with real-time ward notifications.', 
                icon: Bell 
              },
              { 
                title: 'Team Orchestration', 
                desc: 'Automated handovers and synchronized shift continuity reporting.', 
                icon: Users 
              },
              { 
                title: 'Secure Health Ledger', 
                desc: 'AES-256 encrypted relational storage for long-term patient history.', 
                icon: Database 
              },
              { 
                title: 'Decision Support', 
                desc: 'Validated clinical pathways and dosing math for zero-error care.', 
                icon: Stethoscope 
              },
            ].map((f, i) => (
              <motion.div 
                key={i} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInScale}
                className="group p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:border-emerald-200"
              >
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 text-emerald-500 flex items-center justify-center mb-10 shadow-sm group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <f.icon size={32} />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{f.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 📊 4. IMPACT STATISTICS SECTION */}
      <section className="py-40 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-500 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Ward Uptime', value: '99.9%', icon: Activity },
              { label: 'Error Reduction', value: '-94%', icon: Database },
              { label: 'Decision Speed', value: '2.4s', icon: Zap },
              { label: 'User Trust', value: '400+', icon: Shield },
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center text-emerald-500 mx-auto shadow-xl border border-slate-100 dark:border-slate-700">
                  <s.icon size={28} />
                </div>
                <h4 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{s.value}</h4>
                <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✨ 5. WHY NEODESK SECTION */}
      <section id="why-neodesk" className="py-40 bg-white dark:bg-[#0f172a] transition-colors duration-500 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
           >
              <div className="absolute inset-0 bg-emerald-500/10 rounded-[3.5rem] blur-3xl" />
              <div className="relative bg-white dark:bg-slate-800 p-5 rounded-[4rem] shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
                 <img 
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" 
                  alt="Modern Hospital" 
                  className="rounded-[3.5rem] w-full object-cover aspect-[4/3] grayscale hover:grayscale-0 transition-all duration-1000"
                 />
              </div>
           </motion.div>
           <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
           >
              <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-emerald-500">Clinical Focus</h2>
              <h3 className="text-5xl lg:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white leading-[0.9]">NICU excellence redefined.</h3>
              <div className="space-y-6">
                {[
                  'Neonatal outcome prioritization.',
                  'Reduced clinician cognitive load.',
                  'Unified clinical patient context.',
                  'Seamless shift data transitions.'
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4">
                     <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white"><CheckCircle2 size={12} /></div>
                     <span className="text-lg font-medium text-slate-600 dark:text-slate-400">{item}</span>
                  </div>
                ))}
              </div>
           </motion.div>
        </div>
      </section>

      {/* 📖 6. ABOUT SECTION */}
      <section id="about" className="py-40 bg-slate-50 dark:bg-slate-900/30 transition-colors duration-500 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
           >
              <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-emerald-500">Our Story</h2>
              <h3 className="text-5xl lg:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white leading-[0.9]">Precision as a fundamental value.</h3>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Established to bridge the gap in digital infrastructure for neonatal units. Standardizing protocols to save lives through data integrity.
              </p>
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                 <p className="font-bold text-slate-900 dark:text-white">Dr. Alvin Mutie</p>
                 <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Chief Clinical Officer</p>
              </div>
           </motion.div>
           <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
           >
              <div className="space-y-6 pt-12">
                 <div className="bg-emerald-500 h-64 rounded-[3rem] p-8 text-white flex flex-col justify-end shadow-2xl">
                    <Heart size={40} className="mb-6 opacity-40" />
                    <p className="text-2xl font-black leading-none">Safe.</p>
                 </div>
              </div>
              <div className="space-y-6">
                 <div className="bg-[#0f172a] h-48 rounded-[3rem] p-8 text-white flex flex-col justify-end shadow-2xl">
                    <Shield size={32} className="text-emerald-500 mb-6" />
                    <p className="text-lg font-bold leading-none">Secure.</p>
                 </div>
                 <div className="bg-slate-200 dark:bg-slate-700 h-64 rounded-[3rem] p-8 flex flex-col justify-end">
                    <Zap size={40} className="text-emerald-500 mb-6 opacity-60" />
                    <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">Fast.</p>
                 </div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* 🚀 7. CTA SECTION */}
      <section className="py-24 px-6 lg:px-12 bg-white dark:bg-[#0f172a] transition-colors duration-500">
         <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto rounded-[4rem] bg-gradient-to-br from-emerald-500 to-emerald-700 p-12 lg:p-28 text-center space-y-10 shadow-2xl relative overflow-hidden"
         >
            <div className="relative z-10 space-y-10">
               <h2 className="text-5xl lg:text-8xl font-bold text-white tracking-tighter leading-none">Transforming care.</h2>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link to="/register" className="w-full sm:w-auto bg-[#0f172a] text-white px-16 py-6 rounded-[2rem] font-bold shadow-2xl hover:scale-105 transition-all text-lg uppercase tracking-widest">
                    Get Started
                  </Link>
               </div>
            </div>
         </motion.div>
      </section>

      {/* 🏛️ 8. FOOTER */}
      <footer id="contact" className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white pt-40 pb-20 border-t border-slate-100 dark:border-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20 mb-32">
            <div className="lg:col-span-6 space-y-10 text-left">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                  <ShieldCheck className="text-white" size={28} />
                </div>
                <span className="text-3xl font-bold tracking-tighter uppercase">NeoDesk</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed font-medium max-w-md">
                Standardizing neonatal care through surgical precision and premium healthcare technology.
              </p>
              <div className="flex items-center space-x-6 text-slate-400">
                {[MessageSquare, Share2, Globe, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="hover:text-emerald-500 transition-colors shadow-sm"><Icon size={24} /></a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8 text-left">
              <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-500">Platform</h4>
              <ul className="space-y-6 text-lg font-bold text-slate-400 dark:text-slate-500">
                <li><a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Features</a></li>
                <li><a href="#why-neodesk" className="hover:text-slate-900 dark:hover:text-white transition-colors">Safety</a></li>
                <li><a href="#about" className="hover:text-slate-900 dark:hover:text-white transition-colors">About</a></li>
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-8 text-left">
              <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-500">Connect</h4>
              <ul className="space-y-8">
                <li className="flex items-center space-x-5">
                  <MapPin className="text-emerald-500" size={22} />
                  <span className="text-lg font-bold text-slate-900 dark:text-slate-200">Westlands, Nairobi, KE</span>
                </li>
                <li className="flex items-center space-x-5">
                  <Mail className="text-emerald-500" size={22} />
                  <span className="text-lg font-bold text-slate-900 dark:text-slate-200">hello@neodesk.care</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-16 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-10">
             <div className="text-sm font-bold text-slate-300 dark:text-slate-700 uppercase tracking-widest">
                &copy; 2026 NeoDesk Clinical Systems. v16.2 Stable.
             </div>
             <div className="text-xs font-bold text-emerald-600/50 uppercase tracking-[0.2em]">Designed by AlvinMutie</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
