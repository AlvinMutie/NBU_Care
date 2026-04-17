import React from 'react';
import { Search, Bell, Moon, Sun, ShieldAlert, Activity } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Header({ user }) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40 transition-shadow">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all text-slate-900 shadow-tiny"
            placeholder="Find tools, help, or guidelines..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* System Monitoring */}
        <div className="hidden lg:flex items-center gap-6 px-6 border-x border-slate-100 h-10">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System</span>
              <div className="flex items-center gap-1.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-xs font-bold text-slate-700">Everything is OK</span>
              </div>
           </div>
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Today's Shift</span>
              <span className="text-xs font-bold text-slate-700">07:00 - 19:00</span>
           </div>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-primary hover:bg-slate-50 transition-all relative overflow-hidden group"
            title={isDarkMode ? "Light Mode" : "Dark Mode"}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all relative overflow-hidden group">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
        
        <div className="h-8 w-px bg-slate-100 hidden sm:block mx-1"></div>
        
        <div className="flex items-center gap-3 pl-2">
          <div className="flex flex-col items-end text-right">
            <span className="text-sm font-bold text-slate-900 leading-none">{user?.name || 'Team Member'}</span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1 opacity-80">{user?.role || 'Clinician'}</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shadow-sm border border-primary/20">
             <Activity className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
