'use client';

import React, { useState } from 'react';
import { Sparkles, Mail, ArrowRight, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface-50 dark:bg-surface-950">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="relative w-full max-w-md">
        <div className="premium-card p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-surface-900 dark:text-white">Trust Infra</span>
          </div>

          {!sent ? (
            <>
              <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">Reset your password</h1>
              <p className="text-sm text-surface-500 dark:text-surface-400 mb-8">
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input-field" />
                </div>
                <button type="submit" className="btn-primary w-full py-3">
                  Send Reset Link <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-brand-500" />
              </div>
              <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-2">Check your email</h2>
              <p className="text-sm text-surface-500 dark:text-surface-400 mb-6">
                We&apos;ve sent a password reset link to <strong>{email}</strong>
              </p>
              <button onClick={() => setSent(false)} className="btn-secondary w-full">
                Try another email
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <a href="/login" className="text-sm text-surface-500 dark:text-surface-400 hover:text-brand-500 inline-flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back to sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
