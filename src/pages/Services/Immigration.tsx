import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Layout/Navigation';
import { EnhancedFooter } from '../../components/Layout';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import '../../styles/service-page.css';
import '../../styles/home.css';

export const Immigration: React.FC = () => {
  const { settings } = useSiteSettings();
  
  return (
    <>
      {/* Navigation */}
      <Navigation />

      {/* Hero */}
      <section className="service-hero">
        <div className="service-hero-container">
          <div className="service-breadcrumb">
            <Link to="/">Home</Link> / <span>Global Immigration</span>
          </div>

          <div className="service-hero-badge danger">
            <i className="fas fa-exclamation-triangle"></i>
            RFE EMERGENCY HOTLINE: {settings?.phone_display || '+1 (313) 771-2283'}
          </div>

          <h1>Your Key Engineer's Visa <span className="highlight">Expires in 30 Days</span>.<br />What's Your Plan?</h1>

          <p className="service-hero-subtitle">
            Product launch depends on your CTO who's stuck overseas. H-1B denial just arrived. You got an RFE with a 15-day deadline. Your star developer's status expires next month. One visa crisis can destroy your timeline, your team, and your business.
          </p>

          <div className="service-hero-stats">
            <div className="service-stat">
              <div className="service-stat-number">24hrs</div>
              <div className="service-stat-label">RFE emergency response time</div>
            </div>
            <div className="service-stat">
              <div className="service-stat-number">5+ Yrs</div>
              <div className="service-stat-label">Big 4 immigration experience</div>
            </div>
            <div className="service-stat">
              <div className="service-stat-number">100+</div>
              <div className="service-stat-label">Successful visa petitions</div>
            </div>
          </div>

          <div className="service-cta-group">
            <a href={`tel:${settings?.phone_primary || '+1-313-771-2283'}`} className="service-btn service-btn-primary danger">
              <i className="fas fa-phone-alt"></i>
              RFE CRISIS: {settings?.phone_display || '+1 (313) 771-2283'}
            </a>
            <a href="#get-started" className="service-btn service-btn-secondary">
              <i className="fas fa-calendar-check"></i>
              Schedule Assessment
            </a>
          </div>

          <div style={{ background: 'white', border: '2px solid var(--accent)', borderRadius: '12px', padding: '2.5rem', marginTop: '3rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem' }}>
              <i className="fas fa-map-marked-alt" style={{ color: 'var(--accent)', marginRight: '0.5rem' }}></i>
              Long-Term Immigration Planning
            </h3>
            <p style={{ color: 'var(--gray-900)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '800px', margin: '0 auto', fontWeight: 500 }}>
              Beyond immediate visa needs, we provide strategic counsel on permanent residence pathways including PERM labor certification, EB-1/EB-2/EB-3 green cards, and naturalization. Contact us to discuss your long-term immigration strategy.
            </p>
          </div>
        </div>
      </section>

      {/* Immigration Sub-Services Navigation */}
      <section className="service-section" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="service-section-container">
          <div className="service-section-header">
            <div className="service-section-tag">IMMIGRATION PATHWAYS</div>
            <h2 className="service-section-title">Specialized Immigration Services</h2>
            <p style={{ color: 'var(--gray-700)', fontSize: '1.1rem', maxWidth: '700px', margin: '1rem auto 0' }}>
              Choose the pathway that matches your situation. Each service includes strategic counsel and precise execution.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            {/* Work Visas Card */}
            <Link to="/services/immigration/work-visas" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="service-card" style={{ background: 'linear-gradient(135deg, #fff5f5 0%, #ffffff 100%)', border: '2px solid #ffe5e5', transition: 'all 0.3s ease', cursor: 'pointer' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💼</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#e74c3c', marginBottom: '0.5rem' }}>Work Visas</h3>
                <p style={{ fontSize: '0.95rem', color: '#c0392b', fontWeight: 600, marginBottom: '1rem' }}>H-1B • L-1 • O-1 • TN • E-2</p>
                <p style={{ color: 'var(--gray-700)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Employment-based temporary visas with emergency RFE response. Get expert guidance on visa selection, application strategy, and compliance.
                </p>
                <div style={{ background: '#e74c3c', color: 'white', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>$299-$499</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Based on urgency</div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: 'var(--gray-700)' }}>
                  <li style={{ marginBottom: '0.5rem' }}>✓ All employment visa types</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ 48-hour RFE turnaround</li>
                  <li>✓ Compliance monitoring</li>
                </ul>
                <div style={{ marginTop: '1.5rem', color: '#e74c3c', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Learn More <span>→</span>
                </div>
              </div>
            </Link>

            {/* EB-1 & EB-2 Green Cards */}
            <Link to="/services/immigration/eb1-extraordinary-ability" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="service-card" style={{ background: 'linear-gradient(135deg, #fffbf0 0%, #ffffff 100%)', border: '2px solid #ffeaa7', transition: 'all 0.3s ease', cursor: 'pointer' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏆</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#d4af37', marginBottom: '0.5rem' }}>EB-1 & EB-2 Green Cards</h3>
                <p style={{ fontSize: '0.95rem', color: '#b8860b', fontWeight: 600, marginBottom: '1rem' }}>No Sponsor Required • Self-Petition</p>
                <p style={{ color: 'var(--gray-700)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Self-petition green cards for extraordinary ability (EB-1) or advanced degree holders with national interest work (EB-2 NIW). Choose your pathway.
                </p>
                <div style={{ background: '#d4af37', color: 'white', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>$699-$799</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Based on pathway</div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: 'var(--gray-700)' }}>
                  <li style={{ marginBottom: '0.5rem' }}>✓ EB-1 10 criteria evaluation</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ EB-2 Dhanasar analysis</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Evidence portfolio review</li>
                  <li>✓ Strategic positioning plan</li>
                </ul>
                <div style={{ marginTop: '1.5rem', color: '#d4af37', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Learn More <span>→</span>
                </div>
              </div>
            </Link>

            {/* EB-5 Card */}
            <Link to="/services/immigration/eb5" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="service-card" style={{ background: 'linear-gradient(135deg, #f0f8ff 0%, #ffffff 100%)', border: '2px solid #bee3f8', transition: 'all 0.3s ease', cursor: 'pointer' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💰</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2c5282', marginBottom: '0.5rem' }}>EB-5 Investor Visa</h3>
                <p style={{ fontSize: '0.95rem', color: '#2a4365', fontWeight: 600, marginBottom: '1rem' }}>$800K-$1.05M Investment</p>
                <p style={{ color: 'var(--gray-700)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Green card through investment. 60% of denials are source-of-funds issues. Get your audit done right before USCIS scrutinizes your wealth.
                </p>
                <div style={{ background: '#2c5282', color: 'white', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>$2,500</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Source of funds audit</div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', color: 'var(--gray-700)' }}>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Complete SOF documentation</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ Tax trail verification</li>
                  <li>✓ I-526E petition strategy</li>
                </ul>
                <div style={{ marginTop: '1.5rem', color: '#2c5282', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Learn More <span>→</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="service-section service-problems">
        <div className="service-section-container">
          <div className="service-section-header">
            <div className="service-section-tag">THE CRISIS SCENARIOS</div>
            <h2 className="service-section-title">These Calls Come In At Midnight</h2>
          </div>

          <div className="service-problems-grid">
            <div className="service-problem-card">
              <h3><i className="fas fa-clock"></i> The 15-Day RFE Nightmare</h3>
              <p>USCIS sent a Request for Evidence. Your lawyer is on vacation. You have 15 days to respond with documentation you don't have. Miss the deadline and your engineer is deported.</p>
            </div>

            <div className="service-problem-card">
              <h3><i className="fas fa-plane-slash"></i> The Overseas Executive Crisis</h3>
              <p>Your CTO is stuck in Dubai. Board meeting in 2 weeks. Product launch in 6 weeks. No visa approval. The L-1 petition you filed 4 months ago is still pending with no update.</p>
            </div>

            <div className="service-problem-card">
              <h3><i className="fas fa-calendar-times"></i> The Expiration Countdown</h3>
              <p>Your lead developer's H-1B extension was filed "in time" by your previous lawyer. USCIS just sent a denial. Status expires in 30 days. He has a family and a mortgage.</p>
            </div>

            <div className="service-problem-card">
              <h3><i className="fas fa-ban"></i> The Denial Letter Disaster</h3>
              <p>O-1 petition denied. Your company's entire AI team depends on this hire. You're out $25K in recruitment costs. Investors are asking why you can't hire the talent you promised.</p>
            </div>
          </div>
        </div>
      </section>

      {/* RFE Section */}
      <section className="service-section" style={{ background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)', color: 'white' }}>
        <div className="service-section-container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3.5rem', fontWeight: 700, marginBottom: '2rem' }}>Got an RFE? We Respond in 24 Hours.</h2>
          <p style={{ fontSize: '1.3rem', lineHeight: 1.8, marginBottom: '3rem', opacity: 0.95 }}>
            Request for Evidence from USCIS? Clock is ticking. Most firms take a week just to review your case. We start working immediately. Big 4 training means we know exactly what USCIS wants to see.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '2rem', borderRadius: '12px' }}>
              <i className="fas fa-bolt" style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'block' }}></i>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>24-Hour Response</h4>
              <p>Emergency engagement starts same business day</p>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '2rem', borderRadius: '12px' }}>
              <i className="fas fa-file-alt" style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'block' }}></i>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Complete Package</h4>
              <p>Comprehensive response with all required evidence</p>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '2rem', borderRadius: '12px' }}>
              <i className="fas fa-handshake" style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'block' }}></i>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Direct Attorney Work</h4>
              <p>No junior associates. Senior counsel handles your RFE.</p>
            </div>
          </div>

          <div className="service-cta-group" style={{ justifyContent: 'center' }}>
            <a href={`tel:${settings?.phone_primary || '+1-313-771-2283'}`} className="service-btn service-btn-primary" style={{ background: 'white', color: 'var(--danger)' }}>
              <i className="fas fa-phone-volume"></i>
              EMERGENCY: {settings?.phone_display || '+1 (313) 771-2283'}
            </a>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="service-section service-process">
        <div className="service-section-container">
          <div className="service-section-header">
            <div className="service-section-tag">OUR PROCESS</div>
            <h2 className="service-section-title">Standard Petition Timeline</h2>
            <p className="service-section-subtitle">For non-emergency cases (RFE responses expedited)</p>
          </div>

          <div className="service-process-steps">
            <div className="service-process-step">
              <div className="service-step-number">1</div>
              <h4>Case Assessment</h4>
              <p>Evaluate eligibility, identify potential issues, and develop strategy</p>
              <span className="service-timeline-badge">Week 1</span>
            </div>

            <div className="service-process-step">
              <div className="service-step-number">2</div>
              <h4>Document Collection</h4>
              <p>Gather evidence, prepare support letters, compile portfolio</p>
              <span className="service-timeline-badge">Weeks 2-3</span>
            </div>

            <div className="service-process-step">
              <div className="service-step-number">3</div>
              <h4>Petition Preparation</h4>
              <p>Draft comprehensive petition with supporting documentation</p>
              <span className="service-timeline-badge">Week 4</span>
            </div>

            <div className="service-process-step">
              <div className="service-step-number">4</div>
              <h4>Filing & Monitoring</h4>
              <p>Submit to USCIS, track case status, handle any responses</p>
              <span className="service-timeline-badge">Ongoing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="service-section service-cases">
        <div className="service-section-container">
          <div className="service-section-header">
            <div className="service-section-tag">SUCCESS STORIES</div>
            <h2 className="service-section-title">Real Immigration Crises We've Solved</h2>
          </div>

          <div className="service-case-studies">
            <div className="service-case-study">
              <div className="service-case-header">
                <div className="service-case-type">H-1B RFE Emergency</div>
                <h3>12-Day Turnaround Saved Engineering Team</h3>
              </div>
              <div className="service-case-content">
                <div className="service-case-section">
                  <h4><i className="fas fa-exclamation-circle"></i> The Crisis</h4>
                  <p>Tech startup received RFE on H-1B extension for their lead backend engineer. Previous attorney had filed incomplete petition. USCIS requested extensive additional evidence. 15-day deadline. Engineer's current status expiring in 45 days.</p>
                </div>
                <div className="service-case-section">
                  <h4><i className="fas fa-cog"></i> Our Response</h4>
                  <ul>
                    <li>Same-day emergency engagement</li>
                    <li>Identified gaps in original petition</li>
                    <li>Compiled 200+ pages of additional evidence</li>
                    <li>Drafted detailed technical letter explaining role</li>
                    <li>Filed comprehensive response in 12 days</li>
                  </ul>
                </div>
                <div className="service-case-outcome">
                  <strong>Outcome:</strong> H-1B extension approved 3 weeks after RFE response. Engineer stayed with company, critical project completed on time.
                </div>
              </div>
            </div>

            <div className="service-case-study">
              <div className="service-case-header">
                <div className="service-case-type">L-1A Executive Transfer</div>
                <h3>Dubai CEO to US Operations in 8 Weeks</h3>
              </div>
              <div className="service-case-content">
                <div className="service-case-section">
                  <h4><i className="fas fa-exclamation-circle"></i> The Situation</h4>
                  <p>Fintech company expanding from UAE to United States. CEO needed to relocate to establish US operations. Board meeting scheduled. Investor presentations lined up. L-1A visa required but previous counsel said 6+ month timeline.</p>
                </div>
                <div className="service-case-section">
                  <h4><i className="fas fa-cog"></i> Our Approach</h4>
                  <ul>
                    <li>Documented qualifying relationship between UAE and US entities</li>
                    <li>Prepared detailed managerial role description</li>
                    <li>Compiled evidence of executive capacity</li>
                    <li>Premium processing with comprehensive documentation</li>
                    <li>Coordinated consular processing in Abu Dhabi</li>
                  </ul>
                </div>
                <div className="service-case-outcome">
                  <strong>Outcome:</strong> L-1A approved in 6 weeks. CEO relocated to US on schedule. Company successfully launched US operations with $15M funding round.
                </div>
              </div>
            </div>

            <div className="service-case-study">
              <div className="service-case-header">
                <div className="service-case-type">O-1 Extraordinary Ability</div>
                <h3>AI Research Lead's O-1 Approval After H-1B Denial</h3>
              </div>
              <div className="service-case-content">
                <div className="service-case-section">
                  <h4><i className="fas fa-exclamation-circle"></i> The Challenge</h4>
                  <p>AI startup hired world-class machine learning researcher. H-1B lottery lost. Couldn't wait another year. Researcher had publications but previous attorney said O-1 was "too difficult." Company facing loss of critical hire.</p>
                </div>
                <div className="service-case-section">
                  <h4><i className="fas fa-cog"></i> Our Strategy</h4>
                  <ul>
                    <li>Analyzed researcher's publication record and citations</li>
                    <li>Secured advisory letters from 6 leading academics</li>
                    <li>Documented judging/peer review activity</li>
                    <li>Compiled evidence of original contributions</li>
                    <li>Presented extraordinary ability case with 300+ pages of evidence</li>
                  </ul>
                </div>
                <div className="service-case-outcome">
                  <strong>Outcome:</strong> O-1 approved without RFE. Researcher started on time. Company's AI research division launched successfully with key technical leadership in place.
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
            <h2 className="service-section-title">Immigration Questions Answered</h2>
          </div>

          <div className="service-faq-list">
            <div className="service-faq-item">
              <div className="service-faq-question">
                What makes your immigration practice different?
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="service-faq-answer">
                Big 4 training at Ernst & Young means handling hundreds of corporate immigration cases. I know what USCIS scrutinizes because I've seen patterns across industries. You get partner-level attention without the $800/hour rate. And when there's an RFE crisis, I respond in 24 hours—not a week.
              </div>
            </div>

            <div className="service-faq-item">
              <div className="service-faq-question">
                How quickly can you respond to an immigration emergency?
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="service-faq-answer">
                RFE or visa crisis? Call the emergency line {settings?.phone_display || '+1 (313) 771-2283'} and we start same day. Initial assessment within 24 hours. For standard petitions, initial consultation within 48 hours. No waiting weeks for an attorney to be "available."
              </div>
            </div>

            <div className="service-faq-item">
              <div className="service-faq-question">
                Do you handle cases for people currently outside the US?
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="service-faq-answer">
                Yes. Significant experience with UAE-US transfers and global talent mobility. We handle consular processing coordination and can work with beneficiaries anywhere in the world. Virtual consultations available across time zones.
              </div>
            </div>

            <div className="service-faq-item">
              <div className="service-faq-question">
                What's included in your visa petition pricing?
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="service-faq-answer">
                Complete petition preparation, LCA filing (H-1B), all supporting documentation, employer support letters, evidence compilation, USCIS filing, case monitoring, and standard RFE response (if straightforward). Government filing fees are separate. Complex RFE responses may require additional fees depending on scope.
              </div>
            </div>

            <div className="service-faq-item">
              <div className="service-faq-question">
                Can you help if our previous attorney made mistakes?
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="service-faq-answer">
                Yes. Multiple case studies above show exactly this scenario. We've rescued petitions after denials, responded to RFEs caused by incomplete initial filings, and helped companies recover from visa disasters. The sooner you call, the more options we have.
              </div>
            </div>

            <div className="service-faq-item">
              <div className="service-faq-question">
                Do you handle green cards and PERM?
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="service-faq-answer">
                Yes. We handle employment-based green card strategy, PERM labor certification, I-140 immigrant petitions, and adjustment of status. PERM is a 2-4 year process requiring careful planning and documentation. We also handle EB-1 (extraordinary ability), EB-2 (advanced degree), and EB-3 (skilled worker) pathways. Contact us for detailed consultation on permanent residence strategies and timelines.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="service-section service-final-cta" id="get-started">
        <div className="service-section-container">
          <h2>Don't Lose Your Key Talent to a Visa Crisis</h2>
          <p>
            One immigration mistake can cost you your best engineer, your product launch, or your company's entire technical roadmap. Get experienced counsel before it's too late.
          </p>

          <div className="service-cta-features">
            <div className="service-cta-feature">
              <i className="fas fa-phone-volume"></i>
              <span>24-Hour RFE Response</span>
            </div>
            <div className="service-cta-feature">
              <i className="fas fa-building"></i>
              <span>Big 4 Trained</span>
            </div>
            <div className="service-cta-feature">
              <i className="fas fa-globe"></i>
              <span>Global Experience</span>
            </div>
          </div>

          <div className="service-cta-group" style={{ justifyContent: 'center' }}>
            <a href={`tel:${settings?.phone_primary || '+1-313-771-2283'}`} className="service-btn service-btn-primary" style={{ background: '#e74c3c', color: 'white' }}>
              <i className="fas fa-phone-alt"></i>
              EMERGENCY: {settings?.phone_display || '+1 (313) 771-2283'}
            </a>
            <Link to="/forms/immigration" className="service-btn service-btn-secondary">
              <i className="fas fa-clipboard-list"></i>
              Start Immigration Intake
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <EnhancedFooter />
    </>
  );
};

export default Immigration;
