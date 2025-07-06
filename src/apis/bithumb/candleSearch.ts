import { API_CONFIG } from '../config';

export type CandlePeriod = 'minutes' | 'days' | 'weeks' | 'months';
export type CandleTime =
  | '1'
  | '3'
  | '5'
  | '10'
  | '15'
  | '30'
  | '60'
  | '240'
  | '';

export interface CandleData {
  time: number;
  open: string;
  close: string;
  high: string;
  low: string;
  volume: string;
  // 변환된 필드들 (차트에서 사용)
  candle_date_time_kst?: string;
  opening_price?: number;
  trade_price?: number;
  high_price?: number;
  low_price?: number;
  timestamp?: number;
  candle_acc_trade_price?: number;
  candle_acc_trade_volume?: number;
}

// 호가 조회 인터페이스
export interface OrderBookUnit {
  price: string;
  quantity: string;
}

export interface OrderBookData {
  payment_currency: string;
  timestamp: string;
  order_currency: string;
  bids: OrderBookUnit[];
  asks: OrderBookUnit[];
}

// 빗썸 v1 API 캔들 URL 생성
const getCandleUrl = (
  period: CandlePeriod,
  detailTime: CandleTime,
  market: string,
): string => {
  const baseUrl = `${API_CONFIG.V1_URL}${API_CONFIG.ENDPOINTS.CANDLES}`;

  if (period === 'minutes') {
    const time = detailTime || '1';
    return `${baseUrl}/minutes/${time}?market=${market}&count=200`;
  } else if (period === 'days') {
    return `${baseUrl}/days?market=${market}&count=200`;
  } else if (period === 'weeks') {
    return `${baseUrl}/weeks?market=${market}&count=200`;
  } else if (period === 'months') {
    return `${baseUrl}/months?market=${market}&count=200`;
  }

  // 기본값: 1분 캔들
  return `${baseUrl}/minutes/1?market=${market}&count=200`;
};

// 캔들 조회 - 빗썸 v1 API 사용
export const getCandleSearch = async (
  period: CandlePeriod,
  detailTime: CandleTime,
  market: string,
): Promise<CandleData[]> => {
  try {
    const url = getCandleUrl(period, detailTime, market);
    //console.log('캔들 데이터 요청 URL:', url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API 응답 오류: ${response.status}`);
    }

    const data = await response.json();
    //console.log('캔들 데이터 응답:', data);

    if (!Array.isArray(data) || data.length === 0) {
      console.error('유효하지 않은 캔들 데이터 응답:', data);
      return [];
    }

    // 빗썸 v1 API 응답을 차트 형식으로 변환
    const candleData = data.map((item: any) => {
      const timestamp = new Date(item.candle_date_time_kst).getTime();

      return {
        time: timestamp,
        open: item.opening_price?.toString() || '0',
        close: item.trade_price?.toString() || '0',
        high: item.high_price?.toString() || '0',
        low: item.low_price?.toString() || '0',
        volume: item.candle_acc_trade_volume?.toString() || '0',
        // 차트에서 사용하는 형식으로 변환
        candle_date_time_kst: item.candle_date_time_kst,
        opening_price: Number(item.opening_price) || 0,
        trade_price: Number(item.trade_price) || 0,
        high_price: Number(item.high_price) || 0,
        low_price: Number(item.low_price) || 0,
        timestamp: timestamp,
        candle_acc_trade_price: Number(item.candle_acc_trade_price) || 0,
        candle_acc_trade_volume: Number(item.candle_acc_trade_volume) || 0,
      };
    });

    return candleData.reverse(); // 최신순으로 정렬
  } catch (error) {
    console.error('Failed to fetch candle data:', error);
    return [];
  }
};

// 호가 조회 - 빗썸 v1 API 사용
export const getOrderBook = async (
  market: string,
): Promise<OrderBookData | null> => {
  try {
    const url = `${API_CONFIG.V1_URL}/orderbook?markets=${market}`;
    //console.log('호가 데이터 요청 URL:', url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API 응답 오류: ${response.status}`);
    }

    const data = await response.json();
    //console.log('호가 데이터 응답:', data);

    if (!Array.isArray(data) || data.length === 0) {
      console.error('유효하지 않은 호가 데이터 응답:', data);
      return null;
    }

    const orderbook = data[0]; // 첫 번째 마켓 데이터

    return {
      payment_currency: 'KRW',
      timestamp: orderbook.timestamp?.toString() || Date.now().toString(),
      order_currency: market.replace('KRW-', ''),
      bids:
        orderbook.orderbook_units?.map((unit: any) => ({
          price: unit.bid_price?.toString() || '0',
          quantity: unit.bid_size?.toString() || '0',
        })) || [],
      asks:
        orderbook.orderbook_units?.map((unit: any) => ({
          price: unit.ask_price?.toString() || '0',
          quantity: unit.ask_size?.toString() || '0',
        })) || [],
    };
  } catch (error) {
    console.error('호가 데이터 조회 실패:', error);
    return null;
  }
};
