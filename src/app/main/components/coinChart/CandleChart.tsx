'use client';

import {
  CandlePeriod,
  CandleTime,
  getCandleSearch,
} from '@/apis/bithumb/candleSearch';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';

interface CandleChartProps {
  market: string;
  period: CandlePeriod;
  detailTime: CandleTime;
}

export default function CandleChart({
  market,
  period,
  detailTime,
}: CandleChartProps) {
  const [candleData, setCandleData] = useState<any[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState(0); // 확대 수준을 저장하는 상태

  const fetchCandleData = async () => {
    try {
      const response = await getCandleSearch(period, detailTime, market);
      setCandleData(response);
    } catch (error) {
      console.error('Failed to fetch candle data:', error);
    }
  };

  // 차트 설정
  useEffect(() => {
    if (!chartRef.current || candleData.length === 0) return;

    const chart = echarts.init(chartRef.current);

    const updateZoomLevel = (params: any) => {
      const zoom = params.batch[0].end - params.batch[0].start;
      setZoomLevel(zoom);
    };

    chart.on('dataZoom', updateZoomLevel);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%',
      },
      xAxis: {
        type: 'category',
        data: [...candleData]
          .sort(
            (a, b) =>
              new Date(a.candle_date_time_kst).getTime() -
              new Date(b.candle_date_time_kst).getTime(),
          )
          .map((item) => {
            const date = new Date(item.candle_date_time_kst);
            if (zoomLevel > 80) {
              return `${date.getHours()}:${date.getMinutes()}`;
            } else if (zoomLevel > 50) {
              return `${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}`;
            } else {
              return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            }
          }),
        axisLabel: {
          formatter: (value: string) => value,
          align: 'center',
        },
        scale: true,
        splitLine: { show: false },
        min: 'dataMin',
        max: 'dataMax',
      },
      yAxis: {
        scale: true,
        splitArea: {
          show: true,
        },
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          show: true,
          type: 'slider',
          top: '90%',
          start: 0,
          end: 100,
        },
      ],
      series: [
        {
          name: 'Candle',
          type: 'candlestick',
          data: [...candleData]
            .sort(
              (a, b) =>
                new Date(a.candle_date_time_kst).getTime() -
                new Date(b.candle_date_time_kst).getTime(),
            )
            .map((item) => [
              Number(item.opening_price),
              Number(item.trade_price),
              Number(item.high_price),
              Number(item.low_price),
            ]),
          itemStyle: {
            color: '#ef4444',
            color0: '#3b82f6',
            borderColor: '#ef4444',
            borderColor0: '#3b82f6',
            borderWidth: 1,
          },
        },
      ],
    };

    chart.setOption(option);

    // 반응형 처리
    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      chart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [candleData, zoomLevel]);

  // 데이터 가져오기
  useEffect(() => {
    fetchCandleData();
    // 실시간 업데이트를 위한 인터벌 설정
    const interval = setInterval(fetchCandleData, 1000 * 60); // 1분마다 업데이트

    return () => clearInterval(interval);
  }, [market, period, detailTime]);

  return (
    <div className="w-full h-full bg-white p-4 rounded-lg shadow-sm">
      <div ref={chartRef} style={{ width: '100%', height: '500px' }} />
    </div>
  );
}
