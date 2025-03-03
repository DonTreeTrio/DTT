export type CandlePeriod = 'minutes' | 'days' | 'weeks' | 'months';
export type CandleTime =
  | '1'
  | '3'
  | '5'
  | '7'
  | '10'
  | '30'
  | '60'
  | 'D'
  | 'W'
  | 'M';

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
export const getCandleSearch = async (
  period: CandlePeriod,
  time: CandleTime,
  market: string,
): Promise<CandleData[]> => {
  // 현재 시간을 KST(한국 시간)로 변환

  const detailTime = time ? `/${time}` : '';
  const detailPeriod = period ? `${period}` : 'minutes';
  const coinMarket = market ? `${market}` : 'KRW-BTC';

  const response = await fetch(
    `https://api.bithumb.com/v1/candles/${detailPeriod}${detailTime}?market=${coinMarket}&count=500`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data = await response.json();
  console.log('coinData', data);
  return data;
};
