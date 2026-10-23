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
      fullName: email
        ? email
            .split('@')[0]
            .split('.')
            .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
            .join(' ')
        : 'Rajesh Kumar',
      role: loginRole,
      isActive: true,
      createdAt: new Date().toISOString(),
    });
    useAuthStore.getState().setRole(loginRole);
    router.push(loginRole === 'project_manager' ? '/project-manager' : `/${loginRole}`);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel — Brand */}
      <div className="relative hidden overflow-hidden lg:flex lg:w-1/2">
        <div className="gradient-primary absolute inset-0" />
        <div className="gradient-mesh absolute inset-0 opacity-30" />
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-white/10 blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-white/5 blur-[100px]" />

        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <div className="mb-12 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Sparkles className="h-7 w-7" />
            </div>
            <span className="text-2xl font-bold">Trust Infra</span>
          </div>

          <h2 className="mb-4 text-4xl font-bold leading-tight">
            Build Smarter.
            <br />
            Collaborate Better.
            <br />
            Deliver Faster.
          </h2>
          <p className="max-w-md text-lg text-white/70">
            The only platform you need to manage your entire construction project from planning to
            completion.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4">
            {[
              { value: '500+', label: 'Projects' },
              { value: '15K+', label: 'Users' },
              { value: '98%', label: 'Satisfaction' },
              { value: '30%', label: 'Cost Saved' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex w-full items-center justify-center bg-white p-6 dark:bg-surface-950 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-xl">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-surface-900 dark:text-white">Trust Infra</span>
          </div>

          <div className="mb-8">
            <h1 className="mb-2 text-2xl font-bold text-surface-900 dark:text-white">
              Welcome back
            </h1>
            <p className="text-sm text-surface-500 dark:text-surface-400">
              Sign in to your account to continue managing your projects.
            </p>
          </div>

          {/* Google Login */}
          <button className="mb-6 flex w-full items-center justify-center gap-3 rounded-xl border border-surface-200 bg-white px-4 py-3 text-sm font-medium text-surface-700 transition-colors hover:bg-surface-50 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-300 dark:hover:bg-surface-800">
            <Chrome className="h-5 w-5" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-surface-200 dark:bg-surface-800" />
            <span className="text-xs font-medium text-surface-400">OR</span>
            <div className="h-px flex-1 bg-surface-200 dark:bg-surface-800" />
          </div>

          {/* Login Method Toggle */}
          <div className="mb-6 flex gap-1 rounded-xl bg-surface-100 p-1 dark:bg-surface-800/60">
            {[
              { key: 'email' as const, icon: Mail, label: 'Email' },
              { key: 'phone' as const, icon: Phone, label: 'Phone' },
            ].map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setLoginMethod(key)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${
                  loginMethod === key
                    ? 'bg-white text-surface-900 shadow-sm dark:bg-surface-700 dark:text-white'
                    : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
                Sign In As
              </label>
              <select
                value={loginRole}
                onChange={(e) => setLoginRole(e.target.value as UserRole)}
                className="input-field"
              >
                {Object.entries(ROLE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {loginMethod === 'email' ? (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
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
                <label className="mb-1.5 block text-sm font-medium text-surface-700 dark:text-surface-300">
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
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-medium text-surface-700 dark:text-surface-300">
                  Password
                </label>
                <a
                  href="/forgot-password"
                  className="text-xs font-medium text-brand-500 hover:text-brand-600"
                >
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
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-surface-300 text-brand-500 focus:ring-brand-500"
                />
                <span className="text-sm text-surface-600 dark:text-surface-400">Remember me</span>
              </label>
              <a
                href="/verify-otp"
                className="text-xs font-medium text-brand-500 hover:text-brand-600"
              >
                Login with OTP
              </a>
            </div>

            <button
              type="submit"
              className="btn-primary flex w-full items-center justify-center gap-2 py-3"
            >
              Sign In
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
            Don&apos;t have an account?{' '}
            <a href="/register" className="font-semibold text-brand-500 hover:text-brand-600">
              Sign up free
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
