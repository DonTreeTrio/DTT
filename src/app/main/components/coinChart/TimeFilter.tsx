'use client';

import { CandlePeriod, CandleTime } from '@/apis/bithumb/candleSearch';
import { useState } from 'react';
import TimeSelectDropdown from './TimeSelectDropdown';

interface TimeFilterProps {
  onTimeChange: (time: CandleTime, period: CandlePeriod) => void;
  selectedTime: CandleTime;
}

const FILTER_STYLES = {
  container: 'flex gap-2 p-4 items-center',
  button: (isSelected: boolean) =>
    `px-3 py-1 rounded ${
      isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100'
    } hover:bg-opacity-90 transition-colors`,
  dropdownButton:
    'px-3 py-1 rounded bg-gray-100 flex items-center gap-1 hover:bg-gray-200',
  dropdownContainer: 'relative',
} as const;

const TIME_BUTTONS = [
  { id: 'min1', value: '1', period: 'minutes', label: '1분' },
  { id: 'min10', value: '10', period: 'minutes', label: '10분' },
  { id: 'min30', value: '30', period: 'minutes', label: '30분' },
  { id: 'hour1', value: '60', period: 'minutes', label: '1시간' },
  { id: 'day1', value: '', period: 'days', label: '일' },
  { id: 'month1', value: '', period: 'months', label: '월' },
] as const;

export default function TimeFilter({
  onTimeChange,
  selectedTime,
}: TimeFilterProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className={FILTER_STYLES.container}>
      {TIME_BUTTONS.map((button) => (
        <button
          key={button.id}
          className={FILTER_STYLES.button(selectedTime === button.value)}
          onClick={() =>
            onTimeChange(
              button.value as CandleTime,
              button.period as CandlePeriod,
            )
          }
        >
          {button.label}
        </button>
      ))}

      <div className={FILTER_STYLES.dropdownContainer}>
        <button
          className={FILTER_STYLES.dropdownButton}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          설정 <span className="ml-1">▼</span>
        </button>

        <TimeSelectDropdown
          isOpen={isDropdownOpen}
          onClose={() => setIsDropdownOpen(false)}
          onTimeChange={(time) => {
            const period =
              time === 'W' ? 'weeks' : time === 'M' ? 'months' : 'days';
            onTimeChange(time, period);
          }}
        />
      </div>
    </div>
  );
}
