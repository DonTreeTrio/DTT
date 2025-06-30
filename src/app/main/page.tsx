import { marketApi } from '@/apis/websocket/market';
import { MarketResponse } from '@/apis/websocket/type';
import Loading from '@/components/common/Loading';
import { Suspense } from 'react';
import { ClientTimeFilter } from './components/ClientComponents';
import CoinListContainer from './components/coinList/CoinListContainer';
import TradeSection from './components/TradeSection';
import { MarketInfo, MarketProvider } from './context/MarketContext';

export default async function Page() {
  // 초기 코인 마켓 데이터 조회
  const data: MarketResponse[] = await marketApi.getAllMarkets();

  // 초기 코인 마켓 데이터 매핑
  const initialMarkets: MarketInfo[] = data.map((item: MarketResponse) => ({
    market: `${item.market}`,
    korean_name: item.korean_name,
    english_name: item.english_name,
    market_warning: item.market_warning || 'NONE',
  }));

  return (
    <Suspense fallback={<Loading />}>
      <MarketProvider initialMarkets={initialMarkets}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            {/* 좌측: 코인 리스트 */}
            <div className="w-full lg:w-[370px]">
              <CoinListContainer initialMarkets={data} />
            </div>

            {/* 우측: 차트 및 거래 섹션 (세로 배치) */}
            <div className="w-full lg:flex-1 lg:pl-4 flex flex-col">
              {/* 시간 필터 및 차트 영역 */}
              <ClientTimeFilter />

              {/* 거래 섹션 영역 */}
              <div className="mb-6">
                <TradeSection />
              </div>
            </div>
          </div>
        </div>
      </MarketProvider>
    </Suspense>
  );
}
