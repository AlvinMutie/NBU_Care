import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, User, Mail, Lock, IdCard, Camera, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Register: React.FC = () => {
  const [step, setStep] = useState(1);

  const roles = [
    'Nursing In-Charge',
    'Staff Nurse',
    'Consultant Pediatrician',
    'Medical Officer',
    'Student',
  ];

  return (
    <div className="min-h-screen bg-brand-slate flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-xl relative z-10">
        <div className="glass-card p-6 sm:p-10 space-y-8 animate-in fade-in zoom-in-95 duration-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/30">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-100">NeoDesk Registry</h1>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Clinical Onboarding</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
               {[1, 2].map(i => (
                 <div key={i} className={`h-1.5 w-8 rounded-full transition-all duration-500 ${step >= i ? 'bg-emerald-500' : 'bg-white/10'}`} />
               ))}
            </div>
          </div>

          <form className="space-y-6">
            {step === 1 ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-5"
              >
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-slate-100">Identity & Access</h2>
                  <p className="text-sm text-slate-400">Basic credentials for system authentication.</p>
                </div>

                <div className="space-y-4">
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={18} />
                    <input 
                      type="text" 
                      placeholder="Full Legal Name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    />
                  </div>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={18} />
                    <input 
                      type="email" 
                      placeholder="Institutional Email"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    />
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={18} />
                    <input 
                      type="password" 
                      placeholder="Secure Password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full glass-button py-4 font-bold flex items-center justify-center space-x-2 group"
                >
                  <span>Continue to Credentials</span>
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-slate-100">Professional Validation</h2>
                  <p className="text-sm text-slate-400">Clinical role and institutional identification.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Clinical Role</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all appearance-none cursor-pointer">
                        <option value="" disabled selected>Select Role</option>
                        {roles.map(role => <option key={role} value={role} className="bg-slate-800">{role}</option>)}
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Hospital ID</label>
                      <div className="relative group">
                        <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={18} />
                        <input 
                          type="text" 
                          placeholder="HOSP-2026-X"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                        />
                      </div>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Passport Verification</label>
                   <div className="w-full h-32 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center space-y-2 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all cursor-pointer group">
                      <Camera className="text-slate-500 group-hover:text-emerald-400 transition-colors" size={32} />
                      <span className="text-xs text-slate-500 font-medium">Click to upload photo</span>
                   </div>
                </div>

                <div className="flex space-x-4">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 border border-white/10 rounded-xl font-bold text-slate-400 hover:text-white transition-all"
                  >
                    Back
                  </button>
                  <button 
                    type="button"
                    className="flex-[2] glass-button py-4 font-bold shadow-lg shadow-emerald-500/20"
                  >
                    Submit Request
                  </button>
                </div>
              </motion.div>
            )}
          </form>

          <div className="pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-slate-500">
              Already have clinical access? <Link to="/login" className="text-emerald-400 font-bold hover:text-emerald-300 ml-1">Authenticate Now</Link>
            </p>
          </div>
        </div>
        
        <p className="mt-8 text-center text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em] leading-relaxed max-w-sm mx-auto">
          All registrations are subject to verification by the Nursing In-Charge or Consultant Pediatrician.
        </p>
      </div>
    </div>
  );
};

export default Register;
