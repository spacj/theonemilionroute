'use client';

import { useState } from 'react';
import { GraduationCap } from 'lucide-react';

interface Assignment {
  id: string;
  name: string;
  points: number;
  maxPoints: number;
  category: string;
}

export default function GradeCalculator() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: '1', name: 'Quiz 1', points: 85, maxPoints: 100, category: 'quizzes' },
    { id: '2', name: 'Homework 1', points: 90, maxPoints: 100, category: 'homework' },
    { id: '3', name: 'Midterm Exam', points: 78, maxPoints: 100, category: 'exams' }
  ]);

  const [categoryWeights, setCategoryWeights] = useState({
    homework: 30,
    quizzes: 20,
    exams: 50
  });

  const [newAssignment, setNewAssignment] = useState({
    name: '',
    points: 0,
    maxPoints: 100,
    category: 'homework'
  });

  const [result, setResult] = useState<any>(null);

  const addAssignment = () => {
    if (newAssignment.name.trim()) {
      const assignment: Assignment = {
        id: Date.now().toString(),
        name: newAssignment.name,
        points: newAssignment.points,
        maxPoints: newAssignment.maxPoints,
        category: newAssignment.category
      };
      setAssignments([...assignments, assignment]);
      setNewAssignment({ name: '', points: 0, maxPoints: 100, category: 'homework' });
    }
  };

  const removeAssignment = (id: string) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const calculate = () => {
    const categories = ['homework', 'quizzes', 'exams'];
    const categoryGrades: any = {};
    let weightedGrade = 0;

    categories.forEach(category => {
      const categoryAssignments = assignments.filter(a => a.category === category);
      if (categoryAssignments.length > 0) {
        const totalPoints = categoryAssignments.reduce((sum, a) => sum + a.points, 0);
        const totalMaxPoints = categoryAssignments.reduce((sum, a) => sum + a.maxPoints, 0);
        const categoryGrade = (totalPoints / totalMaxPoints) * 100;
        
        categoryGrades[category] = {
          grade: parseFloat(categoryGrade.toFixed(2)),
          weight: categoryWeights[category as keyof typeof categoryWeights],
          assignments: categoryAssignments.length
        };
        
        weightedGrade += (categoryGrade * categoryWeights[category as keyof typeof categoryWeights]) / 100;
      }
    });

    const letterGrade = getLetterGrade(weightedGrade);
    const gpa = getGPA(weightedGrade);

    setResult({
      overallGrade: parseFloat(weightedGrade.toFixed(2)),
      letterGrade,
      gpa: parseFloat(gpa.toFixed(2)),
      categoryGrades,
      totalAssignments: assignments.length
    });
  };

  const getLetterGrade = (grade: number): string => {
    if (grade >= 97) return 'A+';
    if (grade >= 93) return 'A';
    if (grade >= 90) return 'A-';
    if (grade >= 87) return 'B+';
    if (grade >= 83) return 'B';
    if (grade >= 80) return 'B-';
    if (grade >= 77) return 'C+';
    if (grade >= 73) return 'C';
    if (grade >= 70) return 'C-';
    if (grade >= 67) return 'D+';
    if (grade >= 65) return 'D';
    return 'F';
  };

  const getGPA = (grade: number): number => {
    if (grade >= 97) return 4.0;
    if (grade >= 93) return 4.0;
    if (grade >= 90) return 3.7;
    if (grade >= 87) return 3.3;
    if (grade >= 83) return 3.0;
    if (grade >= 80) return 2.7;
    if (grade >= 77) return 2.3;
    if (grade >= 73) return 2.0;
    if (grade >= 70) return 1.7;
    if (grade >= 67) return 1.3;
    if (grade >= 65) return 1.0;
    return 0.0;
  };

  return (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <GraduationCap className="w-8 h-8 text-indigo-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Grade Calculator</h1>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6">
          {/* Category Weights */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Weights (%)</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Homework</label>
                <input
                  type="number"
                  value={categoryWeights.homework}
                  onChange={(e) => setCategoryWeights({...categoryWeights, homework: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quizzes</label>
                <input
                  type="number"
                  value={categoryWeights.quizzes}
                  onChange={(e) => setCategoryWeights({...categoryWeights, quizzes: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Exams</label>
                <input
                  type="number"
                  value={categoryWeights.exams}
                  onChange={(e) => setCategoryWeights({...categoryWeights, exams: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Add Assignment */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Assignment</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Assignment name"
                value={newAssignment.name}
                onChange={(e) => setNewAssignment({...newAssignment, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Points earned"
                  value={newAssignment.points}
                  onChange={(e) => setNewAssignment({...newAssignment, points: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Max points"
                  value={newAssignment.maxPoints}
                  onChange={(e) => setNewAssignment({...newAssignment, maxPoints: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <select
                value={newAssignment.category}
                onChange={(e) => setNewAssignment({...newAssignment, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="homework">Homework</option>
                <option value="quizzes">Quizzes</option>
                <option value="exams">Exams</option>
              </select>
              <button
                onClick={addAssignment}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
              >
                Add Assignment
              </button>
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
          >
            Calculate Grade
          </button>
        </div>
        
        {/* Results Section */}
        <div className="lg:col-span-2">
          {/* Assignments List */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Current Assignments</h3>
            <div className="space-y-2">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <span className="font-medium">{assignment.name}</span>
                    <span className="ml-2 text-sm text-gray-500">({assignment.category})</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium">
                      {assignment.points}/{assignment.maxPoints} 
                      ({((assignment.points / assignment.maxPoints) * 100).toFixed(1)}%)
                    </span>
                    <button
                      onClick={() => removeAssignment(assignment.id)}
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
              {/* Overall Grade */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Overall Grade</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {result.overallGrade.toFixed(1)}%
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Letter Grade</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {result.letterGrade}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">GPA</h3>
                  <p className="text-2xl font-bold text-purple-600">
                    {result.gpa}
                  </p>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Grade Breakdown by Category</h3>
                <div className="space-y-3">
                  {Object.entries(result.categoryGrades).map(([category, data]: [string, any]) => (
                    <div key={category} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                      <div>
                        <h4 className="font-semibold capitalize">{category}</h4>
                        <p className="text-sm text-gray-600">{data.assignments} assignment(s)</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{data.grade.toFixed(1)}%</p>
                        <p className="text-sm text-gray-600">Weight: {data.weight}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {!result && (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl">
              <p className="text-gray-500">Add assignments and click calculate to see your grade</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}