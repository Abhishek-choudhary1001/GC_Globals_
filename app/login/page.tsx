'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase-client';
import { toast } from 'sonner';
import ParticleNetwork from '@/components/site/ParticleNetwork';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error || !data.user) throw new Error('Unable to sign in');
      toast.success('Welcome back.');
      router.push('/dashboard');
    } catch {
      toast.error('Unable to sign in. Check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#06090f]">
      <div className="absolute inset-0">
        <ParticleNetwork />
      </div>

      <div className="relative z-10 grid w-full lg:grid-cols-2">
        {/* Left banner panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden border-r border-white/10 p-10 lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent" />
          <Link href="/" className="relative flex items-center gap-3">
            <Image src="/logo2.png" alt="GC Globals" width={48} height={48} className="rounded-xl" />
          </Link>
          <div className="relative flex flex-1 items-center justify-center">
            <Image
              src="/Banner.png"
              alt="GC Globals"
              width={420}
              height={420}
              className="rounded-3xl opacity-90 shadow-2xl shadow-sky-500/20"
              priority
            />
          </div>
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300/80">Secure business platform</p>
            <h2 className="mt-4 max-w-md font-display text-3xl font-bold leading-tight text-white">Technology, talent, and growth in one place.</h2>
          </div>
        </section>

        {/* Right form panel */}
        <section className="flex items-center justify-center px-6 py-20 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md"
          >
            <div className="mb-8 flex justify-center lg:hidden">
              <Image src="/logo2.png" alt="GC Globals" width={56} height={56} className="rounded-xl" />
            </div>

            <h1 className="mb-2 font-display text-3xl font-bold text-white">Welcome back</h1>
            <p className="mb-8 text-sm text-white/50">Sign in to continue to your workspace.</p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/70">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/15"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/70">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-11 text-sm text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 hover:text-white"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.98 }}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-sky-600 py-3.5 text-sm font-semibold shadow-lg shadow-sky-500/20 transition hover:shadow-sky-500/40 disabled:opacity-50"
              >
                {loading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Sign in
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 flex justify-between text-sm">
              <Link href="/forgot-password" className="text-sky-400 hover:text-sky-300">Forgot password?</Link>
              <Link href="/register" className="text-sky-400 hover:text-sky-300">Client registration</Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-white/30">
              <ShieldCheck className="h-3.5 w-3.5 text-sky-400/60" />
              Protected access for authorized users
            </div>

            <p className="mt-6 text-center text-sm text-white/40">
              <Link href="/" className="hover:text-sky-400 transition-colors">← Back to website</Link>
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
