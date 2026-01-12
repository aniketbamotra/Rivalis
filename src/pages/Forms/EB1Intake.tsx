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

export const EB1Intake: React.FC = () => {
  const [formData, setFormData] = useState({
    fullLegalName: '',
    email: '',
    phone: '',
    currentLocation: '',
    citizenship: '',
    primaryField: '',
    specialization: '',
    workDescription: '',
    criteria1: false,
    criteria2: false,
    criteria3: false,
    criteria4: false,
    criteria5: false,
    criteria6: false,
    criteria7: false,
    criteria8: false,
    criteria9: false,
    criteria10: false,
    publications: '',
    citations: '',
    patents: '',
    awards: '',
    mediaCoverage: '',
    memberships: '',
    peerReview: '',
    leadershipRoles: '',
    compensation: '',
    speakingEngagements: '',
    originalContributions: '',
    highestDegree: '',
    degreeDetails: '',
    currentPosition: '',
    currentEmployer: '',
    yearsExperience: '',
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
      const result = await submitForm('eb1-intake', formData.email, formData);
      handleFormSubmit(formData.email, result.needsPayment || false);
      
      // Reset form
      setFormData({
        fullLegalName: '',
        email: '',
        phone: '',
        currentLocation: '',
        citizenship: '',
        primaryField: '',
        specialization: '',
        workDescription: '',
        criteria1: false,
        criteria2: false,
        criteria3: false,
        criteria4: false,
        criteria5: false,
        criteria6: false,
        criteria7: false,
        criteria8: false,
        criteria9: false,
        criteria10: false,
        publications: '',
        citations: '',
        patents: '',
        awards: '',
        mediaCoverage: '',
        memberships: '',
        peerReview: '',
        leadershipRoles: '',
        compensation: '',
        speakingEngagements: '',
        originalContributions: '',
        highestDegree: '',
        degreeDetails: '',
        currentPosition: '',
        currentEmployer: '',
        yearsExperience: '',
        additionalInfo: ''
      });
      
    } catch (error) {
      console.error('Error submitting EB-1 intake:', error);
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
            <Link href="/">Home</Link> / <Link href="/services/immigration/eb1-extraordinary-ability">EB-1</Link> / <span>Intake Form</span>
          </div>

          <div className="form-hero-badge" style={{ background: 'rgba(212, 175, 55, 0.2)', borderColor: '#d4af37', color: 'white' }}>
            <i className="fas fa-crown"></i>
            🏆 EB-1 Extraordinary Ability
          </div>

          <h1 style={{ color: 'white' }}>
            EB-1 Extraordinary Ability <span style={{ color: '#d4af37' }}>Intake Form</span>
          </h1>

          <p className="form-hero-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Complete this assessment to determine if you qualify for EB-1A classification. $799 flat fee consultation.
          </p>

          <div className="form-hero-features">
            <div className="form-hero-feature">
              <i className="fas fa-star"></i>
              <span>Citation Analysis</span>
            </div>
            <div className="form-hero-feature">
              <i className="fas fa-shield-alt"></i>
              <span>Attorney-Client Privileged</span>
            </div>
            <div className="form-hero-feature">
              <i className="fas fa-dollar-sign"></i>
              <span>$799 Flat Fee</span>
            </div>
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="form-section-container">
          <div className="form-card">
            <div className="form-card-header">
              <h2>EB-1 Extraordinary Ability Assessment</h2>
              <p>$799 flat fee includes comprehensive eligibility analysis</p>
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
                  <label className="form-label">
                    Full Legal Name <span className="required">*</span>
                  </label>
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
                    <label className="form-label">Current Location <span className="required">*</span></label>
                    <input type="text" name="currentLocation" className="form-input" placeholder="City, Country" value={formData.currentLocation} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country of Citizenship <span className="required">*</span></label>
                    <input type="text" name="citizenship" className="form-input" value={formData.citizenship} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-divider"></div>

                <h3 className="form-section-title">
                  <i className="fas fa-flask"></i>
                  Field of Extraordinary Ability
                </h3>

                <div className="form-group">
                  <label className="form-label">Primary Field <span className="required">*</span></label>
                  <select name="primaryField" className="form-input" value={formData.primaryField} onChange={handleChange} required>
                    <option value="">-- Select Primary Field --</option>
                    <option value="science">Sciences (Biology, Chemistry, Physics, etc.)</option>
                    <option value="technology">Technology/Computer Science/Engineering</option>
                    <option value="medicine">Medicine/Healthcare</option>
                    <option value="business">Business/Entrepreneurship</option>
                    <option value="education">Education/Academia</option>
                    <option value="arts">Arts (Visual, Performing, Literary)</option>
                    <option value="athletics">Athletics/Sports</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Specific Specialization</label>
                  <input type="text" name="specialization" className="form-input" placeholder="e.g., Machine Learning, Cardiac Surgery, Fintech Innovation" value={formData.specialization} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Brief Description of Your Work <span className="required">*</span></label>
                  <textarea name="workDescription" className="form-input" rows={4} placeholder="What is your area of expertise? What have you accomplished?" value={formData.workDescription} onChange={handleChange} required />
                </div>

                <div className="form-divider"></div>

                <h3 className="form-section-title">
                  <i className="fas fa-check-circle"></i>
                  EB-1A Criteria (Select all that apply)
                </h3>

                <div style={{ background: 'rgba(212, 175, 55, 0.08)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', borderLeft: '4px solid #d4af37' }}>
                  <p style={{ color: '#1a1a2e', fontWeight: 600, marginBottom: '0.5rem' }}>USCIS requires evidence meeting at least 3 of these 10 criteria:</p>
                </div>

                {[
                  { key: 'criteria1', label: 'Major Internationally Recognized Awards', desc: 'Nobel Prize, Pulitzer Prize, Oscar, Olympic Medal, or comparable' },
                  { key: 'criteria2', label: 'Membership in Associations', desc: 'Requiring outstanding achievements' },
                  { key: 'criteria3', label: 'Published Material About You', desc: 'In professional or major media' },
                  { key: 'criteria4', label: 'Judging/Peer Review', desc: 'Of others\' work in your field' },
                  { key: 'criteria5', label: 'Original Contributions', desc: 'Of major significance to your field' },
                  { key: 'criteria6', label: 'Scholarly Articles', desc: 'In professional journals or major media' },
                  { key: 'criteria7', label: 'Artistic Exhibitions', desc: 'Or showcases' },
                  { key: 'criteria8', label: 'Leading/Critical Role', desc: 'At distinguished organizations' },
                  { key: 'criteria9', label: 'High Salary/Remuneration', desc: 'Relative to others in field' },
                  { key: 'criteria10', label: 'Commercial Success in Arts', desc: 'Box office, recordings, etc.' }
                ].map((criterion) => (
                  <div key={criterion.key} style={{ marginBottom: '1rem', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer', fontWeight: 'normal' }}>
                      <input
                        type="checkbox"
                        name={criterion.key}
                        checked={(formData as any)[criterion.key]}
                        onChange={handleChange}
                        style={{ marginRight: '1rem', marginTop: '4px', flexShrink: 0 }}
                      />
                      <span>
                        <strong>{criterion.label}</strong> - {criterion.desc}
                      </span>
                    </label>
                  </div>
                ))}

                <div className="form-divider"></div>

                <h3 className="form-section-title">
                  <i className="fas fa-chart-line"></i>
                  Evidence Details
                </h3>

                <div className="form-group">
                  <label className="form-label">Publications & Citations</label>
                  <textarea name="publications" className="form-input" rows={3} placeholder="Number of peer-reviewed publications, Google Scholar profile link" value={formData.publications} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Citation Metrics</label>
                  <input type="text" name="citations" className="form-input" placeholder="Total citations, h-index" value={formData.citations} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Patents/Intellectual Property</label>
                  <textarea name="patents" className="form-input" rows={2} placeholder="Patent numbers, commercial applications" value={formData.patents} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Awards & Honors</label>
                  <textarea name="awards" className="form-input" rows={3} placeholder="List significant awards, fellowships, honors" value={formData.awards} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Media Coverage</label>
                  <textarea name="mediaCoverage" className="form-input" rows={2} placeholder="Major media outlets that featured your work" value={formData.mediaCoverage} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Professional Memberships</label>
                  <textarea name="memberships" className="form-input" rows={2} placeholder="Selective associations, academies, societies" value={formData.memberships} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Peer Review & Editorial Experience</label>
                  <textarea name="peerReview" className="form-input" rows={2} placeholder="Journal editorial boards, grant panels, judging roles" value={formData.peerReview} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Leadership Positions</label>
                  <textarea name="leadershipRoles" className="form-input" rows={2} placeholder="Executive roles, board positions" value={formData.leadershipRoles} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Current Annual Compensation</label>
                  <input type="text" name="compensation" className="form-input" placeholder="USD $ (kept confidential)" value={formData.compensation} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Speaking Engagements</label>
                  <textarea name="speakingEngagements" className="form-input" rows={2} placeholder="Keynote speeches, invited talks" value={formData.speakingEngagements} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Original Contributions of Major Significance</label>
                  <textarea name="originalContributions" className="form-input" rows={4} placeholder="Describe your most significant contributions - innovations, discoveries, methodologies" value={formData.originalContributions} onChange={handleChange} />
                </div>

                <div className="form-divider"></div>

                <h3 className="form-section-title">
                  <i className="fas fa-graduation-cap"></i>
                  Education & Experience
                </h3>

                <div className="form-group">
                  <label className="form-label">Highest Degree <span className="required">*</span></label>
                  <select name="highestDegree" className="form-input" value={formData.highestDegree} onChange={handleChange} required>
                    <option value="">-- Select --</option>
                    <option value="Bachelor">Bachelor's Degree</option>
                    <option value="Master">Master's Degree</option>
                    <option value="Doctorate">Doctorate/PhD</option>
                    <option value="MD">Medical Degree (MD/MBBS)</option>
                    <option value="JD">Law Degree (JD/LLM)</option>
                    <option value="Other">Other Advanced Degree</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Degree Details</label>
                  <textarea name="degreeDetails" className="form-input" rows={2} placeholder="Institution, field of study, graduation year" value={formData.degreeDetails} onChange={handleChange} />
                </div>

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
                  <label className="form-label">Years of Experience</label>
                  <input type="number" name="yearsExperience" className="form-input" min="0" value={formData.yearsExperience} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Additional Information</label>
                  <textarea name="additionalInfo" className="form-input" rows={3} placeholder="Any other relevant information" value={formData.additionalInfo} onChange={handleChange} />
                </div>

                <div className="form-divider"></div>

                <div className="consultation-fee-box" style={{ background: 'rgba(212, 175, 55, 0.1)', border: '2px solid #d4af37', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
                  <h4 style={{ color: '#d4af37', marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: 700 }}>
                    ⚡ EB-1 Assessment Fee: $799
                  </h4>
                  <p style={{ color: '#4a5568', marginBottom: 0 }}>
                    Includes comprehensive eligibility analysis, citation review, and 3-of-10 criteria strategy.
                  </p>
                </div>

                <button
                  type="submit"
                  className="form-submit-button"
                  disabled={loading}
                  style={{ background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)' }}
                >
                  {loading ? 'Submitting...' : 'Submit EB-1 Intake'}
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
export default EB1Intake;
