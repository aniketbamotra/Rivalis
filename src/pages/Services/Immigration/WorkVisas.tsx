import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../../components/Layout/Navigation';
import { EnhancedFooter } from '../../../components/Layout';
import '../../../styles/service-page.css';
import '../../../styles/home.css';

export const WorkVisas: React.FC = () => {
  
  return (
    <>
      <Navigation />

      {/* Hero */}
      <section className="service-hero" style={{ background: 'linear-gradient(165deg, #1a1a2e 0%, #2d3748 100%)' }}>
        <div className="service-hero-container">
          <div className="service-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/services/immigration">Immigration</Link> / <span>Work Visas</span>
          </div>

          <div className="service-hero-badge" style={{ background: 'rgba(231, 76, 60, 0.2)', borderColor: '#e74c3c' }}>
            <i className="fas fa-exclamation-circle" style={{ animation: 'pulse 2s infinite' }}></i>
            RFE EMERGENCY HOTLINE: +1 (313) 771-2283
          </div>

          <h1>Your Engineer Got an <span className="highlight" style={{ color: '#e74c3c' }}>RFE</span>.<br />Product Launch Is 6 Weeks Away.</h1>

          <p className="service-hero-subtitle">
            Your engineer got an RFE and your product launch is 6 weeks away. We fix immigration disasters that kill companies. 24-hour emergency response. 500+ H-1B petitions filed with Big 4 experience.
          </p>

          <div className="service-hero-stats">
            <div className="service-stat">
              <div className="service-stat-number">24hrs</div>
              <div className="service-stat-label">Emergency RFE response</div>
            </div>
            <div className="service-stat">
              <div className="service-stat-number">500+</div>
              <div className="service-stat-label">Work visa petitions filed</div>
            </div>
            <div className="service-stat">
              <div className="service-stat-number">5 Yrs</div>
              <div className="service-stat-label">Big 4 immigration experience</div>
            </div>
          </div>

          <div className="service-cta-group">
            <a href="tel:+1-313-771-2283" className="service-btn service-btn-primary" style={{ background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)' }}>
              <i className="fas fa-phone-alt"></i>
              Emergency: +1 (313) 771-2283
            </a>
            <Link to="/forms/work-visa-intake" className="service-btn service-btn-secondary">
              <i className="fas fa-calendar-check"></i>
              Start Visa Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Crisis Scenarios */}
      <section className="service-section">
        <div className="service-section-container">
          <div className="service-section-header">
            <div className="service-section-tag" style={{ background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c' }}>CRISIS SCENARIOS</div>
            <h2 className="service-section-title">These Calls Come In At Midnight</h2>
            <p className="service-section-description">
              Immigration emergencies don't happen during business hours. When USCIS sends an RFE, when status is about to expire, when your executive is stuck overseas—you need someone who answers.
            </p>
          </div>

          <div className="service-problems-grid">
            <div className="service-problem-card">
              <h3><i className="fas fa-clock" style={{ color: '#e74c3c' }}></i> The 15-Day RFE Nightmare</h3>
              <p>USCIS sent a Request for Evidence. Your lawyer is on vacation. You have 15 days to respond with documentation you don't have. Miss the deadline and your engineer is deported.</p>
            </div>

            <div className="service-problem-card">
              <h3><i className="fas fa-plane-slash" style={{ color: '#e74c3c' }}></i> The Overseas Executive Crisis</h3>
              <p>Your CTO is stuck in Dubai. Board meeting in 2 weeks. Product launch in 6 weeks. No visa approval. The L-1 petition you filed 4 months ago is still pending with no update.</p>
            </div>

            <div className="service-problem-card">
              <h3><i className="fas fa-calendar-times" style={{ color: '#e74c3c' }}></i> The Expiration Countdown</h3>
              <p>Your lead developer's H-1B extension was filed "in time" by your previous lawyer. USCIS just sent a denial. Status expires in 30 days. He has a family and a mortgage.</p>
            </div>

            <div className="service-problem-card">
              <h3><i className="fas fa-ban" style={{ color: '#e74c3c' }}></i> The Denial Letter Disaster</h3>
              <p>O-1 petition denied. Your company's entire AI team depends on this hire. You're out $25K in recruitment costs. Investors are asking why you can't hire the talent you promised.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Types */}
      <section className="service-section" style={{ background: '#f7fafc' }}>
        <div className="service-section-container">
          <div className="service-section-header">
            <div className="service-section-tag" style={{ background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c' }}>VISA SOLUTIONS</div>
            <h2 className="service-section-title">Every Work Visa, Every Scenario</h2>
            <p className="service-section-description">
              From emergency H-1B transfers to O-1 extraordinary ability petitions, we handle every employment-based visa category with precision and speed.
            </p>
          </div>

          <div className="service-solutions-grid">
            <div className="service-solution-card">
              <div className="service-solution-icon" style={{ background: 'linear-gradient(135deg, rgba(231, 76, 60, 0.1) 0%, rgba(192, 57, 43, 0.05) 100%)' }}>
                <i className="fas fa-briefcase" style={{ color: '#e74c3c' }}></i>
              </div>
              <h3>H-1B Specialty Occupation</h3>
              <p>The workhorse visa for tech professionals, engineers, and specialized workers. We handle initial petitions, transfers, amendments, and extensions.</p>
              <div className="service-meta">
                <span><i className="fas fa-clock"></i> 3-6 months</span>
                <span><i className="fas fa-dollar-sign"></i> $5,000-$8,000</span>
              </div>
              <ul style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#4a5568' }}>
                <li>Initial petitions & cap filings</li>
                <li>Emergency transfers (24-48 hour response)</li>
                <li>RFE responses & appeals</li>
                <li>Premium processing ($2,500 USCIS fee)</li>
              </ul>
            </div>

            <div className="service-solution-card">
              <div className="service-solution-icon" style={{ background: 'linear-gradient(135deg, rgba(231, 76, 60, 0.1) 0%, rgba(192, 57, 43, 0.05) 100%)' }}>
                <i className="fas fa-building" style={{ color: '#e74c3c' }}></i>
              </div>
              <h3>L-1 Intracompany Transfer</h3>
              <p>Transfer executives, managers, and specialized knowledge employees from your foreign offices to the U.S. Essential for global expansion.</p>
              <div className="service-meta">
                <span><i className="fas fa-clock"></i> 2-4 months</span>
                <span><i className="fas fa-dollar-sign"></i> $6,000-$10,000</span>
              </div>
              <ul style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#4a5568' }}>
                <li>L-1A (Executives & Managers)</li>
                <li>L-1B (Specialized Knowledge)</li>
                <li>Blanket L petitions for large companies</li>
                <li>New office L-1 petitions</li>
              </ul>
            </div>

            <div className="service-solution-card">
              <div className="service-solution-icon" style={{ background: 'linear-gradient(135deg, rgba(231, 76, 60, 0.1) 0%, rgba(192, 57, 43, 0.05) 100%)' }}>
                <i className="fas fa-star" style={{ color: '#e74c3c' }}></i>
              </div>
              <h3>O-1 Extraordinary Ability</h3>
              <p>For individuals with extraordinary ability in sciences, arts, education, business, or athletics. The premium visa for top talent.</p>
              <div className="service-meta">
                <span><i className="fas fa-clock"></i> 2-3 months</span>
                <span><i className="fas fa-dollar-sign"></i> $8,000-$15,000</span>
              </div>
              <ul style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#4a5568' }}>
                <li>O-1A (Sciences, Business, Athletics)</li>
                <li>O-1B (Arts, Motion Picture/TV)</li>
                <li>Evidence of extraordinary ability compilation</li>
                <li>Advisory opinion letters</li>
              </ul>
            </div>

            <div className="service-solution-card">
              <div className="service-solution-icon" style={{ background: 'linear-gradient(135deg, rgba(231, 76, 60, 0.1) 0%, rgba(192, 57, 43, 0.05) 100%)' }}>
                <i className="fas fa-flag" style={{ color: '#e74c3c' }}></i>
              </div>
              <h3>TN NAFTA Professional</h3>
              <p>Fast-track visa for Canadian and Mexican professionals. Can be obtained at the border or port of entry in many cases.</p>
              <div className="service-meta">
                <span><i className="fas fa-clock"></i> 2-4 weeks</span>
                <span><i className="fas fa-dollar-sign"></i> $2,500-$4,000</span>
              </div>
              <ul style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#4a5568' }}>
                <li>TN petition preparation</li>
                <li>Border crossing strategy & documentation</li>
                <li>TN to H-1B conversion planning</li>
                <li>Extensions & amendments</li>
              </ul>
            </div>

            <div className="service-solution-card">
              <div className="service-solution-icon" style={{ background: 'linear-gradient(135deg, rgba(231, 76, 60, 0.1) 0%, rgba(192, 57, 43, 0.05) 100%)' }}>
                <i className="fas fa-handshake" style={{ color: '#e74c3c' }}></i>
              </div>
              <h3>E-2 Treaty Investor</h3>
              <p>For substantial investors from treaty countries. Ideal for entrepreneurs and business owners looking to run operations in the U.S.</p>
              <div className="service-meta">
                <span><i className="fas fa-clock"></i> 3-6 months</span>
                <span><i className="fas fa-dollar-sign"></i> $8,000-$15,000</span>
              </div>
              <ul style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#4a5568' }}>
                <li>Business plan development</li>
                <li>Investment documentation</li>
                <li>Marginality analysis</li>
                <li>Employee E-2 visas</li>
              </ul>
            </div>

            <div className="service-solution-card">
              <div className="service-solution-icon" style={{ background: 'linear-gradient(135deg, rgba(231, 76, 60, 0.1) 0%, rgba(192, 57, 43, 0.05) 100%)' }}>
                <i className="fas fa-exclamation-triangle" style={{ color: '#e74c3c' }}></i>
              </div>
              <h3>RFE Emergency Response</h3>
              <p>Request for Evidence responses with 24-hour turnaround. When USCIS questions your petition, we mobilize immediately.</p>
              <div className="service-meta">
                <span><i className="fas fa-clock"></i> 24-72 hours</span>
                <span><i className="fas fa-dollar-sign"></i> $3,500-$7,500</span>
              </div>
              <ul style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#4a5568' }}>
                <li>24-hour case analysis</li>
                <li>Evidence gathering & organization</li>
                <li>Legal brief preparation</li>
                <li>Expert opinion letters (if needed)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* $499 Consultation Box */}
      <section className="service-section" style={{ background: 'linear-gradient(180deg, #fafbfc 0%, #ffffff 100%)', padding: '6rem 3rem' }}>
        <div className="service-section-container">
          <div style={{ 
            background: 'white', 
            border: '3px solid #e74c3c', 
            borderRadius: '16px', 
            padding: '3rem', 
            maxWidth: '900px', 
            margin: '0 auto',
            boxShadow: '0 20px 60px rgba(231, 76, 60, 0.15)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div style={{
                display: 'inline-block',
                background: 'rgba(231, 76, 60, 0.1)',
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#e74c3c',
                letterSpacing: '1px',
                marginBottom: '1.5rem'
              }}>
                <i className="fas fa-shield-alt"></i> CONFIDENTIAL ASSESSMENT
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '1rem' }}>
                Don't File Blind. Get Expert Review First.
              </h2>
              <p style={{ fontSize: '1.15rem', color: '#4a5568', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto' }}>
                Most visa denials happen because of preventable mistakes in the petition. Before you file—or if you've received an RFE or denial—get a comprehensive assessment from someone who's reviewed thousands of petitions at a Big 4 firm.
              </p>
            </div>

            <div style={{ 
              background: 'linear-gradient(135deg, #f7fafc 0%, #ffffff 100%)',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1.5rem' }}>
                <i className="fas fa-check-circle" style={{ color: '#e74c3c', marginRight: '0.5rem' }}></i>
                What You Get in Your Assessment:
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <i className="fas fa-check" style={{ color: '#48bb78', marginTop: '0.25rem' }}></i>
                  <span style={{ color: '#2d3748', fontSize: '0.95rem' }}><strong>Eligibility Analysis:</strong> Which visa category fits your situation</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <i className="fas fa-check" style={{ color: '#48bb78', marginTop: '0.25rem' }}></i>
                  <span style={{ color: '#2d3748', fontSize: '0.95rem' }}><strong>Risk Assessment:</strong> Red flags that could trigger RFEs</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <i className="fas fa-check" style={{ color: '#48bb78', marginTop: '0.25rem' }}></i>
                  <span style={{ color: '#2d3748', fontSize: '0.95rem' }}><strong>Document Review:</strong> What evidence is strong, what's missing</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <i className="fas fa-check" style={{ color: '#48bb78', marginTop: '0.25rem' }}></i>
                  <span style={{ color: '#2d3748', fontSize: '0.95rem' }}><strong>Timeline Strategy:</strong> Premium processing vs standard filing</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <i className="fas fa-check" style={{ color: '#48bb78', marginTop: '0.25rem' }}></i>
                  <span style={{ color: '#2d3748', fontSize: '0.95rem' }}><strong>Cost Breakdown:</strong> Total investment including USCIS fees</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <i className="fas fa-check" style={{ color: '#48bb78', marginTop: '0.25rem' }}></i>
                  <span style={{ color: '#2d3748', fontSize: '0.95rem' }}><strong>Action Plan:</strong> Next steps with specific deadlines</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: 900, color: '#e74c3c', lineHeight: 1 }}>$499</div>
                <div style={{ fontSize: '0.95rem', color: '#718096', marginTop: '0.5rem' }}>
                  <strong>Emergency cases:</strong> Available within 24 hours
                </div>
                <div style={{ fontSize: '0.85rem', color: '#a0aec0', marginTop: '0.25rem' }}>
                  Assessment fee credited toward full representation
                </div>
              </div>
              <Link 
                to="/forms/work-visa-intake"
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                  color: 'white',
                  padding: '1rem 2.5rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  boxShadow: '0 8px 20px rgba(231, 76, 60, 0.3)',
                  transition: 'transform 0.3s'
                }}
              >
                <i className="fas fa-calendar-check" style={{ marginRight: '0.5rem' }}></i>
                Schedule Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="service-section">
        <div className="service-section-container">
          <div className="service-section-header">
            <div className="service-section-tag" style={{ background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c' }}>BIG 4 EXPERIENCE</div>
            <h2 className="service-section-title">Why Companies Trust Us With Their Immigration Crises</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ background: '#f7fafc', padding: '2rem', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>
                <i className="fas fa-building" style={{ color: '#e74c3c', marginRight: '0.5rem' }}></i>
                Big 4 Immigration Background
              </h3>
              <p style={{ color: '#4a5568', lineHeight: 1.7 }}>
                5+ years handling corporate immigration for Fortune 500 companies at Big 4 accounting firms. We've seen every visa scenario, every RFE pattern, every denial trend.
              </p>
            </div>

            <div style={{ background: '#f7fafc', padding: '2rem', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>
                <i className="fas fa-bolt" style={{ color: '#e74c3c', marginRight: '0.5rem' }}></i>
                24-Hour Emergency Response
              </h3>
              <p style={{ color: '#4a5568', lineHeight: 1.7 }}>
                When your engineer gets an RFE at 11 PM on Friday, you can't wait until Monday. We have emergency protocols for RFE responses, denials, and status expirations.
              </p>
            </div>

            <div style={{ background: '#f7fafc', padding: '2rem', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>
                <i className="fas fa-chart-line" style={{ color: '#e74c3c', marginRight: '0.5rem' }}></i>
                High-Stakes Cases Only
              </h3>
              <p style={{ color: '#4a5568', lineHeight: 1.7 }}>
                We don't do commodity immigration work. If your business depends on getting this visa approved, if there's a denied petition to overcome, if there's an RFE deadline—that's our specialty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="service-section" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #2d3748 100%)', padding: '5rem 3rem' }}>
        <div className="service-section-container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>
            Don't Let a Visa Crisis Kill Your Business
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '800px', margin: '0 auto 3rem', lineHeight: 1.7 }}>
            Whether it's an emergency RFE, a denied petition, or a new visa filing, get expert assessment before you waste time and money.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="tel:+1-313-771-2283"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                color: 'white',
                padding: '1rem 2.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '1.1rem'
              }}
            >
              <i className="fas fa-phone-alt"></i> Emergency: +1 (313) 771-2283
            </a>
            <Link 
              to="/forms/work-visa-intake"
              style={{
                display: 'inline-block',
                background: 'transparent',
                color: 'white',
                padding: '1rem 2.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '1.1rem',
                border: '2px solid white'
              }}
            >
              <i className="fas fa-clipboard-list"></i> Start Assessment
            </Link>
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </>
  );
};

export default WorkVisas;
