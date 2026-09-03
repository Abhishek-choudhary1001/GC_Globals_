'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Server, Cloud, Database, Layers, Cpu } from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import PageHero from '@/components/site/PageHero';
import Reveal from '@/components/site/Reveal';

const categories = [
  {
    icon: Code2,
    title: 'Frontend',
    techs: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Redux', 'Framer Motion'],
  },
  {
    icon: Server,
    title: 'Backend',
    techs: ['Node.js', 'Express', 'Python', 'Django', 'FastAPI', 'REST APIs', 'GraphQL', 'WebSockets', 'Socket.IO', 'JWT Auth'],
  },
  {
    icon: Database,
    title: 'Databases',
    techs: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Supabase', 'Firebase', 'Elasticsearch', 'Prisma', 'Mongoose', 'IndexedDB'],
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    techs: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'Nginx', 'Vercel', 'Netlify', 'Cloudflare'],
  },
  {
    icon: Layers,
    title: 'Tools & Platforms',
    techs: ['Git', 'Jira', 'Figma', 'Postman', 'Stripe', 'Resend', 'Twilio', 'Zoho Books', 'QuickBooks', 'Slack API'],
  },
  {
    icon: Cpu,
    title: 'Emerging',
    techs: ['AI Integration', 'LLM APIs', 'OpenAI', 'Vector DBs', 'Edge Functions', 'WebAssembly', 'PWA', 'Real-time Systems', 'Automation', 'Microservices'],
  },
];

export default function TechnologiesPage() {
  return (
    <SiteLayout>
      <PageHero
        label="Technologies"
        title={<>Our technology<br /><span className="text-muted-foreground">ecosystem</span></>}
        description="We work with the most modern and battle-tested technologies across frontend, backend, databases, cloud, and emerging tech. Here's what powers the solutions we build."
      />

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {categories.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 0.1}>
                <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8">
                  <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
                  <div className="relative">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <cat.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-display text-2xl font-bold">{cat.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.techs.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-sm font-medium text-foreground/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
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
              Have a specific tech requirement?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              We&apos;re always exploring new technologies. If you need something specific, just ask.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20">
                Talk to Our Team
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
