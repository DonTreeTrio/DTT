'use client';

import type { MarketResponse, TickerResponse } from '@/apis/websocket/type';
import { bithumbSocket } from '@/apis/websocket/websocket';
import { useCallback, useEffect, useRef, useState } from 'react';
import CoinList from './CoinList';
import CoinListHeader from './CoinListHeader';
import CoinSearch from './CoinSearch';

interface CoinListContainerProps {
  initialMarkets: MarketResponse[];
}

type SortKey = 'asset' | 'price' | 'change' | 'volume';
type SortDirection = 'asc' | 'desc';

export default function CoinListContainer({
  initialMarkets,
}: CoinListContainerProps) {
  const [marketInfo, setMarketInfo] =
    useState<MarketResponse[]>(initialMarkets);
  const [filteredMarkets, setFilteredMarkets] =
    useState<MarketResponse[]>(initialMarkets);
  const [tickerData, setTickerData] = useState<Record<string, TickerResponse>>(
    {},
  );
  const [priceFlash, setPriceFlash] = useState<Record<string, boolean>>({});
  const prevPrices = useRef<Record<string, number>>({});
  const wsRef = useRef<{ close: () => void } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    wsRef.current = bithumbSocket.connect(marketInfo, (data) => {
      const currentPrice = Number(data.trade_price);
      const prevPrice = prevPrices.current[data.code];

      if (prevPrice && currentPrice !== prevPrice) {
        setPriceFlash((prev) => ({ ...prev, [data.code]: true }));
        setTimeout(() => {
          setPriceFlash((prev) => ({ ...prev, [data.code]: false }));
        }, 500);
      }

      prevPrices.current[data.code] = currentPrice;
      setTickerData((prev) => ({
        ...prev,
        [data.code]: data,
      }));
    });

    return () => wsRef.current?.close();
  }, [marketInfo]);

  const handleSort = (key: SortKey, direction: SortDirection) => {
    const sortedMarkets = [...marketInfo].sort((a, b) => {
      const aData = tickerData[a.market];
      const bData = tickerData[b.market];
      if (!aData || !bData) return 0;

      switch (key) {
        case 'asset':
          return direction === 'asc'
            ? a.korean_name.localeCompare(b.korean_name)
            : b.korean_name.localeCompare(a.korean_name);
        case 'price':
          return direction === 'asc'
            ? Number(aData.trade_price) - Number(bData.trade_price)
            : Number(bData.trade_price) - Number(aData.trade_price);
        case 'change':
          return direction === 'asc'
            ? Number(aData.signed_change_rate) -
                Number(bData.signed_change_rate)
            : Number(bData.signed_change_rate) -
                Number(aData.signed_change_rate);
        case 'volume':
          return direction === 'asc'
            ? Number(aData.acc_trade_price_24h) -
                Number(bData.acc_trade_price_24h)
            : Number(bData.acc_trade_price_24h) -
                Number(aData.acc_trade_price_24h);
        default:
          return 0;
      }
    });

    setMarketInfo(sortedMarkets);
  };

  const handleSearch = useCallback(
    (keyword: string) => {
      if (!keyword.trim()) {
        setFilteredMarkets(marketInfo);
        return;
      }

      const filtered = marketInfo.filter(
        (market) =>
          market.korean_name.toLowerCase().includes(keyword.toLowerCase()) ||
          market.english_name.toLowerCase().includes(keyword.toLowerCase()),
      );
      setFilteredMarkets(filtered);
    },
    [marketInfo],
  );

  return (
    <div className="w-[450px] mt-[4rem]">
      <CoinSearch onSearch={handleSearch} />
      <CoinListHeader onSort={handleSort} />
      <CoinList
        markets={filteredMarkets}
        tickerData={tickerData}
        priceFlash={priceFlash}
      />
    </div>
  );
}
