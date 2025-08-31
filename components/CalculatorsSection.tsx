// components/CalculatorsSection.tsx
'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, PiggyBank, Home } from 'lucide-react';

interface CalculatorResult {
  futureValue: number;
  totalInterest: number;
  totalContributions: number;
  monthlyDetails?: Array<{
    month: number;
    balance: number;
    interest: number;
    contribution: number;
  }>;
}

const CalculatorsSection = () => {
  const [activeCalculator, setActiveCalculator] = useState('compound');

  // Compound Interest Calculator
  const [compoundInputs, setCompoundInputs] = useState({
    principal: 5000,
    rate: 5,
    time: 5,
    compound: 12,
    monthlyContribution: 0
  });
  
  const [compoundResult, setCompoundResult] = useState<CalculatorResult | null>(null);

  // Loan Calculator
  const [loanInputs, setLoanInputs] = useState({
    loanAmount: 200000,
    rate: 4.5,
    years: 30
  });
  
  const [loanResult, setLoanResult] = useState<any>(null);

  // Retirement Calculator
  const [retirementInputs, setRetirementInputs] = useState({
    currentAge: 25,
    retirementAge: 65,
    currentSavings: 10000,
    monthlyContribution: 500,
    annualReturn: 7
  });
  
  const [retirementResult, setRetirementResult] = useState<CalculatorResult | null>(null);

  // Investment Calculator
  const [investmentInputs, setInvestmentInputs] = useState({
    initialAmount: 10000,
    monthlyContribution: 200,
    years: 10,
    annualReturn: 8
  });
  
  const [investmentResult, setInvestmentResult] = useState<CalculatorResult | null>(null);

  const calculateCompoundInterest = () => {
    const { principal, rate, time, compound, monthlyContribution } = compoundInputs;
    const r = rate / 100;
    const monthlyRate = r / compound;
    const totalMonths = time * compound;
    
    let balance = principal;
    const monthlyDetails = [];
    
    for (let month = 1; month <= totalMonths; month++) {
      const interest = balance * monthlyRate;
      balance += interest + monthlyContribution;
      
      monthlyDetails.push({
        month,
        balance: parseFloat(balance.toFixed(2)),
        interest: parseFloat(interest.toFixed(2)),
        contribution: monthlyContribution
      });
    }
    
    const futureValue = balance;
    const totalContributions = principal + (monthlyContribution * totalMonths);
    const totalInterest = futureValue - totalContributions;
    
    setCompoundResult({
      futureValue: parseFloat(futureValue.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      totalContributions: parseFloat(totalContributions.toFixed(2)),
      monthlyDetails: monthlyDetails.slice(-12) // Show last 12 months
    });
  };

  const calculateLoan = () => {
    const { loanAmount, rate, years } = loanInputs;
    const monthlyRate = (rate / 100) / 12;
    const totalPayments = years * 12;
    
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    const totalAmount = monthlyPayment * totalPayments;
    const totalInterest = totalAmount - loanAmount;
    
    setLoanResult({
      monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2))
    });
  };

  const calculateRetirement = () => {
    const { currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn } = retirementInputs;
    const years = retirementAge - currentAge;
    const monthlyRate = (annualReturn / 100) / 12;
    const totalMonths = years * 12;
    
    let balance = currentSavings;
    
    for (let month = 1; month <= totalMonths; month++) {
      const interest = balance * monthlyRate;
      balance += interest + monthlyContribution;
    }
    
    const futureValue = balance;
    const totalContributions = currentSavings + (monthlyContribution * totalMonths);
    const totalInterest = futureValue - totalContributions;
    
    setRetirementResult({
      futureValue: parseFloat(futureValue.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      totalContributions: parseFloat(totalContributions.toFixed(2))
    });
  };

  const calculateInvestment = () => {
    const { initialAmount, monthlyContribution, years, annualReturn } = investmentInputs;
    const monthlyRate = (annualReturn / 100) / 12;
    const totalMonths = years * 12;
    
    let balance = initialAmount;
    
    for (let month = 1; month <= totalMonths; month++) {
      const interest = balance * monthlyRate;
      balance += interest + monthlyContribution;
    }
    
    const futureValue = balance;
    const totalContributions = initialAmount + (monthlyContribution * totalMonths);
    const totalInterest = futureValue - totalContributions;
    
    setInvestmentResult({
      futureValue: parseFloat(futureValue.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      totalContributions: parseFloat(totalContributions.toFixed(2))
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const calculators = [
    {
      id: 'compound',
      title: 'Compound Interest',
      icon: <TrendingUp className="w-5 h-5" />,
      description: 'Calculate compound interest with regular contributions'
    },
    {
      id: 'loan',
      title: 'Loan Calculator',
      icon: <Home className="w-5 h-5" />,
      description: 'Calculate monthly payments and total interest'
    },
    {
      id: 'retirement',
      title: 'Retirement Planning',
      icon: <PiggyBank className="w-5 h-5" />,
      description: 'Plan your retirement savings strategy'
    },
    {
      id: 'investment',
      title: 'Investment Growth',
      icon: <DollarSign className="w-5 h-5" />,
      description: 'Project investment growth over time'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Calculator className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Financial Calculators</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Plan your financial future with our comprehensive suite of calculators. 
            Make informed decisions about investments, loans, and retirement planning.
          </p>
        </div>

        {/* Calculator Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {calculators.map((calc) => (
            <button
              key={calc.id}
              onClick={() => setActiveCalculator(calc.id)}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeCalculator === calc.id
                  ? 'bg-blue-600 text-white shadow-lg transform -translate-y-0.5'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md'
              }`}
            >
              {calc.icon}
              <span className="ml-2">{calc.title}</span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Compound Interest Calculator */}
          {activeCalculator === 'compound' && (
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Compound Interest Calculator</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Initial Investment ($)
                    </label>
                    <input
                      type="number"
                      value={compoundInputs.principal}
                      onChange={(e) => setCompoundInputs({...compoundInputs, principal: Number(e.target.value)})}
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
                      value={compoundInputs.rate}
                      onChange={(e) => setCompoundInputs({...compoundInputs, rate: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Period (Years)
                    </label>
                    <input
                      type="number"
                      value={compoundInputs.time}
                      onChange={(e) => setCompoundInputs({...compoundInputs, time: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Contribution ($)
                    </label>
                    <input
                      type="number"
                      value={compoundInputs.monthlyContribution}
                      onChange={(e) => setCompoundInputs({...compoundInputs, monthlyContribution: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <button
                    onClick={calculateCompoundInterest}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Calculate
                  </button>
                </div>
                
                {compoundResult && (
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Results</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Future Value:</span>
                        <span className="font-bold text-green-600 text-lg">
                          {formatCurrency(compoundResult.futureValue)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Interest:</span>
                        <span className="font-semibold text-blue-600">
                          {formatCurrency(compoundResult.totalInterest)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Contributions:</span>
                        <span className="font-semibold">
                          {formatCurrency(compoundResult.totalContributions)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Loan Calculator */}
          {activeCalculator === 'loan' && (
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Loan Calculator</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Amount ($)
                    </label>
                    <input
                      type="number"
                      value={loanInputs.loanAmount}
                      onChange={(e) => setLoanInputs({...loanInputs, loanAmount: Number(e.target.value)})}
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
                      value={loanInputs.rate}
                      onChange={(e) => setLoanInputs({...loanInputs, rate: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Term (Years)
                    </label>
                    <input
                      type="number"
                      value={loanInputs.years}
                      onChange={(e) => setLoanInputs({...loanInputs, years: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <button
                    onClick={calculateLoan}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Calculate
                  </button>
                </div>
                
                {loanResult && (
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Monthly Payment</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Payment:</span>
                        <span className="font-bold text-red-600 text-lg">
                          {formatCurrency(loanResult.monthlyPayment)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Interest:</span>
                        <span className="font-semibold text-orange-600">
                          {formatCurrency(loanResult.totalInterest)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="font-semibold">
                          {formatCurrency(loanResult.totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Retirement Calculator */}
          {activeCalculator === 'retirement' && (
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Retirement Planning Calculator</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Age
                      </label>
                      <input
                        type="number"
                        value={retirementInputs.currentAge}
                        onChange={(e) => setRetirementInputs({...retirementInputs, currentAge: Number(e.target.value)})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Retirement Age
                      </label>
                      <input
                        type="number"
                        value={retirementInputs.retirementAge}
                        onChange={(e) => setRetirementInputs({...retirementInputs, retirementAge: Number(e.target.value)})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Savings ($)
                    </label>
                    <input
                      type="number"
                      value={retirementInputs.currentSavings}
                      onChange={(e) => setRetirementInputs({...retirementInputs, currentSavings: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Contribution ($)
                    </label>
                    <input
                      type="number"
                      value={retirementInputs.monthlyContribution}
                      onChange={(e) => setRetirementInputs({...retirementInputs, monthlyContribution: Number(e.target.value)})}
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
                      value={retirementInputs.annualReturn}
                      onChange={(e) => setRetirementInputs({...retirementInputs, annualReturn: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <button
                    onClick={calculateRetirement}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Calculate
                  </button>
                </div>
                
                {retirementResult && (
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Retirement Projection</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Retirement Balance:</span>
                        <span className="font-bold text-purple-600 text-lg">
                          {formatCurrency(retirementResult.futureValue)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Interest Earned:</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(retirementResult.totalInterest)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Contributions:</span>
                        <span className="font-semibold">
                          {formatCurrency(retirementResult.totalContributions)}
                        </span>
                      </div>
                      <div className="mt-4 p-3 bg-white rounded-lg">
                        <p className="text-sm text-gray-600">
                          Years to retirement: {retirementInputs.retirementAge - retirementInputs.currentAge}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Investment Calculator */}
          {activeCalculator === 'investment' && (
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Investment Growth Calculator</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Initial Investment ($)
                    </label>
                    <input
                      type="number"
                      value={investmentInputs.initialAmount}
                      onChange={(e) => setInvestmentInputs({...investmentInputs, initialAmount: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Contribution ($)
                    </label>
                    <input
                      type="number"
                      value={investmentInputs.monthlyContribution}
                      onChange={(e) => setInvestmentInputs({...investmentInputs, monthlyContribution: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Period (Years)
                    </label>
                    <input
                      type="number"
                      value={investmentInputs.years}
                      onChange={(e) => setInvestmentInputs({...investmentInputs, years: Number(e.target.value)})}
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
                      value={investmentInputs.annualReturn}
                      onChange={(e) => setInvestmentInputs({...investmentInputs, annualReturn: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <button
                    onClick={calculateInvestment}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Calculate
                  </button>
                </div>
                
                {investmentResult && (
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Investment Projection</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Final Value:</span>
                        <span className="font-bold text-emerald-600 text-lg">
                          {formatCurrency(investmentResult.futureValue)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Gains:</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(investmentResult.totalInterest)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Invested:</span>
                        <span className="font-semibold">
                          {formatCurrency(investmentResult.totalContributions)}
                        </span>
                      </div>
                      <div className="mt-4 p-3 bg-white rounded-lg">
                        <p className="text-sm text-gray-600">
                          ROI: {((investmentResult.totalInterest / investmentResult.totalContributions) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Educational Content */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <TrendingUp className="w-8 h-8 text-blue-600 mb-4" />
            <h4 className="text-lg font-bold text-gray-900 mb-3">Start Early</h4>
            <p className="text-gray-600">
              Time is your greatest asset when it comes to compound interest. 
              Starting early gives your money more time to grow exponentially.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <DollarSign className="w-8 h-8 text-green-600 mb-4" />
            <h4 className="text-lg font-bold text-gray-900 mb-3">Regular Contributions</h4>
            <p className="text-gray-600">
              Consistent monthly contributions amplify the compounding effect, 
              creating a powerful wealth-building strategy over time.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <PiggyBank className="w-8 h-8 text-purple-600 mb-4" />
            <h4 className="text-lg font-bold text-gray-900 mb-3">Higher Frequency</h4>
            <p className="text-gray-600">
              More frequent compounding periods can lead to higher returns. 
              Consider options that compound monthly or daily.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> These calculators are for educational purposes only. 
            Results are estimates and should not be considered as financial advice. 
            Please consult with a qualified financial advisor for personalized guidance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CalculatorsSection;