'use client';

import { useState } from 'react';

interface PendingOrder {
  id: string;
  market: string;
  side: 'buy' | 'sell';
  price: number;
  quantity: number;
  remaining_quantity: number;
  created_at: string;
  status: string;
}

// 실제 API 연동 시 사용할 예시 데이터
const MOCK_PENDING_ORDERS: PendingOrder[] = [
  {
    id: 'order1',
    market: 'KRW-BTC',
    side: 'buy',
    price: 155500000,
    quantity: 0.001,
    remaining_quantity: 0.001,
    created_at: '2024-02-01T14:30:00Z',
    status: 'wait',
  },
  {
    id: 'order2',
    market: 'KRW-BTC',
    side: 'sell',
    price: 157000000,
    quantity: 0.002,
    remaining_quantity: 0.001,
    created_at: '2024-02-01T15:15:00Z',
    status: 'wait',
  },
];

export default function PendingOrdersContainer() {
  const [pendingOrders, setPendingOrders] =
    useState<PendingOrder[]>(MOCK_PENDING_ORDERS);

  // 주문 취소 처리
  const handleCancelOrder = (orderId: string) => {
    // 실제로는 API를 호출하여 주문을 취소해야 함
    // 여기서는 예시로 상태에서 제거만 함
    setPendingOrders(pendingOrders.filter((order) => order.id !== orderId));
  };

  if (pendingOrders.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        미체결된 주문이 없습니다.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr className="text-gray-500">
            <th className="py-3 px-4 text-left">주문시간</th>
            <th className="py-3 px-4 text-left">종류</th>
            <th className="py-3 px-4 text-right">주문가격</th>
            <th className="py-3 px-4 text-right">주문수량</th>
            <th className="py-3 px-4 text-right">미체결량</th>
            <th className="py-3 px-4 text-center">취소</th>
          </tr>
        </thead>
        <tbody>
          {pendingOrders.map((order) => (
            <tr key={order.id} className="border-b border-gray-100">
              <td className="py-3 px-4 text-left whitespace-nowrap">
                {new Date(order.created_at).toLocaleString()}
              </td>
              <td
                className={`py-3 px-4 text-left font-medium ${
                  order.side === 'buy' ? 'text-blue-500' : 'text-red-500'
                }`}
              >
                {order.side === 'buy' ? '매수' : '매도'}
              </td>
              <td className="py-3 px-4 text-right">
                {order.price.toLocaleString()} KRW
              </td>
              <td className="py-3 px-4 text-right">
                {order.quantity.toFixed(8)}
              </td>
              <td className="py-3 px-4 text-right">
                {order.remaining_quantity.toFixed(8)}
              </td>
              <td className="py-3 px-4 text-center">
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-xs"
                >
                  취소
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
