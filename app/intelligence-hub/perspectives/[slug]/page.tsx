import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import { Navigation } from '@/components/Layout/Navigation';
import EnhancedFooter from '@/components/Layout/EnhancedFooter';
import { ArticleCard } from '@/components/IntelligenceHub/ArticleCard';
import { getArticleBySlug, getRelatedArticles, formatDate, getAllArticleSlugs } from '@/lib/hashnode';
import { getArticleSchema, getBreadcrumbSchema, renderStructuredData } from '@/lib/structuredData';

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.slice(0, 20).map((slug) => ({ slug })); // Pre-render first 20 articles
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Article Not Found | Rivalis Law',
    };
  }

  const description = article.brief || article.subtitle || `Read ${article.title} on Rivalis Law Intelligence Hub`;
  const imageUrl = article.coverImage?.url || '/og-images/default-article.jpg';

  return {
    title: `${article.title} | Perspectives | Rivalis Law`,
    description: description.slice(0, 160),
    keywords: article.tags.map(tag => tag.name).join(', ') + ', legal perspectives, attorney insights, legal analysis',
    openGraph: {
      title: article.title,
      description: description.slice(0, 160),
      url: `https://rivalislaw.com/intelligence-hub/perspectives/${params.slug}`,
      siteName: 'Rivalis Law',
      type: 'article',
      publishedTime: article.publishedAt,
      authors: ['Rivalis Law'],
      tags: article.tags.map(tag => tag.name),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: description.slice(0, 160),
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://rivalislaw.com/intelligence-hub/perspectives/${params.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(
    article.slug,
    article.tags.map(t => t.slug),
    3
  );

  // Generate structured data
  const articleSchema = getArticleSchema({
    headline: article.title,
    description: article.brief || article.subtitle || article.title,
    url: `https://rivalislaw.com/intelligence-hub/perspectives/${params.slug}`,
    image: article.coverImage?.url,
    datePublished: article.publishedAt,
    author: 'Rivalis Law',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://rivalislaw.com' },
    { name: 'Intelligence Hub', url: 'https://rivalislaw.com/intelligence-hub' },
    { name: 'Perspectives', url: 'https://rivalislaw.com/intelligence-hub/perspectives' },
    { name: article.title },
  ]);

  return (
    <>
      {renderStructuredData(articleSchema)}
      {renderStructuredData(breadcrumbSchema)}
      <Navigation />
      <div className="min-h-screen bg-white">
        {/* Article Header */}
        <article className="py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-8">
              <Link href="/intelligence-hub" className="text-gray-500 hover:text-[#d4af37] transition-colors">
                Intelligence Hub
              </Link>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/intelligence-hub/perspectives" className="text-gray-500 hover:text-[#d4af37] transition-colors">
                Perspectives
              </Link>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-[#1a1a2e] font-medium line-clamp-1">{article.title}</span>
            </nav>

            {/* Category Badge */}
            {article.tags[0] && (
              <div className="mb-6">
                <span className="inline-block px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider bg-[#d4af37]/10 text-[#d4af37]">
                  {article.tags[0].name}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#1a1a2e] mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-6 pb-8 border-b border-gray-200 mb-12">
              <div className="flex items-center gap-3">
                {article.author.profilePicture && (
                  <img
                    src={article.author.profilePicture}
                    alt={article.author.name}
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <div>
                  <div className="font-semibold text-[#1a1a2e]">{article.author.name}</div>
                  <div className="text-sm text-gray-500">
                    {formatDate(article.publishedAt)} · {article.readTimeInMinutes} min read
                  </div>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            {article.coverImage && (
              <div className="mb-12 rounded-xl overflow-hidden">
                <img
                  src={article.coverImage.url}
                  alt={article.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="font-serif text-3xl font-bold text-[#1a1a2e] mt-12 mb-6">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="font-serif text-2xl font-bold text-[#1a1a2e] mt-10 mb-4">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-serif text-xl font-bold text-[#1a1a2e] mt-8 mb-3">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 leading-relaxed mb-6">{children}</p>
                  ),
                  a: ({ href, children }) => (
                    <a href={href} className="text-[#d4af37] hover:text-[#b8941f] transition-colors underline">
                      {children}
                    </a>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700">{children}</ol>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-[#d4af37] pl-6 py-4 my-8 italic text-gray-700 bg-gray-50 rounded-r-lg">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-100 text-[#1a1a2e] px-2 py-1 rounded text-sm font-mono">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-[#1a1a2e] text-gray-100 p-6 rounded-lg overflow-x-auto my-8">
                      {children}
                    </pre>
                  ),
                }}
              >
                {article.content.markdown}
              </ReactMarkdown>
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-3">
                  {article.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-[#d4af37]/10 hover:text-[#d4af37] transition-colors"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-bold text-[#1a1a2e] mb-4">Share this article</h3>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://rivalislaw.com/intelligence-hub/perspectives/${article.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#d4af37] hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://rivalislaw.com/intelligence-hub/perspectives/${article.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#d4af37] hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <h2 className="font-serif text-4xl font-bold text-[#1a1a2e] mb-12">
                You May Also <span style={{ color: '#d4af37' }}>Like</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section
          style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}
          className="py-16 text-white"
        >
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Stay <span style={{ color: '#d4af37' }}>Informed</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Get weekly insights delivered to your inbox
            </p>
            <div className="max-w-md mx-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
      <EnhancedFooter />
    </>
  );
}
