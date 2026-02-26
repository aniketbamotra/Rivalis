import type { Metadata } from 'next';
import { SiteSettingsProvider } from '@/providers/SiteSettingsProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { ConsultationFeeProvider } from '@/providers/ConsultationFeeProvider';
import { ServicesProvider } from '@/providers/ServicesProvider';
import { Toaster } from '@/components/ui/toaster';
import { getOrganizationSchema, renderStructuredData } from '@/lib/structuredData';
import '@/index.css';
import '@/styles/home.css';
import '@/styles/service-page.css';
import '@/styles/fraud-investigation.css';

export const metadata: Metadata = {
  title: 'AI Governance & Startup Law Firm | Rivalis Law',
  description: 'AI governance lawyer for startups advising on cross-border M&A, business immigration, contract review, securities, GDPR, and data privacy compliance.',
  keywords: 'AI governance lawyer, Cross-border M&A lawyer, Business immigration lawyer for startups, Contract review lawyer, GDPR compliance attorney, Data privacy compliance lawyer, Startup securities attorney',
  metadataBase: new URL('https://rivalislaw.com'),
  icons: {
    icon: [
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'web-app-manifest-192x192', url: '/favicon/web-app-manifest-192x192.png' },
      { rel: 'web-app-manifest-512x512', url: '/favicon/web-app-manifest-512x512.png' },
    ],
  },
  openGraph: {
    title: 'AI Governance & Startup Law Firm | Rivalis Law',
    description: 'AI governance lawyer for startups advising on cross-border M&A, business immigration, contract review, securities, GDPR, and data privacy compliance.',
    url: 'https://rivalislaw.com',
    siteName: 'Rivalis Law',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-images/og.png',
        width: 1200,
        height: 630,
        alt: 'Rivalis Law - Expert Legal Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Governance & Startup Law Firm | Rivalis Law',
    description: 'AI governance lawyer for startups advising on cross-border M&A, business immigration, contract review, securities, GDPR, and data privacy compliance.',
    images: ['/og-images/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = getOrganizationSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          rel="stylesheet"
        />
        {renderStructuredData(organizationSchema)}
      </head>
      <body suppressHydrationWarning>
        <SiteSettingsProvider>
          <AuthProvider>
            <ConsultationFeeProvider>
              <ServicesProvider>
                {children}
                <Toaster />
              </ServicesProvider>
            </ConsultationFeeProvider>
          </AuthProvider>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
