import { Disclaimers } from '@/page-components/Legal/Disclaimers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Disclaimers | Rivalis Law',
  description: 'Important legal disclaimers for Rivalis Law. Attorney advertising notice, no guarantee of results, jurisdictional limitations, and professional responsibility information.',
  keywords: 'legal disclaimers, attorney advertising, jurisdictional limits, attorney responsibility, legal notice',
  openGraph: {
    title: 'Legal Disclaimers | Rivalis Law',
    description: 'Important legal disclaimers and attorney advertising notices for Rivalis Law.',
    url: 'https://rivalislaw.com/disclaimers',
    siteName: 'Rivalis Law',
    type: 'website',
    locale: 'en_US',
  },
  alternates: {
    canonical: 'https://rivalislaw.com/disclaimers',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DisclaimersPage() {
  return <Disclaimers />;
}
