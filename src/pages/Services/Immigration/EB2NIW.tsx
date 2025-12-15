import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../../components/Layout/Navigation';
import { EnhancedFooter } from '../../../components/Layout';
import '../../../styles/service-page.css';

export const EB2NIW: React.FC = () => {
  return (
    <>
      <Navigation />
      <section className="service-hero" style={{ background: 'linear-gradient(165deg, #1a1a2e 0%, #2d3748 100%)' }}>
        <div className="service-hero-container">
          <div className="service-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/services/immigration">Immigration</Link> / <span>EB-2 NIW</span>
          </div>
          <div className="service-hero-badge" style={{ background: 'rgba(102, 126, 234, 0.2)', borderColor: '#667eea' }}>
            <i className="fas fa-brain"></i> SELF-PETITION GREEN CARD
          </div>
          <h1>Permanent Residence for <span className="highlight" style={{ color: '#667eea' }}>Innovators</span>.<br />No Employer. No Labor Cert.</h1>
          <p className="service-hero-subtitle">EB-2 NIW allows you to self-petition for a green card if your work benefits the United States. Perfect for researchers, entrepreneurs, scientists, and professionals whose endeavors serve the national interest.</p>
          <div className="service-hero-stats">
            <div className="service-stat"><div className="service-stat-number">No</div><div className="service-stat-label">Employer sponsorship needed</div></div>
            <div className="service-stat"><div className="service-stat-number">8-24mo</div><div className="service-stat-label">Timeline to green card</div></div>
            <div className="service-stat"><div className="service-stat-number">Self</div><div className="service-stat-label">Petition - your own path</div></div>
          </div>
          <div className="service-cta-group">
            <Link to="/forms/eb2-niw-intake" className="service-btn service-btn-primary" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}><i className="fas fa-clipboard-check"></i> Start NIW Assessment</Link>
            <a href="tel:+1-313-771-2283" className="service-btn service-btn-secondary"><i className="fas fa-phone-alt"></i> Call Us</a>
          </div>
        </div>
      </section>

      <section className="service-section">
        <div className="service-section-container">
          <div className="service-section-header">
            <div className="service-section-tag" style={{ background: 'rgba(102, 126, 234, 0.1)', color: '#667eea' }}>DHANASAR FRAMEWORK</div>
            <h2 className="service-section-title">The 3-Part Test for National Interest Waiver</h2>
          </div>
          <div style={{ display: 'grid', gap: '2rem', marginTop: '3rem' }}>
            {[
              { num: '1', title: 'Substantial Merit & National Importance', desc: 'Your proposed endeavor has both substantial merit and national importance. Can be in business, entrepreneurship, science, technology, culture, health, or education.' },
              { num: '2', title: 'Well-Positioned to Advance the Endeavor', desc: 'You are well positioned to advance your proposed endeavor based on education, skills, knowledge, track record, plan for future activities, and interest from potential customers/users/investors.' },
              { num: '3', title: 'Beneficial to Waive Labor Certification', desc: 'On balance, it would be beneficial to the United States to waive the job offer and labor certification requirements. Your contributions are more valuable than requiring employer sponsorship.' }
            ].map((item) => (
              <div key={item.num} style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)', padding: '2rem', borderRadius: '12px', border: '2px solid #667eea' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '3rem', fontWeight: 900, color: '#667eea', lineHeight: 1 }}>{item.num}</div>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>{item.title}</h3>
                    <p style={{ color: '#4a5568', lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-section" style={{ background: '#f7fafc' }}>
        <div className="service-section-container">
          <div className="service-section-header">
            <div className="service-section-tag" style={{ background: 'rgba(102, 126, 234, 0.1)', color: '#667eea' }}>WHO QUALIFIES</div>
            <h2 className="service-section-title">EB-2 NIW Success Stories</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { icon: 'fa-microscope', title: 'AI/ML Researchers', items: ['Machine learning innovations', 'AI safety research', 'Natural language processing', 'Computer vision advances'] },
              { icon: 'fa-rocket', title: 'Tech Entrepreneurs', items: ['SaaS founders', 'Cleantech startups', 'Healthcare technology', 'Educational platforms'] },
              { icon: 'fa-heartbeat', title: 'Healthcare Innovators', items: ['Medical device inventors', 'Biotech researchers', 'Public health specialists', 'Telemedicine pioneers'] },
              { icon: 'fa-bolt', title: 'Clean Energy', items: ['Renewable energy engineers', 'Sustainability consultants', 'Environmental scientists', 'Climate tech founders'] },
              { icon: 'fa-shield-alt', title: 'Cybersecurity', items: ['Security researchers', 'Cryptography experts', 'Critical infrastructure protection', 'Privacy innovators'] },
              { icon: 'fa-graduation-cap', title: 'Education Tech', items: ['EdTech founders', 'Online learning platforms', 'STEM education advocates', 'Curriculum innovators'] }
            ].map((cat) => (
              <div key={cat.title} style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>
                  <i className={`fas ${cat.icon}`} style={{ color: '#667eea', marginRight: '0.5rem' }}></i> {cat.title}
                </h3>
                <ul style={{ color: '#4a5568', lineHeight: 2 }}>
                  {cat.items.map((item) => <li key={item}>• {item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-section">
        <div className="service-section-container">
          <div style={{ background: 'white', border: '3px solid #667eea', borderRadius: '16px', padding: '3rem', maxWidth: '900px', margin: '0 auto', boxShadow: '0 20px 60px rgba(102, 126, 234, 0.15)' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '1rem' }}>EB-2 NIW Eligibility Assessment</h2>
              <p style={{ fontSize: '1.15rem', color: '#4a5568', lineHeight: 1.7 }}>Comprehensive evaluation of your case against the Dhanasar framework</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: 900, color: '#667eea', lineHeight: 1 }}>$699</div>
                <div style={{ fontSize: '0.85rem', color: '#a0aec0', marginTop: '0.5rem' }}>Credited toward full petition</div>
              </div>
              <Link to="/forms/eb2-niw-intake" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '1rem 2.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '1.1rem' }}>
                <i className="fas fa-clipboard-check"></i> Start Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="service-section" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #2d3748 100%)', padding: '5rem 3rem' }}>
        <div className="service-section-container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>Self-Petition Your Green Card</h2>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '800px', margin: '0 auto 3rem' }}>No employer. No labor certification. If your work benefits America, you can petition yourself.</p>
          <Link to="/forms/eb2-niw-intake" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '1rem 2.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '1.1rem' }}>
            <i className="fas fa-rocket"></i> Start EB-2 NIW Assessment
          </Link>
        </div>
      </section>

      <EnhancedFooter />
    </>
  );
};

export default EB2NIW;
