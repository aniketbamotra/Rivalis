import React from 'react';
import { BaseIntakeForm } from '../../components/Forms/BaseIntakeForm';
import { submitForm } from '../../utils/api';

interface FundraisingFormData {
  fundraisingType: string;
  fundraisingStage: string;
  raiseAmount: string;
  formationStatus: string;
  capTable: string;
  existingDocs: string[];
  fundraisingTimeline: string;
  investorType: string[];
}

const FundraisingSpecificFields: React.FC<{
  formData: FundraisingFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleCheckboxChange: (name: keyof FundraisingFormData, value: string) => void;
}> = ({ formData, handleChange, handleCheckboxChange }) => {

  return (
    <div className="section">
      <h2 className="section-title">Fundraising & Securities - Specific Information</h2>
      
      <div className="form-group">
        <label htmlFor="fundraisingType">Type of Financing <span className="required">*</span></label>
        <select
          id="fundraisingType"
          name="fundraisingType"
          value={formData.fundraisingType}
          onChange={handleChange}
          required
        >
          <option value="">Select financing type...</option>
          <option value="safe">SAFE (Simple Agreement for Future Equity)</option>
          <option value="convertible-note">Convertible Note</option>
          <option value="priced-round">Priced Equity Round (Series Seed/A/B/etc.)</option>
          <option value="friends-family">Friends & Family Round</option>
          <option value="angel">Angel Investment</option>
          <option value="venture">Venture Capital</option>
          <option value="crowdfunding">Crowdfunding (Reg CF/A+)</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="fundraisingStage">Fundraising Stage</label>
        <select
          id="fundraisingStage"
          name="fundraisingStage"
          value={formData.fundraisingStage}
          onChange={handleChange}
        >
          <option value="">Select stage...</option>
          <option value="planning">Planning/Pre-fundraising</option>
          <option value="conversations">In Conversations with Investors</option>
          <option value="term-sheet">Received Term Sheet</option>
          <option value="due-diligence">Due Diligence Stage</option>
          <option value="closing">Ready to Close</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="raiseAmount">Target Raise Amount</label>
        <select
          id="raiseAmount"
          name="raiseAmount"
          value={formData.raiseAmount}
          onChange={handleChange}
        >
          <option value="">Select range...</option>
          <option value="under-250k">Under $250K</option>
          <option value="250k-1m">$250K - $1M</option>
          <option value="1m-3m">$1M - $3M</option>
          <option value="3m-10m">$3M - $10M</option>
          <option value="10m-plus">$10M+</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="formationStatus">Company Formation Status</label>
        <div className="radio-group">
          <div className="radio-item">
            <input
              type="radio"
              id="formation-delaware-corp"
              name="formationStatus"
              value="delaware-corp"
              checked={formData.formationStatus === 'delaware-corp'}
              onChange={handleChange}
            />
            <label htmlFor="formation-delaware-corp">Delaware C-Corporation (formed)</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="formation-other-corp"
              name="formationStatus"
              value="other-corp"
              checked={formData.formationStatus === 'other-corp'}
              onChange={handleChange}
            />
            <label htmlFor="formation-other-corp">Other State C-Corporation (formed)</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="formation-llc"
              name="formationStatus"
              value="llc"
              checked={formData.formationStatus === 'llc'}
              onChange={handleChange}
            />
            <label htmlFor="formation-llc">LLC (may need conversion)</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="formation-not-formed"
              name="formationStatus"
              value="not-formed"
              checked={formData.formationStatus === 'not-formed'}
              onChange={handleChange}
            />
            <label htmlFor="formation-not-formed">Not Yet Formed</label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="capTable">Current Capitalization</label>
        <textarea
          id="capTable"
          name="capTable"
          value={formData.capTable}
          onChange={handleChange}
          rows={4}
          placeholder="Number of founders, current ownership %, any existing investors, option pool, etc."
        />
      </div>

      <div className="form-group">
        <label>Do you have existing legal documentation?</label>
        <div className="checkbox-group">
          {[
            { value: 'incorporation', label: 'Incorporation Documents' },
            { value: 'bylaws', label: 'Bylaws' },
            { value: 'founder-agreements', label: 'Founder Agreements' },
            { value: 'ip-assignment', label: 'IP Assignment Agreements' },
            { value: 'stock-plan', label: 'Stock Incentive Plan' },
            { value: 'board-resolutions', label: 'Board Resolutions' },
            { value: 'none', label: 'None - Need to develop' }
          ].map(option => (
            <div key={option.value} className="checkbox-item">
              <input
                type="checkbox"
                id={`existing-docs-${option.value}`}
                name="existingDocs"
                value={option.value}
                checked={formData.existingDocs.includes(option.value)}
                onChange={() => handleCheckboxChange('existingDocs', option.value)}
              />
              <label htmlFor={`existing-docs-${option.value}`}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Type of Investors</label>
        <div className="checkbox-group">
          {[
            { value: 'friends-family', label: 'Friends & Family' },
            { value: 'angel-investors', label: 'Angel Investors' },
            { value: 'seed-funds', label: 'Seed Funds' },
            { value: 'vc-funds', label: 'Venture Capital Funds' },
            { value: 'strategic', label: 'Strategic Investors' },
            { value: 'crowdfunding', label: 'Crowdfunding Platform' }
          ].map(option => (
            <div key={option.value} className="checkbox-item">
              <input
                type="checkbox"
                id={`investor-type-${option.value}`}
                name="investorType"
                value={option.value}
                checked={formData.investorType.includes(option.value)}
                onChange={() => handleCheckboxChange('investorType', option.value)}
              />
              <label htmlFor={`investor-type-${option.value}`}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="fundraisingTimeline">Expected Timeline to Close</label>
        <input
          type="text"
          id="fundraisingTimeline"
          name="fundraisingTimeline"
          value={formData.fundraisingTimeline}
          onChange={handleChange}
          placeholder="e.g., 90 days, by Q2 2025, ASAP, etc."
        />
      </div>
    </div>
  );
};

const FundraisingIntake: React.FC = () => {
  const [fundraisingData, setFundraisingData] = React.useState<FundraisingFormData>({
    fundraisingType: '',
    fundraisingStage: '',
    raiseAmount: '',
    formationStatus: '',
    capTable: '',
    existingDocs: [],
    fundraisingTimeline: '',
    investorType: []
  });

  const [loading, setLoading] = React.useState(false);

  const handleFundraisingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFundraisingData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: keyof FundraisingFormData, value: string) => {
    const currentValues = fundraisingData[name] as string[];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    setFundraisingData(prev => ({ ...prev, [name]: updatedValues }));
  };

  const handleSubmit = async (combinedData: Record<string, unknown>) => {
    setLoading(true);
    try {
      await submitForm('fundraising', combinedData);
      console.log('Fundraising form submitted successfully');
    } catch (error) {
      console.error('Error submitting fundraising form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseIntakeForm
      serviceName="Fundraising & Securities"
      serviceIcon="💰"
      serviceDescription="Comprehensive fundraising support, securities compliance, and investor documentation services."
      serviceColor="gold"
      servicePath="fundraising"
      formType="fundraising"
      onSubmit={handleSubmit}
      loading={loading}
    >
      <FundraisingSpecificFields
        formData={fundraisingData}
        handleChange={handleFundraisingChange}
        handleCheckboxChange={handleCheckboxChange}
      />
    </BaseIntakeForm>
  );
};

export default FundraisingIntake;