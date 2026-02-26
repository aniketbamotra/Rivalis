import Link from 'next/link';
import { Metadata } from 'next';
import { Navigation } from '@/components/Layout/Navigation';
import EnhancedFooter from '@/components/Layout/EnhancedFooter';
import { SearchBar } from '@/components/IntelligenceHub/SearchBar';
import { ArticleCard } from '@/components/IntelligenceHub/ArticleCard';
import { NewsletterForm } from '@/components/IntelligenceHub/NewsletterForm';
import { getArticles, formatDate } from '@/lib/hashnode';

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: 'Intelligence Hub | Legal Insights & AI Compliance News | Rivalis Law',
  description: 'Expert legal perspectives on AI governance, immigration law, M&A transactions, and business law. Stay informed with in-depth analysis and actionable insights from Big 4 trained attorneys.',
  keywords: 'legal insights, AI governance news, immigration law updates, M&A legal analysis, business law perspectives, legal intelligence, attorney blog',
  openGraph: {
    title: 'Intelligence Hub | Legal Insights & AI Compliance News',
    description: 'Expert legal perspectives on AI governance, immigration law, and business transactions.',
    url: 'https://rivalislaw.com/intelligence-hub',
    siteName: 'Rivalis Law',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-images/intelligence-hub.jpg',
        width: 1200,
        height: 630,
        alt: 'Rivalis Law Intelligence Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Intelligence Hub | Legal Insights & AI Compliance News',
    description: 'Expert legal perspectives on AI governance, immigration law, and business transactions.',
    images: ['/og-images/intelligence-hub.jpg'],
  },
  alternates: {
    canonical: 'https://rivalislaw.com/intelligence-hub',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function IntelligenceHubPage() {
  // Fetch all articles once
  const allArticlesData = await getArticles(50);
  const allArticles = allArticlesData.edges.map(({ node }) => node);
  
  // Filter client-side
  const recentPerspectives = allArticles
    .filter(article => article.tags.some(t => t.slug.toLowerCase() === 'perspectives'))
    .slice(0, 6);
  
  const recentNewsroom = allArticles
    .filter(article => article.tags.some(t => t.slug.toLowerCase() === 'newsroom'))
    .slice(0, 4);
  


  const resources = [
    {
      title: 'AI Compliance Checklist',
      description: 'Step-by-step checklist for EU AI Act compliance covering risk classification, documentation, and ongoing obligations.',
      isPremium: false,
      href: '/resources/ai-compliance-checklist.pdf',
    },
    {
      title: 'Jurisdiction Comparison Matrix',
      description: 'Side-by-side comparison of AI regulations across 42 jurisdictions. Interactive spreadsheet with filtering and search.',
      isPremium: true,
      href: '/resources/jurisdiction-matrix',
    },
    {
      title: 'Model AI Ethics Board Charter',
      description: 'Template charter for establishing an AI governance committee, including roles, responsibilities, and decision frameworks.',
      isPremium: false,
      href: '/resources/ethics-board-charter.pdf',
    },
    {
      title: 'AI Vendor Agreement Template',
      description: 'Comprehensive vendor agreement for AI services covering liability, data rights, compliance obligations, and audit rights.',
      isPremium: true,
      href: '/resources/vendor-agreement',
    },
    {
      title: 'CRISPR Regulatory Roadmap',
      description: 'Visual guide to FDA approval pathways for gene editing therapies, from IND to BLA, with timelines and requirements.',
      isPremium: false,
      href: '/resources/crispr-roadmap.pdf',
    },
    {
      title: 'Algorithmic Impact Assessment Tool',
      description: 'Interactive tool for conducting algorithmic impact assessments required under EU AI Act and similar regulations.',
      isPremium: true,
      href: '/resources/impact-assessment',
    },
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#1a1a2e]">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 -left-4 w-96 h-96 bg-[#d4af37] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-96 h-96 bg-[#b8941f] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-96 h-96 bg-[#d4af37] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-40">
            <div className="text-center max-w-5xl mx-auto">
              <div
                className="inline-flex items-center gap-3 backdrop-blur-md border rounded-full px-6 py-3 mb-10 shadow-xl"
                style={{ 
                  background: 'rgba(212, 175, 55, 0.15)', 
                  borderColor: 'rgba(212, 175, 55, 0.3)',
                  boxShadow: '0 8px 32px rgba(212, 175, 55, 0.1)'
                }}
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#d4af37' }}></span>
                  <span className="relative inline-flex rounded-full h-3 w-3" style={{ background: '#d4af37' }}></span>
                </span>
                <span className="text-sm font-bold tracking-[0.2em] uppercase" style={{ color: '#d4af37' }}>
                  Intelligence Hub
                </span>
              </div>

              <h1 className="font-serif text-6xl md:text-8xl font-bold mb-8 leading-[1.1] text-white">
                Where{' '}
                <span className="inline-block bg-gradient-to-r from-[#d4af37] via-[#f4d483] to-[#d4af37] bg-clip-text text-transparent animate-gradient">
                  Legal Innovation
                </span>
                <br />Meets Insight
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-14 leading-relaxed max-w-3xl mx-auto">
                Cutting-edge perspectives on emerging technologies, regulatory developments, and the future of specialized law.
              </p>

              <div className="max-w-2xl mx-auto">
                <SearchBar placeholder="Search articles, insights, and resources..." />
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>
        </section>

        {/* Featured: AI Governance Framework - COMMENTED OUT FOR NOW */}
        {/* <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37] to-[#b8941f] rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              
              <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 md:p-16 border border-gray-200 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#d4af37]/5 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#b8941f]/5 to-transparent rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full mb-8 shadow-lg">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Featured
                  </div>
                  
                  <h2 className="font-serif text-4xl md:text-6xl font-bold text-[#1a1a2e] mb-6 leading-tight">
                    AI Governance Framework
                  </h2>
                  
                  <p className="text-xl md:text-2xl text-gray-700 mb-5 leading-relaxed font-medium">
                    The most comprehensive, living compliance resource for AI regulation. Updated within 48 hours of regulatory changes across 42 jurisdictions.
                  </p>
                  
                  <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                    Our flagship intelligence product combines automated monitoring of 100+ regulatory sources with expert analysis from practicing attorneys. See exactly what regulations apply to your AI use case, jurisdiction by jurisdiction.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <div className="group/card bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-[#d4af37] transition-all hover:shadow-xl hover:-translate-y-1">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center shadow-lg group-hover/card:scale-110 transition-transform">
                        <span className="text-2xl font-bold text-white">42</span>
                      </div>
                      <h4 className="font-bold text-[#1a1a2e] mb-2 text-center">Global Jurisdictions</h4>
                      <p className="text-sm text-gray-600 text-center leading-relaxed">EU, US states, UK, China, Canada, and more</p>
                    </div>
                    
                    <div className="group/card bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-[#d4af37] transition-all hover:shadow-xl hover:-translate-y-1">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center shadow-lg group-hover/card:scale-110 transition-transform">
                        <span className="text-2xl font-bold text-white">48h</span>
                      </div>
                      <h4 className="font-bold text-[#1a1a2e] mb-2 text-center">Update Speed</h4>
                      <p className="text-sm text-gray-600 text-center leading-relaxed">Regulatory changes reflected within 2 days</p>
                    </div>
                    
                    <div className="group/card bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-[#d4af37] transition-all hover:shadow-xl hover:-translate-y-1">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center shadow-lg group-hover/card:scale-110 transition-transform">
                        <span className="text-2xl font-bold text-white">50+</span>
                      </div>
                      <h4 className="font-bold text-[#1a1a2e] mb-2 text-center">Model Policies</h4>
                      <p className="text-sm text-gray-600 text-center leading-relaxed">Templates, contracts, assessment tools</p>
                    </div>
                    
                    <div className="group/card bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-[#d4af37] transition-all hover:shadow-xl hover:-translate-y-1">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center shadow-lg group-hover/card:scale-110 transition-transform">
                        <span className="text-2xl font-bold text-white">∞</span>
                      </div>
                      <h4 className="font-bold text-[#1a1a2e] mb-2 text-center">Living Document</h4>
                      <p className="text-sm text-gray-600 text-center leading-relaxed">Continuously updated, version-controlled</p>
                    </div>
                  </div>
                  
                  <Link
                    href="/framework"
                    className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-[#d4af37]/50 transition-all hover:scale-105 group/btn"
                  >
                    Explore Framework
                    <svg className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Perspectives Section */}
        <section className="py-24 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50 to-transparent"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
              <div>
                <div className="inline-block px-4 py-1.5 bg-[#d4af37]/10 text-[#d4af37] text-sm font-bold uppercase tracking-wider rounded-full mb-4">
                  Analysis
                </div>
                <h2 className="font-serif text-5xl md:text-6xl font-bold text-[#1a1a2e] mb-4">
                  <span className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] bg-clip-text text-transparent">Perspectives</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl">In-depth analysis of regulatory changes, case law developments, and emerging trends</p>
              </div>
              <Link
                href="/intelligence-hub/perspectives"
                className="hidden md:inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-[#d4af37]/30 transition-all hover:scale-105 group"
              >
                View All Articles
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {recentPerspectives.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-gray-200 shadow-lg">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1a1a2e] mb-3">No Articles Available</h3>
                <p className="text-gray-600 text-lg">Check back soon for new perspectives and insights.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPerspectives.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}

            <div className="mt-16 text-center md:hidden">
              <Link
                href="/intelligence-hub/perspectives"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white rounded-xl font-semibold"
              >
                View All Articles
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#d4af37]/5 to-transparent rounded-full blur-3xl"></div>
          
          {/* Coming Soon Overlay */}
          <div className="absolute inset-0 z-20 backdrop-blur-[2px] bg-white/40 flex items-center justify-center">
            <div className="relative max-w-2xl mx-auto px-6 py-16 text-center">
              {/* Decorative elements */}
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-[#d4af37]/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#b8941f]/20 rounded-full blur-2xl animate-pulse animation-delay-2000"></div>
              
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border-2 border-[#d4af37]/30">
                {/* Icon */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center shadow-xl">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#d4af37]/10 to-[#b8941f]/10 border border-[#d4af37]/30 rounded-full mb-4">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d4af37]"></span>
                  </span>
                  <span className="text-sm font-bold text-[#d4af37] uppercase tracking-wider">In Progress</span>
                </div>
                
                {/* Heading */}
                <h3 className="font-serif text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-4 leading-tight">
                  Coming Soon
                </h3>
                
                {/* Description */}
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We're curating an exceptional collection of practical tools, templates, and guides. Check back soon for premium resources to help navigate complex regulatory landscapes.
                </p>
                
                {/* Additional info */}
                <div className="inline-flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>Expected launch: Q2 2026</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 bg-[#d4af37]/10 text-[#d4af37] text-sm font-bold uppercase tracking-wider rounded-full mb-4">
                Tools & Templates
              </div>
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-[#1a1a2e] mb-6">
                <span className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] bg-clip-text text-transparent">Resources</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Practical tools, templates, and guides to help you navigate complex regulatory landscapes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map((resource, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#d4af37] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                >
                  {/* Hover glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#d4af37] to-[#b8941f] rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-300"></div>
                  
                  <div className="relative">
                    {resource.isPremium && (
                      <div className="absolute -top-4 -right-4 px-4 py-1.5 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Premium
                      </div>
                    )}
                    
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    
                    <h3 className="font-bold text-xl text-[#1a1a2e] mb-3 group-hover:text-[#d4af37] transition-colors leading-tight">
                      {resource.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed text-[15px]">{resource.description}</p>
                    
                    <a
                      href={resource.href}
                      className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#d4af37] text-[#d4af37] font-semibold rounded-xl hover:bg-[#d4af37] hover:text-white transition-all group-hover:shadow-lg"
                    >
                      {resource.isPremium ? 'Premium Only' : 'Download Free'}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsroom Section */}
        <section className="py-24 bg-white relative">
          <div className="relative max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
              <div>
                <div className="inline-block px-4 py-1.5 bg-[#d4af37]/10 text-[#d4af37] text-sm font-bold uppercase tracking-wider rounded-full mb-4">
                  In the Media
                </div>
                <h2 className="font-serif text-5xl md:text-6xl font-bold text-[#1a1a2e] mb-4">
                  <span className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] bg-clip-text text-transparent">Newsroom</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl">Latest press mentions, speaking engagements, and firm updates</p>
              </div>
              <Link
                href="/intelligence-hub/newsroom"
                className="hidden md:inline-flex items-center gap-2 px-8 py-4 border-2 border-[#d4af37] text-[#d4af37] rounded-xl font-semibold hover:bg-[#d4af37] hover:text-white transition-all hover:scale-105 group"
              >
                View All News
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {recentNewsroom.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-gray-200 shadow-lg">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1a1a2e] mb-3">No News Available</h3>
                <p className="text-gray-600 text-lg">Check back soon for press mentions and firm updates.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {recentNewsroom.map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/intelligence-hub/newsroom/${item.slug}`}
                    className="block bg-white rounded-2xl p-8 border border-gray-200 hover:border-[#d4af37] shadow-sm hover:shadow-xl transition-all group"
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <span className="text-white font-bold text-xl">{index + 1}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-sm font-semibold text-[#d4af37]">
                            {formatDate(item.publishedAt)}
                          </span>
                          {item.tags[0] && (
                            <>
                              <span className="text-gray-300">•</span>
                              <span className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                                {item.tags[0].name}
                              </span>
                            </>
                          )}
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-[#1a1a2e] group-hover:text-[#d4af37] transition-colors mb-3 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed line-clamp-2">{item.brief}</p>
                      </div>
                      <svg
                        className="w-6 h-6 text-gray-400 group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-16 text-center md:hidden">
              <Link
                href="/intelligence-hub/newsroom"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#d4af37] text-[#d4af37] rounded-xl font-semibold"
              >
                View All News
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section
          style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}
          className="py-20 text-white"
        >
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Stay <span style={{ color: '#d4af37' }}>Informed</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Get weekly insights on emerging technologies, regulatory changes, and the future of specialized law delivered to your inbox.
            </p>
            
            <NewsletterForm />
          </div>
        </section>
      </div>
      <EnhancedFooter />
    </>
  );
}
