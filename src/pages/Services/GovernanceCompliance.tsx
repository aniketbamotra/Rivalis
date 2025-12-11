import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Layout/Navigation';
import { EnhancedFooter } from '../../components/Layout';
import '../../styles/service-page.css';
import '../../styles/home.css';

export const GovernanceCompliance: React.FC = () => {
  return (
    <>
      {/* Navigation */}
      <Navigation />

      {/* Hero */}
      <section className="service-hero centered">
        <div className="service-hero-container">
          <div className="service-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/#select-services">Select Services</Link> / <span>AI Governance</span>
          </div>

          <h1>Your AI System Is Live.<br /><span className="highlight" style={{ color: 'var(--accent)' }}>You Have No Governance Framework</span>.</h1>

          <p className="service-hero-subtitle">
            EU AI Act enforcement begins in 2025. Your investors want AI governance documentation. Your AI makes decisions affecting real people with no audit trail. One bias incident, one discriminatory output, one unexplainable decision—and you're exposed.
          </p>

          <div className="service-hero-price">Starting at $25,000</div>
          <p className="service-hero-price-note">AI governance frameworks, EU AI Act compliance, risk assessments</p>

          <div className="service-cta-group">
            <a href="#get-started" className="service-btn service-btn-primary">
              <i className="fas fa-robot"></i>
              Get AI Governance
            </a>
            <a href="mailto:ai@rivalislaw.com" className="service-btn service-btn-secondary">
              <i className="fas fa-envelope"></i>
              Email AI Team
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="service-section" style={{ background: 'white' }}>
        <div className="service-section-container">
          <div className="service-section-header">
            <h2 className="service-section-title">AI Governance Services</h2>
            <p className="service-section-subtitle">
              Oxford-trained AI governance counsel for responsible AI development
            </p>
          </div>

          <div className="service-services-grid">
            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-clipboard-list"></i>
              </div>
              <h3>AI Risk Assessment</h3>
              <p>Comprehensive evaluation of AI systems for bias, fairness, transparency, and regulatory compliance risks.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $25,000</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h3>EU AI Act Compliance</h3>
              <p>Full compliance program for EU AI Act requirements including risk classification, documentation, and conformity assessment.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $50,000</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-book-open"></i>
              </div>
              <h3>Governance Framework</h3>
              <p>Complete AI governance policies, procedures, and documentation for investor due diligence and regulatory compliance.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $35,000</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-users"></i>
              </div>
              <h3>AI Ethics Committee</h3>
              <p>Establish and train internal AI ethics review board with policies, procedures, and decision frameworks.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $20,000</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-exclamation-circle"></i>
              </div>
              <h3>Incident Response</h3>
              <p>AI-specific incident response planning, crisis management, and regulatory notification procedures.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $15,000</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-file-alt"></i>
              </div>
              <h3>Investor Documentation</h3>
              <p>AI governance documentation specifically designed for VC due diligence and investor presentations.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $25,000</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why AI Governance Section */}
      <section className="service-section" style={{ background: 'var(--gray-50)' }}>
        <div className="service-section-container">
          <div className="service-section-header">
            <h2 className="service-section-title">Why AI Governance Matters Now</h2>
            <p className="service-section-subtitle">
              The regulatory and business case for AI governance
            </p>
          </div>

          <div className="service-compliance-grid">
            <div className="service-compliance-card">
              <h3><i className="fas fa-gavel" style={{ color: 'var(--accent)', marginRight: '0.75rem' }}></i>EU AI Act</h3>
              <p>World's first comprehensive AI regulation becomes enforceable in 2025. High-risk AI systems need conformity assessment, documentation, and ongoing compliance. Non-compliance: fines up to €35M or 7% of global revenue.</p>
            </div>

            <div className="service-compliance-card">
              <h3><i className="fas fa-dollar-sign" style={{ color: 'var(--accent)', marginRight: '0.75rem' }}></i>Investor Expectations</h3>
              <p>Top VCs now require AI governance documentation. Series A+ investors conduct AI-specific due diligence. Missing governance = deal delays or termination. Being prepared accelerates fundraising.</p>
            </div>

            <div className="service-compliance-card">
              <h3><i className="fas fa-user-shield" style={{ color: 'var(--accent)', marginRight: '0.75rem' }}></i>Bias & Discrimination</h3>
              <p>AI systems make consequential decisions affecting people. Without governance, bias goes undetected. One discriminatory outcome can trigger lawsuits, regulatory action, and reputational damage.</p>
            </div>

            <div className="service-compliance-card">
              <h3><i className="fas fa-search" style={{ color: 'var(--accent)', marginRight: '0.75rem' }}></i>Transparency Requirements</h3>
              <p>Customers and regulators demand AI explainability. "Black box" AI faces increasing scrutiny. Governance frameworks provide transparency and accountability infrastructure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="service-section" style={{ background: 'white' }}>
        <div className="service-section-container">
          <div className="service-section-header">
            <h2 className="service-section-title">What's Included</h2>
            <p className="service-section-subtitle">
              Comprehensive AI governance deliverables
            </p>
          </div>

          <div className="service-compliance-grid">
            <div className="service-compliance-card">
              <h3>Risk Assessment Report</h3>
              <ul className="service-features">
                <li>AI system risk classification (EU AI Act)</li>
                <li>Bias and fairness evaluation</li>
                <li>Data protection impact assessment</li>
                <li>Transparency and explainability analysis</li>
                <li>Remediation recommendations</li>
              </ul>
            </div>

            <div className="service-compliance-card">
              <h3>Governance Framework</h3>
              <ul className="service-features">
                <li>AI ethics policy</li>
                <li>AI development guidelines</li>
                <li>Model documentation standards</li>
                <li>Testing and validation requirements</li>
                <li>Monitoring and audit procedures</li>
              </ul>
            </div>

            <div className="service-compliance-card">
              <h3>EU AI Act Compliance</h3>
              <ul className="service-features">
                <li>Risk category determination</li>
                <li>Conformity assessment preparation</li>
                <li>Technical documentation</li>
                <li>Quality management system</li>
                <li>CE marking guidance</li>
              </ul>
            </div>

            <div className="service-compliance-card">
              <h3>Investor Documentation</h3>
              <ul className="service-features">
                <li>AI governance summary deck</li>
                <li>Due diligence response package</li>
                <li>Risk mitigation evidence</li>
                <li>Compliance roadmap</li>
                <li>Board-level reporting</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="service-section service-final-cta" id="get-started">
        <div className="service-section-container">
          <h2>Get AI Governance Before You Need It</h2>
          <p>
            Investors expect it. Regulators require it. Customers demand it. Build your AI governance framework before a crisis forces you to—at far greater cost.
          </p>

          <div className="service-cta-group" style={{ justifyContent: 'center' }}>
            <a href="/forms/ai-governance" className="service-btn service-btn-primary">
              <i className="fas fa-robot"></i>
              Start AI Governance Assessment
            </a>
            <a href="tel:+1-202-555-0199" className="service-btn service-btn-secondary">
              <i className="fas fa-phone"></i>
              Call: (202) 555-0199
            </a>
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </>
  );
};

export default GovernanceCompliance;
