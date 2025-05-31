
import React, { useState } from 'react';
import GameButton from '@/components/GameButton';
import { ArrowLeft } from 'lucide-react';
import { ShopItem } from '@/types/game';

interface ShopScreenProps {
  score: number;
  premiumCurrency: number;
  shopItems: ShopItem[];
  onBackClick: () => void;
  onPurchase: (itemId: string, usePremium?: boolean) => boolean;
}

const ShopScreen: React.FC<ShopScreenProps> = ({
  score,
  premiumCurrency,
  shopItems,
  onBackClick,
  onPurchase,
}) => {
  const [activeTab, setActiveTab] = useState<'sauces' | 'pasta' | 'forks' | 'premium'>('sauces');

  const filteredItems = shopItems.filter(item => item.category === activeTab);

  const handlePurchase = (itemId: string, usePremium: boolean = false) => {
    const success = onPurchase(itemId, usePremium);
    if (!success) {
      console.log('Purchase failed - insufficient funds or already owned');
    }
  };

  const getItemIcon = (item: ShopItem) => {
    switch (item.id) {
      case 'marinara': return '🍅';
      case 'pesto': return '🌿';
      case 'alfredo': return '🧄';
      case 'spaghetti': return '🍝';
      case 'penne': return '🟤';
      case 'fusilli': return '🌀';
      case 'golden_multiplier': return '⭐';
      default: return '🍴';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-orange-500 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <GameButton onClick={onBackClick} size="sm" variant="secondary">
          <ArrowLeft className="w-5 h-5" />
        </GameButton>
        
        <h1 className="text-3xl font-bold text-red-800" style={{ fontFamily: 'Assistant, sans-serif' }}>
          החנות
        </h1>
        
        <div className="w-12"></div>
      </div>
      
      {/* Currency display */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-white/90 border-4 border-red-600 rounded-xl p-3 text-center">
          <p className="font-bold text-red-800 text-lg" style={{ fontFamily: 'Alef, sans-serif' }}>
            {score.toLocaleString()}
          </p>
          <p className="text-red-600 text-sm" style={{ fontFamily: 'Assistant, sans-serif' }}>
            נקודות
          </p>
        </div>
        <div className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 border-4 border-yellow-700 rounded-xl p-3 text-center">
          <p className="font-bold text-yellow-900 text-lg" style={{ fontFamily: 'Alef, sans-serif' }}>
            💎 {premiumCurrency}
          </p>
          <p className="text-yellow-800 text-sm" style={{ fontFamily: 'Assistant, sans-serif' }}>
            יהלומים
          </p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex bg-white/90 border-4 border-red-600 rounded-xl p-2 mb-6 overflow-x-auto">
        {[
          { id: 'sauces' as const, label: 'רטבים' },
          { id: 'pasta' as const, label: 'פסטה' },
          { id: 'forks' as const, label: 'מזלגות' },
          { id: 'premium' as const, label: 'פרימיום' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all text-sm ${
              activeTab === tab.id
                ? 'bg-gradient-to-b from-yellow-400 to-orange-500 text-red-800 shadow-lg'
                : 'text-red-600 hover:bg-gray-100'
            }`}
            style={{ fontFamily: 'Assistant, sans-serif' }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Items grid */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredItems.map((item) => {
          const canAffordCoins = score >= item.price;
          const canAffordPremium = item.premiumPrice ? premiumCurrency >= item.premiumPrice : false;
          
          return (
            <div
              key={item.id}
              className="bg-white/90 border-4 border-red-600 rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-lg border-2 border-red-600 flex items-center justify-center text-2xl">
                  {getItemIcon(item)}
                </div>
                <div>
                  <h3 className="font-bold text-red-800 text-lg" style={{ fontFamily: 'Assistant, sans-serif' }}>
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="text-red-600 text-sm" style={{ fontFamily: 'Alef, sans-serif' }}>
                      {item.description}
                    </p>
                  )}
                  {item.effect && (
                    <p className="text-green-600 text-sm font-bold" style={{ fontFamily: 'Alef, sans-serif' }}>
                      {item.effect}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <div className="space-y-2">
                  {/* Regular price */}
                  <div>
                    <p className="font-bold text-red-800 text-sm" style={{ fontFamily: 'Alef, sans-serif' }}>
                      {item.price.toLocaleString()}
                    </p>
                    <GameButton
                      onClick={() => handlePurchase(item.id, false)}
                      size="sm"
                      disabled={item.owned || !canAffordCoins}
                      className="min-w-[60px] text-xs"
                    >
                      <span style={{ fontFamily: 'Assistant, sans-serif' }}>
                        {item.owned ? 'נרכש' : 'קנה'}
                      </span>
                    </GameButton>
                  </div>
                  
                  {/* Premium price */}
                  {item.premiumPrice && (
                    <div>
                      <p className="font-bold text-yellow-700 text-sm" style={{ fontFamily: 'Alef, sans-serif' }}>
                        💎 {item.premiumPrice}
                      </p>
                      <GameButton
                        onClick={() => handlePurchase(item.id, true)}
                        size="sm"
                        disabled={item.owned || !canAffordPremium}
                        className="min-w-[60px] text-xs bg-gradient-to-b from-yellow-400 to-yellow-600"
                      >
                        <span style={{ fontFamily: 'Assistant, sans-serif' }}>
                          {item.owned ? 'נרכש' : 'קנה'}
                        </span>
                      </GameButton>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopScreen;
