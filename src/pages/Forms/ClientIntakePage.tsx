import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Layout/Navigation';
import { submitForm } from '../../lib/supabase';
import '../../styles/form-page.css';
import '../../styles/home.css';

export const ClientIntakePage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceType: '',
    urgency: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitForm('client-intake', formData.email, formData);
      alert('Thank you! Your form has been submitted. We will contact you within 24 hours.');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        serviceType: '',
        urgency: '',
        description: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again or call (313) 771-2283.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />

      {/* Hero */}
      <section className="form-hero">
        <div className="form-hero-container">
          <div className="form-breadcrumb">
            <Link to="/">Home</Link> / <span>Client Intake</span>
          </div>

          <div className="form-hero-badge">
            <i className="fas fa-shield-alt"></i>
            Attorney-Client Privilege Protected
          </div>

          <h1>Let's Get <span className="highlight">Started</span></h1>

          <p className="form-hero-subtitle">
            Complete this confidential intake form to help us understand your legal needs. 
            All information is protected by attorney-client privilege.
          </p>

          <div className="form-hero-features">
            <div className="form-hero-feature">
              <i className="fas fa-clock"></i>
              <span>24-Hour Response</span>
            </div>
            <div className="form-hero-feature">
              <i className="fas fa-lock"></i>
              <span>100% Confidential</span>
            </div>
            <div className="form-hero-feature">
              <i className="fas fa-user-tie"></i>
              <span>Direct Attorney Review</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="form-section">
        <div className="form-section-container">
          <div className="form-card">
            <div className="form-card-header">
              <h2>Client Intake Form</h2>
              <p>Please provide your information below</p>
            </div>

            <div className="form-card-body">
              <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <h3 className="form-section-title">
                  <i className="fas fa-user"></i>
                  Personal Information
                </h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      className="form-input"
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      className="form-input"
                      placeholder="Your company (optional)"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Phone Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-divider"></div>

                {/* Service Details */}
                <h3 className="form-section-title">
                  <i className="fas fa-briefcase"></i>
                  Service Details
                </h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Service Type <span className="required">*</span>
                    </label>
                    <select
                      name="serviceType"
                      className="form-select"
                      value={formData.serviceType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a service...</option>
                      <option value="ai-governance">AI Governance & Compliance</option>
                      <option value="immigration">Immigration Services</option>
                      <option value="ma">M&A & Transactions</option>
                      <option value="contracts">Contract Review</option>
                      <option value="data-privacy">Data Privacy</option>
                      <option value="ip-strategy">IP Strategy</option>
                      <option value="employment">Employment Law</option>
                      <option value="entity-formation">Entity Formation</option>
                      <option value="fundraising">Fundraising & Securities</option>
                      <option value="fraud">Fraud Investigation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Timeline <span className="required">*</span>
                    </label>
                    <select
                      name="urgency"
                      className="form-select"
                      value={formData.urgency}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select timeline...</option>
                      <option value="emergency">Emergency (Within 48 hours)</option>
                      <option value="urgent">Urgent (Within 1-2 weeks)</option>
                      <option value="soon">Soon (Within 1 month)</option>
                      <option value="planning">Planning Ahead (1-3 months)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Describe Your Situation <span className="required">*</span>
                  </label>
                  <textarea
                    name="description"
                    className="form-textarea"
                    placeholder="Please provide details about your legal needs, timeline, and any immediate concerns..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <p className="form-help">The more details you provide, the better we can assist you.</p>
                </div>

                <button type="submit" className="form-submit-btn" disabled={loading}>
                  <i className="fas fa-paper-plane"></i>
                  {loading ? 'Submitting...' : 'Submit Intake Form'}
                </button>

                <div className="form-note">
                  <i className="fas fa-lock"></i>
                  <span>Your information is confidential and protected by attorney-client privilege</span>
                </div>
              </form>

              {/* Contact Box */}
              <div className="form-contact-box">
                <h4>Need Immediate Assistance?</h4>
                <p>For urgent matters, contact us directly:</p>
                <a href="tel:+1-313-771-2283" className="form-contact-item">
                  <i className="fas fa-phone"></i>
                  <span>(313) 771-2283</span>
                </a>
                <a href="mailto:contact@rivalislaw.com" className="form-contact-item">
                  <i className="fas fa-envelope"></i>
                  <span>contact@rivalislaw.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="form-cta-section">
        <h2>Questions About Our Services?</h2>
        <p>Explore our practice areas or call us directly to discuss your needs.</p>
        <div className="form-cta-buttons">
          <Link to="/#services" className="form-cta-btn primary">
            <i className="fas fa-briefcase"></i>
            View All Services
          </Link>
          <a href="tel:+1-313-771-2283" className="form-cta-btn secondary">
            <i className="fas fa-phone"></i>
            Call: (313) 771-2283
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="form-footer">
        <p>&copy; 2024 Rivalis Law. Licensed in New York & Michigan.</p>
        <p><Link to="/">Return to Main Site</Link></p>
      </footer>
    </>
  );
};

export default ClientIntakePage;

