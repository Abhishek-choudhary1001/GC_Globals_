'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Send, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import SiteLayout from '@/components/site/SiteLayout';
import PageHero from '@/components/site/PageHero';
import Reveal from '@/components/site/Reveal';
import { supabase } from '@/lib/supabase-client';
import { toast } from 'sonner';

const services = [
  'Web Development', 'Full-Stack Application', 'Accounting Services',
  'QuickBooks Services', 'Zoho Books Services', 'Staffing / Outsourcing', 'Other',
];
const budgets = ['Less than $5,000', '$5,000 - $15,000', '$15,000 - $50,000', '$50,000+', 'Not sure yet'];

export default function RequestConsultationPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    full_name: '', company_name: '', email: '', phone: '', country: '',
    service_required: '', budget_range: '', message: '', preferred_contact: '', project_timeline: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from('inquiries').insert({
        full_name: form.full_name, company_name: form.company_name || null,
        email: form.email, phone: form.phone || null, country: form.country || null,
        service_required: form.service_required || null, budget_range: form.budget_range || null,
        message: form.message, preferred_contact: form.preferred_contact || null,
        project_timeline: form.project_timeline || null,
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success('Consultation request sent! We\'ll be in touch within 24 hours.');
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SiteLayout>
      <PageHero
        label="Request a Consultation"
        title={<>Let&apos;s build something<br /><span className="text-muted-foreground">great together</span></>}
        description="Fill out the form below and our team will reach out within 24 hours to schedule a free consultation. No obligations, just a conversation about how we can help."
      />

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center rounded-2xl border border-sky-400/30 bg-sky-400/5 p-12 text-center"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sky-400/20">
                  <CheckCircle2 className="h-10 w-10 text-sky-400" />
                </div>
                <h3 className="mb-2 font-display text-2xl font-bold">Request Received!</h3>
                <p className="mb-6 text-muted-foreground">Thank you for your interest. Our team will contact you within 24 hours to schedule your consultation.</p>
                <Link href="/" className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold transition-colors hover:border-sky-400 hover:text-sky-400">
                  Back to Home
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Full Name *</label>
                    <input name="full_name" value={form.full_name} onChange={handleChange} required
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-all focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                      placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Company Name</label>
                    <input name="company_name" value={form.company_name} onChange={handleChange}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-all focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                      placeholder="Acme Inc." />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Work Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-all focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                      placeholder="john@acme.com" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-all focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                      placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Country</label>
                    <input name="country" value={form.country} onChange={handleChange}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-all focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                      placeholder="United States" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Service Required</label>
                    <select name="service_required" value={form.service_required} onChange={handleChange}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-all focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20">
                      <option value="">Select a service</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Budget Range</label>
                    <select name="budget_range" value={form.budget_range} onChange={handleChange}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-all focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20">
                      <option value="">Select a range</option>
                      {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Project Timeline</label>
                    <select name="project_timeline" value={form.project_timeline} onChange={handleChange}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-all focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20">
                      <option value="">Select timeline</option>
                      <option value="ASAP">ASAP</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6+ months">6+ months</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Tell us about your project *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-all focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 resize-none"
                    placeholder="What are you looking to build, solve, or improve?" />
                </div>
                <motion.button type="submit" disabled={submitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-sky-600 px-7 py-4 text-base font-semibold text-white shadow-xl shadow-sky-500/25 transition-all hover:shadow-sky-500/40 disabled:opacity-50">
                  {submitting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Request Free Consultation
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
