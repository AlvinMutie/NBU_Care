import React, { useEffect, useRef, useState } from 'react';
import { 
  Stethoscope, Activity, Calculator, 
  ArrowRight, Globe, Zap, ShieldCheck,
  Lock, Database, UserCheck, CheckCircle2, BriefcaseMedical,
  Users, BookOpen, Shield, BarChart, HelpCircle, Info, ChevronRight,
  GraduationCap, UserCog, HeartPulse, Clock, FileCheck
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroNewborn from '../assets/hero_newborn.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function Landing({ onEnter }) {
  const [activeRole, setActiveRole] = useState('nurse');
  const [activeStep, setActiveStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const workflowRef = useRef(null);
  const rolesRef = useRef(null);
  const featuresRef = useRef(null);
  const complianceRef = useRef(null);
  const faqRef = useRef(null);

  const handleLogin = () => {
    if (onEnter) onEnter();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Hero Animation
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
      });

      // Features Animation
      gsap.fromTo(".feature-card", 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-primary/20 selection:text-primary-dark overflow-x-hidden medical-mesh-gradient dark:medical-mesh-gradient-dark">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 shadow-sm' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-row items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 border ${scrolled ? 'bg-primary text-white border-primary' : 'bg-white/10 text-primary backdrop-blur-md border-white/10'}`}>
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h1 className={`text-xl font-bold tracking-tighter leading-none transition-colors duration-500 ${scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>Neo<span className="text-primary">Desk</span></h1>
              <div className="flex items-center gap-1 mt-1">
                 <div className="w-2 h-0.5 bg-primary rounded-full" />
                 <span className="text-[9px] uppercase tracking-[0.3em] font-black text-slate-400">Clinical Intelligence</span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {['About', 'Workflow', 'Roles', 'Features', 'Library', 'FAQ'].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${scrolled ? 'text-slate-600 dark:text-slate-400 hover:text-primary' : 'text-slate-300 hover:text-white'}`}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLogin}
              className="group relative flex items-center gap-2 bg-primary overflow-hidden text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-primary/20 hover:scale-[1.05] active:scale-0.98"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main ref={heroRef} className="relative min-h-screen flex items-center px-6 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroNewborn} 
            alt="Newborn clinical care" 
            className="w-full h-full object-cover grayscale brightness-[0.4] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 text-left">
          <div className="hero-content flex flex-col items-start max-w-3xl">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.95] mb-8">
              Standardizing <br />
              <span className="text-primary">Neonatal Excellence.</span>
            </h2>

            <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-xl font-medium">
              Precision clinical workflows for the most vulnerable. Transition from manual risk to surgical accuracy with intelligent bedside assistance.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button 
                onClick={handleLogin} 
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-2xl shadow-primary/20 hover:translate-y-[-4px]"
              >
                Launch Hub <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all hover:translate-y-[-4px]">
                Documentation
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-32 lg:py-48 px-6 bg-white dark:bg-slate-950 overflow-hidden text-left">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="reveal-on-scroll">
            <span className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4 block">System Overview</span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 leading-[1.1]">
              A complete clinical <br />
              <span className="text-primary italic">operating system</span>.
            </h2>
            <div className="space-y-6 text-base text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium max-w-xl">
              <p>NeoDesk is a comprehensive safety net designed to eliminate the variables in neonatal care. By digitizing the clinical journey, we ensure that every newborn receives the same high standard of precision.</p>
              <p>From the moment a patient is admitted, our system activates a web of intelligent checks—calculating drug dosages, managing fluids, and providing bedside access to life-saving protocols.</p>
            </div>
          </div>
          
          <div className="reveal-on-scroll">
            <div className="grid grid-cols-1 gap-4">
              {[
                { title: "Precision Dosing", icon: Calculator, desc: "Weight-based math that eliminates manual errors.", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                { title: "Knowledge Hub", icon: BookOpen, desc: "Instant bedside access to WHO procedures.", color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
                { title: "Team Coordination", icon: Users, desc: "Seamless orchestration between clinical roles.", color: "text-slate-900 dark:text-white", bg: "bg-slate-100 dark:bg-slate-900" }
              ].map((card, i) => (
                <div key={i} className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 transition-all duration-500 shadow-tiny">
                  <div className="flex gap-5 items-center">
                    <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-xl flex items-center justify-center shrink-0`}>
                      <card.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-slate-900 dark:text-white tracking-tight">{card.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-tight mt-1">{card.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bedside Workflow Section */}
      <section id="workflow" ref={workflowRef} className="py-32 lg:py-48 px-6 bg-slate-50 dark:bg-slate-900/20 border-y border-slate-200 dark:border-slate-800 text-left">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 reveal-on-scroll">
            <span className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4 block">The Experience</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">Seamless at the bedside.</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">A clinical workflow that adapts to you, ensuring every action is validated and every handover is crystalline.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-4">
              {[
                { title: "Smart Identity", desc: "Fast, role-based authentication ensures the right tools are instant.", icon: UserCheck },
                { title: "Validation Engine", desc: "Dynamic inputs cross-reference data against hospital protocols.", icon: Activity },
                { title: "Shift Handover", desc: "Instant summaries for seamless care transitions.", icon: Clock },
                { title: "Audit Persistence", desc: "Every action is captured in an immutable clinical record.", icon: FileCheck }
              ].map((step, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-[2.5rem] cursor-pointer transition-all duration-500 border-2 relative overflow-hidden ${activeStep === idx ? 'bg-white dark:bg-slate-800 border-primary shadow-xl dark:shadow-none' : 'border-transparent opacity-50 grayscale hover:opacity-100'}`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${activeStep === idx ? 'bg-primary text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                      <step.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-slate-900 dark:text-white tracking-tight">{step.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal-on-scroll relative">
              <div className="aspect-[4/5] bg-slate-900 rounded-[3rem] p-1 overflow-hidden shadow-2xl border border-white/10 max-w-md mx-auto">
                 <div className="w-full h-full bg-slate-800 rounded-[2.8rem] flex flex-col p-10 relative">
                    <div className="flex items-center justify-between mb-12">
                       <span className="text-white font-black text-lg tracking-tight">Active Protocol</span>
                       <div className="px-3 py-1 bg-primary/20 rounded-full border border-primary/30">
                          <span className="text-[10px] text-primary font-black uppercase tracking-widest animate-pulse">Live Sync</span>
                       </div>
                    </div>
                    
                    <div className="space-y-8">
                       <div className={`transition-all duration-700 ${activeStep === 0 ? 'opacity-100' : 'opacity-20'}`}>
                          <div className="h-14 bg-white/5 rounded-2xl flex items-center px-4 border border-white/10">
                             <UserCog className="w-5 h-5 text-primary mr-4" />
                             <span className="text-xs text-white font-black tracking-widest uppercase">NICU B • IN-CHARGE</span>
                          </div>
                       </div>
                       
                       <div className={`transition-all duration-700 ${activeStep === 1 ? 'opacity-100 scale-100' : 'opacity-20 scale-95'}`}>
                          <div className="p-5 bg-primary/10 rounded-2xl border border-primary/20">
                             <div className="flex justify-between mb-4">
                                <span className="text-xs text-slate-300 font-bold uppercase tracking-widest">Safety Margin</span>
                                <span className="text-xs text-primary font-black">VALIDATED</span>
                             </div>
                             <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-3/4 shadow-[0_0_10px_rgba(13,148,136,0.5)]" />
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="mt-auto h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-lg">
                       Commit Action
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Section */}
      <section id="roles" ref={rolesRef} className="py-32 lg:py-48 px-6 overflow-hidden bg-white dark:bg-slate-950 text-left">
        <div className="max-w-7xl mx-auto text-left">
          <div className="flex flex-col items-center text-center mb-24 reveal-on-scroll">
            <span className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">Ecosystem</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">Built for the whole team.</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 max-w-2xl font-medium">Standardized care requires everyone to be on the same page.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-16 reveal-on-scroll">
            {['nurse', 'consultant', 'student'].map(role => (
              <button 
                key={role}
                onClick={() => setActiveRole(role)}
                className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeRole === role ? 'bg-primary text-white shadow-xl' : 'bg-slate-50 dark:bg-slate-900 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-on-scroll">
            {/* Role features filtered by activeRole */}
            {[
              { t: 'Precision Dosing', d: 'Weight-based drug calculation engine.', i: Calculator },
              { t: 'Audit Review', d: 'Complete history of team decisions.', i: Database },
              { t: 'Library Access', d: 'Quick lookup for care procedures.', i: BookOpen },
              { t: 'Shift Logs', d: 'One-tap logging of actions.', i: Clock }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 transition-all duration-500 shadow-tiny">
                 <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-primary mb-8 shadow-sm">
                    <f.i className="w-6 h-6" />
                 </div>
                 <h5 className="font-black text-slate-900 dark:text-white mb-2 tracking-tight">{f.t}</h5>
                 <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 pt-32 pb-12 px-6 border-t border-white/5 relative overflow-hidden text-left">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
            <div className="lg:col-span-6">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <span className="font-black text-white text-2xl tracking-tighter">NeoDesk</span>
               </div>
               <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">A professional-grade clinical operating system for neonatal excellence.</p>
            </div>
            {/* Footer links would go here */}
         </div>
         <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">© 2026 NeoDesk. Built for clinical precision.</div>
         </div>
      </footer>
    </div>
  );
}
