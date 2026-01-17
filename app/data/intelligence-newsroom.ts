export interface NewsroomItem {
  id: string;
  date: string;
  title: string;
  description: string;
  link: string;
  type: 'press' | 'speaking' | 'quote';
}

export const newsroomItems: NewsroomItem[] = [
  {
    id: '1',
    date: 'DEC 18',
    title: 'Featured in TechCrunch: "The Law Firms Building AI Governance Practices"',
    description: "TechCrunch profiles Rivalis Law's approach to automated legal intelligence and how we're helping companies navigate the EU AI Act.",
    link: '#',
    type: 'press',
  },
  {
    id: '2',
    date: 'DEC 10',
    title: 'Speaking Engagement: AI & Law Summit 2025 (San Francisco)',
    description: 'Partner Sarah Chen will present on "Implementing EU AI Act Compliance in US Tech Companies" at the AI & Law Summit on January 15, 2025.',
    link: '#',
    type: 'speaking',
  },
  {
    id: '3',
    date: 'NOV 28',
    title: 'Quoted in Harvard Business Review on "The Future of AI Regulation"',
    description: 'Senior Partner Michael Zhang discusses how AI governance frameworks are reshaping corporate compliance and risk management.',
    link: '#',
    type: 'quote',
  },
];
