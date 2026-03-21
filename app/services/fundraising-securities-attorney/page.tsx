import { Fundraising } from '@/page-components/Services/Fundraising';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fundraising and Securities Attorney for Startups & Growth',
  description: 'Expert fundraising and securities attorney helping startups with SAFE, convertible notes, and Series A compliance. Trusted legal counsel for scaling companies.',
  keywords: 'Fundraising and Securities Attorney, fundraising attorney, securities lawyer, venture capital attorney, SAFE notes, convertible notes, Series A attorney, startup funding, VC lawyer, investment attorney, term sheet',
  openGraph: {
    title: 'Fundraising and Securities Attorney for Startups & Growth',
    description: 'Expert fundraising and securities attorney helping startups with SAFE, convertible notes, and Series A compliance.',
    url: 'https://rivalislaw.com/services/fundraising-securities-attorney',
    siteName: 'Rivalis Law',
    type: 'website',
    locale: 'en_US',
    images: [{
      url: '/og-images/fundraising.jpg',
      width: 1200,
      height: 630,
      alt: 'Fundraising & Securities - Rivalis Law',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fundraising and Securities Attorney for Startups & Growth',
    description: 'Expert fundraising and securities attorney helping startups with SAFE, convertible notes, and Series A compliance.',
    images: ['/og-images/fundraising.jpg'],
  },
  alternates: {
    canonical: 'https://rivalislaw.com/services/fundraising-securities-attorney',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FundraisingPage() {
  return <Fundraising />;
}
