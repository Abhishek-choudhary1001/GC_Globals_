'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Globe2, Building2, Users, Award, ArrowRight } from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import PageHero from '@/components/site/PageHero';
import Reveal from '@/components/site/Reveal';
import AnimatedCounter from '@/components/site/AnimatedCounter';

const values = [
  { icon: Target, title: 'Mission', description: 'To empower businesses worldwide with cutting-edge technology, reliable accounting services, and skilled global talent — delivered with integrity and excellence.' },
  { icon: Eye, title: 'Vision', description: 'To be the most trusted US-managed technology and professional services partner, bridging global businesses with India-based delivery excellence.' },
  { icon: Heart, title: 'Values', description: 'Integrity, quality, transparency, and long-term partnerships. We measure our success by the growth and satisfaction of our clients.' },
];

const stats = [
  { label: 'Years of Experience', value: 10, suffix: '+' },
  { label: 'Team Members', value: 75, suffix: '+' },
  { label: 'Client Retention', value: 95, suffix: '%' },
  { label: 'Global Offices', value: 2, suffix: '' },
];

export default function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        label="About GC Globals"
        title={<>Global expertise.<br /><span className="text-muted-foreground">Local commitment.</span></>}
        description="GC Globals is a US-managed technology and professional services company with an India-based delivery center. We serve clients across the USA, India, and international markets with modern web development, accounting services, and dedicated staffing solutions."
      />

      {/* Story */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                Our Story
              </div>
              <h2 className="mb-6 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Built on a foundation of<br />technical excellence
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  GC Globals was founded with a clear vision: to bridge the gap between
                  global businesses and India&apos;s deep pool of technical talent. With US-based
                  management overseeing operations and an India-based delivery center handling
                  execution, we offer the best of both worlds — Western business standards
                  combined with cost-effective, high-quality delivery.
                </p>
                <p>
                  Over the years, we&apos;ve expanded from pure web development into full-stack
                  applications, accounting services including QuickBooks and Zoho Books expertise,
                  and comprehensive staffing solutions that provide dedicated professionals to
                  companies across the USA, Canada, UK, Australia, and Europe.
                </p>
                <p>
                  Today, GC Globals serves as a single trusted partner for businesses looking
                  to build modern digital products, streamline their financial operations, and
                  scale their teams with skilled global talent.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-border bg-card p-6 text-center">
                    <div className="font-display text-4xl font-bold text-primary">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-8">
                <Globe2 className="mb-4 h-10 w-10 text-primary" />
                <h3 className="mb-2 font-display text-xl font-bold">Global Operating Model</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  US-based management ensures clear communication, cultural alignment, and
                  quality oversight. India-based delivery provides cost-effective, skilled
                  execution across technology, accounting, and staffing.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="border-y border-border bg-card/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="mb-16 text-center font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              What drives us forward
            </h2>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.15}>
                <div className="h-full rounded-2xl border border-border bg-card p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 font-display text-2xl font-bold">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mb-16 max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground">
                <Users className="h-3.5 w-3.5 text-primary" />
                Leadership
              </div>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Led by experience,<br />driven by results
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <div className="rounded-2xl border border-border bg-card p-8">
                  <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-3xl font-bold text-white">
                    HS
                  </div>
                  <h3 className="font-display text-xl font-bold">Hemant Singh</h3>
                  <p className="text-sm text-primary">Founder & CEO</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    A visionary leader with extensive experience in technology services and
                    global business operations. Hemant founded GC Globals to bridge the gap
                    between global businesses and India&apos;s technical talent pool.
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">10+ years in technology services</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="grid h-full gap-6 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <Users className="mb-4 h-8 w-8 text-primary" />
                    <h4 className="mb-2 font-display text-lg font-bold">75+ Team Members</h4>
                    <p className="text-sm text-muted-foreground">Skilled developers, accountants, and support staff across our US and India offices.</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <Globe2 className="mb-4 h-8 w-8 text-primary" />
                    <h4 className="mb-2 font-display text-lg font-bold">8+ Countries</h4>
                    <p className="text-sm text-muted-foreground">Serving clients across the USA, Canada, UK, Australia, Europe, and India.</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <Award className="mb-4 h-8 w-8 text-primary" />
                    <h4 className="mb-2 font-display text-lg font-bold">95% Retention</h4>
                    <p className="text-sm text-muted-foreground">Our clients stay because we deliver consistent quality and measurable results.</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <Building2 className="mb-4 h-8 w-8 text-primary" />
                    <h4 className="mb-2 font-display text-lg font-bold">2 Global Offices</h4>
                    <p className="text-sm text-muted-foreground">US operations headquarters and India delivery center for 24/7 capability.</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 text-center">
              <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40">
                Work With Us
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
