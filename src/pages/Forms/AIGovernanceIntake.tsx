import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Layout/Navigation';
import { submitForm } from '../../lib/supabase';
import '../../styles/form-page.css';
import '../../styles/home.css';

export const AIGovernanceIntake: React.FC = () => {
  const [formData, setFormData] = useState({
    // Client Information
    clientType: '',
    companyName: '',
    contactName: '',
    title: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    
    // AI System Information
    aiTypes: [] as string[],
    aiUseCase: '',
    aiStage: '',
    jurisdictions: [] as string[],
    industry: '',
    
    // Governance & Compliance Status
    currentDocs: [] as string[],
    biasTesting: '',
    dataSources: '',
    
    // Specific Concerns & Needs
    concerns: [] as string[],
    primaryConcern: '',
    incidentOccurred: '',
    incidentDescription: '',
    fundraising: '',
    
    // Timeline & Budget
    timeline: '',
    deadlines: '',
    budget: '',
    
    // Conflicts Check
    competitors: '',
    otherCounsel: '',
    counselInfo: '',
    
    // Additional Information
    referralSource: '',
    additionalInfo: '',
    
    // Authorization
    signatureName: '',
    signatureTitle: '',
    signatureDate: '',
    signature: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      if (name === 'aiTypes' || name === 'jurisdictions' || name === 'currentDocs' || name === 'concerns') {
        setFormData(prev => {
          const currentArray = prev[name as keyof typeof prev] as string[];
          if (checkbox.checked) {
            return { ...prev, [name]: [...currentArray, value] };
          } else {
            return { ...prev, [name]: currentArray.filter(item => item !== value) };
          }
        });
      } else {
        setFormData(prev => ({ ...prev, [name]: checkbox.checked ? value : '' }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitForm('ai-governance-intake', formData.email, formData);
      alert('Thank you! Your AI governance intake has been submitted. Our AI legal team will review and contact you within 48 hours.');
      setFormData({
        // Client Information
        clientType: '',
        companyName: '',
        contactName: '',
        title: '',
        email: '',
        phone: '',
        website: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: 'United States',
        
        // AI System Information
        aiTypes: [],
        aiUseCase: '',
        aiStage: '',
        jurisdictions: [],
        industry: '',
        
        // Governance & Compliance Status
        currentDocs: [],
        biasTesting: '',
        dataSources: '',
        
        // Specific Concerns & Needs
        concerns: [],
        primaryConcern: '',
        incidentOccurred: '',
        incidentDescription: '',
        fundraising: '',
        
        // Timeline & Budget
        timeline: '',
        deadlines: '',
        budget: '',
        
        // Conflicts Check
        competitors: '',
        otherCounsel: '',
        counselInfo: '',
        
        // Additional Information
        referralSource: '',
        additionalInfo: '',
        
        // Authorization
        signatureName: '',
        signatureTitle: '',
        signatureDate: '',
        signature: '',
      });
    } catch (error) {
      console.error('Error submitting AI governance intake:', error);
      alert('There was an error submitting your form. Please try again or call (313) 771-2283.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />

      {/* Hero */}
      <section className="form-hero">
        <div className="form-hero-container">
          <div className="form-breadcrumb">
            <Link to="/">Home</Link> / <Link to="/services/governance">AI Governance</Link> / <span>Intake Form</span>
          </div>

          <div className="form-hero-badge">
            <i className="fas fa-robot"></i>
            Oxford AI Programme Certified Counsel
          </div>

          <h1>AI Governance <span className="highlight">Assessment</span></h1>

          <p className="form-hero-subtitle">
            EU AI Act enforcement begins in 2025. Ensure your AI systems are compliant. 
            Complete this form for a comprehensive AI governance assessment.
          </p>

          <div className="form-hero-features">
            <div className="form-hero-feature">
              <i className="fas fa-graduation-cap"></i>
              <span>Oxford AI Certified</span>
            </div>
            <div className="form-hero-feature">
              <i className="fas fa-globe"></i>
              <span>EU AI Act Expertise</span>
            </div>
            <div className="form-hero-feature">
              <i className="fas fa-shield-alt"></i>
              <span>Risk Assessment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="form-section">
        <div className="form-section-container">
          <div className="form-card">
            <div className="form-card-header">
              <h2>AI Governance Intake Form</h2>
              <p>Help us understand your AI systems and compliance needs</p>
            </div>

            <div className="form-card-body">
              <div className="form-info-box mb-8">
                <h4><i className="fas fa-exclamation-triangle"></i> Confidentiality Notice</h4>
                <p>This intake form is protected by attorney-client privilege considerations. The information you provide will be kept confidential. Submission of this form does not create an attorney-client relationship until a formal engagement letter is executed.</p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* SECTION 1: CLIENT INFORMATION */}
                <h3 className="form-section-title">
                  <i className="fas fa-building"></i>
                  1. Client Information
                </h3>

                <div className="form-group">
                  <label className="form-label">Client Type <span className="required">*</span></label>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
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
                        name="clientType"
                        value="business"
                        checked={formData.clientType === 'business'}
                        onChange={handleChange}
                        required
                        style={{ 
                          marginRight: '0.5rem',
                          flexShrink: 0,
                          order: 1
                        }}
                      />
                      <span style={{ order: 2 }}>Business/Company</span>
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
                        name="clientType"
                        value="individual"
                        checked={formData.clientType === 'individual'}
                        onChange={handleChange}
                        style={{ 
                          marginRight: '0.5rem',
                          flexShrink: 0,
                          order: 1
                        }}
                      />
                      <span style={{ order: 2 }}>Individual</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Company/Entity Name <span className="required">*</span></label>
                  <input
                    type="text"
                    name="companyName"
                    className="form-input"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Contact Person Name <span className="required">*</span></label>
                    <input
                      type="text"
                      name="contactName"
                      className="form-input"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Title/Role <span className="required">*</span></label>
                    <input
                      type="text"
                      name="title"
                      className="form-input"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Email Address <span className="required">*</span></label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number <span className="required">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Company Website</label>
                  <input
                    type="text"
                    name="website"
                    className="form-input"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Company Address <span className="required">*</span></label>
                  <input
                    type="text"
                    name="address"
                    className="form-input"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">City <span className="required">*</span></label>
                    <input
                      type="text"
                      name="city"
                      className="form-input"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State/Province <span className="required">*</span></label>
                    <input
                      type="text"
                      name="state"
                      className="form-input"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">ZIP/Postal Code <span className="required">*</span></label>
                    <input
                      type="text"
                      name="zip"
                      className="form-input"
                      value={formData.zip}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country <span className="required">*</span></label>
                    <input
                      type="text"
                      name="country"
                      className="form-input"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-divider"></div>

                {/* SECTION 2: AI SYSTEM INFORMATION */}
                <h3 className="form-section-title">
                  <i className="fas fa-brain"></i>
                  2. AI System Information
                </h3>

                <div className="form-group">
                  <label className="form-label">Type of AI System/Product <span className="required">*</span></label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                    {[
                      { value: 'generative-ai', label: 'Generative AI (text, image, video, audio generation)' },
                      { value: 'predictive', label: 'Predictive Analytics/Decision Systems' },
                      { value: 'recommendation', label: 'Recommendation Systems' },
                      { value: 'computer-vision', label: 'Computer Vision/Image Recognition' },
                      { value: 'nlp', label: 'Natural Language Processing/Understanding' },
                      { value: 'autonomous', label: 'Autonomous Systems/Robotics' },
                      { value: 'other', label: 'Other (specify in use case section)' }
                    ].map((type) => (
                      <label key={type.value} style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: '0.5rem', 
                        fontWeight: 'normal', 
                        cursor: 'pointer',
                        width: '100%',
                        justifyContent: 'flex-start'
                      }}>
                        <input
                          type="checkbox"
                          name="aiTypes"
                          value={type.value}
                          checked={formData.aiTypes.includes(type.value)}
                          onChange={handleChange}
                          style={{ 
                            marginTop: '0.25rem',
                            marginRight: '0.5rem',
                            flexShrink: 0,
                            order: 1
                          }}
                        />
                        <span style={{ order: 2, flex: 1 }}>{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Primary Use Case/Application <span className="required">*</span></label>
                  <textarea
                    name="aiUseCase"
                    className="form-textarea min-h-[120px]"
                    placeholder="Describe what the AI system does and how it's used..."
                    value={formData.aiUseCase}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Current Development Stage <span className="required">*</span></label>
                  <select
                    name="aiStage"
                    className="form-select"
                    value={formData.aiStage}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select stage...</option>
                    <option value="concept">Concept/Planning Phase</option>
                    <option value="development">In Development</option>
                    <option value="testing">Testing/Beta Phase</option>
                    <option value="deployed">Deployed/Live in Production</option>
                    <option value="scaling">Scaling/Growing User Base</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Target Markets/Jurisdictions <span className="required">*</span></label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                    {[
                      { value: 'usa', label: 'United States' },
                      { value: 'eu', label: 'European Union (AI Act applies)' },
                      { value: 'uk', label: 'United Kingdom' },
                      { value: 'uae', label: 'United Arab Emirates' },
                      { value: 'global', label: 'Global/Multiple Jurisdictions' }
                    ].map((jurisdiction) => (
                      <label key={jurisdiction.value} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem', 
                        fontWeight: 'normal', 
                        cursor: 'pointer',
                        width: '100%',
                        justifyContent: 'flex-start'
                      }}>
                        <input
                          type="checkbox"
                          name="jurisdictions"
                          value={jurisdiction.value}
                          checked={formData.jurisdictions.includes(jurisdiction.value)}
                          onChange={handleChange}
                          style={{ 
                            marginRight: '0.5rem',
                            flexShrink: 0,
                            order: 1
                          }}
                        />
                        <span style={{ order: 2, flex: 1 }}>{jurisdiction.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Industry/Sector <span className="required">*</span></label>
                  <input
                    type="text"
                    name="industry"
                    className="form-input"
                    placeholder="e.g., Healthcare, Finance, Retail, Manufacturing, etc."
                    value={formData.industry}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-divider"></div>

                {/* SECTION 3: GOVERNANCE & COMPLIANCE STATUS */}
                <h3 className="form-section-title">
                  <i className="fas fa-shield-alt"></i>
                  3. Current Governance & Compliance Status
                </h3>

                <div className="form-group">
                  <label className="form-label">Do you currently have AI governance documentation?</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                    {[
                      { value: 'policy', label: 'AI Ethics/Governance Policy' },
                      { value: 'risk-assessment', label: 'Risk Assessment Documentation' },
                      { value: 'impact', label: 'AI Impact Assessment' },
                      { value: 'testing', label: 'Testing/Validation Documentation' },
                      { value: 'model-cards', label: 'Model Cards/Documentation' },
                      { value: 'incident', label: 'Incident Response Plans' },
                      { value: 'none', label: 'None - Need to develop from scratch' }
                    ].map((doc) => (
                      <label key={doc.value} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem', 
                        fontWeight: 'normal', 
                        cursor: 'pointer',
                        width: '100%',
                        justifyContent: 'flex-start'
                      }}>
                        <input
                          type="checkbox"
                          name="currentDocs"
                          value={doc.value}
                          checked={formData.currentDocs.includes(doc.value)}
                          onChange={handleChange}
                          style={{ 
                            marginRight: '0.5rem',
                            flexShrink: 0,
                            order: 1
                          }}
                        />
                        <span style={{ order: 2, flex: 1 }}>{doc.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Have you conducted bias/fairness testing?</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="biasTesting"
                        value="yes"
                        checked={formData.biasTesting === 'yes'}
                        onChange={handleChange}
                      />
                      <span>Yes - Documented testing</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="biasTesting"
                        value="informal"
                        checked={formData.biasTesting === 'informal'}
                        onChange={handleChange}
                      />
                      <span>Informal testing only</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="biasTesting"
                        value="no"
                        checked={formData.biasTesting === 'no'}
                        onChange={handleChange}
                      />
                      <span>No - Not yet tested</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Data used for AI training/operation</label>
                  <textarea
                    name="dataSources"
                    className="form-textarea"
                    placeholder="Describe data sources, whether data includes personal information, data collection methods, etc."
                    value={formData.dataSources}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-divider"></div>

                {/* SECTION 4: SPECIFIC CONCERNS & NEEDS */}
                <h3 className="form-section-title">
                  <i className="fas fa-exclamation-circle"></i>
                  4. Specific Concerns & Legal Needs
                </h3>

                <div className="form-group">
                  <label className="form-label">What prompted you to seek AI governance counsel? <span className="required">*</span></label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                    {[
                      { value: 'investor-dd', label: 'Investor Due Diligence Requirements' },
                      { value: 'product-launch', label: 'Upcoming Product Launch' },
                      { value: 'regulatory-inquiry', label: 'Regulatory Inquiry or Investigation' },
                      { value: 'customer-concerns', label: 'Customer/Partner Compliance Requirements' },
                      { value: 'media-attention', label: 'Media Attention or Public Scrutiny' },
                      { value: 'incident-occurred', label: 'AI-related Incident Occurred' },
                      { value: 'proactive-compliance', label: 'Proactive Compliance Planning' },
                      { value: 'board-request', label: 'Board or Executive Request' },
                      { value: 'other', label: 'Other (specify in primary concern)' }
                    ].map((concern) => (
                      <label key={concern.value} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem', 
                        fontWeight: 'normal', 
                        cursor: 'pointer',
                        width: '100%',
                        justifyContent: 'flex-start'
                      }}>
                        <input
                          type="checkbox"
                          name="concerns"
                          value={concern.value}
                          checked={formData.concerns.includes(concern.value)}
                          onChange={handleChange}
                          style={{ 
                            marginRight: '0.5rem',
                            flexShrink: 0,
                            order: 1
                          }}
                        />
                        <span style={{ order: 2, flex: 1 }}>{concern.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Describe your primary concern or objective <span className="required">*</span></label>
                  <textarea
                    name="primaryConcern"
                    className="form-textarea"
                    placeholder="What is your main goal in engaging AI governance counsel?"
                    value={formData.primaryConcern}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Has there been any AI-related incident or adverse event?</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="incidentOccurred"
                        value="yes"
                        checked={formData.incidentOccurred === 'yes'}
                        onChange={handleChange}
                      />
                      <span>Yes - Please describe below</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="incidentOccurred"
                        value="no"
                        checked={formData.incidentOccurred === 'no'}
                        onChange={handleChange}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                {formData.incidentOccurred === 'yes' && (
                  <div className="form-group">
                    <label className="form-label">Incident Details</label>
                    <textarea
                      name="incidentDescription"
                      className="form-textarea"
                      placeholder="Describe what happened, when, impact, who knows about it..."
                      value={formData.incidentDescription}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Are you currently fundraising or in M&A discussions?</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="fundraising"
                        value="yes"
                        checked={formData.fundraising === 'yes'}
                        onChange={handleChange}
                      />
                      <span>Yes - AI governance is part of due diligence</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="fundraising"
                        value="no"
                        checked={formData.fundraising === 'no'}
                        onChange={handleChange}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div className="form-divider"></div>

                {/* SECTION 5: TIMELINE & BUDGET */}
                <h3 className="form-section-title">
                  <i className="fas fa-calendar-alt"></i>
                  5. Timeline & Budget
                </h3>

                <div className="form-group">
                  <label className="form-label">Timeline/Urgency <span className="required">*</span></label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="timeline"
                        value="emergency"
                        checked={formData.timeline === 'emergency'}
                        onChange={handleChange}
                        required
                      />
                      <span>Emergency (Within 1-2 weeks)</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="timeline"
                        value="urgent"
                        checked={formData.timeline === 'urgent'}
                        onChange={handleChange}
                      />
                      <span>Urgent (Within 1-2 months)</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="timeline"
                        value="standard"
                        checked={formData.timeline === 'standard'}
                        onChange={handleChange}
                      />
                      <span>Standard (Within 3-6 months)</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="timeline"
                        value="planning"
                        checked={formData.timeline === 'planning'}
                        onChange={handleChange}
                      />
                      <span>Planning Ahead (6+ months)</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Specific Deadlines</label>
                  <textarea
                    name="deadlines"
                    className="form-textarea"
                    placeholder="Product launch date, investor due diligence deadline, regulatory response deadline, etc."
                    value={formData.deadlines}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Budget Range</label>
                  <select
                    name="budget"
                    className="form-select"
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select approximate budget...</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k-150k">$100,000 - $150,000</option>
                    <option value="150k-plus">$150,000+</option>
                    <option value="flexible">Flexible based on scope</option>
                  </select>
                </div>

                <div className="form-divider"></div>

                {/* SECTION 6: CONFLICTS CHECK */}
                <h3 className="form-section-title">
                  <i className="fas fa-balance-scale"></i>
                  6. Conflicts of Interest Check
                </h3>

                <div className="form-info-box">
                  <strong>Important:</strong> We must check for conflicts of interest before accepting your matter. Please provide complete information.
                </div>

                <div className="form-group">
                  <label className="form-label">Key Competitors or Other Parties Involved</label>
                  <textarea
                    name="competitors"
                    className="form-textarea"
                    placeholder="List main competitors, partners, vendors, or other relevant parties"
                    value={formData.competitors}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Are you represented by other counsel on any matters?</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="otherCounsel"
                        value="yes"
                        checked={formData.otherCounsel === 'yes'}
                        onChange={handleChange}
                      />
                      <span>Yes - Please provide details below</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="otherCounsel"
                        value="no"
                        checked={formData.otherCounsel === 'no'}
                        onChange={handleChange}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                {formData.otherCounsel === 'yes' && (
                  <div className="form-group">
                    <label className="form-label">Other Counsel Details</label>
                    <textarea
                      name="counselInfo"
                      className="form-textarea"
                      placeholder="Name of firm and matter(s) they are handling"
                      value={formData.counselInfo}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="form-divider"></div>

                {/* SECTION 7: ADDITIONAL INFORMATION */}
                <h3 className="form-section-title">
                  <i className="fas fa-info-circle"></i>
                  7. Additional Information
                </h3>

                <div className="form-group">
                  <label className="form-label">How did you find Rivalis Law?</label>
                  <select
                    name="referralSource"
                    className="form-select"
                    value={formData.referralSource}
                    onChange={handleChange}
                  >
                    <option value="">Select...</option>
                    <option value="web-search">Web Search</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="referral-attorney">Referral from Attorney</option>
                    <option value="referral-client">Referral from Client</option>
                    <option value="referral-professional">Referral from Other Professional</option>
                    <option value="conference">Conference/Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Anything else we should know?</label>
                  <textarea
                    name="additionalInfo"
                    className="form-textarea"
                    placeholder="Any other relevant information"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-divider"></div>

                {/* AUTHORIZATION */}
                <h3 className="form-section-title">
                  <i className="fas fa-pen"></i>
                  Client Authorization
                </h3>

                <div className="form-info-box">
                  <strong>Important Notice:</strong> By signing below, you acknowledge that:
                  <ul className="mt-2 ml-6">
                    <li>The information provided is true and accurate</li>
                    <li>Submission does not create an attorney-client relationship</li>
                    <li>An attorney-client relationship is created only upon execution of an engagement letter</li>
                    <li>Information provided is subject to attorney-client privilege considerations</li>
                    <li>You authorize Rivalis Law to conduct a conflicts check</li>
                  </ul>
                </div>

                <div className="form-group mt-8">
                  <label className="form-label">Full Name <span className="required">*</span></label>
                  <input
                    type="text"
                    name="signatureName"
                    className="form-input"
                    value={formData.signatureName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Title <span className="required">*</span></label>
                    <input
                      type="text"
                      name="signatureTitle"
                      className="form-input"
                      placeholder="e.g., CEO, CTO, General Counsel"
                      value={formData.signatureTitle}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date <span className="required">*</span></label>
                    <input
                      type="date"
                      name="signatureDate"
                      className="form-input"
                      value={formData.signatureDate || new Date().toISOString().split('T')[0]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Electronic Signature <span className="required">*</span></label>
                  <input
                    type="text"
                    name="signature"
                    className="form-input"
                    placeholder="Type your full name to sign"
                    value={formData.signature}
                    onChange={handleChange}
                    required
                  />
                  <p className="form-help">By typing your name, you are providing your electronic signature</p>
                </div>

                <div className="form-info-box">
                  <h4><i className="fas fa-exclamation-triangle"></i> AI Regulation Alert</h4>
                  <p>AI regulations are evolving rapidly. The EU AI Act, state-level AI laws, and industry regulations may impact your AI systems. Early compliance assessment can prevent costly remediation and potential fines of up to €35 million or 7% of global revenue.</p>
                </div>

                <button type="submit" className="form-submit-btn" disabled={loading}>
                  <i className="fas fa-paper-plane"></i>
                  {loading ? 'Submitting...' : 'Submit AI Governance Intake Form'}
                </button>

                <div className="form-note">
                  <i className="fas fa-clock"></i>
                  <span>Response times: Emergency matters within 4 hours | Urgent matters within 24 hours | Standard matters within 48 hours</span>
                </div>
              </form>

              {/* Contact Box */}
              <div className="form-contact-box">
                <h4>Need Urgent AI Compliance Help?</h4>
                <p>If you're facing an AI-related regulatory deadline or inquiry, contact us directly:</p>
                <a href="mailto:ai@rivalislaw.com" className="form-contact-item">
                  <i className="fas fa-robot"></i>
                  <span>ai@rivalislaw.com</span>
                </a>
                <a href="tel:+1-313-771-2283" className="form-contact-item">
                  <i className="fas fa-phone"></i>
                  <span>(313) 771-2283</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="form-cta-section">
        <h2>Learn More About AI Governance</h2>
        <p>Explore our AI governance services including EU AI Act compliance, risk assessments, and governance frameworks.</p>
        <div className="form-cta-buttons">
          <Link to="/services/governance" className="form-cta-btn primary">
            <i className="fas fa-robot"></i>
            AI Governance Services
          </Link>
          <a href="tel:+1-313-771-2283" className="form-cta-btn secondary">
            <i className="fas fa-phone"></i>
            Call: (313) 771-2283
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="form-footer">
        <p>&copy; 2024 Rivalis Law. Licensed in New York & Michigan.</p>
        <p><Link to="/">Return to Main Site</Link></p>
      </footer>
    </>
  );
};

export default AIGovernanceIntake;

