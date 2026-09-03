'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase-client';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      setUser(session.user);
      const { data: prof } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();
      setProfile(prof);
      setLoading(false);
    })();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#06090f]">
        <Loader2 className="h-8 w-8 animate-spin text-sky-400" />
      </div>
    );
  }

  const isAdmin = profile?.role === 'admin';

  return (
    <div className="min-h-screen bg-[#06090f] pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="rounded-full bg-sky-400/20 px-3 py-1 text-xs font-semibold text-sky-400">
              {profile?.role?.toUpperCase() || 'EMPLOYEE'}
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white">
            Logged in as: {profile?.full_name || user?.email}
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Welcome to your {isAdmin ? 'admin' : 'employee'} dashboard
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Today\'s Attendance', value: 'Not checked in', icon: '📋' },
            { label: 'Active Tasks', value: '0', icon: '✓' },
            { label: 'Pending Leaves', value: '0', icon: '📅' },
            { label: 'Unread Messages', value: '0', icon: '💬' },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-sky-400/20 bg-white/5 p-6"
            >
              <div className="mb-3 text-2xl">{card.icon}</div>
              <div className="text-sm text-white/50">{card.label}</div>
              <div className="mt-1 font-display text-xl font-bold text-white">{card.value}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 rounded-2xl border border-sky-400/20 bg-white/5 p-8"
        >
          <h2 className="mb-4 font-display text-xl font-bold text-white">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Check In', href: '/attendance' },
              { label: 'Request Leave', href: '/leave' },
              { label: 'View Tasks', href: '/tasks' },
              { label: 'Team Chat', href: '/chat' },
              { label: 'Holidays', href: '/holidays' },
              ...(isAdmin ? [{ label: 'Admin Panel', href: '/admin' }] : []),
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium text-white/80 transition-all hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-sky-400"
              >
                {action.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
