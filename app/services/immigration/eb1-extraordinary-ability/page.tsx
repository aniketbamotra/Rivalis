import EB1ExtraordinaryAbility from '@/page-components/Services/Immigration/EB1ExtraordinaryAbility';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EB-1 Extraordinary Ability Attorney | EB-1A Green Card Lawyer | Rivalis Law',
  description: 'EB-1 immigration attorney specializing in extraordinary ability green cards for scientists, researchers, entrepreneurs, and artists. Expert in EB-1A, EB-1B, and EB-1C petitions.',
  keywords: 'EB-1 attorney, EB-1A lawyer, extraordinary ability green card, EB-1B attorney, EB-1C lawyer, outstanding researcher, immigrant visa attorney, green card lawyer',
  openGraph: {
    title: 'EB-1 Extraordinary Ability Attorney | Rivalis Law',
    description: 'EB-1 immigration attorney for extraordinary ability green cards. Expert in EB-1A, EB-1B, and EB-1C petitions.',
    url: 'https://rivalislaw.com/services/immigration/eb1-extraordinary-ability',
    siteName: 'Rivalis Law',
    type: 'website',
    locale: 'en_US',
    images: [{
      url: '/og-images/eb1.jpg',
      width: 1200,
      height: 630,
      alt: 'EB-1 Extraordinary Ability Attorney - Rivalis Law',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EB-1 Extraordinary Ability Attorney',
    description: 'Expert in EB-1A extraordinary ability green cards for scientists, researchers, and entrepreneurs.',
    images: ['/og-images/eb1.jpg'],
  },
  alternates: {
    canonical: 'https://rivalislaw.com/services/immigration/eb1-extraordinary-ability',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EB1Page() {
  return <EB1ExtraordinaryAbility />;
}
