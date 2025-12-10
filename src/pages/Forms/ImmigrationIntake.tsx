import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../../components/Layout/Navigation';
import { submitForm } from '../../utils/api';
import '../../styles/form-page.css';
import '../../styles/home.css';

export const ImmigrationIntake: React.FC = () => {
  const [formData, setFormData] = useState({
    // Client Information
    fullLegalName: '',
    dateOfBirth: '',
    countryOfBirth: '',
    currentCitizenships: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    stateProvince: '',
    postalCode: '',
    inUS: '',
    currentImmigrationStatus: '',
    
    // Company/Employer Information
    companyName: '',
    jobTitle: '',
    startDate: '',
    companyContact: '',
    contactEmail: '',
    contactPhone: '',
    
    // Immigration Service Needed
    serviceType: '',
    serviceTypeOther: '',
    clientType: '',
    
    // Immigration History & Background
    previousUS: '',
    previousVisaTypes: '',
    visaDenied: '',
    denialDetails: '',
    overstay: '',
    overstayDetails: '',
    criminalHistory: '',
    criminalDetails: '',
    
    // Education & Professional Background
    highestDegree: '',
    degreeInstitution: '',
    currentOccupation: '',
    yearsExperience: '',
    workExperience: '',
    
    // Family Information
    maritalStatus: '',
    spouseName: '',
    children: '',
    childrenDetails: '',
    usfamily: '',
    familyDetails: '',
    
    // Timeline & Urgency
    timelineDate: '',
    travelPlans: '',
    pendingApp: '',
    pendingDetails: '',
    
    // Additional Information
    immigrationGoals: '',
    previousAttorney: '',
    attorneyName: '',
    referralSource: '',
    additionalInfo: '',
    
    // Conflicts Check
    adverseParties: '',
    
    // Authorization & Acknowledgment
    clientNamePrint: '',
    signatureDate: '',
    electronicSignature: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Set signature date if not provided
      const submissionData = {
        ...formData,
        signatureDate: formData.signatureDate || new Date().toISOString().split('T')[0]
      };
      
      await submitForm('immigration-intake', submissionData);
      alert('Thank you! Your comprehensive immigration intake form has been submitted. Our immigration team will review and contact you within 24 hours.');
      
      // Reset form - using the exact same structure as initial state
      setFormData({
        fullLegalName: '',
        dateOfBirth: '',
        countryOfBirth: '',
        currentCitizenships: '',
        email: '',
        phone: '',
        streetAddress: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        inUS: '',
        currentImmigrationStatus: '',
        companyName: '',
        jobTitle: '',
        startDate: '',
        companyContact: '',
        contactEmail: '',
        contactPhone: '',
        serviceType: '',
        serviceTypeOther: '',
        clientType: '',
        previousUS: '',
        previousVisaTypes: '',
        visaDenied: '',
        denialDetails: '',
        overstay: '',
        overstayDetails: '',
        criminalHistory: '',
        criminalDetails: '',
        highestDegree: '',
        degreeInstitution: '',
        currentOccupation: '',
        yearsExperience: '',
        workExperience: '',
        maritalStatus: '',
        spouseName: '',
        children: '',
        childrenDetails: '',
        usfamily: '',
        familyDetails: '',
        timelineDate: '',
        travelPlans: '',
        pendingApp: '',
        pendingDetails: '',
        immigrationGoals: '',
        previousAttorney: '',
        attorneyName: '',
        referralSource: '',
        additionalInfo: '',
        adverseParties: '',
        clientNamePrint: '',
        signatureDate: '',
        electronicSignature: '',
      });
      
    } catch (error) {
      console.error('Error submitting immigration intake:', error);
      alert('There was an error submitting your form. Please try again or call (202) 555-0199.');
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
            <Link to="/">Home</Link> / <Link to="/services/immigration">Immigration</Link> / <span>Intake Form</span>
          </div>

          <div className="form-hero-badge" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderColor: '#667eea', color: 'white' }}>
            <i className="fas fa-passport"></i>
            🌍 Immigration Law Services
          </div>

          <h1>Immigration Law <span className="highlight">Intake Form</span></h1>

          <p className="form-hero-subtitle">
            Complete this comprehensive intake form to begin your immigration consultation. 
            Our team specializes in H-1B, L-1, O-1, green cards, and all immigration matters.
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
              <span>Comprehensive Assessment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="form-section">
        <div className="form-section-container">
          <div className="form-card">
            <div className="form-card-header">
              <h2>Comprehensive Immigration Assessment</h2>
              <p>Protected by attorney-client privilege considerations</p>
            </div>

            <div className="form-card-body">
              <div className="confidential-notice">
                <strong>⚠️ CONFIDENTIAL ATTORNEY-CLIENT COMMUNICATION</strong><br/>
                This intake form is protected by attorney-client privilege. Information provided will be kept strictly confidential and used solely for legal representation purposes.
              </div>
              
              <form onSubmit={handleSubmit}>
                {/* 1. Client Information */}
                <h3 className="form-section-title">
                  <i className="fas fa-user"></i>
                  Client Information
                </h3>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Full Legal Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullLegalName"
                      className="form-input"
                      value={formData.fullLegalName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Date of Birth <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      className="form-input"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Country of Birth <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="countryOfBirth"
                      className="form-input"
                      value={formData.countryOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Current Citizenship(s) <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="currentCitizenships"
                      className="form-input"
                      value={formData.currentCitizenships}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Email Address <span className="required">*</span>
                    </label>
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
                    <label className="form-label">
                      Phone Number <span className="required">*</span>
                    </label>
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
                  <label className="form-label">
                    Current Physical Address <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    className="form-input"
                    placeholder="Street Address"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    required
                  />
                  <div style={{ marginTop: '10px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px' }}>
                    <input
                      type="text"
                      name="city"
                      className="form-input"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="stateProvince"
                      className="form-input"
                      placeholder="State/Province"
                      value={formData.stateProvince}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="postalCode"
                      className="form-input"
                      placeholder="Postal Code"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Are you currently in the United States? <span className="required">*</span>
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
                        name="inUS"
                        value="yes"
                        checked={formData.inUS === 'yes'}
                        onChange={handleChange}
                        required
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
                        name="inUS"
                        value="no"
                        checked={formData.inUS === 'no'}
                        onChange={handleChange}
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

                <div className="form-group">
                  <label className="form-label">
                    If yes, what is your current immigration status?
                  </label>
                  <input
                    type="text"
                    name="currentImmigrationStatus"
                    className="form-input"
                    placeholder="e.g., B-1/B-2 visitor, F-1 student, H-1B, L-1, etc."
                    value={formData.currentImmigrationStatus}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-divider"></div>

                {/* 2. Company/Employer Information */}
                <h3 className="form-section-title">
                  <i className="fas fa-building"></i>
                  Company/Employer Information (if applicable)
                </h3>

                <div className="form-group">
                  <label className="form-label">Company/Organization Name</label>
                  <input
                    type="text"
                    name="companyName"
                    className="form-input"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Job Title/Position</label>
                    <input
                      type="text"
                      name="jobTitle"
                      className="form-input"
                      value={formData.jobTitle}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Start Date (or Proposed)</label>
                    <input
                      type="date"
                      name="startDate"
                      className="form-input"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Company Contact Person</label>
                  <input
                    type="text"
                    name="companyContact"
                    className="form-input"
                    placeholder="Name and title of HR/sponsoring individual"
                    value={formData.companyContact}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Contact Email</label>
                    <input
                      type="email"
                      name="contactEmail"
                      className="form-input"
                      value={formData.contactEmail}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Phone</label>
                    <input
                      type="tel"
                      name="contactPhone"
                      className="form-input"
                      value={formData.contactPhone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-divider"></div>

                {/* 3. Immigration Service Needed */}
                <h3 className="form-section-title">
                  <i className="fas fa-passport"></i>
                  Immigration Service Needed
                </h3>

                <div className="form-group">
                  <label className="form-label">
                    What type of immigration service do you need? <span className="required">*</span>
                  </label>
                  <select
                    name="serviceType"
                    className="form-select"
                    value={formData.serviceType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Service Type --</option>
                    <option value="h1b">H-1B Work Visa (Specialty Occupation)</option>
                    <option value="l1">L-1 Intracompany Transfer</option>
                    <option value="o1">O-1 Extraordinary Ability</option>
                    <option value="eb1">EB-1 Green Card (Priority Workers)</option>
                    <option value="eb2">EB-2 Green Card (Advanced Degree/Exceptional Ability)</option>
                    <option value="eb3">EB-3 Green Card (Skilled Workers)</option>
                    <option value="perm">PERM Labor Certification</option>
                    <option value="tn">TN NAFTA Professional</option>
                    <option value="e2">E-2 Treaty Investor</option>
                    <option value="greencard">Green Card (Permanent Residence)</option>
                    <option value="citizenship">Naturalization/Citizenship</option>
                    <option value="family">Family-Based Immigration</option>
                    <option value="removal">Removal/Deportation Defense</option>
                    <option value="asylum">Asylum/Refugee Status</option>
                    <option value="compliance">Corporate Immigration Compliance (I-9, E-Verify)</option>
                    <option value="consultation">General Immigration Consultation</option>
                    <option value="other">Other (please specify)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">If "Other," please specify:</label>
                  <input
                    type="text"
                    name="serviceTypeOther"
                    className="form-input"
                    value={formData.serviceTypeOther}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Is this for: <span className="required">*</span>
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
                        checked={formData.clientType === 'individual'}
                        onChange={handleChange}
                        required
                        style={{ 
                          marginRight: '0.5rem',
                          flexShrink: 0,
                          order: 1
                        }}
                      />
                      <span style={{ order: 2 }}>Individual/Personal</span>
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
                        value="corporate"
                        checked={formData.clientType === 'corporate'}
                        onChange={handleChange}
                        style={{ 
                          marginRight: '0.5rem',
                          flexShrink: 0,
                          order: 1
                        }}
                      />
                      <span style={{ order: 2 }}>Corporate/Employer Sponsorship</span>
                    </label>
                  </div>
                </div>

                <div className="form-divider"></div>

                {/* 4. Immigration History & Background */}
                <h3 className="form-section-title">
                  <i className="fas fa-history"></i>
                  Immigration History & Background
                </h3>

                <div className="form-group">
                  <label className="form-label">Have you previously been to the United States?</label>
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
                        name="previousUS"
                        value="yes"
                        checked={formData.previousUS === 'yes'}
                        onChange={handleChange}
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
                        name="previousUS"
                        value="no"
                        checked={formData.previousUS === 'no'}
                        onChange={handleChange}
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

                <div className="form-group">
                  <label className="form-label">If yes, please list all previous visa types and approximate dates:</label>
                  <textarea
                    name="previousVisaTypes"
                    className="form-textarea"
                    placeholder="e.g., B-2 tourist visa (2020-2021), F-1 student visa (2015-2019), etc."
                    value={formData.previousVisaTypes}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Have you ever been denied a US visa?</label>
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
                        name="visaDenied"
                        value="yes"
                        checked={formData.visaDenied === 'yes'}
                        onChange={handleChange}
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
                        name="visaDenied"
                        value="no"
                        checked={formData.visaDenied === 'no'}
                        onChange={handleChange}
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

                <div className="form-group">
                  <label className="form-label">If yes, please explain:</label>
                  <textarea
                    name="denialDetails"
                    className="form-textarea"
                    placeholder="Include type of visa, date, and reason for denial"
                    value={formData.denialDetails}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Have you ever overstayed a visa or been in the US without authorization?</label>
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
                        name="overstay"
                        value="yes"
                        checked={formData.overstay === 'yes'}
                        onChange={handleChange}
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
                        name="overstay"
                        value="no"
                        checked={formData.overstay === 'no'}
                        onChange={handleChange}
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

                <div className="form-group">
                  <label className="form-label">If yes, please provide details:</label>
                  <textarea
                    name="overstayDetails"
                    className="form-textarea"
                    value={formData.overstayDetails}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Have you ever been arrested, convicted of a crime, or had any legal issues in any country?</label>
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
                        name="criminalHistory"
                        value="yes"
                        checked={formData.criminalHistory === 'yes'}
                        onChange={handleChange}
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
                        name="criminalHistory"
                        value="no"
                        checked={formData.criminalHistory === 'no'}
                        onChange={handleChange}
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

                <div className="form-group">
                  <label className="form-label">If yes, please provide complete details (essential for case evaluation):</label>
                  <textarea
                    name="criminalDetails"
                    className="form-textarea"
                    placeholder="Date, location, charges, outcome, any documentation available"
                    value={formData.criminalDetails}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-divider"></div>

                {/* 5. Education & Professional Background */}
                <h3 className="form-section-title">
                  <i className="fas fa-graduation-cap"></i>
                  Education & Professional Background
                </h3>

                <div className="form-group">
                  <label className="form-label">
                    Highest Level of Education Completed <span className="required">*</span>
                  </label>
                  <select
                    name="highestDegree"
                    className="form-select"
                    value={formData.highestDegree}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select --</option>
                    <option value="highschool">High School</option>
                    <option value="associates">Associate's Degree</option>
                    <option value="bachelors">Bachelor's Degree</option>
                    <option value="masters">Master's Degree</option>
                    <option value="doctorate">Doctorate/PhD</option>
                    <option value="professional">Professional Degree (JD, MD, etc.)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Degree/Major and Institution:</label>
                  <textarea
                    name="degreeInstitution"
                    className="form-textarea"
                    placeholder="Include school name, location, degree earned, graduation year"
                    value={formData.degreeInstitution}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Current Occupation/Field of Work <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="currentOccupation"
                    className="form-input"
                    value={formData.currentOccupation}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Years of Professional Experience:</label>
                  <input
                    type="text"
                    name="yearsExperience"
                    className="form-input"
                    value={formData.yearsExperience}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Brief description of your work experience and skills:</label>
                  <textarea
                    name="workExperience"
                    className="form-textarea"
                    placeholder="Relevant to the immigration petition/application"
                    value={formData.workExperience}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-divider"></div>

                {/* 6. Family Information */}
                <h3 className="form-section-title">
                  <i className="fas fa-users"></i>
                  Family Information (if relevant)
                </h3>

                <div className="form-group">
                  <label className="form-label">Marital Status:</label>
                  <select
                    name="maritalStatus"
                    className="form-select"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                  >
                    <option value="">-- Select --</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                    <option value="separated">Separated</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">If married, spouse's full name and citizenship:</label>
                  <input
                    type="text"
                    name="spouseName"
                    className="form-input"
                    value={formData.spouseName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Do you have children who may be included in the application?</label>
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
                        name="children"
                        value="yes"
                        checked={formData.children === 'yes'}
                        onChange={handleChange}
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
                        name="children"
                        value="no"
                        checked={formData.children === 'no'}
                        onChange={handleChange}
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

                <div className="form-group">
                  <label className="form-label">If yes, please list names, dates of birth, and citizenships:</label>
                  <textarea
                    name="childrenDetails"
                    className="form-textarea"
                    value={formData.childrenDetails}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Do you have immediate family members (parents, siblings) who are US citizens or permanent residents?</label>
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
                        name="usfamily"
                        value="yes"
                        checked={formData.usfamily === 'yes'}
                        onChange={handleChange}
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
                        name="usfamily"
                        value="no"
                        checked={formData.usfamily === 'no'}
                        onChange={handleChange}
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

                <div className="form-group">
                  <label className="form-label">If yes, please provide details:</label>
                  <textarea
                    name="familyDetails"
                    className="form-textarea"
                    placeholder="Name, relationship, status (citizen or green card holder)"
                    value={formData.familyDetails}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-divider"></div>

                {/* 7. Timeline & Urgency */}
                <h3 className="form-section-title">
                  <i className="fas fa-clock"></i>
                  Timeline & Urgency
                </h3>

                <div className="form-group">
                  <label className="form-label">
                    When do you need to be in the US or complete the immigration process? <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    name="timelineDate"
                    className="form-input"
                    value={formData.timelineDate}
                    onChange={handleChange}
                    required
                  />
                  <div className="form-help">This helps us determine if premium processing or expedited services are needed</div>
                </div>

                <div className="form-group">
                  <label className="form-label">Do you have any upcoming travel plans?</label>
                  <textarea
                    name="travelPlans"
                    className="form-textarea"
                    placeholder="Include dates and destinations if applicable"
                    value={formData.travelPlans}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Do you have any pending immigration applications or petitions?</label>
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
                        name="pendingApp"
                        value="yes"
                        checked={formData.pendingApp === 'yes'}
                        onChange={handleChange}
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
                        name="pendingApp"
                        value="no"
                        checked={formData.pendingApp === 'no'}
                        onChange={handleChange}
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

                <div className="form-group">
                  <label className="form-label">If yes, please provide details:</label>
                  <textarea
                    name="pendingDetails"
                    className="form-textarea"
                    placeholder="Type of application, filing date, receipt number if available"
                    value={formData.pendingDetails}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-divider"></div>

                {/* 8. Additional Information */}
                <h3 className="form-section-title">
                  <i className="fas fa-file-alt"></i>
                  Additional Information
                </h3>

                <div className="form-group">
                  <label className="form-label">Please describe your specific immigration goals and concerns:</label>
                  <textarea
                    name="immigrationGoals"
                    className="form-textarea"
                    placeholder="What are you hoping to achieve? What concerns do you have about your case?"
                    value={formData.immigrationGoals}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Have you previously worked with an immigration attorney?</label>
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
                        name="previousAttorney"
                        value="yes"
                        checked={formData.previousAttorney === 'yes'}
                        onChange={handleChange}
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
                        name="previousAttorney"
                        value="no"
                        checked={formData.previousAttorney === 'no'}
                        onChange={handleChange}
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

                <div className="form-group">
                  <label className="form-label">If yes, please provide name and firm:</label>
                  <input
                    type="text"
                    name="attorneyName"
                    className="form-input"
                    value={formData.attorneyName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">How did you hear about Rivalis Law?</label>
                  <select
                    name="referralSource"
                    className="form-select"
                    value={formData.referralSource}
                    onChange={handleChange}
                  >
                    <option value="">-- Select --</option>
                    <option value="referral">Client Referral</option>
                    <option value="website">Website/Online Search</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="legal_directory">Legal Directory</option>
                    <option value="event">Event/Conference</option>
                    <option value="advertisement">Advertisement</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Is there anything else you'd like us to know about your situation?</label>
                  <textarea
                    name="additionalInfo"
                    className="form-textarea"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-divider"></div>

                {/* 9. Conflicts Check */}
                <h3 className="form-section-title">
                  <i className="fas fa-gavel"></i>
                  Conflicts Check
                </h3>

                <div className="form-group">
                  <label className="form-label">Please list any parties who may have adverse interests in this matter:</label>
                  <textarea
                    name="adverseParties"
                    className="form-textarea"
                    placeholder="Previous employers, government agencies involved in your case, etc."
                    value={formData.adverseParties}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-divider"></div>

                {/* 10. Authorization & Acknowledgment */}
                <h3 className="form-section-title">
                  <i className="fas fa-signature"></i>
                  Authorization & Acknowledgment
                </h3>

                <div className="form-info-box">
                  <h4><i className="fas fa-info-circle"></i> By signing below, I acknowledge that:</h4>
                  <ul style={{ marginLeft: '20px', marginTop: '1rem' }}>
                    <li>The information provided in this intake form is true, complete, and accurate to the best of my knowledge</li>
                    <li>I understand that incomplete or inaccurate information may adversely affect my immigration case</li>
                    <li>I authorize Rivalis Law to represent me in the immigration matter described above</li>
                    <li>I understand that this intake form does not create an attorney-client relationship until formally engaged</li>
                    <li>I understand that immigration laws and processing times can change and that outcomes cannot be guaranteed</li>
                    <li>I agree to provide all requested documentation in a timely manner</li>
                  </ul>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Client Name (Print) <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="clientNamePrint"
                      className="form-input"
                      value={formData.clientNamePrint}
                      onChange={handleChange}
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
                      value={formData.signatureDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Electronic Signature (Type your full name) <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="electronicSignature"
                    className="form-input"
                    placeholder="Type your full legal name as your electronic signature"
                    value={formData.electronicSignature}
                    onChange={handleChange}
                    required
                  />
                  <div className="form-help">Please type your full name above as your electronic signature</div>
                </div>

                <button type="submit" className="form-submit-btn" disabled={loading}>
                  <i className="fas fa-paper-plane"></i>
                  {loading ? 'Submitting...' : 'Submit Comprehensive Immigration Intake'}
                </button>

                <div className="form-note">
                  <i className="fas fa-clock"></i>
                  <span>Our immigration team will review your comprehensive intake and respond within 24 hours</span>
                </div>
              </form>

              {/* Contact Box */}
              <div className="form-contact-box">
                <h4>🚨 Need Immediate Assistance?</h4>
                <p>For urgent immigration matters, RFE deadlines, or immediate consultation needs:</p>
                <a href="tel:+1-202-555-0199" className="form-contact-item">
                  <i className="fas fa-phone-volume"></i>
                  <span>Emergency: (202) 555-0199</span>
                </a>
                <a href="mailto:immigration@rivalislaw.com" className="form-contact-item">
                  <i className="fas fa-envelope"></i>
                  <span>immigration@rivalislaw.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="form-cta-section">
        <h2>Strategic Legal Solutions for Forward-Thinking Businesses</h2>
        <p>Explore our comprehensive immigration services and let us handle your case with expertise.</p>
        <div className="form-cta-buttons">
          <Link to="/services/immigration" className="form-cta-btn primary">
            <i className="fas fa-passport"></i>
            Immigration Services
          </Link>
          <a href="tel:+1-202-555-0199" className="form-cta-btn secondary">
            <i className="fas fa-phone"></i>
            Call: (202) 555-0199
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