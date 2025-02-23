const API_URL = 'https://api.bithumb.com/public';

export const marketApi = {
  getAllMarkets: async () => {
    try {
      const response = await fetch(
        'https://api.bithumb.com/v1/market/all?isDetails=true',
      );
      const data = await response.json();
      console.log('data', data);
      if (data) {
        return data.map((item: any) => ({
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
  // 마켓 코인 정보 조회
  getMarketInfo: async () => {
    try {
      const response = await fetch(
        'https://api.bithumb.com/v1/market/all?isDetails=true',
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('마켓 정보 조회 실패:', error);
      return null;
    }
  },
};

// const API_URL = 'https://api.bithumb.com/public';

// export const marketApi = {
//   getAllMarkets: async () => {
//     try {
//       const response = await fetch(`${API_URL}/ticker/ALL_KRW`);
//       const data = await response.json();
//       console.log('data', data);
//       if (data.status === '0000') {
//         return Object.entries(data.data)
//           .map(([symbol, info]: [string, any]) => ({
//             market: `KRW-${symbol}`,
//             korean_name: symbol,
//             english_name: symbol,
//             market_warning: 'NONE' as const,
//           }))
//           .filter((market) => market.market !== 'KRW-date');
//       }
//       return null;
//     } catch (error) {
//       console.error('마켓 데이터 조회 실패:', error);
//       return null;
//     }
//   },
//   // 마켓 코인 정보 조회
//   getMarketInfo: async () => {
//     try {
//       const response = await fetch(
//         'https://api.bithumb.com/v1/market/all?isDetails=true',
//       );
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('마켓 정보 조회 실패:', error);
//       return null;
//     }
//   },
// };
