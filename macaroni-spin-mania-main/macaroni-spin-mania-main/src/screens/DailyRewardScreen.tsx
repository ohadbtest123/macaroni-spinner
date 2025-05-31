
import React, { useState } from 'react';
import GameButton from '@/components/GameButton';
import { ArrowLeft, Gift } from 'lucide-react';

interface DailyRewardScreenProps {
  onBackClick: () => void;
  onClaimReward: () => any;
  canClaim: boolean;
  streak: number;
}

const DailyRewardScreen: React.FC<DailyRewardScreenProps> = ({
  onBackClick,
  onClaimReward,
  canClaim,
  streak,
}) => {
  const [showReward, setShowReward] = useState(false);
  const [claimedReward, setClaimedReward] = useState(null);

  const rewards = [
    { type: 'score', amount: 5000, icon: '🎯' },
    { type: 'score', amount: 10000, icon: '🎯' },
    { type: 'premium', amount: 50, icon: '💎' },
    { type: 'score', amount: 15000, icon: '🎯' },
    { type: 'premium', amount: 75, icon: '💎' },
    { type: 'score', amount: 25000, icon: '🎯' },
    { type: 'premium', amount: 100, icon: '💎' },
  ];

  const handleClaim = () => {
    if (!canClaim) return;
    
    const reward = onClaimReward();
    setClaimedReward(reward);
    setShowReward(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-600 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <GameButton onClick={onBackClick} size="sm" variant="secondary">
          <ArrowLeft className="w-5 h-5" />
        </GameButton>
        
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Assistant, sans-serif' }}>
          מתנות יומיות
        </h1>
        
        <div className="w-12"></div>
      </div>

      <div className="max-w-md mx-auto">
        {/* Streak counter */}
        <div className="bg-white/90 border-4 border-purple-800 rounded-xl p-4 mb-6 text-center">
          <h2 className="text-xl font-bold text-purple-800 mb-2" style={{ fontFamily: 'Assistant, sans-serif' }}>
            רצף כניסות
          </h2>
          <div className="text-3xl font-bold text-purple-600" style={{ fontFamily: 'Alef, sans-serif' }}>
            {streak} ימים
          </div>
        </div>

        {/* Reward boxes */}
        <div className="grid grid-cols-7 gap-2 mb-8">
          {rewards.map((reward, index) => {
            const dayNumber = index + 1;
            const isToday = (streak % 7) === index;
            const isPast = (streak % 7) > index || streak >= 7;
            
            return (
              <div
                key={index}
                className={`
                  border-4 rounded-xl p-3 text-center aspect-square flex flex-col items-center justify-center
                  ${isToday && canClaim 
                    ? 'bg-yellow-400 border-yellow-600 animate-pulse' 
                    : isPast 
                    ? 'bg-green-400 border-green-600' 
                    : 'bg-white/50 border-gray-400'
                  }
                `}
              >
                <div className="text-2xl mb-1">{reward.icon}</div>
                <div className="text-xs font-bold" style={{ fontFamily: 'Alef, sans-serif' }}>
                  {reward.amount}
                </div>
                <div className="text-xs" style={{ fontFamily: 'Assistant, sans-serif' }}>
                  יום {dayNumber}
                </div>
              </div>
            );
          })}
        </div>

        {/* Claim button */}
        {canClaim ? (
          <GameButton onClick={handleClaim} size="lg" className="w-full mb-4">
            <div className="flex items-center justify-center gap-3">
              <Gift className="w-6 h-6" />
              <span style={{ fontFamily: 'Assistant, sans-serif' }}>קבל מתנה יומית</span>
            </div>
          </GameButton>
        ) : (
          <div className="bg-gray-400 border-4 border-gray-600 rounded-xl p-4 text-center">
            <span className="text-white font-bold" style={{ fontFamily: 'Assistant, sans-serif' }}>
              כבר קיבלת את המתנה היום!
            </span>
          </div>
        )}

        {/* Reward popup */}
        {showReward && claimedReward && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowReward(false)}>
            <div className="bg-white rounded-xl p-8 text-center border-4 border-yellow-600">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-purple-800 mb-4" style={{ fontFamily: 'Assistant, sans-serif' }}>
                מזל טוב!
              </h3>
              <p className="text-lg mb-4" style={{ fontFamily: 'Alef, sans-serif' }}>
                קיבלת {claimedReward.amount} {claimedReward.type === 'score' ? 'נקודות' : 'יהלומים'}
              </p>
              <GameButton onClick={() => setShowReward(false)}>
                <span style={{ fontFamily: 'Assistant, sans-serif' }}>המשך</span>
              </GameButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyRewardScreen;
