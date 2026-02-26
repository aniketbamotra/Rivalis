'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { searchArticles } from '@/lib/hashnode';
import type { HashnodeArticle } from '@/types/hashnode';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export function SearchBar({ placeholder = 'Search articles...', className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<HashnodeArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const delaySearch = setTimeout(async () => {
      setIsLoading(true);
      try {
        const searchResults = await searchArticles(query);
        setResults(searchResults);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [query]);

  const handleResultClick = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setShowResults(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#d4af37] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20 transition-all"
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Results Dropdown */}
      {showResults && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
          <div className="p-2">
            {results.slice(0, 5).map((article) => (
              <Link
                key={article.id}
                href={`/intelligence-hub/perspectives/${article.slug}`}
                onClick={handleResultClick}
                className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  {article.coverImage && (
                    <img
                      src={article.coverImage.url}
                      alt={article.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 group-hover:text-[#d4af37] line-clamp-1 transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                      {article.brief}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      {article.tags[0] && (
                        <span className="text-xs font-medium text-[#d4af37]">
                          {article.tags[0].name}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {article.readTimeInMinutes} min read
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {results.length > 5 && (
            <div className="border-t border-gray-200 p-3 text-center">
              <button
                onClick={handleResultClick}
                className="text-sm font-medium text-[#d4af37] hover:text-[#b8941f] transition-colors"
              >
                View all {results.length} results →
              </button>
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {showResults && query.trim().length >= 2 && results.length === 0 && !isLoading && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-6 text-center">
          <svg
            className="w-12 h-12 mx-auto mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-600">No articles found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
