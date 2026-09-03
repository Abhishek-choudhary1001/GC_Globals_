'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageHeroProps {
  label: string;
  title: ReactNode;
  description: string;
}

export default function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-sky-400/10 bg-[#06090f] pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="absolute inset-0 hero-grid opacity-20" />
      <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-sky-500/15 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-sky-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/5 px-4 py-1.5 text-sm text-sky-300/80 backdrop-blur-sm"
        >
          {label}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-white/50"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
