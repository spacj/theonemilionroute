import { Calculator } from '@/types/calculator';

export const calculators: Calculator[] = [
  // Finance Calculators
  {
    id: 'compound-interest',
    title: 'Compound Interest Calculator',
    description: 'Calculate compound interest with regular contributions and see how your money grows over time',
    metaDescription: 'Free compound interest calculator. Calculate how your savings grow with compound interest and regular contributions. Includes detailed breakdown and charts.',
    keywords: ['compound interest', 'investment calculator', 'savings calculator', 'interest calculator'],
    category: 'finance',
    icon: 'TrendingUp',
    slug: 'compound-interest-calculator'
  },
  {
    id: 'loan',
    title: 'Loan Calculator',
    description: 'Calculate monthly loan payments, total interest, and amortization schedule',
    metaDescription: 'Free loan calculator for mortgages, auto loans, and personal loans. Calculate monthly payments, total interest, and view amortization schedule.',
    keywords: ['loan calculator', 'mortgage calculator', 'monthly payment calculator', 'amortization'],
    category: 'finance',
    icon: 'Home',
    slug: 'loan-calculator'
  },
  {
    id: 'retirement',
    title: 'Retirement Calculator',
    description: 'Plan your retirement savings and see if you\'re on track for your retirement goals',
    metaDescription: 'Free retirement calculator. Plan your retirement savings strategy and see how much you need to save for retirement.',
    keywords: ['retirement calculator', 'retirement planning', '401k calculator', 'pension calculator'],
    category: 'finance',
    icon: 'PiggyBank',
    slug: 'retirement-calculator'
  },
  {
    id: 'investment',
    title: 'Investment Calculator',
    description: 'Calculate potential returns on your investments with regular contributions',
    metaDescription: 'Free investment calculator. Project investment returns with regular contributions and different return rates.',
    keywords: ['investment calculator', 'portfolio calculator', 'return calculator', 'investment growth'],
    category: 'finance',
    icon: 'DollarSign',
    slug: 'investment-calculator'
  },
  {
    id: 'savings-goal',
    title: 'Savings Goal Calculator',
    description: 'Calculate how much to save monthly to reach your savings goal',
    metaDescription: 'Free savings goal calculator. Determine how much to save monthly to reach your financial goals.',
    keywords: ['savings goal', 'savings calculator', 'monthly savings', 'financial goals'],
    category: 'finance',
    icon: 'Target',
    slug: 'savings-goal-calculator'
  },
  {
    id: 'debt-payoff',
    title: 'Debt Payoff Calculator',
    description: 'Create a debt payoff strategy and see how to become debt-free faster',
    metaDescription: 'Free debt payoff calculator. Create a strategy to pay off debt faster and save on interest payments.',
    keywords: ['debt payoff', 'debt calculator', 'debt snowball', 'debt avalanche'],
    category: 'finance',
    icon: 'CreditCard',
    slug: 'debt-payoff-calculator'
  },
  // Math Calculators
  {
    id: 'percentage',
    title: 'Percentage Calculator',
    description: 'Calculate percentages, percentage change, and percentage of a number',
    metaDescription: 'Free percentage calculator. Calculate percentages, percentage increase/decrease, and percentage of numbers.',
    keywords: ['percentage calculator', 'percent calculator', 'percentage change', 'math calculator'],
    category: 'math',
    icon: 'Percent',
    slug: 'percentage-calculator'
  },
  {
    id: 'grade',
    title: 'Grade Calculator',
    description: 'Calculate your grade point average (GPA) and weighted grades',
    metaDescription: 'Free grade calculator and GPA calculator. Calculate your GPA and weighted grades for school and college.',
    keywords: ['grade calculator', 'GPA calculator', 'weighted grade', 'school calculator'],
    category: 'math',
    icon: 'GraduationCap',
    slug: 'grade-calculator'
  },
  // Health Calculators
  {
    id: 'bmi',
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index (BMI) and understand your health status',
    metaDescription: 'Free BMI calculator. Calculate your Body Mass Index and understand your weight status with health recommendations.',
    keywords: ['BMI calculator', 'body mass index', 'weight calculator', 'health calculator'],
    category: 'health',
    icon: 'Heart',
    slug: 'bmi-calculator'
  },
  {
    id: 'calorie',
    title: 'Calorie Calculator',
    description: 'Calculate daily calorie needs based on your activity level and goals',
    metaDescription: 'Free calorie calculator. Calculate your daily calorie needs for weight loss, maintenance, or weight gain.',
    keywords: ['calorie calculator', 'daily calorie needs', 'weight loss calculator', 'nutrition calculator'],
    category: 'health',
    icon: 'Apple',
    slug: 'calorie-calculator'
  },
  // Business Calculators
  {
    id: 'break-even',
    title: 'Break-Even Calculator',
    description: 'Calculate the break-even point for your business or investment',
    metaDescription: 'Free break-even calculator for businesses. Calculate break-even point and understand profitability.',
    keywords: ['break even calculator', 'business calculator', 'profitability calculator', 'break even point'],
    category: 'business',
    icon: 'BarChart3',
    slug: 'break-even-calculator'
  },
  {
    id: 'roi',
    title: 'ROI Calculator',
    description: 'Calculate return on investment (ROI) for business decisions and investments',
    metaDescription: 'Free ROI calculator. Calculate return on investment for business decisions and investment opportunities.',
    keywords: ['ROI calculator', 'return on investment', 'business ROI', 'investment return'],
    category: 'business',
    icon: 'TrendingUp',
    slug: 'roi-calculator'
  }
];
