'use client';

import {
  CandlePeriod,
  CandleTime,
  getCandleSearch,
} from '@/apis/bithumb/candleSearch';
import { calculateMA } from '@/common/utils';
import { useEffect, useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import ChartHeader from './ChartHeader';
import ChartRender from './ChartRender';
import ChartToolbar from './ChartToolbar';
import { CHART_STYLES } from './styles';

interface CandleChartProps {
  market?: string;
  period: CandlePeriod;
  detailTime: CandleTime | '';
}

export default function CandleChart({
  market: propMarket,
  period,
  detailTime,
}: CandleChartProps) {
  const { selectedMarket, marketInfo } = useMarket();
  // props로 받은 market이 있으면 우선 사용, 없으면 context의 selectedMarket 사용
  const market = propMarket || selectedMarket || 'KRW-BTC';

  // 현재 마켓의 실시간 데이터 가져오기
  const currentMarketData = marketInfo.find((info) => info.market === market);

  const [candleData, setCandleData] = useState<any[]>([]);
  const [highPrice, setHighPrice] = useState<number | null>(null);
  const [lowPrice, setLowPrice] = useState<number | null>(null);
  const [openPrice, setOpenPrice] = useState<number | null>(null);
  const [ma15, setMa15] = useState<number | null>(null);
  const [ma60, setMa60] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [showMA15, setShowMA15] = useState(true);
  const [showMA60, setShowMA60] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // 실시간 가격 데이터 (MarketContext에서 가져오기)
  const currentPrice = currentMarketData?.trade_price || 0;
  const priceChange = currentMarketData?.signed_change_price || 0;
  const priceChangePercent = currentMarketData?.signed_change_rate || 0;

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

      // 데이터 시간 기준으로 정렬 (오래된 데이터부터 최신순으로)
      const sortedData = [...response].sort(
        (a, b) =>
          new Date(a.candle_date_time_kst || '').getTime() -
          new Date(b.candle_date_time_kst || '').getTime(),
      );

      setCandleData(sortedData);

      // 캔들 데이터에서 고가, 저가, 시가만 설정 (현재가와 변동률은 실시간 데이터 사용)
      if (sortedData.length > 0) {
        const latestData = sortedData[sortedData.length - 1];

        setHighPrice(Number(latestData.high_price));
        setLowPrice(Number(latestData.low_price));
        setOpenPrice(Number(latestData.opening_price));

        // MA 15 계산 (최신 데이터 기준)
        const dataForMA = [...sortedData].slice(sortedData.length - 60); // 충분한 데이터 확보
        const ma15Value = calculateMA(dataForMA, 15);
        setMa15(
          ma15Value.length > 0 ? ma15Value[ma15Value.length - 1].value : null,
        );

        // MA 60 계산
        const ma60Value = calculateMA(dataForMA, 60);
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

  // 캔들 데이터 가져오기 (실시간 업데이트는 필요 없음)
  useEffect(() => {
    fetchCandleData();
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
        priceChangePercent={priceChangePercent * 100} // 퍼센트로 변환
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
          period={period}
        />
      )}
    </div>
  );
}
