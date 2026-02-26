import { MAndA } from '@/page-components/Services/MAndA';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'M&A Attorney | Mergers & Acquisitions, Due Diligence | Rivalis Law',
  description: 'Experienced M&A attorney for tech companies and startups. Expert in mergers, acquisitions, due diligence, deal structuring, and post-merger integration. Big 4 trained transaction lawyer.',
  keywords: 'M&A attorney, mergers and acquisitions lawyer, due diligence attorney, corporate transactions, deal structuring, tech M&A, startup acquisitions, transaction lawyer',
  openGraph: {
    title: 'M&A Attorney | Mergers & Acquisitions | Rivalis Law',
    description: 'Experienced M&A attorney for tech companies. Expert in mergers, acquisitions, due diligence, and deal structuring.',
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
    description: 'Expert M&A attorney for tech companies specializing in due diligence and deal structuring.',
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
