import { calculators } from '@/config/calculators';
import { Metadata } from 'next';

export function generateCalculatorMetadata(slug: string): Metadata {
  const calculator = calculators.find(calc => calc.slug === slug);
  
  if (!calculator) {
    return {
      title: 'Calculator Not Found',
      description: 'The requested calculator could not be found.'
    };
  }

  return {
    title: `${calculator.title} | Your Blog Name`,
    description: calculator.metaDescription,
    keywords: calculator.keywords.join(', '),
    openGraph: {
      title: calculator.title,
      description: calculator.metaDescription,
      type: 'website',
      url: `/calculators/${calculator.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: calculator.title,
      description: calculator.metaDescription,
    },
    alternates: {
      canonical: `/calculators/${calculator.slug}`,
    }
  };
}
