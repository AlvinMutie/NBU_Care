import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  Phone, 
  Zap,
  Info,
  ChevronRight,
  Loader2,
  Sparkles,
  Database
} from 'lucide-react';

import { NEOBOT_KNOWLEDGE } from '../../services/neoBotKnowledge';

export default function NeoBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am NeoBot, your NBU Clinical Assistant. I am trained on your unit\'s protocols and can help you navigate the system. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const helplines = [
    { name: 'Unit In-Charge', phone: '+254 700 000 000' },
    { name: 'On-Call Pediatrician', phone: '+254 711 111 111' },
    { name: 'Laboratory', phone: 'Ext 102' }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI Response based on the Training Manual (NEOBOT_KNOWLEDGE)
    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let response = "I'm not quite sure about that protocol. Please consult the Unit In-Charge. You can also ask me about CPAP, Fluids, Sepsis, or how to navigate the system!";
      
      // Clinical Knowledge Retrieval
      if (lower.includes('cpap')) {
        const cpap = NEOBOT_KNOWLEDGE.clinical.respiratory.cpap;
        response = `CPAP Protocol: ${cpap.indication} Settings: ${cpap.settings} Targets: ${cpap.monitoring}`;
      } else if (lower.includes('oxygen')) {
        const oxy = NEOBOT_KNOWLEDGE.clinical.respiratory.oxygen;
        response = `Oxygen Targets: For preterms: ${oxy.preterm}. For term neonates: ${oxy.term}.`;
      } else if (lower.includes('gentamicin') || lower.includes('sepsis')) {
        const gent = NEOBOT_KNOWLEDGE.clinical.medications.gentamicin;
        response = `Sepsis/Gentamicin: ${gent.dose} ${gent.dilution} ${gent.safety}`;
      } else if (lower.includes('fluid')) {
        const f = NEOBOT_KNOWLEDGE.clinical.fluids.dailyRates;
        response = `Fluid Requirements: Day 1: ${f.day1}, Day 2: ${f.day2}, Day 3: ${f.day3}. Type: ${NEOBOT_KNOWLEDGE.clinical.fluids.fluidType}`;
      } else if (lower.includes('heart rate') || lower.includes('vital') || lower.includes('normal')) {
        const v = NEOBOT_KNOWLEDGE.clinical.vitals;
        response = `Normal Vitals: HR: ${v.heartRate}, RR: ${v.respRate}, Temp: ${v.temperature}.`;
      }
      
      // System Navigation Retrieval
      else if (lower.includes('add') || lower.includes('register')) {
        response = NEOBOT_KNOWLEDGE.system.navigation.add_neonate;
      } else if (lower.includes('verify') || lower.includes('admin')) {
        response = NEOBOT_KNOWLEDGE.system.navigation.verification;
      } else if (lower.includes('handover')) {
        response = NEOBOT_KNOWLEDGE.system.navigation.handover;
      } else if (lower.includes('calc')) {
        response = NEOBOT_KNOWLEDGE.system.navigation.drug_calculator;
      }

      // Add Disclaimer for clinical queries
      if (lower.includes('cpap') || lower.includes('gentamicin') || lower.includes('fluid') || lower.includes('sepsis')) {
        response += `\n\n${NEOBOT_KNOWLEDGE.personality.disclaimer}`;
      }

      setMessages(prev => [...prev, { role: 'bot', text: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-[200] w-16 h-16 md:w-20 md:h-20 rounded-[32px] shadow-3xl flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 overflow-hidden border-2 ${
          isOpen ? 'bg-slate-900 border-slate-800' : 'bg-white dark:bg-slate-900 border-primary/20 dark:border-primary/40 shadow-primary/30'
        }`}
        aria-label="Toggle Clinical AI"
      >
        {isOpen ? (
          <X className="w-8 h-8 md:w-10 md:h-10 text-white" />
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
             <div className="absolute inset-0 bg-primary/5 animate-pulse" />
             <Bot className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          </div>
        )}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-28 md:bottom-32 right-4 md:right-8 z-[200] w-[400px] max-w-[95vw] h-[600px] max-h-[75vh] bg-white dark:bg-slate-900 rounded-[40px] shadow-[0_32px_80px_rgba(0,0,0,0.2)] border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right ${
        isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-10 pointer-events-none'
      }`}>
        {/* Header */}
        <div className="p-6 md:p-8 bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between border-b border-white/5">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 border border-primary/20">
                 <Bot className="w-7 h-7" />
              </div>
              <div className="text-left">
                 <h3 className="font-black text-lg tracking-tight leading-none mb-1.5">NeoBot</h3>
                 <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Protocol Vault v4.2</span>
                 </div>
              </div>
           </div>
           <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              <X className="w-5 h-5 text-slate-400" />
           </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar bg-slate-50/30 dark:bg-slate-950/30 text-left">
           {messages.map((m, i) => (
             <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] p-5 rounded-3xl text-sm font-black leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none shadow-primary/10' 
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700 rounded-tl-none'
                }`}>
                   {m.text}
                </div>
             </div>
           ))}
           {isTyping && (
             <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-3">
                   <Loader2 className="w-4 h-4 text-primary animate-spin" />
                   <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Bot Intelligence active...</span>
                </div>
             </div>
           )}
        </div>

        {/* Quick Tools & Helplines */}
        <div className="px-6 md:px-8 py-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
           <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
              {helplines.map(h => (
                <a 
                  key={h.name}
                  href={`tel:${h.phone}`}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all group"
                >
                   <Phone className="w-3 h-3 text-slate-400 group-hover:text-primary transition-colors" />
                   <span className="text-[9px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest whitespace-nowrap">{h.name}</span>
                </a>
              ))}
           </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-6 md:p-8 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
           <div className="relative group">
              <input 
                type="text"
                placeholder="Query protocols or navigation..."
                className="w-full pl-6 pr-16 py-4 bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:bg-white dark:focus:bg-slate-950 focus:border-primary outline-none text-sm font-black transition-all shadow-inner text-slate-900 dark:text-white rounded-2xl"
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.05] transition-all active:scale-95 border border-white/20"
              >
                 <Send className="w-5 h-5" />
              </button>
           </div>
           <div className="mt-4 flex items-center justify-center gap-2 opacity-30">
              <ShieldCheck className="w-3 h-3 text-slate-400" />
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest text-center leading-none">Standard Unit Safety Protocol Active</span>
           </div>
        </form>
      </div>
    </>
  );
}
