
export interface GameState {
  score: number;
  level: number;
  totalSpins: number;
  activeFork: Fork;
  ownedUpgrades: string[];
  achievements: Achievement[];
  missions: Mission[];
  settings: GameSettings;
  lastLoginDate: string;
  dailyRewardClaimed: boolean;
  dailyRewardStreak: number;
  passiveIncome: number;
  premiumCurrency: number;
  statistics: PlayerStatistics;
}

export interface PlayerStatistics {
  totalSpins: number;
  totalPlayTime: number;
  totalPurchases: number;
  highestScorePerSpin: number;
  maxLevel: number;
}

export interface Fork {
  id: string;
  name: string;
  multiplier: number;
  price: number;
  owned: boolean;
  category: 'forks';
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  premiumPrice?: number;
  category: 'sauces' | 'pasta' | 'forks' | 'premium';
  icon: string;
  owned: boolean;
  description?: string;
  effect?: string;
  isVisualOnly?: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  condition: number;
  unlocked: boolean;
  icon: string;
  reward: Reward;
}

export interface Mission {
  id: string;
  name: string;
  description: string;
  target: number;
  progress: number;
  completed: boolean;
  reward: Reward;
  type: 'daily' | 'weekly' | 'permanent';
  resetDate?: string;
}

export interface Reward {
  type: 'score' | 'multiplier' | 'premium' | 'item';
  amount: number;
  duration?: number;
}

export interface DailyReward {
  day: number;
  type: 'score' | 'multiplier' | 'premium';
  amount: number;
  claimed: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  playerName: string;
  score: number;
  level: number;
  country?: string;
}

export interface GameSettings {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  language: 'he' | 'en';
  autoSpin: boolean;
}
