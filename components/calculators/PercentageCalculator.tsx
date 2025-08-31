'use client';

import { useState } from 'react';
import { Percent } from 'lucide-react';

export default function PercentageCalculator() {
  const [activeTab, setActiveTab] = useState('basic');
  
  // Basic percentage
  const [basicInputs, setBasicInputs] = useState({
    percentage: 20,
    number: 100
  });
  const [basicResult, setBasicResult] = useState<number | null>(null);
  
  // Percentage change
  const [changeInputs, setChangeInputs] = useState({
    oldValue: 100,
    newValue: 120
  });
  const [changeResult, setChangeResult] = useState<any>(null);

  const calculateBasic = () => {
    const result = (basicInputs.percentage / 100) * basicInputs.number;
    setBasicResult(parseFloat(result.toFixed(2)));
  };

  const calculateChange = () => {
    const change = changeInputs.newValue - changeInputs.oldValue;
    const percentageChange = (change / changeInputs.oldValue) * 100;
    
    setChangeResult({
      change: parseFloat(change.toFixed(2)),
      percentageChange: parseFloat(percentageChange.toFixed(2)),
      isIncrease: change > 0
    });
  };

  return (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <Percent className="w-8 h-8 text-blue-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Percentage Calculator</h1>
      </div>
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('basic')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'basic'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Basic Percentage
        </button>
        <button
          onClick={() => setActiveTab('change')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === 'change'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Percentage Change
        </button>
      </div>

      {/* Basic Percentage Tab */}
      {activeTab === 'basic' && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Percentage (%)
              </label>
              <input
                type="number"
                value={basicInputs.percentage}
                onChange={(e) => setBasicInputs({...basicInputs, percentage: Number(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Of Number
              </label>
              <input
                type="number"
                value={basicInputs.number}
                onChange={(e) => setBasicInputs({...basicInputs, number: Number(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={calculateBasic}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Calculate
            </button>
          </div>
          
          {basicResult !== null && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Result</h3>
              <div className="text-center bg-white p-6 rounded-lg shadow-sm">
                <span className="text-gray-600 block mb-2">
                  {basicInputs.percentage}% of {basicInputs.number} is
                </span>
                <span className="font-bold text-blue-600 text-3xl">
                  {basicResult}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Percentage Change Tab */}
      {activeTab === 'change' && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Value
              </label>
              <input
                type="number"
                value={changeInputs.oldValue}
                onChange={(e) => setChangeInputs({...changeInputs, oldValue: Number(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Value
              </label>
              <input
                type="number"
                value={changeInputs.newValue}
                onChange={(e) => setChangeInputs({...changeInputs, newValue: Number(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={calculateChange}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Calculate Change
            </button>
          </div>
          
          {changeResult && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Result</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <span className="text-gray-600 block mb-1">Percentage Change:</span>
                  <span className={`font-bold text-2xl ${
                    changeResult.isIncrease ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {changeResult.isIncrease ? '+' : ''}{changeResult.percentageChange}%
                  </span>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <span className="text-gray-600 block mb-1">Absolute Change:</span>
                  <span className={`font-semibold text-lg ${
                    changeResult.isIncrease ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {changeResult.isIncrease ? '+' : ''}{changeResult.change}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}