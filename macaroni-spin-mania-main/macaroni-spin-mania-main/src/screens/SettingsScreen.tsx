
import React from 'react';
import GameButton from '@/components/GameButton';
import { ArrowLeft } from 'lucide-react';
import { GameSettings } from '@/types/game';

interface SettingsScreenProps {
  settings: GameSettings;
  onBackClick: () => void;
  onSettingChange: (setting: keyof GameSettings, value: boolean) => void;
  onResetGame: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({
  settings,
  onBackClick,
  onSettingChange,
  onResetGame,
}) => {
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all game progress? This cannot be undone.')) {
      onResetGame();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-orange to-red-600 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <GameButton onClick={onBackClick} size="sm" variant="secondary">
          <ArrowLeft className="w-5 h-5" />
        </GameButton>
        
        <h1 className="font-game text-3xl font-bold text-white">
          MACARONI SPIN
        </h1>
        
        <div className="w-12"></div>
      </div>
      
      <div className="max-w-md mx-auto space-y-6">
        {/* Sound setting */}
        <div className="bg-game-cream border-4 border-game-brown rounded-xl p-6">
          <div className="flex items-center justify-between">
            <span className="font-game text-xl font-bold text-game-darkBrown">
              SOUND
            </span>
            <button
              onClick={() => onSettingChange('soundEnabled', !settings.soundEnabled)}
              className={`w-16 h-8 rounded-full border-4 border-game-brown transition-all duration-300 relative ${
                settings.soundEnabled
                  ? 'bg-gradient-to-r from-green-400 to-green-500'
                  : 'bg-gradient-to-r from-gray-300 to-gray-400'
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full border-2 border-game-brown absolute top-0.5 transition-all duration-300 ${
                  settings.soundEnabled ? 'left-8' : 'left-0.5'
                }`}
              ></div>
            </button>
          </div>
          <p className="text-game-brown text-sm mt-2">
            {settings.soundEnabled ? 'ON' : 'OFF'}
          </p>
        </div>
        
        {/* Vibration setting */}
        <div className="bg-game-cream border-4 border-game-brown rounded-xl p-6">
          <div className="flex items-center justify-between">
            <span className="font-game text-xl font-bold text-game-darkBrown">
              VIBRATION
            </span>
            <button
              onClick={() => onSettingChange('vibrationEnabled', !settings.vibrationEnabled)}
              className={`w-16 h-8 rounded-full border-4 border-game-brown transition-all duration-300 relative ${
                settings.vibrationEnabled
                  ? 'bg-gradient-to-r from-green-400 to-green-500'
                  : 'bg-gradient-to-r from-gray-300 to-gray-400'
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full border-2 border-game-brown absolute top-0.5 transition-all duration-300 ${
                  settings.vibrationEnabled ? 'left-8' : 'left-0.5'
                }`}
              ></div>
            </button>
          </div>
          <p className="text-game-brown text-sm mt-2">
            {settings.vibrationEnabled ? 'ON' : 'OFF'}
          </p>
        </div>
        
        {/* Reset game */}
        <div className="bg-game-cream border-4 border-game-brown rounded-xl p-6">
          <h3 className="font-game text-xl font-bold text-game-darkBrown mb-4">
            RESET GAME
          </h3>
          <p className="text-game-brown text-sm mb-4">
            This will reset all progress, scores, and purchases.
          </p>
          <GameButton
            onClick={handleReset}
            variant="secondary"
            className="w-full bg-gradient-to-b from-red-400 to-red-600 border-red-700 text-white hover:from-red-500 hover:to-red-700"
          >
            RESET GAME
          </GameButton>
        </div>
        
        {/* Version */}
        <div className="text-center">
          <p className="text-game-lightYellow font-game text-lg">
            VERSION 1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
