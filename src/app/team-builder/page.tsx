'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Users, User, Search, Star, Shield, Plus, X, Trash2, Zap,
  CheckCircle2, AlertCircle, Award, Sparkles, Building2,
  BookmarkCheck, BarChart3, HelpCircle, HardHat, Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock list of professionals
const PROFESSIONALS = [
  // Architects
  { id: 'p1', name: 'Priya Sharma', role: 'architect', exp: 9, projects: 18, rate: 6000, rating: 5.0, avatar: '📐', specialties: ['Sustainable layouts', 'Atrium design', 'CAD detailing'] },
  { id: 'p2', name: 'Kavita Nair', role: 'architect', exp: 7, projects: 14, rate: 5500, rating: 4.9, avatar: '📐', specialties: ['AutoCAD blueprinting', 'Modern facades', 'Space optimization'] },
  { id: 'p3', name: 'Rajeev Mehta', role: 'architect', exp: 12, projects: 32, rate: 8000, rating: 4.8, avatar: '📐', specialties: ['Steel structures', 'Skyscrapers', 'Green energy facades'] },
  
  // Engineers
  { id: 'p4', name: 'Arun Verma', role: 'engineer', exp: 8, projects: 22, rate: 4800, rating: 4.9, avatar: '👷', specialties: ['M25 concrete mix', 'Load-bearing pillars', 'Geotechnical survey'] },
  { id: 'p5', name: 'Sanjay Rawat', role: 'engineer', exp: 10, projects: 25, rate: 5000, rating: 4.7, avatar: '👷', specialties: ['Seismic reinforcement', 'Foundation curing', 'Bridge frames'] },
  { id: 'p6', name: 'Neha Patil', role: 'engineer', exp: 6, projects: 15, rate: 4200, rating: 4.8, avatar: '👷', specialties: ['Hydraulics flow', 'Retaining walls', 'Site grading'] },
  
  // Supervisors
  { id: 'p7', name: 'Deepak Singh', role: 'supervisor', exp: 11, projects: 35, rate: 3800, rating: 4.9, avatar: '📋', specialties: ['OSHA compliance', 'Safety lock grids', 'Daily logs audits'] },
  { id: 'p8', name: 'Gurpreet Singh', role: 'supervisor', exp: 13, projects: 42, rate: 4000, rating: 4.8, avatar: '📋', specialties: ['Material distribution', 'Labour scaling', 'Milestones tracking'] },
  
  // Workers (Masons / Structural Leads)
  { id: 'p9', name: 'Ram Singh', role: 'worker', exp: 15, projects: 60, rate: 1800, rating: 5.0, avatar: '🧱', specialties: ['Double-arch masonry', 'Hand-mortar bricks', 'Clay works'] },
  { id: 'p10', name: 'Mohammad Ali', role: 'worker', exp: 12, projects: 48, rate: 1700, rating: 4.7, avatar: '🧱', specialties: ['Granite tiling', 'Concrete casting', 'Scaffolding lead'] },
  { id: 'p11', name: 'Lakhan Lal', role: 'worker', exp: 18, projects: 75, rate: 1900, rating: 4.9, avatar: '🧱', specialties: ['Leveling frameworks', 'Demolition safety', 'Slab setup'] },
];

