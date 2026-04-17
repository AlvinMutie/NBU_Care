import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  ArrowLeft, 
  Stethoscope,
  ChevronRight,
  Loader2,
  AlertCircle,
  Key
} from 'lucide-react';
import { api } from '../services/api';

export default function Login({ onLogin, onBack, onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await api.login(email, password);
      if (res.success) {
        onLogin(res.user);
      } else {
        setError(res.message || "We couldn't find an account with those details.");
      }
    } catch (err) {
       setError("We're having trouble connecting. Please check your internet or talk to IT.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 font-sans">
      
      {/* Left Design Panel */}
      <div className="hidden lg:flex flex-1 bg-slate-900 flex-col items-center justify-center p-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[80px]" />
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[60px]" />
         
         <div className="max-w-md text-center relative z-10">
            <div className="w-20 h-20 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/10">
              <Stethoscope className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Neo<span className="text-primary">Desk</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
               A friendly assistant for your shift. We help with medication doses, fluid rates, and procedure reminders.
            </p>
            <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm text-left">
               <div className="flex items-center gap-2 mb-4">
                  <Key className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Test Accounts</span>
               </div>
               <div className="space-y-3">
                  <div className="flex flex-col">
                     <span className="text-[9px] font-bold text-slate-500 uppercase">Nurse / Doctor</span>
                     <span className="text-xs text-slate-300">nurse@nbu.hospital.ke / Nurse@1234</span>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[9px] font-bold text-slate-500 uppercase">In-Charge</span>
                     <span className="text-xs text-slate-300">incharge@nbu.hospital.ke / Admin@1234</span>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[9px] font-bold text-slate-500 uppercase">Student</span>
                     <span className="text-xs text-slate-300">student@nbu.hospital.ke / Student@1234</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col p-6 lg:p-12 items-center justify-center relative">
         <button 
           onClick={onBack}
           className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium text-sm transition-colors"
         >
           <ArrowLeft className="w-4 h-4" /> Back
         </button>

         <div className="max-w-md w-full">
            <div className="text-left mb-10">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Welcome Back</h1>
              <p className="text-slate-500">Sign in to start your shift.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium rounded-lg flex items-center gap-3">
                   <AlertCircle className="w-5 h-5 flex-shrink-0" />
                   <p>{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Your Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 outline-none transition-all text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900"
                    placeholder="nurse.name@hospital.cloud"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-700">Your Password</label>
                  <button type="button" className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors">Forgot Password?</button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 outline-none transition-all text-sm bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary-dark text-white py-3.5 rounded-lg font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing you in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-10 pt-10 border-t border-slate-200 text-center">
               <p className="text-slate-500 text-sm">
                 Need an account?{' '}
                 <button onClick={onRegister} className="text-primary font-bold hover:underline transition-all">Request access here</button>
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
