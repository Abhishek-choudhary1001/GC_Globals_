'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, Calculator, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import PageHero from '@/components/site/PageHero';
import Reveal from '@/components/site/Reveal';

const serviceCategories = [
  {
    icon: Code2,
    title: 'Technology & Development',
    tagline: 'Build modern digital products',
    description: 'From responsive websites to complex full-stack applications, we deliver technology solutions that scale with your business.',
    services: [
      'Website Development',
      'Web Applications',
      'Full-Stack Development',
      'E-commerce Solutions',
      'Custom Software',
      'UI/UX Design',
      'API Development',
      'Database Solutions',
      'Legacy Modernization',
      'Maintenance & Support',
    ],
    href: '/services/web-development',
    color: 'from-blue-500/10 to-blue-500/5',
  },
  {
    icon: Calculator,
    title: 'Accounting Services',
    tagline: 'Streamline your finances',
    description: 'Professional accounting services for US and Indian businesses, including QuickBooks and Zoho Books expertise, bookkeeping, and financial reporting.',
    services: [
      'QuickBooks Setup & Management',
      'Zoho Books Configuration',
      'Bookkeeping Services',
      'Accounts Payable (AP)',
      'Accounts Receivable (AR)',
      'Bank Reconciliation',
      'Financial Reporting',
      'Payroll Support',
      'Tax Preparation Support',
      'Accounting Advisory',
    ],
    href: '/services/accounting',
    color: 'from-emerald-500/10 to-emerald-500/5',
  },
  {
    icon: Users,
    title: 'Staffing & Outsourcing',
    tagline: 'Scale with global talent',
    description: 'Access skilled Indian professionals for your business — dedicated developers, accountants, and administrative staff working as an extension of your team.',
    services: [
      'Dedicated Developers',
      'Accounting Professionals',
      'Remote Employees',
      'Administrative Support',
      'Customer Support Staff',
      'Business Process Support',
      'Back-Office Professionals',
      'Project-Based Staffing',
      'Team Augmentation',
      'Global Staffing',
    ],
    href: '/services/staffing',
    color: 'from-orange-500/10 to-orange-500/5',
  },
];

export default function ServicesPage() {
  return (
    <SiteLayout>
      <PageHero
        label="Our Services"
        title={<>Everything you need<br /><span className="text-muted-foreground">to grow your business.</span></>}
        description="GC Globals offers three integrated service pillars — technology development, accounting services, and staffing solutions — designed to help your business operate more efficiently and scale faster."
      />

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-8">
            {serviceCategories.map((category, i) => (
              <Reveal key={category.title} delay={i * 0.1}>
                <div className={`relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br ${category.color} p-8 lg:p-12`}>
                  <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-1">
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <category.icon className="h-8 w-8" />
                      </div>
                      <h3 className="mb-2 font-display text-2xl font-bold lg:text-3xl">{category.title}</h3>
                      <p className="mb-4 text-sm font-medium text-primary">{category.tagline}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{category.description}</p>
                      <Link href={category.href} className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        Explore {category.title.split(' ')[0]}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="grid gap-3 sm:grid-cols-2">
                        {category.services.map((service) => (
                          <div key={service} className="flex items-center gap-2 rounded-lg border border-border/50 bg-card/50 px-4 py-3 text-sm">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-primary/60" />
                            {service}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Not sure which service you need?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Tell us about your business and we&apos;ll recommend the right combination of services.
            </p>
            <div className="mt-8">
              <Link href="/request-consultation" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20">
                Get a Free Consultation
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
