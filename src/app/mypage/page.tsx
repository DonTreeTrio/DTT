import BuyListItem from "./components/BuyListItem";
import Card from "./components/Card";
import Coin from "./components/Coin";
import Profile from "./components/Profile";
export default function Dashboard() {
    return (
        <div className="flex flex-col items-center pt-[6rem] px-5 max-w-[1200px] mx-auto">
            <div className="grid grid-cols-4 gap-5 mt-5 w-full h-full grid-rows-[1fr]">
                <div className="col-span-3 flex flex-col">
                    <Profile />
                </div>
                <div className="col-span-1 flex flex-col">
                    <Card title="보유자산">
                        <p>
                            총 자산: <b>100,000,587원</b>
                        </p>
                        <p>매수 자산: 587원</p>
                        <p>포인트: 100,000,000원</p>
                    </Card>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-5 mt-5 w-full">
                <Card title="보유 코인">
                    <Coin coinName={"BTC"} coinPrice={0} holdCoin={0} holdPercent={0} />
                    <Coin coinName={"BTC"} coinPrice={0} holdCoin={0} holdPercent={0} />
                    <Coin coinName={"BTC"} coinPrice={0} holdCoin={0} holdPercent={0} />
                </Card>
                <Card title="포트폴리오" className="flex justify-center">
                    차트 넣어야함니다~~~
                </Card>
                <Card title="거래내역">
                    <BuyListItem buyType={false} buyDt={""} coinNm={""} buyPrice={""} buyTotalPrice={""} />
                    <p>매수 - BTC 5,000원 (2025-01-15 21:32:45)</p>
                    <p>매도 - BTC 5,000원 (2025-01-15 21:32:45)</p>
                </Card>
            </div>
        </div>
    );
}
