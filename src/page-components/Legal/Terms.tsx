'use client';

import React from 'react';
import { MainLayout, Hero } from '../../components';

export const Terms: React.FC = () => {
  return (
    <MainLayout>
      <Hero
        title="Terms & Conditions"
        subtitle="Last Updated: November 2024"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Terms & Conditions' },
        ]}
      />

      <section className="section">
        <div className="section-container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Welcome to Rivalis Law. These Terms and Conditions govern your use of our website and legal services. 
              By accessing our website or engaging our services, you agree to be bound by these terms.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">2. Legal Services</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Rivalis Law provides legal services across multiple practice areas including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>Contract review and drafting</li>
              <li>Immigration law services</li>
              <li>Data privacy and compliance</li>
              <li>Employment law</li>
              <li>Intellectual property</li>
              <li>Entity formation</li>
              <li>Fraud investigation</li>
              <li>Fundraising and venture capital</li>
              <li>Governance and compliance</li>
            </ul>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">3. Attorney-Client Relationship</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              No attorney-client relationship is created by visiting this website or submitting an inquiry form. 
              An attorney-client relationship is only formed when we have agreed in writing to represent you, 
              you have signed an engagement letter, and any required conflict checks have been completed.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">4. Confidentiality</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Information submitted through our website forms is treated as confidential. However, until an 
              attorney-client relationship is established, we cannot guarantee the same level of protection 
              as information covered by attorney-client privilege. Do not submit highly sensitive information 
              until we have confirmed representation.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">5. Fees and Payment</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Legal fees vary based on the complexity of your matter and the services required. Fee estimates 
              provided on this website are ranges and not guarantees. Specific fees will be detailed in your 
              engagement letter. Payment terms are typically net 30 days unless otherwise agreed.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">6. No Legal Advice</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              The information on this website is for general informational purposes only and does not constitute 
              legal advice. Every legal situation is unique, and you should consult with an attorney before 
              taking any action based on information found on this website.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">7. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              To the fullest extent permitted by law, Rivalis Law shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages arising from your use of this website or reliance on 
              any information provided herein.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">8. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the 
              State of New York, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">9. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective 
              immediately upon posting to this website. Your continued use of our website constitutes acceptance 
              of any changes.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">10. Contact Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have questions about these Terms and Conditions, please contact us:
            </p>
            <ul className="list-none text-gray-600 space-y-2">
              <li><strong>Email:</strong> legal@rivalislaw.com</li>
              <li><strong>Phone:</strong> (202) 555-0199</li>
              <li><strong>Address:</strong> New York, NY</li>
            </ul>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Terms;

