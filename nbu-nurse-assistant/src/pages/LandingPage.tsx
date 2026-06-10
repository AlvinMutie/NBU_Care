import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  ShieldCheck, Activity, Bell, Users, FileText, 
  Heart, CheckCircle2, Shield,
  Mail, MapPin, Stethoscope, Database,
  Zap, Share2, Globe, MessageSquare, Send,
  Phone, Clock,
  ChevronRight, ArrowRight, UserPlus, Calendar, Plus,
  BarChart3, BookOpen, ClipboardList, Droplets
} from 'lucide-react';
import babyImage from '../assets/baby2.jpg';
import logo from '../assets/logo.png';

const LandingPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', institution: '' });

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

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500 overflow-x-hidden scroll-smooth selection:bg-emerald-500/10">
      
      {/* 📞 1. TOP BAR */}
      <div className="hidden lg:block bg-slate-900 text-white py-3 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
           <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                 <Clock size={14} className="text-emerald-500" />
                 <span>Shift: 24/7 Clinical Oversight</span>
              </div>
              <div className="flex items-center space-x-2">
                 <Phone size={14} className="text-emerald-500" />
                 <span>+254 700 000 000</span>
              </div>
              <div className="flex items-center space-x-2">
                 <Mail size={14} className="text-emerald-500" />
                 <span>support@neodesk.org</span>
              </div>
           </div>
           <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-emerald-500 transition-colors"><Globe size={14} /></a>
              <a href="#" className="hover:text-emerald-500 transition-colors"><Share2 size={14} /></a>
              <a href="#" className="hover:text-emerald-500 transition-colors"><MessageSquare size={14} /></a>
              <a href="#" className="hover:text-emerald-500 transition-colors"><Mail size={14} /></a>
           </div>
        </div>
      </div>

      {/* 🏛️ 2. STICKY NAVIGATION BAR */}
      <nav className="sticky top-0 left-0 right-0 z-50 h-20 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 lg:px-12">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20 group-hover:scale-105 transition-all overflow-hidden border border-slate-100 dark:border-slate-800">
              <img src={logo} alt="NeoDesk Logo" className="w-full h-full object-cover scale-150" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">NeoDesk</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-10 text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
            <a href="#about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Who We Are</a>
            <a href="#services" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Services</a>
            <a href="#team" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Clinicians</a>
            <a href="#events" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Events</a>
            <a href="#contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Contact</a>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login" className="px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all">
              Login
            </Link>
            <Link to="/register" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-emerald-600/20 transition-all">
              Join Unit
            </Link>
          </div>
        </div>
      </nav>

      {/* 🖼️ 3. HERO SECTION (Banner style) */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <img 
            src={babyImage} 
            alt="Clinical Context" 
            className="w-full h-full object-cover object-[70%_center]"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-20 w-full">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-3xl space-y-8"
          >
            <motion.div variants={itemFadeUp} className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
               <Shield size={14} fill="currentColor" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Institutional Grade Safety</span>
            </motion.div>
            <motion.h1 variants={itemFadeUp} className="text-6xl lg:text-[80px] font-black tracking-tighter text-white leading-[0.9]">
              Precision <br />
              <span className="text-emerald-500 text-[1.1em]">Neonatal Care.</span>
            </motion.h1>
            
            <motion.p variants={itemFadeUp} className="text-xl text-slate-300 max-w-xl leading-relaxed font-medium">
              A specialized clinical operating system designed for surgical precision in neonatal ward management and student learning.
            </motion.p>

            <motion.div variants={itemFadeUp} className="flex flex-wrap gap-4 pt-4">
              <Link to="/register" className="bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl transition-all hover:bg-emerald-700 active:scale-95 flex items-center space-x-3">
                <span>Access Clinical Core</span>
                <ArrowRight size={16} />
              </Link>
              <a href="#about" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:bg-white/20">
                Institutional Story
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 🏥 4. QUICK HIGHLIGHTS / TOP SERVICES */}
      <section className="relative z-30 -mt-16 max-w-7xl mx-auto px-6 lg:px-12">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
               { t: 'Emergency Response', d: 'Critical intervention protocols for high-acuity neonates.', i: Zap, c: 'bg-emerald-600' },
               { t: 'Clinical Academy', d: 'Interactive learning pathways for specialized nursing staff.', i: BookOpen, c: 'bg-slate-900' },
               { t: 'Dosing Precision', d: 'Zero-error medication pipeline and weight-based math.', i: Stethoscope, c: 'bg-emerald-700' },
            ].map((item, i) => (
               <div key={i} className={`${item.c} p-10 rounded-[2.5rem] text-white shadow-2xl hover:-translate-y-2 transition-transform duration-500`}>
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                     <item.i size={24} />
                  </div>
                  <h4 className="text-xl font-bold mb-4">{item.t}</h4>
                  <p className="text-white/70 text-sm font-medium leading-relaxed mb-6">{item.d}</p>
                  <a href="#" className="inline-flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest border-b border-white/30 pb-1 hover:border-white transition-all">
                     <span>Know More</span>
                     <Plus size={10} />
                  </a>
               </div>
            ))}
         </div>
      </section>

      {/* 📖 5. ABOUT US SECTION */}
      <section id="about" className="py-32 bg-white dark:bg-[#0f172a]">
         <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               <div className="relative group">
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-[3rem] blur-3xl group-hover:bg-emerald-500/20 transition-all" />
                  <div className="relative bg-slate-100 dark:bg-slate-800 p-4 rounded-[4rem] shadow-2xl overflow-hidden">
                     <img 
                      src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800" 
                      alt="Who We Are" 
                      className="rounded-[3rem] w-full object-cover aspect-[4/5]"
                     />
                  </div>
               </div>
               <div className="space-y-10">
                  <div className="space-y-4">
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Who We Are</p>
                     <h3 className="text-5xl lg:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
                        Advancing <br /> Clinical Safety.
                     </h3>
                  </div>
                  <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                     NeoDesk is not just a platform; it is a clinical standard. We provide the digital infrastructure required to eliminate medical variables and ensure every neonate receives institutional-grade care.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                     {[
                        { t: 'Safety First', d: 'Protocols validated by clinical boards.', i: ShieldCheck },
                        { t: 'Real-time Tech', d: 'Zero-latency ward orchestration.', i: Zap },
                     ].map((item, i) => (
                        <div key={i} className="flex items-start space-x-4">
                           <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-600">
                              <item.i size={20} />
                           </div>
                           <div>
                              <p className="font-bold text-slate-900 dark:text-white">{item.t}</p>
                              <p className="text-sm text-slate-500 font-medium">{item.d}</p>
                           </div>
                        </div>
                     ))}
                  </div>
                  <button className="bg-slate-900 dark:bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center space-x-3">
                     <span>Our Full Clinical Story</span>
                     <ChevronRight size={14} />
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* 🚀 6. SERVICES DETAIL SECTION */}
      <section id="services" className="py-32 bg-slate-50 dark:bg-slate-900/50">
         <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Our Specialization</p>
               <h3 className="text-4xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">Institutional Services.</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {[
                  { t: 'Fluid Intelligence', d: 'Automated calculation for TFI and GIR to prevent electrolyte imbalances.', i: Droplets },
                  { t: 'Vetting Pipeline', d: 'Forensic credentialing of medical staff before ward access.', i: UserPlus },
                  { t: 'Shift Continuity', d: 'Professional SBAR handover generation for seamless care transitions.', i: ClipboardList },
                  { t: 'Audit Trail', d: 'Immutable clinical history logging for legal and medical review.', i: Database },
                  { t: 'Ward Analytics', d: 'Real-time performance metrics for nursing in-charges.', i: BarChart3 },
                  { t: 'Mobile Command', d: 'Fully responsive cloud interface for bedside tablet use.', i: Globe },
               ].map((s, i) => {
                  const Icon = s.i || Activity;
                  return (
                     <div key={i} className="group p-10 rounded-[3rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all hover:border-emerald-200">
                        <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-600 mb-10 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                           <Icon size={28} />
                        </div>
                        <h4 className="text-2xl font-bold mb-4">{s.t}</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">{s.d}</p>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>

      {/* 📝 7. APPOINTMENT / INQUIRY SECTION */}
      <section className="py-32 bg-slate-900 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-40 opacity-5 text-white pointer-events-none">
            <Stethoscope size={600} />
         </div>
         <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10 text-white">
               <h3 className="text-5xl lg:text-7xl font-black tracking-tighter leading-tight">Book Institutional <br /> Onboarding.</h3>
               <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-lg">
                  Request a clinical demonstration of the NeoDesk ecosystem for your neonatal department.
               </p>
               <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 bg-emerald-600/20 rounded-2xl flex items-center justify-center text-emerald-500">
                        <MapPin size={24} />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Headquarters</p>
                        <p className="font-bold">NeoDesk Clinical Core, Nairobi</p>
                     </div>
                  </div>
                  <div className="flex items-center space-x-4 text-emerald-500">
                     <Clock size={24} />
                     <p className="font-bold">24/7 Clinical Support Operational</p>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-[3rem] p-12 shadow-2xl space-y-8">
               <div className="space-y-2">
                  <h4 className="text-3xl font-black tracking-tight text-slate-900">Get in Touch</h4>
                  <p className="text-sm text-slate-500 font-medium">Initialize institutional link today.</p>
               </div>
               <form className="grid grid-cols-1 gap-4">
                  <input 
                   type="text" 
                   placeholder="Clinician / Administrator Name" 
                   className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-emerald-500 transition-all"
                  />
                  <div className="grid grid-cols-2 gap-4">
                     <input 
                      type="email" 
                      placeholder="Official Email" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-emerald-500 transition-all"
                     />
                     <input 
                      type="text" 
                      placeholder="Department" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-emerald-500 transition-all"
                     />
                  </div>
                  <textarea 
                   placeholder="Institutional Requirements / Message" 
                   rows={4}
                   className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-emerald-500 transition-all resize-none"
                  />
                  <button className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 transition-all">
                     Initiate Institutional Vetting
                  </button>
               </form>
            </div>
         </div>
      </section>

      {/* 👨‍⚕️ 8. DOCTOR TEAM SECTION */}
      <section id="team" className="py-32 bg-white dark:bg-[#0f172a]">
         <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Our Clinicians</p>
               <h3 className="text-4xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">Specialized Expertise.</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                  { n: 'Dr. Alvin Mutie', r: 'Chief Clinical Officer', i: 'https://i.pravatar.cc/300?u=alvin' },
                  { n: 'Sarah Jenkins', r: 'Nursing In-Charge', i: 'https://i.pravatar.cc/300?u=sarah' },
                  { n: 'Dr. Michael Chen', r: 'Lead Pediatrician', i: 'https://i.pravatar.cc/300?u=michael' },
                  { n: 'Emma Wilson', r: 'Clinical Coordinator', i: 'https://i.pravatar.cc/300?u=emma' },
               ].map((d, i) => (
                  <div key={i} className="group space-y-6">
                     <div className="relative overflow-hidden rounded-[3rem] bg-slate-100 aspect-square">
                        <img src={d.i} alt={d.n} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                           <div className="flex space-x-4 text-white">
                              <Globe size={16} />
                              <Share2 size={16} />
                              <Mail size={16} />
                           </div>
                        </div>
                     </div>
                     <div className="text-center">
                        <h5 className="text-xl font-bold text-slate-900 dark:text-white">{d.n}</h5>
                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">{d.r}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 📅 9. UPCOMING EVENTS / NEWS */}
      <section id="events" className="py-32 bg-slate-50 dark:bg-slate-900/50">
         <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
               <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">What's New</p>
                  <h3 className="text-4xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">Institutional Updates.</h3>
               </div>
               <button className="text-[10px] font-black uppercase tracking-widest text-emerald-600 border-b-2 border-emerald-100 pb-1 hover:border-emerald-600 transition-all">
                  View All Events
               </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {[
                  { t: 'Protocol v16.4 Deployment', d: 'Standardizing TFI protocols across all registered units.', date: '12 JUN 2026', c: 'Simulation' },
                  { t: 'Global Neonatal Summit', d: 'Dr. Alvin Mutie to present the NeoDesk safety audit framework.', date: '28 JUN 2026', c: 'Conference' },
               ].map((e, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 p-10 rounded-[3rem] shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row gap-10">
                     <div className="w-full md:w-48 h-48 bg-slate-100 dark:bg-slate-900 rounded-[2.5rem] flex flex-col items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700">
                        <p className="text-4xl font-black tracking-tighter">{e.date.split(' ')[0]}</p>
                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{e.date.split(' ').slice(1).join(' ')}</p>
                     </div>
                     <div className="space-y-4 py-2">
                        <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-md text-[9px] font-black uppercase tracking-widest">{e.c}</span>
                        <h4 className="text-2xl font-bold">{e.t}</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">{e.d}</p>
                        <a href="#" className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:translate-x-2 transition-transform">
                           <span>Read Full Report</span>
                           <ArrowRight size={14} />
                        </a>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ⭐ 10. TESTIMONIALS */}
      <section className="py-32 bg-white dark:bg-[#0f172a]">
         <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-24 text-center space-y-10 relative overflow-hidden">
               <div className="absolute top-0 left-0 p-20 opacity-5 text-white pointer-events-none">
                  <MessageSquare size={300} />
               </div>
               <div className="relative z-10 space-y-12">
                  <div className="flex justify-center space-x-2 text-emerald-500">
                     {[1,2,3,4,5].map(i => <Zap key={i} size={20} fill="currentColor" />)}
                  </div>
                  <h4 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-tight italic max-w-4xl mx-auto">
                     "The clinical precision and structural safety introduced by NeoDesk has reduced our ward's variable cognitive load by 40%. It's the new standard."
                  </h4>
                  <div className="pt-6">
                     <p className="text-xl font-bold text-white">Chief Nurse Officer</p>
                     <p className="text-xs font-black text-emerald-500 uppercase tracking-[0.3em]">General Referral Hospital</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 🏛️ 11. FOOTER */}
      <footer className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-32 pb-16 transition-colors">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20 mb-24">
            <div className="lg:col-span-4 space-y-10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-2xl overflow-hidden p-1 border border-slate-100">
                  <img src={logo} alt="NeoDesk Logo" className="w-full h-full object-cover scale-150" />
                </div>
                <span className="text-3xl font-black tracking-tighter uppercase">NeoDesk</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium">
                Standardizing neonatal care through surgical precision and premium healthcare technology. Established to save lives through data integrity.
              </p>
              <div className="flex items-center space-x-6 text-slate-400">
                <a href="#" className="hover:text-emerald-500 transition-colors"><Globe size={24} /></a>
                <a href="#" className="hover:text-emerald-500 transition-colors"><Share2 size={24} /></a>
                <a href="#" className="hover:text-emerald-500 transition-colors"><MessageSquare size={24} /></a>
                <a href="#" className="hover:text-emerald-500 transition-colors"><Mail size={24} /></a>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-500">Quick Links</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
                <li><a href="#about" className="hover:text-emerald-600 transition-colors">Who We Are</a></li>
                <li><a href="#services" className="hover:text-emerald-600 transition-colors">Our Services</a></li>
                <li><a href="#team" className="hover:text-emerald-600 transition-colors">Specialists</a></li>
                <li><a href="#events" className="hover:text-emerald-600 transition-colors">Institutional News</a></li>
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-500">Latest Updates</h4>
              <div className="space-y-6">
                 <div className="flex space-x-4 items-start">
                    <div className="w-16 h-16 rounded-2xl bg-white shrink-0 border border-slate-100" />
                    <div>
                       <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight mb-1">Standardizing TFI across Nairobi Units.</p>
                       <p className="text-[9px] text-slate-400 font-black uppercase">12 Jun 2026</p>
                    </div>
                 </div>
                 <div className="flex space-x-4 items-start">
                    <div className="w-16 h-16 rounded-2xl bg-white shrink-0 border border-slate-100" />
                    <div>
                       <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight mb-1">Dr. Alvin Mutie on safety audits.</p>
                       <p className="text-[9px] text-slate-400 font-black uppercase">10 Jun 2026</p>
                    </div>
                 </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-500">Location</h4>
              <div className="space-y-6 text-sm font-bold text-slate-500 dark:text-slate-400">
                <div className="flex items-start space-x-4">
                   <MapPin size={20} className="text-emerald-500 shrink-0" />
                   <p>Clinical Intelligence Node, <br /> Upper Hill, Nairobi, Kenya.</p>
                </div>
                <div className="flex items-center space-x-4">
                   <Phone size={20} className="text-emerald-500 shrink-0" />
                   <p>+254 700 000 000</p>
                </div>
                <div className="flex items-center space-x-4">
                   <Mail size={20} className="text-emerald-500 shrink-0" />
                   <p>info@neodesk.org</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-10">
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                &copy; 2026 NeoDesk Clinical Systems. Secure Institutional Ledger.
             </div>
             <div className="text-[10px] font-black text-emerald-600/50 uppercase tracking-[0.2em]">Designed by AlvinMutie</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
