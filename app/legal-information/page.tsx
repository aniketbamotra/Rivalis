import { LegalInformation } from '@/page-components/Legal/LegalInformation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Information | Rivalis Law',
  description: 'Comprehensive legal information about Rivalis Law including attorney credentials, bar admissions, professional certifications, and jurisdictional practice areas.',
  keywords: 'attorney information, bar admission, legal credentials, attorney biography, professional qualifications',
  openGraph: {
    title: 'Legal Information | Rivalis Law',
    description: 'Comprehensive legal information about Rivalis Law and attorney credentials.',
    url: 'https://rivalislaw.com/legal-information',
    siteName: 'Rivalis Law',
    type: 'website',
    locale: 'en_US',
  },
  alternates: {
    canonical: 'https://rivalislaw.com/legal-information',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LegalInformationPage() {
  return <LegalInformation />;
}
