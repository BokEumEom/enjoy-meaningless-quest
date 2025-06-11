import React, { useState, useEffect, useRef } from 'react';
import { MousePointer, Timer, Zap, Scroll, Smartphone, Trophy, RotateCcw } from 'lucide-react';
import CountdownTimer from './components/CountdownTimer';
import FastTapChallenge from './components/FastTapChallenge';
import ScrollBonus from './components/ScrollBonus';
import Achievements from './components/Achievements';

function UselessCounter() {
  const [count, setCount] = useState(0);
  const [autoClickEnabled, setAutoClickEnabled] = useState(false);
  const [shakeDetected, setShakeDetected] = useState(false);
  const [backgroundGradient, setBackgroundGradient] = useState('from-blue-100 to-purple-100');
  const [textColor, setTextColor] = useState('text-gray-800');
  const [buttonColor, setButtonColor] = useState('from-blue-500 to-purple-500');
  const [showMessage, setShowMessage] = useState('');
  const [messageAnimation, setMessageAnimation] = useState('');
  const [showExitButton, setShowExitButton] = useState(true);
  const [showExitModal, setShowExitModal] = useState(false);
  const [backgroundPulse, setBackgroundPulse] = useState(false);
  const [buttonShake, setButtonShake] = useState(false);

  // Auto-click functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoClickEnabled) {
      interval = setInterval(() => {
        setCount(prev => prev + 10);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoClickEnabled]);

  // Shake detection
  useEffect(() => {
    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (acceleration) {
        const totalAcceleration = Math.abs(acceleration.x || 0) + 
                                Math.abs(acceleration.y || 0) + 
                                Math.abs(acceleration.z || 0);
        
        if (totalAcceleration > 30 && !shakeDetected) {
          setShakeDetected(true);
          setCount(prev => prev + 100);
          setShowMessage('Shaking detected! +100 count');
          setMessageAnimation('animate-bounce');
          
          setTimeout(() => {
            setShowMessage('');
            setMessageAnimation('');
            setShakeDetected(false);
          }, 3000);
        }
      }
    };

    // Request permission for iOS devices
    if (typeof DeviceMotionEvent !== 'undefined' && typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      (DeviceMotionEvent as any).requestPermission().then((response: string) => {
        if (response === 'granted') {
          window.addEventListener('devicemotion', handleDeviceMotion);
        }
      });
    } else {
      window.addEventListener('devicemotion', handleDeviceMotion);
    }

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
    };
  }, [shakeDetected]);

  // Dynamic styling based on count
  useEffect(() => {
    if (count >= 0 && count < 1000) {
      setBackgroundGradient('from-blue-100 to-purple-100');
      setTextColor('text-gray-800');
      setButtonColor('from-blue-500 to-purple-500');
      setShowMessage('');
      setShowExitButton(true);
      setBackgroundPulse(false);
      setButtonShake(false);
    } else if (count >= 1000 && count < 2000) {
      setShowMessage('Why are you still pressing this?');
      setMessageAnimation('animate-fade-in');
    } else if (count >= 2000 && count < 3000) {
      setShowMessage('Amazing persistence. Are you okay?');
      setMessageAnimation('animate-fade-in animate-shake');
      setBackgroundGradient('from-gray-200 to-gray-300');
    } else if (count >= 3000 && count < 4000) {
      setShowMessage('This is getting ridiculous...');
      setBackgroundGradient('from-gray-800 to-gray-900');
      setTextColor('text-white');
      setButtonColor('from-pink-500 to-red-500');
    } else if (count >= 4000 && count < 5000) {
      setShowMessage('We are watching you 👀');
      setBackgroundPulse(true);
    } else if (count >= 5000) {
      setShowMessage('Legendary! Exit is no longer available.');
      setShowExitButton(false);
      setBackgroundGradient('from-purple-600 to-pink-600');
      setTextColor('text-white');
      setButtonShake(true);
    }
  }, [count]);

  const handleMainClick = () => {
    setCount(prev => prev + 1);
  };

  const handleBonusComplete = (bonus: number) => {
    setCount(prev => prev + bonus);
  };

  const handleExitClick = () => {
    setShowExitModal(true);
  };

  const handleReset = () => {
    setCount(0);
    setAutoClickEnabled(false);
    setShowExitModal(false);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} ${backgroundPulse ? 'animate-pulse' : ''} transition-all duration-1000`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-5xl md:text-7xl font-bold mb-4 ${textColor}`}>
            Useless Counter
          </h1>
          
          {/* Message */}
          {showMessage && (
            <div className={`mb-4 ${messageAnimation}`}>
              <p className={`text-xl md:text-2xl font-medium ${textColor}`}>
                {showMessage}
              </p>
            </div>
          )}
          
          {/* Count Display */}
          <p className={`text-2xl md:text-3xl mb-2 ${textColor}`}>
            You have pressed the button
          </p>
          <div className={`text-6xl md:text-8xl font-bold mb-4 ${textColor}`}>
            {count.toLocaleString()}
          </div>
          <p className={`text-xl md:text-2xl ${textColor}`}>
            {count === 1 ? 'time' : 'times'}
          </p>
        </div>

        {/* Main Button */}
        <div className="flex justify-center mb-12">
          <button
            onClick={handleMainClick}
            className={`px-12 py-6 bg-gradient-to-r ${buttonColor} text-white text-2xl md:text-3xl font-bold rounded-2xl shadow-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 ${buttonShake ? 'animate-shake' : ''}`}
          >
            <div className="flex items-center gap-3">
              <MousePointer className="w-8 h-8" />
              Press me
            </div>
          </button>
        </div>

        {/* Auto-Click Mode */}
        <div className="flex justify-center mb-8">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-4">
              <label className={`text-lg font-medium ${textColor}`}>
                Enable Auto-Click Mode
              </label>
              <button
                onClick={() => setAutoClickEnabled(!autoClickEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  autoClickEnabled ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoClickEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            {autoClickEnabled && (
              <p className={`text-sm mt-2 ${textColor} animate-fade-in`}>
                Let the machine take over! (+10 per second)
              </p>
            )}
          </div>
        </div>

        {/* Interactive Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <CountdownTimer 
            onComplete={() => handleBonusComplete(10)}
            textColor={textColor}
          />
          <FastTapChallenge 
            onComplete={() => handleBonusComplete(50)}
            textColor={textColor}
          />
          <ScrollBonus 
            onComplete={() => handleBonusComplete(5)}
            textColor={textColor}
          />
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <Achievements count={count} textColor={textColor} />
        </div>

        {/* Shake Instructions */}
        <div className="text-center mb-8">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 inline-block">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Smartphone className={`w-6 h-6 ${textColor}`} />
              <h3 className={`text-lg font-bold ${textColor}`}>Shake Bonus</h3>
            </div>
            <p className={`text-sm ${textColor}`}>
              Shake your device for +100 count!
            </p>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="flex justify-center gap-4">
          {showExitButton && (
            <button
              onClick={handleExitClick}
              className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
            >
              Exit
            </button>
          )}
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Exit Modal */}
      {showExitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-3xl">👋</span>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Goodbye!
            </h2>
            
            <p className="text-gray-600 mb-8 text-lg">
              Thanks for playing with our useless counter. Hope you had fun!
            </p>
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowExitModal(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
              >
                Stay
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
              >
                Reset Counter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UselessCounter;