import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Baby, Clock, 
  AlertTriangle, Lightbulb, CheckCircle2, 
  ChevronDown, ChevronUp, ShieldCheck, 
  BookOpen, ArrowRight, Activity, 
  X, FileText, Filter, Stethoscope, Zap
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
    <div className={`bg-white rounded-[2rem] border transition-all duration-500 ${isExpanded ? 'border-primary shadow-xl shadow-primary/5' : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'}`}>
      <div className="p-8">
        <div className="flex items-start justify-between gap-6">
          <div className="flex gap-5 items-center">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500 ${
              isRead ? 'bg-emerald-500 text-white border-emerald-500' :
              category === 'Critical' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-primary/10 text-primary border-primary/20'
            }`}>
               {isRead ? <CheckCircle2 className="w-7 h-7" /> : 
                category === 'Critical' ? <AlertTriangle className="w-7 h-7" /> : <BookOpen className="w-7 h-7" />}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                 <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${
                   category === 'Critical' ? 'bg-rose-100 text-rose-700' : 
                   category === 'Clinical' ? 'bg-emerald-100 text-emerald-700' : 
                   'bg-primary/10 text-primary'
                 }`}>
                   {category}
                 </span>
                 {isRead && (
                   <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                      <ShieldCheck className="w-3.5 h-3.5" /> Validated
                   </div>
                 )}
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h3>
            </div>
          </div>
          <div className="flex gap-2">
            {!isRead && (
              <button 
                onClick={handleMarkAsRead}
                disabled={loading}
                className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200 flex items-center justify-center transition-all"
                title="Mark as Validated"
              >
                <CheckCircle2 className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={toggleExpand}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 shrink-0 ${
                isExpanded ? 'bg-primary text-white rotate-180 shadow-lg shadow-primary/20' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[2000px] opacity-100 mt-10' : 'max-h-0 opacity-0 mt-0'}`}>
          <div className="flex gap-5 mb-8">
            <div className="w-1.5 bg-primary/20 rounded-full shrink-0" />
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 mb-2">
                <Clock className="w-3.5 h-3.5 text-primary" /> Indications
              </p>
              <p className="text-sm font-medium text-slate-600 italic leading-relaxed">"{when}"</p>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Execution Logic
            </p>
            <div className="grid gap-3">
              {steps?.map((step, i) => (
                <div key={i} className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-white hover:border-primary/30 transition-all duration-300">
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[11px] font-black text-slate-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all shrink-0">
                    {String(i + 1)}
                  </div>
                  <p className="text-sm text-slate-600 font-medium pt-1 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {warning && (
              <div className="bg-rose-50/50 border border-rose-100 rounded-[1.5rem] p-5 flex gap-4 text-rose-900">
                <div className="mt-1">
                   <AlertTriangle className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-rose-600">Critical Warning</p>
                  <p className="text-[13px] font-bold leading-relaxed">{warning}</p>
                </div>
              </div>
            )}

            {tips && (
              <div className="bg-amber-50/50 border border-amber-100 rounded-[1.5rem] p-5 flex gap-4 text-amber-900">
                <div className="mt-1">
                   <Lightbulb className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-amber-600">Clinical Optimization</p>
                  <p className="text-[13px] font-medium leading-relaxed">{tips}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="pt-8 mt-10 border-t border-slate-100 flex items-center justify-between">
             <div className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Verified Clinical Hub V4.8
             </div>
             <button className="text-[11px] font-black uppercase tracking-widest text-primary flex items-center gap-2 hover:gap-4 transition-all group/btn">
                Clinical Evidence <ArrowRight className="w-4 h-4" />
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
    <div className="max-w-[1600px] mx-auto w-full p-8 pb-32 space-y-12">
      
      {/* Editorial Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="max-w-xl">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block">Central Archive</span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-6 leading-none">Knowledge Hub</h1>
          <p className="text-base text-slate-500 font-medium leading-relaxed">
            The definitive clinical library for neonatal care. Access validated procedures, standard operating protocols, and life-saving guidance at the bedside.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative group flex-1 sm:w-80">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
             <input 
              type="text" 
              placeholder="Search library..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-slate-900 outline-none shadow-sm" 
             />
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-3 rounded-[2rem] border border-slate-200">
        {['All', 'Clinical', 'Critical', 'Daily Routine'].map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === filter ? 'bg-white text-slate-900 shadow-sm border border-slate-200 scale-[1.02]' : 'text-slate-500 hover:text-slate-900'}`}
          >
            {filter}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-3 pr-4">
           <Filter className="w-3.5 h-3.5 text-slate-400" />
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filter Archive</span>
        </div>
      </div>

      {/* Grid State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-40">
          <Activity className="w-10 h-10 text-primary animate-pulse mb-6" />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Synchronizing Data...</p>
        </div>
      ) : error ? (
        <div className="text-center py-32 rounded-[3rem] bg-rose-50 border border-rose-100 max-w-2xl mx-auto">
           <AlertTriangle className="w-16 h-16 text-rose-400 mx-auto mb-6" />
           <h3 className="text-xl font-bold text-rose-900 mb-2">{error}</h3>
           <p className="text-sm font-medium text-rose-600/70">Verify hospital network connectivity.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCards.map((card, i) => (
            <Flashcard key={card._id || i} {...card} />
          ))}
          {filteredCards.length === 0 && (
            <div className="col-span-full p-32 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center bg-slate-50/50 text-center">
               <div className="w-20 h-20 bg-white border border-slate-200 rounded-3xl flex items-center justify-center mb-8 shadow-sm">
                  <FileText className="w-10 h-10 text-slate-300" />
               </div>
               <h4 className="text-2xl font-black text-slate-900 mb-2">Archive Search Returned Null</h4>
               <p className="text-sm font-medium text-slate-500 max-w-sm leading-relaxed">No protocols matched your query. Try broadening your parameters or check the category filters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
