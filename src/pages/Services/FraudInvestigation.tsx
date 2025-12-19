import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Layout/Navigation';
import { EnhancedFooter } from '../../components/Layout';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import '../../styles/fraud-investigation.css';
import '../../styles/home.css';

export const FraudInvestigation: React.FC = () => {
  const { settings } = useSiteSettings();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    urgency: '',
    situation: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for your confidential inquiry. An attorney will contact you within 4 hours.\n\nFor immediate assistance, please call our emergency hotline: ${settings?.phone_display || '+1 (313) 771-2283'}`);
    setFormData({ name: '', title: '', company: '', email: '', phone: '', urgency: '', situation: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Emergency Bar */}
      <div className="fraud-emergency-bar">
        <div className="fraud-emergency-content">
          <div className="fraud-emergency-text">
            <i className="fas fa-shield-alt"></i>
            <span>CONFIDENTIAL INVESTIGATION HOTLINE - ATTORNEY-CLIENT PRIVILEGE PROTECTED</span>
          </div>
          <div className="fraud-emergency-actions">
            <a href={`tel:${settings?.phone_primary || '+1-313-771-2283'}`} className="fraud-emergency-btn">
              <i className="fas fa-phone-alt"></i>
              Emergency: {settings?.phone_display || '+1 (313) 771-2283'}
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="fraud-hero">
        <div className="fraud-hero-container">
          <div className="fraud-hero-badges">
            <div className="fraud-badge">
              <i className="fas fa-lock"></i>
              Attorney-Client Privilege
            </div>
            <div className="fraud-badge">
              <i className="fas fa-user-secret"></i>
              Confidential Investigation
            </div>
            <div className="fraud-badge">
              <i className="fas fa-briefcase"></i>
              Big 4 Trained
            </div>
          </div>

          <h1 className="fraud-hero-title">
            Before It Becomes a <span className="highlight">Criminal Investigation</span><br />or Destroys Your Reputation
          </h1>

          <p className="fraud-hero-subtitle">
            Whistleblower allegations. Financial irregularities. Executive misconduct. Board member concerns. Every hour you wait gives regulators, prosecutors, and journalists more ammunition. Get privileged, confidential investigation before they do.
          </p>

          <div className="fraud-urgency-grid">
            <div className="fraud-urgency-item">
              <div className="fraud-urgency-number">4hrs</div>
              <div className="fraud-urgency-label">Emergency response time</div>
            </div>
            <div className="fraud-urgency-item">
              <div className="fraud-urgency-number">100%</div>
              <div className="fraud-urgency-label">Attorney-client privileged</div>
            </div>
            <div className="fraud-urgency-item">
              <div className="fraud-urgency-number">24/7</div>
              <div className="fraud-urgency-label">Confidential hotline access</div>
            </div>
          </div>

          <div className="fraud-cta-group">
            <a href={`tel:${settings?.phone_primary || '+1-313-771-2283'}`} className="fraud-btn fraud-btn-primary">
              <i className="fas fa-phone"></i>
              Call Emergency Line Now
            </a>
            <a href="#contact" className="fraud-btn fraud-btn-secondary">
              Confidential Inquiry Form
            </a>
          </div>
        </div>
      </section>

      {/* Threat Scenarios */}
      <section className="fraud-section fraud-threats-section">
        <div className="fraud-section-container">
          <div className="fraud-section-header">
            <div className="fraud-section-tag">WHEN EVERY HOUR MATTERS</div>
            <h2 className="fraud-section-title">The Threats That Can't Wait</h2>
            <p className="fraud-section-subtitle">
              These aren't "eventually" problems. They're ticking time bombs that destroy companies, careers, and reputations—often within days of discovery.
            </p>
          </div>

          <div className="fraud-threat-grid">
            <div className="fraud-threat-card">
              <div className="fraud-threat-icon">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h3>Whistleblower Allegations</h3>
              <p>An employee files an SEC complaint or contacts a journalist about accounting irregularities, safety violations, or regulatory non-compliance. Once it's public or with regulators, you've lost control of the narrative—and your chance at privileged investigation.</p>
              <div className="fraud-threat-stat">
                ⚠️ 72% of whistleblower cases lead to government investigation within 90 days
              </div>
            </div>

            <div className="fraud-threat-card">
              <div className="fraud-threat-icon">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <h3>Financial Fraud Indicators</h3>
              <p>Suspicious transactions, missing funds, altered documents, or unexplained discrepancies in financial statements. Your CFO or controller notices something wrong. If you don't investigate immediately under privilege, any delay looks like a cover-up.</p>
              <div className="fraud-threat-stat">
                ⚠️ Organizations lose 5% of annual revenue to fraud—median loss: $117,000
              </div>
            </div>

            <div className="fraud-threat-card">
              <div className="fraud-threat-icon">
                <i className="fas fa-user-tie"></i>
              </div>
              <h3>Executive Misconduct</h3>
              <p>Sexual harassment claims, discrimination, abuse of authority, conflicts of interest, or ethics violations involving C-suite executives or board members. Without privileged investigation, every interview and document becomes evidence against you.</p>
              <div className="fraud-threat-stat">
                ⚠️ Average cost of executive misconduct scandal: $3.1M in legal fees + reputation damage
              </div>
            </div>

            <div className="fraud-threat-card">
              <div className="fraud-threat-icon">
                <i className="fas fa-file-invoice"></i>
              </div>
              <h3>Accounting Irregularities</h3>
              <p>Revenue recognition issues, asset valuation problems, expense manipulation, or off-book transactions discovered during audit or due diligence. These destroy M&A deals, tank stock prices, and trigger shareholder lawsuits—fast.</p>
              <div className="fraud-threat-stat">
                ⚠️ 67% of financial restatements result in shareholder litigation
              </div>
            </div>

            <div className="fraud-threat-card">
              <div className="fraud-threat-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Vendor/Partner Fraud</h3>
              <p>Kickbacks, bid rigging, shell companies, inflated invoices, or conflicts of interest in procurement. These schemes often involve your own employees and expose you to FCPA violations and criminal liability.</p>
              <div className="fraud-threat-stat">
                ⚠️ Procurement fraud schemes average 18 months before detection
              </div>
            </div>

            <div className="fraud-threat-card">
              <div className="fraud-threat-icon">
                <i className="fas fa-gavel"></i>
              </div>
              <h3>Regulatory Non-Compliance</h3>
              <p>Violations of industry regulations, safety standards, environmental rules, or licensing requirements that could result in government sanctions, fines, or criminal charges. Self-reporting requirements often have 24-48 hour deadlines.</p>
              <div className="fraud-threat-stat">
                ⚠️ Late self-reporting can increase penalties by 300-400%
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Privileged Investigation */}
      <section className="fraud-section fraud-privileged-section">
        <div className="fraud-section-container">
          <div className="fraud-section-header" style={{ color: 'white' }}>
            <div className="fraud-section-tag">ATTORNEY-CLIENT PRIVILEGE</div>
            <h2 className="fraud-section-title" style={{ color: 'white' }}>Why You Need Privileged Investigation</h2>
            <p className="fraud-section-subtitle" style={{ color: 'rgba(255,255,255,0.9)' }}>
              The difference between attorney-directed investigation and internal HR review could be the difference between controlling the damage and handing prosecutors their case on a silver platter.
            </p>
          </div>

          <div className="fraud-privileged-grid">
            <div className="fraud-privileged-card">
              <div className="fraud-privileged-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Work Product Protection</h3>
              <p>Everything we discover, every interview, every document analysis is protected by attorney-client privilege and attorney work product doctrine. HR investigations? Not protected—everything becomes evidence.</p>
            </div>

            <div className="fraud-privileged-card">
              <div className="fraud-privileged-icon">
                <i className="fas fa-chess-knight"></i>
              </div>
              <h3>Strategic Defense Positioning</h3>
              <p>We investigate with litigation and prosecution in mind. We identify weaknesses before opposing counsel does. We build your defense while gathering facts—something HR can't do.</p>
            </div>

            <div className="fraud-privileged-card">
              <div className="fraud-privileged-icon">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h3>Credibility with Regulators</h3>
              <p>Attorney-conducted investigations carry weight with prosecutors, regulators, and courts. They demonstrate good faith, sophisticated response, and serious commitment to compliance—often resulting in reduced penalties or declinations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Investigation Process */}
      <section id="process" className="fraud-section fraud-process-section">
        <div className="fraud-section-container">
          <div className="fraud-section-header">
            <div className="fraud-section-tag">OUR INVESTIGATION PROCESS</div>
            <h2 className="fraud-section-title">From Crisis to Resolution</h2>
            <p className="fraud-section-subtitle">
              A systematic, privileged investigation that protects your interests while uncovering the truth
            </p>
          </div>

          <div className="fraud-process-timeline">
            <div className="fraud-process-step">
              <div className="fraud-process-number">1</div>
              <h4>Emergency Intake</h4>
              <p>Confidential call to assess threat, establish privilege, and begin evidence preservation</p>
              <span className="fraud-process-time">Within 4 hours</span>
            </div>

            <div className="fraud-process-step">
              <div className="fraud-process-number">2</div>
              <h4>Scope & Strategy</h4>
              <p>Define investigation parameters, interview plan, document review protocol, and timeline</p>
              <span className="fraud-process-time">24-48 hours</span>
            </div>

            <div className="fraud-process-step">
              <div className="fraud-process-number">3</div>
              <h4>Evidence Gathering</h4>
              <p>Privileged interviews, document forensics, electronic discovery, financial analysis, witness statements</p>
              <span className="fraud-process-time">2-6 weeks</span>
            </div>

            <div className="fraud-process-step">
              <div className="fraud-process-number">4</div>
              <h4>Analysis & Report</h4>
              <p>Privileged findings, legal exposure assessment, remediation recommendations, regulatory strategy</p>
              <span className="fraud-process-time">1-2 weeks</span>
            </div>

            <div className="fraud-process-step">
              <div className="fraud-process-number">5</div>
              <h4>Resolution</h4>
              <p>Board presentation, regulatory response, remediation oversight, litigation defense if needed</p>
              <span className="fraud-process-time">Ongoing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="fraud-section fraud-deliverables-section">
        <div className="fraud-section-container">
          <div className="fraud-section-header">
            <div className="fraud-section-tag">WHAT YOU RECEIVE</div>
            <h2 className="fraud-section-title">Comprehensive, Privileged Work Product</h2>
            <p className="fraud-section-subtitle">
              Every investigation delivers attorney work product protected by privilege—not discoverable by opposing parties or regulators unless you choose to disclose
            </p>
          </div>

          <div className="fraud-deliverables-grid">
            <div className="fraud-deliverable-category">
              <h3><i className="fas fa-file-alt"></i> Investigation Reports</h3>
              <p className="fraud-category-subtitle">Privileged attorney work product</p>
              <ul className="fraud-deliverable-list">
                <li>Detailed factual findings and timeline reconstruction</li>
                <li>Witness interview summaries (privileged)</li>
                <li>Document analysis and forensic findings</li>
                <li>Legal violations and regulatory exposure assessment</li>
                <li>Individual culpability determinations</li>
                <li>Internal control weaknesses and failures</li>
              </ul>
            </div>

            <div className="fraud-deliverable-category">
              <h3><i className="fas fa-clipboard-check"></i> Strategic Recommendations</h3>
              <p className="fraud-category-subtitle">Action plan and risk mitigation</p>
              <ul className="fraud-deliverable-list">
                <li>Remediation roadmap with prioritized actions</li>
                <li>Employee discipline and termination recommendations</li>
                <li>Regulatory self-reporting analysis and strategy</li>
                <li>Litigation risk assessment and defense strategy</li>
                <li>Internal controls and compliance program improvements</li>
                <li>Board communication and governance recommendations</li>
              </ul>
            </div>

            <div className="fraud-deliverable-category">
              <h3><i className="fas fa-users"></i> Stakeholder Communications</h3>
              <p className="fraud-category-subtitle">Prepared messaging for all audiences</p>
              <ul className="fraud-deliverable-list">
                <li>Board of Directors presentation deck</li>
                <li>Executive team briefing materials</li>
                <li>Employee communication strategy</li>
                <li>Regulatory disclosure templates (if required)</li>
                <li>Media response protocols</li>
                <li>Investor relations talking points</li>
              </ul>
            </div>

            <div className="fraud-deliverable-category">
              <h3><i className="fas fa-hands-helping"></i> Ongoing Support</h3>
              <p className="fraud-category-subtitle">We stay with you through resolution</p>
              <ul className="fraud-deliverable-list">
                <li>Regulatory response and negotiation support</li>
                <li>Remediation implementation oversight</li>
                <li>Follow-up investigation if issues expand</li>
                <li>Litigation defense coordination</li>
                <li>Board advisor role during crisis</li>
                <li>Compliance program enhancement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="fraud-section fraud-expertise-section">
        <div className="fraud-section-container">
          <div className="fraud-section-header">
            <div className="fraud-section-tag">INVESTIGATION EXPERTISE</div>
            <h2 className="fraud-section-title">Why Big 4 Training Matters</h2>
            <p className="fraud-section-subtitle">
              Corporate investigations aren't just legal work—they require understanding accounting, financial controls, corporate governance, and regulatory frameworks. That's why Big 4 experience is invaluable.
            </p>
          </div>

          <div className="fraud-expertise-grid">
            <div className="fraud-expertise-content">
              <h3>What Big 4 Experience Brings to Investigations</h3>
              <p>
                Multiple years at top Big 4 firms means I've seen how Fortune 100 companies structure their compliance programs, manage risk, and respond to internal crises. I understand corporate governance, financial controls, and the pressure points that matter to boards and regulators.
              </p>

              <div className="fraud-expertise-points">
                <div className="fraud-expertise-point">
                  <i className="fas fa-calculator"></i>
                  <div className="fraud-expertise-point-text">
                    <h4>Financial Forensics Capability</h4>
                    <p>I can read financial statements, trace transactions, identify accounting irregularities, and understand tax implications—not just legal issues.</p>
                  </div>
                </div>

                <div className="fraud-expertise-point">
                  <i className="fas fa-building"></i>
                  <div className="fraud-expertise-point-text">
                    <h4>Corporate Structure Understanding</h4>
                    <p>Experience with Fortune 100 companies means understanding complex organizational structures, internal controls, and governance frameworks.</p>
                  </div>
                </div>

                <div className="fraud-expertise-point">
                  <i className="fas fa-handshake"></i>
                  <div className="fraud-expertise-point-text">
                    <h4>Regulator and Auditor Perspective</h4>
                    <p>I know what regulators and external auditors look for, what questions they ask, and what findings trigger escalation.</p>
                  </div>
                </div>

                <div className="fraud-expertise-point">
                  <i className="fas fa-shield-alt"></i>
                  <div className="fraud-expertise-point-text">
                    <h4>Risk Management Framework</h4>
                    <p>Big 4 methodology for risk assessment, materiality determination, and control testing applies directly to investigations.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="fraud-expertise-cred">
              <div className="fraud-cred-stat">
                <div className="fraud-cred-number">Big 4</div>
                <div className="fraud-cred-label">Trained Professional</div>
              </div>
              
              <ul className="fraud-cred-list">
                <li>Multiple years at top firms</li>
                <li>Fortune 100 company experience</li>
                <li>Complex corporate matters</li>
                <li>Internal investigations training</li>
                <li>Financial controls expertise</li>
                <li>Regulatory compliance background</li>
                <li>{settings?.bar_admission || 'NY & MI Bar Admitted'}</li>
                <li>Oxford AI Governance certified</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="fraud-section fraud-pricing-section">
        <div className="fraud-section-container">
          <div className="fraud-section-header">
            <div className="fraud-section-tag">INVESTIGATION PRICING</div>
            <h2 className="fraud-section-title">Transparent Investment in Protection</h2>
            <p className="fraud-section-subtitle">
              Fixed-fee or capped arrangements available. No surprise bills. You know the investment upfront.
            </p>
          </div>

          <div className="fraud-pricing-container">
            <div className="fraud-pricing-tiers">
              <div className="fraud-pricing-tier">
                <div className="fraud-tier-label">Limited Scope</div>
                <div className="fraud-tier-price">Starting at $25K</div>
                <div className="fraud-tier-desc">Single issue, &lt; 10 witnesses, 2-3 week investigation</div>
              </div>

              <div className="fraud-pricing-tier">
                <div className="fraud-tier-label">Standard Investigation</div>
                <div className="fraud-tier-price">Starting at $50K</div>
                <div className="fraud-tier-desc">Multiple issues, 10-25 witnesses, 4-8 week investigation</div>
              </div>

              <div className="fraud-pricing-tier">
                <div className="fraud-tier-label">Complex Investigation</div>
                <div className="fraud-tier-price">Starting at $100K</div>
                <div className="fraud-tier-desc">Extensive scope, 25+ witnesses, forensic analysis, 8+ weeks</div>
              </div>
            </div>

            <div className="fraud-pricing-note">
              <h4>🔒 What's Included at Every Level:</h4>
              <p>
                Attorney-client privileged investigation • Complete witness interviews • Document review and analysis • Privileged written report with findings and recommendations • Board presentation • Regulatory strategy consultation • Ongoing advisory during remediation
              </p>
            </div>

            <div className="fraud-pricing-note" style={{ marginTop: '1rem' }}>
              <h4>⚡ Emergency Investigations:</h4>
              <p>
                When timing is critical (regulatory deadline, media inquiry, imminent litigation), we can mobilize within 4 hours. Emergency investigations may require premium pricing based on urgency and resource allocation. Call for immediate quote.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Confidential Contact Section */}
      <section id="contact" className="fraud-section fraud-contact-section">
        <div className="fraud-section-container">
          <div className="fraud-contact-grid">
            <div className="fraud-contact-content">
              <h2>This Conversation Is Confidential</h2>
              <p>
                Your initial contact is protected by attorney-client privilege considerations. We can discuss your situation confidentially to determine if investigation is warranted and how to proceed.
              </p>

              <div className="fraud-contact-methods">
                <a href={`tel:${settings?.phone_primary || '+1-313-771-2283'}`} className="fraud-contact-method">
                  <div className="fraud-method-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="fraud-method-text">
                    <h4>Emergency Investigation Hotline</h4>
                    <p>{settings?.phone_display || '+1 (313) 771-2283'} | Available 24/7 for urgent matters</p>
                  </div>
                </a>

                <a href="mailto:investigations@rivalislaw.com" className="fraud-contact-method">
                  <div className="fraud-method-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="fraud-method-text">
                    <h4>Confidential Email</h4>
                    <p>investigations@rivalislaw.com | Encrypted communication available</p>
                  </div>
                </a>

                <div className="fraud-contact-method" style={{ cursor: 'default' }}>
                  <div className="fraud-method-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div className="fraud-method-text">
                    <h4>Privilege Protection</h4>
                    <p>All communications treated as confidential attorney-client matters</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="fraud-contact-form">
              <h3>Confidential Investigation Inquiry</h3>
              
              <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <p style={{ marginBottom: '1rem', color: 'var(--gray-600)' }}>Prefer a structured intake form?</p>
                <Link to="/forms/fraud-investigation" className="fraud-form-submit-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
                  <i className="fas fa-clipboard-list"></i>
                  Fill Out Fraud Investigation Intake
                </Link>
              </div>
              
              <div style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--gray-600)', fontSize: '0.9rem' }}>
                Or submit details below for quick review:
              </div>

              <form onSubmit={handleSubmit}>
                <div className="fraud-form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="fraud-form-group">
                  <label htmlFor="title">Title/Role</label>
                  <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                </div>

                <div className="fraud-form-group">
                  <label htmlFor="company">Company Name (optional)</label>
                  <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} />
                </div>

                <div className="fraud-form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="fraud-form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>

                <div className="fraud-form-group">
                  <label htmlFor="urgency">Timeline *</label>
                  <select id="urgency" name="urgency" value={formData.urgency} onChange={handleChange} required>
                    <option value="">Select urgency level...</option>
                    <option value="emergency">Emergency (Within 24 hours)</option>
                    <option value="urgent">Urgent (Within 1 week)</option>
                    <option value="planning">Need assessment (1-2 weeks)</option>
                  </select>
                </div>

                <div className="fraud-form-group">
                  <label htmlFor="situation">Brief Description of Situation *</label>
                  <textarea id="situation" name="situation" value={formData.situation} onChange={handleChange} required placeholder="Please provide a brief overview. Specific details can be discussed on a privileged call."></textarea>
                </div>

                <button type="submit" className="fraud-form-submit-btn">
                  <i className="fas fa-lock"></i>
                  Submit Confidential Inquiry
                </button>

                <p className="fraud-form-note">
                  <i className="fas fa-shield-alt"></i>
                  This communication is protected by attorney-client privilege considerations
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </>
  );
};

export default FraudInvestigation;
