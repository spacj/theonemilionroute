'use client';

import { useState } from 'react';
import CompoundInterestCalculator from './calculators/CompoundInterestCalculator';
import LoanCalculator from './calculators/LoanCalculator';
import RetirementCalculator from './calculators/RetirementCalculator';
import InvestmentCalculator from './calculators/InvestmentCalculator';
import SavingsGoalCalculator from './calculators/SavingsGoalCalculator';
import DebtPayoffCalculator from './calculators/DebtPayoffCalculator';
import PercentageCalculator from './calculators/PercentageCalculator';
import GradeCalculator from './calculators/GradeCalculator';
import BMICalculator from './calculators/BMICalculator';
import CalorieCalculator from './calculators/CalorieCalculator';
import BreakEvenCalculator from './calculators/BreakEvenCalculator';
import ROICalculator from './calculators/ROICalculator';

interface Props {
  calculatorId: string;
}

export default function CalculatorComponent({ calculatorId }: Props) {
  const renderCalculator = () => {
    switch (calculatorId) {
      case 'compound-interest':
        return <CompoundInterestCalculator />;
      case 'loan':
        return <LoanCalculator />;
      case 'retirement':
        return <RetirementCalculator />;
      case 'investment':
        return <InvestmentCalculator />;
      case 'savings-goal':
        return <SavingsGoalCalculator />;
      case 'debt-payoff':
        return <DebtPayoffCalculator />;
      case 'percentage':
        return <PercentageCalculator />;
      case 'grade':
        return <GradeCalculator />;
      case 'bmi':
        return <BMICalculator />;
      case 'calorie':
        return <CalorieCalculator />;
      case 'break-even':
        return <BreakEvenCalculator />;
      case 'roi':
        return <ROICalculator />;
      default:
        return <div>Calculator not found</div>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        {renderCalculator()}
      </div>
    </div>
  );
}
