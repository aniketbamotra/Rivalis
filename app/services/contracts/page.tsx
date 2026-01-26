import { ContractReview } from '@/page-components/Services/ContractReview';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contract Review & Drafting Attorney | Business Contracts | Rivalis Law',
  description: 'Expert contract attorney for review, drafting, and negotiation. Specializing in SaaS agreements, vendor contracts, employment agreements, NDAs, and commercial transactions.',
  keywords: 'contract attorney, contract review lawyer, contract drafting, business contracts, SaaS agreements, vendor contracts, NDA attorney, commercial contracts, contract negotiation',
  openGraph: {
    title: 'Contract Review & Drafting Attorney | Rivalis Law',
    description: 'Expert contract attorney specializing in SaaS agreements, vendor contracts, and commercial transactions.',
    url: 'https://rivalislaw.com/services/contracts',
    siteName: 'Rivalis Law',
    type: 'website',
    locale: 'en_US',
    images: [{
      url: '/og-images/contracts.jpg',
      width: 1200,
      height: 630,
      alt: 'Contract Review & Drafting - Rivalis Law',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contract Review & Drafting Attorney',
    description: 'Expert contract attorney for SaaS agreements and commercial transactions.',
    images: ['/og-images/contracts.jpg'],
  },
  alternates: {
    canonical: 'https://rivalislaw.com/services/contracts',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContractsPage() {
  return <ContractReview />;
}
