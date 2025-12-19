import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useSiteSettings } from '../../hooks/useSiteSettings';

const EnhancedFooter: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { settings } = useSiteSettings();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleModalOpen = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const modal = document.getElementById('privacy');
    if (modal) modal.style.display = 'block';
  };

  const handleModalClose = () => {
    const modal = document.getElementById('privacy');
    if (modal) modal.style.display = 'none';
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmergencyClick = () => {
    if (user) {
      navigate('/dashboard?tab=emergency');
    } else {
      navigate('/login?redirect=/dashboard&tab=emergency');
    }
  };

  return (
    <>
      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div>
            <div className="footer-brand">{settings?.firm_name || 'Rivalis Law'}</div>
            <p style={{marginTop: '0.75rem', fontSize: '0.95rem'}}>
              {settings?.firm_tagline || 'Big 4 Trained Attorney | AI Governance | Global Immigration | M&A Transactions'}
            </p>
          </div>
          <div className="footer-links">
            <a href={settings?.linkedin_url || 'https://linkedin.com/in/aaishaeron'} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="/legal">Legal Information</a>
            <a href="#privacy" onClick={handleModalOpen}>Privacy & Terms</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-container" style={{textAlign: 'left', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start'}}>
            <p style={{opacity: 1, marginBottom: '1rem', textAlign: 'left'}}>© 2025 {settings?.firm_name || 'Rivalis Law'} | {settings?.attorney_name || 'Aaishwarya Aeron, Esq.'} | {settings?.attorney_credentials || 'NY & MI Bar | Oxford AI Certified | Big 4 Trained'}</p>
            <p style={{ opacity: 0.8, fontWeight: 600}}>Attorney Advertising</p>
            <p style={{marginBottom: '1.5rem', opacity: 0.7, maxWidth: '900px', lineHeight: 1.6}}>
              This website is for informational purposes only and does not constitute legal advice. Viewing or contacting us does not form an attorney-client relationship.
            </p>
            <p style={{opacity: 0.6, fontSize: '0.85rem', maxWidth: '900px', lineHeight: 1.6}}>
              <strong>No Guarantee:</strong> Past results, experiences, or descriptions of services do not guarantee a similar outcome. 
              <strong> Jurisdictional Limits:</strong> We accept matters only where we are admitted or permitted by law and may engage local counsel as needed.
            </p>
          </div>
        </div>

        {/* Legal Disclaimers Modal */}
        <div id="privacy" style={{display: 'none', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 10000, overflowY: 'auto', padding: '2rem'}}>
          <div style={{maxWidth: '900px', margin: '2rem auto', background: 'white', borderRadius: '12px', padding: '3rem', position: 'relative'}}>
            <button 
              onClick={handleModalClose} 
              style={{position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: 'var(--gray-600)'}}
              aria-label="Close modal"
            >
              ×
            </button>
            
            <h2 style={{fontFamily: '"Cormorant Garamond", serif', fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--primary)'}}>Privacy Policy & Terms of Use</h2>
            
            <div style={{color: 'var(--gray-700)', lineHeight: 1.8}}>
              <h3 style={{fontSize: '1.5rem', fontWeight: 700, margin: '2rem 0 1rem', color: 'var(--primary)'}}>Website Terms & Conditions</h3>
              <p style={{marginBottom: '1rem'}}>
                <strong>Attorney Advertising:</strong> This website constitutes attorney advertising. The information on this website is for general informational purposes only and does not constitute legal advice. Nothing on this site should be taken as creating an attorney-client relationship.
              </p>
              <p style={{marginBottom: '1rem'}}>
                <strong>No Attorney-Client Relationship:</strong> Viewing this website, submitting information through forms, or contacting Rivalis Law through this site does not create an attorney-client relationship. An attorney-client relationship is formed only through a signed engagement letter after conflicts clearance.
              </p>
              <p style={{marginBottom: '1rem'}}>
                <strong>No Guarantee of Results:</strong> Past results, client experiences, or descriptions of services do not guarantee or predict a similar outcome in any future matter. Every legal matter is unique and outcomes depend on specific facts and circumstances.
              </p>
              <p style={{marginBottom: '1rem'}}>
                <strong>Jurisdictional Limitations:</strong> {settings?.attorney_name || 'Aaishwarya Aeron, Esq.'} is admitted to practice law in {settings?.bar_admission || 'New York and Michigan'}. {settings?.firm_name || 'Rivalis Law'} accepts matters only in jurisdictions where we are admitted or otherwise permitted to practice law. We may associate with or engage local counsel as needed for matters outside our jurisdictions.
              </p>

              <h3 style={{fontSize: '1.5rem', fontWeight: 700, margin: '2rem 0 1rem', color: 'var(--primary)'}}>Privacy Policy</h3>
              <p style={{marginBottom: '1rem'}}>
                <strong>Information Collection:</strong> We collect information you provide through contact forms, email, or phone communications. This may include your name, email, phone number, company information, and description of legal matters.
              </p>
              <p style={{marginBottom: '1rem'}}>
                <strong>Use of Information:</strong> Information collected is used solely to respond to inquiries, assess potential conflicts, and determine if we can assist with your legal matter. We do not sell, share, or distribute your information to third parties except as required by law or with your explicit consent.
              </p>
              <p style={{marginBottom: '1rem'}}>
                <strong>Confidentiality:</strong> While we treat all inquiries as confidential, please note that information provided prior to establishing an attorney-client relationship may not be protected by attorney-client privilege. Do not send confidential information until we have established a formal attorney-client relationship.
              </p>
              <p style={{marginBottom: '1rem'}}>
                <strong>Cookies & Analytics:</strong> This website may use cookies and analytics tools to improve user experience and understand website traffic. You may disable cookies in your browser settings.
              </p>
              <p style={{marginBottom: '1rem'}}>
                <strong>Data Security:</strong> We implement reasonable security measures to protect information transmitted through this website. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
              </p>

              <h3 style={{fontSize: '1.5rem', fontWeight: 700, margin: '2rem 0 1rem', color: 'var(--primary)'}}>Disclaimer of Warranties</h3>
              <p style={{marginBottom: '1rem'}}>
                This website and its contents are provided "as is" without warranties of any kind, either express or implied. We make no representations or warranties regarding the accuracy, completeness, or timeliness of information on this site.
              </p>

              <h3 style={{fontSize: '1.5rem', fontWeight: 700, margin: '2rem 0 1rem', color: 'var(--primary)'}}>Limitation of Liability</h3>
              <p style={{marginBottom: '1rem'}}>
                {settings?.firm_name || 'Rivalis Law'} and {settings?.attorney_name || 'Aaishwarya Aeron, Esq.'} shall not be liable for any damages arising from use of this website or reliance on information contained herein.
              </p>

              <h3 style={{fontSize: '1.5rem', fontWeight: 700, margin: '2rem 0 1rem', color: 'var(--primary)'}}>External Links</h3>
              <p style={{marginBottom: '1rem'}}>
                This website may contain links to external websites. We are not responsible for the content, privacy policies, or practices of linked sites.
              </p>

              <h3 style={{fontSize: '1.5rem', fontWeight: 700, margin: '2rem 0 1rem', color: 'var(--primary)'}}>Changes to Terms</h3>
              <p style={{marginBottom: '1rem'}}>
                We reserve the right to modify these terms and privacy policy at any time. Continued use of this website constitutes acceptance of any changes.
              </p>

              <h3 style={{fontSize: '1.5rem', fontWeight: 700, margin: '2rem 0 1rem', color: 'var(--primary)'}}>Contact</h3>
              <p style={{marginBottom: '1rem'}}>
                For questions about these terms or our privacy practices, contact us at:<br />
                <strong>Email:</strong> aaishaeron@gmail.com<br />
                <strong>Phone:</strong> {settings?.phone_display || '+1 (313) 771-2283'}
              </p>

              <p style={{marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--gray-200)', fontSize: '0.9rem', opacity: 0.7}}>
                Last Updated: January 2025
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fab-container">
        <button onClick={handleEmergencyClick} className="fab urgent">
          <span className="fab-tooltip">Emergency: Call Now</span>
          <i className="fas fa-phone-volume"></i>
        </button>
        <button onClick={handleEmergencyClick} className="fab schedule">
          <span className="fab-tooltip">Schedule Consultation</span>
          <i className="fas fa-calendar-check"></i>
        </button>
        {showScrollTop && (
          <button onClick={scrollToTop} className="fab scroll-top">
            <span className="fab-tooltip">Back to Top</span>
            <i className="fas fa-arrow-up"></i>
          </button>
        )}
      </div>
    </>
  );
};

export default EnhancedFooter;
