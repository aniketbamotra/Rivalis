'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Layout/Navigation';
import EnhancedFooter from '@/components/Layout/EnhancedFooter';
import { SearchBar } from '@/components/IntelligenceHub/SearchBar';
import { ArticleCard } from '@/components/IntelligenceHub/ArticleCard';
import { getArticles } from '@/lib/hashnode';
import { HashnodeArticle } from '@/src/types/hashnode';

const categories = [
  { slug: 'all', name: 'All' },
  { slug: 'regulatory', name: 'Regulatory' },
  { slug: 'case-law', name: 'Case Law' },
  { slug: 'industry', name: 'Industry' },
  { slug: 'technology', name: 'Technology' },
];

export default function PerspectivesPage() {
  const [articles, setArticles] = useState<HashnodeArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState<string | undefined>();

  useEffect(() => {
    loadArticles();
  }, [activeFilter]);

  const loadArticles = async (loadMore = false) => {
    setLoading(true);
    try {
      const tag = activeFilter === 'all' ? 'perspectives' : activeFilter;
      const result = await getArticles(12, loadMore ? cursor : undefined, tag);
      
      if (loadMore) {
        setArticles(prev => [...prev, ...result.edges.map(({ node }) => node)]);
      } else {
        setArticles(result.edges.map(({ node }) => node));
      }
      
      setHasMore(result.pageInfo.hasNextPage);
      setCursor(result.pageInfo.endCursor);
    } catch (error) {
      console.error('Failed to load articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-8">
              <Link href="/intelligence-hub" className="text-gray-500 hover:text-[#d4af37] transition-colors">
                Intelligence Hub
              </Link>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-[#1a1a2e] font-medium">Perspectives</span>
            </nav>

            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#1a1a2e] mb-6">
              Legal <span style={{ color: '#d4af37' }}>Perspectives</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mb-8">
              In-depth analysis and expert commentary on emerging legal technologies and regulations
            </p>

            <div className="max-w-2xl">
              <SearchBar placeholder="Search perspectives..." />
            </div>
          </div>
        </section>

        {/* Filters & Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setActiveFilter(category.slug)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    activeFilter === category.slug
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200 hover:border-[#d4af37]'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            {loading && articles.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading perspectives...</p>
                </div>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-20">
                <svg className="w-24 h-24 mx-auto mb-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600">Try adjusting your filters or check back later for new content.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>

                {/* Load More */}
                {hasMore && (
                  <div className="text-center">
                    <button
                      onClick={() => loadArticles(true)}
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#d4af37]/30 transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <span>Load More Articles</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
      <EnhancedFooter />
    </>
  );
}
