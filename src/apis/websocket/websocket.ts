import { WS_CONFIG } from '../config';
import type { MarketResponse, TickerResponse } from './type';

export const bithumbSocket = {
  connect: (
    markets: MarketResponse[],
    onMessage: (data: TickerResponse) => void,
  ) => {
    const ws = new WebSocket(WS_CONFIG.URL);

    ws.onopen = () => {
      //console.log('웹소켓 연결됨');
      const subscribeMsg = [
        { ticket: 'test example' },
        {
          type: 'ticker',
          codes: markets.map((market) => market.market), // KRW-BTC 형식 그대로 사용
        },
        { format: 'SIM' },
      ];
      ws.send(JSON.stringify(subscribeMsg));
    };

    ws.onmessage = async (event) => {
      try {
        // Blob 데이터를 텍스트로 변환
        const text = await event.data.text();
        const data = JSON.parse(text);
        if (data.type === 'ticker') {
          onMessage(data);
        }
      } catch (error) {
        console.error('메시지 파싱 실패:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('웹소켓 에러:', error);
    };

    ws.onclose = () => {
      console.log('웹소켓 연결 종료');
    };

    return {
      close: () => ws.close(),
    };
  },
};
