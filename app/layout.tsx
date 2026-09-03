import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GC Globals — Technology. Talent. Business Growth.',
  description:
    'GC Globals helps businesses build modern digital products, streamline accounting operations, and access skilled global talent. US-managed, India-based delivery.',
  keywords: [
    'web development',
    'accounting services',
    'QuickBooks',
    'Zoho Books',
    'staffing',
    'remote developers',
    'full-stack development',
    'outsourcing',
    'GC Globals',
  ],
  openGraph: {
    title: 'GC Globals — Technology. Talent. Business Growth.',
    description:
      'Premium technology, accounting, and staffing services. US-managed, India-based delivery team serving global clients.',
    type: 'website',
    url: 'https://gcglobals.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GC Globals — Technology. Talent. Business Growth.',
    description:
      'Premium technology, accounting, and staffing services. US-managed, India-based delivery team serving global clients.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-[#06090f] text-white`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
