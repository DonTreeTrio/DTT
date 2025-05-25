'use client';

import {
  CandlePeriod,
  CandleTime,
  getCandleSearch,
} from '@/apis/bithumb/candleSearch';
import { calculateMA } from '@/common/utils';
import { useEffect, useState } from 'react';
import ChartHeader from './ChartHeader';
import ChartRender from './ChartRender';
import ChartToolbar from './ChartToolbar';
import { CHART_STYLES } from './styles';

interface CandleChartProps {
  market: string;
  period: CandlePeriod;
  detailTime: CandleTime | '';
}

export default function CandleChart({
  market,
  period,
  detailTime,
}: CandleChartProps) {
  const [candleData, setCandleData] = useState<any[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [priceChangePercent, setPriceChangePercent] = useState<number>(0);
  const [highPrice, setHighPrice] = useState<number | null>(null);
  const [lowPrice, setLowPrice] = useState<number | null>(null);
  const [openPrice, setOpenPrice] = useState<number | null>(null);
  const [ma15, setMa15] = useState<number | null>(null);
  const [ma60, setMa60] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [showMA15, setShowMA15] = useState(true);
  const [showMA60, setShowMA60] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCandleData = async () => {
    try {
      setIsLoading(true);

      let response;
      if (period === 'days' || period === 'weeks' || period === 'months') {
        response = await getCandleSearch(period, '', market);
      } else {
        response = await getCandleSearch(period, detailTime, market);
      }

      // 응답이 배열인지 확인
      if (!response || !Array.isArray(response)) {
        console.error('Invalid candle data response:', response);
        setCandleData([]);
        return;
      }

      setCandleData(response);

      // 현재 가격 및 변화량 계산
      if (response.length > 0) {
        const sortedData = [...response].sort(
          (a, b) =>
            new Date(b.candle_date_time_kst).getTime() -
            new Date(a.candle_date_time_kst).getTime(),
        );

        const latestData = sortedData[0];
        const prevData = sortedData[1] || latestData;

        setCurrentPrice(Number(latestData.trade_price));
        setHighPrice(Number(latestData.high_price));
        setLowPrice(Number(latestData.low_price));
        setOpenPrice(Number(latestData.opening_price));

        const change =
          Number(latestData.trade_price) - Number(prevData.trade_price);
        setPriceChange(change);
        setPriceChangePercent((change / Number(prevData.trade_price)) * 100);

        // MA 15 계산
        const ma15Value = calculateMA(sortedData.slice(0, 15).reverse(), 15);
        setMa15(
          ma15Value.length > 0 ? ma15Value[ma15Value.length - 1].value : null,
        );

        // MA 60 계산
        const ma60Value = calculateMA(sortedData.slice(0, 60).reverse(), 60);
        setMa60(
          ma60Value.length > 0 ? ma60Value[ma60Value.length - 1].value : null,
        );
      }
    } catch (error) {
      console.error('Failed to fetch candle data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 데이터 가져오기
  useEffect(() => {
    fetchCandleData();
    // 실시간 업데이트를 위한 인터벌 설정
    const interval = setInterval(fetchCandleData, 1000 * 60); // 1분마다 업데이트

    return () => clearInterval(interval);
  }, [market, period, detailTime]);

  return (
    <div className={CHART_STYLES.container}>
      <ChartHeader
        market={market}
        period={period}
        detailTime={detailTime}
        currentPrice={currentPrice}
        openPrice={openPrice}
        highPrice={highPrice}
        lowPrice={lowPrice}
        priceChange={priceChange}
        priceChangePercent={priceChangePercent}
        ma15={ma15}
        ma60={ma60}
        showMA15={showMA15}
        showMA60={showMA60}
        onToggleMA15={() => setShowMA15(!showMA15)}
        onToggleMA60={() => setShowMA60(!showMA60)}
      />

      <ChartToolbar />

      {isLoading ? (
        <div className={CHART_STYLES.chart.loading}>
          <div className={CHART_STYLES.chart.loadingSpinner}></div>
        </div>
      ) : (
        <ChartRender
          candleData={candleData}
          showMA15={showMA15}
          showMA60={showMA60}
          zoomLevel={zoomLevel}
          onZoomChange={setZoomLevel}
        />
      )}
    </div>
  );
}
