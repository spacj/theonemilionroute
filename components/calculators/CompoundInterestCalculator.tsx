'use client';

import { useState } from 'react';
import { TrendingUp, DollarSign, Percent } from 'lucide-react';

interface YearlyData {
  year: number;
  balance: number;
  totalContributions: number;
  interestEarned: number;
  yearlyGrowth: number;
}

interface CalculationResult {
  futureValue: number;
  totalInterest: number;
  totalContributions: number;
  yearlyData: YearlyData[];
  effectiveAnnualRate: number;
  periodicRate: number;
  roi: number;
  contributionFrequencyText: string;
  interestRateLabel: string;
}

interface Inputs {
  principal: number;
  rate: number;
  time: number;
  contributionFrequency: number;
  contributionAmount: number;
}

export default function CompoundInterestCalculator() {
  const [inputs, setInputs] = useState<Inputs>({
    principal: 5000,
    rate: 5,
    time: 5,
    contributionFrequency: 12, // How often contributions are made
    contributionAmount: 0
  });
  
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculate = () => {
    const { principal, rate, time, contributionFrequency, contributionAmount } = inputs;
    
    // Validate inputs
    if (principal < 0 || rate < 0 || time <= 0 || contributionFrequency <= 0 || contributionAmount < 0) {
      alert('Please enter valid positive values');
      return;
    }
    
    // Now rate is already the periodic rate (matches the frequency)
    const periodicRate = rate / 100;
    const compoundFrequency = contributionFrequency;
    const totalPeriods = time * compoundFrequency;
    
    // Calculate compound interest with regular contributions
    let futureValue;
    
    if (contributionAmount === 0) {
      // Simple compound interest: A = P(1 + r)^t
      futureValue = principal * Math.pow(1 + periodicRate, totalPeriods);
    } else {
      // Compound interest with regular contributions
      // FV = P(1 + r)^t + PMT[((1 + r)^t - 1) / r]
      const compoundedPrincipal = principal * Math.pow(1 + periodicRate, totalPeriods);
      
      let contributionFutureValue = 0;
      if (periodicRate > 0) {
        contributionFutureValue = contributionAmount * ((Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate);
      } else {
        contributionFutureValue = contributionAmount * totalPeriods;
      }
      
      futureValue = compoundedPrincipal + contributionFutureValue;
    }
    
    // Calculate totals
    const totalContributions = principal + (contributionAmount * contributionFrequency * time);
    const totalInterest = futureValue - totalContributions;
    
    // Generate yearly breakdown
    const yearlyData: YearlyData[] = [];
    let currentBalance = principal;
    let totalContributionsSoFar = principal;
    
    for (let year = 1; year <= time; year++) {
      const periodsInYear = compoundFrequency;
      const contributionsThisYear = contributionAmount * contributionFrequency;
      
      // Apply compound interest for the year
      for (let period = 0; period < periodsInYear; period++) {
        currentBalance *= (1 + periodicRate);
        // Add contribution for this period
        currentBalance += contributionAmount;
      }
      
      totalContributionsSoFar += contributionsThisYear;
      const interestEarned = currentBalance - totalContributionsSoFar;
      
      yearlyData.push({
        year,
        balance: currentBalance,
        totalContributions: totalContributionsSoFar,
        interestEarned: interestEarned,
        yearlyGrowth: year === 1 ? 
          ((currentBalance - principal) / principal * 100) :
          ((currentBalance - yearlyData[year-2].balance) / yearlyData[year-2].balance * 100)
      });
    }
    
    // Calculate effective annual rate - convert periodic rate to annual
    let effectiveAnnualRate;
    if (contributionFrequency === 1) {
      effectiveAnnualRate = rate; // Already annual
    } else {
      effectiveAnnualRate = ((Math.pow(1 + periodicRate, contributionFrequency) - 1) * 100);
    }
    
    // Calculate ROI
    const roi = ((futureValue - totalContributions) / totalContributions * 100);
    
    setResult({
      futureValue,
      totalInterest,
      totalContributions,
      yearlyData,
      effectiveAnnualRate,
      periodicRate: rate,
      roi,
      contributionFrequencyText: getContributionFrequencyText(contributionFrequency),
      interestRateLabel: getInterestRateLabel(contributionFrequency)
    });
  };

  const getInterestRateLabel = (frequency: number) => {
    switch (frequency) {
      case 1: return 'Annual';
      case 4: return 'Quarterly';
      case 12: return 'Monthly';
      case 52: return 'Weekly';
      case 365: return 'Daily';
      default: return 'Periodic';
    }
  };

  const getContributionFrequencyText = (frequency: number) => {
    switch (frequency) {
      case 1: return 'Annual';
      case 4: return 'Quarterly';
      case 12: return 'Monthly';
      case 52: return 'Weekly';
      case 365: return 'Daily';
      default: return `${frequency} times per year`;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatPercent = (percent: number) => {
    return `${percent.toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Compound Interest Calculator</h1>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Investment Details</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Investment ($)
              </label>
              <input
                type="number"
                value={inputs.principal}
                onChange={(e) => setInputs({...inputs, principal: Number(e.target.value) || 0})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={inputs.rate}
                onChange={(e) => setInputs({...inputs, rate: Number(e.target.value) || 0})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                max="50"
              />
              <p className="text-xs text-gray-500 mt-1">
                {getInterestRateLabel(inputs.contributionFrequency)} interest rate
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Period (Years)
              </label>
              <input
                type="number"
                value={inputs.time}
                onChange={(e) => setInputs({...inputs, time: Number(e.target.value) || 1})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contribution Frequency & Amount
              </label>
              <div className="space-y-3">
                <select
                  value={inputs.contributionFrequency}
                  onChange={(e) => setInputs({...inputs, contributionFrequency: Number(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={1}>Annual contributions</option>
                  <option value={4}>Quarterly contributions</option>
                  <option value={12}>Monthly contributions</option>
                  <option value={52}>Weekly contributions</option>
                </select>
                <input
                  type="number"
                  value={inputs.contributionAmount}
                  onChange={(e) => setInputs({...inputs, contributionAmount: Number(e.target.value) || 0})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  step="50"
                  placeholder={`Amount per ${getContributionFrequencyText(inputs.contributionFrequency).toLowerCase()} contribution`}
                />
                <p className="text-xs text-gray-500">
                  {inputs.contributionAmount > 0 && (
                    <>Total annual contributions: {formatCurrency(inputs.contributionAmount * inputs.contributionFrequency)}</>
                  )}
                </p>
              </div>
            </div>
            
            <button
              onClick={calculate}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              Calculate Returns
            </button>
          </div>
          
          {/* Results Section */}
          <div className="lg:col-span-2">
            {result && (
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                      <h3 className="text-lg font-semibold text-green-900">Future Value</h3>
                    </div>
                    <p className="text-3xl font-bold text-green-600">
                      {formatCurrency(result.futureValue)}
                    </p>
                    <p className="text-sm text-green-700 mt-1">Total investment value</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                      <h3 className="text-lg font-semibold text-blue-900">Interest Earned</h3>
                    </div>
                    <p className="text-3xl font-bold text-blue-600">
                      {formatCurrency(result.totalInterest)}
                    </p>
                    <p className="text-sm text-blue-700 mt-1">Compound interest gains</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200">
                    <div className="flex items-center mb-2">
                      <Percent className="w-5 h-5 text-purple-600 mr-2" />
                      <h3 className="text-lg font-semibold text-purple-900">{result.interestRateLabel} Rate</h3>
                    </div>
                    <p className="text-3xl font-bold text-purple-600">
                      {formatPercent(result.periodicRate)}
                    </p>
                    <p className="text-sm text-purple-700 mt-1">Per {result.contributionFrequencyText.toLowerCase()} period</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                    <h3 className="text-lg font-semibold text-orange-900 mb-2">Effective Annual Rate</h3>
                    <p className="text-3xl font-bold text-orange-600">
                      {formatPercent(result.effectiveAnnualRate)}
                    </p>
                    <p className="text-sm text-orange-700 mt-1">Annualized return (APY)</p>
                  </div>
                </div>

                {/* Investment Summary */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Investment Summary</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Initial Investment:</span>
                        <span className="font-semibold">{formatCurrency(inputs.principal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contribution Frequency:</span>
                        <span className="font-semibold">{getContributionFrequencyText(inputs.contributionFrequency)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contribution Amount:</span>
                        <span className="font-semibold">{formatCurrency(inputs.contributionAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Annual Contributions:</span>
                        <span className="font-semibold">{formatCurrency(inputs.contributionAmount * inputs.contributionFrequency)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{result.interestRateLabel} Interest Rate:</span>
                        <span className="font-semibold">{inputs.rate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Effective Annual Rate:</span>
                        <span className="font-semibold">{formatPercent(result.effectiveAnnualRate)}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time Period:</span>
                        <span className="font-semibold">{inputs.time} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Contributions:</span>
                        <span className="font-semibold">{formatCurrency(result.totalContributions)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Compounding:</span>
                        <span className="font-semibold">{result.contributionFrequencyText}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest Earned:</span>
                        <span className="font-semibold text-green-600">{formatCurrency(result.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Final Value:</span>
                        <span className="font-bold text-lg">{formatCurrency(result.futureValue)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Growth Visualization */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Growth Breakdown</h3>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">Principal</p>
                      <p className="text-lg font-bold text-blue-600">{formatCurrency(inputs.principal)}</p>
                      <p className="text-xs text-gray-500">
                        {((inputs.principal / result.futureValue) * 100).toFixed(1)}% of total
                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600">Contributions</p>
                      <p className="text-lg font-bold text-green-600">
                        {formatCurrency(result.totalContributions - inputs.principal)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(((result.totalContributions - inputs.principal) / result.futureValue) * 100).toFixed(1)}% of total
                      </p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-gray-600">Interest</p>
                      <p className="text-lg font-bold text-yellow-600">{formatCurrency(result.totalInterest)}</p>
                      <p className="text-xs text-gray-500">
                        {((result.totalInterest / result.futureValue) * 100).toFixed(1)}% of total
                      </p>
                    </div>
                  </div>
                </div>

                {/* Yearly Growth Table */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Year-by-Year Growth</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left py-3 px-2 font-semibold text-gray-700">Year</th>
                          <th className="text-right py-3 px-2 font-semibold text-gray-700">Balance</th>
                          <th className="text-right py-3 px-2 font-semibold text-gray-700">Contributions</th>
                          <th className="text-right py-3 px-2 font-semibold text-gray-700">Interest Earned</th>
                          <th className="text-right py-3 px-2 font-semibold text-gray-700">Growth Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.yearlyData.map((data: YearlyData, index: number) => (
                          <tr key={data.year} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-25' : 'bg-white'}`}>
                            <td className="py-3 px-2 text-gray-600 font-medium">{data.year}</td>
                            <td className="py-3 px-2 text-right font-bold">{formatCurrency(data.balance)}</td>
                            <td className="py-3 px-2 text-right text-blue-600 font-medium">{formatCurrency(data.totalContributions)}</td>
                            <td className="py-3 px-2 text-right text-green-600 font-medium">{formatCurrency(data.interestEarned)}</td>
                            <td className="py-3 px-2 text-right font-medium">{formatPercent(data.yearlyGrowth)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Growth rate shows percentage increase from previous year's balance.
                  </p>
                </div>
              </div>
            )}
            
            {!result && (
              <div className="bg-white rounded-xl shadow-sm">
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Enter your investment details and click calculate</p>
                    <p className="text-gray-400 text-sm mt-2">See how compound interest grows your investments over time</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}