'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navigation, EnhancedFooter } from '@/components/Layout';

// Define form sections
const SECTIONS = [
  { id: 'contact', title: 'Contact Information', icon: '📋' },
  { id: 'background', title: 'Professional Background', icon: '💼' },
  { id: 'business', title: 'Business Development', icon: '📈' },
  { id: 'partnership', title: 'Partnership Pathway', icon: '💰' },
  { id: 'documents', title: 'Documents', icon: '📄' },
  { id: 'references', title: 'References', icon: '✅' },
  { id: 'final', title: 'Final Questions', icon: '📝' },
];

function PartnerApplicationContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [currentSection, setCurrentSection] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const [formData, setFormData] = useState({
    // Contact Information
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    linkedin: '',
    city: '',
    location: '',
    referral_source: '',
    
    // Professional Background
    years_practice: '',
    primary_specialty: '',
    current_position: '',
    current_firm: '',
    bar_admissions: '',
    education: '',
    achievements: '',
    
    // Business Development
    annual_billings: '',
    portable_book: '',
    client_base: '',
    bd_strengths: [] as string[],
    
    // Partnership Pathway
    pathway: '',
    capital_capacity: '',
    current_compensation: '',
    timeline: '',
    why_rivalis: '',
    
    // Documents
    resume_url: '',
    writing_sample_url: '',
    client_list_url: '',
    additional_docs: [] as string[],
    
    // References
    references: [
      { name: '', relationship: '', email: '', phone: '' },
      { name: '', relationship: '', email: '', phone: '' },
      { name: '', relationship: '', email: '', phone: '' },
    ],
    
    // Final Questions
    conflicts: '',
    conflicts_details: '',
    additional_info: '',
    agreement: false,
  });

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing application token. Please use the link sent to your email.');
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox' && name === 'agreement') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else if (type === 'checkbox' && name === 'bd_strengths') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        bd_strengths: checked
          ? [...prev.bd_strengths, value]
          : prev.bd_strengths.filter(v => v !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleReferenceChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.map((ref, i) =>
        i === index ? { ...ref, [field]: value } : ref
      ),
    }));
  };

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    if (name === 'bd_strengths') {
      setFormData(prev => ({
        ...prev,
        bd_strengths: checked
          ? [...prev.bd_strengths, value]
          : prev.bd_strengths.filter(v => v !== value)
      }));
    }
  };

  const handleFileUpload = async (field: string, file: File) => {
    try {
      setUploadProgress(prev => ({ ...prev, [field]: 0 }));

      const formData = new FormData();
      formData.append('file', file);
      formData.append('token', token || '');

      const response = await fetch('/api/upload-document', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const { url } = await response.json();
      setFormData(prev => ({ ...prev, [field]: url }));
      setUploadProgress(prev => ({ ...prev, [field]: 100 }));
    } catch {
      setError(`Failed to upload ${field}. Please try again.`);
      setUploadProgress(prev => ({ ...prev, [field]: -1 }));
    }
  };

  const nextSection = () => {
    if (currentSection < SECTIONS.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/partner-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, token }),
      });

      if (!response.ok) throw new Error('Submission failed');

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError('Something went wrong. Please try again or email partners@rivalislaw.com');
    } finally {
      setSubmitting(false);
    }
  };

  if (!token) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
          <div className="max-w-lg mx-auto bg-white rounded-xl shadow-2xl p-12 text-center">
            <div className="text-6xl mb-6" style={{ color: '#ef4444' }}>⚠️</div>
            <h1 className="text-3xl font-bold mb-4" style={{ color: '#1a1a2e' }}>Invalid Application Link</h1>
            <p className="text-gray-600 mb-6">
              This application requires a unique access token. If you submitted an inquiry and were invited to apply, 
              please check your email for the secure application link.
            </p>
            <a 
              href="/apply/partner-inquiry" 
              className="inline-block px-6 py-3 rounded-lg font-semibold"
              style={{ background: '#d4af37', color: '#1a1a2e' }}
            >
              Submit Initial Inquiry
            </a>
          </div>
        </div>
        <EnhancedFooter />
      </>
    );
  }

  if (submitted) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
          <div className="py-16 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-12 text-center">
              <div className="text-6xl mb-6" style={{ color: '#10b981' }}>✓</div>
              <h2 className="text-4xl font-serif font-bold mb-6" style={{ color: '#1a1a2e' }}>Application Submitted</h2>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for completing your partnership application. Our founding partners will review it thoroughly 
                and contact you within 10-14 business days to schedule interviews or request additional information.
              </p>
              <div className="text-left p-8 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold mb-4" style={{ color: '#1a1a2e' }}>Next Steps:</h3>
                <ol className="space-y-3 pl-5 list-decimal text-gray-700">
                  <li>We'll conduct background and reference checks</li>
                  <li>If moving forward, you'll have 2-3 video interviews with partners</li>
                  <li>Final candidates receive detailed compensation and partnership agreement drafts</li>
                  <li>Decision timeline: 4-6 weeks from application submission</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <EnhancedFooter />
      </>
    );
  }

  const progress = ((currentSection + 1) / SECTIONS.length) * 100;

  return (
    <>
      <Navigation />
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
        <div className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-5xl font-serif font-bold mb-2 text-white">Partnership Application</h1>
              <p className="text-xl text-gray-300">Rivalis Law - Confidential</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full transition-all duration-500 rounded-full"
                  style={{ 
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #d4af37, #b8941f)'
                  }}
                />
              </div>
              <div className="flex justify-between mt-2">
                {SECTIONS.map((section, index) => (
                  <div
                    key={section.id}
                    className={`text-xs font-semibold ${
                      index === currentSection ? 'text-white' : 
                      index < currentSection ? 'opacity-60 text-white' : 'opacity-40 text-white'
                    }`}
                  >
                    {section.icon}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="p-8 border-b" style={{ background: '#f9fafb' }}>
                <h2 className="text-3xl font-bold" style={{ color: '#1a1a2e' }}>
                  {SECTIONS[currentSection].icon} {SECTIONS[currentSection].title}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                    {error}
                  </div>
                )}

                {/* Section 1: Contact Information */}
                {currentSection === 0 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          required
                          value={formData.first_name}
                          onChange={handleChange}
                          placeholder="Jane"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="last_name"
                          required
                          value={formData.last_name}
                          onChange={handleChange}
                          placeholder="Smith"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="jane.smith@lawfirm.com"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 123-4567"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        LinkedIn Profile URL <span className="text-gray-500 text-sm">(Optional)</span>
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/yourprofile"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                          Current City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="San Francisco"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                          State/Country *
                        </label>
                        <input
                          type="text"
                          name="location"
                          required
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="California, USA"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        How did you hear about Rivalis Law? *
                      </label>
                      <select
                        name="referral_source"
                        required
                        value={formData.referral_source}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                      >
                        <option value="">-- Select --</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="referral">Professional Referral</option>
                        <option value="website">Rivalis Website</option>
                        <option value="legal-publication">Legal Publication/Article</option>
                        <option value="conference">Conference/Event</option>
                        <option value="search">Google Search</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Section 2: Professional Background */}
                {currentSection === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Years in Practice *
                      </label>
                      <select
                        name="years_practice"
                        required
                        value={formData.years_practice}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                      >
                        <option value="">-- Select --</option>
                        <option value="0-2">0-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="11-15">11-15 years</option>
                        <option value="16-20">16-20 years</option>
                        <option value="20+">20+ years</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Primary Practice Area *
                      </label>
                      <select
                        name="primary_specialty"
                        required
                        value={formData.primary_specialty}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                      >
                        <option value="">-- Select Primary Specialty --</option>
                        <option value="ai-governance">AI Governance & Ethics</option>
                        <option value="algorithmic-accountability">Algorithmic Accountability & Auditing</option>
                        <option value="data-privacy">Data Privacy & Protection (GDPR, CCPA)</option>
                        <option value="ai-ip">AI & Intellectual Property</option>
                        <option value="ai-liability">AI Liability & Risk Management</option>
                        <option value="tech-transactions">Technology Transactions & Licensing</option>
                        <option value="corporate-ai">Corporate AI Strategy & Compliance</option>
                        <option value="litigation">AI-Related Litigation</option>
                        <option value="regulatory">Regulatory Compliance (EU AI Act, etc.)</option>
                        <option value="employment-ai">Employment Law & AI</option>
                        <option value="healthcare-ai">Healthcare & Life Sciences AI</option>
                        <option value="fintech-ai">FinTech & AI Applications</option>
                        <option value="autonomous-systems">Autonomous Systems & Robotics Law</option>
                        <option value="other">Other Emerging Tech Specialty</option>
                      </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                          Current Position/Title *
                        </label>
                        <input
                          type="text"
                          name="current_position"
                          required
                          value={formData.current_position}
                          onChange={handleChange}
                          placeholder="Partner, Of Counsel, Associate"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                          Current Firm/Organization *
                        </label>
                        <input
                          type="text"
                          name="current_firm"
                          required
                          value={formData.current_firm}
                          onChange={handleChange}
                          placeholder="BigLaw Firm, Tech Company, etc."
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Bar Admissions *
                      </label>
                      <textarea
                        name="bar_admissions"
                        required
                        value={formData.bar_admissions}
                        onChange={handleChange}
                        rows={3}
                        placeholder="California State Bar (2010), New York State Bar (2012)"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none resize-vertical"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Education *
                      </label>
                      <textarea
                        name="education"
                        required
                        value={formData.education}
                        onChange={handleChange}
                        rows={4}
                        placeholder="J.D., Stanford Law School (2010)&#10;B.S. Computer Science, MIT (2007)"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none resize-vertical"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Notable Matters or Achievements <span className="text-gray-500 text-sm">(Optional)</span>
                      </label>
                      <textarea
                        name="achievements"
                        value={formData.achievements}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Lead counsel in landmark AI liability case; Published author on EU AI Act compliance; Advised Fortune 100 companies on algorithmic auditing..."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none resize-vertical"
                      />
                    </div>
                  </div>
                )}

                {/* Section 3: Business Development */}
                {currentSection === 2 && (
                  <div className="space-y-6">
                    <div className="p-4 bg-yellow-50 border-l-4 rounded" style={{ borderColor: '#d4af37' }}>
                      <p className="text-sm text-gray-700">
                        <strong>Confidential:</strong> This information is used to assess partnership fit and will be kept strictly confidential.
                      </p>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Annual Billings/Originations (Last 12 Months) *
                      </label>
                      <select
                        name="annual_billings"
                        required
                        value={formData.annual_billings}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                      >
                        <option value="">-- Select Range --</option>
                        <option value="0-250k">$0 - $250,000</option>
                        <option value="250k-500k">$250,000 - $500,000</option>
                        <option value="500k-1m">$500,000 - $1M</option>
                        <option value="1m-2m">$1M - $2M</option>
                        <option value="2m-5m">$2M - $5M</option>
                        <option value="5m+">$5M+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Portable Book of Business *
                      </label>
                      <textarea
                        name="portable_book"
                        required
                        value={formData.portable_book}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Approximately 15-20 active clients, primarily mid-stage startups and Fortune 500 tech companies. Strong relationships with 5-7 clients who have indicated willingness to follow..."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none resize-vertical"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Client Base Description *
                      </label>
                      <textarea
                        name="client_base"
                        required
                        value={formData.client_base}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Mix of early-stage startups (30%), growth-stage companies (40%), and established tech firms (30%). Industries: AI/ML, biotech, fintech. Geographic focus: US with some EU clients."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none resize-vertical"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-3" style={{ color: '#1a1a2e' }}>
                        Business Development Strengths *
                      </label>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            name="bd_strengths"
                            value="existing-relationships"
                            checked={formData.bd_strengths.includes('existing-relationships')}
                            onChange={(e) => handleCheckboxChange('bd_strengths', 'existing-relationships', e.target.checked)}
                            className="mt-1 w-5 h-5"
                          />
                          <label className="text-sm text-gray-700">
                            <strong>Existing Client Relationships:</strong> Strong portable book of business with loyal clients
                          </label>
                        </div>
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            name="bd_strengths"
                            value="industry-networking"
                            checked={formData.bd_strengths.includes('industry-networking')}
                            onChange={(e) => handleCheckboxChange('bd_strengths', 'industry-networking', e.target.checked)}
                            className="mt-1 w-5 h-5"
                          />
                          <label className="text-sm text-gray-700">
                            <strong>Industry Networking:</strong> Deep connections in target markets, conferences, associations
                          </label>
                        </div>
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            name="bd_strengths"
                            value="thought-leadership"
                            checked={formData.bd_strengths.includes('thought-leadership')}
                            onChange={(e) => handleCheckboxChange('bd_strengths', 'thought-leadership', e.target.checked)}
                            className="mt-1 w-5 h-5"
                          />
                          <label className="text-sm text-gray-700">
                            <strong>Thought Leadership:</strong> Published articles, speaking engagements, media presence
                          </label>
                        </div>
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            name="bd_strengths"
                            value="referral-network"
                            checked={formData.bd_strengths.includes('referral-network')}
                            onChange={(e) => handleCheckboxChange('bd_strengths', 'referral-network', e.target.checked)}
                            className="mt-1 w-5 h-5"
                          />
                          <label className="text-sm text-gray-700">
                            <strong>Referral Network:</strong> Strong relationships with other attorneys, accountants, consultants
                          </label>
                        </div>
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            name="bd_strengths"
                            value="technical-credibility"
                            checked={formData.bd_strengths.includes('technical-credibility')}
                            onChange={(e) => handleCheckboxChange('bd_strengths', 'technical-credibility', e.target.checked)}
                            className="mt-1 w-5 h-5"
                          />
                          <label className="text-sm text-gray-700">
                            <strong>Technical Credibility:</strong> Deep subject-matter expertise that attracts clients
                          </label>
                        </div>
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            name="bd_strengths"
                            value="cross-selling"
                            checked={formData.bd_strengths.includes('cross-selling')}
                            onChange={(e) => handleCheckboxChange('bd_strengths', 'cross-selling', e.target.checked)}
                            className="mt-1 w-5 h-5"
                          />
                          <label className="text-sm text-gray-700">
                            <strong>Cross-Selling:</strong> Ability to expand existing relationships into new service areas
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 4: Partnership Pathway */}
                {currentSection === 3 && (
                  <div className="space-y-6">
                    <div className="p-4 bg-yellow-50 border-l-4 rounded" style={{ borderColor: '#d4af37' }}>
                      <p className="text-sm text-gray-700">
                        <strong>Strictly Confidential:</strong> Partnership details are used only for evaluation and will not be shared.
                      </p>
                    </div>

                    <div>
                      <label className="block font-semibold mb-3" style={{ color: '#1a1a2e' }}>
                        Which partnership pathway interests you most? *
                      </label>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 border-2 rounded-lg hover:border-gold transition-colors" style={{ borderColor: formData.pathway === 'project' ? '#d4af37' : '#e5e7eb' }}>
                          <input
                            type="radio"
                            name="pathway"
                            value="project"
                            required
                            checked={formData.pathway === 'project'}
                            onChange={handleChange}
                            className="mt-1"
                          />
                          <div>
                            <label className="font-semibold cursor-pointer" style={{ color: '#1a1a2e' }}>
                              Project Collaboration
                            </label>
                            <p className="text-sm text-gray-600 mt-1">
                              Work on specific projects as needed. No long-term commitment, flexible arrangements, ideal for testing fit.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 border-2 rounded-lg hover:border-gold transition-colors" style={{ borderColor: formData.pathway === 'full-partnership' ? '#d4af37' : '#e5e7eb' }}>
                          <input
                            type="radio"
                            name="pathway"
                            value="full-partnership"
                            required
                            checked={formData.pathway === 'full-partnership'}
                            onChange={handleChange}
                            className="mt-1"
                          />
                          <div>
                            <label className="font-semibold cursor-pointer" style={{ color: '#1a1a2e' }}>
                              Income Partnership (Full-Time)
                            </label>
                            <p className="text-sm text-gray-600 mt-1">
                              Performance-based compensation, no capital required. Full partner title with profit-sharing.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 border-2 rounded-lg hover:border-gold transition-colors" style={{ borderColor: formData.pathway === 'equity' ? '#d4af37' : '#e5e7eb' }}>
                          <input
                            type="radio"
                            name="pathway"
                            value="equity"
                            required
                            checked={formData.pathway === 'equity'}
                            onChange={handleChange}
                            className="mt-1"
                          />
                          <div>
                            <label className="font-semibold cursor-pointer" style={{ color: '#1a1a2e' }}>
                              Equity Partnership
                            </label>
                            <p className="text-sm text-gray-600 mt-1">
                              Capital contribution required. Full ownership stake, profit-sharing, voting rights, long-term commitment.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 border-2 rounded-lg hover:border-gold transition-colors" style={{ borderColor: formData.pathway === 'discuss' ? '#d4af37' : '#e5e7eb' }}>
                          <input
                            type="radio"
                            name="pathway"
                            value="discuss"
                            required
                            checked={formData.pathway === 'discuss'}
                            onChange={handleChange}
                            className="mt-1"
                          />
                          <div>
                            <label className="font-semibold cursor-pointer" style={{ color: '#1a1a2e' }}>
                              Open to Discussion
                            </label>
                            <p className="text-sm text-gray-600 mt-1">
                              Want to explore options and discuss what arrangement would work best for both parties.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Capital Contribution Capacity *
                      </label>
                      <select
                        name="capital_capacity"
                        required
                        value={formData.capital_capacity}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                      >
                        <option value="">-- Select --</option>
                        <option value="not-applicable">Not Applicable (Not considering Equity Partnership)</option>
                        <option value="0-50k">$0 - $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="100k-250k">$100,000 - $250,000</option>
                        <option value="250k-500k">$250,000 - $500,000</option>
                        <option value="500k+">$500,000+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Current Annual Compensation <span className="text-gray-500 text-sm">(Optional but helpful for calibration)</span>
                      </label>
                      <select
                        name="current_compensation"
                        value={formData.current_compensation}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                      >
                        <option value="">-- Select Range --</option>
                        <option value="0-150k">$0 - $150,000</option>
                        <option value="150k-250k">$150,000 - $250,000</option>
                        <option value="250k-400k">$250,000 - $400,000</option>
                        <option value="400k-600k">$400,000 - $600,000</option>
                        <option value="600k-1m">$600,000 - $1M</option>
                        <option value="1m+">$1M+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Timeline for Transition *
                      </label>
                      <select
                        name="timeline"
                        required
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                      >
                        <option value="">-- Select --</option>
                        <option value="immediate">Immediate (0-3 months)</option>
                        <option value="short-term">Short-term (3-6 months)</option>
                        <option value="mid-term">Mid-term (6-12 months)</option>
                        <option value="long-term">Long-term (12+ months)</option>
                        <option value="exploring">Just exploring</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Why Rivalis? What attracts you to this opportunity? *
                      </label>
                      <textarea
                        name="why_rivalis"
                        required
                        value={formData.why_rivalis}
                        onChange={handleChange}
                        rows={5}
                        placeholder="I'm drawn to Rivalis's focus on emerging specialties and the platform model. The opportunity to collaborate with other specialists while maintaining autonomy appeals to me..."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none resize-vertical"
                      />
                    </div>
                  </div>
                )}

                {/* Section 5: Documents */}
                {currentSection === 4 && (
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                      <p className="text-sm text-gray-700">
                        <strong>Required Documents:</strong> Please upload PDF or document files. Files are stored securely and only accessible to founding partners.
                      </p>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Resume / CV *
                      </label>
                      <p className="text-sm text-gray-600 mb-2">
                        PDF or Word document preferred
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => e.target.files && handleFileUpload('resume_url', e.target.files[0])}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                      />
                      {uploadProgress.resume_url !== undefined && (
                        <div className="mt-2">
                          {uploadProgress.resume_url === 100 ? (
                            <span className="text-sm text-green-600">✓ Uploaded</span>
                          ) : uploadProgress.resume_url === -1 ? (
                            <span className="text-sm text-red-600">✗ Upload failed</span>
                          ) : (
                            <span className="text-sm text-gray-600">Uploading...</span>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Writing Sample <span className="text-gray-500 text-sm">(Optional but recommended)</span>
                      </label>
                      <p className="text-sm text-gray-600 mb-2">
                        Published article, memo, brief, or other legal writing demonstrating your expertise
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => e.target.files && handleFileUpload('writing_sample_url', e.target.files[0])}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                      />
                      {uploadProgress.writing_sample_url !== undefined && (
                        <div className="mt-2">
                          {uploadProgress.writing_sample_url === 100 ? (
                            <span className="text-sm text-green-600">✓ Uploaded</span>
                          ) : uploadProgress.writing_sample_url === -1 ? (
                            <span className="text-sm text-red-600">✗ Upload failed</span>
                          ) : (
                            <span className="text-sm text-gray-600">Uploading...</span>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Client List or Matter Summary <span className="text-gray-500 text-sm">(Optional, for equity track)</span>
                      </label>
                      <p className="text-sm text-gray-600 mb-2">
                        List of portable clients with estimated annual billings (anonymized if preferred). Excel or PDF format.
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                        onChange={(e) => e.target.files && handleFileUpload('client_list_url', e.target.files[0])}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                      />
                      {uploadProgress.client_list_url !== undefined && (
                        <div className="mt-2">
                          {uploadProgress.client_list_url === 100 ? (
                            <span className="text-sm text-green-600">✓ Uploaded</span>
                          ) : uploadProgress.client_list_url === -1 ? (
                            <span className="text-sm text-red-600">✗ Upload failed</span>
                          ) : (
                            <span className="text-sm text-gray-600">Uploading...</span>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Additional Materials <span className="text-gray-500 text-sm">(Optional)</span>
                      </label>
                      <p className="text-sm text-gray-600 mb-2">
                        Publications, presentations, certifications, or other relevant materials (you can select multiple files)
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.ppt,.pptx"
                        multiple
                        onChange={(e) => {
                          if (e.target.files) {
                            Array.from(e.target.files).forEach((file, index) => {
                              handleFileUpload(`additional_doc_${index}`, file);
                            });
                          }
                        }}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Accepted formats: PDF, Word, PowerPoint
                      </p>
                    </div>
                  </div>
                )}

                {/* Section 6: References */}
                {currentSection === 5 && (
                  <div className="space-y-8">
                    <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                      <p className="text-sm text-gray-700">
                        <strong>Professional References:</strong> Provide 3 professional references who can speak to your legal abilities, 
                        work ethic, and character. We will contact them only if moving forward with your application.
                      </p>
                    </div>

                    {formData.references.map((ref, index) => (
                      <div key={index} className="p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
                        <h3 className="text-xl font-bold mb-4" style={{ color: '#1a1a2e' }}>Reference {index + 1}</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block font-semibold mb-2 text-sm" style={{ color: '#1a1a2e' }}>
                              Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={ref.name}
                              onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                              placeholder={index === 0 ? "John Doe" : index === 1 ? "Jane Smith" : "Robert Johnson"}
                              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold mb-2 text-sm" style={{ color: '#1a1a2e' }}>
                              Relationship *
                            </label>
                            <input
                              type="text"
                              required
                              value={ref.relationship}
                              onChange={(e) => handleReferenceChange(index, 'relationship', e.target.value)}
                              placeholder={index === 0 ? "Former colleague, BigLaw Partner" : index === 1 ? "Client, CEO of TechCorp" : "Professional contact, Industry expert"}
                              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block font-semibold mb-2 text-sm" style={{ color: '#1a1a2e' }}>
                                Email *
                              </label>
                              <input
                                type="email"
                                required
                                value={ref.email}
                                onChange={(e) => handleReferenceChange(index, 'email', e.target.value)}
                                placeholder={index === 0 ? "john@lawfirm.com" : index === 1 ? "jane@techcorp.com" : "robert@company.com"}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block font-semibold mb-2 text-sm" style={{ color: '#1a1a2e' }}>
                                Phone *
                              </label>
                              <input
                                type="tel"
                                required
                                value={ref.phone}
                                onChange={(e) => handleReferenceChange(index, 'phone', e.target.value)}
                                placeholder="+1 (555) 123-4567"
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Section 7: Final Questions */}
                {currentSection === 6 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block font-semibold mb-3" style={{ color: '#1a1a2e' }}>
                        Any potential conflicts of interest or restrictions? *
                      </label>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="conflicts"
                            value="no"
                            required
                            checked={formData.conflicts === 'no'}
                            onChange={handleChange}
                            className="w-5 h-5"
                          />
                          <label className="text-gray-700">
                            No, I have no conflicts or restrictions
                          </label>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="conflicts"
                            value="yes"
                            required
                            checked={formData.conflicts === 'yes'}
                            onChange={handleChange}
                            className="w-5 h-5"
                          />
                          <label className="text-gray-700">
                            Yes, I have conflicts or restrictions to disclose
                          </label>
                        </div>
                      </div>
                    </div>

                    {formData.conflicts === 'yes' && (
                      <div>
                        <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                          Please explain *
                        </label>
                        <textarea
                          name="conflicts_details"
                          required={formData.conflicts === 'yes'}
                          value={formData.conflicts_details}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Non-compete agreement, client restrictions, pending matters, etc."
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none resize-vertical"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Is there anything else we should know? <span className="text-gray-500 text-sm">(Optional)</span>
                      </label>
                      <textarea
                        name="additional_info"
                        value={formData.additional_info}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Any additional context, special circumstances, or information that would help us understand your application..."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none resize-vertical"
                      />
                    </div>

                    <div className="p-6 bg-gray-50 rounded-lg border-2 border-gray-300">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          name="agreement"
                          required
                          checked={formData.agreement}
                          onChange={handleChange}
                          className="mt-1 w-5 h-5"
                        />
                        <label className="text-sm text-gray-700">
                          <strong>I certify that all information provided in this application is true and accurate to the best of my knowledge.</strong> I understand that any false statements or omissions may result in disqualification or termination. I authorize Rivalis Law to conduct background checks, contact references, and verify information provided.
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <button
                    type="button"
                    onClick={prevSection}
                    disabled={currentSection === 0}
                    className="px-6 py-3 rounded-lg font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ background: '#e5e7eb', color: '#1a1a2e' }}
                  >
                    ← Previous
                  </button>

                  {currentSection < SECTIONS.length - 1 ? (
                    <button
                      type="button"
                      onClick={nextSection}
                      className="px-8 py-3 rounded-lg font-semibold"
                      style={{ background: 'linear-gradient(135deg, #d4af37, #b8941f)', color: '#1a1a2e' }}
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting || !formData.resume_url || !formData.agreement}
                      className="px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }}
                    >
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <EnhancedFooter />
    </>
  );
}

export default function PartnerApplicationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PartnerApplicationContent />
    </Suspense>
  );
}
