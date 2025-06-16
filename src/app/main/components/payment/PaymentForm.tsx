'use client';

import { useEffect, useState } from 'react';
import { useMarket } from '../../context/MarketContext';

interface PaymentFormProps {
  orderType: 'buy' | 'sell';
  marketCode: string;
}

type OrderMethod = 'limit' | 'market' | 'auto';

export default function PaymentForm({
  orderType,
  marketCode,
}: PaymentFormProps) {
  const { marketInfo } = useMarket();
  const [orderMethod, setOrderMethod] = useState<OrderMethod>('limit');
  const [price, setPrice] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [total, setTotal] = useState<string>('');
  const [selectedPercent, setSelectedPercent] = useState<number | null>(null);

  // 현재 선택된 코인의 정보
  const currentMarket = marketInfo.find(
    (market) => market.market === marketCode,
  );
  const currentPrice = currentMarket?.trade_price || 0;

  // 주문 가능 금액 (예시)
  const availableBalance = 0; // 실제로는 API에서 가져와야 함

  // 최대 주문 가능 수량 계산
  const maxQuantity = currentPrice > 0 ? availableBalance / currentPrice : 0;

  // 최소 주문 수량 (예시)
  const minQuantity = 0.00069358;

  // 현재가 변경 시 입력 필드 업데이트
  useEffect(() => {
    if (currentPrice && price === '') {
      setPrice(currentPrice.toString());
    }
  }, [currentPrice, price]);

  // 호가창에서 가격 선택 시 이벤트 리스너
  useEffect(() => {
    const handlePriceSelect = (event: Event) => {
      const customEvent = event as CustomEvent<{
        price: number;
        type: 'ask' | 'bid';
      }>;
      const { price: selectedPrice } = customEvent.detail;
      setPrice(selectedPrice.toString());

      if (quantity) {
        const calculatedTotal = selectedPrice * parseFloat(quantity);
        setTotal(calculatedTotal.toFixed(0));
      }
    };

    document.addEventListener('select-price', handlePriceSelect);
    return () => {
      document.removeEventListener('select-price', handlePriceSelect);
    };
  }, [quantity]);

  // 가격 또는 수량 변경 시 총액 계산
  useEffect(() => {
    if (price && quantity) {
      const calculatedTotal = parseFloat(price) * parseFloat(quantity);
      setTotal(calculatedTotal.toFixed(0));
    } else {
      setTotal('');
    }
  }, [price, quantity]);

  // 가격 조정 함수
  const adjustPrice = (direction: 'up' | 'down') => {
    const currentPriceNum = parseFloat(price) || 0;
    const adjustment = 1000; // 1000원 단위 조정
    const newPrice =
      direction === 'up'
        ? currentPriceNum + adjustment
        : Math.max(0, currentPriceNum - adjustment);
    setPrice(newPrice.toString());
  };

  // 총액 변경 시 수량 계산
  const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTotal = e.target.value;
    setTotal(newTotal);

    if (newTotal && price && parseFloat(price) > 0) {
      const calculatedQuantity = parseFloat(newTotal) / parseFloat(price);
      setQuantity(calculatedQuantity.toFixed(8));
    } else {
      setQuantity('');
    }
  };

  // 퍼센트 버튼 클릭 처리
  const handlePercentClick = (percent: number) => {
    setSelectedPercent(percent);

    const balance = orderType === 'buy' ? availableBalance : 0.1; // 예시 값

    if (orderType === 'buy' && price) {
      const availableAmount = balance * (percent / 100);
      setTotal(availableAmount.toFixed(0));
      const calculatedQuantity = availableAmount / parseFloat(price);
      setQuantity(calculatedQuantity.toFixed(8));
    } else if (orderType === 'sell') {
      const newQuantity = balance * (percent / 100);
      setQuantity(newQuantity.toFixed(8));
      if (price) {
        const calculatedTotal = newQuantity * parseFloat(price);
        setTotal(calculatedTotal.toFixed(0));
      }
    }
  };

  // 주문 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('주문 정보:', {
      method: orderMethod,
      type: orderType,
      market: marketCode,
      price,
      quantity,
      total,
    });
  };

  return (
    <div className="space-y-4">
      {/* 주문형태 선택 */}
      <div>
        <div className="flex items-center space-x-4 text-sm">
          <span className="text-gray-600">주문형태</span>
          <div className="flex space-x-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="orderMethod"
                value="limit"
                checked={orderMethod === 'limit'}
                onChange={(e) => setOrderMethod(e.target.value as OrderMethod)}
                className="mr-1"
              />
              <span
                className={
                  orderMethod === 'limit'
                    ? 'text-[#179653] font-medium'
                    : 'text-gray-600'
                }
              >
                지정
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="orderMethod"
                value="market"
                checked={orderMethod === 'market'}
                onChange={(e) => setOrderMethod(e.target.value as OrderMethod)}
                className="mr-1"
              />
              <span
                className={
                  orderMethod === 'market'
                    ? 'text-[#179653] font-medium'
                    : 'text-gray-600'
                }
              >
                시장
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="orderMethod"
                value="auto"
                checked={orderMethod === 'auto'}
                onChange={(e) => setOrderMethod(e.target.value as OrderMethod)}
                className="mr-1"
              />
              <span
                className={
                  orderMethod === 'auto'
                    ? 'text-[#179653] font-medium'
                    : 'text-gray-600'
                }
              >
                자동
              </span>
              <span className="ml-1 text-gray-400">?</span>
            </label>
          </div>
        </div>
      </div>

      {/* 주문가능 */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">주문가능</span>
        <span className="font-medium">
          {availableBalance.toLocaleString()}원
        </span>
      </div>

      {/* 주문가격 */}
      {orderMethod === 'limit' && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-600">주문가격</label>
          </div>
          <div className="relative">
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 pr-12 border border-gray-300 rounded text-right text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#179653]"
              placeholder="가격 입력"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col">
              <button
                type="button"
                onClick={() => adjustPrice('up')}
                className="text-gray-400 hover:text-gray-600 text-xs leading-none"
              >
                ▲
              </button>
              <button
                type="button"
                onClick={() => adjustPrice('down')}
                className="text-gray-400 hover:text-gray-600 text-xs leading-none"
              >
                ▼
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 최대 주문 가능 수량 */}
      <div className="text-center text-xs text-gray-500">
        최대 주문 가능 수량 {maxQuantity.toFixed(8)}
      </div>

      {/* 주문수량 */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm text-gray-600">주문수량</label>
        </div>
        <input
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded text-right focus:outline-none focus:ring-2 focus:ring-[#179653]"
          placeholder={`최소 ≈ ${minQuantity} ${marketCode.split('-')[1]}`}
        />
      </div>

      {/* 퍼센트 버튼 */}
      <div className="grid grid-cols-5 gap-2">
        {[10, 25, 50, 75].map((percent) => (
          <button
            key={percent}
            type="button"
            onClick={() => handlePercentClick(percent)}
            className={`py-2 text-sm rounded border ${
              selectedPercent === percent
                ? 'border-[#179653] text-[#179653] bg-green-50'
                : 'border-gray-300 text-gray-600 hover:border-gray-400'
            }`}
          >
            {percent}%
          </button>
        ))}
        <button
          type="button"
          onClick={() => handlePercentClick(100)}
          className={`py-2 text-sm rounded border ${
            selectedPercent === 100
              ? 'border-[#179653] text-[#179653] bg-green-50'
              : 'border-gray-300 text-gray-600 hover:border-gray-400'
          }`}
        >
          최대
        </button>
      </div>

      {/* 주문금액 */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm text-gray-600">주문금액</label>
        </div>
        <input
          type="text"
          value={total}
          onChange={handleTotalChange}
          className="w-full p-3 border border-gray-300 rounded text-right focus:outline-none focus:ring-2 focus:ring-[#179653]"
          placeholder="최소 금액 5,000 원"
        />
      </div>

      {/* 수수료 */}
      <div className="flex items-center text-sm text-[#179653]">
        <span>수수료</span>
        <span className="ml-1">ⓘ</span>
      </div>

      {/* 주문 버튼 */}
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full py-4 bg-[#179653] text-white font-medium rounded hover:bg-[#158549] transition-colors"
      >
        {orderType === 'buy' ? '매수' : '매도'}
      </button>
    </div>
  );
}
