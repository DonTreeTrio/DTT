'use client';

import { CandlePeriod } from '@/apis/bithumb/candleSearch';
import { CHART_STYLES } from './styles';

interface ChartHeaderProps {
  market: string;
  period: CandlePeriod;
  detailTime: string;
  currentPrice: number | null;
  openPrice: number | null;
  highPrice: number | null;
  lowPrice: number | null;
  priceChange: number;
  priceChangePercent: number;
  ma15: number | null;
  ma60: number | null;
  showMA15: boolean;
  showMA60: boolean;
  onToggleMA15: () => void;
  onToggleMA60: () => void;
}

export default function ChartHeader({
  market,
  period,
  detailTime,
  currentPrice,
  openPrice,
  highPrice,
  lowPrice,
  priceChange,
  priceChangePercent,
  ma15,
  ma60,
  showMA15,
  showMA60,
  onToggleMA15,
  onToggleMA60,
}: ChartHeaderProps) {
  const isPricePositive = priceChange >= 0;

  return (
    <div className={CHART_STYLES.header.wrapper}>
      <div className={CHART_STYLES.header.titleRow}>
        <h2 className={CHART_STYLES.header.title}>
          {market} ·{' '}
          {period === 'days'
            ? '일'
            : period === 'weeks'
              ? '주'
              : period === 'months'
                ? '월'
                : detailTime + '분'}{' '}
          · BITHUMB
        </h2>
        <div className="flex gap-2">
          <button
            className={CHART_STYLES.header.toggleButton(showMA15)}
            onClick={onToggleMA15}
          >
            MA15
          </button>
          <button
            className={CHART_STYLES.header.toggleButton(showMA60)}
            onClick={onToggleMA60}
          >
            MA60
          </button>
        </div>
      </div>

      <div className={CHART_STYLES.header.priceInfo}>
        <div className="flex gap-1">
          <span className={CHART_STYLES.header.priceLabel}>시</span>
          <span className={CHART_STYLES.header.priceValue(isPricePositive)}>
            {openPrice?.toLocaleString() || '-'}
          </span>
        </div>
        <div className="flex gap-1">
          <span className={CHART_STYLES.header.priceLabel}>고</span>
          <span className={CHART_STYLES.header.priceValue(isPricePositive)}>
            {highPrice?.toLocaleString() || '-'}
          </span>
        </div>
        <div className="flex gap-1">
          <span className={CHART_STYLES.header.priceLabel}>저</span>
          <span className={CHART_STYLES.header.priceValue(isPricePositive)}>
            {lowPrice?.toLocaleString() || '-'}
          </span>
        </div>
        <div className="flex gap-1">
          <span className={CHART_STYLES.header.priceLabel}>종</span>
          <span className={CHART_STYLES.header.priceValue(isPricePositive)}>
            {currentPrice?.toLocaleString() || '-'}
          </span>
        </div>
        <div
          className={`flex gap-1 ${CHART_STYLES.header.priceValue(isPricePositive)}`}
        >
          <span>
            {priceChange >= 0 ? '+' : ''}
            {priceChange.toLocaleString()}
          </span>
          <span>
            ({priceChange >= 0 ? '+' : ''}
            {priceChangePercent.toFixed(2)}%)
          </span>
        </div>
      </div>

      {/* MA 정보 */}
      <div className={CHART_STYLES.header.maInfo}>
        {showMA15 && (
          <div className={CHART_STYLES.header.ma15}>
            MA 15 close 0 SMA 9 {ma15?.toLocaleString() || '-'}
          </div>
        )}
        {showMA60 && (
          <div className={CHART_STYLES.header.ma60}>
            MA 60 close 0 SMA 9 {ma60?.toLocaleString() || '-'}
          </div>
        )}
      </div>
    </div>
  );
}
