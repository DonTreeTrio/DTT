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
        date: data[i].candle_date_time_kst,
        value: NaN,
      });
      continue;
    }

    let sum = 0;
    for (let j = 0; j < count; j++) {
      sum += Number(data[i - j].trade_price);
    }
    result.push({
      date: data[i].candle_date_time_kst,
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
