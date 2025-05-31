
import React from 'react';
import GameButton from '@/components/GameButton';
import { ArrowLeft, Target, Trophy } from 'lucide-react';
import { Mission } from '@/types/game';

interface MissionsScreenProps {
  missions: Mission[];
  onBackClick: () => void;
  onClaimReward: (missionId: string) => boolean;
}

const MissionsScreen: React.FC<MissionsScreenProps> = ({
  missions,
  onBackClick,
  onClaimReward,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-indigo-600 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <GameButton onClick={onBackClick} size="sm" variant="secondary">
          <ArrowLeft className="w-5 h-5" />
        </GameButton>
        
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Assistant, sans-serif' }}>
          משימות והישגים
        </h1>
        
        <div className="w-12"></div>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className={`border-4 border-blue-800 rounded-xl p-4 transition-all ${
              mission.completed
                ? 'bg-green-100 border-green-600'
                : 'bg-white/90'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-4 border-blue-600 flex items-center justify-center bg-blue-100">
                {mission.type === 'daily' ? (
                  <Target className="w-8 h-8 text-blue-600" />
                ) : (
                  <Trophy className="w-8 h-8 text-blue-600" />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-blue-800 mb-1" style={{ fontFamily: 'Assistant, sans-serif' }}>
                  {mission.name}
                </h3>
                <p className="text-blue-700 text-sm mb-2" style={{ fontFamily: 'Alef, sans-serif' }}>
                  {mission.description}
                </p>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
                  <div 
                    className="bg-blue-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((mission.progress / mission.target) * 100, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-600" style={{ fontFamily: 'Alef, sans-serif' }}>
                    {mission.progress} / {mission.target}
                  </span>
                  
                  {mission.completed ? (
                    <GameButton 
                      onClick={() => onClaimReward(mission.id)} 
                      size="sm"
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <span style={{ fontFamily: 'Assistant, sans-serif' }}>קבל פרס</span>
                    </GameButton>
                  ) : (
                    <span className="text-xs text-gray-500" style={{ fontFamily: 'Assistant, sans-serif' }}>
                      {mission.type === 'daily' ? 'יומי' : 'קבוע'}
                    </span>
                  )}
                </div>
                
                {/* Reward info */}
                <div className="mt-2 text-xs text-blue-600" style={{ fontFamily: 'Alef, sans-serif' }}>
                  פרס: {mission.reward.amount} {mission.reward.type === 'score' ? 'נקודות' : 'יהלומים'}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {missions.length === 0 && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Assistant, sans-serif' }}>
              כל הכבוד!
            </h3>
            <p className="text-white/80" style={{ fontFamily: 'Alef, sans-serif' }}>
              השלמת את כל המשימות הזמינות
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionsScreen;
