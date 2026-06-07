import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calculator, ClipboardList, 
  BookOpen, Settings, Menu, LogOut, ShieldAlert, 
  History, Calendar, Users2, ShieldCheck
} from 'lucide-react';

import AIChatbot from './AIChatbot';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Simulated User Context
  const user = {
    name: 'Patrick Kamau',
    role: 'Staff Nurse', // Try 'Nursing In-Charge'
    verified: true
  };

  const handleLogout = () => {
    // In a real app, clear tokens/session here
    navigate('/');
  };

  const navItems = [
    { group: 'Clinical', items: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
      { name: 'Neonate Registry', icon: Users, path: '/neonates' },
      { name: 'Clinical Calculators', icon: Calculator, path: '/calculators' },
      { name: 'Shift Handovers', icon: ClipboardList, path: '/handovers' },
    ]},
    { 
      group: 'Unit Management', 
      roles: ['Nursing In-Charge', 'Consultant Pediatrician'],
      items: [
        { name: 'Duty Rota', icon: Calendar, path: '/rota' },
        { name: 'Staff Management', icon: Users2, path: '/staff' },
        { name: 'Verification Queue', icon: ShieldAlert, path: '/verify' },
        { name: 'Audit Records', icon: History, path: '/audit' },
      ]
    },
    { group: 'System', items: [
      { name: 'Clinical Academy', icon: BookOpen, path: '/academy' },
      { name: 'System Settings', icon: Settings, path: '/settings' },
    ]},
  ];

  return (
    <div className="min-h-screen flex bg-[#0f172a] overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-md transition-all"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#0f172a]/80 backdrop-blur-2xl border-r border-white/5 
        transform transition-transform duration-300 lg:translate-x-0 lg:static lg:block
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8">
          <Link to="/" className="flex items-center space-x-3 mb-1 group">
             <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                <ShieldCheck className="text-white" size={20} />
             </div>
             <h1 className="text-xl font-bold text-white tracking-tight">NeoDesk</h1>
          </Link>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Clinical Intelligence</p>
        </div>

        <nav className="mt-2 px-4 space-y-8 overflow-y-auto h-[calc(100vh-200px)] custom-scrollbar">
          {navItems
            .filter(group => !group.roles || group.roles.includes(user.role))
            .map((group) => (
            <div key={group.group} className="space-y-3">
               <h3 className="px-4 text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">{group.group}</h3>
               <div className="space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`
                        flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 group
                        ${location.pathname === item.path 
                          ? 'bg-emerald-500 text-[#0f172a] shadow-lg shadow-emerald-500/20' 
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'}
                      `}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <item.icon size={20} className={`${location.pathname === item.path ? 'text-[#0f172a]' : 'text-slate-500 group-hover:text-emerald-400'} transition-colors`} />
                      <span className="font-bold text-sm tracking-wide">{item.name}</span>
                    </Link>
                  ))}
               </div>
            </div>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-all w-full px-4 py-4 rounded-2xl font-bold text-sm border border-transparent hover:border-red-500/10"
          >
            <LogOut size={18} />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[#0f172a]">
        {/* Header */}
        <header className="h-20 bg-[#0f172a]/40 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 lg:px-10 z-30">
          <button 
            className="lg:hidden p-3 -ml-3 text-slate-100 hover:bg-white/5 rounded-xl transition-colors"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center space-x-6">
            <div className="text-right hidden sm:block">
              <div className="flex items-center justify-end space-x-2">
                 <p className="text-sm font-bold text-white">{user.name}</p>
                 {user.verified && (
                   <div className="bg-blue-500 rounded-full p-0.5 shadow-lg shadow-blue-500/20">
                      <ShieldCheck size={10} className="text-white" strokeWidth={3} />
                   </div>
                 )}
              </div>
              <p className="text-[10px] font-bold text-emerald-500/70 uppercase tracking-widest">{user.role}</p>
            </div>
            <div className="w-12 h-12 rounded-[1.2rem] bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-[#0f172a] font-bold shadow-xl cursor-pointer hover:scale-105 transition-all relative group">
              {user.name.split(' ').map(n => n[0]).join('')}
              <div className="absolute inset-0 bg-white/20 rounded-[1.2rem] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 lg:p-12 pb-32 lg:pb-12 scroll-smooth custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-[#0f172a]/80 backdrop-blur-2xl border-t border-white/5 flex items-center justify-around px-4 z-40">
          {navItems[0].items.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`
                flex flex-col items-center justify-center space-y-1.5 px-4 py-2 rounded-2xl transition-all
                ${location.pathname === item.path 
                  ? 'text-emerald-400 bg-emerald-500/10 shadow-lg shadow-emerald-500/5' 
                  : 'text-slate-500'}
              `}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{item.name.split(' ')[0]}</span>
            </Link>
          ))}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="flex flex-col items-center justify-center space-y-1.5 px-4 py-2 text-slate-500"
          >
            <Menu size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Menu</span>
          </button>
        </nav>
      </main>
      <AIChatbot />
    </div>
  );
};

export default Layout;
