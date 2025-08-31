import { calculators } from '@/config/calculators';
import Link from 'next/link';
import { Calculator, TrendingUp, DollarSign, PiggyBank, Home, Target, CreditCard, Percent, GraduationCap, Heart, Apple, BarChart3 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Financial Calculators | Your Blog Name',
  description: 'Free financial calculators including compound interest, loan payments, retirement planning, and investment growth calculators.',
  keywords: 'financial calculators, compound interest calculator, loan calculator, retirement calculator, investment calculator',
  openGraph: {
    title: 'Financial Calculators',
    description: 'Free financial calculators for smart money decisions',
    type: 'website',
  }
};

const iconMap = {
  TrendingUp, DollarSign, PiggyBank, Home, Target, CreditCard, Percent, GraduationCap, Heart, Apple, BarChart3, Calculator
};

export default function CalculatorsIndexPage() {
  const groupedCalculators = calculators.reduce((acc, calc) => {
    if (!acc[calc.category]) {
      acc[calc.category] = [];
    }
    acc[calc.category].push(calc);
    return acc;
  }, {} as Record<string, typeof calculators>);

  const categoryTitles = {
    finance: 'Financial Calculators',
    math: 'Math Calculators', 
    health: 'Health & Fitness Calculators',
    business: 'Business Calculators'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Calculator className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Financial Calculators
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Make informed financial decisions with our comprehensive suite of free calculators. 
              Plan your investments, loans, retirement, and more.
            </p>
          </div>
        </div>
      </div>

      {/* Calculators Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {Object.entries(groupedCalculators).map(([category, calcs]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {categoryTitles[category as keyof typeof categoryTitles]}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {calcs.map((calc) => {
                const IconComponent = iconMap[calc.icon as keyof typeof iconMap];
                
                return (
                  <Link
                    key={calc.id}
                    href={`/calculators/${calc.slug}`}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 border border-gray-100"
                  >
                    <div className="flex items-start mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg mr-4">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {calc.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {calc.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      <span>Use Calculator</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* SEO Content Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Use Financial Calculators?
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6">
              Financial calculators are essential tools for making informed money decisions. Whether you're planning 
              for retirement, considering a loan, or wanting to understand how compound interest works, these 
              calculators provide accurate projections based on your specific situation.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Popular Calculator Categories
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 not-prose mb-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-3">Investment Planning</h4>
                <p className="text-green-800 text-sm">
                  Use compound interest and investment calculators to project portfolio growth 
                  and plan your investment strategy effectively.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">Debt Management</h4>
                <p className="text-blue-800 text-sm">
                  Loan and debt payoff calculators help you understand payment schedules 
                  and develop strategies to become debt-free faster.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
