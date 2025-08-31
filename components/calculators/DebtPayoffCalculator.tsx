'use client';

import { useState } from 'react';
import { CreditCard } from 'lucide-react';

export default function DebtPayoffCalculator() {
  const [inputs, setInputs] = useState({
    balance: 5000,
    rate: 18.99,
    minimumPayment: 150,
    extraPayment: 0,
    paymentStrategy: 'minimum'
  });
  
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const { balance, rate, minimumPayment, extraPayment } = inputs;
    const monthlyRate = rate / 100 / 12;
    const totalPayment = minimumPayment + extraPayment;
    
    let remainingBalance = balance;
    let totalInterest = 0;
    let months = 0;
    const paymentSchedule = [];
    
    while (remainingBalance > 0.01 && months < 600) { // 50 year max
      months++;
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = Math.min(totalPayment - interestPayment, remainingBalance);
      
      if (principalPayment <= 0) break; // Payment too low to cover interest
      
      remainingBalance -= principalPayment;
      totalInterest += interestPayment;
      
      if (months <= 12) {
        paymentSchedule.push({
          month: months,
          payment: parseFloat((principalPayment + interestPayment).toFixed(2)),
          principal: parseFloat(principalPayment.toFixed(2)),
          interest: parseFloat(interestPayment.toFixed(2)),
          balance: parseFloat(remainingBalance.toFixed(2))
        });
      }
    }
    
    // Calculate minimum payment scenario for comparison
    let minRemainingBalance = balance;
    let minTotalInterest = 0;
    let minMonths = 0;
    
    while (minRemainingBalance > 0.01 && minMonths < 600) {
      minMonths++;
      const interestPayment = minRemainingBalance * monthlyRate;
      const principalPayment = Math.min(minimumPayment - interestPayment, minRemainingBalance);
      
      if (principalPayment <= 0) break;
      
      minRemainingBalance -= principalPayment;
      minTotalInterest += interestPayment;
    }
    
    const interestSaved = minTotalInterest - totalInterest;
    const timeSaved = minMonths - months;
    
    setResult({
      months,
      years: parseFloat((months / 12).toFixed(1)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      totalPaid: parseFloat((balance + totalInterest).toFixed(2)),
      monthlyPayment: parseFloat(totalPayment.toFixed(2)),
      interestSaved: parseFloat(interestSaved.toFixed(2)),
      timeSaved,
      paymentSchedule
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
        <CreditCard className="w-8 h-8 text-red-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Debt Payoff Calculator</h1>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Balance ($)
            </label>
            <input
              type="number"
              value={inputs.balance}
              onChange={(e) => setInputs({...inputs, balance: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Payment ($)
            </label>
            <input
              type="number"
              value={inputs.minimumPayment}
              onChange={(e) => setInputs({...inputs, minimumPayment: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Extra Payment ($)
            </label>
            <input
              type="number"
              value={inputs.extraPayment}
              onChange={(e) => setInputs({...inputs, extraPayment: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={calculate}
            className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
          >
            Calculate Payoff Plan
          </button>
        </div>
        
        {/* Results Section */}
        <div className="lg:col-span-2">
          {result && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Payoff Time</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {result.years} years
                  </p>
                  <p className="text-sm text-green-700 mt-1">{result.months} months</p>
                </div>
                
                <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border border-red-200">
                  <h3 className="text-lg font-semibold text-red-900 mb-2">Total Interest</h3>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(result.totalInterest)}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Interest Saved</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(result.interestSaved)}
                  </p>
                  <p className="text-sm text-blue-700 mt-1">vs minimum payments</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Time Saved</h3>
                  <p className="text-2xl font-bold text-purple-600">
                    {Math.floor(result.timeSaved / 12)} years {result.timeSaved % 12} months
                  </p>
                </div>
              </div>

              {/* Payment Schedule */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">First Year Payment Schedule</h3>
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
                      {result.paymentSchedule.map((payment: any) => (
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
              <p className="text-gray-500">Enter your debt details and click calculate to see payoff plan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}