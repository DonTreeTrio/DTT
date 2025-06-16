'use client';

import { useEffect, useState } from 'react';

interface TradeHistory {
  id: string;
  market: string;
  side: 'buy' | 'sell';
  price: number;
  quantity: number;
  created_at: string;
}

// 실시간 체결 데이터 생성
const generateRealtimeTrade = (basePrice: number): TradeHistory => {
  const now = new Date();
  const side: 'buy' | 'sell' = Math.random() > 0.5 ? 'buy' : 'sell';
  const priceVariation = (Math.random() - 0.5) * 10000; // ±5000원 범위
  const price = Math.round(basePrice + priceVariation);
  const quantity = Math.random() * 0.1; // 0 ~ 0.1 BTC

  return {
    id: `trade-${Date.now()}-${Math.random()}`,
    market: 'KRW-BTC',
    side,
    price,
    quantity,
    created_at: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`,
  };
};

// 초기 체결 데이터
const generateInitialTrades = (basePrice: number): TradeHistory[] => {
  const trades = [];
  const now = new Date();

  for (let i = 0; i < 15; i++) {
    const time = new Date(now.getTime() - i * 1000 * Math.random() * 30); // 최근 30초 내의 랜덤 시간
    const side: 'buy' | 'sell' = Math.random() > 0.5 ? 'buy' : 'sell';
    const priceVariation = (Math.random() - 0.5) * 10000;
    const price = Math.round(basePrice + priceVariation);
    const quantity = Math.random() * 0.1;

    trades.push({
      id: `initial-trade-${i}`,
      market: 'KRW-BTC',
      side,
      price,
      quantity,
      created_at: `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')}`,
    });
  }

  return trades.sort((a, b) => b.created_at.localeCompare(a.created_at));
};

export default function TradeHistoryContainer() {
  const basePrice = 147541000; // 기준가
  const [tradeHistory, setTradeHistory] = useState<TradeHistory[]>(() =>
    generateInitialTrades(basePrice),
  );

  // 실시간 체결 데이터 추가
  useEffect(() => {
    const interval = setInterval(() => {
      // 5~15초마다 새로운 체결 추가
      if (Math.random() > 0.7) {
        const newTrade = generateRealtimeTrade(basePrice);
        setTradeHistory((prev) => [newTrade, ...prev.slice(0, 19)]); // 최대 20개 유지
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white max-w-sm">
      {/* 헤더 */}
      <div className="px-3 py-2 border-b border-gray-200">
        <h4 className="font-medium text-gray-800 text-sm">체결내역</h4>
        <div className="grid grid-cols-3 mt-2 text-xs text-gray-500">
          <span>시간</span>
          <span className="text-center">가격(KRW)</span>
          <span className="text-right">체결량(BTC)</span>
        </div>
      </div>

      {/* 체결내역 리스트 */}
      <div className="max-h-[400px] overflow-y-auto">
        {tradeHistory.map((trade) => (
          <div
            key={trade.id}
            className="grid grid-cols-3 py-1.5 px-3 border-b border-gray-50 hover:bg-gray-50 text-xs"
          >
            <span className="text-gray-500">{trade.created_at}</span>
            <span
              className={`font-medium text-center ${
                trade.side === 'buy' ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              {trade.price.toLocaleString()}
            </span>
            <span
              className={`text-right ${
                trade.side === 'buy' ? 'text-red-500' : 'text-blue-500'
              }`}
            >
              {trade.quantity.toFixed(4)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
