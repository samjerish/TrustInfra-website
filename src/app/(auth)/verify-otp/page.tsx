'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

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

          <h1 className="mb-2 text-2xl font-bold text-surface-900 dark:text-white">Verify OTP</h1>
          <p className="mb-8 text-sm text-surface-500 dark:text-surface-400">
            We&apos;ve sent a 6-digit code to your registered phone/email. Enter it below.
          </p>

          <div className="mb-6 flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="h-14 w-12 rounded-xl border border-surface-200 bg-white text-center text-xl font-bold text-surface-900 transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-surface-700 dark:bg-surface-900 dark:text-white"
              />
            ))}
          </div>

          <button className="btn-primary mb-4 w-full py-3">
            Verify & Continue <ArrowRight className="h-4 w-4" />
          </button>

          <div className="text-center">
            {timer > 0 ? (
              <p className="text-sm text-surface-500 dark:text-surface-400">
                Resend code in <span className="font-semibold text-brand-500">{timer}s</span>
              </p>
            ) : (
              <button
                onClick={() => setTimer(30)}
                className="inline-flex items-center gap-1 text-sm font-medium text-brand-500 hover:text-brand-600"
              >
                <RefreshCw className="h-3 w-3" /> Resend Code
              </button>
            )}
          </div>

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
