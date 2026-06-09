import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, PlayCircle, Search, 
  ShieldCheck, ChevronRight, FileText, 
  Activity, CheckCircle2, Bookmark, Clock, ArrowRight,
  Info, Zap, Droplets, Thermometer, Plus, Edit2, Trash2, X, Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const Academy: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [user] = useState<any>(JSON.parse(localStorage.getItem('user_data') || '{}'));
  
  // Student Test State
  const [testMode, setTestMode] = useState(false);
  const [activeTest, setActiveTest] = useState<any>(null);
  const [testAnswer, setTestAnswer] = useState('');
  const [testResult, setTestResult] = useState<any>(null);

  const isAdmin = user.role === 'Nursing In-Charge' || user.role === 'Consultant Pediatrician' || user.name === 'System Admin';
  const isStudent = user.role === 'Student';

  const [formData, setFormData] = useState({
    type: 'flashcard', // flashcard or scenario
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
  }, []);

  const fetchModules = async () => {
    setLoading(true);
    try {
      const [flashRes, scenariosRes] = await Promise.all([
        api.get('/learning/flashcards'),
        api.get('/learning/scenarios')
      ]);
      
      const mappedModules = [
        ...flashRes.data.data.map((f: any) => ({ 
          ...f, 
          type: 'flashcard',
          icon: Zap, 
          level: f.category === 'Critical' ? 'Advanced' : 'Essential',
          completed: false 
        })),
        ...scenariosRes.data.data.map((s: any) => ({ 
          ...s, 
          type: 'scenario',
          category: 'Bedside Simulation', 
          icon: Activity, 
          level: s.difficulty || 'Advanced',
          completed: false
        }))
      ];
      setModules(mappedModules);
    } catch (err) {
      console.error('Failed to fetch modules:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        const endpoint = editingItem.type === 'flashcard' ? `/learning/flashcards/${editingItem.id}` : `/learning/scenarios/${editingItem.id}`;
        await api.patch(endpoint, formData);
      } else {
        const endpoint = formData.type === 'flashcard' ? '/learning/flashcards' : '/learning/scenarios';
        await api.post(endpoint, formData);
      }
      setShowAddModal(false);
      setEditingItem(null);
      fetchModules();
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  const handleDelete = async (item: any) => {
    if (!window.confirm('Terminate this protocol record?')) return;
    try {
      const endpoint = item.type === 'flashcard' ? `/learning/flashcards/${item.id}` : `/learning/scenarios/${item.id}`;
      await api.delete(endpoint);
      fetchModules();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const startTest = (item: any) => {
    setActiveTest(item);
    setTestMode(true);
    setTestAnswer('');
    setTestResult(null);
  };

  const submitTest = () => {
    const isCorrect = testAnswer.toLowerCase().includes(activeTest.solution?.toLowerCase() || activeTest.content?.toLowerCase().split('.')[0]);
    setTestResult({
      status: isCorrect ? 'Mastered' : 'Requires Review',
      feedback: isCorrect ? 'Protocol alignment confirmed.' : 'Inaccurate response detected. Review clinical standards.'
    });
  };

  const categories = ['All', 'Clinical', 'Routine', 'Critical', 'Bedside Simulation'];

  const filteredModules = modules.filter(m => 
    (selectedCategory === 'All' || m.category === selectedCategory) &&
    (m.title.toLowerCase().includes(searchTerm.toLowerCase()) || m.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading && modules.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4 text-slate-400">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Opening Protocol Library...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-28 text-[var(--text-main)]">
      {/* Structural Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Clinical Academy</h2>
          <p className="text-slate-500 font-medium max-w-xl">
            {isStudent ? 'Intern Nurse Competency Pathway - Study and Validation.' : 'Standardized protocols and competency validation pathways.'}
          </p>
        </div>
        <div className="flex items-center gap-4">
           {isAdmin && (
             <button 
                onClick={() => { setEditingItem(null); setFormData({type: 'flashcard', title: '', category: 'Clinical', content: '', description: '', problem: '', solution: '', difficulty: 'Intermediate'}); setShowAddModal(true); }}
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-emerald-100 dark:shadow-none hover:bg-emerald-700 transition-all flex items-center space-x-2"
             >
                <Plus size={18} />
                <span>Add Protocol</span>
             </button>
           )}
           <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-2 px-5 rounded-2xl shadow-sm flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shadow-sm">
                 <GraduationCap size={20} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Modules</p>
                 <p className="text-sm font-bold">{modules.length} Available</p>
              </div>
           </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-2 rounded-2xl flex flex-col md:flex-row items-center gap-2 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input 
            type="text" 
            placeholder="Search knowledge core..."
            className="w-full bg-transparent py-3.5 pl-12 pr-4 text-sm font-bold text-[var(--text-main)] outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1 p-1 bg-[var(--bg-main)] rounded-xl w-full md:w-auto">
           {categories.map(cat => (
             <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-[var(--card-bg)] text-[var(--text-main)] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
             >
                {cat}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredModules.map((item, idx) => (
          <motion.div 
            layout
            key={item.type + item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--card-bg)] border border-[var(--border-main)] p-8 rounded-[2.5rem] shadow-sm hover:border-emerald-200 transition-all group flex flex-col justify-between"
          >
             <div className="space-y-6">
                <div className="flex justify-between items-start">
                   <div className="p-3 rounded-2xl bg-[var(--bg-main)] text-slate-400 border border-[var(--border-main)] group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                      <item.icon size={24} />
                   </div>
                   <div className="flex flex-col items-end gap-2">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">{item.level}</span>
                      {isAdmin && (
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button onClick={() => { setEditingItem(item); setFormData({...item, type: item.type}); setShowAddModal(true); }} className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"><Edit2 size={14} /></button>
                           <button onClick={() => handleDelete(item)} className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"><Trash2 size={14} /></button>
                        </div>
                      )}
                   </div>
                </div>
                <div>
                   <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">{item.category}</p>
                   <h3 className="text-xl font-bold tracking-tight leading-tight">{item.title}</h3>
                </div>
                {item.type === 'flashcard' ? (
                   <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{item.content}</p>
                ) : (
                   <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{item.description}</p>
                )}
             </div>
             <div className="mt-8 pt-6 border-t border-[var(--border-main)] flex items-center justify-between">
                <div className="flex items-center space-x-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                   <Clock size={12} />
                   <span>{item.type === 'flashcard' ? '2 Min Read' : '10 Min Sim'}</span>
                </div>
                {isStudent ? (
                  <button 
                    onClick={() => startTest(item)}
                    className="bg-slate-900 dark:bg-emerald-600 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-md shadow-slate-200 dark:shadow-none"
                  >
                     Take Test
                  </button>
                ) : (
                  <button className="text-slate-300 group-hover:text-emerald-600 transition-all">
                     <ChevronRight size={20} />
                  </button>
                )}
             </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[3rem] w-full max-w-2xl p-10 shadow-2xl space-y-8 overflow-y-auto max-h-[90vh] custom-scrollbar"
             >
                <div className="flex justify-between items-center">
                   <h3 className="text-2xl font-bold tracking-tight">{editingItem ? 'Edit Protocol' : 'New Clinical Protocol'}</h3>
                   <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-[var(--bg-main)] rounded-xl"><X size={20} /></button>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                   {!editingItem && (
                     <div className="flex p-1 bg-[var(--bg-main)] rounded-2xl border border-[var(--border-main)]">
                        <button type="button" onClick={() => setFormData({...formData, type: 'flashcard'})} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${formData.type === 'flashcard' ? 'bg-[var(--card-bg)] shadow-sm' : 'text-slate-400'}`}>Flashcard</button>
                        <button type="button" onClick={() => setFormData({...formData, type: 'scenario'})} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${formData.type === 'scenario' ? 'bg-[var(--card-bg)] shadow-sm' : 'text-slate-400'}`}>Simulation</button>
                     </div>
                   )}

                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Protocol Title</label>
                      <input 
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-2xl text-sm font-bold outline-none focus:border-emerald-500 transition-all"
                        placeholder="e.g. Neonatal Sepsis Management"
                        required
                      />
                   </div>

                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Category</label>
                         <select 
                           value={formData.category}
                           onChange={(e) => setFormData({...formData, category: e.target.value})}
                           className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-2xl text-sm font-bold outline-none"
                         >
                            <option>Clinical</option>
                            <option>Routine</option>
                            <option>Critical</option>
                            <option>Emergency</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Complexity</label>
                         <select 
                           value={formData.difficulty}
                           onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                           className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-2xl text-sm font-bold outline-none"
                         >
                            <option>Essential</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                         </select>
                      </div>
                   </div>

                   {formData.type === 'flashcard' ? (
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Protocol Content</label>
                        <textarea 
                          rows={4}
                          value={formData.content}
                          onChange={(e) => setFormData({...formData, content: e.target.value})}
                          className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-2xl text-sm font-medium outline-none focus:border-emerald-500 transition-all"
                          placeholder="Standardized clinical information..."
                          required
                        />
                     </div>
                   ) : (
                     <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Clinical Scenario</label>
                           <textarea rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-2xl text-sm font-medium" placeholder="Describe the bedside situation..." required />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Problem Statement</label>
                           <input value={formData.problem} onChange={(e) => setFormData({...formData, problem: e.target.value})} className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-2xl text-sm font-medium" placeholder="What is the critical question?" required />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Protocol Solution</label>
                           <input value={formData.solution} onChange={(e) => setFormData({...formData, solution: e.target.value})} className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-4 rounded-2xl text-sm font-medium" placeholder="The correct clinical action..." required />
                        </div>
                     </div>
                   )}

                   <button type="submit" className="w-full bg-slate-900 dark:bg-emerald-600 text-white py-5 rounded-2xl font-bold shadow-xl flex items-center justify-center space-x-2 hover:bg-black dark:hover:bg-emerald-700 transition-all">
                      <Save size={18} />
                      <span>{editingItem ? 'Update Clinical Standards' : 'Deploy Protocol'}</span>
                   </button>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Student Test Modal */}
      <AnimatePresence>
         {testMode && activeTest && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[3rem] w-full max-w-xl p-10 shadow-2xl space-y-8"
              >
                 <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3 text-emerald-600">
                       <Zap size={20} />
                       <h3 className="text-xl font-bold tracking-tight">Competency Validation</h3>
                    </div>
                    <button onClick={() => setTestMode(false)} className="p-2 hover:bg-[var(--bg-main)] rounded-xl"><X size={20} /></button>
                 </div>

                 <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Simulation Case</p>
                    <div className="p-6 bg-[var(--bg-main)] rounded-[2rem] border border-[var(--border-main)]">
                       <h4 className="text-lg font-bold mb-3">{activeTest.title}</h4>
                       <p className="text-sm text-slate-500 leading-relaxed italic">
                          "{activeTest.description || activeTest.content}"
                       </p>
                    </div>
                 </div>

                 {!testResult ? (
                   <div className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Your Protocol Response</label>
                         <textarea 
                           rows={4}
                           value={testAnswer}
                           onChange={(e) => setTestAnswer(e.target.value)}
                           className="w-full bg-[var(--bg-main)] border border-[var(--border-main)] p-5 rounded-2xl text-sm font-medium outline-none focus:border-emerald-500 transition-all"
                           placeholder="Outline the clinical steps required..."
                         />
                      </div>
                      <button 
                        onClick={submitTest}
                        className="w-full bg-slate-900 dark:bg-emerald-600 text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-black transition-all"
                      >
                         Submit for Validation
                      </button>
                   </div>
                 ) : (
                   <div className="space-y-8 animate-in zoom-in duration-500">
                      <div className={`p-8 rounded-[2.5rem] border flex flex-col items-center text-center space-y-4 ${testResult.status === 'Mastered' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}>
                         <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${testResult.status === 'Mastered' ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                            {testResult.status === 'Mastered' ? <CheckCircle2 size={32} /> : <AlertCircle size={32} />}
                         </div>
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-widest mb-1">Validation Result</p>
                            <h4 className="text-2xl font-black">{testResult.status}</h4>
                         </div>
                         <p className="text-sm font-medium leading-relaxed opacity-80">{testResult.feedback}</p>
                      </div>
                      <button onClick={() => setTestMode(false)} className="w-full py-5 bg-[var(--bg-main)] rounded-2xl font-bold text-slate-500 hover:text-[var(--text-main)] transition-colors uppercase text-[11px] tracking-widest">Return to Academy</button>
                   </div>
                 )}
              </motion.div>
           </div>
         )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="pt-12 border-t border-[var(--border-main)] flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
         <div>Protocol Library ID: ND-HQ-LIB-2026-6C</div>
         <div className="flex items-center space-x-4">
            <span className="text-emerald-600 font-black">Secure. Validated. Verified.</span>
         </div>
      </footer>
    </div>
  );
};

export default Academy;
