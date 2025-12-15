import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../../components/Layout/Navigation';
import { EnhancedFooter } from '../../../components/Layout';
import '../../../styles/service-page.css';
import '../../../styles/home.css';

export const EB1ExtraordinaryAbility: React.FC = () => {
  
  return (
    <>
      <Navigation />

      {/* Hero */}
      <section className="service-hero" style={{ background: 'linear-gradient(165deg, #1a1a2e 0%, #2d3748 100%)' }}>
        <div className="service-hero-container">
          <div className="service-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/services/immigration">Immigration</Link> / <span>EB-1 Extraordinary Ability</span>
          </div>

          <div className="service-hero-badge" style={{ background: 'rgba(212, 175, 55, 0.2)', borderColor: '#d4af37' }}>
            <i className="fas fa-trophy"></i>
            ELITE IMMIGRATION CATEGORY
          </div>

          <h1>The Most <span className="highlight" style={{ color: '#d4af37' }}>Prestigious</span> Green Card.<br />For The Top 1% In Your Field.</h1>

          <p className="service-hero-subtitle">
            EB-1A is for individuals who have risen to the very top of their field through sustained national or international acclaim. No employer sponsorship required. No labor certification. No job offer needed. This is the fast track to permanent residence for extraordinary individuals.
          </p>

          <div className="service-hero-stats">
            <div className="service-stat">
              <div className="service-stat-number">No Cap</div>
              <div className="service-stat-label">Priority processing available</div>
            </div>
            <div className="service-stat">
              <div className="service-stat-number">6-18mo</div>
              <div className="service-stat-label">Typical timeline to green card</div>
            </div>
            <div className="service-stat">
              <div className="service-stat-number">Self</div>
              <div className="service-stat-label">Petition yourself - no sponsor</div>
            </div>
          </div>

          <div className="service-cta-group">
            <Link to="/forms/eb1-intake" className="service-btn service-btn-primary" style={{ background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)' }}>
              <i className="fas fa-clipboard-check"></i>
              Evaluate Your Eligibility
            </Link>
            <a href="tel:+1-313-771-2283" className="service-btn service-btn-secondary">
              <i className="fas fa-phone-alt"></i>
              Call: +1 (313) 771-2283
            </a>
          </div>
        </div>
      </section>

      {/* What is EB-1 */}
      <section className="service-section">
        <div className="service-section-container">
          <div className="service-section-header">
            <div className="service-section-tag" style={{ background: 'rgba(212, 175, 55, 0.1)', color: '#d4af37' }}>THE EXTRAORDINARY ABILITY VISA</div>
            <h2 className="service-section-title">What Is EB-1A Classification?</h2>
            <p className="service-section-description">
              The EB-1A category is reserved for individuals with extraordinary ability in the sciences, arts, education, business, or athletics through sustained national or international acclaim. You must meet at least 3 of 10 specific criteria established by USCIS.
            </p>
          </div>

          <div style={{ 
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(184, 148, 31, 0.05) 100%)',
            border: '2px solid #d4af37',
            borderRadius: '12px',
            padding: '3rem',
            marginTop: '3rem'
          }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '2rem', textAlign: 'center' }}>
              The 10 Criteria for Extraordinary Ability
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
              {[
                {
                  title: '1. Awards & Prizes',
                  desc: 'Receipt of lesser nationally or internationally recognized prizes or awards for excellence'
                },
                {
                  title: '2. Membership',
                  desc: 'Membership in associations requiring outstanding achievements (judged by recognized experts)'
                },
                {
                  title: '3. Published Material',
                  desc: 'Published material about you in professional or major trade publications or major media'
                },
                {
                  title: '4. Judging',
                  desc: 'Participation as a judge of the work of others (individually or on a panel)'
                },
                {
                  title: '5. Original Contributions',
                  desc: 'Original scientific, scholarly, artistic, athletic, or business-related contributions of major significance'
                },
                {
                  title: '6. Scholarly Articles',
                  desc: 'Authorship of scholarly articles in professional journals or major media'
                },
                {
                  title: '7. Exhibitions/Showcases',
                  desc: 'Display of work at artistic exhibitions or showcases'
                },
                {
                  title: '8. Leading Role',
                  desc: 'Performance of a leading or critical role in distinguished organizations'
                },
                {
                  title: '9. High Salary',
                  desc: 'Commanded high salary or significantly high remuneration relative to others in the field'
                },
                {
                  title: '10. Commercial Success',
                  desc: 'Commercial successes in the performing arts (box office receipts, record sales, etc.)'
                }
              ].map((criterion, idx) => (
                <div key={idx} style={{ 
                  background: 'white', 
                  padding: '1.5rem', 
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#d4af37', marginBottom: '0.5rem' }}>
                    {criterion.title}
                  </h4>
                  <p style={{ color: '#4a5568', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {criterion.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EB-1 Subcategories */}
      <section className="service-section" style={{ background: '#f7fafc' }}>
        <div className="service-section-container">
          <div className="service-section-header">
            <div className="service-section-tag" style={{ background: 'rgba(212, 175, 55, 0.1)', color: '#d4af37' }}>THREE SUBCATEGORIES</div>
            <h2 className="service-section-title">Which EB-1 Classification Fits You?</h2>
          </div>

          <div className="service-solutions-grid">
            <div className="service-solution-card">
              <div className="service-solution-icon" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(184, 148, 31, 0.05) 100%)' }}>
                <i className="fas fa-star" style={{ color: '#d4af37' }}></i>
              </div>
              <h3>EB-1A: Extraordinary Ability</h3>
              <p>For individuals with extraordinary ability in sciences, arts, education, business, or athletics. <strong>Self-petition - no employer required.</strong></p>
              <div className="service-meta">
                <span><i className="fas fa-clock"></i> 6-18 months</span>
                <span><i className="fas fa-dollar-sign"></i> $18K-$35K</span>
              </div>
              <ul style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#4a5568' }}>
                <li>✓ No employer sponsorship needed</li>
                <li>✓ No job offer required</li>
                <li>✓ Must meet 3 of 10 criteria</li>
                <li>✓ Premium processing available (15 days)</li>
              </ul>
              <Link 
                to="/forms/eb1-intake"
                style={{
                  display: 'inline-block',
                  marginTop: '1.5rem',
                  color: '#d4af37',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                Start EB-1A Assessment →
              </Link>
            </div>

            <div className="service-solution-card">
              <div className="service-solution-icon" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(184, 148, 31, 0.05) 100%)' }}>
                <i className="fas fa-flask" style={{ color: '#d4af37' }}></i>
              </div>
              <h3>EB-1B: Outstanding Researchers/Professors</h3>
              <p>For outstanding researchers and professors with at least 3 years of experience. Requires job offer from university or research institution.</p>
              <div className="service-meta">
                <span><i className="fas fa-clock"></i> 8-15 months</span>
                <span><i className="fas fa-dollar-sign"></i> $15K-$28K</span>
              </div>
              <ul style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#4a5568' }}>
                <li>✓ Requires permanent research/teaching position</li>
                <li>✓ At least 3 years experience in field</li>
                <li>✓ Must meet 2 of 6 criteria</li>
                <li>✓ Employer must sponsor</li>
              </ul>
            </div>

            <div className="service-solution-card">
              <div className="service-solution-icon" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(184, 148, 31, 0.05) 100%)' }}>
                <i className="fas fa-building" style={{ color: '#d4af37' }}></i>
              </div>
              <h3>EB-1C: Multinational Executives/Managers</h3>
              <p>For executives and managers transferred to the U.S. by a multinational company. Must have worked for related foreign company for 1+ years.</p>
              <div className="service-meta">
                <span><i className="fas fa-clock"></i> 8-15 months</span>
                <span><i className="fas fa-dollar-sign"></i> $12K-$25K</span>
              </div>
              <ul style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#4a5568' }}>
                <li>✓ Requires qualifying company relationship</li>
                <li>✓ 1+ year abroad with related entity</li>
                <li>✓ Executive or managerial capacity</li>
                <li>✓ Company must sponsor</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who Qualifies */}
      <section className="service-section">
        <div className="service-section-container">
          <div className="service-section-header">
            <div className="service-section-tag" style={{ background: 'rgba(212, 175, 55, 0.1)', color: '#d4af37' }}>QUALIFYING FIELDS</div>
            <h2 className="service-section-title">Who Qualifies for EB-1A?</h2>
            <p className="service-section-description">
              EB-1A is not limited to Nobel Prize winners. Many professionals across diverse fields successfully obtain EB-1A classification.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ background: '#f7fafc', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>
                <i className="fas fa-laptop-code" style={{ color: '#d4af37', marginRight: '0.5rem' }}></i>
                Technology & Sciences
              </h3>
              <ul style={{ color: '#4a5568', lineHeight: 2 }}>
                <li>• AI/ML researchers</li>
                <li>• Software architects</li>
                <li>• Biotech scientists</li>
                <li>• Data scientists</li>
                <li>• Cybersecurity experts</li>
                <li>• Engineering leaders</li>
              </ul>
            </div>

            <div style={{ background: '#f7fafc', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>
                <i className="fas fa-chart-line" style={{ color: '#d4af37', marginRight: '0.5rem' }}></i>
                Business & Finance
              </h3>
              <ul style={{ color: '#4a5568', lineHeight: 2 }}>
                <li>• Startup founders</li>
                <li>• C-suite executives</li>
                <li>• Investment bankers</li>
                <li>• Management consultants</li>
                <li>• Financial analysts</li>
                <li>• Business strategists</li>
              </ul>
            </div>

            <div style={{ background: '#f7fafc', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>
                <i className="fas fa-paint-brush" style={{ color: '#d4af37', marginRight: '0.5rem' }}></i>
                Arts & Media
              </h3>
              <ul style={{ color: '#4a5568', lineHeight: 2 }}>
                <li>• Film directors/producers</li>
                <li>• Musicians/composers</li>
                <li>• Visual artists</li>
                <li>• Fashion designers</li>
                <li>• Architects</li>
                <li>• Digital creators</li>
              </ul>
            </div>

            <div style={{ background: '#f7fafc', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>
                <i className="fas fa-graduation-cap" style={{ color: '#d4af37', marginRight: '0.5rem' }}></i>
                Education & Research
              </h3>
              <ul style={{ color: '#4a5568', lineHeight: 2 }}>
                <li>• University professors</li>
                <li>• Research scientists</li>
                <li>• Principal investigators</li>
                <li>• Academic administrators</li>
                <li>• Educational innovators</li>
                <li>• Think tank scholars</li>
              </ul>
            </div>

            <div style={{ background: '#f7fafc', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>
                <i className="fas fa-running" style={{ color: '#d4af37', marginRight: '0.5rem' }}></i>
                Athletics
              </h3>
              <ul style={{ color: '#4a5568', lineHeight: 2 }}>
                <li>• Professional athletes</li>
                <li>• Olympic competitors</li>
                <li>• Coaches</li>
                <li>• Sports analysts</li>
                <li>• Trainers</li>
                <li>• Sports executives</li>
              </ul>
            </div>

            <div style={{ background: '#f7fafc', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>
                <i className="fas fa-lightbulb" style={{ color: '#d4af37', marginRight: '0.5rem' }}></i>
                Other Fields
              </h3>
              <ul style={{ color: '#4a5568', lineHeight: 2 }}>
                <li>• Medical practitioners</li>
                <li>• Entrepreneurs</li>
                <li>• Writers/journalists</li>
                <li>• Influencers/content creators</li>
                <li>• Legal professionals</li>
                <li>• And many more...</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment CTA */}
      <section className="service-section" style={{ background: 'linear-gradient(180deg, #fafbfc 0%, #ffffff 100%)', padding: '6rem 3rem' }}>
        <div className="service-section-container">
          <div style={{ 
            background: 'white', 
            border: '3px solid #d4af37', 
            borderRadius: '16px', 
            padding: '3rem', 
            maxWidth: '900px', 
            margin: '0 auto',
            boxShadow: '0 20px 60px rgba(212, 175, 55, 0.15)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div style={{
                display: 'inline-block',
                background: 'rgba(212, 175, 55, 0.1)',
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#d4af37',
                letterSpacing: '1px',
                marginBottom: '1.5rem'
              }}>
                <i className="fas fa-trophy"></i> EB-1A ELIGIBILITY ASSESSMENT
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '1rem' }}>
                Are You Extraordinary Enough?
              </h2>
              <p style={{ fontSize: '1.15rem', color: '#4a5568', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto' }}>
                Most people underestimate their qualifications. We've helped scientists, entrepreneurs, artists, and executives successfully demonstrate extraordinary ability. Get a comprehensive evaluation of your credentials against the 10 criteria.
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
                <i className="fas fa-check-circle" style={{ color: '#d4af37', marginRight: '0.5rem' }}></i>
                Your EB-1A Assessment Includes:
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <i className="fas fa-check" style={{ color: '#48bb78', marginTop: '0.25rem' }}></i>
                  <span style={{ color: '#2d3748', fontSize: '0.95rem' }}><strong>Criteria Mapping:</strong> Which of the 10 criteria you meet</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <i className="fas fa-check" style={{ color: '#48bb78', marginTop: '0.25rem' }}></i>
                  <span style={{ color: '#2d3748', fontSize: '0.95rem' }}><strong>Evidence Review:</strong> Strength of your documentation</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <i className="fas fa-check" style={{ color: '#48bb78', marginTop: '0.25rem' }}></i>
                  <span style={{ color: '#2d3748', fontSize: '0.95rem' }}><strong>Gap Analysis:</strong> What additional evidence you need</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <i className="fas fa-check" style={{ color: '#48bb78', marginTop: '0.25rem' }}></i>
                  <span style={{ color: '#2d3748', fontSize: '0.95rem' }}><strong>Success Probability:</strong> Realistic assessment of approval odds</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <i className="fas fa-check" style={{ color: '#48bb78', marginTop: '0.25rem' }}></i>
                  <span style={{ color: '#2d3748', fontSize: '0.95rem' }}><strong>Timeline & Strategy:</strong> Best path forward for your situation</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <i className="fas fa-check" style={{ color: '#48bb78', marginTop: '0.25rem' }}></i>
                  <span style={{ color: '#2d3748', fontSize: '0.95rem' }}><strong>Cost Breakdown:</strong> Total investment including USCIS fees</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: 900, color: '#d4af37', lineHeight: 1 }}>$799</div>
                <div style={{ fontSize: '0.95rem', color: '#718096', marginTop: '0.5rem' }}>
                  Comprehensive EB-1A eligibility assessment
                </div>
                <div style={{ fontSize: '0.85rem', color: '#a0aec0', marginTop: '0.25rem' }}>
                  Assessment fee credited toward full petition if you proceed
                </div>
              </div>
              <Link 
                to="/forms/eb1-intake"
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
                  color: 'white',
                  padding: '1rem 2.5rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  boxShadow: '0 8px 20px rgba(212, 175, 55, 0.3)',
                  transition: 'transform 0.3s'
                }}
              >
                <i className="fas fa-clipboard-check" style={{ marginRight: '0.5rem' }}></i>
                Start Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Investment & Timeline */}
      <section className="service-section" style={{ background: '#f7fafc' }}>
        <div className="service-section-container">
          <div className="service-section-header">
            <div className="service-section-tag" style={{ background: 'rgba(212, 175, 55, 0.1)', color: '#d4af37' }}>INVESTMENT & TIMELINE</div>
            <h2 className="service-section-title">What Does EB-1A Cost?</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'white', padding: '2.5rem', borderRadius: '12px', border: '2px solid #d4af37' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1.5rem' }}>
                Legal Fees
              </h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#d4af37', marginBottom: '1rem' }}>
                $18,000 - $35,000
              </div>
              <ul style={{ color: '#4a5568', lineHeight: 2 }}>
                <li>• Comprehensive case strategy</li>
                <li>• Evidence compilation & organization</li>
                <li>• Expert/recommendation letters (drafting & coordination)</li>
                <li>• Detailed legal brief (50-100+ pages)</li>
                <li>• I-140 petition preparation</li>
                <li>• RFE response (if needed)</li>
              </ul>
            </div>

            <div style={{ background: 'white', padding: '2.5rem', borderRadius: '12px', border: '2px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1.5rem' }}>
                USCIS Fees
              </h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#2d3748', marginBottom: '1rem' }}>
                $700 - $3,410
              </div>
              <ul style={{ color: '#4a5568', lineHeight: 2 }}>
                <li>• I-140 filing fee: $700</li>
                <li>• Premium processing (optional): $2,500</li>
                <li>• I-485 adjustment (if in U.S.): $1,225 + $85 biometrics</li>
                <li>• Medical examination: $200-$500</li>
                <li>• EAD/Advance Parole (optional): Included in I-485</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '3rem', textAlign: 'center', background: 'white', padding: '2rem', borderRadius: '12px', border: '2px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>
              Timeline to Green Card
            </h3>
            <p style={{ color: '#4a5568', fontSize: '1.1rem', lineHeight: 1.7 }}>
              <strong>With Premium Processing:</strong> 6-12 months total<br />
              <strong>Without Premium Processing:</strong> 12-18 months total<br />
              <small style={{ color: '#718096' }}>(Includes petition approval + adjustment of status/consular processing)</small>
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="service-section">
        <div className="service-section-container">
          <div className="service-section-header">
            <div className="service-section-tag" style={{ background: 'rgba(212, 175, 55, 0.1)', color: '#d4af37' }}>BIG 4 EXPERTISE</div>
            <h2 className="service-section-title">Why Trust Us With Your EB-1A Petition?</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ background: '#f7fafc', padding: '2rem', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>
                <i className="fas fa-award" style={{ color: '#d4af37', marginRight: '0.5rem' }}></i>
                Deep EB-1 Experience
              </h3>
              <p style={{ color: '#4a5568', lineHeight: 1.7 }}>
                We've prepared successful EB-1A petitions for AI researchers, startup founders, medical professionals, artists, and athletes. We know how to present your achievements in the strongest possible light.
              </p>
            </div>

            <div style={{ background: '#f7fafc', padding: '2rem', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>
                <i className="fas fa-file-contract" style={{ color: '#d4af37', marginRight: '0.5rem' }}></i>
                Comprehensive Legal Briefs
              </h3>
              <p style={{ color: '#4a5568', lineHeight: 1.7 }}>
                We don't submit thin petitions. Our EB-1A briefs are typically 50-100+ pages with detailed legal arguments, supporting evidence, and expert letters that make your case undeniable.
              </p>
            </div>

            <div style={{ background: '#f7fafc', padding: '2rem', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>
                <i className="fas fa-shield-alt" style={{ color: '#d4af37', marginRight: '0.5rem' }}></i>
                Evidence Strategy
              </h3>
              <p style={{ color: '#4a5568', lineHeight: 1.7 }}>
                Not all evidence is created equal. We know what USCIS officers look for and how to present your credentials to meet or exceed the standard for each criterion you're claiming.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="service-section" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #2d3748 100%)', padding: '5rem 3rem' }}>
        <div className="service-section-container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>
            Get Your EB-1A Eligibility Assessment
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '800px', margin: '0 auto 3rem', lineHeight: 1.7 }}>
            Find out if you qualify for the most prestigious employment-based green card category. Detailed analysis against all 10 USCIS criteria.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/forms/eb1-intake"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
                color: 'white',
                padding: '1rem 2.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '1.1rem'
              }}
            >
              <i className="fas fa-clipboard-check"></i> Start Assessment ($799)
            </Link>
            <Link 
              to="tel:+1-313-771-2283"
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
              <i className="fas fa-phone-alt"></i> Call: +1 (313) 771-2283
            </Link>
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </>
  );
};

export default EB1ExtraordinaryAbility;
