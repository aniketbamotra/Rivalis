import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../../components/Layout/Navigation';
import { EnhancedFooter } from '../../../components/Layout';
import '../../../styles/service-page.css';

export const EB5Investor: React.FC = () => {
  return (
    <>
      <Navigation />
      <section className="service-hero" style={{ background: 'linear-gradient(165deg, #1a1a2e 0%, #2d3748 100%)' }}>
        <div className="service-hero-container">
          <div className="service-breadcrumb"><Link to="/">Home</Link> / <Link to="/services/immigration">Immigration</Link> / <span>EB-5 Investor</span></div>
          <div className="service-hero-badge" style={{ background: 'rgba(44, 82, 130, 0.3)', borderColor: '#2c5282' }}><i className="fas fa-chart-line"></i> INVESTMENT-BASED GREEN CARD</div>
          <h1>$1.05M Investment. <span className="highlight" style={{ color: '#2c5282' }}>Permanent Residence</span>.<br />But 60% Fail on Source of Funds.</h1>
          <p className="service-hero-subtitle">EB-5 provides permanent residence to investors who invest $800K-$1.05M in U.S. commercial enterprises creating 10+ jobs. But source of funds documentation kills most cases. We audit your capital BEFORE you file.</p>
          <div className="service-hero-stats">
            <div className="service-stat"><div className="service-stat-number">$800K</div><div className="service-stat-label">TEA investment minimum</div></div>
            <div className="service-stat"><div className="service-stat-number">10</div><div className="service-stat-label">Jobs created required</div></div>
            <div className="service-stat"><div className="service-stat-number">24-48mo</div><div className="service-stat-label">Timeline to conditional green card</div></div>
          </div>
          <div className="service-cta-group">
            <Link to="/forms/eb5-intake" className="service-btn service-btn-primary" style={{ background: 'linear-gradient(135deg, #2c5282 0%, #1a365d 100%)' }}><i className="fas fa-clipboard-check"></i> Source of Funds Audit</Link>
          </div>
        </div>
      </section>

      <section className="service-section">
        <div className="service-section-container">
          <div style={{ background: 'linear-gradient(135deg, #fee2e2 0%, #fef2f2 100%)', border: '3px solid #ef4444', borderRadius: '12px', padding: '2.5rem', marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#dc2626', marginBottom: '1rem' }}><i className="fas fa-exclamation-triangle"></i> 60% of EB-5 Cases Fail on Source of Funds</h3>
            <p style={{ fontSize: '1.1rem', color: '#991b1b', lineHeight: 1.7 }}>You can have $2M in the bank. You can invest in the perfect project. But if you can't prove where every dollar came from with bulletproof documentation, USCIS will deny your petition. Most EB-5 denials happen because of inadequate source of funds evidence—not because of the investment itself.</p>
          </div>
        </div>
      </section>

      <section className="service-section" style={{ background: '#f7fafc' }}>
        <div className="service-section-container">
          <div className="service-section-header">
            <div className="service-section-tag" style={{ background: 'rgba(44, 82, 130, 0.1)', color: '#2c5282' }}>TWO PATHWAYS</div>
            <h2 className="section-title">EB-5 Investment Options</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'white', padding: '2.5rem', borderRadius: '12px', border: '2px solid #2c5282' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem' }}>Regional Center</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#2c5282', marginBottom: '1rem' }}>$800,000</div>
              <p style={{ color: '#4a5568', marginBottom: '1.5rem' }}>Invest in USCIS-approved regional center projects. Jobs can be created indirectly. Less management required.</p>
              <ul style={{ color: '#4a5568', lineHeight: 2 }}><li>✓ Targeted Employment Area (TEA)</li><li>✓ Indirect job creation counts</li><li>✓ Less day-to-day involvement</li><li>✓ Pre-approved projects</li></ul>
            </div>
            <div style={{ background: 'white', padding: '2.5rem', borderRadius: '12px', border: '2px solid #2c5282' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem' }}>Direct Investment</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#2c5282', marginBottom: '1rem' }}>$1,050,000</div>
              <p style={{ color: '#4a5568', marginBottom: '1.5rem' }}>Invest directly in a new commercial enterprise you create or purchase. Direct job creation required. More control.</p>
              <ul style={{ color: '#4a5568', lineHeight: 2 }}><li>✓ Standard minimum investment</li><li>✓ Must create 10 direct jobs</li><li>✓ Your own business</li><li>✓ Full operational control</li></ul>
            </div>
          </div>
        </div>
      </section>

      <section className="service-section">
        <div className="service-section-container">
          <div style={{ background: 'white', border: '3px solid #2c5282', borderRadius: '16px', padding: '3rem', maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '2rem' }}>Source of Funds Due Diligence - $2,500</h2>
            <p style={{ textAlign: 'center', color: '#4a5568', fontSize: '1.1rem', marginBottom: '2rem' }}>Before you invest $800K+ and pay $50K in legal fees, get a comprehensive audit of your source of funds documentation. We'll tell you exactly what evidence you need.</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Link to="/forms/eb5-intake" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #2c5282 0%, #1a365d 100%)', color: 'white', padding: '1rem 2.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '1.1rem' }}>
                <i className="fas fa-search-dollar"></i> Start Source of Funds Audit
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="service-section" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #2d3748 100%)', padding: '5rem 3rem' }}>
        <div className="service-section-container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>Don't Waste $800K+ on a Doomed Petition</h2>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '800px', margin: '0 auto 3rem' }}>Get professional source of funds review before you invest. We'll identify documentation gaps and fix them BEFORE you file.</p>
          <Link to="/forms/eb5-intake" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #2c5282 0%, #1a365d 100%)', color: 'white', padding: '1rem 2.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '1.1rem' }}>
            Start EB-5 Assessment
          </Link>
        </div>
      </section>
      <EnhancedFooter />
    </>
  );
};

export default EB5Investor;
