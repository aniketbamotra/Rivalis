import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Layout/Navigation';
import { EnhancedFooter } from '../../components/Layout';
import '../../styles/service-page.css';
import '../../styles/home.css';

export const MAndA: React.FC = () => {
  return (
    <>
      {/* Navigation */}
      <Navigation />

      {/* Hero */}
      <section className="service-hero">
        <div className="service-hero-container">
          <div className="service-breadcrumb">
            <Link to="/">Home</Link> / <span>M&A & Transactions</span>
          </div>

          <div className="service-hero-badge">
            <i className="fas fa-briefcase"></i>
            Big 4 M&A Due Diligence Experience
          </div>

          <h1>You're About to Pay $50M.<br />Did You Find <span className="highlight">All the Liabilities</span>?</h1>

          <p className="service-hero-subtitle">
            That acquisition looks perfect. Clean financials. Great team. Eager seller. But hidden tax liabilities, undisclosed lawsuits, and buried compliance issues don't show up on the term sheet. They show up after closing—when it's your problem and your money.
          </p>

          <div className="service-hero-stats">
            <div className="service-stat">
              <div className="service-stat-number">$20M+</div>
              <div className="service-stat-label">Average hidden liability we identify</div>
            </div>
            <div className="service-stat">
              <div className="service-stat-number">3-5 Wks</div>
              <div className="service-stat-label">Comprehensive due diligence</div>
            </div>
            <div className="service-stat">
              <div className="service-stat-number">100%</div>
              <div className="service-stat-label">Big 4-level review standards</div>
            </div>
          </div>

          <div className="service-cta-group">
            <Link to="/forms/ma" className="service-btn service-btn-primary">
              <i className="fas fa-handshake"></i>
              Get Started - M&A Intake
            </Link>
            <a href="mailto:deals@rivalislaw.com" className="service-btn service-btn-secondary">
              <i className="fas fa-envelope"></i>
              Email Deal Team
            </a>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="service-section service-problems">
        <div className="service-section-container">
          <div className="service-section-header">
            <div className="service-section-tag">THE HORROR STORIES</div>
            <h2 className="service-section-title">Deals That Went Catastrophically Wrong</h2>
          </div>

          <div className="service-problems-grid">
            <div className="service-problem-card">
              <h3><i className="fas fa-bomb"></i> The $15M Tax Time Bomb</h3>
              <p>Acquired a "profitable" SaaS company. Found $15M in unreported state tax liabilities 90 days after closing. Previous counsel missed them entirely. Your liability now. Board wants answers you don't have.</p>
            </div>

            <div className="service-problem-card">
              <h3><i className="fas fa-user-secret"></i> The Hidden Lawsuit Disaster</h3>
              <p>Closed on acquisition. Three weeks later, received notice of class-action lawsuit filed 6 months ago that seller "forgot" to mention. $25M exposure. Due diligence never found it. You own it now.</p>
            </div>

            <div className="service-problem-card">
              <h3><i className="fas fa-file-contract"></i> The IP Ownership Nightmare</h3>
              <p>Bought tech company for their "proprietary" software. Post-closing discovered core IP was developed by contractors without proper assignment agreements. You don't actually own what you paid for.</p>
            </div>

            <div className="service-problem-card">
              <h3><i className="fas fa-ban"></i> The Regulatory Violation Crisis</h3>
              <p>Acquired healthcare AI company. FDA sent warning letter about unapproved medical device claims. Company faces $10M+ in penalties and potential shutdown. Seller knew. Due diligence missed it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="service-section service-services">
        <div className="service-section-container">
          <div className="service-section-header">
            <div className="service-section-tag">WHAT WE DO</div>
            <h2 className="service-section-title">M&A Services That Find What Others Miss</h2>
            <p className="service-section-subtitle">
              Big 4-trained due diligence that identifies deal-killers before you're committed
            </p>
          </div>

          <div className="service-services-grid">
            <div className="service-card">
              <div className="service-card-icon">
                <i className="fas fa-search-dollar"></i>
              </div>
              <h3>Buy-Side Due Diligence</h3>
              <p>Comprehensive investigation before you acquire. Tax liabilities, legal exposures, compliance gaps, IP issues—we find them all before closing.</p>
              
              <div className="service-price-box">
                <div className="service-price-amount">Starting at $35,000</div>
                <div className="service-price-details">Based on deal size and complexity</div>
              </div>

              <ul className="service-features">
                <li>Complete financial & tax review</li>
                <li>Legal liability identification</li>
                <li>IP ownership verification</li>
                <li>Regulatory compliance audit</li>
                <li>Employee & contract review</li>
                <li>Detailed risk assessment report</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-card-icon">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h3>Transaction Structuring</h3>
              <p>Tax-efficient deal structures that protect you from liabilities and maximize value. Stock vs asset purchase, earnouts, escrows, reps & warranties.</p>
              
              <div className="service-price-box">
                <div className="service-price-amount">Starting at $25,000</div>
                <div className="service-price-details">Structure optimization & negotiation</div>
              </div>

              <ul className="service-features">
                <li>Tax structure analysis & planning</li>
                <li>Liability allocation strategy</li>
                <li>Earnout & escrow design</li>
                <li>Indemnification frameworks</li>
                <li>Working capital adjustments</li>
                <li>Deal documentation review</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-card-icon">
                <i className="fas fa-file-signature"></i>
              </div>
              <h3>Full Transaction Support</h3>
              <p>End-to-end M&A counsel from LOI through closing. Due diligence, negotiation, documentation, closing coordination—comprehensive deal management.</p>
              
              <div className="service-price-box">
                <div className="service-price-amount">Starting at $75,000</div>
                <div className="service-price-details">Complete transaction management</div>
              </div>

              <ul className="service-features">
                <li>LOI & term sheet negotiation</li>
                <li>Comprehensive due diligence</li>
                <li>Purchase agreement drafting/review</li>
                <li>Deal structuring & tax planning</li>
                <li>Closing coordination</li>
                <li>Post-closing integration support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Red Flags Section */}
      <section className="service-section service-red-flags">
        <div className="service-section-container">
          <h2>Red Flags Due Diligence Must Find</h2>
          <p>These are the issues that kill deals or destroy value post-closing. Big 4 training means knowing exactly where to look.</p>

          <div className="service-flags-grid">
            <div className="service-flag-card">
              <h4><i className="fas fa-file-invoice-dollar"></i> Tax Liabilities</h4>
              <p>Unreported state tax obligations, sales tax nexus issues, payroll tax problems, uncertain tax positions, transfer pricing failures, and historical audit exposures that could cost millions.</p>
            </div>

            <div className="service-flag-card">
              <h4><i className="fas fa-gavel"></i> Legal Exposures</h4>
              <p>Pending or threatened litigation, regulatory investigations, employment disputes, customer complaints, warranty claims, and contractual obligations that create liability.</p>
            </div>

            <div className="service-flag-card">
              <h4><i className="fas fa-copyright"></i> IP Ownership Issues</h4>
              <p>Contractor work without assignment agreements, employee IP disputes, open-source licensing violations, third-party infringement claims, and patent invalidity risks.</p>
            </div>

            <div className="service-flag-card">
              <h4><i className="fas fa-shield-alt"></i> Compliance Gaps</h4>
              <p>Data privacy violations (GDPR, CCPA), industry regulations (FDA, SEC, FINRA), environmental issues, export controls, and anti-corruption exposure.</p>
            </div>

            <div className="service-flag-card">
              <h4><i className="fas fa-file-contract"></i> Contract Problems</h4>
              <p>Change of control provisions that kill deals, customer contracts with unfavorable terms, vendor agreements with hidden costs, and leases with unexpected obligations.</p>
            </div>

            <div className="service-flag-card">
              <h4><i className="fas fa-users"></i> Employee Issues</h4>
              <p>Misclassified workers, unvested equity problems, retention agreements, severance obligations, benefits liabilities, and key employee risks that threaten post-closing operations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="service-section service-process">
        <div className="service-section-container">
          <div className="service-section-header">
            <div className="service-section-tag">OUR PROCESS</div>
            <h2 className="service-section-title">Due Diligence Timeline</h2>
            <p className="service-section-subtitle">Comprehensive 4-6 week investigation process</p>
          </div>

          <div className="service-process-steps">
            <div className="service-process-step">
              <div className="service-step-number">1</div>
              <h4>Initial Assessment</h4>
              <p>Review deal structure, identify key risks, develop investigation plan</p>
              <span className="service-timeline-badge">Week 1</span>
            </div>

            <div className="service-process-step">
              <div className="service-step-number">2</div>
              <h4>Document Review</h4>
              <p>Analyze financials, contracts, legal docs, compliance records</p>
              <span className="service-timeline-badge">Weeks 2-3</span>
            </div>

            <div className="service-process-step">
              <div className="service-step-number">3</div>
              <h4>Risk Analysis</h4>
              <p>Identify liabilities, quantify exposures, evaluate deal impact</p>
              <span className="service-timeline-badge">Week 4</span>
            </div>

            <div className="service-process-step">
              <div className="service-step-number">4</div>
              <h4>Report & Strategy</h4>
              <p>Deliver findings, structure recommendations, negotiation support</p>
              <span className="service-timeline-badge">Weeks 5-6</span>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="service-section service-cases">
        <div className="service-section-container">
          <div className="service-section-header">
            <div className="service-section-tag">CASE STUDIES</div>
            <h2 className="service-section-title">Deals We Saved From Disaster</h2>
          </div>

          <div className="service-case-studies">
            <div className="service-case-study">
              <div className="service-case-header">
                <div className="service-case-type">$45M SaaS Acquisition</div>
                <h3>Found $18M in Hidden Tax Liabilities</h3>
              </div>
              <div className="service-case-content">
                <div className="service-case-section">
                  <h4><i className="fas fa-exclamation-circle"></i> The Situation</h4>
                  <p>Private equity firm acquiring profitable SaaS company. Target showed strong EBITDA. Previous legal counsel completed cursory review. Deal ready to close at $45M valuation.</p>
                </div>
                <div className="service-case-section">
                  <h4><i className="fas fa-search"></i> What We Found</h4>
                  <ul>
                    <li>$12M in unreported state sales tax obligations across 15 states</li>
                    <li>$6M in questionable transfer pricing with offshore entities</li>
                    <li>Misclassified 40+ workers creating $2M+ in back tax exposure</li>
                    <li>R&D tax credit claims that wouldn't survive IRS audit</li>
                    <li>Improper revenue recognition creating additional tax liability</li>
                  </ul>
                </div>
                <div className="service-case-outcome">
                  <strong>Outcome:</strong> Renegotiated purchase price down by $15M. Structured deal with escrow for tax liabilities. Client avoided catastrophic post-closing surprise that would have destroyed deal economics.
                </div>
              </div>
            </div>

            <div className="service-case-study">
              <div className="service-case-header">
                <div className="service-case-type">Healthcare Tech Acquisition</div>
                <h3>Discovered Regulatory Violations That Killed Deal</h3>
              </div>
              <div className="service-case-content">
                <div className="service-case-section">
                  <h4><i className="fas fa-exclamation-circle"></i> The Situation</h4>
                  <p>Strategic acquirer buying healthcare AI company. Target claimed FDA compliance. $30M deal with aggressive timeline. Seller pressuring for quick close.</p>
                </div>
                <div className="service-case-section">
                  <h4><i className="fas fa-search"></i> Critical Findings</h4>
                  <ul>
                    <li>AI product making diagnostic claims requiring FDA approval—had none</li>
                    <li>HIPAA violations in data handling practices</li>
                    <li>State medical device registration failures</li>
                    <li>Customer contracts with warranties company couldn't fulfill</li>
                    <li>Pending FDA investigation seller hadn't disclosed</li>
                  </ul>
                </div>
                <div className="service-case-outcome">
                  <strong>Outcome:</strong> Client walked away from deal. Six months later, FDA shut down target company's operations. Client avoided $30M loss and years of regulatory nightmares. Quick close pressure was red flag we caught.
                </div>
              </div>
            </div>

            <div className="service-case-study">
              <div className="service-case-header">
                <div className="service-case-type">Cross-Border M&A</div>
                <h3>Restructured UAE-US Deal Saving $8M in Taxes</h3>
              </div>
              <div className="service-case-content">
                <div className="service-case-section">
                  <h4><i className="fas fa-exclamation-circle"></i> The Challenge</h4>
                  <p>US company acquiring Dubai-based tech firm. Original structure as stock purchase would trigger massive tax bill and create ongoing compliance nightmares. Previous advisors hadn't considered alternatives.</p>
                </div>
                <div className="service-case-section">
                  <h4><i className="fas fa-lightbulb"></i> Our Solution</h4>
                  <ul>
                    <li>Restructured as asset purchase with tax elections</li>
                    <li>Established proper transfer pricing for IP acquisition</li>
                    <li>Structured earnout to defer tax impact</li>
                    <li>Created holding company structure for ongoing operations</li>
                    <li>Negotiated indemnification for pre-closing tax issues</li>
                  </ul>
                </div>
                <div className="service-case-outcome">
                  <strong>Outcome:</strong> Saved client $8M in immediate tax costs. Reduced ongoing compliance burden. Deal closed successfully with proper structure protecting both parties. Client's CFO called it "the best money we've ever spent on legal."
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="service-section service-faq">
        <div className="service-section-container">
          <div className="service-section-header">
            <div className="service-section-tag">FREQUENTLY ASKED QUESTIONS</div>
            <h2 className="service-section-title">M&A Questions Answered</h2>
          </div>

          <div className="service-faq-list">
            <div className="service-faq-item">
              <div className="service-faq-question">
                What makes your due diligence better than other firms?
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="service-faq-answer">
                Big 4 training at Ernst & Young means reviewing hundreds of transactions and knowing exactly where problems hide. I've seen the patterns. Tax liabilities others miss. Regulatory issues that only show up if you know where to look. Contract terms that destroy value. Most firms do surface-level review. We dig deep because we know what catastrophic looks like.
              </div>
            </div>

            <div className="service-faq-item">
              <div className="service-faq-question">
                How long does due diligence take?
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="service-faq-answer">
                Standard comprehensive due diligence: 4-6 weeks. Expedited for time-sensitive deals: 2-3 weeks (higher fees). Simple transactions: 2-3 weeks. Timeline depends on deal complexity, data room quality, and target company cooperation. We can discuss your specific timeline needs.
              </div>
            </div>

            <div className="service-faq-item">
              <div className="service-faq-question">
                What size deals do you handle?
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="service-faq-answer">
                Focus on mid-market transactions: $5M to $200M. Below $5M, comprehensive due diligence may not be economical (but we can discuss). Above $200M typically requires Big Law firm resources. Sweet spot is $10M-$100M where you need sophisticated counsel but Big Law conflicts and fees don't make sense.
              </div>
            </div>

            <div className="service-faq-item">
              <div className="service-faq-question">
                Do you work with cross-border transactions?
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="service-faq-answer">
                Yes, particularly US-UAE transactions and other global deals. Experience with transfer pricing, international tax structures, foreign entity due diligence, and cross-border deal mechanics. Can coordinate with local counsel in foreign jurisdictions where needed.
              </div>
            </div>

            <div className="service-faq-item">
              <div className="service-faq-question">
                What if we're selling, not buying?
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="service-faq-answer">
                We handle sell-side preparation too: Pre-sale due diligence to identify issues before buyers find them, deal documentation review, tax planning for founders, and negotiation support. Better to find and fix problems before they become deal-killers or price reducers.
              </div>
            </div>

            <div className="service-faq-item">
              <div className="service-faq-question">
                Can you help if a deal is already in trouble?
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="service-faq-answer">
                Yes. We've rescued deals where issues surfaced mid-transaction, renegotiated terms after problems discovered, and structured solutions for complex liability situations. If you're already under LOI and found problems, call immediately—we can likely help restructure to save the deal or protect you from disaster.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="service-section service-final-cta accent" id="get-started">
        <div className="service-section-container">
          <h2>Don't Close Without Knowing What You're Buying</h2>
          <p>
            One missed liability can turn a great acquisition into your worst business decision. Get Big 4-trained due diligence that finds what others miss—before you're committed.
          </p>

          <div className="service-cta-features">
            <div className="service-cta-feature">
              <i className="fas fa-briefcase"></i>
              <span>Big 4 Experience</span>
            </div>
            <div className="service-cta-feature">
              <i className="fas fa-search"></i>
              <span>Comprehensive Review</span>
            </div>
            <div className="service-cta-feature">
              <i className="fas fa-shield-alt"></i>
              <span>Risk Protection</span>
            </div>
          </div>

          <div className="service-cta-group" style={{ justifyContent: 'center' }}>
            <Link to="/forms/ma" className="service-btn service-btn-primary" style={{ background: 'var(--primary)', color: 'var(--accent)' }}>
              <i className="fas fa-clipboard-list"></i>
              Start M&A Transaction Intake
            </Link>
            <a href="tel:+1-313-771-2283" className="service-btn service-btn-secondary" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
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

export default MAndA;

