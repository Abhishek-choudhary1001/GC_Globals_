'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase-client';
import { toast } from 'sonner';

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
    <main className="min-h-screen bg-[#06090f] px-4 py-6 text-white sm:px-6 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#080d17] shadow-2xl shadow-black/40 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative hidden overflow-hidden border-r border-white/10 bg-[radial-gradient(circle_at_35%_35%,rgba(14,165,233,0.18),transparent_42%),#06090f] p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          <Link href="/" className="relative flex items-center gap-3">
            <Image src="/Logo_1.png" alt="GC Globals" width={54} height={54} className="rounded-xl" />
            <span className="font-display text-xl font-bold">GC <span className="text-sky-400">Globals</span></span>
          </Link>
          <div className="relative">
            <div className="mb-8 flex justify-center">
              <Image src="/Logo_1.png" alt="GC Globals mark" width={260} height={260} className="rounded-[2rem] opacity-95 shadow-2xl shadow-sky-500/20" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300/80">Secure business platform</p>
            <h2 className="mt-4 max-w-md font-display text-4xl font-bold leading-tight">Technology, talent, and growth in one place.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/50">Access your secure GC Globals workspace for projects, communication, attendance, and business operations.</p>
          </div>
          <div className="relative flex items-center gap-2 text-xs text-white/40"><ShieldCheck className="h-4 w-4 text-sky-400" /> Protected access for authorized users</div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">
              <Image src="/Logo_1.png" alt="GC Globals" width={48} height={48} className="rounded-xl" />
              <span className="font-display text-xl font-bold">GC <span className="text-sky-400">Globals</span></span>
            </div>
            <h1 className="font-display text-3xl font-bold">Welcome back</h1>
            <p className="mt-2 text-sm text-white/50">Sign in to continue to your workspace.</p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <label className="block text-sm font-medium text-white/70">Email
                <span className="relative mt-2 block"><Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" placeholder="you@example.com" className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/15" /></span>
              </label>
              <label className="block text-sm font-medium text-white/70">Password
                <span className="relative mt-2 block"><Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" /><input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" placeholder="Enter your password" className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-11 text-sm text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/15" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 hover:text-white" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></span>
              </label>
              <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.98 }} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-sky-600 py-3.5 text-sm font-semibold shadow-lg shadow-sky-500/20 transition hover:shadow-sky-500/40 disabled:opacity-50">{loading ? 'Signing in…' : <><LogIn className="h-4 w-4" /> Sign in <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}</motion.button>
            </form>
            <div className="mt-6 flex justify-between text-sm"><Link href="/forgot-password" className="text-sky-400 hover:text-sky-300">Forgot password?</Link><Link href="/register" className="text-sky-400 hover:text-sky-300">Client registration</Link></div>
            <p className="mt-10 text-center text-sm text-white/35"><Link href="/" className="hover:text-sky-300">Back to website</Link></p>
          </div>
        </section>
      </div>
    </main>
  );
}
