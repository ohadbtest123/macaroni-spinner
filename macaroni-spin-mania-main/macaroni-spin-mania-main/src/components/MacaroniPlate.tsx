import React, { useState, useCallback, useRef } from 'react';

interface MacaroniPlateProps {
  onSpin: () => void;
  multiplier: number;
}

interface ScorePopup {
  id: number;
  score: number;
  x: number;
  y: number;
}

const MacaroniPlate: React.FC<MacaroniPlateProps> = ({ onSpin, multiplier }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [scorePopups, setScorePopups] = useState<ScorePopup[]>([]);
  const startAngleRef = useRef<number>(0);
  const lastAngleRef = useRef<number>(0);
  const totalRotationRef = useRef<number>(0);
  const plateRef = useRef<HTMLDivElement>(null);
  const popupIdRef = useRef<number>(0);

  const addScorePopup = useCallback((x: number, y: number) => {
    const popup: ScorePopup = {
      id: popupIdRef.current++,
      score: multiplier,
      x,
      y,
    };
    
    setScorePopups(prev => [...prev, popup]);
    
    // Remove popup after animation
    setTimeout(() => {
      setScorePopups(prev => prev.filter(p => p.id !== popup.id));
    }, 1000);
  }, [multiplier]);

  const getAngleFromEvent = useCallback((clientX: number, clientY: number) => {
    if (!plateRef.current) return 0;
    
    const rect = plateRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  }, []);

  const handleStart = useCallback((clientX: number, clientY: number) => {
    const angle = getAngleFromEvent(clientX, clientY);
    startAngleRef.current = angle;
    lastAngleRef.current = angle;
    totalRotationRef.current = 0;
    setIsSpinning(true);
  }, [getAngleFromEvent]);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isSpinning) return;
    
    const currentAngle = getAngleFromEvent(clientX, clientY);
    let angleDiff = currentAngle - lastAngleRef.current;
    
    // Handle angle wraparound
    if (angleDiff > 180) angleDiff -= 360;
    if (angleDiff < -180) angleDiff += 360;
    
    totalRotationRef.current += angleDiff;
    lastAngleRef.current = currentAngle;
    
    setRotation(prev => prev + angleDiff);
    
    // Check for complete rotation (360 degrees)
    if (Math.abs(totalRotationRef.current) >= 360) {
      onSpin();
      addScorePopup(clientX - 100, clientY - 50); // Position relative to screen
      totalRotationRef.current = 0;
    }
  }, [isSpinning, getAngleFromEvent, onSpin, addScorePopup]);

  const handleEnd = useCallback(() => {
    setIsSpinning(false);
  }, []);

  // Mouse events
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const angle = getAngleFromEvent(e.clientX, e.clientY);
    startAngleRef.current = angle;
    lastAngleRef.current = angle;
    totalRotationRef.current = 0;
    setIsSpinning(true);
  }, [getAngleFromEvent]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isSpinning) return;
    
    const currentAngle = getAngleFromEvent(e.clientX, e.clientY);
    let angleDiff = currentAngle - lastAngleRef.current;
    
    // Handle angle wraparound
    if (angleDiff > 180) angleDiff -= 360;
    if (angleDiff < -180) angleDiff += 360;
    
    totalRotationRef.current += angleDiff;
    lastAngleRef.current = currentAngle;
    
    setRotation(prev => prev + angleDiff);
    
    // Check for complete rotation (360 degrees)
    if (Math.abs(totalRotationRef.current) >= 360) {
      onSpin();
      addScorePopup(e.clientX - 100, e.clientY - 50);
      totalRotationRef.current = 0;
    }
  }, [isSpinning, getAngleFromEvent, onSpin, addScorePopup]);

  const handleMouseUp = useCallback(() => {
    setIsSpinning(false);
  }, []);

  // Touch events
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const angle = getAngleFromEvent(touch.clientX, touch.clientY);
    startAngleRef.current = angle;
    lastAngleRef.current = angle;
    totalRotationRef.current = 0;
    setIsSpinning(true);
  }, [getAngleFromEvent]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (!isSpinning) return;
    
    const currentAngle = getAngleFromEvent(touch.clientX, touch.clientY);
    let angleDiff = currentAngle - lastAngleRef.current;
    
    // Handle angle wraparound
    if (angleDiff > 180) angleDiff -= 360;
    if (angleDiff < -180) angleDiff += 360;
    
    totalRotationRef.current += angleDiff;
    lastAngleRef.current = currentAngle;
    
    setRotation(prev => prev + angleDiff);
    
    // Check for complete rotation (360 degrees)
    if (Math.abs(totalRotationRef.current) >= 360) {
      onSpin();
      addScorePopup(touch.clientX - 100, touch.clientY - 50);
      totalRotationRef.current = 0;
    }
  }, [isSpinning, getAngleFromEvent, onSpin, addScorePopup]);

  const handleTouchEnd = useCallback(() => {
    setIsSpinning(false);
  }, []);

  React.useEffect(() => {
    if (isSpinning) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isSpinning, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div className="relative flex items-center justify-center p-4">
      {/* Score popups */}
      {scorePopups.map((popup) => (
        <div
          key={popup.id}
          className="fixed z-50 pointer-events-none animate-bounce-in text-2xl font-bold text-yellow-400"
          style={{
            left: popup.x,
            top: popup.y,
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            animation: 'bounce-in 1s ease-out forwards',
            fontFamily: 'Assistant, sans-serif'
          }}
        >
          +{popup.score}
        </div>
      ))}
      
      {/* Large Plate with Spaghetti inspired by the reference image */}
      <div
        ref={plateRef}
        className="relative w-80 h-80 cursor-pointer select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ touchAction: 'none' }}
      >
        {/* Plate base - purple rim like in the image */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full shadow-2xl">
          {/* Inner rim - orange/salmon color */}
          <div className="absolute inset-3 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full">
            {/* Inner plate with red sauce base */}
            <div className="absolute inset-3 bg-gradient-to-br from-red-600 to-red-700 rounded-full overflow-hidden">
              
              {/* Spaghetti content that rotates */}
              <div 
                className="absolute inset-2 flex items-center justify-center transition-transform duration-100 overflow-hidden rounded-full"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {/* Main spaghetti nest in center - curly and twisted like in image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Central spaghetti swirl */}
                  <div className="absolute w-32 h-32 flex items-center justify-center">
                    {/* Multiple curved spaghetti strands forming a nest */}
                    <div className="absolute w-28 h-28 border-8 border-yellow-300 rounded-full opacity-80" style={{ borderStyle: 'dashed', borderDasharray: '15 10' }}></div>
                    <div className="absolute w-24 h-24 border-6 border-yellow-400 rounded-full opacity-70 transform rotate-45" style={{ borderStyle: 'dashed', borderDasharray: '12 8' }}></div>
                    <div className="absolute w-20 h-20 border-4 border-orange-200 rounded-full opacity-90 transform rotate-90" style={{ borderStyle: 'dashed', borderDasharray: '10 6' }}></div>
                    
                    {/* Inner twisted spaghetti */}
                    <div className="absolute w-16 h-16 border-4 border-yellow-200 rounded-full opacity-85 transform -rotate-30" style={{ borderStyle: 'dashed', borderDasharray: '8 5' }}></div>
                    <div className="absolute w-12 h-12 border-3 border-orange-300 rounded-full opacity-75 transform rotate-60" style={{ borderStyle: 'dashed', borderDasharray: '6 4' }}></div>
                  </div>
                  
                  {/* Outer spaghetti strands */}
                  <div className="absolute w-full h-full">
                    {/* Long curved strands around the edges */}
                    <div className="absolute top-4 left-8 w-20 h-3 bg-yellow-300 rounded-full transform rotate-25 opacity-90"></div>
                    <div className="absolute top-12 right-6 w-24 h-2 bg-orange-200 rounded-full transform -rotate-45 opacity-85"></div>
                    <div className="absolute bottom-8 left-12 w-18 h-2 bg-yellow-400 rounded-full transform rotate-75 opacity-80"></div>
                    <div className="absolute bottom-6 right-10 w-16 h-3 bg-orange-300 rounded-full transform -rotate-30 opacity-85"></div>
                    
                    {/* More random spaghetti pieces */}
                    <div className="absolute top-20 left-4 w-14 h-2 bg-yellow-200 rounded-full transform rotate-120 opacity-70"></div>
                    <div className="absolute top-6 right-16 w-12 h-2 bg-orange-200 rounded-full transform -rotate-60 opacity-75"></div>
                    <div className="absolute bottom-16 left-20 w-10 h-2 bg-yellow-300 rounded-full transform rotate-45 opacity-80"></div>
                    <div className="absolute bottom-12 right-4 w-18 h-2 bg-orange-300 rounded-full transform -rotate-15 opacity-85"></div>
                  </div>
                </div>
                
                {/* Cherry tomato pieces scattered like in the image */}
                <div className="absolute top-8 left-16 w-4 h-4 bg-red-500 rounded-full border-2 border-red-600"></div>
                <div className="absolute top-16 right-12 w-3 h-3 bg-red-600 rounded-full border border-red-700"></div>
                <div className="absolute bottom-12 left-8 w-4 h-4 bg-red-500 rounded-full border-2 border-red-600"></div>
                <div className="absolute bottom-8 right-20 w-3 h-3 bg-red-600 rounded-full border border-red-700"></div>
                <div className="absolute center-x center-y w-3 h-3 bg-red-500 rounded-full border border-red-600 transform translate-x-8 translate-y-4"></div>
                
                {/* Basil leaves scattered like in image */}
                <div className="absolute top-12 left-20 text-green-600 text-lg transform -rotate-12">🌿</div>
                <div className="absolute top-20 right-8 text-green-700 text-sm transform rotate-45">🌿</div>
                <div className="absolute bottom-16 left-12 text-green-600 text-md transform rotate-30">🌿</div>
                <div className="absolute bottom-10 right-16 text-green-700 text-sm transform -rotate-60">🌿</div>
                
                {/* Small herb garnish */}
                <div className="absolute center w-2 h-2 bg-green-500 rounded-full opacity-80 transform translate-x-12 translate-y-8"></div>
                <div className="absolute center w-1 h-1 bg-green-600 rounded-full opacity-70 transform -translate-x-10 translate-y-12"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Multiplier indicator */}
        {multiplier > 1 && (
          <div className="absolute -top-4 -right-4 bg-gradient-to-b from-red-400 to-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg border-2 border-white shadow-lg">
            ×{multiplier}
          </div>
        )}
        
        {/* Spinning indicator */}
        {isSpinning && (
          <div className="absolute inset-0 border-4 border-blue-400 rounded-full animate-pulse opacity-70"></div>
        )}
      </div>
    </div>
  );
};

export default MacaroniPlate;
