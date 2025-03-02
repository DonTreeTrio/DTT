import { useState } from 'react';

type SortKey = 'asset' | 'price' | 'change' | 'volume';
type SortDirection = 'asc' | 'desc';

interface CoinListHeaderProps {
  onSort: (key: SortKey, direction: SortDirection) => void;
}

export default function CoinListHeader({ onSort }: CoinListHeaderProps) {
  const [sortKey, setSortKey] = useState<SortKey>('asset');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (key: SortKey) => {
    const newDirection =
      key === sortKey && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortDirection(newDirection);
    onSort(key, newDirection);
  };

  const getSortIcon = (key: SortKey) => {
    if (key !== sortKey) return '▼';
    return sortDirection === 'asc' ? '▲' : '▼';
  };

  return (
    <div className="flex items-center p-3 text-sm text-gray-400 border-b border-gray-200">
      {/* 자산: 3 */}
      <div className="flex-[3] flex items-center gap-1">
        <span>자산</span>
        <button
          onClick={() => handleSort('asset')}
          className={`text-xs ${sortKey === 'asset' ? 'text-blue-500' : 'opacity-50'}`}
        >
          {getSortIcon('asset')}
        </button>
      </div>

      {/* 현재가: 2 */}
      <div className="flex-[2] text-right flex items-center justify-end gap-1">
        <span>현재가</span>
        <button
          onClick={() => handleSort('price')}
          className={`text-xs ${sortKey === 'price' ? 'text-blue-500' : 'opacity-50'}`}
        >
          {getSortIcon('price')}
        </button>
      </div>

      {/* 변동률: 2 */}
      <div className="flex-[2] text-right flex items-center justify-end gap-1">
        <span>변동률(24H)</span>
        <button
          onClick={() => handleSort('change')}
          className={`text-xs ${sortKey === 'change' ? 'text-blue-500' : 'opacity-50'}`}
        >
          {getSortIcon('change')}
        </button>
      </div>

      {/* 거래금액: 2 */}
      <div className="flex-[2] text-right flex items-center justify-end gap-1">
        <span>거래금액(24H)</span>
        <button
          onClick={() => handleSort('volume')}
          className={`text-xs ${sortKey === 'volume' ? 'text-blue-500' : 'opacity-50'}`}
        >
          {getSortIcon('volume')}
        </button>
      </div>
    </div>
  );
}
