import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calculator, ClipboardList, 
  BookOpen, Settings, Menu, LogOut, ShieldAlert, 
  History, Calendar, Users2, ShieldCheck, ChevronRight,
  Sun, Moon
} from 'lucide-react';
import { useTheme } from '../services/ThemeContext';

import AIChatbot from './AIChatbot';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // Simulated User Context
  const user = {
    name: localStorage.getItem('user_name') || 'Patrick Kamau',
    role: localStorage.getItem('user_role') || 'Staff Nurse',
    verified: true
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_role');
    navigate('/');
  };

  const navItems = [
    { group: 'Clinical Orchestration', items: [
      { name: 'Ward Overview', icon: LayoutDashboard, path: '/dashboard' },
      { name: 'Patient Registry', icon: Users, path: '/neonates' },
      { name: 'Medication Pipeline', icon: Calculator, path: '/calculators' },
      { name: 'Shift Handovers', icon: ClipboardList, path: '/handovers' },
    ]},
    { 
      group: 'Institutional Governance', 
      roles: ['Nursing In-Charge', 'Consultant Pediatrician'],
      items: [
        { name: 'Workforce Rota', icon: Calendar, path: '/rota' },
        { name: 'Clinician Directory', icon: Users2, path: '/staff' },
        { name: 'Vetting Queue', icon: ShieldAlert, path: '/verify' },
        { name: 'Compliance Ledger', icon: History, path: '/audit' },
      ]
    },
    { group: 'Platform', items: [
      { name: 'Clinical Academy', icon: BookOpen, path: '/academy' },
      { name: 'System Settings', icon: Settings, path: '/settings' },
    ]},
  ];

  return (
    <div className="min-h-screen flex bg-[var(--bg-main)] text-[var(--text-main)] overflow-hidden font-sans transition-colors duration-300">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-[60] lg:hidden backdrop-blur-md transition-all"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Premium Management Style */}
      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-72 bg-[var(--bg-sidebar)] border-r border-[var(--border-main)] 
        transform transition-all duration-500 ease-[0.22,1,0.36,1] lg:translate-x-0 lg:static lg:block
        ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
           {/* Sidebar Brand */}
           <div className="p-8 pb-10">
             <Link to="/" className="flex items-center space-x-3 group text-[var(--text-main)]">
                <div className="w-10 h-10 bg-emerald-600 rounded-[0.9rem] flex items-center justify-center shadow-lg shadow-emerald-100 group-hover:scale-110 transition-transform duration-500">
                   <ShieldCheck className="text-white" size={22} strokeWidth={2.5} />
                </div>
                <div className="space-y-0.5">
                   <h1 className="text-xl font-black tracking-tighter leading-none">NeoDesk</h1>
                   <p className="text-[10px] text-emerald-600 font-black uppercase tracking-[0.2em]">Institutional Core</p>
                </div>
             </Link>
           </div>

           {/* Navigation Sections */}
           <nav className="flex-1 px-4 space-y-10 overflow-y-auto no-scrollbar pb-10">
             {navItems
               .filter(group => !group.roles || group.roles.includes(user.role))
               .map((group) => (
               <div key={group.group} className="space-y-3">
                  <h3 className="px-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">{group.group}</h3>
                  <div className="space-y-1">
                     {group.items.map((item) => (
                       <Link
                         key={item.name}
                         to={item.path}
                         className={`
                           flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all duration-500 group
                           ${location.pathname === item.path 
                             ? 'bg-slate-900 text-white shadow-xl scale-[1.02] dark:bg-emerald-600 dark:shadow-emerald-900/20' 
                             : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'}
                         `}
                         onClick={() => setIsSidebarOpen(false)}
                       >
                         <div className="flex items-center space-x-4">
                            <item.icon size={18} strokeWidth={location.pathname === item.path ? 2.5 : 2} className={`${location.pathname === item.path ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-500'} transition-colors`} />
                            <span className="font-bold text-[13px] tracking-tight">{item.name}</span>
                         </div>
                         {location.pathname === item.path && <ChevronRight size={14} className="text-emerald-400" />}
                       </Link>
                     ))}
                  </div>
               </div>
             ))}
           </nav>

           {/* Sidebar Footer */}
           <div className="p-6 border-t border-[var(--border-main)] space-y-2">
             <button 
               onClick={toggleTheme}
               className="flex items-center space-x-4 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all w-full px-5 py-3 rounded-2xl font-bold text-sm"
             >
               {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
               <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
             </button>
             <button 
               onClick={handleLogout}
               className="flex items-center space-x-4 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-all w-full px-5 py-3 rounded-2xl font-bold text-sm group"
             >
               <LogOut size={18} className="group-hover:rotate-180 transition-transform duration-500" />
               <span>Logout</span>
             </button>
           </div>
        </div>
      </aside>

      {/* Main Framework Viewport */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Institutional Header */}
        <header className="h-20 bg-[var(--bg-header)]/80 backdrop-blur-xl border-b border-[var(--border-main)] flex items-center justify-between px-6 lg:px-12 z-50 transition-colors duration-300 relative">
          <button 
            className="lg:hidden p-3 -ml-3 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Toggle Navigation"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center space-x-8">
            {/* Theme Toggle in Header for mobile/desktop quick access */}
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[var(--border-main)] text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <div className="hidden md:flex flex-col text-right">
              <div className="flex items-center justify-end space-x-2">
                 <p className="text-sm font-black tracking-tight">{user.name}</p>
                 {user.verified && (
                   <div className="bg-blue-500 rounded-full p-0.5 shadow-md shadow-blue-100" title="Institutionally Verified">
                      <ShieldCheck size={10} className="text-white" strokeWidth={3} />
                   </div>
                 )}
              </div>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mt-1">{user.role}</p>
            </div>
            
            <div className="relative group cursor-pointer">
               <div className="w-12 h-12 rounded-[1.1rem] bg-slate-900 dark:bg-emerald-600 flex items-center justify-center text-white font-black text-xs shadow-xl transition-all group-hover:scale-105 active:scale-95 overflow-hidden">
                  {user.name.split(' ').map(n => n[0]).join('')}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
               </div>
               {user.verified && (
                 <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full border-4 border-white dark:border-slate-900 p-0.5 shadow-sm">
                    <ShieldCheck size={8} className="text-white" strokeWidth={4} />
                 </div>
               )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content Scroll View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 pb-32 lg:pb-14 scroll-smooth custom-scrollbar bg-[var(--bg-main)] transition-colors duration-300">
          <div className="max-w-[1440px] mx-auto">
            <Outlet />
          </div>
        </div>

        {/* Mobile Functional Quick-Nav */}
        <nav className="lg:hidden fixed bottom-6 left-6 right-6 h-20 bg-[var(--bg-header)] border border-[var(--border-main)] rounded-[1.8rem] flex items-center justify-around px-4 z-[50] shadow-2xl shadow-slate-200 transition-colors duration-300">
          {navItems[0].items.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`
                flex flex-col items-center justify-center space-y-1 px-4 py-2 rounded-2xl transition-all
                ${location.pathname === item.path 
                  ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 shadow-inner' 
                  : 'text-slate-300 dark:text-slate-600'}
              `}
            >
              <item.icon size={20} strokeWidth={location.pathname === item.path ? 3 : 2} />
              <span className="text-[9px] font-black uppercase tracking-widest">{item.name.split(' ')[0]}</span>
            </Link>
          ))}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex flex-col items-center justify-center space-y-1 px-4 py-2 text-slate-300 dark:text-slate-600"
          >
            <Menu size={20} />
            <span className="text-[9px] font-black uppercase tracking-widest">Portal</span>
          </button>
        </nav>
      </main>
      
      {/* Floating Support Assistant */}
      <AIChatbot />
    </div>
  );
};

export default Layout;
