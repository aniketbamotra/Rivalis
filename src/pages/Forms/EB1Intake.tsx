import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Layout/Navigation';
import { FormAccessGuard } from '../../components/Common/FormAccessGuard';
import { PaymentModal } from '../../components/Common/PaymentModal';
import { AccountCreationNudge } from '../../components/Common/AccountCreationNudge';
import { useFormSubmissionWithPayment } from '../../hooks/useFormSubmissionWithPayment';
import '../../styles/form-page.css';

export const EB1Intake: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', country: '', city: '',
    eb1Category: '', fieldOfExpertise: '', currentOccupation: '', yearsExperience: '',
    // Criteria checkboxes
    awards: false, membership: false, publishedMaterial: false, judging: false,
    originalContributions: false, scholarlyArticles: false, exhibitions: false,
    leadingRole: false, highSalary: false, commercialSuccess: false,
    // Details for each criterion
    awardsDetails: '', membershipDetails: '', publishedMaterialDetails: '',
    judgingDetails: '', contributionsDetails: '', articlesDetails: '',
    exhibitionsDetails: '', leadingRoleDetails: '', salaryDetails: '', successDetails: '',
    highestDegree: '', institution: '', citations: '', patents: '',
    mediaAppearances: '', additionalInfo: '', clientName: '', signatureDate: new Date().toISOString().split('T')[0],
    electronicSignature: false,
  });

  const { showPaymentModal, showNudgeModal, currentEmail, paymentId, handleFormSubmit, handlePaymentSuccess, handleSkipAccount, closePaymentModal } = useFormSubmissionWithPayment();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
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
        <div className="form-page-header" style={{ background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)' }}>
          <div className="form-page-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/services/immigration">Immigration</Link> / <Link to="/services/immigration/eb1">EB-1</Link> / <span>Assessment</span>
          </div>
          <div className="form-page-badge"><i className="fas fa-trophy"></i> EB-1A ASSESSMENT</div>
          <h1 className="form-page-title">EB-1 Extraordinary Ability Assessment</h1>
          <p className="form-page-description">Comprehensive evaluation of your qualifications against the 10 USCIS criteria for extraordinary ability.</p>
          <div className="form-page-pricing">
            <div className="pricing-item highlight">
              <div className="pricing-amount">$799</div>
              <div className="pricing-label">Full EB-1A Eligibility Assessment</div>
              <div className="pricing-note">Credited toward full petition if you proceed</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form-page-form">
          <div className="form-section">
            <h2 className="form-section-title"><i className="fas fa-user"></i> Contact Information</h2>
            <div className="form-row">
              <div className="form-group"><label>Full Name <span className="required">*</span></label><input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required /></div>
              <div className="form-group"><label>Email <span className="required">*</span></label><input type="email" name="email" value={formData.email} onChange={handleChange} required /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Phone <span className="required">*</span></label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} required /></div>
              <div className="form-group"><label>Current Country <span className="required">*</span></label><input type="text" name="country" value={formData.country} onChange={handleChange} required /></div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-title"><i className="fas fa-star"></i> EB-1 Category</h2>
            <div className="form-group">
              <label>Which EB-1 category? <span className="required">*</span></label>
              <select name="eb1Category" value={formData.eb1Category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="EB-1A">EB-1A: Extraordinary Ability (Self-Petition)</option>
                <option value="EB-1B">EB-1B: Outstanding Researcher/Professor</option>
                <option value="EB-1C">EB-1C: Multinational Executive/Manager</option>
              </select>
            </div>
            <div className="form-group">
              <label>Field of Expertise <span className="required">*</span></label>
              <input type="text" name="fieldOfExpertise" value={formData.fieldOfExpertise} onChange={handleChange} required placeholder="e.g., Artificial Intelligence, Film Production, Biotech" />
            </div>
            <div className="form-row">
              <div className="form-group"><label>Current Occupation</label><input type="text" name="currentOccupation" value={formData.currentOccupation} onChange={handleChange} /></div>
              <div className="form-group"><label>Years of Experience</label><input type="number" name="yearsExperience" value={formData.yearsExperience} onChange={handleChange} /></div>
            </div>
          </div>

          <div className="form-section" style={{ background: 'rgba(212, 175, 55, 0.05)', padding: '2rem', borderRadius: '8px' }}>
            <h2 className="form-section-title"><i className="fas fa-clipboard-check"></i> 10 Criteria Assessment</h2>
            <p style={{ marginBottom: '1.5rem', color: '#4a5568' }}>Check all criteria that apply to you (need at least 3). Provide details for each checked criterion.</p>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" name="awards" checked={formData.awards} onChange={handleChange} />
                <span><strong>1. Awards & Prizes</strong> - Nationally or internationally recognized prizes/awards</span>
              </label>
              {formData.awards && <textarea name="awardsDetails" value={formData.awardsDetails} onChange={handleChange} rows={3} placeholder="List awards, when received, and their significance" />}
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" name="membership" checked={formData.membership} onChange={handleChange} />
                <span><strong>2. Membership</strong> - Membership in associations requiring outstanding achievements</span>
              </label>
              {formData.membership && <textarea name="membershipDetails" value={formData.membershipDetails} onChange={handleChange} rows={3} placeholder="List memberships and their selection criteria" />}
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" name="publishedMaterial" checked={formData.publishedMaterial} onChange={handleChange} />
                <span><strong>3. Published Material About You</strong> - In professional/major publications or media</span>
              </label>
              {formData.publishedMaterial && <textarea name="publishedMaterialDetails" value={formData.publishedMaterialDetails} onChange={handleChange} rows={3} placeholder="List publications, dates, and links if available" />}
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" name="judging" checked={formData.judging} onChange={handleChange} />
                <span><strong>4. Judging Others' Work</strong> - As judge/reviewer (individually or on panel)</span>
              </label>
              {formData.judging && <textarea name="judgingDetails" value={formData.judgingDetails} onChange={handleChange} rows={3} placeholder="Describe judging roles, for what organizations, and frequency" />}
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" name="originalContributions" checked={formData.originalContributions} onChange={handleChange} />
                <span><strong>5. Original Contributions</strong> - Of major significance to your field</span>
              </label>
              {formData.originalContributions && <textarea name="contributionsDetails" value={formData.contributionsDetails} onChange={handleChange} rows={3} placeholder="Describe your original contributions and their impact" />}
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" name="scholarlyArticles" checked={formData.scholarlyArticles} onChange={handleChange} />
                <span><strong>6. Scholarly Articles</strong> - Authorship in professional journals or major media</span>
              </label>
              {formData.scholarlyArticles && <textarea name="articlesDetails" value={formData.articlesDetails} onChange={handleChange} rows={3} placeholder="List publications, titles, and citation counts" />}
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" name="exhibitions" checked={formData.exhibitions} onChange={handleChange} />
                <span><strong>7. Exhibitions/Showcases</strong> - Display of work at artistic exhibitions</span>
              </label>
              {formData.exhibitions && <textarea name="exhibitionsDetails" value={formData.exhibitionsDetails} onChange={handleChange} rows={3} placeholder="List exhibitions, dates, and venues" />}
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" name="leadingRole" checked={formData.leadingRole} onChange={handleChange} />
                <span><strong>8. Leading/Critical Role</strong> - In distinguished organizations</span>
              </label>
              {formData.leadingRole && <textarea name="leadingRoleDetails" value={formData.leadingRoleDetails} onChange={handleChange} rows={3} placeholder="Describe your role, organization reputation, and your impact" />}
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" name="highSalary" checked={formData.highSalary} onChange={handleChange} />
                <span><strong>9. High Salary/Remuneration</strong> - Significantly high relative to others in field</span>
              </label>
              {formData.highSalary && <textarea name="salaryDetails" value={formData.salaryDetails} onChange={handleChange} rows={3} placeholder="Current/recent salary and comparison to field average" />}
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" name="commercialSuccess" checked={formData.commercialSuccess} onChange={handleChange} />
                <span><strong>10. Commercial Success</strong> - In performing arts (box office, record sales, etc.)</span>
              </label>
              {formData.commercialSuccess && <textarea name="successDetails" value={formData.successDetails} onChange={handleChange} rows={3} placeholder="Describe commercial achievements with metrics" />}
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-title"><i className="fas fa-graduation-cap"></i> Additional Qualifications</h2>
            <div className="form-row">
              <div className="form-group"><label>Highest Degree</label><input type="text" name="highestDegree" value={formData.highestDegree} onChange={handleChange} /></div>
              <div className="form-group"><label>Institution</label><input type="text" name="institution" value={formData.institution} onChange={handleChange} /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Citation Count (if applicable)</label><input type="number" name="citations" value={formData.citations} onChange={handleChange} /></div>
              <div className="form-group"><label>Patents Held</label><input type="number" name="patents" value={formData.patents} onChange={handleChange} /></div>
            </div>
            <div className="form-group">
              <label>Media Appearances/Interviews</label>
              <textarea name="mediaAppearances" value={formData.mediaAppearances} onChange={handleChange} rows={3} placeholder="TV, radio, podcasts, major publications" />
            </div>
            <div className="form-group">
              <label>Additional Information</label>
              <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} rows={4} placeholder="Any other relevant achievements or information" />
            </div>
          </div>

          <div className="form-section form-signature-section">
            <h2 className="form-section-title"><i className="fas fa-signature"></i> Authorization</h2>
            <div className="form-group">
              <label>Full Name <span className="required">*</span></label>
              <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Date <span className="required">*</span></label>
              <input type="date" name="signatureDate" value={formData.signatureDate} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input type="checkbox" name="electronicSignature" checked={formData.electronicSignature} onChange={handleChange} required />
                <span>I certify that all information provided is true and accurate.</span>
              </label>
            </div>
          </div>

          <div className="form-submit-section">
            <button type="submit" className="form-submit-button">
              <i className="fas fa-paper-plane"></i> Submit EB-1A Assessment ($799)
            </button>
          </div>
        </form>
      </div>

      <PaymentModal isOpen={showPaymentModal} onClose={closePaymentModal} amount={799} email={currentEmail} onSuccess={handlePaymentSuccess} />
      <AccountCreationNudge isOpen={showNudgeModal} onSkip={handleSkipAccount} email={currentEmail} paymentId={paymentId} />
      </FormAccessGuard>
    </>
  );
};

export default EB1Intake;