function TeamBuilderContent() {
  const searchParams = useSearchParams();
  
  // Selected Slots
  const [selectedArchitect, setSelectedArchitect] = useState<any | null>(null);
  const [selectedEngineer, setSelectedEngineer] = useState<any | null>(null);
  const [selectedSupervisor, setSelectedSupervisor] = useState<any | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<any | null>(null);
  
  // Browsing/Filter States
  const [currentTab, setCurrentTab] = useState<'architect' | 'engineer' | 'supervisor' | 'worker'>('architect');
  const [searchQuery, setSearchQuery] = useState('');
  const [minExp, setMinExp] = useState(0);

  // Proposal modal
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Link selected candidate from search query parameters (Feed redirects)
  useEffect(() => {
    const hireName = searchParams.get('hire');
    const hireRole = searchParams.get('role');
    
    if (hireName && hireRole) {
      const candidate = PROFESSIONALS.find(p => p.name === hireName && p.role === hireRole);
      if (candidate) {
        if (hireRole === 'architect') setSelectedArchitect(candidate);
        else if (hireRole === 'engineer') setSelectedEngineer(candidate);
        else if (hireRole === 'supervisor') setSelectedSupervisor(candidate);
        else if (hireRole === 'worker') setSelectedWorker(candidate);
        
        // Open the corresponding tab
        setCurrentTab(hireRole as any);
      }
    }
  }, [searchParams]);

  // Handle Slot removals
  const removeSlot = (role: string) => {
    if (role === 'architect') setSelectedArchitect(null);
    else if (role === 'engineer') setSelectedEngineer(null);
    else if (role === 'supervisor') setSelectedSupervisor(null);
    else if (role === 'worker') setSelectedWorker(null);
  };

  // Add professional to their slot
  const selectProfessional = (candidate: any) => {
    if (candidate.role === 'architect') setSelectedArchitect(candidate);
    else if (candidate.role === 'engineer') setSelectedEngineer(candidate);
    else if (candidate.role === 'supervisor') setSelectedSupervisor(candidate);
    else if (candidate.role === 'worker') setSelectedWorker(candidate);
  };

  // Filter Catalog
  const filteredCatalog = PROFESSIONALS.filter(p => {
    const matchesTab = p.role === currentTab;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesExp = p.exp >= minExp;
    return matchesTab && matchesSearch && matchesExp;
  });

  // Calculate dynamic stats
  const activeMembers = [selectedArchitect, selectedEngineer, selectedSupervisor, selectedWorker].filter(Boolean);
  const totalCost = activeMembers.reduce((sum, m) => sum + m.rate, 0);
  const totalExperience = activeMembers.reduce((sum, m) => sum + m.exp, 0);
  const totalProjects = activeMembers.reduce((sum, m) => sum + m.projects, 0);

  // AI compatibility index logic
  const calculateCompatibility = () => {
    if (activeMembers.length <= 1) return 0;
    
    // Simulate synergy mapping
    let base = 75;
    
    // Priya & Arun have high synergy due to past collaborations
    const hasPriya = activeMembers.some(m => m.name === 'Priya Sharma');
    const hasArun = activeMembers.some(m => m.name === 'Arun Verma');
    if (hasPriya && hasArun) base += 15;

    // Experienced worker (Ram Singh / Lakhan) + Good Architect increases synergy
    const hasExpertWorker = activeMembers.some(m => m.name === 'Ram Singh' || m.name === 'Lakhan Lal');
    if (hasExpertWorker) base += 5;

    // Combined experience above 20 years increases synergy
    if (totalExperience > 25) base += 4;
    
    return Math.min(base, 99);
  };

  const compatibilityScore = calculateCompatibility();

  // AI dynamic insight commentary
  const getAISynergyInsight = () => {
    if (activeMembers.length === 0) {
      return 'Fill professional slots below to analyze structural compatibility, overlap, and budget allocation recommendations.';
    }
    if (activeMembers.length === 1) {
      return `Selected ${activeMembers[0].name}. Please add at least one more team member (e.g. Civil Engineer or Architect) to evaluate structural and design integration analysis.`;
    }

    let report = '';
    const hasPriya = selectedArchitect?.name === 'Priya Sharma';
    const hasArun = selectedEngineer?.name === 'Arun Verma';
    const hasDeepak = selectedSupervisor?.name === 'Deepak Singh';
    const hasRam = selectedWorker?.name === 'Ram Singh';

    if (hasPriya && hasArun) {
      report += '🔥 Stellar architect-engineer overlap: Priya and Arun have co-delivered 3 major projects, securing faster blueprints approvals. ';
    } else {
      report += '✅ Balanced Core: Architect and Structural Engineer slots present a reliable foundation for zoning compliance. ';
    }

    if (hasDeepak && hasRam) {
      report += 'Deepak’s focus on OSHA safety complements Ram’s detailed double-arch brickwork, ensuring complex masonry works run with minimal delay risks. ';
    }

    if (totalExperience > 30) {
      report += `Combined seniority of ${totalExperience} years reduces potential execution flaws by 32% (predicted by historical site records). `;
    }

    if (totalCost > 15000) {
      report += '⚠️ Warning: Combined daily rates are slightly high. Consider substituting a senior architect/engineer if you are looking to optimize the core foundation phase budget.';
    } else {
      report += '💡 Budget Efficiency: Good combination of cost and experience. Daily burn rate is highly optimal.';
    }

    return report;
  };

  // Submit combination save handler
  const handleSaveTeamCombo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsProposalModalOpen(false);
      setTeamName('');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center text-white">
              <Users className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Custom Team Builder</h1>
          </div>
          <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
            Build, test, and analyze the coordination quotient of your construction crew.
          </p>
        </div>
        
        {activeMembers.length > 0 && (
          <button 
            onClick={() => setIsProposalModalOpen(true)}
            className="btn-primary text-sm py-2 px-5"
          >
            <BookmarkCheck className="w-4 h-4" /> Save Team Combination
          </button>
        )}
      </div>

      {/* Main Grid: Slot Selection Workspace + Team Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in animate-delay-100">
        
        {/* =======================================================
           LEFT VIEW: Active Selected Slots
           ======================================================= */}
        <div className="lg:col-span-8 space-y-6">
          <div className="premium-card p-6">
            <h2 className="text-sm font-semibold text-surface-900 dark:text-white uppercase tracking-wider mb-6 flex items-center gap-1.5">
              <Building2 className="w-4.5 h-4.5 text-brand-500" /> Crew Workspace
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Slot 1: Architect */}
              <div className={cn(
                "p-5 rounded-2xl border-2 transition-all flex flex-col justify-between min-h-[140px] relative group",
                selectedArchitect 
                  ? "border-brand-500/40 bg-brand-500/5 dark:bg-brand-500/5 shadow-glass-sm" 
                  : "border-dashed border-surface-200 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-900/10 hover:border-surface-300 dark:hover:border-surface-700"
              )}>
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-2xs font-bold text-surface-400 uppercase tracking-widest font-mono">Slot 01 • Architect</span>
                    {selectedArchitect && (
                      <button onClick={() => removeSlot('architect')} className="p-1 rounded-lg bg-surface-100 dark:bg-surface-800 text-surface-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  {selectedArchitect ? (
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center text-2xl border border-brand-500/25">
                        {selectedArchitect.avatar}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-surface-900 dark:text-white">{selectedArchitect.name}</h3>
                        <p className="text-2xs text-surface-500 font-mono mt-0.5">{selectedArchitect.exp} Years Exp • {selectedArchitect.projects} Projects</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-surface-400 mt-6 italic">Assign an Architect to design structural blueprints.</p>
                  )}
                </div>
                {!selectedArchitect && (
                  <button 
                    onClick={() => { setCurrentTab('architect'); setSearchQuery(''); }}
                    className="mt-4 inline-flex items-center gap-1 text-2xs text-brand-500 font-semibold hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" /> Browse Candidates
                  </button>
                )}
              </div>

              {/* Slot 2: Structural Engineer */}
              <div className={cn(
                "p-5 rounded-2xl border-2 transition-all flex flex-col justify-between min-h-[140px] relative group",
                selectedEngineer 
                  ? "border-brand-500/40 bg-brand-500/5 dark:bg-brand-500/5 shadow-glass-sm" 
                  : "border-dashed border-surface-200 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-900/10 hover:border-surface-300 dark:hover:border-surface-700"
              )}>
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-2xs font-bold text-surface-400 uppercase tracking-widest font-mono">Slot 02 • Structural Engineer</span>
                    {selectedEngineer && (
                      <button onClick={() => removeSlot('engineer')} className="p-1 rounded-lg bg-surface-100 dark:bg-surface-800 text-surface-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  {selectedEngineer ? (
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center text-2xl border border-brand-500/25">
                        {selectedEngineer.avatar}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-surface-900 dark:text-white">{selectedEngineer.name}</h3>
                        <p className="text-2xs text-surface-500 font-mono mt-0.5">{selectedEngineer.exp} Years Exp • {selectedEngineer.projects} Projects</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-surface-400 mt-6 italic">Assign an Engineer for structural checks & concrete mixes.</p>
                  )}
                </div>
                {!selectedEngineer && (
                  <button 
                    onClick={() => { setCurrentTab('engineer'); setSearchQuery(''); }}
                    className="mt-4 inline-flex items-center gap-1 text-2xs text-brand-500 font-semibold hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" /> Browse Candidates
                  </button>
                )}
              </div>

              {/* Slot 3: Site Supervisor */}
              <div className={cn(
                "p-5 rounded-2xl border-2 transition-all flex flex-col justify-between min-h-[140px] relative group",
                selectedSupervisor 
                  ? "border-brand-500/40 bg-brand-500/5 dark:bg-brand-500/5 shadow-glass-sm" 
                  : "border-dashed border-surface-200 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-900/10 hover:border-surface-300 dark:hover:border-surface-700"
              )}>
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-2xs font-bold text-surface-400 uppercase tracking-widest font-mono">Slot 03 • Site Supervisor</span>
                    {selectedSupervisor && (
                      <button onClick={() => removeSlot('supervisor')} className="p-1 rounded-lg bg-surface-100 dark:bg-surface-800 text-surface-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  {selectedSupervisor ? (
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center text-2xl border border-brand-500/25">
                        {selectedSupervisor.avatar}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-surface-900 dark:text-white">{selectedSupervisor.name}</h3>
                        <p className="text-2xs text-surface-500 font-mono mt-0.5">{selectedSupervisor.exp} Years Exp • {selectedSupervisor.projects} Projects</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-surface-400 mt-6 italic">Assign a Supervisor to lead labour & update daily site logs.</p>
                  )}
                </div>
                {!selectedSupervisor && (
                  <button 
                    onClick={() => { setCurrentTab('supervisor'); setSearchQuery(''); }}
                    className="mt-4 inline-flex items-center gap-1 text-2xs text-brand-500 font-semibold hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" /> Browse Candidates
                  </button>
                )}
              </div>

              {/* Slot 4: Lead Mason / Master Worker */}
              <div className={cn(
                "p-5 rounded-2xl border-2 transition-all flex flex-col justify-between min-h-[140px] relative group",
                selectedWorker 
                  ? "border-brand-500/40 bg-brand-500/5 dark:bg-brand-500/5 shadow-glass-sm" 
                  : "border-dashed border-surface-200 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-900/10 hover:border-surface-300 dark:hover:border-surface-700"
              )}>
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-2xs font-bold text-surface-400 uppercase tracking-widest font-mono">Slot 04 • Master Worker</span>
                    {selectedWorker && (
                      <button onClick={() => removeSlot('worker')} className="p-1 rounded-lg bg-surface-100 dark:bg-surface-800 text-surface-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  {selectedWorker ? (
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center text-2xl border border-brand-500/25">
                        {selectedWorker.avatar}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-surface-900 dark:text-white">{selectedWorker.name}</h3>
                        <p className="text-2xs text-surface-500 font-mono mt-0.5">{selectedWorker.exp} Years Exp • {selectedWorker.projects} Projects</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-surface-400 mt-6 italic">Assign a Lead Worker for high-precision brickwork or mortar.</p>
                  )}
                </div>
                {!selectedWorker && (
                  <button 
                    onClick={() => { setCurrentTab('worker'); setSearchQuery(''); }}
                    className="mt-4 inline-flex items-center gap-1 text-2xs text-brand-500 font-semibold hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" /> Browse Candidates
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* =======================================================
           RIGHT VIEW: Dynamic Performance & Synergy Analysis
           ======================================================= */}
        <div className="lg:col-span-4 space-y-6">
          <div className="premium-card p-5 space-y-5">
            <h2 className="text-sm font-semibold text-surface-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-4.5 h-4.5 text-brand-500" /> Combined Analytics
            </h2>

            {/* Gauge compatibility score */}
            <div className="flex flex-col items-center p-3 border border-surface-200 dark:border-surface-800/80 rounded-xl bg-surface-50/50 dark:bg-surface-900/30">
              <span className="text-3xs font-mono uppercase tracking-widest text-surface-400">AI Compatibility Index</span>
              
              <div className="relative w-28 h-28 flex items-center justify-center mt-3">
                {/* Simulated circle indicator */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="46" strokeWidth="6" stroke="currentColor" className="text-surface-200 dark:text-surface-850" fill="transparent" />
                  <circle 
                    cx="56" cy="56" r="46" strokeWidth="6" stroke="currentColor" 
                    className="text-brand-500 transition-all duration-700" 
                    fill="transparent" 
                    strokeDasharray={288} 
                    strokeDashoffset={288 - (288 * compatibilityScore) / 100} 
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-2xl font-black text-surface-900 dark:text-white font-mono">{compatibilityScore}%</span>
                  <span className="text-4xs uppercase block font-semibold text-brand-500 font-mono tracking-wider mt-0.5">SYNERGY</span>
                </div>
              </div>
            </div>

            {/* Summary statistics */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-surface-500">Crew Daily Rate:</span>
                <span className="font-bold text-surface-900 dark:text-white font-mono">₹{totalCost.toLocaleString()}/day</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-surface-500">Combined Experience:</span>
                <span className="font-bold text-surface-900 dark:text-white font-mono">{totalExperience} Years</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-surface-500">Aggregated Deliveries:</span>
                <span className="font-bold text-surface-900 dark:text-white font-mono">{totalProjects} Projects</span>
              </div>
            </div>

            {/* AI insight summary text */}
            <div className="p-3.5 rounded-xl bg-brand-500/5 border border-brand-500/10 space-y-2">
              <div className="flex items-center gap-1.5 text-brand-500 font-semibold text-2xs uppercase tracking-wider font-mono">
                <Zap className="w-3.5 h-3.5 text-brand-500" /> AI Synergy Report
              </div>
              <p className="text-[11px] text-surface-700 dark:text-surface-300 leading-relaxed">
                {getAISynergyInsight()}
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* =======================================================
         BOTTOM ROW: Professional Catalog Browsing
         ======================================================= */}
      <div className="premium-card animate-fade-in animate-delay-200">
        
        {/* Catalog Control Header */}
        <div className="p-5 border-b border-surface-200 dark:border-surface-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Role Tabs */}
          <div className="flex gap-1 bg-surface-100 dark:bg-surface-900 p-1 rounded-xl self-start">
            {[
              { id: 'architect', label: 'Architects', icon: '📐' },
              { id: 'engineer', label: 'Engineers', icon: '👷' },
              { id: 'supervisor', label: 'Supervisors', icon: '📋' },
              { id: 'worker', label: 'Masons & Workers', icon: '🧱' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id as any)}
                className={cn(
                  "px-3.5 py-1.8 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all",
                  currentTab === tab.id 
                    ? "bg-white dark:bg-surface-800 text-brand-600 dark:text-brand-400 shadow-sm" 
                    : "text-surface-500 hover:text-surface-900 dark:hover:text-white"
                )}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.8 rounded-xl bg-surface-100 dark:bg-surface-900 border border-surface-200 dark:border-surface-800/80 text-xs w-60">
              <Search className="w-4 h-4 text-surface-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${currentTab}s or specialties...`}
                className="bg-transparent outline-none text-surface-700 dark:text-surface-300 w-full placeholder:text-surface-500"
              />
            </div>
            
            <div className="flex items-center gap-2 text-xs">
              <span className="text-surface-400">Min Experience:</span>
              <select
                value={minExp}
                onChange={(e) => setMinExp(Number(e.target.value))}
                className="px-2.5 py-1.5 rounded-xl bg-surface-100 dark:bg-surface-900 border border-surface-200 dark:border-surface-850 text-surface-700 dark:text-surface-300 font-semibold"
              >
                <option value="0">Any</option>
                <option value="5">5+ Years</option>
                <option value="10">10+ Years</option>
                <option value="15">15+ Years</option>
              </select>
            </div>
          </div>

        </div>

        {/* Catalog Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCatalog.length === 0 ? (
            <div className="col-span-full p-12 text-center border border-dashed border-surface-200 dark:border-surface-800 rounded-2xl">
              <AlertCircle className="w-8 h-8 text-surface-400 mx-auto mb-2" />
              <p className="text-xs text-surface-600 dark:text-surface-400">No matching professionals found.</p>
              <p className="text-2xs text-surface-500 mt-1">Try adjusting your search queries or experience filters.</p>
            </div>
          ) : (
            filteredCatalog.map((prof) => {
              const isSelected = 
                selectedArchitect?.id === prof.id || 
                selectedEngineer?.id === prof.id || 
                selectedSupervisor?.id === prof.id || 
                selectedWorker?.id === prof.id;

              return (
                <div 
                  key={prof.id} 
                  className={cn(
                    "p-5 rounded-2xl border-2 transition-all flex flex-col justify-between h-[210px] bg-white dark:bg-surface-900 relative group",
                    isSelected 
                      ? "border-brand-500 bg-brand-500/5 dark:bg-brand-500/5" 
                      : "border-surface-200 dark:border-surface-850 hover:border-surface-350 dark:hover:border-surface-750"
                  )}
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-surface-50 dark:bg-surface-850 border border-surface-200 dark:border-surface-800 flex items-center justify-center text-xl">
                          {prof.avatar}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-surface-900 dark:text-white flex items-center gap-1">
                            {prof.name}
                          </h4>
                          <span className="text-[10px] text-surface-400 font-semibold uppercase tracking-wider">{prof.role}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xs font-bold text-surface-900 dark:text-white block font-mono">₹{prof.rate.toLocaleString()}</span>
                        <span className="text-[9px] text-surface-400 block mt-0.5">per day</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-4 mt-3 pb-3 border-b border-surface-100 dark:border-surface-850">
                      <div className="flex items-center gap-1 text-[11px] text-surface-600 dark:text-surface-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{prof.rating.toFixed(1)}</span>
                      </div>
                      <div className="text-[11px] text-surface-500 font-mono">
                        {prof.exp} yr Exp
                      </div>
                      <div className="text-[11px] text-surface-500 font-mono">
                        {prof.projects} Projects
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {prof.specialties.map(spec => (
                        <span key={spec} className="text-[10px] text-surface-600 dark:text-surface-400 bg-surface-100 dark:bg-surface-850 px-2 py-0.5 rounded-lg border border-surface-200 dark:border-surface-800/80">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Add Action Button */}
                  <button
                    onClick={() => selectProfessional(prof)}
                    className={cn(
                      "w-full py-2 rounded-xl text-2xs font-bold flex items-center justify-center gap-1 transition-all mt-4",
                      isSelected 
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-glow" 
                        : "bg-surface-50 dark:bg-surface-800 hover:bg-brand-500 hover:text-white text-surface-700 dark:text-surface-300"
                    )}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Selected to Slot
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" /> Select to Team Combo
                      </>
                    )}
                  </button>

                </div>
              );
            })
          )}
        </div>

      </div>

      {/* =======================================================
         MODAL: SAVE TEAM PROPOSAL COMBINATION
         ======================================================= */}
      {isProposalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsProposalModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-xl p-6 shadow-glass-lg animate-scale-in">
            
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-surface-250 dark:border-surface-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-500 animate-pulse" />
                <h3 className="font-bold text-base text-surface-900 dark:text-white">Save Team Combination</h3>
              </div>
              <button onClick={() => setIsProposalModalOpen(false)} className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            {savedSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-surface-900 dark:text-white">Crew Proposal Created!</h3>
                <p className="text-xs text-surface-500 max-w-xs mx-auto leading-relaxed">
                  The team combination details and AI compatibility analysis have been registered to your active draft project scopes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSaveTeamCombo} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1.5">Combination Nickname</label>
                  <input
                    type="text"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. Green Valley Core Structure Crew"
                    className="input-field animate-fade-in"
                  />
                </div>

                {/* Quick breakdown preview in modal */}
                <div className="p-3 bg-surface-50 dark:bg-surface-850/60 rounded-xl border border-surface-200 dark:border-surface-800 text-2xs space-y-2">
                  <p className="font-semibold text-surface-400 uppercase tracking-widest font-mono mb-1">Crew List Summary</p>
                  {selectedArchitect && (
                    <div className="flex justify-between"><span className="text-surface-500">Architect:</span> <span className="font-semibold text-surface-800 dark:text-surface-200">{selectedArchitect.name}</span></div>
                  )}
                  {selectedEngineer && (
                    <div className="flex justify-between"><span className="text-surface-500">Engineer:</span> <span className="font-semibold text-surface-800 dark:text-surface-200">{selectedEngineer.name}</span></div>
                  )}
                  {selectedSupervisor && (
                    <div className="flex justify-between"><span className="text-surface-500">Supervisor:</span> <span className="font-semibold text-surface-800 dark:text-surface-200">{selectedSupervisor.name}</span></div>
                  )}
                  {selectedWorker && (
                    <div className="flex justify-between"><span className="text-surface-500">Master Worker:</span> <span className="font-semibold text-surface-800 dark:text-surface-200">{selectedWorker.name}</span></div>
                  )}
                  <div className="border-t border-surface-200 dark:border-surface-750 pt-2 flex justify-between font-bold text-xs">
                    <span>Daily Burn Rate:</span>
                    <span className="text-brand-500 font-mono">₹{totalCost.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-surface-255 dark:border-surface-800">
                  <button 
                    type="button" 
                    onClick={() => setIsProposalModalOpen(false)} 
                    className="btn-secondary text-xs"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary text-xs px-6"
                  >
                    Finalize Crew combo
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default function TeamBuilderPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-4 border-brand-500 border-t-transparent animate-spin" />
        </div>
      }>
        <TeamBuilderContent />
      </Suspense>
    </DashboardLayout>
  );
}
