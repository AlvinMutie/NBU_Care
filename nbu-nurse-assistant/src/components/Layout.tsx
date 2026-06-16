import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calculator, ClipboardList, 
  BookOpen, Settings as SettingsIcon, Menu, LogOut, ShieldAlert, 
  Bell, ShieldCheck, X, ChevronRight, UserCheck, CalendarDays, Users2,
  Moon, Sun
} from 'lucide-react';
import { useTheme } from '../services/ThemeContext';
import logo from '../assets/logo.png';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Robust user data retrieval
  const getUserData = () => {
    const stored = localStorage.getItem('user_data');
    if (stored) return JSON.parse(stored);
    
    // Fallback for legacy sessions
    return {
      name: localStorage.getItem('user_name') || 'Clinician',
      role: localStorage.getItem('user_role') || 'Staff',
      email: ''
    };
  };

  const user = getUserData();

  const isStudent = user.role === 'Student';
  const isSystemAdmin = user.email === 'admin@neodesk.org' || user.name === 'System Admin';
  const isAdmin = user.role === 'Nursing In-Charge' || isSystemAdmin;

  const navItems = [
    { name: 'Command Center', icon: LayoutDashboard, path: '/dashboard' },
    ...(!isStudent ? [{ name: 'Neonate Registry', icon: Users, path: '/neonates' }] : []),
    { name: 'Clinical Academy', icon: BookOpen, path: '/academy' },
    { name: 'Medication Pipeline', icon: Calculator, path: '/calculators' },
    { name: 'Handovers', icon: ClipboardList, path: '/handovers' },
    { name: 'Settings', icon: SettingsIcon, path: '/settings' },
  ];

  const adminItems = [
    { name: 'Staff Management', icon: UserCheck, path: '/staff' },
    ...(isSystemAdmin ? [{ name: 'System Audit', icon: ShieldAlert, path: '/audit' }] : []),
    { name: 'Institutional Vetting', icon: Users2, path: '/verify' },
    { name: 'Workforce Rota', icon: CalendarDays, path: '/rota' },
    { name: 'Academy Analytics', icon: ShieldCheck, path: '/academy-analytics' },
  ];

  const isManagement = user.role === 'Nursing In-Charge' || user.role === 'Consultant Pediatrician' || isSystemAdmin;

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-[var(--bg-main)] text-[var(--text-main)] overflow-hidden font-sans selection:bg-emerald-500/10">
      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[var(--bg-sidebar)] border-r border-[var(--border-main)] 
        transform transition-transform duration-500 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col p-8">
          <div className="flex items-center justify-between mb-12">
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 overflow-hidden border border-emerald-50">
                <img src={logo} alt="NeoDesk Logo" className="w-full h-full object-cover scale-125" />
              </div>
              <span className="text-xl font-black tracking-tighter">NeoDesk<span className="text-emerald-600">.</span></span>
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white">
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-4">Clinical Core</p>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all group
                  ${location.pathname === item.path 
                    ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-xl shadow-slate-200 dark:shadow-none' 
                    : 'text-slate-400 hover:bg-[var(--card-bg)] hover:text-[var(--text-main)]'}
                `}
              >
                <div className="flex items-center space-x-4">
                  <item.icon size={18} className={`${location.pathname === item.path ? 'text-emerald-400' : 'text-slate-300 group-hover:text-slate-500'}`} />
                  <span className="font-bold text-sm tracking-tight">{item.name}</span>
                </div>
                {location.pathname === item.path && <ChevronRight size={14} className="opacity-50" />}
              </Link>
            ))}

            {isManagement && (
              <>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-10 mb-4 px-4">Institutional</p>
                {adminItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all group
                      ${location.pathname === item.path 
                        ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-xl shadow-slate-200 dark:shadow-none' 
                        : 'text-slate-400 hover:bg-[var(--card-bg)] hover:text-[var(--text-main)]'}
                    `}
                  >
                    <div className="flex items-center space-x-4">
                      <item.icon size={18} className={`${location.pathname === item.path ? 'text-emerald-400' : 'text-slate-300 group-hover:text-slate-500'}`} />
                      <span className="font-bold text-sm tracking-tight">{item.name}</span>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </nav>

          <div className="mt-auto pt-8 border-t border-[var(--border-main)]">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center space-x-4 px-4 py-4 rounded-2xl text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-900/10 hover:text-rose-600 transition-all font-bold text-sm"
            >
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Institutional Header */}
        <header className="h-20 bg-[var(--bg-header)]/80 backdrop-blur-xl border-b border-[var(--border-main)] flex items-center justify-between px-6 lg:px-12 z-50 transition-colors duration-300 relative shrink-0">
          <button 
            className="lg:hidden p-3 -ml-3 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Toggle Navigation"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center space-x-3 sm:space-x-8">
             {/* Theme Toggle */}
             <button 
               onClick={toggleTheme}
               className="p-2.5 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl text-slate-400 hover:text-emerald-500 transition-all group"
               title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
             >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
             </button>

             <button className="relative p-2.5 bg-[var(--bg-main)] border border-[var(--border-main)] rounded-xl text-slate-400 hover:text-[var(--text-main)] transition-all group">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[var(--bg-header)] group-hover:scale-110 transition-transform" />
             </button>
             <button className="flex items-center space-x-3 pl-3 sm:pl-4 border-l border-[var(--border-main)] group">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-[var(--border-main)] flex items-center justify-center text-xs font-black text-slate-500 shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                   {user?.name?.split(' ').map((n:any) => n[0]).join('') || 'CU'}
                </div>
                <div className="hidden sm:flex flex-col text-right bg-emerald-50/50 dark:bg-emerald-900/10 px-4 py-1.5 rounded-xl border border-emerald-100/50 dark:border-emerald-800/30">
                   <p className="text-base font-black text-[var(--text-main)] tracking-tight leading-none">{user?.name || 'Clinician'}</p>
                   <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mt-1">{user?.role || 'Staff'}</p>
                </div>
             </button>
          </div>
        </header>

        {/* Scrollable Viewport - Fixed nested scrollbar conflict */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
           <div className="p-6 lg:p-12 max-w-7xl mx-auto">
              <Outlet />
           </div>
        </div>
        
        {/* Secondary Validation Portal (Floating) */}
        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/10 p-2 rounded-[2rem] shadow-2xl flex items-center space-x-1 z-[60] lg:hidden">
          <Link to="/dashboard" className={`p-4 rounded-[1.5rem] transition-all ${location.pathname === '/dashboard' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>
            <LayoutDashboard size={20} />
          </Link>
          <Link to="/neonates" className={`p-4 rounded-[1.5rem] transition-all ${location.pathname === '/neonates' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>
            <Users size={20} />
          </Link>
          <Link to="/calculators" className={`p-4 rounded-[1.5rem] transition-all ${location.pathname === '/calculators' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>
            <Calculator size={20} />
          </Link>
          <div className="w-px h-6 bg-white/10 mx-2" />
          <Link to="/settings" className="bg-white/5 p-3 pr-6 rounded-[1.5rem] flex items-center space-x-3 text-white/50 hover:text-white transition-all">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold">
               {user?.name?.split(' ').map((n:any) => n[0]).join('') || 'CU'}
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest">Portal</span>
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default Layout;
