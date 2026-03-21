import { GovernanceCompliance } from '@/page-components/Services/GovernanceCompliance';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Compliance Attorney for Startups | Rivalis Law Experts',
  description: 'Work with an AI compliance attorney for startups. Get expert guidance on AI governance, EU AI Act, and risk management from a Big 4-trained lawyer.',
  keywords: 'AI compliance attorney for startups, EU AI Act lawyer, AI compliance, algorithmic risk assessment, AI ethics, AI regulation, machine learning law, artificial intelligence attorney, AI policy',
  openGraph: {
    title: 'AI Compliance Attorney for Startups',
    description: 'Work with an AI compliance attorney for startups.',
    url: 'https://rivalislaw.com/services/ai-compliance-attorney-startups',
    siteName: 'Rivalis Law',
    type: 'website',
    locale: 'en_US',
    images: [{
      url: '/og-images/ai-governance.jpg',
      width: 1200,
      height: 630,
      alt: 'AI Governance & Compliance - Rivalis Law',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Compliance Attorney for Startups',
    description: 'Work with an AI compliance attorney for startups.',
    images: ['/og-images/ai-governance.jpg'],
  },
  alternates: {
    canonical: 'https://rivalislaw.com/services/ai-compliance-attorney-startups',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GovernancePage() {
  return <GovernanceCompliance />;
}
