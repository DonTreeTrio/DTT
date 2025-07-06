import type { MarketResponse, OrderBookResponse, TickerResponse } from './type';

export const bithumbSocket = {
  connect: (
    markets: MarketResponse[],
    onTickerMessage: (data: TickerResponse) => void,
    onOrderBookMessage?: (data: OrderBookResponse) => void,
  ) => {
    let ws: WebSocket | null = null;
    let reconnectInterval: NodeJS.Timeout | null = null;
    let isConnected = false;

    const connect = () => {
      try {
        // 빗썸 웹소켓 엔드포인트
        const wsUrl = 'wss://pubwss.bithumb.com/pub/ws';
        console.log('빗썸 웹소켓 연결 시도:', wsUrl);

        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
          console.log('빗썸 웹소켓 연결 성공');
          isConnected = true;

          // 타이머 기반 구독 (웹소켓은 연결 유지용으로만 사용)
          startDataSubscription();
        };

        ws.onmessage = (event) => {
          try {
            console.log('빗썸 웹소켓 메시지 수신:', event.data);

            let data;
            if (typeof event.data === 'string') {
              data = JSON.parse(event.data);
            } else {
              // Blob 데이터인 경우
              const reader = new FileReader();
              reader.onload = () => {
                try {
                  const text = reader.result as string;
                  data = JSON.parse(text);
                  processMessage(data);
                } catch (error) {
                  console.error('웹소켓 Blob 데이터 파싱 실패:', error);
                }
              };
              reader.readAsText(event.data);
              return;
            }

            processMessage(data);
          } catch (error) {
            console.error('웹소켓 메시지 처리 실패:', error);
          }
        };

        ws.onerror = (error) => {
          console.error('빗썸 웹소켓 오류:', error);
        };

        ws.onclose = (event) => {
          console.log('빗썸 웹소켓 연결 종료:', event.code, event.reason);
          isConnected = false;

          // 3초 후 재연결 시도
          if (!reconnectInterval) {
            reconnectInterval = setTimeout(() => {
              reconnectInterval = null;
              connect();
            }, 1000);
          }
        };
      } catch (error) {
        console.error('웹소켓 연결 실패:', error);
      }
    };

    // 타이머 기반 데이터 구독 (웹소켓 + 폴링 하이브리드)
    let dataInterval: NodeJS.Timeout | null = null;

    const startDataSubscription = () => {
      // 즉시 첫 데이터 가져오기
      fetchTickerData();

      // 3초마다 데이터 업데이트
      dataInterval = setInterval(fetchTickerData, 1000);
    };

    const fetchTickerData = async () => {
      if (!isConnected) return;

      try {
        console.log('빗썸 REST API로 티커 데이터 가져오기');

        // 빗썸 ticker API 호출
        const response = await fetch(
          'https://api.bithumb.com/public/ticker/ALL_KRW',
        );
        const data = await response.json();
        console.log('빗썸 REST API 티커 데이터 응답:', data);

        if (data && data.status === '0000' && data.data) {
          Object.keys(data.data).forEach((symbol) => {
            if (symbol !== 'date') {
              const currentPrice = Number(data.data[symbol].closing_price || 0);
              const openingPrice = Number(data.data[symbol].opening_price || 0);
              const fluctateRate = Number(
                data.data[symbol].fluctate_rate_24H || 0,
              );

              // 실제 변동 금액 계산 (현재가 - 시가)
              const actualChangePrice = currentPrice - openingPrice;

              const tickerData: TickerResponse = {
                type: 'ticker',
                code: `KRW-${symbol}`,
                change:
                  data.data[symbol].fluctate_24H === '1'
                    ? 'FALL'
                    : data.data[symbol].fluctate_24H === '2'
                      ? 'RISE'
                      : 'EVEN',
                change_price: Math.abs(actualChangePrice),
                change_rate: Math.abs(fluctateRate) / 100,
                signed_change_price: actualChangePrice, // 실제 변동 금액 (부호 포함)
                signed_change_rate: fluctateRate / 100, // 변동률 (부호 포함, 소수점으로 변환)
                trade_price: currentPrice,
                volume: Number(data.data[symbol].units_traded_24H || 0),
                value: Number(data.data[symbol].acc_trade_value_24H || 0),
                acc_trade_price: Number(
                  data.data[symbol].acc_trade_value_24H || 0,
                ),
                close_price: currentPrice,
                acc_trade_price_24h: Number(
                  data.data[symbol].acc_trade_value_24H || 0,
                ),

                timestamp: Date.now(),
                opening_price: openingPrice,
                high_price: Number(data.data[symbol].max_price || 0),
                low_price: Number(data.data[symbol].min_price || 0),
                prev_closing_price: Number(
                  data.data[symbol].prev_closing_price || 0,
                ),
              };

              // 구독된 마켓만 처리
              const isSubscribed = markets.some(
                (market) => market.market === tickerData.code,
              );
              if (isSubscribed) {
                onTickerMessage(tickerData);
              }
            }
          });
        }
      } catch (error) {
        console.error('빗썸 REST API 호출 실패:', error);
      }
    };

    const processMessage = (data: any) => {
      try {
        console.log('빗썸 웹소켓 데이터 처리:', data);

        // 빗썸 웹소켓 메시지 형식에 따라 처리
        if (data.type === 'ticker') {
          const tickerData: TickerResponse = {
            type: 'ticker',
            code: data.symbol || '',
            change: data.change || 'EVEN',
            change_price: Number(data.change_price || 0),
            change_rate: Number(data.change_rate || 0),
            signed_change_price: Number(data.signed_change_price || 0),
            signed_change_rate: Number(data.signed_change_rate || 0),
            trade_price: Number(data.trade_price || 0),
            volume: Number(data.trade_volume || 0),
            value: Number(data.value || 0),
            acc_trade_price: Number(data.acc_trade_price || 0),
            acc_trade_price_24h: Number(data.acc_trade_price_24h || 0),
            close_price: Number(data.close_price || 0),
            timestamp: data.timestamp || Date.now(),
            opening_price: Number(data.opening_price || 0),
            high_price: Number(data.high_price || 0),
            low_price: Number(data.low_price || 0),
            prev_closing_price: Number(data.prev_closing_price || 0),
          };

          onTickerMessage(tickerData);
        }
      } catch (error) {
        console.error('웹소켓 메시지 처리 오류:', error);
      }
    };

    // 연결 시작
    connect();

    // cleanup 함수 반환
    return {
      close: () => {
        console.log('빗썸 웹소켓 연결 종료');
        isConnected = false;

        if (reconnectInterval) {
          clearTimeout(reconnectInterval);
          reconnectInterval = null;
        }

        if (dataInterval) {
          clearInterval(dataInterval);
          dataInterval = null;
        }

        if (ws) {
          ws.close();
          ws = null;
        }
      },
    };
  },
};
