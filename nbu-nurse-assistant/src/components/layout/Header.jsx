import React from 'react';
import { Search, Bell, Moon, Sun, ShieldAlert, Activity, Menu } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Header({ user }) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40 transition-all duration-500 shadow-sm dark:shadow-none">
      <div className="flex-1 max-w-xl hidden lg:block">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 dark:text-slate-500 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm placeholder-slate-400 dark:placeholder-slate-600 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all text-slate-900 dark:text-white shadow-tiny"
            placeholder="Find tools, help, or guidelines..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        {/* System Monitoring */}
        <div className="hidden md:flex items-center gap-6 px-6 border-x border-slate-100 dark:border-slate-800 h-10">
           <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">Network</span>
              <div className="flex items-center gap-1.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-xs font-black text-slate-700 dark:text-slate-300">Live Sync</span>
              </div>
           </div>
           <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">Encryption</span>
              <span className="text-xs font-black text-slate-700 dark:text-slate-300">v16.0 AES</span>
           </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 transition-all relative overflow-hidden group active:scale-95"
            title={isDarkMode ? "Light Mode" : "Dark Mode"}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-all relative overflow-hidden group active:scale-95">
            <Bell className="w-5 h-5" />
            <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>
        </div>
        
        <div className="h-8 w-px bg-slate-100 dark:bg-slate-800 hidden sm:block mx-1"></div>
        
        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="flex flex-col items-end text-right hidden sm:flex">
            <span className="text-sm font-black text-slate-900 dark:text-white leading-none tracking-tight">{user?.name?.split(' ')[0] || 'Member'}</span>
            <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mt-1 opacity-80">{user?.role || 'Clinician'}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary shadow-sm border border-primary/10 dark:border-primary/20 group-hover:scale-105 transition-transform">
             <Activity className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
