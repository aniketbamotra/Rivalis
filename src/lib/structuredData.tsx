import { Organization, WithContext, LegalService, Attorney } from 'schema-dts';

export function getOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Rivalis Law',
    alternateName: 'Rivalis Law Firm',
    description: 'Big 4 Trained Attorney specializing in AI Governance, Global Immigration, and M&A Transactions',
    url: 'https://rivalislaw.com',
    logo: 'https://rivalislaw.com/logo.png',
    image: 'https://rivalislaw.com/og-images/home.jpg',
    telephone: '+1-313-771-2283',
    email: 'aaishaeron@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
      addressRegion: 'NY',
    },
    sameAs: [
      'https://linkedin.com/in/aaishaeron',
    ],
    priceRange: '$$-$$$',
    areaServed: [
      {
        '@type': 'Country',
        name: 'United States',
      },
      {
        '@type': 'Country',
        name: 'Global',
      },
    ],
    serviceType: [
      'AI Governance & Compliance',
      'Immigration Law',
      'M&A & Corporate Transactions',
      'Contract Review & Drafting',
      'Data Privacy Compliance',
      'Corporate Fraud Investigation',
      'Employment Law',
      'Fundraising & Securities',
    ],
    attorney: {
      '@type': 'Attorney',
      name: 'Aaishwarya Aeron',
      honorificSuffix: 'Esq.',
      jobTitle: 'Founder & Managing Attorney',
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'University of Oxford',
        },
      ],
      award: [
        'Oxford AI Certification',
        'Big 4 Trained',
      ],
      memberOf: [
        {
          '@type': 'Organization',
          name: 'New York State Bar',
        },
        {
          '@type': 'Organization',
          name: 'Michigan State Bar',
        },
      ],
    },
  };
}

export function getServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  priceRange?: string;
}): WithContext<LegalService> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      '@type': 'LegalService',
      name: 'Rivalis Law',
      url: 'https://rivalislaw.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    ...(service.priceRange && { priceRange: service.priceRange }),
  };
}

export function getBreadcrumbSchema(items: { name: string; url?: string }[]): WithContext<any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };
}

export function getArticleSchema(article: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}): WithContext<any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image || 'https://rivalislaw.com/og-images/default-article.jpg',
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author || 'Rivalis Law',
      url: 'https://rivalislaw.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rivalis Law',
      url: 'https://rivalislaw.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rivalislaw.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
}

export function renderStructuredData(data: WithContext<any>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
