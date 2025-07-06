// 웹소켓 및 API 관련 설정을 관리하는 파일
export const WS_CONFIG = {
  URL: 'wss://pubwss.bithumb.com/pub/ws',
  RECONNECT_INTERVAL: 3000,
  MAX_RETRY_COUNT: 3,
} as const;

// 기본 구독할 코인 목록 (빗썸 형식)
export const DEFAULT_COINS = [
  'KRW-BTC',
  'KRW-ETH',
  'KRW-XRP',
  'KRW-SOL',
  'KRW-DOGE',
];

// 빗썸 API 기본 설정
export const API_CONFIG = {
  BASE_URL: 'https://api.bithumb.com',
  PUBLIC_URL: 'https://api.bithumb.com/public',
  V1_URL: 'https://api.bithumb.com/v1', // v1 API 추가
  ENDPOINTS: {
    TICKER: '/ticker',
    CANDLESTICK: '/candlestick',
    ORDERBOOK: '/orderbook',
    // v1 엔드포인트들
    CANDLES: '/candles',
  },
} as const;
