
import React from 'react';
import MacaroniPlate from '@/components/MacaroniPlate';
import GameButton from '@/components/GameButton';
import { ArrowLeft, Home } from 'lucide-react';

interface GameplayScreenProps {
  score: number;
  level: number;
  multiplier: number;
  premiumCurrency: number;
  onSpin: () => void;
  onBackClick: () => void;
}

const GameplayScreen: React.FC<GameplayScreenProps> = ({
  score,
  level,
  multiplier,
  premiumCurrency,
  onSpin,
  onBackClick,
}) => {
  const nextLevelScore = level * 100000;
  const currentLevelProgress = score % 100000;
  const progressPercentage = (currentLevelProgress / 100000) * 100;

  return (
    <div 
      className="min-h-screen flex flex-col p-4 relative"
      style={{
        background: 'linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%)',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <GameButton onClick={onBackClick} size="sm" variant="secondary">
              <ArrowLeft className="w-5 h-5" />
            </GameButton>
            <GameButton onClick={onBackClick} size="sm" variant="secondary">
              <Home className="w-5 h-5" />
            </GameButton>
          </div>
          
          <div className="text-center bg-white/90 rounded-xl px-4 py-2">
            <h2 className="text-xl font-bold text-red-800" style={{ fontFamily: 'Assistant, sans-serif' }}>
              רמה {level}
            </h2>
            <p className="text-red-700" style={{ fontFamily: 'Alef, sans-serif' }}>
              {score.toLocaleString()} נקודות
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl px-3 py-2">
            <span className="text-yellow-900 font-bold" style={{ fontFamily: 'Alef, sans-serif' }}>
              💎 {premiumCurrency}
            </span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="bg-white/90 border-4 border-yellow-600 rounded-xl p-3 mb-6">
          <div className="flex justify-between items-center text-red-800 font-bold text-sm mb-2" style={{ fontFamily: 'Assistant, sans-serif' }}>
            <span>התקדמות לרמה {level + 1}</span>
            <span style={{ fontFamily: 'Alef, sans-serif' }}>
              {currentLevelProgress.toLocaleString()} / 100,000
            </span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-3 border-2 border-yellow-600">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        {/* Game area */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <MacaroniPlate onSpin={onSpin} multiplier={multiplier} />
          
          <div className="text-center mt-6 bg-white/90 rounded-xl p-4">
            <p className="text-red-800 font-bold text-lg mb-2" style={{ fontFamily: 'Assistant, sans-serif' }}>
              סובב את המקרוני עם האצבע!
            </p>
            <p className="text-red-700" style={{ fontFamily: 'Alef, sans-serif' }}>
              כל סיבוב מלא = {multiplier} נקודות
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameplayScreen;
