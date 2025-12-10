import React from 'react';
import { BaseIntakeForm } from '../../components/Forms/BaseIntakeForm';
import { submitForm } from '../../utils/api';

interface ContractReviewFormData {
  contractService: string;
  contractType: string;
  contractValue: string;
  otherParty: string;
  contractRole: string;
  contractSigned: string;
  contractConcerns: string;
  contractTimeline: string;
  contractJurisdiction: string;
  otherContractType?: string;
}

const ContractReviewSpecificFields: React.FC<{
  formData: ContractReviewFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}> = ({ formData, handleChange }) => {
  return (
    <div className="section">
      <h2 className="section-title">Contract Review & Drafting - Specific Information</h2>
      
      <div className="form-group">
        <label htmlFor="contractService">Service Needed <span className="required">*</span></label>
        <div className="radio-group">
          <div className="radio-item">
            <input
              type="radio"
              id="contract-review"
              name="contractService"
              value="review"
              checked={formData.contractService === 'review'}
              onChange={handleChange}
              required
            />
            <label htmlFor="contract-review">Review Existing Contract</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="contract-drafting"
              name="contractService"
              value="drafting"
              checked={formData.contractService === 'drafting'}
              onChange={handleChange}
            />
            <label htmlFor="contract-drafting">Draft New Contract</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="contract-negotiation"
              name="contractService"
              value="negotiation"
              checked={formData.contractService === 'negotiation'}
              onChange={handleChange}
            />
            <label htmlFor="contract-negotiation">Negotiation Support</label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="contractType">Type of Contract <span className="required">*</span></label>
        <select
          id="contractType"
          name="contractType"
          value={formData.contractType}
          onChange={handleChange}
          required
        >
          <option value="">Select contract type...</option>
          <option value="vendor-agreement">Vendor/Supplier Agreement</option>
          <option value="customer-agreement">Customer/Client Agreement</option>
          <option value="partnership">Partnership Agreement</option>
          <option value="jv">Joint Venture Agreement</option>
          <option value="nda">Non-Disclosure Agreement</option>
          <option value="employment">Employment Agreement</option>
          <option value="consulting">Consulting/Independent Contractor Agreement</option>
          <option value="saas">SaaS/Software License Agreement</option>
          <option value="ip-license">IP License Agreement</option>
          <option value="lease">Lease Agreement</option>
          <option value="other">Other (specify below)</option>
        </select>
      </div>

      {formData.contractType === 'other' && (
        <div className="form-group">
          <label htmlFor="otherContractType">Please specify contract type</label>
          <input
            type="text"
            id="otherContractType"
            name="otherContractType"
            value={formData.otherContractType || ''}
            onChange={handleChange}
            placeholder="Please describe the type of contract"
          />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="contractValue">Contract Value/Transaction Size</label>
        <input
          type="text"
          id="contractValue"
          name="contractValue"
          value={formData.contractValue}
          onChange={handleChange}
          placeholder="e.g., $500,000 annually, $2M total, etc."
        />
      </div>

      <div className="form-group">
        <label htmlFor="otherParty">Other Party to Contract</label>
        <input
          type="text"
          id="otherParty"
          name="otherParty"
          value={formData.otherParty}
          onChange={handleChange}
          placeholder="Company/individual name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="contractRole">Your Role in Transaction</label>
        <div className="radio-group">
          <div className="radio-item">
            <input
              type="radio"
              id="role-buyer"
              name="contractRole"
              value="buyer"
              checked={formData.contractRole === 'buyer'}
              onChange={handleChange}
            />
            <label htmlFor="role-buyer">Buyer/Customer</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="role-seller"
              name="contractRole"
              value="seller"
              checked={formData.contractRole === 'seller'}
              onChange={handleChange}
            />
            <label htmlFor="role-seller">Seller/Vendor</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="role-partner"
              name="contractRole"
              value="partner"
              checked={formData.contractRole === 'partner'}
              onChange={handleChange}
            />
            <label htmlFor="role-partner">Partner/Collaborator</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="role-employer"
              name="contractRole"
              value="employer"
              checked={formData.contractRole === 'employer'}
              onChange={handleChange}
            />
            <label htmlFor="role-employer">Employer</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="role-other"
              name="contractRole"
              value="other"
              checked={formData.contractRole === 'other'}
              onChange={handleChange}
            />
            <label htmlFor="role-other">Other</label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="contractSigned">Has contract already been signed?</label>
        <div className="radio-group">
          <div className="radio-item">
            <input
              type="radio"
              id="signed-no"
              name="contractSigned"
              value="no"
              checked={formData.contractSigned === 'no'}
              onChange={handleChange}
            />
            <label htmlFor="signed-no">No - Need review before signing</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="signed-negotiation"
              name="contractSigned"
              value="negotiation"
              checked={formData.contractSigned === 'negotiation'}
              onChange={handleChange}
            />
            <label htmlFor="signed-negotiation">No - In negotiation</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="signed-yes"
              name="contractSigned"
              value="yes"
              checked={formData.contractSigned === 'yes'}
              onChange={handleChange}
            />
            <label htmlFor="signed-yes">Yes - Signed (need advice on interpretation/dispute)</label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="contractConcerns">Specific Concerns or Key Terms to Focus On</label>
        <textarea
          id="contractConcerns"
          name="contractConcerns"
          value={formData.contractConcerns}
          onChange={handleChange}
          rows={4}
          placeholder="Liability limitations, indemnification, termination rights, payment terms, IP ownership, etc."
        />
      </div>

      <div className="form-group">
        <label htmlFor="contractTimeline">Timeline for Review/Drafting</label>
        <input
          type="text"
          id="contractTimeline"
          name="contractTimeline"
          value={formData.contractTimeline}
          onChange={handleChange}
          placeholder="e.g., Need within 3 days, counterparty expecting response by Friday, etc."
        />
      </div>

      <div className="form-group">
        <label htmlFor="contractJurisdiction">Governing Law/Jurisdiction</label>
        <input
          type="text"
          id="contractJurisdiction"
          name="contractJurisdiction"
          value={formData.contractJurisdiction}
          onChange={handleChange}
          placeholder="e.g., New York, Delaware, California, etc."
        />
      </div>
    </div>
  );
};

const ContractReviewIntake: React.FC = () => {
  const [contractData, setContractData] = React.useState<ContractReviewFormData>({
    contractService: '',
    contractType: '',
    contractValue: '',
    otherParty: '',
    contractRole: '',
    contractSigned: '',
    contractConcerns: '',
    contractTimeline: '',
    contractJurisdiction: '',
    otherContractType: ''
  });

  const [loading, setLoading] = React.useState(false);

  const handleContractChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContractData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (combinedData: Record<string, unknown>) => {
    setLoading(true);
    try {
      await submitForm('contract-review', combinedData);
      // Handle success (maybe redirect or show success message)
      console.log('Contract review form submitted successfully');
    } catch (error) {
      console.error('Error submitting contract review form:', error);
      // Handle error (show error message to user)
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseIntakeForm
      serviceName="Contract Review & Drafting"
      serviceIcon="📄"
      serviceDescription="Professional contract review, drafting, and negotiation support for all business agreements."
      serviceColor="blue"
      servicePath="contracts"
      formType="contract-review"
      onSubmit={handleSubmit}
      loading={loading}
    >
      <ContractReviewSpecificFields
        formData={contractData}
        handleChange={handleContractChange}
      />
    </BaseIntakeForm>
  );
};

export default ContractReviewIntake;