'use client';

import { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function LoanCalculator() {
  const [inputs, setInputs] = useState({
    principal: 250000,
    rate: 4.5,
    time: 30,
    downPayment: 50000,
    propertyTax: 3000,
    insurance: 1200,
    pmi: 0
  });
  
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const { principal, rate, time, downPayment, propertyTax, insurance, pmi } = inputs;
    const loanAmount = principal - downPayment;
    const monthlyRate = (rate / 100) / 12;
    const totalPayments = time * 12;
    
    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    } else {
      monthlyPayment = loanAmount / totalPayments;
    }
    
    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = insurance / 12;
    const monthlyPMI = pmi / 12;
    const totalMonthlyPayment = monthlyPayment + monthlyTax + monthlyInsurance + monthlyPMI;
    
    const totalInterest = (monthlyPayment * totalPayments) - loanAmount;
    const totalCost = loanAmount + totalInterest + downPayment;
    
    // Generate amortization schedule (first 12 months)
    const schedule = [];
    let remainingBalance = loanAmount;
    
    for (let month = 1; month <= Math.min(12, totalPayments); month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      
      schedule.push({
        month,
        payment: parseFloat(monthlyPayment.toFixed(2)),
        principal: parseFloat(principalPayment.toFixed(2)),
        interest: parseFloat(interestPayment.toFixed(2)),
        balance: parseFloat(remainingBalance.toFixed(2))
      });
    }
    
    setResult({
      monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
      totalMonthlyPayment: parseFloat(totalMonthlyPayment.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      totalCost: parseFloat(totalCost.toFixed(2)),
      loanAmount: parseFloat(loanAmount.toFixed(2)),
      schedule
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
        <Calculator className="w-8 h-8 text-green-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Loan Calculator</h1>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Home Price ($)
            </label>
            <input
              type="number"
              value={inputs.principal}
              onChange={(e) => setInputs({...inputs, principal: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Down Payment ($)
            </label>
            <input
              type="number"
              value={inputs.downPayment}
              onChange={(e) => setInputs({...inputs, downPayment: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              onChange={(e) => setInputs({...inputs, rate: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term (Years)
            </label>
            <select
              value={inputs.time}
              onChange={(e) => setInputs({...inputs, time: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value={15}>15 years</option>
              <option value={30}>30 years</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Property Tax ($)
            </label>
            <input
              type="number"
              value={inputs.propertyTax}
              onChange={(e) => setInputs({...inputs, propertyTax: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Insurance ($)
            </label>
            <input
              type="number"
              value={inputs.insurance}
              onChange={(e) => setInputs({...inputs, insurance: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={calculate}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
          >
            Calculate Loan Payment
          </button>
        </div>
        
        {/* Results Section */}
        <div className="lg:col-span-2">
          {result && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Monthly Payment</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(result.monthlyPayment)}
                  </p>
                  <p className="text-sm text-green-700 mt-1">Principal & Interest</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Monthly</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(result.totalMonthlyPayment)}
                  </p>
                  <p className="text-sm text-blue-700 mt-1">Including taxes & insurance</p>
                </div>
                
                <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border border-red-200">
                  <h3 className="text-lg font-semibold text-red-900 mb-2">Total Interest</h3>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(result.totalInterest)}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Total Cost</h3>
                  <p className="text-2xl font-bold text-purple-600">
                    {formatCurrency(result.totalCost)}
                  </p>
                </div>
              </div>

              {/* Amortization Schedule */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">First Year Payment Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-semibold text-gray-700">Month</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Payment</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Principal</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Interest</th>
                        <th className="text-right py-2 font-semibold text-gray-700">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.schedule.map((payment: any) => (
                        <tr key={payment.month} className="border-b border-gray-100">
                          <td className="py-2 text-gray-600">{payment.month}</td>
                          <td className="py-2 text-right font-medium">{formatCurrency(payment.payment)}</td>
                          <td className="py-2 text-right text-green-600">{formatCurrency(payment.principal)}</td>
                          <td className="py-2 text-right text-red-600">{formatCurrency(payment.interest)}</td>
                          <td className="py-2 text-right font-medium">{formatCurrency(payment.balance)}</td>
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
              <p className="text-gray-500">Enter your loan details and click calculate to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}