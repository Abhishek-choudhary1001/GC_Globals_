'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import PageHero from '@/components/site/PageHero';
import Reveal from '@/components/site/Reveal';
import { ReactNode } from 'react';

interface ServiceDetailProps {
  label: string;
  title: ReactNode;
  description: string;
  benefits: { title: string; description: string }[];
  process: { step: string; title: string; description: string }[];
  features: string[];
  ctaTitle: string;
  ctaDescription: string;
  ctaLink?: string;
  ctaLabel?: string;
}

export default function ServiceDetail({
  label, title, description, benefits, process, features,
  ctaTitle, ctaDescription, ctaLink = '/request-consultation', ctaLabel = 'Get Started',
}: ServiceDetailProps) {
  return (
    <SiteLayout>
      <PageHero label={label} title={title} description={description} />

      <section className="bg-[#06090f] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="mb-16 max-w-3xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Benefits that drive<br /><span className="text-white/40">real business outcomes</span>
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} className="h-full rounded-2xl border border-sky-400/10 bg-[#0a0f1c] p-8 transition-all hover:border-sky-400/30">
                  <h3 className="mb-3 font-display text-xl font-bold text-white">{benefit.title}</h3>
                  <p className="text-sm leading-relaxed text-white/50">{benefit.description}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-sky-400/10 bg-[#0a0f1c] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="mb-12 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What&apos;s included
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <Reveal key={feature} delay={i * 0.05}>
                <div className="flex items-center gap-3 rounded-xl border border-sky-400/10 bg-white/5 px-5 py-4 transition-colors hover:border-sky-400/30">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-sky-400" />
                  <span className="text-sm font-medium text-white/80">{feature}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#06090f] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="mb-16 max-w-3xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Our process<br /><span className="text-white/40">step by step</span>
            </h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.1}>
                <div>
                  <div className="mb-4 font-display text-6xl font-bold text-sky-400/20">{step.step}</div>
                  <h3 className="mb-2 font-display text-xl font-bold text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-white/50">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-sky-400/10 bg-[#06090f] py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
              {ctaDescription}
            </p>
            <div className="mt-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href={ctaLink} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-sky-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-500/20">
                  {ctaLabel}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
