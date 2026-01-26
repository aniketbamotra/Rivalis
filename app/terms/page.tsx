import { Terms } from '@/page-components/Legal/Terms';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | Rivalis Law',
  description: 'Terms of Use for Rivalis Law. Review our website terms, attorney advertising disclaimers, and conditions for accessing our legal services.',
  keywords: 'terms of use, attorney advertising, legal terms, website terms, conditions of use',
  openGraph: {
    title: 'Terms of Use | Rivalis Law',
    description: 'Terms of Use for Rivalis Law. Review our website terms and conditions.',
    url: 'https://rivalislaw.com/terms',
    siteName: 'Rivalis Law',
    type: 'website',
    locale: 'en_US',
  },
  alternates: {
    canonical: 'https://rivalislaw.com/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return <Terms />;
}
