import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="NBU Care - Pediatric Neonatal Clinical System" />
            <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-slate-950 font-sans">
                
                {/* Visual Ambient Background Glows */}
                <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />
                <div className="absolute top-[30%] right-[10%] h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

                {/* Subtle Grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

                {/* Header Navigation */}
                <header className="relative z-10 mx-auto max-w-7xl px-6 py-6 flex items-center justify-between border-b border-slate-800/50 backdrop-blur-md bg-slate-950/20">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 p-[1.5px] shadow-lg shadow-teal-500/20">
                            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-900">
                                <svg
                                    className="h-5 w-5 text-teal-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent">
                                NBU<span className="text-slate-100 font-medium">Care</span>
                            </span>
                            <span className="ml-1.5 rounded-full bg-teal-500/10 px-2 py-0.5 text-[10px] font-medium text-teal-400 border border-teal-500/20">
                                Unified Portal
                            </span>
                        </div>
                    </div>

                    <nav className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 p-[1.5px] text-sm font-semibold text-slate-950 transition hover:shadow-lg hover:shadow-teal-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                            >
                                <span className="flex items-center gap-1.5 rounded-[10px] bg-gradient-to-r from-teal-400 to-emerald-400 px-4 py-2 transition group-hover:bg-slate-900 group-hover:text-teal-400">
                                    Access Clinical Portal
                                    <svg
                                        className="h-4 w-4 transition transform group-hover:translate-x-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-300 hover:text-slate-100 transition hover:bg-slate-900/60"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-800 hover:border-slate-600 transition"
                                >
                                    Create Account
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-24 lg:pt-24">
                    <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 items-center">
                        <div className="lg:col-span-7 flex flex-col items-start text-left">
                            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/5 px-3 py-1 text-xs font-semibold text-teal-400 mb-6">
                                <span className="flex h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
                                Hospital-Grade Neonatal Intensive Care System
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
                                Precision Tools for{' '}
                                <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                                    Neonatal Care
                                </span>
                            </h1>

                            <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
                                Empowering pediatricians, neonatal nurses, and clinical leads at Alvin Mutie / NBU Care. Streamline real-time shift handovers, manage clinician duty rosters, track total fluid intake (TFI), and execute drug dosages with instant, weight-validated safety parameters.
                            </p>

                            <div className="mt-10 flex flex-wrap gap-4 items-center">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-3.5 text-base font-bold text-slate-950 hover:from-teal-400 hover:to-emerald-400 hover:shadow-xl hover:shadow-teal-500/10 transition"
                                    >
                                        Enter Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('login')}
                                        className="rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-3.5 text-base font-bold text-slate-950 hover:from-teal-400 hover:to-emerald-400 hover:shadow-xl hover:shadow-teal-500/10 transition"
                                    >
                                        Sign In to Access Dashboard
                                    </Link>
                                )}

                                <a
                                    href="#features"
                                    className="rounded-xl border border-slate-700 bg-slate-900/40 px-6 py-3.5 text-base font-semibold text-slate-300 hover:text-slate-100 hover:bg-slate-800 transition"
                                >
                                    Explore Modules &darr;
                                </a>
                            </div>

                            {/* Medical Compliances Bar */}
                            <div className="mt-12 flex flex-wrap gap-6 text-xs text-slate-500 border-t border-slate-900 pt-8 w-full">
                                <div className="flex items-center gap-1.5">
                                    <svg className="h-4 w-4 text-teal-500/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                    HIPAA Compliant Data Standards
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <svg className="h-4 w-4 text-teal-500/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                    Aligned with WHO Neonatal Guidelines
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <svg className="h-4 w-4 text-teal-500/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    100% Real-Time Shift Logs
                                </div>
                            </div>
                        </div>

                        {/* Interactive UI Preview Mockup */}
                        <div className="lg:col-span-5 relative">
                            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-teal-500 to-indigo-500 opacity-20 blur-xl pointer-events-none" />
                            
                            {/* Glassmorphic Mockup Container */}
                            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/65 backdrop-blur-xl p-5 shadow-2xl overflow-hidden">
                                
                                {/* Header of preview */}
                                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                                        <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                        <span className="ml-2 text-xs font-mono text-slate-500">dosage_calculator_widget</span>
                                    </div>
                                    <span className="text-[11px] rounded bg-teal-500/10 px-2 py-0.5 text-teal-400 font-mono">Dopamine</span>
                                </div>

                                {/* Dosage Calculator UI Representation */}
                                <div className="space-y-4 text-left">
                                    <div>
                                        <label className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">1. Patient Body Weight</label>
                                        <div className="mt-1 flex items-center justify-between rounded-lg bg-slate-950 border border-slate-850 p-2.5">
                                            <span className="text-sm font-semibold text-slate-200">Baby Ya Baba (Admitted)</span>
                                            <span className="text-sm font-bold text-teal-400 bg-teal-400/5 px-2 py-0.5 rounded">3.20 kg</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">2. Prescribed Dosage Rate</label>
                                        <div className="mt-1 flex items-center justify-between rounded-lg bg-slate-950 border border-slate-850 p-2.5">
                                            <span className="text-sm font-semibold text-slate-200">Recommended Range (5 - 20 mcg)</span>
                                            <span className="text-sm font-bold text-emerald-400">10.0 mcg/kg/min</span>
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div className="flex justify-center text-slate-650 py-1">
                                        <svg className="h-5 w-5 text-teal-500/70 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                                    </div>

                                    {/* Outputs Container */}
                                    <div className="rounded-xl bg-gradient-to-r from-teal-950/40 to-slate-950 border border-teal-500/20 p-4 space-y-3">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-slate-400 font-medium">Desired Hourly Dose:</span>
                                            <span className="text-slate-200 font-bold font-mono">1.92 mg/hour</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-slate-400 font-medium">Preparation Vol (D5W/NS):</span>
                                            <span className="text-slate-200 font-bold font-mono">50.00 mL</span>
                                        </div>
                                        <div className="flex justify-between items-center border-t border-slate-800/80 pt-2.5">
                                            <span className="text-xs font-bold text-teal-300">Infusion Pump Rate:</span>
                                            <span className="text-sm font-black font-mono text-teal-400 animate-pulse">0.96 mL/hour</span>
                                        </div>
                                    </div>

                                    <div className="text-[10px] text-slate-500 text-center leading-normal italic">
                                        *Calculations automatically matched against clinical safety thresholds in database.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Module Section */}
                    <div id="features" className="mt-32 pt-16 border-t border-slate-900">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                                Integrated Neonatal Care Ecosystem
                            </h2>
                            <p className="mt-4 text-slate-400">
                                Four core clinical pillars in a single, high-reliability dashboard to assure NBU safety and eliminate procedural transition errors.
                            </p>
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            
                            {/* Card 1: Registry */}
                            <div className="group relative rounded-2xl border border-slate-850 bg-slate-900/30 p-6 transition duration-300 hover:bg-slate-900/60 hover:border-slate-750">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 group-hover:scale-110 transition duration-300 mb-6">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Newborn Registry</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Standardized admission workflow tracking gestational ages, birth/current weights, specific primary diagnoses, and maternal contacts.
                                </p>
                            </div>

                            {/* Card 2: Calculators */}
                            <div className="group relative rounded-2xl border border-slate-850 bg-slate-900/30 p-6 transition duration-300 hover:bg-slate-900/60 hover:border-slate-750">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition duration-300 mb-6">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Precision Calculators</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Instant weight-adjusted drug infusions, double-checked syringe calculations, and maintenance fluid guidelines to prevent medical accidents.
                                </p>
                            </div>

                            {/* Card 3: Shift Handovers */}
                            <div className="group relative rounded-2xl border border-slate-850 bg-slate-900/30 p-6 transition duration-300 hover:bg-slate-900/60 hover:border-slate-750">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition duration-300 mb-6">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Shift Handover Reports</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Standardized morning/night transition registries logging patient vitals, fluid intakes, complete blood counts, and hepatic/renal indices.
                                </p>
                            </div>

                            {/* Card 4: Duty Rota */}
                            <div className="group relative rounded-2xl border border-slate-850 bg-slate-900/30 p-6 transition duration-300 hover:bg-slate-900/60 hover:border-slate-750">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition duration-300 mb-6">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Duty Rota Scheduler</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Interactive scheduler for clinicians and ward staff, ensuring the unit has adequate, certified nursing coverage 24/7/365.
                                </p>
                            </div>

                        </div>
                    </div>
                </main>

                {/* Footer Section */}
                <footer className="relative z-10 mx-auto max-w-7xl px-6 py-12 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-2 mb-4 sm:mb-0">
                        <span className="font-bold text-slate-400">NBU Care</span>
                        <span>&bull;</span>
                        <span>Clinical Intelligence Systems &copy; {new Date().getFullYear()}</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <span>Laravel Framework v{laravelVersion}</span>
                        <span>PHP Version v{phpVersion}</span>
                        <a href="https://github.com" target="_blank" className="hover:text-teal-400 transition">Clinical GitHub Seeding</a>
                    </div>
                </footer>

            </div>
        </>
    );
}
