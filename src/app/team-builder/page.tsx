'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Users,
  User,
  Search,
  Star,
  Shield,
  Plus,
  X,
  Trash2,
  Zap,
  CheckCircle2,
  AlertCircle,
  Award,
  Sparkles,
  Building2,
  BookmarkCheck,
  BarChart3,
  HelpCircle,
  HardHat,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock list of professionals
const PROFESSIONALS = [
  // Architects
  {
    id: 'p1',
    name: 'Priya Sharma',
    role: 'architect',
    exp: 9,
    projects: 18,
    rate: 6000,
    rating: 5.0,
    avatar: '📐',
    specialties: ['Sustainable layouts', 'Atrium design', 'CAD detailing'],
  },
  {
    id: 'p2',
    name: 'Kavita Nair',
    role: 'architect',
    exp: 7,
    projects: 14,
    rate: 5500,
    rating: 4.9,
    avatar: '📐',
    specialties: ['AutoCAD blueprinting', 'Modern facades', 'Space optimization'],
  },
  {
    id: 'p3',
    name: 'Rajeev Mehta',
    role: 'architect',
    exp: 12,
    projects: 32,
    rate: 8000,
    rating: 4.8,
    avatar: '📐',
    specialties: ['Steel structures', 'Skyscrapers', 'Green energy facades'],
  },

  // Engineers
  {
    id: 'p4',
    name: 'Arun Verma',
    role: 'engineer',
    exp: 8,
    projects: 22,
    rate: 4800,
    rating: 4.9,
    avatar: '👷',
    specialties: ['M25 concrete mix', 'Load-bearing pillars', 'Geotechnical survey'],
  },
  {
    id: 'p5',
    name: 'Sanjay Rawat',
    role: 'engineer',
    exp: 10,
    projects: 25,
    rate: 5000,
    rating: 4.7,
    avatar: '👷',
    specialties: ['Seismic reinforcement', 'Foundation curing', 'Bridge frames'],
  },
  {
    id: 'p6',
    name: 'Neha Patil',
    role: 'engineer',
    exp: 6,
    projects: 15,
    rate: 4200,
    rating: 4.8,
    avatar: '👷',
    specialties: ['Hydraulics flow', 'Retaining walls', 'Site grading'],
  },

  // Supervisors
  {
    id: 'p7',
    name: 'Deepak Singh',
    role: 'supervisor',
    exp: 11,
    projects: 35,
    rate: 3800,
    rating: 4.9,
    avatar: '📋',
    specialties: ['OSHA compliance', 'Safety lock grids', 'Daily logs audits'],
  },
  {
    id: 'p8',
    name: 'Gurpreet Singh',
    role: 'supervisor',
    exp: 13,
    projects: 42,
    rate: 4000,
    rating: 4.8,
    avatar: '📋',
    specialties: ['Material distribution', 'Labour scaling', 'Milestones tracking'],
  },

  // Workers (Masons / Structural Leads)
  {
    id: 'p9',
    name: 'Ram Singh',
    role: 'worker',
    exp: 15,
    projects: 60,
    rate: 1800,
    rating: 5.0,
    avatar: '🧱',
    specialties: ['Double-arch masonry', 'Hand-mortar bricks', 'Clay works'],
  },
  {
    id: 'p10',
    name: 'Mohammad Ali',
    role: 'worker',
    exp: 12,
    projects: 48,
    rate: 1700,
    rating: 4.7,
    avatar: '🧱',
    specialties: ['Granite tiling', 'Concrete casting', 'Scaffolding lead'],
  },
  {
    id: 'p11',
    name: 'Lakhan Lal',
    role: 'worker',
    exp: 18,
    projects: 75,
    rate: 1900,
    rating: 4.9,
    avatar: '🧱',
    specialties: ['Leveling frameworks', 'Demolition safety', 'Slab setup'],
  },
];

