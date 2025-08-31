// app/calculators/page.tsx
import CalculatorsSection from '../../components/CalculatorsSection';

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900">Financial Calculators</h1>
          <p className="mt-2 text-xl text-gray-600">
            Powerful tools to help you make informed financial decisions
          </p>
        </div>
      </div>

      {/* Calculators Section */}
      <CalculatorsSection />

      {/* Additional Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Understanding Financial Planning
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              What is Compound Interest?
            </h3>
            <p className="text-gray-700 mb-6">
              Compound interest is the concept of earning "interest on interest." 
              When you invest money, you earn returns not just on your original investment, 
              but also on all the interest that investment has previously earned. 
              This creates a snowball effect that can significantly accelerate wealth building over time.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Making Compound Interest Work for You
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">Start Early</h4>
                <p className="text-blue-800">
                  Time is your most powerful tool. Even small amounts invested early 
                  can grow to substantial sums due to the compounding effect.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-3">Contribute Regularly</h4>
                <p className="text-green-800">
                  Consistent monthly contributions amplify the power of compounding. 
                  Each new contribution starts earning its own interest immediately.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              How to Use These Calculators
            </h3>
            <p className="text-gray-700 mb-4">
              Our calculators are designed to help you explore different financial scenarios:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Compound Interest:</strong> See how your savings grow with regular contributions</li>
              <li><strong>Loan Calculator:</strong> Understand your monthly payments and total interest costs</li>
              <li><strong>Retirement Planning:</strong> Project your retirement savings based on current contributions</li>
              <li><strong>Investment Growth:</strong> Estimate returns on investment portfolios over time</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
