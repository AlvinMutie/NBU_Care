import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Mail, Lock, IdCard, Camera, ChevronRight, Eye, EyeOff, CheckCircle2, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
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

  const handleImageUpload = () => {
    // Simulate camera/upload
    setProfileImage('https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop');
  };

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
  const isStep2Complete = formData.role && formData.hospitalId && profileImage;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-6 relative overflow-hidden font-sans text-[var(--text-main)]">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
      
      <div className="w-full max-w-xl relative z-10">
        <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2.5rem] p-8 sm:p-12 shadow-2xl space-y-10 animate-in fade-in zoom-in-95 duration-700">
          
          <div className="flex justify-between items-center">
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors group"
            >
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-black text-[var(--text-main)] tracking-tight leading-none">NeoDesk</h1>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">Clinical Registry</p>
              </div>
            </Link>
            <div className="flex items-center space-x-2">
               {[1, 2].map(i => (
                 <div key={i} className={`h-1.5 w-10 rounded-full transition-all duration-500 ${step >= i ? 'bg-emerald-600' : 'bg-[var(--bg-main)]'}`} />
               ))}
            </div>
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
                        >
                          <option value="" disabled selected>Select Role</option>
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
                          />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Passport Verification (Mandatory)</label>
                     <div 
                        onClick={handleImageUpload}
                        className={`w-full h-40 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center space-y-3 transition-all cursor-pointer group ${profileImage ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10' : 'border-[var(--border-main)] hover:border-emerald-400 hover:bg-[var(--bg-main)]'}`}
                      >
                        {profileImage ? (
                           <div className="flex flex-col items-center space-y-2">
                              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500 shadow-md">
                                 <img src={profileImage} alt="Profile Preview" className="w-full h-full object-cover" />
                              </div>
                              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center space-x-1">
                                 <CheckCircle2 size={12} />
                                 <span>Image Captured</span>
                              </span>
                           </div>
                        ) : (
                           <>
                              <Camera className="text-slate-300 group-hover:text-emerald-500 transition-colors" size={32} />
                              <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Click to Capture Photo</span>
                           </>
                        )}
                     </div>
                     <p className="text-[10px] text-center text-slate-400 font-medium">Please use a clear, recent, passport-style photo showing your full face.</p>
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

          <div className="pt-8 border-t border-[var(--border-main)] text-center">
            <p className="text-xs text-slate-400 font-medium">
              Already have clinical access? <Link to="/login" className="text-emerald-600 font-black hover:text-emerald-700 ml-1 underline decoration-emerald-200 underline-offset-4">Authenticate Now</Link>
            </p>
          </div>
        </div>
        
        <p className="mt-12 text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] leading-relaxed max-w-sm mx-auto opacity-60">
          Security Protocol v16.0 <br />
          All submissions are forensicially audited.
        </p>
      </div>
    </div>
  );
};

export default Register;
