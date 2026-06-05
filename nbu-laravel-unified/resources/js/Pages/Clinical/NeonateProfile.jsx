import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { 
  Baby, Thermometer, Droplets, Activity, Heart, 
  Clipboard, User, ShieldAlert, History, FlaskConical, 
  Stethoscope, Pill, ChevronRight, Save, Plus, Clock, 
  AlertCircle, CheckCircle2, BadgeCheck
} from 'lucide-react';

export default function NeonateProfile({ auth, neonate, age }) {
  const [activeTab, setActiveTab] = useState('overview'); // overview, maternal, vitals, investigation, treatment, notes

  // Form for recording vitals
  const { data: vitalData, setData: setVitalData, post: postVital, processing: processingVital, reset: resetVital } = useForm({
    temperature: '',
    heart_rate: '',
    respiratory_rate: '',
    oxygen_saturation: '',
    blood_sugar: '',
    measured_at: new Date().toISOString().slice(0, 16),
  });

  const submitVital = (e) => {
    e.preventDefault();
    postVital(route('neonates.vitals.store', neonate.id), {
      onSuccess: () => resetVital(),
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-black text-xl text-gray-800 dark:text-gray-200 leading-tight">Neonatal Clinical Profile: {neonate.name}</h2>}
    >
      <Head title={`Profile - ${neonate.name}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
          
          {/* Clinical HUD (Top Bar) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-[32px] border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/10">
                <Baby className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">Corrected Age</span>
                <span className="text-xl font-black text-gray-900 dark:text-white">{age}</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-[32px] border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center border border-emerald-500/10">
                <Thermometer className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">Last Temp</span>
                <span className="text-xl font-black text-emerald-600">{neonate.vitals[0]?.temperature || '--'} °C</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-[32px] border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center border border-rose-500/10">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">Last SPO₂</span>
                <span className="text-xl font-black text-rose-600">{neonate.vitals[0]?.oxygen_saturation || '--'} %</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-[32px] border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center border border-amber-500/10">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">Active Alerts</span>
                <span className="text-xl font-black text-amber-600">{neonate.alerts.length} Critical</span>
              </div>
            </div>
          </div>

          {/* Profile Navigation Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {[
              { id: 'overview', name: 'Clinical Overview', icon: Stethoscope },
              { id: 'maternal', name: 'Maternal History', icon: History },
              { id: 'vitals', name: 'Vitals Monitoring', icon: Activity },
              { id: 'investigation', name: 'Investigations', icon: FlaskConical },
              { id: 'treatment', name: 'Treatment Plan', icon: Pill },
              { id: 'notes', name: 'Clinical Notes', icon: Clipboard },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition whitespace-nowrap border ${
                  activeTab === tab.id 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20' 
                    : 'bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-100 dark:border-gray-700 hover:border-indigo-500/50 hover:text-indigo-500'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-6">
              {activeTab === 'overview' && (
                <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] border border-gray-100 dark:border-gray-700 shadow-sm space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Current Clinical Status</h3>
                    <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10 rounded-full text-[10px] font-black uppercase tracking-widest">Stable</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Primary Diagnosis</span>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{neonate.admission_diagnosis || 'Awaiting Assessment'}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Gestational Age</span>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{neonate.gestational_age} Weeks</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Birth Weight</span>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{neonate.birth_weight} kg</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mode of Delivery</span>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{neonate.delivery_method || 'N/A'}</p>
                    </div>
                  </div>

                  <hr className="border-gray-50 dark:border-gray-700" />

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Treatment Summary</h4>
                    <div className="space-y-2">
                      {neonate.treatments.map((t) => (
                        <div key={t.id} className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm">
                              <Pill className="w-4 h-4 text-indigo-500" />
                            </div>
                            <div>
                              <span className="text-xs font-black text-gray-900 dark:text-white">{t.item_name}</span>
                              <span className="text-[10px] text-gray-500 dark:text-gray-400 block font-bold uppercase">{t.calculated_dose} • {t.frequency}</span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'vitals' && (
                <div className="space-y-6">
                  {/* Record New Vitals Form */}
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] border border-gray-100 dark:border-gray-700 shadow-sm">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight mb-6">Record Vital Signs</h3>
                    <form onSubmit={submitVital} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Temperature (°C)</label>
                        <input 
                          type="number" step="0.1" 
                          className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl outline-none text-sm font-bold"
                          value={vitalData.temperature}
                          onChange={e => setVitalData('temperature', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Heart Rate (bpm)</label>
                        <input 
                          type="number" 
                          className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl outline-none text-sm font-bold"
                          value={vitalData.heart_rate}
                          onChange={e => setVitalData('heart_rate', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Respiratory Rate (cpm)</label>
                        <input 
                          type="number" 
                          className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl outline-none text-sm font-bold"
                          value={vitalData.respiratory_rate}
                          onChange={e => setVitalData('respiratory_rate', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Oxygen Saturation (%)</label>
                        <input 
                          type="number" 
                          className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl outline-none text-sm font-bold"
                          value={vitalData.oxygen_saturation}
                          onChange={e => setVitalData('oxygen_saturation', e.target.value)}
                        />
                      </div>
                      <button 
                        type="submit" disabled={processingVital}
                        className="md:col-span-2 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
                      >
                        <Save className="w-5 h-5" />
                        Save Vital Signs
                      </button>
                    </form>
                  </div>

                  {/* Vitals History Table */}
                  <div className="bg-white dark:bg-gray-800 rounded-[40px] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 dark:bg-gray-900/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <tr>
                          <th className="p-6">Timestamp</th>
                          <th className="p-6 text-center">Temp</th>
                          <th className="p-6 text-center">HR</th>
                          <th className="p-6 text-center">RR</th>
                          <th className="p-6 text-center">SPO₂</th>
                          <th className="p-6 text-center">Sugar</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs font-bold divide-y divide-gray-50 dark:divide-gray-800">
                        {neonate.vitals.map(v => (
                          <tr key={v.id}>
                            <td className="p-6 text-gray-400">{new Date(v.measured_at).toLocaleString([], {month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</td>
                            <td className="p-6 text-center">{v.temperature}°C</td>
                            <td className="p-6 text-center">{v.heart_rate}</td>
                            <td className="p-6 text-center">{v.respiratory_rate}</td>
                            <td className="p-6 text-center font-black text-rose-600">{v.oxygen_saturation}%</td>
                            <td className="p-6 text-center">{v.blood_sugar}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Alerts & Identity */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-[40px] border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-3xl flex items-center justify-center border border-slate-200 dark:border-slate-800 text-2xl">
                    👶
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white leading-tight">{neonate.name}</h2>
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{neonate.hospital_number}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" />
                    Safety Surveillance
                  </h4>
                  <div className="space-y-2">
                    {neonate.alerts.length === 0 ? (
                      <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        No Clinical Violations
                      </div>
                    ) : (
                      neonate.alerts.map(a => (
                        <div key={a.id} className="p-4 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 border border-rose-500/10 rounded-2xl space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-widest block">{a.type} • {a.severity}</span>
                          <p className="text-[11px] font-bold leading-normal">{a.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
