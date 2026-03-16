'use client';

import { useRouter, usePathname } from 'next/navigation';

interface Category {
  slug: string;
  name: string;
}

interface CategoryFilterProps {
  activeCategory: string;
  categories: Category[];
}

export function CategoryFilter({ activeCategory, categories }: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSelect = (slug: string) => {
    const params = new URLSearchParams();
    if (slug !== 'all') params.set('category', slug);
    router.push(slug === 'all' ? pathname : `${pathname}?${params.toString()}`);
  };

  const allCategories = [{ slug: 'all', name: 'All' }, ...categories];

  return (
    <div className="flex flex-wrap gap-3 mb-12">
      {allCategories.map((category) => (
        <button
          key={category.slug}
          onClick={() => handleSelect(category.slug)}
          className={`px-6 py-3 rounded-full font-medium transition-all ${
            activeCategory === category.slug
              ? 'bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200 hover:border-[#d4af37]'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
