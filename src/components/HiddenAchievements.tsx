import React from 'react';
import { Award, Zap, Clock, Music, Eye } from 'lucide-react';

interface HiddenAchievementsProps {
  achievements: string[];
}

const HiddenAchievements: React.FC<HiddenAchievementsProps> = ({ achievements }) => {
  const achievementData = {
    'true_meaning': { 
      icon: <Eye className="w-6 h-6" />, 
      title: "The True Meaning",
      description: "Found the meaning of nothingness (+300 clicks)"
    },
    'rapid_taps': { 
      icon: <Zap className="w-6 h-6" />, 
      title: "Lightning Seeker",
      description: "Achieved rapid enlightenment (+300 clicks)"
    }
  };

  if (achievements.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-20">
      {achievements.map((achievement, index) => {
        const data = achievementData[achievement as keyof typeof achievementData];
        if (!data) return null;
        
        return (
          <div
            key={achievement}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-black p-4 rounded-lg shadow-lg animate-bounce max-w-xs"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="flex items-center gap-3">
              <div className="text-yellow-900">
                {data.icon}
              </div>
              <div>
                <h4 className="font-bold text-sm">{data.title}</h4>
                <p className="text-xs opacity-80">{data.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HiddenAchievements;