
import React from 'react';
import { Goal } from '../types';

interface GoalTrackerProps {
  goals: Goal[];
}

const GoalTracker: React.FC<GoalTrackerProps> = ({ goals }) => {
  const completedCount = goals.filter(g => g.status === 'Completed').length;
  const progress = (completedCount / goals.length) * 100;

  return (
    <div className="w-full px-5 py-4 border-b border-gray-100 bg-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[10px] font-extrabold text-[#1d2b4f] uppercase tracking-widest">Simulation Progress</h2>
        <span className="text-[10px] font-extrabold text-[#3b71fe] bg-[#f0f4ff] px-2 py-0.5 rounded-full">
          {completedCount}/{goals.length} Tasks
        </span>
      </div>
      
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-[#3b71fe] transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-300 border ${
              goal.status === 'Completed'
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-white border-gray-100 text-gray-400 opacity-60'
            }`}
          >
            <span className="text-base">{goal.emoji}</span>
            <span className="text-[10px] font-bold leading-none">{goal.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalTracker;
