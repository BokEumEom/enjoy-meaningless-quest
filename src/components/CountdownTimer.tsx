import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

interface CountdownTimerProps {
  onComplete: () => void;
  textColor: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ onComplete, textColor }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsCompleted(true);
      onComplete();
      setTimeout(() => setIsCompleted(false), 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, onComplete]);

  const startTimer = () => {
    setTimeLeft(5);
    setIsActive(true);
    setIsCompleted(false);
  };

  const resetTimer = () => {
    setTimeLeft(0);
    setIsActive(false);
    setIsCompleted(false);
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Timer className={`w-6 h-6 ${textColor}`} />
        <h3 className={`text-lg font-bold ${textColor}`}>Patience Test</h3>
      </div>
      
      {!isActive && !isCompleted && (
        <button
          onClick={startTimer}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
        >
          Wait 5 seconds → +10 count
        </button>
      )}

      {isActive && (
        <div className="space-y-4">
          <div className={`text-4xl font-bold ${textColor}`}>
            {timeLeft}
          </div>
          <p className={`text-sm ${textColor}`}>Don't click anything...</p>
          <button
            onClick={resetTimer}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors duration-200"
          >
            Reset
          </button>
        </div>
      )}

      {isCompleted && (
        <div className="animate-bounce">
          <p className={`text-lg font-bold ${textColor}`}>
            ✅ Patience rewarded!
          </p>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;