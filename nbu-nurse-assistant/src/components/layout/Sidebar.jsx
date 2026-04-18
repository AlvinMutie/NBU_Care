import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calculator, 
  HelpCircle, 
  Users, 
  FileText, 
  ShieldCheck, 
  Settings,
  Activity,
  ChevronRight,
  LogOut,
  Stethoscope
} from 'lucide-react';

const SidebarLink = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative ${
      active 
        ? 'bg-primary/5 text-primary' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    {active && (
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full shadow-sm"></div>
    )}
    <Icon className={`w-5 h-5 transition-colors ${active ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'}`} />
    <span className={`flex-1 text-left text-sm font-semibold tracking-tight ${active ? 'text-primary' : ''}`}>{label}</span>
    {!active && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-40 group-hover:translate-x-0.5 transition-all text-slate-400" />}
  </button>
);

export default function Sidebar({ currentPath, onNavigate, user, onLogout }) {
  const isAdmin = user?.role === 'Nursing In-Charge' || user?.role === 'Consultant Pediatrician';
  const isStudent = user?.role === 'Student';
  const isITSupport = user?.role === 'ICT / IT Support';

  return (
    <aside className="w-72 h-screen bg-white border-r border-slate-200 flex flex-col sticky top-0 z-50 overflow-hidden">
      {/* Brand Profile */}
      <div className="p-8 pb-6 flex flex-col gap-6">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('dashboard')}>
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-none">Neo<span className="text-primary">Desk</span></h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Better Care Together</p>
          </div>
        </div>

        {/* User Quick Info */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/20 uppercase">
                {user?.name?.charAt(0) || 'M'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{user?.name || 'Medical Staff'}</p>
                <div className="flex items-center gap-1.5 overflow-hidden">
                   <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider truncate">{user?.role || 'Clinician'}</p>
                </div>
              </div>
           </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar pb-10 mt-2">
        <div className="px-4 py-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Main Menu</p>
        </div>

        <SidebarLink 
          icon={LayoutDashboard} 
          label={isStudent ? 'Learning Hub' : 'Unit Dashboard'} 
          active={currentPath === 'dashboard'} 
          onClick={() => onNavigate('dashboard')} 
        />

        {!isStudent && (
          <>
            <div className="px-4 pt-6 py-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Nursing Tools</p>
            </div>
            <SidebarLink icon={Calculator} label="Treatment Calculators" active={currentPath === 'calculators'} onClick={() => onNavigate('calculators')} />
            <SidebarLink icon={BookOpen} label="Procedure Library" active={currentPath === 'flashcards'} onClick={() => onNavigate('flashcards')} />
          </>
        )}

        {isStudent && (
          <>
            <div className="px-4 pt-6 py-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Learning Tools</p>
            </div>
            <SidebarLink icon={Calculator} label="Practice Calculators" active={currentPath === 'calculators'} onClick={() => onNavigate('calculators')} />
            <SidebarLink icon={BookOpen} label="Study Cards" active={currentPath === 'flashcards'} onClick={() => onNavigate('flashcards')} />
            <SidebarLink icon={HelpCircle} label="Patient Scenarios" active={currentPath === 'scenarios'} onClick={() => onNavigate('scenarios')} />
          </>
        )}

        {(isAdmin || isITSupport) && (
          <>
             <div className="px-4 pt-6 py-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Unit Management</p>
            </div>
            <SidebarLink icon={Users} label="Team Members" active={currentPath === 'manage-staff'} onClick={() => onNavigate('manage-staff')} />
            <SidebarLink icon={FileText} label="Shift Records" active={currentPath === 'audit-logs'} onClick={() => onNavigate('audit-logs')} />
          </>
        )}

        <div className="px-4 pt-6 py-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">System</p>
        </div>
        <SidebarLink icon={Settings} label="My Settings" active={currentPath === 'settings'} onClick={() => onNavigate('settings')} />
      </nav>

      <div className="p-4 mt-auto">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-all font-semibold text-sm group shadow-sm hover:shadow-md"
        >
          <LogOut className="w-5 h-5 text-slate-400 group-hover:text-rose-500 transition-colors" />
          <span>Sign Out</span>
        </button>
        <div className="mt-4 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl">
           <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Safe & Secure</p>
           </div>
           <p className="text-[9px] text-slate-400 font-medium italic">Better care together</p>
        </div>
      </div>
    </aside>
  );
}
