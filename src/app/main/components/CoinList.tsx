'use client';

import { marketApi } from '@/apis/websocket/market';
import type { MarketResponse, TickerResponse } from '@/apis/websocket/type';
import { bithumbSocket } from '@/apis/websocket/websocket';
import { useEffect, useRef, useState } from 'react';
import CoinListHeader from './CoinListHeader';
import CoinListItem from './CoinListItem';

export default function CoinList() {
  const [marketInfo, setMarketInfo] = useState<MarketResponse[]>([]);
  const [tickerData, setTickerData] = useState<Record<string, TickerResponse>>(
    {},
  );
  const wsRef = useRef<{ close: () => void } | null>(null);

  useEffect(() => {
    const loadMarketInfo = async () => {
      const markets = await marketApi.getAllMarkets();
      if (markets) {
        setMarketInfo(markets);
        wsRef.current = bithumbSocket.connect(markets, (data) => {
          setTickerData((prev) => ({
            ...prev,
            [data.code]: data,
          }));
        });
      }
    };

    loadMarketInfo();
    return () => wsRef.current?.close();
  }, []);

  return (
    <div className="w-[450px] mt-[10rem]">
      <CoinListHeader />
      <div className="h-full pt-[0.2rem] overflow-y-auto">
        {marketInfo.map((market) => {
          const data = tickerData[market.market];
          if (!data) return null;
          return (
            <CoinListItem
              key={market.market}
              market={market}
              tickerData={data}
            />
          );
        })}
        {Object.keys(tickerData).length === 0 && (
          <div className="text-center py-10 text-gray-500">
            코인 정보를 불러오는 중...
          </div>
        )}
      </div>
    </div>
  );
}
