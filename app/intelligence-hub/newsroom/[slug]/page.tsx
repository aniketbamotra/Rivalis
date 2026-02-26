import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import { Navigation } from '@/components/Layout/Navigation';
import EnhancedFooter from '@/components/Layout/EnhancedFooter';
import { getArticleBySlug, formatDate } from '@/lib/hashnode';
import { getArticleSchema, getBreadcrumbSchema, renderStructuredData } from '@/lib/structuredData';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const item = await getArticleBySlug(params.slug);

  if (!item) {
    return {
      title: 'Article Not Found | Rivalis Law',
    };
  }

  const description = item.brief || item.subtitle || `Read ${item.title} on Rivalis Law Intelligence Hub`;
  const imageUrl = item.coverImage?.url || '/og-images/default-article.jpg';

  return {
    title: `${item.title} | Newsroom | Rivalis Law`,
    description: description.slice(0, 160),
    keywords: item.tags.map(tag => tag.name).join(', ') + ', legal news, law firm updates, legal insights',
    openGraph: {
      title: item.title,
      description: description.slice(0, 160),
      url: `https://rivalislaw.com/intelligence-hub/newsroom/${params.slug}`,
      siteName: 'Rivalis Law',
      type: 'article',
      publishedTime: item.publishedAt,
      authors: ['Rivalis Law'],
      tags: item.tags.map(tag => tag.name),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description: description.slice(0, 160),
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://rivalislaw.com/intelligence-hub/newsroom/${params.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function NewsroomDetailPage({ params }: { params: { slug: string } }) {
  const item = await getArticleBySlug(params.slug);

  if (!item) {
    notFound();
  }

  // Generate structured data
  const articleSchema = getArticleSchema({
    headline: item.title,
    description: item.brief || item.subtitle || item.title,
    url: `https://rivalislaw.com/intelligence-hub/newsroom/${params.slug}`,
    image: item.coverImage?.url,
    datePublished: item.publishedAt,
    author: 'Rivalis Law',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://rivalislaw.com' },
    { name: 'Intelligence Hub', url: 'https://rivalislaw.com/intelligence-hub' },
    { name: 'Newsroom', url: 'https://rivalislaw.com/intelligence-hub/newsroom' },
    { name: item.title },
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
              <Link href="/intelligence-hub/newsroom" className="text-gray-500 hover:text-[#d4af37] transition-colors">
                Newsroom
              </Link>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-[#1a1a2e] font-medium line-clamp-1">{item.title}</span>
            </nav>

            {/* Category Badge */}
            {item.tags[0] && (
              <div className="mb-6">
                <span className="inline-block px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider bg-[#d4af37]/10 text-[#d4af37]">
                  {item.tags[0].name}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#1a1a2e] mb-6 leading-tight">
              {item.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-4 pb-8 border-b border-gray-200 mb-12">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-[#1a1a2e]">{formatDate(item.publishedAt)}</div>
                <div className="text-sm text-gray-500">{item.tags[0]?.name || 'Newsroom'}</div>
              </div>
            </div>

            {/* Cover Image */}
            {item.coverImage && (
              <div className="mb-12 rounded-xl overflow-hidden">
                <img
                  src={item.coverImage.url}
                  alt={item.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Content */}
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
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#d4af37] hover:text-[#b8941f] transition-colors underline inline-flex items-center gap-1"
                    >
                      {children}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
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
                }}
              >
                {item.content.markdown}
              </ReactMarkdown>
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="font-bold text-[#1a1a2e] mb-4">Share this news</h3>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(item.title)}&url=${encodeURIComponent(`https://rivalislaw.com/intelligence-hub/newsroom/${item.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#d4af37] hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://rivalislaw.com/intelligence-hub/newsroom/${item.slug}`)}`}
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

            {/* Back to Newsroom */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link
                href="/intelligence-hub/newsroom"
                className="inline-flex items-center gap-2 text-[#d4af37] font-semibold hover:text-[#b8941f] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Newsroom
              </Link>
            </div>
          </div>
        </article>
      </div>
      <EnhancedFooter />
    </>
  );
}
