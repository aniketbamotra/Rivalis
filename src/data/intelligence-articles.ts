export interface IntelligenceArticle {
  id: string;
  title: string;
  category: 'AI Governance' | 'Space Law' | 'CRISPR Law' | 'Quantum Computing' | 'Corporate Immigration' | 'Blockchain Law';
  date: string;
  excerpt: string;
  readTime: string;
  slug: string;
  featured?: boolean;
}

export const intelligenceArticles: IntelligenceArticle[] = [
  {
    id: '1',
    title: 'EU AI Act Article 52: New Transparency Requirements Explained',
    category: 'AI Governance',
    date: 'Dec 15, 2024',
    excerpt: "The European Commission's latest amendments to Article 52 introduce stricter disclosure requirements for high-risk AI systems. Here's what companies need to know...",
    readTime: '8 min read',
    slug: 'eu-ai-act-article-52',
  },
  {
    id: '2',
    title: 'FCC Updates Satellite Licensing Requirements: What Changed',
    category: 'Space Law',
    date: 'Dec 12, 2024',
    excerpt: "The FCC's December 2024 update to Part 25 regulations affects all commercial satellite operators. We break down the key changes and compliance deadlines...",
    readTime: '6 min read',
    slug: 'fcc-satellite-updates',
  },
  {
    id: '3',
    title: 'FDA Approves Third CRISPR Therapy: Regulatory Pathway Analysis',
    category: 'CRISPR Law',
    date: 'Dec 10, 2024',
    excerpt: 'Following approval of a sickle cell treatment, we analyze the FDA\'s evolving framework for gene editing therapies and what it means for biotech companies...',
    readTime: '7 min read',
    slug: 'fda-crispr-approval',
  },
  {
    id: '4',
    title: 'NIST Post-Quantum Cryptography Standards: Implementation Guide',
    category: 'Quantum Computing',
    date: 'Dec 8, 2024',
    excerpt: 'NIST\'s newly finalized post-quantum cryptography standards (FIPS 203, 204, 205) are now mandatory for federal agencies. Here\'s your compliance roadmap...',
    readTime: '10 min read',
    slug: 'nist-pqc-standards',
  },
  {
    id: '5',
    title: 'H-1B Lottery 2025: Strategy Changes for Tech Companies',
    category: 'Corporate Immigration',
    date: 'Dec 5, 2024',
    excerpt: 'With new USCIS guidance on specialty occupation definitions, tech companies need to adjust their H-1B filing strategies. Our recommendations...',
    readTime: '5 min read',
    slug: 'h1b-strategy-2025',
  },
  {
    id: '6',
    title: 'EU MiCA Regulation: Full Implementation Checklist for Crypto Firms',
    category: 'Blockchain Law',
    date: 'Dec 3, 2024',
    excerpt: 'The Markets in Crypto-Assets (MiCA) regulation is fully effective as of January 2025. Are you compliant? Our complete checklist...',
    readTime: '9 min read',
    slug: 'mica-implementation',
  },
];
