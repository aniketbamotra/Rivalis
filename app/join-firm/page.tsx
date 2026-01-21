'use client';

import Link from 'next/link';
import './styles.css';
import { useState } from 'react';
import { Navigation } from '@/components/Layout/Navigation';
import { EnhancedFooter } from '@/components/Layout';

export default function JoinTheFirmPage() {
  const [activeTab, setActiveTab] = useState<'partnership' | 'careers'>('partnership');

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)' }} className="text-white py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-dot-pattern"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 backdrop-blur-sm border-2 rounded-full px-6 py-3 mb-8" style={{ background: 'rgba(212, 175, 55, 0.2)', borderColor: '#d4af37' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#d4af37' }}></span>
              <span className="text-xs md:text-sm font-bold tracking-widest uppercase" style={{ color: '#d4af37' }}>
                Now Hiring Elite Legal Talent
              </span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-8 leading-tight text-white">
              Shape Tomorrow's <span style={{ color: '#d4af37' }}>Legal Landscape</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join the world's most specialized law firm. Where AI meets ethics, 
              where space law meets commerce, where the future is written today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a
                href="/apply/partner-inquiry"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg font-bold uppercase tracking-wider transition-all transform hover:scale-105 shadow-xl"
                style={{ background: 'linear-gradient(90deg, #d4af37 0%, #f4d03f 100%)', color: '#1a1a2e' }}
              >
                <span>Become a Partner</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#careers"
                className="inline-flex items-center justify-center gap-2 border-2 border-white hover:border-opacity-80 px-10 py-4 rounded-lg font-bold uppercase tracking-wider transition-all text-white hover:bg-white hover:bg-opacity-10"
              >
                <span>Explore Careers</span>
              </a>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-8 border-t border-white border-opacity-20">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#d4af37' }}>15+</div>
                <div className="text-sm text-gray-300 uppercase tracking-wide font-medium">Practice Areas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#d4af37' }}>100%</div>
                <div className="text-sm text-gray-300 uppercase tracking-wide font-medium">Remote First</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#d4af37' }}>Top 1%</div>
                <div className="text-sm text-gray-300 uppercase tracking-wide font-medium">Legal Talent</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#d4af37' }}>Global</div>
                <div className="text-sm text-gray-300 uppercase tracking-wide font-medium">Impact</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tab Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex bg-white rounded-2xl shadow-xl border border-gray-200 p-2">
              <button
                onClick={() => setActiveTab('partnership')}
                className="px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 shadow-lg"
                style={activeTab === 'partnership' 
                  ? { background: 'linear-gradient(90deg, #d4af37 0%, #f4d03f 100%)', color: '#1a1a2e' } 
                  : { color: '#4a5568' }}
              >
                For Attorneys
              </button>
              <button
                onClick={() => setActiveTab('careers')}
                className="px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 shadow-lg"
                style={activeTab === 'careers' 
                  ? { background: 'linear-gradient(90deg, #d4af37 0%, #f4d03f 100%)', color: '#1a1a2e' } 
                  : { color: '#4a5568' }}
              >
                For Professionals
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'partnership' && (
              <div className="grid md:grid-cols-2 gap-12 items-center animate-fadeIn">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
                    <svg className="w-5 h-5" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-bold" style={{ color: '#d4af37' }}>Elite Partnership Track</span>
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: '#1a1a2e' }}>
                    Partnership <span style={{ color: '#d4af37' }}>Opportunities</span>
                  </h2>
                  <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                    Three flexible pathways designed for attorneys at different career stages. From project collaboration to equity ownership—choose the model that fits your vision.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1" style={{ background: 'rgba(212, 175, 55, 0.2)' }}>
                        <svg className="w-4 h-4" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1" style={{ color: '#1a1a2e' }}>7+ Years Experience Required</h4>
                        <p className="text-gray-600">Proven track record in specialized practice areas</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1" style={{ background: 'rgba(212, 175, 55, 0.2)' }}>
                        <svg className="w-4 h-4" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1" style={{ color: '#1a1a2e' }}>Equity & Profit Sharing</h4>
                        <p className="text-gray-600">Build ownership in the firm's long-term success</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1" style={{ background: 'rgba(212, 175, 55, 0.2)' }}>
                        <svg className="w-4 h-4" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1" style={{ color: '#1a1a2e' }}>Shape Your Practice</h4>
                        <p className="text-gray-600">Co-create the future of your specialized field</p>
                      </div>
                    </div>
                  </div>
                  <a
                    href="/apply/partner-inquiry"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg"
                    style={{ background: 'linear-gradient(90deg, #d4af37 0%, #f4d03f 100%)', color: '#1a1a2e' }}
                  >
                    Explore Partnership Paths
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
                <div className="relative">
                  <div className="feature-image-card">
                    {/* Partnership Collaboration Visual */}
                    <div className="partnership-visual">
                      <div className="handshake-container">
                        {/* Left Partner */}
                        <div className="partner-circle" style={{ top: '50%', left: '0', transform: 'translateY(-50%)' }}>
                          <div className="partner-icon"></div>
                        </div>
                        
                        {/* Right Partner */}
                        <div className="partner-circle" style={{ top: '50%', right: '0', transform: 'translateY(-50%)' }}>
                          <div className="partner-icon"></div>
                        </div>
                        
                        {/* Connection Path */}
                        <div className="connection-path" style={{ transform: 'translate(-50%, -50%)' }}>
                          <div className="connection-pulse"></div>
                        </div>
                        
                        {/* Floating Documents representing agreements */}
                        <div className="document-float" style={{ top: '15%', left: '30%', animationDelay: '0s' }}></div>
                        <div className="document-float" style={{ top: '25%', right: '25%', animationDelay: '1s' }}></div>
                        <div className="document-float" style={{ bottom: '20%', left: '35%', animationDelay: '2s' }}></div>
                        <div className="document-float" style={{ bottom: '30%', right: '30%', animationDelay: '3s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'careers' && (
              <div className="grid md:grid-cols-2 gap-12 items-center animate-fadeIn">
                <div className="order-2 md:order-1 relative">
                  <div className="feature-image-card">
                    {/* Career Growth Chart */}
                    <div className="career-growth">
                      {/* Animated Chart Bars */}
                      <div className="growth-chart-bar" style={{ left: '12%', animationDelay: '0s', animationDuration: '3s' }}></div>
                      <div className="growth-chart-bar" style={{ left: '22%', animationDelay: '0.2s', animationDuration: '3.2s' }}></div>
                      <div className="growth-chart-bar" style={{ left: '32%', animationDelay: '0.4s', animationDuration: '2.8s' }}></div>
                      <div className="growth-chart-bar" style={{ left: '42%', animationDelay: '0.6s', animationDuration: '3.4s' }}></div>
                      <div className="growth-chart-bar" style={{ left: '52%', animationDelay: '0.8s', animationDuration: '3s' }}></div>
                      <div className="growth-chart-bar" style={{ left: '62%', animationDelay: '1s', animationDuration: '3.6s' }}></div>
                      <div className="growth-chart-bar" style={{ left: '72%', animationDelay: '1.2s', animationDuration: '3.2s' }}></div>
                      <div className="growth-chart-bar" style={{ left: '82%', animationDelay: '1.4s', animationDuration: '3.8s' }}></div>
                      
                      {/* Success Particles */}
                      <div className="success-particle" style={{ left: '15%', bottom: '10%', animationDelay: '0s', '--drift-x': '30px' } as React.CSSProperties}></div>
                      <div className="success-particle" style={{ left: '25%', bottom: '15%', animationDelay: '0.8s', '--drift-x': '-20px' } as React.CSSProperties}></div>
                      <div className="success-particle" style={{ left: '35%', bottom: '5%', animationDelay: '1.6s', '--drift-x': '40px' } as React.CSSProperties}></div>
                      <div className="success-particle" style={{ left: '45%', bottom: '20%', animationDelay: '2.4s', '--drift-x': '-30px' } as React.CSSProperties}></div>
                      <div className="success-particle" style={{ left: '55%', bottom: '12%', animationDelay: '3.2s', '--drift-x': '25px' } as React.CSSProperties}></div>
                      <div className="success-particle" style={{ left: '65%', bottom: '8%', animationDelay: '4s', '--drift-x': '-35px' } as React.CSSProperties}></div>
                      <div className="success-particle" style={{ left: '75%', bottom: '18%', animationDelay: '4.8s', '--drift-x': '20px' } as React.CSSProperties}></div>
                      <div className="success-particle" style={{ left: '85%', bottom: '14%', animationDelay: '5.6s', '--drift-x': '-25px' } as React.CSSProperties}></div>
                      
                      {/* Upward Trajectory Line */}
                      <div className="trajectory-line"></div>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
                    <svg className="w-5 h-5" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    <span className="text-sm font-bold" style={{ color: '#d4af37' }}>Career Growth Path</span>
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: '#1a1a2e' }}>
                    Build Your <span style={{ color: '#d4af37' }}>Career</span>
                  </h2>
                  <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                    Join our elite team of professionals shaping the future of specialized law. From associates to operations, every role is mission-critical.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1" style={{ background: 'rgba(212, 175, 55, 0.2)' }}>
                        <svg className="w-4 h-4" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1" style={{ color: '#1a1a2e' }}>100% Remote First</h4>
                        <p className="text-gray-600">Work from anywhere in the world</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1" style={{ background: 'rgba(212, 175, 55, 0.2)' }}>
                        <svg className="w-4 h-4" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1" style={{ color: '#1a1a2e' }}>Competitive Compensation</h4>
                        <p className="text-gray-600">Top-tier salary packages and benefits</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1" style={{ background: 'rgba(212, 175, 55, 0.2)' }}>
                        <svg className="w-4 h-4" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold mb-1" style={{ color: '#1a1a2e' }}>Meaningful Impact</h4>
                        <p className="text-gray-600">Shape the future of specialized law from day one</p>
                      </div>
                    </div>
                  </div>
                  <a
                    href="/apply/careers"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg"
                    style={{ background: 'linear-gradient(90deg, #d4af37 0%, #f4d03f 100%)', color: '#1a1a2e' }}
                  >
                    Apply Now
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Practice Areas */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
              <svg className="w-5 h-5" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-bold" style={{ color: '#d4af37' }}>15+ Frontier Specialties</span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6" style={{ color: '#1a1a2e' }}>
              Where <span style={{ color: '#d4af37' }}>Innovation</span> Meets Law
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We assemble the world's top 1% of legal specialists. These aren't saturated practice areas—these are emerging fields where the top 10 experts globally define the entire discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: '🤖', 
                title: 'AI Governance & Ethics', 
                desc: 'EU AI Act, algorithmic accountability, bias auditing, and AI deployment frameworks for enterprises.',
                color: 'from-blue-500 to-cyan-500'
              },
              { 
                icon: '⚛️', 
                title: 'Quantum Computing Law', 
                desc: 'Post-quantum cryptography standards, quantum threat mitigation, and NIST compliance strategies.',
                color: 'from-purple-500 to-pink-500'
              },
              { 
                icon: '🔗', 
                title: 'Blockchain & Web3', 
                desc: 'Cryptocurrency regulation, DeFi protocols, smart contract law, NFT compliance, and DAO governance.',
                color: 'from-orange-500 to-red-500'
              },
              { 
                icon: '🚀', 
                title: 'Space Law & Policy', 
                desc: 'Satellite regulation, space commerce, lunar resource rights, and international space treaties.',
                color: 'from-indigo-500 to-purple-500'
              },
              { 
                icon: '✈️', 
                title: 'Aviation & Aerospace', 
                desc: 'Aircraft leasing, FAA compliance, sustainable aviation fuel, and advanced air mobility.',
                color: 'from-sky-500 to-blue-500'
              },
              { 
                icon: '🤖', 
                title: 'Autonomous Systems', 
                desc: 'Drone regulation, unmanned aerial systems, autonomous vehicle liability, and robotics law.',
                color: 'from-emerald-500 to-teal-500'
              },
              { 
                icon: '🧬', 
                title: 'CRISPR & Genomic Law', 
                desc: 'Gene editing regulation, germline ethics, FDA approval pathways, and bioethics compliance.',
                color: 'from-green-500 to-emerald-500'
              },
              { 
                icon: '💊', 
                title: 'Biotech & Pharma IP', 
                desc: 'Biologics patents, FDA regulatory pathways, clinical trial law, and biosimilars strategy.',
                color: 'from-cyan-500 to-blue-500'
              },
              { 
                icon: '🔬', 
                title: 'Synthetic Biology', 
                desc: 'Bioengineering regulation, biosafety protocols, and synthetic organism containment.',
                color: 'from-lime-500 to-green-500'
              },
              { 
                icon: '🌍', 
                title: 'Corporate Immigration', 
                desc: 'H-1B strategy, O-1 extraordinary ability petitions, EB-1/EB-2 NIW, and tech talent mobility.',
                color: 'from-amber-500 to-orange-500'
              },
              { 
                icon: '💻', 
                title: 'Tech Talent Visas', 
                desc: 'AI researcher visas, quantum physicist petitions, and exceptional ability cases for STEM talent.',
                color: 'from-violet-500 to-purple-500'
              },
              { 
                icon: '🌐', 
                title: 'Global Mobility Law', 
                desc: 'Cross-border assignments, expatriate taxation, remote work visas, and digital nomad compliance.',
                color: 'from-rose-500 to-pink-500'
              },
              { 
                icon: '🌱', 
                title: 'Climate Tech & Carbon', 
                desc: 'Carbon credit trading, ESG compliance, renewable energy law, and climate disclosure requirements.',
                color: 'from-green-500 to-teal-500'
              },
              { 
                icon: '🧠', 
                title: 'Neurotechnology', 
                desc: 'Brain-computer interfaces, neural data privacy, cognitive liberty, and neurorights legislation.',
                color: 'from-fuchsia-500 to-purple-500'
              },
              { 
                icon: '🔒', 
                title: 'Cybersecurity & Privacy', 
                desc: 'GDPR/CCPA compliance, data breach response, NIS2 directive, and zero trust architecture law.',
                color: 'from-slate-500 to-gray-500'
              },
            ].map((practice, idx) => (
              <div key={idx} className="enhanced-practice-card group">
                <div className={`practice-icon-badge bg-gradient-to-br ${practice.color}`}>
                  <span className="text-4xl">{practice.icon}</span>
                </div>
                <h3 className="font-bold text-xl mb-3 transition-colors" style={{ color: '#1a1a2e' }}>
                  {practice.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{practice.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section - Redesigned */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)' }}></div>
        <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-8">
              <svg className="w-16 h-16 mx-auto" style={{ color: '#d4af37' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Our <span style={{ color: '#d4af37' }}>Philosophy</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <blockquote className="relative">
              <div className="absolute -top-8 -left-4 text-9xl font-serif leading-none" style={{ color: 'rgba(212, 175, 55, 0.2)' }}>"</div>
              <p className="relative text-3xl md:text-4xl font-serif italic mb-8 text-center leading-relaxed" style={{ color: '#d4af37' }}>
                Clients don't need more lawyers. They need the right lawyers.
              </p>
              <div className="absolute -bottom-8 -right-4 text-9xl font-serif leading-none" style={{ color: 'rgba(212, 175, 55, 0.2)' }}>"</div>
            </blockquote>

            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
                  <svg className="w-8 h-8" style={{ color: '#d4af37' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Specialized Depth</h3>
                <p className="text-gray-400 leading-relaxed">
                  Not generalists. The top 5 specialists in each critical emerging field.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
                  <svg className="w-8 h-8" style={{ color: '#d4af37' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Future-Focused</h3>
                <p className="text-gray-400 leading-relaxed">
                  Building law for technologies that don't yet have established precedent.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
                  <svg className="w-8 h-8" style={{ color: '#d4af37' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Elite Consortium</h3>
                <p className="text-gray-400 leading-relaxed">
                  A collective of the world's leading experts, not the 5,000th generalist.
                </p>
              </div>
            </div>

            <p className="text-xl text-gray-300 text-center mt-12 leading-relaxed">
              Traditional firms were built for leverage and volume. We're built for specialized depth. 
              The future belongs to experts who define their fields—and we're assembling that consortium.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Partnership Pathways */}
      <section id="pathways" className="py-24 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
              <svg className="w-5 h-5" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              <span className="text-sm font-bold" style={{ color: '#d4af37' }}>Choose Your Path</span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6" style={{ color: '#1a1a2e' }}>
              Partnership <span style={{ color: '#d4af37' }}>Pathways</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Three flexible structures designed for different career stages and risk profiles. 
              All pathways provide access to our platform, brand, and specialist network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Pathway 1 */}
            <div className="enhanced-pathway-card">
              <div className="pathway-header">
                <span className="pathway-number-badge">01</span>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#1a1a2e' }}>Project Collaboration</h3>
                <p className="text-gray-600 text-sm">Test the waters • Build relationships</p>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Work with us on high-value matters while maintaining your independence. Perfect for testing cultural fit before deeper commitment.
              </p>

              <div className="space-y-3 mb-8">
                <div className="benefit-item-enhanced">
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Flexible project engagement</span>
                </div>
                <div className="benefit-item-enhanced">
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Maintain your practice</span>
                </div>
                <div className="benefit-item-enhanced">
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Revenue share per matter</span>
                </div>
                <div className="benefit-item-enhanced">
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Path to full partnership</span>
                </div>
              </div>

              <a
                href="/apply/partner-inquiry"
                className="block w-full text-center px-6 py-4 rounded-lg font-bold uppercase tracking-wider transition-all transform hover:scale-105"
                style={{ background: 'linear-gradient(90deg, #d4af37 0%, #f4d03f 100%)', color: '#1a1a2e' }}
              >
                Express Interest
              </a>
            </div>

            {/* Pathway 2 - Featured */}
            <div className="enhanced-pathway-card featured-card">
              <div className="featured-badge">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Most Popular
              </div>
              
              <div className="pathway-header">
                <span className="pathway-number-badge">02</span>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#1a1a2e' }}>Full Partnership</h3>
                <p className="text-gray-600 text-sm">Partner status • Performance-based</p>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Join as a full partner with all benefits of partnership status, without capital barriers. Clear pathway to ownership.
              </p>

              <div className="space-y-3 mb-8">
                <div className="benefit-item-enhanced">
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Partner status title</span>
                </div>
                <div className="benefit-item-enhanced">
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Performance-based compensation</span>
                </div>
                <div className="benefit-item-enhanced">
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Equity upside pathway</span>
                </div>
                <div className="benefit-item-enhanced">
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Full firm benefits</span>
                </div>
              </div>

              <a
                href="/apply/partner-inquiry"
                className="block w-full text-center px-6 py-4 rounded-lg font-bold uppercase tracking-wider transition-all transform hover:scale-105"
                style={{ background: 'linear-gradient(90deg, #d4af37 0%, #f4d03f 100%)', color: '#1a1a2e' }}
              >
                Express Interest
              </a>
            </div>

            {/* Pathway 3 */}
            <div className="enhanced-pathway-card">
              <div className="pathway-header">
                <span className="pathway-number-badge">03</span>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#1a1a2e' }}>Equity Ownership</h3>
                <p className="text-gray-600 text-sm">Capital stake • Profit sharing</p>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Become a profit-sharing partner with capital stake. For partners ready to co-build the long-term vision with commitment.
              </p>

              <div className="space-y-3 mb-8">
                <div className="benefit-item-enhanced">
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Equity ownership stake</span>
                </div>
                <div className="benefit-item-enhanced">
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Profit-sharing model</span>
                </div>
                <div className="benefit-item-enhanced">
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Governance seat</span>
                </div>
                <div className="benefit-item-enhanced">
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Long-term upside</span>
                </div>
              </div>

              <a
                href="/apply/partner-inquiry"
                className="block w-full text-center px-6 py-4 rounded-lg font-bold uppercase tracking-wider transition-all transform hover:scale-105"
                style={{ background: 'linear-gradient(90deg, #d4af37 0%, #f4d03f 100%)', color: '#1a1a2e' }}
              >
                Express Interest
              </a>
            </div>
          </div>

          {/* Enhanced Disclosure Note */}
          <div className="max-w-4xl mx-auto">
            <div className="disclosure-box-enhanced">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-lg" style={{ color: '#1a1a2e' }}>About Compensation & Terms</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Detailed financial structures, compensation formulas, and partnership terms are shared during the confidential interview process with qualified candidates. We believe in complete transparency with serious applicants—not public pricing that creates anchoring effects, reveals competitive information, or invites casual inquiries. If you're genuinely interested in partnership, we'll share everything during our conversations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Careers Section */}
      <section id="careers" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, transparent 50%, rgba(26, 26, 46, 0.05) 100%)' }}></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
              <svg className="w-5 h-5" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span className="text-sm font-bold" style={{ color: '#d4af37' }}>Join Our Team</span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6" style={{ color: '#1a1a2e' }}>
              Launch Your <span style={{ color: '#d4af37' }}>Career</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              We're hiring exceptional professionals across all functions. Remote-first culture, competitive compensation, 
              and the opportunity to shape specialized law from the ground up.
            </p>
          </div>

          {/* Career Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="career-benefit-card">
              <div className="career-icon-wrapper">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#1a1a2e' }}>100% Remote</h3>
              <p className="text-gray-600 leading-relaxed">
                Work from anywhere in the world. We're built for distributed teams from day one.
              </p>
            </div>

            <div className="career-benefit-card">
              <div className="career-icon-wrapper">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#1a1a2e' }}>Top-Tier Comp</h3>
              <p className="text-gray-600 leading-relaxed">
                Competitive salary packages, equity options, and comprehensive benefits.
              </p>
            </div>

            <div className="career-benefit-card">
              <div className="career-icon-wrapper">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#1a1a2e' }}>Rapid Growth</h3>
              <p className="text-gray-600 leading-relaxed">
                Build your career in a high-growth environment with real ownership opportunities.
              </p>
            </div>
          </div>

          {/* Open Roles */}
          <div className="rounded-3xl p-12 text-center text-white" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
            <h3 className="text-3xl font-bold mb-6">Open Positions</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 text-left">
              {[
                'Legal Associates',
                'Paralegals',
                'Practice Managers',
                'Client Success',
                'Business Development',
                'Legal Technology',
                'Operations',
                'Marketing & Content',
                'Financial Operations'
              ].map((role, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all">
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: '#d4af37' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{role}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/apply/careers"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg font-bold uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg"
                style={{ background: 'linear-gradient(90deg, #d4af37 0%, #f4d03f 100%)', color: '#1a1a2e' }}
              >
                <span>Apply Now</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      </div>
      <EnhancedFooter />
    </>
  );
}
