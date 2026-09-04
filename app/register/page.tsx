'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, UserPlus, ArrowRight, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase-client';
import { toast } from 'sonner';
import ParticleNetwork from '@/components/site/ParticleNetwork';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error('Use at least 8 characters for your password.');
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, role: 'client' } },
      });
      if (error || !data.user) throw new Error('Unable to create account');
      toast.success('Your client account is ready.');
      router.push('/dashboard');
    } catch {
      toast.error('Unable to create your account. Please try again.');
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
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300/80">Client portal</p>
            <h2 className="mt-4 max-w-md font-display text-3xl font-bold leading-tight text-white">A clearer way to work together.</h2>
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

            <h1 className="mb-2 font-display text-3xl font-bold text-white">Create your client account</h1>
            <p className="mb-8 text-sm text-white/50">Client registration only. Team accounts are managed by GC Globals.</p>

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white/70">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/15"
                  />
                </div>
              </div>
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
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/15"
                  />
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
                    <UserPlus className="h-4 w-4" />
                    Create client account
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-sm text-white/50">
              Already registered?{' '}
              <Link href="/login" className="text-sky-400 hover:text-sky-300">Sign in</Link>
            </p>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-white/30">
              <ShieldCheck className="h-3.5 w-3.5 text-sky-400/60" />
              Employee accounts are created by authorized staff
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
