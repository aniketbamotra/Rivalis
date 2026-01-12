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

export const EB5Intake: React.FC = () => {
  const [formData, setFormData] = useState({
    fullLegalName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    currentLocation: '',
    citizenship: '',
    investmentPathway: '',
    teaStatus: '',
    investmentAmount: '',
    liquidAssets: '',
    sourceOfFunds1: false,
    sourceOfFunds2: false,
    sourceOfFunds3: false,
    sourceOfFunds4: false,
    sourceOfFunds5: false,
    sourceOfFunds6: false,
    sourceOfFunds7: false,
    sourceOfFunds8: false,
    sofDetails: '',
    sofTimeline: '',
    taxCompliance: '',
    documentation1: false,
    documentation2: false,
    documentation3: false,
    documentation4: false,
    documentation5: false,
    documentation6: false,
    documentation7: false,
    documentation8: false,
    documentation9: false,
    businessOwnership: '',
    businessHistory: '',
    executiveExperience: '',
    industryExperience: '',
    criminalHistory: '',
    immigrationViolations: '',
    adverseFindings: '',
    familyMembers: '',
    regionalCenter: '',
    timeframe: '',
    concerns: '',
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
      const result = await submitForm('eb5-intake', formData.email, formData);
      handleFormSubmit(formData.email, result.needsPayment || false);
      
      // Reset form
      setFormData({
        fullLegalName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        currentLocation: '',
        citizenship: '',
        investmentPathway: '',
        teaStatus: '',
        investmentAmount: '',
        liquidAssets: '',
        sourceOfFunds1: false,
        sourceOfFunds2: false,
        sourceOfFunds3: false,
        sourceOfFunds4: false,
        sourceOfFunds5: false,
        sourceOfFunds6: false,
        sourceOfFunds7: false,
        sourceOfFunds8: false,
        sofDetails: '',
        sofTimeline: '',
        taxCompliance: '',
        documentation1: false,
        documentation2: false,
        documentation3: false,
        documentation4: false,
        documentation5: false,
        documentation6: false,
        documentation7: false,
        documentation8: false,
        documentation9: false,
        businessOwnership: '',
        businessHistory: '',
        executiveExperience: '',
        industryExperience: '',
        criminalHistory: '',
        immigrationViolations: '',
        adverseFindings: '',
        familyMembers: '',
        regionalCenter: '',
        timeframe: '',
        concerns: '',
        additionalInfo: ''
      });
      
    } catch (error) {
      console.error('Error submitting EB-5 intake:', error);
      alert('There was an error submitting your form. Please try again or call +1 (313) 771-2283.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormAccessGuard>
      <Navigation />

      <section className="form-hero" style={{ background: 'linear-gradient(165deg, #1a365d 0%, #2c5282 100%)' }}>
        <div className="form-hero-container">
          <div className="form-breadcrumb">
            <Link href="/">Home</Link> / <Link href="/services/immigration/eb5-investor">EB-5 Investor</Link> / <span>Intake Form</span>
          </div>

          <div className="form-hero-badge" style={{ background: 'rgba(44, 82, 130, 0.3)', borderColor: '#2c5282', color: 'white' }}>
            <i className="fas fa-chart-line"></i>
            💼 EB-5 Investor Visa
          </div>

          <h1 style={{ color: 'white' }}>
            EB-5 Investor <span style={{ color: '#63b3ed' }}>Intake Form</span>
          </h1>

          <p className="form-hero-subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Comprehensive source of funds (SOF) documentation assessment. $2,500 flat fee consultation.
          </p>

          <div className="form-hero-features">
            <div className="form-hero-feature">
              <i className="fas fa-file-invoice-dollar"></i>
              <span>SOF Documentation</span>
            </div>
            <div className="form-hero-feature">
              <i className="fas fa-shield-alt"></i>
              <span>Attorney-Client Privileged</span>
            </div>
            <div className="form-hero-feature">
              <i className="fas fa-dollar-sign"></i>
              <span>$2,500 Flat Fee</span>
            </div>
          </div>
        </div>
      </section>

      <section className="form-section">
        <div className="form-section-container">
          <div className="form-card">
            <div className="form-card-header">
              <h2>EB-5 Investor Visa Assessment</h2>
              <p>$2,500 flat fee includes comprehensive SOF documentation strategy</p>
            </div>

            <div className="form-card-body">
              <div className="confidential-notice">
                <strong>⚠️ CONFIDENTIAL ATTORNEY-CLIENT COMMUNICATION</strong><br/>
                All information provided is protected by attorney-client privilege and kept strictly confidential.
              </div>

              <div style={{ background: '#fff5f5', border: '2px solid #fc8181', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
                <h4 style={{ color: '#c53030', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fas fa-exclamation-triangle"></i>
                  <span>60% of EB-5 Cases Fail on Source of Funds Documentation</span>
                </h4>
                <p style={{ color: '#742a2a', marginBottom: 0 }}>
                  USCIS forensic analysts scrutinize every dollar. Incomplete documentation = denial. Our Big 4 forensic team ensures bulletproof SOF compliance.
                </p>
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
                  <i className="fas fa-route"></i>
                  Investment Pathway
                </h3>

                <div className="form-group">
                  <label className="form-label">Investment Pathway <span className="required">*</span></label>
                  <select name="investmentPathway" className="form-input" value={formData.investmentPathway} onChange={handleChange} required>
                    <option value="">-- Select Pathway --</option>
                    <option value="Regional Center">Regional Center (90% of all EB-5 filings)</option>
                    <option value="Direct Investment">Direct Investment (10% of filings)</option>
                    <option value="Undecided">Undecided - Need Guidance</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Targeted Employment Area (TEA) Status <span className="required">*</span></label>
                  <select name="teaStatus" className="form-input" value={formData.teaStatus} onChange={handleChange} required>
                    <option value="">-- Select TEA Status --</option>
                    <option value="TEA">TEA (Targeted Employment Area - $800,000 investment)</option>
                    <option value="Non-TEA">Non-TEA (Standard Area - $1,050,000 investment)</option>
                    <option value="Unknown">Unknown - Need Help Determining</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Planned Investment Amount</label>
                  <input type="text" name="investmentAmount" className="form-input" placeholder="e.g., $800,000 or $1,050,000" value={formData.investmentAmount} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Total Liquid Assets Available <span className="required">*</span></label>
                  <select name="liquidAssets" className="form-input" value={formData.liquidAssets} onChange={handleChange} required>
                    <option value="">-- Select Range --</option>
                    <option value="Below $800k">Below $800,000 (Not Eligible)</option>
                    <option value="$800k-$1.5M">$800,000 - $1.5 Million</option>
                    <option value="$1.5M-$3M">$1.5 - $3 Million</option>
                    <option value="$3M-$5M">$3 - $5 Million</option>
                    <option value="$5M-$10M">$5 - $10 Million</option>
                    <option value="Above $10M">Above $10 Million</option>
                  </select>
                </div>

                <div className="form-divider"></div>

                <h3 className="form-section-title">
                  <i className="fas fa-file-invoice-dollar"></i>
                  Source of Funds (SOF) - Critical Section
                </h3>

                <p style={{ color: '#4a5568', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                  USCIS requires complete documentation of the lawful source for every dollar invested. Select all sources that apply to your investment capital:
                </p>

                {[
                  { key: 'sourceOfFunds1', label: 'Business Sale/Ownership' },
                  { key: 'sourceOfFunds2', label: 'Real Estate Sale/Appreciation' },
                  { key: 'sourceOfFunds3', label: 'Inheritance or Gift' },
                  { key: 'sourceOfFunds4', label: 'Employment Salary/Bonuses' },
                  { key: 'sourceOfFunds5', label: 'Investment Portfolio (Stocks, Bonds, etc.)' },
                  { key: 'sourceOfFunds6', label: 'Loan or Financing' },
                  { key: 'sourceOfFunds7', label: 'Sale of Intellectual Property' },
                  { key: 'sourceOfFunds8', label: 'Other (specify below)' }
                ].map((sof) => (
                  <div key={sof.key} style={{ marginBottom: '0.75rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 'normal' }}>
                      <input
                        type="checkbox"
                        name={sof.key}
                        checked={(formData as any)[sof.key]}
                        onChange={handleChange}
                        style={{ marginRight: '0.75rem' }}
                      />
                      <span>{sof.label}</span>
                    </label>
                  </div>
                ))}

                <div className="form-group">
                  <label className="form-label">Detailed Explanation of Source of Funds <span className="required">*</span></label>
                  <textarea name="sofDetails" className="form-input" rows={5} placeholder="Provide detailed explanation of how you accumulated the investment funds. Be specific about amounts, dates, and sources." value={formData.sofDetails} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Timeline of Wealth Accumulation</label>
                  <textarea name="sofTimeline" className="form-input" rows={3} placeholder="When did you acquire these funds? Provide a chronological timeline." value={formData.sofTimeline} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Tax Compliance <span className="required">*</span></label>
                  <select name="taxCompliance" className="form-input" value={formData.taxCompliance} onChange={handleChange} required>
                    <option value="">-- Select --</option>
                    <option value="Fully Compliant">Fully Compliant with Tax Obligations</option>
                    <option value="Mostly Compliant">Mostly Compliant (Minor Issues)</option>
                    <option value="Some Issues">Some Tax Issues to Address</option>
                    <option value="Significant Issues">Significant Tax Issues</option>
                  </select>
                </div>

                <div className="form-divider"></div>

                <h3 className="form-section-title">
                  <i className="fas fa-folder-open"></i>
                  Documentation Availability
                </h3>

                <p style={{ color: '#4a5568', marginBottom: '1.5rem' }}>
                  Check all documents you currently have or can obtain:
                </p>

                {[
                  { key: 'documentation1', label: 'Bank Statements (5+ years)' },
                  { key: 'documentation2', label: 'Tax Returns (Personal & Business, 5+ years)' },
                  { key: 'documentation3', label: 'Business Financial Statements' },
                  { key: 'documentation4', label: 'Sale Agreements (Real Estate, Business, Assets)' },
                  { key: 'documentation5', label: 'Proof of Salary/Employment Income' },
                  { key: 'documentation6', label: 'Investment Portfolio Statements' },
                  { key: 'documentation7', label: 'Gift/Inheritance Documentation' },
                  { key: 'documentation8', label: 'Loan Documents' },
                  { key: 'documentation9', label: 'Corporate/Business Registration Documents' }
                ].map((doc) => (
                  <div key={doc.key} style={{ marginBottom: '0.75rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 'normal' }}>
                      <input
                        type="checkbox"
                        name={doc.key}
                        checked={(formData as any)[doc.key]}
                        onChange={handleChange}
                        style={{ marginRight: '0.75rem' }}
                      />
                      <span>{doc.label}</span>
                    </label>
                  </div>
                ))}

                <div className="form-divider"></div>

                <h3 className="form-section-title">
                  <i className="fas fa-briefcase"></i>
                  Business Experience & Background
                </h3>

                <div className="form-group">
                  <label className="form-label">Business Ownership History</label>
                  <textarea name="businessOwnership" className="form-input" rows={3} placeholder="List businesses you've owned or managed, with dates and roles" value={formData.businessOwnership} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Business Success Stories</label>
                  <textarea name="businessHistory" className="form-input" rows={2} placeholder="Notable achievements, revenue growth, expansions" value={formData.businessHistory} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Executive/Management Experience</label>
                  <textarea name="executiveExperience" className="form-input" rows={2} placeholder="Senior leadership roles, team size managed, scope of responsibility" value={formData.executiveExperience} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Industry Experience</label>
                  <input type="text" name="industryExperience" className="form-input" placeholder="e.g., Real Estate, Technology, Manufacturing" value={formData.industryExperience} onChange={handleChange} />
                </div>

                <div className="form-divider"></div>

                <h3 className="form-section-title">
                  <i className="fas fa-shield-alt"></i>
                  Background & Admissibility
                </h3>

                <div className="form-group">
                  <label className="form-label">Criminal History <span className="required">*</span></label>
                  <textarea name="criminalHistory" className="form-input" rows={2} placeholder="Any arrests, convictions, or pending charges? (Be honest - we can only help if we know the truth)" value={formData.criminalHistory} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Immigration Violations <span className="required">*</span></label>
                  <textarea name="immigrationViolations" className="form-input" rows={2} placeholder="Any prior visa denials, overstays, or unlawful presence in any country?" value={formData.immigrationViolations} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Adverse Findings (Fraud, Misrepresentation, etc.)</label>
                  <textarea name="adverseFindings" className="form-input" rows={2} placeholder="Any government investigations, fraud allegations, or misrepresentation findings?" value={formData.adverseFindings} onChange={handleChange} />
                </div>

                <div className="form-divider"></div>

                <h3 className="form-section-title">
                  <i className="fas fa-users"></i>
                  Additional Information
                </h3>

                <div className="form-group">
                  <label className="form-label">Family Members Accompanying You</label>
                  <textarea name="familyMembers" className="form-input" rows={2} placeholder="Spouse, children (names, ages, relationship)" value={formData.familyMembers} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Regional Center Preference (if applicable)</label>
                  <input type="text" name="regionalCenter" className="form-input" placeholder="Name of regional center or project" value={formData.regionalCenter} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Desired Timeframe</label>
                  <select name="timeframe" className="form-input" value={formData.timeframe} onChange={handleChange}>
                    <option value="">-- Select Timeframe --</option>
                    <option value="Immediate">Immediate (Next 1-3 months)</option>
                    <option value="Short-term">Short-term (3-6 months)</option>
                    <option value="Medium-term">Medium-term (6-12 months)</option>
                    <option value="Long-term">Long-term (12+ months)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Primary Concerns or Questions</label>
                  <textarea name="concerns" className="form-input" rows={3} placeholder="What are your main concerns about the EB-5 process?" value={formData.concerns} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Additional Information</label>
                  <textarea name="additionalInfo" className="form-input" rows={3} placeholder="Any other relevant information" value={formData.additionalInfo} onChange={handleChange} />
                </div>

                <div className="consultation-fee-box" style={{ background: 'rgba(44, 82, 130, 0.1)', border: '2px solid #2c5282', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
                  <h4 style={{ color: '#2c5282', marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: 700 }}>
                    💼 EB-5 SOF Assessment Fee: $2,500
                  </h4>
                  <p style={{ color: '#4a5568', marginBottom: 0 }}>
                    Includes comprehensive source of funds documentation strategy, forensic due diligence review by Big 4-trained analysts, and admissibility assessment.
                  </p>
                </div>

                <button
                  type="submit"
                  className="form-submit-button"
                  disabled={loading}
                  style={{ background: 'linear-gradient(135deg, #2c5282 0%, #1a365d 100%)' }}
                >
                  {loading ? 'Submitting...' : 'Submit EB-5 Investor Intake'}
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
export default EB5Intake;
