import React, { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Layout/Navigation';
import '../../styles/form-page.css';

// Base form data interface for universal fields
export interface BaseFormData {
  // Client Information
  clientType: 'individual' | 'business' | '';
  fullLegalName: string;
  preferredName: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  referralSource: string;
  
  // Matter Information
  matterDescription: string;
  urgency: 'emergency' | 'urgent' | 'soon' | 'planning' | '';
  deadlines: string;
  budget: string;
  
  // Conflicts Check
  otherParties: string;
  otherLegalMatters: 'yes' | 'no' | '';
  otherMattersDescription: string;
  otherCounsel: 'yes' | 'no' | '';
  otherCounselDescription: string;
  
  // Authorization
  signatureName: string;
  signatureDate: string;
  signatureTitle: string;
  electronicSignature: string;
}

// Props interface for the base component
export interface BaseIntakeFormProps {
  serviceName: string;
  serviceIcon: string;
  serviceDescription: string;
  serviceColor: string;
  servicePath: string;
  formType: string;
  children: ReactNode;
  onSubmit: (formData: Record<string, unknown>) => Promise<void>;
  loading?: boolean;
}

export const BaseIntakeForm: React.FC<BaseIntakeFormProps> = ({
  serviceName,
  serviceIcon,
  serviceDescription,
  serviceColor,
  servicePath,
  formType,
  children,
  onSubmit,
  loading = false
}) => {
  const [baseFormData, setBaseFormData] = useState<BaseFormData>({
    clientType: '',
    fullLegalName: '',
    preferredName: '',
    companyName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    referralSource: '',
    matterDescription: '',
    urgency: '',
    deadlines: '',
    budget: '',
    otherParties: '',
    otherLegalMatters: '',
    otherMattersDescription: '',
    otherCounsel: '',
    otherCounselDescription: '',
    signatureName: '',
    signatureDate: new Date().toISOString().split('T')[0],
    signatureTitle: '',
    electronicSignature: '',
  });

  const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBaseFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent, serviceFormData: Record<string, unknown> = {}) => {
    e.preventDefault();
    
    const combinedData = {
      ...baseFormData,
      ...serviceFormData,
      formType,
      serviceName,
      submittedAt: new Date().toISOString(),
    };
    
    await onSubmit(combinedData);
  };

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="form-hero">
        <div className="form-hero-container">
          <div className="form-breadcrumb">
            <Link to="/">Home</Link> / <Link to={`/services${servicePath}`}>{serviceName}</Link> / <span>Intake Form</span>
          </div>

          <div 
            className="form-hero-badge" 
            style={{ 
              background: `linear-gradient(135deg, ${serviceColor} 0%, ${serviceColor}dd 100%)`, 
              borderColor: serviceColor, 
              color: 'white' 
            }}
          >
            <span style={{ marginRight: '0.5rem' }}>{serviceIcon}</span>
            {serviceName} Services
          </div>

          <h1>{serviceName} <span className="highlight">Intake Form</span></h1>

          <p className="form-hero-subtitle">
            Complete this comprehensive intake form to begin your {serviceName.toLowerCase()} consultation. 
            {serviceDescription}
          </p>

          <div className="form-hero-features">
            <div className="form-hero-feature">
              <i className="fas fa-bolt"></i>
              <span>24-Hour Response</span>
            </div>
            <div className="form-hero-feature">
              <i className="fas fa-shield-alt"></i>
              <span>Attorney-Client Privileged</span>
            </div>
            <div className="form-hero-feature">
              <i className="fas fa-building"></i>
              <span>Professional Assessment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="form-section">
        <div className="form-section-container">
          <div className="form-card">
            <div className="form-card-header">
              <h2>{serviceName} Legal Assessment</h2>
              <p>Protected by attorney-client privilege considerations</p>
            </div>

            <div className="form-card-body">
              <div className="confidential-notice">
                <strong>⚠️ CONFIDENTIAL ATTORNEY-CLIENT COMMUNICATION</strong><br/>
                This intake form is protected by attorney-client privilege considerations. The information you provide will be kept confidential. Submission of this form does not create an attorney-client relationship until a formal engagement letter is executed.
              </div>
              
              <form onSubmit={(e) => handleSubmit(e, {})}>
                {/* Universal Section 1: Client Information */}
                <h3 className="form-section-title">
                  <i className="fas fa-user"></i>
                  Client Information
                </h3>

                <div className="form-group">
                  <label className="form-label">
                    Are you representing? <span className="required">*</span>
                  </label>
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
                        name="clientType"
                        value="individual"
                        checked={baseFormData.clientType === 'individual'}
                        onChange={handleBaseChange}
                        required
                        style={{ 
                          marginRight: '0.5rem',
                          flexShrink: 0,
                          order: 1
                        }}
                      />
                      <span style={{ order: 2 }}>Individual/Personal Matter</span>
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
                        value="business"
                        checked={baseFormData.clientType === 'business'}
                        onChange={handleBaseChange}
                        style={{ 
                          marginRight: '0.5rem',
                          flexShrink: 0,
                          order: 1
                        }}
                      />
                      <span style={{ order: 2 }}>Business/Company</span>
                    </label>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Full Legal Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullLegalName"
                      className="form-input"
                      value={baseFormData.fullLegalName}
                      onChange={handleBaseChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Preferred Name</label>
                    <input
                      type="text"
                      name="preferredName"
                      className="form-input"
                      value={baseFormData.preferredName}
                      onChange={handleBaseChange}
                    />
                  </div>
                </div>

                {baseFormData.clientType === 'business' && (
                  <div className="form-group">
                    <label className="form-label">
                      Company/Entity Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      className="form-input"
                      value={baseFormData.companyName}
                      onChange={handleBaseChange}
                      required={baseFormData.clientType === 'business'}
                    />
                    <div className="form-help">Legal entity name as registered</div>
                  </div>
                )}

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      value={baseFormData.email}
                      onChange={handleBaseChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Phone Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      value={baseFormData.phone}
                      onChange={handleBaseChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Mailing Address <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="form-input"
                    value={baseFormData.address}
                    onChange={handleBaseChange}
                    required
                  />
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      City <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      className="form-input"
                      value={baseFormData.city}
                      onChange={handleBaseChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      State/Province <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      className="form-input"
                      value={baseFormData.state}
                      onChange={handleBaseChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      ZIP/Postal Code <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="zip"
                      className="form-input"
                      value={baseFormData.zip}
                      onChange={handleBaseChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Country <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="country"
                      className="form-input"
                      value={baseFormData.country}
                      onChange={handleBaseChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">How did you hear about Rivalis Law?</label>
                  <select
                    name="referralSource"
                    className="form-select"
                    value={baseFormData.referralSource}
                    onChange={handleBaseChange}
                  >
                    <option value="">Select...</option>
                    <option value="web-search">Web Search</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="referral-attorney">Referral from Attorney</option>
                    <option value="referral-client">Referral from Client</option>
                    <option value="referral-professional">Referral from Other Professional</option>
                    <option value="bar-association">Bar Association</option>
                    <option value="conference">Conference/Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-divider"></div>

                {/* Universal Section 2: Matter Information */}
                <h3 className="form-section-title">
                  <i className="fas fa-file-alt"></i>
                  Matter Information
                </h3>

                <div className="form-group">
                  <label className="form-label">
                    Brief Matter Description <span className="required">*</span>
                  </label>
                  <textarea
                    name="matterDescription"
                    className="form-textarea"
                    value={baseFormData.matterDescription}
                    onChange={handleBaseChange}
                    required
                    placeholder="Provide a brief overview of your legal matter..."
                  />
                  <div className="form-help">Brief summary only - detailed information will be discussed during consultation</div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Timeline/Urgency <span className="required">*</span>
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
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
                        name="urgency"
                        value="emergency"
                        checked={baseFormData.urgency === 'emergency'}
                        onChange={handleBaseChange}
                        required
                        style={{ 
                          marginRight: '0.5rem',
                          flexShrink: 0,
                          order: 1
                        }}
                      />
                      <span style={{ order: 2 }}><strong>Emergency</strong> - Immediate action needed (within 24-48 hours)</span>
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
                        name="urgency"
                        value="urgent"
                        checked={baseFormData.urgency === 'urgent'}
                        onChange={handleBaseChange}
                        style={{ 
                          marginRight: '0.5rem',
                          flexShrink: 0,
                          order: 1
                        }}
                      />
                      <span style={{ order: 2 }}><strong>Urgent</strong> - Action needed within 1-2 weeks</span>
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
                        name="urgency"
                        value="soon"
                        checked={baseFormData.urgency === 'soon'}
                        onChange={handleBaseChange}
                        style={{ 
                          marginRight: '0.5rem',
                          flexShrink: 0,
                          order: 1
                        }}
                      />
                      <span style={{ order: 2 }}><strong>Soon</strong> - Action needed within 1 month</span>
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
                        name="urgency"
                        value="planning"
                        checked={baseFormData.urgency === 'planning'}
                        onChange={handleBaseChange}
                        style={{ 
                          marginRight: '0.5rem',
                          flexShrink: 0,
                          order: 1
                        }}
                      />
                      <span style={{ order: 2 }}><strong>Planning</strong> - No immediate deadline (1-3 months+)</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Specific Deadlines or Time Constraints</label>
                  <textarea
                    name="deadlines"
                    className="form-textarea"
                    value={baseFormData.deadlines}
                    onChange={handleBaseChange}
                    placeholder="List any court dates, filing deadlines, regulatory deadlines, business deadlines, etc."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Budget Range</label>
                  <select
                    name="budget"
                    className="form-select"
                    value={baseFormData.budget}
                    onChange={handleBaseChange}
                  >
                    <option value="">Select approximate budget...</option>
                    <option value="under-10k">Under $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k-plus">$100,000+</option>
                    <option value="flexible">Flexible based on scope</option>
                  </select>
                  <div className="form-help">This helps us propose appropriate service structure</div>
                </div>

                <div className="form-divider"></div>

                {/* Service-Specific Fields (Children) */}
                {children}

                <div className="form-divider"></div>

                {/* Universal Section 3: Conflicts Check */}
                <h3 className="form-section-title">
                  <i className="fas fa-gavel"></i>
                  Conflicts of Interest Check
                </h3>

                <div className="form-info-box" style={{ background: '#fff3cd', borderLeft: '4px solid #ffc107', padding: '1rem', marginBottom: '1.5rem' }}>
                  <strong>Important:</strong> We must check for conflicts of interest before accepting your matter. Please provide complete information about all parties involved.
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Other Parties Involved <span className="required">*</span>
                  </label>
                  <textarea
                    name="otherParties"
                    className="form-textarea"
                    value={baseFormData.otherParties}
                    onChange={handleBaseChange}
                    required
                    placeholder="List all other parties involved in this matter (opposing parties, co-parties, related businesses, etc.)"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Are you involved in any other legal matters?</label>
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
                        name="otherLegalMatters"
                        value="yes"
                        checked={baseFormData.otherLegalMatters === 'yes'}
                        onChange={handleBaseChange}
                        style={{ 
                          marginRight: '0.5rem',
                          flexShrink: 0,
                          order: 1
                        }}
                      />
                      <span style={{ order: 2 }}>Yes</span>
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
                        name="otherLegalMatters"
                        value="no"
                        checked={baseFormData.otherLegalMatters === 'no'}
                        onChange={handleBaseChange}
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

                {baseFormData.otherLegalMatters === 'yes' && (
                  <div className="form-group">
                    <label className="form-label">Please describe other legal matters</label>
                    <textarea
                      name="otherMattersDescription"
                      className="form-textarea"
                      value={baseFormData.otherMattersDescription}
                      onChange={handleBaseChange}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Are you represented by other counsel on any matters?</label>
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
                        name="otherCounsel"
                        value="yes"
                        checked={baseFormData.otherCounsel === 'yes'}
                        onChange={handleBaseChange}
                        style={{ 
                          marginRight: '0.5rem',
                          flexShrink: 0,
                          order: 1
                        }}
                      />
                      <span style={{ order: 2 }}>Yes</span>
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
                        name="otherCounsel"
                        value="no"
                        checked={baseFormData.otherCounsel === 'no'}
                        onChange={handleBaseChange}
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

                {baseFormData.otherCounsel === 'yes' && (
                  <div className="form-group">
                    <label className="form-label">Other counsel details</label>
                    <textarea
                      name="otherCounselDescription"
                      className="form-textarea"
                      value={baseFormData.otherCounselDescription}
                      onChange={handleBaseChange}
                      placeholder="Name of attorney/firm and matter(s) they are handling"
                    />
                  </div>
                )}

                <div className="form-divider"></div>

                {/* Universal Section 4: Authorization */}
                <h3 className="form-section-title">
                  <i className="fas fa-signature"></i>
                  Authorization & Acknowledgment
                </h3>

                <div className="form-info-box">
                  <h4><i className="fas fa-info-circle"></i> By signing below, you acknowledge that:</h4>
                  <ul style={{ marginLeft: '20px', marginTop: '1rem' }}>
                    <li>The information provided is true and accurate to the best of your knowledge</li>
                    <li>Submission of this form does not create an attorney-client relationship</li>
                    <li>An attorney-client relationship is created only upon execution of an engagement letter</li>
                    <li>Information provided is subject to attorney-client privilege considerations</li>
                    <li>You authorize Rivalis Law to conduct a conflicts check based on information provided</li>
                  </ul>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="signatureName"
                      className="form-input"
                      value={baseFormData.signatureName}
                      onChange={handleBaseChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Date <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      name="signatureDate"
                      className="form-input"
                      value={baseFormData.signatureDate}
                      onChange={handleBaseChange}
                      required
                    />
                  </div>
                </div>

                {baseFormData.clientType === 'business' && (
                  <div className="form-group">
                    <label className="form-label">Title (if representing company)</label>
                    <input
                      type="text"
                      name="signatureTitle"
                      className="form-input"
                      value={baseFormData.signatureTitle}
                      onChange={handleBaseChange}
                      placeholder="e.g., CEO, CFO, General Counsel"
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">
                    Electronic Signature (Type your full name) <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="electronicSignature"
                    className="form-input"
                    placeholder="Type your full legal name as your electronic signature"
                    value={baseFormData.electronicSignature}
                    onChange={handleBaseChange}
                    required
                  />
                  <div className="form-help">Please type your full name above as your electronic signature</div>
                </div>

                {/* This will be overridden by individual form implementations */}
                <button type="submit" className="form-submit-btn" disabled={loading}>
                  <i className="fas fa-paper-plane"></i>
                  {loading ? 'Submitting...' : `Submit ${serviceName} Intake`}
                </button>

                <div className="form-note">
                  <i className="fas fa-clock"></i>
                  <span>Our {serviceName.toLowerCase()} team will review your intake and respond within 24 hours</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="form-cta-section">
        <h2>Strategic Legal Solutions for Forward-Thinking Businesses</h2>
        <p>Explore our comprehensive {serviceName.toLowerCase()} services and let us handle your case with expertise.</p>
        <div className="form-cta-buttons">
          <Link to={`/services${servicePath}`} className="form-cta-btn primary">
            <span style={{ marginRight: '0.5rem' }}>{serviceIcon}</span>
            {serviceName} Services
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