import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Baby, Clock, 
  AlertTriangle, Lightbulb, CheckCircle2, 
  ChevronDown, ChevronUp, ShieldCheck, 
  BookOpen, ArrowRight, Activity, 
  X, FileText, Filter, Stethoscope, Zap,
  Database, Loader2
} from 'lucide-react';
import { api } from '../services/api';

const Flashcard = ({ _id, title, category, when, steps, warning, tips }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleMarkAsRead = async (e) => {
    e.stopPropagation();
    setLoading(true);
    try {
      const res = await api.completeFlashcard(_id || title);
      if (res.success) {
        setIsRead(true);
      }
    } catch (err) {
      console.error("Failed to mark flashcard as read");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-white dark:bg-slate-900 rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${isExpanded ? 'border-primary shadow-2xl shadow-primary/5 dark:shadow-none ring-4 ring-primary/5' : 'border-slate-100 dark:border-slate-800 hover:border-primary/20 dark:hover:border-primary/30 hover:shadow-md'}`}>
      <div className="p-6 lg:p-10">
        <div className="flex items-start justify-between gap-6">
          <div className="flex gap-6 items-center">
            <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 border transition-all duration-500 shadow-inner ${
              isRead ? 'bg-emerald-500 text-white border-emerald-500' :
              category === 'Critical' ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-800' : 'bg-primary/5 dark:bg-primary/10 text-primary border-primary/20 dark:border-primary/30'
            }`}>
               {isRead ? <CheckCircle2 className="w-8 h-8" /> : 
                category === 'Critical' ? <AlertTriangle className="w-8 h-8" /> : <BookOpen className="w-8 h-8" />}
            </div>
            <div className="text-left">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                 <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
                   category === 'Critical' ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-800' : 
                   category === 'Clinical' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800' : 
                   'bg-primary/5 dark:bg-primary/10 text-primary border-primary/20'
                 }`}>
                   {category}
                 </span>
                 {isRead && (
                   <div className="flex items-center gap-1.5 text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5" /> Validated
                   </div>
                 )}
              </div>
              <h3 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">{title}</h3>
            </div>
          </div>
          <div className="flex gap-2">
            {!isRead && (
              <button 
                onClick={handleMarkAsRead}
                disabled={loading}
                className="w-11 h-11 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all active:scale-90"
                title="Mark as Validated"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
              </button>
            )}
            <button 
              onClick={toggleExpand}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-500 shrink-0 active:scale-90 ${
                isExpanded ? 'bg-slate-900 dark:bg-primary text-white rotate-180 shadow-lg' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700'
              }`}
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[2000px] opacity-100 mt-12' : 'max-h-0 opacity-0 mt-0'}`}>
          <div className="flex gap-6 mb-10 text-left">
            <div className="w-1.5 bg-primary/20 dark:bg-primary/30 rounded-full shrink-0" />
            <div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] flex items-center gap-3 mb-3">
                <Clock className="w-4 h-4 text-primary" /> Indications & Clinical Context
              </p>
              <p className="text-base font-bold text-slate-600 dark:text-slate-300 italic leading-relaxed">"{when}"</p>
            </div>
          </div>

          <div className="mb-10 text-left">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] flex items-center gap-3 mb-6">
              <CheckCircle2 className="w-4 h-4 text-primary" /> Execution Logic Pipeline
            </p>
            <div className="grid gap-4">
              {steps?.map((step, i) => (
                <div key={i} className="flex gap-5 items-start p-5 rounded-[24px] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group hover:bg-white dark:hover:bg-slate-800 hover:border-primary/20 transition-all duration-300">
                  <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-black text-slate-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all shrink-0 shadow-sm">
                    {String(i + 1)}
                  </div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200 pt-1.5 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {warning && (
              <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 rounded-[2rem] p-6 flex gap-5">
                <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-rose-100 dark:border-rose-900/30">
                   <AlertTriangle className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 text-rose-600 dark:text-rose-400">Critical Warning</p>
                  <p className="text-[13px] font-black text-rose-900 dark:text-rose-200 leading-relaxed">{warning}</p>
                </div>
              </div>
            )}

            {tips && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-[2rem] p-6 flex gap-5">
                <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-amber-100 dark:border-amber-900/30">
                   <Lightbulb className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 text-amber-600 dark:text-amber-400">Optimization</p>
                  <p className="text-[13px] font-bold text-amber-900 dark:text-amber-200 leading-relaxed">{tips}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="pt-8 mt-12 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                Verified Clinical Hub v16.2
             </div>
             <button className="w-full sm:w-auto px-8 py-3 bg-slate-50 dark:bg-slate-800 text-[11px] font-black uppercase tracking-[0.2em] text-primary rounded-xl border border-slate-100 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3 active:scale-95">
                Evidence Link <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Flashcards({ user }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await api.getFlashcards();
        if (res.success) {
          setCards(res.data);
        } else {
          setError('Failed to load clinical hub data.');
        }
      } catch (err) {
        setError('Secure network synchronization failure.');
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  const filteredCards = cards.filter(card => 
    (activeFilter === 'All' || card.category === activeFilter) &&
    (card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-[1600px] mx-auto w-full p-4 lg:p-10 pb-32 space-y-12 text-left">
      
      {/* Editorial Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-slate-200 dark:border-slate-800 pb-10">
        <div className="max-w-xl text-left">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block">Central Archive</span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-none">Knowledge Hub</h1>
          <p className="text-sm lg:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            The definitive clinical library for neonatal care. Access validated procedures, standard operating protocols, and life-saving guidance at the bedside.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative group flex-1 sm:w-80">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-600 group-focus-within:text-primary transition-colors" />
             <input 
              type="text" 
              placeholder="Search library..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[20px] text-sm font-black focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-slate-900 dark:text-white outline-none shadow-sm" 
             />
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-white dark:bg-slate-900 p-4 lg:p-3 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
          {['All', 'Clinical', 'Critical', 'Daily Routine'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === filter ? 'bg-primary text-white shadow-xl' : 'text-slate-500 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="hidden md:flex ml-auto items-center gap-3 pr-6 border-l border-slate-100 dark:border-slate-800 pl-6 h-10">
           <Filter className="w-4 h-4 text-slate-400" />
           <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Filter Archive</span>
        </div>
      </div>

      {/* Grid State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-40">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">Synchronizing Vault...</p>
        </div>
      ) : error ? (
        <div className="text-center py-40 rounded-[3rem] bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 max-w-2xl mx-auto">
           <AlertTriangle className="w-16 h-16 text-rose-400 mx-auto mb-6" />
           <h3 className="text-xl font-black text-rose-900 dark:text-rose-200 mb-2">{error}</h3>
           <p className="text-sm font-medium text-rose-600 dark:text-rose-400">Verify hospital network connectivity.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredCards.map((card, i) => (
            <Flashcard key={card._id || i} {...card} />
          ))}
          {filteredCards.length === 0 && (
            <div className="col-span-full py-40 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 text-center">
               <div className="w-20 h-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl flex items-center justify-center mb-8 shadow-sm">
                  <Database className="w-10 h-10 text-slate-200 dark:text-slate-700" />
               </div>
               <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Archive Query Returned Null</h4>
               <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">No protocols match your search criteria. Try broadening your parameters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
