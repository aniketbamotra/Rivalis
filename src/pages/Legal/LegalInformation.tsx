import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../components';
import { useSiteSettings } from '../../hooks/useSiteSettings';

export const LegalInformation: React.FC = () => {
  const { settings } = useSiteSettings();
  const [activeSection, setActiveSection] = useState('attorney-advertising');

  useEffect(() => {
    // Handle hash navigation on mount
    const hash = window.location.hash.substring(1);
    if (hash) {
      setActiveSection(hash);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const offsetTop = element.offsetTop - 100;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }, 100);
    }

    // Update active section on scroll
    const handleScroll = () => {
      const sections = document.querySelectorAll('.legal-section');
      const scrollPos = window.pageYOffset + 150;

      sections.forEach((section) => {
        const element = section as HTMLElement;
        if (element.offsetTop <= scrollPos && element.offsetTop + element.offsetHeight > scrollPos) {
          setActiveSection(element.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
    window.history.pushState(null, '', `#${sectionId}`);
  };

  return (
    <MainLayout>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #0f1419 100%)',
        color: 'white',
        padding: '4rem 3rem',
        textAlign: 'center' as const,
      }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '3rem',
          fontWeight: 700,
          marginBottom: '1rem',
        }}>
          Legal Terms & Disclosures
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>
          Important information regarding the use of this website and engagement of legal services
        </p>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 3rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '4rem',
          alignItems: 'start',
        }}>
          {/* Sidebar Navigation */}
          <aside style={{
            position: 'sticky' as const,
            top: '100px',
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          }}>
            <h3 style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase' as const,
              letterSpacing: '1px',
              color: '#4a5568',
              marginBottom: '1.5rem',
            }}>
              Quick Navigation
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { id: 'attorney-advertising', label: 'Attorney Advertising' },
                { id: 'no-relationship', label: 'No Attorney-Client Relationship' },
                { id: 'website-terms', label: 'Website Terms of Use' },
                { id: 'privacy-policy', label: 'Privacy Policy' },
                { id: 'bar-admissions', label: 'Bar Admissions & Jurisdiction' },
                { id: 'engagement', label: 'Engagement Terms' },
                { id: 'fees', label: 'Fees & Payment' },
                { id: 'limitations', label: 'Limitations of Liability' },
                { id: 'confidentiality', label: 'Confidentiality & Privilege' },
                { id: 'professional-conduct', label: 'Professional Conduct' },
                { id: 'contact-info', label: 'Contact Information' },
              ].map((item) => (
                <li key={item.id} style={{ marginBottom: '0.5rem' }}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    style={{
                      display: 'block',
                      padding: '0.75rem 1rem',
                      color: activeSection === item.id ? 'white' : '#2d3748',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontSize: '0.95rem',
                      transition: 'all 0.2s',
                      background: activeSection === item.id ? '#d4af37' : 'transparent',
                      fontWeight: activeSection === item.id ? 600 : 400,
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Content */}
          <main style={{
            background: 'white',
            padding: '3rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          }}>
            <div style={{
              background: '#f4f6f8',
              padding: '1rem 1.5rem',
              borderRadius: '8px',
              fontSize: '0.9rem',
              color: '#4a5568',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <span>📅</span>
              <span><strong>Last Updated:</strong> November 2024 | <strong>Effective Date:</strong> November 2024</span>
            </div>

            {/* Section 1: Attorney Advertising */}
            <section id="attorney-advertising" className="legal-section" style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '2px solid #e8ecf0' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.25rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.5rem' }}>
                Attorney Advertising Disclaimer
              </h2>
              <span style={{ fontSize: '0.85rem', color: '#d4af37', fontWeight: 600, marginBottom: '1.5rem', display: 'block' }}>
                Required Disclosure
              </span>

              <div style={{ background: '#fff3cd', borderLeft: '4px solid #ffc107', padding: '1.5rem', borderRadius: '8px', margin: '2rem 0' }}>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>ATTORNEY ADVERTISING:</strong>
                This website constitutes attorney advertising under the applicable rules of professional conduct in the jurisdictions where Rivalis Law is licensed to practice. Prior results do not guarantee a similar outcome.
              </div>

              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                This website is designed for general information purposes only. The information presented on this site should not be construed to be formal legal advice nor the formation of an attorney-client relationship.
              </p>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Jurisdictional Compliance
              </h3>

              <div style={{ marginBottom: '1rem' }}>
                <span style={{ display: 'inline-block', background: '#1a1a2e', color: 'white', padding: '0.35rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, marginRight: '0.5rem', marginBottom: '0.5rem' }}>
                  New York
                </span>
                <span style={{ display: 'inline-block', background: '#1a1a2e', color: 'white', padding: '0.35rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, marginRight: '0.5rem', marginBottom: '0.5rem' }}>
                  Michigan
                </span>
              </div>

              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                This website complies with the attorney advertising rules of the New York Rules of Professional Conduct (Rule 7.1) and the Michigan Rules of Professional Conduct (Rule 7.2). Any statements regarding the quality of legal services or claims about results obtained are based on the experience and qualifications of the attorney, but cannot guarantee similar outcomes in future matters.
              </p>

              <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#0f1419', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                Testimonials & Case Results
              </h4>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Any testimonials or endorsements contained on this website do not constitute a guarantee, warranty, or prediction regarding the outcome of your legal matter. All case results and client testimonials are provided for informational purposes only. Client results vary based on the facts, circumstances, jurisdiction, and applicable law.
              </p>

              <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#0f1419', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                Certifications & Specializations
              </h4>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                References to certifications, awards, or specialized training (including Oxford University AI Governance Programme completion) are provided for informational purposes. No attorney is certified as a specialist by the State Bar of Michigan or the New York State Bar Association unless specifically stated. Educational certifications and professional training credentials are distinct from state bar certifications of legal specialty.
              </p>
            </section>

            {/* Section 2: No Attorney-Client Relationship */}
            <section id="no-relationship" className="legal-section" style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '2px solid #e8ecf0' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.25rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.5rem' }}>
                No Attorney-Client Relationship
              </h2>
              <span style={{ fontSize: '0.85rem', color: '#d4af37', fontWeight: 600, marginBottom: '1.5rem', display: 'block' }}>
                Critical Notice
              </span>

              <div style={{ background: '#f0e6d2', borderLeft: '4px solid #d4af37', padding: '1.5rem', borderRadius: '8px', margin: '2rem 0' }}>
                <strong style={{ color: '#1a1a2e', display: 'block', marginBottom: '0.5rem' }}>IMPORTANT:</strong>
                Visiting this website, reading its content, submitting a contact form, sending an email, or calling the office does not create an attorney-client relationship.
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                When an Attorney-Client Relationship Forms
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                An attorney-client relationship is formed only when:
              </p>
              <ol style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem', paddingLeft: '2rem' }}>
                <li style={{ marginBottom: '0.75rem' }}><strong>Conflicts Check:</strong> A conflicts of interest check has been completed and no conflicts exist;</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>Written Agreement:</strong> Both parties have executed a written engagement letter or retainer agreement;</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>Retainer Payment:</strong> Any required retainer or advance fee deposit has been received and cleared; and</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>Mutual Confirmation:</strong> Both the attorney and prospective client have explicitly agreed to the representation in writing.</li>
              </ol>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Communications Prior to Engagement
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Any information you send to us via email, contact form, telephone, or otherwise before an attorney-client relationship is established may not be treated as privileged or confidential. <strong>Do not send confidential information until you have received written confirmation that we are representing you.</strong>
              </p>

              <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#0f1419', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                Initial Consultations
              </h4>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Initial consultations are provided for the purpose of:
              </p>
              <ul style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem', paddingLeft: '2rem' }}>
                <li style={{ marginBottom: '0.75rem' }}>Assessing potential conflicts of interest</li>
                <li style={{ marginBottom: '0.75rem' }}>Understanding the nature and scope of your legal needs</li>
                <li style={{ marginBottom: '0.75rem' }}>Determining whether Rivalis Law can provide appropriate representation</li>
                <li style={{ marginBottom: '0.75rem' }}>Discussing potential engagement terms, fees, and timeline</li>
              </ul>

              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Information disclosed during an initial consultation, while treated with appropriate care and discretion, does not create an attorney-client relationship or attorney-client privilege unless and until you are formally engaged as a client through a signed engagement letter.
              </p>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Capacity Limitations
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Rivalis Law maintains limited client capacity to ensure personalized, high-quality service. Not all prospective clients will be accepted for representation. Factors considered in accepting new clients include:
              </p>
              <ul style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem', paddingLeft: '2rem' }}>
                <li style={{ marginBottom: '0.75rem' }}>Current workload and capacity constraints</li>
                <li style={{ marginBottom: '0.75rem' }}>Nature and complexity of the legal matter</li>
                <li style={{ marginBottom: '0.75rem' }}>Potential conflicts of interest</li>
                <li style={{ marginBottom: '0.75rem' }}>Geographic and jurisdictional considerations</li>
                <li style={{ marginBottom: '0.75rem' }}>Alignment of matter with firm expertise and practice areas</li>
                <li style={{ marginBottom: '0.75rem' }}>Resource requirements and timing considerations</li>
              </ul>

              <div style={{ background: '#d1ecf1', borderLeft: '4px solid #17a2b8', padding: '1.5rem', borderRadius: '8px', margin: '2rem 0' }}>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Note:</strong>
                Declining to accept representation does not reflect on the merit of your matter. It may simply indicate capacity constraints, jurisdictional limitations, or practice area focus.
              </div>
            </section>

            {/* Section 3: Website Terms */}
            <section id="website-terms" className="legal-section" style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '2px solid #e8ecf0' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.25rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.5rem' }}>
                Website Terms of Use
              </h2>
              <span style={{ fontSize: '0.85rem', color: '#d4af37', fontWeight: 600, marginBottom: '1.5rem', display: 'block' }}>
                Terms & Conditions
              </span>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Acceptance of Terms
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                By accessing and using this website, you accept and agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Intellectual Property Rights
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Unless otherwise stated, Rivalis Law and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may access content from this website for your personal, non-commercial use, subject to the restrictions set forth in these terms.
              </p>

              <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#0f1419', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                You must not:
              </h4>
              <ul style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem', paddingLeft: '2rem' }}>
                <li style={{ marginBottom: '0.75rem' }}>Republish, reproduce, duplicate, or copy material from this website for commercial purposes</li>
                <li style={{ marginBottom: '0.75rem' }}>Sell, rent, sub-license, or otherwise commercialize material from this website</li>
                <li style={{ marginBottom: '0.75rem' }}>Redistribute content from Rivalis Law's website (unless content is specifically made for redistribution)</li>
                <li style={{ marginBottom: '0.75rem' }}>Use this website in any way that is unlawful or in violation of applicable regulations</li>
              </ul>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Accuracy of Information
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                The information provided on this website is for general informational purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information contained on the website.
              </p>

              <div style={{ background: '#fff3cd', borderLeft: '4px solid #ffc107', padding: '1.5rem', borderRadius: '8px', margin: '2rem 0' }}>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>No Legal Advice:</strong>
                Information on this website is not legal advice and should not be relied upon as such. Legal advice can only be provided within the context of an attorney-client relationship based on specific facts and circumstances of your matter.
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Limitation of Liability
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                In no event shall Rivalis Law, nor any of its officers, directors, employees, or affiliates, be held liable for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort, or otherwise. This includes any indirect, consequential, or special liability arising out of or in any way related to your use of this website.
              </p>
            </section>

            {/* Section 4: Privacy Policy - Condensed */}
            <section id="privacy-policy" className="legal-section" style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '2px solid #e8ecf0' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.25rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.5rem' }}>
                Privacy Policy
              </h2>
              <span style={{ fontSize: '0.85rem', color: '#d4af37', fontWeight: 600, marginBottom: '1.5rem', display: 'block' }}>
                Data Protection & Privacy
              </span>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Information We Collect
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                We collect information that you voluntarily provide when you submit contact forms, send emails, call our office, or engage our legal services. This may include name, email address, telephone number, company information, and details about your legal inquiry.
              </p>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                We automatically collect certain information about your device and browsing activity, including IP address, browser type, pages visited, and timestamps.
              </p>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                How We Use Your Information
              </h3>
              <ul style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem', paddingLeft: '2rem' }}>
                <li style={{ marginBottom: '0.75rem' }}>To provide legal representation and advice</li>
                <li style={{ marginBottom: '0.75rem' }}>To respond to inquiries and schedule consultations</li>
                <li style={{ marginBottom: '0.75rem' }}>To perform conflicts of interest checks</li>
                <li style={{ marginBottom: '0.75rem' }}>To improve website functionality and user experience</li>
                <li style={{ marginBottom: '0.75rem' }}>To protect against fraud and security threats</li>
                <li style={{ marginBottom: '0.75rem' }}>To comply with legal obligations</li>
              </ul>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Data Security
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                We implement appropriate technical and organizational security measures including SSL/TLS encryption, secure servers with restricted access, regular security assessments, and employee training on data protection. However, no method of transmission over the Internet is 100% secure.
              </p>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Your Privacy Rights
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Depending on your jurisdiction, you may have rights to access, correct, delete, or transfer your personal information. To exercise these rights, please contact us using the information provided in the Contact Information section.
              </p>
            </section>

            {/* Section 5: Bar Admissions */}
            <section id="bar-admissions" className="legal-section" style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '2px solid #e8ecf0' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.25rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.5rem' }}>
                Bar Admissions & Jurisdictional Limitations
              </h2>
              <span style={{ fontSize: '0.85rem', color: '#d4af37', fontWeight: 600, marginBottom: '1.5rem', display: 'block' }}>
                Licensure & Practice Authority
              </span>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Bar Admissions
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                {settings?.attorney_name || 'Aaishwarya Aeron, Esq.'}, the attorney operating {settings?.firm_name || 'Rivalis Law'}, is admitted to practice law in the following jurisdictions:
              </p>

              <div style={{ background: '#f0e6d2', borderLeft: '4px solid #d4af37', padding: '1.5rem', borderRadius: '8px', margin: '2rem 0' }}>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Licensed Jurisdictions:</strong>
                <ul style={{ margin: '1rem 0 0 0', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>New York State Bar</li>
                  <li style={{ marginBottom: '0.5rem' }}>State Bar of Michigan</li>
                </ul>
              </div>

              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Attorney license status can be verified through the respective state bar associations:
              </p>
              <ul style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem', paddingLeft: '2rem' }}>
                <li style={{ marginBottom: '0.75rem' }}><strong>New York:</strong> New York State Unified Court System Attorney Registration</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>Michigan:</strong> State Bar of Michigan Lawyer Directory</li>
              </ul>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Jurisdictional Limitations
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                An attorney's ability to practice law is generally limited to jurisdictions where the attorney is licensed. {settings?.attorney_name || 'Attorney Aeron'} is authorized to practice law in {settings?.bar_admission || 'New York and Michigan'}, including representing clients in state and federal courts where admitted.
              </p>

              <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#0f1419', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                Federal Practice
              </h4>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Federal practice authority includes immigration matters (authorized to practice before USCIS and immigration courts nationwide), federal courts (subject to specific admissions), and federal agencies as authorized by agency rules.
              </p>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                UAE and International Matters
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                References to "UAE markets" or United Arab Emirates practice refer to advising U.S.-based clients on U.S. legal matters related to UAE business activities, U.S. immigration services for UAE nationals, and cross-border transactional support focusing on U.S. law aspects.
              </p>

              <div style={{ background: '#fff3cd', borderLeft: '4px solid #ffc107', padding: '1.5rem', borderRadius: '8px', margin: '2rem 0' }}>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Important:</strong>
                Rivalis Law is not licensed to practice UAE law or represent clients in UAE courts. For matters requiring UAE legal advice or representation, local UAE-licensed counsel must be engaged.
              </div>
            </section>

            {/* Section 6: Engagement Terms */}
            <section id="engagement" className="legal-section" style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '2px solid #e8ecf0' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.25rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.5rem' }}>
                Terms of Engagement
              </h2>
              <span style={{ fontSize: '0.85rem', color: '#d4af37', fontWeight: 600, marginBottom: '1.5rem', display: 'block' }}>
                Client Relationship Terms
              </span>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Engagement Letters
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                All attorney-client relationships with Rivalis Law are governed by a written engagement letter or retainer agreement specifying scope of representation, fee structure, communication protocols, responsibilities of both parties, and termination provisions.
              </p>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Client Responsibilities
              </h3>
              <ul style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem', paddingLeft: '2rem' }}>
                <li style={{ marginBottom: '0.75rem' }}><strong>Truthfulness:</strong> Provide truthful, complete, and accurate information</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>Cooperation:</strong> Cooperate fully with reasonable requests for information</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>Timeliness:</strong> Respond to communications promptly</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>Fees:</strong> Pay fees and costs in accordance with the engagement agreement</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>Disclosure:</strong> Disclose all relevant facts, even if unfavorable</li>
              </ul>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Communication Standards
              </h3>
              <ul style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem', paddingLeft: '2rem' }}>
                <li style={{ marginBottom: '0.75rem' }}><strong>Emergency Matters:</strong> Response within 4 hours during business hours</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>Urgent Matters:</strong> Response within 24 hours during business days</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>Routine Matters:</strong> Response within 2-3 business days</li>
              </ul>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Business hours are generally Monday through Friday, 9:00 AM to 6:00 PM Eastern Time, excluding federal holidays.
              </p>
            </section>

            {/* Section 7: Fees & Payment */}
            <section id="fees" className="legal-section" style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '2px solid #e8ecf0' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.25rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.5rem' }}>
                Fee Structures & Payment Terms
              </h2>
              <span style={{ fontSize: '0.85rem', color: '#d4af37', fontWeight: 600, marginBottom: '1.5rem', display: 'block' }}>
                Billing & Compensation
              </span>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Fee Arrangements
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Rivalis Law offers various fee structures depending on the nature of the legal matter:
              </p>

              <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#0f1419', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                1. Fixed Fees (Flat Fees)
              </h4>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Many services are provided on a fixed-fee basis, where the client pays a predetermined amount for specified services. Fixed fees are quoted in advance and remain constant regardless of time spent (subject to scope limitations).
              </p>

              <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#0f1419', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                2. Hourly Fees
              </h4>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Some matters are billed on an hourly basis, with time recorded in increments (typically 0.1 hour/6-minute increments). Hourly rates vary based on the complexity of the matter and attorney experience.
              </p>

              <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#0f1419', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                3. Hybrid Fee Structures
              </h4>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Some engagements use a combination of fixed and hourly fees, such as a fixed fee for specific deliverables plus hourly billing for additional services.
              </p>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Retainers and Advance Fee Deposits
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Most engagements require an advance fee deposit (retainer) before work begins. Retainers are held in a trust account and applied to fees and costs as they are incurred. Detailed invoices are provided showing how retainer funds are applied.
              </p>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Payment Terms
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Invoices are typically provided monthly for hourly matters or upon completion of milestones for fixed-fee matters. Payment is generally due within 15-30 days of invoice date. Late payments may be subject to interest charges as permitted by law.
              </p>

              <div style={{ background: '#d1ecf1', borderLeft: '4px solid #17a2b8', padding: '1.5rem', borderRadius: '8px', margin: '2rem 0' }}>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Fee Disputes:</strong>
                If you dispute any fee or cost charge, contact us immediately. We are committed to resolving fee disputes fairly and may participate in fee arbitration as provided by applicable bar association rules.
              </div>
            </section>

            {/* Section 8: Limitations of Liability */}
            <section id="limitations" className="legal-section" style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '2px solid #e8ecf0' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.25rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.5rem' }}>
                Limitations of Liability & Disclaimers
              </h2>
              <span style={{ fontSize: '0.85rem', color: '#d4af37', fontWeight: 600, marginBottom: '1.5rem', display: 'block' }}>
                Legal Limitations
              </span>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                No Guarantee of Outcomes
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Legal services are provided with professional skill and care, but no attorney can guarantee specific results or outcomes. Factors affecting case outcomes include applicable law, facts of the case, court or agency discretion, actions of opposing parties, witness testimony, and judicial or administrative rulings.
              </p>

              <div style={{ background: '#fff3cd', borderLeft: '4px solid #ffc107', padding: '1.5rem', borderRadius: '8px', margin: '2rem 0' }}>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>IMPORTANT:</strong>
                Any statements about past results or case outcomes do not guarantee similar results in future matters. Each case is unique and evaluated on its own merits.
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Scope Limitations
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Representation is limited to matters explicitly covered in the engagement letter. Unless specifically agreed, representation does not include tax advice, financial planning, accounting services, appeals beyond initial proceedings, or matters in jurisdictions where attorney is not licensed.
              </p>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Professional Liability Insurance
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Rivalis Law maintains professional liability insurance (legal malpractice insurance) as required by applicable law and professional standards. Details of coverage limits are available upon request.
              </p>
            </section>

            {/* Section 9: Confidentiality */}
            <section id="confidentiality" className="legal-section" style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '2px solid #e8ecf0' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.25rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.5rem' }}>
                Confidentiality & Attorney-Client Privilege
              </h2>
              <span style={{ fontSize: '0.85rem', color: '#d4af37', fontWeight: 600, marginBottom: '1.5rem', display: 'block' }}>
                Protected Communications
              </span>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Duty of Confidentiality
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Attorneys have a professional and ethical duty to maintain client confidentiality. This duty applies to all information relating to the representation, whether obtained from the client or other sources, and continues indefinitely even after representation ends.
              </p>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Attorney-Client Privilege
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Attorney-client privilege is a legal doctrine that protects confidential communications between attorney and client when made for the purpose of obtaining or providing legal advice, in confidence, and not disclosed to third parties.
              </p>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Exceptions to Confidentiality
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                The duty of confidentiality and attorney-client privilege are subject to certain exceptions, including:
              </p>
              <ul style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem', paddingLeft: '2rem' }}>
                <li style={{ marginBottom: '0.75rem' }}>Client consent to disclosure</li>
                <li style={{ marginBottom: '0.75rem' }}>Prevention of reasonably certain death or substantial bodily harm</li>
                <li style={{ marginBottom: '0.75rem' }}>Prevention or rectification of client crime or fraud involving attorney's services</li>
                <li style={{ marginBottom: '0.75rem' }}>Compliance with court orders or legal obligations</li>
                <li style={{ marginBottom: '0.75rem' }}>Defense of attorney against malpractice or ethics allegations</li>
              </ul>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Security of Communications
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Rivalis Law takes reasonable measures to protect confidentiality, including encrypted email options, secure file sharing platforms, password-protected documents, secure cloud storage, and restricted physical and electronic access to client files.
              </p>
            </section>

            {/* Section 10: Professional Conduct */}
            <section id="professional-conduct" className="legal-section" style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '2px solid #e8ecf0' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.25rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.5rem' }}>
                Rules of Professional Conduct
              </h2>
              <span style={{ fontSize: '0.85rem', color: '#d4af37', fontWeight: 600, marginBottom: '1.5rem', display: 'block' }}>
                Ethical Standards
              </span>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Governing Rules
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Attorney Aeron is subject to the rules of professional conduct in jurisdictions where licensed:
              </p>
              <ul style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem', paddingLeft: '2rem' }}>
                <li style={{ marginBottom: '0.75rem' }}>New York Rules of Professional Conduct (22 NYCRR Part 1200)</li>
                <li style={{ marginBottom: '0.75rem' }}>Michigan Rules of Professional Conduct</li>
                <li style={{ marginBottom: '0.75rem' }}>ABA Model Rules of Professional Conduct (where applicable)</li>
              </ul>

              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                These rules establish ethical obligations including competence, diligence, communication, confidentiality, conflicts of interest, and client property management.
              </p>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                Reporting Misconduct
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                If you believe an attorney has violated professional conduct rules, you may file a complaint with:
              </p>

              <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#0f1419', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                New York
              </h4>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Attorney Grievance Committee<br />
                New York State Unified Court System<br />
                <a href="https://www.nycourts.gov/attorneys/grievance/" target="_blank" rel="noopener noreferrer" style={{ color: '#0088cc' }}>
                  nycourts.gov/attorneys/grievance/
                </a>
              </p>

              <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#0f1419', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                Michigan
              </h4>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Attorney Grievance Commission<br />
                State Bar of Michigan<br />
                <a href="https://www.michbar.org/professional_standards/grievances" target="_blank" rel="noopener noreferrer" style={{ color: '#0088cc' }}>
                  michbar.org/professional_standards/grievances
                </a>
              </p>
            </section>

            {/* Section 11: Contact Information */}
            <section id="contact-info" className="legal-section" style={{ marginBottom: 0, paddingBottom: 0, border: 'none' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.25rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.5rem' }}>
                Contact Information
              </h2>
              <span style={{ fontSize: '0.85rem', color: '#d4af37', fontWeight: 600, marginBottom: '1.5rem', display: 'block' }}>
                How to Reach Us
              </span>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginTop: '2rem', marginBottom: '1rem' }}>
                {settings?.firm_name || 'Rivalis Law'}
              </h3>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                <strong>Principal Attorney:</strong> {settings?.attorney_name || 'Aaishwarya Aeron, Esq.'}
              </p>

              <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#0f1419', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                Contact Methods
              </h4>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                <strong>Email:</strong> {settings?.email_contact || 'contact@rivalislaw.com'}<br />
                <strong>Website:</strong> <a href="https://www.rivalislaw.com" style={{ color: '#0088cc' }}>www.rivalislaw.com</a>
              </p>

              <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#0f1419', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                State Bar Resources
              </h4>
              <p style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                To verify attorney license status or for information about attorney disciplinary process:
              </p>
              <ul style={{ color: '#2d3748', lineHeight: 1.8, marginBottom: '1.25rem', paddingLeft: '2rem' }}>
                <li style={{ marginBottom: '0.75rem' }}><strong>New York:</strong> <a href="https://iapps.courts.state.ny.us/attorney/AttorneySearch" target="_blank" rel="noopener noreferrer" style={{ color: '#0088cc' }}>NY Attorney Registration</a></li>
                <li style={{ marginBottom: '0.75rem' }}><strong>Michigan:</strong> <a href="https://www.michbar.org" target="_blank" rel="noopener noreferrer" style={{ color: '#0088cc' }}>State Bar of Michigan</a></li>
              </ul>

              <div style={{ background: '#f0e6d2', borderLeft: '4px solid #d4af37', padding: '1.5rem', borderRadius: '8px', margin: '2rem 0' }}>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Need Legal Assistance?</strong>
                Submit a consultation request through our website or contact us directly to discuss your legal matter.
              </div>
            </section>

            {/* Document Information */}
            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '2px solid #e8ecf0' }}>
              <p style={{ fontSize: '0.9rem', color: '#4a5568', textAlign: 'center' as const }}>
                This document was last updated in November 2024. Rivalis Law reserves the right to modify these terms at any time. Continued use of this website constitutes acceptance of any modifications.
              </p>
            </div>
          </main>
        </div>
      </div>
    </MainLayout>
  );
};
