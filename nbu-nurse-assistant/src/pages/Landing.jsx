import React from 'react';
import { 
  Stethoscope, Activity, Calculator, 
  ArrowRight, Globe, Zap, ShieldCheck,
  Lock, Database, UserCheck, CheckCircle2, BriefcaseMedical
} from 'lucide-react';
import heroNewborn from '../assets/hero_newborn.jpg';

export default function Landing({ onEnter }) {
  const handleLogin = () => {
    if (onEnter) onEnter();
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-primary/20 selection:text-primary-dark overflow-x-hidden medical-mesh-gradient">
      
      {/* Navigation */}
      <nav className="absolute top-0 w-full bg-transparent z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-24 flex flex-row items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-105 transition-transform backdrop-blur-md border border-white/10">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tighter text-white leading-none">Neo<span className="text-primary">Desk</span></h1>
              <div className="flex items-center gap-1 mt-1">
                 <div className="w-2 h-0.5 bg-primary rounded-full" />
                 <span className="text-[9px] uppercase tracking-[0.3em] font-black text-slate-400">Clinical Intelligence</span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-10">
            <a href="#features" className="text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors">Capabilities</a>
            <a href="#compliance" className="text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors">Standards</a>
            <a href="#trust" className="text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors">Impact</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLogin}
              className="group relative flex items-center gap-2 bg-primary overflow-hidden text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-primary/20 hover:scale-[1.05] active:scale-[0.98]"
            >
              <span className="relative z-10">Sign In</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative min-h-[90vh] flex items-center px-6 overflow-hidden">
        {/* Full-bleed Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroNewborn} 
            alt="Newborn clinical care" 
            className="w-full h-full object-cover grayscale brightness-50"
          />
          {/* Professional Gradient Overlay (similar to template) */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column: Content (Overlaid on Image) */}
          <div className="flex flex-col items-start text-left pt-10">
            <h2 className="animate-fade-in-up [animation-delay:200ms] text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[1.1] mb-8 max-w-2xl">
              Empowering clinical teams to transition from <br />
              <span className="text-primary italic">vulnerability</span> to <span className="text-white italic">excellence.</span>
            </h2>

            <p className="animate-fade-in-up [animation-delay:400ms] text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-xl font-medium">
              Standardized care pathways, intelligent dosing, and fluid management systems designed for neonatal precision.
            </p>

            <div className="animate-fade-in-up [animation-delay:600ms] flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button 
                onClick={handleLogin} 
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-2xl text-sm font-bold transition-all shadow-2xl shadow-primary/20 hover:translate-y-[-4px]"
              >
                Access Clinical Hub <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl text-sm font-bold transition-all hover:translate-y-[-4px]">
                Technical Overview
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* High-Fidelity Features Grid */}
      <section id="features" className="py-32 px-6 bg-slate-50 border-y border-slate-200 overflow-hidden relative">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center mb-24">
               <span className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">How we help</span>
               <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-6">Tools for your daily shift.</h2>
               <p className="text-slate-500 max-w-2xl font-medium leading-relaxed">Everything you need to care for newborns with confidence, designed for busy medical professionals.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
               {[
                 { title: "Easy Calculators", desc: "No more manual math. Our weight-based tools give you the right doses and fluid rates in seconds.", icon: Calculator, accent: "primary" },
                 { title: "Smart Permissions", desc: "Everyone on the team has the right access, from students to senior doctors, keeping data safe and clear.", icon: Lock, accent: "indigo" },
                 { title: "Reliable Records", desc: "A clear history of every calculation made, helping the whole team stay on the same page.", icon: Database, accent: "emerald" }
               ].map((feature, i) => (
                 <div key={i} className="group p-10 rounded-[2.5rem] bg-white border border-slate-200 shadow-tiny hover:shadow-2xl hover:shadow-primary/5 hover:translate-y-[-8px] transition-all duration-500 flex flex-col items-start relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60 group-hover:scale-150 transition-transform duration-700" />
                    <div className={`w-14 h-14 rounded-2xl bg-${feature.accent}/10 border border-${feature.accent}/20 text-${feature.accent}-600 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                       <feature.icon className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">{feature.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium mb-8">{feature.desc}</p>
                    <div className={`mt-auto flex items-center gap-2 text-${feature.accent}-600 text-[10px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 group-hover:gap-4 transition-all duration-300`}>
                       Check it out <ArrowRight className="w-4 h-4" />
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Compliance Section */}
      <section id="compliance" className="py-32 px-6">
         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
               <div className="absolute -inset-10 bg-emerald-500/5 rounded-full blur-[100px] -z-10" />
               <div className="p-1.5 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100">
                  <div className="bg-slate-900 rounded-[2rem] p-10 lg:p-14 overflow-hidden relative">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
                     <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-4 mb-10">
                           <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-primary backdrop-blur-md">
                              <UserCheck className="w-7 h-7" />
                           </div>
                           <div className="flex flex-col">
                              <span className="text-white font-bold tracking-tight">Team Roles</span>
                              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Access Control</span>
                           </div>
                        </div>
                        <h3 className="text-3xl font-bold text-white tracking-tight mb-6 leading-snug">Safe access for <br />every team member.</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-10">
                           We make sure everyone has the right tools for their role. Students can practice safely, while doctors and nurses have full access to our treatment tools.
                        </p>
                        <div className="space-y-4">
                           {['Role-based access', 'Secure data protection', 'Simple team management'].map((item, idx) => (
                              <div key={idx} className="flex items-center gap-3 text-slate-300 text-xs font-bold">
                                 <CheckCircle2 className="w-5 h-5 text-primary" /> {item}
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex flex-col items-start">
               <span className="text-[10px] font-black tracking-[0.4em] text-primary uppercase mb-4 text-left">Trusted Care</span>
               <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-8 text-left leading-[1.1]">Helping you provide <br />the best care possible.</h2>
               <div className="space-y-10">
                  <div className="flex gap-6">
                     <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 shrink-0">
                        <BriefcaseMedical className="w-6 h-6" />
                     </div>
                     <div>
                        <h5 className="font-bold text-slate-900 mb-2">Verified Methods</h5>
                        <p className="text-sm text-slate-500 leading-relaxed max-w-md">Our tools follow official hospital guidelines and neonatal care standards, so you can trust every result.</p>
                     </div>
                  </div>
                  <div className="flex gap-6">
                     <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 shrink-0">
                        <UserCheck className="w-6 h-6" />
                     </div>
                     <div>
                        <h5 className="font-bold text-slate-900 mb-2">Better Communication</h5>
                        <p className="text-sm text-slate-500 leading-relaxed max-w-md">Keep everyone informed with clear shift reports and a shared history of all medical actions.</p>
                     </div>
                  </div>
               </div>
               <button onClick={handleLogin} className="mt-14 inline-flex items-center gap-3 text-primary font-bold text-sm uppercase tracking-widest group">
                  Go to Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
               </button>
            </div>
         </div>
      </section>

      {/* Trust Stats Section with Looping Animation */}
      <section id="trust" className="py-24 px-6 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
         <div className="max-w-7xl mx-auto overflow-hidden relative whitespace-nowrap">
            <div className="inline-block animate-marquee-slow">
               {[
                  { v: "32k+", l: "Doses Validated" },
                  { v: "0.2s", l: "Math Latency" },
                  { v: "100%", l: "WHO Compliant" },
                  { v: "24/7", l: "Network Uptime" },
                  { v: "32k+", l: "Doses Validated" },
                  { v: "0.2s", l: "Math Latency" },
                  { v: "100%", l: "WHO Compliant" },
                  { v: "24/7", l: "Network Uptime" }
               ].map((stat, i) => (
                  <div key={i} className="inline-flex flex-col items-center mx-16">
                     <span className="text-4xl lg:text-5xl font-black text-slate-900 mb-2">{stat.v}</span>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.l}</span>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Mega Professional Footer */}
      <footer className="bg-slate-950 pt-24 pb-12 px-6 border-t border-white/5 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
         
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
            <div className="lg:col-span-4">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary shadow-lg shadow-primary/10">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <span className="font-black text-white text-2xl tracking-tighter">Neo<span className="text-primary">Desk</span></span>
               </div>
               <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-10 font-medium">
                  A friendly and reliable assistant for neonatal care, helping medical teams work better together every single day.
               </p>
               <div className="flex flex-wrap items-center gap-6">
                 <div className="flex items-center gap-4 text-slate-500">
                    <Globe className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                 </div>
               </div>
            </div>
            
            <div className="lg:col-span-2">
               <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-10 opacity-40">Tools</h4>
               <ul className="space-y-4">
                  <li><a href="#" className="text-slate-400 hover:text-primary text-sm font-medium transition-all hover:translate-x-1 inline-block">Calculators</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-primary text-sm font-medium transition-all hover:translate-x-1 inline-block">Procedures</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-primary text-sm font-medium transition-all hover:translate-x-1 inline-block">Library</a></li>
               </ul>
            </div>

            <div className="lg:col-span-2">
               <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-10 opacity-40">Support</h4>
               <ul className="space-y-4">
                  <li><a href="#" className="text-slate-400 hover:text-primary text-sm font-medium transition-all hover:translate-x-1 inline-block">Help Center</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-primary text-sm font-medium transition-all hover:translate-x-1 inline-block">Contact Us</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-primary text-sm font-medium transition-all hover:translate-x-1 inline-block">System Status</a></li>
               </ul>
            </div>

            <div className="lg:col-span-4 bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
                <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-6">Need help?</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-6 font-medium font-italic">If you're having trouble signing in or need a question answered, please talk to the IT team.</p>
                <div className="space-y-4">
                   <div className="flex items-center gap-3 text-sm text-white font-bold">
                      <Zap className="w-4 h-4 text-primary" /> IT Help: ext. 4400
                   </div>
                </div>
            </div>
         </div>
         
         <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
               © 2026 NeoDesk. All rights reserved.
            </div>
            <div className="flex gap-10">
               <a href="#" className="text-slate-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Privacy</a>
               <a href="#" className="text-slate-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">Legal</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
