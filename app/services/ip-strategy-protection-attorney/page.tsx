import { IPStrategy } from '@/page-components/Services/IPStrategy';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IP Strategy and Protection Attorney for Global Businesses',
  description: 'Work with an IP strategy and protection attorney to safeguard trademarks, trade secrets, and portfolios. Expert legal guidance for growing global businesses.',
  keywords: 'IP Strategy and Protection Attorney, IP attorney, intellectual property lawyer, patent attorney, trademark lawyer, copyright attorney, IP licensing, IP strategy, patent protection, trademark registration',
  openGraph: {
    title: 'IP Strategy and Protection Attorney for Global Businesses',
    description: 'Work with an IP strategy and protection attorney to safeguard trademarks, trade secrets, and portfolios.',
    url: 'https://rivalislaw.com/services/ip-strategy-protection-attorney',
    siteName: 'Rivalis Law',
    type: 'website',
    locale: 'en_US',
    images: [{
      url: '/og-images/ip-strategy.jpg',
      width: 1200,
      height: 630,
      alt: 'IP Strategy & Protection - Rivalis Law',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IP Strategy and Protection Attorney for Global Businesses',
    description: 'Work with an IP strategy and protection attorney to safeguard trademarks, trade secrets, and portfolios.',
    images: ['/og-images/ip-strategy.jpg'],
  },
  alternates: {
    canonical: 'https://rivalislaw.com/services/ip-strategy-protection-attorney',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function IPStrategyPage() {
  return <IPStrategy />;
}
