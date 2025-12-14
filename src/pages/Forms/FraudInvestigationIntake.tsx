import React, { useState } from 'react';
import { Navigation } from '../../components/Layout/Navigation';
import { FormAccessGuard } from '../../components/Common/FormAccessGuard';
import { PaymentModal } from '../../components/Common/PaymentModal';
import { AccountCreationNudge } from '../../components/Common/AccountCreationNudge';
import { useFormSubmissionWithPayment } from '../../hooks/useFormSubmissionWithPayment';
import { submitForm } from '../../lib/supabase';
import '../../styles/form-page.css';
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

      {/* Confidential Header */}
      <section className="confidential-header">
        <div className="confidential-badge">
          <i className="fas fa-shield-alt"></i>
          ATTORNEY-CLIENT PRIVILEGED & CONFIDENTIAL
        </div>
        <h1>Corporate Fraud Investigation Intake</h1>
        <p>Complete this secure form for immediate assessment of your situation</p>
      </section>

      <div className="container">
        <div className="form-container">
          <div className="form-header">
            <h2>Confidential Case Assessment</h2>
            <p>All information submitted is protected by attorney-client privilege considerations</p>
          </div>

          <div className="urgency-notice">
            <h4><i className="fas fa-exclamation-triangle"></i> URGENT MATTER?</h4>
            <p>If you require immediate assistance with an active fraud investigation, regulatory inquiry, or whistleblower situation, call our emergency line directly.</p>
            <a href="tel:+1-313-771-2283" className="emergency-btn">
              <i className="fas fa-phone-alt"></i>
              EMERGENCY LINE: +1 (313) 771-2283
            </a>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Contact Information */}
            <div className="form-section">
              <h3 className="section-title">
                <i className="fas fa-user-tie"></i> Your Information
              </h3>
              
              <div className="form-group">
                <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
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
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="company">Company/Organization <span className="required">*</span></label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
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
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="preferredContact">Preferred Contact Method</label>
                <select
                  id="preferredContact"
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleChange}
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone Call</option>
                  <option value="text">Text Message</option>
                  <option value="secure">Secure Portal</option>
                </select>
              </div>
            </div>

            {/* Situation Overview */}
            <div className="form-section">
              <h3 className="section-title">
                <i className="fas fa-exclamation-circle"></i> Situation Overview
              </h3>
              
              <div className="form-group">
                <label>Type of Suspected Fraud <span className="required">*</span></label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                  {[
                    { value: 'financialStatement', label: 'Financial Statement Fraud' },
                    { value: 'assetMisappropriation', label: 'Asset Misappropriation' },
                    { value: 'corruption', label: 'Corruption / Bribery' },
                    { value: 'vendorFraud', label: 'Vendor / Procurement Fraud' },
                    { value: 'payrollFraud', label: 'Payroll Fraud' },
                    { value: 'executiveMisconduct', label: 'Executive Misconduct' },
                    { value: 'other', label: 'Other (please describe below)' }
                  ].map((type) => (
                    <label key={type.value} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      fontWeight: 'normal', 
                      cursor: 'pointer',
                      width: '100%',
                      justifyContent: 'flex-start'
                    }}>
                      <input
                        type="checkbox"
                        name="fraudType"
                        value={type.value}
                        checked={formData.fraudType.includes(type.value)}
                        onChange={handleChange}
                        style={{ 
                          marginRight: '0.5rem',
                          flexShrink: 0,
                          order: 1
                        }}
                      />
                      <span style={{ order: 2, flex: 1 }}>{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="suspectedAmount">Estimated Financial Impact</label>
                <select
                  id="suspectedAmount"
                  name="suspectedAmount"
                  value={formData.suspectedAmount}
                  onChange={handleChange}
                >
                  <option value="">Select range</option>
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
              
              <div className="form-group">
                <label htmlFor="suspectedIndividuals">Suspected Individuals/Departments</label>
                <textarea
                  id="suspectedIndividuals"
                  name="suspectedIndividuals"
                  value={formData.suspectedIndividuals}
                  onChange={handleChange}
                  placeholder="Please describe who you suspect may be involved and their positions..."
                />
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
                />
              </div>
            </div>

            {/* Current Status */}
            <div className="form-section">
              <h3 className="section-title">
                <i className="fas fa-clipboard-list"></i> Current Status
              </h3>
              
              <div className="form-group">
                <label>Has This Been Reported Internally? <span className="required">*</span></label>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  {[
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' },
                    { value: 'partial', label: 'Partially' }
                  ].map((option) => (
                    <label key={option.value} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      fontWeight: 'normal', 
                      cursor: 'pointer',
                      justifyContent: 'flex-start'
                    }}>
                      <input
                        type="radio"
                        name="reportedInternally"
                        value={option.value}
                        checked={formData.reportedInternally === option.value}
                        onChange={handleChange}
                        required
                        style={{ 
                          marginRight: '0.5rem',
                          flexShrink: 0,
                          order: 1
                        }}
                      />
                      <span style={{ order: 2 }}>{option.label}</span>
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
                />
              </div>
              
              <div className="form-group">
                <label>External Reporting Status</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                  {[
                    { value: 'lawEnforcement', label: 'Law Enforcement Involved' },
                    { value: 'regulatory', label: 'Regulatory Agencies Involved' },
                    { value: 'externalCounsel', label: 'Other Legal Counsel Involved' },
                    { value: 'auditors', label: 'External Auditors Involved' },
                    { value: 'none', label: 'No External Parties Involved' }
                  ].map((option) => (
                    <label key={option.value} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      fontWeight: 'normal', 
                      cursor: 'pointer',
                      width: '100%',
                      justifyContent: 'flex-start'
                    }}>
                      <input
                        type="checkbox"
                        name="externalReporting"
                        value={option.value}
                        checked={formData.externalReporting.includes(option.value)}
                        onChange={handleChange}
                        style={{ 
                          marginRight: '0.5rem',
                          flexShrink: 0,
                          order: 1
                        }}
                      />
                      <span style={{ order: 2, flex: 1 }}>{option.label}</span>
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
                  placeholder="Please provide details about any external parties involved, including agency names, contact information, and current status..."
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="documentsPreserved">Have Documents/Evidence Been Preserved?</label>
                <select
                  id="documentsPreserved"
                  name="documentsPreserved"
                  value={formData.documentsPreserved}
                  onChange={handleChange}
                >
                  <option value="">Select status</option>
                  <option value="fully">Fully Preserved</option>
                  <option value="partially">Partially Preserved</option>
                  <option value="planned">Preservation Planned</option>
                  <option value="not-preserved">Not Yet Preserved</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            </div>

            {/* Electronic Signature */}
            <div className="form-section">
              <h3 className="section-title">
                <i className="fas fa-signature"></i> Authorization & Acknowledgment
              </h3>
              
              <div className="privacy-notice">
                <h4><i className="fas fa-shield-alt"></i> Confidentiality Notice</h4>
                <p>This intake form and all information provided is confidential and protected by attorney-client privilege considerations. Rivalis Law maintains strict confidentiality protocols and secure data handling procedures.</p>
              </div>
              
              <div className="form-group">
                <label htmlFor="additionalInfo">Additional Information or Questions</label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Please provide any additional information you think would be helpful for our assessment..."
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
                <p className="form-note">
                  By typing your name above, you acknowledge that this constitutes your electronic signature and agreement to the terms stated in this intake form.
                </p>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Submitting Securely...
                </>
              ) : (
                <>
                  <i className="fas fa-shield-alt"></i>
                  Submit Confidential Assessment
                </>
              )}
            </button>
          </form>

          <div className="emergency-contact">
            <h4>Need Immediate Assistance?</h4>
            <p>For urgent fraud investigation matters requiring immediate attention</p>
            <a href="tel:+1-313-771-2283" className="emergency-btn">
              <i className="fas fa-phone"></i>
              Call Emergency Line: +1 (313) 771-2283
            </a>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={closePaymentModal}
        onSuccess={handlePaymentSuccess}
        email={currentEmail}
        amount={299}
      />

      {/* Account Creation Nudge Modal */}
      <AccountCreationNudge
        isOpen={showNudgeModal}
        email={currentEmail}
        paymentId={paymentId}
        onSkip={handleSkipAccount}
      />
    </FormAccessGuard>
  );
};