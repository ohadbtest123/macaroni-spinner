
import { useState, useEffect } from 'react';
import { GameState, Fork, Achievement, ShopItem, Mission, DailyReward, PlayerStatistics } from '@/types/game';

const DEFAULT_FORKS: Fork[] = [
  { id: 'basic', name: 'מזלג בסיסי', multiplier: 1, price: 0, owned: true, category: 'forks' },
  { id: 'silver', name: 'מזלג כסף', multiplier: 2, price: 10000, owned: false, category: 'forks' },
  { id: 'gold', name: 'מזלג זהב', multiplier: 3, price: 50000, owned: false, category: 'forks' },
  { id: 'platinum', name: 'מזלג פלטינה', multiplier: 5, price: 200000, owned: false, category: 'forks' },
];

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { 
    id: 'novice', 
    name: 'חדש בסיבובים', 
    description: 'בצע 1,000 סיבובים', 
    condition: 1000, 
    unlocked: false, 
    icon: '🌟',
    reward: { type: 'score', amount: 5000 }
  },
  { 
    id: 'twirler', 
    name: 'מומחה סיבובים', 
    description: 'בצע 10,000 סיבובים', 
    condition: 10000, 
    unlocked: false, 
    icon: '🏆',
    reward: { type: 'multiplier', amount: 1.1, duration: 3600 }
  },
  { 
    id: 'overachiever', 
    name: 'מתעלה על עצמו', 
    description: 'הגע לרמה 10', 
    condition: 10, 
    unlocked: false, 
    icon: '🔥',
    reward: { type: 'premium', amount: 100 }
  },
];

const DEFAULT_MISSIONS: Mission[] = [
  {
    id: 'daily_spins',
    name: 'סיבובים יומיים',
    description: 'בצע 500 סיבובים היום',
    target: 500,
    progress: 0,
    completed: false,
    type: 'daily',
    reward: { type: 'score', amount: 10000 }
  },
  {
    id: 'daily_shop',
    name: 'קניות יומיות',
    description: 'רכוש 3 פריטים מהחנות',
    target: 3,
    progress: 0,
    completed: false,
    type: 'daily',
    reward: { type: 'premium', amount: 50 }
  }
];

const SHOP_ITEMS: ShopItem[] = [
  // Sauces
  { id: 'marinara', name: 'מרינרה', price: 5000, category: 'sauces', icon: '🍅', owned: false, description: 'רוטב עגבניות קלסי', isVisualOnly: true },
  { id: 'pesto', name: 'פסטו', price: 7500, category: 'sauces', icon: '🌿', owned: false, description: 'רוטב בזיליקום ארומטי', isVisualOnly: true },
  { id: 'alfredo', name: 'אלפרדו', price: 10000, category: 'sauces', icon: '🧄', owned: false, description: 'רוטב שמנת עשיר', isVisualOnly: true },
  // Pasta
  { id: 'spaghetti', name: 'ספגטי', price: 3000, category: 'pasta', icon: '🍝', owned: false, description: 'פסטה דקה וארוכה', isVisualOnly: true },
  { id: 'penne', name: 'פנה', price: 4000, category: 'pasta', icon: '🟤', owned: false, description: 'פסטה צינורית', isVisualOnly: true },
  { id: 'fusilli', name: 'פוסילי', price: 5000, category: 'pasta', icon: '🌀', owned: false, description: 'פסטה מסולסלת', isVisualOnly: true },
  // Forks
  ...DEFAULT_FORKS.slice(1).map(fork => ({
    id: fork.id,
    name: fork.name,
    price: fork.price,
    category: 'forks' as const,
    icon: '🍴',
    owned: fork.owned,
    effect: `מכפיל × ${fork.multiplier}`
  })),
  // Premium Items
  { 
    id: 'golden_multiplier', 
    name: 'מכפיל זהב', 
    price: 0, 
    premiumPrice: 100, 
    category: 'premium', 
    icon: '⭐', 
    owned: false, 
    description: 'מכפיל קבוע ×1.5',
    effect: 'מכפיל קבוע ×1.5'
  }
];

