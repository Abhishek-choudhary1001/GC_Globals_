import ServiceDetail from '@/components/site/ServiceDetail';

export default function ZohoBooksPage() {
  return (
    <ServiceDetail
      label="Zoho Books Services"
      title={<>Zoho Books setup<br /><span className="text-muted-foreground">and management</span></>}
      description="Expert Zoho Books configuration, bookkeeping, and financial management for businesses using or migrating to the Zoho ecosystem. Perfect for Indian businesses and international companies alike."
      benefits={[
        { title: 'Zoho Ecosystem Experts', description: 'Deep expertise across Zoho Books, Zoho Inventory, Zoho CRM, and the full Zoho Finance suite.' },
        { title: 'GST Compliance', description: 'Complete GST setup, filing support, and compliance management for Indian businesses.' },
        { title: 'Multi-Currency Support', description: 'Configure multi-currency transactions for international businesses with automatic exchange rate updates.' },
        { title: 'Automation Setup', description: 'Automate invoicing, payment reminders, and recurring transactions to save time and reduce errors.' },
        { title: 'Integration Ready', description: 'Connect Zoho Books with your CRM, inventory, payment gateways, and other business tools.' },
        { title: 'Migration Support', description: 'Seamless migration from QuickBooks, Tally, or other accounting platforms to Zoho Books.' },
      ]}
      process={[
        { step: '01', title: 'Evaluate', description: 'We review your current accounting setup and determine the optimal Zoho Books configuration.' },
        { step: '02', title: 'Configure', description: 'Set up chart of accounts, GST/tax rules, invoicing templates, and automation workflows.' },
        { step: '03', title: 'Migrate', description: 'Import historical data, open invoices, and balances from your previous system.' },
        { step: '04', title: 'Manage', description: 'Ongoing bookkeeping, reconciliation, GST filing support, and financial reporting.' },
      ]}
      features={[
        'Zoho Books Setup',
        'GST Configuration & Filing',
        'Chart of Accounts Setup',
        'Invoice & Quote Templates',
        'Bank Reconciliation',
        'Expense Tracking',
        'Multi-Currency Setup',
        'Inventory Integration',
        'Zoho CRM Integration',
        'Payment Gateway Setup',
        'Automation Workflows',
        'Migration from Tally/QuickBooks',
      ]}
      ctaTitle="Switching to Zoho Books?"
      ctaDescription="Get expert help with setup, migration, and ongoing management."
      ctaLabel="Get Zoho Books Help"
    />
  );
}
