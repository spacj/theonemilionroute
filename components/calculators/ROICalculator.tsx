'use client';

import { useState } from 'react';
import { DollarSign } from 'lucide-react';

interface Investment {
  id: string;
  name: string;
  initialInvestment: number;
  currentValue: number;
  timeHorizon: number; // in months
  category: string;
}

export default function ROICalculator() {
  const [investments, setInvestments] = useState<Investment[]>([
    { id: '1', name: 'Stock Portfolio', initialInvestment: 10000, currentValue: 12500, timeHorizon: 18, category: 'stocks' },
    { id: '2', name: 'Real Estate', initialInvestment: 50000, currentValue: 55000, timeHorizon: 24, category: 'realestate' },
    { id: '3', name: 'Crypto Investment', initialInvestment: 5000, currentValue: 4200, timeHorizon: 12, category: 'crypto' }
  ]);

  const [newInvestment, setNewInvestment] = useState({
    name: '',
    initialInvestment: 0,
    currentValue: 0,
    timeHorizon: 12,
    category: 'stocks'
  });

  const [simpleInputs, setSimpleInputs] = useState({
    initialInvestment: 1000,
    finalValue: 1200,
    timeHorizon: 12
  });

  const [result, setResult] = useState<any>(null);

  const addInvestment = () => {
    if (newInvestment.name.trim() && newInvestment.initialInvestment > 0) {
      const investment: Investment = {
        id: Date.now().toString(),
        name: newInvestment.name,
        initialInvestment: newInvestment.initialInvestment,
        currentValue: newInvestment.currentValue,
        timeHorizon: newInvestment.timeHorizon,
        category: newInvestment.category
      };
      setInvestments([...investments, investment]);
      setNewInvestment({ name: '', initialInvestment: 0, currentValue: 0, timeHorizon: 12, category: 'stocks' });
    }
  };

  const removeInvestment = (id: string) => {
    setInvestments(investments.filter(i => i.id !== id));
  };

  const calculateROI = (initial: number, current: number, months: number) => {
    const roi = ((current - initial) / initial) * 100;
    const annualizedROI = ((Math.pow(current / initial, 12 / months) - 1) * 100);
    return { roi, annualizedROI };
  };

  const calculate = () => {
    // Portfolio analysis
    const portfolioAnalysis = investments.map(inv => {
      const { roi, annualizedROI } = calculateROI(inv.initialInvestment, inv.currentValue, inv.timeHorizon);
      return {
        ...inv,
        roi: parseFloat(roi.toFixed(2)),
        annualizedROI: parseFloat(annualizedROI.toFixed(2)),
        profit: parseFloat((inv.currentValue - inv.initialInvestment).toFixed(2))
      };
    });

    // Overall portfolio metrics
    const totalInvested = investments.reduce((sum, inv) => sum + inv.initialInvestment, 0);
    const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
    const totalProfit = totalCurrentValue - totalInvested;
    const overallROI = ((totalCurrentValue - totalInvested) / totalInvested) * 100;

    // Simple ROI calculation
    const { roi: simpleROI, annualizedROI: simpleAnnualizedROI } = calculateROI(
      simpleInputs.initialInvestment,
      simpleInputs.finalValue,
      simpleInputs.timeHorizon
    );

    // Category breakdown
    const categories = ['stocks', 'realestate', 'crypto', 'bonds', 'other'];
    const categoryBreakdown = categories.map(category => {
      const categoryInvestments = portfolioAnalysis.filter(inv => inv.category === category);
      if (categoryInvestments.length === 0) return null;

      const categoryInvested = categoryInvestments.reduce((sum, inv) => sum + inv.initialInvestment, 0);
      const categoryCurrentValue = categoryInvestments.reduce((sum, inv) => sum + inv.currentValue, 0);
      const categoryROI = ((categoryCurrentValue - categoryInvested) / categoryInvested) * 100;

      return {
        category,
        invested: categoryInvested,
        currentValue: categoryCurrentValue,
        roi: parseFloat(categoryROI.toFixed(2)),
        count: categoryInvestments.length
      };
    }).filter(Boolean);

    setResult({
      portfolioAnalysis,
      totalInvested: parseFloat(totalInvested.toFixed(2)),
      totalCurrentValue: parseFloat(totalCurrentValue.toFixed(2)),
      totalProfit: parseFloat(totalProfit.toFixed(2)),
      overallROI: parseFloat(overallROI.toFixed(2)),
      simpleROI: parseFloat(simpleROI.toFixed(2)),
      simpleAnnualizedROI: parseFloat(simpleAnnualizedROI.toFixed(2)),
      categoryBreakdown
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
        <DollarSign className="w-8 h-8 text-indigo-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">ROI Calculator</h1>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6">
          {/* Simple ROI Calculator */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Simple ROI Calculation</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Initial Investment ($)</label>
                <input
                  type="number"
                  value={simpleInputs.initialInvestment}
                  onChange={(e) => setSimpleInputs({...simpleInputs, initialInvestment: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current/Final Value ($)</label>
                <input
                  type="number"
                  value={simpleInputs.finalValue}
                  onChange={(e) => setSimpleInputs({...simpleInputs, finalValue: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Period (months)</label>
                <input
                  type="number"
                  value={simpleInputs.timeHorizon}
                  onChange={(e) => setSimpleInputs({...simpleInputs, timeHorizon: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Add Investment to Portfolio */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add to Portfolio</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Investment name"
                value={newInvestment.name}
                onChange={(e) => setNewInvestment({...newInvestment, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Initial amount"
                  value={newInvestment.initialInvestment}
                  onChange={(e) => setNewInvestment({...newInvestment, initialInvestment: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Current value"
                  value={newInvestment.currentValue}
                  onChange={(e) => setNewInvestment({...newInvestment, currentValue: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <input
                type="number"
                placeholder="Time period (months)"
                value={newInvestment.timeHorizon}
                onChange={(e) => setNewInvestment({...newInvestment, timeHorizon: Number(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <select
                value={newInvestment.category}
                onChange={(e) => setNewInvestment({...newInvestment, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="stocks">Stocks</option>
                <option value="realestate">Real Estate</option>
                <option value="crypto">Cryptocurrency</option>
                <option value="bonds">Bonds</option>
                <option value="other">Other</option>
              </select>
              <button
                onClick={addInvestment}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
              >
                Add Investment
              </button>
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
          >
            Calculate ROI
          </button>
        </div>
        
        {/* Results Section */}
        <div className="lg:col-span-2">
          {/* Portfolio List */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Current Portfolio</h3>
            <div className="space-y-2">
              {investments.map((investment) => (
                <div key={investment.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <span className="font-medium">{investment.name}</span>
                    <span className="ml-2 text-sm text-gray-500 capitalize">({investment.category})</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right text-sm">
                      <div>{formatCurrency(investment.initialInvestment)} → {formatCurrency(investment.currentValue)}</div>
                      <div className="text-gray-500">{investment.timeHorizon} months</div>
                    </div>
                    <button
                      onClick={() => removeInvestment(investment.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {result && (
            <div className="space-y-6">
              {/* Simple ROI Results */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
                <h3 className="text-xl font-bold text-yellow-900 mb-4">Simple ROI Calculation</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-yellow-800">Total ROI</h4>
                    <p className="text-2xl font-bold text-yellow-600">{result.simpleROI.toFixed(2)}%</p>
                  </div>
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-yellow-800">Annualized ROI</h4>
                    <p className="text-2xl font-bold text-yellow-600">{result.simpleAnnualizedROI.toFixed(2)}%</p>
                  </div>
                </div>
              </div>

              {/* Portfolio Summary */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Total Value</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(result.totalCurrentValue)}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Profit/Loss</h3>
                  <p className={`text-2xl font-bold ${result.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(result.totalProfit)}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Overall ROI</h3>
                  <p className={`text-2xl font-bold ${result.overallROI >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {result.overallROI.toFixed(2)}%
                  </p>
                </div>
              </div>

              {/* Individual Investment Performance */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Individual Investment Performance</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-semibold text-gray-700">Investment</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Initial</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Current</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Profit/Loss</th>
                        <th className="text-right py-2 font-semibold text-gray-700">ROI</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Annualized ROI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.portfolioAnalysis.map((inv: any) => (
                        <tr key={inv.id} className="border-b border-gray-100">
                          <td className="py-2">
                            <div>
                              <span className="font-medium">{inv.name}</span>
                              <div className="text-xs text-gray-500 capitalize">{inv.category} • {inv.timeHorizon}mo</div>
                            </div>
                          </td>
                          <td className="py-2 text-right">{formatCurrency(inv.initialInvestment)}</td>
                          <td className="py-2 text-right">{formatCurrency(inv.currentValue)}</td>
                          <td className={`py-2 text-right font-medium ${inv.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(inv.profit)}
                          </td>
                          <td className={`py-2 text-right font-medium ${inv.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {inv.roi.toFixed(2)}%
                          </td>
                          <td className={`py-2 text-right font-medium ${inv.annualizedROI >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {inv.annualizedROI.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Category Breakdown */}
              {result.categoryBreakdown.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Performance by Category</h3>
                  <div className="space-y-3">
                    {result.categoryBreakdown.map((category: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                        <div>
                          <h4 className="font-semibold capitalize">{category.category}</h4>
                          <p className="text-sm text-gray-600">{category.count} investment(s)</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{formatCurrency(category.currentValue)}</p>
                          <p className={`text-sm font-medium ${category.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {category.roi.toFixed(2)}% ROI
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ROI Insights */}
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4">ROI Insights</h3>
                <div className="space-y-2 text-blue-800">
                  <p>• <strong>Total Return:</strong> {formatCurrency(result.totalProfit)} on {formatCurrency(result.totalInvested)} invested</p>
                  <p>• <strong>Best Performer:</strong> {result.portfolioAnalysis.reduce((best: any, current: any) => current.roi > best.roi ? current : best, result.portfolioAnalysis[0])?.name} ({result.portfolioAnalysis.reduce((best: any, current: any) => current.roi > best.roi ? current : best, result.portfolioAnalysis[0])?.roi.toFixed(2)}%)</p>
                  <p>• <strong>Worst Performer:</strong> {result.portfolioAnalysis.reduce((worst: any, current: any) => current.roi < worst.roi ? current : worst, result.portfolioAnalysis[0])?.name} ({result.portfolioAnalysis.reduce((worst: any, current: any) => current.roi < worst.roi ? current : worst, result.portfolioAnalysis[0])?.roi.toFixed(2)}%)</p>
                </div>
              </div>
            </div>
          )}
          
          {!result && (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl">
              <p className="text-gray-500">Enter investment details and click calculate to analyze ROI</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}