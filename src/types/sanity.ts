import type { PortableTextBlock } from '@portabletext/types'

export interface SanitySlug {
  current: string
}

export interface SanityReference {
  _ref: string
  _type: 'reference'
}

export interface SanityImageAsset {
  _ref: string
  _type: 'reference'
}

export interface SanityImage {
  _type: 'image'
  asset: SanityImageAsset
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  alt?: string
  caption?: string
}

export interface SanityAuthor {
  _id: string
  name: string
  slug: SanitySlug
  photo?: SanityImage
  bio?: string
  twitter?: string
  linkedin?: string
}

export interface SanityCategory {
  _id: string
  title: string
  slug: SanitySlug
  description?: string
}

export interface SanitySEO {
  metaTitle?: string
  metaDescription?: string
  ogImage?: SanityImage
  noIndex?: boolean
}

export interface SanityPost {
  _id: string
  _type: 'post'
  title: string
  slug: SanitySlug
  excerpt?: string
  image?: SanityImage
  body?: PortableTextBlock[]
  publishedAt: string
  author?: SanityAuthor
  categories?: SanityCategory[]
  seo?: SanitySEO
}

export type NewsroomItemType = 'press' | 'speaking' | 'award' | 'publication'

export interface SanityNewsroomItem {
  _id: string
  _type: 'newsroomItem'
  title: string
  slug: SanitySlug
  excerpt?: string
  image?: SanityImage
  body?: PortableTextBlock[]
  publishedAt: string
  type?: NewsroomItemType
  externalLink?: string
  location?: string
  author?: SanityAuthor
  seo?: SanitySEO
}
