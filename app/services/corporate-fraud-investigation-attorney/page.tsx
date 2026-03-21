import { FraudInvestigation } from '@/page-components/Services/FraudInvestigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corporate Fraud Investigation Attorney | Rivalis Law Firm',
  description: 'Corporate fraud investigation attorney handling misconduct, whistleblower claims & financial irregularities. Protect your business with confidential legal expertise.',
  keywords: 'Corporate fraud investigation attorney, corporate fraud attorney, fraud investigation lawyer, forensic attorney, internal investigation, compliance violations, whistleblower attorney, fraud lawyer, forensic analysis',
  openGraph: {
    title: 'Corporate Fraud Investigation Attorney | Rivalis Law',
    description: 'Corporate fraud investigation attorney handling misconduct, whistleblower claims & financial irregularities.',
    url: 'https://rivalislaw.com/services/corporate-fraud-investigation-attorney',
    siteName: 'Rivalis Law',
    type: 'website',
    locale: 'en_US',
    images: [{
      url: '/og-images/corporate-fraud.jpg',
      width: 1200,
      height: 630,
      alt: 'Corporate Fraud Investigation - Rivalis Law',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corporate Fraud Investigation Attorney',
    description: 'Corporate fraud investigation attorney handling misconduct, whistleblower claims & financial irregularities.',
    images: ['/og-images/corporate-fraud.jpg'],
  },
  alternates: {
    canonical: 'https://rivalislaw.com/services/corporate-fraud-investigation-attorney',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FraudInvestigationPage() {
  return <FraudInvestigation />;
}
