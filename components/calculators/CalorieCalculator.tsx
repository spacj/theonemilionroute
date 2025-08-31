'use client';

import { useState } from 'react';
import { Apple } from 'lucide-react';

export default function CalorieCalculator() {
  const [inputs, setInputs] = useState({
    age: 30,
    gender: 'male',
    weight: 70,
    height: 175,
    activityLevel: 1.55,
    goal: 'maintain'
  });
  
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const { age, gender, weight, height, activityLevel, goal } = inputs;
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * activityLevel;
    
    let targetCalories = tdee;
    let weeklyWeightChange = 0;
    
    switch (goal) {
      case 'lose':
        targetCalories = tdee - 500; // 1 lb per week
        weeklyWeightChange = -0.5; // kg per week
        break;
      case 'gain':
        targetCalories = tdee + 500; // 1 lb per week
        weeklyWeightChange = 0.5; // kg per week
        break;
      default:
        weeklyWeightChange = 0;
    }
    
    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      weeklyWeightChange,
      macros: {
        protein: Math.round((targetCalories * 0.25) / 4), // 25% protein
        carbs: Math.round((targetCalories * 0.45) / 4),   // 45% carbs
        fat: Math.round((targetCalories * 0.30) / 9)      // 30% fat
      }
    });
  };

  const activityLevels = [
    { value: 1.2, label: 'Sedentary (little/no exercise)' },
    { value: 1.375, label: 'Light activity (light exercise 1-3 days/week)' },
    { value: 1.55, label: 'Moderate activity (moderate exercise 3-5 days/week)' },
    { value: 1.725, label: 'Very active (hard exercise 6-7 days/week)' },
    { value: 1.9, label: 'Extremely active (very hard exercise, physical job)' }
  ];

  return (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <Apple className="w-8 h-8 text-green-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Calorie Calculator</h1>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                value={inputs.age}
                onChange={(e) => setInputs({...inputs, age: Number(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={inputs.gender}
                onChange={(e) => setInputs({...inputs, gender: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
              <input
                type="number"
                value={inputs.weight}
                onChange={(e) => setInputs({...inputs, weight: Number(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
              <input
                type="number"
                value={inputs.height}
                onChange={(e) => setInputs({...inputs, height: Number(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
            <select
              value={inputs.activityLevel}
              onChange={(e) => setInputs({...inputs, activityLevel: Number(e.target.value)})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {activityLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Goal</label>
            <select
              value={inputs.goal}
              onChange={(e) => setInputs({...inputs, goal: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="lose">Lose Weight</option>
              <option value="maintain">Maintain Weight</option>
              <option value="gain">Gain Weight</option>
            </select>
          </div>
          
          <button
            onClick={calculate}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
          >
            Calculate Calories
          </button>
        </div>
        
        {result && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Daily Calories</h3>
              
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <span className="text-gray-600 block mb-1">Target Daily Calories:</span>
                <span className="font-bold text-green-600 text-3xl">
                  {result.targetCalories}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center bg-white p-3 rounded-lg">
                  <span className="text-gray-600 block text-sm">BMR</span>
                  <span className="font-semibold">{result.bmr}</span>
                </div>
                <div className="text-center bg-white p-3 rounded-lg">
                  <span className="text-gray-600 block text-sm">TDEE</span>
                  <span className="font-semibold">{result.tdee}</span>
                </div>
              </div>

              {inputs.goal !== 'maintain' && (
                <div className="bg-white p-4 rounded-lg">
                  <span className="text-gray-600 block text-sm mb-1">Expected Weekly Change:</span>
                  <span className={`font-semibold ${result.weeklyWeightChange > 0 ? 'text-blue-600' : 'text-red-600'}`}>
                    {result.weeklyWeightChange > 0 ? '+' : ''}{result.weeklyWeightChange} kg/week
                  </span>
                </div>
              )}
            </div>

            {/* Macros Breakdown */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-xl">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Suggested Macros</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Protein (25%)</span>
                  <span className="font-semibold">{result.macros.protein}g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Carbs (45%)</span>
                  <span className="font-semibold">{result.macros.carbs}g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Fat (30%)</span>
                  <span className="font-semibold">{result.macros.fat}g</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}