import React, { useState } from 'react';
import { Brain, X } from 'lucide-react';

interface PsychologicalTestProps {
  isOpen: boolean;
  onClose: () => void;
  count: number;
  onComplete: () => void;
}

const PsychologicalTest: React.FC<PsychologicalTestProps> = ({ 
  isOpen, 
  onClose, 
  count, 
  onComplete 
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [showResult, setShowResult] = useState(false);

  if (!isOpen) return null;

  const options = [
    "Perfectionist",
    "Master of Uselessness", 
    "Secretly enjoys clicking",
    "Can't resist reverse psychology"
  ];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setShowResult(true);
    onComplete();
    
    setTimeout(() => {
      setShowResult(false);
      setSelectedOption('');
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl transform transition-all duration-300 scale-100">
        {!showResult ? (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                <Brain className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Psychological Analysis
            </h2>
            
            <p className="text-gray-600 mb-6 text-lg">
              You have pressed the button <span className="font-bold text-purple-600">{count.toLocaleString()}</span> times.
              <br />
              What does this say about you?
            </p>
            
            <div className="space-y-3">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className="w-full p-4 bg-gray-100 hover:bg-purple-100 rounded-lg font-medium text-gray-800 transition-colors duration-200 hover:scale-105 transform"
                >
                  {option}
                </button>
              ))}
            </div>
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </>
        ) : (
          <div className="animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-3xl">🎯</span>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Interesting Choice!
            </h2>
            
            <p className="text-gray-600 mb-4 text-lg">
              You selected: <span className="font-bold text-purple-600">"{selectedOption}"</span>
            </p>
            
            <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg font-bold text-xl">
              +100 count bonus! 🧠
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PsychologicalTest;