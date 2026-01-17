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
    description: 'Comprehensive vendor agreement for AI services covering liability, data rights, compliance obligations, and audit rights.',
    icon: '🔒',
    isPremium: true,
    slug: 'vendor-agreement',
    type: 'template',
  },
  {
    id: '5',
    title: 'CRISPR Regulatory Roadmap',
    description: 'Visual guide to FDA approval pathways for gene editing therapies, from IND to BLA, with timelines and requirements.',
    icon: '🎯',
    isPremium: false,
    slug: 'crispr-roadmap',
    type: 'guide',
  },
  {
    id: '6',
    title: 'Algorithmic Impact Assessment Tool',
    description: 'Interactive tool for conducting algorithmic impact assessments required under EU AI Act and similar regulations.',
    icon: '⚖️',
    isPremium: true,
    slug: 'impact-assessment',
    type: 'tool',
  },
];
