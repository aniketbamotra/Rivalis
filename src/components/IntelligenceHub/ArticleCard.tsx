import Link from 'next/link';
import { HashnodeArticle } from '@/types/hashnode';
import { formatDate } from '@/lib/hashnode';

interface ArticleCardProps {
  article: HashnodeArticle;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const categoryTag = article.tags[0];
  
  if (featured) {
    return (
      <Link
        href={`/intelligence-hub/perspectives/${article.slug}`}
        className="block bg-white rounded-xl overflow-hidden border-l-4 border-[#d4af37] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {article.coverImage && (
            <div className="relative h-64 md:h-full">
              <img
                src={article.coverImage.url}
                alt={article.title}
                className="w-full h-full object-cover"
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
                {categoryTag.name}
              </span>
            )}
            <h3 className="font-serif text-3xl font-bold mb-4 text-[#1a1a2e] leading-tight">
              {article.title}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
              {article.brief}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{formatDate(article.publishedAt)}</span>
              <span>•</span>
              <span>{article.readTimeInMinutes} min read</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/intelligence-hub/perspectives/${article.slug}`}
      className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
    >
      {article.coverImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.coverImage.url}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        {categoryTag && (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-3 bg-[#d4af37]/10 text-[#d4af37]">
            {categoryTag.name}
          </span>
        )}
        <h3 className="font-serif text-xl font-bold mb-3 text-[#1a1a2e] leading-tight group-hover:text-[#d4af37] transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 text-sm">
          {article.brief}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {article.author.profilePicture && (
              <img
                src={article.author.profilePicture}
                alt={article.author.name}
                className="w-6 h-6 rounded-full"
              />
            )}
            <span className="font-medium">{article.author.name}</span>
          </div>
          <span>{article.readTimeInMinutes} min read</span>
        </div>
      </div>
    </Link>
  );
}
