import { MAndA } from '@/page-components/Services/MAndA';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cross-Border M&A Lawyer in the USA | Trusted M&A Attorney',
  description: 'Cross border M&A lawyer USA delivering expert M&A attorney services for global deals, due diligence, and high-value transactions with Big 4 experience.',
  keywords: 'CROSS BORDER M&A lawyer, M&A lawyer USA, M&A attorney, mergers and acquisitions lawyer, due diligence attorney, corporate transactions, deal structuring, tech M&A, startup acquisitions, transaction lawyer',
  openGraph: {
    title: 'Cross-Border M&A Lawyer in the USA | Trusted M&A Attorney',
    description: 'Cross border M&A lawyer USA delivering expert M&A attorney services for global deals, due diligence, and high-value transactions with Big 4 experience.',
    url: 'https://rivalislaw.com/services/ma',
    siteName: 'Rivalis Law',
    type: 'website',
    locale: 'en_US',
    images: [{
      url: '/og-images/ma.jpg',
      width: 1200,
      height: 630,
      alt: 'M&A Attorney Services - Rivalis Law',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M&A Attorney | Mergers & Acquisitions',
    description: 'Cross border M&A lawyer USA delivering expert M&A attorney services for global deals, due diligence, and high-value transactions with Big 4 experience.',
    images: ['/og-images/ma.jpg'],
  },
  alternates: {
    canonical: 'https://rivalislaw.com/services/ma',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MAndAPage() {
  return <MAndA />;
}
