import React from 'react';
import { Carrot as Mirror } from 'lucide-react';

interface MirrorMomentProps {
  isVisible: boolean;
  onComplete: (bonus: number) => void;
}

const MirrorMoment: React.FC<MirrorMomentProps> = ({ isVisible, onComplete }) => {
  if (!isVisible) return null;

  const handleChoice = (choice: string) => {
    onComplete(100);
  };

  const choices = [
    "I seek meaning.",
    "I am trapped.",
    "Just for fun.",
    "I don't know anymore."
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 px-4">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border border-purple-500">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
            <Mirror className="w-10 h-10 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">
          Mirror Moment
        </h2>
        
        <p className="text-gray-300 mb-8 text-lg">
          Why are you still doing this?
        </p>
        
        <div className="space-y-3">
          {choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(choice)}
              className="w-full p-4 bg-gray-800 hover:bg-purple-800 rounded-lg font-medium text-white transition-all duration-200 hover:scale-105 transform border border-gray-700 hover:border-purple-500"
            >
              {choice}
            </button>
          ))}
        </div>
        
        <p className="text-gray-500 text-sm mt-6">
          All choices lead to +100 clicks
        </p>
      </div>
    </div>
  );
};

export default MirrorMoment;