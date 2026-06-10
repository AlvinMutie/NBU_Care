import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, ChevronLeft } from 'lucide-react';
import api from '../services/api';
import logo from '../assets/logo.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Email and access key are required.');
      return;
    }
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('auth_token', response.data.data.access_token);
        localStorage.setItem('user_data', JSON.stringify(response.data.data.user));
        navigate('/dashboard');
      } else {
        setError(response.data.message || 'Login failed.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Connection failed. Please verify the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-6 relative overflow-hidden font-sans text-[var(--text-main)]">
      {/* Structural Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2.5rem] p-10 sm:p-14 shadow-2xl space-y-12 animate-in fade-in zoom-in-95 duration-700">
          
          <div className="flex justify-between items-start">
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors group"
            >
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="text-center space-y-3">
            <Link to="/" className="inline-flex items-center space-x-2.5 mb-4 group">
              <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform overflow-hidden border-4 border-emerald-50">
                <img src={logo} alt="NeoDesk Logo" className="w-full h-full object-cover scale-[1.75]" />
              </div>
            </Link>
            <h1 className="text-4xl font-black tracking-tighter">Welcome back.</h1>
            <p className="text-slate-500 font-medium tracking-tight">Clinical Intelligence Portal v16.0</p>
          </div>

          <form className="space-y-8" onSubmit={handleLogin}>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">Institutional Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 transition-colors" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@hospital.go.ke"
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl py-4 pl-12 pr-4 text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between px-1">
                   <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Access Key</label>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-600 transition-colors" size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] rounded-2xl py-4 pl-12 pr-4 text-[var(--text-main)] focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium placeholder:text-slate-300 font-mono"
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="text-rose-500 text-xs font-bold text-center mt-2">{error}</p>
            )}

            <button type="submit" disabled={loading} className="w-full bg-slate-900 dark:bg-emerald-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 group hover:bg-black dark:hover:bg-emerald-700 transition-all shadow-xl shadow-slate-200 dark:shadow-none active:scale-95 disabled:opacity-50">
              <span>{loading ? 'Authenticating...' : 'Authenticate Session'}</span>
              {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="pt-8 border-t border-[var(--border-main)] flex flex-col space-y-6">
             <p className="text-xs text-center text-slate-400 font-medium">
               New to the neonatal unit? <Link to="/register" className="text-emerald-600 font-black hover:text-emerald-700 ml-1 underline decoration-emerald-200 underline-offset-4">Join Clinical Registry</Link>
             </p>
          </div>
        </div>
        
        <p className="mt-12 text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] leading-relaxed max-w-xs mx-auto opacity-60">
          Secured by institutional SSO. <br />
          Validated Clinical Access only.
        </p>
      </div>
    </div>
  );
};

export default Login;
