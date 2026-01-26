import { GovernanceCompliance } from '@/page-components/Services/GovernanceCompliance';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Governance & Compliance Attorney | EU AI Act, Risk Assessment | Rivalis Law',
  description: 'Oxford AI certified attorney specializing in AI governance, EU AI Act compliance, algorithmic risk assessment, and AI ethics frameworks. Big 4 trained with technical expertise.',
  keywords: 'AI governance attorney, EU AI Act lawyer, AI compliance, algorithmic risk assessment, AI ethics, AI regulation, machine learning law, artificial intelligence attorney, AI policy',
  openGraph: {
    title: 'AI Governance & Compliance Attorney | Rivalis Law',
    description: 'Oxford AI certified attorney specializing in AI governance, EU AI Act compliance, and algorithmic risk assessment.',
    url: 'https://rivalislaw.com/services/governance',
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
    title: 'AI Governance & Compliance Attorney',
    description: 'Oxford AI certified attorney specializing in EU AI Act compliance and algorithmic risk assessment.',
    images: ['/og-images/ai-governance.jpg'],
  },
  alternates: {
    canonical: 'https://rivalislaw.com/services/governance',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GovernancePage() {
  return <GovernanceCompliance />;
}
