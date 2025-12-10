import React, { useState } from 'react';
import { BaseIntakeForm, type BaseFormData } from '../../components/Forms/BaseIntakeForm';
import { submitForm } from '../../utils/api';

// M&A-specific form data interface
interface MAFormData extends BaseFormData {
  // M&A Transaction Details
  transactionType: string;
  transactionStage: string;
  transactionValue: string;
  targetCompany: string;
  industry: string;
  geographicScope: string[];
  servicesNeeded: string[];
  dealConcerns: string;
  otherAdvisors: 'yes' | 'no' | '';
  advisorsList: string;
  closingTimeline: string;
}

// M&A-specific fields component
const MASpecificFields: React.FC<{
  formData: MAFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onCheckboxChange: (name: string, value: string, checked: boolean) => void;
}> = ({ formData, onChange, onCheckboxChange }) => {
  return (
    <>
      <h3 className="form-section-title">
        <i className="fas fa-handshake"></i>
        M&A Transaction Details
      </h3>

      <div className="form-group">
        <label className="form-label">
          Transaction Type <span className="required">*</span>
        </label>
        <select
          name="transactionType"
          className="form-select"
          value={formData.transactionType}
          onChange={onChange}
          required
        >
          <option value="">Select transaction type...</option>
          <option value="acquisition">Acquisition (we are acquiring)</option>
          <option value="sale">Sale (we are selling)</option>
          <option value="merger">Merger</option>
          <option value="joint-venture">Joint Venture</option>
          <option value="asset-purchase">Asset Purchase</option>
          <option value="stock-purchase">Stock Purchase</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Transaction Stage</label>
        <select
          name="transactionStage"
          className="form-select"
          value={formData.transactionStage}
          onChange={onChange}
        >
          <option value="">Select stage...</option>
          <option value="exploring">Exploring Options</option>
          <option value="loi">LOI/Term Sheet Stage</option>
          <option value="due-diligence">Due Diligence</option>
          <option value="negotiation">Contract Negotiation</option>
          <option value="closing">Near Closing</option>
          <option value="post-closing">Post-Closing Issues</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Estimated Transaction Value</label>
        <select
          name="transactionValue"
          className="form-select"
          value={formData.transactionValue}
          onChange={onChange}
        >
          <option value="">Select range...</option>
          <option value="under-1m">Under $1M</option>
          <option value="1m-5m">$1M - $5M</option>
          <option value="5m-10m">$5M - $10M</option>
          <option value="10m-25m">$10M - $25M</option>
          <option value="25m-50m">$25M - $50M</option>
          <option value="50m-plus">$50M+</option>
          <option value="tbd">To Be Determined</option>
        </select>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Target Company/Seller Name</label>
          <input
            type="text"
            name="targetCompany"
            className="form-input"
            value={formData.targetCompany}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Industry/Sector</label>
          <input
            type="text"
            name="industry"
            className="form-input"
            value={formData.industry}
            onChange={onChange}
            placeholder="e.g., Software/SaaS, Manufacturing, Healthcare, etc."
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Geographic Scope</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '0.75rem', 
            fontWeight: 'normal', 
            cursor: 'pointer' 
          }}>
            <input
              type="checkbox"
              checked={formData.geographicScope.includes('us-only')}
              onChange={(e) => onCheckboxChange('geographicScope', 'us-only', e.target.checked)}
              style={{ marginTop: '0.25rem', order: 1 }}
            />
            <span style={{ order: 2 }}>US Only</span>
          </label>
          <label style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '0.75rem', 
            fontWeight: 'normal', 
            cursor: 'pointer' 
          }}>
            <input
              type="checkbox"
              checked={formData.geographicScope.includes('cross-border')}
              onChange={(e) => onCheckboxChange('geographicScope', 'cross-border', e.target.checked)}
              style={{ marginTop: '0.25rem', order: 1 }}
            />
            <span style={{ order: 2 }}>Cross-Border (specify countries below)</span>
          </label>
          <label style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '0.75rem', 
            fontWeight: 'normal', 
            cursor: 'pointer' 
          }}>
            <input
              type="checkbox"
              checked={formData.geographicScope.includes('uae')}
              onChange={(e) => onCheckboxChange('geographicScope', 'uae', e.target.checked)}
              style={{ marginTop: '0.25rem', order: 1 }}
            />
            <span style={{ order: 2 }}>Involves UAE Entity</span>
          </label>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Specific Services Needed</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '0.75rem', 
            fontWeight: 'normal', 
            cursor: 'pointer' 
          }}>
            <input
              type="checkbox"
              checked={formData.servicesNeeded.includes('due-diligence')}
              onChange={(e) => onCheckboxChange('servicesNeeded', 'due-diligence', e.target.checked)}
              style={{ marginTop: '0.25rem', order: 1 }}
            />
            <span style={{ order: 2 }}>Due Diligence Review</span>
          </label>
          <label style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '0.75rem', 
            fontWeight: 'normal', 
            cursor: 'pointer' 
          }}>
            <input
              type="checkbox"
              checked={formData.servicesNeeded.includes('tax-analysis')}
              onChange={(e) => onCheckboxChange('servicesNeeded', 'tax-analysis', e.target.checked)}
              style={{ marginTop: '0.25rem', order: 1 }}
            />
            <span style={{ order: 2 }}>Tax Structure Analysis</span>
          </label>
          <label style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '0.75rem', 
            fontWeight: 'normal', 
            cursor: 'pointer' 
          }}>
            <input
              type="checkbox"
              checked={formData.servicesNeeded.includes('contract-drafting')}
              onChange={(e) => onCheckboxChange('servicesNeeded', 'contract-drafting', e.target.checked)}
              style={{ marginTop: '0.25rem', order: 1 }}
            />
            <span style={{ order: 2 }}>Purchase Agreement Drafting</span>
          </label>
          <label style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '0.75rem', 
            fontWeight: 'normal', 
            cursor: 'pointer' 
          }}>
            <input
              type="checkbox"
              checked={formData.servicesNeeded.includes('contract-review')}
              onChange={(e) => onCheckboxChange('servicesNeeded', 'contract-review', e.target.checked)}
              style={{ marginTop: '0.25rem', order: 1 }}
            />
            <span style={{ order: 2 }}>Purchase Agreement Review</span>
          </label>
          <label style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '0.75rem', 
            fontWeight: 'normal', 
            cursor: 'pointer' 
          }}>
            <input
              type="checkbox"
              checked={formData.servicesNeeded.includes('negotiation')}
              onChange={(e) => onCheckboxChange('servicesNeeded', 'negotiation', e.target.checked)}
              style={{ marginTop: '0.25rem', order: 1 }}
            />
            <span style={{ order: 2 }}>Negotiation Support</span>
          </label>
          <label style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '0.75rem', 
            fontWeight: 'normal', 
            cursor: 'pointer' 
          }}>
            <input
              type="checkbox"
              checked={formData.servicesNeeded.includes('closing')}
              onChange={(e) => onCheckboxChange('servicesNeeded', 'closing', e.target.checked)}
              style={{ marginTop: '0.25rem', order: 1 }}
            />
            <span style={{ order: 2 }}>Closing Coordination</span>
          </label>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Have you identified specific deal-breakers or concerns?</label>
        <textarea
          name="dealConcerns"
          className="form-textarea"
          value={formData.dealConcerns}
          onChange={onChange}
          placeholder="Tax liabilities, litigation, intellectual property issues, regulatory compliance, etc."
        />
      </div>

      <div className="form-group">
        <label className="form-label">Are other advisors involved? (Investment bankers, accountants, etc.)</label>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            fontWeight: 'normal', 
            cursor: 'pointer',
            justifyContent: 'flex-start'
          }}>
            <input
              type="radio"
              name="otherAdvisors"
              value="yes"
              checked={formData.otherAdvisors === 'yes'}
              onChange={onChange}
              style={{ 
                marginRight: '0.5rem',
                flexShrink: 0,
                order: 1
              }}
            />
            <span style={{ order: 2 }}>Yes (list below)</span>
          </label>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            fontWeight: 'normal', 
            cursor: 'pointer',
            justifyContent: 'flex-start'
          }}>
            <input
              type="radio"
              name="otherAdvisors"
              value="no"
              checked={formData.otherAdvisors === 'no'}
              onChange={onChange}
              style={{ 
                marginRight: '0.5rem',
                flexShrink: 0,
                order: 1
              }}
            />
            <span style={{ order: 2 }}>No</span>
          </label>
        </div>
      </div>

      {formData.otherAdvisors === 'yes' && (
        <div className="form-group">
          <label className="form-label">Other Advisors</label>
          <textarea
            name="advisorsList"
            className="form-textarea"
            value={formData.advisorsList}
            onChange={onChange}
            placeholder="Names and roles of other advisors"
          />
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Expected Closing Timeline</label>
        <input
          type="text"
          name="closingTimeline"
          className="form-input"
          value={formData.closingTimeline}
          onChange={onChange}
          placeholder="e.g., 90 days, Q2 2025, etc."
        />
      </div>
    </>
  );
};

