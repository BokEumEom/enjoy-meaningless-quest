import React, { useState } from 'react';
import { Gamepad2 } from 'lucide-react';

interface FakeMiniGameProps {
  onComplete: () => void;
}

const FakeMiniGame: React.FC<FakeMiniGameProps> = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowConfetti(true);
      onComplete();
      
      setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 ${
          isLoading 
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
            : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 shadow-lg'
        }`}
      >
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-6 h-6" />
          {isLoading ? 'Loading...' : 'Bonus Mini-game!'}
        </div>
      </button>

      {isLoading && (
        <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="text-gray-700 font-medium">Loading epic mini-game...</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      )}

      {showConfetti && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
          <div className="animate-bounce text-4xl">
            🎉🎊🎉
          </div>
        </div>
      )}
    </div>
  );
};

export default FakeMiniGame;