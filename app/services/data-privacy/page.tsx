import { DataPrivacy } from '@/page-components/Services/DataPrivacy';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Privacy Attorney | GDPR, CCPA Compliance Lawyer | Rivalis Law',
  description: 'Data privacy attorney specializing in GDPR, CCPA, and global data protection compliance. Expert in privacy policies, data breach response, and cross-border data transfers.',
  keywords: 'data privacy attorney, GDPR lawyer, CCPA compliance, privacy attorney, data protection lawyer, privacy policy, data breach attorney, HIPAA compliance, international data transfers',
  openGraph: {
    title: 'Data Privacy Attorney | GDPR, CCPA Compliance | Rivalis Law',
    description: 'Data privacy attorney specializing in GDPR, CCPA, and global data protection compliance.',
    url: 'https://rivalislaw.com/services/data-privacy',
    siteName: 'Rivalis Law',
    type: 'website',
    locale: 'en_US',
    images: [{
      url: '/og-images/data-privacy.jpg',
      width: 1200,
      height: 630,
      alt: 'Data Privacy Compliance - Rivalis Law',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Privacy Attorney | GDPR, CCPA Compliance',
    description: 'Expert in GDPR, CCPA, and global data protection compliance.',
    images: ['/og-images/data-privacy.jpg'],
  },
  alternates: {
    canonical: 'https://rivalislaw.com/services/data-privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DataPrivacyPage() {
  return <DataPrivacy />;
}
