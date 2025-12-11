import React, { useState, useEffect } from 'react';
import { Navigation } from '../components/Layout/Navigation';
import { EnhancedFooter } from '../components/Layout';
import { useServices } from '../contexts/ServicesContext';
import '../styles/home.css';

export const Home: React.FC = () => {
  const { getServicePrice } = useServices();
  const [timeWasted, setTimeWasted] = useState(30);
  const [finesRisk, setFinesRisk] = useState(250000);
  


  const calculateCost = () => {
    const executiveCost = timeWasted * 2500;
    const opportunityCost = timeWasted * 5000;
    return executiveCost + finesRisk + opportunityCost;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your assessment! We will respond within 4 business hours (emergency matters within 2 hours).\n\nFor urgent matters, please call +1 (313) 771-2283.');
  };

  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick as EventListener);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick as EventListener);
      });
    };
  }, []);

  return (
    <>
      {/* Emergency Bar */}
      <div className="emergency-bar">
        <div className="emergency-content">
          <div className="emergency-text">
            <i className="fas fa-exclamation-triangle"></i>
            <span>Legal Emergency? Visa Crisis? Deal Closing Tomorrow?</span>
          </div>
          <div className="emergency-actions">
            <a href="tel:+1-313-771-2283" className="emergency-btn">
              <i className="fas fa-phone"></i>
              +1 (313) 771-2283
            </a>
            <a href="#qualify" className="emergency-btn">
              <i className="fas fa-calendar-alt"></i>
              Emergency Consult
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Hero */}
      <section className="hero">
        <div className="hero-container">
          <div>
            <div className="hero-badges">
              <div className="badge">
                <i className="fas fa-briefcase"></i>
                Big 4 Trained
              </div>
              <div className="badge">
                <i className="fas fa-graduation-cap"></i>
                Oxford AI Certified
              </div>
              <div className="badge">
                <i className="fas fa-gavel"></i>
                NY & MI Bar
              </div>
              <div className="badge urgent">
                <i className="fas fa-bolt"></i>
                Limited Capacity
              </div>
            </div>

            <h1 className="hero-title">
              One Mistake Could Cost You<br /><span className="highlight">Everything You've Built</span>
            </h1>

            <p className="hero-subtitle">
              Your AI product launch. Your global expansion. Your $50M acquisition. The wrong legal counsel doesn't just slow you down—it puts everything at risk. Get Big 4-trained expertise without the conflicts, delays, and six-figure bills.
            </p>

            <div className="launch-notice">
              <h4>🚀 Now Accepting First Clients</h4>
              <p>After multiple years at top Big 4 firms handling Fortune 100 companies' business, I'm launching an independent practice focused on three critical areas: AI Governance, Global Immigration, and M&A Transactions. Limited capacity available for founding clients.</p>
            </div>

            {/* Capacity Counter */}
            <div className="capacity-alert">
              <h3 className="capacity-title">⚠️ Limited Availability This Quarter</h3>
              <div className="capacity-meter">
                <div className="capacity-fill"></div>
              </div>
              <p><strong>Client Capacity: 13% Remaining</strong></p>
              <p className="urgency-note">Next availability: 6-8 weeks for non-emergency matters</p>
            </div>

            <div className="cta-group">
              <a href="#qualify" className="btn btn-primary">
                <i className="fas fa-calendar-check"></i>
                Schedule Consultation
              </a>
              <a href="#services" className="btn btn-secondary">
                View Specialties
              </a>
            </div>
          </div>

          <div className="hero-media">
            <div className="credentials-list">
              <div className="credential">
                <div className="credential-icon">
                  <i className="fas fa-building"></i>
                </div>
                <div className="credential-text">
                  <h4>Big 4 Experience</h4>
                  <p>Multiple years at top firms handling Fortune 100 companies</p>
                </div>
              </div>

              <div className="credential">
                <div className="credential-icon">
                  <i className="fas fa-robot"></i>
                </div>
                <div className="credential-text">
                  <h4>AI Governance Certified</h4>
                  <p>Oxford University Programme Graduate</p>
                </div>
              </div>

              <div className="credential">
                <div className="credential-icon">
                  <i className="fas fa-passport"></i>
                </div>
                <div className="credential-text">
                  <h4>Immigration Expertise</h4>
                  <p>H-1B, L-1, O-1 Specialist</p>
                </div>
              </div>

              <div className="credential">
                <div className="credential-icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <div className="credential-text">
                  <h4>M&A Experience</h4>
                  <p>Tax Due Diligence & Transactions</p>
                </div>
              </div>

              <div className="credential">
                <div className="credential-icon">
                  <i className="fas fa-globe"></i>
                </div>
                <div className="credential-text">
                  <h4>Global Practice</h4>
                  <p>US & UAE Markets</p>
                </div>
              </div>
            </div>

            {/* ROI Calculator */}
            <div className="roi-calculator">
              <h3>What's Inaction Costing You?</h3>
              <div className="calc-inputs">
                <div className="calc-group">
                  <label>Days of executive time wasted:</label>
                  <input
                    type="range"
                    min="5"
                    max="90"
                    value={timeWasted}
                    onChange={(e) => setTimeWasted(parseInt(e.target.value))}
                  />
                  <span>{timeWasted} days</span>
                </div>
                <div className="calc-group">
                  <label>Potential regulatory fines:</label>
                  <select
                    value={finesRisk}
                    onChange={(e) => setFinesRisk(parseInt(e.target.value))}
                  >
                    <option value="50000">$50,000</option>
                    <option value="250000">$250,000</option>
                    <option value="1000000">$1,000,000+</option>
                    <option value="5000000">$5,000,000 + reputational damage</option>
                  </select>
                </div>
              </div>
              <div className="calc-result">
                <strong>Estimated cost of delay: ${calculateCost().toLocaleString()}</strong>
                <small>vs. our solution {getServicePrice('data-privacy')}</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Capabilities */}
      <section className="global-section">
        <div className="global-container">
          <div className="global-content">
            <h2>Serving US & Global Markets</h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.8 }}>
              Whether you're expanding from Dubai to Washington or scaling from Silicon Valley to Abu Dhabi, get counsel who understands cross-border business, US immigration requirements, and AI regulations across jurisdictions.
            </p>

            <div className="global-features">
              <div className="global-feature">
                <i className="fas fa-plane"></i>
                <div className="global-feature-text">
                  <h4>Cross-Border Transactions</h4>
                  <p>US-Global M&A and business structuring</p>
                </div>
              </div>

              <div className="global-feature">
                <i className="fas fa-passport"></i>
                <div className="global-feature-text">
                  <h4>US Immigration from around the world</h4>
                  <p>H-1B, L-1, O-1 for Global nationals</p>
                </div>
              </div>

              <div className="global-feature">
                <i className="fas fa-balance-scale"></i>
                <div className="global-feature-text">
                  <h4>Multi-Jurisdiction AI Compliance</h4>
                  <p>US & Global regulatory frameworks</p>
                </div>
              </div>

              <div className="global-feature">
                <i className="fas fa-video"></i>
                <div className="global-feature-text">
                  <h4>Virtual Consultations</h4>
                  <p>Available across time zones</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '3rem', borderRadius: '12px', border: '2px solid rgba(212, 175, 55, 0.3)' }}>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Common Scenarios We Handle:</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <i className="fas fa-check-circle" style={{ color: 'var(--accent)', fontSize: '1.25rem', marginTop: '0.25rem' }}></i>
                <span>Global entrepreneur expanding operations to United States</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <i className="fas fa-check-circle" style={{ color: 'var(--accent)', fontSize: '1.25rem', marginTop: '0.25rem' }}></i>
                <span>US tech company acquiring Global-based business</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <i className="fas fa-check-circle" style={{ color: 'var(--accent)', fontSize: '1.25rem', marginTop: '0.25rem' }}></i>
                <span>Global national seeking US work authorization</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <i className="fas fa-check-circle" style={{ color: 'var(--accent)', fontSize: '1.25rem', marginTop: '0.25rem' }}></i>
                <span>AI companies navigating US & Global compliance requirements</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How We Work Process */}
      <section id="how-we-work" className="process-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-tag">OUR PROCESS</div>
            <h2 className="section-title">How We Work Together</h2>
            <p className="section-subtitle">
              From first contact to final deliverable—a clear, efficient process with no surprises
            </p>
          </div>

          <div className="process-timeline">
            <div className="process-step">
              <div className="process-number">1</div>
              <h4>Initial Contact</h4>
              <p>Submit qualification form or call our emergency line for urgent matters</p>
              <span className="process-time">Same day</span>
            </div>

            <div className="process-step">
              <div className="process-number">2</div>
              <h4>Assessment Call</h4>
              <p>30-minute consultation to understand your situation and determine fit</p>
              <span className="process-time">Within 24 hours</span>
            </div>

            <div className="process-step">
              <div className="process-number">3</div>
              <h4>Proposal & Engagement</h4>
              <p>Clear scope of work, deliverables, timeline, and transparent pricing</p>
              <span className="process-time">48 hours</span>
            </div>

            <div className="process-step">
              <div className="process-number">4</div>
              <h4>Execution & Delivery</h4>
              <p>Regular updates, direct access, and on-time delivery of all work product</p>
              <span className="process-time">Per agreement</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Rivalis Section */}
      <section id="why-rivalis" className="impact">
        <div className="section-container">
          <div className="section-header">
            <div className="section-tag">WHY RIVALIS LAW</div>
            <h2 className="section-title">What You Get That Big Law Can't Offer</h2>
            <p className="section-subtitle">
              Elite firm expertise without the conflicts, bureaucracy, or inflated bills. Personal attention from an attorney trained at the highest levels.
            </p>
          </div>

          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-icon">
                <i className="fas fa-building"></i>
              </div>
              <div className="impact-label">Big 4 Training</div>
              <p className="impact-desc">Multiple years at top Big 4 firms handling Fortune 100 companies' complex corporate matters, immigration cases, and high-stakes transactions. You get that level of expertise without the $1,200/hour rate.</p>
            </div>

            <div className="impact-card">
              <div className="impact-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <div className="impact-label">Oxford AI Certified</div>
              <p className="impact-desc">Completed Oxford's AI Governance Programme. Most lawyers claim they understand AI—I have the certification and specialized training to prove it.</p>
            </div>

            <div className="impact-card">
              <div className="impact-icon">
                <i className="fas fa-user-tie"></i>
              </div>
              <div className="impact-label">Direct Partner Access</div>
              <p className="impact-desc">At big firms, junior associates handle your work. Here, you get direct access to an experienced attorney on every matter—no delegation to untrained staff.</p>
            </div>

            <div className="impact-card">
              <div className="impact-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="impact-label">No Conflicts of Interest</div>
              <p className="impact-desc">Big firms can't take your case because they represent your competitor. Boutique practice means we work for YOU, not a roster of conflicting clients.</p>
            </div>

            <div className="impact-card">
              <div className="impact-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <div className="impact-label">Responsive & Agile</div>
              <p className="impact-desc">Need an answer today? You'll get it. No committees, no approval chains, no waiting 3 weeks for a 15-minute call. Just direct, immediate counsel.</p>
            </div>

            <div className="impact-card">
              <div className="impact-icon">
                <i className="fas fa-hand-holding-usd"></i>
              </div>
              <div className="impact-label">Transparent Pricing</div>
              <p className="impact-desc">You see pricing upfront. No surprise bills, no nickel-and-diming for emails, no hidden fees. Know exactly what you're investing before we start.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - 3 Core */}
      <section id="services" className="services">
        <div className="section-container">
          <div className="section-header">
            <div className="section-tag">THREE CORE SPECIALIZATIONS</div>
            <h2 className="section-title">We Don't Do Everything. We Master Three Things.</h2>
            <p className="section-subtitle">
              Elite counsel in the three areas where one mistake costs millions: AI compliance, global talent mobility, and high-stakes corporate transactions.
            </p>
          </div>

          <div className="services-grid">
            {/* Service 1: AI Governance */}
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h3>AI Governance & Compliance</h3>
              <p className="service-tagline">Your Product. Their Lawsuit. Tomorrow's Headlines.</p>

              <div className="pricing-badge">
                <div className="price-range">{getServicePrice('governance')}</div>
                <div className="price-note">Enterprise frameworks: Starting at $50K</div>
              </div>

              <p>Your AI made a biased decision. A journalist is asking questions. Your Series A investor wants governance docs you don't have. EU customers demand AI Act compliance you can't prove.</p>

              <div className="roi-highlight">
                <i className="fas fa-certificate"></i>
                <strong>Why this matters:</strong> Oxford AI Programme provides technical governance training most attorneys don't have
              </div>

              <ul className="service-features">
                <li>Emergency AI risk assessment before product launch</li>
                <li>Investor-ready governance documentation</li>
                <li>EU AI Act & US regulatory compliance</li>
                <li>Crisis response for AI system issues</li>
              </ul>

              <div className="deliverables">
                <h4><i className="fas fa-clipboard-check"></i> What's Included:</h4>
                <ul>
                  <li>Risk assessment report</li>
                  <li>Governance framework</li>
                  <li>Policy documentation</li>
                  <li>Compliance roadmap</li>
                  <li>Board presentation deck</li>
                  <li>Implementation guide</li>
                </ul>
              </div>

              <div className="service-cta">
                <a href="/services/governance" className="service-cta-btn primary">
                  <i className="fas fa-bolt"></i>
                  Learn More
                </a>
                <a href="/forms/ai-governance" className="service-cta-btn secondary">
                  <i className="fas fa-calendar-check"></i>
                  Get Started
                </a>
              </div>
            </div>

            {/* Service 2: Immigration */}
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-passport"></i>
              </div>
              <h3>Global Expansion & Immigration</h3>
              <p className="service-tagline">Your Launch. Their Visa Denial. Your Disaster.</p>

              <div className="pricing-badge">
                <div className="price-range">{getServicePrice('immigration')}</div>
                <div className="price-note">O-1: Starting at $18K | RFE Emergency: Contact for pricing</div>
              </div>

              <p>Your CTO is stuck overseas. Launch is in 6 weeks. You just got an H-1B RFE with a 15-day deadline. Your star engineer's visa expires in 30 days and you have no backup.</p>

              <div className="roi-highlight">
                <i className="fas fa-award"></i>
                <strong>The advantage:</strong> Big 4 immigration experience means knowing what USCIS scrutinizes
              </div>

              <ul className="service-features">
                <li>Emergency RFE responses & visa crisis management</li>
                <li>H-1B, L-1, O-1 strategy for critical hires</li>
                <li>Same-day immigration case assessment</li>
                <li>Green card & PERM certification strategy</li>
              </ul>

              <div className="deliverables">
                <h4><i className="fas fa-clipboard-check"></i> What's Included:</h4>
                <ul>
                  <li>Complete petition package</li>
                  <li>Support letter drafting</li>
                  <li>Evidence compilation</li>
                  <li>USCIS filing</li>
                  <li>RFE response (if needed)</li>
                  <li>Status tracking</li>
                </ul>
              </div>

              <div className="service-cta">
                <a href="/services/immigration" className="service-cta-btn primary">
                  <i className="fas fa-passport"></i>
                  Learn More
                </a>
                <a href="/forms/immigration" className="service-cta-btn secondary">
                  <i className="fas fa-calendar-check"></i>
                  Get Started
                </a>
              </div>
            </div>

            {/* Service 3: M&A */}
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>M&A & Corporate Transactions</h3>
              <p className="service-tagline">Their Offer. Your Hidden Liability. Deal Over.</p>

              <div className="pricing-badge">
                <div className="price-range">{getServicePrice('ma')}</div>
                <div className="price-note">Full transaction: Starting at $75K based on deal size</div>
              </div>

              <p>You're acquiring a company. Due diligence reveals tax issues that kill the deal—or worse, you miss them. The liability clause in your LOI exposes you to millions.</p>

              <div className="roi-highlight">
                <i className="fas fa-briefcase"></i>
                <strong>What you get:</strong> Experience reviewing multimillion-dollar deals at Big 4 level
              </div>

              <ul className="service-features">
                <li>Rapid M&A due diligence that finds deal-killers early</li>
                <li>Tax liability identification & structuring</li>
                <li>Transaction structuring for maximum value</li>
                <li>Deal rescue when other counsel missed issues</li>
              </ul>

              <div className="deliverables">
                <h4><i className="fas fa-clipboard-check"></i> What's Included:</h4>
                <ul>
                  <li>Due diligence report</li>
                  <li>Risk analysis memo</li>
                  <li>Tax structure recommendations</li>
                  <li>Deal documentation review</li>
                  <li>Negotiation support</li>
                  <li>Closing coordination</li>
                </ul>
              </div>

              <div className="service-cta">
                <a href="/services/ma" className="service-cta-btn primary">
                  <i className="fas fa-handshake"></i>
                  Learn More
                </a>
                <a href="/intake" className="service-cta-btn secondary">
                  <i className="fas fa-calendar-check"></i>
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Select Services */}
      <section id="select-services" className="select-services">
        <div className="section-container">
          <div className="section-header">
            <div className="section-tag">ADDITIONAL SERVICES</div>
            <h2 className="section-title">Select Legal Services</h2>
            <p className="section-subtitle">
              Beyond our three core specializations, we offer targeted services for specific business needs
            </p>
          </div>

          <div className="select-services-grid">
            <a href="/services/contracts" className="select-service-card">
              <div className="select-icon">
                <i className="fas fa-file-contract"></i>
              </div>
              <h4>Contract Review & Drafting</h4>
              <p>Get expert eyes on your vendor agreements, NDAs, employment contracts, and partnership deals before you sign.</p>
              <div className="select-pricing">{getServicePrice('contracts')}</div>
              <div className="select-cta">
                Request Quote <i className="fas fa-arrow-right"></i>
              </div>
            </a>

            <a href="/services/data-privacy" className="select-service-card">
              <div className="select-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h4>Data Privacy Compliance</h4>
              <p>GDPR, CCPA, and privacy policy development for companies handling customer data.</p>
              <div className="select-pricing">{getServicePrice('data-privacy')}</div>
              <div className="select-cta">
                Learn More <i className="fas fa-arrow-right"></i>
              </div>
            </a>

            <a href="/services/ip-strategy" className="select-service-card">
              <div className="select-icon">
                <i className="fas fa-copyright"></i>
              </div>
              <h4>IP Strategy & Protection</h4>
              <p>Trademark filings, trade secret protection, and IP portfolio development for growing companies.</p>
              <div className="select-pricing">{getServicePrice('ip-strategy')}</div>
              <div className="select-cta">
                Discuss IP Needs <i className="fas fa-arrow-right"></i>
              </div>
            </a>

            <a href="/services/fraud-investigation" className="select-service-card">
              <div className="select-icon">
                <i className="fas fa-search"></i>
              </div>
              <h4>Corporate Fraud Investigation</h4>
              <p>Whistleblower allegations, financial irregularities, or executive misconduct threatening your company's survival. Get privileged investigation before regulators or journalists do.</p>
              <div className="select-pricing">{getServicePrice('fraud-investigation')}</div>
              <div className="select-cta">
                Confidential Emergency Line <i className="fas fa-arrow-right"></i>
              </div>
            </a>

            <a href="/services/employment" className="select-service-card">
              <div className="select-icon">
                <i className="fas fa-users"></i>
              </div>
              <h4>Employment Law Counsel</h4>
              <p>Offer letters, employee handbooks, termination guidance, and HR compliance for scaling teams.</p>
              <div className="select-pricing">{getServicePrice('employment')}</div>
              <div className="select-cta">
                Get HR Support <i className="fas fa-arrow-right"></i>
              </div>
            </a>

            <a href="/services/fundraising" className="select-service-card">
              <div className="select-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h4>Fundraising & Securities</h4>
              <p>SAFE agreements, convertible notes, and Series A preparation for venture-backed companies.</p>
              <div className="select-pricing">{getServicePrice('fundraising')}</div>
              <div className="select-cta">
                Prepare for Funding <i className="fas fa-arrow-right"></i>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section id="why-choose" className="testimonials">
        <div className="section-container">
          <div className="section-header">
            <div className="section-tag">THE RIVALIS EXPERIENCE</div>
            <h2 className="section-title">What Working Together Looks Like</h2>
            <p className="section-subtitle">
              Here's what you can expect when you work with Rivalis Law—from first contact to final deliverable
            </p>
          </div>

          <div className="testimonial-grid">
            <div className="testimonial">
              <div className="stars"><i className="fas fa-comments"></i></div>
              <h4 style={{fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary)'}}>You'll Have Direct Access</h4>
              <p className="testimonial-text">
                When you reach out, you'll speak directly with me—not an intake coordinator, not a junior associate. Your matters get personal attention from experienced counsel, not delegation to someone learning on your time.
              </p>
            </div>

            <div className="testimonial">
              <div className="stars"><i className="fas fa-clock"></i></div>
              <h4 style={{fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary)'}}>You'll Get Responsive Communication</h4>
              <p className="testimonial-text">
                Urgent matters get same-day responses. Standard questions within 24 hours. You'll never wonder if your email got lost or if anyone's working on your case. Clear timelines, regular updates, proactive communication.
              </p>
            </div>

            <div className="testimonial">
              <div className="stars"><i className="fas fa-file-invoice-dollar"></i></div>
              <h4 style={{fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary)'}}>You'll Know What You're Paying</h4>
              <p className="testimonial-text">
                Before we start, you'll see the investment required. Most matters are fixed-fee or have clear price ranges. No surprise bills for reading emails. No anxiety about the meter running. Just transparent pricing for defined work.
              </p>
            </div>

            <div className="testimonial">
              <div className="stars"><i className="fas fa-handshake"></i></div>
              <h4 style={{fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary)'}}>You'll Work With Someone Who Gets It</h4>
              <p className="testimonial-text">
                Whether it's AI product risks, visa timelines, or M&A tax issues—you'll work with counsel who has Big 4 training and specialized expertise. Technical knowledge meets practical business understanding.
              </p>
            </div>
          </div>

          <div style={{marginTop: '4rem', textAlign: 'center', padding: '3rem', background: 'var(--accent-light)', borderRadius: '12px', border: '2px solid var(--accent)'}}>
            <h3 style={{fontSize: '1.75rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1.5rem', fontFamily: '"Cormorant Garamond", serif'}}>The Promise</h3>
            <p style={{fontSize: '1.15rem', color: 'var(--gray-700)', maxWidth: '850px', margin: '0 auto 1.5rem', lineHeight: 1.8}}>
              Elite-firm expertise without the bureaucracy. Specialized knowledge without the conflicts. Partner-level attention without the partner-level bill. This is what boutique counsel should feel like.
            </p>
            <p style={{fontSize: '1rem', color: 'var(--gray-600)', maxWidth: '750px', margin: '0 auto', lineHeight: 1.7}}>
              If at any point you're not getting responsive, high-quality counsel with transparent pricing—you'll let me know, and we'll fix it immediately. That's the commitment.
            </p>
          </div>
        </div>
      </section>

      {/* Qualification Section */}
      <section id="qualify" className="qualification-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-tag">WORK WITH US</div>
            <h2 className="section-title">Is Rivalis Law Right for Your Situation?</h2>
            <p className="section-subtitle">We work with companies facing high-stakes legal challenges where failure isn't an option. Answer a few questions to see if we're the right fit.</p>
          </div>

          <div className="qualification-tiers">
            <div className="tier-card">
              <div className="tier-icon">
                <i className="fas fa-seedling"></i>
              </div>
              <h4>For Growth Companies</h4>
              <ul>
                <li>Pre-Series A to Series B startups</li>
                <li>Scaling teams internationally</li>
                <li>Launching AI products</li>
                <li>First significant acquisition</li>
              </ul>
              <div className="tier-investment">Typical investment: $15K-$75K</div>
            </div>

            <div className="tier-card featured">
              <div className="tier-badge">Most Common</div>
              <div className="tier-icon">
                <i className="fas fa-building"></i>
              </div>
              <h4>For Enterprise</h4>
              <ul>
                <li>Fortune 1000 companies</li>
                <li>Complex M&A transactions</li>
                <li>Enterprise AI compliance</li>
                <li>Large-scale immigration programs</li>
              </ul>
              <div className="tier-investment">Typical investment: $50K-$250K+</div>
            </div>
          </div>

          <div className="qualification-form">
            <h3>Get Started: Quick Assessment</h3>
            <form onSubmit={handleFormSubmit}>

              <div className="form-group">
                <label>What's your primary legal challenge? *</label>
                <select required>
                  <option value="">Select one...</option>
                  <option value="ai">AI Governance & Compliance Crisis</option>
                  <option value="immigration">Immigration/Visa Emergency (RFE, denial, urgent hire)</option>
                  <option value="ma">M&A Due Diligence or Transaction</option>
                  <option value="other">Other Complex Legal Matter</option>
                </select>
              </div>

              <div className="form-group">
                <label>Timeline urgency? *</label>
                <select required>
                  <option value="">Select one...</option>
                  <option value="emergency">Emergency (24-72 hours)</option>
                  <option value="urgent">Urgent (1-2 weeks)</option>
                  <option value="normal">Standard (2-4 weeks)</option>
                  <option value="planning">Strategic Planning (1-3 months)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Company stage/size? *</label>
                <select required>
                  <option value="">Select one...</option>
                  <option value="startup">Startup (Pre-Series A to Series B)</option>
                  <option value="growth">Growth Company (Series C+ or $10M-$100M revenue)</option>
                  <option value="enterprise">Enterprise ($100M+ revenue or Fortune 1000)</option>
                  <option value="individual">Individual/Small Business</option>
                </select>
              </div>

              <div className="form-group">
                <label>Estimated legal investment budget? *</label>
                <select required>
                  <option value="">Select one...</option>
                  <option value="under25">Under $25,000</option>
                  <option value="25-75">$25,000 - $75,000</option>
                  <option value="75-150">$75,000 - $150,000</option>
                  <option value="150plus">$150,000+</option>
                  <option value="unsure">Not sure / Need guidance</option>
                </select>
              </div>

              <div className="form-group">
                <label>Your email *</label>
                <input type="email" required placeholder="you@company.com" />
              </div>

              <div className="form-group">
                <label>Phone (for urgent matters) *</label>
                <input type="tel" required placeholder="+1 (313) 771-2283" />
              </div>

              <div className="form-group">
                <label>Brief description of situation (optional)</label>
                <textarea rows={3} placeholder="Help us understand your challenge..." />
              </div>

              <button type="submit" className="form-submit-btn">
                <i className="fas fa-paper-plane"></i>
                Submit Assessment
              </button>

              <div className="form-note">
                <i className="fas fa-lock"></i>
                Confidential. We'll respond within 4 business hours (emergency matters within 2 hours).
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="cta-section">
        <div className="section-container">
          <h2>The Cost of Waiting Is Higher Than You Think</h2>
          <p>
            Your competitor just closed their Series B with airtight AI governance. Your visa petition was denied—again. Your acquisition is bleeding money in extended due diligence. Every day without elite counsel is a day your business is vulnerable.
          </p>
          <div className="urgency">
            ⚡ Only 3 Client Slots Available This Quarter
          </div>

          <div className="value-props">
            <div className="value-prop">
              <i className="fas fa-check-circle"></i>
              <span>Big 4 Experience</span>
            </div>
            <div className="value-prop">
              <i className="fas fa-check-circle"></i>
              <span>Oxford AI Certified</span>
            </div>
            <div className="value-prop">
              <i className="fas fa-check-circle"></i>
              <span>Measurable Results</span>
            </div>
            <div className="value-prop">
              <i className="fas fa-check-circle"></i>
              <span>100% Compliance</span>
            </div>
            <div className="value-prop">
              <i className="fas fa-check-circle"></i>
              <span>Transparent Pricing</span>
            </div>
            <div className="value-prop">
              <i className="fas fa-check-circle"></i>
              <span>Confidential Counsel</span>
            </div>
          </div>

          <div className="cta-group" style={{justifyContent: 'center'}}>
            <a href="#qualify" className="btn btn-primary" style={{fontSize: '1.1rem', padding: '1.375rem 2.75rem'}}>
              <i className="fas fa-calendar-check"></i>
              Start Assessment
            </a>
            <a href="tel:+1-313-771-2283" className="btn btn-secondary" style={{fontSize: '1.1rem', padding: '1.375rem 2.75rem', background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.3)', color: 'white'}}>
              <i className="fas fa-phone"></i>
              Call: +1 (313) 771-2283
            </a>
          </div>

          <div style={{marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.2)'}}>
            <p style={{opacity: 0.7, fontSize: '1rem'}}>
              <i className="fas fa-map-marker-alt" style={{marginRight: '0.5rem'}}></i>
              Washington, DC Office | Licensed in NY & MI | Big 4 Trained | Serving Clients Globally
            </p>
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </>
  );
};

export default Home;
