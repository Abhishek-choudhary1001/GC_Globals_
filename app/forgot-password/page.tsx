'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase-client';
import { toast } from 'sonner';
import ParticleNetwork from '@/components/site/ParticleNetwork';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSent(true);
      toast.success('Password reset link sent to your email.');
    } catch (err: any) {
      toast.error(err.message || 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#06090f] px-6 py-20">
      <div className="absolute inset-0">
        <ParticleNetwork />
      </div>
      <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-500/20 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-2xl border border-sky-400/20 bg-white/5 p-8 backdrop-blur-xl">
          <Link href="/" className="mb-8 flex items-center justify-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-sky-600">
              <span className="font-display text-lg font-bold text-white">GC</span>
            </div>
            <span className="font-display text-xl font-bold text-white">
              GC <span className="text-sky-400">Globals</span>
            </span>
          </Link>

          {sent ? (
            <div className="text-center">
              <div className="mb-6 flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-sky-400/20">
                <CheckCircle2 className="h-10 w-10 text-sky-400" />
              </div>
              <h1 className="mb-2 font-display text-2xl font-bold text-white">Check Your Email</h1>
              <p className="mb-6 text-sm text-white/50">We&apos;ve sent a password reset link to <span className="text-sky-400">{email}</span></p>
              <Link href="/login" className="inline-block rounded-xl border border-sky-400/30 px-6 py-2.5 text-sm font-medium text-white hover:bg-sky-400/10 transition-colors">
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <h1 className="mb-2 text-center font-display text-2xl font-bold text-white">Reset Password</h1>
              <p className="mb-8 text-center text-sm text-white/50">Enter your email and we&apos;ll send you a reset link</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-white/70">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition-all focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-sky-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 disabled:opacity-50"
                >
                  {loading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </motion.button>
              </form>

              <p className="mt-6 text-center text-sm text-white/50">
                <Link href="/login" className="text-sky-400/80 hover:text-sky-400 transition-colors">← Back to login</Link>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
