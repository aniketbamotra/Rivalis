import React, { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '../../components/Layout/Navigation';
import { FormAccessGuard } from '../../components/Common/FormAccessGuard';
import { PaymentModal } from '../../components/Common/PaymentModal';
import { AccountCreationNudge } from '../../components/Common/AccountCreationNudge';
import { useFormSubmissionWithPayment } from '../../hooks/useFormSubmissionWithPayment';
import { submitForm } from '../../lib/supabase';
import '../../styles/form-page.css';
import '../../styles/home.css';

export const EB2NIWIntake: React.FC = () => {
  const [formData, setFormData] = useState({
    fullLegalName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    currentLocation: '',
    citizenship: '',
    hasAdvancedDegree: '',
    highestDegree: '',
    degreeDetails: '',
    exceptionalAbility: '',
    primaryField: '',
    specialization: '',
    proposedEndeavor: '',
    nationalImportance: '',
    substantialMerit: '',
    currentPosition: '',
    currentEmployer: '',
    yearsExperience: '',
    trackRecord: '',
    publications: '',
    citationMetrics: '',
    awards: '',
    memberships: '',
    canObtainLetters: '',
    potentialWriters: '',
    mediaCoverage: '',
    waiverJustification: '',
    businessImpact: '',
    credential1: false,
    credential2: false,
    credential3: false,
    credential4: false,
    credential5: false,
    credential6: false,
    credential7: false,
    credential8: false,
    credential9: false,
    credential10: false,
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
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await submitForm('eb2-niw-intake', formData.email, formData);
      handleFormSubmit(formData.email, result.needsPayment || false);
      
      // Reset form - using same structure as initial state
      setFormData({
        fullLegalName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        currentLocation: '',
        citizenship: '',
        hasAdvancedDegree: '',
        highestDegree: '',
        degreeDetails: '',
        exceptionalAbility: '',
        primaryField: '',
        specialization: '',
        proposedEndeavor: '',
        nationalImportance: '',
        substantialMerit: '',
        currentPosition: '',
        currentEmployer: '',
        yearsExperience: '',
        trackRecord: '',
        publications: '',
        citationMetrics: '',
        awards: '',
        memberships: '',
        canObtainLetters: '',
        potentialWriters: '',
        mediaCoverage: '',
        waiverJustification: '',
        businessImpact: '',
        credential1: false,
        credential2: false,
        credential3: false,
        credential4: false,
        credential5: false,
        credential6: false,
        credential7: false,
        credential8: false,
        credential9: false,
        credential10: false,
        additionalInfo: ''
      });
      
    } catch (error) {
      console.error('Error submitting EB-2 NIW intake:', error);
      alert('There was an error submitting your form. Please try again or call +1 (313) 771-2283.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormAccessGuard>
      <Navigation />

      <section className="form-hero" style={{ background: 'linear-gradient(165deg, #1a1a2e 0%, #2d3748 100%)' }}>
        <div className="form-hero-container">
          <div className="form-breadcrumb">
            <Link href="/">Home</Link> / <Link href="/services/immigration/eb2-niw">EB-2 NIW</Link> / <span>Intake Form</span>
          </div>

          <div className="form-hero-badge" style={{ background: 'rgba(102, 126, 234, 0.2)', borderColor: '#667eea', color: 'white' }}>
            <i className="fas fa-lightbulb"></i>
            🧠 EB-2 National Interest Waiver
          </div>

          <h1 style={{ color: 'white' }}>
            EB-2 NIW <span style={{ color: '#667eea' }}>Intake Form</span>
          </h1>

          <p className="form-hero-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Complete this assessment to determine if your work qualifies under the Dhanasar framework. $699 flat fee consultation.
          </p>

          <div className="form-hero-features">
            <div className="form-hero-feature">
              <i className="fas fa-flag"></i>
              <span>Dhanasar Framework</span>
            </div>
            <div className="form-hero-feature">
              <i className="fas fa-shield-alt"></i>
              <span>Attorney-Client Privileged</span>
            </div>
            <div className="form-hero-feature">
              <i className="fas fa-dollar-sign"></i>
              <span>$699 Flat Fee</span>
            </div>
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="form-section-container">
          <div className="form-card">
            <div className="form-card-header">
              <h2>EB-2 National Interest Waiver Assessment</h2>
              <p>$699 flat fee includes Dhanasar three-prong analysis</p>
            </div>

            <div className="form-card-body">
              <div className="confidential-notice">
                <strong>⚠️ CONFIDENTIAL ATTORNEY-CLIENT COMMUNICATION</strong><br/>
                All information provided is protected by attorney-client privilege and kept strictly confidential.
              </div>
              
              <form onSubmit={handleSubmit}>
                <h3 className="form-section-title">
                  <i className="fas fa-user"></i>
                  Contact Information
                </h3>

                <div className="form-group">
                  <label className="form-label">Full Legal Name <span className="required">*</span></label>
                  <input type="text" name="fullLegalName" className="form-input" value={formData.fullLegalName} onChange={handleChange} required />
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Email Address <span className="required">*</span></label>
                    <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number <span className="required">*</span></label>
                    <input type="tel" name="phone" className="form-input" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Date of Birth <span className="required">*</span></label>
                    <input type="date" name="dateOfBirth" className="form-input" value={formData.dateOfBirth} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country of Citizenship <span className="required">*</span></label>
                    <input type="text" name="citizenship" className="form-input" value={formData.citizenship} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Current Location <span className="required">*</span></label>
                  <input type="text" name="currentLocation" className="form-input" placeholder="City, Country" value={formData.currentLocation} onChange={handleChange} required />
                </div>

                <div className="form-divider"></div>

                <h3 className="form-section-title">
                  <i className="fas fa-graduation-cap"></i>
                  EB-2 Qualification: Advanced Degree or Exceptional Ability
                </h3>

                <div className="form-group">
                  <label className="form-label">Do you hold an advanced degree (Master's or higher)? <span className="required">*</span></label>
                  <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal', cursor: 'pointer' }}>
                      <input type="radio" name="hasAdvancedDegree" value="yes" checked={formData.hasAdvancedDegree === 'yes'} onChange={handleChange} required />
                      <span>Yes</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal', cursor: 'pointer' }}>
                      <input type="radio" name="hasAdvancedDegree" value="no" checked={formData.hasAdvancedDegree === 'no'} onChange={handleChange} />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Highest Degree Earned <span className="required">*</span></label>
                  <select name="highestDegree" className="form-input" value={formData.highestDegree} onChange={handleChange} required>
                    <option value="">-- Select --</option>
                    <option value="Doctorate">Doctorate/PhD</option>
                    <option value="Master">Master's Degree</option>
                    <option value="MD">Medical Degree (MD/MBBS)</option>
                    <option value="JD">Law Degree (JD/LLM)</option>
                    <option value="MBA">MBA</option>
                    <option value="BachelorsPlus">Bachelor's + 5 Years Progressive Experience</option>
                    <option value="Bachelor">Bachelor's Degree Only</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Degree Details <span className="required">*</span></label>
                  <textarea name="degreeDetails" className="form-input" rows={3} placeholder="Institution, location, field of study, graduation year" value={formData.degreeDetails} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label className="form-label">If claiming "Exceptional Ability" instead of advanced degree, explain:</label>
                  <textarea name="exceptionalAbility" className="form-input" rows={2} placeholder="Degree of expertise significantly above that ordinarily encountered" value={formData.exceptionalAbility} onChange={handleChange} />
                </div>

                <div className="form-divider"></div>

                <h3 className="form-section-title">
                  <i className="fas fa-flag"></i>
                  Proposed Endeavor & National Interest (Dhanasar Prong 1)
                </h3>

                <div style={{ background: 'rgba(102, 126, 234, 0.08)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', borderLeft: '4px solid #667eea' }}>
                  <p style={{ color: '#1a1a2e', fontWeight: 600, marginBottom: '0.5rem' }}>Matter of Dhanasar Three-Prong Test:</p>
                  <ol style={{ marginLeft: '1.5rem', color: '#4a5568' }}>
                    <li>Substantial Merit & National Importance</li>
                    <li>Well Positioned to Advance the Endeavor</li>
                    <li>Beneficial to Waive Job Offer Requirements</li>
                  </ol>
                </div>

                <div className="form-group">
                  <label className="form-label">Primary Field/Area of Work <span className="required">*</span></label>
                  <select name="primaryField" className="form-input" value={formData.primaryField} onChange={handleChange} required>
                    <option value="">-- Select Primary Field --</option>
                    <option value="STEM">STEM (Science, Technology, Engineering, Math)</option>
                    <option value="Healthcare">Healthcare/Medicine</option>
                    <option value="Research">Academic Research</option>
                    <option value="Entrepreneurship">Entrepreneurship/Business Innovation</option>
                    <option value="Education">Education</option>
                    <option value="Arts">Arts/Culture</option>
                    <option value="Environmental">Environmental/Clean Energy</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Specific Specialization</label>
                  <input type="text" name="specialization" className="form-input" placeholder="e.g., Artificial Intelligence, Renewable Energy, Cancer Immunotherapy" value={formData.specialization} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Describe your proposed endeavor in the United States <span className="required">*</span></label>
                  <textarea name="proposedEndeavor" className="form-input" rows={4} placeholder="What work will you pursue? What are your goals? Be specific." value={formData.proposedEndeavor} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Why is your work of national importance to the U.S.? <span className="required">*</span></label>
                  <textarea name="nationalImportance" className="form-input" rows={4} placeholder="How does your work benefit U.S. economy, healthcare, education, environment, security, or other national interests?" value={formData.nationalImportance} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label className="form-label">How is your work of "substantial merit"? <span className="required">*</span></label>
                  <textarea name="substantialMerit" className="form-input" rows={3} placeholder="What makes your work valuable and impactful?" value={formData.substantialMerit} onChange={handleChange} required />
                </div>

                <div className="form-divider"></div>

                <h3 className="form-section-title">
                  <i className="fas fa-user-check"></i>
                  Well Positioned to Advance (Dhanasar Prong 2)
                </h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Current Position <span className="required">*</span></label>
                    <input type="text" name="currentPosition" className="form-input" value={formData.currentPosition} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Current Employer</label>
                    <input type="text" name="currentEmployer" className="form-input" value={formData.currentEmployer} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Years of Professional Experience</label>
                  <input type="number" name="yearsExperience" className="form-input" min="0" value={formData.yearsExperience} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Track Record & Accomplishments</label>
                  <textarea name="trackRecord" className="form-input" rows={3} placeholder="Past achievements, projects completed, innovations developed" value={formData.trackRecord} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Publications, Patents, or Intellectual Property</label>
                  <textarea name="publications" className="form-input" rows={2} placeholder="Academic publications, patents, proprietary technologies" value={formData.publications} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Citations or Impact Metrics</label>
                  <input type="text" name="citationMetrics" className="form-input" placeholder="Number of citations, h-index, download counts" value={formData.citationMetrics} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Awards, Grants, or Funding Received</label>
                  <textarea name="awards" className="form-input" rows={2} placeholder="Research grants, awards, fellowships, funding sources" value={formData.awards} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Professional Memberships & Leadership</label>
                  <textarea name="memberships" className="form-input" rows={2} placeholder="Professional associations, committee memberships, leadership roles" value={formData.memberships} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Can you obtain letters of recommendation? <span className="required">*</span></label>
                  <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                    {['yes', 'maybe', 'no'].map(opt => (
                      <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal', cursor: 'pointer' }}>
                        <input type="radio" name="canObtainLetters" value={opt} checked={formData.canObtainLetters === opt} onChange={handleChange} required />
                        <span>{opt.charAt(0).toUpperCase() + opt.slice(1)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Potential Letter Writers</label>
                  <textarea name="potentialWriters" className="form-input" rows={2} placeholder="Names, titles, organizations of people who can attest to your qualifications" value={formData.potentialWriters} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Media Coverage or Public Recognition</label>
                  <textarea name="mediaCoverage" className="form-input" rows={2} placeholder="Articles, interviews, profiles in industry publications or mainstream media" value={formData.mediaCoverage} onChange={handleChange} />
                </div>

                <div className="form-divider"></div>

                <h3 className="form-section-title">
                  <i className="fas fa-balance-scale"></i>
                  Why Waiving Labor Certification Benefits the U.S. (Dhanasar Prong 3)
                </h3>

                <div className="form-group">
                  <label className="form-label">Waiver Justification <span className="required">*</span></label>
                  <textarea name="waiverJustification" className="form-input" rows={4} placeholder="Why should the U.S. waive the job offer requirement? How does your independence benefit your work?" value={formData.waiverJustification} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Business or Industry Impact</label>
                  <textarea name="businessImpact" className="form-input" rows={3} placeholder="How does your work benefit the entire industry or field, not just one employer?" value={formData.businessImpact} onChange={handleChange} />
                </div>

                <div className="form-divider"></div>

                <h3 className="form-section-title">
                  <i className="fas fa-check-circle"></i>
                  Supporting Credentials (Select all that apply)
                </h3>

                {[
                  { key: 'credential1', label: 'Advanced Degree (Master\'s or PhD)' },
                  { key: 'credential2', label: 'Professional License or Certification' },
                  { key: 'credential3', label: 'Peer-Reviewed Publications' },
                  { key: 'credential4', label: 'High Citations/Impact Factor' },
                  { key: 'credential5', label: 'Patents or Intellectual Property' },
                  { key: 'credential6', label: 'Grants or Research Funding' },
                  { key: 'credential7', label: 'Awards or Honors' },
                  { key: 'credential8', label: 'Professional Memberships' },
                  { key: 'credential9', label: 'Media Coverage' },
                  { key: 'credential10', label: 'Leadership Roles' }
                ].map((cred) => (
                  <div key={cred.key} style={{ marginBottom: '0.75rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 'normal' }}>
                      <input
                        type="checkbox"
                        name={cred.key}
                        checked={(formData as any)[cred.key]}
                        onChange={handleChange}
                        style={{ marginRight: '0.75rem' }}
                      />
                      <span>{cred.label}</span>
                    </label>
                  </div>
                ))}

                <div className="form-divider"></div>

                <div className="form-group">
                  <label className="form-label">Additional Information</label>
                  <textarea name="additionalInfo" className="form-input" rows={3} placeholder="Any other relevant information for your case" value={formData.additionalInfo} onChange={handleChange} />
                </div>

                <div className="consultation-fee-box" style={{ background: 'rgba(102, 126, 234, 0.1)', border: '2px solid #667eea', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
                  <h4 style={{ color: '#667eea', marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: 700 }}>
                    ⚡ EB-2 NIW Assessment Fee: $699
                  </h4>
                  <p style={{ color: '#4a5568', marginBottom: 0 }}>
                    Includes Dhanasar three-prong analysis, evidence positioning strategy, and waiver justification framework.
                  </p>
                </div>

                <button
                  type="submit"
                  className="form-submit-button"
                  disabled={loading}
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                >
                  {loading ? 'Submitting...' : 'Submit EB-2 NIW Intake'}
                  <i className="fas fa-arrow-right"></i>
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
export default EB2NIWIntake;
