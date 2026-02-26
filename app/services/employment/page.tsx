import { EmploymentLaw } from '@/page-components/Services/EmploymentLaw';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Employment Law Attorney | Employee Handbooks, Contracts | Rivalis Law',
  description: 'Employment law attorney for startups and tech companies. Expert in employee handbooks, employment contracts, compliance, terminations, and workplace policies.',
  keywords: 'employment law attorney, employment lawyer, employee handbook, employment contracts, workplace attorney, labor law, HR compliance, termination attorney, employment policies',
  openGraph: {
    title: 'Employment Law Attorney | Rivalis Law',
    description: 'Employment law attorney specializing in employee handbooks, contracts, and workplace compliance.',
    url: 'https://rivalislaw.com/services/employment',
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
    description: 'Expert in employee handbooks, employment contracts, and workplace compliance.',
    images: ['/og-images/employment-law.jpg'],
  },
  alternates: {
    canonical: 'https://rivalislaw.com/services/employment',
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function EmploymentPage() {
  return <EmploymentLaw />;
}
