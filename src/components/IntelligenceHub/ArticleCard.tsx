import Link from 'next/link';
import Image from 'next/image';
import { SanityPost } from '@/types/sanity';
import { urlFor } from '@/lib/sanity/image';
import { formatDate } from '@/lib/sanity/queries';

interface ArticleCardProps {
  article: SanityPost;
  featured?: boolean;
  section?: 'perspectives' | 'newsroom';
}

export function ArticleCard({ article, featured = false, section = 'perspectives' }: ArticleCardProps) {
  const categoryTag = article.categories?.[0];
  const href = `/intelligence-hub/${section}/${article.slug.current}`;
  const imageUrl = article.image ? urlFor(article.image).width(800).height(500).url() : null;
  const authorImageUrl = article.author?.photo ? urlFor(article.author.photo).width(48).height(48).url() : null;
  
  if (featured) {
    return (
      <Link
        href={href}
        className="block bg-white rounded-xl overflow-hidden border-l-4 border-[#d4af37] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {imageUrl && (
            <div className="relative h-64 md:h-full">
              <Image
                src={imageUrl}
                alt={article.image?.alt || article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#d4af37] text-white">
                  Featured
                </span>
              </div>
            </div>
          )}
          <div className="p-8 flex flex-col justify-center">
            {categoryTag && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-4 bg-[#d4af37]/10 text-[#d4af37] w-fit">
                {categoryTag.title}
              </span>
            )}
            <h3 className="font-serif text-3xl font-bold mb-4 text-[#1a1a2e] leading-tight">
              {article.title}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
    >
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={article.image?.alt || article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        {categoryTag && (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-3 bg-[#d4af37]/10 text-[#d4af37]">
            {categoryTag.title}
          </span>
        )}
        <h3 className="font-serif text-xl font-bold mb-3 text-[#1a1a2e] leading-tight group-hover:text-[#d4af37] transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 text-sm">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {authorImageUrl && (
              <Image
                src={authorImageUrl}
                alt={article.author?.name || 'Author'}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span className="font-medium">{article.author?.name || 'Rivalis Law'}</span>
          </div>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}

