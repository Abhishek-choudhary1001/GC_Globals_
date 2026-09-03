'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Clock, Briefcase, Mail } from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import PageHero from '@/components/site/PageHero';
import Reveal from '@/components/site/Reveal';

const openings = [
  { title: 'Senior Full-Stack Developer', department: 'Technology', location: 'India (Remote)', type: 'Full-Time', experience: '5+ years' },
  { title: 'React/Next.js Developer', department: 'Technology', location: 'India (Remote)', type: 'Full-Time', experience: '3+ years' },
  { title: 'QuickBooks Accountant', department: 'Accounting', location: 'India (Remote)', type: 'Full-Time', experience: '3+ years' },
  { title: 'Zoho Books Specialist', department: 'Accounting', location: 'India (Remote)', type: 'Full-Time', experience: '2+ years' },
  { title: 'UI/UX Designer', department: 'Design', location: 'India (Remote)', type: 'Full-Time', experience: '3+ years' },
  { title: 'Business Development Executive', department: 'Sales', location: 'US (Remote)', type: 'Full-Time', experience: '5+ years' },
];

const perks = [
  { title: 'Remote First', description: 'Work from anywhere in India or the US. We believe in outcomes, not office attendance.' },
  { title: 'Global Exposure', description: 'Work directly with US and international clients on cutting-edge projects.' },
  { title: 'Skill Development', description: 'Continuous learning budget for courses, certifications, and conferences.' },
  { title: 'Health Insurance', description: 'Comprehensive health coverage for you and your family.' },
  { title: 'Flexible Hours', description: 'Core overlap hours with flexibility to manage your own schedule.' },
  { title: 'Growth Path', description: 'Clear career progression from junior to senior to lead roles.' },
];

export default function CareersPage() {
  return (
    <SiteLayout>
      <PageHero
        label="Careers"
        title={<>Join the team<br /><span className="text-muted-foreground">building global solutions</span></>}
        description="We're always looking for talented developers, accountants, and professionals who want to work on international projects with a US-managed team. Remote-first, growth-oriented, and built for people who care about quality."
      />

      {/* Perks */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="mb-16 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Why work with us
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {perks.map((perk, i) => (
              <Reveal key={perk.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-2 font-display text-lg font-bold">{perk.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{perk.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section className="border-y border-border bg-card/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="mb-16 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Open positions
            </h2>
          </Reveal>
          <div className="space-y-4">
            {openings.map((job, i) => (
              <Reveal key={job.title} delay={i * 0.05}>
                <div className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <h3 className="mb-2 font-display text-xl font-bold">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-primary" /> {job.department}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" /> {job.location}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" /> {job.type}</span>
                      <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-primary" /> {job.experience}</span>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors group-hover:border-primary group-hover:text-primary"
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* General application */}
      <section className="relative overflow-hidden border-t border-border py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Don&apos;t see your role?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Send us your resume and we&apos;ll reach out when a matching position opens up.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20">
                <Mail className="h-5 w-5" />
                Send Your Resume
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
