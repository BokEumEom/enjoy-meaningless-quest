import React from 'react';
import { Scroll, Check } from 'lucide-react';

interface QuestLogProps {
  questsUnlocked: number[];
  questMilestones: { [key: number]: string };
}

const QuestLog: React.FC<QuestLogProps> = ({ questsUnlocked, questMilestones }) => {
  return (
    <div className="fixed top-4 left-4 bg-black bg-opacity-80 backdrop-blur-sm rounded-lg p-4 max-w-sm z-20 border border-gray-700">
      <div className="flex items-center gap-2 mb-3">
        <Scroll className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-bold text-white">Quest Log</h3>
      </div>
      
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {Object.entries(questMilestones).map(([milestone, message]) => {
          const milestoneNum = parseInt(milestone);
          const isCompleted = questsUnlocked.includes(milestoneNum);
          
          return (
            <div
              key={milestone}
              className={`p-2 rounded border-l-4 transition-all duration-300 ${
                isCompleted 
                  ? 'border-green-500 bg-green-900 bg-opacity-20' 
                  : 'border-gray-600 bg-gray-800 bg-opacity-50'
              }`}
            >
              <div className="flex items-start gap-2">
                {isCompleted ? (
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <div className="w-4 h-4 border border-gray-500 rounded mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className={`text-sm font-medium ${isCompleted ? 'text-green-300' : 'text-gray-400'}`}>
                    Step {milestone}
                  </p>
                  <p className={`text-xs ${isCompleted ? 'text-white' : 'text-gray-500'}`}>
                    {message}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-700">
        <p className="text-xs text-gray-500">
          Progress: {questsUnlocked.length}/{Object.keys(questMilestones).length} steps completed
        </p>
      </div>
    </div>
  );
};

export default QuestLog;