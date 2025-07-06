import { CandleData } from '@/apis/bithumb/candleSearch';

export function calculateMA(data: CandleData[], count: number) {
  const result: { date: string; value: number }[] = [];

  if (!data || data.length === 0) return result;

  // 데이터가 충분하지 않으면 계산하지 않음
  if (data.length < count) {
    console.warn(
      `MA${count} 계산을 위한 데이터가 충분하지 않습니다. 필요: ${count}, 실제: ${data.length}`,
    );
    return result;
  }

  for (let i = 0; i < data.length; i++) {
    if (i < count - 1) {
      // 데이터가 MA 계산을 위한 최소 개수보다 적으면 null 값 추가
      result.push({
        date:
          data[i].candle_date_time_kst || new Date(data[i].time).toISOString(),
        value: NaN,
      });
      continue;
    }

    let sum = 0;
    for (let j = 0; j < count; j++) {
      sum += Number(data[i - j].trade_price || data[i - j].close);
    }
    result.push({
      date:
        data[i].candle_date_time_kst || new Date(data[i].time).toISOString(),
      value: sum / count,
    });
  }

  return result;
}

export const formatDateByZoomLevel = (
  date: Date,
  zoomLevel: number,
  period?: string,
) => {
  // 분 단위 차트일 경우는 항상 시:분 형식으로 표시
  if (period === 'minutes') {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  // 줌 레벨에 따른 날짜 포맷
  if (zoomLevel > 80) {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  } else if (zoomLevel > 50) {
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  } else {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }
};

// 숫자 포맷팅 함수
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toFixed(0);
};

// 가격 포맷팅
export const formatPrice = (price: number): string => {
  if (price >= 1000) {
    return price.toLocaleString();
  }
  return price.toFixed(2);
};

// 시간 포맷팅 함수 개선
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// 날짜 포맷팅 함수 개선
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${month}/${day}`;
};

// 날짜와 시간 포맷팅 함수 개선
export const formatDateTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${month}/${day} ${hours}:${minutes}`;
};

// 이동 평균 계산 함수 (단순 배열용)
export const calculateSimpleMA = (data: number[], period: number): number[] => {
  const result: number[] = [];

  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(NaN);
    } else {
      const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
      result.push(sum / period);
    }
  }

  return result;
};

// ISO 날짜 문자열을 타임스탬프로 변환
export const parseISODate = (dateString: string): number => {
  return new Date(dateString).getTime();
};

// 빗썸 타임스탬프 처리 함수
export const parseBithumbTimestamp = (timestamp: number | string): number => {
  const ts = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp;
  // 빗썸 타임스탬프가 밀리초 단위인지 초 단위인지 확인
  if (ts.toString().length === 10) {
    return ts * 1000; // 초 단위를 밀리초로 변환
  }
  return ts;
};

// 차트 X축 레이블 포맷팅 (줌 레벨에 따라 다르게 표시)
export const formatChartLabel = (
  timestamp: number,
  zoomLevel: number,
): string => {
  const date = new Date(timestamp);

  if (zoomLevel > 60) {
    // 1시간 이상 줌
    // 날짜만 표시
    return `${date.getMonth() + 1}/${date.getDate()}`;
  } else if (zoomLevel > 15) {
    // 15분 이상 줌
    // 시간과 분 표시
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  } else {
    // 시간, 분, 초 표시
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  }
};

// 빗썸 마켓 형식 변환 함수
export const convertMarketFormat = (market: string): string => {
  // KRW-BTC -> BTC_KRW
  if (market.includes('KRW-')) {
    return market.replace('KRW-', '') + '_KRW';
  }
  // BTC_KRW -> KRW-BTC
  if (market.includes('_KRW')) {
    return 'KRW-' + market.replace('_KRW', '');
  }
  return market;
};
