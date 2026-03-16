'use client';

import { useRouter, usePathname } from 'next/navigation';

const filters = [
  { slug: 'all', name: 'All' },
  { slug: 'press', name: 'Press Mentions' },
  { slug: 'speaking', name: 'Speaking' },
  { slug: 'award', name: 'Awards' },
  { slug: 'publication', name: 'Publications' },
];

interface NewsroomFilterProps {
  activeType: string;
}

export function NewsroomFilter({ activeType }: NewsroomFilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSelect = (slug: string) => {
    const params = new URLSearchParams();
    if (slug !== 'all') params.set('type', slug);
    router.push(slug === 'all' ? pathname : `${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-12">
      {filters.map((filter) => (
        <button
          key={filter.slug}
          onClick={() => handleSelect(filter.slug)}
          className={`px-6 py-3 rounded-full font-medium transition-all ${
            activeType === filter.slug
              ? 'bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200 hover:border-[#d4af37]'
          }`}
        >
          {filter.name}
        </button>
      ))}
    </div>
  );
}
