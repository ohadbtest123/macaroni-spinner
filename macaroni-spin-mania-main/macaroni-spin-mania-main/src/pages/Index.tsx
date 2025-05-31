
import React, { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import SplashScreen from '@/screens/SplashScreen';
import MainMenuScreen from '@/screens/MainMenuScreen';
import GameplayScreen from '@/screens/GameplayScreen';
import LevelUpScreen from '@/screens/LevelUpScreen';
import ShopScreen from '@/screens/ShopScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import AchievementsScreen from '@/screens/AchievementsScreen';
import DailyRewardScreen from '@/screens/DailyRewardScreen';
import MissionsScreen from '@/screens/MissionsScreen';

type Screen = 'splash' | 'menu' | 'game' | 'levelup' | 'shop' | 'settings' | 'achievements' | 'dailyreward' | 'missions' | 'leaderboard';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [previousLevel, setPreviousLevel] = useState(1);
  const { 
    gameState, 
    shopItems, 
    addScore, 
    purchaseItem, 
    claimDailyReward, 
    claimMissionReward, 
    updateSettings, 
    resetGame 
  } = useGameState();

  const handleSpin = () => {
    const currentLevel = gameState.level;
    addScore(1);
    
    // Check if leveled up
    if (gameState.level > currentLevel) {
      setPreviousLevel(currentLevel);
      setCurrentScreen('levelup');
    }
    
    // Vibration feedback
    if (gameState.settings.vibrationEnabled && navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleLevelUpContinue = () => {
    setCurrentScreen('game');
  };

  const handlePurchase = (itemId: string, usePremium: boolean = false) => {
    return purchaseItem(itemId, usePremium);
  };

  const handleClaimDailyReward = () => {
    return claimDailyReward();
  };

  const handleClaimMissionReward = (missionId: string) => {
    return claimMissionReward(missionId);
  };

  const handleSettingChange = (setting: keyof typeof gameState.settings, value: boolean) => {
    updateSettings({ [setting]: value });
  };

  const handleResetGame = () => {
    resetGame();
    setCurrentScreen('menu');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={() => setCurrentScreen('menu')} />;
      
      case 'menu':
        return (
          <MainMenuScreen
            score={gameState.score}
            level={gameState.level}
            premiumCurrency={gameState.premiumCurrency}
            onPlayClick={() => setCurrentScreen('game')}
            onShopClick={() => setCurrentScreen('shop')}
            onSettingsClick={() => setCurrentScreen('settings')}
            onLeaderboardClick={() => setCurrentScreen('leaderboard')}
            onDailyGiftClick={() => setCurrentScreen('dailyreward')}
            onAchievementsClick={() => setCurrentScreen('achievements')}
            canClaimDailyReward={!gameState.dailyRewardClaimed}
          />
        );
      
      case 'game':
        return (
          <GameplayScreen
            score={gameState.score}
            level={gameState.level}
            multiplier={gameState.activeFork.multiplier}
            premiumCurrency={gameState.premiumCurrency}
            onSpin={handleSpin}
            onBackClick={() => setCurrentScreen('menu')}
          />
        );
      
      case 'levelup':
        return (
          <LevelUpScreen
            level={gameState.level}
            onContinue={handleLevelUpContinue}
          />
        );
      
      case 'shop':
        return (
          <ShopScreen
            score={gameState.score}
            premiumCurrency={gameState.premiumCurrency}
            shopItems={shopItems}
            onBackClick={() => setCurrentScreen('menu')}
            onPurchase={handlePurchase}
          />
        );
      
      case 'settings':
        return (
          <SettingsScreen
            settings={gameState.settings}
            onBackClick={() => setCurrentScreen('menu')}
            onSettingChange={handleSettingChange}
            onResetGame={handleResetGame}
          />
        );
      
      case 'achievements':
        return (
          <AchievementsScreen
            achievements={gameState.achievements}
            onBackClick={() => setCurrentScreen('menu')}
          />
        );
      
      case 'dailyreward':
        return (
          <DailyRewardScreen
            onBackClick={() => setCurrentScreen('menu')}
            onClaimReward={handleClaimDailyReward}
            canClaim={!gameState.dailyRewardClaimed}
            streak={gameState.dailyRewardStreak}
          />
        );
      
      case 'missions':
        return (
          <MissionsScreen
            missions={gameState.missions}
            onBackClick={() => setCurrentScreen('menu')}
            onClaimReward={handleClaimMissionReward}
          />
        );
      
      case 'leaderboard':
        // Placeholder for leaderboard - would need backend integration
        return (
          <div className="min-h-screen bg-gradient-to-b from-purple-500 to-blue-600 flex items-center justify-center p-4">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Assistant, sans-serif' }}>
                לוח המובילים
              </h1>
              <p className="mb-4" style={{ fontFamily: 'Alef, sans-serif' }}>
                התכונה תהיה זמינה בקרוב
              </p>
              <button 
                onClick={() => setCurrentScreen('menu')}
                className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold"
                style={{ fontFamily: 'Assistant, sans-serif' }}
              >
                חזרה לתפריט
              </button>
            </div>
          </div>
        );
      
      default:
        return <SplashScreen onComplete={() => setCurrentScreen('menu')} />;
    }
  };

  return (
    <div className="w-full min-h-screen overflow-hidden">
      {renderScreen()}
    </div>
  );
};

export default Index;
