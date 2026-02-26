'use client';

import React from 'react';
import { MainLayout, Hero } from '../../components';

export const Privacy: React.FC = () => {
  return (
    <MainLayout>
      <Hero
        title="Privacy Policy"
        subtitle="Last Updated: November 2024"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy' },
        ]}
      />

      <section className="section">
        <div className="section-container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Rivalis Law collects information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Contact information (name, email, phone number)</li>
              <li>Company information (company name, industry, size)</li>
              <li>Legal matter details submitted through intake forms</li>
              <li>Communication history with our team</li>
              <li>Payment information for billing purposes</li>
            </ul>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">2. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Provide legal services and respond to inquiries</li>
              <li>Communicate with you about your legal matters</li>
              <li>Process payments and manage billing</li>
              <li>Comply with legal and regulatory obligations</li>
              <li>Improve our services and website</li>
              <li>Send relevant updates about our services (with your consent)</li>
            </ul>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">3. Attorney-Client Privilege</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Once an attorney-client relationship is established, communications between you and our attorneys 
              are protected by attorney-client privilege. We maintain strict confidentiality of all client 
              information in accordance with our professional obligations.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">4. Information Sharing</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We do not sell your personal information. We may share information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>With your consent or at your direction</li>
              <li>With service providers who assist in our operations</li>
              <li>To comply with legal obligations or court orders</li>
              <li>To protect our rights and the rights of others</li>
            </ul>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">5. Data Security</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. This includes encryption, 
              secure servers, and access controls.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">6. Data Retention</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We retain personal information for as long as necessary to fulfill the purposes for which it was 
              collected, including to satisfy legal, accounting, or reporting requirements. Client files are 
              retained in accordance with professional responsibility rules.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">7. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your information (subject to legal obligations)</li>
              <li>Objection to processing</li>
              <li>Data portability</li>
            </ul>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">8. Cookies and Tracking</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our website uses cookies and similar technologies to improve user experience and analyze website 
              traffic. You can control cookie preferences through your browser settings.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">9. Third-Party Links</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our website may contain links to third-party websites. We are not responsible for the privacy 
              practices of these websites and encourage you to review their privacy policies.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">10. Children's Privacy</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our services are not directed to individuals under 18 years of age. We do not knowingly collect 
              personal information from children.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">11. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              For questions about this Privacy Policy or to exercise your rights, contact us:
            </p>
            <ul className="list-none text-gray-600 space-y-2">
              <li><strong>Email:</strong> privacy@rivalislaw.com</li>
              <li><strong>Phone:</strong> (202) 555-0199</li>
            </ul>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Privacy;

