'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import {
  Menu, X, ArrowRight, Home, Info, Briefcase, Cpu,
  FolderKanban, UserRound, Phone, LogIn, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import LiquidNav from './LiquidNav';

const navLinks = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Services', href: '/services', icon: Briefcase, children: [
    { label: 'Web Development', href: '/services/web-development' },
    { label: 'Accounting Services', href: '/services/accounting' },
    { label: 'QuickBooks Services', href: '/services/quickbooks' },
    { label: 'Zoho Books Services', href: '/services/zoho-books' },
    { label: 'Staffing / Outsourcing', href: '/services/staffing' },
  ]},
  { label: 'Technologies', href: '/technologies', icon: Cpu },
  { label: 'Portfolio', href: '/portfolio', icon: FolderKanban },
  { label: 'Careers', href: '/careers', icon: UserRound },
  { label: 'Contact', href: '/contact', icon: Phone },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const activeIndex = useMemo(() => {
    const match = navLinks.findIndex((link) =>
      link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
    );
    return match === -1 ? 0 : match;
  }, [pathname]);

  const navItems = navLinks.map((link, i) => {
    const isActive = i === activeIndex;
    const isHovered = hoveredIndex === i;
    return (
      <Link
        key={link.label}
        href={link.href}
        className="relative flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-all duration-300"
        style={{
          color: isHovered || isActive ? '#7dd3fc' : 'rgba(255,255,255,0.65)',
          transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
        }}
      >
        <link.icon className="h-3.5 w-3.5" />
        {link.label}
      </Link>
    );
  });

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'py-2' : 'py-3'
        )}
        style={{
          background: scrolled
            ? 'rgba(6, 9, 15, 0.9)'
            : 'rgba(6, 9, 15, 0.5)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: '1px solid rgba(56, 189, 248, 0.12)',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5 shrink-0">
            <Image
              src="/Logo_1.png"
              alt="GC Globals"
              width={36}
              height={36}
              className="rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display text-lg font-bold tracking-tight text-white">
              GC <span className="text-sky-400">Globals</span>
            </span>
          </Link>

          {/* Desktop liquid nav */}
          <div className="hidden lg:block relative">
            <LiquidNav
              items={navItems}
              activeIndex={activeIndex}
              onItemClick={(i) => setHoveredIndex(i)}
              onHoverChange={(i) => {
                setHoveredIndex(i);
                setServicesOpen(i === 2);
              }}
            />

            {/* Services dropdown */}
            <AnimatePresence>
              {servicesOpen && hoveredIndex === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 rounded-xl border border-sky-400/20 bg-[#0a0f1c] p-2 shadow-2xl shadow-black/60"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => { setServicesOpen(false); setHoveredIndex(null); }}
                >
                  {navLinks[2].children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-lg px-3 py-2.5 text-sm text-white/60 transition-all hover:bg-sky-400/10 hover:text-sky-300 hover:translate-x-1"
                    >
                      {child.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right side */}
          <div className="hidden items-center gap-3 lg:flex shrink-0">
            <Link
              href="/login"
              className="flex items-center gap-1.5 text-sm font-medium text-white/60 transition-colors hover:text-sky-300"
            >
              <LogIn className="h-3.5 w-3.5" />
              Login
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/request-consultation"
                className="group relative flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-sky-400 to-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition-all hover:shadow-sky-500/50"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Start a Project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
            </motion.div>
          </div>

          {/* Mobile toggle */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-[#06090f]/98 backdrop-blur-xl" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2.5">
                  <Image
                    src="/Logo_1.png"
                    alt="GC Globals"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                  <span className="font-display text-lg font-bold text-white">
                    GC <span className="text-sky-400">Globals</span>
                  </span>
                </div>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 pt-4">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 py-3 text-2xl font-display font-semibold transition-colors",
                          i === activeIndex ? "text-sky-400" : "text-white/90 hover:text-sky-400"
                        )}
                      >
                        <link.icon className="h-5 w-5 text-sky-400/70" />
                        {link.label}
                      </Link>
                      {link.children && (
                        <div className="ml-8 mb-2 flex flex-col gap-1 border-l border-sky-400/20 pl-4">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="py-1.5 text-base text-white/50 transition-colors hover:text-sky-400"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-sky-400/30 px-5 py-3 text-center text-sm font-medium text-white"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                  <Link
                    href="/request-consultation"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-400 to-sky-600 px-5 py-3 text-sm font-semibold text-white"
                  >
                    <Sparkles className="h-4 w-4" />
                    Start a Project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
