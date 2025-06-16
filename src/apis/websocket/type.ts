export interface MarketResponse {
  market: string;
  korean_name: string;
  english_name: string;
  market_warning: 'NONE' | 'CAUTION';
}

export interface TickerResponse {
  type: 'ticker';
  code: string;
  change: 'RISE' | 'FALL' | 'EVEN';
  trade_price: number;
  opening_price: number;
  high_price: number;
  low_price: number;
  close_price: number;
  value: number;
  volume: number;
  prev_closing_price: number;
  change_price: number;
  acc_trade_price: number;
  change_rate: number;
  signed_change_rate: number;
  signed_change_price: number;
  acc_trade_price_24h: number;
  timestamp: number;
}

// 호가창 데이터 응답 타입
export interface OrderBookUnit {
  ask_price: number; // 매도호가
  bid_price: number; // 매수호가
  ask_size: number; // 매도 잔량
  bid_size: number; // 매수 잔량
}

export interface OrderBookResponse {
  type: 'orderbook';
  code: string; // 마켓 코드
  timestamp: number; // 호가 생성 시각
  total_ask_size: number; // 호가 매도 총 잔량
  total_bid_size: number; // 호가 매수 총 잔량
  orderbook_units: OrderBookUnit[]; // 호가 리스트
}
