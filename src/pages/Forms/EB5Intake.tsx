import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Layout/Navigation';
import { FormAccessGuard } from '../../components/Common/FormAccessGuard';
import { PaymentModal } from '../../components/Common/PaymentModal';
import { AccountCreationNudge } from '../../components/Common/AccountCreationNudge';
import { useFormSubmissionWithPayment } from '../../hooks/useFormSubmissionWithPayment';
import '../../styles/form-page.css';

export const EB5Intake: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', citizenship: '', currentCountry: '', investmentPathway: '', investmentAmount: '',
    sourceOfFunds: '', businessExperience: '', netWorth: '', familyMembers: '', regionalCenter: '',
    businessPlan: '', jobCreation: '', documentation: '', additionalInfo: '',
    clientName: '', signatureDate: new Date().toISOString().split('T')[0], electronicSignature: false,
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
        <div className="form-page-header" style={{ background: 'linear-gradient(135deg, #2c5282 0%, #1a365d 100%)' }}>
          <div className="form-page-breadcrumb"><Link to="/">Home</Link> / <Link to="/services/immigration">Immigration</Link> / <Link to="/services/immigration/eb5">EB-5</Link> / <span>Intake</span></div>
          <div className="form-page-badge"><i className="fas fa-chart-line"></i> EB-5 AUDIT</div>
          <h1 className="form-page-title">EB-5 Source of Funds Due Diligence</h1>
          <p className="form-page-description">Comprehensive audit of your capital sources and documentation BEFORE you invest $800K+</p>
          <div className="form-page-pricing"><div className="pricing-item highlight"><div className="pricing-amount">$2,500</div><div className="pricing-label">Source of Funds Audit</div><div className="pricing-note">Prevent denial. Identify gaps. Fix documentation.</div></div></div>
        </div>

        <form onSubmit={handleSubmit} className="form-page-form">
          <div className="form-alert alert-danger">
            <i className="fas fa-exclamation-triangle"></i>
            <div><strong>Critical: Source of Funds Documentation</strong><p>60% of EB-5 denials are due to inadequate source of funds evidence. This audit identifies what documentation you need BEFORE you invest.</p></div>
          </div>

          <div className="form-section">
            <h2 className="form-section-title"><i className="fas fa-user"></i> Investor Information</h2>
            <div className="form-row">
              <div className="form-group"><label>Full Name <span className="required">*</span></label><input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required /></div>
              <div className="form-group"><label>Email <span className="required">*</span></label><input type="email" name="email" value={formData.email} onChange={handleChange} required /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Phone <span className="required">*</span></label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} required /></div>
              <div className="form-group"><label>Citizenship <span className="required">*</span></label><input type="text" name="citizenship" value={formData.citizenship} onChange={handleChange} required /></div>
            </div>
            <div className="form-group"><label>Current Country</label><input type="text" name="currentCountry" value={formData.currentCountry} onChange={handleChange} /></div>
          </div>

          <div className="form-section">
            <h2 className="form-section-title"><i className="fas fa-money-bill-wave"></i> Investment Details</h2>
            <div className="form-group">
              <label>Investment Pathway <span className="required">*</span></label>
              <select name="investmentPathway" value={formData.investmentPathway} onChange={handleChange} required>
                <option value="">Select Pathway</option>
                <option value="Regional Center">Regional Center ($800K)</option>
                <option value="Direct Investment">Direct Investment ($1.05M)</option>
                <option value="Not Sure">Not Sure - Need Guidance</option>
              </select>
            </div>
            <div className="form-group">
              <label>Planned Investment Amount (USD)</label>
              <input type="number" name="investmentAmount" value={formData.investmentAmount} onChange={handleChange} placeholder="e.g., 800000" />
            </div>
            {formData.investmentPathway === 'Regional Center' && (
              <div className="form-group"><label>Have you identified a regional center project?</label><textarea name="regionalCenter" value={formData.regionalCenter} onChange={handleChange} rows={2} placeholder="Project name or description" /></div>
            )}
          </div>

          <div className="form-section" style={{ background: 'rgba(44, 82, 130, 0.05)', padding: '2rem', borderRadius: '8px' }}>
            <h2 className="form-section-title"><i className="fas fa-search-dollar"></i> Source of Funds (CRITICAL)</h2>
            <div className="form-alert alert-warning">
              <i className="fas fa-exclamation-circle"></i>
              <div><strong>Most Important Section</strong><p>USCIS requires complete documentation showing the lawful source of ALL investment capital. Be as detailed as possible.</p></div>
            </div>
            <div className="form-group">
              <label>Source of Investment Capital <span className="required">*</span></label>
              <textarea name="sourceOfFunds" value={formData.sourceOfFunds} onChange={handleChange} required rows={8} placeholder="Describe in detail where the investment money comes from:&#10;• Employment income (specify positions, companies, years)&#10;• Business ownership/sale (specify business, ownership %, when acquired, sale details)&#10;• Real estate (property locations, purchase/sale dates, amounts)&#10;• Inheritance (from whom, when, amount)&#10;• Gifts (from whom, relationship, amount, when)&#10;• Loans (from what institution, collateral, terms)&#10;• Investment returns (what investments, timeline, amounts)&#10;• Other (explain in detail)" />
            </div>
            <div className="form-group">
              <label>Estimated Net Worth (USD)</label>
              <input type="text" name="netWorth" value={formData.netWorth} onChange={handleChange} placeholder="Approximate total net worth" />
            </div>
            <div className="form-group">
              <label>Business Experience</label>
              <textarea name="businessExperience" value={formData.businessExperience} onChange={handleChange} rows={4} placeholder="Your business ownership, executive roles, entrepreneurial experience" />
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-title"><i className="fas fa-users"></i> Family & Dependents</h2>
            <div className="form-group">
              <label>Family Members to Include</label>
              <textarea name="familyMembers" value={formData.familyMembers} onChange={handleChange} rows={3} placeholder="Spouse and unmarried children under 21 - names, birthdates, relationships" />
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-title"><i className="fas fa-briefcase"></i> Business/Job Creation Plan</h2>
            <div className="form-group">
              <label>Do you have a business plan?</label>
              <select name="businessPlan" value={formData.businessPlan} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Yes - Complete">Yes, completed business plan</option>
                <option value="Yes - Draft">Yes, draft in progress</option>
                <option value="No">No, need to create one</option>
                <option value="N/A - Regional Center">N/A - Using Regional Center</option>
              </select>
            </div>
            <div className="form-group">
              <label>Job Creation Strategy</label>
              <textarea name="jobCreation" value={formData.jobCreation} onChange={handleChange} rows={4} placeholder="How will the investment create/preserve 10+ jobs for U.S. workers?" />
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-title"><i className="fas fa-file-alt"></i> Documentation Available</h2>
            <div className="form-group">
              <label>What documentation do you currently have?</label>
              <textarea name="documentation" value={formData.documentation} onChange={handleChange} rows={6} placeholder="Check what you have:&#10;• Tax returns (how many years?)&#10;• Bank statements&#10;• Business financial statements&#10;• Corporate documents&#10;• Real estate records (deeds, sale agreements)&#10;• Employment contracts/pay stubs&#10;• Gift letters (notarized?)&#10;• Inheritance documents&#10;• Other relevant financial records" />
              <small>This audit will tell you what additional documentation you need to obtain.</small>
            </div>
          </div>

          <div className="form-section">
            <h2 className="form-section-title"><i className="fas fa-info-circle"></i> Additional Information</h2>
            <div className="form-group">
              <label>Any other relevant information?</label>
              <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} rows={4} placeholder="Concerns, questions, special circumstances, timeline urgency, etc." />
            </div>
          </div>

          <div className="form-section form-signature-section">
            <h2 className="form-section-title"><i className="fas fa-signature"></i> Authorization</h2>
            <div className="form-group"><label>Full Name <span className="required">*</span></label><input type="text" name="clientName" value={formData.clientName} onChange={handleChange} required /></div>
            <div className="form-group"><label>Date <span className="required">*</span></label><input type="date" name="signatureDate" value={formData.signatureDate} onChange={handleChange} required /></div>
            <div className="form-group"><label className="checkbox-label"><input type="checkbox" name="electronicSignature" checked={formData.electronicSignature} onChange={handleChange} required /><span>I certify all information is accurate and authorize source of funds review.</span></label></div>
          </div>

          <div className="form-submit-section">
            <button type="submit" className="form-submit-button"><i className="fas fa-search-dollar"></i> Submit for Source of Funds Audit ($2,500)</button>
            <p className="form-submit-note">Comprehensive audit will identify all required documentation and any gaps that could cause denial.</p>
          </div>
        </form>
      </div>

      <PaymentModal isOpen={showPaymentModal} onClose={closePaymentModal} amount={2500} email={currentEmail} onSuccess={handlePaymentSuccess} />
      <AccountCreationNudge isOpen={showNudgeModal} onSkip={handleSkipAccount} email={currentEmail} paymentId={paymentId} />
      </FormAccessGuard>
    </>
  );
};

export default EB5Intake;
