export const calculateMA = (data: any[], period: number) => {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      continue;
    }
    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += Number(data[i - j].trade_price);
    }
    result.push({
      time: data[i].candle_date_time_kst,
      value: sum / period,
    });
  }
  return result;
};

export const formatDateByZoomLevel = (date: Date, zoomLevel: number) => {
  if (zoomLevel > 80) {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  } else if (zoomLevel > 50) {
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:00`;
  } else {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }
};
