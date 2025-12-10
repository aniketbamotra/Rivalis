import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Layout/Navigation';
import '../../styles/service-page.css';
import '../../styles/home.css';

export const EmploymentLaw: React.FC = () => {
  return (
    <>
      {/* Navigation */}
      <Navigation />

      {/* Hero */}
      <section className="service-hero centered">
        <div className="service-hero-container">
          <div className="service-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/#select-services">Select Services</Link> / <span>Employment Law</span>
          </div>

          <h1>Your Employee Just Filed<br />a <span className="highlight">$500K Lawsuit</span></h1>

          <p className="service-hero-subtitle">
            You fired someone without documentation. Your offer letter promised things you can't deliver. You have no employee handbook. Your workers might be misclassified. One employment lawsuit destroys your runway and reputation.
          </p>

          <div className="service-hero-price">Starting at $3,000</div>
          <p className="service-hero-price-note">Employment policies, handbooks, and HR compliance</p>

          <div className="service-cta-group">
            <Link to="/forms/employment-law" className="service-btn service-btn-primary">
              <i className="fas fa-users"></i>
              Get Started - Employment Intake
            </Link>
            <a href="mailto:employment@rivalislaw.com" className="service-btn service-btn-secondary">
              <i className="fas fa-envelope"></i>
              Email Employment Team
            </a>
          </div>
        </div>
      </section>

      {/* Risks Section */}
      <section className="service-section service-problems">
        <div className="service-section-container">
          <div className="service-section-header">
            <h2 className="service-section-title">Employment Law Nightmares</h2>
            <p className="service-section-subtitle">Real risks from improper HR practices</p>
          </div>

          <div className="service-problems-grid">
            <div className="service-problem-card">
              <h3>Wrongful Termination Claims</h3>
              <p>You fired an underperformer. No documentation of performance issues. No written warnings. They claim discrimination. Legal defense costs $150K before trial even starts.</p>
            </div>

            <div className="service-problem-card">
              <h3>Misclassification Penalties</h3>
              <p>Your contractors are really employees. IRS audit finds misclassification. Back taxes, penalties, and interest total $250K. Plus workers' comp violations and unemployment insurance liability.</p>
            </div>

            <div className="service-problem-card">
              <h3>Offer Letter Disasters</h3>
              <p>Your offer letter says "permanent position" and lists specific compensation. Employee claims contractual employment. You can't fire them without cause. Employment contract you didn't mean to create.</p>
            </div>

            <div className="service-problem-card">
              <h3>Handbook Violations</h3>
              <p>Your handbook (or lack thereof) creates liability. Inconsistent policies. No at-will disclaimers. Promises you can't keep. Employee sues claiming you violated your own policies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="service-section" style={{ background: 'white' }}>
        <div className="service-section-container">
          <div className="service-section-header">
            <h2 className="service-section-title">Employment Law Services</h2>
            <p className="service-section-subtitle">
              Comprehensive HR legal support for growing companies
            </p>
          </div>

          <div className="service-services-grid">
            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-file-signature"></i>
              </div>
              <h3>Offer Letters</h3>
              <p>Legally compliant offer letters with proper at-will language, compensation terms, and IP assignment provisions.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $1,000 each</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-book"></i>
              </div>
              <h3>Employee Handbook</h3>
              <p>Comprehensive handbook with policies, procedures, compliance provisions, and legal protections for your company.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $5,000</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-user-times"></i>
              </div>
              <h3>Termination Guidance</h3>
              <p>Legal counsel on firing employees, severance negotiations, release agreements, and liability minimization.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $2,000</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-user-check"></i>
              </div>
              <h3>Worker Classification</h3>
              <p>Employee vs contractor analysis, classification audits, and proper documentation to avoid misclassification penalties.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $3,000</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-clipboard-list"></i>
              </div>
              <h3>HR Compliance Audit</h3>
              <p>Comprehensive review of employment practices, identify compliance gaps, remediation recommendations.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $5,000</div>
            </div>

            <div className="service-card">
              <div className="service-card-icon light">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Ongoing HR Counsel</h3>
              <p>Retainer-based employment law support for hiring, policies, terminations, and compliance questions.</p>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)' }}>Starting at $2,500/month</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="service-section service-final-cta" id="get-started">
        <div className="service-section-container">
          <h2>Protect Your Company From Employment Liability</h2>
          <p>
            One employment lawsuit can cost more than years of proper HR legal counsel. Get compliant practices in place before problems arise.
          </p>

          <div className="service-cta-group" style={{ justifyContent: 'center' }}>
            <Link to="/forms/employment-law" className="service-btn service-btn-primary">
              <i className="fas fa-clipboard-list"></i>
              Start Employment Law Intake
            </Link>
            <a href="tel:+1-313-771-2283" className="service-btn service-btn-secondary">
              <i className="fas fa-phone-alt"></i>
              Call: (313) 771-2283
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

export default EmploymentLaw;
