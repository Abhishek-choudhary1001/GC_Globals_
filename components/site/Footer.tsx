'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';

const footerLinks = {
  Services: [
    { label: 'Web Development', href: '/services/web-development' },
    { label: 'Accounting Services', href: '/services/accounting' },
    { label: 'QuickBooks', href: '/services/quickbooks' },
    { label: 'Zoho Books', href: '/services/zoho-books' },
    { label: 'Staffing', href: '/services/staffing' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Technologies', href: '/technologies' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Request a Consultation', href: '/request-consultation' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-sky-400/10 bg-[#06090f]">
      <div className="absolute inset-0 hero-grid opacity-20" />
      <div className="absolute -top-32 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-sky-600">
                <span className="font-display text-lg font-bold text-white">GC</span>
              </div>
              <span className="font-display text-lg font-bold text-white">
                GC <span className="text-sky-400">Globals</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/40">
              US-managed technology, accounting, and staffing services. India-based delivery
              team serving clients across the USA, India, and international markets.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/40">
                <Mail className="h-4 w-4 text-sky-400" />
                <span>contact@gcglobals.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/40">
                <Phone className="h-4 w-4 text-sky-400" />
                <span>+1 (800) 555-0190</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/40">
                <MapPin className="h-4 w-4 text-sky-400" />
                <span>US Operations · India Delivery Center</span>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-sky-400/20 text-white/40 transition-colors hover:border-sky-400 hover:text-sky-400" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-sky-400/20 text-white/40 transition-colors hover:border-sky-400 hover:text-sky-400" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-sky-400/20 text-white/40 transition-colors hover:border-sky-400 hover:text-sky-400" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/40 transition-colors hover:text-sky-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-sky-400/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} GC Globals. All rights reserved.
          </p>
          <p className="text-sm text-white/40">
            Technology. Talent. Business Growth.
          </p>
        </div>
      </div>
    </footer>
  );
}
