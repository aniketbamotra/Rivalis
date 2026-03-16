import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Navigation } from '@/components/Layout/Navigation';
import EnhancedFooter from '@/components/Layout/EnhancedFooter';
import { getNewsroomItemBySlug, getAllNewsroomSlugs, formatDate } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import { getArticleSchema, getBreadcrumbSchema, renderStructuredData } from '@/lib/structuredData';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllNewsroomSlugs();
  return slugs.slice(0, 20).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsroomItemBySlug(slug);

  if (!item) {
    return {
      title: 'Not Found | Rivalis Law',
    };
  }

  const description = item.excerpt || `Read ${item.title} on Rivalis Law Newsroom`;
  const imageUrl = item.image ? urlFor(item.image).width(1200).height(630).url() : '/og-images/default-article.jpg';

  return {
    title: `${item.title} | Newsroom | Rivalis Law`,
    description: description.slice(0, 160),
    keywords: `${item.type}, legal news, law firm updates, legal insights`,
    openGraph: {
      title: item.title,
      description: description.slice(0, 160),
      url: `https://rivalislaw.com/intelligence-hub/newsroom/${slug}`,
      siteName: 'Rivalis Law',
      type: 'article',
      publishedTime: item.publishedAt,
      authors: ['Rivalis Law'],
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
      canonical: `https://rivalislaw.com/intelligence-hub/newsroom/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const portableTextComponents: PortableTextComponents = {
  types: {
    bodyImage: ({ value }) => {
      if (!value?.asset?.asset?._ref) return null;
      const src = urlFor(value.asset).width(900).url();
      return (
        <div className="my-8 rounded-xl overflow-hidden">
          <Image
            src={src}
            alt={value.alt || ''}
            width={900}
            height={500}
            className="w-full h-auto"
          />
          {value.caption && (
            <p className="text-center text-sm text-gray-500 mt-2 italic">{value.caption}</p>
          )}
        </div>
      );
    },
    code: ({ value }) => (
      <div className="my-8">
        <SyntaxHighlighter language={value.language || 'text'} style={atomOneDark} className="rounded-lg">
          {value.code}
        </SyntaxHighlighter>
      </div>
    ),
  },
  block: {
    h1: ({ children }) => <h1 className="font-serif text-3xl font-bold text-[#1a1a2e] mt-12 mb-6">{children}</h1>,
    h2: ({ children }) => <h2 className="font-serif text-2xl font-bold text-[#1a1a2e] mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="font-serif text-xl font-bold text-[#1a1a2e] mt-8 mb-3">{children}</h3>,
    normal: ({ children }) => <p className="text-gray-700 leading-relaxed mb-6">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#d4af37] pl-6 py-4 my-8 italic text-gray-700 bg-gray-50 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#d4af37] hover:text-[#b8941f] transition-colors underline"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-bold text-[#1a1a2e]">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 text-[#1a1a2e] px-2 py-1 rounded text-sm font-mono">{children}</code>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700">{children}</ol>,
  },
};

const typeLabels: Record<string, string> = {
  press: 'Press',
  speaking: 'Speaking Engagement',
  award: 'Award',
  publication: 'Publication',
};

export default async function NewsroomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getNewsroomItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const imageUrl = item.image ? urlFor(item.image).width(1200).height(630).url() : undefined;

  // Generate structured data
  const articleSchema = getArticleSchema({
    headline: item.title,
    description: item.excerpt || item.title,
    url: `https://rivalislaw.com/intelligence-hub/newsroom/${slug}`,
    image: imageUrl,
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

            {/* Type Badge */}
            {item.type && (
              <div className="mb-6">
                <span className="inline-block px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider bg-[#d4af37]/10 text-[#d4af37]">
                  {typeLabels[item.type as keyof typeof typeLabels] || item.type}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#1a1a2e] mb-6 leading-tight">
              {item.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 pb-8 border-b border-gray-200 mb-12">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-[#1a1a2e]">{formatDate(item.publishedAt)}</div>
                  <div className="text-sm text-gray-500">{item.type ? typeLabels[item.type] : 'Newsroom'}</div>
                </div>
              </div>
              {item.location && (
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">{item.location}</span>
                </div>
              )}
            </div>

            {/* Cover Image */}
            {item.image && (
              <div className="mb-12 rounded-xl overflow-hidden">
                <Image
                  src={urlFor(item.image).width(900).height(500).url()}
                  alt={item.title}
                  width={900}
                  height={500}
                  className="w-full h-auto"
                  priority
                />
              </div>
            )}

            {/* External Link */}
            {item.externalLink && (
              <div className="mb-8">
                <a
                  href={item.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  Read Full Article
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}

            {/* Content */}
            {item.body && (
              <div className="prose prose-lg max-w-none">
                <PortableText value={item.body} components={portableTextComponents} />
              </div>
            )}

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="font-bold text-[#1a1a2e] mb-4">Share this news</h3>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(item.title)}&url=${encodeURIComponent(`https://rivalislaw.com/intelligence-hub/newsroom/${item.slug.current}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#d4af37] hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://rivalislaw.com/intelligence-hub/newsroom/${item.slug.current}`)}`}
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
