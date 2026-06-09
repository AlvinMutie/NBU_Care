import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Mail, Lock, IdCard, ChevronRight, Eye, EyeOff, CheckCircle2, ChevronLeft, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: '',
    hospitalId: '',
  });

  const roles = [
    'Nursing In-Charge',
    'Staff Nurse',
    'Consultant Pediatrician',
    'Medical Officer',
    'Student',
  ];

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post('/auth/register', {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        hospitalId: formData.hospitalId
      });
      navigate('/login', { state: { message: 'Registration successful. Awaiting institutional approval.' } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Institutional registration failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const isStep1Complete = formData.fullName && formData.email && formData.password;
  const isStep2Complete = formData.role && formData.hospitalId;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col justify-center py-12 px-6 lg:px-8 animate-in fade-in duration-1000">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-6">
        <Link to="/" className="inline-flex items-center space-x-3 group">
          <div className="w-12 h-12 bg-slate-900 dark:bg-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
            <ShieldCheck className="text-white" size={28} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-[var(--text-main)]">NeoDesk<span className="text-emerald-600">.</span></span>
        </Link>
        <div className="space-y-1">
           <h1 className="text-3xl font-black tracking-tight text-[var(--text-main)]">Access Protocol</h1>
           <p className="text-slate-500 font-medium">Initialize your institutional clinical credentials.</p>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-[var(--card-bg)] border border-[var(--border-main)] py-10 px-8 sm:px-12 rounded-[3rem] shadow-sm relative overflow-hidden">
          {/* Progress Indicator */}
          <div className="absolute top-0 left-0 w-full h-1 bg-[var(--bg-main)]">
            <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: step === 1 ? '50%' : '100%' }}
              className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
            />
          </div>

          <form onSubmit={handleRegistration} className="space-y-8">
            {error && (
              <div className="p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 rounded-2xl flex items-center space-x-3 text-rose-600">
                <AlertCircle size={18} />
                <p className="text-xs font-bold">{error}</p>
              </div>
            )}
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">Identity & Security</h2>
                    <p className="text-slate-500 font-medium">Create your institutional access credentials.</p>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Full Legal Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 transition-colors" size={18} />
                        <input 
                          type="text" 
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          placeholder="As per Hospital ID"
                          className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl py-4 pl-12 pr-4 text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium placeholder:text-slate-300"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Institutional Email</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 transition-colors" size={18} />
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="name@hospital.go.ke"
                          className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl py-4 pl-12 pr-4 text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium placeholder:text-slate-300"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 transition-colors" size={18} />
                        <input 
                          type={showPassword ? 'text' : 'password'} 
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          placeholder="Minimum 8 characters"
                          className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl py-4 pl-12 pr-12 text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium placeholder:text-slate-300"
                          required
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="button"
                    disabled={!isStep1Complete}
                    onClick={() => setStep(2)}
                    className="w-full bg-slate-900 dark:bg-slate-800 text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-2 group hover:bg-black dark:hover:bg-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-slate-200 dark:shadow-none"
                  >
                    <span>Continue to Credentials</span>
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-[var(--text-main)] tracking-tight">Professional Validation</h2>
                    <p className="text-slate-500 font-medium">Verify your clinical role and identity.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Clinical Role</label>
                        <select 
                          value={formData.role}
                          onChange={(e) => setFormData({...formData, role: e.target.value})}
                          className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl py-4 px-5 text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold appearance-none cursor-pointer"
                          required
                        >
                          <option value="" disabled>Select Role</option>
                          {roles.map(role => <option key={role} value={role}>{role}</option>)}
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Hospital ID</label>
                        <div className="relative group">
                          <IdCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 transition-colors" size={18} />
                          <input 
                            type="text" 
                            value={formData.hospitalId}
                            onChange={(e) => setFormData({...formData, hospitalId: e.target.value})}
                            placeholder="HOSP-2026-X"
                            className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl py-4 pl-12 pr-4 text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium placeholder:text-slate-300"
                            required
                          />
                        </div>
                     </div>
                  </div>

                  <div className="p-6 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 rounded-3xl space-y-2">
                     <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center space-x-2">
                        <ShieldCheck size={14} />
                        <span>Institutional Verification</span>
                     </p>
                     <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        By submitting, you confirm that these credentials belong to you and will be used solely for authorized clinical tasks.
                     </p>
                  </div>

                  <div className="flex space-x-4">
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-5 border border-[var(--border-main)] rounded-2xl font-bold text-slate-500 hover:bg-[var(--bg-main)] transition-all uppercase text-[11px] tracking-widest"
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      disabled={!isStep2Complete || loading}
                      className="flex-[2] bg-emerald-600 text-white py-5 rounded-2xl font-bold shadow-xl shadow-emerald-100 dark:shadow-none transition-all hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed uppercase text-[11px] tracking-widest flex items-center justify-center space-x-2"
                    >
                      {loading && <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />}
                      <span>{loading ? 'Processing...' : 'Submit Registration'}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <div className="mt-10 pt-10 border-t border-[var(--border-main)] text-center">
             <p className="text-sm font-medium text-slate-500">
               Already hold institutional access? <Link to="/login" className="text-emerald-600 font-bold hover:underline">Log in here</Link>
             </p>
          </div>
        </div>

        <p className="mt-10 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] leading-relaxed max-w-sm mx-auto opacity-60">
          Security Protocol v16.0 <br />
          All submissions are forensicially audited.
        </p>
      </div>
    </div>
  );
};

export default Register;
