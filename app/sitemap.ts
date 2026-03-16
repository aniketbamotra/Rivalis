import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://rivalislaw.com';

  // Static routes with priority and change frequency
  const staticRoutes: MetadataRoute.Sitemap = [
    // Homepage - highest priority
    {
      url: baseUrl,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    // Main service pages - high priority
    {
      url: `${baseUrl}/services/governance`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/immigration`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/ma`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/contracts`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/data-privacy`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/ip-strategy`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/fraud-investigation`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/employment`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/fundraising`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // Immigration sub-services
    {
      url: `${baseUrl}/services/immigration/work-visas`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/immigration/eb1-extraordinary-ability`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/immigration/eb5`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // Intelligence Hub
    {
      url: `${baseUrl}/intelligence-hub`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/intelligence-hub/newsroom`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'weekly',
      priority: 0.64,
    },
    {
      url: `${baseUrl}/intelligence-hub/newsroom/newsroom-1`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.64,
    },
    {
      url: `${baseUrl}/intelligence-hub/perspectives`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'weekly',
      priority: 0.64,
    },
    {
      url: `${baseUrl}/intelligence-hub/perspectives/this-is-4th`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.64,
    },
    {
      url: `${baseUrl}/intelligence-hub/perspectives/this-is-3rd`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.64,
    },
    {
      url: `${baseUrl}/intelligence-hub/perspectives/this-is-a-2nd-example`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.64,
    },
    {
      url: `${baseUrl}/intelligence-hub/perspectives/this-is-an-example`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.64,
    },

    // Partnership/Apply/Auth pages
    {
      url: `${baseUrl}/join-firm`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/apply/partner-inquiry`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: `${baseUrl}/apply/careers`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'monthly',
      priority: 0.64,
    },

    // Legal/Information pages
    {
      url: `${baseUrl}/legal-information`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'yearly',
      priority: 0.8,
    },

    // Form/Intake pages
    {
      url: `${baseUrl}/forms/ai-governance`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/forms/immigration`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/forms/work-visa-intake`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: `${baseUrl}/forms/eb1-intake`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: `${baseUrl}/forms/eb2-niw-intake`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: `${baseUrl}/forms/eb5-intake`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: `${baseUrl}/forms/ma`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: `${baseUrl}/forms/contracts`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: `${baseUrl}/forms/data-privacy`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: `${baseUrl}/forms/ip-strategy`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: `${baseUrl}/forms/fraud-investigation`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: `${baseUrl}/forms/employment-law`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
    {
      url: `${baseUrl}/forms/fundraising`,
      lastModified: new Date('2026-03-15'),
      changeFrequency: 'yearly',
      priority: 0.64,
    },
  ];

  // Dynamic routes from Intelligence Hub
  // In production, you would fetch these from Hashnode API
  // For now, we'll include the structure for dynamic routes
  // Uncomment and implement when ready to fetch from Hashnode
  /*
  try {
    const { getPosts } = await import('@/lib/hashnode');
    const posts = await getPosts();
    
    const dynamicRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/intelligence-hub/${post.type === 'newsroom' ? 'newsroom' : 'perspectives'}/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    console.error('Error fetching dynamic routes for sitemap:', error);
    return staticRoutes;
  }
  */

  return staticRoutes;
}
