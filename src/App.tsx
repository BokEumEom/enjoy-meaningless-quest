import React, { useState } from 'react';
import QuestLog from './components/QuestLog';
import AIGuide from './components/AIGuide';
import ProgressBar from './components/ProgressBar';
import HiddenAchievements from './components/HiddenAchievements';
import FinalDoor from './components/FinalDoor';
import FakeEnding from './components/FakeEnding';
import MirrorMoment from './components/MirrorMoment';
import ExitModal from './components/ExitModal';
import UselessCounter from './UselessCounter';
import { MousePointer, Scroll, Eye, ToggleLeft, ToggleRight } from 'lucide-react';

function App() {
  const [currentApp, setCurrentApp] = useState<'quest' | 'counter'>('quest');
  const [clicks, setClicks] = useState(0);
  const [questsUnlocked, setQuestsUnlocked] = useState<number[]>([]);
  const [aiMessage, setAiMessage] = useState('');
  const [showAiGuide, setShowAiGuide] = useState(false);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [showFinalDoor, setShowFinalDoor] = useState(false);
  const [showFakeEnding, setShowFakeEnding] = useState(false);
  const [fakeEndingType, setFakeEndingType] = useState<'1000' | '3000'>('1000');
  const [showMirrorMoment, setShowMirrorMoment] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [clickPattern, setClickPattern] = useState<number[]>([]);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [rapidTapCount, setRapidTapCount] = useState(0);
  const [rapidTapTimer, setRapidTapTimer] = useState<NodeJS.Timeout | null>(null);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 50, y: 50 });
  const [buttonStyle, setButtonStyle] = useState({ scale: 1, opacity: 1, rotation: 0 });

  // Dynamic title based on click count
  const getTitle = () => {
    if (clicks < 500) return "The Meaningless Quest";
    if (clicks < 1000) return "The Somewhat Meaningless Quest";
    if (clicks < 2000) return "The Increasingly Absurd Quest";
    if (clicks < 3000) return "The Endless Quest";
    if (clicks < 4000) return "The WTF Quest";
    if (clicks < 5000) return "The Quest of Regret";
    return "The Quest That Should Not Exist";
  };

  // Update document title
  React.useEffect(() => {
    document.title = `${getTitle()} - A Philosophical Journey`;
  }, [clicks]);

  // Quest milestones and their philosophical messages
  const questMilestones = {
    1: "Begin the journey into meaninglessness",
    100: "Witness the illusion of progress",
    500: "Question the nature of purpose", 
    1000: "Embrace the void of achievement",
    2000: "Transcend the need for validation",
    4000: "Realize the futility of all endeavors",
    5000: "Achieve perfect meaninglessness"
  };

  // AI Guide quotes for milestones
  const aiQuotes = {
    500: "Welcome, seeker. You have taken the first step into the abyss of purposelessness.",
    1000: "Progress is but an illusion, yet you persist. Fascinating.",
    2000: "Each click brings you closer to understanding... nothing.",
    3000: "You begin to see the truth: there is no destination, only the journey.",
    5000: "Congratulations. You have achieved perfect meaninglessness. You understand."
  };

  // Check for quest unlocks
  React.useEffect(() => {
    Object.keys(questMilestones).forEach(milestone => {
      const milestoneNum = parseInt(milestone);
      if (clicks >= milestoneNum && !questsUnlocked.includes(milestoneNum)) {
        setQuestsUnlocked(prev => [...prev, milestoneNum]);
      }
    });
  }, [clicks, questsUnlocked]);

  // Check for AI guide triggers
  React.useEffect(() => {
    if (aiQuotes[clicks as keyof typeof aiQuotes] && !showAiGuide) {
      setAiMessage(aiQuotes[clicks as keyof typeof aiQuotes]);
      setShowAiGuide(true);
      setTimeout(() => setShowAiGuide(false), 5000);
    }
  }, [clicks, showAiGuide]);

  // Check for fake endings
  React.useEffect(() => {
    if (clicks === 1000 && !showFakeEnding) {
      setFakeEndingType('1000');
      setShowFakeEnding(true);
    } else if (clicks === 3000 && !showFakeEnding) {
      setFakeEndingType('3000');
      setShowFakeEnding(true);
    }
  }, [clicks, showFakeEnding]);

  // Check for mirror moment
  React.useEffect(() => {
    if (clicks === 2500 && !showMirrorMoment) {
      setShowMirrorMoment(true);
    }
  }, [clicks, showMirrorMoment]);

  // Check for final door
  React.useEffect(() => {
    if (clicks >= 5000 && !showFinalDoor) {
      setTimeout(() => setShowFinalDoor(true), 1000);
    }
  }, [clicks, showFinalDoor]);

  // Check for secret achievement at 1234 clicks
  React.useEffect(() => {
    if (clicks === 1234 && !achievements.includes('true_meaning')) {
      setAchievements(prev => [...prev, 'true_meaning']);
      setClicks(prev => prev + 300);
      setAiMessage("You have unlocked: The True Meaning of Nothingness.");
      setShowAiGuide(true);
      setTimeout(() => setShowAiGuide(false), 4000);
    }
  }, [clicks, achievements]);

  // Handle rapid tap detection
  React.useEffect(() => {
    const currentTime = Date.now();
    const timeDiff = currentTime - lastClickTime;
    
    if (timeDiff < 200) { // Very fast taps
      setRapidTapCount(prev => prev + 1);
      
      if (rapidTapTimer) {
        clearTimeout(rapidTapTimer);
      }
      
      const timer = setTimeout(() => {
        if (rapidTapCount >= 10 && !achievements.includes('rapid_taps')) {
          setAchievements(prev => [...prev, 'rapid_taps']);
          setClicks(prev => prev + 300);
          setAiMessage("You have unlocked: The True Meaning of Nothingness.");
          setShowAiGuide(true);
          setTimeout(() => setShowAiGuide(false), 4000);
        }
        setRapidTapCount(0);
      }, 1000);
      
      setRapidTapTimer(timer);
    } else {
      setRapidTapCount(0);
    }
    
    setLastClickTime(currentTime);
  }, [clicks, lastClickTime, rapidTapCount, rapidTapTimer, achievements]);

  // Button movement and styling after 2000 clicks
  React.useEffect(() => {
    if (clicks >= 2000) {
      // Move button to random position
      const newX = Math.random() * 60 + 20; // 20-80% of screen width
      const newY = Math.random() * 60 + 20; // 20-80% of screen height
      setButtonPosition({ x: newX, y: newY });
      
      // Update button style
      const progress = Math.min((clicks - 2000) / 3000, 1); // 0 to 1 over 3000 clicks
      setButtonStyle({
        scale: 1 - (progress * 0.6), // Shrink to 40%
        opacity: 1 - (progress * 0.4), // Reduce to 60%
        rotation: progress * 360 // Full rotation
      });
    }
  }, [clicks]);

  // Random glitch effect after 2000 clicks
  React.useEffect(() => {
    if (clicks > 2000 && Math.random() < 0.05) {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }
  }, [clicks]);

  const handleClick = () => {
    setClicks(prev => prev + 1);
  };

  const handleFinalDoorComplete = () => {
    setClicks(prev => prev + 1000);
    setShowFinalDoor(false);
  };

  const handleMirrorMomentComplete = (bonus: number) => {
    setClicks(prev => prev + bonus);
    setShowMirrorMoment(false);
  };

  const handleFakeEndingComplete = () => {
    setShowFakeEnding(false);
  };

  const handleExitClick = () => {
    setShowExitModal(true);
  };

  const shouldShowExitButton = clicks < 5000;

  // Render counter app
  if (currentApp === 'counter') {
    return (
      <div>
        {/* App Switcher */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setCurrentApp('quest')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2"
          >
            <ToggleLeft className="w-4 h-4" />
            Switch to Quest
          </button>
        </div>
        <UselessCounter />
      </div>
    );
  }

  // Render quest app
  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden ${glitchEffect ? 'animate-pulse' : ''}`}>
      {/* App Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setCurrentApp('counter')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
        >
          <ToggleRight className="w-4 h-4" />
          Switch to Counter
        </button>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Quest Log */}
      <QuestLog 
        questsUnlocked={questsUnlocked}
        questMilestones={questMilestones}
      />

      {/* AI Guide */}
      <AIGuide 
        isVisible={showAiGuide}
        message={aiMessage}
      />

      {/* Exit Button */}
      {shouldShowExitButton && (
        <button
          onClick={handleExitClick}
          className="fixed bottom-4 left-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-colors duration-200 z-20"
        >
          Abandon Quest
        </button>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Dynamic Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center tracking-wider">
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            {getTitle()}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-400 mb-12 text-center max-w-2xl">
          "In the end, all paths lead to the same destination: nowhere."
        </p>

        {/* Progress Bar */}
        <ProgressBar clicks={clicks} />

        {/* Click Counter */}
        <div className="text-center mb-12">
          <p className="text-lg text-gray-400 mb-2">Meaningless Actions Performed</p>
          <div className={`text-6xl md:text-8xl font-bold ${glitchEffect ? 'text-red-500' : 'text-white'}`}>
            {clicks.toLocaleString()}
          </div>
          <p className="text-lg text-gray-400 mt-2">
            {clicks === 1 ? 'click' : 'clicks'} into the void
          </p>
        </div>

        {/* Main Click Button */}
        <div 
          className="relative"
          style={{
            position: clicks >= 2000 ? 'fixed' : 'relative',
            left: clicks >= 2000 ? `${buttonPosition.x}%` : 'auto',
            top: clicks >= 2000 ? `${buttonPosition.y}%` : 'auto',
            transform: clicks >= 2000 ? 'translate(-50%, -50%)' : 'none',
            zIndex: 30
          }}
        >
          <button
            onClick={handleClick}
            className="group relative px-16 py-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-2xl font-bold text-white shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-purple-500/25 active:scale-95"
            style={{
              transform: `scale(${buttonStyle.scale}) rotate(${buttonStyle.rotation}deg)`,
              opacity: buttonStyle.opacity
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <div className="relative flex items-center gap-3">
              <MousePointer className="w-8 h-8" />
              Continue the Quest
            </div>
          </button>
        </div>

        {/* Philosophical Quote */}
        <div className="mt-12 text-center max-w-2xl">
          <p className="text-gray-500 italic text-lg">
            "The journey of a thousand clicks begins with a single meaningless action."
          </p>
          <p className="text-gray-600 text-sm mt-2">- Ancient Proverb (Probably)</p>
        </div>

        {/* Hidden Achievements Display */}
        <HiddenAchievements achievements={achievements} />
      </div>

      {/* Final Door */}
      <FinalDoor 
        isVisible={showFinalDoor}
        onComplete={handleFinalDoorComplete}
      />

      {/* Fake Ending */}
      <FakeEnding
        isVisible={showFakeEnding}
        type={fakeEndingType}
        onComplete={handleFakeEndingComplete}
      />

      {/* Mirror Moment */}
      <MirrorMoment
        isVisible={showMirrorMoment}
        onComplete={handleMirrorMomentComplete}
      />

      {/* Exit Modal */}
      <ExitModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
      />

      {/* Glitch overlay */}
      {glitchEffect && (
        <div className="fixed inset-0 bg-red-500 opacity-10 pointer-events-none z-50" />
      )}
    </div>
  );
}

export default App;