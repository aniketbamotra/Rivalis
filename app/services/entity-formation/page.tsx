import { EntityFormation } from '@/page-components/Services/EntityFormation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Entity Formation Attorney | LLC, C-Corp, S-Corp | Rivalis Law',
  description: 'Business formation attorney helping startups choose and establish the right entity structure. Expert in Delaware C-Corps, LLCs, S-Corps, partnership agreements, and equity structures.',
  keywords: 'business formation attorney, entity formation lawyer, LLC attorney, C-Corp lawyer, S-Corp, Delaware incorporation, startup lawyer, business structure, partnership agreement',
  openGraph: {
    title: 'Business Entity Formation Attorney | Rivalis Law',
    description: 'Expert business formation attorney for Delaware C-Corps, LLCs, and startup entity structures.',
    url: 'https://rivalislaw.com/services/entity-formation',
    siteName: 'Rivalis Law',
    type: 'website',
    locale: 'en_US',
    images: [{
      url: '/og-images/entity-formation.jpg',
      width: 1200,
      height: 630,
      alt: 'Business Entity Formation - Rivalis Law',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Entity Formation Attorney',
    description: 'Expert in Delaware C-Corps, LLCs, and startup entity structures.',
    images: ['/og-images/entity-formation.jpg'],
  },
  alternates: {
    canonical: 'https://rivalislaw.com/services/entity-formation',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EntityFormationPage() {
  return <EntityFormation />;
}
