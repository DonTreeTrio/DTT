'use client';

import type { MarketResponse, TickerResponse } from '@/apis/websocket/type';
import CoinListItem from './CoinListItem';

interface CoinListProps {
  markets: MarketResponse[];
  tickerData: Record<string, TickerResponse>;
  priceFlash: Record<string, boolean>;
  onSelectCoin: (market: string) => void;
}

export default function CoinList({
  markets,
  tickerData,
  priceFlash,
  onSelectCoin,
}: CoinListProps) {
  return (
    <div className="max-h-[800px] overflow-y-auto pt-[0.2rem]">
      {markets.map((market) => {
        const data = tickerData[market.market];
        if (!data) return null;
        return (
          <CoinListItem
            key={market.market}
            market={market}
            tickerData={data}
            isFlashing={priceFlash[market.market]}
            onSelectCoin={onSelectCoin}
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
