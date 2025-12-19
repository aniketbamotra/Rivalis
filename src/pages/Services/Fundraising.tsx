import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Layout/Navigation';
import { EnhancedFooter } from '../../components/Layout';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import '../../styles/service-page.css';
import '../../styles/home.css';

export const Fundraising: React.FC = () => {
  const { settings } = useSiteSettings();
  return (
    <>
      {/* Navigation */}
      <Navigation />

      {/* Hero */}
      <section className="service-hero centered">
        <div className="service-hero-container">
          <div className="service-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/#select-services">Select Services</Link> / <span>Fundraising</span>
          </div>

          <h1>Your Investor Wants to Close.<br />Your <span className="highlight">Docs Aren't Ready</span>.</h1>

          <p className="service-hero-subtitle">
            Term sheet signed. Investor ready to wire funds. Your cap table is a mess. Your SAFE has wrong terms. No option pool. Investor discovers problems in diligence. Deal delays 6 weeks or dies. Your runway just ran out.
          </p>

          <div className="service-hero-price">Starting at $15,000</div>
          <p className="service-hero-price-note">SAFE agreements, convertible notes, Series A preparation</p>

          <div className="service-cta-group">
            <Link to="/forms/fundraising" className="service-btn service-btn-primary">
              <i className="fas fa-chart-line"></i>
              Get Started - Fundraising Intake
            </Link>
            <a href="mailto:fundraising@rivalislaw.com" className="service-btn service-btn-secondary">
              <i className="fas fa-envelope"></i>
              Email Fundraising Team
            </a>
          </div>
        </div>
      </section>

      {/* Stages Section */}
      <section className="service-section" style={{ background: 'var(--gray-50)' }}>
        <div className="service-section-container">
          <div className="service-section-header">
            <h2 className="service-section-title">Fundraising Legal Services by Stage</h2>
            <p className="service-section-subtitle">
              From pre-seed to Series A and beyond
            </p>
          </div>

          <div className="service-services-grid">
            <div className="service-card featured">
              <div style={{ background: 'var(--accent)', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, display: 'inline-block', marginBottom: '1.5rem' }}>PRE-SEED / SEED</div>
              <h3>SAFE / Convertible Note</h3>
              <p>Quick, founder-friendly funding rounds using standard instruments. Get funding fast without complex equity negotiations.</p>
              
              <div className="service-price-box">
                <div className="service-price-amount">Starting at $15,000</div>
              </div>

              <ul className="service-features">
                <li>SAFE or convertible note preparation</li>
                <li>Cap table management & setup</li>
                <li>Investor agreements</li>
                <li>Board consent resolutions</li>
                <li>Filing with state authorities</li>
                <li>Compliance with securities laws</li>
                <li>Documentation organization</li>
              </ul>
            </div>

            <div className="service-card featured">
              <div style={{ background: 'var(--accent)', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, display: 'inline-block', marginBottom: '1.5rem' }}>SERIES A PREP</div>
              <h3>Series A Readiness</h3>
              <p>Get your company ready for institutional VC funding. Clean up issues that kill deals before VCs find them.</p>
              
              <div className="service-price-box">
                <div className="service-price-amount">Starting at $25,000</div>
              </div>

              <ul className="service-features">
                <li>Cap table cleanup & optimization</li>
                <li>Option pool creation (10-20%)</li>
                <li>Corporate governance fixes</li>
                <li>IP audit & assignment cleanup</li>
                <li>Material contract review</li>
                <li>Compliance issue remediation</li>
                <li>Data room preparation</li>
                <li>Investor diligence support</li>
              </ul>
            </div>

            <div className="service-card featured">
              <div style={{ background: 'var(--accent)', color: 'white', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, display: 'inline-block', marginBottom: '1.5rem' }}>SERIES A+</div>
              <h3>Priced Equity Round</h3>
              <p>Full Series A or B round with institutional investors. Complex negotiation, term sheets, and closing coordination.</p>
              
              <div className="service-price-box">
                <div className="service-price-amount">Starting at $35,000</div>
              </div>

              <ul className="service-features">
                <li>Term sheet review & negotiation</li>
                <li>Stock purchase agreement drafting</li>
                <li>Investor rights agreement</li>
                <li>Voting agreements</li>
                <li>Right of first refusal / Co-sale</li>
                <li>Amended charter & bylaws</li>
                <li>Board composition & governance</li>
                <li>Closing coordination</li>
                <li>Post-closing compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mistakes Section */}
      <section className="service-section service-problems">
        <div className="service-section-container">
          <div className="service-section-header">
            <h2 className="service-section-title">Fundraising Mistakes That Kill Deals</h2>
            <p className="service-section-subtitle">Common errors that destroy valuations and crater rounds</p>
          </div>

          <div className="service-problems-grid">
            <div className="service-problem-card">
              <h3><i className="fas fa-table"></i> Messy Cap Table</h3>
              <p>Your cap table is on a spreadsheet with errors. Advisor shares with no vesting. Founder equity with unclear terms. VC refuses to proceed until cleaned up. 8-week delay kills momentum.</p>
            </div>

            <div className="service-problem-card">
              <h3><i className="fas fa-users-slash"></i> No Option Pool</h3>
              <p>VC wants 15% option pool for future hires. You didn't create one. Pool comes from founder shares pre-money. Your ownership gets diluted twice. Deal you thought was $10M is really $8.5M for you.</p>
            </div>

            <div className="service-problem-card">
              <h3><i className="fas fa-copyright"></i> IP Not Assigned</h3>
              <p>Contractor built your core product. No IP assignment agreement. They technically own it. VC discovers this in diligence. Deal dead until resolved. Contractor wants $200K retroactive payment or equity.</p>
            </div>

            <div className="service-problem-card">
              <h3><i className="fas fa-file-contract"></i> Bad SAFE Terms</h3>
              <p>Your SAFE has no valuation cap. Or cap is too high. Or discount is wrong. Converts unfavorably in Series A. Investors angry. Your ownership percentage isn't what you expected. Can't fix it retroactively.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="service-section" style={{ background: 'white' }}>
        <div className="service-section-container">
          <div className="service-section-header">
            <h2 className="service-section-title">What's Included in Series A Prep</h2>
            <p className="service-section-subtitle">
              Comprehensive preparation for institutional funding
            </p>
          </div>

          <div className="service-compliance-grid">
            <div className="service-compliance-card">
              <h3>Corporate Cleanup</h3>
              <ul className="service-features">
                <li>Cap table audit & corrections</li>
                <li>Missing corporate records reconstruction</li>
                <li>Board consent updates</li>
                <li>Stock certificate organization</li>
                <li>Delaware franchise tax compliance</li>
                <li>Charter & bylaw amendments</li>
              </ul>
            </div>

            <div className="service-compliance-card">
              <h3>Equity Structure</h3>
              <ul className="service-features">
                <li>Option pool creation & sizing</li>
                <li>Advisor equity cleanup</li>
                <li>Founder vesting verification</li>
                <li>Early exercise provisions</li>
                <li>83(b) election compliance</li>
                <li>409A valuation coordination</li>
              </ul>
            </div>

            <div className="service-compliance-card">
              <h3>IP & Contracts</h3>
              <ul className="service-features">
                <li>IP assignment audit</li>
                <li>Contractor agreement cleanup</li>
                <li>Employee invention assignments</li>
                <li>Open source license review</li>
                <li>Material contract assessment</li>
                <li>Customer/vendor agreement review</li>
              </ul>
            </div>

            <div className="service-compliance-card">
              <h3>Diligence Prep</h3>
              <ul className="service-features">
                <li>Data room setup & organization</li>
                <li>Diligence request list preparation</li>
                <li>Issue identification & remediation</li>
                <li>Disclosure schedule preparation</li>
                <li>Q&A support during diligence</li>
                <li>Investor communication coordination</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="service-section service-final-cta" id="get-started">
        <div className="service-section-container">
          <h2>Don't Let Legal Issues Kill Your Round</h2>
          <p>
            VCs walk away from messy companies. One cap table error, one missing IP assignment, one compliance issue can crater your fundraise. Get investor-ready before you need to be.
          </p>

          <div className="service-cta-group" style={{ justifyContent: 'center' }}>
            <Link to="/forms/fundraising" className="service-btn service-btn-primary">
              <i className="fas fa-clipboard-list"></i>
              Start Fundraising Intake
            </Link>
            <a href={`tel:${settings?.phone_primary || '+1-313-771-2283'}`} className="service-btn service-btn-secondary">
              <i className="fas fa-phone-alt"></i>
              Call: {settings?.phone_display || '+1 (313) 771-2283'}
            </a>
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </>
  );
};

export default Fundraising;
