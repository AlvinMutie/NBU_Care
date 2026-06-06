import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
  ShieldCheck, LayoutDashboard, Users, 
  ShieldAlert, FileCode, Bell, Search, 
  Menu, X, Moon, Sun, ChevronRight,
  LogOut, User, Settings, Baby, Calculator, Calendar, BookOpen, Activity, BarChart2
} from 'lucide-react';

export default function AppLayout({ children, activeTab, setActiveTab }) {
    const { auth, allUsers = [] } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Sidebar navigation based on user role and system features
    const mainNavigation = [
        { id: 'overview', name: 'Overview', icon: BarChart2, role: 'All' },
        { id: 'registry', name: 'Ward Registry', icon: Baby, role: 'All' },
        { id: 'calculator', name: 'Calculators', icon: Calculator, role: 'All' },
        { id: 'rota', name: 'Shift Planner', icon: Calendar, role: 'All' },
        { id: 'academics', name: 'Academics', icon: BookOpen, role: 'All' },
    ];

    const adminNavigation = [
        { id: 'admin', name: 'Admin Portal', icon: ShieldCheck, role: ['Hospital Management', 'Nursing In-Charge', 'ICT / IT Support', 'Admin', 'System Admin'] },
    ];

    const isAuthorized = (roles) => {
        if (roles === 'All') return true;
        return roles.includes(auth.user.role);
    };

    return (
        <div className={`min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'bg-[#0f172a] text-white' : 'bg-[#F8F9FA] text-slate-800'}`}>
            
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0c1220] text-slate-400 border-r border-slate-800/50 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 shadow-2xl`}>
                <div className="flex flex-col h-full">
                    {/* Brand Logo */}
                    <div className="p-8 border-b border-slate-800/40">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-white font-black tracking-tighter text-lg leading-none">NBU Care</h1>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Management Suite</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-6 space-y-8 overflow-y-auto">
                        <div className="space-y-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 block px-2">Medical Suite</span>
                            <div className="space-y-2">
                                {mainNavigation.filter(item => isAuthorized(item.role)).map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all group ${
                                            activeTab === item.id
                                                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20'
                                                : 'hover:bg-slate-800/50 hover:text-white'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="w-4 h-4" />
                                            {item.name}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Admin Section if authorized */}
                        {adminNavigation.some(item => isAuthorized(item.role)) && (
                            <div className="space-y-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 block px-2">Administration</span>
                                <div className="space-y-2">
                                    {adminNavigation.filter(item => isAuthorized(item.role)).map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all group ${
                                                activeTab === item.id
                                                    ? 'bg-rose-600 text-white shadow-xl shadow-rose-600/20'
                                                    : 'hover:bg-slate-800/50 hover:text-white'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon className="w-4 h-4" />
                                                {item.name}
                                            </div>
                                            {allUsers.filter(u => u.status === 'Pending').length > 0 && (
                                                <span className="bg-amber-500 text-white text-[9px] font-black px-2 py-0.5 rounded-lg animate-pulse">
                                                    {allUsers.filter(u => u.status === 'Pending').length}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 block px-2">Settings</span>
                            <div className="space-y-2">
                                <Link 
                                    href={route('logout')} 
                                    method="post" 
                                    as="button"
                                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all hover:bg-rose-500/20 hover:text-rose-400"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </Link>
                            </div>
                        </div>
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-6 border-t border-slate-800/40">
                        <div className="flex items-center gap-3 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/50">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-black text-indigo-400">
                                {auth.user.name ? auth.user.name[0].toUpperCase() : 'U'}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-white text-xs font-black truncate">{auth.user.name || 'User'}</p>
                                <p className="text-[10px] font-bold text-slate-500 truncate uppercase">{auth.user.role || 'No Role'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-72' : 'ml-0'}`}>
                
                {/* Navbar */}
                <header className={`sticky top-0 z-40 h-20 flex items-center justify-between px-8 border-b transition-colors duration-300 ${
                    isDarkMode ? 'bg-[#0f172a]/80 border-slate-800/50' : 'bg-white/80 border-slate-200/60'
                } backdrop-blur-md`}>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className={`p-2 rounded-xl border transition-all ${
                                isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                            }`}
                        >
                            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                        
                        <div className="relative group hidden md:block">
                            <Search className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                            <input 
                                type="text" 
                                placeholder="Search clinical records..." 
                                className={`pl-11 pr-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider outline-none border transition-all w-64 focus:w-80 ${
                                    isDarkMode 
                                        ? 'bg-slate-900 border-slate-800 text-white focus:border-indigo-500' 
                                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-indigo-400'
                                }`}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`p-2.5 rounded-xl border transition-all ${
                                isDarkMode ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                            }`}
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <div className="relative">
                            <button className={`p-2.5 rounded-xl border transition-all relative ${
                                isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                            }`}>
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-[#0f172a]" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8 lg:p-12 animate-in fade-in duration-500">
                    {children}
                </div>
            </main>
        </div>
    );
}
