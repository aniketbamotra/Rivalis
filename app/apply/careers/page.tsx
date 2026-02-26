'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Layout/Navigation';
import { EnhancedFooter } from '@/components/Layout';

interface FormData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  location: string;
  
  // Position Information
  positionApplying: string;
  positionType: string;
  department: string;
  
  // Professional Background
  yearsExperience: number;
  currentEmployer: string;
  currentPosition: string;
  barAdmissions: string[];
  education: string;
  
  // Skills & Expertise
  technicalSkills: string[];
  languages: string[];
  specializations: string[];
  
  // Work Preferences
  workArrangement: string;
  startDate: string;
  salaryExpectation: string;
  
  // Application Materials
  resumeUrl: string;
  coverLetterUrl: string;
  portfolioUrl: string;
  
  // Additional Information
  howDidYouHear: string;
  whyRivalis: string;
  additionalInfo: string;
}

export default function CareersApplicationPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    location: '',
    positionApplying: '',
    positionType: '',
    department: '',
    yearsExperience: 0,
    currentEmployer: '',
    currentPosition: '',
    barAdmissions: [],
    education: '',
    technicalSkills: [],
    languages: [],
    specializations: [],
    workArrangement: '',
    startDate: '',
    salaryExpectation: '',
    resumeUrl: '',
    coverLetterUrl: '',
    portfolioUrl: '',
    howDidYouHear: '',
    whyRivalis: '',
    additionalInfo: '',
  });

  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field: keyof FormData, value: string) => {
    setFormData(prev => {
      const currentValues = prev[field] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [field]: newValues };
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploading(prev => ({ ...prev, [field]: true }));

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', field);

      const response = await fetch('/api/upload-document', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setFormData(prev => ({ ...prev, [field]: data.url }));
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setUploading(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/career-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');

      alert('Application submitted successfully! We\'ll be in touch soon.');
      window.location.href = '/join-firm';
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const positionTypes = ['Attorney', 'Paralegal', 'Legal Assistant', 'Administrative', 'Technology', 'Marketing', 'Operations'];
  const departments = ['AI Governance', 'Quantum Computing Law', 'Blockchain & Web3', 'Space Law', 'Aviation', 'Biotechnology', 'Immigration', 'Climate Tech', 'Cybersecurity'];
  const technicalSkills = ['Legal Research', 'Contract Drafting', 'eDiscovery', 'Case Management Software', 'Microsoft Office', 'Adobe Acrobat', 'Clio', 'Westlaw', 'LexisNexis', 'Python', 'Data Analysis'];
  const languages = ['English', 'Spanish', 'Mandarin', 'French', 'German', 'Japanese', 'Korean', 'Arabic', 'Portuguese'];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Careers Application
            </h1>
            <p className="text-xl text-gray-300">
              Join our team of specialists shaping the future of law
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Personal Information */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-r from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center text-sm">1</span>
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn Profile</label>
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location *</label>
                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="City, State/Country"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Position Information */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-r from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center text-sm">2</span>
                Position Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Position Applying For *</label>
                  <input
                    type="text"
                    name="positionApplying"
                    required
                    placeholder="e.g., Senior Paralegal, Legal Assistant"
                    value={formData.positionApplying}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Position Type *</label>
                  <select
                    name="positionType"
                    required
                    value={formData.positionType}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  >
                    <option value="">Select type</option>
                    {positionTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Department of Interest *</label>
                  <select
                    name="department"
                    required
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  >
                    <option value="">Select department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Professional Background */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-r from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center text-sm">3</span>
                Professional Background
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Years of Experience *</label>
                    <input
                      type="number"
                      name="yearsExperience"
                      required
                      min="0"
                      value={formData.yearsExperience}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Current Employer</label>
                    <input
                      type="text"
                      name="currentEmployer"
                      value={formData.currentEmployer}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Current Position</label>
                    <input
                      type="text"
                      name="currentPosition"
                      value={formData.currentPosition}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    />
                  </div>
                </div>

                {formData.positionType === 'Attorney' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Bar Admissions</label>
                    <input
                      type="text"
                      placeholder="e.g., California, New York (comma-separated)"
                      onChange={(e) => setFormData(prev => ({ ...prev, barAdmissions: e.target.value.split(',').map(s => s.trim()) }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Education *</label>
                  <textarea
                    name="education"
                    required
                    rows={3}
                    placeholder="Degrees, institutions, graduation years"
                    value={formData.education}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Skills & Expertise */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-r from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center text-sm">4</span>
                Skills & Expertise
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Technical Skills *</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {technicalSkills.map(skill => (
                      <label key={skill} className="flex items-center gap-2 text-gray-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.technicalSkills.includes(skill)}
                          onChange={() => handleCheckboxChange('technicalSkills', skill)}
                          className="w-4 h-4 rounded border-white/20 bg-white/10 text-[#d4af37] focus:ring-[#d4af37]"
                        />
                        <span className="text-sm">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Languages</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {languages.map(lang => (
                      <label key={lang} className="flex items-center gap-2 text-gray-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.languages.includes(lang)}
                          onChange={() => handleCheckboxChange('languages', lang)}
                          className="w-4 h-4 rounded border-white/20 bg-white/10 text-[#d4af37] focus:ring-[#d4af37]"
                        />
                        <span className="text-sm">{lang}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Work Preferences */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-r from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center text-sm">5</span>
                Work Preferences
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Work Arrangement *</label>
                  <select
                    name="workArrangement"
                    required
                    value={formData.workArrangement}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  >
                    <option value="">Select preference</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">On-site</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Earliest Start Date *</label>
                  <input
                    type="date"
                    name="startDate"
                    required
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Salary Expectation</label>
                  <input
                    type="text"
                    name="salaryExpectation"
                    placeholder="e.g., $80,000 - $100,000"
                    value={formData.salaryExpectation}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>
              </div>
            </div>

            {/* Section 6: Application Materials */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-r from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center text-sm">6</span>
                Application Materials
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Resume/CV * (PDF, max 10MB)</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, 'resumeUrl')}
                    disabled={uploading.resumeUrl}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#d4af37] file:text-slate-900 hover:file:bg-[#b8941f]"
                  />
                  {uploading.resumeUrl && <p className="text-sm text-gray-400 mt-2">Uploading...</p>}
                  {formData.resumeUrl && <p className="text-sm text-green-400 mt-2">✓ Uploaded</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cover Letter (PDF, max 10MB)</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, 'coverLetterUrl')}
                    disabled={uploading.coverLetterUrl}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#d4af37] file:text-slate-900 hover:file:bg-[#b8941f]"
                  />
                  {uploading.coverLetterUrl && <p className="text-sm text-gray-400 mt-2">Uploading...</p>}
                  {formData.coverLetterUrl && <p className="text-sm text-green-400 mt-2">✓ Uploaded</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Portfolio/Work Samples (PDF, max 10MB)</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e, 'portfolioUrl')}
                    disabled={uploading.portfolioUrl}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#d4af37] file:text-slate-900 hover:file:bg-[#b8941f]"
                  />
                  {uploading.portfolioUrl && <p className="text-sm text-gray-400 mt-2">Uploading...</p>}
                  {formData.portfolioUrl && <p className="text-sm text-green-400 mt-2">✓ Uploaded</p>}
                </div>
              </div>
            </div>

            {/* Section 7: Additional Information */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-r from-[#d4af37] to-[#b8941f] rounded-full flex items-center justify-center text-sm">7</span>
                Additional Information
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">How did you hear about this position? *</label>
                  <select
                    name="howDidYouHear"
                    required
                    value={formData.howDidYouHear}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  >
                    <option value="">Select source</option>
                    <option value="website">Rivalis Website</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="referral">Employee Referral</option>
                    <option value="job-board">Job Board</option>
                    <option value="recruiter">Recruiter</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Why do you want to join Rivalis? *</label>
                  <textarea
                    name="whyRivalis"
                    required
                    rows={4}
                    value={formData.whyRivalis}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Additional Information</label>
                  <textarea
                    name="additionalInfo"
                    rows={4}
                    placeholder="Anything else you'd like us to know?"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={submitting || !formData.resumeUrl}
                className="px-12 py-4 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-[#d4af37]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <EnhancedFooter />
    </>
  );
}
