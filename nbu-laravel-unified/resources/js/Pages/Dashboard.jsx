import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { 
  Baby, Droplets, Activity, Zap, 
  ShieldCheck, Info, CheckCircle2,
  AlertTriangle, UserCheck, ChevronRight,
  ChevronLeft, Search, Loader2, Scale,
  Pill, ClipboardCheck, X, Check, Plus, Calendar, Phone,
  ArrowRightLeft, Thermometer, Heart, ShieldAlert, Users, Clock, User, BarChart,
  Calculator, BookOpen
} from 'lucide-react';

export default function Dashboard({ auth, initialNeonates, initialAuditLogs, initialHandovers = [], initialRotas = [], allUsers = [], flashcards = [], scenarios = [] }) {
  const [activeTab, setActiveTab] = useState('registry'); // 'registry', 'calculator', 'audit', 'handovers', 'rota', 'flashcards', 'scenarios'
  const [flippedCardId, setFlippedCardId] = useState(null);
  const [flashcardCategory, setFlashcardCategory] = useState('All');
  
  // Admin Portal Sub-States
  const [adminSubTab, setAdminSubTab] = useState('overview'); // 'overview', 'vetting', 'directory'
  const [isAdminLightMode, setIsAdminLightMode] = useState(false);
  const [adminSearchTerm, setAdminSearchTerm] = useState('');

  // Scenario States
  const [activeScenario, setActiveScenario] = useState(null);
  const [scenarioStepsCheck, setScenarioStepsCheck] = useState({});
  const [revealFormula, setRevealFormula] = useState(false);
  const [checkedAnswers, setCheckedAnswers] = useState(false);

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
        </div>
      }
    >
      <Head title="Clinical Dashboard" />

      <div className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Main Navigation Sidebar */}
            <aside className="lg:col-span-3 bg-white dark:bg-gray-800 p-5 rounded-[28px] border border-gray-100 dark:border-gray-700/60 shadow-sm space-y-6 lg:sticky lg:top-24 text-left">
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 block mb-1">Ward Workspace</span>
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400">NBU Clinical Tools</span>
                </div>
                
                <nav className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none max-w-full">
                  {/* Registry Tab */}
                  <button
                    onClick={() => setActiveTab('registry')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-left whitespace-nowrap shrink-0 ${
                      activeTab === 'registry'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15'
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900/50'
                    }`}
                  >
                    <Baby className="w-4 h-4" />
                    Registry
                  </button>

                  {/* Calculator Tab */}
                  <button
                    onClick={() => setActiveTab('calculator')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-left whitespace-nowrap shrink-0 ${
                      activeTab === 'calculator'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15'
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900/50'
                    }`}
                  >
                    <Calculator className="w-4 h-4" />
                    Pipeline Calculator
                  </button>

                  {/* Handovers Tab */}
                  <button
                    onClick={() => setActiveTab('handovers')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-left whitespace-nowrap shrink-0 ${
                      activeTab === 'handovers'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15'
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900/50'
                    }`}
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                    Shift Handovers
                  </button>

                  {/* Rota Tab */}
                  <button
                    onClick={() => setActiveTab('rota')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-left whitespace-nowrap shrink-0 ${
                      activeTab === 'rota'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15'
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900/50'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    Duty Rota
                  </button>

                  {/* Flashcards Tab */}
                  <button
                    onClick={() => setActiveTab('flashcards')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-left whitespace-nowrap shrink-0 ${
                      activeTab === 'flashcards'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15'
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900/50'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    Training Flashcards
                  </button>

                  {/* Scenarios Tab */}
                  <button
                    onClick={() => setActiveTab('scenarios')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-left whitespace-nowrap shrink-0 ${
                      activeTab === 'scenarios'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15'
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900/50'
                    }`}
                  >
                    <Activity className="w-4 h-4" />
                    Interactive Scenarios
                  </button>

                  {/* Audit Trail Tab */}
                  <button
                    onClick={() => setActiveTab('audit')}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-left whitespace-nowrap shrink-0 ${
                      activeTab === 'audit'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15'
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-900/50'
                    }`}
                  >
                    <ClipboardCheck className="w-4 h-4" />
                    Audit Trail
                  </button>

                  {/* Admin Portal Tab */}
                  {['Hospital Management', 'Nursing In-Charge', 'ICT / IT Support', 'Admin'].includes(auth.user.role) && (
                    <button
                      onClick={() => setActiveTab('admin')}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-left whitespace-nowrap shrink-0 ${
                        activeTab === 'admin'
                          ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/15 border border-rose-600/10'
                          : 'text-rose-500 hover:text-rose-700 dark:hover:text-rose-450 bg-rose-50/50 dark:bg-rose-950/10 hover:bg-rose-100/50 dark:hover:bg-rose-950/20'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Admin Portal
                    </button>
                  )}
                </nav>
              </div>
            </aside>

            {/* Right Main Content Workspace */}
            <main className="lg:col-span-9 space-y-8">
              
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

          {/* TAB: TRAINING FLASHCARDS */}
          {activeTab === 'flashcards' && (
            <div className="space-y-6 animate-in fade-in duration-300 text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">Clinical Training Flashcards</h3>
                  <p className="text-xs text-gray-500">Interactive quick-reference manuals for standard, clinical, and emergency neonatal NBU protocols.</p>
                </div>

                {/* Category selectors */}
                <div className="flex flex-wrap gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border border-gray-200/50 dark:border-gray-700/50 max-w-full">
                  {['All', 'Routine', 'Clinical', 'Critical', 'Calculations'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setFlashcardCategory(cat);
                        setFlippedCardId(null);
                      }}
                      className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
                        flashcardCategory === cat
                          ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                          : 'text-gray-555 hover:text-gray-900 dark:hover:text-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {flashcards.length === 0 ? (
                  <div className="col-span-full bg-white dark:bg-gray-800 rounded-3xl border border-gray-150 p-10 text-center text-gray-400">
                    No flashcards loaded in clinical database. Please seed the database first.
                  </div>
                ) : (
                  flashcards
                    .filter(card => flashcardCategory === 'All' || card.category === flashcardCategory)
                    .map(card => {
                      const isFlipped = flippedCardId === card.id;
                      const catColors = {
                        Routine: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
                        Clinical: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
                        Critical: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
                        Calculations: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                      }[card.category] || 'bg-gray-500/10 text-gray-600 border-gray-500/20';

                      return (
                        <div
                          key={card.id}
                          className={`relative rounded-3xl border border-gray-100 dark:border-gray-700/60 p-6 min-h-[300px] flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 ${
                            isFlipped 
                              ? 'bg-gradient-to-br from-slate-900 to-indigo-950/20 text-white border-indigo-500/20 shadow-lg shadow-indigo-500/5' 
                              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                          }`}
                        >
                          {/* Header info */}
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-4">
                              <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wider border ${catColors}`}>
                                {card.category}
                              </span>
                              <span className="text-[10px] text-gray-400 font-mono font-bold">ID: #{card.id}</span>
                            </div>

                            {!isFlipped ? (
                              /* Front side */
                              <div className="space-y-4">
                                <h4 className="text-base font-extrabold tracking-tight text-gray-900 dark:text-white leading-snug">
                                  {card.title}
                                </h4>
                                <div>
                                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">When To Perform</span>
                                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-semibold">
                                    {card.when_to_perform}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              /* Back side */
                              <div className="space-y-4">
                                <h4 className="text-xs font-black uppercase tracking-wider text-indigo-400">
                                  {card.title} &bull; Action Steps
                                </h4>
                                <div className="space-y-2">
                                  {Array.isArray(card.steps) && card.steps.map((step, idx) => (
                                    <div key={idx} className="flex gap-2 items-start text-xs">
                                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-[10px] font-black text-indigo-400 font-mono">
                                        {idx + 1}
                                      </span>
                                      <p className="text-gray-300 leading-relaxed font-semibold">{step}</p>
                                    </div>
                                  ))}
                                </div>

                                {card.warning && (
                                  <div className="mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] font-semibold leading-normal">
                                    ⚠️ <span className="font-extrabold uppercase tracking-wide">Warning:</span> {card.warning}
                                  </div>
                                )}

                                {card.tips && (
                                  <div className="mt-2 p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300 text-[11px] font-semibold leading-normal">
                                    💡 <span className="font-extrabold uppercase tracking-wide">Pro Tip:</span> {card.tips}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Flip action button */}
                          <div className="mt-6 border-t border-gray-150/40 dark:border-gray-700/40 pt-4 flex justify-end">
                            <button
                              onClick={() => setFlippedCardId(isFlipped ? null : card.id)}
                              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                                isFlipped
                                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                                  : 'bg-gray-100 dark:bg-gray-900 hover:bg-gray-250 dark:hover:bg-gray-750 text-gray-750 dark:text-gray-300 border border-gray-200/50 dark:border-gray-800'
                              }`}
                            >
                              {isFlipped ? 'Flip Front' : 'Reveal Steps & Warnings'}
                            </button>
                          </div>
                        </div>
                      );
                    })
                )}
              </div>
            </div>
          )}

          {/* TAB: INTERACTIVE SCENARIOS */}
          {activeTab === 'scenarios' && (
            <div className="space-y-6 animate-in fade-in duration-300 text-left">
              
              {!activeScenario ? (
                /* List of scenarios */
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white">Newborn Care Practice Cases</h3>
                    <p className="text-xs text-gray-500">Practice your child treatment skills, calculate safe drug doses in seconds, and follow ward guidelines.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {scenarios.length === 0 ? (
                      <div className="col-span-full bg-white dark:bg-gray-800 rounded-3xl border border-gray-150 p-10 text-center text-gray-400">
                        No training scenarios loaded in database yet.
                      </div>
                    ) : (
                      scenarios.map(sc => (
                        <div key={sc.id} className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/60 p-6 flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-500/5 transition">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center gap-2">
                              <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 rounded-md text-[9px] font-black uppercase tracking-wider border border-indigo-500/20">
                                Simulation Case File
                              </span>
                              <span className="text-[10px] text-gray-400 font-mono font-bold">Case #{sc.id}</span>
                            </div>

                            <h4 className="text-base font-extrabold text-gray-900 dark:text-white leading-tight">
                              {sc.title}
                            </h4>

                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-semibold line-clamp-3">
                              {sc.problem_statement}
                            </p>
                          </div>

                          <div className="mt-6 border-t border-gray-100 dark:border-gray-700/40 pt-4 flex justify-end">
                            <button
                              onClick={() => {
                                setActiveScenario(sc);
                                setScenarioStepsCheck({});
                                setRevealFormula(false);
                                setCheckedAnswers(false);
                              }}
                              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition shadow-md shadow-indigo-600/10"
                            >
                              Start Case Simulation
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                /* Active Scenario Player Workspace */
                <div className="space-y-6">
                  
                  {/* Workspace Header */}
                  <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                    <button
                      onClick={() => setActiveScenario(null)}
                      className="flex items-center gap-2 text-xs font-black text-gray-500 hover:text-gray-905 dark:hover:text-white uppercase tracking-wider transition"
                    >
                      &larr; Back to Case Files
                    </button>
                    <span className="px-2.5 py-1 bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/20 rounded-md text-[9px] font-black uppercase tracking-wider">
                      Simulation Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Problem Case File */}
                    <div className="lg:col-span-7 space-y-6">
                      
                      {/* Case File Card */}
                      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/60 p-6 space-y-4 shadow-sm">
                        <h4 className="text-base font-extrabold text-gray-900 dark:text-white leading-tight">
                          📋 {activeScenario.title}
                        </h4>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">Baby's History & Safe Treatment Guidelines</span>
                          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-semibold">
                            {activeScenario.problem_statement}
                          </p>
                        </div>
                      </div>

                      {/* Diagnostic checklist */}
                      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/60 p-6 space-y-4 shadow-sm">
                        <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white">
                          🩺 Interactive Treatment Checklist
                        </h4>
                        <p className="text-[11px] text-gray-500 leading-normal">
                          Read the description above and check off your steps to finish treating the baby.
                        </p>

                        <div className="space-y-3 pt-2">
                          {Array.isArray(activeScenario.solution_steps) && activeScenario.solution_steps.map((step, idx) => (
                            <label
                              key={idx}
                              className={`flex items-start gap-3 p-3 rounded-xl border transition cursor-pointer select-none ${
                                scenarioStepsCheck[idx]
                                  ? 'bg-indigo-50/50 dark:bg-indigo-950/10 border-indigo-500/30 text-indigo-700 dark:text-indigo-400'
                                  : 'bg-gray-50/50 dark:bg-gray-900/30 border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-750'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={!!scenarioStepsCheck[idx]}
                                onChange={(e) => {
                                  setScenarioStepsCheck(prev => ({
                                    ...prev,
                                    [idx]: e.target.checked
                                  }));
                                }}
                                className="mt-0.5 rounded border-gray-300 dark:border-gray-700 text-indigo-600 focus:ring-indigo-500"
                              />
                              <div className="text-xs font-semibold leading-relaxed">
                                {checkedAnswers ? (
                                  <span className="text-slate-800 dark:text-slate-100 block mb-1">
                                    <span className="font-extrabold text-teal-500 uppercase tracking-wide">Official Guideline Step {idx + 1}:</span> {step}
                                  </span>
                                ) : (
                                  <span>Step Option #{idx + 1} &bull; Check off when successfully processed</span>
                                )}
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Right Column: Calculations & Verification */}
                    <div className="lg:col-span-5 space-y-6">
                      
                      {/* Calculations Help / Formulas */}
                      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm text-slate-100 text-left">
                        <h4 className="text-xs font-black uppercase tracking-wider text-teal-400">
                          🧮 Pediatric Calculator Companion
                        </h4>
                        <p className="text-[11px] text-slate-400 leading-normal">
                          Need mathematical calculations backing this case? Expand below for standard reference equations.
                        </p>

                        <button
                          onClick={() => setRevealFormula(!revealFormula)}
                          className="w-full bg-slate-950 hover:bg-slate-855 text-slate-300 border border-slate-800 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition"
                        >
                          {revealFormula ? 'Hide Reference Guidelines' : 'Reveal Reference Equations'}
                        </button>

                        {revealFormula && (
                          <div className="p-3.5 rounded-xl bg-slate-950 border border-teal-500/20 text-teal-400 font-mono text-[11px] leading-relaxed animate-in fade-in duration-200">
                            {activeScenario.formulas_used || 'Standard NBU care parameters apply.'}
                          </div>
                        )}

                        {activeScenario.warning && (
                          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] font-semibold leading-normal">
                            ⚠️ <span className="font-extrabold uppercase tracking-wide">Clinical Risk Warning:</span> {activeScenario.warning}
                          </div>
                        )}
                      </div>

                      {/* Verification Controls */}
                      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/60 p-6 space-y-4 shadow-sm">
                        <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white">
                          ✅ Safe Action Check
                        </h4>

                        {!checkedAnswers ? (
                          <button
                            onClick={() => setCheckedAnswers(true)}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition shadow-lg shadow-indigo-600/10 active:scale-95"
                          >
                            Check My Steps & Solutions
                          </button>
                        ) : (
                          <div className="space-y-4 animate-in fade-in duration-300 text-left">
                            <div className="flex gap-2 items-center p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-wider">
                              <CheckCircle2 className="w-5 h-5 shrink-0" />
                              All Checked & Safe!
                            </div>
                            <p className="text-[11px] text-gray-500 leading-normal">
                              Compare your steps with the official WHO steps on the left side of the screen.
                            </p>
                            <button
                              onClick={() => {
                                setCheckedAnswers(false);
                                setScenarioStepsCheck({});
                              }}
                              className="w-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-250 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-300 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition"
                            >
                              Restart Simulation Case
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>

                </div>
              )}

            </div>
          )}

            {/* TAB 8: ADMIN PORTAL */}
            {activeTab === 'admin' && (
              <div className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
              isAdminLightMode 
                ? 'bg-slate-50 border-slate-200 text-slate-800 shadow-xl shadow-slate-100/50' 
                : 'bg-slate-950 border-slate-800 text-slate-100 shadow-2xl'
            }`}>
              
              {/* Top Banner with Title, Light Mode Toggle, and HUD */}
              <div className={`p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 text-left ${
                isAdminLightMode 
                  ? 'bg-white border-slate-200' 
                  : 'bg-slate-900/40 border-slate-900'
              }`}>
                <div>
                  <h3 className={`text-lg font-black tracking-tight ${
                    isAdminLightMode ? 'text-slate-900' : 'text-white'
                  }`}>Hospital Administration Portal</h3>
                  <p className={`text-xs ${
                    isAdminLightMode ? 'text-slate-500' : 'text-gray-400'
                  }`}>Manage NBU clinical coverage, active nurse rosters, and access credentials.</p>
                </div>
                
                {/* Light Mode Switcher & Security Banner */}
                <div className="flex items-center gap-3">
                  {/* Theme Selector Pill */}
                  <button 
                    onClick={() => setIsAdminLightMode(!isAdminLightMode)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition ${
                      isAdminLightMode 
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200' 
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    {isAdminLightMode ? '🌙 Go Dark' : '☀️ Light Mode'}
                  </button>

                  <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-450 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    Secure Vetting Active
                  </div>
                </div>
              </div>

              {/* Main Sidebar Layout Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
                
                {/* Left Side Navigation Panel */}
                <aside className={`lg:col-span-3 p-6 border-r flex flex-col justify-between transition-all duration-300 text-left ${
                  isAdminLightMode 
                    ? 'bg-white border-slate-200' 
                    : 'bg-slate-900/20 border-slate-900'
                }`}>
                  <div className="space-y-6">
                    <span className={`text-[9px] font-black uppercase tracking-[0.25em] block ${
                      isAdminLightMode ? 'text-slate-400' : 'text-gray-500'
                    }`}>Admin Categories</span>
                    
                    <nav className="flex flex-col gap-1.5">
                      <button
                        onClick={() => setAdminSubTab('overview')}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all text-left ${
                          adminSubTab === 'overview'
                            ? (isAdminLightMode 
                                ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm shadow-indigo-100/50' 
                                : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15')
                            : (isAdminLightMode
                                ? 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                : 'text-gray-400 hover:bg-slate-900 hover:text-white')
                        }`}
                      >
                        <BarChart className="w-4 h-4" />
                        Overview Stats
                      </button>

                      <button
                        onClick={() => setAdminSubTab('vetting')}
                        className={`flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all text-left ${
                          adminSubTab === 'vetting'
                            ? (isAdminLightMode 
                                ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm shadow-indigo-100/50' 
                                : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15')
                            : (isAdminLightMode
                                ? 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                : 'text-gray-400 hover:bg-slate-900 hover:text-white')
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <UserCheck className="w-4 h-4" />
                          Vetting Queue
                        </span>
                        {allUsers.filter(u => u.status === 'Pending').length > 0 && (
                          <span className={`flex h-5 min-w-[20px] px-1.5 items-center justify-center rounded-full text-[9px] font-black font-mono leading-none ${
                            adminSubTab === 'vetting'
                              ? (isAdminLightMode ? 'bg-indigo-200 text-indigo-800' : 'bg-white text-indigo-600')
                              : 'bg-amber-500 text-white animate-pulse'
                          }`}>
                            {allUsers.filter(u => u.status === 'Pending').length}
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => setAdminSubTab('directory')}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all text-left ${
                          adminSubTab === 'directory'
                            ? (isAdminLightMode 
                                ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm shadow-indigo-100/50' 
                                : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15')
                            : (isAdminLightMode
                                ? 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                : 'text-gray-400 hover:bg-slate-900 hover:text-white')
                        }`}
                      >
                        <Users className="w-4 h-4" />
                        Staff Directory
                      </button>
                    </nav>
                  </div>

                  {/* Sidebar Footer info */}
                  <div className={`mt-10 pt-6 border-t text-[10px] space-y-2 font-semibold ${
                    isAdminLightMode ? 'border-slate-100 text-slate-400' : 'border-slate-900 text-gray-500'
                  }`}>
                    <div className="flex justify-between">
                      <span>Authority Level:</span>
                      <strong className={isAdminLightMode ? 'text-slate-700' : 'text-gray-300'}>{auth.user.role}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Ward:</span>
                      <strong className={isAdminLightMode ? 'text-slate-700' : 'text-gray-300'}>NBU Ward A / ICU</strong>
                    </div>
                  </div>
                </aside>

                {/* Right Side Content Panel */}
                <main className={`lg:col-span-9 p-6 sm:p-8 transition-all duration-300 ${
                  isAdminLightMode ? 'bg-slate-50' : 'bg-transparent'
                }`}>
                  
                  {/* SUBTAB: OVERVIEW */}
                  {adminSubTab === 'overview' && (
                    <div className="space-y-8 animate-in fade-in duration-300 text-left">
                      
                      {/* Stat Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className={`p-6 rounded-3xl border shadow-sm space-y-2 transition duration-300 ${
                          isAdminLightMode ? 'bg-white border-slate-200 text-slate-800' : 'bg-gray-800 border-gray-700/60 text-slate-100'
                        }`}>
                          <span className={`text-[10px] font-black uppercase tracking-widest block font-mono ${
                            isAdminLightMode ? 'text-slate-400' : 'text-gray-500'
                          }`}>Active Ward Staff</span>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-650 dark:text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/10">
                              <Users className="w-6 h-6" />
                            </div>
                            <div>
                              <span className="text-3xl font-black">{allUsers.length}</span>
                              <span className={`text-[10px] block font-semibold ${isAdminLightMode ? 'text-slate-400' : 'text-gray-500'}`}>Registered Users</span>
                            </div>
                          </div>
                        </div>

                        <div className={`p-6 rounded-3xl border shadow-sm space-y-2 transition duration-300 ${
                          isAdminLightMode ? 'bg-white border-slate-200 text-slate-800' : 'bg-gray-800 border-gray-700/60 text-slate-100'
                        }`}>
                          <span className={`text-[10px] font-black uppercase tracking-widest block font-mono ${
                            isAdminLightMode ? 'text-slate-400' : 'text-gray-500'
                          }`}>Credentials Pending</span>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/30 text-amber-650 dark:text-amber-400 rounded-2xl flex items-center justify-center border border-amber-500/10">
                              <Clock className="w-6 h-6" />
                            </div>
                            <div>
                              <span className={`text-3xl font-black ${allUsers.filter(u => u.status === 'Pending').length > 0 ? 'text-amber-505' : ''}`}>
                                {allUsers.filter(u => u.status === 'Pending').length}
                              </span>
                              <span className={`text-[10px] block font-semibold ${isAdminLightMode ? 'text-slate-400' : 'text-gray-500'}`}>Awaiting Vetting</span>
                            </div>
                          </div>
                        </div>

                        <div className={`p-6 rounded-3xl border shadow-sm space-y-2 transition duration-300 ${
                          isAdminLightMode ? 'bg-white border-slate-200 text-slate-800' : 'bg-gray-800 border-gray-700/60 text-slate-100'
                        }`}>
                          <span className={`text-[10px] font-black uppercase tracking-widest block font-mono ${
                            isAdminLightMode ? 'text-slate-400' : 'text-gray-500'
                          }`}>Verified Clinicians</span>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-650 dark:text-emerald-400 rounded-2xl flex items-center justify-center border border-emerald-500/10">
                              <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div>
                              <span className="text-3xl font-black text-emerald-600">{allUsers.filter(u => u.status === 'Approved').length}</span>
                              <span className={`text-[10px] block font-semibold ${isAdminLightMode ? 'text-slate-400' : 'text-gray-500'}`}>Fully Vetted</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Welcome HUD Panel */}
                      <div className={`p-6 rounded-[32px] border text-left flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition ${
                        isAdminLightMode 
                          ? 'bg-gradient-to-br from-indigo-50/50 to-white border-indigo-100 shadow-sm' 
                          : 'bg-gradient-to-br from-indigo-950/20 to-slate-900 border-indigo-500/10'
                      }`}>
                        <div className="space-y-2">
                          <h4 className={`text-base font-extrabold ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>
                            System Authorization Guidelines
                          </h4>
                          <p className={`text-xs leading-relaxed max-w-xl font-medium ${isAdminLightMode ? 'text-slate-600' : 'text-gray-400'}`}>
                            Verify newly registered nurses and pediatrician candidates using the **Vetting Queue**. Approved clinical credentials grant standard staff immediate database read/write access to neonate calculations and handover panels.
                          </p>
                        </div>
                        <button
                          onClick={() => setAdminSubTab('vetting')}
                          className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/10 shrink-0 transition"
                        >
                          Open Vetting Queue
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SUBTAB: VETTING QUEUE */}
                  {adminSubTab === 'vetting' && (
                    <div className="space-y-6 animate-in fade-in duration-300 text-left">
                      <div>
                        <h4 className={`text-sm font-black uppercase tracking-widest flex items-center gap-2 ${
                          isAdminLightMode ? 'text-slate-800' : 'text-white'
                        }`}>
                          <UserCheck className="w-4 h-4 text-indigo-500" /> Pending Access Vetting
                        </h4>
                        <p className={`text-xs mt-1 ${isAdminLightMode ? 'text-slate-500' : 'text-gray-400'}`}>
                          Activate or deny medical staff login requests. Please verify institutional ID credentials.
                        </p>
                      </div>

                      {allUsers.filter(u => u.status === 'Pending').length === 0 ? (
                        <div className={`p-12 rounded-[32px] border text-center font-semibold leading-relaxed transition ${
                          isAdminLightMode 
                            ? 'bg-white border-slate-200 text-slate-400 shadow-sm' 
                            : 'bg-gray-800 border-gray-700/60 text-gray-400'
                        }`}>
                          <Check className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                          <p className={`text-sm font-black ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>Vetting queue is empty!</p>
                          <p className="text-xs mt-1 text-slate-400">All registered clinicians have been successfully approved.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {allUsers.filter(u => u.status === 'Pending').map((user) => (
                            <div key={user.id} className={`p-5 rounded-3xl border shadow-sm flex flex-col justify-between gap-4 transition ${
                              isAdminLightMode ? 'bg-white border-slate-200 text-slate-800' : 'bg-gray-800 border-gray-700/60 text-slate-100'
                            }`}>
                              <div className="flex gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-sm font-black font-mono border ${
                                  isAdminLightMode 
                                    ? 'bg-indigo-50 border-indigo-100 text-indigo-600' 
                                    : 'bg-indigo-950/40 border-indigo-900/35 text-indigo-400'
                                }`}>
                                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </div>
                                <div className="space-y-1 text-left">
                                  <h5 className={`font-extrabold text-sm ${isAdminLightMode ? 'text-slate-900' : 'text-white'}`}>{user.name}</h5>
                                  <span className={`text-[10px] font-black uppercase tracking-widest block font-mono ${
                                    isAdminLightMode ? 'text-slate-400' : 'text-gray-500'
                                  }`}>{user.email}</span>
                                  <span className={`inline-block px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border ${
                                    isAdminLightMode 
                                      ? 'bg-indigo-50 border-indigo-100 text-indigo-650' 
                                      : 'bg-indigo-950/20 border-indigo-500/10 text-indigo-400'
                                  }`}>
                                    {user.role}
                                  </span>
                                </div>
                              </div>

                              <div className={`grid grid-cols-2 gap-2 text-[10px] font-semibold p-3 rounded-xl border ${
                                isAdminLightMode 
                                  ? 'bg-slate-50 border-slate-100 text-slate-500' 
                                  : 'bg-slate-900/50 border-slate-800/80 text-gray-500'
                              }`}>
                                <div>
                                  <span className="block text-[8px] font-black uppercase tracking-wider text-slate-400">ID Number</span>
                                  <span className={`font-bold ${isAdminLightMode ? 'text-slate-805' : 'text-gray-300'}`}>{user.id_number || 'N/A'}</span>
                                </div>
                                <div>
                                  <span className="block text-[8px] font-black uppercase tracking-wider text-slate-455">Phone Contact</span>
                                  <span className={`font-bold ${isAdminLightMode ? 'text-slate-850' : 'text-gray-300'}`}>{user.phone || 'N/A'}</span>
                                </div>
                              </div>

                              <div className={`flex items-center gap-3 pt-4 border-t ${
                                isAdminLightMode ? 'border-slate-100' : 'border-slate-700/40'
                              }`}>
                                <button
                                  onClick={() => router.post(`/admin/users/${user.id}/approve`)}
                                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition duration-200"
                                >
                                  Approve Credentials
                                </button>
                                <button
                                  onClick={() => router.post(`/admin/users/${user.id}/reject`)}
                                  className={`py-2.5 px-4 rounded-xl text-[10px] font-black uppercase tracking-wider border transition duration-200 ${
                                    isAdminLightMode 
                                      ? 'bg-slate-50 hover:bg-rose-50 border-slate-200 hover:border-rose-200 text-slate-500 hover:text-rose-600' 
                                      : 'bg-gray-900 hover:bg-rose-500/10 border-gray-700 text-gray-400 hover:text-rose-500'
                                  }`}
                                >
                                  Deny
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* SUBTAB: STAFF DIRECTORY */}
                  {adminSubTab === 'directory' && (
                    <div className="space-y-6 animate-in fade-in duration-300 text-left">
                      
                      {/* Search Directory Filter */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h4 className={`text-sm font-black uppercase tracking-widest ${
                            isAdminLightMode ? 'text-slate-850' : 'text-white'
                          }`}>Clinical Staff Database</h4>
                          <p className={`text-xs ${isAdminLightMode ? 'text-slate-500' : 'text-gray-400'}`}>
                            Promote / reassign shift roles and configure permissions instantly.
                          </p>
                        </div>
                        
                        <div className="relative w-full sm:w-72">
                          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Search directory..."
                            value={adminSearchTerm}
                            onChange={(e) => setAdminSearchTerm(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-bold outline-none border transition ${
                              isAdminLightMode 
                                ? 'bg-white border-slate-200 text-slate-800 focus:border-indigo-400 shadow-inner' 
                                : 'bg-slate-900 border-slate-800 text-slate-100 focus:border-indigo-500'
                            }`}
                          />
                          {adminSearchTerm && (
                            <button 
                              onClick={() => setAdminSearchTerm('')} 
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-250"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Directory Table */}
                      <div className={`rounded-[32px] border overflow-hidden transition ${
                        isAdminLightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-gray-800 border-gray-700/60 shadow-lg'
                      }`}>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className={`text-[10px] font-black uppercase tracking-wider border-b transition ${
                                isAdminLightMode 
                                  ? 'bg-slate-50 border-slate-200 text-slate-400' 
                                  : 'bg-gray-900 border-gray-700 text-gray-500'
                              }`}>
                                <th className="p-5">Name / Contact</th>
                                <th className="p-5">Assigned Ward Role</th>
                                <th className="p-5">Access Vetting Status</th>
                                <th className="p-5">Administrative Tools</th>
                              </tr>
                            </thead>
                            <tbody className={`divide-y text-xs font-semibold ${
                              isAdminLightMode ? 'divide-slate-100 text-slate-700' : 'divide-slate-700/40 text-gray-300'
                            }`}>
                              {allUsers.filter(user => 
                                user.name.toLowerCase().includes(adminSearchTerm.toLowerCase()) || 
                                user.email.toLowerCase().includes(adminSearchTerm.toLowerCase())
                              ).length === 0 ? (
                                <tr>
                                  <td colSpan="4" className="p-10 text-center text-gray-400">
                                    No records match your search filter criteria.
                                  </td>
                                </tr>
                              ) : (
                                allUsers.filter(user => 
                                  user.name.toLowerCase().includes(adminSearchTerm.toLowerCase()) || 
                                  user.email.toLowerCase().includes(adminSearchTerm.toLowerCase())
                                ).map((user) => (
                                  <tr key={user.id} className={`transition ${
                                    isAdminLightMode 
                                      ? 'hover:bg-slate-50/50' 
                                      : 'hover:bg-gray-900/30'
                                  }`}>
                                    <td className="p-5">
                                      <div className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black font-mono shrink-0 border ${
                                          isAdminLightMode 
                                            ? 'bg-slate-100 border-slate-200/50 text-slate-500' 
                                            : 'bg-slate-900 border-slate-700/50 text-gray-500'
                                        }`}>
                                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                        </div>
                                        <div>
                                          <span className={`font-extrabold block ${
                                            isAdminLightMode ? 'text-slate-900' : 'text-white'
                                          }`}>{user.name}</span>
                                          <span className={`text-[10px] font-medium block mt-0.5 ${
                                            isAdminLightMode ? 'text-slate-400' : 'text-gray-450'
                                          }`}>{user.email}</span>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-5">
                                      <span className={`inline-block px-2.5 py-0.5 border rounded text-[9px] font-black uppercase tracking-wider ${
                                        isAdminLightMode 
                                          ? 'bg-slate-105 border-slate-200/60 text-slate-600' 
                                          : 'bg-gray-900 border-gray-700/50 text-gray-300'
                                      }`}>
                                        {user.role}
                                      </span>
                                    </td>
                                    <td className="p-5">
                                      {user.status === 'Approved' && (
                                        <span className="px-2.5 py-1 bg-emerald-100/75 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 rounded-full text-[9px] font-black uppercase tracking-wider">
                                          Approved Access
                                        </span>
                                      )}
                                      {user.status === 'Pending' && (
                                        <span className="px-2.5 py-1 bg-amber-100/75 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border border-amber-500/20 rounded-full text-[9px] font-black uppercase tracking-wider">
                                          Awaiting Vetting
                                        </span>
                                      )}
                                      {user.status === 'Rejected' && (
                                        <span className="px-2.5 py-1 bg-rose-100/75 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 border border-rose-500/20 rounded-full text-[9px] font-black uppercase tracking-wider">
                                          Denied Access
                                        </span>
                                      )}
                                    </td>
                                    <td className="p-5">
                                      <div className="flex items-center gap-3">
                                        <select
                                          defaultValue={user.role}
                                          onChange={(e) => {
                                            router.post(`/admin/users/${user.id}/update-role`, {
                                              role: e.target.value
                                            });
                                          }}
                                          className={`p-2 border rounded-xl outline-none text-[11px] font-bold transition ${
                                            isAdminLightMode 
                                              ? 'bg-slate-50 border-slate-200 text-slate-700 focus:border-indigo-400' 
                                              : 'bg-slate-900 border-slate-800 text-gray-100 focus:border-indigo-500'
                                          }`}
                                        >
                                          <option value="Nursing In-Charge">Nursing In-Charge</option>
                                          <option value="Nurse">Nurse</option>
                                          <option value="Consultant Pediatrician">Consultant Pediatrician</option>
                                          <option value="CO Pediatrics / MO">CO Pediatrics / MO</option>
                                          <option value="Student">Student</option>
                                          <option value="ICT / IT Support">ICT / IT Support</option>
                                          <option value="Hospital Management">Hospital Management</option>
                                        </select>
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

                </main>
              </div>
            </div>
          )}
            </main>
          </div>
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
