"use client";

import { useEffect } from "react";
import BuyListItem from "./components/BuyListItem";
import Card from "./components/Card";
import Coin from "./components/Coin";
import Profile from "./components/Profile";
import * as echarts from "echarts";

// 스타일 정의
const styles = {
    container: "flex flex-col items-center pb-5 px-5 max-w-[1200px] mx-auto h-[calc(100vh-80px)]",
    gridContainer: "grid gap-5 mt-5 w-full",
    profileSection: "col-span-3 flex flex-col",
    assetSection: "flex flex-col w-full min-w-0",
    assetText: "text-sm md:text-base",
    cardScrollable: "overflow-y-hidden max-h-[300px]",
    cardCenter: "flex justify-center items-center h-[300px]",
    gridCols4: "grid-cols-1 md:grid-cols-4",
    gridCols3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
};

// ECharts 옵션
const getChartOptions = () => ({
    tooltip: {
        trigger: "item",
    },
    legend: {
        orient: "vertical",
        left: "left",
    },
    series: [
        {
            name: "보유 비율",
            type: "pie",
            radius: ["50%", "70%"], // 도넛 형태
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: "center",
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: "14",
                    fontWeight: "bold",
                },
            },
            labelLine: {
                show: false,
            },
            data: [
                { value: 40, name: "BTC" },
                { value: 30, name: "ETH" },
                { value: 20, name: "DOGE" },
                { value: 10, name: "ADA" },
            ],
        },
    ],
});

export default function Dashboard() {
    useEffect(() => {
        const chartDom = document.getElementById("echarts-doughnut");
        const myChart = echarts.init(chartDom);
        myChart.setOption(getChartOptions());
        return () => {
            myChart.dispose();
        };
    }, []);

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

                {/* ECharts 도넛 차트 추가 */}
                <Card title="포트폴리오" className={styles.cardScrollable}>
                    <div id="echarts-doughnut" style={{ width: "100%", height: "200px" }}></div>
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
