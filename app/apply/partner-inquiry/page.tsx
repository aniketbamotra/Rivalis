'use client';

import { useState } from 'react';
import { Navigation, EnhancedFooter } from '@/components/Layout';

export default function PartnerInquiryPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pathway: '',
    specialty: '',
    years_practice: '',
    brief_background: '',
    why_rivalis: '',
    agreement: false,
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/partner-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError('Something went wrong. Please try again or email us directly at partners@rivalislaw.com');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
        <div className="py-16 px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
            {!submitted ? (
              <>
                {/* Header */}
                <div className="text-center py-16 px-12 bg-white">
                  <div className="text-2xl font-bold mb-3" style={{ color: '#1a1a2e' }}>RIVALIS LAW</div>
                  <h1 className="text-5xl font-serif font-bold mb-4" style={{ color: '#1a1a2e' }}>Partnership Inquiry</h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Thank you for your interest in joining Rivalis Law. This initial inquiry helps us understand your background and practice. 
                    If there's potential alignment, we'll send you a private link to our detailed application.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-12 py-10">
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                      {error}
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                      Full Name <span style={{ color: '#d4af37' }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none transition-colors"
                      style={{ fontSize: '1rem' }}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                      Email Address <span style={{ color: '#d4af37' }}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@lawfirm.com"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                      Which partnership pathway interests you? <span style={{ color: '#d4af37' }}>*</span>
                    </label>
                    <select
                      name="pathway"
                      required
                      value={formData.pathway}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none transition-colors"
                    >
                      <option value="">-- Select --</option>
                      <option value="project">Project Collaboration (Flexible, project-based)</option>
                      <option value="partnership">Full Partnership (Performance-based, no capital)</option>
                      <option value="equity">Equity Ownership (Capital contribution, profit-sharing)</option>
                      <option value="unsure">I'm unsure - let's discuss</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                      Primary Practice Area <span style={{ color: '#d4af37' }}>*</span>
                    </label>
                    <select
                      name="specialty"
                      required
                      value={formData.specialty}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none transition-colors"
                    >
                      <option value="">-- Select --</option>
                      <optgroup label="Technology & AI">
                        <option value="ai-governance">AI Governance & Ethics</option>
                        <option value="quantum">Quantum Computing Law</option>
                        <option value="blockchain">Blockchain & Web3 Law</option>
                        <option value="cybersecurity">Cybersecurity & Data Privacy</option>
                      </optgroup>
                      <optgroup label="Space, Aviation & Mobility">
                        <option value="space">Space Law & Policy</option>
                        <option value="aviation">Aviation & Aerospace Law</option>
                        <option value="autonomous">Autonomous Systems & Drones</option>
                      </optgroup>
                      <optgroup label="Life Sciences & Biotech">
                        <option value="crispr">CRISPR & Genomic Law</option>
                        <option value="biotech">Biotech & Pharma IP</option>
                        <option value="synthetic-bio">Synthetic Biology Law</option>
                      </optgroup>
                      <optgroup label="Immigration & Mobility">
                        <option value="corp-immigration">Corporate Immigration</option>
                        <option value="tech-talent">Tech Talent Visas</option>
                        <option value="global-mobility">Global Mobility Law</option>
                      </optgroup>
                      <optgroup label="Emerging Specialties">
                        <option value="climate">Climate Tech & Carbon Law</option>
                        <option value="neurotech">Neurotechnology Law</option>
                        <option value="other">Other Emerging Specialty</option>
                      </optgroup>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                      Years in Practice <span style={{ color: '#d4af37' }}>*</span>
                    </label>
                    <input
                      type="number"
                      name="years_practice"
                      required
                      min="0"
                      max="60"
                      value={formData.years_practice}
                      onChange={handleChange}
                      placeholder="15"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                      Brief Overview of Your Practice <span style={{ color: '#d4af37' }}>*</span>
                    </label>
                    <textarea
                      name="brief_background"
                      required
                      value={formData.brief_background}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Example: 'I lead the AI governance practice at a BigLaw firm, advising Fortune 500 companies on EU AI Act compliance. Published author on algorithmic accountability. Looking to build my own practice with more autonomy.'"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none transition-colors resize-vertical"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block font-semibold mb-2" style={{ color: '#1a1a2e' }}>
                      Why Rivalis? What attracted you to this opportunity? <span style={{ color: '#d4af37' }}>*</span>
                    </label>
                    <textarea
                      name="why_rivalis"
                      required
                      value={formData.why_rivalis}
                      onChange={handleChange}
                      rows={4}
                      placeholder="What specifically interests you about joining Rivalis Law?"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gold focus:outline-none transition-colors resize-vertical"
                    />
                  </div>

                  <div className="mb-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreement"
                        required
                        checked={formData.agreement}
                        onChange={handleChange}
                        className="mt-1 mr-3 w-5 h-5 cursor-pointer"
                      />
                      <span className="text-sm leading-relaxed text-gray-700">
                        I understand this is an initial inquiry. Detailed compensation information, partnership terms, and our full application 
                        will be shared during the confidential interview process if there is mutual interest. <span style={{ color: '#d4af37' }}>*</span>
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-lg font-bold uppercase tracking-wider text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ 
                      background: 'linear-gradient(135deg, #d4af37, #b8941f)', 
                      color: '#1a1a2e',
                      boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                    }}
                  >
                    {submitting ? 'Submitting...' : 'Submit Inquiry'}
                  </button>

                  <div className="mt-6 p-5 bg-yellow-50 border-l-4 rounded" style={{ borderColor: '#d4af37' }}>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <strong>What happens next?</strong> We review inquiries weekly. If your background aligns with our needs, 
                      we'll send you a private link to our detailed application within 7-10 business days. That application will 
                      include questions about your book of business, references, and compensation expectations.
                    </p>
                  </div>
                </form>
              </>
            ) : (
              /* Confirmation Screen */
              <div className="text-center py-16 px-12">
                <div className="text-6xl mb-6" style={{ color: '#10b981' }}>✓</div>
                <h2 className="text-4xl font-serif font-bold mb-6" style={{ color: '#1a1a2e' }}>Thank You for Your Interest</h2>
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                  We've received your partnership inquiry and will review it within 3-5 business days.
                </p>

                <div className="text-left my-10 p-8 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-bold mb-5" style={{ color: '#1a1a2e' }}>What Happens Next:</h3>
                  <ol className="space-y-4 pl-5 list-decimal text-gray-700 leading-relaxed">
                    <li><strong style={{ color: '#d4af37' }}>Initial Review:</strong> Our founding partners will review your background and practice area to assess potential alignment.</li>
                    <li><strong style={{ color: '#d4af37' }}>Private Application Link:</strong> If there's potential fit, we'll send you a unique, private link to our detailed application (includes book of business, references, compensation preferences).</li>
                    <li><strong style={{ color: '#d4af37' }}>Partnership Deck:</strong> Qualified candidates receive our full partnership deck with compensation structures, tier details, and case studies.</li>
                    <li><strong style={{ color: '#d4af37' }}>Interviews:</strong> 2-3 video conversations with founding partners to assess practice depth, values alignment, and cultural fit.</li>
                    <li><strong style={{ color: '#d4af37' }}>Decision:</strong> Final decision typically within 4-6 weeks of initial inquiry.</li>
                  </ol>
                </div>

                <p className="text-gray-600">
                  <strong>Questions?</strong> Email us at{' '}
                  <a href="mailto:partners@rivalislaw.com" className="font-semibold" style={{ color: '#d4af37' }}>
                    partners@rivalislaw.com
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <EnhancedFooter />
    </>
  );
}
