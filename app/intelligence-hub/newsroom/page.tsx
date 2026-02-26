'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Layout/Navigation';
import EnhancedFooter from '@/components/Layout/EnhancedFooter';
import { SearchBar } from '@/components/IntelligenceHub/SearchBar';
import { getArticlesByTag, formatDate } from '@/lib/hashnode';
import { HashnodeArticle } from '@/src/types/hashnode';

const filters = [
  { slug: 'all', name: 'All' },
  { slug: 'press', name: 'Press Mentions' },
  { slug: 'speaking', name: 'Speaking' },
  { slug: 'award', name: 'Awards' },
  { slug: 'publication', name: 'Publications' },
];

export default function NewsroomPage() {
  const [items, setItems] = useState<HashnodeArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    loadNewsroom();
  }, [activeFilter]);

  const loadNewsroom = async () => {
    setLoading(true);
    try {
      const tag = activeFilter === 'all' ? 'newsroom' : activeFilter;
      const articles = await getArticlesByTag(tag, 20);
      setItems(articles);
    } catch (error) {
      console.error('Failed to load newsroom:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group by year
  const itemsByYear = items.reduce((acc, item) => {
    const year = new Date(item.publishedAt).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {} as Record<string, HashnodeArticle[]>);

  const years = Object.keys(itemsByYear).sort((a, b) => parseInt(b) - parseInt(a));

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
              <span className="text-[#1a1a2e] font-medium">Newsroom</span>
            </nav>

            <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#1a1a2e] mb-6">
              <span style={{ color: '#d4af37' }}>Newsroom</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mb-8">
              Press mentions, speaking engagements, awards, and firm updates
            </p>

            <div className="max-w-2xl">
              <SearchBar placeholder="Search newsroom..." />
            </div>
          </div>
        </section>

        {/* Filters & Timeline */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-12">
              {filters.map((filter) => (
                <button
                  key={filter.slug}
                  onClick={() => setActiveFilter(filter.slug)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    activeFilter === filter.slug
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200 hover:border-[#d4af37]'
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>

            {/* Loading */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading newsroom...</p>
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-20">
                <svg className="w-24 h-24 mx-auto mb-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No newsroom items found</h3>
                <p className="text-gray-600">Try adjusting your filters or check back later.</p>
              </div>
            ) : (
              /* Timeline by Year */
              <div className="space-y-16">
                {years.map((year) => (
                  <div key={year}>
                    <div className="flex items-center gap-4 mb-8">
                      <h2 className="font-serif text-4xl font-bold text-[#d4af37]">{year}</h2>
                      <div className="flex-1 h-px bg-gradient-to-r from-[#d4af37]/50 to-transparent"></div>
                    </div>

                    <div className="space-y-6">
                      {itemsByYear[year].map((item, index) => (
                        <Link
                          key={item.id}
                          href={`/intelligence-hub/newsroom/${item.slug}`}
                          className="block bg-white rounded-lg p-6 border-l-4 border-[#d4af37] shadow-sm hover:shadow-lg transition-all group"
                        >
                          <div className="flex items-start gap-6">
                            <div className="flex-shrink-0">
                              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center">
                                {item.tags[0]?.slug === 'press' && (
                                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                    />
                                  </svg>
                                )}
                                {item.tags[0]?.slug === 'speaking' && (
                                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                                    />
                                  </svg>
                                )}
                                {item.tags[0]?.slug === 'award' && (
                                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                    />
                                  </svg>
                                )}
                                {(!item.tags[0] || !['press', 'speaking', 'award'].includes(item.tags[0].slug)) && (
                                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-sm font-medium text-[#d4af37]">
                                  {formatDate(item.publishedAt)}
                                </span>
                                {item.tags[0] && (
                                  <>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-sm text-gray-500 uppercase tracking-wide">
                                      {item.tags[0].name}
                                    </span>
                                  </>
                                )}
                              </div>
                              <h3 className="font-serif text-2xl font-bold text-[#1a1a2e] group-hover:text-[#d4af37] transition-colors mb-2">
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
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <EnhancedFooter />
    </>
  );
}
