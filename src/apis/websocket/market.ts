import { MarketResponse } from './type';

export const marketApi = {
  getAllMarkets: async () => {
    try {
      const response = await fetch(
        'https://api.bithumb.com/v1/market/all?isDetails=true',
      );
      const data = await response.json();
      //console.log('data', data);
      if (data) {
        return data.map((item: MarketResponse) => ({
          market: `${item.market}`,
          korean_name: item.korean_name,
          english_name: item.english_name,
          market_warning: item.market_warning || 'NONE',
        }));
      }
      return [];
    } catch (error) {
      console.error('마켓 데이터 조회 실패:', error);
      return [];
    }
  },
};
