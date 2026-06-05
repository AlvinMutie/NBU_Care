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
  Baby
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

export default function Sidebar({ currentPath, onNavigate, user, onLogout, isOpen, onClose }) {
  const isAdmin = user?.role === 'Nursing In-Charge' || user?.role === 'Consultant Pediatrician';
  const isStudent = user?.role === 'Student';
  const isITSupport = user?.role === 'ICT / IT Support';

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      <aside className={`fixed lg:sticky top-0 left-0 w-72 h-screen bg-white border-r border-slate-200 flex flex-col z-[70] transition-transform duration-300 ease-out overflow-hidden ${
        isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
      }`}>
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
        <div className="p-4 rounded-3xl bg-slate-50 border border-slate-100/50 shadow-sm">
           <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                {user?.profileImage ? (
                  <img 
                    src={`${import.meta.env.VITE_API_BASE_URL || ''}${user.profileImage}`} 
                    alt="profile" 
                    className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-xs font-black text-primary border border-primary/20 uppercase">
                    {user?.name?.charAt(0) || 'M'}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-50">
                   <ShieldCheck className="w-2.5 h-2.5 text-primary" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                   <p className="text-sm font-black text-slate-900 truncate tracking-tight">{user?.name?.split(' ')[0] || 'Medical'}</p>
                </div>
                <div className="flex items-center gap-1.5 overflow-hidden">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">{user?.role || 'Clinician'}</p>
                </div>
              </div>
           </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar pb-10 mt-2">
        <div className="px-4 py-2">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">Main Menu</p>
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
            <div className="px-4 pt-6 py-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">Nursing Tools</p>
            </div>
            <SidebarLink icon={CalendarDays} label="Duty Rota" active={currentPath === 'rota'} onClick={() => { onNavigate('rota'); onClose(); }} />
            <SidebarLink icon={FileText} label="Shift Handovers" active={currentPath === 'handovers'} onClick={() => { onNavigate('handovers'); onClose(); }} />
            <SidebarLink icon={Calculator} label="Drug Pipeline" active={currentPath === 'calculators'} onClick={() => { onNavigate('calculators'); onClose(); }} />
            <SidebarLink icon={BookOpen} label="Knowledge Hub" active={currentPath === 'knowledge'} onClick={() => { onNavigate('knowledge'); onClose(); }} />
            <SidebarLink icon={BookOpen} label="Procedure Library" active={currentPath === 'flashcards'} onClick={() => { onNavigate('flashcards'); onClose(); }} />
          </>
        )}

        {isStudent && (
          <>
            <div className="px-4 pt-6 py-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">Learning Tools</p>
            </div>
            <SidebarLink icon={Calculator} label="Practice Calculators" active={currentPath === 'calculators'} onClick={() => { onNavigate('calculators'); onClose(); }} />
            <SidebarLink icon={BookOpen} label="Study Cards" active={currentPath === 'flashcards'} onClick={() => { onNavigate('flashcards'); onClose(); }} />
            <SidebarLink icon={HelpCircle} label="Patient Scenarios" active={currentPath === 'scenarios'} onClick={() => { onNavigate('scenarios'); onClose(); }} />
          </>
        )}

        {(isAdmin || isITSupport) && (
          <>
             <div className="px-4 pt-6 py-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">Unit Management</p>
            </div>
            <SidebarLink icon={ShieldCheck} label="Staff Verification" active={currentPath === 'verification-queue'} onClick={() => { onNavigate('verification-queue'); onClose(); }} />
            <SidebarLink icon={Users} label="Team Members" active={currentPath === 'manage-staff'} onClick={() => { onNavigate('manage-staff'); onClose(); }} />
            <SidebarLink icon={FileText} label="Shift Records" active={currentPath === 'audit-logs'} onClick={() => { onNavigate('audit-logs'); onClose(); }} />
          </>
        )}

        <div className="px-4 pt-6 py-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">System</p>
        </div>
        <SidebarLink icon={Settings} label="My Settings" active={currentPath === 'settings'} onClick={() => { onNavigate('settings'); onClose(); }} />
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
    </>
  );
}
