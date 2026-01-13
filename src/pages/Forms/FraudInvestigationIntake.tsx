import React, { useState } from 'react';
import { Navigation } from '../../components/Layout/Navigation';
import { EnhancedFooter } from '../../components/Layout';
import { FormAccessGuard } from '../../components/Common/FormAccessGuard';
import { PaymentModal } from '../../components/Common/PaymentModal';
import { AccountCreationNudge } from '../../components/Common/AccountCreationNudge';
import { useFormSubmissionWithPayment } from '../../hooks/useFormSubmissionWithPayment';
import { submitForm } from '../../lib/supabase';
import '../../styles/form-page.css';
import '../../styles/home.css';
import '../../styles/fraud-investigation.css';

export const FraudInvestigationIntake: React.FC = () => {
  const [formData, setFormData] = useState({
    // Contact Information
    fullName: '',
    position: '',
    company: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    
    // Situation Overview
    fraudType: [] as string[],
    suspectedAmount: '',
    discoveryDate: '',
    suspectedIndividuals: '',
    situationDescription: '',
    
    // Current Status
    reportedInternally: '',
    internalReportingDetails: '',
    externalReporting: [] as string[],
    externalDetails: '',
    documentsPreserved: '',
    
    // Urgency & Timeline
    urgencyLevel: '',
    timeConstraints: '',
    investigationGoals: '',
    
    // Legal Concerns
    legalConcerns: [] as string[],
    otherCounsel: '',
    insuranceCoverage: '',
    
    // Additional Information
    additionalInfo: '',
    electronicSignature: '',
    signatureDate: '',
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
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      if (checkbox.checked) {
        setFormData(prev => ({
          ...prev,
          [name]: [...(prev[name as keyof typeof prev] as string[]), value]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: (prev[name as keyof typeof prev] as string[]).filter(item => item !== value)
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Set signature date if electronic signature is provided
      const submissionData = {
        ...formData,
        signatureDate: formData.electronicSignature ? new Date().toISOString().split('T')[0] : formData.signatureDate
      };
      
      const result = await submitForm('fraud_investigation', formData.email, submissionData);
      handleFormSubmit(formData.email, result.needsPayment || false);
      
      // Reset form
      setFormData({
        fullName: '',
        position: '',
        company: '',
        email: '',
        phone: '',
        preferredContact: 'email',
        fraudType: [],
        suspectedAmount: '',
        discoveryDate: '',
        suspectedIndividuals: '',
        situationDescription: '',
        reportedInternally: '',
        internalReportingDetails: '',
        externalReporting: [],
        externalDetails: '',
        documentsPreserved: '',
        urgencyLevel: '',
        timeConstraints: '',
        investigationGoals: '',
        legalConcerns: [],
        otherCounsel: '',
        insuranceCoverage: '',
        additionalInfo: '',
        electronicSignature: '',
        signatureDate: '',
      });
      
    } catch (error) {
      console.error('Error submitting fraud investigation intake:', error);
      alert('There was an error submitting your confidential intake form. Please try again or call our emergency line: (313) 771-2283');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormAccessGuard>
      <Navigation />

      {/* Hero Section */}
      <section className="form-hero">
        <div className="form-hero-container">
          <div className="form-hero-badge">
            <i className="fas fa-shield-alt"></i>
            CONFIDENTIAL & ATTORNEY-CLIENT PRIVILEGED
          </div>
          <h1>Corporate Fraud Investigation<br /><span className="highlight">Confidential Intake Form</span></h1>
          <p className="form-hero-subtitle">
            Secure assessment of suspected fraud, misconduct, or regulatory matters. All information is protected by attorney-client privilege.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="form-container">
          {/* Emergency Alert */}
          <div className="alert-box alert-urgent">
            <div className="alert-icon">
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <div className="alert-content">
              <h3>Need Immediate Assistance?</h3>
              <p>For active investigations, regulatory inquiries, or whistleblower matters requiring urgent response:</p>
              <a href="tel:+1-313-771-2283" className="alert-btn">
                <i className="fas fa-phone-alt"></i>
                Call Emergency Hotline: +1 (313) 771-2283
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Section 1: Contact Information */}
            <fieldset className="form-fieldset">
              <legend className="fieldset-legend">
                <i className="fas fa-user-circle"></i>
                Your Information
              </legend>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full legal name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="position">Position/Title <span className="required">*</span></label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    placeholder="Your role in the organization"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company">Company/Organization <span className="required">*</span></label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    placeholder="Organization name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address <span className="required">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="(123) 456-7890"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="preferredContact">Preferred Contact Method</label>
                  <select id="preferredContact" name="preferredContact" value={formData.preferredContact} onChange={handleChange}>
                    <option value="">Select preferred method...</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone Call</option>
                    <option value="text">Text Message</option>
                    <option value="secure">Secure Portal Only</option>
                  </select>
                </div>
              </div>
            </fieldset>

            {/* Section 2: Situation Overview */}
            <fieldset className="form-fieldset">
              <legend className="fieldset-legend">
                <i className="fas fa-exclamation-triangle"></i>
                Situation Overview
              </legend>
              
              <div className="form-group">
                <label>Type of Suspected Fraud <span className="required">*</span></label>
                <div className="checkbox-group">
                  {[
                    { value: 'financialStatement', label: 'Financial Statement Fraud' },
                    { value: 'assetMisappropriation', label: 'Asset Misappropriation' },
                    { value: 'corruption', label: 'Corruption / Bribery' },
                    { value: 'vendorFraud', label: 'Vendor / Procurement Fraud' },
                    { value: 'payrollFraud', label: 'Payroll Fraud' },
                    { value: 'executiveMisconduct', label: 'Executive Misconduct' },
                    { value: 'other', label: 'Other (please describe below)' }
                  ].map(option => (
                    <label key={option.value} className="checkbox-label">
                      <input
                        type="checkbox"
                        value={option.value}
                        name="fraudType"
                        checked={formData.fraudType.includes(option.value)}
                        onChange={handleChange}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="suspectedAmount">Estimated Financial Impact</label>
                  <select id="suspectedAmount" name="suspectedAmount" value={formData.suspectedAmount} onChange={handleChange}>
                    <option value="">Select range...</option>
                    <option value="under50k">Under $50,000</option>
                    <option value="50k-250k">$50,000 - $250,000</option>
                    <option value="250k-1m">$250,000 - $1 Million</option>
                    <option value="1m-5m">$1 Million - $5 Million</option>
                    <option value="over5m">Over $5 Million</option>
                    <option value="unknown">Unknown at this time</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="discoveryDate">When Was This Discovered? <span className="required">*</span></label>
                  <input
                    type="date"
                    id="discoveryDate"
                    name="discoveryDate"
                    value={formData.discoveryDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="situationDescription">Description of Situation <span className="required">*</span></label>
                <textarea
                  id="situationDescription"
                  name="situationDescription"
                  value={formData.situationDescription}
                  onChange={handleChange}
                  required
                  placeholder="Please provide a detailed description of the suspected fraud, how it was discovered, and any evidence you currently have..."
                  rows={6}
                />
              </div>

              <div className="form-group">
                <label htmlFor="suspectedIndividuals">Suspected Individuals/Departments</label>
                <textarea
                  id="suspectedIndividuals"
                  name="suspectedIndividuals"
                  value={formData.suspectedIndividuals}
                  onChange={handleChange}
                  placeholder="Please describe who you suspect may be involved and their positions..."
                  rows={4}
                />
              </div>
            </fieldset>

            {/* Section 3: Current Status */}
            <fieldset className="form-fieldset">
              <legend className="fieldset-legend">
                <i className="fas fa-clipboard-list"></i>
                Current Status & External Involvement
              </legend>
              
              <div className="form-group">
                <label>Has This Been Reported Internally? <span className="required">*</span></label>
                <div className="radio-group">
                  {[
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' },
                    { value: 'partial', label: 'Partially' }
                  ].map(option => (
                    <label key={option.value} className="radio-label">
                      <input
                        type="radio"
                        name="reportedInternally"
                        value={option.value}
                        checked={formData.reportedInternally === option.value}
                        onChange={handleChange}
                        required
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="internalReportingDetails">If Reported, To Whom and When?</label>
                <textarea
                  id="internalReportingDetails"
                  name="internalReportingDetails"
                  value={formData.internalReportingDetails}
                  onChange={handleChange}
                  placeholder="Please specify who was notified internally and when..."
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label>External Reporting Status</label>
                <div className="checkbox-group">
                  {[
                    { value: 'lawEnforcement', label: 'Law Enforcement Involved' },
                    { value: 'regulatory', label: 'Regulatory Agencies Involved' },
                    { value: 'externalCounsel', label: 'Other Legal Counsel Involved' },
                    { value: 'auditors', label: 'External Auditors Involved' },
                    { value: 'none', label: 'No External Parties Involved' }
                  ].map(option => (
                    <label key={option.value} className="checkbox-label">
                      <input
                        type="checkbox"
                        value={option.value}
                        name="externalReporting"
                        checked={formData.externalReporting.includes(option.value)}
                        onChange={handleChange}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="externalDetails">External Involvement Details</label>
                <textarea
                  id="externalDetails"
                  name="externalDetails"
                  value={formData.externalDetails}
                  onChange={handleChange}
                  placeholder="Please provide details about any external parties involved, including agency names and current status..."
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label htmlFor="documentsPreserved">Have Documents/Evidence Been Preserved?</label>
                <select id="documentsPreserved" name="documentsPreserved" value={formData.documentsPreserved} onChange={handleChange}>
                  <option value="">Select status...</option>
                  <option value="fully">Fully Preserved</option>
                  <option value="partially">Partially Preserved</option>
                  <option value="planned">Preservation Planned</option>
                  <option value="not-preserved">Not Yet Preserved</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            </fieldset>

            {/* Section 4: Authorization & Signature */}
            <fieldset className="form-fieldset">
              <legend className="fieldset-legend">
                <i className="fas fa-signature"></i>
                Acknowledgment & Authorization
              </legend>
              
              <div className="info-box">
                <i className="fas fa-lock"></i>
                <div>
                  <strong>Confidentiality Notice:</strong> This intake form and all information provided is confidential and protected by attorney-client privilege considerations. Rivalis Law maintains strict confidentiality protocols and secure data handling procedures.
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="additionalInfo">Additional Information or Questions</label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Please provide any additional information you think would be helpful for our assessment..."
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label htmlFor="electronicSignature">Electronic Signature (Type your full name) <span className="required">*</span></label>
                <input
                  type="text"
                  id="electronicSignature"
                  name="electronicSignature"
                  value={formData.electronicSignature}
                  onChange={handleChange}
                  required
                  placeholder="Type your full legal name as your electronic signature"
                />
                <p className="form-hint">By typing your name above, you acknowledge this constitutes your electronic signature and agreement to submit this confidential intake form.</p>
              </div>
            </fieldset>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={loading}
            >
              <i className="fas fa-lock"></i>
              {loading ? 'Submitting...' : 'Submit Confidential Assessment'}
            </button>
          </form>

          {/* Payment/Success Modals */}
          {showPaymentModal && (
            <PaymentModal
              isOpen={showPaymentModal}
              amount={5000}
              serviceType="fraud_investigation"
              email={currentEmail}
              onClose={closePaymentModal}
              onPaymentSuccess={handlePaymentSuccess}
            />
          )}

          {showNudgeModal && (
            <AccountCreationNudge
              isOpen={showNudgeModal}
              email={currentEmail}
              paymentId={paymentId}
              onSkip={handleSkipAccount}
            />
          )}
        </div>
      </div>

      <EnhancedFooter />
    </FormAccessGuard>
  );
};