'use client';

import { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function BreakEvenCalculator() {
  const [inputs, setInputs] = useState({
    fixedCosts: 5000,
    variableCostPerUnit: 15,
    pricePerUnit: 35,
    targetProfit: 0
  });
  
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const { fixedCosts, variableCostPerUnit, pricePerUnit, targetProfit } = inputs;
    
    if (pricePerUnit <= variableCostPerUnit) {
      alert('Price per unit must be greater than variable cost per unit');
      return;
    }

    const contributionMarginPerUnit = pricePerUnit - variableCostPerUnit;
    const contributionMarginRatio = (contributionMarginPerUnit / pricePerUnit) * 100;
    
    // Break-even point in units
    const breakEvenUnits = Math.ceil((fixedCosts + targetProfit) / contributionMarginPerUnit);
    
    // Break-even point in revenue
    const breakEvenRevenue = breakEvenUnits * pricePerUnit;
    
    // Additional analysis
    const totalVariableCosts = breakEvenUnits * variableCostPerUnit;
    const totalCosts = fixedCosts + totalVariableCosts;
    
    // Sensitivity analysis
    const scenarios = [
      { label: 'Current Price', price: pricePerUnit, units: breakEvenUnits },
      { label: '10% Price Increase', price: pricePerUnit * 1.1, units: Math.ceil((fixedCosts + targetProfit) / (pricePerUnit * 1.1 - variableCostPerUnit)) },
      { label: '10% Price Decrease', price: pricePerUnit * 0.9, units: Math.ceil((fixedCosts + targetProfit) / (pricePerUnit * 0.9 - variableCostPerUnit)) }
    ];

    // Monthly breakdown (assuming even distribution)
    const monthlyData = [];
    for (let month = 1; month <= 12; month++) {
      const unitsToBreakEven = Math.ceil(breakEvenUnits / 12 * month);
      const revenue = unitsToBreakEven * pricePerUnit;
      const costs = fixedCosts + (unitsToBreakEven * variableCostPerUnit);
      const profit = revenue - costs;
      
      monthlyData.push({
        month,
        units: unitsToBreakEven,
        revenue: parseFloat(revenue.toFixed(2)),
        costs: parseFloat(costs.toFixed(2)),
        profit: parseFloat(profit.toFixed(2))
      });
    }
    
    setResult({
      breakEvenUnits,
      breakEvenRevenue: parseFloat(breakEvenRevenue.toFixed(2)),
      contributionMarginPerUnit: parseFloat(contributionMarginPerUnit.toFixed(2)),
      contributionMarginRatio: parseFloat(contributionMarginRatio.toFixed(2)),
      totalCosts: parseFloat(totalCosts.toFixed(2)),
      scenarios,
      monthlyData
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
        <TrendingUp className="w-8 h-8 text-indigo-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Break-Even Calculator</h1>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fixed Costs ($)
            </label>
            <input
              type="number"
              value={inputs.fixedCosts}
              onChange={(e) => setInputs({...inputs, fixedCosts: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Rent, salaries, insurance, etc.</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Variable Cost per Unit ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={inputs.variableCostPerUnit}
              onChange={(e) => setInputs({...inputs, variableCostPerUnit: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Materials, labor, shipping, etc.</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price per Unit ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={inputs.pricePerUnit}
              onChange={(e) => setInputs({...inputs, pricePerUnit: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Profit ($)
            </label>
            <input
              type="number"
              value={inputs.targetProfit}
              onChange={(e) => setInputs({...inputs, targetProfit: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Set to 0 for break-even point</p>
          </div>
          
          <button
            onClick={calculate}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
          >
            Calculate Break-Even Point
          </button>
        </div>
        
        {/* Results Section */}
        <div className="lg:col-span-2">
          {result && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Break-Even Units</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {result.breakEvenUnits.toLocaleString()}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Break-Even Revenue</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(result.breakEvenRevenue)}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Contribution Margin</h3>
                  <p className="text-2xl font-bold text-purple-600">
                    {result.contributionMarginRatio.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Metrics</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800">Contribution Margin per Unit</h4>
                    <p className="text-lg font-bold text-indigo-600">{formatCurrency(result.contributionMarginPerUnit)}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800">Total Costs at Break-Even</h4>
                    <p className="text-lg font-bold text-indigo-600">{formatCurrency(result.totalCosts)}</p>
                  </div>
                </div>
              </div>

              {/* Sensitivity Analysis */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Price Sensitivity Analysis</h3>
                <div className="space-y-3">
                  {result.scenarios.map((scenario: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                      <div>
                        <h4 className="font-semibold">{scenario.label}</h4>
                        <p className="text-sm text-gray-600">Price: {formatCurrency(scenario.price)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{scenario.units.toLocaleString()} units</p>
                        <p className="text-sm text-gray-600">{formatCurrency(scenario.units * scenario.price)} revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Progression */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Progression to Break-Even</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-semibold text-gray-700">Month</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Cumulative Units</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Revenue</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Costs</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Profit/Loss</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.monthlyData.map((data: any) => (
                        <tr key={data.month} className="border-b border-gray-100">
                          <td className="py-2 text-gray-600">{data.month}</td>
                          <td className="py-2 text-right font-medium">{data.units.toLocaleString()}</td>
                          <td className="py-2 text-right">{formatCurrency(data.revenue)}</td>
                          <td className="py-2 text-right text-red-600">{formatCurrency(data.costs)}</td>
                          <td className={`py-2 text-right font-medium ${data.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(data.profit)}
                          </td>
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
              <p className="text-gray-500">Enter your business parameters and click calculate to find your break-even point</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}