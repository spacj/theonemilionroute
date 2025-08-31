'use client';

import { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function CompoundInterestCalculator() {
  const [inputs, setInputs] = useState({
    principal: 5000,
    rate: 5,
    time: 5,
    compound: 12,
    monthlyContribution: 0
  });
  
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const { principal, rate, time, compound, monthlyContribution } = inputs;
    const r = rate / 100;
    const monthlyRate = r / compound;
    const totalMonths = time * compound;
    
    let balance = principal;
    const yearlyData = [];
    
    for (let month = 1; month <= totalMonths; month++) {
      const interest = balance * monthlyRate;
      balance += interest + monthlyContribution;
      
      if (month % 12 === 0) {
        yearlyData.push({
          year: month / 12,
          balance: parseFloat(balance.toFixed(2)),
          interest: parseFloat((balance - principal - (monthlyContribution * month)).toFixed(2))
        });
      }
    }
    
    const futureValue = balance;
    const totalContributions = principal + (monthlyContribution * totalMonths);
    const totalInterest = futureValue - totalContributions;
    
    setResult({
      futureValue: parseFloat(futureValue.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      totalContributions: parseFloat(totalContributions.toFixed(2)),
      yearlyData,
      effectiveRate: ((Math.pow(1 + r/compound, compound) - 1) * 100).toFixed(2)
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Compound Interest Calculator</h1>
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
              value={inputs.principal}
              onChange={(e) => setInputs({...inputs, principal: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={inputs.rate}
              onChange={(e) => setInputs({...inputs, rate: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period (Years)
            </label>
            <input
              type="number"
              value={inputs.time}
              onChange={(e) => setInputs({...inputs, time: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compounding Frequency
            </label>
            <select
              value={inputs.compound}
              onChange={(e) => setInputs({...inputs, compound: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={1}>Annually</option>
              <option value={4}>Quarterly</option>
              <option value={12}>Monthly</option>
              <option value={365}>Daily</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Contribution ($)
            </label>
            <input
              type="number"
              value={inputs.monthlyContribution}
              onChange={(e) => setInputs({...inputs, monthlyContribution: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={calculate}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Calculate Compound Interest
          </button>
        </div>
        
        {/* Results Section */}
        <div className="lg:col-span-2">
          {result && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Future Value</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(result.futureValue)}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Interest</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(result.totalInterest)}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Effective Rate</h3>
                  <p className="text-2xl font-bold text-purple-600">
                    {result.effectiveRate}%
                  </p>
                </div>
              </div>

              {/* Yearly Breakdown */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Growth by Year</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-semibold text-gray-700">Year</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Balance</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Interest Earned</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyData.map((data: any) => (
                        <tr key={data.year} className="border-b border-gray-100">
                          <td className="py-2 text-gray-600">{data.year}</td>
                          <td className="py-2 text-right font-medium">{formatCurrency(data.balance)}</td>
                          <td className="py-2 text-right text-green-600">{formatCurrency(data.interest)}</td>
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
              <p className="text-gray-500">Enter your values and click calculate to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}