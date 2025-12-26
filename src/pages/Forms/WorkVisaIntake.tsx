import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Layout/Navigation';
import { FormAccessGuard } from '../../components/Common/FormAccessGuard';
import { PaymentModal } from '../../components/Common/PaymentModal';
import { AccountCreationNudge } from '../../components/Common/AccountCreationNudge';
import { useFormSubmissionWithPayment } from '../../hooks/useFormSubmissionWithPayment';
import { submitForm } from '../../lib/supabase';
import '../../styles/form-page.css';
import '../../styles/home.css';

export const WorkVisaIntake: React.FC = () => {
  const [formData, setFormData] = useState({
    fullLegalName: '',
    email: '',
    phone: '',
    currentLocation: '',
    citizenship: '',
    visaType: '',
    urgencyLevel: '',
    companyName: '',
    jobTitle: '',
    positionDescription: '',
    requiredEducation: '',
    highestDegree: '',
    degreeInstitution: '',
    degreeYear: '',
    previousVisas: '',
    currentVisaStatus: '',
    visaDenialHistory: '',
    desiredStartDate: '',
    additionalInfo: ''
  });

  const [loading, setLoading] = useState(false);

  const {
    showPaymentModal,
    showNudgeModal,
    currentEmail,
    paymentId,
    handleFormSubmit,
    handlePaymentSuccess,
    handleSkipAccount,
    closePaymentModal,
  } = useFormSubmissionWithPayment();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await submitForm('work-visa-intake', formData.email, formData);
      handleFormSubmit(formData.email, result.needsPayment || false);
      
      setFormData({
        fullLegalName: '',
        email: '',
        phone: '',
        currentLocation: '',
        citizenship: '',
        visaType: '',
        urgencyLevel: '',
        companyName: '',
        jobTitle: '',
        positionDescription: '',
        requiredEducation: '',
        highestDegree: '',
        degreeInstitution: '',
        degreeYear: '',
        previousVisas: '',
        currentVisaStatus: '',
        visaDenialHistory: '',
        desiredStartDate: '',
        additionalInfo: ''
      });
      
    } catch (error) {
      console.error('Error submitting work visa intake:', error);
      alert('There was an error submitting your form. Please try again or call +1 (313) 771-2283.');
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyPrice = () => {
    switch (formData.urgencyLevel) {
      case 'emergency': return '$499';
      case 'urgent': return '$499';
      case 'standard': return '$499';
      default: return '$499';
    }
  };

  return (
    <FormAccessGuard>
      <Navigation />

      <section className="form-hero" style={{ background: 'linear-gradient(165deg, #1a1a2e 0%, #2d3748 100%)' }}>
        <div className="form-hero-container">
          <div className="form-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/services/immigration/work-visas">Work Visas</Link> / <span>Intake Form</span>
          </div>

          <div className="form-hero-badge" style={{ background: 'rgba(231, 76, 60, 0.2)', borderColor: '#e74c3c', color: 'white' }}>
            <i className="fas fa-briefcase"></i>
            💼 Work Visa Intake
          </div>

          <h1 style={{ color: 'white' }}>
            Work Visa <span style={{ color: '#e74c3c' }}>Intake Form</span>
          </h1>

          <p className="form-hero-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Complete this intake form for H-1B, L-1, O-1, TN, E-3, or RFE emergency response. Pricing varies based on urgency level.
          </p>

          <div className="form-hero-features">
            <div className="form-hero-feature">
              <i className="fas fa-bolt"></i>
              <span>24-Hour RFE Response</span>
            </div>
            <div className="form-hero-feature">
              <i className="fas fa-shield-alt"></i>
              <span>Attorney-Client Privileged</span>
            </div>
            <div className="form-hero-feature">
              <i className="fas fa-dollar-sign"></i>
              <span>{getUrgencyPrice()} Consultation</span>
            </div>
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="form-section-container">
          <div className="form-card">
            <div className="form-card-header">
              <h2>Work Visa Strategy Session</h2>
              <p>Protected by attorney-client privilege considerations</p>
            </div>

            <div className="form-card-body">
              <div className="confidential-notice">
                <strong>⚠️ CONFIDENTIAL ATTORNEY-CLIENT COMMUNICATION</strong><br/>
                This intake form is protected by attorney-client privilege. Information provided will be kept strictly confidential.
              </div>
              
              <form onSubmit={handleSubmit}>
                <h3 className="form-section-title">
                  <i className="fas fa-user"></i>
                  Contact Information
                </h3>

                <div className="form-group">
                  <label className="form-label">
                    Full Legal Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullLegalName"
                    className="form-input"
                    value={formData.fullLegalName}
                    onChange={handleChange}
                    required
                  />
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
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Current Location <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="currentLocation"
                      className="form-input"
                      placeholder="City, Country"
                      value={formData.currentLocation}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Country of Citizenship <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="citizenship"
                      className="form-input"
                      value={formData.citizenship}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-divider"></div>

                <h3 className="form-section-title">
                  <i className="fas fa-passport"></i>
                  Visa Type & Urgency
                </h3>

                <div className="form-group">
                  <label className="form-label">
                    Which visa type do you need? <span className="required">*</span>
                  </label>
                  <select
                    name="visaType"
                    className="form-input"
                    value={formData.visaType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Visa Type --</option>
                    <option value="H-1B">H-1B Specialty Occupation</option>
                    <option value="L-1">L-1 Intracompany Transfer</option>
                    <option value="O-1">O-1 Extraordinary Ability</option>
                    <option value="TN">TN NAFTA Professional</option>
                    <option value="E-3">E-3 Australian Specialty</option>
                    <option value="RFE">RFE Emergency Response</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Urgency Level <span className="required">*</span>
                  </label>
                  <select
                    name="urgencyLevel"
                    className="form-input"
                    value={formData.urgencyLevel}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Urgency Level --</option>
                    <option value="emergency">🔴 Emergency (24-hour RFE response) - $499</option>
                    <option value="urgent">🟡 Urgent (Need visa within 30 days) - $399</option>
                    <option value="standard">🟢 Standard (Normal processing) - $299</option>
                  </select>
                </div>

                <div className="form-divider"></div>

                <h3 className="form-section-title">
                  <i className="fas fa-building"></i>
                  Company & Position Information
                </h3>

                <div className="form-group">
                  <label className="form-label">
                    Company/Employer Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    className="form-input"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Job Title <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    className="form-input"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Position Description <span className="required">*</span>
                  </label>
                  <textarea
                    name="positionDescription"
                    className="form-input"
                    value={formData.positionDescription}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe the position duties and responsibilities"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Required Education for Position
                  </label>
                  <input
                    type="text"
                    name="requiredEducation"
                    className="form-input"
                    placeholder="e.g., Bachelor's in Computer Science, Master's in Engineering"
                    value={formData.requiredEducation}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-divider"></div>

                <h3 className="form-section-title">
                  <i className="fas fa-graduation-cap"></i>
                  Education & Background
                </h3>

                <div className="form-group">
                  <label className="form-label">
                    Highest Degree Earned <span className="required">*</span>
                  </label>
                  <select
                    name="highestDegree"
                    className="form-input"
                    value={formData.highestDegree}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Degree --</option>
                    <option value="High School">High School</option>
                    <option value="Associate">Associate Degree</option>
                    <option value="Bachelor">Bachelor's Degree</option>
                    <option value="Master">Master's Degree</option>
                    <option value="Doctorate">Doctorate/PhD</option>
                    <option value="Professional">Professional Degree (MD, JD, etc.)</option>
                  </select>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Institution Name
                    </label>
                    <input
                      type="text"
                      name="degreeInstitution"
                      className="form-input"
                      value={formData.degreeInstitution}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Graduation Year
                    </label>
                    <input
                      type="text"
                      name="degreeYear"
                      className="form-input"
                      placeholder="YYYY"
                      value={formData.degreeYear}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-divider"></div>

                <h3 className="form-section-title">
                  <i className="fas fa-history"></i>
                  Immigration History
                </h3>

                <div className="form-group">
                  <label className="form-label">
                    Previous U.S. Visas Held
                  </label>
                  <textarea
                    name="previousVisas"
                    className="form-input"
                    value={formData.previousVisas}
                    onChange={handleChange}
                    rows={3}
                    placeholder="List any previous U.S. visas (type and dates)"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Current U.S. Visa Status (if applicable)
                  </label>
                  <input
                    type="text"
                    name="currentVisaStatus"
                    className="form-input"
                    value={formData.currentVisaStatus}
                    onChange={handleChange}
                    placeholder="e.g., H-1B valid until 12/31/2025"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Visa Denials or RFE History
                  </label>
                  <textarea
                    name="visaDenialHistory"
                    className="form-input"
                    value={formData.visaDenialHistory}
                    onChange={handleChange}
                    rows={3}
                    placeholder="If you've received any visa denials or RFEs, provide details"
                  />
                </div>

                <div className="form-divider"></div>

                <h3 className="form-section-title">
                  <i className="fas fa-calendar-alt"></i>
                  Timeline & Additional Information
                </h3>

                <div className="form-group">
                  <label className="form-label">
                    Desired Start Date <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    name="desiredStartDate"
                    className="form-input"
                    value={formData.desiredStartDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Additional Information or Special Circumstances
                  </label>
                  <textarea
                    name="additionalInfo"
                    className="form-input"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Any other information we should know about your case"
                  />
                </div>

                <div className="form-divider"></div>

                <div className="consultation-fee-box" style={{ background: 'rgba(231, 76, 60, 0.1)', border: '2px solid #e74c3c', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
                  <h4 style={{ color: '#e74c3c', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 700 }}>
                    📋 Consultation Fee: {getUrgencyPrice()}
                  </h4>
                  <p style={{ color: '#4a5568', marginBottom: '0.5rem' }}>
                    <strong>Emergency (24-hour RFE):</strong> $499
                  </p>
                  <p style={{ color: '#4a5568', marginBottom: '0.5rem' }}>
                    <strong>Urgent (30-day timeline):</strong> $399
                  </p>
                  <p style={{ color: '#4a5568' }}>
                  <strong>Standard Processing:</strong> $499

                <button
                  type="submit"
                  className="form-submit-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Work Visa Intake
                      <i className="fas fa-arrow-right"></i>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={closePaymentModal}
          email={currentEmail}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {showNudgeModal && (
        <AccountCreationNudge
          isOpen={showNudgeModal}
          onSkip={handleSkipAccount}
          email={currentEmail}
          paymentId={paymentId}
        />
      )}
    </FormAccessGuard>
  );
};
export default WorkVisaIntake;
