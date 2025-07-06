'use client';

import { CandleData, CandlePeriod } from '@/apis/bithumb/candleSearch';
import { calculateMA, formatDateByZoomLevel } from '@/common/utils';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import { CHART_OPTIONS } from './styles';

interface ChartRenderProps {
  candleData: CandleData[];
  showMA15: boolean;
  showMA60: boolean;
  zoomLevel: number;
  onZoomChange: (zoom: number) => void;
  period: CandlePeriod;
}

// Tooltip params 타입 정의
interface TooltipParam {
  data: [number, number, number, number]; // [open, close, high, low]
  name: string;
  seriesName: string;
}

// DataZoom 이벤트 타입 정의
interface DataZoomEvent {
  batch?: Array<{
    start: number;
    end: number;
  }>;
}

export default function ChartRender({
  candleData,
  showMA15,
  showMA60,
  zoomLevel,
  onZoomChange,
  period,
}: ChartRenderProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);
  const [startValue, setStartValue] = useState<number>(
    period === 'minutes' ? 80 : 50,
  );
  const [endValue, setEndValue] = useState<number>(100);

  // 차트 설정
  useEffect(() => {
    if (
      !chartRef.current ||
      !candleData ||
      !Array.isArray(candleData) ||
      candleData.length === 0
    )
      return;

    // 이전 차트 인스턴스가 있으면 정리
    if (chartInstanceRef.current) {
      chartInstanceRef.current.dispose();
    }

    // 새 차트 인스턴스 생성
    const chart = echarts.init(chartRef.current);
    chartInstanceRef.current = chart;

    // 차트에 표시할 데이터 준비
    const chartData = candleData.map((item) => [
      Number(item.opening_price),
      Number(item.trade_price),
      Number(item.high_price),
      Number(item.low_price),
    ]);

    // 날짜/시간 데이터 준비
    const dates = candleData.map((item) => {
      // 빗썸 API의 timestamp 처리 (밀리초 단위)
      const timestamp = item.timestamp || item.time;
      const date = new Date(timestamp);
      return formatDateByZoomLevel(date, zoomLevel, period);
    });

    // MA 15 계산
    const ma15Data = calculateMA(candleData, 15);

    // MA 60 계산
    const ma60Data = calculateMA(candleData, 60);

    // 기본 옵션 설정
    const option = {
      animation: false,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 1,
        borderColor: CHART_OPTIONS.colors.border,
        padding: 10,
        textStyle: {
          color: '#333',
          fontSize: 12,
        },
        formatter: function (params: TooltipParam[]) {
          if (!params || params.length === 0) return '';

          const candleData = params[0].data;
          const date = params[0].name;

          // 상승/하락 여부에 따라 색상 결정 (시가 > 종가: 하락, 시가 < 종가: 상승)
          const isDown = candleData[0] > candleData[1];
          const colorStyle = isDown
            ? `color:${CHART_OPTIONS.colors.down}`
            : `color:${CHART_OPTIONS.colors.up}`;

          let tooltip = `<div style="font-weight: bold; margin-bottom: 8px; font-size: 13px;">${date}</div>`;

          tooltip += `<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                      <span>시가:</span>
                      <span style="${colorStyle}">${candleData[0].toLocaleString()}</span>
                    </div>`;

          tooltip += `<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                      <span>종가:</span>
                      <span style="${colorStyle}; font-weight: bold">${candleData[1].toLocaleString()}</span>
                    </div>`;

          tooltip += `<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                      <span>고가:</span>
                      <span style="${colorStyle}">${candleData[2].toLocaleString()}</span>
                    </div>`;

          tooltip += `<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                      <span>저가:</span>
                      <span style="${colorStyle}">${candleData[3].toLocaleString()}</span>
                    </div>`;

          // MA 값 추가
          if (params.length > 1 && showMA15) {
            tooltip += `<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span style="color:${CHART_OPTIONS.colors.ma15}">MA15:</span>
                        <span style="color:${CHART_OPTIONS.colors.ma15}">${params[1].data.toLocaleString()}</span>
                      </div>`;
          }

          if (params.length > 2 && showMA60) {
            tooltip += `<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span style="color:${CHART_OPTIONS.colors.ma60}">MA60:</span>
                        <span style="color:${CHART_OPTIONS.colors.ma60}">${params[2].data.toLocaleString()}</span>
                      </div>`;
          }

          return tooltip;
        },
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '10%',
        top: '5%',
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: {
          formatter: (value: string) => value,
          align: 'center',
          color: CHART_OPTIONS.colors.text,
          fontSize: 10,
        },
        scale: true,
        splitLine: { show: false },
        min: 'dataMin',
        max: 'dataMax',
        axisLine: {
          lineStyle: {
            color: CHART_OPTIONS.colors.border,
          },
        },
      },
      yAxis: {
        scale: true,
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(250, 250, 250, 0.05)', 'rgba(240, 240, 240, 0.05)'],
          },
        },
        axisLabel: {
          color: CHART_OPTIONS.colors.text,
          fontSize: 10,
          formatter: (value: number) => value.toLocaleString(),
        },
        axisLine: {
          lineStyle: {
            color: CHART_OPTIONS.colors.border,
          },
        },
        splitLine: {
          lineStyle: {
            color: CHART_OPTIONS.colors.grid,
          },
        },
      },
      dataZoom: [
        {
          type: 'inside',
          start: startValue,
          end: endValue,
          zoomOnMouseWheel: true, // 기본 기능 활성화
          moveOnMouseWheel: false,
          filterMode: 'filter',
        },
      ],
      series: [
        {
          name: 'Candle',
          type: 'candlestick',
          data: chartData,
          itemStyle: {
            color: CHART_OPTIONS.colors.up,
            color0: CHART_OPTIONS.colors.down,
            borderColor: CHART_OPTIONS.colors.up,
            borderColor0: CHART_OPTIONS.colors.down,
            borderWidth: 1,
          },
          emphasis: {
            itemStyle: {
              color: CHART_OPTIONS.colors.up,
              color0: CHART_OPTIONS.colors.down,
              borderColor: CHART_OPTIONS.colors.up,
              borderColor0: CHART_OPTIONS.colors.down,
              borderWidth: 2,
            },
          },
          barWidth: '70%',
        },
        ...(showMA15
          ? [
              {
                name: 'MA15',
                type: 'line',
                data: ma15Data.map((item) => item.value),
                smooth: true,
                lineStyle: {
                  opacity: 0.8,
                  color: CHART_OPTIONS.colors.ma15,
                  width: 1,
                },
                symbol: 'none',
              },
            ]
          : []),
        ...(showMA60
          ? [
              {
                name: 'MA60',
                type: 'line',
                data: ma60Data.map((item) => item.value),
                smooth: true,
                lineStyle: {
                  opacity: 0.8,
                  color: CHART_OPTIONS.colors.ma60,
                  width: 1,
                },
                symbol: 'none',
              },
            ]
          : []),
      ],
    };

    chart.setOption(option);

    // 데이터 줌 이벤트 리스너
    chart.on('datazoom', function (params: unknown) {
      const dataZoomParams = params as DataZoomEvent;
      if (dataZoomParams.batch && dataZoomParams.batch[0]) {
        const start = dataZoomParams.batch[0].start;
        const end = dataZoomParams.batch[0].end;

        setStartValue(start);
        setEndValue(end);
        onZoomChange(end - start);
      }
    });

    // 반응형 처리
    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener('resize', handleResize);

    // 정리 함수
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
      chartInstanceRef.current = null;
    };
  }, [
    candleData,
    zoomLevel,
    showMA15,
    showMA60,
    onZoomChange,
    period,
    startValue,
    endValue,
  ]);

  return <div ref={chartRef} style={{ width: '100%', height: '500px' }} />;
}
