import React, { useState, useEffect } from 'react';

interface ProgressBarProps {
  clicks: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ clicks }) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [showLie, setShowLie] = useState(false);

  useEffect(() => {
    const targetProgress = Math.min((clicks / 5000) * 99, 99);
    
    if (targetProgress >= 99 && !showLie) {
      setTimeout(() => setShowLie(true), 1000);
    }
    
    setDisplayProgress(targetProgress);
  }, [clicks, showLie]);

  return (
    <div className="w-full max-w-2xl mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">Quest Progress</span>
        <span className="text-sm text-gray-400">
          {showLie ? "Progress is a lie" : `${displayProgress.toFixed(1)}%`}
        </span>
      </div>
      
      <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden border border-gray-700">
        <div 
          className={`h-full transition-all duration-1000 ${
            showLie 
              ? 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse' 
              : 'bg-gradient-to-r from-purple-500 to-pink-500'
          }`}
          style={{ width: `${displayProgress}%` }}
        />
        
        {showLie && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-white font-bold animate-bounce">
              ...
            </span>
          </div>
        )}
      </div>
      
      {showLie && (
        <p className="text-xs text-red-400 mt-2 text-center animate-fade-in">
          The bar will never reach 100%. This is the nature of all progress.
        </p>
      )}
    </div>
  );
};

export default ProgressBar;