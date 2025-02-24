'use client';

import { useCallback, useState } from 'react';
import { IoSearch } from 'react-icons/io5';

interface CoinSearchProps {
  onSearch: (keyword: string) => void;
}

export default function CoinSearch({ onSearch }: CoinSearchProps) {
  const [keyword, setKeyword] = useState('');

  const handleSearch = useCallback(() => {
    onSearch(keyword);
  }, [keyword, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch(value); // 실시간 검색을 위해 입력 즉시 검색 실행
  };

  return (
    <div className="flex items-center gap-2 border-b border-gray-200">
      <div className="relative flex-1">
        <input
          type="text"
          value={keyword}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="코인명 검색"
          className="w-full px-4 py-2 pr-10 text-sm border rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <IoSearch size={20} />
        </button>
      </div>
    </div>
  );
}
