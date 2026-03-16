import Link from 'next/link';
import { Navigation } from '@/components/Layout/Navigation';
import EnhancedFooter from '@/components/Layout/EnhancedFooter';
import { SearchBar } from '@/components/IntelligenceHub/SearchBar';
import { ArticleCard } from '@/components/IntelligenceHub/ArticleCard';
import { CategoryFilter } from '@/components/IntelligenceHub/CategoryFilter';
import { getPosts, getCategories } from '@/lib/sanity/queries';

export const revalidate = 60;

interface PerspectivesPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function PerspectivesPage({ searchParams }: PerspectivesPageProps) {
  const { category } = await searchParams;
  const activeCategory = category || 'all';
  const [articles, categories] = await Promise.all([
    getPosts(12, 1, activeCategory),
    getCategories(),
  ]);

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
            <CategoryFilter activeCategory={activeCategory} categories={categories.map(c => ({ slug: c.slug, name: c.title }))} />

            {articles.length === 0 ? (
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <ArticleCard key={article._id} article={article} section="perspectives" />
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
