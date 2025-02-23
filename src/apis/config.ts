// 웹소켓 및 API 관련 설정을 관리하는 파일
export const WS_CONFIG = {
  URL: 'wss://ws-api.bithumb.com/websocket/v1',
  RECONNECT_INTERVAL: 3000,
  MAX_RETRY_COUNT: 1,
} as const;

// 기본 구독할 코인 목록 (필요시 수정)
export const DEFAULT_COINS = ['BTC', 'ETH', 'XRP', 'SOL', 'DOGE'];
