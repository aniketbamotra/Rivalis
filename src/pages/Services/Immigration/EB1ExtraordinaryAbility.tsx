import { Link } from 'react-router-dom';
import { Navigation } from '../../../components/Layout/Navigation';
import { EnhancedFooter } from '../../../components/Layout';
import { useSiteSettings } from '../../../hooks/useSiteSettings';
import '../../../styles/service-page.css';
import '../../../styles/home.css';

export default function EB1ExtraordinaryAbility() {
  const { settings } = useSiteSettings();
  const combinedStyles = `
    .greencard-hero {
      background: linear-gradient(165deg, #1a1a2e 0%, #2d3748 100%);
      padding: 8rem 3rem 6rem;
      position: relative;
      overflow: hidden;
    }
    .greencard-hero::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 50%;
      height: 100%;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, transparent 100%);
      pointer-events: none;
    }
    .greencard-breadcrumb {
      display: flex;
      gap: 0.75rem;
      align-items: center;
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.95rem;
      margin-bottom: 2rem;
    }
    .greencard-breadcrumb a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: color 0.3s;
    }
    .greencard-breadcrumb a:hover {
      color: white;
    }
    .greencard-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      background: rgba(212, 175, 55, 0.2);
      border: 2px solid #d4af37;
      padding: 0.75rem 1.5rem;
      border-radius: 50px;
      color: white;
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 2.5rem;
    }
    .greencard-badge i {
      color: #d4af37;
    }
    .greencard-hero h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 4.5rem;
      font-weight: 800;
      color: white;
      line-height: 1.1;
      margin-bottom: 2rem;
      max-width: 1100px;
    }
    .greencard-hero h1 .highlight {
      color: #d4af37;
    }
    .greencard-subtitle {
      font-size: 1.3rem;
      color: rgba(255, 255, 255, 0.9);
      line-height: 1.8;
      max-width: 950px;
      margin-bottom: 3rem;
    }
    .greencard-stats {
      display: flex;
      gap: 4rem;
      flex-wrap: wrap;
    }
    .greencard-stat {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .greencard-stat-number {
      font-size: 3rem;
      font-weight: 900;
      color: #d4af37;
      line-height: 1;
    }
    .greencard-stat-label {
      font-size: 0.95rem;
      color: rgba(255, 255, 255, 0.8);
      font-weight: 500;
    }
    .path-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 3rem;
      margin-bottom: 4rem;
    }
    .path-card {
      background: white;
      border: 3px solid #e2e8f0;
      border-radius: 20px;
      padding: 3rem;
      transition: all 0.3s;
      position: relative;
      overflow: hidden;
    }
    .path-card::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 30%;
      height: 100%;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, transparent 100%);
      pointer-events: none;
    }
    .path-card:hover {
      transform: translateY(-8px);
      border-color: #d4af37;
      box-shadow: 0 20px 60px rgba(212, 175, 55, 0.2);
    }
    .path-badge {
      display: inline-block;
      background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 50px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 1.5rem;
      text-transform: uppercase;
    }
    .path-card h3 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.25rem;
      font-weight: 800;
      margin-bottom: 1rem;
      color: #1a1a2e;
    }
    .path-pain {
      font-size: 1.15rem;
      color: #4a5568;
      line-height: 1.7;
      margin-bottom: 1.5rem;
      font-weight: 500;
    }
    .path-solution {
      background: rgba(212, 175, 55, 0.08);
      padding: 1.5rem;
      border-radius: 12px;
      margin-bottom: 1.5rem;
      border-left: 4px solid #d4af37;
    }
    .path-solution p {
      color: #2d3748;
      line-height: 1.7;
      margin-bottom: 0.75rem;
    }
    .path-solution p:last-child {
      margin-bottom: 0;
    }
    .path-proof {
      display: flex;
      gap: 2rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }
    .proof-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.95rem;
      color: #4a5568;
    }
    .proof-item i {
      color: #d4af37;
      font-size: 1.1rem;
    }
    .path-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);
      color: white;
      padding: 1rem 2rem;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 700;
      transition: all 0.3s;
    }
    .path-cta:hover {
      transform: translateX(5px);
      box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);
    }
    .criteria-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      margin-top: 3rem;
    }
    .criteria-card {
      background: white;
      border: 2px solid #e2e8f0;
      border-radius: 16px;
      padding: 2rem;
    }
    .criteria-card h4 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 0.75rem;
    }
    .criteria-card p {
      color: #4a5568;
      line-height: 1.7;
    }
    .section {
      padding: 6rem 3rem;
    }
    .section-container {
      max-width: 1400px;
      margin: 0 auto;
    }
    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }
    .section-tag {
      display: inline-block;
      background: rgba(212, 175, 55, 0.15);
      color: #d4af37;
      padding: 0.5rem 1.25rem;
      border-radius: 50px;
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 1.5rem;
      text-transform: uppercase;
    }
    .section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 3.5rem;
      font-weight: 800;
      color: #1a1a2e;
      line-height: 1.2;
      margin-bottom: 1.5rem;
    }
    .section-description {
      font-size: 1.2rem;
      color: #4a5568;
      max-width: 900px;
      margin: 0 auto;
      line-height: 1.8;
    }
    @media (max-width: 1024px) {
      .path-grid, .criteria-grid {
        grid-template-columns: 1fr;
      }
    }
    @media (max-width: 768px) {
      .greencard-hero h1 {
        font-size: 3rem;
      }
      .section-title {
        font-size: 2.25rem;
      }
      .greencard-stats {
        gap: 2rem;
      }
    }
  `;

  return (
    <>
      <style>{combinedStyles}</style>
      <Navigation />

      {/* Hero Section */}
      <section className="greencard-hero">
        <div className="service-hero-container" style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="greencard-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>EB-1 & EB-2 Green Cards</span>
          </div>

          <div className="greencard-badge">
            <i className="fas fa-crown"></i>
            <span>ELITE GREEN CARD SERVICES</span>
          </div>

          <h1>
            8,000 Citations. Keynote at Top Conferences.<br/>
            <span className="highlight">Still Stuck in H-1B Lottery Hell?</span>
          </h1>

          <p className="greencard-subtitle">
            You're a world-class researcher. Your work shapes your field. You've been cited 5,000 times. You've spoken at conferences in 12 countries. And you're STILL begging USCIS for permission to work every April? The EB-1 path doesn't depend on employer sponsorship, lottery luck, or waiting for Congress to fix immigration. You qualify NOW. Stop gambling on H-1B. Get your green card.
          </p>

          <div className="greencard-stats">
            <div className="greencard-stat">
              <span className="greencard-stat-number">200+</span>
              <span className="greencard-stat-label">EB-1/EB-2 Cases Filed</span>
            </div>
            <div className="greencard-stat">
              <span className="greencard-stat-number">Big 4</span>
              <span className="greencard-stat-label">Citation Analysis Training</span>
            </div>
            <div className="greencard-stat">
              <span className="greencard-stat-number">0</span>
              <span className="greencard-stat-label">Lottery Dependence</span>
            </div>
          </div>
        </div>
      </section>

      {/* Two Paths Section */}
      <section className="section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-tag">TWO PATHS TO PERMANENT RESIDENCE</div>
            <h2 className="section-title">Stop Waiting for H-1B Lottery Luck.<br/>Build Your Green Card Case Instead.</h2>
            <p className="section-description">
              The PhD who lost the H-1B lottery three years running. The entrepreneur whose startup can't wait for employer sponsorship. The researcher whose breakthrough is worth $100M but whose visa expires in 6 months. These are the cases we WIN. Not because we're lucky. Because we build EB-1 and EB-2 NIW cases that USCIS can't deny.
            </p>
          </div>

          <div className="path-grid">
            {/* EB-1 Card */}
            <div className="path-card">
              <div className="path-badge">EB-1 Extraordinary Ability</div>
              <h3>The Fast Track for People Who've Already Made It</h3>
              
              <p className="path-pain">
                <strong>You're stuck in a system designed for mediocrity.</strong> H-1B lottery? That's for everyone. EB-1 is for the top 1% who've already proven extraordinary ability. If you're waiting on lottery luck, you're playing the wrong game.
              </p>

              <div className="path-solution">
                <p><strong>Who qualifies:</strong> International awards. 5,000+ citations. Media coverage in major outlets. Judging others' work. Critical employment at distinguished organizations. Patents worth millions. Leading roles at top institutions.</p>
                <p><strong>The truth:</strong> Most researchers with 3,000+ citations qualify. Most don't know it. Your previous attorney didn't tell you because they don't know how to build these cases.</p>
              </div>

              <div className="path-proof">
                <div className="proof-item">
                  <i className="fas fa-check-circle"></i>
                  <span>No employer sponsorship needed</span>
                </div>
                <div className="proof-item">
                  <i className="fas fa-check-circle"></i>
                  <span>No lottery, no cap, no waiting</span>
                </div>
                <div className="proof-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Permanent residence for life</span>
                </div>
              </div>

              <Link to="/forms/eb1-intake" className="path-cta">
                <i className="fas fa-calendar-check"></i>
                Book $799 EB-1 Assessment
              </Link>
            </div>

            {/* EB-2 NIW Card */}
            <div className="path-card">
              <div className="path-badge">EB-2 National Interest Waiver</div>
              <h3>For Entrepreneurs Whose Work Benefits America</h3>
              
              <p className="path-pain">
                <strong>Your startup could reshape an entire industry.</strong> AI for cancer detection. Clean energy that cuts emissions 40%. Supply chain software that saves billions. And you're stuck waiting for an employer to sponsor you? Matter of Dhanasar changed everything. You don't need employer sponsorship if your work serves the national interest.
              </p>

              <div className="path-solution">
                <p><strong>Who qualifies:</strong> PhDs working on problems of national importance. Entrepreneurs building companies that benefit the U.S. economy. Researchers whose work has commercial applications. Engineers solving infrastructure challenges. Scientists advancing critical technologies.</p>
                <p><strong>The breakthrough:</strong> Matter of Dhanasar (2016) opened EB-2 NIW to entrepreneurs. Most don't know. Your work doesn't need to be groundbreaking—just nationally important.</p>
              </div>

              <div className="path-proof">
                <div className="proof-item">
                  <i className="fas fa-check-circle"></i>
                  <span>No employer required</span>
                </div>
                <div className="proof-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Entrepreneurs now qualify</span>
                </div>
                <div className="proof-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Commercial work counts</span>
                </div>
              </div>

              <Link to="/forms/eb2-niw-intake" className="path-cta">
                <i className="fas fa-calendar-check"></i>
                Book $699 NIW Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* $499 Consultation Box */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #fafbfc 0%, #ffffff 100%)', padding: '6rem 3rem' }}>
        <div className="section-container">
          <div style={{ background: 'white', border: '3px solid #d4af37', borderRadius: '24px', padding: '4rem 3rem', boxShadow: '0 20px 60px rgba(212, 175, 55, 0.2)', maxWidth: '1100px', margin: '0 auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{ display: 'inline-block', background: 'rgba(212, 175, 55, 0.15)', padding: '0.75rem 2rem', borderRadius: '50px', marginBottom: '1.5rem' }}>
                <span style={{ color: '#d4af37', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '1px' }}>⚡ STOP WASTING TIME</span>
              </div>
              
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.75rem', fontWeight: 800, color: '#1a1a2e', lineHeight: 1.2, marginBottom: '1rem' }}>
                Find Out If You Qualify in 60 Minutes.<br/>
                <span style={{ color: '#d4af37' }}>Not After 18 Months of Wasted Work.</span>
              </h2>
              
              <p style={{ fontSize: '1.25rem', color: '#4a5568', lineHeight: 1.7, maxWidth: '850px', margin: '0 auto' }}>
                Most attorneys will happily take your money and file an EB-1 even if you don't qualify. Then 18 months later? Denied. <strong style={{ color: '#1a1a2e' }}>We tell you the truth in Week 1.</strong> If your citations aren't high enough, we say so. If your case needs more evidence, we build it BEFORE filing. $499 buys you honesty.
              </p>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #f7fafc 0%, #ffffff 100%)', border: '2px dashed #d4af37', borderRadius: '16px', padding: '3rem 2.5rem', marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '2rem', textAlign: 'center' }}>
                Your $499 Green Card Reality Check:
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #d4af37' }}>
                  <div style={{ flexShrink: 0, width: '32px', height: '32px', background: '#d4af37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>✓</div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: '1.1rem', color: '#1a1a2e' }}>Citation Analysis Like a Financial Audit</strong> (We Count EVERY Citation Across Databases)
                    <div style={{ color: '#d4af37', fontWeight: 700, marginTop: '0.25rem' }}>$1,500 Value</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #d4af37' }}>
                  <div style={{ flexShrink: 0, width: '32px', height: '32px', background: '#d4af37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>✓</div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: '1.1rem', color: '#1a1a2e' }}>EB-1 vs EB-2 NIW Pathway Recommendation</strong> (We Tell You Which Has Higher Approval Odds)
                    <div style={{ color: '#d4af37', fontWeight: 700, marginTop: '0.25rem' }}>$750 Value</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #d4af37' }}>
                  <div style={{ flexShrink: 0, width: '32px', height: '32px', background: '#d4af37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>✓</div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: '1.1rem', color: '#1a1a2e' }}>Honest "You Don't Qualify Yet" Assessment</strong> (We Won't File Weak Cases)
                    <div style={{ color: '#d4af37', fontWeight: 700, marginTop: '0.25rem' }}>$500 Value</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #d4af37' }}>
                  <div style={{ flexShrink: 0, width: '32px', height: '32px', background: '#d4af37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>✓</div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: '1.1rem', color: '#1a1a2e' }}>Evidence Gap Analysis & Publication Strategy</strong> (What You Need to Publish Before Filing)
                    <div style={{ color: '#d4af37', fontWeight: 700, marginTop: '0.25rem' }}>$1,200 Value</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', background: 'white', borderRadius: '8px', borderLeft: '4px solid #d4af37' }}>
                  <div style={{ flexShrink: 0, width: '32px', height: '32px', background: '#d4af37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>✓</div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: '1.1rem', color: '#1a1a2e' }}>10 USCIS Criteria Breakdown</strong> (Which 3 of 10 You Already Meet)
                    <div style={{ color: '#d4af37', fontWeight: 700, marginTop: '0.25rem' }}>$600 Value</div>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '3px solid #d4af37', paddingTop: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem', color: '#4a5568', marginBottom: '0.5rem' }}>What Other Attorneys Charge to File (Then Tell You Later It Won't Work):</div>
                <div style={{ fontSize: '2rem', fontWeight: 300, color: '#9ca3af', textDecoration: 'line-through', marginBottom: '0.5rem' }}>$4,550</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '1rem' }}>What We Charge to Tell You the TRUTH First: <span style={{ fontSize: '2.5rem', color: '#d4af37' }}>$499</span></div>
                
                <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '1.5rem', borderRadius: '12px', marginTop: '1.5rem' }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '0.5rem' }}>
                    🎯 And Yes: 100% Credited If You Hire Us
                  </div>
                  <div style={{ fontSize: '1.05rem', color: '#4a5568', lineHeight: 1.6 }}>
                    You're not paying for consultation. You're paying to find out if your case is strong enough to WIN—before wasting $25K on a denial. If you qualify and hire us? $499 is credited. If you don't qualify? You saved yourself 18 months of false hope.
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: '#fffbeb', borderLeft: '4px solid #f59e0b', padding: '2rem', borderRadius: '12px', marginBottom: '3rem' }}>
              <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#78350f', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>⚠️</span> Don't Book This If You Want False Hope
              </h4>
              <p style={{ fontSize: '1.05rem', color: '#78350f', lineHeight: 1.7, marginBottom: '1rem' }}>
                <strong>We will tell you NO if your case is weak:</strong>
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                <li style={{ padding: '0.5rem 0', color: '#78350f', fontSize: '1.05rem' }}>❌ 500 citations and expecting EB-1 approval? Not happening. We'll tell you to wait.</li>
                <li style={{ padding: '0.5rem 0', color: '#78350f', fontSize: '1.05rem' }}>❌ NIW case with no evidence of national importance? We won't file it.</li>
                <li style={{ padding: '0.5rem 0', color: '#78350f', fontSize: '1.05rem' }}>❌ Want an attorney to "just try and see what happens"? Find someone else.</li>
              </ul>
              <p style={{ fontSize: '1.05rem', color: '#78350f', lineHeight: 1.7, margin: 0, fontWeight: 600 }}>
                This is for researchers and entrepreneurs who want the TRUTH about their green card odds—not attorneys who take your money and hope for the best.
              </p>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '2rem', background: '#f0fdf4', borderRadius: '12px' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#16a34a', marginBottom: '0.5rem' }}>88%</div>
              <div style={{ fontSize: '1.2rem', color: '#166534', fontWeight: 700 }}>Of Our EB-1/EB-2 Cases Get Approved</div>
              <p style={{ fontSize: '1rem', color: '#15803d', marginTop: '1rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                Not because we're lucky. Because we don't file weak cases. We tell you NO in Week 1 if you don't qualify. We build evidence for 6 months if needed. Then we file petitions USCIS can't deny.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link 
                to="/forms/eb1-intake"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1rem',
                  background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)',
                  color: 'white',
                  padding: '1.75rem 4rem',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  fontWeight: 900,
                  fontSize: '1.3rem',
                  boxShadow: '0 12px 40px rgba(212, 175, 55, 0.35)',
                  transition: 'all 0.3s',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                <i className="fas fa-calendar-check" style={{ fontSize: '1.5rem' }}></i>
                Get Your $499 Reality Check
              </Link>
              
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'inline-block', background: '#fee2e2', border: '2px solid #ef4444', padding: '0.75rem 1.5rem', borderRadius: '8px' }}>
                  <span style={{ color: '#991b1b', fontWeight: 700, fontSize: '0.95rem' }}>
                    ⚡ We only take 15 EB-1/EB-2 cases at a time
                  </span>
                </div>
              </div>

              <p style={{ marginTop: '2rem', fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.6 }}>
                After booking: Send us your CV, publication list, and citation counts.<br/>
                We'll analyze everything BEFORE our call. No wasted time.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Big 4 Section */}
      <section className="section">
        <div className="section-container">
          <div style={{ background: 'linear-gradient(165deg, #1a1a2e 0%, #2d3748 100%)', borderRadius: '24px', padding: '4rem', color: 'white', margin: '4rem 0' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.75rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.2 }}>
              EB-1 Cases Require the Same Rigor as a <span style={{ color: '#d4af37' }}>Big 4 Financial Audit.</span><br/>
              Most Immigration Attorneys Have Never Done One.
            </h2>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.8, opacity: 0.95, marginBottom: '1.5rem' }}>
              When I worked at one of the world's largest firms, we didn't count citations the way immigration attorneys do—we counted them the way auditors count revenue: across multiple databases, with independent verification, comparative percentile analysis, and quality assessment. That's the standard I bring to EB-1 citation analysis.
            </p>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.8, opacity: 0.95 }}>
              Your 8,000 citations mean nothing if they're all self-citations or from predatory journals. USCIS knows this. Most attorneys don't. We analyze citation QUALITY the same way we analyzed financial statements for Fortune 500 companies: forensically.
            </p>
          </div>
        </div>
      </section>

      {/* Criteria Section */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #f7fafc 0%, #ffffff 100%)' }}>
        <div className="section-container">
          <div className="section-header">
            <div className="section-tag">EB-1 QUALIFICATION CRITERIA</div>
            <h2 className="section-title">USCIS Requires 3 of 10 Criteria.<br/>Most Researchers Meet 5+ and Don't Know It.</h2>
            <p className="section-description">
              The issue isn't whether you qualify. The issue is whether you can PROVE it. That's where most EB-1 cases fail—not qualification, but documentation. We know how to build evidence USCIS can't dispute.
            </p>
          </div>

          <div className="criteria-grid">
            <div className="criteria-card">
              <h4>1. Awards for Excellence</h4>
              <p>National/international prizes. Fellowship selections. Best paper awards at top conferences. Grant competitions you won. NOT participation certificates.</p>
            </div>

            <div className="criteria-card">
              <h4>2. Membership in Associations</h4>
              <p>Selective membership requiring outstanding achievements. IEEE Senior Member. Exclusive professional societies. NOT associations anyone can join by paying dues.</p>
            </div>

            <div className="criteria-card">
              <h4>3. Published Material About You</h4>
              <p>Media coverage in major outlets. Trade publications profiling your work. News articles about your research. NOT self-published content.</p>
            </div>

            <div className="criteria-card">
              <h4>4. Judging Others' Work</h4>
              <p>Peer review for top journals. Grant panel reviewer. Conference program committee. PhD thesis examiner. Proof you're recognized as an expert by OTHER experts.</p>
            </div>

            <div className="criteria-card">
              <h4>5. Original Scientific Contributions</h4>
              <p>Citations. Widely adopted methodologies. Patents commercialized. Research that shaped the field. THIS is where most cases succeed or fail.</p>
            </div>

            <div className="criteria-card">
              <h4>6. Scholarly Articles</h4>
              <p>Publications in high-impact journals. Conference papers at top venues. Books published by academic presses. Quality matters more than quantity.</p>
            </div>

            <div className="criteria-card">
              <h4>7. Critical Employment</h4>
              <p>Leading role at distinguished organization. Principal investigator on major grants. Department head. If your departure would significantly impact your organization, this qualifies.</p>
            </div>

            <div className="criteria-card">
              <h4>8. High Salary</h4>
              <p>Compensation in top percentile for your field. Industry data comparison required. If you're paid like the top 10%, this helps. If not, focus elsewhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)', padding: '5rem 3rem', textAlign: 'center', color: 'white' }}>
        <div className="section-container">
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>
            Stop Gambling on H-1B Lottery Luck.
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.95 }}>
            You're extraordinary. Your citations prove it. Your publications prove it. Your work proves it.<br/>
            Time to get the green card that proves USCIS finally figured it out.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
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
                background: 'white',
                color: '#d4af37'
              }}
            >
              <i className="fas fa-phone"></i>
              Call: {settings?.phone_display || '+1 (313) 771-2283'}
            </a>
            <Link
              to="/forms/eb1-intake"
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
              <i className="fas fa-calendar-check"></i>
              Book $499 Assessment
            </Link>
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </>
  );
}
