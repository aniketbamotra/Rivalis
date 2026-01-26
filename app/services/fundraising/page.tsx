import { Fundraising } from '@/page-components/Services/Fundraising';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fundraising & Securities Attorney | Seed, Series A, SAFE Notes | Rivalis Law',
  description: 'Startup fundraising attorney specializing in venture capital, SAFE notes, convertible notes, Series A/B rounds, and securities compliance. Expert in term sheets and investor negotiations.',
  keywords: 'fundraising attorney, securities lawyer, venture capital attorney, SAFE notes, convertible notes, Series A attorney, startup funding, VC lawyer, investment attorney, term sheet',
  openGraph: {
    title: 'Fundraising & Securities Attorney | Rivalis Law',
    description: 'Startup fundraising attorney specializing in venture capital, SAFE notes, and Series A/B rounds.',
    url: 'https://rivalislaw.com/services/fundraising',
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
    title: 'Fundraising & Securities Attorney',
    description: 'Expert in venture capital, SAFE notes, and startup funding rounds.',
    images: ['/og-images/fundraising.jpg'],
  },
  alternates: {
    canonical: 'https://rivalislaw.com/services/fundraising',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FundraisingPage() {
  return <Fundraising />;
}
