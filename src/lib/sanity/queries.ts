import { serverClient as sanityClient } from './client'
import type { SanityPost, SanityNewsroomItem, NewsroomItemType } from '@/types/sanity'

// ─────────────────────────────────────────────────────────────────────────────
// Utility
// ─────────────────────────────────────────────────────────────────────────────

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// Post (Perspectives) queries
// ─────────────────────────────────────────────────────────────────────────────

const POST_FIELDS = `
  _id,
  title,
  slug,
  excerpt,
  image { ..., asset-> },
  publishedAt,
  author-> { _id, name, slug, photo { ..., asset-> }, bio },
  categories[]-> { _id, title, slug },
  seo
`

/** All categories for the filter UI. */
export async function getCategories(): Promise<{ title: string; slug: string }[]> {
  const query = `*[_type == "category"] | order(title asc) { title, "slug": slug.current }`
  return sanityClient.fetch<{ title: string; slug: string }[]>(query, {}, { next: { revalidate: 60, tags: ['category'] } })
}

/**
 * Paginated list of posts, optionally filtered by category slug.
 * page is 1-indexed.
 */
export async function getPosts(
  first = 12,
  page = 1,
  category?: string
): Promise<SanityPost[]> {
  const offset = (page - 1) * first
  const categoryFilter =
    category && category !== 'all'
      ? `&& $category in categories[]->slug.current`
      : ''

  const query = `*[_type == "post" && defined(slug.current) ${categoryFilter}] | order(publishedAt desc) [${offset}...${offset + first}] { ${POST_FIELDS} }`
  return sanityClient.fetch<SanityPost[]>(query, { category: category ?? '' }, { next: { revalidate: 60, tags: ['post'] } })
}

/** Count posts for pagination (optionally by category). */
export async function getPostCount(category?: string): Promise<number> {
  const categoryFilter =
    category && category !== 'all'
      ? `&& $category in categories[]->slug.current`
      : ''
  const query = `count(*[_type == "post" && defined(slug.current) ${categoryFilter}])`
  return sanityClient.fetch<number>(query, { category: category ?? '' }, { next: { revalidate: 60, tags: ['post'] } })
}

/** Fetch a single post by slug. */
export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    ${POST_FIELDS},
    body[] {
      ...,
      _type == "bodyImage" => { ... },
      markDefs[] {
        ...,
      }
    }
  }`
  return sanityClient.fetch<SanityPost | null>(query, { slug }, { next: { revalidate: 300, tags: [`post:${slug}`] } })
}

/** Latest 3 posts for the hub landing page. */
export async function getFeaturedPosts(): Promise<SanityPost[]> {
  const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...3] { ${POST_FIELDS} }`
  return sanityClient.fetch<SanityPost[]>(query, {}, { next: { revalidate: 60, tags: ['post'] } })
}

/** Full-text search across title and Portable Text body. */
export async function searchPosts(searchQuery: string): Promise<SanityPost[]> {
  if (!searchQuery || searchQuery.trim().length < 2) return []
  const query = `*[_type == "post" && defined(slug.current) && (
    title match $q ||
    pt::text(body) match $q
  )] | order(publishedAt desc) [0...10] { ${POST_FIELDS} }`
  return sanityClient.fetch<SanityPost[]>(query, { q: `${searchQuery}*` }, { next: { revalidate: 60, tags: ['post'] } })
}

/** All post slugs for generateStaticParams. */
export async function getAllPostSlugs(): Promise<string[]> {
  const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { "slug": slug.current }`
  const results = await sanityClient.fetch<{ slug: string }[]>(query, {}, { next: { revalidate: 60, tags: ['post'] } })
  return results.map((r) => r.slug)
}

/** Related posts — same category, excluding current. */
export async function getRelatedPosts(
  currentSlug: string,
  categoryIds: string[],
  limit = 3
): Promise<SanityPost[]> {
  if (!categoryIds.length) {
    // Fallback: just return the latest posts
    const query = `*[_type == "post" && defined(slug.current) && slug.current != $currentSlug] | order(publishedAt desc) [0...${limit}] { ${POST_FIELDS} }`
    return sanityClient.fetch<SanityPost[]>(query, { currentSlug }, { next: { revalidate: 300, tags: ['post'] } })
  }
  const query = `*[_type == "post" && defined(slug.current) && slug.current != $currentSlug && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc) [0...${limit}] { ${POST_FIELDS} }`
  return sanityClient.fetch<SanityPost[]>(query, { currentSlug, categoryIds }, { next: { revalidate: 300, tags: ['post'] } })
}

// ─────────────────────────────────────────────────────────────────────────────
// Newsroom item queries
// ─────────────────────────────────────────────────────────────────────────────

const NEWSROOM_FIELDS = `
  _id,
  title,
  slug,
  excerpt,
  image { ..., asset-> },
  publishedAt,
  type,
  externalLink,
  location,
  author-> { _id, name, slug, photo { ..., asset-> }, bio },
  seo
`

/**
 * Paginated list of newsroom items, optionally filtered by type.
 */
export async function getNewsroomItems(
  type?: NewsroomItemType | 'all',
  first = 20,
  page = 1
): Promise<SanityNewsroomItem[]> {
  const offset = (page - 1) * first
  const typeFilter = type && type !== 'all' ? `&& type == $type` : ''
  const query = `*[_type == "newsroomItem" && defined(slug.current) ${typeFilter}] | order(publishedAt desc) [${offset}...${offset + first}] { ${NEWSROOM_FIELDS} }`
  return sanityClient.fetch<SanityNewsroomItem[]>(query, { type: type ?? '' }, { next: { revalidate: 60, tags: ['newsroomItem'] } })
}

/** Fetch a single newsroom item by slug. */
export async function getNewsroomItemBySlug(slug: string): Promise<SanityNewsroomItem | null> {
  const query = `*[_type == "newsroomItem" && slug.current == $slug][0] {
    ${NEWSROOM_FIELDS},
    body[] {
      ...,
      _type == "bodyImage" => { ... },
      markDefs[] { ... }
    }
  }`
  return sanityClient.fetch<SanityNewsroomItem | null>(query, { slug }, { next: { revalidate: 300, tags: [`newsroomItem:${slug}`] } })
}

/** All newsroom slugs for generateStaticParams. */
export async function getAllNewsroomSlugs(): Promise<string[]> {
  const query = `*[_type == "newsroomItem" && defined(slug.current)] | order(publishedAt desc) { "slug": slug.current }`
  const results = await sanityClient.fetch<{ slug: string }[]>(query, {}, { next: { revalidate: 60, tags: ['newsroomItem'] } })
  return results.map((r) => r.slug)
}
