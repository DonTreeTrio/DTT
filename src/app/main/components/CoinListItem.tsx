import type { MarketResponse, TickerResponse } from '@/apis/websocket/type';

interface CoinListItemProps {
  market: MarketResponse;
  tickerData: TickerResponse;
}

export default function CoinListItem({
  market,
  tickerData,
}: CoinListItemProps) {
  const currentPrice = Number(tickerData.trade_price || 0); // 현재가
  const priceChange = Number(tickerData.signed_change_price || 0); // 변동가
  const changeRate = Number(tickerData.change_rate || 0); // 변동률
  const volume = Math.round(
    Number(tickerData.acc_trade_price_24h || 0) / 1000000,
  ); // 거래금액
  const priceColor =
    tickerData.change === 'RISE' ? 'text-red-500' : 'text-blue-500';

  return (
    <div className="flex items-center p-3 hover:bg-gray-200 border-b border-gray-200">
      <div className="flex-[3]">
        <div className="font-medium">{market.korean_name}</div>
        <div className="text-sm text-gray-500">{market.english_name}</div>
      </div>

      <div className={`flex-[2] text-right ${priceColor}`}>
        {currentPrice.toLocaleString()}
      </div>

      <div className={`flex-[2] text-right ${priceColor}`}>
        {changeRate >= 0 ? '+' : ''}
        {(changeRate * 100).toFixed(2)}%
        <div className="text-sm">{priceChange.toLocaleString()}</div>
      </div>

      <div className="flex-[2] text-right">
        {volume.toLocaleString()}
        <span className="text-gray-500 ml-1">백만</span>
      </div>
    </div>
  );
}
