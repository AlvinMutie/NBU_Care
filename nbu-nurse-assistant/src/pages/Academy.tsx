import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, Search, ShieldCheck, Zap, 
  Activity, Clock, ArrowRight,
  Info, Plus, Edit2, Trash2, X, Save, ChevronDown, CheckCircle2, Flame, Target, BookOpen
} from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Academy: React.FC = () => {
  const navigate = useNavigate();
  const libraryRef = useRef<HTMLDivElement>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState<any>(null);
  
  // Synchronized user data retrieval
  const getUserData = () => {
    try {
      const stored = localStorage.getItem('user_data');
      if (stored) return JSON.parse(stored);
      
      return {
        name: localStorage.getItem('user_name') || 'Clinician',
        role: localStorage.getItem('user_role') || 'Staff'
      };
    } catch {
      return {};
    }
  };

  const [user] = useState<any>(getUserData());
  const [challenge, setChallenge] = useState<any>(null);
  
  const isStudent = (user?.role || '').toLowerCase() === 'student';
  const isAdmin = (user?.role || '').toLowerCase() === 'nursing in-charge' || user?.name === 'System Admin';

  const [formData, setFormData] = useState({
    type: 'flashcard',
    title: '',
    category: 'Clinical',
    content: '',
    description: '',
    problem: '',
    solution: '',
    difficulty: 'Intermediate'
  });

  const fetchModules = async () => {
    try {
      const [flashRes, scenariosRes] = await Promise.all([
        api.get('/learning/flashcards'),
        api.get('/learning/scenarios')
      ]);
      
      const flashcards = flashRes.data?.data || [];
      const scenarios = scenariosRes.data?.data || [];

      const mappedModules = [
        ...flashcards.map((f: any) => ({ 
          ...f, 
          type: 'flashcard',
          icon: Zap, 
          level: f.category === 'Critical' ? 'Advanced' : 'Essential'
        })),
        ...scenarios.map((s: any) => ({ 
          ...s, 
          type: 'scenario',
          category: 'Bedside Simulation', 
          icon: Activity, 
          level: s.difficulty || 'Advanced'
        }))
      ];
      setModules(mappedModules);
    } catch (err) {
      console.error('Failed to fetch modules:', err);
    }
  };

  const fetchChallenge = async () => {
    try {
      const res = await api.get('/learning/challenge');
      setChallenge(res.data.data);
    } catch (err) {
      console.error('Failed to fetch challenge:', err);
    }
  };

  const initializeAcademy = async () => {
    setLoading(true);
    await Promise.all([
      fetchModules(),
      isStudent ? fetchChallenge() : Promise.resolve()
    ]);
    setLoading(false);
  };

  useEffect(() => {
    initializeAcademy();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = formData.type === 'flashcard' ? '/learning/flashcards' : '/learning/scenarios';
      await api.post(endpoint, formData);
      setShowAddModal(false);
      fetchModules();
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  const scrollToLibrary = () => {
    libraryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Initializing Academy Core...</p>
      </div>
    );
  }

  const categories = ['All', 'Clinical', 'Routine', 'Critical', 'Bedside Simulation'];
  const filteredModules = (modules || []).filter(m => {
     if (!m) return false;
     const title = (m.title || '').toLowerCase();
     const content = (m.content || m.description || '').toLowerCase();
     const search = (searchTerm || '').toLowerCase();
     
     const matchesSearch = title.includes(search) || content.includes(search);
     const matchesCategory = selectedCategory === 'All' || 
                            m.category === selectedCategory || 
                            (m.type === 'scenario' && selectedCategory === 'Bedside Simulation');
     return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-28 text-[var(--text-main)]">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Clinical Academy</h2>
          <p className="text-slate-500 font-medium max-w-xl">
            {isStudent ? 'Your personalized 30-day clinical simulation pathway.' : 'Institutional protocols and competency validation.'}
          </p>
        </div>
        
        {isStudent && challenge && (
          <div className="flex items-center gap-4 bg-[var(--card-bg)] border border-[var(--border-main)] p-3 px-6 rounded-3xl shadow-sm">
             <div className="flex items-center space-x-4">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                   <Flame size={20} />
                </div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Challenge Progress</p>
                   <p className="text-sm font-bold">Day {challenge.day || 1} of 30</p>
                </div>
             </div>
             <div className="w-px h-10 bg-[var(--border-main)]" />
             <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                   <Target size={20} />
                </div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Accuracy</p>
                   <p className="text-sm font-bold">{challenge.accuracy || 0}%</p>
                </div>
             </div>
          </div>
        )}
      </div>

      {isStudent && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <div className="lg:col-span-8 bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                 <Zap size={300} />
              </div>
              <div className="relative z-10 space-y-8">
                 <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                    <Zap size={12} fill="currentColor" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Today's Simulation Challenge</span>
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-4xl font-black tracking-tight">{challenge?.challenge?.type || 'Standard Care Simulation'}</h3>
                    <p className="text-slate-400 text-base max-w-2xl font-medium leading-relaxed">
                       In today's simulation, you are required to admit and manage a neonate with {challenge?.challenge?.type || 'routine assessment needs'}. 
                       You must perform accurate fluid calculations and generate a professional handover by shift-end.
                    </p>
                 </div>
                 <div className="flex flex-wrap gap-4 pt-2">
                    <button 
                      onClick={() => navigate('/neonates')}
                      className="flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl hover:bg-white/10 transition-colors"
                    >
                       <Plus size={18} className="text-emerald-400" />
                       <span className="text-sm font-bold">Add Simulated Patient</span>
                    </button>
                    <button 
                      onClick={scrollToLibrary}
                      className="flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl hover:bg-white/10 transition-colors"
                    >
                       <BookOpen size={18} className="text-blue-400" />
                       <span className="text-sm font-bold">View Case Protocol</span>
                    </button>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-4 bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[3rem] p-8 space-y-8 shadow-sm">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-[var(--border-main)] pb-4">Virtual Ward Checklist</h4>
              <div className="space-y-6">
                 {[
                   { t: 'Admit Neonate', d: 'Add patient to registry', c: true },
                   { t: 'Initial Vitals', d: 'Log baseline assessment', c: false },
                   { t: 'Fluid Calc', d: 'TFI & Fluid volume guide', c: false },
                   { t: 'Handover', d: 'Generate SBAR report', c: false },
                 ].map((step, i) => (
                   <div key={i} className="flex items-start space-x-4">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${step.c ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'}`}>
                         {step.c ? <CheckCircle2 size={14} /> : <div className="w-2 h-2 rounded-full bg-current" />}
                      </div>
                      <div>
                         <p className={`text-xs font-bold ${step.c ? 'text-slate-400 line-through' : 'text-[var(--text-main)]'}`}>{step.t}</p>
                         <p className="text-[10px] text-slate-400 font-medium">{step.d}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* Protocol Library */}
      <div className="space-y-6" ref={libraryRef}>
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-xl font-bold tracking-tight">Institutional Protocol Library</h3>
            <div className="flex items-center gap-4">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input 
                    type="text"
                    placeholder="Search protocols..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-[var(--bg-main)] border border-[var(--border-main)] pl-9 pr-4 py-2 rounded-xl text-xs font-medium outline-none focus:border-emerald-500 transition-all w-48 md:w-64"
                  />
               </div>
               {isAdmin && (
                 <button onClick={() => setShowAddModal(true)} className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:underline flex items-center space-x-2">
                    <Plus size={14} />
                    <span>Add Protocol</span>
                 </button>
               )}
            </div>
         </div>

         {/* Category Tabs */}
         <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' : 'bg-[var(--card-bg)] text-slate-400 hover:text-slate-600'}`}
              >
                {cat}
              </button>
            ))}
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredModules.map((m, idx) => {
              const Icon = m.icon || BookOpen;
              return (
                <div 
                  key={idx} 
                  onClick={() => setSelectedModule(m)}
                  className="bg-[var(--card-bg)] border border-[var(--border-main)] p-6 rounded-[2rem] shadow-sm hover:border-emerald-200 transition-all cursor-pointer group"
                >
                   <div className="flex justify-between items-start mb-4">
                      <div className="p-2.5 rounded-xl bg-[var(--bg-main)] text-slate-400 group-hover:text-emerald-600 transition-colors">
                         <Icon size={20} />
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">{m.level}</span>
                   </div>
                   <h4 className="text-base font-bold mb-1">{m.title}</h4>
                   <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3">{m.category}</p>
                   <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed mb-4">
                      {m.content || m.description}
                   </p>
                   <div className="pt-4 border-t border-[var(--border-main)] flex items-center justify-between text-slate-400">
                      <div className="flex items-center space-x-2 text-[10px] font-bold uppercase">
                         <Clock size={12} />
                         <span>{m.type === 'flashcard' ? '2m' : '10m'}</span>
                      </div>
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                   </div>
                </div>
              );
            })}
            {filteredModules.length === 0 && (
               <div className="col-span-full py-20 text-center bg-[var(--bg-main)] rounded-[2rem] border-2 border-dashed border-[var(--border-main)]">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No protocols found matching your search</p>
               </div>
            )}
         </div>
      </div>

      <AnimatePresence>
        {selectedModule && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
             <motion.div 
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }} 
               exit={{ opacity: 0, y: 20 }} 
               className="bg-[var(--card-bg)] rounded-[3rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[var(--border-main)] shadow-2xl relative custom-scrollbar"
             >
                <div className="sticky top-0 bg-[var(--card-bg)]/80 backdrop-blur-md p-8 border-b border-[var(--border-main)] flex justify-between items-center z-10">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em]">{selectedModule.category}</p>
                      <h3 className="text-2xl font-bold tracking-tight">{selectedModule.title}</h3>
                   </div>
                   <button onClick={() => setSelectedModule(null)} className="p-3 bg-[var(--bg-main)] rounded-2xl hover:bg-rose-50 hover:text-rose-600 transition-all"><X size={20} /></button>
                </div>
                
                <div className="p-10 space-y-8">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-[var(--bg-main)] rounded-2xl border border-[var(--border-main)]">
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Compliance Level</p>
                         <p className="text-sm font-bold">{selectedModule.level}</p>
                      </div>
                      <div className="p-4 bg-[var(--bg-main)] rounded-2xl border border-[var(--border-main)]">
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Estimated Review</p>
                         <p className="text-sm font-bold">{selectedModule.type === 'flashcard' ? '2-5 Minutes' : '15-20 Minutes'}</p>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center space-x-2">
                         <ShieldCheck size={14} className="text-emerald-500" />
                         <span>Institutional Directive & Clinical Education</span>
                      </h4>
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                         <div className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-[var(--border-main)]">
                            <p className="mb-4">{selectedModule.content || selectedModule.description}</p>
                            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                               <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3">Key Learning Objectives</p>
                               <ul className="space-y-2 list-none p-0">
                                  <li className="flex items-start space-x-2">
                                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                     <span>Master the foundational principles of {selectedModule.title}.</span>
                                  </li>
                                  <li className="flex items-start space-x-2">
                                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                     <span>Identify critical risk factors and institutional safety thresholds.</span>
                                  </li>
                                  <li className="flex items-start space-x-2">
                                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                     <span>Execute evidence-based interventions as per NICU protocol.</span>
                                  </li>
                               </ul>
                            </div>
                         </div>
                      </div>
                   </div>

                   {selectedModule.type === 'scenario' && (
                     <div className="space-y-8">
                        <div className="space-y-4">
                           <h4 className="text-[11px] font-black text-rose-500 uppercase tracking-widest">Clinical Problem</h4>
                           <div className="p-6 bg-rose-50/50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-800 rounded-[2rem] text-sm font-bold leading-relaxed">
                              {selectedModule.problem}
                           </div>
                        </div>
                        <div className="space-y-4">
                           <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-widest">Institutional Solution</h4>
                           <div className="p-6 bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 rounded-[2rem] text-sm font-bold leading-relaxed">
                              {selectedModule.solution}
                           </div>
                        </div>
                     </div>
                   )}

                   <div className="pt-8 border-t border-[var(--border-main)] flex justify-between items-center text-slate-400">
                      <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest">
                         <GraduationCap size={14} />
                         <span>Clinical Academy validated</span>
                      </div>
                      <button 
                        onClick={() => setSelectedModule(null)}
                        className="px-8 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all"
                      >
                         Acknowledge Protocol
                      </button>
                   </div>
                </div>
             </motion.div>
          </div>
        )}

        {showAddModal && (
