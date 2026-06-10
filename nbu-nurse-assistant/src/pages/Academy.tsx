import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, Search, ShieldCheck, Zap, 
  Activity, Clock, ArrowRight,
  Info, Plus, Edit2, Trash2, X, Save, ChevronDown, CheckCircle2, Flame, Target, BookOpen, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const Academy: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [user] = useState<any>(() => {
    try {
      return JSON.parse(localStorage.getItem('user_data') || '{}');
    } catch {
      return {};
    }
  });
  const [challenge, setChallenge] = useState<any>(null);
  
  const isAdmin = user?.role === 'Nursing In-Charge' || user?.name === 'System Admin';
  const isStudent = user?.role === 'Student';

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

  useEffect(() => {
    fetchModules();
    if (isStudent) fetchChallenge();
  }, []);

  const fetchModules = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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

  const categories = ['All', 'Clinical', 'Routine', 'Critical', 'Bedside Simulation'];

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
                   <p className="text-sm font-bold">Day {challenge.day} of 30</p>
                </div>
             </div>
             <div className="w-px h-10 bg-[var(--border-main)]" />
             <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                   <Target size={20} />
                </div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Accuracy</p>
                   <p className="text-sm font-bold">{challenge.accuracy}%</p>
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
                    <h3 className="text-4xl font-black tracking-tight">{challenge?.challenge?.type || 'Loading Challenge...'}</h3>
                    <p className="text-slate-400 text-base max-w-2xl font-medium leading-relaxed">
                       In today's simulation, you are required to admit and manage a neonate with {challenge?.challenge?.type}. 
                       You must perform accurate fluid calculations and generate a professional handover by shift-end.
                    </p>
                 </div>
                 <div className="flex flex-wrap gap-4 pt-2">
                    <div className="flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
                       <Plus size={18} className="text-emerald-400" />
                       <span className="text-sm font-bold">Add Simulated Patient</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
                       <BookOpen size={18} className="text-blue-400" />
                       <span className="text-sm font-bold">View Case Protocol</span>
                    </div>
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
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight">Institutional Protocol Library</h3>
            {isAdmin && (
              <button onClick={() => setShowAddModal(true)} className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:underline">Add Protocol</button>
            )}
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modules.map((m, idx) => {
              const Icon = m.icon || BookOpen;
              return (
                <div key={idx} className="bg-[var(--card-bg)] border border-[var(--border-main)] p-6 rounded-[2rem] shadow-sm hover:border-emerald-200 transition-all cursor-pointer group">
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
         </div>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[var(--card-bg)] rounded-[3rem] w-full max-w-xl p-10 border border-[var(--border-main)] space-y-8">
                <div className="flex justify-between items-center">
                   <h3 className="text-2xl font-bold tracking-tight">New Knowledge Module</h3>
                   <button onClick={() => setShowAddModal(false)} className="p-2"><X size={20} /></button>
                </div>
                <form onSubmit={handleSave} className="space-y-6">
                   <div className="flex p-1 bg-[var(--bg-main)] rounded-2xl border border-[var(--border-main)]">
                      <button type="button" onClick={() => setFormData({...formData, type: 'flashcard'})} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${formData.type === 'flashcard' ? 'bg-[var(--card-bg)] shadow-sm' : 'text-slate-400'}`}>Flashcard</button>
                      <button type="button" onClick={() => setFormData({...formData, type: 'scenario'})} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${formData.type === 'scenario' ? 'bg-[var(--card-bg)] shadow-sm' : 'text-slate-400'}`}>Simulation</button>
                   </div>
                   <input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-2xl text-sm font-bold" placeholder="Title" required />
                   <textarea rows={4} value={formData.content || formData.description} onChange={(e) => setFormData({...formData, content: e.target.value, description: e.target.value})} className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-2xl text-sm font-medium" placeholder="Content..." required />
                   <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold">Deploy Module</button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Academy;
