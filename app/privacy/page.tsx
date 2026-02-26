import { Privacy } from '@/page-components/Legal/Privacy';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Rivalis Law',
  description: 'Privacy Policy for Rivalis Law. Learn how we collect, use, and protect your information in accordance with attorney-client privilege and professional obligations.',
  keywords: 'privacy policy, attorney-client privilege, data protection, confidentiality, legal privacy',
  openGraph: {
    title: 'Privacy Policy | Rivalis Law',
    description: 'Privacy Policy for Rivalis Law. Learn how we collect, use, and protect your information.',
    url: 'https://rivalislaw.com/privacy',
    siteName: 'Rivalis Law',
    type: 'website',
    locale: 'en_US',
  },
  alternates: {
    canonical: 'https://rivalislaw.com/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return <Privacy />;
}
