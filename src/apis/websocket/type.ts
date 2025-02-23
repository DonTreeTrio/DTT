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
