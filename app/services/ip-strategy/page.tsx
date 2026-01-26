import { IPStrategy } from '@/page-components/Services/IPStrategy';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IP Strategy & Protection Attorney | Patents, Trademarks | Rivalis Law',
  description: 'Intellectual property attorney for tech startups. Expert in IP strategy, patent protection, trademark registration, copyright, licensing agreements, and IP portfolio management.',
  keywords: 'IP attorney, intellectual property lawyer, patent attorney, trademark lawyer, copyright attorney, IP licensing, IP strategy, patent protection, trademark registration',
  openGraph: {
    title: 'IP Strategy & Protection Attorney | Rivalis Law',
    description: 'Intellectual property attorney specializing in patents, trademarks, and IP strategy for tech startups.',
    url: 'https://rivalislaw.com/services/ip-strategy',
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
    title: 'IP Strategy & Protection Attorney',
    description: 'Expert in patents, trademarks, and IP strategy for tech startups.',
    images: ['/og-images/ip-strategy.jpg'],
  },
  alternates: {
    canonical: 'https://rivalislaw.com/services/ip-strategy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function IPStrategyPage() {
  return <IPStrategy />;
}
