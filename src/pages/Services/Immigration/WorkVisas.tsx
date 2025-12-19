import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../../components/Layout/Navigation';
import { EnhancedFooter } from '../../../components/Layout';
import { useSiteSettings } from '../../../hooks/useSiteSettings';
import '../../../styles/service-page.css';
import '../../../styles/home.css';

export const WorkVisas: React.FC = () => {
  const { settings } = useSiteSettings();
  const workVisaStyles = `
    .work-visa-hero {
      background: linear-gradient(165deg, #1a1a2e 0%, #2d3748 100%);
      padding: 8rem 3rem 6rem;
      position: relative;
      overflow: hidden;
    }
    .work-visa-hero::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 50%;
      height: 100%;
      background: linear-gradient(135deg, rgba(231, 76, 60, 0.15) 0%, transparent 100%);
      pointer-events: none;
    }
    .work-visa-breadcrumb {
      display: flex;
      gap: 0.75rem;
      align-items: center;
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.95rem;
      margin-bottom: 2rem;
    }
    .work-visa-breadcrumb a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: color 0.3s;
    }
    .work-visa-breadcrumb a:hover {
      color: white;
    }
    .work-visa-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      background: rgba(231, 76, 60, 0.2);
      border: 2px solid #e74c3c;
      padding: 0.75rem 1.5rem;
      border-radius: 50px;
      color: white;
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 2.5rem;
    }
    .work-visa-badge i {
      color: #e74c3c;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .work-visa-hero h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 4.5rem;
      font-weight: 800;
      color: white;
      line-height: 1.1;
      margin-bottom: 2rem;
      max-width: 1100px;
    }
    .work-visa-hero h1 .highlight {
      color: #e74c3c;
    }
    .work-visa-subtitle {
      font-size: 1.3rem;
      color: rgba(255, 255, 255, 0.9);
      line-height: 1.8;
      max-width: 950px;
      margin-bottom: 3rem;
    }
    .work-visa-stats {
      display: flex;
      gap: 4rem;
      flex-wrap: wrap;
    }
    .work-visa-stat {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .work-visa-stat-number {
      font-size: 3rem;
      font-weight: 900;
      color: #e74c3c;
      line-height: 1;
    }
    .work-visa-stat-label {
      font-size: 0.95rem;
      color: rgba(255, 255, 255, 0.8);
      font-weight: 500;
    }
    .services-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2.5rem;
      margin-bottom: 4rem;
    }
    .service-card {
      background: white;
      border: 2px solid #e8ecf0;
      border-radius: 16px;
      padding: 2.5rem;
      transition: all 0.3s;
    }
    .service-card:hover {
      transform: translateY(-5px);
      border-color: #e74c3c;
      box-shadow: 0 12px 40px rgba(231, 76, 60, 0.15);
    }
    .service-card.rfe-emergency {
      border: 3px solid #e74c3c;
    }
    .service-icon {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, #fadbd8 0%, #fff 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
    }
    .service-icon i {
      font-size: 1.75rem;
      color: #e74c3c;
    }
    .service-icon.emergency {
      background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
    }
    .service-icon.emergency i {
      color: white;
    }
    .service-card h3 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #1a1a2e;
    }
    .service-card p {
      color: #4a5568;
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }
    .service-meta {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }
    .service-meta span {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.95rem;
      color: #4a5568;
    }
    .service-meta i {
      color: #e74c3c;
    }
    .service-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: white;
      background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
      padding: 0.875rem 1.75rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s;
    }
    .service-link:hover {
      transform: translateX(5px);
      box-shadow: 0 6px 20px rgba(231, 76, 60, 0.3);
    }
  `;

  return (
    <>
      <style>{workVisaStyles}</style>
      <Navigation />

      {/* Hero Section */}
      <section className="work-visa-hero">
        <div className="service-hero-container" style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="work-visa-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services/immigration">Immigration</Link>
            <span>/</span>
            <span>Work Visas</span>
          </div>

          <div className="work-visa-badge">
            <i className="fas fa-exclamation-triangle"></i>
            <span>24-HOUR RFE EMERGENCY RESPONSE AVAILABLE</span>
          </div>

          <h1>
            Your $200K Engineer Just Got an RFE.<br/>
            <span className="highlight">Your Product Launch Is 6 Weeks Away.</span>
          </h1>

          <p className="work-visa-subtitle">
            One immigration mistake costs you your best talent, delays your product by quarters, or kills your funding round entirely. 
            The visa denial that destroys your startup won't come with a warning—it'll come 30 days before your H-1B expires. 
            We prevent that catastrophe before it happens. And when it does? We fix it in 24 hours, not "sometime next week."
          </p>

          <div className="work-visa-stats">
            <div className="work-visa-stat">
              <span className="work-visa-stat-number">500+</span>
              <span className="work-visa-stat-label">H-1B Petitions Filed</span>
            </div>
            <div className="work-visa-stat">
              <span className="work-visa-stat-number">24hrs</span>
              <span className="work-visa-stat-label">RFE Emergency Response</span>
            </div>
            <div className="work-visa-stat">
              <span className="work-visa-stat-number">92%</span>
              <span className="work-visa-stat-label">RFE Approval Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Types Section */}
      <section className="section" style={{ padding: '6rem 3rem' }}>
        <div className="section-container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-tag" style={{ display: 'inline-block', background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c', padding: '0.5rem 1.25rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', marginBottom: '1.5rem' }}>
              SIX VISA PATHWAYS
            </span>
            <h2 className="section-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3.5rem', fontWeight: 800, color: '#1a1a2e', lineHeight: 1.2, marginBottom: '1.5rem' }}>Every Visa Type That Matters for Tech Companies</h2>
            <p className="section-description" style={{ fontSize: '1.2rem', color: '#4a5568', maxWidth: '900px', margin: '0 auto', lineHeight: 1.8 }}>
              From emergency RFE responses to O-1 genius visas, we handle the immigration work that keeps your company moving.
            </p>
          </div>

          <div className="services-grid">
            {/* H-1B Card */}
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <h3>H-1B Specialty Occupation</h3>
              <p>
                Your engineer. Your data scientist. Your product manager. The H-1B that lets you hire the talent 
                U.S. universities can't produce fast enough. We handle the lottery, the LCA, the petition—everything 
                that stands between "offer accepted" and "visa approved."
              </p>
              <div className="service-meta">
                <span><i className="fas fa-clock"></i> Processing: 2-6 months (premium: 15 days)</span>
                <span><i className="fas fa-calendar-alt"></i> Duration: 3 years (renewable to 6)</span>
                <span><i className="fas fa-dollar-sign"></i> Minimum: Bachelor's degree required</span>
              </div>
            </div>

            {/* L-1 Card */}
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-building"></i>
              </div>
              <h3>L-1 Intracompany Transfer</h3>
              <p>
                Opening a U.S. office? Transferring your London dev lead to San Francisco? The L-1 moves your key 
                people between your international offices. No lottery. No prevailing wage drama. Just proof that 
                they've worked for you abroad for 12+ months and they're coming to run something important.
              </p>
              <div className="service-meta">
                <span><i className="fas fa-clock"></i> Processing: 2-4 months (premium: 15 days)</span>
                <span><i className="fas fa-calendar-alt"></i> Duration: Up to 7 years (L-1A), 5 years (L-1B)</span>
                <span><i className="fas fa-globe"></i> Requirements: 1 year foreign employment</span>
              </div>
            </div>

            {/* O-1 Card */}
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <h3>O-1 Extraordinary Ability</h3>
              <p>
                Your PhD with 40 publications. Your AI researcher cited 1,000+ times. The visa for people who've 
                already proven they're exceptional. Not "good." Not "really smart." Extraordinary. We build the 
                narrative that proves it—publications, citations, judging roles, awards that matter.
              </p>
              <div className="service-meta">
                <span><i className="fas fa-clock"></i> Processing: 2-3 months (premium: 15 days)</span>
                <span><i className="fas fa-calendar-alt"></i> Duration: Up to 3 years (unlimited renewals)</span>
                <span><i className="fas fa-award"></i> Standard: Extraordinary achievement</span>
              </div>
            </div>

            {/* TN Card */}
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-flag"></i>
              </div>
              <h3>TN NAFTA Professional</h3>
              <p>
                Canadian or Mexican citizen? The TN visa is your fast track to working in the U.S. No lottery. 
                No Labor Condition Application. Just proof you're a professional in one of the qualifying 
                occupations—engineer, scientist, accountant, management consultant—and you're good to go.
              </p>
              <div className="service-meta">
                <span><i className="fas fa-clock"></i> Processing: Immediate at border/port of entry</span>
                <span><i className="fas fa-calendar-alt"></i> Duration: 3 years (unlimited renewals)</span>
                <span><i className="fas fa-passport"></i> Eligibility: Canadian or Mexican citizens only</span>
              </div>
            </div>

            {/* E-3 Card */}
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-plane"></i>
              </div>
              <h3>E-3 Australian Specialty</h3>
              <p>
                Australian citizen? The E-3 is basically an H-1B without the lottery nightmare. 10,500 visas set 
                aside exclusively for Australians every year, and they never run out. Same specialty occupation 
                rules as H-1B, but you'll actually get the visa.
              </p>
              <div className="service-meta">
                <span><i className="fas fa-clock"></i> Processing: 2-3 months</span>
                <span><i className="fas fa-calendar-alt"></i> Duration: 2 years (unlimited renewals)</span>
                <span><i className="fas fa-passport"></i> Eligibility: Australian citizens only</span>
              </div>
            </div>

            {/* RFE Emergency Card */}
            <div className="service-card rfe-emergency">
              <div className="service-icon emergency">
                <i className="fas fa-ambulance"></i>
              </div>
              <h3>RFE Emergency Response</h3>
              <p>
                Got an RFE? You have 87 days to respond before your petition dies. Most firms will tell you 
                "we'll get to it next week." We respond in 24 hours with a complete evidence package that 
                addresses every single question USCIS asked. This is the service that saves your company when 
                the visa clock is ticking.
              </p>
              <div className="service-meta">
                <span><i className="fas fa-bolt"></i> Response Time: 24 hours</span>
                <span><i className="fas fa-check-circle"></i> Success Rate: 92% approval</span>
                <span><i className="fas fa-phone-alt"></i> Availability: 24/7 intake</span>
              </div>
              <Link to="/forms/work-visa-intake" className="service-link">
                Emergency RFE Response <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* $499 Consultation Value Box */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #fafbfc 0%, #ffffff 100%)', padding: '6rem 3rem' }}>
        <div className="section-container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ background: 'white', border: '3px solid #e74c3c', borderRadius: '24px', padding: '4rem 3rem', boxShadow: '0 20px 60px rgba(231, 76, 60, 0.15)', maxWidth: '1100px', margin: '0 auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{ display: 'inline-block', background: 'rgba(231, 76, 60, 0.1)', padding: '0.75rem 2rem', borderRadius: '50px', marginBottom: '1.5rem' }}>
                <span style={{ color: '#e74c3c', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '1px' }}>⚡ LIMITED AVAILABILITY</span>
              </div>
              
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.75rem', fontWeight: 800, color: '#1a1a2e', lineHeight: 1.2, marginBottom: '1rem' }}>
                Why We Charge $499 for Consultation<br/>
                <span style={{ color: '#e74c3c' }}>(And Why Smart Clients Gladly Pay It)</span>
              </h2>
              
              <p style={{ fontSize: '1.25rem', color: '#4a5568', lineHeight: 1.7, maxWidth: '850px', margin: '0 auto' }}>
                Most immigration attorneys offer "free consultations" where you get 15 minutes of generic advice before they try to sell you. <strong style={{ color: '#1a1a2e' }}>We don't play that game.</strong>
              </p>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #f7fafc 0%, #ffffff 100%)', border: '2px dashed #e74c3c', borderRadius: '16px', padding: '3rem 2.5rem', marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '2rem', textAlign: 'center' }}>
                What You Get in Your $499 Visa Case Assessment:
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #e74c3c' }}>
                  <div style={{ flexShrink: 0, width: '32px', height: '32px', background: '#e74c3c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>✓</div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: '1.1rem', color: '#1a1a2e' }}>60-Minute Deep-Dive Case Analysis</strong> (Not 15min Generic Advice)
                    <div style={{ color: '#e74c3c', fontWeight: 700, marginTop: '0.25rem' }}>$1,500 Value</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #e74c3c' }}>
                  <div style={{ flexShrink: 0, width: '32px', height: '32px', background: '#e74c3c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>✓</div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: '1.1rem', color: '#1a1a2e' }}>RFE Risk Assessment & Prevention Strategy</strong>
                    <div style={{ color: '#e74c3c', fontWeight: 700, marginTop: '0.25rem' }}>$750 Value</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #e74c3c' }}>
                  <div style={{ flexShrink: 0, width: '32px', height: '32px', background: '#e74c3c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>✓</div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: '1.1rem', color: '#1a1a2e' }}>Honest Approval Probability Assessment</strong> (We Tell You "No" If Case Is Weak)
                    <div style={{ color: '#e74c3c', fontWeight: 700, marginTop: '0.25rem' }}>$500 Value</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #e74c3c' }}>
                  <div style={{ flexShrink: 0, width: '32px', height: '32px', background: '#e74c3c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>✓</div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: '1.1rem', color: '#1a1a2e' }}>Evidence Requirements & Documentation Checklist</strong>
                    <div style={{ color: '#e74c3c', fontWeight: 700, marginTop: '0.25rem' }}>$1,200 Value</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #e74c3c' }}>
                  <div style={{ flexShrink: 0, width: '32px', height: '32px', background: '#e74c3c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>✓</div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: '1.1rem', color: '#1a1a2e' }}>Alternative Visa Pathway Analysis</strong> (If Primary Path Has Issues)
                    <div style={{ color: '#e74c3c', fontWeight: 700, marginTop: '0.25rem' }}>$600 Value</div>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '3px solid #e74c3c', paddingTop: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem', color: '#4a5568', marginBottom: '0.5rem' }}>Total Value if Purchased Separately:</div>
                <div style={{ fontSize: '2rem', fontWeight: 300, color: '#9ca3af', textDecoration: 'line-through', marginBottom: '0.5rem' }}>$4,550</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>Your Investment Today: <span style={{ fontSize: '2.5rem', color: '#e74c3c' }}>$499</span></div>
                
                <div style={{ background: 'rgba(231, 76, 60, 0.08)', padding: '1.5rem', borderRadius: '12px', marginTop: '1.5rem' }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '0.5rem' }}>
                    🎯 PLUS: 100% Credited to Retainer If You Hire Us
                  </div>
                  <div style={{ fontSize: '1.05rem', color: '#4a5568', lineHeight: 1.6 }}>
                    Meaning: You're not paying $499 for consultation. You're making a <strong>fully refundable deposit</strong> on expertise that saves you from wasting money on a weak visa petition that gets denied.
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: '#fffbeb', borderLeft: '4px solid #f59e0b', padding: '2rem', borderRadius: '12px', marginBottom: '3rem' }}>
              <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#78350f', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>⚠️</span> This Consultation Is NOT For Everyone
              </h4>
              <p style={{ fontSize: '1.05rem', color: '#78350f', lineHeight: 1.7, marginBottom: '1rem' }}>
                <strong>Don't book this consultation if:</strong>
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                <li style={{ padding: '0.5rem 0', color: '#78350f', fontSize: '1.05rem' }}>❌ You're just "shopping around" for free advice</li>
                <li style={{ padding: '0.5rem 0', color: '#78350f', fontSize: '1.05rem' }}>❌ You want someone to "just file something and see what happens"</li>
                <li style={{ padding: '0.5rem 0', color: '#78350f', fontSize: '1.05rem' }}>❌ You're not willing to invest in building a bulletproof case</li>
              </ul>
              <p style={{ fontSize: '1.05rem', color: '#78350f', lineHeight: 1.7, margin: 0, fontWeight: 600 }}>
                This consultation is for serious clients who understand that immigration strategy is worth paying for—and who want the truth, not false hope.
              </p>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '2rem', background: '#f0fdf4', borderRadius: '12px' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#16a34a', marginBottom: '0.5rem' }}>92%</div>
              <div style={{ fontSize: '1.2rem', color: '#166534', fontWeight: 700 }}>Consultation-to-Client Conversion Rate</div>
              <p style={{ fontSize: '1rem', color: '#15803d', marginTop: '1rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                Not because we're good salespeople—because our cases WIN. When you invest $499 in expert analysis, you discover whether your case is strong enough to file. Most are. Some aren't. Either way, you know the truth.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link to="/forms/work-visa-intake" style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)', color: 'white', padding: '1.75rem 4rem', borderRadius: '16px', textDecoration: 'none', fontWeight: 900, fontSize: '1.3rem', boxShadow: '0 12px 40px rgba(231, 76, 60, 0.3)', transition: 'all 0.3s', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <i className="fas fa-calendar-check" style={{ fontSize: '1.5rem' }}></i>
                Claim Your $499 Assessment Slot
              </Link>
              
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'inline-block', background: '#fee2e2', border: '2px solid #ef4444', padding: '0.75rem 1.5rem', borderRadius: '8px' }}>
                  <span style={{ color: '#991b1b', fontWeight: 700, fontSize: '0.95rem' }}>
                    ⚡ Only 3 consultation slots available this week
                  </span>
                </div>
              </div>

              <p style={{ marginTop: '2rem', fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.6 }}>
                After booking, you'll receive a pre-consultation checklist to maximize our 60 minutes together.<br/>
                Payment required to secure slot. 100% credited to retainer if you proceed.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Elite Green Card Services Section */}
      <section className="section" style={{ background: '#f9fafb', padding: '6rem 3rem' }}>
        <div className="section-container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ background: 'linear-gradient(165deg, #1a1a2e 0%, #2d3748 100%)', borderRadius: '24px', padding: '4rem', position: 'relative', overflow: 'hidden', color: 'white' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, transparent 100%)', pointerEvents: 'none' }}></div>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(212, 175, 55, 0.2)', border: '2px solid #d4af37', padding: '0.75rem 1.5rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', marginBottom: '2rem', textTransform: 'uppercase' }}>
                <i className="fas fa-crown" style={{ color: '#d4af37' }}></i>
                <span>Elite Immigration Services</span>
              </div>

              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.2 }}>
                You're Not Here For a Work Visa.<br/>
                <span style={{ color: '#d4af37' }}>You're Here Because $2M-$50M Is on the Line.</span>
              </h2>

              <p style={{ fontSize: '1.25rem', lineHeight: 1.8, marginBottom: '3rem', opacity: 0.95, maxWidth: '900px' }}>
                The Nobel Prize winner who can't wait 6 months for H-1B lottery luck. The entrepreneur deploying $1.05M who needs bulletproof compliance, not "we'll figure it out." The researcher whose breakthrough could reshape an industry—if USCIS doesn't destroy it with a denial. This isn't about filing forms. This is about permanent U.S. residence for people whose work is worth seven figures minimum.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '2rem', transition: 'all 0.3s' }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(212, 175, 55, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <i className="fas fa-award" style={{ fontSize: '1.5rem', color: '#d4af37' }}></i>
                  </div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>EB-1 Extraordinary Ability</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                    8,000 citations. Keynote at top conferences. Still stuck in H-1B hell? The EB-1 path doesn't depend on employer sponsorship or lottery luck.
                  </p>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '2rem', transition: 'all 0.3s' }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(212, 175, 55, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <i className="fas fa-lightbulb" style={{ fontSize: '1.5rem', color: '#d4af37' }}></i>
                  </div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>EB-2 National Interest Waiver</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                    Your AI research could reshape healthcare. Your clean energy startup could decarbonize an industry. Matter of Dhanasar opened this path for entrepreneurs.
                  </p>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '2rem', transition: 'all 0.3s' }}>
                  <div style={{ width: '48px', height: '48px', background: 'rgba(212, 175, 55, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <i className="fas fa-building" style={{ fontSize: '1.5rem', color: '#d4af37' }}></i>
                  </div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>EB-5 Investor Program</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                    $1.05M investment. Permanent residence for your entire family. But 60% fail on source of funds documentation. We audit your capital BEFORE you file.
                  </p>
                </div>
              </div>

              <Link 
                to="/services/immigration"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
                  color: 'white',
                  padding: '1.25rem 2.5rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  transition: 'all 0.3s'
                }}
              >
                <i className="fas fa-arrow-right"></i>
                Explore Elite Green Card Options
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Breakdown Section */}
      <section className="section" style={{ background: 'linear-gradient(165deg, #1a1a2e 0%, #2d3748 100%)', padding: '5rem 3rem' }}>
        <div className="section-container" style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, transparent 100%)', pointerEvents: 'none' }}></div>
          
          <div style={{ position: 'relative', zIndex: 1, color: 'white' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(212, 175, 55, 0.2)', border: '2px solid #d4af37', padding: '0.75rem 1.5rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', marginBottom: '2rem', textTransform: 'uppercase' }}>
              <i className="fas fa-star" style={{ color: '#d4af37' }}></i>
              <span>$499 STRATEGIC CONSULTATION</span>
            </div>

            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.2 }}>
              The $499 Work Visa Strategy Session: <span style={{ color: '#d4af37' }}>What You Actually Get</span>
            </h2>

            <p style={{ fontSize: '1.25rem', lineHeight: 1.8, marginBottom: '3rem', opacity: 0.95, maxWidth: '900px' }}>
              Most immigration lawyers charge you $3,000+ and then send a paralegal to figure out which visa you need. 
              We give you the actual strategy—which visa, which pathway, what evidence you need, and what's going to kill your case—for $499.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '2rem', transition: 'all 0.3s' }}>
                <div style={{ width: '48px', height: '48px', background: 'rgba(212, 175, 55, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <i className="fas fa-clipboard-check" style={{ fontSize: '1.5rem', color: '#d4af37' }}></i>
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Visa Pathway Analysis</h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  H-1B vs. L-1 vs. O-1? We tell you which visa actually works for your situation, not which one makes us the most money.
                </p>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '2rem', transition: 'all 0.3s' }}>
                <div style={{ width: '48px', height: '48px', background: 'rgba(212, 175, 55, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <i className="fas fa-file-contract" style={{ fontSize: '1.5rem', color: '#d4af37' }}></i>
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Evidence Requirements</h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  Exactly what documentation you need to collect now, not six weeks before the deadline when it's too late.
                </p>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '2rem', transition: 'all 0.3s' }}>
                <div style={{ width: '48px', height: '48px', background: 'rgba(212, 175, 55, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <i className="fas fa-exclamation-triangle" style={{ fontSize: '1.5rem', color: '#d4af37' }}></i>
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Risk Assessment</h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  The red flags USCIS will use to deny your case—and how to eliminate them before you file.
                </p>
              </div>
            </div>

            <Link 
              to="/forms/work-visa-intake"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
                color: 'white',
                padding: '1.25rem 2.5rem',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '1.1rem',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(212, 175, 55, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Schedule $499 Strategy Session <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Big 4 Credibility Section */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #f7fafc 0%, #ffffff 100%)', padding: '6rem 3rem' }}>
        <div className="section-container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ background: 'linear-gradient(180deg, #f7fafc 0%, #ffffff 100%)', borderRadius: '24px', padding: '4rem', border: '2px solid #e8ecf0' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{ display: 'inline-block', background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c', padding: '0.5rem 1.25rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', marginBottom: '1.5rem' }}>
                BIG 4 METHODOLOGY
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.75rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '1rem', lineHeight: 1.2 }}>
                Why Tech Companies Trust Our Work Visa Practice
              </h2>
              <p style={{ fontSize: '1.15rem', color: '#4a5568', maxWidth: '800px', margin: '0 auto', lineHeight: 1.7 }}>
                We bring Big 4 due diligence to immigration petitions. That means documentation standards that survive audits, 
                evidence organization that impresses adjudicators, and risk analysis that prevents denials.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5rem' }}>
              <div style={{ background: 'white', border: '2px solid #e8ecf0', borderRadius: '16px', padding: '2.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>
                  Documentation That Survives RFEs
                </h3>
                <p style={{ color: '#4a5568', lineHeight: 1.7 }}>
                  90% of RFEs happen because the initial petition didn't include enough evidence. We file petitions with the 
                  documentation that prevents RFEs from happening—complete employer verification, detailed job descriptions, 
                  wage data that matches the LCA, and educational evaluations that actually prove equivalency.
                </p>
              </div>

              <div style={{ background: 'white', border: '2px solid #e8ecf0', borderRadius: '16px', padding: '2.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>
                  Premium Processing Strategy
                </h3>
                <p style={{ color: '#4a5568', lineHeight: 1.7 }}>
                  When you need the answer in 15 days, not 6 months, premium processing matters. But premium processing 
                  doesn't mean "sloppy work filed fast." We use premium processing strategically—when the case is ready, 
                  when the evidence is complete, when getting the visa now changes your company's trajectory.
                </p>
              </div>

              <div style={{ background: 'white', border: '2px solid #e8ecf0', borderRadius: '16px', padding: '2.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>
                  H-1B Lottery Intelligence
                </h3>
                <p style={{ color: '#4a5568', lineHeight: 1.7 }}>
                  The H-1B lottery is a numbers game, but that doesn't mean you file blind. We track selection rates by 
                  degree level, timing patterns, and cap-exempt alternatives. Master's degree holders get two chances. 
                  Cap-exempt employers bypass the lottery entirely. We know which strategy gives you the best odds.
                </p>
              </div>

              <div style={{ background: 'white', border: '2px solid #e8ecf0', borderRadius: '16px', padding: '2.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>
                  24-Hour RFE Emergency Response
                </h3>
                <p style={{ color: '#4a5568', lineHeight: 1.7 }}>
                  An RFE isn't a denial—it's USCIS asking for more evidence. But you have 87 days to respond, and every day 
                  you wait is a day your employee can't start work. We deliver complete RFE responses in 24 hours: evidence 
                  exhibits, legal brief, supporting documentation, everything USCIS asked for.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)', padding: '5rem 3rem', textAlign: 'center', color: 'white' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>
            Your Next Engineer's Visa Is Expiring in 45 Days
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.95 }}>
            Call now for 24-hour emergency RFE response, or schedule a $499 strategy consultation.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/forms/work-visa-intake"
              style={{
                padding: '1.25rem 2.5rem',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '1.1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'white',
                color: '#e74c3c',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Start Work Visa Intake <i className="fas fa-arrow-right"></i>
            </Link>
            <a
              href={`tel:${settings?.phone_primary || '+1-313-771-2283'}`}
              style={{
                padding: '1.25rem 2.5rem',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '1.1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'transparent',
                border: '2px solid white',
                color: 'white',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#e74c3c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'white';
              }}
            >
              <i className="fas fa-phone-alt"></i> {settings?.phone_display || '+1 (313) 771-2283'}
            </a>
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </>
  );
};
export default WorkVisas;
