import BuyListItem from "./components/BuyListItem";
import Card from "./components/Card";
import Coin from "./components/Coin";
import Profile from "./components/Profile";

const styles = {
    container: "flex flex-col items-center pb-5 px-5 max-w-[1200px] mx-auto h-[calc(100vh-80px)]",
    gridContainer: "grid gap-5 mt-5 w-full",
    profileSection: "col-span-3 flex flex-col",
    assetSection: "flex flex-col w-full min-w-0",
    assetText: "text-sm md:text-base",
    cardScrollable: "overflow-y-auto max-h-[300px]",
    cardCenter: "flex justify-center overflow-y-auto max-h-[300px]",
    gridCols4: "grid-cols-1 md:grid-cols-4",
    gridCols3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
};

export default function Dashboard() {
    return (
        <div className={styles.container}>
            <div className={`${styles.gridContainer} ${styles.gridCols4} h-full grid-rows-[1fr]`}>
                <div className={styles.profileSection}>
                    <Profile />
                </div>
                <div className={styles.assetSection}>
                    <Card title="보유자산">
                        <p className={styles.assetText}>
                            총 자산: <b>100,000,587원</b>
                        </p>
                        <p className={styles.assetText}>매수 자산: 587원</p>
                        <p className={styles.assetText}>포인트: 100,000,000원</p>
                    </Card>
                </div>
            </div>
            <div className={`${styles.gridContainer} ${styles.gridCols3}`}>
                <Card title="보유 코인" className={styles.cardScrollable}>
                    <Coin coinName={"BTC"} coinPrice={0} holdCoin={0} holdPercent={0} />
                    <Coin coinName={"BTC"} coinPrice={0} holdCoin={0} holdPercent={0} />
                    <Coin coinName={"BTC"} coinPrice={0} holdCoin={0} holdPercent={0} />
                </Card>
                <Card title="포트폴리오" className={styles.cardCenter}>
                    차트 넣어야함니다~~~
                </Card>
                <Card title="거래내역" className={styles.cardScrollable}>
                    <BuyListItem
                        buyType={false}
                        buyDt={"2025-01-15 21:32:45"}
                        coinNm={"BTC"}
                        buyPrice={"5,000"}
                        buyTotalPrice={"5,000"}
                    />
                    <BuyListItem
                        buyType={true}
                        buyDt={"2025-01-15 21:32:45"}
                        coinNm={"BTC"}
                        buyPrice={"5,000"}
                        buyTotalPrice={"5,000"}
                    />
                    <BuyListItem
                        buyType={false}
                        buyDt={"2025-01-15 21:32:45"}
                        coinNm={"BTC"}
                        buyPrice={"5,000"}
                        buyTotalPrice={"5,000"}
                    />
                </Card>
            </div>
        </div>
    );
}
