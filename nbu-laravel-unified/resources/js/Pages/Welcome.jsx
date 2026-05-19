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
      <Head title="NBU Care - Easy Newborn ICU Care App" />
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
        <div className="absolute top-[-5%] left-[-10%] h-[600px] w-[600px] rounded-full bg-teal-500/10 blur-[130px] pointer-events-none animate-pulse-slow z-0" />
        <div className="absolute bottom-[20%] right-[-10%] h-[700px] w-[700px] rounded-full bg-indigo-500/5 blur-[140px] pointer-events-none z-0" />

        {/* Header Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 backdrop-blur-xl bg-slate-950/80 border-b border-slate-900/50 shadow-lg' : 'py-6 bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-6 flex flex-row items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 border ${scrolled ? 'bg-teal-500 text-slate-950 border-teal-500 shadow-md shadow-teal-500/20' : 'bg-slate-900/40 text-teal-400 backdrop-blur-md border-slate-800'}`}>
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight leading-none text-white">
                  NBU<span className="text-teal-400">Care</span>
                </h1>
                <div className="flex items-center gap-1 mt-1">
                   <div className="w-2 h-0.5 bg-teal-400 rounded-full animate-pulse" />
                   <span className="text-[9px] uppercase tracking-[0.25em] font-black text-slate-400">Newborn ICU Assistant</span>
                </div>
              </div>
            </div>

            {/* Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#about" className="text-xs font-black uppercase tracking-wider text-slate-400 hover:text-teal-400 transition-colors">About App</a>
              <a href="#workflow" className="text-xs font-black uppercase tracking-wider text-slate-400 hover:text-teal-400 transition-colors">Bedside Steps</a>
              <a href="#roles" className="text-xs font-black uppercase tracking-wider text-slate-400 hover:text-teal-400 transition-colors">Who Uses It</a>
              <a href="#capabilities" className="text-xs font-black uppercase tracking-wider text-slate-400 hover:text-teal-400 transition-colors">Features</a>
              <a href="#standards" className="text-xs font-black uppercase tracking-wider text-slate-400 hover:text-teal-400 transition-colors">Guidelines</a>
              <a href="#faq" className="text-xs font-black uppercase tracking-wider text-slate-400 hover:text-teal-400 transition-colors">FAQ</a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {auth.user ? (
                <Link 
                  href={route('dashboard')}
                  className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-teal-500/10 hover:scale-[1.03] active:scale-[0.98] transition-all font-bold"
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
          {/* Background Image Layer with Premium Glass Dark Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-100 z-0" 
            style={{ backgroundImage: "url('/hero-bg.jpg')" }} 
          />
          {/* Advanced overlay filters for perfect text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/40 z-0" />
          <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[2px] z-0" />

          <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Copy */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/5 px-4 py-1.5 text-xs font-black text-teal-400 tracking-wider uppercase">
                <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                Simple Newborn ICU Assistant
              </div>

              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[0.95]">
                Better Care For <br />
                <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                  Every Newborn Baby
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-semibold">
                Simple tools for doctors and nurses at NBU Care. Calculate correct drug dosages, plan shift schedules, and keep babies safe in the ward.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4">
                {auth.user ? (
                  <Link 
                    href={route('dashboard')} 
                    className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-wider shadow-xl shadow-teal-500/20 hover:translate-y-[-2px] active:translate-y-[0px] transition-all font-bold"
                  >
                    Enter Dashboard <ArrowRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <Link 
                    href={route('login')} 
                    className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-wider shadow-xl shadow-teal-500/20 hover:translate-y-[-2px] active:translate-y-[0px] transition-all font-bold"
                  >
                    Launch System <ArrowRight className="w-5 h-5" />
                  </Link>
                )}
                <a 
                  href="#about"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-wider transition-all"
                >
                  Help Guides
                </a>
              </div>
            </div>

            {/* Right Column: Hero Live HUD Overlay */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-teal-500 to-indigo-500 opacity-20 blur-2xl pointer-events-none animate-pulse-slow" />
              
              {/* Glassmorphic HUD Roster / Vitals Panel */}
              <div className="relative rounded-[32px] border border-slate-800/80 bg-slate-950/60 backdrop-blur-xl p-6 shadow-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500 group text-left">
                <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
                      <Activity className="w-4 h-4 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest block font-sans">Active Monitoring</span>
                      <span className="text-xs font-bold text-white block">Newborn Care Ward</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-md text-[9px] font-black uppercase tracking-wider">
                    Live
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Stat Item 1 */}
                  <div className="p-3 bg-slate-900/40 border border-slate-900 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-xs text-slate-300 font-bold">Shift Attendance</span>
                    </div>
                    <span className="text-xs text-slate-450 font-black font-mono">12 Staff Active</span>
                  </div>

                  {/* Stat Item 2 */}
                  <div className="p-3 bg-slate-900/40 border border-slate-900 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-teal-450" />
                      <span className="text-xs text-slate-300 font-bold">Calculations Validated</span>
                    </div>
                    <span className="text-xs text-slate-450 font-black font-mono">140+ Today</span>
                  </div>

                  {/* Stat Item 3 */}
                  <div className="p-3 bg-slate-900/40 border border-slate-900 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span className="text-xs text-slate-300 font-bold">Admitted Newborns</span>
                    </div>
                    <span className="text-xs text-slate-450 font-black font-mono">18 Patients</span>
                  </div>
                </div>

                {/* Micro-activity chart simulation */}
                <div className="mt-6 pt-4 border-t border-slate-900 flex justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest font-black">
                  <span>System load: Normal</span>
                  <span>99.9% uptime</span>
                </div>
              </div>
            </div>

          </div>
        </main>

        {/* About Section */}
        <section id="about" className="py-32 px-6 border-t border-slate-900/60 bg-slate-950/40 relative">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-black text-teal-400 uppercase tracking-[0.4em] block">How NBU Care Works</span>
              <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">
                An easy newborn care system <br />
                <span className="bg-gradient-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent">
                  built to keep babies safe.
                </span>
              </h3>
              
              <div className="space-y-4 text-slate-400 text-sm leading-relaxed font-semibold">
                <p>
                  NBU Care is a simple, smart app built to help busy doctors and nurses in newborn wards. By putting clinical guides and calculations in one place, we help you focus entirely on saving lives.
                </p>
                <p>
                  From the moment a baby is admitted, you can calculate exact drug doses based on weight, calculate safe fluid amounts, and schedule nursing shifts easily.
                </p>
                <p>
                  By automating everyday steps, we remove calculation mistakes, save time, and give newborns the safe, high-quality care they deserve.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: "Easy Drug Calculators", icon: Calculator, desc: "Find correct drug doses automatically based on the baby's weight.", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                  { title: "Everyday Care Library", icon: BookOpen, desc: "Quick checklists for newborn treatment and emergency procedures.", color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
                  { title: "Shift Rota & Handovers", icon: Users, desc: "Create shift schedules and share notes so no clinical detail is missed.", color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" }
                ].map((card, i) => (
                  <div key={i} className="group p-5 rounded-2xl bg-slate-900/40 border border-slate-900/60 hover:bg-slate-900/80 hover:border-slate-800 transition-all duration-300">
                    <div className="flex gap-5 items-center">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${card.color}`}>
                        <card.icon className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-black text-white">{card.title}</h4>
                        <p className="text-xs text-slate-500 font-bold leading-normal mt-1">{card.desc}</p>
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
              <span className="text-xs font-black text-teal-400 uppercase tracking-[0.4em] block mb-3">Simple Steps</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">How we support you at the bedside.</h2>
              <p className="text-sm text-slate-500 font-bold max-w-xl mx-auto mt-4">A clear, step-by-step layout designed to make your daily ward activities stress-free and accurate.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Interactive Step Blocks */}
              <div className="space-y-4">
                {[
                  { title: "Simple Log In", desc: "Log in securely as a nurse, doctor, or student to access your ward dashboard.", icon: UserCheck },
                  { title: "Dose Safety Check", desc: "The app automatically checks drug doses against official guidelines to keep the baby safe.", icon: Activity },
                  { title: "Shift Report Helper", desc: "Easily compile a baby's vital signs and fluid needs into a single report for the next shift.", icon: Clock },
                  { title: "Saved History Logs", desc: "Calculations and logs are saved automatically so you can audit or review them anytime.", icon: FileCheck }
                ].map((step, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border relative overflow-hidden text-left ${activeStep === idx ? 'bg-slate-900/80 border-teal-500/40 shadow-xl shadow-teal-500/5 translate-x-2' : 'bg-transparent border-transparent opacity-45 hover:opacity-80'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all ${activeStep === idx ? 'bg-teal-500 border-teal-500 text-slate-950' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                        <step.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white tracking-tight">{step.title}</h4>
                        <p className="text-xs text-slate-500 font-bold mt-1 leading-normal">{step.desc}</p>
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
                           {activeStep === 2 ? 'Shift Summary Card' : 'Ward Dashboard'}
                         </span>
                         <div className="px-2.5 py-0.5 bg-teal-500/10 border border-teal-500/20 rounded-full">
                            <span className="text-[9px] text-teal-400 font-black uppercase tracking-widest animate-pulse">Active</span>
                         </div>
                      </div>
                      
                      <div className="space-y-5 flex-1 text-left">
                         {/* Auth Layer View */}
                         <div className={`transition-all duration-500 ${activeStep === 0 ? 'opacity-100 scale-100' : 'opacity-25'}`}>
                            <div className="text-[9px] uppercase font-black text-slate-500 tracking-widest mb-1.5">Secure Log In</div>
                            <div className="h-11 bg-slate-950/80 rounded-xl flex items-center px-4 border border-slate-900">
                               <UserCog className="w-4 h-4 text-teal-400 mr-3 flex-shrink-0" />
                               <span className="text-[10px] text-slate-300 font-black tracking-wider uppercase truncate">Ward Nurse • Shift A</span>
                            </div>
                         </div>
                         
                         {/* Validation Layer View */}
                         <div className={`transition-all duration-500 ${activeStep === 1 ? 'opacity-100 scale-100' : 'opacity-25'}`}>
                            <div className="text-[9px] uppercase font-black text-slate-500 tracking-widest mb-1.5">Safe Drug Dose Checks</div>
                            <div className="p-3.5 bg-teal-950/20 rounded-xl border border-teal-500/25">
                               <div className="flex justify-between mb-2">
                                  <span className="text-[10px] text-slate-400 font-bold">Newborn Medicine</span>
                                  <span className="text-[10px] text-teal-405 font-black tracking-widest">CHECKED & SAFE</span>
                                </div>
                                <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                                   <div className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 w-[90%]" />
                                </div>
                            </div>
                         </div>

                         {/* Handover Log View */}
                         <div className={`transition-all duration-500 ${activeStep === 2 ? 'opacity-100 translate-x-0' : 'opacity-25'}`}>
                            <div className="text-[9px] uppercase font-black text-slate-500 tracking-widest mb-1.5">Shift Vitals</div>
                            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-900 space-y-2">
                               <div className="flex items-center gap-2.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  <span className="text-[10px] text-slate-400 font-bold">Temperature: 36.8°C (Stable)</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-teal-505" />
                                  <span className="text-[10px] text-slate-400 font-bold">Total Fluids: 140 mL/kg/day</span>
                                </div>
                            </div>
                         </div>

                         {/* Audit Log View */}
                         <div className={`transition-all duration-500 ${activeStep === 3 ? 'opacity-100 scale-100' : 'opacity-25'}`}>
                            <div className="text-[9px] uppercase font-black text-slate-500 tracking-widest mb-1.5">Saved to Registry</div>
                            <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 flex items-center justify-between">
                              <span className="text-[9px] font-mono text-slate-400">ID: 8a9d10e82c</span>
                              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Saved</span>
                            </div>
                         </div>
                      </div>

                      <div className="h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-black uppercase tracking-wider text-xs shadow-md shadow-teal-500/10 cursor-pointer">
                         {activeStep === 2 ? 'Send shift report' : 'Save to Ward Registry'}
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
              <span className="text-xs font-black text-teal-400 uppercase tracking-[0.4em] block mb-3">Who Uses the App</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Tailored for every member of the team.</h2>
              <p className="text-sm text-slate-550 max-w-xl mt-4 leading-relaxed font-bold">Your dashboard matches your role. We provide simple tools made specifically for nurses, doctors, and students.</p>
            </div>

            {/* Role Selectors */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { id: 'nurse', label: 'Ward Nurses', icon: Users },
                { id: 'consultant', label: 'Senior Doctors', icon: UserCog },
                { id: 'student', label: 'Medical Students', icon: GraduationCap }
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
                { t: 'Drug Dosing', d: 'Find safe drug amounts based on weight.', i: Calculator },
                { t: 'Fluid Logs', d: 'Calculate safe fluid needs for the day.', i: Activity },
                { t: 'Ward Checklists', d: 'Step-by-step guides for treatments.', i: BookOpen },
                { t: 'Shift Schedules', d: 'See your assigned shift dates and roster.', i: Clock }
              ].map((f, i) => <RoleFeature key={i} {...f} />)}
              
              {activeRole === 'consultant' && [
                { t: 'Audit Logs', d: 'Look at history logs of all calculations.', i: Database },
                { t: 'Approve Registrations', d: 'Review and approve new team members.', i: UserCheck },
                { t: 'Ward Statistics', d: 'Monitor calculations and completed shifts.', i: BarChart },
                { t: 'App Guidelines', d: 'Update drug guidelines and system rules.', i: Shield }
              ].map((f, i) => <RoleFeature key={i} {...f} />)}

              {activeRole === 'student' && [
                { t: 'Learning Guides', d: 'Easy charts to learn ward protocols.', i: GraduationCap },
                { t: 'Practice Cases', d: 'Try real-world training cases safely.', i: Activity },
                { t: 'Ward Handbooks', d: 'Quick reference guides at your fingertips.', i: BookOpen },
                { t: 'Approve Doses', d: 'Ask senior doctors to verify drug calculations.', i: CheckCircle2 }
              ].map((f, i) => <RoleFeature key={i} {...f} />)}
            </div>
          </div>
        </section>

        {/* High-Fidelity Features Grid */}
        <section id="capabilities" className="py-32 px-6 bg-slate-900/30 border-y border-slate-900/80 relative">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex flex-col items-center text-center mb-20">
              <span className="text-xs font-black text-teal-400 uppercase tracking-[0.4em] block mb-3">Key Features</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Simple, smart features.</h2>
              <p className="text-sm text-slate-550 max-w-xl mt-4 font-bold">Everything you need to do your best work and keep babies safe in the ward.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Easy Calculator", desc: "Calculate weight-based drug doses in seconds. Avoid calculations under pressure.", icon: Calculator, color: "text-teal-400", border: "border-teal-500/20 bg-teal-500/5" },
                { title: "Rota Planner", desc: "View schedules for nurses and doctors to make sure there is always someone on duty.", icon: Lock, color: "text-indigo-400", border: "border-indigo-500/20 bg-indigo-500/5" },
                { title: "Ward History Logs", desc: "Save and audit dosage entries to help the hospital track ward care standards.", icon: Database, color: "text-emerald-400", border: "border-emerald-500/20 bg-emerald-500/5" }
              ].map((feature, i) => (
                <div key={i} className="group p-8 rounded-3xl bg-slate-900/40 border border-slate-900/60 shadow-md hover:bg-slate-900/80 hover:border-slate-800 transition-all duration-300 flex flex-col items-start relative overflow-hidden">
                  <div className={`w-11 h-11 rounded-xl ${feature.border} ${feature.color} flex items-center justify-center mb-6`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-black text-white mb-3 tracking-tight text-left">{feature.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold mb-6 text-left">{feature.desc}</p>
                  
                  <div className={`mt-auto flex items-center gap-2 ${feature.color} text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-all duration-300`}>
                     System Feature <ArrowRight className="w-3.5 h-3.5" />
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
              <span className="text-xs font-black text-teal-400 uppercase tracking-[0.4em] block mb-3">Our Medical Guidelines</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Trusted hospital guidelines.</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { t: 'WHO Standards', d: 'Calculations and dilutions are based directly on the World Health Organization guidelines.', i: ShieldCheck, c: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
                { t: 'Secure Patient Files', d: 'User roles and security layers protect baby records and patient logs.', i: Lock, c: 'text-teal-400', bg: 'bg-teal-500/10 border-teal-500/20' },
                { t: 'Emergency Protocols', d: 'First aid and temperature care checklists follow standard pediatric protocols.', i: Activity, c: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' }
              ].map((std, i) => (
                <div key={i} className="flex flex-col items-center text-center p-8 rounded-3xl bg-slate-900/30 border border-slate-900/50 hover:bg-slate-900/50 transition-all duration-300">
                  <div className={`w-16 h-16 ${std.bg} ${std.c} rounded-2xl flex items-center justify-center mb-6 border`}>
                     <std.i className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-black text-white mb-3">{std.t}</h4>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">{std.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-32 px-6 bg-slate-950/60 border-t border-slate-900 relative">
          <div className="max-w-3xl mx-auto">
            
            <div className="text-center mb-20">
              <span className="text-xs font-black text-teal-400 uppercase tracking-[0.4em] block mb-3">Help Center</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Common Questions</h2>
              <p className="text-sm text-slate-500 font-bold mt-4">Learn about safe drug calculations, account approvals, and clinical logs.</p>
            </div>
            
            <div className="space-y-4">
              {[
                { q: "Are the calculators accurate?", a: "Yes. The math is based on standard WHO guidelines and checks all doses against safe limits for a baby's weight." },
                { q: "How are new registrations approved?", a: "New accounts are reviewed by senior doctors or administrators before they can access ward calculations." },
                { q: "Is it easy to use on a tablet?", a: "Yes. NBU Care is built for mobile devices, so you can easily carry it with you in the ward." },
                { q: "Can guidelines be updated?", a: "Yes, administrators and clinical leads can update dosing guidelines and checklists anytime." }
              ].map((faq, i) => (
                <div key={i} className="rounded-2xl bg-slate-900/40 border border-slate-900/80 overflow-hidden transition-all duration-300">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full p-5 flex items-center justify-between text-left group transition-all"
                  >
                    <h5 className="font-extrabold text-sm text-slate-350 flex items-center gap-3.5">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${activeFaq === i ? 'bg-teal-500 text-slate-950 font-bold' : 'bg-slate-900 border border-slate-800 text-teal-400'}`}>
                        ?
                      </div>
                      {faq.q}
                    </h5>
                    <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${activeFaq === i ? 'rotate-90 text-teal-400' : ''}`} />
                  </button>
                  
                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeFaq === i ? 'max-h-60 opacity-100 border-t border-slate-900/60' : 'max-h-0 opacity-0'}`}>
                    <div className="p-5 bg-slate-950/40 text-left">
                      <p className="text-xs text-slate-400 leading-relaxed font-semibold">{faq.a}</p>
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
                  <span className="text-[10px] font-black text-slate-550 uppercase tracking-widest mt-1">{stat.l}</span>
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
              <div className="lg:col-span-6 space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-xl flex items-center justify-center">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <span className="font-black text-white text-lg tracking-tight">NBU<span className="text-teal-400">Care</span></span>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed max-w-sm font-semibold">
                  Newborn ward assistant tools designed for Alvin Mutie / NBU Care units. Standardizing clinical checks and shift handover processes to make daily work simpler.
                </p>
              </div>
              
              <div className="lg:col-span-3 text-left">
                <h4 className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-6">System Links</h4>
                <ul className="space-y-3 text-xs font-semibold">
                  <li><a href="#about" className="text-slate-500 hover:text-teal-400 transition-colors">About Dashboard</a></li>
                  <li><a href="#workflow" className="text-slate-500 hover:text-teal-400 transition-colors">Infusion Pipeline</a></li>
                  <li><a href="#standards" className="text-slate-500 hover:text-teal-400 transition-colors">Medical Compliance</a></li>
                </ul>
              </div>

              <div className="lg:col-span-3 text-left">
                <h4 className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-6">Technical Engine</h4>
                <ul className="space-y-3 text-xs font-semibold">
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
    <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900/80 hover:bg-slate-900/80 hover:border-teal-500/20 transition-all duration-300 text-left">
      <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-teal-400 border border-slate-900 mb-5">
        <Icon className="w-5 h-5" />
      </div>
      <h5 className="font-extrabold text-sm text-slate-100 mb-2">{t}</h5>
      <p className="text-xs text-slate-500 leading-relaxed font-semibold">{d}</p>
    </div>
  );
}
