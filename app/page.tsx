'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Sparkles, Globe2, Code2, Calculator, Users, Zap,
  CheckCircle2, TrendingUp, Award, Rocket, Play
} from 'lucide-react';
import ParticleNetwork from '@/components/site/ParticleNetwork';
import AnimatedCounter from '@/components/site/AnimatedCounter';
import Reveal from '@/components/site/Reveal';
import SiteLayout from '@/components/site/SiteLayout';

const stats = [
  { label: 'Projects Delivered', value: 250, suffix: '+' },
  { label: 'Clients Supported', value: 120, suffix: '+' },
  { label: 'Technologies Mastered', value: 40, suffix: '+' },
  { label: 'Countries Served', value: 8, suffix: '' },
];

const services = [
  {
    icon: Code2,
    title: 'Technology & Development',
    description: 'Modern web applications, full-stack development, e-commerce, and custom software solutions built with cutting-edge frameworks.',
    items: ['Web Development', 'Full-Stack Apps', 'API Development', 'UI/UX Design'],
    href: '/services/web-development',
    image: 'https://images.pexels.com/photos/7325498/pexels-photo-7325498.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Calculator,
    title: 'Accounting Services',
    description: 'Professional bookkeeping, QuickBooks and Zoho Books expertise, reconciliation, financial reporting, and AP/AR management.',
    items: ['QuickBooks ProAdvisors', 'Zoho Books Setup', 'Bookkeeping', 'Financial Reporting'],
    href: '/services/accounting',
    image: 'https://images.pexels.com/photos/8204363/pexels-photo-8204363.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Users,
    title: 'Staffing & Outsourcing',
    description: 'Dedicated developers, accountants, and administrative professionals sourced from India for global businesses.',
    items: ['Dedicated Developers', 'Accounting Professionals', 'Remote Staffing', 'Back-Office Support'],
    href: '/services/staffing',
    image: 'https://images.pexels.com/photos/3865639/pexels-photo-3865639.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

const techStack = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Next.js', color: '#0a0f1c' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Node.js', color: '#339933' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'Tailwind', color: '#06B6D4' },
  { name: 'Python', color: '#3776AB' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'GraphQL', color: '#E10098' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'Redis', color: '#DC382D' },
];

const processSteps = [
  { step: '01', title: 'Discover', description: 'We dive deep into your business requirements, goals, and challenges to understand exactly what you need.', icon: Globe2 },
  { step: '02', title: 'Design', description: 'Our team crafts a tailored solution architecture, user experience, and project roadmap.', icon: Sparkles },
  { step: '03', title: 'Develop', description: 'Skilled engineers build your solution using modern technologies with rigorous quality standards.', icon: Code2 },
  { step: '04', title: 'Deliver', description: 'We deploy, optimize, and support your solution with ongoing maintenance and improvements.', icon: Rocket },
];

const testimonials = [
  { name: 'Sarah Mitchell', role: 'CEO, TechFlow Inc.', text: 'GC Globals rebuilt our entire platform in 3 months. The quality and communication exceeded our expectations.', rating: 5 },
  { name: 'Rajesh Kumar', role: 'CFO, GrowthCorp', text: 'Their QuickBooks expertise saved us countless hours. Our books have never been more organized.', rating: 5 },
  { name: 'Michael Chen', role: 'CTO, DataSync', text: 'We hired 4 dedicated developers through GC Globals. They integrated seamlessly with our team.', rating: 5 },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.1]);

  return (
    <SiteLayout>
      {/* Hero */}
      <section ref={heroRef} className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-[#06090f] via-[#06090f] to-[#0a0f1c]">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute inset-0">
          <ParticleNetwork />
        </div>
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-sky-500/20 blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-sky-500/10 blur-[140px]" />

        {/* Floating 3D-ish elements */}
        <motion.div
          className="absolute right-[10%] top-[20%] hidden lg:block"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="glass-card rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-red-400" />
              <div className="h-2 w-2 rounded-full bg-yellow-400" />
              <div className="h-2 w-2 rounded-full bg-green-400" />
            </div>
            <div className="space-y-1.5">
              <div className="h-2 w-32 rounded bg-sky-400/30" />
              <div className="h-2 w-24 rounded bg-sky-400/20" />
              <div className="h-2 w-28 rounded bg-sky-400/25" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute left-[8%] bottom-[15%] hidden lg:block"
          animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <div className="glass-card rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-400/20">
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <div className="text-xs text-white/50">Revenue Growth</div>
                <div className="text-lg font-bold text-white">+240%</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto max-w-7xl px-6 pt-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/5 px-4 py-1.5 text-sm text-sky-300/80 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            US-Managed · India-Based Delivery · Global Reach
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Technology.<br />
            Talent.<br />
            <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-sky-500 bg-clip-text text-transparent">
              Business Growth.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl"
          >
            GC Globals helps businesses build modern digital products, streamline accounting
            operations, and access skilled global talent — all from one trusted, US-managed partner.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/request-consultation"
                className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-sky-400 to-sky-600 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-sky-500/25 transition-all hover:shadow-sky-500/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start a Project
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/services"
                className="flex items-center gap-2 rounded-full border border-sky-400/30 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-sky-400/60 hover:bg-sky-400/10"
              >
                <Play className="h-4 w-4 text-sky-400" />
                Explore Services
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/50"
          >
            {['Trusted by 120+ businesses', '8+ countries served', '250+ projects delivered'].map((text) => (
              <div key={text} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-sky-400" />
                {text}
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-sky-400/30 pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-2 w-1 rounded-full bg-sky-400"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="relative border-y border-sky-400/10 bg-[#0a0f1c] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.05 }}
                  className="text-center"
                >
                  <div className="font-display text-4xl font-bold bg-gradient-to-b from-sky-300 to-sky-500 bg-clip-text text-transparent sm:text-5xl lg:text-6xl">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-2 text-sm font-medium text-white/50 sm:text-base">
                    {stat.label}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services with HD images */}
      <section className="relative bg-[#06090f] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mb-16 max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/5 px-4 py-1.5 text-sm text-sky-300/80">
                <Zap className="h-3.5 w-3.5 text-sky-400" />
                What We Do
              </div>
              <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Three pillars.<br />
                <span className="text-white/40">One trusted partner.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 0.15}>
                <Link href={service.href} className="group block h-full">
                  <motion.div
                    onHoverStart={() => setHoveredService(i)}
                    onHoverEnd={() => setHoveredService(null)}
                    whileHover={{ y: -8 }}
                    className="relative h-full overflow-hidden rounded-2xl border border-sky-400/10 bg-[#0a0f1c] transition-all duration-500 hover:border-sky-400/40 hover:shadow-2xl hover:shadow-sky-500/10"
                  >
                    {/* Image with zoom and overlay */}
                    <div className="relative h-48 overflow-hidden">
                      <motion.div
                        animate={{ scale: hoveredService === i ? 1.1 : 1 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={service.image}
                          alt={service.title}
                          className="h-full w-full object-cover"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-400/20 backdrop-blur-sm text-sky-400 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                          <service.icon className="h-6 w-6" />
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="mb-3 font-display text-xl font-bold text-white">{service.title}</h3>
                      <p className="mb-5 text-sm leading-relaxed text-white/50">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                            <CheckCircle2 className="h-4 w-4 text-sky-400/60" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-sky-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        Learn more
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="relative overflow-hidden border-y border-sky-400/10 bg-[#0a0f1c] py-24 lg:py-32">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mb-16 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/5 px-4 py-1.5 text-sm text-sky-300/80">
                <Globe2 className="h-3.5 w-3.5 text-sky-400" />
                Our Technology Ecosystem
              </div>
              <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Built with the best<br />
                <span className="text-white/40">modern technologies</span>
              </h2>
            </div>
          </Reveal>

          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, i) => (
              <Reveal key={tech.name} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.1, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex items-center gap-3 rounded-xl border border-sky-400/10 bg-white/5 px-5 py-3 shadow-sm transition-all hover:border-sky-400/40 hover:shadow-lg hover:shadow-sky-500/10"
                >
                  <motion.div
                    whileHover={{ scale: 1.5 }}
                    className="h-3 w-3 rounded-full transition-colors"
                    style={{ backgroundColor: tech.color }}
                  />
                  <span className="font-display text-sm font-semibold text-white/80 group-hover:text-white">{tech.name}</span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process with icons */}
      <section className="relative bg-[#06090f] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mb-16 max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/5 px-4 py-1.5 text-sm text-sky-300/80">
                <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                How We Work
              </div>
              <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                A proven process<br />
                <span className="text-white/40">from concept to launch.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group relative rounded-2xl border border-sky-400/10 bg-[#0a0f1c] p-6 transition-all hover:border-sky-400/30"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-display text-5xl font-bold text-sky-400/20">{step.step}</span>
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400/10 text-sky-400"
                    >
                      <step.icon className="h-5 w-5" />
                    </motion.div>
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-white/50">{step.description}</p>
                  {i < processSteps.length - 1 && (
                    <div className="absolute top-1/2 -right-4 hidden h-px w-8 bg-sky-400/20 lg:block" />
                  )}
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative overflow-hidden border-y border-sky-400/10 bg-[#0a0f1c] py-24 lg:py-32">
        <div className="absolute -top-20 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mb-16 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/5 px-4 py-1.5 text-sm text-sky-300/80">
                <Award className="h-3.5 w-3.5 text-sky-400" />
                Client Stories
              </div>
              <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                What our clients say
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="h-full rounded-2xl border border-sky-400/10 bg-white/5 p-8 transition-all hover:border-sky-400/30"
                >
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <span key={idx} className="text-sky-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="mb-6 text-sm leading-relaxed text-white/70">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-sky-600 text-sm font-bold text-white">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{t.name}</div>
                      <div className="text-xs text-white/50">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#06090f] py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-sky-500/5 to-transparent" />
        <div className="absolute -top-20 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-sky-500/20 blur-[120px]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Ready to build something<br />
              <span className="bg-gradient-to-r from-sky-400 to-sky-500 bg-clip-text text-transparent">extraordinary?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/50">
              Let&apos;s talk about how GC Globals can help your business grow with modern
              technology, expert accounting, and skilled global talent.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/request-consultation"
                  className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-sky-400 to-sky-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-sky-500/25 transition-all hover:shadow-sky-500/50"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Request a Consultation
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 rounded-full border border-sky-400/30 bg-white/5 px-8 py-4 text-base font-semibold text-white transition-colors hover:border-sky-400/60 hover:bg-sky-400/10"
                >
                  Talk to Our Team
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
