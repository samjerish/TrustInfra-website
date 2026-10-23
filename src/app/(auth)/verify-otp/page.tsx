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

          <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">Verify OTP</h1>
          <p className="text-sm text-surface-500 dark:text-surface-400 mb-8">
            We&apos;ve sent a 6-digit code to your registered phone/email. Enter it below.
          </p>

          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
              />
            ))}
          </div>

          <button className="btn-primary w-full py-3 mb-4">
            Verify & Continue <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center">
            {timer > 0 ? (
              <p className="text-sm text-surface-500 dark:text-surface-400">
                Resend code in <span className="font-semibold text-brand-500">{timer}s</span>
              </p>
            ) : (
              <button onClick={() => setTimer(30)} className="text-sm text-brand-500 hover:text-brand-600 font-medium inline-flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> Resend Code
              </button>
            )}
          </div>

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
