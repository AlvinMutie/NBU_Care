import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ShieldCheck, Activity, Calculator, ClipboardList, BookOpen, ArrowRight, Zap, Heart, Shield, Sparkles, Star } from 'lucide-react';

const Landing: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 selection:bg-emerald-500/30 overflow-x-hidden font-sans">
      {/* Dynamic AI-Generated Style Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-500/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[130px] rounded-full" />
        <div className="absolute top-[20%] right-[15%] w-[10%] h-[10%] bg-purple-500/5 blur-[80px] rounded-full" />
      </div>

      {/* Modern Glass Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/5 bg-[#0f172a]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 lg:px-12">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">NeoDesk</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-10 text-sm font-medium text-slate-400">
             <a href="#features" className="hover:text-white transition-colors">Features</a>
             <a href="#impact" className="hover:text-white transition-colors">Impact</a>
             <a href="#security" className="hover:text-white transition-colors">Security</a>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/login" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Sign In</Link>
            <Link to="/register" className="bg-emerald-500 hover:bg-emerald-400 text-[#0f172a] px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Dribbble Inspiration */}
      <section className="relative z-10 pt-40 pb-32 px-6 lg:px-12">
        <motion.div 
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-400">
                <Sparkles size={16} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Next-Gen Clinical AI</span>
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-6xl lg:text-8xl font-extrabold tracking-tighter leading-[0.95] bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
                Smarter Care <br />
                <span className="text-emerald-500 italic">for the smallest.</span>
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-xl text-slate-400 max-w-lg leading-relaxed font-light">
                NeoDesk is a high-fidelity clinical operating system that standardizes neonatal workflows, eliminates dosing errors, and empowers clinical teams with real-time intelligence.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <Link to="/register" className="bg-emerald-500 hover:bg-emerald-400 text-[#0f172a] px-10 py-5 rounded-2xl font-bold flex items-center space-x-3 text-lg shadow-2xl shadow-emerald-500/30 transition-all hover:-translate-y-1 active:translate-y-0">
                  <span>Start Free Trial</span>
                  <ArrowRight size={22} />
                </Link>
                <div className="flex items-center -space-x-3">
                   {[1, 2, 3, 4].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0f172a] bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                        {['DR', 'RN', 'SN', 'CO'][i-1]}
                     </div>
                   ))}
                   <div className="pl-6 text-sm text-slate-500 font-medium">+500 Clinicians trust NeoDesk</div>
                </div>
              </motion.div>
            </div>

            {/* AI Generated Visualization Mockup */}
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <div className="bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-[2.5rem] p-1 shadow-2xl overflow-hidden group">
                 <div className="bg-[#0f172a] rounded-[2.4rem] p-6 lg:p-10 border border-white/10 relative overflow-hidden">
                    {/* Simulated Dashboard UI */}
                    <div className="flex items-center justify-between mb-10">
                       <div className="space-y-2">
                          <div className="h-4 w-32 bg-white/10 rounded-full animate-pulse" />
                          <div className="h-2 w-20 bg-white/5 rounded-full" />
                       </div>
                       <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                          <Zap size={24} fill="currentColor" />
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                       <div className="h-32 bg-white/5 rounded-3xl border border-white/10 p-4 space-y-4">
                          <div className="flex justify-between items-center">
                             <Heart className="text-red-400" size={18} />
                             <div className="h-2 w-10 bg-emerald-500/20 rounded-full" />
                          </div>
                          <div className="h-6 w-16 bg-white/10 rounded-lg" />
                       </div>
                       <div className="h-32 bg-white/5 rounded-3xl border border-white/10 p-4 space-y-4">
                          <div className="flex justify-between items-center">
                             <Activity className="text-blue-400" size={18} />
                             <div className="h-2 w-10 bg-blue-500/20 rounded-full" />
                          </div>
                          <div className="h-6 w-16 bg-white/10 rounded-lg" />
                       </div>
                    </div>

                    <div className="h-40 bg-emerald-500/5 rounded-3xl border border-emerald-500/10 p-6 flex flex-col justify-end relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4 text-emerald-500/20"><Star size={60} strokeWidth={1} /></div>
                       <div className="h-2 w-full bg-white/5 rounded-full mb-2" />
                       <div className="h-2 w-[60%] bg-emerald-500/50 rounded-full" />
                    </div>
                 </div>
              </div>
              
              {/* Floating Accents */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Feature Sections - Clean & Minimal */}
      <section id="features" className="py-32 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
             <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Precision at Scale.</h2>
                <p className="text-slate-400 max-w-xl text-lg font-light leading-relaxed">
                  Engineered to handle the most demanding neonatal environments with absolute safety and reliability.
                </p>
             </div>
             <div className="flex items-center space-x-2 text-emerald-400 font-bold uppercase tracking-widest text-xs">
                <span>View Full Spec</span>
                <ArrowRight size={14} />
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Smart Dosing', desc: 'AI-assisted weight-based drug calculations with 5-layer verification.', icon: Calculator, color: 'emerald' },
              { title: 'Seamless Handovers', desc: 'Eliminate shift gaps with structured, data-driven transition reports.', icon: ClipboardList, color: 'blue' },
              { title: 'Protocol Hub', desc: 'Institutional knowledge at your fingertips. Standardized, validated, accessible.', icon: BookOpen, color: 'purple' },
            ].map((f, i) => (
              <div key={i} className="group p-10 rounded-[2rem] bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/[0.02] transition-all duration-500">
                <div className={`w-14 h-14 rounded-2xl bg-${f.color}-500/10 text-${f.color}-400 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-black/20`}>
                  <f.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed font-light">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section - Data Driven */}
      <section id="impact" className="py-32 relative">
         <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 glass-card p-1 aspect-square rounded-[3rem] overflow-hidden">
               <div className="w-full h-full bg-[#0f172a] rounded-[2.9rem] flex items-center justify-center p-12">
                  <div className="space-y-12 w-full text-center">
                     <div>
                        <p className="text-7xl font-bold text-emerald-500 tracking-tighter">-94%</p>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-2 text-center">Reduction in Dosing Errors</p>
                     </div>
                     <div className="h-px bg-white/5 w-1/2 mx-auto" />
                     <div>
                        <p className="text-7xl font-bold text-white tracking-tighter">100%</p>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-2 text-center">Protocol Compliance</p>
                     </div>
                  </div>
               </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
               <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                  <Shield size={24} />
               </div>
               <h2 className="text-5xl font-bold tracking-tight leading-tight text-white">Security that puts <br /> patients first.</h2>
               <p className="text-slate-400 text-lg leading-relaxed font-light">
                 We believe technology should be invisible. NeoDesk works in the background to ensure every calculation is triple-checked against the latest neonatal standards.
               </p>
               <ul className="space-y-4">
                  {['Bank-grade Encryption', 'Full Audit Traceability', 'Institutional Single Sign-On'].map(item => (
                    <li key={item} className="flex items-center space-x-3 text-slate-300 font-medium">
                       <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                          <Zap size={10} fill="currentColor" />
                       </div>
                       <span>{item}</span>
                    </li>
                  ))}
               </ul>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 lg:px-12">
         <div className="max-w-7xl mx-auto rounded-[3.5rem] bg-gradient-to-br from-emerald-500 to-emerald-700 p-16 lg:p-24 text-center space-y-10 shadow-[0_40px_80px_-20px_rgba(16,185,129,0.3)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
            <motion.div 
               whileHover={{ scale: 1.02 }}
               className="relative z-10"
            >
               <h2 className="text-5xl lg:text-7xl font-extrabold text-[#0f172a] tracking-tighter leading-none mb-6">Ready to upgrade <br /> your unit?</h2>
               <p className="text-[#0f172a]/70 max-w-xl mx-auto text-xl font-medium leading-relaxed mb-10">
                 Join the forward-thinking clinical teams already delivering high-precision care with NeoDesk.
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/register" className="bg-[#0f172a] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-xl active:scale-95">
                    Register for Early Access
                  </Link>
                  <Link to="/login" className="bg-white/20 backdrop-blur-md text-[#0f172a] border border-[#0f172a]/10 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all active:scale-95">
                    Clinician Login
                  </Link>
               </div>
            </motion.div>
         </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 justify-center md:justify-start">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <ShieldCheck className="text-white" size={18} />
              </div>
              <span className="font-bold tracking-tight text-white text-lg">NeoDesk</span>
            </div>
            <p className="text-xs text-slate-500 max-w-xs font-medium">
              Professional decision-support for Neonatal Units. <br />
              &copy; 2026 NeoDesk Clinical Systems.
            </p>
          </div>
          <div className="flex items-center space-x-12">
             <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Version</p>
                <p className="text-sm font-bold text-emerald-500/70 tracking-tighter italic">16.0 Unified AI</p>
             </div>
             <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Design Lead</p>
                <p className="text-sm font-bold text-slate-300">AlvinMutie</p>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
