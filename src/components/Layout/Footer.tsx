import React from 'react';
import { useSiteSettings } from '../../hooks/useSiteSettings';

interface FooterProps {
  showLinks?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ showLinks = true }) => {
  const { settings } = useSiteSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {showLinks && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '3rem',
              marginBottom: '2rem',
              textAlign: 'left',
            }}
            className="footer-grid"
          >
            {/* Brand */}
            <div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: '1rem',
                }}
              >
                <span style={{ color: 'var(--color-accent)' }}>⚖</span> Rivalis Law
              </div>
              <p style={{ fontSize: '0.9rem' }}>
                Elite legal counsel across 9 specialized practice areas. Big 4 trained, Oxford
                certified.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 style={{ fontWeight: 600, color: 'white', marginBottom: '1rem' }}>Services</h4>
              <ul style={{ listStyle: 'none', fontSize: '0.9rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="/services/contracts">Contract Review</a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="/services/immigration">Immigration</a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="/services/data-privacy">Data Privacy</a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="/services/employment">Employment Law</a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 style={{ fontWeight: 600, color: 'white', marginBottom: '1rem' }}>Legal</h4>
              <ul style={{ listStyle: 'none', fontSize: '0.9rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="/legal/terms">Terms & Conditions</a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="/legal/privacy">Privacy Policy</a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="/legal/disclaimers">Disclaimers</a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ fontWeight: 600, color: 'white', marginBottom: '1rem' }}>Contact</h4>
              <ul style={{ listStyle: 'none', fontSize: '0.9rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href={`mailto:${settings?.email_contact || 'contact@rivalislaw.com'}`}>{settings?.email_contact || 'contact@rivalislaw.com'}</a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href={`tel:${settings?.phone_primary || '+1-313-771-2283'}`}>{settings?.phone_display || '+1 (313) 771-2283'}</a>
                </li>
              </ul>
            </div>
          </div>
        )}

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '2rem',
            textAlign: 'center',
            fontSize: '0.9rem',
          }}
        >
          <p>&copy; {currentYear} Rivalis Law. Licensed in New York & Michigan.</p>
          <p style={{ marginTop: '0.5rem' }}>
            <a href="/">Return to Main Site</a>
            <span style={{ margin: '0 0.5rem' }}>|</span>
            <a href="/#services">All Services</a>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  );
};
