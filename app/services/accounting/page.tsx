import ServiceDetail from '@/components/site/ServiceDetail';

export default function AccountingPage() {
  return (
    <ServiceDetail
      label="Accounting Services"
      title={<>Professional accounting<br /><span className="text-muted-foreground">for growing businesses</span></>}
      description="Comprehensive accounting services for US and Indian businesses. From bookkeeping to financial reporting, we help you maintain accurate books and make informed financial decisions."
      benefits={[
        { title: 'US & India Expertise', description: 'Deep understanding of both US and Indian accounting standards, tax regulations, and compliance requirements.' },
        { title: 'QuickBooks ProAdvisors', description: 'Certified QuickBooks experts who can set up, manage, and optimize your QuickBooks accounting system.' },
        { title: 'Zoho Books Specialists', description: 'Expert Zoho Books configuration and management for businesses using or migrating to Zoho ecosystem.' },
        { title: 'Accurate Bookkeeping', description: 'Meticulous transaction recording, categorization, and reconciliation ensuring your books are always audit-ready.' },
        { title: 'Financial Reporting', description: 'Monthly, quarterly, and annual financial reports that give you clear visibility into your business performance.' },
        { title: 'Cost-Effective', description: 'India-based accounting professionals provide high-quality service at a fraction of US accounting costs.' },
      ]}
      process={[
        { step: '01', title: 'Assess', description: 'We review your current accounting setup, software, and processes to identify gaps and opportunities.' },
        { step: '02', title: 'Setup', description: 'Configure or optimize your accounting system (QuickBooks, Zoho Books, or other) for your business needs.' },
        { step: '03', title: 'Execute', description: 'Ongoing bookkeeping, reconciliation, AP/AR management, and financial reporting on a scheduled basis.' },
        { step: '04', title: 'Review', description: 'Regular review meetings to discuss financial reports, insights, and recommendations for improvement.' },
      ]}
      features={[
        'QuickBooks Setup & Management',
        'Zoho Books Configuration',
        'Bookkeeping Services',
        'Accounts Payable (AP)',
        'Accounts Receivable (AR)',
        'Bank Reconciliation',
        'Credit Card Reconciliation',
        'Financial Reporting',
        'Payroll Support',
        'Tax Preparation Support',
        'Month-End Close',
        'Accounting Advisory',
      ]}
      ctaTitle="Talk to an Accounting Specialist"
      ctaDescription="Get a free consultation on how we can streamline your accounting operations."
      ctaLabel="Schedule a Consultation"
    />
  );
}
