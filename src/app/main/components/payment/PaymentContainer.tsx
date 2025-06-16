'use client';

import { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import PaymentForm from './PaymentForm';

type OrderType = 'buy' | 'sell';

export default function PaymentContainer() {
  const { selectedMarket } = useMarket();
  const [activeTab, setActiveTab] = useState<OrderType>('buy');

  const handleTabChange = (tab: OrderType) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="border-b border-gray-200">
        <nav className="flex">
          <button
            onClick={() => handleTabChange('buy')}
            className={`flex-1 py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'buy'
                ? 'border-[#179653] text-[#179653] bg-green-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            매수
          </button>
          <button
            onClick={() => handleTabChange('sell')}
            className={`flex-1 py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'sell'
                ? 'border-red-500 text-red-600 bg-red-50'
                : 'border-transparent text-gray-500 hover:text-ㄴ-700 hover:bg-gray-50'
            }`}
          >
            매도
          </button>
        </nav>
      </div>

      <div className="p-6">
        <PaymentForm orderType={activeTab} marketCode={selectedMarket || ''} />
      </div>
    </div>
  );
}
