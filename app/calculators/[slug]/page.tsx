// app/calculators/[slug]/page.tsx - Dynamic calculator pages
import { calculators } from '@/config/calculators';
import { generateCalculatorMetadata } from '@/lib/metadata';
import { notFound } from 'next/navigation';
import CalculatorComponent from '@/components/CalculatorComponent';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return calculators.map((calc) => ({
    slug: calc.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  return generateCalculatorMetadata(params.slug);
}

export default function CalculatorPage({ params }: Props) {
  const calculator = calculators.find(calc => calc.slug === params.slug);
  
  if (!calculator) {
    notFound();
  }

  // Get related calculators from same category
  const relatedCalculators = calculators
    .filter(calc => calc.category === calculator.category && calc.id !== calculator.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/calculators" className="text-blue-600 hover:text-blue-800">Calculators</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{calculator.title}</span>
          </nav>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link 
          href="/calculators"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Calculators
        </Link>
      </div>

      {/* Calculator Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{calculator.title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {calculator.description}
          </p>
        </div>
      </div>

      {/* First Horizontal Video Ad */}
      <div className="flex items-center justify-center w-full">
        <div className="w-full sm:w-[90vw] sm:h-[10vh] md:w-[80vw] md:h-[20vh] flex items-center justify-center">
          <AdBanner adType="video-horizontal-1" className="m-0" />
        </div>
      </div>

      {/* Calculator Component */}
      <CalculatorComponent calculatorId={calculator.id} />

      {/* Related Calculators */}
      {relatedCalculators.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Related Calculators
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {relatedCalculators.map((relatedCalc) => (
                <Link
                  key={relatedCalc.id}
                  href={`/calculators/${relatedCalc.slug}`}
                  className="bg-gray-50 rounded-lg p-6 hover:bg-blue-50 transition-colors duration-200"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {relatedCalc.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {relatedCalc.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
       
      {/* Second Horizontal Video Ad */}
      <div className="flex items-center justify-center w-full">
        <div className="w-full sm:w-[90vw] sm:h-[10vh] md:w-[80vw] md:h-[20vh] flex items-center justify-center">
          <AdBanner adType="video-horizontal-2" className="m-0" />
        </div>
      </div>

      {/* SEO Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How to Use the {calculator.title}
            </h2>
            
            {calculator.id === 'compound-interest' && (
              <div>
                <p className="text-gray-700 mb-4">
                  Our compound interest calculator helps you understand how your money can grow over time. 
                  Simply enter your initial investment, expected interest rate, time period, and any regular 
                  contributions to see detailed projections.
                </p>
                
                <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                  Understanding Compound Interest
                </h3>
                <p className="text-gray-700 mb-4">
                  Compound interest is often called "the eighth wonder of the world" because of its power 
                  to exponentially grow wealth over time. Unlike simple interest, compound interest earns 
                  returns on both your original investment and previously earned interest.
                </p>
                
                <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                  Tips for Maximizing Compound Interest
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Start investing as early as possible to maximize time</li>
                  <li>Make regular contributions to amplify the compounding effect</li>
                  <li>Choose investments with higher compounding frequencies</li>
                  <li>Reinvest all dividends and interest payments</li>
                  <li>Be patient and let compound interest work its magic</li>
                </ul>
              </div>
            )}

            {calculator.id === 'loan' && (
              <div>
                <p className="text-gray-700 mb-4">
                  Use our loan calculator to determine monthly payments for mortgages, auto loans, 
                  personal loans, and more. Enter the loan amount, interest rate, and term to get 
                  detailed payment information.
                </p>
                
                <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                  Understanding Loan Calculations
                </h3>
                <p className="text-gray-700 mb-4">
                  Loan payments are calculated using an amortization formula that considers the principal 
                  amount, interest rate, and loan term. Early payments go mostly toward interest, while 
                  later payments pay down more principal.
                </p>
              </div>
            )}

            {/* Add specific content for other calculators */}
          </div>
        </div>
      </section>

      {/* Portrait Image Ad */}
      <div className="flex items-center justify-center w-full">
        <div className="w-full max-w-[80vw] flex items-center justify-center">
          <AdBanner adType="image-portrait-1" className="m-0" />
        </div>
      </div>
    </div>
  );
}