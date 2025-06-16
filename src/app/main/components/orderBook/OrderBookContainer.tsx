'use client';

import { useEffect, useState } from 'react';
import { getOrderBook } from '../../../../apis/bithumb/candleSearch';
import { useMarket } from '../../context/MarketContext';
import OrderBookTable from './OrderBookTable';

interface OrderBookUnit {
  ask_price: number;
  bid_price: number;
  ask_size: number;
  bid_size: number;
}

interface OrderBookData {
  market: string;
  timestamp: number;
  total_ask_size: number;
  total_bid_size: number;
  orderbook_units: OrderBookUnit[];
}

export default function OrderBookContainer() {
  const { selectedMarket, marketInfo } = useMarket();
  const [orderBookData, setOrderBookData] = useState<OrderBookData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 실제 거래가에서 현재가 가져오기
  const getCurrentPrice = (): number => {
    const currentMarket = marketInfo.find(
      (market) => market.market === selectedMarket,
    );
    return currentMarket?.trade_price || 0;
  };

  // 실제 API에서 변동률 가져오기
  const getChangeRate = (): number => {
    const currentMarket = marketInfo.find(
      (market) => market.market === selectedMarket,
    );
    return currentMarket?.change_rate
      ? Number(currentMarket.change_rate) * 100
      : 0;
  };

  // 상승/하락 여부 가져오기
  const getChangeType = (): string => {
    const currentMarket = marketInfo.find(
      (market) => market.market === selectedMarket,
    );
    return currentMarket?.change || 'EVEN';
  };

  useEffect(() => {
    if (!selectedMarket) return;

    // 호가 데이터 로드 함수
    const fetchOrderBook = async () => {
      setIsLoading(orderBookData === null); // 처음 로딩할 때만 로딩 상태 표시
      setError(null);

      try {
        const data = await getOrderBook(selectedMarket);
        if (data) {
          setOrderBookData(data);
        } else {
          throw new Error('호가 정보를 불러오는데 실패했습니다.');
        }
      } catch (err) {
        console.error('호가 정보 조회 오류:', err);
        setError(
          err instanceof Error
            ? err.message
            : '알 수 없는 오류가 발생했습니다.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    // 초기 데이터 로드
    fetchOrderBook();

    // 주기적으로 호가 데이터 업데이트 (2초마다)
    const intervalId = setInterval(fetchOrderBook, 2000);

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => {
      clearInterval(intervalId);
    };
  }, [selectedMarket, marketInfo]);

  if (isLoading && !orderBookData) {
    return <div className="p-4 text-center">호가 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  const currentPrice = getCurrentPrice();
  const changeRate = getChangeRate();
  const changeType = getChangeType();
  const isPositive = changeRate >= 0;

  return (
    <div className="bg-white rounded-lg shadow max-w-sm">
      {/* 상단 현재가 표시 */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-medium">호가 정보</h3>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <button className="hover:bg-gray-100 px-1 py-0.5 rounded">
              호가 모아보기
            </button>
            <button className="hover:bg-gray-100 px-1 py-0.5 rounded">
              수량
            </button>
          </div>
        </div>

        {/* 현재가 큰 표시 */}
        <div className="flex items-center space-x-3">
          <div
            className={`text-2xl font-bold ${
              isPositive ? 'text-red-500' : 'text-blue-500'
            }`}
          >
            {currentPrice.toLocaleString()}
          </div>
          <div
            className={`px-2 py-0.5 rounded text-xs font-medium ${
              isPositive
                ? 'bg-red-100 text-red-600'
                : 'bg-blue-100 text-blue-600'
            }`}
          >
            {changeRate >= 0 ? '+' : ''}
            {changeRate.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* 호가 테이블 */}
      {orderBookData && <OrderBookTable orderBookData={orderBookData} />}
    </div>
  );
}
