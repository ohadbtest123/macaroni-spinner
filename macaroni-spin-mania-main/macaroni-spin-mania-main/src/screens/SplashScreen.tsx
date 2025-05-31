
import React, { useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500 to-orange-600 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 gap-4 h-full">
          {Array.from({ length: 64 }, (_, i) => (
            <div key={i} className="bg-white rounded-lg transform rotate-45"></div>
          ))}
        </div>
      </div>
      
      {/* Logo */}
      <div className="relative z-10 text-center animate-bounce-in">
        <h1 className="font-bold text-6xl md:text-8xl text-white mb-4 drop-shadow-2xl" style={{ fontFamily: 'Assistant, sans-serif' }}>
          MACARONI
          <br />
          SPIN MANIA
        </h1>
        
        {/* Animated pasta plate */}
        <div className="w-32 h-32 mx-auto bg-white rounded-full border-4 border-yellow-600 shadow-2xl flex items-center justify-center animate-spin-macaroni mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full relative">
            <div className="absolute inset-2 border-2 border-red-500 rounded-full opacity-60"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 text-xs">🍝</div>
          </div>
        </div>
        
        <p className="text-white text-xl font-bold mt-8 opacity-75" style={{ fontFamily: 'Alef, sans-serif' }}>
          טוען...
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
