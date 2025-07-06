'use client';

import type { MarketResponse, TickerResponse } from '@/apis/websocket/type';

interface CoinListItemProps {
  market: MarketResponse;
  tickerData: TickerResponse;
  isFlashing: boolean;
  onSelectCoin: (market: string) => void;
}

export default function CoinListItem({
  market,
  tickerData,
  isFlashing,
  onSelectCoin,
}: CoinListItemProps) {
  const currentPrice = Number(tickerData.trade_price || 0); // 현재가
  const priceChange = Number(tickerData.signed_change_price || 0); // 변동가 (부호 포함)
  const changeRate = Number(tickerData.signed_change_rate || 0); // 변동률 (부호 포함)
  const volume = Math.round(
    Number(tickerData.acc_trade_price_24h || 0) / 1000000,
  ); // 거래금액

  // 변동률과 변동가의 부호에 따라 색상 결정
  const isPositive = changeRate > 0;
  const isNegative = changeRate < 0;
  const isZero = changeRate === 0;

  const priceColor = isPositive
    ? 'text-red-500'
    : isNegative
      ? 'text-blue-500'
      : 'text-gray-500';

  const flashColor = isPositive
    ? 'bg-red-100/30'
    : isNegative
      ? 'bg-blue-100/30'
      : 'bg-gray-100/30';

  return (
    <div
      className={`w-full flex items-center p-3 hover:bg-gray-200 border-b border-gray-200 text-xs transition-colors cursor-pointer ${isFlashing ? flashColor : ''}`}
      onClick={() => onSelectCoin(market.market)}
    >
      <div className="flex-[3]">
        <h1 className="font-medium">{market.korean_name}</h1>
        <h2 className="text-sm text-gray-500">{market.english_name}</h2>
      </div>

      <div className={`flex-[2] text-right ${priceColor}`}>
        {currentPrice.toLocaleString()}
      </div>

      <div className={`flex-[2] text-right ${priceColor}`}>
        {/* 변동률 표시 - 첫 번째 줄 */}
        <div className="text-sm">
          {isPositive && '+'}
          {(changeRate * 100).toFixed(2)}%
        </div>
        {/* 변동 금액 표시 - 두 번째 줄 */}
        <div className="text-xs">
          {isPositive && '+'}
          {priceChange.toLocaleString()}
        </div>
      </div>

      <div className="flex-[2] text-right">
        {volume.toLocaleString()}
        <span className="text-gray-500 ml-1">백만</span>
      </div>
    </div>
  );
}
