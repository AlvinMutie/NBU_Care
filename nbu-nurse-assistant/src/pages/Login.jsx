import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  ArrowLeft, 
  Stethoscope,
  ChevronRight,
  Loader2,
  AlertCircle,
  Key,
  Eye,
  EyeOff
} from 'lucide-react';
import { api } from '../services/api';

export default function Login({ onLogin, onBack, onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
       if (err.message.includes('403') || (err.response && err.response.status === 403)) {
         setError("Your account is pending verification by the Nursing In-Charge.");
       } else {
         setError("We're having trouble connecting. Please check your internet or talk to IT.");
       }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 font-sans">
      
      {/* Left Design Panel */}
      <div className="hidden lg:flex flex-1 bg-slate-900 flex-col items-center justify-center p-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
         <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px]" />
         
         <div className="max-w-md text-center relative z-10">
            <div className="w-24 h-24 bg-primary/20 text-primary rounded-[32px] flex items-center justify-center mx-auto mb-10 border border-white/10 backdrop-blur-xl shadow-2xl">
              <Stethoscope className="w-12 h-12" />
            </div>
            <h2 className="text-5xl font-black text-white mb-6 tracking-tighter">Neo<span className="text-primary">Desk</span><span className="text-primary text-6xl">.</span></h2>
            <p className="text-slate-400 text-xl leading-relaxed font-semibold">
               Clinical excellence, at your fingertips.
            </p>
            
            <div className="mt-16 p-8 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-md text-left shadow-2xl">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Key className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs font-black text-slate-300 uppercase tracking-[0.2em]">Clinical Access</span>
               </div>
               <div className="space-y-4">
                  {[
                    { role: "Nurse / Doctor", email: "nurse@nbu.hospital.ke", pass: "Nurse@1234" },
                    { role: "In-Charge", email: "incharge@nbu.hospital.ke", pass: "Admin@1234" }
                  ].map((acc, i) => (
                    <button 
                      key={i} 
                      type="button"
                      onClick={() => {
                        setEmail(acc.email);
                        setPassword(acc.pass);
                        // Optional: auto-submit? Let's just fill for now to be safe, or auto-submit.
                        // I'll auto-submit after a tiny delay.
                        setTimeout(() => {
                          const form = document.querySelector('form');
                          if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                        }, 100);
                      }}
                      className="w-full flex flex-col p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-primary/50 transition-all text-left group/card"
                    >
                       <div className="flex items-center justify-between w-full">
                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 group-hover/card:text-primary transition-colors">{acc.role}</span>
                         <ArrowLeft className="w-3 h-3 text-slate-600 rotate-180 group-hover/card:translate-x-1 transition-all" />
                       </div>
                       <span className="text-sm text-slate-200 font-bold">{acc.email}</span>
                       <span className="text-[10px] text-slate-500 mt-1">Pass: {acc.pass}</span>
                    </button>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col p-6 lg:p-12 items-center justify-center relative bg-white lg:rounded-l-[60px] shadow-2xl z-20">
         <button 
           onClick={onBack}
           className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black text-sm transition-all group"
         >
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
         </button>

         <div className="max-w-md w-full">
            <div className="text-left mb-12">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Welcome Back</h1>
              <p className="text-slate-500 font-medium">Please sign in to begin your shift.</p>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              {error && (
                <div className={`p-5 rounded-[24px] flex items-center gap-4 animate-in fade-in slide-in-from-top-4 ${error.includes('pending') ? 'bg-amber-50 border border-amber-100 text-amber-700' : 'bg-rose-50 border border-rose-100 text-rose-600'}`}>
                   <AlertCircle className="w-6 h-6 flex-shrink-0" />
                   <p className="text-sm font-bold leading-tight">{error}</p>
                </div>
              )}

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Hospital Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 outline-none transition-all text-sm bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary text-slate-900 font-medium"
                    placeholder="name@hospital.org"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Password</label>
                  <button type="button" className="text-[10px] font-black text-primary hover:text-primary-dark transition-colors uppercase tracking-wider">Forgot Access?</button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-14 py-4 rounded-2xl border border-slate-100 outline-none transition-all text-sm bg-slate-50 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary text-slate-900 font-medium"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white py-5 rounded-[24px] font-black text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 mt-4 active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Authorizing...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-16 text-center">
               <p className="text-slate-400 text-sm font-medium">
                 New to the unit?{' '}
                 <button onClick={onRegister} className="text-primary font-black hover:underline transition-all">Request access here</button>
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
