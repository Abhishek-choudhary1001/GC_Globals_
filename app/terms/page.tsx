'use client';

import SiteLayout from '@/components/site/SiteLayout';
import PageHero from '@/components/site/PageHero';
import Reveal from '@/components/site/Reveal';

export default function TermsPage() {
  const sections = [
    { title: 'Acceptance of Terms', content: 'By accessing and using the GC Globals website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not access our services.' },
    { title: 'Services', content: 'GC Globals provides technology development, accounting services, and staffing solutions. The specific scope of services for each engagement will be defined in a separate agreement or statement of work.' },
    { title: 'User Responsibilities', content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to use our services only for lawful purposes.' },
    { title: 'Intellectual Property', content: 'All content on this website, including text, graphics, logos, and software, is the property of GC Globals or its licensors and is protected by intellectual property laws.' },
    { title: 'Payment Terms', content: 'Payment terms for services will be specified in individual service agreements. Unless otherwise agreed, invoices are due within 30 days of issuance.' },
    { title: 'Limitation of Liability', content: 'GC Globals shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services.' },
    { title: 'Termination', content: 'Either party may terminate a service engagement in accordance with the termination provisions specified in the applicable service agreement.' },
    { title: 'Governing Law', content: 'These terms shall be governed by and construed in accordance with applicable laws. Disputes shall be resolved in the appropriate jurisdiction.' },
    { title: 'Contact', content: 'For questions about these Terms, contact us at contact@gcglobals.com.' },
  ];

  return (
    <SiteLayout>
      <PageHero
        label="Legal"
        title={<>Terms & <span className="text-muted-foreground">Conditions</span></>}
        description="The terms and conditions under which GC Globals provides its services."
      />
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <p className="mb-8 text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
            <div className="space-y-8">
              {sections.map((section, i) => (
                <Reveal key={section.title} delay={i * 0.05}>
                  <h2 className="mb-3 font-display text-xl font-bold">{section.title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{section.content}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
