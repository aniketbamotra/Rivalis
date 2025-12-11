import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Layout/Navigation';
import { EnhancedFooter } from '../../components/Layout';
import '../../styles/service-page.css';
import '../../styles/home.css';

export const IPStrategy: React.FC = () => {
  return (
    <>
      {/* Navigation */}
      <Navigation />

      {/* Hero */}
      <section className="service-hero centered">
        <div className="service-hero-container">
          <div className="service-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/#select-services">Select Services</Link> / <span>IP Strategy</span>
          </div>

          <h1>Your Brand Name Is Already<br /><span className="highlight" style={{ color: 'var(--accent)' }}>Trademarked by Someone Else</span></h1>

          <p className="service-hero-subtitle">
            You built a company around that name. Spent $50K on branding. Now someone owns the trademark and wants you to stop—or pay. Your trade secrets are unprotected. Your contractors own your IP. One cease & desist destroys everything.
          </p>

          <div className="service-hero-price">Starting at $5,000</div>
          <p className="service-hero-price-note">Trademark filings, trade secret protection, IP portfolio development</p>

          <div className="service-cta-group">
            <Link to="/forms/ip-strategy" className="service-btn service-btn-primary">
              <i className="fas fa-copyright"></i>
              Get Started - IP Strategy Intake
            </Link>
            <a href="mailto:ip@rivalislaw.com" className="service-btn service-btn-secondary">
              <i className="fas fa-envelope"></i>
              Email IP Team
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="service-section" style={{ background: 'white' }}>
        <div className="service-section-container">
          <div className="service-section-header">
            <h2 className="service-section-title">IP Protection Services</h2>
            <p className="service-section-subtitle">
              Comprehensive intellectual property strategy for growing businesses
            </p>
          </div>

          <div className="service-services-grid">
            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-trademark"></i>
              </div>
              <h3>Trademark Filing</h3>
              <p>Comprehensive trademark search, application preparation, USPTO filing, and office action responses.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $1,500 per mark</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-user-secret"></i>
              </div>
              <h3>Trade Secret Protection</h3>
              <p>Policies, NDAs, employee agreements, and procedures to protect confidential business information.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $5,000</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-clipboard-check"></i>
              </div>
              <h3>IP Audit</h3>
              <p>Comprehensive review of IP ownership, identify gaps, assess protection strategies.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $8,000</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Portfolio Development</h3>
              <p>Strategic IP portfolio planning, trademark strategy, copyright registrations, domain protection.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $10,000</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-file-contract"></i>
              </div>
              <h3>IP Assignments</h3>
              <p>Contractor IP assignment agreements, employee invention policies, work-for-hire documentation.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $3,000</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <h3>Infringement Response</h3>
              <p>Cease & desist letters, infringement analysis, settlement negotiation, litigation support.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $5,000</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why IP Protection Matters */}
      <section className="service-section" style={{ background: 'var(--gray-50)' }}>
        <div className="service-section-container">
          <div className="service-section-header">
            <h2 className="service-section-title">Why IP Protection Matters</h2>
            <p className="service-section-subtitle">
              The risks of unprotected intellectual property
            </p>
          </div>

          <div className="service-compliance-grid">
            <div className="service-compliance-card">
              <h3><i className="fas fa-gavel" style={{ color: 'var(--accent)', marginRight: '0.75rem' }}></i>Brand Conflicts</h3>
              <p>Someone trademarks your name first. You get a cease & desist. Rebrand costs $100K+. Lose all brand equity. Could have filed trademark for $2K.</p>
            </div>

            <div className="service-compliance-card">
              <h3><i className="fas fa-user-times" style={{ color: 'var(--accent)', marginRight: '0.75rem' }}></i>Contractor IP Issues</h3>
              <p>Your developer owns the code they wrote. No assignment agreement. They demand equity or payment. Your entire product is at risk.</p>
            </div>

            <div className="service-compliance-card">
              <h3><i className="fas fa-lock-open" style={{ color: 'var(--accent)', marginRight: '0.75rem' }}></i>Trade Secret Loss</h3>
              <p>No NDAs, no protection policies. Employee leaves and takes customer lists, pricing, processes. You can't prove it was secret.</p>
            </div>

            <div className="service-compliance-card">
              <h3><i className="fas fa-building" style={{ color: 'var(--accent)', marginRight: '0.75rem' }}></i>M&A Disasters</h3>
              <p>Acquirer does IP due diligence. Finds unprotected marks, missing assignments, unclear ownership. Deal value drops $5M or dies entirely.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="service-section service-final-cta" id="get-started">
        <div className="service-section-container">
          <h2>Protect Your IP Before Someone Takes It</h2>
          <p>
            One unprotected trademark, one missing assignment, one trade secret lost can cost you everything. Get proper IP protection before it's too late.
          </p>

          <div className="service-cta-group" style={{ justifyContent: 'center' }}>
            <Link to="/forms/ip-strategy" className="service-btn service-btn-primary">
              <i className="fas fa-clipboard-list"></i>
              Start IP Strategy Intake
            </Link>
            <a href="tel:+1-313-771-2283" className="service-btn service-btn-secondary">
              <i className="fas fa-phone-alt"></i>
              Call: +1 (313) 771-2283
            </a>
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </>
  );
};

export default IPStrategy;
