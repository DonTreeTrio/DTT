import { marketApi } from '@/apis/websocket/market';
import Loading from '@/components/common/Loading';
import { Suspense } from 'react';
import CoinListContainer from './components/CoinListContainer';

export default async function Page() {
  // 초기 코인 마켓 데이터 조회
  const data = await marketApi.getAllMarkets();

  // 초기 코인 마켓 데이터 매핑
  const initialMarkets = data.map((item: any) => ({
    market: `${item.market}`,
    korean_name: item.korean_name,
    english_name: item.english_name,
    market_warning: item.market_warning || 'NONE',
  }));

  return (
    <Suspense fallback={<Loading />}>
      <CoinListContainer initialMarkets={initialMarkets} />
    </Suspense>
  );
}
