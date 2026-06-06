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
  Stethoscope,
  CalendarDays,
  Baby,
  ShieldAlert,
  X
} from 'lucide-react';

const SidebarLink = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
      active 
        ? 'bg-primary text-white shadow-lg shadow-primary/20 dark:shadow-none' 
        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
    }`}
  >
    <Icon className={`w-5 h-5 transition-colors ${active ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
    <span className={`flex-1 text-left text-sm font-black tracking-tight ${active ? 'text-white' : ''}`}>{label}</span>
    {!active && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-40 group-hover:translate-x-0.5 transition-all text-slate-400 dark:text-slate-600" />}
  </button>
);

export default function Sidebar({ currentPath, onNavigate, user, onLogout, isOpen, onClose }) {
  const isAdmin = user?.role === 'Nursing In-Charge' || user?.role === 'Consultant Pediatrician';
  const isStudent = user?.role === 'Student';
  const isITSupport = user?.role === 'ICT / IT Support';

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm z-[100] lg:hidden animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      <aside className={`fixed lg:sticky top-0 left-0 w-72 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-[110] transition-transform duration-300 ease-out overflow-hidden ${
        isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
      }`}>
      {/* Brand Profile */}
      <div className="p-8 pb-6 flex flex-col gap-6">
        <div className="flex items-center justify-between lg:justify-start gap-3">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { onNavigate('dashboard'); onClose(); }}>
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">Neo<span className="text-primary">Desk</span></h1>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 mt-1">Clinical Unit</p>
            </div>
          </div>
          {/* Mobile Close Button */}
          <button onClick={onClose} className="lg:hidden p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400">
             <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Quick Info */}
        <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100/50 dark:border-slate-700 shadow-sm">
           <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                {user?.profileImage ? (
                  <img 
                    src={`${import.meta.env.VITE_API_BASE_URL || ''}${user.profileImage}`} 
                    alt="profile" 
                    className="w-10 h-10 rounded-xl object-cover border-2 border-white dark:border-slate-700 shadow-sm"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-xs font-black text-primary border border-primary/20 uppercase">
                    {user?.name?.charAt(0) || 'M'}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-sm border border-slate-50 dark:border-slate-800">
                   <ShieldCheck className="w-2.5 h-2.5 text-primary" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-left">
                   <p className="text-sm font-black text-slate-900 dark:text-white truncate tracking-tight">{user?.name?.split(' ')[0] || 'Medical'}</p>
                </div>
                <div className="flex items-center gap-1.5 overflow-hidden text-left">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                   <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest truncate">{user?.role || 'Clinician'}</p>
                </div>
              </div>
           </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar pb-10 mt-2">
        <div className="px-4 py-2 text-left">
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] leading-none">Main Menu</p>
        </div>

        <SidebarLink 
          icon={LayoutDashboard} 
          label={isStudent ? 'Learning Hub' : 'Unit Dashboard'} 
          active={currentPath === 'dashboard'} 
          onClick={() => { onNavigate('dashboard'); onClose(); }} 
        />
        <SidebarLink 
          icon={Baby} 
          label="Neonate Registry" 
          active={currentPath === 'neonates'} 
          onClick={() => { onNavigate('neonates'); onClose(); }} 
        />

        {!isStudent && (
          <>
            <div className="px-4 pt-6 py-2 text-left">
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] leading-none">Nursing Tools</p>
            </div>
            <SidebarLink icon={CalendarDays} label="Duty Rota" active={currentPath === 'rota'} onClick={() => { onNavigate('rota'); onClose(); }} />
            <SidebarLink icon={FileText} label="Shift Handovers" active={currentPath === 'handovers'} onClick={() => { onNavigate('handovers'); onClose(); }} />
            <SidebarLink icon={Calculator} label="Drug Pipeline" active={currentPath === 'calculators'} onClick={() => { onNavigate('calculators'); onClose(); }} />
            <SidebarLink icon={BookOpen} label="Knowledge Hub" active={currentPath === 'knowledge'} onClick={() => { onNavigate('knowledge'); onClose(); }} />
            <SidebarLink icon={ShieldAlert} label="Procedure Library" active={currentPath === 'flashcards'} onClick={() => { onNavigate('flashcards'); onClose(); }} />
          </>
        )}

        {isStudent && (
          <>
            <div className="px-4 pt-6 py-2 text-left">
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] leading-none">Learning Tools</p>
            </div>
            <SidebarLink icon={Calculator} label="Practice Calculators" active={currentPath === 'calculators'} onClick={() => { onNavigate('calculators'); onClose(); }} />
            <SidebarLink icon={BookOpen} label="Study Cards" active={currentPath === 'flashcards'} onClick={() => { onNavigate('flashcards'); onClose(); }} />
            <SidebarLink icon={HelpCircle} label="Patient Scenarios" active={currentPath === 'scenarios'} onClick={() => { onNavigate('scenarios'); onClose(); }} />
          </>
        )}

        {(isAdmin || isITSupport) && (
          <>
             <div className="px-4 pt-6 py-2 text-left">
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] leading-none">Unit Management</p>
            </div>
            <SidebarLink icon={ShieldCheck} label="Staff Verification" active={currentPath === 'verification-queue'} onClick={() => { onNavigate('verification-queue'); onClose(); }} />
            <SidebarLink icon={Users} label="Team Members" active={currentPath === 'manage-staff'} onClick={() => { onNavigate('manage-staff'); onClose(); }} />
            <SidebarLink icon={FileText} label="Shift Records" active={currentPath === 'audit-logs'} onClick={() => { onNavigate('audit-logs'); onClose(); }} />
          </>
        )}

        <div className="px-4 pt-6 py-2 text-left">
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] leading-none">System</p>
        </div>
        <SidebarLink icon={Settings} label="My Settings" active={currentPath === 'settings'} onClick={() => { onNavigate('settings'); onClose(); }} />
      </nav>

      <div className="p-4 mt-auto">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all font-black text-xs uppercase tracking-widest group shadow-sm active:scale-95"
        >
          <LogOut className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-rose-500 transition-colors" />
          <span>Sign Out</span>
        </button>
        <div className="mt-4 px-4 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-[24px] text-left">
           <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <p className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Safe & Secure</p>
           </div>
           <p className="text-[9px] text-slate-400 dark:text-slate-600 font-bold italic">Better care together</p>
        </div>
      </div>
      </aside>
    </>
  );
}
