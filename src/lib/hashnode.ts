import { HashnodeArticle, HashnodePostsResponse, HashnodeSearchResponse } from '@/src/types/hashnode';

const HASHNODE_API_URL = 'https://gql.hashnode.com';
const PUBLICATION_ID = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_ID || '';
const API_KEY = process.env.HASHNODE_API_KEY || '';

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

async function fetchGraphQL<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  // Add authorization header if API key is available
  if (API_KEY) {
    headers['Authorization'] = API_KEY;
  }
  
  const response = await fetch(HASHNODE_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
    cache: 'no-store', // Disable Next.js caching
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Hashnode API Error:', response.status, errorText);
    throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
  }

  const json: GraphQLResponse<T> = await response.json();

  if (json.errors) {
    console.error('GraphQL Errors:', json.errors);
    throw new Error(json.errors[0].message);
  }

  if (!json.data) {
    throw new Error('No data returned from Hashnode API');
  }

  return json.data;
}

// Fetch all articles with optional tag filtering
export async function getArticles(
  first: number = 10,
  after?: string,
  tag?: string
): Promise<HashnodePostsResponse['posts']> {
  const query = `
    query GetPosts($host: String!, $first: Int!, $after: String) {
      publication(host: $host) {
        posts(first: $first, after: $after) {
          edges {
            node {
              id
              title
              brief
              slug
              content {
                markdown
                html
              }
              coverImage {
                url
              }
              publishedAt
              readTimeInMinutes
              tags {
                id
                name
                slug
              }
              author {
                name
                profilePicture
                bio {
                  text
                }
              }
              views
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL<{ publication: HashnodePostsResponse }>(query, {
    host: PUBLICATION_ID,
    first,
    after,
  });

  // Handle case where publication doesn't exist or no data returned
  if (!data.publication) {
    console.error('Hashnode publication not found. Please verify:');
    console.error('1. Publication ID is correct:', PUBLICATION_ID);
    console.error('2. Publication exists at https://hashnode.com/dashboard');
    console.error('3. API key has proper permissions');
    return {
      edges: [],
      pageInfo: {
        hasNextPage: false,
        endCursor: null,
      },
    };
  }

  let posts = data.publication.posts;

  // Filter by tag if specified
  if (tag && tag !== 'all') {
    posts.edges = posts.edges.filter(({ node }) =>
      node.tags.some((t) => t.slug.toLowerCase() === tag.toLowerCase())
    );
  }

  return posts;
}

// Fetch a single article by slug
export async function getArticleBySlug(slug: string): Promise<HashnodeArticle | null> {
  const query = `
    query GetPost($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          id
          title
          brief
          slug
          content {
            markdown
            html
          }
          coverImage {
            url
          }
          publishedAt
          readTimeInMinutes
          tags {
            id
            name
            slug
          }
          author {
            name
            profilePicture
            bio {
              text
            }
          }
          views
        }
      }
    }
  `;

  const data = await fetchGraphQL<{ publication: { post: HashnodeArticle | null } }>(query, {
    host: PUBLICATION_ID,
    slug,
  });

  return data.publication.post;
}

// Get featured articles (first 3 articles)
export async function getFeaturedArticles(): Promise<HashnodeArticle[]> {
  const posts = await getArticles(3);
  return posts.edges.map(({ node }) => node);
}

// Get articles by tag (for categories like "perspectives", "newsroom")
export async function getArticlesByTag(tag: string, first: number = 10): Promise<HashnodeArticle[]> {
  // Fetch ALL articles without tag filter to avoid Hashnode API issues
  const fetchCount = Math.min(first * 5, 50); // Fetch 5x the amount we need
  const posts = await getArticles(fetchCount); // NO TAG PARAMETER - fetch everything
  
  // Debug logging
  console.log(`\n=== getArticlesByTag DEBUG ===`);
  console.log(`Tag requested: "${tag}"`);
  console.log(`Total articles fetched: ${posts.edges.length}`);
  console.log('All articles with tags:');
  posts.edges.forEach(({ node }, index) => {
    const tagSlugs = node.tags.map(t => t.slug).join(', ');
    console.log(`  ${index + 1}. "${node.title}" - Tags: [${tagSlugs}]`);
  });
  
  // Filter by tag client-side
  let filtered = posts.edges.map(({ node }) => node);
  
  if (tag && tag !== 'all') {
    filtered = filtered.filter((article) =>
      article.tags.some((t) => t.slug.toLowerCase() === tag.toLowerCase())
    );
    console.log(`After filtering by "${tag}": ${filtered.length} articles`);
  }
  
  // Limit to requested number
  filtered = filtered.slice(0, first);
  
  console.log(`Returning ${filtered.length} articles`);
  console.log('=========================\n');
  
  return filtered;
}

// Search articles
export async function searchArticles(query: string): Promise<HashnodeArticle[]> {
  const graphqlQuery = `
    query SearchPosts($host: String!, $query: String!) {
      searchPostsOfPublication(
        first: 10
        filter: { query: $query, publicationId: $host }
      ) {
        edges {
          node {
            id
            title
            brief
            slug
            coverImage {
              url
            }
            publishedAt
            readTimeInMinutes
            tags {
              id
              name
              slug
            }
            author {
              name
            }
          }
        }
      }
    }
  `;

  try {
    const data = await fetchGraphQL<HashnodeSearchResponse>(graphqlQuery, {
      host: PUBLICATION_ID,
      query,
    });

    return data.searchPostsOfPublication.edges.map(({ node }) => node);
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}

// Get related articles by tags
export async function getRelatedArticles(
  currentSlug: string,
  tags: string[],
  limit: number = 3
): Promise<HashnodeArticle[]> {
  const posts = await getArticles(20);
  
  // Filter out current article and find articles with matching tags
  const related = posts.edges
    .map(({ node }) => node)
    .filter((article) => article.slug !== currentSlug)
    .filter((article) =>
      article.tags.some((tag) => tags.includes(tag.slug))
    )
    .slice(0, limit);

  return related;
}

// Get article slugs for static generation
export async function getAllArticleSlugs(): Promise<string[]> {
  const posts = await getArticles(50); // Hashnode API limit is 50
  return posts.edges.map(({ node }) => node.slug);
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Calculate reading time if not provided
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
