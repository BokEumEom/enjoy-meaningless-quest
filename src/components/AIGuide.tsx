import React from 'react';
import { Eye } from 'lucide-react';

interface AIGuideProps {
  isVisible: boolean;
  message: string;
}

const AIGuide: React.FC<AIGuideProps> = ({ isVisible, message }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-90 backdrop-blur-sm rounded-lg p-6 max-w-sm z-30 border border-purple-500 animate-fade-in">
      <div className="flex items-start gap-4">
        {/* ASCII Art Character */}
        <div className="text-purple-400 font-mono text-xs leading-none flex-shrink-0">
          <pre>{`
    ◉ ◉
   ╱─────╲
  ╱ ░░░░░ ╲
 ╱  ░░░░░  ╲
╱___░░░░░___╲
    ╲___╱
          `}</pre>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-purple-400" />
            <h4 className="text-sm font-bold text-purple-300">Sage Nullius</h4>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed italic">
            "{message}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIGuide;