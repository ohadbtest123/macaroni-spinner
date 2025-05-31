
import React from 'react';
import GameButton from '@/components/GameButton';
import { Play, ShoppingBag, Settings, Trophy, Gift } from 'lucide-react';

interface MainMenuScreenProps {
  score: number;
  level: number;
  premiumCurrency: number;
  onPlayClick: () => void;
  onShopClick: () => void;
  onSettingsClick: () => void;
  onLeaderboardClick: () => void;
  onDailyGiftClick: () => void;
  onAchievementsClick: () => void;
  canClaimDailyReward: boolean;
}

const MainMenuScreen: React.FC<MainMenuScreenProps> = ({
  score,
  level,
  premiumCurrency,
  onPlayClick,
  onShopClick,
  onSettingsClick,
  onLeaderboardClick,
  onDailyGiftClick,
  onAchievementsClick,
  canClaimDailyReward,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500 to-orange-600 flex flex-col items-center justify-center p-6">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 gap-4 h-full">
          {Array.from({ length: 64 }, (_, i) => (
            <div key={i} className="bg-white rounded-lg"></div>
          ))}
        </div>
      </div>
      
      <div className="relative z-10 text-center max-w-md w-full">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl" style={{ fontFamily: 'Assistant, sans-serif' }}>
          MACARONI
          <br />
          SPIN MANIA
        </h1>
        
        {/* Pasta plate illustration */}
        <div className="w-32 h-32 mx-auto bg-white rounded-full border-6 border-yellow-600 shadow-2xl flex items-center justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full relative">
            <div className="absolute inset-2 border-2 border-red-500 rounded-full opacity-60"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 text-xl">🍝</div>
          </div>
        </div>
        
        {/* Menu buttons */}
        <div className="space-y-3 mb-6">
          <GameButton onClick={onPlayClick} size="lg" className="w-full">
            <div className="flex items-center justify-center gap-3">
              <Play className="w-6 h-6" />
              <span style={{ fontFamily: 'Assistant, sans-serif' }}>שחק</span>
            </div>
          </GameButton>
          
          <GameButton onClick={onShopClick} size="lg" className="w-full">
            <div className="flex items-center justify-center gap-3">
              <ShoppingBag className="w-6 h-6" />
              <span style={{ fontFamily: 'Assistant, sans-serif' }}>חנות</span>
            </div>
          </GameButton>
          
          <div className="flex gap-2">
            <GameButton onClick={onLeaderboardClick} size="md" className="flex-1">
              <div className="flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5" />
                <span style={{ fontFamily: 'Assistant, sans-serif' }}>דירוג</span>
              </div>
            </GameButton>
            
            <GameButton 
              onClick={onDailyGiftClick} 
              size="md" 
              className={`flex-1 ${canClaimDailyReward ? 'animate-pulse' : ''}`}
              variant={canClaimDailyReward ? 'primary' : 'secondary'}
            >
              <div className="flex items-center justify-center gap-2">
                <Gift className="w-5 h-5" />
                <span style={{ fontFamily: 'Assistant, sans-serif' }}>מתנה</span>
              </div>
            </GameButton>
          </div>
          
          <div className="flex gap-2">
            <GameButton onClick={onAchievementsClick} size="md" className="flex-1">
              <div className="flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5" />
                <span style={{ fontFamily: 'Assistant, sans-serif' }}>הישגים</span>
              </div>
            </GameButton>
            
            <GameButton onClick={onSettingsClick} size="md" className="flex-1">
              <div className="flex items-center justify-center gap-2">
                <Settings className="w-5 h-5" />
                <span style={{ fontFamily: 'Assistant, sans-serif' }}>הגדרות</span>
              </div>
            </GameButton>
          </div>
        </div>
        
        {/* Score display */}
        <div className="bg-white/90 border-4 border-yellow-600 rounded-xl p-4">
          <div className="flex justify-between items-center text-red-800 font-bold">
            <div className="text-center">
              <span className="text-lg" style={{ fontFamily: 'Assistant, sans-serif' }}>רמה {level}</span>
            </div>
            <div className="text-center">
              <span className="text-lg" style={{ fontFamily: 'Alef, sans-serif' }}>{score.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-3 py-1 rounded-full">
              <span className="text-yellow-900 font-bold text-sm" style={{ fontFamily: 'Alef, sans-serif' }}>
                💎 {premiumCurrency}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenuScreen;
