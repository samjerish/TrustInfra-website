'use client';

import React, { useState, useEffect } from 'react';
import {
  Building2, Bot, Shield, Users, BarChart3, Zap, ArrowRight, Star,
  ChevronRight, Check, Sparkles, Globe, Clock, TrendingUp, Award,
  Package, FileText, Video, Menu, X, Sun, Moon, Play, MessageSquare
} from 'lucide-react';

const features = [
  {
    icon: Building2,
    title: 'Complete Project Management',
    description: 'Plan, track, and manage construction projects from foundation to finish with real-time progress dashboards.',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    icon: Bot,
    title: 'AI-Powered Intelligence',
    description: 'Smart cost estimation, BOQ generation, risk analysis, and timeline predictions powered by advanced AI.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Users,
    title: 'Stakeholder Collaboration',
    description: 'Connect customers, engineers, architects, dealers, and workers in one unified ecosystem.',
    color: 'from-orange-500 to-red-600',
  },
  {
    icon: Package,
    title: 'Material & Dealer Marketplace',
    description: 'Compare dealer quotations, track deliveries, and optimize material procurement automatically.',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Role-based access control, end-to-end encryption, and comprehensive audit logging.',
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
    content: 'Trust Infra transformed how we manage our 50+ concurrent projects. The AI assistant alone saved us 30% on material costs.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Senior Architect, DesignHub Studio',
    content: 'The collaboration between architects and engineers is seamless. Version control for designs is a game-changer.',
    rating: 5,
  },
  {
    name: 'Amit Patel',
    role: 'Civil Engineer, BuildRight Infrastructure',
    content: 'BOQ generation that used to take days now happens in minutes. The accuracy of AI estimations is remarkable.',
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
  { step: '01', title: 'Create Project', description: 'Customer initiates a project with requirements, site details, and budget.' },
  { step: '02', title: 'Design & Plan', description: 'Architect uploads designs, engineer reviews, AI analyzes feasibility.' },
  { step: '03', title: 'Estimate & Procure', description: 'AI generates BOQ, dealers submit quotations, customer approves.' },
  { step: '04', title: 'Build & Monitor', description: 'Workers get assigned tasks, supervisors track progress in real-time.' },
  { step: '05', title: 'Complete & Report', description: 'Quality inspection, completion report, and project handover.' },
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
    <div className="min-h-screen bg-white dark:bg-surface-950 text-surface-900 dark:text-white overflow-x-hidden">
      {/* === Navigation === */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-surface-950/80 backdrop-blur-xl border-b border-surface-200 dark:border-surface-800 shadow-sm' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">Trust Infra</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {['Features', 'Workflow', 'Pricing', 'Testimonials'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white transition-colors">
                  {item}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <a href="/login" className="btn-ghost text-sm">Sign In</a>
              <a href="/customer" className="btn-primary text-sm">
                Get Started <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-surface-950 border-b border-surface-200 dark:border-surface-800 px-4 py-4 space-y-3">
            {['Features', 'Workflow', 'Pricing', 'Testimonials'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="block py-2 text-sm font-medium text-surface-600 dark:text-surface-400">
                {item}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <a href="/login" className="btn-secondary text-sm flex-1 text-center">Sign In</a>
              <a href="/customer" className="btn-primary text-sm flex-1 text-center">Get Started</a>
            </div>
          </div>
        )}
      </nav>

      {/* === Hero Section === */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 gradient-mesh opacity-60 dark:opacity-30" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-brand-500/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent-500/15 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-600 dark:text-brand-400 text-sm font-medium mb-8 animate-fade-up">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Construction Intelligence</span>
              <ChevronRight className="w-3 h-3" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
              Build Smarter with{' '}
              <span className="gradient-text">AI-Driven</span>{' '}
              Construction Management
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-surface-600 dark:text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '200ms' }}>
              Connect every stakeholder — customers, engineers, architects, dealers, and workers — into one intelligent ecosystem. From planning to completion, all in one platform.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: '300ms' }}>
              <a href="/customer" className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto">
                Start Building Free
                <ArrowRight className="w-5 h-5" />
              </a>
              <button className="btn-secondary text-base px-8 py-3.5 w-full sm:w-auto group">
                <Play className="w-5 h-5 text-brand-500 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '400ms' }}>
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Dashboard Preview */}
          <div className="mt-20 relative max-w-5xl mx-auto animate-fade-up" style={{ animationDelay: '500ms' }}>
            <div className="rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-800 shadow-glass-lg bg-white dark:bg-surface-900">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-surface-50 dark:bg-surface-800/50 border-b border-surface-200 dark:border-surface-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="max-w-md mx-auto h-6 rounded-md bg-surface-200 dark:bg-surface-700 flex items-center px-3">
                    <span className="text-2xs text-surface-400">app.trustinfra.com/dashboard</span>
                  </div>
                </div>
              </div>
              {/* Dashboard Preview */}
              <div className="p-6 bg-surface-50 dark:bg-surface-950">
                <div className="grid grid-cols-4 gap-4 mb-4">
                  {[
                    { label: 'Active Projects', value: '12', change: '+2', color: 'bg-indigo-500' },
                    { label: 'Total Budget', value: '₹8.5Cr', change: '+15%', color: 'bg-emerald-500' },
                    { label: 'Team Members', value: '156', change: '+8', color: 'bg-amber-500' },
                    { label: 'AI Analyses', value: '342', change: '+45', color: 'bg-pink-500' },
                  ].map((card) => (
                    <div key={card.label} className="rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full ${card.color}`} />
                        <span className="text-2xs text-surface-500">{card.label}</span>
                      </div>
                      <p className="text-lg font-bold text-surface-900 dark:text-white">{card.value}</p>
                      <span className="text-2xs text-emerald-500 font-medium">{card.change}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 h-40 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-surface-900 dark:text-white">Project Progress</span>
                      <span className="text-2xs text-surface-400">Last 30 days</span>
                    </div>
                    <div className="flex items-end gap-1.5 h-24">
                      {[40, 55, 35, 70, 45, 80, 60, 75, 50, 85, 65, 90].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t-sm bg-brand-500/20 dark:bg-brand-500/30 relative" style={{ height: `${h}%` }}>
                          <div className="absolute bottom-0 left-0 right-0 rounded-t-sm bg-brand-500" style={{ height: `${h * 0.7}%` }} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-40 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 p-4">
                    <span className="text-xs font-semibold text-surface-900 dark:text-white">AI Insights</span>
                    <div className="mt-3 space-y-2">
                      {['Cost optimized by 12%', 'Risk: Low probability', '3 tasks due tomorrow'].map((insight, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-surface-50 dark:bg-surface-800/50">
                          <Bot className="w-3 h-3 text-brand-500" />
                          <span className="text-2xs text-surface-600 dark:text-surface-400">{insight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Glow Effect */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-brand-500/20 blur-2xl rounded-full" />
          </div>
        </div>
      </section>

      {/* === Features Section === */}
      <section id="features" className="py-20 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-brand-500 uppercase tracking-wider">Features</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-3 mb-4">
              Everything You Need to{' '}
              <span className="gradient-text">Build Better</span>
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-400">
              A unified platform that replaces multiple tools with one intelligent ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group premium-card p-6 relative overflow-hidden"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">{feature.description}</p>
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} rounded-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === Workflow Section === */}
      <section id="workflow" className="py-20 lg:py-32 bg-surface-50 dark:bg-surface-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-accent-500 uppercase tracking-wider">Workflow</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-3 mb-4">
              From <span className="gradient-text-accent">Blueprint to Building</span>
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-400">
              A streamlined 5-step process that takes your project from inception to completion.
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-500 via-accent-500 to-brand-500 opacity-20" />

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {workflowSteps.map((step, index) => (
                <div key={step.step} className="relative group">
                  <div className="premium-card p-6 text-center relative z-10">
                    <div className="w-12 h-12 mx-auto rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm mb-4 group-hover:scale-110 transition-transform shadow-glow">
                      {step.step}
                    </div>
                    <h3 className="text-base font-semibold text-surface-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === Pricing Section === */}
      <section id="pricing" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-brand-500 uppercase tracking-wider">Pricing</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-3 mb-4">
              Plans That <span className="gradient-text">Scale With You</span>
            </h2>
            <p className="text-lg text-surface-600 dark:text-surface-400">
              Start free, upgrade as you grow. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 ${plan.popular
                  ? 'bg-surface-900 dark:bg-white text-white dark:text-surface-900 ring-2 ring-brand-500 shadow-glow-lg scale-105'
                  : 'premium-card'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-brand-500 text-white text-xs font-semibold shadow-glow">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                  <p className={`text-sm ${plan.popular ? 'text-surface-300 dark:text-surface-500' : 'text-surface-500 dark:text-surface-400'}`}>
                    {plan.description}
                  </p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? 'text-surface-400 dark:text-surface-500' : 'text-surface-500'}`}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm">
                      <Check className={`w-4 h-4 flex-shrink-0 ${plan.popular ? 'text-brand-400 dark:text-brand-600' : 'text-brand-500'}`} />
                      <span className={plan.popular ? 'text-surface-200 dark:text-surface-600' : 'text-surface-600 dark:text-surface-400'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${plan.popular
                  ? 'bg-brand-500 text-white hover:bg-brand-600 shadow-glow'
                  : 'btn-secondary'
                  }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Testimonials Section === */}
      <section id="testimonials" className="py-20 lg:py-32 bg-surface-50 dark:bg-surface-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-brand-500 uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-3 mb-4">
              Trusted by <span className="gradient-text">Industry Leaders</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="premium-card p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed mb-6">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-surface-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-surface-500 dark:text-surface-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === CTA Section === */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[150px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Ready to <span className="gradient-text">Transform</span> Your Construction Business?
          </h2>
          <p className="text-lg text-surface-600 dark:text-surface-400 mb-10 max-w-2xl mx-auto">
            Join 500+ construction companies already using Trust Infra to build smarter, faster, and more efficiently.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/customer" className="btn-primary text-base px-10 py-4 w-full sm:w-auto">
              Get Started for Free
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#" className="btn-ghost text-base px-8 py-4 w-full sm:w-auto">
              Schedule a Demo
            </a>
          </div>
        </div>
      </section>

      {/* === Footer === */}
      <footer className="border-t border-surface-200 dark:border-surface-800 py-12 bg-white dark:bg-surface-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">Trust Infra</span>
              </div>
              <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
                Enterprise Construction Management & AI Collaboration Platform. Building the future, one project at a time.
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
                <h4 className="text-sm font-semibold text-surface-900 dark:text-white mb-4">{section.title}</h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-surface-500 dark:text-surface-400">
              © 2024 Trust Infra. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <a key={social} href="#" className="text-sm text-surface-500 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white transition-colors">
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
