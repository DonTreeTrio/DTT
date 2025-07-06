'use client';

import { CandlePeriod, CandleTime } from '@/apis/bithumb/candleSearch';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import TimeFilter from './coinChart/TimeFilter';

// 클라이언트 컴포넌트 동적 로딩
const DynamicCandleChart = dynamic(() => import('./coinChart/CandleChart'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex items-center justify-center">
      차트 로딩 중...
    </div>
  ),
});

interface CandleChartProps {
  market?: string;
  period: CandlePeriod;
  detailTime: CandleTime | '';
}

export function ClientCandleChart(props: CandleChartProps) {
  return <DynamicCandleChart {...props} />;
}

export function ClientTimeFilter() {
  const [selectedTime, setSelectedTime] = useState<CandleTime>('1');
  const [selectedPeriod, setSelectedPeriod] = useState<CandlePeriod>('minutes');

  const handleTimeChange = (time: CandleTime | '', period: CandlePeriod) => {
    setSelectedTime(time as CandleTime);
    setSelectedPeriod(period);
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-4">
      <TimeFilter
        onTimeChange={handleTimeChange}
        selectedTime={selectedTime}
        selectedPeriod={selectedPeriod}
      />
      <div className="p-4">
        <ClientCandleChart period={selectedPeriod} detailTime={selectedTime} />
      </div>
    </div>
  );
}