function TeamBuilderContent() {
  const searchParams = useSearchParams();

  // Selected Slots
  const [selectedArchitect, setSelectedArchitect] = useState<any | null>(null);
  const [selectedEngineer, setSelectedEngineer] = useState<any | null>(null);
  const [selectedSupervisor, setSelectedSupervisor] = useState<any | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<any | null>(null);

  // Browsing/Filter States
  const [currentTab, setCurrentTab] = useState<'architect' | 'engineer' | 'supervisor' | 'worker'>(
    'architect'
  );
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
      const candidate = PROFESSIONALS.find((p) => p.name === hireName && p.role === hireRole);
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
  const filteredCatalog = PROFESSIONALS.filter((p) => {
    const matchesTab = p.role === currentTab;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesExp = p.exp >= minExp;
    return matchesTab && matchesSearch && matchesExp;
  });

  // Calculate dynamic stats
  const activeMembers = [
    selectedArchitect,
    selectedEngineer,
    selectedSupervisor,
    selectedWorker,
  ].filter(Boolean);
  const totalCost = activeMembers.reduce((sum, m) => sum + m.rate, 0);
  const totalExperience = activeMembers.reduce((sum, m) => sum + m.exp, 0);
  const totalProjects = activeMembers.reduce((sum, m) => sum + m.projects, 0);

  // AI compatibility index logic
  const calculateCompatibility = () => {
    if (activeMembers.length <= 1) return 0;

    // Simulate synergy mapping
    let base = 75;

    // Priya & Arun have high synergy due to past collaborations
    const hasPriya = activeMembers.some((m) => m.name === 'Priya Sharma');
    const hasArun = activeMembers.some((m) => m.name === 'Arun Verma');
    if (hasPriya && hasArun) base += 15;

    // Experienced worker (Ram Singh / Lakhan) + Good Architect increases synergy
    const hasExpertWorker = activeMembers.some(
      (m) => m.name === 'Ram Singh' || m.name === 'Lakhan Lal'
    );
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
      report +=
        '🔥 Stellar architect-engineer overlap: Priya and Arun have co-delivered 3 major projects, securing faster blueprints approvals. ';
    } else {
      report +=
        '✅ Balanced Core: Architect and Structural Engineer slots present a reliable foundation for zoning compliance. ';
    }

    if (hasDeepak && hasRam) {
      report +=
        'Deepak’s focus on OSHA safety complements Ram’s detailed double-arch brickwork, ensuring complex masonry works run with minimal delay risks. ';
    }

    if (totalExperience > 30) {
      report += `Combined seniority of ${totalExperience} years reduces potential execution flaws by 32% (predicted by historical site records). `;
    }

    if (totalCost > 15000) {
      report +=
        '⚠️ Warning: Combined daily rates are slightly high. Consider substituting a senior architect/engineer if you are looking to optimize the core foundation phase budget.';
    } else {
      report +=
        '💡 Budget Efficiency: Good combination of cost and experience. Daily burn rate is highly optimal.';
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
      <div className="flex animate-fade-in flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-xl text-white">
              <Users className="h-4 w-4" />
            </div>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
              Custom Team Builder
            </h1>
          </div>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
            Build, test, and analyze the coordination quotient of your construction crew.
          </p>
        </div>

        {activeMembers.length > 0 && (
          <button
            onClick={() => setIsProposalModalOpen(true)}
            className="btn-primary px-5 py-2 text-sm"
          >
            <BookmarkCheck className="h-4 w-4" /> Save Team Combination
          </button>
        )}
      </div>

      {/* Main Grid: Slot Selection Workspace + Team Analytics */}
      <div className="animate-delay-100 grid animate-fade-in grid-cols-1 gap-6 lg:grid-cols-12">
        {/* =======================================================
           LEFT VIEW: Active Selected Slots
           ======================================================= */}
        <div className="space-y-6 lg:col-span-8">
          <div className="premium-card p-6">
            <h2 className="mb-6 flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-surface-900 dark:text-white">
              <Building2 className="w-4.5 h-4.5 text-brand-500" /> Crew Workspace
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Slot 1: Architect */}
              <div
                className={cn(
                  'group relative flex min-h-[140px] flex-col justify-between rounded-2xl border-2 p-5 transition-all',
                  selectedArchitect
                    ? 'shadow-glass-sm border-brand-500/40 bg-brand-500/5 dark:bg-brand-500/5'
                    : 'border-dashed border-surface-200 bg-surface-50/50 hover:border-surface-300 dark:border-surface-800 dark:bg-surface-900/10 dark:hover:border-surface-700'
                )}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-2xs font-bold uppercase tracking-widest text-surface-400">
                      Slot 01 • Architect
                    </span>
                    {selectedArchitect && (
                      <button
                        onClick={() => removeSlot('architect')}
                        className="rounded-lg bg-surface-100 p-1 text-surface-400 transition-colors hover:text-red-500 dark:bg-surface-800"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                  {selectedArchitect ? (
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-500/25 bg-brand-500/10 text-2xl">
                        {selectedArchitect.avatar}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-surface-900 dark:text-white">
                          {selectedArchitect.name}
                        </h3>
                        <p className="mt-0.5 font-mono text-2xs text-surface-500">
                          {selectedArchitect.exp} Years Exp • {selectedArchitect.projects} Projects
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-6 text-xs italic text-surface-400">
                      Assign an Architect to design structural blueprints.
                    </p>
                  )}
                </div>
                {!selectedArchitect && (
                  <button
                    onClick={() => {
                      setCurrentTab('architect');
                      setSearchQuery('');
                    }}
                    className="mt-4 inline-flex items-center gap-1 text-2xs font-semibold text-brand-500 hover:underline"
                  >
                    <Plus className="h-3.5 w-3.5" /> Browse Candidates
                  </button>
                )}
              </div>

              {/* Slot 2: Structural Engineer */}
              <div
                className={cn(
                  'group relative flex min-h-[140px] flex-col justify-between rounded-2xl border-2 p-5 transition-all',
                  selectedEngineer
                    ? 'shadow-glass-sm border-brand-500/40 bg-brand-500/5 dark:bg-brand-500/5'
                    : 'border-dashed border-surface-200 bg-surface-50/50 hover:border-surface-300 dark:border-surface-800 dark:bg-surface-900/10 dark:hover:border-surface-700'
                )}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-2xs font-bold uppercase tracking-widest text-surface-400">
                      Slot 02 • Structural Engineer
                    </span>
                    {selectedEngineer && (
                      <button
                        onClick={() => removeSlot('engineer')}
                        className="rounded-lg bg-surface-100 p-1 text-surface-400 transition-colors hover:text-red-500 dark:bg-surface-800"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                  {selectedEngineer ? (
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-500/25 bg-brand-500/10 text-2xl">
                        {selectedEngineer.avatar}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-surface-900 dark:text-white">
                          {selectedEngineer.name}
                        </h3>
                        <p className="mt-0.5 font-mono text-2xs text-surface-500">
                          {selectedEngineer.exp} Years Exp • {selectedEngineer.projects} Projects
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-6 text-xs italic text-surface-400">
                      Assign an Engineer for structural checks & concrete mixes.
                    </p>
                  )}
                </div>
                {!selectedEngineer && (
                  <button
                    onClick={() => {
                      setCurrentTab('engineer');
                      setSearchQuery('');
                    }}
                    className="mt-4 inline-flex items-center gap-1 text-2xs font-semibold text-brand-500 hover:underline"
                  >
                    <Plus className="h-3.5 w-3.5" /> Browse Candidates
                  </button>
                )}
              </div>

              {/* Slot 3: Site Supervisor */}
              <div
                className={cn(
                  'group relative flex min-h-[140px] flex-col justify-between rounded-2xl border-2 p-5 transition-all',
                  selectedSupervisor
                    ? 'shadow-glass-sm border-brand-500/40 bg-brand-500/5 dark:bg-brand-500/5'
                    : 'border-dashed border-surface-200 bg-surface-50/50 hover:border-surface-300 dark:border-surface-800 dark:bg-surface-900/10 dark:hover:border-surface-700'
                )}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-2xs font-bold uppercase tracking-widest text-surface-400">
                      Slot 03 • Site Supervisor
                    </span>
                    {selectedSupervisor && (
                      <button
                        onClick={() => removeSlot('supervisor')}
                        className="rounded-lg bg-surface-100 p-1 text-surface-400 transition-colors hover:text-red-500 dark:bg-surface-800"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                  {selectedSupervisor ? (
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-500/25 bg-brand-500/10 text-2xl">
                        {selectedSupervisor.avatar}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-surface-900 dark:text-white">
                          {selectedSupervisor.name}
                        </h3>
                        <p className="mt-0.5 font-mono text-2xs text-surface-500">
                          {selectedSupervisor.exp} Years Exp • {selectedSupervisor.projects}{' '}
                          Projects
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-6 text-xs italic text-surface-400">
                      Assign a Supervisor to lead labour & update daily site logs.
                    </p>
                  )}
                </div>
                {!selectedSupervisor && (
                  <button
                    onClick={() => {
                      setCurrentTab('supervisor');
                      setSearchQuery('');
                    }}
                    className="mt-4 inline-flex items-center gap-1 text-2xs font-semibold text-brand-500 hover:underline"
                  >
                    <Plus className="h-3.5 w-3.5" /> Browse Candidates
                  </button>
                )}
              </div>

              {/* Slot 4: Lead Mason / Master Worker */}
              <div
                className={cn(
                  'group relative flex min-h-[140px] flex-col justify-between rounded-2xl border-2 p-5 transition-all',
                  selectedWorker
                    ? 'shadow-glass-sm border-brand-500/40 bg-brand-500/5 dark:bg-brand-500/5'
                    : 'border-dashed border-surface-200 bg-surface-50/50 hover:border-surface-300 dark:border-surface-800 dark:bg-surface-900/10 dark:hover:border-surface-700'
                )}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-2xs font-bold uppercase tracking-widest text-surface-400">
                      Slot 04 • Master Worker
                    </span>
                    {selectedWorker && (
                      <button
                        onClick={() => removeSlot('worker')}
                        className="rounded-lg bg-surface-100 p-1 text-surface-400 transition-colors hover:text-red-500 dark:bg-surface-800"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                  {selectedWorker ? (
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-500/25 bg-brand-500/10 text-2xl">
                        {selectedWorker.avatar}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-surface-900 dark:text-white">
                          {selectedWorker.name}
                        </h3>
                        <p className="mt-0.5 font-mono text-2xs text-surface-500">
                          {selectedWorker.exp} Years Exp • {selectedWorker.projects} Projects
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-6 text-xs italic text-surface-400">
                      Assign a Lead Worker for high-precision brickwork or mortar.
                    </p>
                  )}
                </div>
                {!selectedWorker && (
                  <button
                    onClick={() => {
                      setCurrentTab('worker');
                      setSearchQuery('');
                    }}
                    className="mt-4 inline-flex items-center gap-1 text-2xs font-semibold text-brand-500 hover:underline"
                  >
                    <Plus className="h-3.5 w-3.5" /> Browse Candidates
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
           RIGHT VIEW: Dynamic Performance & Synergy Analysis
           ======================================================= */}
        <div className="space-y-6 lg:col-span-4">
          <div className="premium-card space-y-5 p-5">
            <h2 className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-surface-900 dark:text-white">
              <BarChart3 className="w-4.5 h-4.5 text-brand-500" /> Combined Analytics
            </h2>

            {/* Gauge compatibility score */}
            <div className="flex flex-col items-center rounded-xl border border-surface-200 bg-surface-50/50 p-3 dark:border-surface-800/80 dark:bg-surface-900/30">
              <span className="text-3xs font-mono uppercase tracking-widest text-surface-400">
                AI Compatibility Index
              </span>

              <div className="relative mt-3 flex h-28 w-28 items-center justify-center">
                {/* Simulated circle indicator */}
                <svg className="h-full w-full -rotate-90 transform">
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    strokeWidth="6"
                    stroke="currentColor"
                    className="text-surface-200 dark:text-surface-850"
                    fill="transparent"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    strokeWidth="6"
                    stroke="currentColor"
                    className="text-brand-500 transition-all duration-700"
                    fill="transparent"
                    strokeDasharray={288}
                    strokeDashoffset={288 - (288 * compatibilityScore) / 100}
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="font-mono text-2xl font-black text-surface-900 dark:text-white">
                    {compatibilityScore}%
                  </span>
                  <span className="text-4xs mt-0.5 block font-mono font-semibold uppercase tracking-wider text-brand-500">
                    SYNERGY
                  </span>
                </div>
              </div>
            </div>

            {/* Summary statistics */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-surface-500">Crew Daily Rate:</span>
                <span className="font-mono font-bold text-surface-900 dark:text-white">
                  ₹{totalCost.toLocaleString()}/day
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-surface-500">Combined Experience:</span>
                <span className="font-mono font-bold text-surface-900 dark:text-white">
                  {totalExperience} Years
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-surface-500">Aggregated Deliveries:</span>
                <span className="font-mono font-bold text-surface-900 dark:text-white">
                  {totalProjects} Projects
                </span>
              </div>
            </div>

            {/* AI insight summary text */}
            <div className="space-y-2 rounded-xl border border-brand-500/10 bg-brand-500/5 p-3.5">
              <div className="flex items-center gap-1.5 font-mono text-2xs font-semibold uppercase tracking-wider text-brand-500">
                <Zap className="h-3.5 w-3.5 text-brand-500" /> AI Synergy Report
              </div>
              <p className="text-[11px] leading-relaxed text-surface-700 dark:text-surface-300">
                {getAISynergyInsight()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================
         BOTTOM ROW: Professional Catalog Browsing
         ======================================================= */}
      <div className="premium-card animate-delay-200 animate-fade-in">
        {/* Catalog Control Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-surface-200 p-5 dark:border-surface-800 md:flex-row md:items-center">
          {/* Role Tabs */}
          <div className="flex gap-1 self-start rounded-xl bg-surface-100 p-1 dark:bg-surface-900">
            {[
              { id: 'architect', label: 'Architects', icon: '📐' },
              { id: 'engineer', label: 'Engineers', icon: '👷' },
              { id: 'supervisor', label: 'Supervisors', icon: '📋' },
              { id: 'worker', label: 'Masons & Workers', icon: '🧱' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id as any)}
                className={cn(
                  'py-1.8 flex items-center gap-1.5 rounded-lg px-3.5 text-xs font-semibold transition-all',
                  currentTab === tab.id
                    ? 'bg-white text-brand-600 shadow-sm dark:bg-surface-800 dark:text-brand-400'
                    : 'text-surface-500 hover:text-surface-900 dark:hover:text-white'
                )}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="py-1.8 flex w-60 items-center gap-2 rounded-xl border border-surface-200 bg-surface-100 px-3 text-xs dark:border-surface-800/80 dark:bg-surface-900">
              <Search className="h-4 w-4 text-surface-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${currentTab}s or specialties...`}
                className="w-full bg-transparent text-surface-700 outline-none placeholder:text-surface-500 dark:text-surface-300"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-surface-400">Min Experience:</span>
              <select
                value={minExp}
                onChange={(e) => setMinExp(Number(e.target.value))}
                className="rounded-xl border border-surface-200 bg-surface-100 px-2.5 py-1.5 font-semibold text-surface-700 dark:border-surface-850 dark:bg-surface-900 dark:text-surface-300"
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
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCatalog.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-surface-200 p-12 text-center dark:border-surface-800">
              <AlertCircle className="mx-auto mb-2 h-8 w-8 text-surface-400" />
              <p className="text-xs text-surface-600 dark:text-surface-400">
                No matching professionals found.
              </p>
              <p className="mt-1 text-2xs text-surface-500">
                Try adjusting your search queries or experience filters.
              </p>
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
                    'group relative flex h-[210px] flex-col justify-between rounded-2xl border-2 bg-white p-5 transition-all dark:bg-surface-900',
                    isSelected
                      ? 'border-brand-500 bg-brand-500/5 dark:bg-brand-500/5'
                      : 'hover:border-surface-350 dark:hover:border-surface-750 border-surface-200 dark:border-surface-850'
                  )}
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-200 bg-surface-50 text-xl dark:border-surface-800 dark:bg-surface-850">
                          {prof.avatar}
                        </div>
                        <div>
                          <h4 className="flex items-center gap-1 text-xs font-bold text-surface-900 dark:text-white">
                            {prof.name}
                          </h4>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-surface-400">
                            {prof.role}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block font-mono text-2xs font-bold text-surface-900 dark:text-white">
                          ₹{prof.rate.toLocaleString()}
                        </span>
                        <span className="mt-0.5 block text-[9px] text-surface-400">per day</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-3 flex gap-4 border-b border-surface-100 pb-3 dark:border-surface-850">
                      <div className="flex items-center gap-1 text-[11px] text-surface-600 dark:text-surface-400">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{prof.rating.toFixed(1)}</span>
                      </div>
                      <div className="font-mono text-[11px] text-surface-500">
                        {prof.exp} yr Exp
                      </div>
                      <div className="font-mono text-[11px] text-surface-500">
                        {prof.projects} Projects
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {prof.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="rounded-lg border border-surface-200 bg-surface-100 px-2 py-0.5 text-[10px] text-surface-600 dark:border-surface-800/80 dark:bg-surface-850 dark:text-surface-400"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Add Action Button */}
                  <button
                    onClick={() => selectProfessional(prof)}
                    className={cn(
                      'mt-4 flex w-full items-center justify-center gap-1 rounded-xl py-2 text-2xs font-bold transition-all',
                      isSelected
                        ? 'bg-emerald-500 text-white shadow-glow hover:bg-emerald-600'
                        : 'bg-surface-50 text-surface-700 hover:bg-brand-500 hover:text-white dark:bg-surface-800 dark:text-surface-300'
                    )}
                  >
                    {isSelected ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Selected to Slot
                      </>
                    ) : (
                      <>
                        <Plus className="h-3.5 w-3.5" /> Select to Team Combo
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
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsProposalModalOpen(false)}
          />
          <div className="relative w-full max-w-md animate-scale-in rounded-xl border border-surface-200 bg-white p-6 shadow-glass-lg dark:border-surface-800 dark:bg-surface-900">
            <div className="border-surface-250 mb-4 flex items-center justify-between border-b pb-2 dark:border-surface-800">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 animate-pulse text-brand-500" />
                <h3 className="text-base font-bold text-surface-900 dark:text-white">
                  Save Team Combination
                </h3>
              </div>
              <button
                onClick={() => setIsProposalModalOpen(false)}
                className="rounded-lg p-1 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {savedSuccess ? (
              <div className="space-y-3 py-8 text-center">
                <div className="mx-auto flex h-14 w-14 animate-bounce items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-sm font-bold text-surface-900 dark:text-white">
                  Crew Proposal Created!
                </h3>
                <p className="mx-auto max-w-xs text-xs leading-relaxed text-surface-500">
                  The team combination details and AI compatibility analysis have been registered to
                  your active draft project scopes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSaveTeamCombo} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-surface-600 dark:text-surface-400">
                    Combination Nickname
                  </label>
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
                <div className="space-y-2 rounded-xl border border-surface-200 bg-surface-50 p-3 text-2xs dark:border-surface-800 dark:bg-surface-850/60">
                  <p className="mb-1 font-mono font-semibold uppercase tracking-widest text-surface-400">
                    Crew List Summary
                  </p>
                  {selectedArchitect && (
                    <div className="flex justify-between">
                      <span className="text-surface-500">Architect:</span>{' '}
                      <span className="font-semibold text-surface-800 dark:text-surface-200">
                        {selectedArchitect.name}
                      </span>
                    </div>
                  )}
                  {selectedEngineer && (
                    <div className="flex justify-between">
                      <span className="text-surface-500">Engineer:</span>{' '}
                      <span className="font-semibold text-surface-800 dark:text-surface-200">
                        {selectedEngineer.name}
                      </span>
                    </div>
                  )}
                  {selectedSupervisor && (
                    <div className="flex justify-between">
                      <span className="text-surface-500">Supervisor:</span>{' '}
                      <span className="font-semibold text-surface-800 dark:text-surface-200">
                        {selectedSupervisor.name}
                      </span>
                    </div>
                  )}
                  {selectedWorker && (
                    <div className="flex justify-between">
                      <span className="text-surface-500">Master Worker:</span>{' '}
                      <span className="font-semibold text-surface-800 dark:text-surface-200">
                        {selectedWorker.name}
                      </span>
                    </div>
                  )}
                  <div className="dark:border-surface-750 flex justify-between border-t border-surface-200 pt-2 text-xs font-bold">
                    <span>Daily Burn Rate:</span>
                    <span className="font-mono text-brand-500">₹{totalCost.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-surface-255 flex justify-end gap-2 border-t pt-2 dark:border-surface-800">
                  <button
                    type="button"
                    onClick={() => setIsProposalModalOpen(false)}
                    className="btn-secondary text-xs"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary px-6 text-xs">
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
      <Suspense
        fallback={
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
          </div>
        }
      >
        <TeamBuilderContent />
      </Suspense>
    </DashboardLayout>
  );
}
