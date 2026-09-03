import ServiceDetail from '@/components/site/ServiceDetail';

export default function StaffingPage() {
  return (
    <ServiceDetail
      label="Staffing & Outsourcing"
      title={<>Build your remote team<br /><span className="text-muted-foreground">with skilled Indian talent</span></>}
      description="Access dedicated developers, accountants, and administrative professionals from India. Our US-managed staffing model ensures quality, communication, and reliability for businesses in the USA, Canada, UK, Australia, and Europe."
      benefits={[
        { title: 'Cost Savings', description: 'Save 40-60% compared to US-based hires while maintaining high quality and productivity.' },
        { title: 'Dedicated Professionals', description: 'Your remote team members work exclusively for you, integrated into your workflows and culture.' },
        { title: 'US-Managed Oversight', description: 'Our US-based management team handles HR, performance monitoring, and quality assurance.' },
        { title: 'Flexible Scaling', description: 'Scale your team up or down as needed — from a single specialist to a full department.' },
        { title: 'Time Zone Coverage', description: 'India-based team provides extended hours coverage, with overlap for meetings and collaboration.' },
        { title: 'Quick Onboarding', description: 'We handle recruitment, vetting, and onboarding so your new team member is productive fast.' },
      ]}
      process={[
        { step: '01', title: 'Define', description: 'Tell us the roles, skills, and experience level you need. We create detailed job specifications.' },
        { step: '02', title: 'Source', description: 'We recruit, vet, and shortlist candidates from our talent pool. You interview and select.' },
        { step: '03', title: 'Onboard', description: 'We handle contracts, equipment, and onboarding. Your new team member integrates into your workflow.' },
        { step: '04', title: 'Manage', description: 'Ongoing HR management, performance monitoring, and quality assurance by our US team.' },
      ]}
      features={[
        'Dedicated Developers',
        'Accounting Professionals',
        'Bookkeepers',
        'Remote Employees',
        'Administrative Support',
        'Customer Support Staff',
        'Back-Office Professionals',
        'Business Process Support',
        'Team Augmentation',
        'Project-Based Staffing',
        'Virtual Assistants',
        'IT Support Staff',
      ]}
      ctaTitle="Build Your Remote Team"
      ctaDescription="Tell us what roles you need to fill and we'll connect you with qualified professionals."
      ctaLabel="Build Your Remote Team"
    />
  );
}
