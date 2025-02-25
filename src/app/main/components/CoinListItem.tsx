'use client';

import type { MarketResponse, TickerResponse } from '@/apis/websocket/type';
import { useState } from 'react';

interface CoinListItemProps {
  market: MarketResponse;
  tickerData: TickerResponse;
  isFlashing: boolean;
}

export default function CoinListItem({
  market,
  tickerData,
  isFlashing,
}: CoinListItemProps) {
  const [prevPrice, setPrevPrice] = useState(tickerData.trade_price);
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);

  const currentPrice = Number(tickerData.trade_price || 0); // 현재가
  const priceChange = Number(tickerData.signed_change_price || 0); // 변동가
  const changeRate = Number(tickerData.change_rate || 0); // 변동률
  const volume = Math.round(
    Number(tickerData.acc_trade_price_24h || 0) / 1000000,
  ); // 거래금액
  const priceColor =
    tickerData.change === 'RISE' ? 'text-red-500' : 'text-blue-500';
  const flashColor =
    tickerData.change === 'RISE' ? 'bg-red-100/30' : 'bg-blue-100/30';

  return (
    <div
      className={`w-full flex items-center p-3 hover:bg-gray-200 border-b border-gray-200 text-xs transition-colors ${isFlashing ? flashColor : ''}`}
    >
      <div className="flex-[3]">
        <h1 className="font-medium">{market.korean_name}</h1>
        <h2 className="text-sm text-gray-500">{market.english_name}</h2>
      </div>

      <div className={`flex-[2] text-right ${priceColor}`}>
        {currentPrice.toLocaleString()}
      </div>

      <div className={`flex-[2] text-right ${priceColor}`}>
        {tickerData.change === 'RISE' ? '+' : '-'}
        {(changeRate * 100).toFixed(2)}%
        <p className="text-sm">{priceChange.toLocaleString()}</p>
      </div>

      <div className="flex-[2] text-right">
        {volume.toLocaleString()}
        <span className="text-gray-500 ml-1">백만</span>
      </div>
    </div>
  );
}
