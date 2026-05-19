import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { 
  Baby, Droplets, Activity, Zap, 
  ShieldCheck, Info, CheckCircle2,
  AlertTriangle, UserCheck, ChevronRight,
  ChevronLeft, Search, Loader2, Scale,
  Pill, ClipboardCheck, X, Check, Plus, Calendar, Phone,
  ArrowRightLeft, Thermometer, Heart, ShieldAlert, Users, Clock, User
} from 'lucide-react';

export default function Dashboard({ auth, initialNeonates, initialAuditLogs, initialHandovers = [], initialRotas = [], allUsers = [] }) {
  const [activeTab, setActiveTab] = useState('registry'); // 'registry', 'calculator', 'audit', 'handovers', 'rota'
  const [neonates, setNeonates] = useState(initialNeonates || []);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs || []);
  const [handovers, setHandovers] = useState(initialHandovers || []);
  const [rotas, setRotas] = useState(initialRotas || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHandoverModalOpen, setIsHandoverModalOpen] = useState(false);
  const [isRotaModalOpen, setIsRotaModalOpen] = useState(false);

  // Sync props when Inertia updates database state in the background
  useEffect(() => {
    setNeonates(initialNeonates || []);
  }, [initialNeonates]);

  useEffect(() => {
    setAuditLogs(initialAuditLogs || []);
  }, [initialAuditLogs]);

  useEffect(() => {
    setHandovers(initialHandovers || []);
  }, [initialHandovers]);

  useEffect(() => {
    setRotas(initialRotas || []);
  }, [initialRotas]);

  // Neonate Admission Form Hook
  const { data: neonateData, setData: setNeonateData, post: postNeonate, processing: neonateProcessing, errors: neonateErrors, reset: resetNeonate } = useForm({
    hospitalNumber: '',
    name: '',
    dob: '',
    gender: 'Male',
    birthWeight: '',
    currentWeight: '',
    gestationalAge: '',
    admissionDiagnosis: '',
    history: '',
    motherPhone: '',
  });

  // Handovers Form Hook
  const { data: handoverData, setData: setHandoverData, post: postHandover, processing: handoverProcessing, errors: handoverErrors, reset: resetHandover } = useForm({
    neonateId: '',
    shift: 'Morning',
    temperature: '',
    sugarLevel: '',
    oxygenSaturation: '',
    heartRate: '',
    respiratoryRate: '',
    commentary: '',
    liver: '',
    kidney: '',
    fbc: '',
    plan: '',
    clinicalLeadId: '',
  });

  // Duty Rota Form Hook
  const { data: rotaData, setData: setRotaData, post: postRota, processing: rotaProcessing, errors: rotaErrors, reset: resetRota } = useForm({
    date: new Date().toISOString().split('T')[0],
    shift: 'Morning',
    consultantId: '',
    managerId: '',
    assignedNurses: [],
  });

  // Pipeline/Calculator State
  const [calcStep, setCalcStep] = useState(1);
  const [selectedNeonate, setSelectedNeonate] = useState(null);
  const [currentWeight, setCurrentWeight] = useState('');
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [calcData, setCalcData] = useState({
    doseMgKg: '',
    stockMg: '',
    stockMl: ''
  });
  const [calcResult, setCalcResult] = useState(null);
  const [logStatus, setLogStatus] = useState(false);

  const drugs = [
    { name: 'Ampicillin', defaultDose: 50, unit: 'mg/kg', frequency: 'q12h' },
    { name: 'Gentamicin', defaultDose: 5, unit: 'mg/kg', frequency: 'q24h' },
    { name: 'Cefotaxime', defaultDose: 50, unit: 'mg/kg', frequency: 'q8h' },
    { name: 'Dopamine', defaultDose: 5, unit: 'mcg/kg/min', frequency: 'continuous' }
  ];

  // Auto-calculation loop
  useEffect(() => {
    if (calcData.doseMgKg && currentWeight && calcData.stockMg && calcData.stockMl) {
      const mgNeeded = parseFloat(calcData.doseMgKg) * parseFloat(currentWeight);
      const mlToDraw = (mgNeeded / parseFloat(calcData.stockMg)) * parseFloat(calcData.stockMl);
      setCalcResult({ mg: mgNeeded.toFixed(2), ml: mlToDraw.toFixed(2) });
    } else {
      setCalcResult(null);
    }
  }, [calcData, currentWeight]);

  const handleSaveNeonate = (e) => {
    e.preventDefault();
    postNeonate('/neonates', {
      onSuccess: () => {
        setIsModalOpen(false);
        resetNeonate();
      }
    });
  };

  const handleSaveHandover = (e) => {
    e.preventDefault();
    postHandover('/handovers', {
      onSuccess: () => {
        setIsHandoverModalOpen(false);
        resetHandover();
      }
    });
  };

  const handleSaveRota = (e) => {
    e.preventDefault();
    postRota('/rotas', {
      onSuccess: () => {
        setIsRotaModalOpen(false);
        resetRota();
      }
    });
  };

  const handleLogMedication = () => {
    router.post('/audit-logs', {
      action: `MEDICATION CALCULATED: ${selectedDrug.name} ${calcResult.mg}mg (${calcResult.ml}mL) for ${selectedNeonate.name}`,
      type: 'Medication',
      status: 'Calculated'
    }, {
      onSuccess: () => {
        setLogStatus(true);
        setTimeout(() => {
          setCalcStep(1);
          setSelectedNeonate(null);
          setSelectedDrug(null);
          setCalcData({ doseMgKg: '', stockMg: '', stockMl: '' });
          setLogStatus(false);
          setActiveTab('audit');
        }, 1500);
      }
    });
  };

  const filteredNeonates = neonates.filter(n => 
    n.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    n.hospitalNumber.includes(searchTerm)
  );

  return (
    <AuthenticatedLayout
      header={
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold leading-tight text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <Baby className="w-6 h-6 text-indigo-500" />
              NBU Care Center
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Welcome back, {auth.user.name} ({auth.user.role})
            </p>
          </div>

          {/* tab toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-800/80 p-1 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-inner overflow-x-auto max-w-full gap-1">
            <button
              onClick={() => setActiveTab('registry')}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'registry'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              Registry
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'calculator'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              Pipeline Calculator
            </button>
            <button
              onClick={() => setActiveTab('handovers')}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'handovers'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              Shift Handovers
            </button>
            <button
              onClick={() => setActiveTab('rota')}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'rota'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              Duty Rota
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'audit'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              Audit Trail
            </button>
          </div>
        </div>
      }
    >
      <Head title="Clinical Dashboard" />

      <div className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* TAB 1: REGISTRY */}
          {activeTab === 'registry' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">Active Ward Patients</h3>
                  <p className="text-xs text-gray-500">Currently admitted in Neonatal Intensive Care.</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/10 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Plus className="w-4 h-4" /> Admit Neonate
                </button>
              </div>

              {/* Search Registry */}
              <div className="flex flex-col md:flex-row gap-4 items-center bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/60 shadow-sm">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patients by name or Hospital ID..."
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm font-bold text-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 px-5 py-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-100/50 dark:border-indigo-900/30">
                  <Activity className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-black text-indigo-700 dark:text-indigo-400 uppercase tracking-widest">{filteredNeonates.length} Patients Active</span>
                </div>
              </div>

              {/* Patient Cards Grid */}
              {filteredNeonates.length === 0 ? (
                <div className="py-24 text-center bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/50 shadow-sm space-y-4">
                  <Baby className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto" />
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">No neonates found</h4>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">Try search modifiers or admit a new patient baby to NBU registry.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNeonates.map((n) => (
                    <div 
                      key={n.id}
                      onClick={() => {
                        setSelectedNeonate(n);
                        setCurrentWeight(n.currentWeight);
                        setActiveTab('calculator');
                        setCalcStep(2);
                      }}
                      className="bg-white dark:bg-gray-800 p-6 rounded-[28px] border border-gray-100 dark:border-gray-700/60 shadow-sm hover:shadow-xl transition-all cursor-pointer group space-y-4 relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center">
                            <Baby className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{n.name}</h4>
                            <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{n.hospitalNumber}</span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 bg-emerald-100/70 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-full text-[9px] font-black uppercase tracking-wider">
                          Stable
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100/50 dark:border-gray-700/20 flex items-center gap-2">
                          <Scale className="w-3.5 h-3.5 text-gray-400" />
                          <span className="font-bold text-gray-700 dark:text-gray-300">{n.currentWeight} kg</span>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100/50 dark:border-gray-700/20 flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span className="font-bold text-gray-700 dark:text-gray-300">{n.gestationalAge} wks</span>
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100/50 dark:border-gray-700/20">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">Admission Diagnosis</span>
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 block truncate">{n.admissionDiagnosis || 'Clinical Checkup'}</span>
                      </div>

                      <div className="flex justify-between items-center text-[10px] pt-3 border-t border-gray-100 dark:border-gray-700/50">
                        <span className="text-gray-400">Adm: {new Date(n.createdAt).toLocaleDateString()}</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Calculate Dose <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CALCULATOR PIPELINE */}
          {activeTab === 'calculator' && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Steps Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-sm">
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">Medication Safety Pipeline</h3>
                  <p className="text-xs text-gray-500">Standard 5-step clinical drug verification protocol.</p>
                </div>
                <div className="flex items-center gap-4">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div key={step} className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs border transition-all ${
                        calcStep >= step
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                          : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-400'
                      }`}>
                        {calcStep > step ? <Check className="w-4 h-4" /> : step}
                      </div>
                      {step < 5 && <div className="w-4 h-0.5 bg-gray-200 dark:bg-gray-700" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculator workspace */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-[36px] border border-gray-100 dark:border-gray-700/60 shadow-lg min-h-[460px] flex flex-col justify-between">
                
                {/* Step 1: Patient Identity Selection */}
                {calcStep === 1 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="space-y-2">
                      <h4 className="text-base font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-indigo-500" />
                        Step 1: Patient Identity
                      </h4>
                      <p className="text-xs text-gray-500">Select the baby patient from the active ward registry.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2">
                      {neonates.map((n) => (
                        <button
                          key={n.id}
                          onClick={() => {
                            setSelectedNeonate(n);
                            setCurrentWeight(n.currentWeight);
                            setCalcStep(2);
                          }}
                          className="p-5 rounded-2xl border bg-gray-50 dark:bg-gray-900 hover:border-indigo-500/50 border-gray-100 dark:border-gray-800/80 transition-all text-left flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-3">
                            <Baby className="w-5 h-5 text-indigo-500" />
                            <div>
                              <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{n.name}</p>
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{n.hospitalNumber}</span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Weight Verification */}
                {calcStep === 2 && (
                  <div className="max-w-md mx-auto py-6 space-y-6 text-center animate-in fade-in duration-300">
                    <div className="space-y-2">
                      <h4 className="text-base font-black text-gray-900 dark:text-white">Step 2: Verify Patient Weight</h4>
                      <p className="text-xs text-gray-500">Volumetric calculations require precise active weight.</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 text-center space-y-4">
                      <Scale className="w-10 h-10 text-indigo-500 mx-auto" />
                      <div>
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1">Clinician Verified Weight (kg)</label>
                        <input
                          type="number"
                          step="0.001"
                          className="w-full text-center bg-transparent text-4xl font-black text-gray-900 dark:text-white outline-none border-b border-indigo-500/20 pb-2 max-w-[200px]"
                          value={currentWeight}
                          onChange={(e) => setCurrentWeight(e.target.value)}
                        />
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/20 border border-amber-100/50 dark:border-amber-900/30 rounded-lg text-[10px] text-amber-700 dark:text-amber-400 font-bold mx-auto">
                        <Info className="w-3.5 h-3.5" /> Admitted record: {selectedNeonate?.currentWeight} kg
                      </span>
                    </div>

                    <button
                      onClick={() => setCalcStep(3)}
                      disabled={!currentWeight}
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all disabled:opacity-50"
                    >
                      Confirm Active Weight
                    </button>
                  </div>
                )}

                {/* Step 3: Choose Drug */}
                {calcStep === 3 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="space-y-2">
                      <h4 className="text-base font-black text-gray-900 dark:text-white">Step 3: Select Medication</h4>
                      <p className="text-xs text-gray-500">Select the prescribed neonate formulary drug.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {drugs.map((d) => (
                        <button
                          key={d.name}
                          onClick={() => {
                            setSelectedDrug(d);
                            setCalcData({ ...calcData, doseMgKg: d.defaultDose });
                            setCalcStep(4);
                          }}
                          className="p-5 rounded-2xl border bg-gray-50 dark:bg-gray-900 hover:border-indigo-500/50 border-gray-100 dark:border-gray-800/80 transition-all text-left flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-indigo-500 shadow-sm">
                              <Pill className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{d.name}</p>
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{d.frequency} • {d.defaultDose} {d.unit}</span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Dose Calculation Form */}
                {calcStep === 4 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="space-y-2">
                      <h4 className="text-base font-black text-gray-900 dark:text-white">Step 4: Dose Calculations</h4>
                      <p className="text-xs text-gray-500">Provide prescribed doses and pharmacy stock concentrations.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Prescribed Dosage ({selectedDrug?.unit})</label>
                          <input
                            type="number"
                            className="w-full p-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100"
                            value={calcData.doseMgKg}
                            onChange={(e) => setCalcData({ ...calcData, doseMgKg: e.target.value })}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Stock Concentrations</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              placeholder="Stock mg"
                              className="w-full p-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100"
                              value={calcData.stockMg}
                              onChange={(e) => setCalcData({ ...calcData, stockMg: e.target.value })}
                            />
                            <span className="text-xs text-gray-400 font-bold">in</span>
                            <input
                              type="number"
                              placeholder="Stock mL"
                              className="w-full p-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100"
                              value={calcData.stockMl}
                              onChange={(e) => setCalcData({ ...calcData, stockMl: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/30 rounded-3xl text-center space-y-2 relative overflow-hidden">
                        <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.15em] block">Required Drawing Volume</span>
                        <div className="text-4xl font-black text-gray-950 dark:text-white tracking-tighter">
                          {calcResult?.ml || '0.00'} <span className="text-lg font-bold text-gray-400 dark:text-gray-500">mL</span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">({calcResult?.mg || '0.00'} mg total required dose)</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setCalcStep(5)}
                      disabled={!calcResult}
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all disabled:opacity-50"
                    >
                      Proceed to Verification
                    </button>
                  </div>
                )}

                {/* Step 5: Verification & Save */}
                {calcStep === 5 && (
                  <div className="max-w-md mx-auto py-4 space-y-6 text-center animate-in fade-in duration-300">
                    <div className="space-y-2">
                      <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">Clinical Safety Verification</h4>
                      <p className="text-xs text-gray-500">Validate all parameters before committing to clinical charts.</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 text-left text-xs space-y-3.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-gray-400 uppercase font-black">Patient Identity</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">{selectedNeonate?.name} ({selectedNeonate?.hospitalNumber})</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-gray-400 uppercase font-black">Formulary Drug</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">{selectedDrug?.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-gray-400 uppercase font-black">Total Dose (mg)</span>
                        <span className="font-black text-indigo-600 dark:text-indigo-400">{calcResult?.mg} mg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-gray-400 uppercase font-black">Drawing Volume (mL)</span>
                        <span className="font-black text-indigo-600 dark:text-indigo-400">{calcResult?.ml} mL</span>
                      </div>
                      <div className="flex justify-between items-center pt-2.5 border-t border-gray-100 dark:border-gray-800">
                        <span className="text-[9px] text-emerald-600 dark:text-emerald-400 uppercase font-black">Certified Auditor</span>
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">{auth.user.name} ({auth.user.role})</span>
                      </div>
                    </div>

                    {logStatus ? (
                      <div className="py-4 bg-emerald-500 text-white rounded-2xl text-center text-xs font-black uppercase tracking-wider animate-in zoom-in-95 flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5 animate-bounce" /> Calculations Audited & Logged
                      </div>
                    ) : (
                      <button
                        onClick={handleLogMedication}
                        className="w-full py-4 bg-gray-900 hover:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                      >
                        <ClipboardCheck className="w-4 h-4" /> Sign & Log Calculation
                      </button>
                    )}
                  </div>
                )}

                {/* Back / Navigation Controls */}
                <div className="flex justify-between pt-6 border-t border-gray-100 dark:border-gray-800 mt-6 text-xs font-black uppercase tracking-widest text-gray-400">
                  <button
                    disabled={calcStep === 1}
                    onClick={() => setCalcStep((prev) => Math.max(prev - 1, 1))}
                    className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-200 disabled:opacity-0"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>

                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Safety Shield Active</span>
                    {calcStep > 1 && (
                      <button 
                        onClick={() => {
                          setCalcStep(1);
                          setSelectedNeonate(null);
                          setSelectedDrug(null);
                          setCalcData({ doseMgKg: '', stockMg: '', stockMl: '' });
                        }} 
                        className="p-1.5 ml-2 hover:bg-red-50 dark:hover:bg-red-950/20 text-gray-300 hover:text-red-500 rounded-lg transition-colors border border-gray-100 dark:border-gray-800"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AUDIT TRAIL */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white">Clinical Audit Logs</h3>
                <p className="text-xs text-gray-500">Historical records of drug calculations and clinical parameters checkups.</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-900 text-[10px] text-gray-400 font-black uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                        <th className="p-5">Timestamp</th>
                        <th className="p-5">Clinician</th>
                        <th className="p-5">Verified Action</th>
                        <th className="p-5">Type</th>
                        <th className="p-5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {auditLogs.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="p-10 text-center text-gray-400">
                            No logs found. Perform a medication safety calculation to generate logs.
                          </td>
                        </tr>
                      ) : (
                        auditLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors">
                            <td className="p-5 text-[10px] font-bold text-gray-400">{new Date(log.created_at).toLocaleString()}</td>
                            <td className="p-5 text-gray-900 dark:text-white font-bold">{log.user_name}</td>
                            <td className="p-5 max-w-sm truncate font-medium">{log.action}</td>
                            <td className="p-5">
                              <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 rounded-md text-[9px] font-black uppercase tracking-wider">
                                {log.type}
                              </span>
                            </td>
                            <td className="p-5">
                              <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Calculated
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SHIFT HANDOVERS */}
          {activeTab === 'handovers' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">Shift Handover Reports</h3>
                  <p className="text-xs text-gray-500">Record and review comprehensive newborn transition reports to ensure zero clinical gaps.</p>
                </div>
                <button
                  onClick={() => setIsHandoverModalOpen(true)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/10 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Plus className="w-4 h-4" /> Record Handover
                </button>
              </div>

              {/* Active Shift status bar */}
              {(() => {
                const todayStr = new Date().toISOString().split('T')[0];
                const activeShift = rotas.find(r => r.date === todayStr);
                return (
                  <div className="p-5 bg-gradient-to-r from-indigo-50 to-indigo-100/50 dark:from-gray-900 dark:to-gray-800/80 rounded-2xl border border-indigo-100/50 dark:border-gray-700/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center shadow-sm">
                        <Clock className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">Active Ward Roster</span>
                        <h4 className="text-sm font-black text-gray-900 dark:text-white">
                          {activeShift ? `Today's ${activeShift.shift} Shift Schedule` : "No active shift roster for today"}
                        </h4>
                      </div>
                    </div>
                    {activeShift ? (
                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-700 dark:text-gray-300">
                        <span className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                          🩺 Consultant: <strong className="text-gray-900 dark:text-white">{activeShift.consultant_name || 'N/A'}</strong>
                        </span>
                        <span className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                          👑 In-Charge: <strong className="text-gray-900 dark:text-white">{activeShift.manager_name || 'N/A'}</strong>
                        </span>
                        <span className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                          👩‍⚕️ Nurses on Shift: <strong className="text-gray-900 dark:text-white">{activeShift.nurses && activeShift.nurses.length > 0 ? activeShift.nurses.map(n => n.name).join(', ') : 'None assigned'}</strong>
                        </span>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-450 dark:text-gray-400 font-bold italic">Roster manager is currently off. Contact Chief Nurse In-Charge for assignments.</p>
                    )}
                  </div>
                );
              })()}

              {/* Handovers Timeline Cards */}
              <div className="grid grid-cols-1 gap-6">
                {handovers.length === 0 ? (
                  <div className="bg-white dark:bg-gray-800 p-12 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-sm text-center text-gray-400">
                    <ArrowRightLeft className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm font-bold">No shift handovers logged yet.</p>
                    <p className="text-xs text-gray-455">Create a comprehensive handover report above to secure newborn shift clinical safety.</p>
                  </div>
                ) : (
                  handovers.map((h) => {
                    // Check warnings for vitals
                    const isTempWarn = h.temperature < 36.5 || h.temperature > 37.5;
                    const isSugarWarn = h.sugar_level < 2.6 || h.sugar_level > 7.0;
                    const isSpo2Warn = h.oxygen_saturation < 95;
                    const isHrWarn = h.heart_rate < 120 || h.heart_rate > 160;
                    const isRrWarn = h.respiratory_rate < 30 || h.respiratory_rate > 60;

                    return (
                      <div key={h.id} className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-sm overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-md">
                        {/* Patient info sidebar */}
                        <div className="p-6 md:w-64 bg-gray-50/50 dark:bg-gray-900/40 border-r border-gray-100 dark:border-gray-800 flex flex-col justify-between gap-4">
                          <div>
                            <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 rounded-lg text-[9px] font-black uppercase tracking-wider block w-fit mb-2">
                              {h.shift} Shift Handover
                            </span>
                            <h4 className="text-base font-black text-gray-900 dark:text-white leading-tight">{h.neonate_name}</h4>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mt-1">{h.neonate_hospital_number}</span>
                          </div>
                          
                          <div className="space-y-2 text-[10px] text-gray-500 font-semibold">
                            <div>
                              <span className="block text-[8px] font-black uppercase text-gray-400 tracking-widest">Nurse on Duty</span>
                              <span className="text-gray-800 dark:text-gray-200 font-bold">{h.nurse_name || 'N/A'}</span>
                            </div>
                            <div>
                              <span className="block text-[8px] font-black uppercase text-gray-400 tracking-widest">Clinical Lead</span>
                              <span className="text-gray-800 dark:text-gray-200 font-bold">{h.lead_name || 'N/A'}</span>
                            </div>
                            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 text-[9px]">
                              🗓️ {new Date(h.date).toLocaleDateString()} at {new Date(h.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                          </div>
                        </div>

                        {/* Vitals & details area */}
                        <div className="p-6 flex-1 space-y-5">
                          {/* 5-Vital safety indicators grid */}
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            <div className={`p-3 rounded-2xl border text-center space-y-1 ${isTempWarn ? 'bg-rose-50/55 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30' : 'bg-gray-50 dark:bg-gray-900/60 border-gray-100 dark:border-gray-800/80'}`}>
                              <Thermometer className={`w-4 h-4 mx-auto ${isTempWarn ? 'text-rose-500' : 'text-indigo-500'}`} />
                              <span className="text-[8px] font-black text-gray-400 uppercase tracking-wider block">Temp</span>
                              <span className={`text-xs font-black block ${isTempWarn ? 'text-rose-600 dark:text-rose-400' : 'text-gray-900 dark:text-white'}`}>
                                {h.temperature ? `${h.temperature}°C` : 'N/A'}
                              </span>
                            </div>

                            <div className={`p-3 rounded-2xl border text-center space-y-1 ${isSugarWarn ? 'bg-rose-50/55 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30' : 'bg-gray-50 dark:bg-gray-900/60 border-gray-100 dark:border-gray-800/80'}`}>
                              <Droplets className={`w-4 h-4 mx-auto ${isSugarWarn ? 'text-rose-500' : 'text-indigo-500'}`} />
                              <span className="text-[8px] font-black text-gray-400 uppercase tracking-wider block">Sugar</span>
                              <span className={`text-xs font-black block ${isSugarWarn ? 'text-rose-600 dark:text-rose-400' : 'text-gray-900 dark:text-white'}`}>
                                {h.sugar_level ? `${h.sugar_level} mM` : 'N/A'}
                              </span>
                            </div>

                            <div className={`p-3 rounded-2xl border text-center space-y-1 ${isSpo2Warn ? 'bg-rose-50/55 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30' : 'bg-gray-50 dark:bg-gray-900/60 border-gray-100 dark:border-gray-800/80'}`}>
                              <Activity className={`w-4 h-4 mx-auto ${isSpo2Warn ? 'text-rose-500' : 'text-indigo-500'}`} />
                              <span className="text-[8px] font-black text-gray-400 uppercase tracking-wider block">SPO₂</span>
                              <span className={`text-xs font-black block ${isSpo2Warn ? 'text-rose-600 dark:text-rose-400' : 'text-gray-900 dark:text-white'}`}>
                                {h.oxygen_saturation ? `${h.oxygen_saturation}%` : 'N/A'}
                              </span>
                            </div>

                            <div className={`p-3 rounded-2xl border text-center space-y-1 ${isHrWarn ? 'bg-rose-50/55 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30' : 'bg-gray-50 dark:bg-gray-900/60 border-gray-100 dark:border-gray-800/80'}`}>
                              <Heart className={`w-4 h-4 mx-auto ${isHrWarn ? 'text-rose-500' : 'text-indigo-500'}`} />
                              <span className="text-[8px] font-black text-gray-400 uppercase tracking-wider block">HR (Pulse)</span>
                              <span className={`text-xs font-black block ${isHrWarn ? 'text-rose-600 dark:text-rose-400' : 'text-gray-900 dark:text-white'}`}>
                                {h.heart_rate ? `${h.heart_rate} bpm` : 'N/A'}
                              </span>
                            </div>

                            <div className={`p-3 rounded-2xl border text-center space-y-1 ${isRrWarn ? 'bg-rose-50/55 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30' : 'bg-gray-50 dark:bg-gray-900/60 border-gray-100 dark:border-gray-800/80'}`}>
                              <Activity className={`w-4 h-4 mx-auto ${isRrWarn ? 'text-rose-500' : 'text-indigo-500'}`} />
                              <span className="text-[8px] font-black text-gray-400 uppercase tracking-wider block">Resp Rate</span>
                              <span className={`text-xs font-black block ${isRrWarn ? 'text-rose-600 dark:text-rose-400' : 'text-gray-900 dark:text-white'}`}>
                                {h.respiratory_rate ? `${h.respiratory_rate} cpm` : 'N/A'}
                              </span>
                            </div>
                          </div>

                          {/* Commentary Text block */}
                          <div className="space-y-1">
                            <span className="text-[8px] font-black uppercase text-gray-400 tracking-widest block">Clinical Commentary</span>
                            <p className="text-xs text-gray-705 dark:text-gray-300 leading-relaxed font-semibold italic bg-gray-50 dark:bg-gray-900/40 p-3 rounded-xl border border-gray-100 dark:border-gray-800/60">
                              "{h.commentary}"
                            </p>
                          </div>

                          {/* Plan Text block */}
                          <div className="space-y-1">
                            <span className="text-[8px] font-black uppercase text-gray-400 tracking-widest block">Clinical Intervention Plan</span>
                            <p className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed font-bold bg-indigo-50/30 dark:bg-indigo-950/10 p-3 rounded-xl border border-indigo-100/40 dark:border-indigo-900/20">
                              🎯 {h.plan}
                            </p>
                          </div>

                          {/* Lab Investigations panel */}
                          {h.investigations && (Object.values(h.investigations).some(v => v)) && (
                            <div className="pt-3 border-t border-gray-100 dark:border-gray-800/80">
                              <span className="text-[8px] font-black uppercase text-gray-400 tracking-widest block mb-2">Registered Lab Investigations</span>
                              <div className="flex flex-wrap gap-2.5">
                                {h.investigations.fbc && (
                                  <span className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/20 border border-amber-100/50 dark:border-amber-900/30 text-amber-800 dark:text-amber-400 text-[10px] font-bold rounded-lg">
                                    🩸 FBC: {h.investigations.fbc}
                                  </span>
                                )}
                                {h.investigations.kidney && (
                                  <span className="px-2.5 py-1 bg-teal-50 dark:bg-teal-950/20 border border-teal-100/50 dark:border-teal-900/30 text-teal-800 dark:text-teal-400 text-[10px] font-bold rounded-lg">
                                    💧 Kidneys: {h.investigations.kidney}
                                  </span>
                                )}
                                {h.investigations.liver && (
                                  <span className="px-2.5 py-1 bg-purple-50 dark:bg-purple-950/20 border border-purple-100/50 dark:border-purple-900/30 text-purple-800 dark:text-purple-400 text-[10px] font-bold rounded-lg">
                                    🧪 Liver: {h.investigations.liver}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 5: DUTY ROTA */}
          {activeTab === 'rota' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">Clinician Duty Rota</h3>
                  <p className="text-xs text-gray-500">Manage ward schedules, consultant coverage, shift managers, and active duty nurses.</p>
                </div>
                <button
                  onClick={() => setIsRotaModalOpen(true)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/10 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Plus className="w-4 h-4" /> Schedule Rota
                </button>
              </div>

              {/* Rota schedules grid */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-900 text-[10px] text-gray-400 font-black uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                        <th className="p-5">Shift Date</th>
                        <th className="p-5">Shift Type</th>
                        <th className="p-5">Consultant Pediatrician</th>
                        <th className="p-5">Shift In-Charge</th>
                        <th className="p-5">Nurses on Duty</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {rotas.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="p-10 text-center text-gray-400">
                            No shift schedules defined yet. Add the first duty rota above.
                          </td>
                        </tr>
                      ) : (
                        rotas.map((rota) => (
                          <tr key={rota.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors">
                            <td className="p-5 text-gray-900 dark:text-white font-bold">
                              {new Date(rota.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </td>
                            <td className="p-5">
                              <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 rounded-md text-[9px] font-black uppercase tracking-wider">
                                {rota.shift} Shift
                              </span>
                            </td>
                            <td className="p-5 font-bold text-gray-850 dark:text-gray-100">
                              👨‍⚕️ {rota.consultant_name || 'None Assigned'}
                            </td>
                            <td className="p-5 font-bold text-gray-850 dark:text-gray-100">
                              Sister {rota.manager_name || 'None Assigned'}
                            </td>
                            <td className="p-5">
                              <div className="flex flex-wrap gap-1.5">
                                {rota.nurses && rota.nurses.length > 0 ? (
                                  rota.nurses.map(n => (
                                    <span key={n.id} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 text-gray-600 dark:text-gray-400 text-[9px] font-black uppercase rounded-lg">
                                      {n.name}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-gray-450 italic">None assigned</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Patient Admission Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-[32px] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white">Admit Neonate Patient</h3>
                <p className="text-xs text-gray-500">Record newborn clinical biodata and maternal context.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveNeonate} className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Hospital Number</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. NBU-2026-901"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                    value={neonateData.hospitalNumber}
                    onChange={(e) => setNeonateData('hospitalNumber', e.target.value)}
                  />
                  {neonateErrors.hospitalNumber && <span className="text-[10px] text-red-500 font-bold block ml-1">{neonateErrors.hospitalNumber}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Baby Jane Doe"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                    value={neonateData.name}
                    onChange={(e) => setNeonateData('name', e.target.value)}
                  />
                  {neonateErrors.name && <span className="text-[10px] text-red-500 font-bold block ml-1">{neonateErrors.name}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Date of Birth</label>
                  <input
                    required
                    type="date"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100"
                    value={neonateData.dob}
                    onChange={(e) => setNeonateData('dob', e.target.value)}
                  />
                  {neonateErrors.dob && <span className="text-[10px] text-red-500 font-bold block ml-1">{neonateErrors.dob}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Gender</label>
                  <select
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100"
                    value={neonateData.gender}
                    onChange={(e) => setNeonateData('gender', e.target.value)}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                  {neonateErrors.gender && <span className="text-[10px] text-red-500 font-bold block ml-1">{neonateErrors.gender}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Birth Weight (kg)</label>
                  <input
                    required
                    type="number"
                    step="0.001"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                    value={neonateData.birthWeight}
                    onChange={(e) => setNeonateData('birthWeight', e.target.value)}
                  />
                  {neonateErrors.birthWeight && <span className="text-[10px] text-red-500 font-bold block ml-1">{neonateErrors.birthWeight}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Current Weight (kg)</label>
                  <input
                    required
                    type="number"
                    step="0.001"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                    value={neonateData.currentWeight}
                    onChange={(e) => setNeonateData('currentWeight', e.target.value)}
                  />
                  {neonateErrors.currentWeight && <span className="text-[10px] text-red-500 font-bold block ml-1">{neonateErrors.currentWeight}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Gestational Age (weeks)</label>
                  <input
                    required
                    type="number"
                    placeholder="e.g. 36"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                    value={neonateData.gestationalAge}
                    onChange={(e) => setNeonateData('gestationalAge', e.target.value)}
                  />
                  {neonateErrors.gestationalAge && <span className="text-[10px] text-red-500 font-bold block ml-1">{neonateErrors.gestationalAge}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Mother's Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +254..."
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                    value={neonateData.motherPhone}
                    onChange={(e) => setNeonateData('motherPhone', e.target.value)}
                  />
                  {neonateErrors.motherPhone && <span className="text-[10px] text-red-500 font-bold block ml-1">{neonateErrors.motherPhone}</span>}
                </div>

              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Admission Diagnosis</label>
                <textarea
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50 h-20 resize-none"
                  placeholder="Primary clinical observation (e.g. Prematurity, RDS, Neonatal Jaundice...)"
                  value={neonateData.admissionDiagnosis}
                  onChange={(e) => setNeonateData('admissionDiagnosis', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Clinical History</label>
                <textarea
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50 h-24 resize-none"
                  placeholder="Maternal history, APGAR scores, birth delivery context..."
                  value={neonateData.history}
                  onChange={(e) => setNeonateData('history', e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={neonateProcessing}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg shadow-indigo-600/10 transition-all hover:scale-[1.01]"
              >
                Confirm Clinical Admission
              </button>

            </form>
          </div>
        </div>
      )}
      {/* Shift Handover Modal Dialog */}
      {isHandoverModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-[32px] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white">Record Shift Handover</h3>
                <p className="text-xs text-gray-500">Log clinical handover parameters, current vitals, commentary and plans.</p>
              </div>
              <button 
                onClick={() => setIsHandoverModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveHandover} className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Select Neonate Patient</label>
                  <select
                    required
                    value={handoverData.neonateId}
                    onChange={(e) => setHandoverData('neonateId', e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                  >
                    <option value="">Select Neonate...</option>
                    {neonates.map((n) => (
                      <option key={n.id} value={n.id}>{n.name} ({n.hospitalNumber || n.hospital_number})</option>
                    ))}
                  </select>
                  {handoverErrors.neonateId && <span className="text-[10px] text-red-500 font-bold block ml-1">{handoverErrors.neonateId}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Shift Type</label>
                  <select
                    value={handoverData.shift}
                    onChange={(e) => setHandoverData('shift', e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                  >
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Night</option>
                  </select>
                  {handoverErrors.shift && <span className="text-[10px] text-red-500 font-bold block ml-1">{handoverErrors.shift}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Clinical Lead / Pediatrician</label>
                  <select
                    value={handoverData.clinicalLeadId}
                    onChange={(e) => setHandoverData('clinicalLeadId', e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                  >
                    <option value="">Select Clinical Lead...</option>
                    {allUsers.filter(u => u.role === 'Consultant Pediatrician').map((u) => (
                      <option key={u.id} value={u.id}>Dr. {u.name}</option>
                    ))}
                  </select>
                  {handoverErrors.clinicalLeadId && <span className="text-[10px] text-red-500 font-bold block ml-1">{handoverErrors.clinicalLeadId}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Temperature (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 36.8"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                    value={handoverData.temperature}
                    onChange={(e) => setHandoverData('temperature', e.target.value)}
                  />
                  {handoverErrors.temperature && <span className="text-[10px] text-red-500 font-bold block ml-1">{handoverErrors.temperature}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Blood Sugar (mmol/L)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 4.5"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                    value={handoverData.sugarLevel}
                    onChange={(e) => setHandoverData('sugarLevel', e.target.value)}
                  />
                  {handoverErrors.sugarLevel && <span className="text-[10px] text-red-500 font-bold block ml-1">{handoverErrors.sugarLevel}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Oxygen Saturation SPO₂ (%)</label>
                  <input
                    type="number"
                    placeholder="e.g. 98"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                    value={handoverData.oxygenSaturation}
                    onChange={(e) => setHandoverData('oxygenSaturation', e.target.value)}
                  />
                  {handoverErrors.oxygenSaturation && <span className="text-[10px] text-red-500 font-bold block ml-1">{handoverErrors.oxygenSaturation}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Heart Rate (bpm)</label>
                  <input
                    type="number"
                    placeholder="e.g. 140"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                    value={handoverData.heartRate}
                    onChange={(e) => setHandoverData('heartRate', e.target.value)}
                  />
                  {handoverErrors.heartRate && <span className="text-[10px] text-red-500 font-bold block ml-1">{handoverErrors.heartRate}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Respiratory Rate (cpm)</label>
                  <input
                    type="number"
                    placeholder="e.g. 45"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                    value={handoverData.respiratoryRate}
                    onChange={(e) => setHandoverData('respiratoryRate', e.target.value)}
                  />
                  {handoverErrors.respiratoryRate && <span className="text-[10px] text-red-500 font-bold block ml-1">{handoverErrors.respiratoryRate}</span>}
                </div>

              </div>

              {/* Lab tests fields */}
              <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-4">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Lab Investigations</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-wider block">Full Blood Count</label>
                    <input
                      type="text"
                      placeholder="e.g. Hb 14.5 g/dL"
                      className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-250/20 dark:border-gray-700 rounded-lg outline-none text-xs font-bold text-gray-700 dark:text-gray-100"
                      value={handoverData.fbc}
                      onChange={(e) => setHandoverData('fbc', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-wider block">Renal (Kidney)</label>
                    <input
                      type="text"
                      placeholder="e.g. Normal"
                      className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-250/20 dark:border-gray-700 rounded-lg outline-none text-xs font-bold text-gray-700 dark:text-gray-100"
                      value={handoverData.kidney}
                      onChange={(e) => setHandoverData('kidney', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black text-gray-500 uppercase tracking-wider block">Hepatic (Liver)</label>
                    <input
                      type="text"
                      placeholder="e.g. Bilirubin 180"
                      className="w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-250/20 dark:border-gray-700 rounded-lg outline-none text-xs font-bold text-gray-700 dark:text-gray-100"
                      value={handoverData.liver}
                      onChange={(e) => setHandoverData('liver', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Clinical Commentary</label>
                <textarea
                  required
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50 h-20 resize-none"
                  placeholder="Record feeding tolerance, ventilation support context, active lines, and general notes..."
                  value={handoverData.commentary}
                  onChange={(e) => setHandoverData('commentary', e.target.value)}
                />
                {handoverErrors.commentary && <span className="text-[10px] text-red-500 font-bold block ml-1">{handoverErrors.commentary}</span>}
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Clinical Plan & Intervention</label>
                <textarea
                  required
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50 h-20 resize-none"
                  placeholder="Record target feed volume, infusion rate adjustments, photo-therapy settings, or monitoring frequency..."
                  value={handoverData.plan}
                  onChange={(e) => setHandoverData('plan', e.target.value)}
                />
                {handoverErrors.plan && <span className="text-[10px] text-red-500 font-bold block ml-1">{handoverErrors.plan}</span>}
              </div>

              <button
                type="submit"
                disabled={handoverProcessing}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg shadow-indigo-600/10 transition-all hover:scale-[1.01]"
              >
                Save Handover Report
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Duty Rota Modal Dialog */}
      {isRotaModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-[32px] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white">Schedule Duty Rota</h3>
                <p className="text-xs text-gray-500">Configure clinician shift allocations and nurse schedules.</p>
              </div>
              <button 
                onClick={() => setIsRotaModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveRota} className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Shift Date</label>
                  <input
                    required
                    type="date"
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100"
                    value={rotaData.date}
                    onChange={(e) => setRotaData('date', e.target.value)}
                  />
                  {rotaErrors.date && <span className="text-[10px] text-red-500 font-bold block ml-1">{rotaErrors.date}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Shift Type</label>
                  <select
                    value={rotaData.shift}
                    onChange={(e) => setRotaData('shift', e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                  >
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Night</option>
                  </select>
                  {rotaErrors.shift && <span className="text-[10px] text-red-500 font-bold block ml-1">{rotaErrors.shift}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Consultant Pediatrician</label>
                  <select
                    value={rotaData.consultantId}
                    onChange={(e) => setRotaData('consultantId', e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                  >
                    <option value="">Select Consultant...</option>
                    {allUsers.filter(u => u.role === 'Consultant Pediatrician').map((u) => (
                      <option key={u.id} value={u.id}>Dr. {u.name}</option>
                    ))}
                  </select>
                  {rotaErrors.consultantId && <span className="text-[10px] text-red-500 font-bold block ml-1">{rotaErrors.consultantId}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Shift In-Charge / Sister</label>
                  <select
                    value={rotaData.managerId}
                    onChange={(e) => setRotaData('managerId', e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl outline-none text-sm font-bold text-gray-700 dark:text-gray-100 focus:border-indigo-500/50"
                  >
                    <option value="">Select In-Charge...</option>
                    {allUsers.filter(u => u.role === 'Nursing In-Charge').map((u) => (
                      <option key={u.id} value={u.id}>Sister {u.name}</option>
                    ))}
                  </select>
                  {rotaErrors.managerId && <span className="text-[10px] text-red-500 font-bold block ml-1">{rotaErrors.managerId}</span>}
                </div>

              </div>

              {/* Nurses multi selection */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block ml-1">Assign Shift Ward Nurses</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl">
                  {allUsers.filter(u => u.role === 'Nurse' || u.role === 'CO Pediatrics / MO' || u.role === 'Student').map((u) => {
                    const isChecked = rotaData.assignedNurses.includes(u.id);
                    return (
                      <label key={u.id} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-750/30 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/60 select-none">
                        <input
                          type="checkbox"
                          className="rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                          checked={isChecked}
                          onChange={() => {
                            const current = [...rotaData.assignedNurses];
                            const idx = current.indexOf(u.id);
                            if (idx > -1) {
                              current.splice(idx, 1);
                            } else {
                              current.push(u.id);
                            }
                            setRotaData('assignedNurses', current);
                          }}
                        />
                        <div className="text-[11px] font-bold">
                          <span className="text-gray-900 dark:text-white block leading-tight">{u.name}</span>
                          <span className="text-gray-450 text-[8px] font-black uppercase tracking-wider block mt-0.5">{u.role}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
                {rotaErrors.assignedNurses && <span className="text-[10px] text-red-500 font-bold block ml-1">{rotaErrors.assignedNurses}</span>}
              </div>

              <button
                type="submit"
                disabled={rotaProcessing}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg shadow-indigo-600/10 transition-all hover:scale-[1.01]"
              >
                Publish Shift Schedule
              </button>

            </form>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}
