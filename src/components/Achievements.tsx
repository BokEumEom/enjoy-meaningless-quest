import React from 'react';
import { Trophy } from 'lucide-react';

interface AchievementsProps {
  count: number;
  textColor: string;
}

const Achievements: React.FC<AchievementsProps> = ({ count, textColor }) => {
  const achievements = [
    { threshold: 100, title: "Useless Novice", icon: "🥉" },
    { threshold: 500, title: "Pointless Master", icon: "🥈" },
    { threshold: 1000, title: "Emperor of the Useless", icon: "🥇" },
    { threshold: 2000, title: "Are you okay?", icon: "🤔" },
    { threshold: 5000, title: "Transcended Uselessness", icon: "👑" }
  ];

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center md:col-span-2">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Trophy className={`w-6 h-6 ${textColor}`} />
        <h3 className={`text-lg font-bold ${textColor}`}>Achievements</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {achievements.map((achievement, index) => {
          const isUnlocked = count >= achievement.threshold;
          return (
            <div
              key={index}
              className={`p-3 rounded-lg transition-all duration-300 ${
                isUnlocked 
                  ? 'bg-yellow-400 text-black shadow-lg transform scale-105' 
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              <div className="text-2xl mb-1">{achievement.icon}</div>
              <div className="text-xs font-medium">{achievement.title}</div>
              <div className="text-xs opacity-75">{achievement.threshold.toLocaleString()}</div>
            </div>
          );
        })}
      </div>
      
      <div className={`mt-4 text-sm ${textColor}`}>
        {achievements.filter(a => count >= a.threshold).length} / {achievements.length} unlocked
      </div>
    </div>
  );
};

export default Achievements;