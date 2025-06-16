import { WS_CONFIG } from '../config';
import type { MarketResponse, OrderBookResponse, TickerResponse } from './type';

export const bithumbSocket = {
  connect: (
    markets: MarketResponse[],
    onTickerMessage: (data: TickerResponse) => void,
    onOrderBookMessage?: (data: OrderBookResponse) => void,
  ) => {
    let reconnectAttempts = 0;
    let ws: WebSocket | null = null;

    const connect = () => {
      try {
        ws = new WebSocket(WS_CONFIG.URL);

        ws.onopen = () => {
          // console.log('웹소켓 연결됨');
          reconnectAttempts = 0; // 연결 성공 시 재시도 카운트 초기화

          try {
            const marketCodes = markets.map((market) => market.market);
            const subscribeMsg = [
              { ticket: 'test example' },
              {
                type: 'ticker',
                codes: marketCodes,
              },
              { format: 'SIM' },
            ];

            // 호가 데이터도 구독하는 경우
            if (onOrderBookMessage) {
              subscribeMsg.splice(2, 0, {
                type: 'orderbook',
                codes: marketCodes,
              });
            }

            ws?.send(JSON.stringify(subscribeMsg));
          } catch (sendError) {
            console.error('구독 메시지 전송 실패:', sendError);
          }
        };

        ws.onmessage = async (event) => {
          try {
            // Blob 데이터를 텍스트로 변환
            const text = await event.data.text();
            const data = JSON.parse(text);

            if (data.type === 'ticker') {
              onTickerMessage(data);
            } else if (data.type === 'orderbook' && onOrderBookMessage) {
              onOrderBookMessage(data);
            }
          } catch (error) {
            console.error('메시지 파싱 실패:', error);
          }
        };

        ws.onerror = (error) => {
          // 에러 객체의 상세 정보 로깅
          console.error('웹소켓 에러:', error);
          console.error(
            '웹소켓 에러 세부정보:',
            error instanceof ErrorEvent ? error.message : '상세 정보 없음',
          );
        };

        ws.onclose = (event) => {
          // console.log(
          //   `웹소켓 연결 종료 (코드: ${event.code}, 이유: ${event.reason || '없음'})`,
          // );

          // 재연결 로직
          if (reconnectAttempts < WS_CONFIG.MAX_RETRY_COUNT) {
            reconnectAttempts++;
            const delay = reconnectAttempts * WS_CONFIG.RECONNECT_INTERVAL;
            // console.log(
            //   `${delay}ms 후 재연결 시도 (${reconnectAttempts}/${WS_CONFIG.MAX_RETRY_COUNT})`,
            // );

            setTimeout(() => {
              connect();
            }, delay);
          } else {
            console.error(
              `최대 재시도 횟수(${WS_CONFIG.MAX_RETRY_COUNT})를 초과했습니다.`,
            );
          }
        };
      } catch (initError) {
        console.error('웹소켓 초기화 실패:', initError);
      }
    };

    // 초기 연결 시작
    connect();

    return {
      close: () => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.close(1000, '사용자 요청에 의한 연결 종료');
        }
      },
    };
  },
};
