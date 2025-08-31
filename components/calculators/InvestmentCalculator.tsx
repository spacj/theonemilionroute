'use client';

import { useState } from 'react';
import { BarChart3 } from 'lucide-react';

export default function InvestmentCalculator() {
  const [inputs, setInputs] = useState({
    initialInvestment: 10000,
    monthlyContribution: 300,
    annualReturn: 8,
    timeHorizon: 10,
    riskTolerance: 'moderate',
    investmentType: 'mixed'
  });
  
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const { initialInvestment, monthlyContribution, annualReturn, timeHorizon } = inputs;
    const monthlyReturn = annualReturn / 100 / 12;
    const totalMonths = timeHorizon * 12;
    
    // Calculate future value with monthly contributions
    let balance = initialInvestment;
    const yearlyData = [];
    
    for (let month = 1; month <= totalMonths; month++) {
      balance = balance * (1 + monthlyReturn) + monthlyContribution;
      
      if (month % 12 === 0) {
        const year = month / 12;
        const totalContributions = initialInvestment + (monthlyContribution * month);
        const gains = balance - totalContributions;
        
        yearlyData.push({
          year,
          balance: parseFloat(balance.toFixed(2)),
          contributions: parseFloat(totalContributions.toFixed(2)),
          gains: parseFloat(gains.toFixed(2))
        });
      }
    }
    
    const finalBalance = balance;
    const totalContributions = initialInvestment + (monthlyContribution * totalMonths);
    const totalGains = finalBalance - totalContributions;
    const totalReturn = ((finalBalance - totalContributions) / totalContributions) * 100;
    
    // Risk assessment
    const volatilityMultiplier = inputs.riskTolerance === 'conservative' ? 0.7 : 
                                inputs.riskTolerance === 'aggressive' ? 1.4 : 1.0;
    const estimatedVolatility = annualReturn * 0.3 * volatilityMultiplier;
    
    const pessimisticReturn = annualReturn - estimatedVolatility;
    const optimisticReturn = annualReturn + estimatedVolatility;
    
    // Calculate scenarios
    const pessimisticBalance = calculateScenario(pessimisticReturn);
    const optimisticBalance = calculateScenario(optimisticReturn);
    
    function calculateScenario(returnRate: number) {
      const monthlyReturn = returnRate / 100 / 12;
      let balance = initialInvestment;
      
      for (let month = 1; month <= totalMonths; month++) {
        balance = balance * (1 + monthlyReturn) + monthlyContribution;
      }
      
      return parseFloat(balance.toFixed(2));
    }
    
    setResult({
      finalBalance: parseFloat(finalBalance.toFixed(2)),
      totalContributions: parseFloat(totalContributions.toFixed(2)),
      totalGains: parseFloat(totalGains.toFixed(2)),
      totalReturn: parseFloat(totalReturn.toFixed(2)),
      pessimisticBalance: parseFloat(pessimisticBalance.toFixed(2)),
      optimisticBalance: parseFloat(optimisticBalance.toFixed(2)),
      yearlyData,
      estimatedVolatility: parseFloat(estimatedVolatility.toFixed(2))
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
        <BarChart3 className="w-8 h-8 text-indigo-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Investment Calculator</h1>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Investment ($)
            </label>
            <input
              type="number"
              value={inputs.initialInvestment}
              onChange={(e) => setInputs({...inputs, initialInvestment: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Annual Return (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={inputs.annualReturn}
              onChange={(e) => setInputs({...inputs, annualReturn: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Horizon (Years)
            </label>
            <input
              type="number"
              value={inputs.timeHorizon}
              onChange={(e) => setInputs({...inputs, timeHorizon: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Risk Tolerance
            </label>
            <select
              value={inputs.riskTolerance}
              onChange={(e) => setInputs({...inputs, riskTolerance: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="conservative">Conservative</option>
              <option value="moderate">Moderate</option>
              <option value="aggressive">Aggressive</option>
            </select>
          </div>
          
          <button
            onClick={calculate}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
          >
            Calculate Investment Growth
          </button>
        </div>
        
        {/* Results Section */}
        <div className="lg:col-span-2">
          {result && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Portfolio Value</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(result.finalBalance)}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Gains</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(result.totalGains)}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Total Return</h3>
                  <p className="text-2xl font-bold text-purple-600">
                    {result.totalReturn.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Scenario Analysis */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Scenario Analysis</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-red-100 rounded-lg">
                    <h4 className="font-semibold text-red-800">Pessimistic</h4>
                    <p className="text-lg font-bold text-red-600">{formatCurrency(result.pessimisticBalance)}</p>
                    <p className="text-sm text-red-700">{(inputs.annualReturn - result.estimatedVolatility).toFixed(1)}% return</p>
                  </div>
                  <div className="text-center p-4 bg-green-100 rounded-lg">
                    <h4 className="font-semibold text-green-800">Expected</h4>
                    <p className="text-lg font-bold text-green-600">{formatCurrency(result.finalBalance)}</p>
                    <p className="text-sm text-green-700">{inputs.annualReturn}% return</p>
                  </div>
                  <div className="text-center p-4 bg-blue-100 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Optimistic</h4>
                    <p className="text-lg font-bold text-blue-600">{formatCurrency(result.optimisticBalance)}</p>
                    <p className="text-sm text-blue-700">{(inputs.annualReturn + result.estimatedVolatility).toFixed(1)}% return</p>
                  </div>
                </div>
              </div>

              {/* Yearly Growth */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Growth by Year</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-semibold text-gray-700">Year</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Portfolio Value</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Contributions</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Gains</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyData.map((data: any) => (
                        <tr key={data.year} className="border-b border-gray-100">
                          <td className="py-2 text-gray-600">{data.year}</td>
                          <td className="py-2 text-right font-medium">{formatCurrency(data.balance)}</td>
                          <td className="py-2 text-right text-blue-600">{formatCurrency(data.contributions)}</td>
                          <td className="py-2 text-right text-green-600">{formatCurrency(data.gains)}</td>
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
              <p className="text-gray-500">Enter your investment parameters and click calculate to see projections</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}