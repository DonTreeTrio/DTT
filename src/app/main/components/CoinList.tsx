'use client';

import type { MarketResponse, TickerResponse } from '@/apis/websocket/type';
import CoinListItem from './CoinListItem';

interface CoinListProps {
  markets: MarketResponse[];
  tickerData: Record<string, TickerResponse>;
  priceFlash: Record<string, boolean>;
}

export default function CoinList({
  markets,
  tickerData,
  priceFlash,
}: CoinListProps) {
  return (
    <div className="h-full pt-[0.2rem] overflow-y-auto">
      {markets.map((market) => {
        const data = tickerData[market.market];
        if (!data) return null;
        return (
          <CoinListItem
            key={market.market}
            market={market}
            tickerData={data}
            isFlashing={priceFlash[market.market]}
          />
        );
      })}
      {Object.keys(tickerData).length === 0 && (
        <div className="text-center py-10 text-gray-500">
          코인 정보를 불러오는 중...
        </div>
      )}
    </div>
  );
}
