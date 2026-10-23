'use client';

import React, { useState } from 'react';
import { Sparkles, Mail, ArrowRight, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-50 p-6 dark:bg-surface-950">
      <div className="gradient-mesh absolute inset-0 opacity-30" />
      <div className="relative w-full max-w-md">
        <div className="premium-card p-8">
          <div className="mb-8 flex items-center gap-3">
            <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-xl">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-surface-900 dark:text-white">Trust Infra</span>
          </div>

          {!sent ? (
            <>
              <h1 className="mb-2 text-2xl font-bold text-surface-900 dark:text-white">
                Reset your password
              </h1>
              <p className="mb-8 text-sm text-surface-500 dark:text-surface-400">
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="mb-4">
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
                <button type="submit" className="btn-primary w-full py-3">
                  Send Reset Link <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="py-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/10">
                <Mail className="h-8 w-8 text-brand-500" />
              </div>
              <h2 className="mb-2 text-xl font-bold text-surface-900 dark:text-white">
                Check your email
              </h2>
              <p className="mb-6 text-sm text-surface-500 dark:text-surface-400">
                We&apos;ve sent a password reset link to <strong>{email}</strong>
              </p>
              <button onClick={() => setSent(false)} className="btn-secondary w-full">
                Try another email
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <a
              href="/login"
              className="inline-flex items-center gap-1 text-sm text-surface-500 hover:text-brand-500 dark:text-surface-400"
            >
              <ArrowLeft className="h-3 w-3" /> Back to sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
