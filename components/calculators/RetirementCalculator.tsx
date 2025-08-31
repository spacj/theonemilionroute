'use client';

import { useState } from 'react';
import { PiggyBank } from 'lucide-react';

export default function RetirementCalculator() {
  const [inputs, setInputs] = useState({
    currentAge: 30,
    retirementAge: 65,
    currentSavings: 25000,
    monthlyContribution: 500,
    expectedReturn: 7,
    inflationRate: 2.5,
    retirementIncome: 70
  });
  
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const { currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn, inflationRate, retirementIncome } = inputs;
    const yearsToRetirement = retirementAge - currentAge;
    const monthsToRetirement = yearsToRetirement * 12;
    const monthlyReturn = expectedReturn / 100 / 12;
    
    // Calculate future value of current savings
    const futureCurrentSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement);
    
    // Calculate future value of monthly contributions
    const futureMonthlyContributions = monthlyContribution * 
      ((Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) / monthlyReturn);
    
    const totalRetirementSavings = futureCurrentSavings + futureMonthlyContributions;
    
    // Calculate required income in today's dollars
    const currentAnnualIncome = monthlyContribution * 12 / (retirementIncome / 100);
    const requiredRetirementIncome = currentAnnualIncome * (retirementIncome / 100);
    
    // Adjust for inflation
    const inflationAdjustedIncome = requiredRetirementIncome * Math.pow(1 + inflationRate / 100, yearsToRetirement);
    
    // Calculate how long retirement savings will last (assuming 4% withdrawal rule)
    const annualWithdrawal = totalRetirementSavings * 0.04;
    const monthlyWithdrawal = annualWithdrawal / 12;
    
    // Generate yearly projection
    const yearlyData = [];
    let balance = currentSavings;
    
    for (let year = 1; year <= Math.min(yearsToRetirement, 10); year++) {
      balance = balance * (1 + expectedReturn / 100) + (monthlyContribution * 12);
      yearlyData.push({
        year: currentAge + year,
        balance: parseFloat(balance.toFixed(2)),
        contributions: parseFloat((monthlyContribution * 12 * year).toFixed(2))
      });
    }
    
    setResult({
      totalRetirementSavings: parseFloat(totalRetirementSavings.toFixed(2)),
      monthlyWithdrawal: parseFloat(monthlyWithdrawal.toFixed(2)),
      annualWithdrawal: parseFloat(annualWithdrawal.toFixed(2)),
      inflationAdjustedIncome: parseFloat(inflationAdjustedIncome.toFixed(2)),
      totalContributions: parseFloat((currentSavings + (monthlyContribution * monthsToRetirement)).toFixed(2)),
      investmentGrowth: parseFloat((totalRetirementSavings - currentSavings - (monthlyContribution * monthsToRetirement)).toFixed(2)),
      yearlyData,
      yearsToRetirement
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <PiggyBank className="w-8 h-8 text-purple-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Retirement Calculator</h1>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Age
            </label>
            <input
              type="number"
              value={inputs.currentAge}
              onChange={(e) => setInputs({...inputs, currentAge: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retirement Age
            </label>
            <input
              type="number"
              value={inputs.retirementAge}
              onChange={(e) => setInputs({...inputs, retirementAge: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Savings ($)
            </label>
            <input
              type="number"
              value={inputs.currentSavings}
              onChange={(e) => setInputs({...inputs, currentSavings: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Contribution ($)
            </label>
            <input
              type="number"
              value={inputs.monthlyContribution}
              onChange={(e) => setInputs({...inputs, monthlyContribution: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Annual Return (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={inputs.expectedReturn}
              onChange={(e) => setInputs({...inputs, expectedReturn: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={calculate}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200"
          >
            Calculate Retirement Plan
          </button>
        </div>
        
        {/* Results Section */}
        <div className="lg:col-span-2">
          {result && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Retirement Savings</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(result.totalRetirementSavings)}
                  </p>
                  <p className="text-sm text-green-700 mt-1">At age {inputs.retirementAge}</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Monthly Income</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(result.monthlyWithdrawal)}
                  </p>
                  <p className="text-sm text-blue-700 mt-1">4% withdrawal rule</p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                  <h3 className="text-lg font-semibold text-orange-900 mb-2">Investment Growth</h3>
                  <p className="text-2xl font-bold text-orange-600">
                    {formatCurrency(result.investmentGrowth)}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Total Contributions</h3>
                  <p className="text-2xl font-bold text-purple-600">
                    {formatCurrency(result.totalContributions)}
                  </p>
                </div>
              </div>

              {/* Yearly Projection */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Savings Growth Projection</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-semibold text-gray-700">Age</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Balance</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Total Contributions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyData.map((data: any) => (
                        <tr key={data.year} className="border-b border-gray-100">
                          <td className="py-2 text-gray-600">{data.year}</td>
                          <td className="py-2 text-right font-medium">{formatCurrency(data.balance)}</td>
                          <td className="py-2 text-right text-purple-600">{formatCurrency(data.contributions + inputs.currentSavings)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {!result && (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl">
              <p className="text-gray-500">Enter your retirement details and click calculate to see projections</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}