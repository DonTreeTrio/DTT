import { MarketResponse } from './type';

export const marketApi = {
  getAllMarkets: async () => {
    try {
      // 빗썸 v1 마켓 API 사용 - 올바른 엔드포인트
      const url = 'https://api.bithumb.com/v1/market/all';
      console.log('마켓 데이터 요청 URL:', url);

      const response = await fetch(url);
      const data = await response.json();

      console.log('빗썸 마켓 API 응답:', data);

      // 빗썸 v1 API는 직접 배열을 반환
      if (Array.isArray(data)) {
        console.log('마켓 데이터 수신 성공:', data.length, '개');
        return data.map((item: any) => ({
          market: item.market,
          korean_name: item.korean_name,
          english_name: item.english_name,
          market_warning: item.market_warning || 'NONE',
        }));
      }

      console.error('빗썸 API 응답 형식이 예상과 다름:', data);
      return getDefaultMarkets();
    } catch (error) {
      console.error('마켓 데이터 조회 실패:', error);
      return getDefaultMarkets();
    }
  },
};

// 기본 마켓 데이터
function getDefaultMarkets(): MarketResponse[] {
  return [
    {
      market: 'KRW-BTC',
      korean_name: '비트코인',
      english_name: 'Bitcoin',
      market_warning: 'NONE',
    },
    {
      market: 'KRW-ETH',
      korean_name: '이더리움',
      english_name: 'Ethereum',
      market_warning: 'NONE',
    },
    {
      market: 'KRW-XRP',
      korean_name: '리플',
      english_name: 'Ripple',
      market_warning: 'NONE',
    },
    {
      market: 'KRW-SOL',
      korean_name: '솔라나',
      english_name: 'Solana',
      market_warning: 'NONE',
    },
    {
      market: 'KRW-DOGE',
      korean_name: '도지코인',
      english_name: 'Dogecoin',
      market_warning: 'NONE',
    },
    {
      market: 'KRW-ADA',
      korean_name: '에이다',
      english_name: 'Cardano',
      market_warning: 'NONE',
    },
    {
      market: 'KRW-MATIC',
      korean_name: '폴리곤',
      english_name: 'Polygon',
      market_warning: 'NONE',
    },
    {
      market: 'KRW-DOT',
      korean_name: '폴카닷',
      english_name: 'Polkadot',
      market_warning: 'NONE',
    },
    {
      market: 'KRW-AVAX',
      korean_name: '아발란체',
      english_name: 'Avalanche',
      market_warning: 'NONE',
    },
    {
      market: 'KRW-LINK',
      korean_name: '체인링크',
      english_name: 'Chainlink',
      market_warning: 'NONE',
    },
  ];
}
