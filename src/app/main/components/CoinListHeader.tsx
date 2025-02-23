export default function CoinListHeader() {
  return (
    <div className="flex items-center p-3 text-sm text-gray-400 border-b border-gray-200">
      {/* 자산: 3 */}
      <div className="flex-[3]">
        <span>자산</span>
      </div>

      {/* 현재가: 2 */}
      <div className="flex-[2] text-right">
        <span>현재가</span>
      </div>

      {/* 변동률: 2 */}
      <div className="flex-[2] text-right">
        <span>변동률(24H)</span>
      </div>

      {/* 거래금액: 2 */}
      <div className="flex-[2] text-right">
        <span>거래금액(24H)</span>
      </div>
    </div>
  );
}
