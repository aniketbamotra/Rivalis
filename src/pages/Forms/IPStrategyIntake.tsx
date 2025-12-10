import React from 'react';
import { BaseIntakeForm } from '../../components/Forms/BaseIntakeForm';
import { submitForm } from '../../utils/api';

interface IPStrategyFormData {
  ipType: string[];
  ipAssets: string;
  ipInUse: string;
  ipSearch: string;
  ipGeography: string[];
  ipConcerns: string[];
  ipTimeline: string;
}

const IPStrategySpecificFields: React.FC<{
  formData: IPStrategyFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleCheckboxChange: (name: keyof IPStrategyFormData, value: string) => void;
}> = ({ formData, handleChange, handleCheckboxChange }) => {

  return (
    <div className="section">
      <h2 className="section-title">IP Strategy & Protection - Specific Information</h2>
      
      <div className="form-group">
        <label>Type of IP Protection Needed <span className="required">*</span></label>
        <div className="checkbox-group">
          {[
            { value: 'trademark', label: 'Trademark' },
            { value: 'copyright', label: 'Copyright' },
            { value: 'trade-secret', label: 'Trade Secret Protection' },
            { value: 'patent-referral', label: 'Patent (coordination/referral)' },
            { value: 'licensing', label: 'IP Licensing' },
            { value: 'portfolio', label: 'IP Portfolio Strategy' }
          ].map(option => (
            <div key={option.value} className="checkbox-item">
              <input
                type="checkbox"
                id={`ip-type-${option.value}`}
                name="ipType"
                value={option.value}
                checked={formData.ipType.includes(option.value)}
                onChange={() => handleCheckboxChange('ipType', option.value)}
                required={formData.ipType.length === 0}
              />
              <label htmlFor={`ip-type-${option.value}`}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="ipAssets">What needs protection?</label>
        <textarea
          id="ipAssets"
          name="ipAssets"
          value={formData.ipAssets}
          onChange={handleChange}
          rows={4}
          placeholder="Brand name, logo, product name, software code, designs, processes, etc."
        />
      </div>

      <div className="form-group">
        <label htmlFor="ipInUse">Is this IP currently in use?</label>
        <div className="radio-group">
          <div className="radio-item">
            <input
              type="radio"
              id="ip-in-use-yes"
              name="ipInUse"
              value="yes"
              checked={formData.ipInUse === 'yes'}
              onChange={handleChange}
            />
            <label htmlFor="ip-in-use-yes">Yes - Currently using</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="ip-in-use-planning"
              name="ipInUse"
              value="planning"
              checked={formData.ipInUse === 'planning'}
              onChange={handleChange}
            />
            <label htmlFor="ip-in-use-planning">Planning to use soon</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="ip-in-use-no"
              name="ipInUse"
              value="no"
              checked={formData.ipInUse === 'no'}
              onChange={handleChange}
            />
            <label htmlFor="ip-in-use-no">Not yet in use</label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="ipSearch">Have you conducted trademark/IP searches?</label>
        <div className="radio-group">
          <div className="radio-item">
            <input
              type="radio"
              id="ip-search-yes"
              name="ipSearch"
              value="yes"
              checked={formData.ipSearch === 'yes'}
              onChange={handleChange}
            />
            <label htmlFor="ip-search-yes">Yes</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="ip-search-no"
              name="ipSearch"
              value="no"
              checked={formData.ipSearch === 'no'}
              onChange={handleChange}
            />
            <label htmlFor="ip-search-no">No - Need search conducted</label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Geographic Scope of Protection</label>
        <div className="checkbox-group">
          {[
            { value: 'us', label: 'United States' },
            { value: 'eu', label: 'European Union' },
            { value: 'uae', label: 'UAE/GCC' },
            { value: 'international', label: 'International (multiple countries)' }
          ].map(option => (
            <div key={option.value} className="checkbox-item">
              <input
                type="checkbox"
                id={`ip-geography-${option.value}`}
                name="ipGeography"
                value={option.value}
                checked={formData.ipGeography.includes(option.value)}
                onChange={() => handleCheckboxChange('ipGeography', option.value)}
              />
              <label htmlFor={`ip-geography-${option.value}`}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Specific IP Issues/Concerns</label>
        <div className="checkbox-group">
          {[
            { value: 'infringement', label: 'Potential Infringement by Others' },
            { value: 'clearance', label: 'Clearance for New Product/Brand' },
            { value: 'employee', label: 'Employee IP Assignment Issues' },
            { value: 'licensing', label: 'IP Licensing Opportunities' },
            { value: 'valuation', label: 'IP Valuation (for fundraising/M&A)' }
          ].map(option => (
            <div key={option.value} className="checkbox-item">
              <input
                type="checkbox"
                id={`ip-concerns-${option.value}`}
                name="ipConcerns"
                value={option.value}
                checked={formData.ipConcerns.includes(option.value)}
                onChange={() => handleCheckboxChange('ipConcerns', option.value)}
              />
              <label htmlFor={`ip-concerns-${option.value}`}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="ipTimeline">Timeline for IP Protection</label>
        <input
          type="text"
          id="ipTimeline"
          name="ipTimeline"
          value={formData.ipTimeline}
          onChange={handleChange}
          placeholder="e.g., Before product launch in 3 months, ASAP, etc."
        />
      </div>
    </div>
  );
};

const IPStrategyIntake: React.FC = () => {
  const [ipData, setIPData] = React.useState<IPStrategyFormData>({
    ipType: [],
    ipAssets: '',
    ipInUse: '',
    ipSearch: '',
    ipGeography: [],
    ipConcerns: [],
    ipTimeline: ''
  });

  const [loading, setLoading] = React.useState(false);

  const handleIPChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setIPData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: keyof IPStrategyFormData, value: string) => {
    const currentValues = ipData[name] as string[];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    setIPData(prev => ({ ...prev, [name]: updatedValues }));
  };

  const handleSubmit = async (combinedData: Record<string, unknown>) => {
    setLoading(true);
    try {
      await submitForm('ip-strategy', combinedData);
      console.log('IP strategy form submitted successfully');
    } catch (error) {
      console.error('Error submitting IP strategy form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseIntakeForm
      serviceName="IP Strategy & Protection"
      serviceIcon="⚖️"
      serviceDescription="Comprehensive intellectual property strategy, trademark protection, and IP portfolio development."
      serviceColor="indigo"
      servicePath="ip-strategy"
      formType="ip-strategy"
      onSubmit={handleSubmit}
      loading={loading}
    >
      <IPStrategySpecificFields
        formData={ipData}
        handleChange={handleIPChange}
        handleCheckboxChange={handleCheckboxChange}
      />
    </BaseIntakeForm>
  );
};

export default IPStrategyIntake;