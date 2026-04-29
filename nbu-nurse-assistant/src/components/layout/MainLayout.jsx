import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Menu } from 'lucide-react';

export default function MainLayout({ children, currentPath, onNavigate, user, onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface dark:bg-dark-bg transition-colors duration-500 font-sans selection:bg-primary selection:text-white">
      <Sidebar 
        currentPath={currentPath} 
        onNavigate={onNavigate} 
        user={user}
        onLogout={onLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header user={user} onLogout={onLogout} />
        
        {/* Mobile Header Toggle */}
        <div className="lg:hidden flex items-center p-4 bg-white border-b border-slate-100 shadow-sm">
           <button 
             onClick={() => setIsSidebarOpen(true)}
             className="p-2 bg-slate-50 rounded-xl text-slate-500 hover:text-primary transition-colors"
           >
              <Menu className="w-6 h-6" />
           </button>
           <div className="ml-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                 <Menu className="w-4 h-4" />
              </div>
              <h1 className="text-sm font-black text-slate-900 tracking-tight">NeoDesk Unit</h1>
           </div>
        </div>

        <main className="flex-1 p-4 lg:p-12 overflow-y-auto custom-scrollbar relative">
          {/* Subtle background glow for depth - hidden on mobile for performance */}
          <div className="hidden lg:block absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -z-10" />
          
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
