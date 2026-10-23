'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Mail, Phone, Eye, EyeOff, ArrowRight, Chrome } from 'lucide-react';
import { useAuthStore } from '@/stores';
import { ROLE_LABELS } from '@/lib/constants';
import type { UserRole } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [loginRole, setLoginRole] = useState<UserRole>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    useAuthStore.getState().setUser({
      id: 'demo-user-id',
      email: email || `${loginRole}@trustinfra.com`,
      fullName: email ? email.split('@')[0].split('.').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ') : 'Rajesh Kumar',
      role: loginRole,
      isActive: true,
      createdAt: new Date().toISOString(),
    });
    useAuthStore.getState().setRole(loginRole);
    router.push(loginRole === 'project_manager' ? '/project-manager' : `/${loginRole}`);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Brand */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary" />
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-[100px]" />

        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-7 h-7" />
            </div>
            <span className="text-2xl font-bold">Trust Infra</span>
          </div>

          <h2 className="text-4xl font-bold leading-tight mb-4">
            Build Smarter.<br />
            Collaborate Better.<br />
            Deliver Faster.
          </h2>
          <p className="text-lg text-white/70 max-w-md">
            The only platform you need to manage your entire construction project from planning to completion.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4">
            {[
              { value: '500+', label: 'Projects' },
              { value: '15K+', label: 'Users' },
              { value: '98%', label: 'Satisfaction' },
              { value: '30%', label: 'Cost Saved' },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white dark:bg-surface-950">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-surface-900 dark:text-white">Trust Infra</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">Welcome back</h1>
            <p className="text-sm text-surface-500 dark:text-surface-400">
              Sign in to your account to continue managing your projects.
            </p>
          </div>

          {/* Google Login */}
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-700 dark:text-surface-300 text-sm font-medium hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors mb-6">
            <Chrome className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-surface-200 dark:bg-surface-800" />
            <span className="text-xs text-surface-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-surface-200 dark:bg-surface-800" />
          </div>

          {/* Login Method Toggle */}
          <div className="flex gap-1 p-1 rounded-xl bg-surface-100 dark:bg-surface-800/60 mb-6">
            {[
              { key: 'email' as const, icon: Mail, label: 'Email' },
              { key: 'phone' as const, icon: Phone, label: 'Phone' },
            ].map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setLoginMethod(key)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${loginMethod === key
                  ? 'bg-white dark:bg-surface-700 text-surface-900 dark:text-white shadow-sm'
                  : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                Sign In As
              </label>
              <select
                value={loginRole}
                onChange={(e) => setLoginRole(e.target.value as UserRole)}
                className="input-field"
              >
                {Object.entries(ROLE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {loginMethod === 'email' ? (
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <select className="input-field w-24">
                    <option>+91</option>
                    <option>+1</option>
                    <option>+44</option>
                  </select>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="input-field flex-1"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Password</label>
                <a href="/forgot-password" className="text-xs text-brand-500 hover:text-brand-600 font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-field pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-surface-300 text-brand-500 focus:ring-brand-500"
                />
                <span className="text-sm text-surface-600 dark:text-surface-400">Remember me</span>
              </label>
              <a href="/verify-otp" className="text-xs text-brand-500 hover:text-brand-600 font-medium">
                Login with OTP
              </a>
            </div>

            <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-2">
              Sign In
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-sm text-center text-surface-500 dark:text-surface-400 mt-6">
            Don&apos;t have an account?{' '}
            <a href="/register" className="text-brand-500 hover:text-brand-600 font-semibold">
              Sign up free
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
