import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, Heart, Thermometer, Droplets, 
  Activity, Baby, History, Stethoscope, Microscope, Pill, FileText,
  TrendingUp, Calendar, Clock, MapPin, Scale, ShieldCheck, AlertCircle, Info, Zap,
  Wind, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../services/api';

const NeonateProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('biodata');
  const [neonate, setNeonate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNeonateProfile();
  }, [id]);

  const fetchNeonateProfile = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/neonates/${id}`);
      setNeonate(response.data.data);
    } catch (err) {
      setError('Neonate profile not found or server unreachable.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 border-4 border-emerald-50 dark:border-emerald-950 border-t-emerald-600 rounded-full animate-spin" />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Retrieving Clinical Record...</p>
      </div>
    );
  }

  if (error || !neonate) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center space-y-6 text-center px-4 text-[var(--text-main)]">
        <div className="w-20 h-20 bg-rose-50 dark:bg-rose-950 text-rose-500 rounded-[2.5rem] flex items-center justify-center shadow-inner">
          <Baby size={40} />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Profile Access Failed</h3>
          <p className="text-slate-500 max-w-sm mx-auto mt-2 font-medium">{error || 'The requested clinical record could not be localized.'}</p>
        </div>
        <Link to="/neonates" className="px-8 py-3 bg-slate-900 dark:bg-emerald-600 text-white rounded-2xl font-bold text-sm shadow-xl active:scale-95 transition-all flex items-center space-x-3">
          <ChevronLeft size={18} />
          <span>Return to Registry</span>
        </Link>
      </div>
    );
  }

  // Display Mapping Logic
  const displayData = {
    bio: {
      name: neonate.name,
      hospitalNumber: neonate.hospital_number,
      status: neonate.status || 'Stable',
      gender: neonate.gender,
      dob: new Date(neonate.dob).toLocaleDateString(),
      tob: '08:45 AM', 
      age: '4 Days', 
      gestationalAge: `${neonate.gestational_age} Weeks`,
      birthWeight: neonate.birth_weight,
      currentWeight: neonate.current_weight,
      weightChange: '+120g',
      deliveryMethod: 'Emergency C-Section',
      apgar: { 1: 7, 5: 9, 10: 10 },
      location: { unit: 'NICU A', room: 'Bed 04', bed: 'B04' },
      consultant: 'Dr. Angela Omwansa',
      manager: 'Teresa Njoroge',
      assignedNurse: 'Patrick Kamau'
    },
    maternal: {
      name: 'Mary Jane Senior',
      hospitalNumber: 'M-992-01',
      age: 28,
      contact: '+254 712 345 678',
      medical: { bloodGroup: 'O+', hiv: 'Negative', rhesus: 'Positive' },
      obstetric: { gravidity: 2, parity: 1, preterm: 'Yes (1)' },
      antenatal: { ancAttendance: '4 Visits', complications: 'Pre-eclampsia', steroids: 'Complete' }
    },
    assessment: {
      neurological: { tone: 'Normal', seizures: 'None', cry: 'Strong' },
      respiratory: { rate: 62, grunting: 'None', flaring: 'None', retractions: 'Mild' },
      cardiovascular: { hr: 142, perfusion: '< 2s', pulses: 'Normal' },
      gastrointestinal: { tolerance: 'Good', distension: 'None', bowelSounds: 'Active' },
      skin: { color: 'Pink', integrity: 'Intact', lesions: 'None' }
    },
    investigations: {
      labs: {
        fbc: { hb: 14.2, wbc: 11.2, platelets: 245 },
        infection: { crp: 4.2 },
        sugar: 3.8,
        bilirubin: 120,
        kft: { sodium: 138, creatinine: 45 },
        lft: { albumin: 32 }
      },
      imaging: {
        cxr: 'Lung expansion normal. No opacities.',
        echo: 'Normal cardiac anatomy.',
        ultrasound: 'Grade I IVH (Resolving).'
      }
    }
  };

  const tabs = [
    { id: 'biodata', name: 'Identity & Bio', icon: Baby },
    ...(isStudent ? [{ id: 'calculations', name: 'Guided Calculations', icon: Calculator }] : []),
    { id: 'maternal', name: 'Maternal History', icon: History },
    { id: 'assessment', name: 'Clinical Evaluation', icon: Stethoscope },
    { id: 'investigations', name: 'Labs & Imaging', icon: Microscope },
    { id: 'monitoring', name: 'Vital Orchestration', icon: Activity },
    { id: 'treatment', name: 'Therapeutic Plan', icon: Pill },
    { id: 'notes', name: 'Clinical Timeline', icon: FileText },
    { id: 'discharge', name: 'Discharge Portal', icon: ShieldCheck },
  ];

  const vitalsHistory = [
    { time: '08:00', hr: 142, spo2: 95 },
    { time: '10:00', hr: 145, spo2: 96 },
    { time: '12:00', hr: 138, spo2: 94 },
    { time: '14:00', hr: 140, spo2: 95 },
    { time: '16:00', hr: 148, spo2: 97 },
    { time: '18:00', hr: 142, spo2: 95 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-28 text-[var(--text-main)]">
      {/* Structural Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <Link to="/neonates" className="p-3 bg-[var(--card-bg)] border border-[var(--border-main)] rounded-2xl text-slate-400 hover:text-emerald-600 transition-all shadow-sm">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex items-center space-x-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold border-2 ${displayData.bio.gender === 'Female' ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800 text-rose-600' : 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800 text-blue-600'}`}>
              {displayData.bio.name.split(' ').map((n: any) => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{displayData.bio.name}</h2>
              <p className="text-sm text-slate-500 font-medium">Hospital ID: <span className="font-mono text-emerald-600 font-bold">{displayData.bio.hospitalNumber}</span></p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 flex items-center space-x-2">
            <AlertCircle size={16} className="text-rose-600" />
            <span className="text-xs font-bold text-rose-700 dark:text-rose-300 uppercase tracking-widest">{displayData.bio.status} STATUS</span>
          </div>
          <button className="bg-slate-900 dark:bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-slate-200 dark:shadow-none active:scale-95 transition-all">
            Update Admission
          </button>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-main)] p-1.5 rounded-2xl flex items-center overflow-x-auto no-scrollbar shadow-sm sticky top-0 z-30">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center space-x-2.5 px-6 py-2.5 rounded-xl transition-all whitespace-nowrap text-sm font-bold tracking-tight
              ${activeTab === tab.id ? 'bg-emerald-600 text-white shadow-md shadow-emerald-100' : 'text-slate-400 hover:bg-[var(--bg-main)] hover:text-slate-600 dark:hover:text-slate-300'}
            `}
          >
            <tab.icon size={18} />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[600px]">
        <AnimatePresence mode="wait">
          {activeTab === 'calculations' && isStudent && (
            <motion.div key="calculations" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               <div className="lg:col-span-8 space-y-8">
                  <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[3rem] p-10 shadow-sm space-y-10">
                     <div className="space-y-2">
                        <h3 className="text-2xl font-bold tracking-tight">Clinical Fluid Calculation</h3>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">Guide for determining Total Fluid Intake (TFI) and hourly infusion rates.</p>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                           <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-[var(--border-main)]">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Step 1: Determine TFI Goal</p>
                              <div className="space-y-4">
                                 <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold">Weight (kg)</span>
                                    <span className="text-sm font-black">{neonate.current_weight}</span>
                                 </div>
                                 <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold">TFI Rate (ml/kg/day)</span>
                                    <input type="number" defaultValue="80" className="w-20 bg-white dark:bg-slate-900 border border-[var(--border-main)] p-2 rounded-lg text-right text-xs font-bold" />
                                 </div>
                              </div>
                           </div>
                           
                           <div className="p-6 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4">Mathematical Formula</p>
                              <div className="font-mono text-sm space-y-2">
                                 <p className="text-emerald-700 dark:text-emerald-400 font-bold">Total Daily Fluid = Weight × TFI</p>
                                 <p className="text-slate-400">Example: {neonate.current_weight}kg × 80ml = {(neonate.current_weight * 80).toFixed(1)} ml/day</p>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-6">
                           <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800">
                              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Step 2: Hourly Rate</p>
                              <div className="font-mono text-sm space-y-2">
                                 <p className="text-blue-700 dark:text-blue-400 font-bold">Hourly Rate = Total Daily / 24</p>
                                 <p className="text-slate-400">Example: {(neonate.current_weight * 80).toFixed(1)}ml / 24h = {((neonate.current_weight * 80) / 24).toFixed(1)} ml/h</p>
                              </div>
                           </div>

                           <button className="w-full py-4 bg-slate-900 dark:bg-emerald-600 text-white rounded-2xl font-bold uppercase text-[11px] tracking-widest hover:bg-black transition-all shadow-xl">
                              Verify Calculation Accuracy
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="lg:col-span-4 space-y-8">
                  <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-6">
                     <div className="flex items-center space-x-3 text-emerald-400">
                        <Zap size={20} />
                        <h4 className="text-[11px] font-black uppercase tracking-widest">Protocol Guidance</h4>
                     </div>
                     <ul className="space-y-4">
                        {[
                          'Day 1 TFI: 60-80 ml/kg/day',
                          'Day 2 TFI: 80-100 ml/kg/day',
                          'Extreme Preterms may need higher rates',
                          'Monitor urine output (Target 1-3 ml/kg/h)'
                        ].map((rule, i) => (
                          <li key={i} className="flex items-start space-x-3 text-xs font-medium text-slate-400 leading-relaxed">
                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                             <span>{rule}</span>
                          </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'biodata' && (
            <motion.div key="biodata" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2rem] p-8 shadow-sm space-y-8">
                  <div className="flex items-center space-x-3 text-emerald-600 border-b border-[var(--border-main)] pb-6">
                     <Baby size={20} />
                     <h3 className="text-lg font-bold tracking-tight uppercase tracking-widest text-[11px]">Core Identification</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                      { label: 'Date of Birth', val: displayData.bio.dob, icon: Calendar },
                      { label: 'Time of Birth', val: displayData.bio.tob, icon: Clock },
                      { label: 'Age', val: displayData.bio.age, icon: TrendingUp },
                      { label: 'Gestational Age', val: displayData.bio.gestationalAge, icon: Info },
                      { label: 'Birth Weight', val: `${displayData.bio.birthWeight} kg`, icon: Scale },
                      { label: 'Current Weight', val: `${displayData.bio.currentWeight} kg`, icon: TrendingUp },
                      { label: 'Weight Change', val: displayData.bio.weightChange, icon: Activity },
                      { label: 'Delivery Mode', val: displayData.bio.deliveryMethod, icon: MapPin },
                    ].map(item => (
                      <div key={item.label} className="space-y-1.5">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                        <p className="text-sm font-bold">{item.val}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2rem] p-8 shadow-sm space-y-8">
                   <div className="flex items-center space-x-3 text-blue-600 border-b border-[var(--border-main)] pb-6">
                      <Users size={20} />
                      <h3 className="text-lg font-bold tracking-tight uppercase tracking-widest text-[11px]">Clinical Assignment</h3>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Lead Consultant</p>
                         <p className="text-sm font-bold">{displayData.bio.consultant}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nursing Lead</p>
                         <p className="text-sm font-bold">{displayData.bio.manager}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Primary Nurse</p>
                         <p className="text-sm font-bold">{displayData.bio.assignedNurse}</p>
                      </div>
                   </div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-emerald-100 dark:shadow-none space-y-6">
                   <p className="text-[10px] font-bold text-emerald-200 uppercase tracking-[0.3em]">APGAR Scores</p>
                   <div className="grid grid-cols-3 gap-4 text-center">
                      {[1, 5, 10].map(m => (
                        <div key={m} className="space-y-1">
                          <p className="text-3xl font-black">{displayData.bio.apgar[m as keyof typeof displayData.bio.apgar]}</p>
                          <p className="text-[9px] font-bold text-emerald-200 uppercase">{m} Min</p>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-6">
                   <div className="flex justify-between items-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Location</p>
                      <MapPin size={16} className="text-emerald-500" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-2xl font-black">{displayData.bio.location.unit}</p>
                      <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">{displayData.bio.location.room} • {displayData.bio.location.bed}</p>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'maternal' && (
            <motion.div key="maternal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 space-y-8">
                  <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2rem] p-8 shadow-sm space-y-8">
                     <div className="flex items-center space-x-3 text-rose-600 border-b border-[var(--border-main)] pb-6">
                        <History size={20} />
                        <h3 className="text-lg font-bold tracking-tight uppercase tracking-widest text-[11px]">Maternal Overview</h3>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                           <div className="space-y-1">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</p>
                              <p className="text-lg font-bold">{displayData.maternal.name}</p>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Age</p>
                                 <p className="text-sm font-bold">{displayData.maternal.age} Years</p>
                              </div>
                              <div className="space-y-1">
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hospital No.</p>
                                 <p className="text-sm font-bold font-mono">{displayData.maternal.hospitalNumber}</p>
                              </div>
                           </div>
                        </div>
                        <div className="p-6 bg-[var(--bg-main)] rounded-2xl border border-[var(--border-main)] space-y-4">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Blood & Serology</p>
                           <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">Blood Group</span>
                              <span className="text-sm font-black text-rose-600">{displayData.maternal.medical.bloodGroup}</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">HIV Status</span>
                              <span className="text-sm font-black text-emerald-600">{displayData.maternal.medical.hiv}</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">Rhesus</span>
                              <span className="text-sm font-black">{displayData.maternal.medical.rhesus}</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2rem] p-8 shadow-sm space-y-8">
                     <div className="flex items-center space-x-3 text-slate-900 dark:text-white border-b border-[var(--border-main)] pb-6">
                        <Stethoscope size={20} />
                        <h3 className="text-lg font-bold tracking-tight uppercase tracking-widest text-[11px]">Obstetric & Antenatal History</h3>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-1">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Parity</p>
                           <p className="text-sm font-bold">{displayData.maternal.obstetric.parity}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gravidity</p>
                           <p className="text-sm font-bold">{displayData.maternal.obstetric.gravidity}</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Preterm History</p>
                           <p className="text-sm font-bold">{displayData.maternal.obstetric.preterm}</p>
                        </div>
                     </div>
                     <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4">
                        <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Pregnancy Complications</p>
                        <div className="flex items-center space-x-4">
                           <AlertCircle className="text-rose-400" size={20} />
                           <p className="text-lg font-bold tracking-tight">{displayData.maternal.antenatal.complications}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'assessment' && (
            <motion.div key="assessment" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { title: 'Neurological', icon: Zap, data: displayData.assessment.neurological, color: 'text-amber-500' },
                    { title: 'Respiratory', icon: Wind, data: displayData.assessment.respiratory, color: 'text-blue-500' },
                    { title: 'Cardiovascular', icon: Heart, data: displayData.assessment.cardiovascular, color: 'text-rose-500' },
                    { title: 'Gastrointestinal', icon: Activity, data: displayData.assessment.gastrointestinal, color: 'text-emerald-500' },
                    { title: 'Skin & Integumentary', icon: ShieldCheck, data: displayData.assessment.skin, color: 'text-slate-500' },
                  ].map(section => (
                    <div key={section.title} className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2rem] p-8 shadow-sm space-y-6">
                       <div className="flex items-center justify-between border-b border-[var(--border-main)] pb-4">
                          <h4 className="text-[11px] font-black uppercase tracking-widest">{section.title}</h4>
                          <section.icon className={section.color} size={18} />
                       </div>
                       <div className="space-y-4">
                          {Object.entries(section.data).map(([key, val]) => (
                            <div key={key} className="flex justify-between items-center">
                               <span className="text-xs font-bold text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                               <span className="text-xs font-black">{val as string}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                  ))}
               </div>
            </motion.div>
          )}

          {activeTab === 'investigations' && (
            <motion.div key="investigations" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               <div className="lg:col-span-8 space-y-8">
                  <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2rem] p-8 shadow-sm space-y-8">
                     <div className="flex items-center space-x-3 text-blue-600 border-b border-[var(--border-main)] pb-6">
                        <Microscope size={20} />
                        <h3 className="text-lg font-bold tracking-tight uppercase tracking-widest text-[11px]">Laboratory Diagnostics</h3>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-l-2 border-emerald-500 pl-3">Full Blood Count</p>
                           <div className="space-y-4">
                              <div className="flex justify-between">
                                 <span className="text-sm font-medium">Hemoglobin (Hb)</span>
                                 <span className="text-sm font-black">{displayData.investigations.labs.fbc.hb} g/dL</span>
                              </div>
                              <div className="flex justify-between">
                                 <span className="text-sm font-medium">WBC Count</span>
                                 <span className="text-sm font-black">{displayData.investigations.labs.fbc.wbc} x10⁹/L</span>
                              </div>
                              <div className="flex justify-between">
                                 <span className="text-sm font-medium">Platelets</span>
                                 <span className="text-sm font-black">{displayData.investigations.labs.fbc.platelets} x10⁹/L</span>
                              </div>
                           </div>
                        </div>
                        <div className="space-y-6">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-l-2 border-rose-500 pl-3">Biochemistry & Sepsis</p>
                           <div className="space-y-4">
                              <div className="flex justify-between">
                                 <span className="text-sm font-medium">C-Reactive Protein</span>
                                 <span className="text-sm font-black text-rose-600">{displayData.investigations.labs.infection.crp} mg/L</span>
                              </div>
                              <div className="flex justify-between">
                                 <span className="text-sm font-medium">Blood Glucose</span>
                                 <span className="text-sm font-black">{displayData.investigations.labs.sugar} mmol/L</span>
                              </div>
                              <div className="flex justify-between">
                                 <span className="text-sm font-medium">Total Bilirubin</span>
                                 <span className="text-sm font-black text-amber-600">{displayData.investigations.labs.bilirubin} μmol/L</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="lg:col-span-4 space-y-8">
                  <div className="bg-slate-900 rounded-[2rem] p-8 text-white space-y-8">
                     <h4 className="text-[11px] font-black text-emerald-400 uppercase tracking-widest">Imaging Reports</h4>
                     <div className="space-y-6">
                        <div className="space-y-2">
                           <p className="text-[10px] font-bold text-slate-500 uppercase">Chest X-Ray</p>
                           <p className="text-sm leading-relaxed">{displayData.investigations.imaging.cxr}</p>
                        </div>
                        <div className="h-px bg-white/10" />
                        <div className="space-y-2">
                           <p className="text-[10px] font-bold text-slate-500 uppercase">Cranial Ultrasound</p>
                           <p className="text-sm leading-relaxed">{displayData.investigations.imaging.ultrasound}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'monitoring' && (
            <motion.div key="monitoring" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: 'SpO2', value: '95%', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Heart Rate', value: '142 bpm', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
                    { label: 'Temp', value: '36.8°C', icon: Thermometer, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Resp Rate', value: '62 bpm', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  ].map(stat => (
                    <div key={stat.label} className="bg-[var(--card-bg)] border border-[var(--border-main)] p-6 rounded-3xl shadow-sm flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-2xl font-black">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-2xl ${stat.bg} dark:bg-slate-800 ${stat.color}`}>
                         <stat.icon size={20} />
                      </div>
                    </div>
                  ))}
               </div>
               <div className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2.5rem] p-8 shadow-sm">
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={vitalsHistory}>
                        <defs>
                          <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-main)" vertical={false} />
                        <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                        <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-main)', borderRadius: '16px', color: 'var(--text-main)' }} />
                        <Area type="monotone" dataKey="hr" stroke="#ef4444" fillOpacity={1} fill="url(#colorTrend)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'notes' && (
             <motion.div key="notes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
               <div className="lg:col-span-8 space-y-6">
                  {neonate.handovers?.map((h: any, idx: number) => (
                    <div key={idx} className="bg-[var(--card-bg)] border border-[var(--border-main)] rounded-[2rem] p-8 shadow-sm space-y-4 hover:border-emerald-200 transition-all group">
                       <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-4">
                             <div className="w-10 h-10 rounded-xl bg-[var(--bg-main)] flex items-center justify-center text-slate-400 font-black text-xs border border-[var(--border-main)]">
                                {h.clinician_name?.split(' ').map((n: any) => n[0]).join('') || '??'}
                             </div>
                             <div>
                                <p className="text-sm font-bold group-hover:text-emerald-600 transition-colors">{h.clinician_name || 'Clinician'}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Handover Report</p>
                             </div>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">{new Date(h.created_at).toLocaleTimeString()}</span>
                       </div>
                       <p className="text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium pl-14">
                          "{h.report_summary || h.clinical_commentary || 'No commentary provided.'}"
                       </p>
                    </div>
                  ))}
               </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NeonateProfile;
