import React, { useState } from 'react';
import { 
  ClipboardList, Clock, CheckCircle2, 
  AlertCircle, ChevronRight, User, 
  Search, Filter, Plus, FileText, 
  Activity, Thermometer, Droplets
} from 'lucide-react';

export default function Handovers({ user }) {
  const [activeTab, setActiveTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');

  const handovers = [
    {
      id: 1,
      patient: "Baby Jane Doe",
      bed: "Bed 04",
      status: "critical",
      shift: "Day Shift",
      sender: "Nurse Sarah K.",
      time: "14:20",
      vitals: { temp: "36.8°C", hr: "142 bpm", spo2: "96%" },
      summary: "Patient stable but requires frequent monitoring of feeding tolerance. Dosing adjusted at 12:00.",
      tasks: [
        { t: "Check vitals every 2 hours", c: true },
        { t: "Enteral feeding at 16:00", c: false },
        { t: "Phototherapy check", c: false }
      ]
    },
    {
      id: 2,
      patient: "Baby John Smith",
      bed: "Bed 12",
      status: "stable",
      shift: "Day Shift",
      sender: "Nurse Sarah K.",
      time: "14:15",
      vitals: { temp: "37.1°C", hr: "138 bpm", spo2: "98%" },
      summary: "Ready for transition to intermediate care. Oxygen support removed at 10:00.",
      tasks: [
        { t: "Prepare discharge summary", c: false },
        { t: "Weight check", c: true }
      ]
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Shift Handovers</h2>
          <p className="text-slate-500 font-medium">Coordinate care transitions with surgical precision.</p>
        </div>
        <button className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
          <Plus className="w-5 h-5" /> New Handover
        </button>
      </div>

      {/* Stats Quick View */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-tiny flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">14</span>
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Active Handovers</p>
          </div>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-tiny flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">3</span>
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Critical Updates</p>
          </div>
        </div>
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-tiny flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">100%</span>
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Completion Rate</p>
          </div>
        </div>
      </div>

      {/* Search & Tabs */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50 p-4 rounded-3xl border border-slate-200">
        <div className="flex items-center gap-2">
          {['active', 'completed', 'archived'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-900'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search patients..." 
            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Handover Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        {handovers.map(h => (
          <div key={h.id} className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-tiny hover:shadow-xl transition-all group overflow-hidden relative">
            {h.status === 'critical' && <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />}
            
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${h.status === 'critical' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
                  <User className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 leading-none">{h.patient}</h3>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 block">{h.bed} • {h.status}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest block">{h.time}</span>
                <span className="text-[10px] font-bold text-primary mt-1 block">{h.sender}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center">
                <Thermometer className="w-4 h-4 text-slate-400 mb-1" />
                <span className="text-xs font-bold text-slate-900">{h.vitals.temp}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center">
                <Activity className="w-4 h-4 text-slate-400 mb-1" />
                <span className="text-xs font-bold text-slate-900">{h.vitals.hr}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center">
                <Droplets className="w-4 h-4 text-slate-400 mb-1" />
                <span className="text-xs font-bold text-slate-900">{h.vitals.spo2}</span>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Clinical Summary</h4>
              <p className="text-sm text-slate-600 leading-relaxed font-medium bg-slate-50/50 p-4 rounded-2xl italic border border-slate-100">
                "{h.summary}"
              </p>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Pending Tasks</h4>
              <div className="space-y-2">
                {h.tasks.map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 group/item hover:bg-slate-50 transition-colors">
                    <span className={`text-xs font-medium ${t.c ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{t.t}</span>
                    {t.c ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-200" />}
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 group-hover:bg-primary transition-all">
              Accept Handover <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
