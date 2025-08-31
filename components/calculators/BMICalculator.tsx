'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';

export default function BMICalculator() {
  const [inputs, setInputs] = useState({
    weight: 70,
    height: 175,
    unit: 'metric' // metric or imperial
  });
  
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const { weight, height, unit } = inputs;
    
    let bmi: number;
    if (unit === 'metric') {
      // BMI = weight(kg) / height(m)²
      const heightInMeters = height / 100;
      bmi = weight / (heightInMeters * heightInMeters);
    } else {
      // BMI = (weight(lbs) / height(inches)²) × 703
      bmi = (weight / (height * height)) * 703;
    }
    
    let category = '';
    let color = '';
    let advice = '';
    
    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-blue-600';
      advice = 'Consider consulting with a healthcare provider about healthy weight gain strategies.';
    } else if (bmi < 25) {
      category = 'Normal weight';
      color = 'text-green-600';
      advice = 'Great! Maintain your current lifestyle with regular exercise and balanced nutrition.';
    } else if (bmi < 30) {
      category = 'Overweight';
      color = 'text-yellow-600';
      advice = 'Consider incorporating more physical activity and reviewing your diet with a healthcare provider.';
    } else {
      category = 'Obese';
      color = 'text-red-600';
      advice = 'We recommend consulting with a healthcare provider for a personalized weight management plan.';
    }
    
    setResult({
      bmi: parseFloat(bmi.toFixed(1)),
      category,
      color,
      advice
    });
  };

  return (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <Heart className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">BMI Calculator</h1>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Units
            </label>
            <select
              value={inputs.unit}
              onChange={(e) => setInputs({...inputs, unit: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="metric">Metric (kg, cm)</option>
              <option value="imperial">Imperial (lbs, inches)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight ({inputs.unit === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              value={inputs.weight}
              onChange={(e) => setInputs({...inputs, weight: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height ({inputs.unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              value={inputs.height}
              onChange={(e) => setInputs({...inputs, height: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={calculate}
            className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
          >
            Calculate BMI
          </button>
        </div>
        
        {result && (
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your BMI Result</h3>
            <div className="space-y-4">
              <div className="text-center bg-white p-6 rounded-lg shadow-sm">
                <span className="text-gray-600 block mb-2">Your BMI is</span>
                <span className={`font-bold text-4xl ${result.color}`}>
                  {result.bmi}
                </span>
                <span className={`block mt-2 font-semibold ${result.color}`}>
                  {result.category}
                </span>
              </div>
              
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Health Advice</h4>
                <p className="text-gray-700 text-sm">{result.advice}</p>
              </div>
              
              {/* BMI Scale */}
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">BMI Categories</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Underweight</span>
                    <span className="text-blue-600">Below 18.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Normal weight</span>
                    <span className="text-green-600">18.5 - 24.9</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overweight</span>
                    <span className="text-yellow-600">25.0 - 29.9</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Obese</span>
                    <span className="text-red-600">30.0 and above</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
