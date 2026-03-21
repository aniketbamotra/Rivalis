import { EmploymentLaw } from '@/page-components/Services/EmploymentLaw';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Employment Law Attorney for Startups | Rivalis Law Experts',
  description: 'Expert employment law attorney for startups. Get contracts, HR compliance, hiring and termination support from Big 4-trained legal counsel at Rivalis Law.',
  keywords: 'employment law attorney, employment lawyer, employee handbook, employment contracts, workplace attorney, labor law, HR compliance, termination attorney, employment policies',
  openGraph: {
    title: 'Employment Law Attorney | Rivalis Law',
    description: 'Expert employment law attorney for startups.',
    url: 'https://rivalislaw.com/services/employment-law-attorney-for-startups',
    siteName: 'Rivalis Law',
    type: 'website',
    locale: 'en_US',
    images: [{
      url: '/og-images/employment-law.jpg',
      width: 1200,
      height: 630,
      alt: 'Employment Law Services - Rivalis Law',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Employment Law Attorney',
    description: 'Expert employment law attorney for startups.',
    images: ['/og-images/employment-law.jpg'],
  },
  alternates: {
    canonical: 'https://rivalislaw.com/services/employment-law-attorney-for-startups',
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function EmploymentPage() {
  return <EmploymentLaw />;
}
