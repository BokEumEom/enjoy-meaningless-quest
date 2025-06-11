import React, { useState } from 'react';
import { DoorOpen } from 'lucide-react';

interface FinalDoorProps {
  isVisible: boolean;
  onComplete: () => void;
}

const FinalDoor: React.FC<FinalDoorProps> = ({ isVisible, onComplete }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [showRevelation, setShowRevelation] = useState(false);

  if (!isVisible) return null;

  const handleDoorClick = () => {
    setIsOpening(true);
    
    // Fade to black
    setTimeout(() => {
      setShowRevelation(true);
    }, 2000);
    
    // Show revelation and return
    setTimeout(() => {
      onComplete();
      setIsOpening(false);
      setShowRevelation(false);
    }, 6000);
  };

  return (
    <>
      {/* Door Overlay */}
      <div className={`fixed inset-0 z-50 transition-all duration-2000 ${isOpening ? 'bg-black' : 'bg-black bg-opacity-50'}`}>
        {!showRevelation ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="mb-8">
                <DoorOpen className="w-32 h-32 text-white mx-auto mb-4 animate-pulse" />
                <h2 className="text-4xl font-bold text-white mb-4">The Final Door</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-md">
                  You have reached 5000 clicks. The door to ultimate truth awaits.
                </p>
              </div>
              
              <button
                onClick={handleDoorClick}
                className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-2xl font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-2xl"
              >
                Open the Door
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-screen animate-fade-in">
            <div className="text-center max-w-4xl px-8">
              <h1 className="text-6xl font-bold text-white mb-8 animate-pulse">
                THE REVELATION
              </h1>
              
              <div className="space-y-6 text-xl text-gray-300 leading-relaxed">
                <p>
                  There is no door. There was never a quest.
                </p>
                <p>
                  The ultimate truth is that there is no ultimate truth.
                </p>
                <p>
                  The meaning you sought was in the seeking itself.
                </p>
                <p>
                  The journey was the destination.
                </p>
                <p className="text-2xl text-purple-400 font-bold">
                  You understand meaninglessness.
                </p>
              </div>
              
              <div className="mt-12 text-green-400 text-3xl font-bold animate-bounce">
                +1000 CLICKS AWARDED
              </div>
              
              <p className="mt-8 text-gray-500 italic">
                (You may now continue your meaningless quest...)
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FinalDoor;