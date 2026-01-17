export interface IntelligenceResource {
  id: string;
  title: string;
  description: string;
  icon: string;
  isPremium: boolean;
  slug: string;
  type: 'template' | 'guide' | 'tool' | 'checklist';
}

export const intelligenceResources: IntelligenceResource[] = [
  {
    id: '1',
    title: 'AI Compliance Checklist',
    description: 'Step-by-step checklist for EU AI Act compliance covering risk classification, documentation, and ongoing obligations.',
    icon: '📋',
    isPremium: false,
    slug: 'ai-compliance-checklist',
    type: 'checklist',
  },
  {
    id: '2',
    title: 'Jurisdiction Comparison Matrix',
    description: 'Side-by-side comparison of AI regulations across 42 jurisdictions. Interactive spreadsheet with filtering and search.',
    icon: '📊',
    isPremium: true,
    slug: 'jurisdiction-matrix',
    type: 'tool',
  },
  {
    id: '3',
    title: 'Model AI Ethics Board Charter',
    description: 'Template charter for establishing an AI governance committee, including roles, responsibilities, and decision frameworks.',
    icon: '📄',
    isPremium: false,
    slug: 'ethics-board-charter',
    type: 'template',
  },
  {
    id: '4',
    title: 'AI Vendor Agreement Template',
    description: 'Comprehensive vendor agreement template covering liability, compliance obligations, data handling, and audit rights.',
    icon: '⚖️',
    isPremium: true,
    slug: 'vendor-agreement',
    type: 'template',
  },
  {
    id: '5',
    title: 'CRISPR IP Strategy Guide',
    description: 'Complete guide to patent filing, prosecution, and defense strategy for CRISPR and gene editing technologies.',
    icon: '🧬',
    isPremium: false,
    slug: 'crispr-ip-guide',
    type: 'guide',
  },
  {
    id: '6',
    title: 'Quantum-Safe Migration Roadmap',
    description: 'Technical roadmap for migrating cryptographic infrastructure to post-quantum algorithms with implementation timeline.',
    icon: '🔐',
    isPremium: true,
    slug: 'quantum-migration',
    type: 'guide',
  },
];
