export const CHART_STYLES = {
  container: 'w-full h-full bg-white rounded-lg shadow-sm',
  header: {
    container: 'border-b',
    wrapper: 'p-4',
    titleRow: 'flex justify-between items-center mb-2',
    title: 'text-xl font-bold mb-2',
    toggleButtons: 'flex gap-2',
    toggleButton: (isActive: boolean) =>
      `px-2 py-1 text-xs rounded ${isActive ? 'bg-orange-100 text-orange-500' : 'bg-gray-100'}`,
    priceContainer: 'flex items-center gap-4 mb-2',
    price: 'text-2xl font-bold',
    change: 'text-lg font-medium',
    priceInfo: 'flex flex-wrap gap-x-4 text-sm',
    priceLabel: 'text-gray-500',
    priceValue: (isPositive: boolean) =>
      `${isPositive ? 'text-red-500' : 'text-blue-500'}`,
    stats: 'flex flex-wrap gap-x-4 text-sm',
    statItem: 'flex items-center gap-1',
    statLabel: 'text-gray-500',
    maInfo: 'mt-2 text-sm',
    ma15: 'text-orange-500',
    ma60: 'text-green-500',
  },
  toolbar: {
    wrapper: 'flex items-center p-2 border-b overflow-x-auto',
    button: 'p-2 hover:bg-gray-100 rounded',
    icon: 'h-5 w-5 text-gray-500',
    spacer: 'flex-1',
  },
  chart: {
    wrapper: 'w-full h-[500px]',
    loading: 'flex items-center justify-center h-full',
    loadingSpinner:
      'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500',
  },
};

export const CHART_OPTIONS = {
  colors: {
    up: '#ef4444', // 상승 (빨간색)
    down: '#3b82f6', // 하락 (파란색)
    ma15: '#ff9800', // MA15 (주황색)
    ma60: '#4caf50', // MA60 (녹색)
    grid: '#f0f0f0', // 그리드 (연한 회색)
    text: '#999', // 텍스트 (회색)
    border: '#ddd', // 테두리 (연한 회색)
  },
};
