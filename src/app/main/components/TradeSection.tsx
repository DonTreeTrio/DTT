'use client';

import { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import OrderBookContainer from './orderBook/OrderBookContainer';
import PendingOrdersContainer from './orderBook/PendingOrdersContainer';
import TradeHistoryContainer from './orderBook/TradeHistoryContainer';
import PaymentForm from './payment/PaymentForm';

type TabType = 'buy' | 'sell' | 'pending' | 'history';

export default function TradeSection() {
  const [activeTab, setActiveTab] = useState<TabType>('buy');
  const { selectedMarket } = useMarket();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
      {/* 왼쪽 영역: 호가창 */}
      <div className="lg:col-span-1">
        <OrderBookContainer />
      </div>

      {/* 오른쪽 영역: 탭 기반 거래 영역 */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow">
          {/* 탭 메뉴 */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('buy')}
                className={`py-3 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'buy'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                매수
              </button>
              <button
                onClick={() => setActiveTab('sell')}
                className={`py-3 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'sell'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                매도
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`py-3 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'pending'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                미체결 내역
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-3 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'history'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                거래 내역
              </button>
            </nav>
          </div>

          {/* 탭 컨텐츠 */}
          <div className="p-4">
            {activeTab === 'buy' && (
              <PaymentForm orderType="buy" marketCode={selectedMarket || ''} />
            )}
            {activeTab === 'sell' && (
              <PaymentForm orderType="sell" marketCode={selectedMarket || ''} />
            )}
            {activeTab === 'pending' && (
              <div className="border-none shadow-none">
                <PendingOrdersContainer />
              </div>
            )}
            {activeTab === 'history' && (
              <div className="border-none shadow-none">
                <TradeHistoryContainer />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
