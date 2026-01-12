import Link from 'next/link';
import { Navigation } from '../../../components/Layout/Navigation';
import { EnhancedFooter } from '../../../components/Layout';
import '../../../styles/service-page.css';
import '../../../styles/home.css';

export default function EB5Investor() {
  const eb5Styles = `
    .eb5-hero {
      background: linear-gradient(165deg, #1a1a2e 0%, #2d3748 100%);
      padding: 8rem 3rem 6rem;
      position: relative;
      overflow: hidden;
    }
    .eb5-hero::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 50%;
      height: 100%;
      background: linear-gradient(135deg, rgba(44, 82, 130, 0.2) 0%, transparent 100%);
      pointer-events: none;
    }
    .eb5-breadcrumb {
      display: flex;
      gap: 0.75rem;
      align-items: center;
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.95rem;
      margin-bottom: 2rem;
    }
    .eb5-breadcrumb a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: color 0.3s;
    }
    .eb5-breadcrumb a:hover {
      color: white;
    }
    .eb5-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      background: rgba(44, 82, 130, 0.3);
      border: 2px solid #2c5282;
      padding: 0.75rem 1.5rem;
      border-radius: 50px;
      color: white;
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 2.5rem;
    }
    .eb5-badge i {
      color: #bee3f8;
    }
    .eb5-hero h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 4.5rem;
      font-weight: 800;
      color: white;
      line-height: 1.1;
      margin-bottom: 2rem;
      max-width: 1100px;
    }
    .eb5-hero h1 .highlight {
      color: #bee3f8;
    }
    .eb5-subtitle {
      font-size: 1.3rem;
      color: rgba(255, 255, 255, 0.9);
      line-height: 1.8;
      max-width: 950px;
      margin-bottom: 3rem;
    }
    .eb5-stats {
      display: flex;
      gap: 4rem;
      flex-wrap: wrap;
    }
    .eb5-stat {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .eb5-stat-number {
      font-size: 3rem;
      font-weight: 900;
      color: #bee3f8;
      line-height: 1;
    }
    .eb5-stat-label {
      font-size: 0.95rem;
      color: rgba(255, 255, 255, 0.8);
      font-weight: 500;
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
      max-width: 100%;
    }
    .section-tag {
      display: inline-block;
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
      max-width: 1050px;
      margin-left: auto;
      margin-right: auto;
    }
    .section-description {
      font-size: 1.2rem;
      color: #4a5568;
      max-width: 1000px;
      margin: 0 auto;
      line-height: 1.8;
    }
    .pathway-card {
      background: white;
      border: 3px solid #e2e8f0;
      borderRadius: 20px;
      padding: 3rem;
      transition: all 0.3s;
    }
    .pathway-card:hover {
      transform: translateY(-8px);
      border-color: #2c5282;
      box-shadow: 0 20px 60px rgba(44, 82, 130, 0.2);
    }
    @media (max-width: 768px) {
      .eb5-hero h1 {
        font-size: 3rem;
      }
      .section-title {
        font-size: 2.25rem;
      }
      .eb5-stats {
        gap: 2rem;
      }
    }
  `;

  return (
    <>
      <style>{eb5Styles}</style>
      <Navigation />

      {/* Hero Section */}
      <section className="eb5-hero">
        <div className="service-hero-container" style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="eb5-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/services/immigration">Immigration</Link>
            <span>/</span>
            <span>EB-5 Investor</span>
          </div>

          <div className="eb5-badge">
            <i className="fas fa-building"></i>
            <span>EB-5 INVESTOR IMMIGRATION</span>
          </div>

          <h1>
            $1.05M Investment. Permanent U.S. Residence.<br/>
            <span className="highlight">But 60% Fail on Source of Funds.</span>
          </h1>

          <p className="eb5-subtitle">
            You have the capital. You want permanent residence for your family. But most EB-5 cases get denied—not because 
            the investment isn't real, but because USCIS can't trace where your $1M came from. The family office that made $50M 
            from real estate in Shanghai. The entrepreneur who sold their company for $20M. If you can't DOCUMENT every dollar 
            with forensic precision? USCIS denies. We audit your source of funds BEFORE you file. Not after USCIS destroys your case.
          </p>

          <div className="eb5-stats">
            <div className="eb5-stat">
              <span className="eb5-stat-number">60%</span>
              <span className="eb5-stat-label">EB-5 Cases Fail on Source of Funds</span>
            </div>
            <div className="eb5-stat">
              <span className="eb5-stat-number">$1.05M</span>
              <span className="eb5-stat-label">Standard Area Investment</span>
            </div>
            <div className="eb5-stat">
              <span className="eb5-stat-number">Big 4</span>
              <span className="eb5-stat-label">Financial Due Diligence Training</span>
            </div>
          </div>
        </div>
      </section>

      {/* Danger Box */}
      <section className="section">
        <div className="section-container">
          <div style={{ background: 'linear-gradient(135deg, #fee2e2 0%, #fef2f2 100%)', border: '3px solid #ef4444', borderRadius: '20px', padding: '3rem', margin: '2rem 0' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#991b1b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <i className="fas fa-exclamation-triangle"></i>
              The $1M Mistake Most Families Make
            </h3>
            <p style={{ fontSize: '1.15rem', color: '#7f1d1d', lineHeight: 1.8 }}>
              <strong>They hire an immigration attorney who's never done forensic financial due diligence.</strong> So they file 
              EB-5 with "trust me, I earned this legitimately" documentation. Then 18 months later, USCIS issues an RFE demanding 
              transaction records from 15 years ago. Bank statements from accounts that no longer exist. Proof your Chinese real 
              estate sales weren't connected to party officials. Tax returns from jurisdictions that don't require them. And suddenly 
              your $1.05M is locked in a Regional Center, your family's green cards are denied, and you're scrambling to find 
              documents that never existed. We find these gaps in Week 1. Not Month 18.
            </p>
          </div>

          {/* Pathways */}
          <div className="section-header" style={{ marginTop: '4rem' }}>
            <span className="section-tag" style={{ background: 'rgba(44, 82, 130, 0.1)', color: '#2c5282' }}>
              TWO INVESTMENT PATHWAYS
            </span>
            <h2 className="section-title">
              Most EB-5 Attorneys Ask "Where'd the Money Come From?"<br/>
              We Ask "Can You PROVE It?"
            </h2>
            <p className="section-description">
              There's a difference. The family office that says "we made $50M in commercial real estate" versus the family office 
              that can produce: purchase agreements, mortgage records, sale proceeds wire transfers, capital gains tax filings, and 
              corporate financial statements covering 10 years. USCIS doesn't accept stories. They accept DOCUMENTS.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '3rem', margin: '4rem 0' }}>
            {/* Regional Center */}
            <div className="pathway-card">
              <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #2c5282 0%, #1a365d 100%)', color: 'white', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', marginBottom: '1.5rem' }}>
                REGIONAL CENTER (90% OF CASES)
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '1rem' }}>
                Invest, Create Jobs (Indirectly), Get Green Card
              </h3>
              <p style={{ color: '#4a5568', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                You invest $1.05M (or $800K in Targeted Employment Area) into a USCIS-approved Regional Center project. They use 
                your capital for commercial real estate, infrastructure, or business ventures. They create 10 jobs (direct + indirect). 
                You get conditional green card, then permanent after 2 years if jobs are maintained.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: 'rgba(44, 82, 130, 0.05)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#2c5282' }}>$1.05M</div>
                  <div style={{ fontSize: '0.85rem', color: '#4a5568' }}>Standard Investment</div>
                </div>
                <div style={{ background: 'rgba(44, 82, 130, 0.05)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#2c5282' }}>$800K</div>
                  <div style={{ fontSize: '0.85rem', color: '#4a5568' }}>TEA Investment</div>
                </div>
                <div style={{ background: 'rgba(44, 82, 130, 0.05)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#2c5282' }}>90%</div>
                  <div style={{ fontSize: '0.85rem', color: '#4a5568' }}>Of All EB-5 Cases</div>
                </div>
                <div style={{ background: 'rgba(44, 82, 130, 0.05)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#2c5282' }}>Passive</div>
                  <div style={{ fontSize: '0.85rem', color: '#4a5568' }}>No Active Management</div>
                </div>
              </div>

              <p style={{ fontSize: '0.95rem', color: '#4a5568' }}>
                <strong>The Risk:</strong> Regional Center picks bad project. Jobs aren't created. Your $1M is locked up but green 
                card is denied. Due diligence on the REGIONAL CENTER is as important as due diligence on your source of funds.
              </p>

              <Link 
                href="/forms/eb5-intake" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: 'linear-gradient(135deg, #2c5282 0%, #1a365d 100%)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  marginTop: '1.5rem',
                  transition: 'all 0.3s'
                }}
              >
                <i className="fas fa-calendar-check"></i>
                Book $499 EB-5 Assessment
              </Link>
            </div>

            {/* Direct Investment */}
            <div className="pathway-card">
              <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #2c5282 0%, #1a365d 100%)', color: 'white', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', marginBottom: '1.5rem' }}>
                DIRECT INVESTMENT (10% OF CASES)
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '1rem' }}>
                Start/Buy Business, Manage It, Create 10 Jobs
              </h3>
              <p style={{ color: '#4a5568', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                You invest $1.05M into YOUR OWN business. Restaurant. Manufacturing. Retail. Software company. Whatever. You manage 
                it. You create 10 FULL-TIME jobs for U.S. workers. You prove job creation with I-9s, payroll records, tax documents. 
                Higher control, higher risk, active management required.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: 'rgba(44, 82, 130, 0.05)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#2c5282' }}>$1.05M</div>
                  <div style={{ fontSize: '0.85rem', color: '#4a5568' }}>Minimum Investment</div>
                </div>
                <div style={{ background: 'rgba(44, 82, 130, 0.05)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#2c5282' }}>10</div>
                  <div style={{ fontSize: '0.85rem', color: '#4a5568' }}>Full-Time Jobs</div>
                </div>
                <div style={{ background: 'rgba(44, 82, 130, 0.05)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#2c5282' }}>10%</div>
                  <div style={{ fontSize: '0.85rem', color: '#4a5568' }}>Of All EB-5 Cases</div>
                </div>
                <div style={{ background: 'rgba(44, 82, 130, 0.05)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#2c5282' }}>Active</div>
                  <div style={{ fontSize: '0.85rem', color: '#4a5568' }}>Day-to-Day Management</div>
                </div>
              </div>

              <p style={{ fontSize: '0.95rem', color: '#4a5568' }}>
                <strong>The Risk:</strong> Business fails. You can't prove 10 jobs were created/maintained. Green card denied AND 
                you lost $1M. This path is for entrepreneurs who WANT to run a U.S. business, not passive investors.
              </p>

              <Link 
                href="/forms/eb5-intake" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: 'linear-gradient(135deg, #2c5282 0%, #1a365d 100%)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  marginTop: '1.5rem',
                  transition: 'all 0.3s'
                }}
              >
                <i className="fas fa-calendar-check"></i>
                Book $499 EB-5 Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Source of Funds Section */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #f7fafc 0%, #ffffff 100())' }}>
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag" style={{ background: 'rgba(44, 82, 130, 0.1)', color: '#2c5282' }}>
              THE 60% FAILURE POINT
            </span>
            <h2 className="section-title">
              What "Source of Funds Documentation" Actually Means<br/>
              (And Why Most Families Can't Produce It)
            </h2>
            <p className="section-description">
              USCIS doesn't just want to know you have $1.05M. They want to know where EVERY dollar came from. Business sale? Show 
              purchase price, sale agreement, wire transfers, tax returns. Real estate profits? Show purchase records, mortgage docs, 
              sale proceeds, capital gains filings. Inheritance? Show death certificates, probate records, estate tax filings. It's 
              forensic accounting. Most immigration attorneys have never done it.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '3rem' }}>
            {[
              {
                title: 'Business Sale Proceeds',
                content: 'Sale agreement. Purchase price breakdown. Wire transfer confirmations. Tax returns (3-5 years). Corporate financial statements. Proof company was profitable. Capital gains tax filings. If you sold your company for $20M but can\'t show HOW it became worth $20M? Denied.'
              },
              {
                title: 'Real Estate Investment Profits',
                content: 'Original purchase agreements. Mortgage documents. Proof of mortgage payments. Sale proceeds records. Property appreciation documentation. Capital gains tax returns. Rental income records if applicable. Transaction history spanning 10+ years in some cases.'
              },
              {
                title: 'Inheritance & Gifts',
                content: 'Death certificates. Probate court records. Estate tax filings. Wire transfer from estate. Proof donor had legitimate source for gift. Gift tax returns. If your father gifted you $2M, USCIS will ask: where did YOUR FATHER get $2M? That\'s the depth of scrutiny.'
              },
              {
                title: 'Salary & Bonuses',
                content: 'Employment contracts. Tax returns (5-10 years). Payroll records. Bank statements showing deposits. Proof of salary progression. If you claim you saved $1.05M from salary, USCIS will verify your income history supports that accumulation.'
              },
              {
                title: 'Investment Portfolio Gains',
                content: 'Brokerage statements (entire period). Buy/sell confirmations. Dividend records. Capital gains tax returns. Proof of original investment source. The paper trail must go ALL THE WAY BACK to the original lawful source of seed capital.'
              },
              {
                title: 'Loan Collateral',
                content: 'If using borrowed funds: loan agreement, proof of collateral ownership, collateral source of funds documentation, ability to repay proof. USCIS will scrutinize: can you actually repay this loan? Where did the COLLATERAL come from? It\'s not a shortcut.'
              }
            ].map((item, index) => (
              <div key={index} style={{ background: 'white', border: '2px solid #e2e8f0', borderRadius: '16px', padding: '2rem' }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.75rem' }}>{item.title}</h4>
                <p style={{ color: '#4a5568', lineHeight: 1.7, fontSize: '0.95rem' }}>{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: 'linear-gradient(135deg, #2c5282 0%, #1a365d 100%)', padding: '5rem 3rem', textAlign: 'center', color: 'white' }}>
        <div className="section-container">
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>
            Invest $499 in Source of Funds Review Before You Waste $1.05M
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '3rem', opacity: 0.95 }}>
            We audit your source of funds FIRST. We find the gaps. We tell you what documents don't exist.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/forms/eb5-intake"
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
                color: '#2c5282'
              }}
            >
              Start EB-5 Intake <i className="fas fa-arrow-right"></i>
            </Link>
            <a
              href="tel:+13137712283"
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
              <i className="fas fa-phone-alt"></i> +1 (313) 771-2283
            </a>
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </>
  );
}

