import React, { useState, useEffect } from 'react';
import { MousePointer } from 'lucide-react';

interface FastTapChallengeProps {
  onComplete: () => void;
  textColor: string;
}

const FastTapChallenge: React.FC<FastTapChallengeProps> = ({ onComplete, textColor }) => {
  const [taps, setTaps] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 100);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      if (taps >= 10) {
        setIsCompleted(true);
        onComplete();
        setTimeout(() => {
          setIsCompleted(false);
          setTaps(0);
        }, 3000);
      } else {
        setTimeout(() => setTaps(0), 1000);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, taps, onComplete]);

  const startChallenge = () => {
    setTaps(0);
    setTimeLeft(30); // 3 seconds in 100ms intervals
    setIsActive(true);
    setIsCompleted(false);
  };

  const handleTap = () => {
    if (isActive) {
      setTaps(prev => prev + 1);
    }
  };

  const resetChallenge = () => {
    setTaps(0);
    setTimeLeft(0);
    setIsActive(false);
    setIsCompleted(false);
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <MousePointer className={`w-6 h-6 ${textColor}`} />
        <h3 className={`text-lg font-bold ${textColor}`}>Speed Test</h3>
      </div>
      
      {!isActive && !isCompleted && (
        <button
          onClick={startChallenge}
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200"
        >
          Tap 10 times in 3s → +50 count
        </button>
      )}

      {isActive && (
        <div className="space-y-4">
          <button
            onClick={handleTap}
            className="bg-yellow-500 text-black px-8 py-4 rounded-lg font-bold text-xl hover:bg-yellow-400 transition-colors duration-100 active:scale-95"
          >
            TAP ME!
          </button>
          <div className={`text-2xl font-bold ${textColor}`}>
            {taps}/10 taps
          </div>
          <div className={`text-sm ${textColor}`}>
            Time: {(timeLeft / 10).toFixed(1)}s
          </div>
          <button
            onClick={resetChallenge}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors duration-200"
          >
            Reset
          </button>
        </div>
      )}

      {isCompleted && (
        <div className="animate-bounce">
          <p className={`text-lg font-bold ${textColor}`}>
            ⚡ Lightning fast!
          </p>
        </div>
      )}
    </div>
  );
};

export default FastTapChallenge;