export const MAIntake: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [maFormData, setMAFormData] = useState<Omit<MAFormData, keyof BaseFormData>>({
    transactionType: '',
    transactionStage: '',
    transactionValue: '',
    targetCompany: '',
    industry: '',
    geographicScope: [],
    servicesNeeded: [],
    dealConcerns: '',
    otherAdvisors: '',
    advisorsList: '',
    closingTimeline: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMAFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    setMAFormData(prev => ({
      ...prev,
      [name]: checked 
        ? [...(prev[name as keyof typeof prev] as string[]), value]
        : (prev[name as keyof typeof prev] as string[]).filter((item: string) => item !== value)
    }));
  };

  const handleSubmit = async (combinedFormData: Record<string, unknown>) => {
    setLoading(true);
    
    try {
      await submitForm('ma-intake', combinedFormData);
      alert('Thank you! Your M&A transaction intake has been submitted. Our corporate team will review and contact you within 24 hours.');
      
      // Reset M&A-specific form data
      setMAFormData({
        transactionType: '',
        transactionStage: '',
        transactionValue: '',
        targetCompany: '',
        industry: '',
        geographicScope: [],
        servicesNeeded: [],
        dealConcerns: '',
        otherAdvisors: '',
        advisorsList: '',
        closingTimeline: '',
      });
      
    } catch (error) {
      console.error('Error submitting M&A intake:', error);
      alert('There was an error submitting your form. Please try again or call (313) 771-2283.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseIntakeForm
      serviceName="M&A Transactions"
      serviceIcon="🤝"
      serviceDescription="Our team specializes in complex mergers, acquisitions, and corporate transactions."
      serviceColor="#667eea"
      servicePath="/ma"
      formType="ma-intake"
      loading={loading}
      onSubmit={(formData) => handleSubmit({ ...formData, ...maFormData })}
    >
      <MASpecificFields 
        formData={{ ...maFormData } as MAFormData}
        onChange={handleChange}
        onCheckboxChange={handleCheckboxChange}
      />
    </BaseIntakeForm>
  );
};