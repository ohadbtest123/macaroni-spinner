
import React from 'react';
import { cn } from '@/lib/utils';

interface GameButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

const GameButton: React.FC<GameButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
}) => {
  const baseClasses = 'font-game font-bold rounded-xl border-4 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg';
  
  const variantClasses = {
    primary: 'bg-gradient-to-b from-game-yellow to-game-orange border-game-brown text-game-darkBrown hover:from-yellow-300 hover:to-orange-400',
    secondary: 'bg-gradient-to-b from-game-cream to-game-lightYellow border-game-brown text-game-darkBrown hover:from-yellow-100 hover:to-yellow-200',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-lg',
    md: 'px-6 py-3 text-xl',
    lg: 'px-8 py-4 text-2xl',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed hover:scale-100',
        className
      )}
    >
      {children}
    </button>
  );
};

export default GameButton;
