import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-brand-slate flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[100px] rounded-full" />

      <div className="w-full max-w-md relative z-10">
        <div className="glass-card p-8 sm:p-12 space-y-8 animate-in fade-in zoom-in-95 duration-700">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-6">
              <ShieldCheck className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-slate-100 tracking-tight">NeoDesk</h1>
            <p className="text-slate-400 text-sm font-medium">Clinical Intelligence Portal v16.0</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Institutional Email</label>
                <input 
                  type="email" 
                  placeholder="name@hospital.go.ke"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-600"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between px-1">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                   <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest hover:text-emerald-400 transition-colors">
                      {showPassword ? 'Hide' : 'Show'}
                   </button>
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-600 font-mono"
                />
              </div>
            </div>

            <Link to="/dashboard" className="block w-full">
              <button type="button" className="w-full glass-button py-4 font-bold shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-transform">
                Authenticate Session
              </button>
            </Link>
          </form>

          <div className="pt-6 border-t border-white/5 flex flex-col space-y-4">
             <p className="text-xs text-center text-slate-500">
               New to the unit? <Link to="/register" className="text-emerald-400 font-bold hover:text-emerald-300 ml-1">Request Access</Link>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
