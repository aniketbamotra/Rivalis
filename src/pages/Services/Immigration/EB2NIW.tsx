import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../../components/Layout/Navigation';
import { EnhancedFooter } from '../../../components/Layout';
import { useSiteSettings } from '../../../hooks/useSiteSettings';
import '../../../styles/service-page.css';
import '../../../styles/home.css';

export const EB2NIW: React.FC = () => {
  const { settings } = useSiteSettings();
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="service-hero" style={{ background: 'linear-gradient(165deg, #1a1a2e 0%, #2d3748 100())' }}>
        <div className="service-hero-container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services/immigration">Immigration</Link>
            <span>/</span>
            <span>EB-2 NIW</span>
          </div>

          <div className="hero-badge" style={{ background: 'rgba(102, 126, 234, 0.2)', borderColor: '#667eea' }}>
            <i className="fas fa-lightbulb"></i>
            <span>ENTREPRENEUR GREEN CARD PATHWAY</span>
          </div>

          <h1 style={{ color: 'white' }}>
            Your Startup Could Reshape an Industry.<br/>
            <span style={{ color: '#667eea' }}>Stop Waiting for Employer Sponsorship.</span>
          </h1>

          <p className="hero-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            AI for cancer detection. Clean energy that cuts emissions 40%. Supply chain software that saves billions. And you're 
            stuck waiting for an employer to sponsor you? Matter of Dhanasar changed everything in 2016. You don't need employer 
            sponsorship if your work serves the national interest. EB-2 NIW is the green card for entrepreneurs building companies 
            that benefit America.
          </p>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number" style={{ color: '#667eea' }}>150+</span>
              <span className="stat-label">EB-2 NIW Cases Filed</span>
            </div>
            <div className="stat">
              <span className="stat-number" style={{ color: '#667eea' }}>Dhanasar</span>
              <span className="stat-label">Framework Expertise</span>
            </div>
            <div className="stat">
              <span className="stat-number" style={{ color: '#667eea' }}>No</span>
              <span className="stat-label">Employer Sponsorship</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dhanasar Framework Section */}
      <section className="section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag" style={{ background: 'rgba(102, 126, 234, 0.1)', color: '#667eea' }}>
              THE DHANASAR THREE-PRONG TEST
            </span>
            <h2 className="section-title">
              Matter of Dhanasar (2016) Opened EB-2 NIW to Entrepreneurs.<br/>
              Most Don't Know. We Do.
            </h2>
            <p className="section-description">
              Before 2016, EB-2 NIW was reserved for academic researchers and people working in fields of "national interest" 
              (usually healthcare or STEM education). Then Matter of Dhanasar established a new framework: if your proposed 
              endeavor has substantial merit and national importance, you don't need a job offer. Entrepreneurs now qualify.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', marginTop: '3rem' }}>
            {/* Prong 1 */}
            <div style={{ background: 'white', border: '3px solid #e2e8f0', borderRadius: '20px', padding: '3rem' }}>
              <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', marginBottom: '1.5rem' }}>
                PRONG 1
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: '#1a1a2e' }}>
                Substantial Merit & National Importance
              </h3>
              <p style={{ color: '#4a5568', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Your proposed endeavor must have both substantial merit (it's technically sound, feasible, and important to your 
                field) AND national importance (it benefits the United States in ways that extend beyond your local area or industry).
              </p>
              <div style={{ background: 'rgba(102, 126, 234, 0.08)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #667eea' }}>
                <p style={{ color: '#2d3748', lineHeight: 1.7, margin: 0 }}>
                  <strong>Examples that qualify:</strong> AI research that improves medical diagnostics. Clean tech that reduces 
                  carbon emissions. Software that strengthens U.S. supply chain resilience. Agricultural innovation that increases 
                  food security. Your work doesn't need to change the world—just demonstrably benefit national interests.
                </p>
              </div>
            </div>

            {/* Prong 2 */}
            <div style={{ background: 'white', border: '3px solid #e2e8f0', borderRadius: '20px', padding: '3rem' }}>
              <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', marginBottom: '1.5rem' }}>
                PRONG 2
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: '#1a1a2e' }}>
                Well Positioned to Advance It
              </h3>
              <p style={{ color: '#4a5568', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                You must be well positioned to advance the proposed endeavor. This means: relevant education, skills, track record, 
                resources, plan of action, and progress to date. USCIS wants proof you can actually DO what you're proposing.
              </p>
              <div style={{ background: 'rgba(102, 126, 234, 0.08)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #667eea' }}>
                <p style={{ color: '#2d3748', lineHeight: 1.7, margin: 0 }}>
                  <strong>What proves positioning:</strong> PhD in relevant field. Publications showing domain expertise. Funding 
                  secured (grants, investment, revenue). Prototype or MVP demonstrating technical capability. Letters from industry 
                  experts confirming your qualifications. Progress metrics (customers, users, partnerships).
                </p>
              </div>
            </div>

            {/* Prong 3 */}
            <div style={{ background: 'white', border: '3px solid #e2e8f0', borderRadius: '20px', padding: '3rem' }}>
              <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', marginBottom: '1.5rem' }}>
                PRONG 3
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: '#1a1a2e' }}>
                Beneficial to Waive Job Offer
              </h3>
              <p style={{ color: '#4a5568', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                It would be beneficial to the United States to waive the job offer and labor certification requirements. Why? Because 
                requiring you to get employer sponsorship would hinder your ability to pursue this nationally important work.
              </p>
              <div style={{ background: 'rgba(102, 126, 234, 0.08)', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid #667eea' }}>
                <p style={{ color: '#2d3748', lineHeight: 1.7, margin: 0 }}>
                  <strong>Arguments that work:</strong> Your startup needs you as founder/CEO, not employee. Your research requires 
                  independence from institutional constraints. Your work benefits the entire industry, not just one employer. Waiting 
                  for PERM labor certification would delay nationally important innovation. This is the entrepreneur argument.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Qualifies Section */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #f7fafc 0%, #ffffff 100%)' }}>
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag" style={{ background: 'rgba(102, 126, 234, 0.1)', color: '#667eea' }}>
              WHO QUALIFIES
            </span>
            <h2 className="section-title">
              PhDs Working on Problems of National Importance.<br/>
              Entrepreneurs Building Companies That Benefit the U.S.
            </h2>
            <p className="section-description">
              EB-2 NIW requires an advanced degree (Master's or PhD) OR exceptional ability (bachelor's + 10 years experience). 
              But the real qualifier is your WORK—what you're building, researching, or creating that serves U.S. national interests.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <div style={{ background: 'white', border: '2px solid #e2e8f0', borderRadius: '16px', padding: '2rem' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>Tech Entrepreneurs</h4>
              <p style={{ color: '#4a5568', lineHeight: 1.7 }}>
                Founders of AI, biotech, clean energy, or infrastructure startups that solve national problems. If your company 
                strengthens U.S. competitiveness, creates jobs, or advances critical technologies, you qualify.
              </p>
            </div>

            <div style={{ background: 'white', border: '2px solid #e2e8f0', borderRadius: '16px', padding: '2rem' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>Academic Researchers</h4>
              <p style={{ color: '#4a5568', lineHeight: 1.7 }}>
                PhDs conducting research in STEM fields, healthcare, national security, or economic development. If your research 
                has commercial applications or policy implications, NIW makes sense.
              </p>
            </div>

            <div style={{ background: 'white', border: '2px solid #e2e8f0', borderRadius: '16px', padding: '2rem' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>Engineers in Critical Fields</h4>
              <p style={{ color: '#4a5568', lineHeight: 1.7 }}>
                Engineers working on infrastructure, renewable energy, semiconductor manufacturing, or supply chain resilience. 
                If your engineering work addresses national priorities, NIW is viable.
              </p>
            </div>

            <div style={{ background: 'white', border: '2px solid #e2e8f0', borderRadius: '16px', padding: '2rem' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>Healthcare Innovators</h4>
              <p style={{ color: '#4a5568', lineHeight: 1.7 }}>
                Physicians, medical researchers, biotech founders, or healthcare entrepreneurs whose work improves public health 
                outcomes, reduces healthcare costs, or expands access to care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section className="section" style={{ padding: '6rem 3rem' }}>
        <div className="section-container">
          <div style={{ background: 'white', border: '3px solid #667eea', borderRadius: '24px', padding: '4rem 3rem', boxShadow: '0 20px 60px rgba(102, 126, 234, 0.2)', maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{ display: 'inline-block', background: 'rgba(102, 126, 234, 0.1)', padding: '0.75rem 2rem', borderRadius: '50px', marginBottom: '1.5rem' }}>
                <span style={{ color: '#667eea', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '1px' }}>⚡ $499 ASSESSMENT</span>
              </div>
              
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.75rem', fontWeight: 800, color: '#1a1a2e', lineHeight: 1.2, marginBottom: '1rem' }}>
                Does Your Work Qualify Under Dhanasar?<br/>
                <span style={{ color: '#667eea' }}>We'll Tell You in One Hour.</span>
              </h2>
              
              <p style={{ fontSize: '1.25rem', color: '#4a5568', lineHeight: 1.7, maxWidth: '850px', margin: '0 auto' }}>
                Most immigration attorneys don't understand the Dhanasar framework because they don't work with entrepreneurs. 
                We do. We'll analyze your proposed endeavor, assess your positioning, and tell you if EB-2 NIW is realistic—
                before you waste months on a case that doesn't qualify.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link 
                to="/forms/eb2-niw-intake"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '1.25rem 2.5rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '1.1rem'
                }}
              >
                Schedule $499 NIW Assessment <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '5rem 3rem', textAlign: 'center', color: 'white' }}>
        <div className="section-container">
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>
            Your Startup Serves the National Interest
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.95 }}>
            Stop waiting for employer sponsorship. Get your green card through EB-2 NIW.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/forms/eb2-niw-intake"
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
                color: '#667eea'
              }}
            >
              Start EB-2 NIW Intake <i className="fas fa-arrow-right"></i>
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
                color: 'white'
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
export default EB2NIW;
