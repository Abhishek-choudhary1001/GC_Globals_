'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import PageHero from '@/components/site/PageHero';
import Reveal from '@/components/site/Reveal';
import { useState } from 'react';

const projects = [
  { title: 'FinTech Dashboard', category: 'Web Development', description: 'Real-time financial analytics platform with interactive charts and multi-tenant architecture.', tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'WebSocket'], tags: ['Full-Stack', 'SaaS', 'Dashboard'] },
  { title: 'E-commerce Platform', category: 'Web Development', description: 'Full-featured online store with cart, checkout, payment processing, and admin panel.', tech: ['React', 'Node.js', 'MongoDB', 'Stripe'], tags: ['E-commerce', 'Payments', 'Full-Stack'] },
  { title: 'QuickBooks Integration', category: 'Accounting', description: 'Automated bookkeeping system integrating with QuickBooks API for transaction sync and reconciliation.', tech: ['QuickBooks API', 'Node.js', 'PostgreSQL'], tags: ['Accounting', 'Automation', 'Integration'] },
  { title: 'Zoho Books Migration', category: 'Accounting', description: 'Complete migration of accounting data from Tally to Zoho Books with GST compliance setup.', tech: ['Zoho Books API', 'Python', 'Data Migration'], tags: ['Accounting', 'Migration', 'GST'] },
  { title: 'Healthcare Portal', category: 'Web Development', description: 'Patient management system with appointment scheduling, records, and secure messaging.', tech: ['Next.js', 'Supabase', 'Tailwind CSS'], tags: ['Healthcare', 'Portal', 'Secure'] },
  { title: 'Remote Team Platform', category: 'Staffing', description: 'Internal team management system with attendance, leave tracking, and task management.', tech: ['Next.js', 'Supabase', 'Real-time'], tags: ['Staffing', 'HR', 'Internal Tools'] },
  { title: 'SaaS Marketing Site', category: 'Web Development', description: 'High-converting marketing website with 3D graphics, animations, and CMS integration.', tech: ['Next.js', 'Framer Motion', 'Three.js'], tags: ['Marketing', '3D', 'Animation'] },
  { title: 'Logistics Tracker', category: 'Web Development', description: 'Real-time shipment tracking system with GPS integration and automated notifications.', tech: ['React', 'Node.js', 'WebSocket', 'Redis'], tags: ['Logistics', 'Real-time', 'Tracking'] },
  { title: 'Dedicated Dev Team', category: 'Staffing', description: 'Built and managed a team of 8 dedicated developers for a US-based SaaS company.', tech: ['Staffing', 'Project Management'], tags: ['Staffing', 'Dedicated Team', 'US Client'] },
];

const categories = ['All', 'Web Development', 'Accounting', 'Staffing'];

export default function PortfolioPage() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <SiteLayout>
      <PageHero
        label="Portfolio & Case Studies"
        title={<>Work we&apos;re<br /><span className="text-muted-foreground">proud of</span></>}
        description="A selection of projects spanning web development, accounting services, and staffing solutions. Each project represents our commitment to quality, innovation, and measurable results."
      />

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* Filter */}
          <Reveal>
            <div className="mb-12 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    filter === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <Reveal key={project.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', damping: 20 }}
                  className="group h-full overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/30"
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
                    <div className="absolute inset-0 hero-grid opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-2xl font-bold text-primary/30">
                        {project.title}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 font-display text-xl font-bold">{project.title}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-md bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-foreground/70">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Want to be our next case study?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Let&apos;s build something worth showcasing together.
            </p>
            <div className="mt-8">
              <Link href="/request-consultation" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20">
                Start a Project
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
