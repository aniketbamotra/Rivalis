import React from 'react';
import { BaseIntakeForm } from '../../components/Forms/BaseIntakeForm';
import { submitForm } from '../../utils/api';

interface EmploymentLawFormData {
  employmentType: string;
  companySize: string;
  employeeLocations: string[];
  operationStates: string;
  employmentDocs: string[];
  employmentConcerns: string;
  activeClaim: string;
  claimDescription: string;
}

const EmploymentLawSpecificFields: React.FC<{
  formData: EmploymentLawFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleCheckboxChange: (name: keyof EmploymentLawFormData, value: string) => void;
}> = ({ formData, handleChange, handleCheckboxChange }) => {

  return (
    <div className="section">
      <h2 className="section-title">Employment Law - Specific Information</h2>
      
      <div className="form-group">
        <label htmlFor="employmentType">Type of Employment Matter <span className="required">*</span></label>
        <select
          id="employmentType"
          name="employmentType"
          value={formData.employmentType}
          onChange={handleChange}
          required
        >
          <option value="">Select matter type...</option>
          <option value="handbook">Employee Handbook Development</option>
          <option value="offer-letters">Offer Letters/Employment Agreements</option>
          <option value="independent-contractor">Independent Contractor Agreements</option>
          <option value="termination">Termination/Separation</option>
          <option value="discrimination">Discrimination/Harassment Claim</option>
          <option value="wage-hour">Wage & Hour Compliance</option>
          <option value="leave">Leave Policies (FMLA, ADA, etc.)</option>
          <option value="non-compete">Non-Compete/Non-Solicitation</option>
          <option value="workplace-investigation">Workplace Investigation</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="companySize">Company Size (Number of Employees)</label>
        <select
          id="companySize"
          name="companySize"
          value={formData.companySize}
          onChange={handleChange}
        >
          <option value="">Select size...</option>
          <option value="1-10">1-10 employees</option>
          <option value="11-50">11-50 employees</option>
          <option value="51-200">51-200 employees</option>
          <option value="201-500">201-500 employees</option>
          <option value="500-plus">500+ employees</option>
        </select>
      </div>

      <div className="form-group">
        <label>Employee Locations</label>
        <div className="checkbox-group">
          {[
            { value: 'single-state', label: 'Single State (specify below)' },
            { value: 'multi-state', label: 'Multiple US States' },
            { value: 'remote', label: 'Fully Remote/Distributed' },
            { value: 'international', label: 'International Employees' }
          ].map(option => (
            <div key={option.value} className="checkbox-item">
              <input
                type="checkbox"
                id={`employee-locations-${option.value}`}
                name="employeeLocations"
                value={option.value}
                checked={formData.employeeLocations.includes(option.value)}
                onChange={() => handleCheckboxChange('employeeLocations', option.value)}
              />
              <label htmlFor={`employee-locations-${option.value}`}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="operationStates">Primary State(s) of Operation</label>
        <input
          type="text"
          id="operationStates"
          name="operationStates"
          value={formData.operationStates}
          onChange={handleChange}
          placeholder="e.g., New York, California, Texas, etc."
        />
      </div>

      <div className="form-group">
        <label>Current Employment Documentation</label>
        <div className="checkbox-group">
          {[
            { value: 'handbook', label: 'Employee Handbook' },
            { value: 'offer-template', label: 'Offer Letter Templates' },
            { value: 'contractor-template', label: 'Contractor Agreement Templates' },
            { value: 'policies', label: 'HR Policies' },
            { value: 'none', label: 'None - Need to develop' }
          ].map(option => (
            <div key={option.value} className="checkbox-item">
              <input
                type="checkbox"
                id={`employment-docs-${option.value}`}
                name="employmentDocs"
                value={option.value}
                checked={formData.employmentDocs.includes(option.value)}
                onChange={() => handleCheckboxChange('employmentDocs', option.value)}
              />
              <label htmlFor={`employment-docs-${option.value}`}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="employmentConcerns">Specific Employment Law Concerns</label>
        <textarea
          id="employmentConcerns"
          name="employmentConcerns"
          value={formData.employmentConcerns}
          onChange={handleChange}
          rows={4}
          placeholder="Describe specific issues, concerns, or questions"
        />
      </div>

      <div className="form-group">
        <label htmlFor="activeClaim">Is there an active claim or complaint?</label>
        <div className="radio-group">
          <div className="radio-item">
            <input
              type="radio"
              id="claim-yes"
              name="activeClaim"
              value="yes"
              checked={formData.activeClaim === 'yes'}
              onChange={handleChange}
            />
            <label htmlFor="claim-yes">Yes (describe below)</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="claim-no"
              name="activeClaim"
              value="no"
              checked={formData.activeClaim === 'no'}
              onChange={handleChange}
            />
            <label htmlFor="claim-no">No - Preventive/Advisory</label>
          </div>
        </div>
      </div>

      {formData.activeClaim === 'yes' && (
        <div className="form-group">
          <label htmlFor="claimDescription">Claim/Complaint Details</label>
          <textarea
            id="claimDescription"
            name="claimDescription"
            value={formData.claimDescription}
            onChange={handleChange}
            rows={4}
            placeholder="EEOC charge, lawsuit, internal complaint, etc."
          />
        </div>
      )}
    </div>
  );
};

const EmploymentLawIntake: React.FC = () => {
  const [employmentData, setEmploymentData] = React.useState<EmploymentLawFormData>({
    employmentType: '',
    companySize: '',
    employeeLocations: [],
    operationStates: '',
    employmentDocs: [],
    employmentConcerns: '',
    activeClaim: '',
    claimDescription: ''
  });

  const [loading, setLoading] = React.useState(false);

  const handleEmploymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmploymentData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: keyof EmploymentLawFormData, value: string) => {
    const currentValues = employmentData[name] as string[];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    setEmploymentData(prev => ({ ...prev, [name]: updatedValues }));
  };

  const handleSubmit = async (combinedData: Record<string, unknown>) => {
    setLoading(true);
    try {
      await submitForm('employment-law', combinedData);
      console.log('Employment law form submitted successfully');
    } catch (error) {
      console.error('Error submitting employment law form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseIntakeForm
      serviceName="Employment Law"
      serviceIcon="👥"
      serviceDescription="Comprehensive employment law guidance, policy development, and workplace compliance solutions."
      serviceColor="green"
      servicePath="employment-law"
      formType="employment-law"
      onSubmit={handleSubmit}
      loading={loading}
    >
      <EmploymentLawSpecificFields
        formData={employmentData}
        handleChange={handleEmploymentChange}
        handleCheckboxChange={handleCheckboxChange}
      />
    </BaseIntakeForm>
  );
};

export default EmploymentLawIntake;