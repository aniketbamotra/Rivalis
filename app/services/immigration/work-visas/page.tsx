import WorkVisas from '@/page-components/Services/Immigration/WorkVisas';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work Visa Attorney | H-1B, L-1, O-1, TN Visa Lawyer | Rivalis Law',
  description: 'Work visa attorney specializing in H-1B, L-1, O-1, E-2, and TN visas for foreign professionals. Expert in visa renewals, transfers, and employer compliance.',
  keywords: 'H-1B attorney, L-1 visa lawyer, O-1 visa attorney, work visa lawyer, TN visa, E-2 visa, visa renewal, visa transfer, immigration attorney, employment visa',
  openGraph: {
    title: 'Work Visa Attorney | H-1B, L-1, O-1 | Rivalis Law',
    description: 'Work visa attorney specializing in H-1B, L-1, O-1, and TN visas for foreign professionals.',
    url: 'https://rivalislaw.com/services/immigration/work-visas',
    siteName: 'Rivalis Law',
    type: 'website',
    locale: 'en_US',
    images: [{
      url: '/og-images/work-visas.jpg',
      width: 1200,
      height: 630,
      alt: 'Work Visa Attorney - Rivalis Law',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work Visa Attorney | H-1B, L-1, O-1',
    description: 'Expert in H-1B, L-1, O-1, and TN visas for foreign professionals.',
    images: ['/og-images/work-visas.jpg'],
  },
  alternates: {
    canonical: 'https://rivalislaw.com/services/immigration/work-visas',
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function WorkVisasPage() {
  return <WorkVisas />;
}
