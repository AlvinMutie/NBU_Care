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
  Sparkles
} from 'lucide-react';

export default function NeoBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am NeoBot, your NBU Clinical Assistant. How can I help you today?' }
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

    // Simulate AI Response based on unit protocols
    setTimeout(() => {
      let response = "I'm analyzing your query based on current NBU protocols...";
      
      const lower = userMsg.toLowerCase();
      if (lower.includes('cpap')) response = "For CPAP, standard pressure is 5-8 cm H2O. Ensure FiO2 is adjusted to maintain saturations between 90-95%. Would you like to see the full protocol?";
      if (lower.includes('oxygen')) response = "Oxygen targets for preterm neonates are 90-94%. For term neonates, target 94-98%. Avoid hyperoxia to prevent ROP.";
      if (lower.includes('emergency') || lower.includes('help')) response = "If this is a clinical emergency, please alert the on-call team immediately. Helplines: Unit In-Charge (+254 700 000 000).";
      if (lower.includes('weight')) response = "Dosing depends on current weight. Ensure you have updated the weight in the Neonate Registry before using calculators.";

      setMessages(prev => [...prev, { role: 'bot', text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-[200] w-16 h-16 rounded-[24px] shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 ${
          isOpen ? 'bg-slate-900 rotate-90' : 'bg-primary shadow-primary/40'
        }`}
      >
        {isOpen ? <X className="w-8 h-8 text-white" /> : <Sparkles className="w-8 h-8 text-white" />}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-28 right-8 z-[200] w-[400px] max-w-[90vw] h-[600px] max-h-[70vh] bg-white rounded-[40px] shadow-3xl border border-slate-100 flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right ${
        isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-0 opacity-0 translate-y-10 pointer-events-none'
      }`}>
        {/* Header */}
        <div className="p-8 bg-slate-900 text-white flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                 <Bot className="w-7 h-7" />
              </div>
              <div>
                 <h3 className="font-black text-lg tracking-tight">NeoBot</h3>
                 <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Protocol Assistant</span>
                 </div>
              </div>
           </div>
           <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              <ChevronRight className="w-5 h-5 text-slate-400 rotate-90" />
           </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-slate-50/50">
           {messages.map((m, i) => (
             <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-3xl text-sm font-medium leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none shadow-lg shadow-primary/10' 
                    : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-sm'
                }`}>
                   {m.text}
                </div>
             </div>
           ))}
           {isTyping && (
             <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-2">
                   <Loader2 className="w-4 h-4 text-primary animate-spin" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">NeoBot is thinking...</span>
                </div>
             </div>
           )}
        </div>

        {/* Quick Tools & Helplines */}
        <div className="px-8 py-4 border-t border-slate-50 bg-white">
           <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {helplines.map(h => (
                <a 
                  key={h.name}
                  href={`tel:${h.phone}`}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 hover:border-primary transition-all group"
                >
                   <Phone className="w-3 h-3 text-slate-400 group-hover:text-primary" />
                   <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest whitespace-nowrap">{h.name}</span>
                </a>
              ))}
           </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-8 bg-white border-t border-slate-50">
           <div className="relative group">
              <input 
                type="text"
                placeholder="Ask about protocols..."
                className="w-full pl-6 pr-16 py-4 bg-slate-50 rounded-2xl border-transparent focus:bg-white focus:border-primary outline-none text-sm font-bold transition-all shadow-tiny"
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.05] transition-all active:scale-95"
              >
                 <Send className="w-5 h-5" />
              </button>
           </div>
        </form>
      </div>
    </>
  );
}
