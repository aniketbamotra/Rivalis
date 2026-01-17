'use client';

import { useState } from 'react';
import Link from 'next/link';
import './styles.css';
import { intelligenceArticles } from '../data/intelligence-articles';
import { intelligenceResources } from '../data/intelligence-resources';
import { newsroomItems } from '../data/intelligence-newsroom';
import { Navigation } from '@/components/Layout/Navigation';
import EnhancedFooter from '@/components/Layout/EnhancedFooter';

const categories = ['All', 'AI Governance', 'Space Law', 'CRISPR Law', 'Quantum Computing', 'Corporate Immigration', 'Blockchain Law'];

export default function IntelligenceHubPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [newsletter, setNewsletter] = useState({ email: '', loading: false, submitted: false, error: '' });

  const filteredArticles = activeFilter === 'All'
    ? intelligenceArticles
    : intelligenceArticles.filter(article => article.category === activeFilter);

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewsletter(prev => ({ ...prev, loading: true, error: '' }));

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletter.email }),
      });

      if (response.ok) {
        setNewsletter({ email: '', loading: false, submitted: true, error: '' });
        setTimeout(() => setNewsletter(prev => ({ ...prev, submitted: false })), 5000);
      } else {
        const error = await response.json();
        setNewsletter(prev => ({ ...prev, loading: false, error: error.error || 'Failed to subscribe' }));
      }
    } catch (error) {
      console.error('Newsletter error:', error);
      setNewsletter(prev => ({ ...prev, loading: false, error: 'An error occurred. Please try again.' }));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 hero-mesh-pattern"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-sm font-semibold text-white tracking-wide">
                Intelligence Hub
              </span>
            </div>
            
            <h1 className="hero-title text-white mb-6">
              Frontier Legal Intelligence
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
                Redefining Tomorrow
              </span>
            </h1>
            
            <p className="hero-description text-gray-100 max-w-3xl mx-auto mb-10">
              Navigate the future of law with real-time intelligence on emerging regulations, 
              breakthrough case law, and strategic insights from the world's leading frontier legal specialists.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#subscribe"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span>Get Started Free</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#perspectives"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <span>Explore Insights</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-amber-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-amber-400/20 rounded-full blur-3xl animate-float-delayed"></div>
      </section>

      {/* Featured: AI Governance Framework */}
      <section className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="featured-spotlight relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-12 lg:p-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }}></div>
            </div>
            
            {/* Gradient Orbs */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 mb-6">
                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-bold text-amber-300 tracking-wide uppercase">Featured Framework</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                AI Governance <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                  Compliance Engine
                </span>
              </h2>
              
              <p className="text-xl text-gray-100 mb-10 max-w-3xl leading-relaxed">
                The world's most comprehensive living compliance resource for AI regulation. 
                Real-time updates within 48 hours of regulatory changes across 42 jurisdictions.
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="featured-stat-card group">
                  <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-amber-600 mb-2">
                    42
                  </div>
                  <p className="text-sm font-semibold text-gray-200 uppercase tracking-wide">Jurisdictions</p>
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <div className="featured-stat-card group">
                  <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-emerald-600 mb-2">
                    48h
                  </div>
                  <p className="text-sm font-semibold text-gray-200 uppercase tracking-wide">Update Speed</p>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <div className="featured-stat-card group">
                  <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-amber-600 mb-2">
                    50+
                  </div>
                  <p className="text-sm font-semibold text-gray-200 uppercase tracking-wide">Model Policies</p>
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <div className="featured-stat-card group">
                  <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-amber-600 mb-2">
                    ∞
                  </div>
                  <p className="text-sm font-semibold text-gray-200 uppercase tracking-wide">Living Updates</p>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>

              <a
                href="/intelligence-hub/framework"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-900 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span>Explore Framework</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Perspectives (Blog) */}
      <section id="perspectives" className="py-20 md:py-32 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-200 mb-6">
              <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-bold text-amber-900 uppercase tracking-wide">Expert Analysis</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Legal Perspectives
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              In-depth analysis of regulatory changes, case law developments, and emerging trends 
              in frontier legal practice areas from our team of specialists.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`filter-btn-modern ${activeFilter === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <article
                key={article.id}
                className="article-card-modern group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="article-image-container">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white/20" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                  </div>
                  <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md border border-white/30 text-white uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>
                
                <div className="p-6 flex flex-col flex-grow bg-white">
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{article.date}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-amber-600 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
                    {article.excerpt}
                  </p>
                  
                  <a
                    href={`/intelligence-hub/perspectives/${article.slug}`}
                    className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold group/link"
                  >
                    <span>Read Article</span>
                    <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-200 mb-6">
              <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              <span className="text-sm font-bold text-amber-900 uppercase tracking-wide">Tools & Templates</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Practice Resources
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Practical tools, templates, and comprehensive guides to help you navigate 
              complex regulatory landscapes with confidence and precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {intelligenceResources.map((resource, index) => (
              <div
                key={resource.id}
                className="resource-card-modern group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {resource.isPremium && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                      Premium
                    </div>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                <div className="relative z-10 p-8">
                  <div className="resource-icon-modern mb-6 text-5xl">
                    {resource.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                    {resource.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {resource.description}
                  </p>
                  
                  <a
                    href={`/intelligence-hub/resources/${resource.slug}`}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                      resource.isPremium
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                        : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                    }`}
                  >
                    <span>{resource.isPremium ? 'Get Premium Access' : 'Download Free'}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsroom */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-200 mb-6">
              <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
              </svg>
              <span className="text-sm font-bold text-amber-900 uppercase tracking-wide">In The Media</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Newsroom
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Press mentions, speaking engagements, and firm announcements from our team of frontier legal experts.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {newsroomItems.map((item, index) => (
              <div 
                key={item.id} 
                className="newsroom-item-modern group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="newsroom-date-badge">
                      <div className="text-3xl font-bold text-slate-900">
                        {item.date.split(' ')[0]}
                      </div>
                      <div className="text-sm font-semibold text-slate-600 uppercase">
                        {item.date.split(' ')[1]}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </h4>
                    
                    <p className="text-slate-600 leading-relaxed mb-4">
                      {item.description}
                    </p>
                    
                    <a
                      href={item.link}
                      className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold group/link"
                    >
                      <span>Read Full Story</span>
                      <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section id="subscribe" className="newsletter-section-modern relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse-slower"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-sm font-semibold text-white tracking-wide">
                Free Intelligence Briefings
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Stay Ahead of the Curve
            </h2>
            
            <p className="text-xl text-gray-100 mb-10 leading-relaxed max-w-2xl mx-auto">
              Get the latest regulatory changes, case law updates, and frontier legal analysis 
              delivered to your inbox every Monday and Thursday.
            </p>

            {newsletter.submitted ? (
              <div className="success-message-modern max-w-md mx-auto mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white">Successfully Subscribed!</p>
                    <p className="text-sm text-gray-200">Check your email to confirm your subscription.</p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="max-w-2xl mx-auto mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={newsletter.email}
                    onChange={e => setNewsletter(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-md border-2 border-white/20 text-white placeholder-gray-300 focus:border-white/40 focus:bg-white/15 focus:outline-none transition-all"
                  />
                  <button
                    type="submit"
                    disabled={newsletter.loading}
                    className="group px-8 py-4 bg-white hover:bg-blue-50 text-slate-900 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
                  >
                    <span className="flex items-center gap-2">
                      {newsletter.loading ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe Now</span>
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </div>
                {newsletter.error && (
                  <p className="mt-4 text-red-300 text-sm font-medium">{newsletter.error}</p>
                )}
              </form>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">2,000+ subscribers</span>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Unsubscribe anytime</span>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">No spam, ever</span>
              </div>
            </div>
            
            <p className="mt-8 text-blue-200">
              Want full access to all resources?{' '}
              <a href="/intelligence-hub/premium" className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-4">
                Upgrade to Premium
              </a>
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <EnhancedFooter />
    </div>
  );
}
