"use client";

import { useEffect, useState } from "react";
import BuyListItem from "./components/BuyListItem";
import Card from "./components/Card";
import Coin from "./components/Coin";
import Profile from "./components/Profile";
import * as echarts from "echarts";
import { motion, AnimatePresence } from "framer-motion";

// 스타일 정의
const styles = {
    container: "flex flex-col items-center pb-5 px-3 sm:px-5 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)]",
    gridContainer: "grid gap-3 sm:gap-5 mt-3 sm:mt-5 w-full",
    profileSection: "col-span-1 sm:col-span-3 flex flex-col",
    assetSection: "flex flex-col w-full min-w-0",
    assetText: "text-xs sm:text-sm md:text-base",
    cardScrollable:
        "overflow-y-auto max-h-[250px] sm:max-h-[300px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100",
    cardCenter: "flex justify-center items-center h-[250px] sm:h-[300px]",
    gridCols4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
    gridCols3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    modalOverlay: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
    modalContent: "bg-white rounded-xl shadow-xl p-4 sm:p-6 w-full max-w-[95%] sm:max-w-md",
    cardTitle: "text-lg sm:text-xl font-bold text-gray-800 mb-4",
    modalHeader: "flex justify-between items-center mb-4",
    modalTitle: "text-lg sm:text-xl font-bold text-gray-800",
    modalCloseButton: "text-gray-500 hover:text-gray-700 transition-colors p-1",
    modalBody: "space-y-4",
    modalFooter: "mt-6 flex justify-end gap-2",
    modalButton: "px-4 py-2 rounded-lg transition-colors text-sm sm:text-base",
    modalButtonPrimary: "bg-blue-500 text-white hover:bg-blue-600",
    modalButtonSecondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    modalInput:
        "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    modalLabel: "block text-sm font-medium text-gray-700 mb-1",
    modalFormGroup: "space-y-1",
    modalFileInput: "hidden",
    modalFileLabel:
        "w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-center text-sm text-gray-600",
    modalFilePreview: "w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 object-cover",
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

interface Transaction {
    type: string;
    date: string;
    coin: string;
    price: string;
    totalPrice: string;
}

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
    const [isEditProfileModalVisible, setIsEditProfileModalVisible] = useState(false);

    const handleTransactionClick = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setIsModalVisible(true);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setTimeout(() => {
            setIsModalOpen(false);
            setSelectedTransaction(null);
        }, 200);
    };

    const handleEditProfileClick = () => {
        setIsEditProfileModalVisible(true);
        setIsEditProfileModalOpen(true);
    };

    const closeEditProfileModal = () => {
        setIsEditProfileModalVisible(false);
        setTimeout(() => {
            setIsEditProfileModalOpen(false);
        }, 200);
    };

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
                <motion.div
                    className={styles.profileSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Profile onEditClick={handleEditProfileClick} />
                </motion.div>
                <motion.div
                    className={styles.assetSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Card title="보유자산">
                        <p className={styles.assetText}>
                            총 자산: <b>100,000,587원</b>
                        </p>
                        <p className={styles.assetText}>매수 자산: 587원</p>
                        <p className={styles.assetText}>포인트: 100,000,000원</p>
                    </Card>
                </motion.div>
            </div>
            <div className={`${styles.gridContainer} ${styles.gridCols3}`}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card title="보유 코인" className={styles.cardScrollable}>
                        <div className="space-y-3 sm:space-y-4">
                            <Coin coinName={"BTC"} coinPrice={0} holdCoin={0} holdPercent={0} />
                            <Coin coinName={"BTC"} coinPrice={0} holdCoin={0} holdPercent={0} />
                            <Coin coinName={"BTC"} coinPrice={0} holdCoin={0} holdPercent={0} />
                        </div>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Card title="포트폴리오" className={styles.cardScrollable}>
                        <div id="echarts-doughnut" style={{ width: "100%", height: "200px" }}></div>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Card title="거래내역" className={styles.cardScrollable}>
                        <div className="space-y-2 sm:space-y-3">
                            <BuyListItem
                                buyType={false}
                                buyDt={"2025-01-15 21:32:45"}
                                coinNm={"BTC"}
                                buyPrice={"5,000"}
                                buyTotalPrice={"5,000"}
                                onClick={() =>
                                    handleTransactionClick({
                                        type: "매도",
                                        date: "2025-01-15 21:32:45",
                                        coin: "BTC",
                                        price: "5,000",
                                        totalPrice: "5,000",
                                    })
                                }
                            />
                            <BuyListItem
                                buyType={true}
                                buyDt={"2025-01-15 21:32:45"}
                                coinNm={"BTC"}
                                buyPrice={"5,000"}
                                buyTotalPrice={"5,000"}
                                onClick={() =>
                                    handleTransactionClick({
                                        type: "매수",
                                        date: "2025-01-15 21:32:45",
                                        coin: "BTC",
                                        price: "5,000",
                                        totalPrice: "5,000",
                                    })
                                }
                            />
                            <BuyListItem
                                buyType={false}
                                buyDt={"2025-01-15 21:32:45"}
                                coinNm={"BTC"}
                                buyPrice={"5,000"}
                                buyTotalPrice={"5,000"}
                                onClick={() =>
                                    handleTransactionClick({
                                        type: "매도",
                                        date: "2025-01-15 21:32:45",
                                        coin: "BTC",
                                        price: "5,000",
                                        totalPrice: "5,000",
                                    })
                                }
                            />
                        </div>
                    </Card>
                </motion.div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={styles.modalOverlay}
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className={styles.modalContent}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {selectedTransaction && (
                                <>
                                    <div className={styles.modalHeader}>
                                        <h3 className={styles.modalTitle}>거래 상세 정보</h3>
                                        <button onClick={closeModal} className={styles.modalCloseButton}>
                                            ✕
                                        </button>
                                    </div>
                                    <div className={styles.modalBody}>
                                        <p>
                                            <span className="font-semibold">거래 유형:</span> {selectedTransaction.type}
                                        </p>
                                        <p>
                                            <span className="font-semibold">거래 시간:</span> {selectedTransaction.date}
                                        </p>
                                        <p>
                                            <span className="font-semibold">코인:</span> {selectedTransaction.coin}
                                        </p>
                                        <p>
                                            <span className="font-semibold">거래 가격:</span>{" "}
                                            {selectedTransaction.price}원
                                        </p>
                                        <p>
                                            <span className="font-semibold">총 거래 금액:</span>{" "}
                                            {selectedTransaction.totalPrice}원
                                        </p>
                                    </div>
                                    <div className={styles.modalFooter}>
                                        <button
                                            className={`${styles.modalButton} ${styles.modalButtonPrimary}`}
                                            onClick={closeModal}
                                        >
                                            닫기
                                        </button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}

                {isEditProfileModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={styles.modalOverlay}
                        onClick={closeEditProfileModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className={styles.modalContent}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={styles.modalHeader}>
                                <h3 className={styles.modalTitle}>내 정보 수정</h3>
                                <button onClick={closeEditProfileModal} className={styles.modalCloseButton}>
                                    ✕
                                </button>
                            </div>
                            <div className={styles.modalBody}>
                                <div className="flex justify-center mb-4">
                                    <img src="/default-profile.png" alt="프로필" className={styles.modalFilePreview} />
                                </div>
                                <div className={styles.modalFormGroup}>
                                    <label className={styles.modalLabel}>프로필 사진</label>
                                    <input
                                        type="file"
                                        id="profileImage"
                                        className={styles.modalFileInput}
                                        accept="image/*"
                                    />
                                    <label htmlFor="profileImage" className={styles.modalFileLabel}>
                                        프로필 사진 등록하기
                                    </label>
                                </div>
                                <div className={styles.modalFormGroup}>
                                    <label className={styles.modalLabel}>이름</label>
                                    <input type="text" className={styles.modalInput} placeholder="이름을 입력하세요" />
                                </div>
                                <div className={styles.modalFormGroup}>
                                    <label className={styles.modalLabel}>닉네임</label>
                                    <input
                                        type="text"
                                        className={styles.modalInput}
                                        placeholder="닉네임을 입력하세요"
                                    />
                                </div>
                                <div className={styles.modalFormGroup}>
                                    <label className={styles.modalLabel}>비밀번호 변경</label>
                                    <input type="password" className={styles.modalInput} placeholder="현재 비밀번호" />
                                    <input
                                        type="password"
                                        className={`${styles.modalInput} mt-2`}
                                        placeholder="새 비밀번호"
                                    />
                                    <input
                                        type="password"
                                        className={`${styles.modalInput} mt-2`}
                                        placeholder="새 비밀번호 확인"
                                    />
                                </div>
                            </div>
                            <div className={styles.modalFooter}>
                                <button
                                    className={`${styles.modalButton} ${styles.modalButtonSecondary}`}
                                    onClick={closeEditProfileModal}
                                >
                                    취소
                                </button>
                                <button className={`${styles.modalButton} ${styles.modalButtonPrimary}`}>저장</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
