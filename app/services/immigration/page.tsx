import { Immigration } from '@/page-components/Services/Immigration';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Immigration Law Services | H-1B, EB-1, EB-2, EB-5 Visa Attorney | Rivalis Law',
  description: 'Expert immigration attorney specializing in work visas, green cards (EB-1, EB-2 NIW, EB-5), and global talent mobility. Big 4 trained with proven track record in complex immigration cases.',
  keywords: 'immigration attorney, H-1B visa lawyer, EB-1 green card, EB-2 NIW attorney, EB-5 investor visa, work visa lawyer, immigration law firm, global talent mobility, business immigration',
  openGraph: {
    title: 'Immigration Law Services | H-1B, EB-1, EB-2, EB-5 | Rivalis Law',
    description: 'Expert immigration attorney with Big 4 experience. Specializing in work visas, EB-1 extraordinary ability, EB-2 NIW, and EB-5 investor visas.',
    url: 'https://rivalislaw.com/services/immigration',
    siteName: 'Rivalis Law',
    type: 'website',
    locale: 'en_US',
    images: [{
      url: '/og-images/immigration.jpg',
      width: 1200,
      height: 630,
      alt: 'Immigration Law Services - Rivalis Law',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Immigration Law Services | H-1B, EB-1, EB-2, EB-5',
    description: 'Expert immigration attorney with Big 4 experience specializing in work visas and green cards.',
    images: ['/og-images/immigration.jpg'],
  },
  alternates: {
    canonical: 'https://rivalislaw.com/services/immigration',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ImmigrationPage() {
  return <Immigration />;
}
