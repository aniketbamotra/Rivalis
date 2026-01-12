import type { Metadata } from 'next';
import { SiteSettingsProvider } from '@/providers/SiteSettingsProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { ConsultationFeeProvider } from '@/providers/ConsultationFeeProvider';
import { ServicesProvider } from '@/providers/ServicesProvider';
import { Toaster } from '@/components/ui/toaster';
import '@/App.css';
import '@/index.css';
import '@/styles/home.css';
import '@/styles/service-page.css';
import '@/styles/fraud-investigation.css';

export const metadata: Metadata = {
  title: 'Rivalis Law - Big 4 Trained Attorney | AI Governance | Global Immigration',
  description: 'Expert legal services in AI governance, immigration law, M&A transactions, and more. NY & MI Bar certified attorney with Big 4 training.',
  keywords: 'immigration attorney, AI governance, M&A attorney, employment law, intellectual property, data privacy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
