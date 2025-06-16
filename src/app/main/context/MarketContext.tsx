'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

// 마켓 정보 타입 정의
export interface MarketInfo {
  market: string;
  korean_name: string;
  english_name: string;
  trade_price?: number;
  change_rate?: number;
  change_price?: number;
  acc_trade_price_24h?: number;
  [key: string]: any;
}

// Context 인터페이스 정의
interface MarketContextType {
  selectedMarket: string | null;
  setSelectedMarket: (market: string | null) => void;
  marketInfo: MarketInfo[];
  setMarketInfo: (info: MarketInfo[]) => void;
}

// Context 생성
const MarketContext = createContext<MarketContextType | undefined>(undefined);

// Context Provider 컴포넌트
export function MarketProvider({
  children,
  initialMarkets = [],
}: {
  children: ReactNode;
  initialMarkets?: MarketInfo[];
}) {
  const [selectedMarket, setSelectedMarket] = useState<string | null>(
    'KRW-BTC',
  );
  const [marketInfo, setMarketInfo] = useState<MarketInfo[]>(initialMarkets);

  return (
    <MarketContext.Provider
      value={{
        selectedMarket,
        setSelectedMarket,
        marketInfo,
        setMarketInfo,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
}

// Context 사용을 위한 커스텀 훅
export function useMarket() {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
}
