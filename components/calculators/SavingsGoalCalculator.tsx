'use client';

import { useState } from 'react';
import { Target } from 'lucide-react';

export default function SavingsGoalCalculator() {
  const [inputs, setInputs] = useState({
    goalAmount: 50000,
    currentSavings: 5000,
    timeframe: 10,
    interestRate: 4
  });
  
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const { goalAmount, currentSavings, timeframe, interestRate } = inputs;
    const monthlyRate = (interestRate / 100) / 12;
    const totalMonths = timeframe * 12;
    
    // Calculate required monthly payment
    const futureValueOfCurrent = currentSavings * Math.pow(1 + monthlyRate, totalMonths);
    const remainingAmount = goalAmount - futureValueOfCurrent;
    
    const monthlyPayment = remainingAmount / (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate));
    
    setResult({
      monthlyPayment: Math.max(0, parseFloat(monthlyPayment.toFixed(2))),
      totalContributions: parseFloat((monthlyPayment * totalMonths + currentSavings).toFixed(2)),
      totalInterest: parseFloat((goalAmount - (monthlyPayment * totalMonths + currentSavings)).toFixed(2))
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
        <Target className="w-8 h-8 text-blue-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Savings Goal Calculator</h1>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Savings Goal ($)
            </label>
            <input
              type="number"
              value={inputs.goalAmount}
              onChange={(e) => setInputs({...inputs, goalAmount: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timeframe (Years)
            </label>
            <input
              type="number"
              value={inputs.timeframe}
              onChange={(e) => setInputs({...inputs, timeframe: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Annual Return (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={inputs.interestRate}
              onChange={(e) => setInputs({...inputs, interestRate: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={calculate}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Calculate Monthly Savings Needed
          </button>
        </div>
        
        {result && (
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Results</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <span className="text-gray-600 block mb-1">Monthly Savings Required:</span>
                <span className="font-bold text-green-600 text-2xl">
                  {formatCurrency(result.monthlyPayment)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <span className="text-gray-600 block text-sm">Total Contributions</span>
                  <span className="font-semibold text-lg">
                    {formatCurrency(result.totalContributions)}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-gray-600 block text-sm">Interest Earned</span>
                  <span className="font-semibold text-lg text-green-600">
                    {formatCurrency(result.totalInterest)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
