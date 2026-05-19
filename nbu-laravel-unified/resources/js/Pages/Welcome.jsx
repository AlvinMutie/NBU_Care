import { Head, Link } from '@inertiajs/react';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Stethoscope, Activity, Calculator, 
  ArrowRight, Globe, Zap, ShieldCheck,
  Lock, Database, UserCheck, CheckCircle2,
  Users, BookOpen, Shield, BarChart, HelpCircle, 
  ChevronRight, GraduationCap, UserCog, Clock, FileCheck,
  Heart, Plus, Phone, Mail, Fingerprint
} from 'lucide-react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
  const [activeRole, setActiveRole] = useState('nurse');
  const [activeStep, setActiveStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <>
      <Head title="NBU Care - Pediatric Neonatal Clinical System" />
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          display: inline-flex;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee-slow:hover {
          animation-play-state: paused;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>

      <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-slate-950 font-sans">
        
        {/* Visual Ambient Background Glows */}
        <div className="absolute top-[-5%] left-[-10%] h-[600px] w-[600px] rounded-full bg-teal-500/10 blur-[130px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[-10%] h-[700px] w-[700px] rounded-full bg-indigo-500/5 blur-[140px] pointer-events-none" />
        <div className="absolute top-[40%] left-[20%] h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

        {/* Header Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 backdrop-blur-xl bg-slate-950/80 border-b border-slate-900/50 shadow-lg' : 'py-6 bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-6 flex flex-row items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 border ${scrolled ? 'bg-teal-500 text-slate-950 border-teal-500 shadow-md shadow-teal-500/20' : 'bg-slate-900/40 text-teal-400 backdrop-blur-md border-slate-800'}`}>
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight leading-none">
                  NBU<span className="text-teal-400">Care</span>
                </h1>
                <div className="flex items-center gap-1 mt-1">
                   <div className="w-2 h-0.5 bg-teal-400 rounded-full animate-pulse" />
                   <span className="text-[9px] uppercase tracking-[0.25em] font-black text-slate-400">Clinical Intelligence</span>
                </div>
              </div>
            </div>

            {/* Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#about" className="text-xs font-black uppercase tracking-wider text-slate-400 hover:text-teal-400 transition-colors">About System</a>
              <a href="#workflow" className="text-xs font-black uppercase tracking-wider text-slate-400 hover:text-teal-400 transition-colors">Bedside Flow</a>
              <a href="#roles" className="text-xs font-black uppercase tracking-wider text-slate-400 hover:text-teal-400 transition-colors">Ecosystem</a>
              <a href="#capabilities" className="text-xs font-black uppercase tracking-wider text-slate-400 hover:text-teal-400 transition-colors">Capabilities</a>
              <a href="#standards" className="text-xs font-black uppercase tracking-wider text-slate-400 hover:text-teal-400 transition-colors">Standards</a>
              <a href="#faq" className="text-xs font-black uppercase tracking-wider text-slate-400 hover:text-teal-400 transition-colors">FAQ</a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {auth.user ? (
                <Link 
                  href={route('dashboard')}
                  className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-teal-500/10 hover:scale-[1.03] active:scale-[0.98] transition-all"
                >
                  Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <Link 
                    href={route('login')}
                    className="text-xs font-black uppercase tracking-wider text-slate-400 hover:text-slate-100 transition-colors px-3 py-2"
                  >
                    Sign In
                  </Link>
                  <Link 
                    href={route('register')}
                    className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-100 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                  >
                    Register Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="relative min-h-screen flex items-center px-6 pt-24 md:pt-32 pb-16 overflow-hidden">
          {/* Neon Grid Layer */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c111d_1px,transparent_1px),linear-gradient(to_bottom,#0c111d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] opacity-40 pointer-events-none" />

          <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Copy */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/5 px-4 py-1.5 text-xs font-black text-teal-400 tracking-wider uppercase">
                <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                Pediatric Neonatal ICU Operating System
              </div>

              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[0.95]">
                Standardizing <br />
                <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                  Neonatal Excellence
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
                Precision clinical workflows for the front lines. Empowering pediatricians, neonatal nurses, and clinical leads at Alvin Mutie / NBU Care to transition from operational risk to surgical dosing accuracy.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4">
                {auth.user ? (
                  <Link 
                    href={route('dashboard')} 
                    className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-wider shadow-xl shadow-teal-500/20 hover:translate-y-[-2px] active:translate-y-[0px] transition-all"
                  >
                    Enter Dashboard <ArrowRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <Link 
                    href={route('login')} 
                    className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-wider shadow-xl shadow-teal-500/20 hover:translate-y-[-2px] active:translate-y-[0px] transition-all"
                  >
                    Launch System <ArrowRight className="w-5 h-5" />
                  </Link>
                )}
                <a 
                  href="#about"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-wider transition-all"
                >
                  Core Documentation
                </a>
              </div>
            </div>

            {/* Right Column: Hero Image representation */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-teal-500 to-indigo-500 opacity-25 blur-2xl pointer-events-none animate-pulse-slow" />
              
              {/* Glassmorphic Image Frame */}
              <div className="relative rounded-[32px] border border-slate-800/80 bg-slate-900/50 backdrop-blur-xl p-3 shadow-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500 group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-video lg:aspect-[4/5] xl:aspect-[3/4]">
                  {/* Subtle dark medical overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 opacity-70" />
                  <div className="absolute inset-0 bg-teal-500/5 mix-blend-overlay z-10" />
                  
                  <img 
                    src="/hero-bg.jpg" 
                    alt="Neonatal Care Center"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  
                  {/* Floating clinical HUD layer */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 bg-slate-950/80 backdrop-blur-md border border-slate-800/80 p-4 rounded-2xl flex items-center justify-between gap-3 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
                        <Activity className="w-4 h-4 animate-pulse" />
                      </div>
                      <div className="text-left">
                        <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest block">Ward Coverage</span>
                        <span className="text-[11px] font-bold text-white block">NICU / NBU Active Monitoring</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-md text-[9px] font-black uppercase tracking-wider">
                      Live
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* About Section */}
        <section id="about" className="py-32 px-6 border-t border-slate-900/60 bg-slate-950/40 relative">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-black text-teal-400 uppercase tracking-[0.4em] block">System Architecture</span>
              <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">
                A clinical operating system <br />
                <span className="bg-gradient-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent">
                  built for high reliability.
                </span>
              </h3>
              
              <div className="space-y-4 text-slate-400 text-sm leading-relaxed font-medium">
                <p>
                  NBU Care is a comprehensive clinical operating system designed specifically to eliminate cognitive load and manual arithmetic errors in neonatal wards. By digitizing key patient care paths, we ensure that every vulnerable baby receives structured, guideline-compliant care.
                </p>
                <p>
                  From the moment a newborn is admitted and weighed, the system activates a web of real-time calculations: resolving weight-based drug formulas, tracking maintenance fluid totals (TFI), and facilitating structured shifts.
                </p>
                <p>
                  By standardizing critical operations into high-fidelity UI blocks, NBU Care returns valuable clinical time back to doctors and nurses, securing patients with a strong medical safety net.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: "Precision Dosing Math", icon: Calculator, desc: "Automatic weight-adjusted calculators that remove high-risk bedside calculations.", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                  { title: "Standardized Care Library", icon: BookOpen, desc: "Instant clinical guide reference sheets for resuscitations and therapies.", color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
                  { title: "Collaborative Rota & Handovers", icon: Users, desc: "Seamless scheduling and structured morning/night handovers for complete shift safety.", color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" }
                ].map((card, i) => (
                  <div key={i} className="group p-5 rounded-2xl bg-slate-900/40 border border-slate-900/60 hover:bg-slate-900/80 hover:border-slate-800 transition-all duration-300">
                    <div className="flex gap-5 items-center">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${card.color}`}>
                        <card.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white">{card.title}</h4>
                        <p className="text-xs text-slate-500 font-medium leading-normal mt-1">{card.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bedside Workflow Section */}
        <section id="workflow" className="py-32 px-6 border-y border-slate-900 bg-slate-900/20 relative">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-20">
              <span className="text-xs font-black text-teal-400 uppercase tracking-[0.4em] block mb-3">Bedside Security</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Structured clinical interactions.</h2>
              <p className="text-sm text-slate-500 font-medium max-w-xl mx-auto mt-4">An elegant workflow designed for high-stress bedside situations, guaranteeing clear handovers and audit protection.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Interactive Step Blocks */}
              <div className="space-y-4">
                {[
                  { title: "Smart Identity Layer", desc: "Granular verification checks role capabilities before launching calculator pipelines.", icon: UserCheck },
                  { title: "Clinical Validation Engine", desc: "Auto-analyzes dosage parameters against clinical guidelines inside the ward database.", icon: Activity },
                  { title: "Shift Handover Pulse", desc: "Compiles vitals, kidney/liver profiles, and fluid metrics into a single handover sheet.", icon: Clock },
                  { title: "Immutable Audit Log", desc: "Every dosing action, calculation, and handover registers instantly for absolute audit persistence.", icon: FileCheck }
                ].map((step, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border relative overflow-hidden ${activeStep === idx ? 'bg-slate-900/80 border-teal-500/40 shadow-xl shadow-teal-500/5 translate-x-2' : 'bg-transparent border-transparent opacity-45 hover:opacity-80'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all ${activeStep === idx ? 'bg-teal-500 border-teal-500 text-slate-950' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                        <step.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white tracking-tight">{step.title}</h4>
                        <p className="text-xs text-slate-500 font-medium mt-1 leading-normal">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Glowing Phone Mockup Display */}
              <div className="relative">
                <div className="absolute -inset-1 rounded-[2.5rem] bg-teal-500/10 opacity-30 blur-2xl pointer-events-none" />
                <div className="aspect-[4/5] bg-slate-950 rounded-[2.5rem] p-1.5 overflow-hidden border border-slate-800 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.7)]">
                   <div className="w-full h-full bg-slate-900 rounded-[2.3rem] flex flex-col p-8 relative overflow-hidden">
                      
                      <div className="flex items-center justify-between mb-8">
                         <span className="text-white font-black text-sm uppercase tracking-wider">
                           {activeStep === 2 ? 'Shift Summary Card' : 'System Terminal'}
                         </span>
                         <div className="px-2.5 py-0.5 bg-teal-500/10 border border-teal-500/20 rounded-full">
                            <span className="text-[9px] text-teal-400 font-black uppercase tracking-widest animate-pulse">Active</span>
                         </div>
                      </div>
                      
                      <div className="space-y-5 flex-1">
                         {/* Auth Layer View */}
                         <div className={`transition-all duration-500 ${activeStep === 0 ? 'opacity-100 scale-100' : 'opacity-25'}`}>
                            <div className="text-[9px] uppercase font-black text-slate-500 tracking-widest mb-1.5">Authentication Portal</div>
                            <div className="h-11 bg-slate-950/80 rounded-xl flex items-center px-4 border border-slate-900">
                               <UserCog className="w-4 h-4 text-teal-400 mr-3 flex-shrink-0" />
                               <span className="text-[10px] text-slate-300 font-black tracking-wider uppercase truncate">Nurse In-Charge • Ward NICU A</span>
                            </div>
                         </div>
                         
                         {/* Validation Layer View */}
                         <div className={`transition-all duration-500 ${activeStep === 1 ? 'opacity-100 scale-100' : 'opacity-25'}`}>
                            <div className="text-[9px] uppercase font-black text-slate-500 tracking-widest mb-1.5">Dosing Safety Checks</div>
                            <div className="p-3.5 bg-teal-950/20 rounded-xl border border-teal-500/25">
                               <div className="flex justify-between mb-2">
                                  <span className="text-[10px] text-slate-400 font-bold">Intravenous Antibiotic</span>
                                  <span className="text-[10px] text-teal-400 font-black tracking-widest">VALIDATED</span>
                               </div>
                               <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 w-[90%]" />
                                </div>
                            </div>
                         </div>

                         {/* Handover Log View */}
                         <div className={`transition-all duration-500 ${activeStep === 2 ? 'opacity-100 translate-x-0' : 'opacity-25'}`}>
                            <div className="text-[9px] uppercase font-black text-slate-500 tracking-widest mb-1.5">Shift Indicators</div>
                            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-900 space-y-2">
                               <div className="flex items-center gap-2.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  <span className="text-[10px] text-slate-400 font-medium">Temperature: 36.8°C (Stable)</span>
                               </div>
                               <div className="flex items-center gap-2.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                                  <span className="text-[10px] text-slate-400 font-medium">Total Fluids: 140 mL/kg/day</span>
                               </div>
                            </div>
                         </div>

                         {/* Audit Log View */}
                         <div className={`transition-all duration-500 ${activeStep === 3 ? 'opacity-100 scale-100' : 'opacity-25'}`}>
                            <div className="text-[9px] uppercase font-black text-slate-500 tracking-widest mb-1.5">Database Commit</div>
                            <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 flex items-center justify-between">
                              <span className="text-[9px] font-mono text-slate-400">ID: 8a9d10e82c</span>
                              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Persisted</span>
                            </div>
                         </div>
                      </div>

                      <div className="h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-black uppercase tracking-wider text-xs shadow-md shadow-teal-500/10">
                         {activeStep === 2 ? 'Transmit shift report' : 'Commit to Clinical Registry'}
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Designed for Every Role Section */}
        <section id="roles" className="py-32 px-6 bg-slate-950 relative">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-xs font-black text-teal-400 uppercase tracking-[0.4em] block mb-3">Target Ecosystem</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Structured clinical roles.</h2>
              <p className="text-sm text-slate-500 max-w-xl mt-4 leading-relaxed">System interfaces adjust dynamically based on credentials. We provide robust tools specialized for every neonatal staff tier.</p>
            </div>

            {/* Role Selectors */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { id: 'nurse', label: 'Neonatal Nurses', icon: Users },
                { id: 'consultant', label: 'Pediatric Consultants', icon: UserCog },
                { id: 'student', label: 'Clinician Students', icon: GraduationCap }
              ].map(role => (
                <button 
                  key={role.id}
                  onClick={() => setActiveRole(role.id)}
                  className={`flex items-center gap-3 px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${activeRole === role.id ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-lg shadow-teal-500/15 scale-105' : 'bg-slate-900 border border-slate-900 text-slate-400 hover:bg-slate-800'}`}
                >
                  <role.icon className="w-4 h-4" /> {role.label}
                </button>
              ))}
            </div>

            {/* Role Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {activeRole === 'nurse' && [
                { t: 'Dosing Automation', d: 'Weight-adjusted clinical drug dosing engine.', i: Calculator },
                { t: 'Fluid Intake Logs', d: 'Interactive maintenance fluid totals calculator.', i: Activity },
                { t: 'Safety Checklists', d: 'Step-by-step guideline verification blocks.', i: BookOpen },
                { t: 'Duty Rota Schedules', d: 'Check allocated shift dates and duty coverages.', i: Clock }
              ].map((f, i) => <RoleFeature key={i} {...f} />)}
              
              {activeRole === 'consultant' && [
                { t: 'Audit Integrity Logs', d: 'Granular verification history of ward dosing choices.', i: Database },
                { t: 'Staff Verification Queue', d: 'Screen and approve newly registered clinical staff.', i: UserCheck },
                { t: 'Compliance Metrics', d: 'Track unit outcome rates and log completions.', i: BarChart },
                { t: 'Ward Policy Controls', d: 'Manage drug safety margins and guideline parameters.', i: Shield }
              ].map((f, i) => <RoleFeature key={i} {...f} />)}

              {activeRole === 'student' && [
                { t: 'Bedside Guides', d: 'Structured learning aids for active NICU diagnostics.', i: GraduationCap },
                { t: 'Interactive Scenarios', d: 'Simulate high-risk clinical case scenarios.', i: Activity },
                { t: 'Reference Manuals', d: 'Instant bedside textbook reference guidelines.', i: BookOpen },
                { t: 'Verification Requests', d: 'Request clinical signatures for dosing logs.', i: CheckCircle2 }
              ].map((f, i) => <RoleFeature key={i} {...f} />)}
            </div>
          </div>
        </section>

        {/* High-Fidelity Features Grid */}
        <section id="capabilities" className="py-32 px-6 bg-slate-900/30 border-y border-slate-900/80 relative">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex flex-col items-center text-center mb-20">
              <span className="text-xs font-black text-teal-400 uppercase tracking-[0.4em] block mb-3">Core Modules</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Built for the front lines.</h2>
              <p className="text-sm text-slate-500 max-w-xl mt-4">Tools designed to validate data, eliminate operational risk, and empower clinical execution in neonatal wards.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Precision Calculator", desc: "Automated weight-based equations for key drug infusions. Overrides cognitive calculation errors at the bedside.", icon: Calculator, color: "text-teal-400", border: "border-teal-500/20 bg-teal-500/5" },
                { title: "Duty Rota Planner", desc: "Interactive rosters for doctors and nurses. Coordinates shifts to maintain optimal clinical coverage.", icon: Lock, color: "text-indigo-400", border: "border-indigo-500/20 bg-indigo-500/5" },
                { title: "Immutable Care Logs", desc: "Transparent, real-time logging of clinical choices. Maintains a clean records path for hospital quality audits.", icon: Database, color: "text-emerald-400", border: "border-emerald-500/20 bg-emerald-500/5" }
              ].map((feature, i) => (
                <div key={i} className="group p-8 rounded-3xl bg-slate-900/40 border border-slate-900/60 shadow-md hover:bg-slate-900/80 hover:border-slate-800 transition-all duration-300 flex flex-col items-start relative overflow-hidden">
                  <div className={`w-11 h-11 rounded-xl ${feature.border} ${feature.color} flex items-center justify-center mb-6`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-black text-white mb-3 tracking-tight">{feature.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6">{feature.desc}</p>
                  
                  <div className={`mt-auto flex items-center gap-2 ${feature.color} text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-all duration-300`}>
                     System Capability <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clinical Standards & Compliance */}
        <section id="standards" className="py-32 px-6 bg-slate-950 relative">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-20">
              <span className="text-xs font-black text-teal-400 uppercase tracking-[0.4em] block mb-3">Clinical Authority</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Global medical standards.</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { t: 'WHO Guidelines Aligned', d: 'All drug dilution steps and body weight ratio formulas follow WHO neonatal guidelines.', i: ShieldCheck, c: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
                { t: 'HIPAA Compliant Structures', d: 'Granular RBAC profiles protect neonatal files and patient logs within secure parameters.', i: Lock, c: 'text-teal-400', bg: 'bg-teal-500/10 border-teal-500/20' },
                { t: 'AHA Protocol Checks', d: 'Emergency scenarios and newborn thermal guidelines operate under AHA standards.', i: Activity, c: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' }
              ].map((std, i) => (
                <div key={i} className="flex flex-col items-center text-center p-8 rounded-3xl bg-slate-900/30 border border-slate-900/50 hover:bg-slate-900/50 transition-all duration-300">
                  <div className={`w-16 h-16 ${std.bg} ${std.c} rounded-2xl flex items-center justify-center mb-6 border`}>
                     <std.i className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-black text-white mb-3">{std.t}</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{std.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-32 px-6 bg-slate-950/60 border-t border-slate-900 relative">
          <div className="max-w-3xl mx-auto">
            
            <div className="text-center mb-20">
              <span className="text-xs font-black text-teal-400 uppercase tracking-[0.4em] block mb-3">Support Hub</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Common Questions</h2>
              <p className="text-sm text-slate-500 font-medium mt-4">Learn about calculation integrity, staff registration security controls, and NICU access keys.</p>
            </div>
            
            <div className="space-y-4">
              {[
                { q: "How accurate are the dosage calculators?", a: "Calculations rely strictly on validated clinical math algorithms (such as WHO Neonatal formulary guidelines). The system validates inputs against physiologically safe weight-dosing bounds." },
                { q: "How are new staff registrations vetted?", a: "Registrations stay in a 'Pending' status. Senior clinicians or administrators must evaluate profiles via the Admin Verification Queue before the staff is granted ward dosing tools." },
                { q: "Is the interface optimized for bedside use?", a: "Yes. NBU Care operates on a mobile-first paradigm, ensuring doctors and nurses can easily log metrics and access guidelines on any handheld tablet." },
                { q: "Can hospital guidelines be customized?", a: "Yes, ward managers or ICT support staff with administrative credentials can easily update procedures, scenarios, and dosing constraints inside the system." }
              ].map((faq, i) => (
                <div key={i} className="rounded-2xl bg-slate-900/40 border border-slate-900/80 overflow-hidden transition-all duration-300">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full p-5 flex items-center justify-between text-left group transition-all"
                  >
                    <h5 className="font-extrabold text-sm text-slate-300 flex items-center gap-3.5">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${activeFaq === i ? 'bg-teal-500 text-slate-950 font-bold' : 'bg-slate-900 border border-slate-800 text-teal-400'}`}>
                        ?
                      </div>
                      {faq.q}
                    </h5>
                    <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${activeFaq === i ? 'rotate-90 text-teal-400' : ''}`} />
                  </button>
                  
                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeFaq === i ? 'max-h-60 opacity-100 border-t border-slate-900/60' : 'max-h-0 opacity-0'}`}>
                    <div className="p-5 bg-slate-950/40">
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Marquee */}
        <section className="py-16 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
          <div className="overflow-hidden relative whitespace-nowrap">
            <div className="inline-block animate-marquee-slow">
              {[
                { v: "32,450+", l: "Doses Validated" },
                { v: "100%", l: "WHO Compliance" },
                { v: "24/7/365", l: "Ward Reliability" },
                { v: "Encrypted", l: "Clinical Data Paths" },
                { v: "32,450+", l: "Doses Validated" },
                { v: "100%", l: "WHO Compliance" },
                { v: "24/7/365", l: "Ward Reliability" },
                { v: "Encrypted", l: "Clinical Data Paths" }
              ].map((stat, i) => (
                <div key={i} className="inline-flex flex-col items-center mx-16">
                  <span className="text-3xl lg:text-4xl font-black text-white tracking-tight">{stat.v}</span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{stat.l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-slate-950 pt-24 pb-12 px-6 border-t border-slate-900 relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
          
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-xl flex items-center justify-center">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <span className="font-black text-white text-lg tracking-tight">NBU<span className="text-teal-400">Care</span></span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
                  Clinical intelligence tools designed for Alvin Mutie / NBU Care neonatal units. Standardizing pediatric operations and bedside dosing calculations to support neonatal ward excellence.
                </p>
              </div>
              
              <div className="lg:col-span-3">
                <h4 className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-6">System Links</h4>
                <ul className="space-y-3 text-xs">
                  <li><a href="#about" className="text-slate-500 hover:text-teal-400 transition-colors">About Dashboard</a></li>
                  <li><a href="#workflow" className="text-slate-500 hover:text-teal-400 transition-colors">Infusion Pipeline</a></li>
                  <li><a href="#standards" className="text-slate-500 hover:text-teal-400 transition-colors">Medical Compliance</a></li>
                </ul>
              </div>

              <div className="lg:col-span-3">
                <h4 className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-6">Technical Engine</h4>
                <ul className="space-y-3 text-xs">
                  <li className="text-slate-500">Laravel Framework v{laravelVersion}</li>
                  <li className="text-slate-500">PHP Engine v{phpVersion}</li>
                  <li>
                    <a href="https://laravel.com" className="text-slate-500 hover:text-teal-400 transition-colors">
                      Powered by Inertia React
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
                © {new Date().getFullYear()} NBU Care. All rights reserved.
              </span>
              <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest">
                <a href="#" className="text-slate-600 hover:text-slate-400 transition-colors">Privacy Policy</a>
                <a href="#" className="text-slate-600 hover:text-slate-400 transition-colors">System Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

function RoleFeature({ t, d, i: Icon }) {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900/80 hover:bg-slate-900/80 hover:border-teal-500/20 transition-all duration-300">
      <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-teal-400 border border-slate-900 mb-5">
        <Icon className="w-5 h-5" />
      </div>
      <h5 className="font-extrabold text-sm text-slate-100 mb-2">{t}</h5>
      <p className="text-xs text-slate-500 leading-relaxed font-medium">{d}</p>
    </div>
  );
}
