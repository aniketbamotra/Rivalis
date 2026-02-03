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
  title: 'Rivalis Law - Big 4 Trained Attorney | AI Governance | Global Immigration',
  description: 'Expert legal services in AI governance, immigration law, M&A transactions, and more. NY & MI Bar certified attorney with Big 4 training.',
  keywords: 'immigration attorney, AI governance, M&A attorney, employment law, intellectual property, data privacy',
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
    title: 'Rivalis Law - Big 4 Trained Attorney',
    description: 'Expert legal services in AI governance, immigration law, and M&A transactions.',
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
    title: 'Rivalis Law - Big 4 Trained Attorney',
    description: 'Expert legal services in AI governance, immigration law, and M&A transactions.',
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
