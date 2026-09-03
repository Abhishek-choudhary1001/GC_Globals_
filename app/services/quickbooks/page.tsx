import ServiceDetail from '@/components/site/ServiceDetail';

export default function QuickBooksPage() {
  return (
    <ServiceDetail
      label="QuickBooks Services"
      title={<>QuickBooks expertise<br /><span className="text-muted-foreground">for US businesses</span></>}
      description="Certified QuickBooks professionals providing setup, bookkeeping, reconciliation, and ongoing management for small to mid-size US businesses using QuickBooks Online or Desktop."
      benefits={[
        { title: 'Certified Experts', description: 'QuickBooks ProAdvisor-certified professionals who know the platform inside and out.' },
        { title: 'QuickBooks Online & Desktop', description: 'Full support for both QuickBooks Online and Desktop versions, including migrations between them.' },
        { title: 'Clean-Up & Catch-Up', description: 'Got behind on your books? We specialize in cleaning up and catching up months or years of transactions.' },
        { title: 'Payroll Integration', description: 'Seamless payroll setup and integration with QuickBooks for accurate payroll accounting.' },
        { title: 'Third-Party Apps', description: 'Integration with e-commerce platforms, payment processors, and business tools you already use.' },
        { title: 'Audit-Ready Books', description: 'Organized, categorized, and reconciled books that are ready for tax season or audit at any time.' },
      ]}
      process={[
        { step: '01', title: 'Review', description: 'We assess your QuickBooks setup, chart of accounts, and historical transactions.' },
        { step: '02', title: 'Setup', description: 'Configure QuickBooks with proper chart of accounts, sales tax, and integrations.' },
        { step: '03', title: 'Bookkeep', description: 'Regular transaction categorization, reconciliation, and financial reporting.' },
        { step: '04', title: 'Advise', description: 'Monthly review with actionable insights on your financial position and cash flow.' },
      ]}
      features={[
        'QuickBooks Online Setup',
        'QuickBooks Desktop Setup',
        'Chart of Accounts Configuration',
        'Transaction Categorization',
        'Bank Reconciliation',
        'Credit Card Reconciliation',
        'Accounts Payable Management',
        'Accounts Receivable Management',
        'Payroll Setup & Support',
        'Sales Tax Management',
        'Monthly Financial Reports',
        'Clean-Up & Catch-Up Bookkeeping',
      ]}
      ctaTitle="Need QuickBooks help?"
      ctaDescription="Connect with a certified QuickBooks ProAdvisor for a free consultation."
      ctaLabel="Talk to a Specialist"
    />
  );
}
