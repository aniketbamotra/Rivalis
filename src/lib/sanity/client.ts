import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = '2024-01-01'

// CDN client — use in server components for cached reads
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

// Non-CDN client — use when you need the freshest data (e.g. draft preview)
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})
