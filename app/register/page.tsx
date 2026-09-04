'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, UserPlus, ArrowRight, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase-client';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length < 8) { toast.error('Use at least 8 characters for your password.'); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName, role: 'client' } } });
      if (error || !data.user) throw new Error('Unable to create account');
      toast.success('Your client account is ready.');
      router.push('/dashboard');
    } catch {
      toast.error('Unable to create your account. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-[#06090f] px-4 py-6 text-white sm:px-6 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#080d17] shadow-2xl shadow-black/40 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative hidden overflow-hidden border-r border-white/10 bg-[radial-gradient(circle_at_65%_35%,rgba(14,165,233,0.18),transparent_42%),#06090f] p-10 lg:flex lg:flex-col lg:justify-between">
          <Link href="/" className="relative flex items-center gap-3"><Image src="/Logo_1.png" alt="GC Globals" width={54} height={54} className="rounded-xl" /><span className="font-display text-xl font-bold">GC <span className="text-sky-400">Globals</span></span></Link>
          <div className="relative"><div className="mb-8 flex justify-center"><Image src="/Logo_1.png" alt="GC Globals mark" width={260} height={260} className="rounded-[2rem] opacity-95 shadow-2xl shadow-sky-500/20" /></div><p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300/80">Client portal</p><h2 className="mt-4 font-display text-4xl font-bold leading-tight">A clearer way to work together.</h2><p className="mt-5 max-w-md text-sm leading-7 text-white/50">Create a client account to follow projects, share requests, and stay connected with the GC Globals team.</p></div>
          <div className="relative flex items-center gap-2 text-xs text-white/40"><ShieldCheck className="h-4 w-4 text-sky-400" /> Employee accounts are created by authorized staff</div>
        </section>
        <section className="flex items-center justify-center p-6 sm:p-12"><div className="w-full max-w-md">
          <div className="mb-10 flex items-center justify-center gap-3 lg:hidden"><Image src="/Logo_1.png" alt="GC Globals" width={48} height={48} className="rounded-xl" /><span className="font-display text-xl font-bold">GC <span className="text-sky-400">Globals</span></span></div>
          <h1 className="font-display text-3xl font-bold">Create your client account</h1><p className="mt-2 text-sm text-white/50">Client registration only. Team accounts are managed by GC Globals.</p>
          <form onSubmit={handleRegister} className="mt-8 space-y-5">
            <label className="block text-sm font-medium text-white/70">Full name<span className="relative mt-2 block"><User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" /><input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required autoComplete="name" placeholder="Your full name" className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/15" /></span></label>
            <label className="block text-sm font-medium text-white/70">Email<span className="relative mt-2 block"><Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" placeholder="you@example.com" className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/15" /></span></label>
            <label className="block text-sm font-medium text-white/70">Password<span className="relative mt-2 block"><Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} autoComplete="new-password" placeholder="At least 8 characters" className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/15" /></span></label>
            <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.98 }} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-sky-600 py-3.5 text-sm font-semibold shadow-lg shadow-sky-500/20 transition hover:shadow-sky-500/40 disabled:opacity-50">{loading ? 'Creating account…' : <><UserPlus className="h-4 w-4" /> Create client account <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}</motion.button>
          </form>
          <p className="mt-6 text-center text-sm text-white/50">Already registered? <Link href="/login" className="text-sky-400 hover:text-sky-300">Sign in</Link></p><p className="mt-10 text-center text-sm text-white/35"><Link href="/" className="hover:text-sky-300">Back to website</Link></p>
        </div></section>
      </div>
    </main>
  );
}
