export interface Calculator {
    id: string;
    title: string;
    description: string;
    metaDescription: string;
    keywords: string[];
    category: 'finance' | 'math' | 'health' | 'business';
    icon: string;
    slug: string;
  }