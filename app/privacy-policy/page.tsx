'use client';

import SiteLayout from '@/components/site/SiteLayout';
import PageHero from '@/components/site/PageHero';
import Reveal from '@/components/site/Reveal';

export default function PrivacyPolicyPage() {
  const sections = [
    { title: 'Information We Collect', content: 'We collect information you provide directly to us, such as your name, email address, phone number, company name, and any other information you choose to provide through our contact forms, consultation requests, or when you create an account on our platform.' },
    { title: 'How We Use Your Information', content: 'We use the information we collect to respond to your inquiries, provide our services, send you important notifications, improve our website and services, comply with legal obligations, and protect our rights and the rights of our users.' },
    { title: 'Information Sharing', content: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as necessary to provide our services, comply with legal obligations, or protect our rights.' },
    { title: 'Data Security', content: 'We implement appropriate technical, administrative, and physical security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.' },
    { title: 'Cookies', content: 'We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and understand how visitors use our website.' },
    { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal information. You may also opt out of certain communications from us at any time.' },
    { title: 'Changes to This Policy', content: 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.' },
    { title: 'Contact Us', content: 'If you have any questions about this privacy policy, please contact us at contact@gcglobals.com.' },
  ];

  return (
    <SiteLayout>
      <PageHero
        label="Legal"
        title={<>Privacy <span className="text-muted-foreground">Policy</span></>}
        description="Your privacy is important to us. This policy explains how we collect, use, and protect your information."
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
