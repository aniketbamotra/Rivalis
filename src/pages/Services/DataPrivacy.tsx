import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Layout/Navigation';
import { EnhancedFooter } from '../../components/Layout';
import { useServices } from '../../contexts/ServicesContext';
import '../../styles/service-page.css';
import '../../styles/home.css';

export const DataPrivacy: React.FC = () => {
  const { getServicePrice } = useServices();
  
  return (
    <>
      {/* Navigation */}
      <Navigation />

      {/* Hero */}
      <section className="service-hero centered">
        <div className="service-hero-container">
          <div className="service-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/#select-services">Select Services</Link> / <span>Data Privacy</span>
          </div>

          <h1>Your Customer Data Was<br /><span className="highlight">Breached Last Night</span></h1>

          <p className="service-hero-subtitle">
            EU regulators want your GDPR compliance docs. California customers filed CCPA complaints. Your privacy policy is copy-pasted from a template. You're collecting data without proper consent. The fines start at €20 million or 4% of revenue.
          </p>

          <div className="service-hero-price">{getServicePrice('data-privacy')}</div>
          <p className="service-hero-price-note">Comprehensive privacy compliance programs</p>

          <div className="service-cta-group">
            <Link to="/forms/data-privacy" className="service-btn service-btn-primary">
              <i className="fas fa-shield-alt"></i>
              Get Started - Privacy Intake
            </Link>
            <a href="mailto:privacy@rivalislaw.com" className="service-btn service-btn-secondary">
              <i className="fas fa-envelope"></i>
              Email Privacy Team
            </a>
          </div>
        </div>
      </section>

      {/* Penalties Section */}
      <section className="service-section service-problems">
        <div className="service-section-container">
          <div className="service-section-header">
            <h2 className="service-section-title">The Cost of Non-Compliance</h2>
            <p className="service-section-subtitle">Real penalties from privacy violations</p>
          </div>

          <div className="service-penalty-stats">
            <div className="service-penalty-stat">
              <div className="service-penalty-number">€20M</div>
              <div className="service-penalty-label">Maximum GDPR fine (or 4% revenue)</div>
            </div>
            <div className="service-penalty-stat">
              <div className="service-penalty-number">$7,500</div>
              <div className="service-penalty-label">Per CCPA violation</div>
            </div>
            <div className="service-penalty-stat">
              <div className="service-penalty-number">72hrs</div>
              <div className="service-penalty-label">GDPR breach notification deadline</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="service-section" style={{ background: 'white' }}>
        <div className="service-section-container">
          <div className="service-section-header">
            <h2 className="service-section-title">Privacy Compliance Services</h2>
            <p className="service-section-subtitle">
              Comprehensive data protection programs for modern businesses
            </p>
          </div>

          <div className="service-services-grid">
            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-search"></i>
              </div>
              <h3>Privacy Audit</h3>
              <p>Comprehensive review of data practices, identify compliance gaps, assess risk exposure.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $8,000</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-file-alt"></i>
              </div>
              <h3>Policy Development</h3>
              <p>Privacy policies, terms of service, cookie policies, and data processing agreements.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $5,000</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3>GDPR Compliance</h3>
              <p>Full GDPR compliance program for companies serving European customers.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $15,000</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-flag-usa"></i>
              </div>
              <h3>CCPA Compliance</h3>
              <p>California Consumer Privacy Act compliance for businesses with CA customers.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $12,000</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <h3>Breach Response</h3>
              <p>Emergency data breach investigation, notification, and regulatory response.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Contact for pricing</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-clipboard-check"></i>
              </div>
              <h3>Ongoing Compliance</h3>
              <p>Retainer-based privacy counsel for continuous compliance monitoring.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $3,000/month</div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="service-section" style={{ background: 'var(--gray-50)' }}>
        <div className="service-section-container">
          <div className="service-section-header">
            <h2 className="service-section-title">What's Included</h2>
            <p className="service-section-subtitle">
              Comprehensive privacy programs tailored to your business
            </p>
          </div>

          <div className="service-compliance-grid">
            <div className="service-compliance-card">
              <h3>GDPR Compliance Package</h3>
              <p>Everything you need to serve European customers legally</p>
              <ul className="service-features">
                <li>Data mapping & processing inventory</li>
                <li>Lawful basis analysis</li>
                <li>Privacy policy & notices</li>
                <li>Cookie consent implementation</li>
                <li>Data processing agreements (DPAs)</li>
                <li>Subject access request procedures</li>
                <li>Breach notification protocols</li>
                <li>Transfer impact assessments</li>
              </ul>
            </div>

            <div className="service-compliance-card">
              <h3>CCPA Compliance Package</h3>
              <p>California privacy law compliance for US companies</p>
              <ul className="service-features">
                <li>CCPA applicability assessment</li>
                <li>Privacy policy updates</li>
                <li>"Do Not Sell" implementation</li>
                <li>Consumer request procedures</li>
                <li>Data deletion protocols</li>
                <li>Service provider agreements</li>
                <li>Employee/contractor compliance</li>
                <li>Record-keeping systems</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="service-section service-final-cta" id="get-started">
        <div className="service-section-container">
          <h2>Don't Wait for a Breach to Get Compliant</h2>
          <p>
            Privacy violations destroy trust, trigger massive fines, and create years of regulatory nightmares. Get compliant before regulators come knocking.
          </p>

          <div className="service-cta-group" style={{ justifyContent: 'center' }}>
            <Link to="/forms/data-privacy" className="service-btn service-btn-primary">
              <i className="fas fa-clipboard-list"></i>
              Start Privacy Compliance Intake
            </Link>
            <a href="tel:+1-313-771-2283" className="service-btn service-btn-secondary">
              <i className="fas fa-phone-alt"></i>
              Emergency: +1 (313) 771-2283
            </a>
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </>
  );
};

export default DataPrivacy;
