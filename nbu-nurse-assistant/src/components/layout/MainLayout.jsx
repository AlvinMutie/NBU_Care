import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Menu, ShieldAlert, X, Info } from 'lucide-react';
import { api } from '../../services/api';

export default function MainLayout({ children, currentPath, onNavigate, user, onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [globalOverride, setGlobalOverride] = useState(false);
  const [wardNotice, setWardNotice] = useState('');

  useEffect(() => {
    const fetchGlobalState = async () => {
      try {
        const res = await api.getSettings();
        if (res.success) {
          setGlobalOverride(res.data.globalOverrideActive);
          setWardNotice(res.data.broadcastMessage);
        }
      } catch (err) {
        console.error('Failed to sync global state', err);
      }
    };
    fetchGlobalState();
    const interval = setInterval(fetchGlobalState, 30000); // Sync every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 font-sans selection:bg-primary selection:text-white overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm z-[150] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar 
        currentPath={currentPath} 
        onNavigate={onNavigate} 
        user={user}
        onLogout={onLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col min-w-0 h-screen relative overflow-hidden">
        {/* Global Override Banner */}
        {globalOverride && (
          <div className="bg-amber-500 text-white px-4 py-2 flex items-center justify-center gap-3 animate-in slide-in-from-top duration-500 z-[60] shadow-lg shrink-0">
             <ShieldAlert className="w-4 h-4 animate-pulse" />
             <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-center">Global Safety Override Active: Double Clinician Verification Required</span>
          </div>
        )}

        <Header user={user} onLogout={onLogout} />
        
        {/* Mobile Header (Surgical Fix: Ensure it doesn't overlap) */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-sm z-50 shrink-0">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 hover:text-primary transition-colors active:scale-95"
              >
                 <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <ShieldAlert className="w-4 h-4" />
                 </div>
                 <h1 className="text-sm font-black text-slate-900 dark:text-white tracking-tight">NeoDesk Unit</h1>
              </div>
           </div>
           {user && (
             <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-black text-xs shadow-lg shadow-primary/20 border border-white/20">
                {user.name[0]}
             </div>
           )}
        </div>

        <main className="flex-1 overflow-y-auto custom-scrollbar relative">
          {/* Subtle background glow for depth */}
          <div className="hidden lg:block absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -z-10" />
          
          <div className="w-full max-w-[1600px] mx-auto p-4 md:p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-32 lg:pb-12">
            
            {/* Ward Broadcast Message - Integrated inside main scroll for better mobile UX */}
            {wardNotice && currentPath === 'dashboard' && (
              <div className="mb-8 p-5 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-3xl flex items-start gap-4 animate-in fade-in slide-in-from-left-4 duration-700">
                 <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm shrink-0">
                    <Info className="w-5 h-5" />
                 </div>
                 <div className="text-left">
                    <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-0.5">Unit Priority Notice</p>
                    <p className="text-xs text-indigo-900 dark:text-indigo-200 font-bold leading-relaxed">{wardNotice}</p>
                 </div>
              </div>
            )}

            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
