import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Layout/Navigation';
import '../../styles/service-page.css';
import '../../styles/home.css';

export const EntityFormation: React.FC = () => {
  return (
    <>
      {/* Navigation */}
      <Navigation />

      {/* Hero */}
      <section className="service-hero centered">
        <div className="service-hero-container">
          <div className="service-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/#select-services">Select Services</Link> / <span>Entity Formation</span>
          </div>

          <h1>Your Entity Structure Will<br /><span className="highlight" style={{ color: 'var(--accent)' }}>Cost You Millions</span> Later</h1>

          <p className="service-hero-subtitle">
            You picked LLC because it was "simple." Now VCs won't invest. Your co-founder equity split has no vesting. You formed in the wrong state. Your tax structure costs $50K annually. Getting it right the first time costs $10K. Fixing it later costs $100K+.
          </p>

          <div className="service-hero-price">Starting at $4,500</div>
          <p className="service-hero-price-note">Complete entity formation with proper structure</p>

          <div className="service-cta-group">
            <Link to="/forms/entity-formation" className="service-btn service-btn-primary">
              <i className="fas fa-building"></i>
              Get Started - Entity Formation
            </Link>
            <a href="mailto:formation@rivalislaw.com" className="service-btn service-btn-secondary">
              <i className="fas fa-envelope"></i>
              Email Formation Team
            </a>
          </div>
        </div>
      </section>

      {/* Entity Types Section */}
      <section className="service-section" style={{ background: 'white' }}>
        <div className="service-section-container">
          <div className="service-section-header">
            <h2 className="service-section-title">Entity Formation Services</h2>
            <p className="service-section-subtitle">
              Proper corporate structure from day one
            </p>
          </div>

          <div className="service-compliance-grid">
            <div style={{ background: 'white', border: '3px solid var(--accent)', borderRadius: '12px', padding: '3rem' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem' }}>C-Corporation</h3>
              <p style={{ color: 'var(--accent)', fontWeight: 600, marginBottom: '1.5rem' }}>For venture-backed companies and high-growth startups</p>
              <p style={{ color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: '1.5rem' }}>Delaware C-Corp formation with proper equity structure, stock issuance, founder vesting, and VC-ready documentation. The right choice for companies planning to raise institutional capital.</p>
              
              <div className="service-price-box">
                <div className="service-price-amount">Starting at $8,000</div>
              </div>

              <ul className="service-features">
                <li>Delaware incorporation & registered agent</li>
                <li>Certificate of incorporation & bylaws</li>
                <li>Founder stock purchase agreements</li>
                <li>Vesting schedules (4-year with 1-year cliff)</li>
                <li>83(b) election filing</li>
                <li>Board consent resolutions</li>
                <li>Initial stock issuance</li>
                <li>Stock ledger & cap table setup</li>
                <li>EIN & corporate formalities guidance</li>
              </ul>
            </div>

            <div style={{ background: 'white', border: '3px solid var(--accent)', borderRadius: '12px', padding: '3rem' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem' }}>LLC Formation</h3>
              <p style={{ color: 'var(--accent)', fontWeight: 600, marginBottom: '1.5rem' }}>For operating businesses, consulting firms, and partnerships</p>
              <p style={{ color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: '1.5rem' }}>Single or multi-member LLC with customized operating agreement, tax election strategy, and proper management structure. Ideal for service businesses and companies not seeking VC funding.</p>
              
              <div className="service-price-box">
                <div className="service-price-amount">Starting at $4,500</div>
              </div>

              <ul className="service-features">
                <li>State filing & formation documents</li>
                <li>Comprehensive operating agreement</li>
                <li>Member contribution agreements</li>
                <li>Management structure (member vs manager-managed)</li>
                <li>Profit/loss allocation provisions</li>
                <li>Tax classification election (if needed)</li>
                <li>EIN application</li>
                <li>Transfer restrictions & buyout provisions</li>
              </ul>
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
              Complete formation package with everything you need
            </p>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gap: '1rem' }}>
            {[
              { icon: 'fa-users', title: 'Founder Agreements:', desc: 'Equity splits, vesting schedules, IP assignment, roles & responsibilities' },
              { icon: 'fa-map-signs', title: 'State Selection Strategy:', desc: 'Delaware vs home state analysis based on your business goals' },
              { icon: 'fa-file-invoice-dollar', title: 'Tax Structure Optimization:', desc: 'C-Corp vs LLC vs S-Corp analysis with long-term implications' },
              { icon: 'fa-copyright', title: 'IP Protection:', desc: 'Technology assignment agreements ensuring company owns all IP' },
              { icon: 'fa-chart-line', title: 'Investor-Ready Structure:', desc: 'Cap table, stock classes, option pools (for C-Corps)' },
              { icon: 'fa-clipboard-check', title: 'Compliance Guidance:', desc: 'Annual requirements, meeting protocols, record-keeping' },
            ].map((item, index) => (
              <div key={index} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--accent)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <i className={`fas ${item.icon}`} style={{ color: 'var(--accent)', fontSize: '1.25rem' }}></i>
                <span><strong>{item.title}</strong> {item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="service-section service-final-cta" id="get-started">
        <div className="service-section-container">
          <h2>Get Your Entity Structure Right From Day One</h2>
          <p>
            Wrong entity structure kills VC deals, creates massive tax bills, and causes founder disputes. Get it right the first time with proper legal counsel.
          </p>

          <div className="service-cta-group" style={{ justifyContent: 'center' }}>
            <Link to="/forms/entity-formation" className="service-btn service-btn-primary">
              <i className="fas fa-clipboard-list"></i>
              Start Entity Formation Intake
            </Link>
            <a href="tel:+1-202-555-0199" className="service-btn service-btn-secondary">
              <i className="fas fa-phone"></i>
              Call: (202) 555-0199
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="service-footer">
        <p>&copy; 2024 Rivalis Law. Licensed in New York & Michigan.</p>
        <p><Link to="/">Return to Main Site</Link> | <Link to="/#select-services">All Select Services</Link></p>
      </footer>
    </>
  );
};

export default EntityFormation;
