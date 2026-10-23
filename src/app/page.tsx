'use client';

import React, { useState, useEffect } from 'react';
import {
  Building2,
  Bot,
  Shield,
  Users,
  BarChart3,
  Zap,
  ArrowRight,
  Star,
  ChevronRight,
  Check,
  Sparkles,
  Globe,
  Clock,
  TrendingUp,
  Award,
  Package,
  FileText,
  Video,
  Menu,
  X,
  Sun,
  Moon,
  Play,
  MessageSquare,
} from 'lucide-react';

const features = [
  {
    icon: Building2,
    title: 'Complete Project Management',
    description:
      'Plan, track, and manage construction projects from foundation to finish with real-time progress dashboards.',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    icon: Bot,
    title: 'AI-Powered Intelligence',
    description:
      'Smart cost estimation, BOQ generation, risk analysis, and timeline predictions powered by advanced AI.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Users,
    title: 'Stakeholder Collaboration',
    description:
      'Connect customers, engineers, architects, dealers, and workers in one unified ecosystem.',
    color: 'from-orange-500 to-red-600',
  },
  {
    icon: Package,
    title: 'Material & Dealer Marketplace',
    description:
      'Compare dealer quotations, track deliveries, and optimize material procurement automatically.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description:
      'Role-based access control, end-to-end encryption, and comprehensive audit logging.',
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Beautiful charts, automated reports, and financial summaries at your fingertips.',
    color: 'from-amber-500 to-yellow-600',
  },
];

const stats = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '₹200Cr+', label: 'Materials Managed' },
  { value: '15K+', label: 'Active Users' },
];

