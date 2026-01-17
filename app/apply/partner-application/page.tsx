'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navigation, EnhancedFooter } from '@/components/Layout';

// Define form sections
const SECTIONS = [
  { id: 'contact', title: 'Contact Information', icon: '📋' },
  { id: 'experience', title: 'Professional Experience', icon: '💼' },
  { id: 'business', title: 'Business Development', icon: '📈' },
  { id: 'financial', title: 'Financial Information', icon: '💰' },
  { id: 'documents', title: 'Documents', icon: '📄' },
  { id: 'references', title: 'References', icon: '✅' },
];

export default function PartnerApplicationPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [currentSection, setCurrentSection] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const [formData, setFormData] = useState({
    // Contact
    full_name: '',
    preferred_name: '',
    email: '',
    phone: '',
    linkedin: '',
    current_firm: '',
    current_title: '',
    
    // Experience
    bar_admissions: [''],
    law_school: '',
    law_school_year: '',
    undergrad: '',
    practice_areas: [''],
    years_practice: '',
    representative_matters: '',
    publications: '',
    speaking_engagements: '',
    awards: '',
    
    // Business Development
    annual_billings: '',
    portable_book: '',
    client_concentration: '',
    referral_sources: '',
    marketing_activities: '',
    
    // Financial
    current_compensation: '',
    compensation_expectations: '',
    partnership_tier_preference: '',
    capital_contribution: '',
    
    // Documents
    resume_url: '',
    writing_sample_url: '',
    client_list_url: '',
    
    // References
    references: [
      { name: '', title: '', relationship: '', email: '', phone: '' },
      { name: '', title: '', relationship: '', email: '', phone: '' },
      { name: '', title: '', relationship: '', email: '', phone: '' },
    ],
  });

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing application token. Please use the link sent to your email.');
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).map((item, i) => 
        i === index ? value : item
      ),
    }));
  };

  const addArrayField = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as string[]), ''],
    }));
  };

  const handleReferenceChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.map((ref, i) =>
        i === index ? { ...ref, [field]: value } : ref
      ),
    }));
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
                          Full Legal Name *
                        </label>
                        <input
                          type="text"
                          name="full_name"
                          required
                          value={formData.full_name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                          Preferred Name
                        </label>
                        <input
                          type="text"
                          name="preferred_name"
                          value={formData.preferred_name}
                          onChange={handleChange}
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
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        LinkedIn Profile URL
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
                          Current Firm/Organization *
                        </label>
                        <input
                          type="text"
                          name="current_firm"
                          required
                          value={formData.current_firm}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                          Current Title *
                        </label>
                        <input
                          type="text"
                          name="current_title"
                          required
                          value={formData.current_title}
                          onChange={handleChange}
                          placeholder="e.g., Partner, Of Counsel"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Section 2: Professional Experience */}
                {currentSection === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Bar Admissions *
                      </label>
                      {formData.bar_admissions.map((admission, index) => (
                        <input
                          key={index}
                          type="text"
                          value={admission}
                          onChange={(e) => handleArrayChange('bar_admissions', index, e.target.value)}
                          placeholder="e.g., New York, 2010"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none mb-2"
                        />
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayField('bar_admissions')}
                        className="text-sm font-semibold mt-2"
                        style={{ color: '#d4af37' }}
                      >
                        + Add Another Bar Admission
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                          Law School *
                        </label>
                        <input
                          type="text"
                          name="law_school"
                          required
                          value={formData.law_school}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                          Graduation Year *
                        </label>
                        <input
                          type="number"
                          name="law_school_year"
                          required
                          min="1950"
                          max="2030"
                          value={formData.law_school_year}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Undergraduate Institution *
                      </label>
                      <input
                        type="text"
                        name="undergrad"
                        required
                        value={formData.undergrad}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Practice Areas/Specialties *
                      </label>
                      {formData.practice_areas.map((area, index) => (
                        <input
                          key={index}
                          type="text"
                          value={area}
                          onChange={(e) => handleArrayChange('practice_areas', index, e.target.value)}
                          placeholder="e.g., AI Governance & Ethics"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none mb-2"
                        />
                      ))}
                      <button
                        type="button"
                        onClick={() => addArrayField('practice_areas')}
                        className="text-sm font-semibold mt-2"
                        style={{ color: '#d4af37' }}
                      >
                        + Add Another Practice Area
                      </button>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Years in Practice *
                      </label>
                      <input
                        type="number"
                        name="years_practice"
                        required
                        min="0"
                        max="60"
                        value={formData.years_practice}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Representative Matters (Describe 3-5 significant matters) *
                      </label>
                      <textarea
                        name="representative_matters"
                        required
                        value={formData.representative_matters}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Brief descriptions of notable cases, transactions, or advisory work"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none resize-vertical"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Publications & Thought Leadership
                      </label>
                      <textarea
                        name="publications"
                        value={formData.publications}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Articles, books, blog posts, etc."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none resize-vertical"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Speaking Engagements & Conferences
                      </label>
                      <textarea
                        name="speaking_engagements"
                        value={formData.speaking_engagements}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Notable speaking engagements, panels, conferences"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none resize-vertical"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Awards & Recognition
                      </label>
                      <textarea
                        name="awards"
                        value={formData.awards}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Super Lawyers, Best Lawyers, industry awards, etc."
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
                        Annual Billings (Last 12 Months) *
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
                        placeholder="Describe clients who would follow you, estimated annual value, and any restrictions (non-competes, client conflicts, etc.)"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none resize-vertical"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Client Concentration *
                      </label>
                      <textarea
                        name="client_concentration"
                        required
                        value={formData.client_concentration}
                        onChange={handleChange}
                        rows={4}
                        placeholder="What percentage of your billings come from your top 3 clients? Describe client diversity."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none resize-vertical"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Referral Sources & Network *
                      </label>
                      <textarea
                        name="referral_sources"
                        required
                        value={formData.referral_sources}
                        onChange={handleChange}
                        rows={4}
                        placeholder="How do you generate new business? Referral relationships, industry connections, etc."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none resize-vertical"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Marketing & Business Development Activities *
                      </label>
                      <textarea
                        name="marketing_activities"
                        required
                        value={formData.marketing_activities}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Speaking, writing, social media, networking events, client entertainment, etc."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none resize-vertical"
                      />
                    </div>
                  </div>
                )}

                {/* Section 4: Financial Information */}
                {currentSection === 3 && (
                  <div className="space-y-6">
                    <div className="p-4 bg-yellow-50 border-l-4 rounded" style={{ borderColor: '#d4af37' }}>
                      <p className="text-sm text-gray-700">
                        <strong>Strictly Confidential:</strong> Compensation information is used only for partnership negotiation and will not be shared.
                      </p>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Current Annual Compensation (All sources) *
                      </label>
                      <select
                        name="current_compensation"
                        required
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
                        Compensation Expectations *
                      </label>
                      <textarea
                        name="compensation_expectations"
                        required
                        value={formData.compensation_expectations}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Describe your ideal compensation structure: salary, bonus, profit-sharing, equity, benefits, etc."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none resize-vertical"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Partnership Tier Preference *
                      </label>
                      <select
                        name="partnership_tier_preference"
                        required
                        value={formData.partnership_tier_preference}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                      >
                        <option value="">-- Select --</option>
                        <option value="project">Project Collaboration (Flexible, project-based, no commitment)</option>
                        <option value="income">Income Partnership (Performance-based, no capital required)</option>
                        <option value="equity">Equity Partnership (Capital contribution, profit-sharing, ownership)</option>
                        <option value="discuss">Open to discussion</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Capital Contribution Capacity (If considering Equity Partnership)
                      </label>
                      <select
                        name="capital_contribution"
                        value={formData.capital_contribution}
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
                  </div>
                )}

                {/* Section 5: Documents */}
                {currentSection === 4 && (
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                      <p className="text-sm text-gray-700">
                        <strong>Required Documents:</strong> Please upload PDF versions. Files are stored securely and only accessible to founding partners.
                      </p>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                        Resume / CV *
                      </label>
                      <input
                        type="file"
                        accept=".pdf"
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
                        Writing Sample *
                      </label>
                      <p className="text-sm text-gray-600 mb-2">
                        Published article, memo, brief, or other legal writing demonstrating your expertise
                      </p>
                      <input
                        type="file"
                        accept=".pdf"
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
                        Client List (Optional - Confidential)
                      </label>
                      <p className="text-sm text-gray-600 mb-2">
                        List of portable clients with estimated annual billings (anonymized if preferred)
                      </p>
                      <input
                        type="file"
                        accept=".pdf"
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
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block font-semibold mb-2 text-sm" style={{ color: '#1a1a2e' }}>
                                Full Name *
                              </label>
                              <input
                                type="text"
                                required
                                value={ref.name}
                                onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block font-semibold mb-2 text-sm" style={{ color: '#1a1a2e' }}>
                                Title *
                              </label>
                              <input
                                type="text"
                                required
                                value={ref.title}
                                onChange={(e) => handleReferenceChange(index, 'title', e.target.value)}
                                placeholder="e.g., Partner at ABC Law"
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                              />
                            </div>
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
                              placeholder="e.g., Former supervisor, Co-counsel on major case"
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
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
                      disabled={submitting || !formData.resume_url || !formData.writing_sample_url}
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
