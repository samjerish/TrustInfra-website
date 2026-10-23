'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Chrome,
  Check,
  User,
  Building2,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';
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
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="relative hidden overflow-hidden lg:flex lg:w-5/12">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-purple-900" />
        <div className="gradient-mesh absolute inset-0 opacity-20" />

        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <div className="mb-12 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Sparkles className="h-7 w-7" />
            </div>
            <span className="text-2xl font-bold">Trust Infra</span>
          </div>

          <h2 className="mb-4 text-3xl font-bold leading-tight">
            Join the Future of Construction Management
          </h2>
          <p className="mb-12 text-base text-white/70">
            Create your free account and start managing your construction projects with AI-powered
            intelligence.
          </p>

          {/* Progress Steps */}
          <div className="space-y-4">
            {[
              { num: 1, label: 'Choose Your Role' },
              { num: 2, label: 'Personal Details' },
              { num: 3, label: 'Set Password' },
            ].map(({ num, label }) => (
              <div key={num} className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all ${
                    step >= num ? 'bg-white text-brand-600' : 'bg-white/20 text-white/60'
                  }`}
                >
                  {step > num ? <Check className="h-4 w-4" /> : num}
                </div>
                <span
                  className={`text-sm font-medium ${step >= num ? 'text-white' : 'text-white/50'}`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex w-full items-center justify-center bg-white p-6 dark:bg-surface-950 lg:w-7/12">
        <div className="w-full max-w-lg">
          {/* Progress Bar (Mobile) */}
          <div className="mb-8 lg:hidden">
            <div className="mb-4 flex items-center gap-3">
              <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-xl">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-surface-900 dark:text-white">
                Trust Infra
              </span>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${i < step ? 'bg-brand-500' : 'bg-surface-200 dark:bg-surface-800'}`}
                />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h1 className="mb-2 text-2xl font-bold text-surface-900 dark:text-white">
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
                  className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                    selectedRole === role
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10'
                      : 'border-surface-200 hover:border-surface-300 dark:border-surface-800 dark:hover:border-surface-700'
                  }`}
                >
                  <span className="text-2xl">{icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-surface-900 dark:text-white">
                      {ROLE_LABELS[role]}
                    </p>
                    <p className="text-xs text-surface-500 dark:text-surface-400">{description}</p>
                  </div>
                  {selectedRole === role && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Personal Details */}
          {step === 2 && (
            <div className="space-y-4">
              <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-surface-200 px-4 py-3 text-sm font-medium transition-colors hover:bg-surface-50 dark:border-surface-700 dark:hover:bg-surface-800">
                <Chrome className="h-5 w-5" />
                Sign up with Google
              </button>
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-surface-200 dark:bg-surface-800" />
                <span className="text-xs text-surface-400">OR</span>
                <div className="h-px flex-1 bg-surface-200 dark:bg-surface-800" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Rajesh Kumar"
                  className="input-field"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rajesh@example.com"
                  className="input-field"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <select className="input-field w-24">
                    <option>+91</option>
                  </select>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="9876543210"
                    className="input-field flex-1"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
                  Company / Organization (Optional)
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Your company name"
                  className="input-field"
                />
              </div>
            </div>
          )}

          {/* Step 3: Password */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Create a strong password"
                    className="input-field pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${formData.password.length >= i * 3 ? 'bg-brand-500' : 'bg-surface-200 dark:bg-surface-800'}`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm your password"
                  className="input-field"
                />
              </div>
              <label className="flex cursor-pointer items-start gap-2">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded border-surface-300 text-brand-500"
                />
                <span className="text-sm text-surface-600 dark:text-surface-400">
                  I agree to the{' '}
                  <a href="#" className="font-medium text-brand-500">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-medium text-brand-500">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="btn-ghost">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={() => (step < totalSteps ? setStep(step + 1) : null)}
              className="btn-primary"
            >
              {step === totalSteps ? 'Create Account' : 'Continue'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
            Already have an account?{' '}
            <a href="/login" className="font-semibold text-brand-500 hover:text-brand-600">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
