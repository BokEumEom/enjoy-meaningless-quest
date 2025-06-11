import React from 'react';

interface FakeEndingProps {
  isVisible: boolean;
  type: '1000' | '3000';
  onComplete: () => void;
}

const FakeEnding: React.FC<FakeEndingProps> = ({ isVisible, type, onComplete }) => {
  if (!isVisible) return null;

  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onComplete();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  const getContent = () => {
    if (type === '1000') {
      return {
        title: "THE END",
        subtitle: "Just kidding. Keep going.",
        gradient: "from-red-600 to-orange-600"
      };
    } else {
      return {
        title: "FINAL SCENE",
        subtitle: "Not yet.",
        gradient: "from-purple-600 to-blue-600"
      };
    }
  };

  const content = getContent();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 animate-fade-in">
      <div className="text-center">
        <h1 className={`text-8xl md:text-9xl font-bold mb-8 bg-gradient-to-r ${content.gradient} bg-clip-text text-transparent animate-pulse`}>
          {content.title}
        </h1>
        
        <p className="text-2xl md:text-3xl text-gray-300 animate-bounce">
          {content.subtitle}
        </p>
        
        <div className="mt-8">
          <div className="w-16 h-1 bg-white mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default FakeEnding;