'use client';

import { calculateMA, formatDateByZoomLevel } from '@/common/utils';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { CHART_OPTIONS } from './styles';

interface ChartRenderProps {
  candleData: any[];
  showMA15: boolean;
  showMA60: boolean;
  zoomLevel: number;
  onZoomChange: (zoom: number) => void;
}

export default function ChartRender({
  candleData,
  showMA15,
  showMA60,
  zoomLevel,
  onZoomChange,
}: ChartRenderProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  // 차트 설정
  useEffect(() => {
    if (
      !chartRef.current ||
      !candleData ||
      !Array.isArray(candleData) ||
      candleData.length === 0
    )
      return;

    const chart = echarts.init(chartRef.current);

    const updateZoomLevel = (params: any) => {
      const zoom = params.batch[0].end - params.batch[0].start;
      onZoomChange(zoom);
    };

    chart.on('dataZoom', updateZoomLevel);

    // 데이터 정렬
    const sortedData = [...candleData].sort(
      (a, b) =>
        new Date(a.candle_date_time_kst).getTime() -
        new Date(b.candle_date_time_kst).getTime(),
    );

    // MA 15 계산
    const ma15Data = calculateMA(sortedData, 15);

    // MA 60 계산
    const ma60Data = calculateMA(sortedData, 60);

    const option = {
      animation: false,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 1,
        borderColor: CHART_OPTIONS.colors.border,
        padding: 10,
        textStyle: {
          color: '#000',
        },
        formatter: function (params: any) {
          const candleData = params[0].data;
          //console.log('candleData', candleData);

          let tooltip = `<div style="font-weight: bold; margin-bottom: 5px;">${params[0].name}</div>`;

          tooltip += `<div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                        <span>시가:</span>
                        <span style="color: ${candleData[0] > candleData[1] ? CHART_OPTIONS.colors.down : CHART_OPTIONS.colors.up}">${candleData[0].toLocaleString()}</span>
                      </div>`;

          tooltip += `<div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                        <span>종가:</span>
                        <span style="color: ${candleData[0] > candleData[1] ? CHART_OPTIONS.colors.down : CHART_OPTIONS.colors.up}">${candleData[1].toLocaleString()}</span>
                      </div>`;

          tooltip += `<div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                        <span>고가:</span>
                        <span style="color: ${candleData[0] > candleData[1] ? CHART_OPTIONS.colors.down : CHART_OPTIONS.colors.up}">${candleData[2].toLocaleString()}</span>
                      </div>`;

          tooltip += `<div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                        <span>저가:</span>
                        <span style="color: ${candleData[0] > candleData[1] ? CHART_OPTIONS.colors.down : CHART_OPTIONS.colors.up}">${candleData[3].toLocaleString()}</span>
                      </div>`;

          // MA 값 추가
          if (params.length > 1 && showMA15) {
            tooltip += `<div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                          <span style="color: ${CHART_OPTIONS.colors.ma15}">MA15:</span>
                          <span style="color: ${CHART_OPTIONS.colors.ma15}">${params[1].data.toLocaleString()}</span>
                        </div>`;
          }

          if (params.length > 2 && showMA60) {
            tooltip += `<div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                          <span style="color: ${CHART_OPTIONS.colors.ma60}">MA60:</span>
                          <span style="color: ${CHART_OPTIONS.colors.ma60}">${params[2].data.toLocaleString()}</span>
                        </div>`;
          }

          return tooltip;
        },
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%',
        top: '5%',
      },
      xAxis: {
        type: 'category',
        data: sortedData.map((item) => {
          const date = new Date(item.candle_date_time_kst);
          return formatDateByZoomLevel(date, zoomLevel);
        }),
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
          start: 0,
          end: 100,
        },
        {
          show: true,
          type: 'slider',
          top: '90%',
          start: 0,
          end: 100,
          borderColor: CHART_OPTIONS.colors.border,
          textStyle: {
            color: CHART_OPTIONS.colors.text,
          },
          handleStyle: {
            color: '#fff',
            borderColor: '#ACB8D1',
          },
          handleSize: '100%',
          fillerColor: 'rgba(171, 191, 216, 0.2)',
          dataBackground: {
            lineStyle: {
              color: CHART_OPTIONS.colors.border,
            },
            areaStyle: {
              color: '#f5f5f5',
            },
          },
        },
      ],
      series: [
        {
          name: 'Candle',
          type: 'candlestick',
          data: sortedData.map((item) => [
            Number(item.opening_price),
            Number(item.trade_price),
            Number(item.high_price),
            Number(item.low_price),
          ]),
          itemStyle: {
            color: CHART_OPTIONS.colors.up,
            color0: CHART_OPTIONS.colors.down,
            borderColor: CHART_OPTIONS.colors.up,
            borderColor0: CHART_OPTIONS.colors.down,
            borderWidth: 1,
          },
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

    // 반응형 처리
    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      chart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [candleData, zoomLevel, showMA15, showMA60, onZoomChange]);

  return <div ref={chartRef} style={{ width: '100%', height: '500px' }} />;
}