const testimonials = [
  {
    name: 'Vikram Mehta',
    role: 'Managing Director, Mehta Constructions',
    content:
      'Trust Infra transformed how we manage our 50+ concurrent projects. The AI assistant alone saved us 30% on material costs.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Senior Architect, DesignHub Studio',
    content:
      'The collaboration between architects and engineers is seamless. Version control for designs is a game-changer.',
    rating: 5,
  },
  {
    name: 'Amit Patel',
    role: 'Civil Engineer, BuildRight Infrastructure',
    content:
      'BOQ generation that used to take days now happens in minutes. The accuracy of AI estimations is remarkable.',
    rating: 5,
  },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: '₹4,999',
    period: '/month',
    description: 'Perfect for small builders and individual projects',
    features: [
      'Up to 3 active projects',
      '10 team members',
      'Basic AI assistant',
      'Document management',
      'Chat system',
      'Email support',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    price: '₹14,999',
    period: '/month',
    description: 'For growing construction companies',
    features: [
      'Up to 15 active projects',
      '50 team members',
      'Advanced AI with BOQ generation',
      'Dealer marketplace access',
      'Financial management',
      'Custom reports',
      'Priority support',
      'API access',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large firms with custom requirements',
    features: [
      'Unlimited projects',
      'Unlimited team members',
      'Full AI suite with custom models',
      'White-label options',
      'Dedicated account manager',
      'On-premise deployment',
      'SLA guarantee',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const workflowSteps = [
  {
    step: '01',
    title: 'Create Project',
    description: 'Customer initiates a project with requirements, site details, and budget.',
  },
  {
    step: '02',
    title: 'Design & Plan',
    description: 'Architect uploads designs, engineer reviews, AI analyzes feasibility.',
  },
  {
    step: '03',
    title: 'Estimate & Procure',
    description: 'AI generates BOQ, dealers submit quotations, customer approves.',
  },
  {
    step: '04',
    title: 'Build & Monitor',
    description: 'Workers get assigned tasks, supervisors track progress in real-time.',
  },
  {
    step: '05',
    title: 'Complete & Report',
    description: 'Quality inspection, completion report, and project handover.',
  },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-surface-900 dark:bg-surface-950 dark:text-white">
      {/* === Navigation === */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-surface-200 bg-white/80 shadow-sm backdrop-blur-xl dark:border-surface-800 dark:bg-surface-950/80' : ''}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="gradient-primary flex h-9 w-9 items-center justify-center rounded-xl shadow-glow">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">Trust Infra</span>
            </div>

            <div className="hidden items-center gap-8 md:flex">
              {['Features', 'Workflow', 'Pricing', 'Testimonials'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-surface-600 transition-colors hover:text-surface-900 dark:text-surface-400 dark:hover:text-white"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <a href="/login" className="btn-ghost text-sm">
                Sign In
              </a>
              <a href="/customer" className="btn-primary text-sm">
                Get Started <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 hover:bg-surface-100 dark:hover:bg-surface-800 md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="space-y-3 border-b border-surface-200 bg-white px-4 py-4 dark:border-surface-800 dark:bg-surface-950 md:hidden">
            {['Features', 'Workflow', 'Pricing', 'Testimonials'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-2 text-sm font-medium text-surface-600 dark:text-surface-400"
              >
                {item}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <a href="/login" className="btn-secondary flex-1 text-center text-sm">
                Sign In
              </a>
              <a href="/customer" className="btn-primary flex-1 text-center text-sm">
                Get Started
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* === Hero Section === */}
      <section className="relative overflow-hidden pb-20 pt-32 lg:pb-32 lg:pt-40">
        {/* Gradient Background */}
        <div className="gradient-mesh absolute inset-0 opacity-60 dark:opacity-30" />
        <div className="absolute left-1/4 top-20 h-72 w-72 animate-pulse-slow rounded-full bg-brand-500/20 blur-[100px]" />
        <div
          className="absolute bottom-20 right-1/4 h-96 w-96 animate-pulse-slow rounded-full bg-accent-500/15 blur-[120px]"
          style={{ animationDelay: '1s' }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex animate-fade-up items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-600 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-400">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Construction Intelligence</span>
              <ChevronRight className="h-3 w-3" />
            </div>

            {/* Headline */}
            <h1
              className="mb-6 animate-fade-up text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl"
              style={{ animationDelay: '100ms' }}
            >
              Build Smarter with <span className="gradient-text">AI-Driven</span> Construction
              Management
            </h1>

            {/* Subtitle */}
            <p
              className="mx-auto mb-10 max-w-2xl animate-fade-up text-lg leading-relaxed text-surface-600 dark:text-surface-400 sm:text-xl"
              style={{ animationDelay: '200ms' }}
            >
              Connect every stakeholder — customers, engineers, architects, dealers, and workers —
              into one intelligent ecosystem. From planning to completion, all in one platform.
            </p>

            {/* CTAs */}
            <div
              className="mb-16 flex animate-fade-up flex-col items-center justify-center gap-4 sm:flex-row"
              style={{ animationDelay: '300ms' }}
            >
              <a href="/customer" className="btn-primary w-full px-8 py-3.5 text-base sm:w-auto">
                Start Building Free
                <ArrowRight className="h-5 w-5" />
              </a>
              <button className="btn-secondary group w-full px-8 py-3.5 text-base sm:w-auto">
                <Play className="h-5 w-5 text-brand-500 transition-transform group-hover:scale-110" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div
              className="mx-auto grid max-w-3xl animate-fade-up grid-cols-2 gap-6 lg:grid-cols-4"
              style={{ animationDelay: '400ms' }}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="gradient-text text-2xl font-bold sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Dashboard Preview */}
          <div
            className="relative mx-auto mt-20 max-w-5xl animate-fade-up"
            style={{ animationDelay: '500ms' }}
          >
            <div className="overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-glass-lg dark:border-surface-800 dark:bg-surface-900">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 border-b border-surface-200 bg-surface-50 px-4 py-3 dark:border-surface-800 dark:bg-surface-800/50">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="mx-4 flex-1">
                  <div className="mx-auto flex h-6 max-w-md items-center rounded-md bg-surface-200 px-3 dark:bg-surface-700">
                    <span className="text-2xs text-surface-400">app.trustinfra.com/dashboard</span>
                  </div>
                </div>
              </div>
              {/* Dashboard Preview */}
              <div className="bg-surface-50 p-6 dark:bg-surface-950">
                <div className="mb-4 grid grid-cols-4 gap-4">
                  {[
                    { label: 'Active Projects', value: '12', change: '+2', color: 'bg-indigo-500' },
                    {
                      label: 'Total Budget',
                      value: '₹8.5Cr',
                      change: '+15%',
                      color: 'bg-emerald-500',
                    },
                    { label: 'Team Members', value: '156', change: '+8', color: 'bg-amber-500' },
                    { label: 'AI Analyses', value: '342', change: '+45', color: 'bg-pink-500' },
                  ].map((card) => (
                    <div
                      key={card.label}
                      className="rounded-xl border border-surface-200 bg-white p-4 dark:border-surface-800 dark:bg-surface-900"
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${card.color}`} />
                        <span className="text-2xs text-surface-500">{card.label}</span>
                      </div>
                      <p className="text-lg font-bold text-surface-900 dark:text-white">
                        {card.value}
                      </p>
                      <span className="text-2xs font-medium text-emerald-500">{card.change}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-40 rounded-xl border border-surface-200 bg-white p-4 dark:border-surface-800 dark:bg-surface-900">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-semibold text-surface-900 dark:text-white">
                        Project Progress
                      </span>
                      <span className="text-2xs text-surface-400">Last 30 days</span>
                    </div>
                    <div className="flex h-24 items-end gap-1.5">
                      {[40, 55, 35, 70, 45, 80, 60, 75, 50, 85, 65, 90].map((h, i) => (
                        <div
                          key={i}
                          className="relative flex-1 rounded-t-sm bg-brand-500/20 dark:bg-brand-500/30"
                          style={{ height: `${h}%` }}
                        >
                          <div
                            className="absolute bottom-0 left-0 right-0 rounded-t-sm bg-brand-500"
                            style={{ height: `${h * 0.7}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-40 rounded-xl border border-surface-200 bg-white p-4 dark:border-surface-800 dark:bg-surface-900">
                    <span className="text-xs font-semibold text-surface-900 dark:text-white">
                      AI Insights
                    </span>
                    <div className="mt-3 space-y-2">
                      {[
                        'Cost optimized by 12%',
                        'Risk: Low probability',
                        '3 tasks due tomorrow',
                      ].map((insight, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 rounded-lg bg-surface-50 p-2 dark:bg-surface-800/50"
                        >
                          <Bot className="h-3 w-3 text-brand-500" />
                          <span className="text-2xs text-surface-600 dark:text-surface-400">
                            {insight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Glow Effect */}
            <div className="absolute -bottom-4 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-brand-500/20 blur-2xl" />
          </div>
        </div>
      </section>

      {/* === Features Section === */}
      <section id="features" className="relative py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-500">
              Features
            </span>
            <h2 className="mb-4 mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Everything You Need to <span className="gradient-text">Build Better</span>
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-400">
              A unified platform that replaces multiple tools with one intelligent ecosystem.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="premium-card group relative overflow-hidden p-6"
                >
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} mb-4 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-surface-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-surface-600 dark:text-surface-400">
                    {feature.description}
                  </p>
                  <div
                    className={`absolute right-0 top-0 h-32 w-32 bg-gradient-to-br ${feature.color} rounded-full opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-10`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === Workflow Section === */}
      <section id="workflow" className="bg-surface-50 py-20 dark:bg-surface-900/30 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-accent-500">
              Workflow
            </span>
            <h2 className="mb-4 mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              From <span className="gradient-text-accent">Blueprint to Building</span>
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-400">
              A streamlined 5-step process that takes your project from inception to completion.
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-0 right-0 top-1/2 hidden h-0.5 bg-gradient-to-r from-brand-500 via-accent-500 to-brand-500 opacity-20 lg:block" />

            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
              {workflowSteps.map((step, index) => (
                <div key={step.step} className="group relative">
                  <div className="premium-card relative z-10 p-6 text-center">
                    <div className="gradient-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white shadow-glow transition-transform group-hover:scale-110">
                      {step.step}
                    </div>
                    <h3 className="mb-2 text-base font-semibold text-surface-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-surface-500 dark:text-surface-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === Pricing Section === */}
      <section id="pricing" className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-500">
              Pricing
            </span>
            <h2 className="mb-4 mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Plans That <span className="gradient-text">Scale With You</span>
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-400">
              Start free, upgrade as you grow. No hidden fees, no surprises.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? 'scale-105 bg-surface-900 text-white shadow-glow-lg ring-2 ring-brand-500 dark:bg-white dark:text-surface-900'
                    : 'premium-card'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white shadow-glow">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="mb-1 text-lg font-semibold">{plan.name}</h3>
                  <p
                    className={`text-sm ${plan.popular ? 'text-surface-300 dark:text-surface-500' : 'text-surface-500 dark:text-surface-400'}`}
                  >
                    {plan.description}
                  </p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span
                    className={`text-sm ${plan.popular ? 'text-surface-400 dark:text-surface-500' : 'text-surface-500'}`}
                  >
                    {plan.period}
                  </span>
                </div>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm">
                      <Check
                        className={`h-4 w-4 flex-shrink-0 ${plan.popular ? 'text-brand-400 dark:text-brand-600' : 'text-brand-500'}`}
                      />
                      <span
                        className={
                          plan.popular
                            ? 'text-surface-200 dark:text-surface-600'
                            : 'text-surface-600 dark:text-surface-400'
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full rounded-xl py-3 text-sm font-semibold transition-all ${
                    plan.popular
                      ? 'bg-brand-500 text-white shadow-glow hover:bg-brand-600'
                      : 'btn-secondary'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Testimonials Section === */}
      <section id="testimonials" className="bg-surface-50 py-20 dark:bg-surface-900/30 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-500">
              Testimonials
            </span>
            <h2 className="mb-4 mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Trusted by <span className="gradient-text">Industry Leaders</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="premium-card p-6">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mb-6 text-sm leading-relaxed text-surface-600 dark:text-surface-400">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white">
                    {t.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-surface-900 dark:text-white">
                      {t.name}
                    </p>
                    <p className="text-xs text-surface-500 dark:text-surface-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === CTA Section === */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="gradient-primary absolute inset-0 opacity-[0.03]" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-[150px]" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Ready to <span className="gradient-text">Transform</span> Your Construction Business?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-surface-600 dark:text-surface-400">
            Join 500+ construction companies already using Trust Infra to build smarter, faster, and
            more efficiently.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="/customer" className="btn-primary w-full px-10 py-4 text-base sm:w-auto">
              Get Started for Free
              <ArrowRight className="h-5 w-5" />
            </a>
            <a href="#" className="btn-ghost w-full px-8 py-4 text-base sm:w-auto">
              Schedule a Demo
            </a>
          </div>
        </div>
      </section>

      {/* === Footer === */}
      <footer className="border-t border-surface-200 bg-white py-12 dark:border-surface-800 dark:bg-surface-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="gradient-primary flex h-9 w-9 items-center justify-center rounded-xl">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">Trust Infra</span>
              </div>
              <p className="text-sm leading-relaxed text-surface-500 dark:text-surface-400">
                Enterprise Construction Management & AI Collaboration Platform. Building the future,
                one project at a time.
              </p>
            </div>
            {[
              {
                title: 'Product',
                links: ['Features', 'AI Assistant', 'Pricing', 'Integrations', 'Changelog'],
              },
              {
                title: 'Company',
                links: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
              },
              {
                title: 'Legal',
                links: ['Privacy', 'Terms', 'Security', 'GDPR', 'Cookies'],
              },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="mb-4 text-sm font-semibold text-surface-900 dark:text-white">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-surface-500 transition-colors hover:text-surface-900 dark:text-surface-400 dark:hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-surface-200 pt-8 dark:border-surface-800 sm:flex-row">
            <p className="text-sm text-surface-500 dark:text-surface-400">
              © 2024 Trust Infra. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-sm text-surface-500 transition-colors hover:text-surface-900 dark:text-surface-400 dark:hover:text-white"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
