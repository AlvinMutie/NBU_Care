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

      // Compliance Animation
      gsap.fromTo(".compliance-content > *", 
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: complianceRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
      
      gsap.fromTo(".compliance-image", 
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: complianceRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Footer Animation
      gsap.from(".footer-content", {
        scrollTrigger: {
          trigger: "footer",
          start: "top 95%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });

      // Generic Scroll Reveal for new sections
      gsap.utils.toArray(".reveal-on-scroll").forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-primary/20 selection:text-primary-dark overflow-x-hidden medical-mesh-gradient">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 backdrop-blur-xl bg-white/80 border-b border-slate-200 shadow-sm' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-row items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 border ${scrolled ? 'bg-primary text-white border-primary' : 'bg-white/10 text-primary backdrop-blur-md border-white/10'}`}>
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h1 className={`text-xl font-bold tracking-tighter leading-none transition-colors duration-500 ${scrolled ? 'text-slate-900' : 'text-white'}`}>Neo<span className="text-primary">Desk</span></h1>
              <div className="flex items-center gap-1 mt-1">
                 <div className="w-2 h-0.5 bg-primary rounded-full" />
                 <span className="text-[9px] uppercase tracking-[0.3em] font-black text-slate-400">Clinical Intelligence</span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#about" className={`text-xs font-bold uppercase tracking-widest transition-colors ${scrolled ? 'text-slate-600 hover:text-primary' : 'text-slate-300 hover:text-white'}`}>About</a>
            <a href="#workflow" className={`text-xs font-bold uppercase tracking-widest transition-colors ${scrolled ? 'text-slate-600 hover:text-primary' : 'text-slate-300 hover:text-white'}`}>Workflow</a>
            <a href="#roles" className={`text-xs font-bold uppercase tracking-widest transition-colors ${scrolled ? 'text-slate-600 hover:text-primary' : 'text-slate-300 hover:text-white'}`}>Ecosystem</a>
            <a href="#features" className={`text-xs font-bold uppercase tracking-widest transition-colors ${scrolled ? 'text-slate-600 hover:text-primary' : 'text-slate-300 hover:text-white'}`}>Tools</a>
            <a href="#library" className={`text-xs font-bold uppercase tracking-widest transition-colors ${scrolled ? 'text-slate-600 hover:text-primary' : 'text-slate-300 hover:text-white'}`}>Library</a>
            <a href="#faq" className={`text-xs font-bold uppercase tracking-widest transition-colors ${scrolled ? 'text-slate-600 hover:text-primary' : 'text-slate-300 hover:text-white'}`}>Support</a>
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
      <main ref={heroRef} className="relative min-h-screen flex items-center px-6 overflow-hidden pt-20">
        {/* Full-bleed Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroNewborn} 
            alt="Newborn clinical care" 
            className="w-full h-full object-cover grayscale brightness-50 scale-105"
          />
          {/* Professional Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          
          {/* Content (Overlaid on Image) */}
          <div className="hero-content flex flex-col items-start text-left max-w-3xl">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.95] mb-8">
              Standardizing <br />
              <span className="text-primary">Neonatal Excellence.</span>
            </h2>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-xl font-medium">
              Precision clinical workflows for the most vulnerable. Transition from risk to surgical accuracy with intelligent bedside assistance.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button 
                onClick={handleLogin} 
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-2xl text-sm font-bold transition-all shadow-2xl shadow-primary/20 hover:translate-y-[-4px]"
              >
                Launch Hub <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl text-sm font-bold transition-all hover:translate-y-[-4px]">
                Documentation
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-40 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="reveal-on-scroll">
            <span className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4 block">System Overview</span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-8 leading-[1.1]">
              A complete clinical <br />
              <span className="text-primary italic">operating system</span>.
            </h2>
            <div className="space-y-6 text-base text-slate-600 mb-10 leading-relaxed font-medium max-w-xl">
              <p>
                NeoDesk is a comprehensive safety net designed to eliminate the variables in neonatal care. By digitizing the clinical journey, we ensure that every newborn receives the same high standard of precision, regardless of the shift or provider.
              </p>
              <p>
                From the moment a patient is weighed, our system activates a web of intelligent checks—calculating exact drug dosages, managing maintenance fluids, and providing instant, bedside access to standardized life-saving procedures.
              </p>
              <p>
                By automating high-risk manual tasks, NeoDesk returns valuable minutes to clinical teams, allowing them to focus on the human side of care while the system handles the technical complexity with absolute surgical accuracy.
              </p>
            </div>
          </div>
          
          <div className="reveal-on-scroll relative">
            <div className="grid grid-cols-1 gap-4">
              {[
                { title: "Precision Dosing", icon: Calculator, desc: "Weight-based math that eliminates manual dosing errors.", color: "text-emerald-600", bg: "bg-emerald-50" },
                { title: "Knowledge Hub", icon: BookOpen, desc: "Instant bedside access to standardized clinical procedures.", color: "text-indigo-600", bg: "bg-indigo-50" },
                { title: "Team Coordination", icon: Users, desc: "Seamless orchestration between clinical roles.", color: "text-slate-900", bg: "bg-slate-100" }
              ].map((card, i) => (
                <div key={i} className="group p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                  <div className="flex gap-5 items-center">
                    <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-xl flex items-center justify-center shrink-0`}>
                      <card.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{card.title}</h4>
                      <p className="text-[13px] text-slate-500 font-medium leading-tight mt-0.5">{card.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>      {/* Bedside Workflow Section */}
      <section id="workflow" ref={workflowRef} className="py-40 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 reveal-on-scroll">
            <span className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4 block">The Experience</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">Seamless at the bedside.</h2>
            <p className="text-base text-slate-500 font-medium max-w-2xl mx-auto">A clinical workflow that adapts to you, ensuring every action is validated and every handover is crystalline.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-4">
              {[
                { title: "Smart Identity", desc: "Fast, role-based authentication ensures the right tools are instant.", icon: UserCheck },
                { title: "Validation Engine", desc: "Dynamic inputs cross-reference data against hospital protocols.", icon: Activity },
                { title: "Shift Handover", desc: "Instant summaries for seamless care transitions between teams.", icon: Clock },
                { title: "Audit Persistence", desc: "Every action is captured in an immutable clinical record.", icon: FileCheck }
              ].map((step, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-3xl cursor-pointer transition-all duration-500 border-2 relative overflow-hidden ${activeStep === idx ? 'bg-white border-primary shadow-xl shadow-primary/5 translate-x-2' : 'border-transparent opacity-50 grayscale hover:opacity-100'}`}
                >
                  {activeStep === idx && (
                    <div className="absolute bottom-0 left-0 h-1 bg-primary/20 w-full">
                       <div 
                        className="h-full bg-primary transition-all linear" 
                        style={{ width: '100%', transitionDuration: '5000ms', animation: activeStep === idx ? 'progress-run 5s linear forwards' : 'none' }} 
                       />
                    </div>
                  )}
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeStep === idx ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>
                      <step.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 tracking-tight">{step.title}</h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal-on-scroll relative">
              <div className="aspect-[4/5] bg-slate-900 rounded-[3rem] p-1 overflow-hidden shadow-[0_64px_128px_-32px_rgba(0,0,0,0.5)] border border-white/10">
                 <div className="w-full h-full bg-slate-800 rounded-[2.8rem] flex flex-col p-10 relative">
                    <div className="flex items-center justify-between mb-12">
                       <span className="text-white font-bold text-lg tracking-tight">
                         {activeStep === 2 ? 'Shift Summary' : 'Active Protocol'}
                       </span>
                       <div className="px-3 py-1 bg-primary/20 rounded-full border border-primary/30">
                          <span className="text-[10px] text-primary font-black uppercase tracking-widest">Live</span>
                       </div>
                    </div>
                    
                    <div className="space-y-6">
                       <div className={`transition-all duration-700 ${activeStep === 0 ? 'opacity-100' : 'opacity-30'}`}>
                          <div className="text-[9px] uppercase font-black text-slate-500 tracking-widest mb-2">Authentication</div>
                          <div className="h-12 bg-white/5 rounded-2xl flex items-center px-4 border border-white/10">
                             <UserCog className="w-4 h-4 text-primary mr-3" />
                             <span className="text-[11px] text-white font-bold tracking-tight">Nurse In-Charge • NICU B</span>
                          </div>
                       </div>
                       
                       <div className={`transition-all duration-700 ${activeStep === 1 ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}`}>
                          <div className="text-[9px] uppercase font-black text-slate-500 tracking-widest mb-2">Validation Layer</div>
                          <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                             <div className="flex justify-between mb-4">
                                <span className="text-[11px] text-slate-400 font-bold">Maintenance Fluids</span>
                                <span className="text-[11px] text-primary font-black">VALIDATED</span>
                             </div>
                             <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-3/4" />
                             </div>
                          </div>
                       </div>

                       <div className={`transition-all duration-700 ${activeStep === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                          <div className="text-[9px] uppercase font-black text-slate-500 tracking-widest mb-2">Handover Pulse</div>
                          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                             <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span className="text-[11px] text-white/70">Feedings tolerated well</span>
                             </div>
                             <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span className="text-[11px] text-white/70">Dose adjustment at 14:00</span>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="mt-auto h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20">
                       {activeStep === 2 ? 'Send to Next Shift' : 'Commit Action'}
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Designed for Every Role Section */}
      <section id="roles" ref={rolesRef} className="py-40 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-24 reveal-on-scroll">
            <span className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">Ecosystem</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">Built for the whole team.</h2>
            <p className="text-base text-slate-500 max-w-2xl font-medium">Standardized care requires everyone to be on the same page. We provide customized hubs for every clinical role, optimized for precision and speed.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-16 reveal-on-scroll">
            {[
              { id: 'nurse', label: 'Nurses', icon: Users },
              { id: 'consultant', label: 'Consultants', icon: UserCog },
              { id: 'student', label: 'Students', icon: GraduationCap }
            ].map(role => (
              <button 
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all ${activeRole === role.id ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
              >
                <role.icon className="w-4 h-4" /> {role.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-on-scroll">
            {activeRole === 'nurse' && [
              { t: 'Precision Dosing', d: 'Weight-based drug calculation engine.', i: Calculator },
              { t: 'Fluid Tracking', d: 'Interactive maintenance fluid logic.', i: Activity },
              { t: 'Library Access', d: 'Quick lookup for care procedures.', i: BookOpen },
              { t: 'Shift Logs', d: 'One-tap logging of clinical actions.', i: Clock }
            ].map((f, i) => <RoleFeature key={i} {...f} />)}
            
            {activeRole === 'consultant' && [
              { t: 'Audit Review', d: 'Complete history of team decisions.', i: Database },
              { t: 'Staff Oversight', d: 'Manage team access and privileges.', i: UserCheck },
              { t: 'Impact Analytics', d: 'Track unit-wide clinical outcomes.', i: BarChart },
              { t: 'Policy Control', d: 'Standardize guidelines across unit.', i: Shield }
            ].map((f, i) => <RoleFeature key={i} {...f} />)}

            {activeRole === 'student' && [
              { t: 'Learning Aids', d: 'Simplified bedside guidance.', i: GraduationCap },
              { t: 'Practice Mode', d: 'Simulated clinical scenarios.', i: Activity },
              { t: 'Reference Hub', d: 'Full neonatal textbook access.', i: BookOpen },
              { t: 'Validation', d: 'Work verified by senior staff.', i: CheckCircle2 }
            ].map((f, i) => <RoleFeature key={i} {...f} />)}
          </div>
        </div>
      </section>

      {/* Procedure Library Preview */}
      <section id="library" className="py-40 px-6 bg-slate-900 text-white overflow-hidden relative">
         <div className="absolute inset-0 bg-primary/5 -z-0" />
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
               <div className="reveal-on-scroll">
                  <span className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4 block">Knowledge Hub</span>
                  <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 leading-[1.1]">The clinical library <br />in your pocket.</h2>
                  <p className="text-slate-400 text-base leading-relaxed mb-10 font-medium max-w-xl">
                     No more searching through heavy textbooks. Our library contains validated neonatal procedures, always updated to the latest international standards.
                  </p>
                  <button onClick={handleLogin} className="flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                     Open Library <ChevronRight className="w-5 h-5" />
                  </button>
               </div>
               
               <div className="grid grid-cols-2 gap-4 reveal-on-scroll">
                  {[
                    { t: 'Feeding Protocols', i: Stethoscope, s: 'WHO Standard' },
                    { t: 'Resuscitation', i: Activity, s: 'AHA Protocol' },
                    { t: 'Thermal Care', i: Zap, s: 'Unit Guidelines' },
                    { t: 'Skin Integrity', i: Shield, s: 'Care Standards' }
                  ].map((lib, i) => (
                    <div key={i} className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                       <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                          <lib.i className="w-5 h-5" />
                       </div>
                       <h4 className="font-bold text-base mb-1">{lib.t}</h4>
                       <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{lib.s}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* High-Fidelity Features Grid */}
      <section id="features" ref={featuresRef} className="py-40 px-6 bg-slate-50 border-y border-slate-200 overflow-hidden relative">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center mb-24 reveal-on-scroll">
               <span className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">Core Capabilities</span>
               <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">Built for the front lines.</h2>
               <p className="text-base text-slate-500 max-w-2xl font-medium">Tools that don't just calculate, but validate. Every feature is engineered to support critical clinical decision-making.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
               {[
                 { title: "Precision Math", desc: "Automated weight-based calculations for dosing and fluids. Eliminate manual errors at the bedside.", icon: Calculator, color: "text-primary-600", bg: "bg-primary/10", border: "border-primary/20" },
                 { title: "Role-Based Logic", desc: "Granular access controls for every member of the neonatal team, from students to consultants.", icon: Lock, color: "text-indigo-600", bg: "bg-indigo/10", border: "border-indigo/20" },
                 { title: "Clinical Audit", desc: "Comprehensive logging of every clinical action, providing a transparent history of patient care.", icon: Database, color: "text-emerald-600", bg: "bg-emerald/10", border: "border-emerald/20" }
               ].map((feature, i) => (
                 <div key={i} className="feature-card group p-10 rounded-[2.5rem] bg-white border border-slate-200 shadow-tiny hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col items-start relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60 group-hover:scale-150 transition-transform duration-700" />
                    <div className={`w-12 h-12 rounded-2xl ${feature.bg} border ${feature.border} ${feature.color} flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                       <feature.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-4 tracking-tight">{feature.title}</h4>
                    <p className="text-[13px] text-slate-500 leading-relaxed font-medium mb-8">{feature.desc}</p>
                    <div className={`mt-auto flex items-center gap-2 ${feature.color} text-[10px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-all duration-300`}>
                       Explore Capabilities <ArrowRight className="w-3 h-3" />
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Clinical Standards & Compliance */}
      <section id="compliance" ref={complianceRef} className="py-40 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 reveal-on-scroll">
            <span className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4 block">Authority</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">Global clinical standards.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 reveal-on-scroll">
            {[
              { t: 'WHO Protocols', d: 'Dosing and care logic strictly follows the World Health Organization neonatal guidelines.', i: ShieldCheck, c: 'text-emerald-600', bg: 'bg-emerald-50' },
              { t: 'HIPAA Ready', d: 'Enterprise-grade encryption and granular role-based access for patient data privacy.', i: Lock, c: 'text-indigo-600', bg: 'bg-indigo-50' },
              { t: 'AHA Standards', d: 'Resuscitation and emergency modules aligned with American Heart Association protocols.', i: Activity, c: 'text-red-600', bg: 'bg-red-50' }
            ].map((std, i) => (
              <div key={i} className="flex flex-col items-center text-center p-10 rounded-[3rem] bg-slate-50 border border-slate-100 transition-all hover:-translate-y-2">
                <div className={`w-20 h-20 ${std.bg} ${std.c} rounded-3xl flex items-center justify-center mb-8 shadow-inner`}>
                   <std.i className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{std.t}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{std.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" ref={faqRef} className="py-40 px-6 bg-white border-t border-slate-100">
         <div className="max-w-3xl mx-auto">
            <div className="text-center mb-24 reveal-on-scroll">
               <span className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4 block">Support Hub</span>
               <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">Common Questions</h2>
               <p className="text-base text-slate-500 font-medium max-w-xl mx-auto">Everything you need to know about the system's accuracy, security, and integration.</p>
            </div>
            
            <div className="space-y-3 reveal-on-scroll">
               {[
                 { q: "How accurate are the clinical calculators?", a: "Every calculation follows standardized neonatal care formulas (WHO/AHA). The system includes boundary checks to prevent physiologically impossible inputs." },
                 { q: "Is it optimized for mobile devices?", a: "Yes. NeoDesk is designed with a mobile-first philosophy, ensuring that nurses can use all tools comfortably on tablets or phones at the bedside." },
                 { q: "How do you handle data security?", a: "We use granular role-based access control (RBAC). All clinical logs are immutable and encrypted within the hospital's private network environment." },
                 { q: "Can we add our own hospital guidelines?", a: "The administrative dashboard allows consultants to update procedures and dosing logic to match specific institutional protocols." }
               ].map((faq, i) => (
                 <div key={i} className="rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden transition-all duration-500">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full p-6 flex items-center justify-between text-left group"
                    >
                      <h5 className="font-bold text-slate-900 flex items-center gap-4 text-base tracking-tight">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${activeFaq === i ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                          <HelpCircle className="w-4 h-4" />
                        </div>
                        {faq.q}
                      </h5>
                      <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform duration-500 ${activeFaq === i ? 'rotate-90 text-primary' : ''}`} />
                    </button>
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-12 pb-8">
                        <p className="text-xs text-slate-500 leading-relaxed font-medium pt-4 border-t border-slate-200/50">{faq.a}</p>
                      </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Impact Marquee */}
      <section id="trust" className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
         <div className="overflow-hidden relative whitespace-nowrap">
            <div className="inline-block animate-marquee-slow">
               {[
                  { v: "32k+", l: "Doses Validated" },
                  { v: "100%", l: "Guideline Compliance" },
                  { v: "24/7", l: "System Reliability" },
                  { v: "Secure", l: "Clinical Data" },
                  { v: "32k+", l: "Doses Validated" },
                  { v: "100%", l: "Guideline Compliance" },
                  { v: "24/7", l: "System Reliability" },
                  { v: "Secure", l: "Clinical Data" }
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
      <footer className="bg-slate-950 pt-32 pb-12 px-6 border-t border-white/5 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
         
         <div className="footer-content max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
            <div className="lg:col-span-6">
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
            
            <div className="lg:col-span-3">
               <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-10 opacity-40">Tools</h4>
               <ul className="space-y-4">
                  <li><a href="#" className="text-slate-400 hover:text-primary text-sm font-medium transition-all hover:translate-x-1 inline-block">Calculators</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-primary text-sm font-medium transition-all hover:translate-x-1 inline-block">Procedures</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-primary text-sm font-medium transition-all hover:translate-x-1 inline-block">Library</a></li>
               </ul>
            </div>

            <div className="lg:col-span-3">
               <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-10 opacity-40">Support</h4>
               <ul className="space-y-4">
                  <li><a href="#" className="text-slate-400 hover:text-primary text-sm font-medium transition-all hover:translate-x-1 inline-block">Help Center</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-primary text-sm font-medium transition-all hover:translate-x-1 inline-block">Contact Us</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-primary text-sm font-medium transition-all hover:translate-x-1 inline-block">System Status</a></li>
               </ul>
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
      </div>
    </footer>
  </div>
  );
}
function RoleFeature({ t, d, i: Icon }) {
  return (
    <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-primary/5 hover:bg-white hover:border-primary/20 transition-all duration-500">
       <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary mb-6 shadow-sm">
          <Icon className="w-6 h-6" />
       </div>
       <h5 className="font-bold text-slate-900 mb-2">{t}</h5>
       <p className="text-xs text-slate-500 leading-relaxed font-medium">{d}</p>
    </div>
  );
}
