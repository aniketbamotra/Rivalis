import React from 'react';
import { MainLayout, Hero } from '../../components';
import { useSiteSettings } from '../../hooks/useSiteSettings';

export const Disclaimers: React.FC = () => {
  const { settings } = useSiteSettings();
  return (
    <MainLayout>
      <Hero
        title="Legal Disclaimers"
        subtitle="Important Information About Our Services"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Disclaimers' },
        ]}
      />

      <section className="section">
        <div className="section-container max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">⚠️ Important Notice</h3>
              <p className="text-gray-700">
                The information provided on this website is for general informational purposes only and 
                should not be construed as legal advice. Please read the following disclaimers carefully.
              </p>
            </div>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4">No Attorney-Client Relationship</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Visiting this website, reading its content, or submitting information through our forms does 
              not create an attorney-client relationship between you and Rivalis Law. An attorney-client 
              relationship is only established when:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
              <li>We have expressly agreed to represent you</li>
              <li>You have signed a written engagement letter</li>
              <li>We have completed necessary conflict of interest checks</li>
              <li>Any required retainer has been received</li>
            </ul>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">No Legal Advice</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              The content on this website, including service descriptions, pricing information, and general 
              legal information, is provided for educational and informational purposes only. It does not 
              constitute legal advice and should not be relied upon as such. Every legal situation is unique, 
              and outcomes depend on specific facts and circumstances.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">Confidentiality Limitations</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              While we treat all inquiries as confidential, information submitted through our website before 
              an attorney-client relationship is established may not be protected by attorney-client privilege. 
              Please do not submit highly sensitive or privileged information until we have confirmed our 
              representation.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">Fee Estimates</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Fee ranges displayed on this website are estimates based on typical matters. Actual fees may 
              vary based on complexity, urgency, and specific circumstances. All fees will be discussed and 
              confirmed in writing before representation begins. Additional charges may apply for 
              out-of-pocket expenses, court fees, and other costs.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">Results Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Past results do not guarantee future outcomes. Every legal matter is different, and the outcome 
              of your case will depend on its specific facts and the applicable law. We make no promises or 
              guarantees about the results of any legal matter.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">Jurisdictional Limitations</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our attorneys are licensed to practice law in specific jurisdictions. The information on this 
              website may not apply to your jurisdiction. We do not provide legal advice regarding laws of 
              jurisdictions where we are not licensed, unless specifically permitted as pro hac vice counsel.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">Third-Party Content</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our website may contain links to third-party websites or references to third-party content. 
              We do not endorse or take responsibility for the accuracy or legality of any third-party 
              content. Links are provided for convenience only.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">Website Accuracy</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              While we strive to keep the information on this website current and accurate, we make no 
              warranties or representations regarding the completeness, accuracy, or timeliness of the 
              content. Laws change frequently, and information may become outdated.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary mb-4 mt-8">Professional Responsibility</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our attorneys are bound by the Rules of Professional Conduct applicable in their jurisdictions. 
              Nothing on this website should be construed as a solicitation in violation of those rules.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">📞 Questions?</h3>
              <p className="text-gray-700">
                If you have questions about these disclaimers or need legal assistance, please contact us 
                directly at <a href={`mailto:${settings?.email_contact || 'contact@rivalislaw.com'}`} className="text-blue-600 hover:underline">{settings?.email_contact || 'contact@rivalislaw.com'}</a> or 
                call <a href={`tel:${settings?.phone_primary || '+1-313-771-2283'}`} className="text-blue-600 hover:underline">{settings?.phone_display || '+1 (313) 771-2283'}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Disclaimers;

