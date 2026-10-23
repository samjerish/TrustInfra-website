'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Chrome, Check, User, Building2, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { ROLE_LABELS } from '@/lib/constants';
import type { UserRole } from '@/types';

const roleOptions: { role: UserRole; description: string; icon: string }[] = [
  { role: 'customer', description: 'I want to build a property', icon: '🏠' },
  { role: 'engineer', description: 'I manage construction projects', icon: '👷' },
  { role: 'architect', description: 'I design buildings & structures', icon: '📐' },
  { role: 'dealer', description: 'I supply construction materials', icon: '🏪' },
  { role: 'worker', description: 'I work on construction sites', icon: '🔨' },
  { role: 'supervisor', description: 'I supervise construction sites', icon: '📋' },
  { role: 'project_manager', description: 'I manage project teams', icon: '📊' },
  { role: 'finance', description: 'I handle project finances', icon: '💰' },
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    company: '',
    agreeTerms: false,
  });

  const totalSteps = 3;

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-purple-900" />
        <div className="absolute inset-0 gradient-mesh opacity-20" />

        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-7 h-7" />
            </div>
            <span className="text-2xl font-bold">Trust Infra</span>
          </div>

          <h2 className="text-3xl font-bold leading-tight mb-4">
            Join the Future of Construction Management
          </h2>
          <p className="text-base text-white/70 mb-12">
            Create your free account and start managing your construction projects with AI-powered intelligence.
          </p>

          {/* Progress Steps */}
          <div className="space-y-4">
            {[
              { num: 1, label: 'Choose Your Role' },
              { num: 2, label: 'Personal Details' },
              { num: 3, label: 'Set Password' },
            ].map(({ num, label }) => (
              <div key={num} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= num ? 'bg-white text-brand-600' : 'bg-white/20 text-white/60'
                  }`}>
                  {step > num ? <Check className="w-4 h-4" /> : num}
                </div>
                <span className={`text-sm font-medium ${step >= num ? 'text-white' : 'text-white/50'}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-6 bg-white dark:bg-surface-950">
        <div className="w-full max-w-lg">
          {/* Progress Bar (Mobile) */}
          <div className="lg:hidden mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-surface-900 dark:text-white">Trust Infra</span>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div key={i} className={`flex-1 h-1 rounded-full ${i < step ? 'bg-brand-500' : 'bg-surface-200 dark:bg-surface-800'}`} />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">
              {step === 1 && 'Choose your role'}
              {step === 2 && 'Personal details'}
              {step === 3 && 'Create password'}
            </h1>
            <p className="text-sm text-surface-500 dark:text-surface-400">
              {step === 1 && 'Select the role that best describes you.'}
              {step === 2 && 'Tell us about yourself so we can personalize your experience.'}
              {step === 3 && 'Choose a strong password to secure your account.'}
            </p>
          </div>

          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div className="space-y-3">
              {roleOptions.map(({ role, description, icon }) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${selectedRole === role
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10'
                    : 'border-surface-200 dark:border-surface-800 hover:border-surface-300 dark:hover:border-surface-700'
                    }`}
                >
                  <span className="text-2xl">{icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-surface-900 dark:text-white">{ROLE_LABELS[role]}</p>
                    <p className="text-xs text-surface-500 dark:text-surface-400">{description}</p>
                  </div>
                  {selectedRole === role && (
                    <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Personal Details */}
          {step === 2 && (
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 text-sm font-medium hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors">
                <Chrome className="w-5 h-5" />
                Sign up with Google
              </button>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-surface-200 dark:bg-surface-800" />
                <span className="text-xs text-surface-400">OR</span>
                <div className="flex-1 h-px bg-surface-200 dark:bg-surface-800" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Full Name</label>
                <input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="Rajesh Kumar" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Email Address</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="rajesh@example.com" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Phone Number</label>
                <div className="flex gap-2">
                  <select className="input-field w-24"><option>+91</option></select>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="9876543210" className="input-field flex-1" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Company / Organization (Optional)</label>
                <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Your company name" className="input-field" />
              </div>
            </div>
          )}

          {/* Step 3: Password */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Create a strong password" className="input-field pr-10" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`flex-1 h-1 rounded-full ${formData.password.length >= i * 3 ? 'bg-brand-500' : 'bg-surface-200 dark:bg-surface-800'}`} />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Confirm Password</label>
                <input type="password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} placeholder="Confirm your password" className="input-field" />
              </div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.agreeTerms} onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })} className="w-4 h-4 mt-0.5 rounded border-surface-300 text-brand-500" />
                <span className="text-sm text-surface-600 dark:text-surface-400">
                  I agree to the <a href="#" className="text-brand-500 font-medium">Terms of Service</a> and <a href="#" className="text-brand-500 font-medium">Privacy Policy</a>
                </span>
              </label>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="btn-ghost">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={() => step < totalSteps ? setStep(step + 1) : null}
              className="btn-primary"
            >
              {step === totalSteps ? 'Create Account' : 'Continue'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-center text-surface-500 dark:text-surface-400 mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-brand-500 hover:text-brand-600 font-semibold">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
