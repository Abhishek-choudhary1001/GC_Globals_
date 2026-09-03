import ServiceDetail from '@/components/site/ServiceDetail';

export default function WebDevelopmentPage() {
  return (
    <ServiceDetail
      label="Web Development"
      title={<>Modern websites &<br /><span className="text-muted-foreground">web applications</span></>}
      description="From responsive marketing websites to complex full-stack applications, we build digital products that are fast, secure, and designed to convert visitors into customers."
      benefits={[
        { title: 'Lightning Fast', description: 'Optimized for Core Web Vitals with sub-second load times and smooth 60fps interactions.' },
        { title: 'SEO-Ready', description: 'Semantic HTML, structured data, server-side rendering, and clean URLs that search engines love.' },
        { title: 'Scalable Architecture', description: 'Built on modern frameworks like Next.js and React with clean, maintainable code that grows with you.' },
        { title: 'Mobile-First', description: 'Every project is designed mobile-first, tested across all breakpoints from small phones to ultra-wide displays.' },
        { title: 'Secure by Default', description: 'Security headers, input validation, CSRF protection, and best practices baked into every project.' },
        { title: 'Ongoing Support', description: 'Post-launch maintenance, monitoring, and feature development to keep your product evolving.' },
      ]}
      process={[
        { step: '01', title: 'Discover', description: 'We analyze your requirements, target audience, and business goals to define the project scope.' },
        { step: '02', title: 'Design', description: 'UI/UX design with interactive prototypes, design system, and user flow optimization.' },
        { step: '03', title: 'Develop', description: 'Agile development with weekly sprints, code reviews, and continuous integration.' },
        { step: '04', title: 'Deploy', description: 'Launch with CI/CD, performance monitoring, and post-launch optimization.' },
      ]}
      features={[
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
        'Performance Optimization',
        'Cloud Deployment',
      ]}
      ctaTitle="Ready to build?"
      ctaDescription="Tell us about your project and we'll provide a free consultation and quote."
      ctaLabel="Start a Project"
    />
  );
}
