'use client';

import { CandlePeriod, CandleTime } from '@/apis/bithumb/candleSearch';
import { useState } from 'react';

interface TimeFilterProps {
  onTimeChange: (time: CandleTime | '', period: CandlePeriod) => void;
  selectedTime: CandleTime;
  selectedPeriod: CandlePeriod;
}

const FILTER_STYLES = {
  container: 'flex gap-1 p-2 items-center border-b overflow-x-auto',
  button: (isSelected: boolean) =>
    `px-3 py-1 rounded ${
      isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100'
    } hover:bg-opacity-90 transition-colors text-sm`,
  dropdownButton:
    'px-3 py-1 rounded bg-gray-100 flex items-center gap-1 hover:bg-gray-200 text-sm',
  dropdownContainer: 'relative',
  starIcon: 'text-yellow-400 ml-1',
} as const;

const TIME_BUTTONS = [
  { id: 'min1', value: '1', period: 'minutes', label: '1분', favorite: true },
  { id: 'min3', value: '3', period: 'minutes', label: '3분', favorite: false },
  { id: 'min5', value: '5', period: 'minutes', label: '5분', favorite: false },
  {
    id: 'min10',
    value: '10',
    period: 'minutes',
    label: '10분',
    favorite: true,
  },
  {
    id: 'min15',
    value: '15',
    period: 'minutes',
    label: '15분',
    favorite: false,
  },
  {
    id: 'min30',
    value: '30',
    period: 'minutes',
    label: '30분',
    favorite: true,
  },
  {
    id: 'hour1',
    value: '60',
    period: 'minutes',
    label: '1시간',
    favorite: true,
  },
  {
    id: 'hour4',
    value: '240',
    period: 'minutes',
    label: '4시간',
    favorite: false,
  },
  {
    id: 'hour6',
    value: '360',
    period: 'minutes',
    label: '6시간',
    favorite: false,
  },
  {
    id: 'hour12',
    value: '720',
    period: 'minutes',
    label: '12시간',
    favorite: false,
  },
  { id: 'day1', value: '', period: 'days', label: '일', favorite: true },
  { id: 'week1', value: '', period: 'weeks', label: '주', favorite: false },
  { id: 'month1', value: '', period: 'months', label: '월', favorite: false },
] as const;

export default function TimeFilter({
  onTimeChange,
  selectedTime,
  selectedPeriod,
}: TimeFilterProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<
    'minutes' | 'hours' | 'days'
  >('minutes');

  // 현재 선택된 버튼 확인
  const isButtonSelected = (value: string, period: string) => {
    return selectedTime === value && selectedPeriod === period;
  };

  // 카테고리별 버튼 필터링
  const getFilteredButtons = () => {
    if (activeCategory === 'minutes') {
      return TIME_BUTTONS.filter(
        (btn) => btn.period === 'minutes' && parseInt(btn.value) <= 30,
      );
    } else if (activeCategory === 'hours') {
      return TIME_BUTTONS.filter(
        (btn) => btn.period === 'minutes' && parseInt(btn.value) >= 60,
      );
    } else {
      return TIME_BUTTONS.filter(
        (btn) =>
          btn.period === 'days' ||
          btn.period === 'weeks' ||
          btn.period === 'months',
      );
    }
  };

  return (
    <div className={FILTER_STYLES.container}>
      {/* 카테고리 선택 */}
      <div className="flex border-r pr-2 mr-2">
        <button
          className={`px-2 py-1 ${activeCategory === 'minutes' ? 'text-blue-500 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveCategory('minutes')}
        >
          분
        </button>
        <button
          className={`px-2 py-1 ${activeCategory === 'hours' ? 'text-blue-500 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveCategory('hours')}
        >
          시간
        </button>
        <button
          className={`px-2 py-1 ${activeCategory === 'days' ? 'text-blue-500 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveCategory('days')}
        >
          일
        </button>
      </div>

      {/* 시간 버튼 */}
      {getFilteredButtons().map((button) => (
        <button
          key={button.id}
          className={FILTER_STYLES.button(
            isButtonSelected(button.value, button.period),
          )}
          onClick={() => {
            if (
              button.period === 'days' ||
              button.period === 'weeks' ||
              button.period === 'months'
            ) {
              onTimeChange('', button.period as CandlePeriod);
            } else {
              onTimeChange(
                button.value as CandleTime,
                button.period as CandlePeriod,
              );
            }
          }}
        >
          {button.label}
          {button.favorite && <span className={FILTER_STYLES.starIcon}>★</span>}
        </button>
      ))}

      {/* 차트 도구 */}
      <div className="ml-auto flex items-center">
        <button className="p-1 hover:bg-gray-100 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
          </svg>
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
