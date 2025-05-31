
import React, { useEffect, useState } from 'react';
import GameButton from '@/components/GameButton';

interface LevelUpScreenProps {
  level: number;
  onContinue: () => void;
}

const LevelUpScreen: React.FC<LevelUpScreenProps> = ({ level, onContinue }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-yellow to-game-orange flex flex-col items-center justify-center p-8">
      {/* Background celebration effect */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute animate-bounce opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            🎉
          </div>
        ))}
      </div>
      
      <div className={`relative z-10 text-center transition-all duration-1000 ${showContent ? 'animate-bounce-in' : 'opacity-0 scale-50'}`}>
        {/* Level up text */}
        <h1 className="font-game text-4xl md:text-6xl font-bold text-game-darkBrown mb-6 drop-shadow-lg">
          LEVEL UP!
        </h1>
        
        {/* Animated macaroni */}
        <div className="w-32 h-32 mx-auto bg-gradient-to-b from-white to-gray-100 rounded-full border-8 border-game-brown shadow-2xl flex items-center justify-center mb-8 animate-spin-macaroni">
          <div className="w-20 h-20 bg-gradient-to-b from-game-pasta to-game-yellow rounded-full relative">
            <div className="absolute inset-2 border-2 border-game-orange rounded-full opacity-60"></div>
            <div className="absolute inset-4 border border-game-orange rounded-full opacity-40"></div>
            
            {/* Fork */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-12 h-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full relative">
                <div className="absolute -top-1 left-2 w-1 h-4 bg-gray-400 rounded-t"></div>
                <div className="absolute -top-1 left-4 w-1 h-4 bg-gray-400 rounded-t"></div>
                <div className="absolute -top-1 left-6 w-1 h-4 bg-gray-400 rounded-t"></div>
                <div className="absolute -top-1 left-8 w-1 h-4 bg-gray-400 rounded-t"></div>
              </div>
            </div>
          </div>
        </div>
        
        <h2 className="font-game text-2xl md:text-3xl font-bold text-game-darkBrown mb-8">
          YOU REACHED
          <br />
          LEVEL {level}!
        </h2>
        
        <GameButton onClick={onContinue} size="lg">
          CONTINUE
        </GameButton>
      </div>
    </div>
  );
};

export default LevelUpScreen;
