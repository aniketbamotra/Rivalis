import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Layout/Navigation';
import { FormAccessGuard } from '../../components/Common/FormAccessGuard';
import { PaymentModal } from '../../components/Common/PaymentModal';
import { AccountCreationNudge } from '../../components/Common/AccountCreationNudge';
import { useFormSubmissionWithPayment } from '../../hooks/useFormSubmissionWithPayment';
import '../../styles/form-page.css';

export const EB2NIWIntake: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', country: '', highestDegree: '', fieldOfStudy: '', institution: '', yearsExperience: '',
    endeavorTitle: '', endeavorDescription: '', nationalImportance: '', qualifications: '', whyWaiveLabor: '',
    publications: '', citations: '', patents: '', awards: '', media: '', fundingReceived: '', letters: '',
    additionalInfo: '', clientName: '', signatureDate: new Date().toISOString().split('T')[0], electronicSignature: false,
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
        <div className="form-page-header" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <div className="form-page-breadcrumb"><Link to="/">Home</Link> / <Link to="/services/immigration">Immigration</Link> / <Link to="/services/immigration/eb2-niw">EB-2 NIW</Link> / <span>Assessment</span></div>
          <div className="form-page-badge"><i className="fas fa-brain"></i> EB-2 NIW ASSESSMENT</div>
          <h1 className="form-page-title">EB-2 National Interest Waiver Assessment</h1>
          <p className="form-page-description">Evaluation of your proposed endeavor against the Dhanasar framework for national interest.</p>
          <div className="form-page-pricing"><div className="pricing-item highlight"><div className="pricing-amount">$699</div><div className="pricing-label">NIW Eligibility Assessment</div></div></div>
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
              <div className="form-group"><label>Country <span className="required">*</span></label><input type="text" name="country" value={formData.country} onChange={handleChange} required /></div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-title"><i className="fas fa-graduation-cap"></i> Qualifications</h2>
            <div className="form-row">
              <div className="form-group"><label>Highest Degree <span className="required">*</span></label><select name="highestDegree" value={formData.highestDegree} onChange={handleChange} required><option value="">Select</option><option value="Bachelor">Bachelor's</option><option value="Master">Master's</option><option value="PhD">PhD</option><option value="Professional">Professional Degree</option></select></div>
              <div className="form-group"><label>Field of Study</label><input type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Institution</label><input type="text" name="institution" value={formData.institution} onChange={handleChange} /></div>
              <div className="form-group"><label>Years of Experience</label><input type="number" name="yearsExperience" value={formData.yearsExperience} onChange={handleChange} /></div>
            </div>
          </div>

          <div className="form-section" style={{ background: 'rgba(102, 126, 234, 0.05)', padding: '2rem', borderRadius: '8px' }}>
            <h2 className="form-section-title"><i className="fas fa-lightbulb"></i> Proposed Endeavor (Dhanasar Prong 1)</h2>
            <div className="form-group">
              <label>Endeavor Title <span className="required">*</span></label>
              <input type="text" name="endeavorTitle" value={formData.endeavorTitle} onChange={handleChange} required placeholder="Brief title of your proposed work/business/research" />
            </div>
            <div className="form-group">
              <label>Endeavor Description <span className="required">*</span></label>
              <textarea name="endeavorDescription" value={formData.endeavorDescription} onChange={handleChange} required rows={6} placeholder="Detailed description of your proposed endeavor and what you plan to do in the U.S." />
            </div>
            <div className="form-group">
              <label>National Importance <span className="required">*</span></label>
              <textarea name="nationalImportance" value={formData.nationalImportance} onChange={handleChange} required rows={5} placeholder="How does your endeavor benefit the United States? Why is it nationally important?" />
            </div>
          </div>

          <div className="form-section" style={{ background: 'rgba(102, 126, 234, 0.05)', padding: '2rem', borderRadius: '8px' }}>
            <h2 className="form-section-title"><i className="fas fa-user-check"></i> Your Positioning (Dhanasar Prong 2)</h2>
            <div className="form-group">
              <label>Why Are You Well-Positioned? <span className="required">*</span></label>
              <textarea name="qualifications" value={formData.qualifications} onChange={handleChange} required rows={6} placeholder="Explain your education, skills, track record, and why you specifically are positioned to advance this endeavor" />
            </div>
          </div>

          <div className="form-section" style={{ background: 'rgba(102, 126, 234, 0.05)', padding: '2rem', borderRadius: '8px' }}>
            <h2 className="form-section-title"><i className="fas fa-balance-scale"></i> Waiving Labor Cert (Dhanasar Prong 3)</h2>
            <div className="form-group">
              <label>Why Waive Requirements? <span className="required">*</span></label>
              <textarea name="whyWaiveLabor" value={formData.whyWaiveLabor} onChange={handleChange} required rows={5} placeholder="Why should USCIS waive the job offer and labor certification? What makes your case special?" />
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-title"><i className="fas fa-award"></i> Evidence & Achievements</h2>
            <div className="form-group"><label>Publications</label><textarea name="publications" value={formData.publications} onChange={handleChange} rows={3} placeholder="List key publications" /></div>
            <div className="form-row">
              <div className="form-group"><label>Citations</label><input type="number" name="citations" value={formData.citations} onChange={handleChange} /></div>
              <div className="form-group"><label>Patents</label><input type="number" name="patents" value={formData.patents} onChange={handleChange} /></div>
            </div>
            <div className="form-group"><label>Awards</label><textarea name="awards" value={formData.awards} onChange={handleChange} rows={2} /></div>
            <div className="form-group"><label>Media Coverage</label><textarea name="media" value={formData.media} onChange={handleChange} rows={2} /></div>
            <div className="form-group"><label>Funding Received</label><textarea name="fundingReceived" value={formData.fundingReceived} onChange={handleChange} rows={2} placeholder="Grants, investments, funding amounts" /></div>
            <div className="form-group"><label>Recommendation Letters Available</label><textarea name="letters" value={formData.letters} onChange={handleChange} rows={2} placeholder="Who can write letters? Industry experts, professors, etc." /></div>
          </div>

          <div className="form-section">
            <h2 className="form-section-title"><i className="fas fa-info-circle"></i> Additional Information</h2>
            <div className="form-group"><label>Anything else we should know?</label><textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} rows={4} /></div>
          </div>

          <div className="form-section form-signature-section">
            <h2 className="form-section-title"><i className="fas fa-signature"></i> Authorization</h2>
            <div className="form-group"><label>Full Name <span className="required">*</span></label><input type="text" name="clientName" value={formData.clientName} onChange={handleChange} required /></div>
            <div className="form-group"><label>Date <span className="required">*</span></label><input type="date" name="signatureDate" value={formData.signatureDate} onChange={handleChange} required /></div>
            <div className="form-group"><label className="checkbox-label"><input type="checkbox" name="electronicSignature" checked={formData.electronicSignature} onChange={handleChange} required /><span>I certify all information is accurate.</span></label></div>
          </div>

          <div className="form-submit-section">
            <button type="submit" className="form-submit-button"><i className="fas fa-paper-plane"></i> Submit EB-2 NIW Assessment ($699)</button>
          </div>
        </form>
      </div>

      <PaymentModal isOpen={showPaymentModal} onClose={closePaymentModal} amount={699} email={currentEmail} onSuccess={handlePaymentSuccess} />
      <AccountCreationNudge isOpen={showNudgeModal} onSkip={handleSkipAccount} email={currentEmail} paymentId={paymentId} />
      </FormAccessGuard>
    </>
  );
};

export default EB2NIWIntake;
