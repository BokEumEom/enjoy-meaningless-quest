import React, { useState, useEffect, useRef } from 'react';
import { Scroll } from 'lucide-react';

interface ScrollBonusProps {
  onComplete: () => void;
  textColor: string;
}

const ScrollBonus: React.FC<ScrollBonusProps> = ({ onComplete, textColor }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(progress);

      if (progress >= 95 && !isCompleted) {
        setIsCompleted(true);
        onComplete();
        setTimeout(() => setIsCompleted(false), 3000);
      }
    }
  };

  const resetScroll = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
    }
    setScrollProgress(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Scroll className={`w-6 h-6 ${textColor}`} />
        <h3 className={`text-lg font-bold ${textColor}`}>Scroll Challenge</h3>
      </div>
      
      {!isCompleted ? (
        <div className="space-y-4">
          <p className={`text-sm ${textColor}`}>
            Scroll to bottom → +5 count
          </p>
          <div
            ref={scrollAreaRef}
            onScroll={handleScroll}
            className="h-32 overflow-y-auto bg-gray-100 rounded-lg p-4 text-gray-800"
          >
            <div className="space-y-4">
              <p>Keep scrolling down...</p>
              <p>Almost there...</p>
              <p>Just a bit more...</p>
              <p>You're doing great!</p>
              <p>Nearly at the bottom...</p>
              <p>🎉 You made it!</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-200"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
          <button
            onClick={resetScroll}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition-colors duration-200"
          >
            Reset
          </button>
        </div>
      ) : (
        <div className="animate-bounce">
          <p className={`text-lg font-bold ${textColor}`}>
            📜 Scroll master!
          </p>
        </div>
      )}
    </div>
  );
};

export default ScrollBonus;