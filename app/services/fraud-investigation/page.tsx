import { FraudInvestigation } from '@/page-components/Services/FraudInvestigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corporate Fraud Investigation Attorney | Forensic Analysis | Rivalis Law',
  description: 'Corporate fraud attorney with Big 4 forensic training. Expert in fraud investigations, internal audits, compliance violations, whistleblower cases, and forensic analysis.',
  keywords: 'corporate fraud attorney, fraud investigation lawyer, forensic attorney, internal investigation, compliance violations, whistleblower attorney, fraud lawyer, forensic analysis',
  openGraph: {
    title: 'Corporate Fraud Investigation Attorney | Rivalis Law',
    description: 'Big 4 trained fraud attorney specializing in corporate investigations and forensic analysis.',
    url: 'https://rivalislaw.com/services/fraud-investigation',
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
    description: 'Big 4 trained fraud attorney specializing in corporate investigations.',
    images: ['/og-images/corporate-fraud.jpg'],
  },
  alternates: {
    canonical: 'https://rivalislaw.com/services/fraud-investigation',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FraudInvestigationPage() {
  return <FraudInvestigation />;
}
