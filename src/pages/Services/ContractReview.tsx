import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Layout/Navigation';
import { EnhancedFooter } from '../../components/Layout';
import '../../styles/service-page.css';
import '../../styles/home.css';

export const ContractReview: React.FC = () => {
  return (
    <>
      {/* Navigation */}
      <Navigation />

      {/* Hero */}
      <section className="service-hero centered">
        <div className="service-hero-container">
          <div className="service-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/#select-services">Select Services</Link> / <span>Contract Review</span>
          </div>

          <h1>Don't Sign That Contract<br />Until an <span className="highlight">Attorney Reviews It</span></h1>

          <p className="service-hero-subtitle">
            That vendor agreement looks standard. The partnership deal seems fair. The employment contract is 'just like everyone else's.' Until you sign it and discover the liability clause, the auto-renewal terms, or the non-compete that destroys your business.
          </p>

          <div className="service-hero-price">Starting at $2,500</div>
          <p className="service-hero-price-note">Expert contract review and drafting services</p>

          <div className="service-cta-group">
            <Link to="/forms/contracts" className="service-btn service-btn-primary">
              <i className="fas fa-file-contract"></i>
              Get Started - Intake Form
            </Link>
            <a href="mailto:contracts@rivalislaw.com" className="service-btn service-btn-secondary">
              <i className="fas fa-envelope"></i>
              Email Contract Team
            </a>
          </div>
        </div>
      </section>

      {/* Contract Types Section */}
      <section className="service-section" style={{ background: 'white' }}>
        <div className="service-section-container">
          <div className="service-section-header">
            <h2 className="service-section-title">Contract Types We Handle</h2>
            <p className="service-section-subtitle">
              Comprehensive review and drafting across all business agreements
            </p>
          </div>

          <div className="service-services-grid">
            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Vendor & Supplier Agreements</h3>
              <p>SaaS contracts, service agreements, procurement deals, and supplier terms that protect your interests and avoid hidden costs.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $2,500</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-user-secret"></i>
              </div>
              <h3>NDAs & Confidentiality</h3>
              <p>Mutual and one-way NDAs for partnerships, employment, vendor relationships, and investor discussions.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $1,500</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-users"></i>
              </div>
              <h3>Employment Contracts</h3>
              <p>Executive agreements, offer letters, consulting contracts, and independent contractor agreements with proper IP assignment.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $2,000</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-building"></i>
              </div>
              <h3>Partnership & JV Agreements</h3>
              <p>Strategic partnerships, joint ventures, co-development agreements, and revenue-sharing deals.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $4,000</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <h3>Customer & Sales Contracts</h3>
              <p>Master service agreements, terms of service, SLAs, and customer contracts that protect revenue and limit liability.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $3,000</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-home"></i>
              </div>
              <h3>Real Estate & Leases</h3>
              <p>Commercial leases, sublease agreements, and office space contracts with favorable terms and exit strategies.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $2,500</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="service-section service-process" style={{ background: 'var(--gray-50)' }}>
        <div className="service-section-container">
          <div className="service-section-header">
            <h2 className="service-section-title">Our Review Process</h2>
            <p className="service-section-subtitle">
              Thorough analysis delivered in 3-5 business days
            </p>
          </div>

          <div className="service-process-steps">
            <div className="service-process-step">
              <div className="service-step-number">1</div>
              <h4>Submit Contract</h4>
              <p>Send us the agreement and tell us your concerns, deal context, and negotiation priorities</p>
            </div>

            <div className="service-process-step">
              <div className="service-step-number">2</div>
              <h4>Comprehensive Review</h4>
              <p>Line-by-line analysis identifying risks, unfavorable terms, missing protections, and negotiation points</p>
            </div>

            <div className="service-process-step">
              <div className="service-step-number">3</div>
              <h4>Detailed Memo</h4>
              <p>Written analysis with specific concerns highlighted, proposed revisions, and negotiation strategy</p>
            </div>

            <div className="service-process-step">
              <div className="service-step-number">4</div>
              <h4>Revision & Support</h4>
              <p>We can draft redlines, negotiate with opposing counsel, or prepare final execution version</p>
            </div>
          </div>
        </div>
      </section>

      {/* Red Flags Section */}
      <section className="service-section service-red-flags">
        <div className="service-section-container">
          <h2>Red Flags We Find</h2>
          <p>These are the contract terms that destroy value or create liability</p>

          <div className="service-flags-grid">
            <div className="service-flag-card">
              <h4><i className="fas fa-sync-alt"></i> Auto-Renewal Traps</h4>
              <p>Automatic renewal clauses with short notice periods that lock you into unwanted contracts for years</p>
            </div>

            <div className="service-flag-card">
              <h4><i className="fas fa-exclamation-triangle"></i> Unlimited Liability</h4>
              <p>Uncapped indemnification, broad warranty terms, and liability provisions exposing you to massive damages</p>
            </div>

            <div className="service-flag-card">
              <h4><i className="fas fa-copyright"></i> IP Ownership Issues</h4>
              <p>Unclear IP ownership, overly broad assignment clauses, and work-for-hire terms that cost you rights</p>
            </div>

            <div className="service-flag-card">
              <h4><i className="fas fa-ban"></i> One-Sided Termination</h4>
              <p>They can terminate easily, you can't. Or termination clauses with penalties that make exit impossible</p>
            </div>

            <div className="service-flag-card">
              <h4><i className="fas fa-dollar-sign"></i> Hidden Fee Structures</h4>
              <p>Price escalation clauses, change order provisions, and fee terms that blow up your budget</p>
            </div>

            <div className="service-flag-card">
              <h4><i className="fas fa-lock"></i> Restrictive Covenants</h4>
              <p>Non-competes, non-solicits, and exclusivity terms that limit your business opportunities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="service-section service-final-cta" id="get-started">
        <div className="service-section-container">
          <h2>Get Expert Eyes on Your Contract</h2>
          <p>
            Don't sign agreements without legal review. One unfavorable term can cost you thousands or destroy your business flexibility. Get experienced counsel before you're committed.
          </p>

          <div className="service-cta-group" style={{ justifyContent: 'center' }}>
            <Link to="/forms/contracts" className="service-btn service-btn-primary">
              <i className="fas fa-clipboard-list"></i>
              Start Contract Review Intake
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

export default ContractReview;
