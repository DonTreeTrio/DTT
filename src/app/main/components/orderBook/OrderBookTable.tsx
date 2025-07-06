'use client';

import { useMarket } from '../../context/MarketContext';

interface OrderBookUnit {
  price: string;
  quantity: string;
}

interface OrderBookData {
  payment_currency: string;
  timestamp: string;
  order_currency: string;
  bids: OrderBookUnit[];
  asks: OrderBookUnit[];
}

interface OrderBookTableProps {
  orderBookData: OrderBookData;
}

// 가격 선택 시 이벤트 발생을 위한 사용자 정의 이벤트
const selectPrice = (price: number, type: 'ask' | 'bid') => {
  const event = new CustomEvent('select-price', {
    detail: { price, type },
    bubbles: true,
  });
  document.dispatchEvent(event);
};

export default function OrderBookTable({ orderBookData }: OrderBookTableProps) {
  const { bids = [], asks = [] } = orderBookData;
  const { marketInfo, selectedMarket } = useMarket();

  // 현재 선택된 마켓의 현재가 찾기
  const currentMarketInfo = marketInfo.find(
    (market) => market.market === selectedMarket,
  );

  const currentPrice = currentMarketInfo?.trade_price || 0;

  // 실제 API 데이터를 사용하여 호가 리스트 생성
  const allOrders = [];

  // 매도호가 (asks) 처리
  if (Array.isArray(asks)) {
    for (const unit of asks) {
      const price = Number(unit.price);
      const size = Number(unit.quantity);

      // 현재가 대비 변동률 계산
      const changeRate =
        currentPrice > 0 ? ((price - currentPrice) / currentPrice) * 100 : 0;

      allOrders.push({
        price: price,
        size: size,
        type: 'ask' as const,
        changeRate,
      });
    }
  }

  // 매수호가 (bids) 처리
  if (Array.isArray(bids)) {
    for (const unit of bids) {
      const price = Number(unit.price);
      const size = Number(unit.quantity);

      // 현재가 대비 변동률 계산
      const changeRate =
        currentPrice > 0 ? ((price - currentPrice) / currentPrice) * 100 : 0;

      allOrders.push({
        price: price,
        size: size,
        type: 'bid' as const,
        changeRate,
      });
    }
  }

  // 전체를 가격순으로 정렬 (높은 가격부터)
  allOrders.sort((a, b) => b.price - a.price);

  // 변동률 포맷팅 함수
  const formatChangeRate = (rate: number): string => {
    const absRate = Math.abs(rate);

    // 0.01% 미만은 0.00%로 표시
    if (absRate < 0.01) {
      return '0.00%';
    }

    // 1% 미만은 소수점 3자리, 1% 이상은 소수점 2자리
    const decimals = absRate < 1 ? 3 : 2;
    const sign = rate >= 0 ? '+' : '';

    return `${sign}${rate.toFixed(decimals)}%`;
  };

  // 매도 호가 선택 핸들러
  const handleAskClick = (price: number) => {
    selectPrice(price, 'ask');
  };

  // 매수 호가 선택 핸들러
  const handleBidClick = (price: number) => {
    selectPrice(price, 'bid');
  };

  // 데이터가 없는 경우 처리
  if (allOrders.length === 0) {
    return (
      <div className="bg-white max-w-sm">
        <div className="px-3 py-2 bg-gray-50 text-xs text-gray-500 grid grid-cols-2 border-b">
          <div>가격 (KRW)</div>
          <div className="text-right">수량(BTC)</div>
        </div>
        <div className="p-4 text-center text-gray-500">
          호가 데이터를 불러오는 중...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white max-w-sm">
      {/* 헤더 */}
      <div className="px-3 py-2 bg-gray-50 text-xs text-gray-500 grid grid-cols-2 border-b">
        <div>가격 (KRW)</div>
        <div className="text-right">수량(BTC)</div>
      </div>

      {/* 호가 리스트 */}
      <div className="max-h-[500px] overflow-y-auto">
        {allOrders.map((order, index) => (
          <div
            key={`${order.type}-${order.price}-${index}`}
            className="grid grid-cols-2 py-1.5 px-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer text-sm"
            onClick={() =>
              order.type === 'ask'
                ? handleAskClick(order.price)
                : handleBidClick(order.price)
            }
          >
            <div className="flex flex-col">
              <span
                className={`font-medium ${
                  order.type === 'ask' ? 'text-red-500' : 'text-blue-500'
                }`}
              >
                {order.price.toLocaleString()}
              </span>
              <span
                className={`text-xs ${
                  order.changeRate >= 0 ? 'text-red-400' : 'text-blue-400'
                }`}
              >
                {formatChangeRate(order.changeRate)}
              </span>
            </div>
            <div className="text-right text-gray-800 self-center">
              {order.size.toFixed(4)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
