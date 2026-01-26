import EB5Investor from '@/page-components/Services/Immigration/EB5Investor';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EB-5 Investor Visa Attorney | Green Card Through Investment | Rivalis Law',
  description: 'EB-5 immigration attorney for investor visas and green cards. Expert in EB-5 regional centers, direct investment, source of funds documentation, and I-526/I-829 petitions.',
  keywords: 'EB-5 attorney, investor visa lawyer, EB-5 green card, regional center, EB-5 investment, immigrant investor, I-526 petition, I-829 petition, investment immigration',
  openGraph: {
    title: 'EB-5 Investor Visa Attorney | Rivalis Law',
    description: 'EB-5 immigration attorney specializing in investor visas and green cards through investment.',
    url: 'https://rivalislaw.com/services/immigration/eb5',
    siteName: 'Rivalis Law',
    type: 'website',
    locale: 'en_US',
    images: [{
      url: '/og-images/eb5.jpg',
      width: 1200,
      height: 630,
      alt: 'EB-5 Investor Visa Attorney - Rivalis Law',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EB-5 Investor Visa Attorney',
    description: 'Expert in EB-5 investor visas and green cards through investment.',
    images: ['/og-images/eb5.jpg'],
  },
  alternates: {
    canonical: 'https://rivalislaw.com/services/immigration/eb5',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EB5Page() {
  return <EB5Investor />;
}
