
import React from 'react';
import GameButton from '@/components/GameButton';
import { ArrowLeft } from 'lucide-react';
import { Achievement } from '@/types/game';

interface AchievementsScreenProps {
  achievements: Achievement[];
  onBackClick: () => void;
}

const AchievementsScreen: React.FC<AchievementsScreenProps> = ({
  achievements,
  onBackClick,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-game-yellow to-game-orange p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <GameButton onClick={onBackClick} size="sm" variant="secondary">
          <ArrowLeft className="w-5 h-5" />
        </GameButton>
        
        <h1 className="font-game text-3xl font-bold text-game-darkBrown">
          ACHIEVEMENTS
        </h1>
        
        <div className="w-12"></div>
      </div>
      
      <div className="max-w-md mx-auto space-y-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`border-4 border-game-brown rounded-xl p-6 transition-all ${
              achievement.unlocked
                ? 'bg-gradient-to-b from-green-100 to-green-200 shadow-lg'
                : 'bg-game-cream opacity-60'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-full border-4 border-game-brown flex items-center justify-center text-3xl ${
                  achievement.unlocked
                    ? 'bg-gradient-to-b from-game-yellow to-game-orange'
                    : 'bg-gray-300'
                }`}
              >
                {achievement.unlocked ? achievement.icon : '🔒'}
              </div>
              
              <div className="flex-1">
                <h3
                  className={`font-game text-xl font-bold mb-1 ${
                    achievement.unlocked ? 'text-green-800' : 'text-gray-500'
                  }`}
                >
                  {achievement.name}
                </h3>
                <p
                  className={`font-game text-sm ${
                    achievement.unlocked ? 'text-green-700' : 'text-gray-400'
                  }`}
                >
                  {achievement.description}
                </p>
                
                {achievement.unlocked && (
                  <div className="mt-2">
                    <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      ✓ UNLOCKED
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Stats */}
        <div className="bg-game-cream border-4 border-game-brown rounded-xl p-6 mt-8">
          <h3 className="font-game text-xl font-bold text-game-darkBrown mb-4 text-center">
            PROGRESS
          </h3>
          <div className="text-center">
            <p className="font-game text-game-darkBrown">
              {achievements.filter(a => a.unlocked).length} of {achievements.length} achievements unlocked
            </p>
            <div className="w-full bg-gray-300 rounded-full h-4 border-2 border-game-brown mt-2">
              <div
                className="bg-gradient-to-r from-game-yellow to-game-orange h-full rounded-full transition-all duration-300"
                style={{
                  width: `${(achievements.filter(a => a.unlocked).length / achievements.length) * 100}%`
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsScreen;
