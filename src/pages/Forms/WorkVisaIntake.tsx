import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Layout/Navigation';
import { FormAccessGuard } from '../../components/Common/FormAccessGuard';
import { PaymentModal } from '../../components/Common/PaymentModal';
import { AccountCreationNudge } from '../../components/Common/AccountCreationNudge';
import { useFormSubmissionWithPayment } from '../../hooks/useFormSubmissionWithPayment';
import '../../styles/form-page.css';
import '../../styles/home.css';

export const WorkVisaIntake: React.FC = () => {
  const [formData, setFormData] = useState({
    // Contact Information
    fullLegalName: '',
    email: '',
    phone: '',
    currentCountry: '',
    currentCity: '',
    
    // Visa Type Selection
    visaType: '',
    urgencyLevel: '',
    desiredStartDate: '',
    
    // Current Status
    inUS: '',
    currentVisaStatus: '',
    statusExpirationDate: '',
    hasRFE: '',
    rfeDeadline: '',
    hasDenial: '',
    denialDetails: '',
    
    // Employment Information
    companyName: '',
    companyWebsite: '',
    jobTitle: '',
    jobStartDate: '',
    annualSalary: '',
    jobDescription: '',
    
    // Qualifications
    highestDegree: '',
    degreeMajor: '',
    degreeInstitution: '',
    graduationYear: '',
    yearsExperience: '',
    
    // H-1B Specific
    h1bSpecialtyOccupation: '',
    h1bLCAFiled: '',
    
    // L-1 Specific
    l1CompanyRelationship: '',
    l1YearsAbroad: '',
    l1Position: '',
    
    // O-1 Specific
    o1FieldOfExtraordinaryAbility: '',
    o1Awards: '',
    o1Publications: '',
    
    // E-2 Specific
    e2InvestmentAmount: '',
    e2BusinessPlan: '',
    e2TreatyCountry: '',
    
    // TN Specific
    tnProfession: '',
    tnCitizenship: '',
    
    // Previous Immigration History
    previousUSVisas: '',
    visaTypes: '',
    everDenied: '',
    everOverstayed: '',
    criminalHistory: '',
    
    // Timeline and Urgency
    needEmergencyService: '',
    premiumProcessing: '',
    reasonForUrgency: '',
    
    // Additional Information
    dependents: '',
    dependentDetails: '',
    additionalInfo: '',
    howDidYouHear: '',
    
    // Authorization
    clientName: '',
    signatureDate: new Date().toISOString().split('T')[0],
    electronicSignature: false,
  });

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleFormSubmit(formData.email, true);
  };

  return (
    <>
      <Navigation />
      <FormAccessGuard>

      <div className="form-page-container">
        <div className="form-page-header" style={{ background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)' }}>
          <div className="form-page-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/services/immigration">Immigration</Link> / <Link to="/services/immigration/work-visas">Work Visas</Link> / <span>Intake Form</span>
          </div>
          
          <div className="form-page-badge">
            <i className="fas fa-briefcase"></i>
            WORK VISA ASSESSMENT
          </div>
          
          <h1 className="form-page-title">Work Visa Consultation Intake</h1>
          <p className="form-page-description">
            Complete this assessment to receive expert evaluation of your work visa case. For emergency RFE or denial responses, select "Emergency" urgency level for 24-hour response.
          </p>

          <div className="form-page-pricing">
            <div className="pricing-item">
              <div className="pricing-amount">$299</div>
              <div className="pricing-label">Standard Assessment</div>
              <div className="pricing-note">3-5 business days</div>
            </div>
            <div className="pricing-item highlight">
              <div className="pricing-amount">$499</div>
              <div className="pricing-label">Emergency Assessment</div>
              <div className="pricing-note">24-hour response • RFEs • Denials</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form-page-form">
          {/* Contact Information */}
          <div className="form-section">
            <h2 className="form-section-title">
              <i className="fas fa-user"></i> Contact Information
            </h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Full Legal Name <span className="required">*</span></label>
                <input
                  type="text"
                  name="fullLegalName"
                  value={formData.fullLegalName}
                  onChange={handleChange}
                  required
                  placeholder="As shown on passport"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email Address <span className="required">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number <span className="required">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Current Country <span className="required">*</span></label>
                <input
                  type="text"
                  name="currentCountry"
                  value={formData.currentCountry}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Current City</label>
                <input
                  type="text"
                  name="currentCity"
                  value={formData.currentCity}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Visa Type & Urgency */}
          <div className="form-section">
            <h2 className="form-section-title">
              <i className="fas fa-passport"></i> Visa Type & Urgency
            </h2>

            <div className="form-group">
              <label>Which visa type are you applying for? <span className="required">*</span></label>
              <select
                name="visaType"
                value={formData.visaType}
                onChange={handleChange}
                required
              >
                <option value="">Select Visa Type</option>
                <option value="H-1B">H-1B Specialty Occupation</option>
                <option value="L-1A">L-1A Intracompany Transfer (Executive/Manager)</option>
                <option value="L-1B">L-1B Intracompany Transfer (Specialized Knowledge)</option>
                <option value="O-1A">O-1A Extraordinary Ability (Sciences/Business/Education/Athletics)</option>
                <option value="O-1B">O-1B Extraordinary Ability (Arts/Entertainment)</option>
                <option value="TN">TN NAFTA Professional</option>
                <option value="E-2">E-2 Treaty Investor</option>
                <option value="E-3">E-3 Australian Specialty Occupation</option>
                <option value="Not Sure">Not Sure - Need Consultation</option>
              </select>
            </div>

            <div className="form-group">
              <label>Urgency Level <span className="required">*</span></label>
              <select
                name="urgencyLevel"
                value={formData.urgencyLevel}
                onChange={handleChange}
                required
                style={{ 
                  borderColor: formData.urgencyLevel === 'emergency' ? '#e74c3c' : undefined,
                  borderWidth: formData.urgencyLevel === 'emergency' ? '2px' : undefined
                }}
              >
                <option value="">Select Urgency Level</option>
                <option value="standard">Standard - Normal processing (3-5 business days) - $299</option>
                <option value="priority">Priority - Expedited review (1-2 business days) - $399</option>
                <option value="emergency">🚨 EMERGENCY - RFE/Denial/Expiration (24-hour response) - $499</option>
              </select>
            </div>

            {formData.urgencyLevel === 'emergency' && (
              <div className="form-alert alert-danger">
                <i className="fas fa-exclamation-triangle"></i>
                <div>
                  <strong>Emergency Assessment Selected</strong>
                  <p>You will receive initial case analysis within 24 hours. Please provide all relevant documentation and details below. Our emergency team will contact you directly.</p>
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Desired Start Date in U.S. Role</label>
              <input
                type="date"
                name="desiredStartDate"
                value={formData.desiredStartDate}
                onChange={handleChange}
              />
              <small>When do you need to begin working in the United States?</small>
            </div>
          </div>

          {/* Current Immigration Status */}
          <div className="form-section">
            <h2 className="form-section-title">
              <i className="fas fa-flag"></i> Current Immigration Status
            </h2>

            <div className="form-group">
              <label>Are you currently in the United States? <span className="required">*</span></label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="inUS"
                    value="yes"
                    checked={formData.inUS === 'yes'}
                    onChange={handleChange}
                    required
                  />
                  Yes, I am in the U.S.
                </label>
                <label>
                  <input
                    type="radio"
                    name="inUS"
                    value="no"
                    checked={formData.inUS === 'no'}
                    onChange={handleChange}
                  />
                  No, I am outside the U.S.
                </label>
              </div>
            </div>

            {formData.inUS === 'yes' && (
              <>
                <div className="form-group">
                  <label>Current Visa Status</label>
                  <input
                    type="text"
                    name="currentVisaStatus"
                    value={formData.currentVisaStatus}
                    onChange={handleChange}
                    placeholder="e.g., F-1, H-1B, L-1, etc."
                  />
                </div>

                <div className="form-group">
                  <label>Status Expiration Date</label>
                  <input
                    type="date"
                    name="statusExpirationDate"
                    value={formData.statusExpirationDate}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label>Have you received a Request for Evidence (RFE)?</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="hasRFE"
                    value="yes"
                    checked={formData.hasRFE === 'yes'}
                    onChange={handleChange}
                  />
                  Yes - I have an active RFE
                </label>
                <label>
                  <input
                    type="radio"
                    name="hasRFE"
                    value="no"
                    checked={formData.hasRFE === 'no'}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>

            {formData.hasRFE === 'yes' && (
              <div className="form-group">
                <label>RFE Response Deadline <span className="required">*</span></label>
                <input
                  type="date"
                  name="rfeDeadline"
                  value={formData.rfeDeadline}
                  onChange={handleChange}
                  required
                  style={{ borderColor: '#e74c3c', borderWidth: '2px' }}
                />
                <small style={{ color: '#e74c3c', fontWeight: 600 }}>
                  URGENT: Please upload your RFE notice during consultation scheduling
                </small>
              </div>
            )}

            <div className="form-group">
              <label>Have you had any visa denials in the past?</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="hasDenial"
                    value="yes"
                    checked={formData.hasDenial === 'yes'}
                    onChange={handleChange}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="hasDenial"
                    value="no"
                    checked={formData.hasDenial === 'no'}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>

            {formData.hasDenial === 'yes' && (
              <div className="form-group">
                <label>Denial Details</label>
                <textarea
                  name="denialDetails"
                  value={formData.denialDetails}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Please describe which visa was denied, when, and the stated reason for denial"
                />
              </div>
            )}
          </div>

          {/* Employment Information */}
          <div className="form-section">
            <h2 className="form-section-title">
              <i className="fas fa-building"></i> Employment Information
            </h2>

            <div className="form-row">
              <div className="form-group">
                <label>Company Name <span className="required">*</span></label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Company Website</label>
                <input
                  type="url"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  placeholder="https://"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Job Title <span className="required">*</span></label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Proposed Job Start Date</label>
                <input
                  type="date"
                  name="jobStartDate"
                  value={formData.jobStartDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Annual Salary (USD) <span className="required">*</span></label>
              <input
                type="number"
                name="annualSalary"
                value={formData.annualSalary}
                onChange={handleChange}
                required
                placeholder="e.g., 120000"
              />
            </div>

            <div className="form-group">
              <label>Job Description <span className="required">*</span></label>
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Describe the job duties, responsibilities, and requirements. Be specific about technical skills, educational requirements, and specialized knowledge needed."
              />
            </div>
          </div>

          {/* Qualifications */}
          <div className="form-section">
            <h2 className="form-section-title">
              <i className="fas fa-graduation-cap"></i> Education & Experience
            </h2>

            <div className="form-row">
              <div className="form-group">
                <label>Highest Degree <span className="required">*</span></label>
                <select
                  name="highestDegree"
                  value={formData.highestDegree}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Degree</option>
                  <option value="High School">High School</option>
                  <option value="Associate">Associate's Degree</option>
                  <option value="Bachelor">Bachelor's Degree</option>
                  <option value="Master">Master's Degree</option>
                  <option value="PhD">PhD / Doctorate</option>
                  <option value="Professional">Professional Degree (MD, JD, etc.)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Major/Field of Study</label>
                <input
                  type="text"
                  name="degreeMajor"
                  value={formData.degreeMajor}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Institution Name</label>
                <input
                  type="text"
                  name="degreeInstitution"
                  value={formData.degreeInstitution}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Graduation Year</label>
                <input
                  type="number"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  placeholder="YYYY"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Years of Professional Experience <span className="required">*</span></label>
              <input
                type="number"
                name="yearsExperience"
                value={formData.yearsExperience}
                onChange={handleChange}
                required
                placeholder="Total years in this field"
              />
            </div>
          </div>

          {/* Visa-Specific Questions */}
          {(formData.visaType === 'H-1B') && (
            <div className="form-section" style={{ background: 'rgba(231, 76, 60, 0.05)', padding: '2rem', borderRadius: '8px' }}>
              <h2 className="form-section-title">
                <i className="fas fa-clipboard-check"></i> H-1B Specific Questions
              </h2>

              <div className="form-group">
                <label>Specialty Occupation Justification</label>
                <textarea
                  name="h1bSpecialtyOccupation"
                  value={formData.h1bSpecialtyOccupation}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Explain why this position requires a bachelor's degree or higher in a specific specialty"
                />
              </div>

              <div className="form-group">
                <label>Has the Labor Condition Application (LCA) been filed?</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="h1bLCAFiled"
                      value="yes"
                      checked={formData.h1bLCAFiled === 'yes'}
                      onChange={handleChange}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="h1bLCAFiled"
                      value="no"
                      checked={formData.h1bLCAFiled === 'no'}
                      onChange={handleChange}
                    />
                    No
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="h1bLCAFiled"
                      value="not-sure"
                      checked={formData.h1bLCAFiled === 'not-sure'}
                      onChange={handleChange}
                    />
                    Not Sure
                  </label>
                </div>
              </div>
            </div>
          )}

          {(formData.visaType === 'L-1A' || formData.visaType === 'L-1B') && (
            <div className="form-section" style={{ background: 'rgba(231, 76, 60, 0.05)', padding: '2rem', borderRadius: '8px' }}>
              <h2 className="form-section-title">
                <i className="fas fa-clipboard-check"></i> L-1 Specific Questions
              </h2>

              <div className="form-group">
                <label>Company Relationship</label>
                <textarea
                  name="l1CompanyRelationship"
                  value={formData.l1CompanyRelationship}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe the relationship between the foreign company and U.S. company (parent, subsidiary, affiliate, branch)"
                />
              </div>

              <div className="form-group">
                <label>Years Employed Abroad (in qualifying capacity)</label>
                <input
                  type="number"
                  name="l1YearsAbroad"
                  value={formData.l1YearsAbroad}
                  onChange={handleChange}
                  placeholder="Must be at least 1 year in last 3 years"
                />
              </div>

              <div className="form-group">
                <label>Position/Role</label>
                <select
                  name="l1Position"
                  value={formData.l1Position}
                  onChange={handleChange}
                >
                  <option value="">Select Position Type</option>
                  <option value="executive">Executive (L-1A)</option>
                  <option value="manager">Manager (L-1A)</option>
                  <option value="specialized-knowledge">Specialized Knowledge (L-1B)</option>
                </select>
              </div>
            </div>
          )}

          {(formData.visaType === 'O-1A' || formData.visaType === 'O-1B') && (
            <div className="form-section" style={{ background: 'rgba(231, 76, 60, 0.05)', padding: '2rem', borderRadius: '8px' }}>
              <h2 className="form-section-title">
                <i className="fas fa-clipboard-check"></i> O-1 Specific Questions
              </h2>

              <div className="form-group">
                <label>Field of Extraordinary Ability</label>
                <input
                  type="text"
                  name="o1FieldOfExtraordinaryAbility"
                  value={formData.o1FieldOfExtraordinaryAbility}
                  onChange={handleChange}
                  placeholder="e.g., Artificial Intelligence, Film Production, Professional Athletics"
                />
              </div>

              <div className="form-group">
                <label>Awards & Recognition</label>
                <textarea
                  name="o1Awards"
                  value={formData.o1Awards}
                  onChange={handleChange}
                  rows={4}
                  placeholder="List major awards, prizes, recognitions, or honors you've received"
                />
              </div>

              <div className="form-group">
                <label>Publications, Press Coverage, or Media Appearances</label>
                <textarea
                  name="o1Publications"
                  value={formData.o1Publications}
                  onChange={handleChange}
                  rows={4}
                  placeholder="List publications, press mentions, interviews, or media coverage about you and your work"
                />
              </div>
            </div>
          )}

          {formData.visaType === 'E-2' && (
            <div className="form-section" style={{ background: 'rgba(231, 76, 60, 0.05)', padding: '2rem', borderRadius: '8px' }}>
              <h2 className="form-section-title">
                <i className="fas fa-clipboard-check"></i> E-2 Specific Questions
              </h2>

              <div className="form-group">
                <label>Treaty Country of Citizenship</label>
                <input
                  type="text"
                  name="e2TreatyCountry"
                  value={formData.e2TreatyCountry}
                  onChange={handleChange}
                  placeholder="Must be a country with E-2 treaty with the United States"
                />
              </div>

              <div className="form-group">
                <label>Investment Amount (USD)</label>
                <input
                  type="number"
                  name="e2InvestmentAmount"
                  value={formData.e2InvestmentAmount}
                  onChange={handleChange}
                  placeholder="Substantial investment required (typically $100K+)"
                />
              </div>

              <div className="form-group">
                <label>Do you have a business plan?</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="e2BusinessPlan"
                      value="yes"
                      checked={formData.e2BusinessPlan === 'yes'}
                      onChange={handleChange}
                    />
                    Yes, completed
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="e2BusinessPlan"
                      value="draft"
                      checked={formData.e2BusinessPlan === 'draft'}
                      onChange={handleChange}
                    />
                    In progress/draft
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="e2BusinessPlan"
                      value="no"
                      checked={formData.e2BusinessPlan === 'no'}
                      onChange={handleChange}
                    />
                    No, need help creating one
                  </label>
                </div>
              </div>
            </div>
          )}

          {formData.visaType === 'TN' && (
            <div className="form-section" style={{ background: 'rgba(231, 76, 60, 0.05)', padding: '2rem', borderRadius: '8px' }}>
              <h2 className="form-section-title">
                <i className="fas fa-clipboard-check"></i> TN Specific Questions
              </h2>

              <div className="form-group">
                <label>TN Profession Category</label>
                <input
                  type="text"
                  name="tnProfession"
                  value={formData.tnProfession}
                  onChange={handleChange}
                  placeholder="e.g., Engineer, Computer Systems Analyst, Accountant"
                />
                <small>Must match one of the NAFTA professional categories</small>
              </div>

              <div className="form-group">
                <label>Citizenship</label>
                <select
                  name="tnCitizenship"
                  value={formData.tnCitizenship}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Canada">Canada</option>
                  <option value="Mexico">Mexico</option>
                </select>
              </div>
            </div>
          )}

          {/* Additional Information */}
          <div className="form-section">
            <h2 className="form-section-title">
              <i className="fas fa-info-circle"></i> Additional Information
            </h2>

            <div className="form-group">
              <label>Will you have dependents (spouse/children) accompanying you?</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="dependents"
                    value="yes"
                    checked={formData.dependents === 'yes'}
                    onChange={handleChange}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="dependents"
                    value="no"
                    checked={formData.dependents === 'no'}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>

            {formData.dependents === 'yes' && (
              <div className="form-group">
                <label>Dependent Details</label>
                <textarea
                  name="dependentDetails"
                  value={formData.dependentDetails}
                  onChange={handleChange}
                  rows={3}
                  placeholder="List names, relationships, and dates of birth"
                />
              </div>
            )}

            <div className="form-group">
              <label>Any additional information we should know about your case?</label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows={5}
                placeholder="Include any relevant details about your situation, concerns, or special circumstances"
              />
            </div>

            <div className="form-group">
              <label>How did you hear about us?</label>
              <select
                name="howDidYouHear"
                value={formData.howDidYouHear}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="google">Google Search</option>
                <option value="linkedin">LinkedIn</option>
                <option value="referral">Referral from Client</option>
                <option value="lawyer-referral">Referral from Another Lawyer</option>
                <option value="company">My Company/HR Department</option>
                <option value="social-media">Social Media</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Authorization */}
          <div className="form-section form-signature-section">
            <h2 className="form-section-title">
              <i className="fas fa-signature"></i> Authorization & Acknowledgment
            </h2>

            <div className="form-alert alert-warning">
              <i className="fas fa-shield-alt"></i>
              <div>
                <strong>Attorney-Client Privilege</strong>
                <p>All information provided is protected by attorney-client privilege. By submitting this form and paying the consultation fee, you acknowledge that this does not create a full attorney-client relationship for representation purposes until a formal engagement agreement is signed.</p>
              </div>
            </div>

            <div className="form-group">
              <label>Full Name (Electronic Signature) <span className="required">*</span></label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                required
                placeholder="Type your full legal name"
              />
            </div>

            <div className="form-group">
              <label>Date <span className="required">*</span></label>
              <input
                type="date"
                name="signatureDate"
                value={formData.signatureDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="electronicSignature"
                  checked={formData.electronicSignature}
                  onChange={handleChange}
                  required
                />
                <span>
                  I acknowledge that typing my name above constitutes a legal electronic signature. I certify that all information provided is true and accurate to the best of my knowledge.
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-submit-section">
            <button type="submit" className="form-submit-button">
              <i className="fas fa-paper-plane"></i>
              {formData.urgencyLevel === 'emergency' 
                ? 'Submit Emergency Assessment ($499)'
                : formData.urgencyLevel === 'priority'
                ? 'Submit Priority Assessment ($399)'
                : 'Submit Standard Assessment ($299)'}
            </button>
            <p className="form-submit-note">
              You will be redirected to secure payment processing. Assessment fee is credited toward full representation if you proceed with our services.
            </p>
          </div>
        </form>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={closePaymentModal}
        amount={formData.urgencyLevel === 'emergency' ? 499 : formData.urgencyLevel === 'priority' ? 399 : 299}
        email={currentEmail}
        onSuccess={handlePaymentSuccess}
      />

      {/* Account Creation Nudge */}
      <AccountCreationNudge
        isOpen={showNudgeModal}
        onSkip={handleSkipAccount}
        email={currentEmail}
        paymentId={paymentId}
      />
      </FormAccessGuard>
    </>
  );
};

export default WorkVisaIntake;
