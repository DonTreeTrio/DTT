'use client';

import { CandleTime } from '@/apis/bithumb/candleSearch';

interface TimeSelectDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onTimeChange: (time: CandleTime) => void;
}

export default function TimeSelectDropdown({
  isOpen,
  onClose,
  onTimeChange,
}: TimeSelectDropdownProps) {
  if (!isOpen) return null;

  const handleSelect = (time: CandleTime | '') => {
    onTimeChange(time as CandleTime);
    onClose();
  };

  return (
    <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-10">
      <button
        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
        onClick={() => handleSelect('')}
      >
        1일
      </button>
      <button
        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
        onClick={() => handleSelect('')}
      >
        1주
      </button>
      <button
        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
        onClick={() => handleSelect('')}
      >
        1월
      </button>
    </div>
  );
}
