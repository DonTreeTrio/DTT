export type CandlePeriod = 'minutes' | 'days' | 'weeks' | 'months';
export type CandleTime =
  | '1'
  | '3'
  | '5'
  | '7'
  | '10'
  | '30'
  | '60'
  | '240'
  | '360'
  | '720'
  | 'D'
  | 'W'
  | 'M'
  | '';

export interface CandleData {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
}

// 호가 조회 인터페이스
export interface OrderBookUnit {
  ask_price: number;
  bid_price: number;
  ask_size: number;
  bid_size: number;
}

export interface OrderBookData {
  market: string;
  timestamp: number;
  total_ask_size: number;
  total_bid_size: number;
  orderbook_units: OrderBookUnit[];
}

// 캔들 조회
// src/apis/bithumb/candleSearch.ts
export const getCandleSearch = async (
  period: CandlePeriod,
  detailTime: CandleTime,
  market: string,
): Promise<CandleData[]> => {
  try {
    let url;

    // 일/주/월의 경우 다른 엔드포인트 사용
    if (period === 'days') {
      url = `https://api.bithumb.com/v1/candles/days?market=${market}&count=500`;
    } else if (period === 'weeks') {
      url = `https://api.bithumb.com/v1/candles/weeks?market=${market}&count=500`;
    } else if (period === 'months') {
      url = `https://api.bithumb.com/v1/candles/months?market=${market}&count=500`;
    } else {
      // 분/시간의 경우 기존 엔드포인트 사용
      url = `https://api.bithumb.com/v1/candles/${period}/${detailTime}?market=${market}&count=500`;
    }

    console.log('캔들 데이터 요청 URL:', url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API 응답 오류: ${response.status}`);
    }

    const data = await response.json();

    console.log(
      '캔들 데이터 응답:',
      data.length ? `${data.length}개 항목` : '데이터 없음',
    );

    if (!data || !Array.isArray(data)) {
      console.error('유효하지 않은 캔들 데이터 응답:', data);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch candle data:', error);
    return [];
  }
};

// 호가 조회
export const getOrderBook = async (
  market: string,
): Promise<OrderBookData | null> => {
  try {
    const url = `https://api.bithumb.com/v1/orderbook?markets=${market}`;

    console.log('호가 데이터 요청 URL:', url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API 응답 오류: ${response.status}`);
    }

    const data = await response.json();

    console.log('호가 데이터 응답:', data);

    // 빗썸 API 응답 구조 처리
    // 배열 형태로 오는 경우와 객체 형태로 오는 경우 모두 처리
    let orderbook;

    if (Array.isArray(data)) {
      // 배열 형태인 경우 첫 번째 항목 사용
      console.log('호가 데이터가 배열 형태로 왔습니다.');
      if (data.length === 0) {
        console.error('호가 데이터 배열이 비어있습니다.');
        return null;
      }
      orderbook = data[0];
    } else if (data && data.data) {
      // 객체 내 data 속성이 있는 경우
      orderbook = data.data;
    } else {
      console.error('알 수 없는 호가 데이터 응답 형식:', data);
      return null;
    }

    if (!orderbook || !orderbook.orderbook_units) {
      console.error('유효하지 않은 호가 데이터 구조:', orderbook);
      return null;
    }

    return {
      market: market,
      timestamp: orderbook.timestamp || Date.now(),
      total_ask_size: orderbook.total_ask_size || 0,
      total_bid_size: orderbook.total_bid_size || 0,
      orderbook_units: orderbook.orderbook_units || [],
    };
  } catch (error) {
    console.error('호가 데이터 조회 실패:', error);
    return null;
  }
};
