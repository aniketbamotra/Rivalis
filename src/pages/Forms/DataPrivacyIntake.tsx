import React from 'react';
import { BaseIntakeForm } from '../../components/Forms/BaseIntakeForm';
import { submitForm } from '../../utils/api';

interface DataPrivacyFormData {
  dataType: string[];
  privacyGeography: string[];
  businessModel: string;
  privacyCurrent: string[];
  privacyNeeds: string[];
  dataBreach: string;
  dataSubjects: string;
}

const DataPrivacySpecificFields: React.FC<{
  formData: DataPrivacyFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleCheckboxChange: (name: keyof DataPrivacyFormData, value: string) => void;
}> = ({ formData, handleChange, handleCheckboxChange }) => {

  return (
    <div className="section">
      <h2 className="section-title">Data Privacy Compliance - Specific Information</h2>
      
      <div className="form-group">
        <label>Type of Data Collected <span className="required">*</span></label>
        <div className="checkbox-group">
          {[
            { value: 'personal', label: 'Personal Identifiable Information (PII)' },
            { value: 'financial', label: 'Financial Information' },
            { value: 'health', label: 'Health Information (HIPAA)' },
            { value: 'biometric', label: 'Biometric Data' },
            { value: 'children', label: 'Children\'s Data (COPPA)' },
            { value: 'employee', label: 'Employee Data' },
            { value: 'behavioral', label: 'Behavioral/Usage Data' }
          ].map(option => (
            <div key={option.value} className="checkbox-item">
              <input
                type="checkbox"
                id={`data-type-${option.value}`}
                name="dataType"
                value={option.value}
                checked={formData.dataType.includes(option.value)}
                onChange={() => handleCheckboxChange('dataType', option.value)}
                required={formData.dataType.length === 0}
              />
              <label htmlFor={`data-type-${option.value}`}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Geographic Scope/Users <span className="required">*</span></label>
        <div className="checkbox-group">
          {[
            { value: 'us-nationwide', label: 'US Nationwide (multiple states)' },
            { value: 'california', label: 'California (CCPA/CPRA)' },
            { value: 'eu', label: 'European Union (GDPR)' },
            { value: 'uk', label: 'United Kingdom (UK GDPR)' },
            { value: 'uae', label: 'UAE' },
            { value: 'global', label: 'Global/Multiple Jurisdictions' }
          ].map(option => (
            <div key={option.value} className="checkbox-item">
              <input
                type="checkbox"
                id={`privacy-geography-${option.value}`}
                name="privacyGeography"
                value={option.value}
                checked={formData.privacyGeography.includes(option.value)}
                onChange={() => handleCheckboxChange('privacyGeography', option.value)}
                required={formData.privacyGeography.length === 0}
              />
              <label htmlFor={`privacy-geography-${option.value}`}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="businessModel">Business Model</label>
        <select
          id="businessModel"
          name="businessModel"
          value={formData.businessModel}
          onChange={handleChange}
        >
          <option value="">Select model...</option>
          <option value="b2c">B2C (Consumer-facing)</option>
          <option value="b2b">B2B (Business clients)</option>
          <option value="both">Both B2C and B2B</option>
          <option value="marketplace">Marketplace/Platform</option>
          <option value="saas">SaaS Application</option>
          <option value="ecommerce">E-commerce</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>Current Privacy Compliance Status</label>
        <div className="checkbox-group">
          {[
            { value: 'privacy-policy', label: 'Have Privacy Policy' },
            { value: 'terms', label: 'Have Terms of Service' },
            { value: 'cookie-policy', label: 'Have Cookie Policy' },
            { value: 'data-processing', label: 'Have Data Processing Agreements' },
            { value: 'procedures', label: 'Have Data Subject Request Procedures' },
            { value: 'none', label: 'None - Starting from scratch' }
          ].map(option => (
            <div key={option.value} className="checkbox-item">
              <input
                type="checkbox"
                id={`privacy-current-${option.value}`}
                name="privacyCurrent"
                value={option.value}
                checked={formData.privacyCurrent.includes(option.value)}
                onChange={() => handleCheckboxChange('privacyCurrent', option.value)}
              />
              <label htmlFor={`privacy-current-${option.value}`}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Specific Privacy Concerns/Needs</label>
        <div className="checkbox-group">
          {[
            { value: 'compliance-audit', label: 'Privacy Compliance Audit' },
            { value: 'policy-drafting', label: 'Policy Drafting/Update' },
            { value: 'data-breach', label: 'Data Breach Response' },
            { value: 'regulatory-inquiry', label: 'Regulatory Inquiry/Investigation' },
            { value: 'vendor-agreements', label: 'Vendor/Third-Party Agreements' },
            { value: 'training', label: 'Employee Training Program' }
          ].map(option => (
            <div key={option.value} className="checkbox-item">
              <input
                type="checkbox"
                id={`privacy-needs-${option.value}`}
                name="privacyNeeds"
                value={option.value}
                checked={formData.privacyNeeds.includes(option.value)}
                onChange={() => handleCheckboxChange('privacyNeeds', option.value)}
              />
              <label htmlFor={`privacy-needs-${option.value}`}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="dataBreach">Have you experienced a data breach or security incident?</label>
        <div className="radio-group">
          <div className="radio-item">
            <input
              type="radio"
              id="breach-yes"
              name="dataBreach"
              value="yes"
              checked={formData.dataBreach === 'yes'}
              onChange={handleChange}
            />
            <label htmlFor="breach-yes">Yes (urgent - discuss immediately)</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="breach-no"
              name="dataBreach"
              value="no"
              checked={formData.dataBreach === 'no'}
              onChange={handleChange}
            />
            <label htmlFor="breach-no">No</label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="dataSubjects">Number of Data Subjects/Users</label>
        <select
          id="dataSubjects"
          name="dataSubjects"
          value={formData.dataSubjects}
          onChange={handleChange}
        >
          <option value="">Select range...</option>
          <option value="under-1k">Under 1,000</option>
          <option value="1k-10k">1,000 - 10,000</option>
          <option value="10k-100k">10,000 - 100,000</option>
          <option value="100k-1m">100,000 - 1M</option>
          <option value="1m-plus">1M+</option>
        </select>
      </div>
    </div>
  );
};

const DataPrivacyIntake: React.FC = () => {
  const [privacyData, setPrivacyData] = React.useState<DataPrivacyFormData>({
    dataType: [],
    privacyGeography: [],
    businessModel: '',
    privacyCurrent: [],
    privacyNeeds: [],
    dataBreach: '',
    dataSubjects: ''
  });

  const [loading, setLoading] = React.useState(false);

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPrivacyData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: keyof DataPrivacyFormData, value: string) => {
    const currentValues = privacyData[name] as string[];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    setPrivacyData(prev => ({ ...prev, [name]: updatedValues }));
  };

  const handleSubmit = async (combinedData: Record<string, unknown>) => {
    setLoading(true);
    try {
      await submitForm('data-privacy', combinedData);
      console.log('Data privacy form submitted successfully');
    } catch (error) {
      console.error('Error submitting data privacy form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseIntakeForm
      serviceName="Data Privacy Compliance"
      serviceIcon="🔒"
      serviceDescription="Comprehensive data privacy compliance, GDPR/CCPA guidance, and privacy policy development."
      serviceColor="purple"
      servicePath="data-privacy"
      formType="data-privacy"
      onSubmit={handleSubmit}
      loading={loading}
    >
      <DataPrivacySpecificFields
        formData={privacyData}
        handleChange={handlePrivacyChange}
        handleCheckboxChange={handleCheckboxChange}
      />
    </BaseIntakeForm>
  );
};

export default DataPrivacyIntake;