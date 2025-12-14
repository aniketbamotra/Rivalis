import React from 'react';
import { BaseIntakeForm } from '../../components/Forms/BaseIntakeForm';
import { FormAccessGuard } from '../../components/Common/FormAccessGuard';
import { PaymentModal } from '../../components/Common/PaymentModal';
import { AccountCreationNudge } from '../../components/Common/AccountCreationNudge';
import { useFormSubmissionWithPayment } from '../../hooks/useFormSubmissionWithPayment';
import { submitForm } from '../../lib/supabase';

interface EntityFormationFormData {
  companyName: string;
  entityType: string;
  jurisdiction: string[];
  ownershipStructure: string;
  businessDescription: string;
  requiredTimeline: string;
  numberOfOwners: string;
  businessPurpose: string;
  taxElection: string;
  foreignOwnership: string;
  intendedState: string;
}

const EntityFormationSpecificFields: React.FC<{
  formData: EntityFormationFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleCheckboxChange: (name: keyof EntityFormationFormData, value: string) => void;
}> = ({ formData, handleChange, handleCheckboxChange }) => {

  return (
    <div className="section">
      <h2 className="section-title">Entity Formation - Specific Information</h2>
      
      <div className="form-group">
        <label htmlFor="companyName">Proposed Company Name <span className="required">*</span></label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Enter your desired company name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="entityType">Entity Type <span className="required">*</span></label>
        <div className="radio-group">
          <div className="radio-item">
            <input
              type="radio"
              id="entity-llc"
              name="entityType"
              value="llc"
              checked={formData.entityType === 'llc'}
              onChange={handleChange}
              required
            />
            <label htmlFor="entity-llc">LLC (Limited Liability Company)</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="entity-corporation"
              name="entityType"
              value="corporation"
              checked={formData.entityType === 'corporation'}
              onChange={handleChange}
            />
            <label htmlFor="entity-corporation">Corporation (C-Corp or S-Corp)</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="entity-partnership"
              name="entityType"
              value="partnership"
              checked={formData.entityType === 'partnership'}
              onChange={handleChange}
            />
            <label htmlFor="entity-partnership">Partnership</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="entity-other"
              name="entityType"
              value="other"
              checked={formData.entityType === 'other'}
              onChange={handleChange}
            />
            <label htmlFor="entity-other">Other (specify in description)</label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Preferred Jurisdiction <span className="required">*</span></label>
        <div className="checkbox-group">
          {[
            { value: 'delaware', label: 'Delaware (most common for corporations)' },
            { value: 'uae', label: 'UAE (international business)' },
            { value: 'california', label: 'California' },
            { value: 'new-york', label: 'New York' },
            { value: 'texas', label: 'Texas' },
            { value: 'other', label: 'Other state (specify below)' }
          ].map(option => (
            <div key={option.value} className="checkbox-item">
              <input
                type="checkbox"
                id={`jurisdiction-${option.value}`}
                name="jurisdiction"
                value={option.value}
                checked={formData.jurisdiction.includes(option.value)}
                onChange={() => handleCheckboxChange('jurisdiction', option.value)}
                required={formData.jurisdiction.length === 0}
              />
              <label htmlFor={`jurisdiction-${option.value}`}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      {formData.jurisdiction.includes('other') && (
        <div className="form-group">
          <label htmlFor="intendedState">Please specify other state</label>
          <input
            type="text"
            id="intendedState"
            name="intendedState"
            value={formData.intendedState}
            onChange={handleChange}
            placeholder="Enter state name"
          />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="ownershipStructure">Ownership Structure <span className="required">*</span></label>
        <select
          id="ownershipStructure"
          name="ownershipStructure"
          value={formData.ownershipStructure}
          onChange={handleChange}
          required
        >
          <option value="">Select structure...</option>
          <option value="single">Single Member/Owner</option>
          <option value="multiple">Multiple Members/Owners (2-5)</option>
          <option value="complex">Complex Structure (5+ owners)</option>
          <option value="investor">Investor/Venture Structure</option>
          <option value="foreign">Foreign Ownership Involved</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="numberOfOwners">Number of Initial Owners/Members</label>
        <input
          type="number"
          id="numberOfOwners"
          name="numberOfOwners"
          value={formData.numberOfOwners}
          onChange={handleChange}
          min="1"
          max="100"
          placeholder="Enter number"
        />
      </div>

      <div className="form-group">
        <label htmlFor="businessDescription">Business Description <span className="required">*</span></label>
        <textarea
          id="businessDescription"
          name="businessDescription"
          value={formData.businessDescription}
          onChange={handleChange}
          rows={4}
          placeholder="Describe your business activities, industry, and operational details..."
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="businessPurpose">Primary Business Purpose</label>
        <input
          type="text"
          id="businessPurpose"
          name="businessPurpose"
          value={formData.businessPurpose}
          onChange={handleChange}
          placeholder="e.g., Software development, Consulting services, E-commerce, etc."
        />
      </div>

      <div className="form-group">
        <label htmlFor="taxElection">Preferred Tax Election (if applicable)</label>
        <select
          id="taxElection"
          name="taxElection"
          value={formData.taxElection}
          onChange={handleChange}
        >
          <option value="">Select tax election...</option>
          <option value="default">Default (pass-through for LLC)</option>
          <option value="s-corp">S-Corporation Election</option>
          <option value="c-corp">C-Corporation (double taxation)</option>
          <option value="unsure">Unsure - Need advice</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="foreignOwnership">Any foreign ownership or international operations?</label>
        <div className="radio-group">
          <div className="radio-item">
            <input
              type="radio"
              id="foreign-yes"
              name="foreignOwnership"
              value="yes"
              checked={formData.foreignOwnership === 'yes'}
              onChange={handleChange}
            />
            <label htmlFor="foreign-yes">Yes (specify details in business description)</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="foreign-no"
              name="foreignOwnership"
              value="no"
              checked={formData.foreignOwnership === 'no'}
              onChange={handleChange}
            />
            <label htmlFor="foreign-no">No - Domestic only</label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="requiredTimeline">Required Timeline <span className="required">*</span></label>
        <select
          id="requiredTimeline"
          name="requiredTimeline"
          value={formData.requiredTimeline}
          onChange={handleChange}
          required
        >
          <option value="">Select urgency...</option>
          <option value="emergency">Emergency (1-3 days) - Additional rush fees apply</option>
          <option value="urgent">Urgent (1 week)</option>
          <option value="soon">Soon (2-3 weeks)</option>
          <option value="planning">Planning (1 month+)</option>
        </select>
      </div>
    </div>
  );
};

const EntityFormationIntake: React.FC = () => {
  const [entityData, setEntityData] = React.useState<EntityFormationFormData>({
    companyName: '',
    entityType: '',
    jurisdiction: [],
    ownershipStructure: '',
    businessDescription: '',
    requiredTimeline: '',
    numberOfOwners: '',
    businessPurpose: '',
    taxElection: '',
    foreignOwnership: '',
    intendedState: ''
  });

  const [loading, setLoading] = React.useState(false);

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

  const handleEntityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEntityData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: keyof EntityFormationFormData, value: string) => {
    const currentValues = entityData[name] as string[];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    setEntityData(prev => ({ ...prev, [name]: updatedValues }));
  };

  const handleSubmit = async (combinedData: Record<string, unknown>) => {
    setLoading(true);
    try {
      const email = (combinedData.email as string) || '';
      const result = await submitForm('entity-formation', email, combinedData);
      handleFormSubmit(email, result.needsPayment || false);
    } catch (error) {
      console.error('Error submitting entity formation form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormAccessGuard>
      <BaseIntakeForm
        serviceName="Entity Formation"
        serviceIcon="🏢"
        serviceDescription="Delaware & UAE entity formation specialists. Complete business entity setup and compliance."
        serviceColor="blue"
        servicePath="entity-formation"
        formType="entity-formation"
        onSubmit={handleSubmit}
        loading={loading}
      >
        <EntityFormationSpecificFields
          formData={entityData}
          handleChange={handleEntityChange}
          handleCheckboxChange={handleCheckboxChange}
        />
      </BaseIntakeForm>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={closePaymentModal}
        onSuccess={handlePaymentSuccess}
        email={currentEmail}
        amount={299}
      />

      <AccountCreationNudge
        isOpen={showNudgeModal}
        email={currentEmail}
        paymentId={paymentId}
        onSkip={handleSkipAccount}
      />
    </FormAccessGuard>
  );
};

export default EntityFormationIntake;