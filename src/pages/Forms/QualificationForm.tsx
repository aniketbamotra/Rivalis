import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Layout/Navigation';
import { submitForm } from '../../lib/supabase';
import '../../styles/form-page.css';
import '../../styles/home.css';

export const QualificationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    industry: '',
    employeeCount: '',
    annualRevenue: '',
    legalNeeds: '',
    timeline: '',
    budget: '',
    referralSource: '',
    additionalInfo: '',
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
      await submitForm('qualification', formData.email, formData);
      alert('Thank you! Your qualification form has been submitted. A member of our team will review and contact you within 24 hours.');
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        industry: '',
        employeeCount: '',
        annualRevenue: '',
        legalNeeds: '',
        timeline: '',
        budget: '',
        referralSource: '',
        additionalInfo: '',
      });
    } catch (error) {
      console.error('Error submitting qualification form:', error);
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
            <Link to="/">Home</Link> / <span>Client Qualification</span>
          </div>

          <div className="form-hero-badge">
            <i className="fas fa-user-check"></i>
            Free Consultation
          </div>

          <h1>Client <span className="highlight">Qualification</span></h1>

          <p className="form-hero-subtitle">
            Help us understand your business so we can provide the best possible legal counsel. 
            This form helps us match you with the right attorney and services for your needs.
          </p>

          <div className="form-hero-features">
            <div className="form-hero-feature">
              <i className="fas fa-clock"></i>
              <span>Quick Assessment</span>
            </div>
            <div className="form-hero-feature">
              <i className="fas fa-user-tie"></i>
              <span>Attorney Matching</span>
            </div>
            <div className="form-hero-feature">
              <i className="fas fa-comments"></i>
              <span>24hr Response</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="form-section">
        <div className="form-section-container">
          <div className="form-card">
            <div className="form-card-header">
              <h2>Business Qualification Form</h2>
              <p>Tell us about your business and legal needs</p>
            </div>

            <div className="form-card-body">
              <form onSubmit={handleSubmit}>
                {/* Contact Information */}
                <h3 className="form-section-title">
                  <i className="fas fa-user"></i>
                  Contact Information
                </h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Your Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      className="form-input"
                      placeholder="Your full name"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Company Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      className="form-input"
                      placeholder="Your Company Inc."
                      value={formData.companyName}
                      onChange={handleChange}
                      required
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
                      placeholder="your@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-divider"></div>

                {/* Business Details */}
                <h3 className="form-section-title">
                  <i className="fas fa-building"></i>
                  Business Details
                </h3>

                <div className="form-group">
                  <label className="form-label">
                    Industry <span className="required">*</span>
                  </label>
                  <select
                    name="industry"
                    className="form-select"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select industry...</option>
                    <option value="technology">Technology / SaaS</option>
                    <option value="healthcare">Healthcare / Life Sciences</option>
                    <option value="finance">Finance / Banking</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="retail">Retail / E-commerce</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="professional-services">Professional Services</option>
                    <option value="hospitality">Hospitality / Food Service</option>
                    <option value="media">Media / Entertainment</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Number of Employees
                    </label>
                    <select
                      name="employeeCount"
                      className="form-select"
                      value={formData.employeeCount}
                      onChange={handleChange}
                    >
                      <option value="">Select size...</option>
                      <option value="solo">Just Me (Solo)</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Annual Revenue
                    </label>
                    <select
                      name="annualRevenue"
                      className="form-select"
                      value={formData.annualRevenue}
                      onChange={handleChange}
                    >
                      <option value="">Select revenue range...</option>
                      <option value="pre-revenue">Pre-Revenue / Startup</option>
                      <option value="under-1m">Under $1M</option>
                      <option value="1m-5m">$1M - $5M</option>
                      <option value="5m-20m">$5M - $20M</option>
                      <option value="20m-50m">$20M - $50M</option>
                      <option value="over-50m">Over $50M</option>
                    </select>
                  </div>
                </div>

                <div className="form-divider"></div>

                {/* Legal Needs */}
                <h3 className="form-section-title">
                  <i className="fas fa-gavel"></i>
                  Legal Services Needed
                </h3>

                <div className="form-group">
                  <label className="form-label">
                    What Legal Services Are You Looking For? <span className="required">*</span>
                  </label>
                  <textarea
                    name="legalNeeds"
                    className="form-textarea"
                    placeholder="Describe what legal services you need (e.g., entity formation, contracts, employment matters, IP protection, compliance, M&A, immigration, etc.)..."
                    value={formData.legalNeeds}
                    onChange={handleChange}
                    required
                    style={{ minHeight: '120px' }}
                  ></textarea>
                  <p className="form-help">The more detail you provide, the better we can match you with the right attorney.</p>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Timeline
                    </label>
                    <select
                      name="timeline"
                      className="form-select"
                      value={formData.timeline}
                      onChange={handleChange}
                    >
                      <option value="">Select timeline...</option>
                      <option value="urgent">Urgent (Within days)</option>
                      <option value="1-2-weeks">1-2 weeks</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="planning">Just planning ahead</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      className="form-select"
                      value={formData.budget}
                      onChange={handleChange}
                    >
                      <option value="">Select budget range...</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-15k">$5,000 - $15,000</option>
                      <option value="15k-50k">$15,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="over-100k">Over $100,000</option>
                      <option value="ongoing">Ongoing retainer</option>
                      <option value="unsure">Not sure / Need quote</option>
                    </select>
                  </div>
                </div>

                <div className="form-divider"></div>

                {/* Additional Info */}
                <h3 className="form-section-title">
                  <i className="fas fa-info-circle"></i>
                  Additional Information
                </h3>

                <div className="form-group">
                  <label className="form-label">
                    How Did You Hear About Us?
                  </label>
                  <select
                    name="referralSource"
                    className="form-select"
                    value={formData.referralSource}
                    onChange={handleChange}
                  >
                    <option value="">Select source...</option>
                    <option value="google">Google Search</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="referral">Referral from colleague</option>
                    <option value="attorney-referral">Referral from another attorney</option>
                    <option value="conference">Conference / Event</option>
                    <option value="article">Article / Publication</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Anything Else We Should Know?
                  </label>
                  <textarea
                    name="additionalInfo"
                    className="form-textarea"
                    placeholder="Any other details that would help us understand your needs, existing legal relationships, or specific concerns..."
                    value={formData.additionalInfo}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="form-info-box">
                  <h4><i className="fas fa-shield-alt"></i> What Happens Next?</h4>
                  <p>After you submit this form, one of our attorneys will review your information and reach out within 24 hours to schedule a complimentary consultation. All information is kept strictly confidential.</p>
                </div>

                <button type="submit" className="form-submit-btn" disabled={loading}>
                  <i className="fas fa-paper-plane"></i>
                  {loading ? 'Submitting...' : 'Submit Qualification Form'}
                </button>

                <div className="form-note">
                  <i className="fas fa-check-circle"></i>
                  <span>We respond to all inquiries within 24 business hours</span>
                </div>
              </form>

              {/* Contact Box */}
              <div className="form-contact-box">
                <h4>Prefer to Talk First?</h4>
                <p>If you'd like to speak with us before filling out this form, we're happy to help:</p>
                <a href="mailto:intake@rivalislaw.com" className="form-contact-item">
                  <i className="fas fa-envelope"></i>
                  <span>intake@rivalislaw.com</span>
                </a>
                <a href="tel:+1-313-771-2283" className="form-contact-item">
                  <i className="fas fa-phone"></i>
                  <span>(313) 771-2283</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="form-cta-section">
        <h2>Explore Our Services</h2>
        <p>Learn more about the legal services we provide to businesses at every stage.</p>
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

export default QualificationForm;

