import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout({ children, currentPath, onNavigate, user, onLogout }) {
  return (
    <div className="flex min-h-screen bg-surface dark:bg-dark-bg transition-colors duration-500 font-sans selection:bg-primary selection:text-white">
      <Sidebar 
        currentPath={currentPath} 
        onNavigate={onNavigate} 
        user={user}
        onLogout={onLogout}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header user={user} onLogout={onLogout} />
        <main className="flex-1 p-12 overflow-y-auto custom-scrollbar relative">
          {/* Subtle background glow for depth */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -z-10" />
          
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
