import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  ShieldCheck, Activity, Bell, Users, FileText, 
  Heart, CheckCircle2, Shield,
  Globe, Mail, MapPin, Phone,
  MessageSquare, Stethoscope, Database,
  Play
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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500 overflow-x-hidden scroll-smooth">
      
      {/* 1. Navigation Bar */}
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
            <a href="#why-neodesk" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Why NeoDesk</a>
            <a href="#about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">About</a>
            <a href="#contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Contact</a>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login" className="px-6 py-2.5 rounded-xl text-[13px] font-bold text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all">
              Login
            </Link>
            <Link to="/register" className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-[13px] font-bold shadow-lg shadow-emerald-500/20 transition-all">
              Access Platform
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section (Full Screen) */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-tr from-slate-50 to-white dark:from-[#0f172a] dark:to-[#1e293b]">
        {/* Background Visuals - Healthcare Inspired */}
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 dark:from-[#0f172a] dark:via-[#0f172a]/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent dark:from-[#0f172a] to-white dark:to-[#0f172a] z-10" />
          <img 
            src={babyImage} 
            alt="Neonatal Care" 
            className="w-full h-full object-cover object-[70%_center] opacity-60 dark:opacity-40 filter saturate-[0.8] brightness-105 transition-all duration-1000"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest">
              <Activity size={14} className="animate-pulse" />
              <span>Next-Gen Neonatal Monitoring</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl lg:text-[72px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Smarter Neonatal Care. <br />
              <span className="text-emerald-500 underline decoration-emerald-500/30">Better Outcomes.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              NeoDesk is a professional-grade clinical operating system designed to standardize neonatal care through precision engineering and trustworthy healthcare technology.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/register" className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold shadow-2xl shadow-emerald-500/30 transition-all hover:-translate-y-1 active:translate-y-0 text-center">
                Access Platform
              </Link>
              <a href="#features" className="w-full sm:w-auto px-10 py-4 rounded-2xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-center">
                Learn More
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center space-x-8 pt-8">
               <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Clinician" />
                    </div>
                  ))}
               </div>
               <p className="text-xs font-medium text-slate-400">
                  Trusted by <span className="font-bold text-slate-900 dark:text-white">400+</span> neonatal specialists worldwide.
               </p>
            </motion.div>
          </motion.div>

          {/* Right Side: Dashboard Preview Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden lg:block relative"
          >
             {/* Floating Stat Card 1 */}
             <div className="absolute -top-10 -left-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/20 z-20">
                <div className="flex items-center space-x-4">
                   <div className="w-10 h-10 bg-rose-50 dark:bg-rose-900/20 rounded-lg flex items-center justify-center text-rose-500">
                      <Heart size={20} fill="currentColor" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase text-slate-400">Heart Rate</p>
                      <p className="text-xl font-black text-slate-900 dark:text-white">142 BPM</p>
                   </div>
                </div>
             </div>

             {/* Main Preview Component */}
             <div className="bg-slate-200/20 dark:bg-white/5 rounded-[2.5rem] p-4 backdrop-blur-sm border border-white/10 shadow-2xl">
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-inner border border-slate-200 dark:border-slate-800 aspect-[4/3] flex items-center justify-center relative">
                   <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5" />
                   <div className="text-center space-y-4 relative z-10 px-8">
                      <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center text-emerald-500 mx-auto">
                         <Play size={24} fill="currentColor" />
                      </div>
                      <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Clinical OS v16.2</h4>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">Interactive Monitoring Dashboard Preview</p>
                   </div>
                </div>
             </div>

             {/* Floating Stat Card 2 */}
             <div className="absolute -bottom-10 -right-10 bg-emerald-500 p-5 rounded-2xl shadow-2xl z-20 text-white">
                <div className="flex items-center space-x-4">
                   <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <CheckCircle2 size={20} />
                   </div>
                   <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Safety Check</p>
                      <p className="text-xl font-bold">100% Passed</p>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Core Features Section */}
      <section id="features" className="py-32 bg-white dark:bg-[#0f172a] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
             <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-500">Precision Engineering</h2>
             <h3 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">Professional Clinical Features</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: 'Neonatal Monitoring', 
                desc: 'Real-time physiological telemetry and vitals tracking with clinical precision.', 
                icon: Activity 
              },
              { 
                title: 'Clinical Documentation', 
                desc: 'Structured medical records designed for the high-stakes environment of the NICU.', 
                icon: FileText 
              },
              { 
                title: 'Patient Safety Alerts', 
                desc: 'Proactive threshold monitoring and intelligent early-warning systems.', 
                icon: Bell 
              },
              { 
                title: 'Staff Collaboration', 
                desc: 'Unified team communication and automated handover reporting orchestration.', 
                icon: Users 
              },
              { 
                title: 'Digital Health Records', 
                desc: 'Secure, accessible, and comprehensive patient history for informed decision making.', 
                icon: Database 
              },
              { 
                title: 'Clinical Decision Support', 
                desc: 'Intelligent engines providing evidence-based guidance for NICU workflows.', 
                icon: Stethoscope 
              },
            ].map((f, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="group p-10 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:border-emerald-100 dark:hover:border-emerald-900"
              >
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 text-emerald-500 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                  <f.icon size={28} />
                </div>
                <h4 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{f.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm font-medium">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why NeoDesk Section (Split Layout) */}
      <section id="why-neodesk" className="py-32 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-[3rem] blur-3xl" />
              <div className="relative bg-white dark:bg-slate-800 p-4 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-700">
                 <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800" 
                  alt="Hospital Environment" 
                  className="rounded-[2.5rem] w-full object-cover aspect-[4/3] grayscale hover:grayscale-0 transition-all duration-700"
                 />
              </div>
           </div>
           <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-500">Clinical Excellence</h2>
              <h3 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">Designed to support <br /> healthcare professionals.</h3>
              <ul className="space-y-6">
                {[
                  { title: 'Improving Neonatal Outcomes', desc: 'Standardized care paths and precision monitoring for newborn health.' },
                  { title: 'Supporting Professionals', desc: 'Reducing cognitive load with intuitive, hospital-grade UI/UX design.' },
                  { title: 'Centralizing Information', desc: 'A unified clinical OS for the entire Neonatal Building Unit.' },
                  { title: 'Enhancing Workflows', desc: 'Forensic digital orchestration for shift continuities and handovers.' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-4">
                     <div className="mt-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                        <CheckCircle2 size={12} />
                     </div>
                     <div>
                        <h5 className="font-bold text-slate-900 dark:text-white">{item.title}</h5>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">{item.desc}</p>
                     </div>
                  </li>
                ))}
              </ul>
           </div>
        </div>
      </section>

      {/* 5. Platform Preview Section */}
      <section className="py-32 bg-white dark:bg-[#0f172a] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center space-y-20">
           <div className="space-y-6 max-w-3xl mx-auto">
              <h3 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">Designed for Healthcare Professionals</h3>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">Experience a system built for zero-error clinical performance.</p>
           </div>

           <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-slate-900 rounded-[3rem] p-10 lg:p-20 shadow-2xl overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                    {/* Mockup Column 1 */}
                    <div className="space-y-6">
                       <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 text-left space-y-4">
                          <div className="flex items-center space-x-3">
                             <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center"><Heart size={20} className="text-white" /></div>
                             <span className="font-bold text-white uppercase text-xs tracking-widest">Neonatal Profile</span>
                          </div>
                          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                             <div className="h-full bg-emerald-500 w-[65%]" />
                          </div>
                          <p className="text-[10px] text-white/60 font-medium tracking-wide leading-relaxed">BIO-ID: NBU-094-X / GA: 28w 4d / Weight: 1240g</p>
                       </div>
                    </div>
                    {/* Mockup Column 2 (Main Chart) */}
                    <div className="lg:col-span-2 bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 text-left relative overflow-hidden">
                       <div className="flex justify-between items-center mb-8">
                          <h4 className="font-bold text-white uppercase text-xs tracking-[0.2em]">Monitoring Telemetry</h4>
                          <div className="flex space-x-2">
                             <div className="w-2 h-2 rounded-full bg-emerald-500" />
                             <div className="w-2 h-2 rounded-full bg-amber-500" />
                          </div>
                       </div>
                       <div className="h-48 w-full flex items-end justify-between space-x-1">
                          {[40, 70, 45, 90, 65, 80, 55, 75, 40, 85, 50, 70, 45].map((h, i) => (
                            <motion.div 
                              key={i} 
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ delay: i * 0.05, duration: 1 }}
                              className="flex-1 bg-emerald-500/40 rounded-t-sm" 
                            />
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 6. Impact Statistics Section */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: '24/7 Clinical Monitoring', value: 'Live Telemetry', icon: Activity },
              { label: '100% Digital Records', value: 'Forensic Precision', icon: Database },
              { label: 'Real-Time Safety Alerts', value: 'Threshold Logic', icon: Bell },
              { label: 'Secure Role-Based Access', value: 'Institutional SSO', icon: Shield },
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm text-center space-y-4 border border-slate-100 dark:border-slate-700"
              >
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-500 mx-auto">
                  <s.icon size={24} />
                </div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed">{s.label}</h4>
                <p className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{s.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. About Section */}
      <section id="about" className="py-32 bg-white dark:bg-[#0f172a] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-8">
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-500">The NeoDesk Story</h2>
              <h3 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">Transforming clinical safety through innovation.</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                NeoDesk was born from a simple yet powerful mission: to eliminate clinical variables and human error in neonatal wards. By centralizing patient data and automating high-stakes calculations, we enable clinicians to focus on what matters most—saving lives.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                 <div>
                    <h4 className="text-4xl font-black text-emerald-500 tracking-tighter">94%</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Error Reduction</p>
                 </div>
                 <div>
                    <h4 className="text-4xl font-black text-emerald-500 tracking-tighter">2.4s</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Data Retrieval</p>
                 </div>
              </div>
           </div>
           <div className="relative">
              <div className="absolute inset-0 bg-blue-500/10 rounded-[3rem] blur-3xl" />
              <div className="relative bg-white dark:bg-slate-800 p-8 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-700">
                 <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                       <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white"><Stethoscope size={20} /></div>
                       <p className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">Clinical Safety Priority</p>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                       <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white"><Activity size={20} /></div>
                       <p className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">Standardized NICU Protocols</p>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                       <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center text-white"><Database size={20} /></div>
                       <p className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">Secure Digital Transformation</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 8. Final Call-to-Action Section */}
      <section className="py-20 px-6 lg:px-12 bg-white dark:bg-[#0f172a] transition-colors duration-500">
         <motion.div 
          whileHover={{ scale: 1.01 }}
          className="max-w-7xl mx-auto rounded-[3.5rem] bg-gradient-to-br from-emerald-500 to-emerald-700 p-12 lg:p-24 text-center space-y-10 shadow-[0_50px_100px_-20px_rgba(16,185,129,0.4)] relative overflow-hidden"
         >
            <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none transform translate-x-1/3 -translate-y-1/3 text-white">
               <ShieldCheck size={500} strokeWidth={1} />
            </div>
            
            <div className="relative z-10 space-y-8">
               <h2 className="text-4xl lg:text-7xl font-bold text-white tracking-tight leading-none">Ready to Transform <br /> Neonatal Care?</h2>
               <p className="text-emerald-50 max-w-2xl mx-auto text-lg font-medium leading-relaxed opacity-90">
                 Join the growing network of NICU units using the most advanced clinical operating system for neonatal health outcomes.
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                  <Link to="/register" className="w-full sm:w-auto bg-slate-900 text-white px-12 py-5 rounded-2xl font-bold shadow-2xl transition-all hover:bg-black active:scale-95">
                    Access Platform
                  </Link>
                  <button className="w-full sm:w-auto bg-white/20 backdrop-blur-md text-white border border-white/30 px-12 py-5 rounded-2xl font-bold hover:bg-white/30 transition-all">
                    Contact Administrator
                  </button>
               </div>
            </div>
         </motion.div>
      </section>

      {/* 9. Footer */}
      <footer id="contact" className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-24 pb-12 transition-colors duration-500 border-t border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
            <div className="lg:col-span-4 space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-2xl shadow-emerald-500/30">
                  <ShieldCheck className="text-white" size={24} />
                </div>
                <span className="text-2xl font-bold tracking-tight uppercase">NeoDesk</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed font-medium">
                The gold standard in clinical operating systems. Standardizing neonatal care through precision engineering.
              </p>
              <div className="flex items-center space-x-4">
                {[MessageSquare, Mail, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all flex items-center justify-center">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8 text-left">
              <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-500">Platform</h4>
              <ul className="space-y-4 text-[14px] font-bold text-slate-500 dark:text-slate-400">
                <li><a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Features</a></li>
                <li><a href="#why-neodesk" className="hover:text-slate-900 dark:hover:text-white transition-colors">Overview</a></li>
                <li><a href="#about" className="hover:text-slate-900 dark:hover:text-white transition-colors">About</a></li>
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-8 text-left">
              <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-500">Legal</h4>
              <ul className="space-y-4 text-[14px] font-bold text-slate-500 dark:text-slate-400">
                <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Compliance</a></li>
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-8 text-left">
              <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-500">Connect</h4>
              <ul className="space-y-6">
                <li className="flex items-center space-x-4">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 text-emerald-500"><MapPin size={18} /></div>
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-200">Westlands, Nairobi, KE</span>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 text-emerald-500"><Phone size={18} /></div>
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-200">+254 (0) 700 000 000</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">
             <span>&copy; 2026 NeoDesk Clinical Systems. All Rights Reserved.</span>
             <div className="flex items-center space-x-6">
                <span className="text-slate-300 dark:text-slate-700">Hospital Grade OS</span>
                <span className="text-emerald-500/50">v16.2 Stable</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
