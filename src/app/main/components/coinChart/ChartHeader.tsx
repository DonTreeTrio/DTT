'use client';

import { CandlePeriod, CandleTime } from '@/apis/bithumb/candleSearch';
import { CHART_STYLES } from './styles';

interface ChartHeaderProps {
  market: string;
  period: CandlePeriod;
  detailTime: CandleTime;
  currentPrice: number | null;
  priceChange: number;
  priceChangePercent: number;
  highPrice: number | null;
  lowPrice: number | null;
  openPrice: number | null;
  ma15: number | null;
  ma60: number | null;
  showMA15: boolean;
  showMA60: boolean;
  onToggleMA15: () => void;
  onToggleMA60: () => void;
}

// 시간 표시 형식 개선
const formatTimeDisplay = (
  period: CandlePeriod,
  detailTime: CandleTime,
): string => {
  if (period === 'days') {
    return '일';
  } else if (period === 'weeks') {
    return '주';
  } else if (period === 'months') {
    return '월';
  } else if (period === 'minutes') {
    if (!detailTime) {
      return '1분';
    }

    const time = parseInt(detailTime);
    if (time >= 60) {
      const hours = time / 60;
      return hours % 1 === 0 ? `${hours}시간` : `${time}분`;
    } else {
      return `${time}분`;
    }
  }

  return '1분';
};

export default function ChartHeader({
  market,
  period,
  detailTime,
  currentPrice,
  priceChange,
  priceChangePercent,
  highPrice,
  lowPrice,
  openPrice,
  ma15,
  ma60,
  showMA15,
  showMA60,
  onToggleMA15,
  onToggleMA60,
}: ChartHeaderProps) {
  const isPositive = priceChange >= 0;

  return (
    <div className={CHART_STYLES.header.container}>
      <div className={CHART_STYLES.header.wrapper}>
        <h2 className={CHART_STYLES.header.title}>
          {market} · {formatTimeDisplay(period, detailTime)} · BITHUMB
        </h2>

        {/* 현재가 및 변동 정보 */}
        <div className={CHART_STYLES.header.priceContainer}>
          <div
            className={`${CHART_STYLES.header.price} ${
              isPositive ? 'text-red-500' : 'text-blue-500'
            }`}
          >
            {currentPrice?.toLocaleString() || '0'}
          </div>
          <div
            className={`${CHART_STYLES.header.change} ${
              isPositive ? 'text-red-500' : 'text-blue-500'
            }`}
          >
            {isPositive ? '+' : ''}
            {priceChange.toLocaleString()} ({priceChangePercent.toFixed(2)}%)
          </div>
        </div>

        {/* 추가 정보 */}
        <div className={CHART_STYLES.header.stats}>
          <div className={CHART_STYLES.header.statItem}>
            <span className={CHART_STYLES.header.statLabel}>고:</span>
            <span className="text-red-500">
              {highPrice?.toLocaleString() || '0'}
            </span>
          </div>
          <div className={CHART_STYLES.header.statItem}>
            <span className={CHART_STYLES.header.statLabel}>저:</span>
            <span className="text-blue-500">
              {lowPrice?.toLocaleString() || '0'}
            </span>
          </div>
          <div className={CHART_STYLES.header.statItem}>
            <span className={CHART_STYLES.header.statLabel}>시:</span>
            <span className="text-gray-700">
              {openPrice?.toLocaleString() || '0'}
            </span>
          </div>
          <div className={CHART_STYLES.header.statItem}>
            <span className={CHART_STYLES.header.statLabel}>MA15:</span>
            <span className="text-orange-500">
              {ma15?.toLocaleString() || '0'}
            </span>
          </div>
          <div className={CHART_STYLES.header.statItem}>
            <span className={CHART_STYLES.header.statLabel}>MA60:</span>
            <span className="text-purple-500">
              {ma60?.toLocaleString() || '0'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