const getInitialGameState = (): GameState => {
  const saved = localStorage.getItem('macaroni-spin-mania');
  if (saved) {
    const parsed = JSON.parse(saved);
    // Check if it's a new day for daily rewards and missions
    const today = new Date().toDateString();
    const lastLogin = new Date(parsed.lastLoginDate).toDateString();
    
    if (today !== lastLogin) {
      // Reset daily missions
      parsed.missions = parsed.missions.map((mission: Mission) => 
        mission.type === 'daily' ? { ...mission, progress: 0, completed: false } : mission
      );
      parsed.dailyRewardClaimed = false;
    }
    
    return parsed;
  }

  return {
    score: 0,
    level: 1,
    totalSpins: 0,
    activeFork: DEFAULT_FORKS[0],
    ownedUpgrades: [],
    achievements: DEFAULT_ACHIEVEMENTS,
    missions: DEFAULT_MISSIONS,
    settings: {
      soundEnabled: true,
      vibrationEnabled: true,
      language: 'he',
      autoSpin: false,
    },
    lastLoginDate: new Date().toISOString(),
    dailyRewardClaimed: false,
    dailyRewardStreak: 0,
    passiveIncome: 0,
    premiumCurrency: 0,
    statistics: {
      totalSpins: 0,
      totalPlayTime: 0,
      totalPurchases: 0,
      highestScorePerSpin: 0,
      maxLevel: 1,
    }
  };
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(getInitialGameState);
  const [shopItems, setShopItems] = useState<ShopItem[]>(SHOP_ITEMS);

  useEffect(() => {
    localStorage.setItem('macaroni-spin-mania', JSON.stringify(gameState));
  }, [gameState]);

  const addScore = (points: number) => {
    setGameState(prev => {
      const spinPoints = points * prev.activeFork.multiplier;
      const newScore = prev.score + spinPoints;
      const newLevel = Math.floor(newScore / 100000) + 1;
      const newTotalSpins = prev.totalSpins + 1;
      
      // Update missions progress
      const updatedMissions = prev.missions.map(mission => {
        if (mission.id === 'daily_spins' && !mission.completed) {
          const newProgress = mission.progress + 1;
          return {
            ...mission,
            progress: Math.min(newProgress, mission.target),
            completed: newProgress >= mission.target
          };
        }
        return mission;
      });
      
      // Check achievements
      const updatedAchievements = prev.achievements.map(achievement => {
        if (!achievement.unlocked) {
          if (achievement.id === 'novice' && newTotalSpins >= 1000) {
            return { ...achievement, unlocked: true };
          }
          if (achievement.id === 'twirler' && newTotalSpins >= 10000) {
            return { ...achievement, unlocked: true };
          }
          if (achievement.id === 'overachiever' && newLevel >= 10) {
            return { ...achievement, unlocked: true };
          }
        }
        return achievement;
      });

      // Update statistics
      const updatedStatistics = {
        ...prev.statistics,
        totalSpins: newTotalSpins,
        highestScorePerSpin: Math.max(prev.statistics.highestScorePerSpin, spinPoints),
        maxLevel: Math.max(prev.statistics.maxLevel, newLevel),
      };

      return {
        ...prev,
        score: newScore,
        level: newLevel,
        totalSpins: newTotalSpins,
        achievements: updatedAchievements,
        missions: updatedMissions,
        statistics: updatedStatistics,
      };
    });
  };

  const purchaseItem = (itemId: string, usePremium: boolean = false) => {
    const item = shopItems.find(i => i.id === itemId);
    if (!item || item.owned) return false;

    const cost = usePremium ? item.premiumPrice || 0 : item.price;
    const currency = usePremium ? gameState.premiumCurrency : gameState.score;
    
    if (currency < cost) return false;

    setGameState(prev => ({
      ...prev,
      score: usePremium ? prev.score : prev.score - cost,
      premiumCurrency: usePremium ? prev.premiumCurrency - cost : prev.premiumCurrency,
      ownedUpgrades: [...prev.ownedUpgrades, itemId],
      activeFork: item.category === 'forks' 
        ? DEFAULT_FORKS.find(f => f.id === itemId) || prev.activeFork
        : prev.activeFork,
      statistics: {
        ...prev.statistics,
        totalPurchases: prev.statistics.totalPurchases + 1
      }
    }));

    setShopItems(prev => 
      prev.map(i => i.id === itemId ? { ...i, owned: true } : i)
    );

    // Update shop mission progress
    setGameState(prev => ({
      ...prev,
      missions: prev.missions.map(mission => {
        if (mission.id === 'daily_shop' && !mission.completed) {
          const newProgress = mission.progress + 1;
          return {
            ...mission,
            progress: Math.min(newProgress, mission.target),
            completed: newProgress >= mission.target
          };
        }
        return mission;
      })
    }));

    return true;
  };

  const claimDailyReward = () => {
    if (gameState.dailyRewardClaimed) return false;

    const rewards = [
      { type: 'score' as const, amount: 5000 },
      { type: 'score' as const, amount: 10000 },
      { type: 'premium' as const, amount: 50 },
      { type: 'score' as const, amount: 15000 },
      { type: 'premium' as const, amount: 75 },
      { type: 'score' as const, amount: 25000 },
      { type: 'premium' as const, amount: 100 },
    ];

    const dayIndex = gameState.dailyRewardStreak % 7;
    const reward = rewards[dayIndex];

    setGameState(prev => ({
      ...prev,
      dailyRewardClaimed: true,
      dailyRewardStreak: prev.dailyRewardStreak + 1,
      score: reward.type === 'score' ? prev.score + reward.amount : prev.score,
      premiumCurrency: reward.type === 'premium' ? prev.premiumCurrency + reward.amount : prev.premiumCurrency,
    }));

    return reward;
  };

  const claimMissionReward = (missionId: string) => {
    const mission = gameState.missions.find(m => m.id === missionId);
    if (!mission || !mission.completed) return false;

    const reward = mission.reward;
    setGameState(prev => ({
      ...prev,
      score: reward.type === 'score' ? prev.score + reward.amount : prev.score,
      premiumCurrency: reward.type === 'premium' ? prev.premiumCurrency + reward.amount : prev.premiumCurrency,
      missions: prev.missions.filter(m => m.id !== missionId)
    }));

    return true;
  };

  const updateSettings = (newSettings: Partial<GameState['settings']>) => {
    setGameState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  };

  const resetGame = () => {
    const resetState = getInitialGameState();
    setGameState(resetState);
    setShopItems(SHOP_ITEMS);
    localStorage.setItem('macaroni-spin-mania', JSON.stringify(resetState));
  };

  return {
    gameState,
    shopItems,
    addScore,
    purchaseItem,
    claimDailyReward,
    claimMissionReward,
    updateSettings,
    resetGame,
  };
};
