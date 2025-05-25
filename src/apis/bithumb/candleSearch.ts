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

interface CandleData {
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

    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Failed to fetch candle data:', error);
    return [];
  }
};
