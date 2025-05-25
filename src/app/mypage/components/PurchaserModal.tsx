"use client";

import React from "react";
import { motion } from "framer-motion";
import BarcodeCollapse from "@/components/common/BarcodeCollapse";

interface PurchaseItem {
    id: number;
    image: string;
    name: string;
    price: number;
    barcode?: string;
}

interface PurchaserModalProps {
    closeModal: () => void;
    purchaseItems: PurchaseItem[];
}

const styles = {
    container: "p-4",
    header: "flex justify-between items-center mb-4",
    title: "text-lg font-bold",
    closeButton: "text-gray-500 hover:text-gray-700",
    itemList: "space-y-4",
    item: "flex items-center gap-4 p-3 border-b border-gray-100 last:border-0",
    itemImage: "w-16 h-16 object-cover rounded-lg",
    itemInfo: "flex-1",
    itemName: "font-medium",
    itemPrice: "text-gray-600",
    emptyMessage: "text-center text-gray-500 py-8",
    footer: "mt-5 flex flex-col gap-2", // 세로 정렬 + 간격 추가
    footerText: "font-bold",
    buttonContainer: "flex flex-col center gap-2 mt-4",
    button: "px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-600 transition-all",
    divider: "border border-gray-100",
};

const PurchaserModal: React.FC<PurchaserModalProps> = ({ closeModal, purchaseItems }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.container}
        >
            <div className={styles.header}>
                <h2 className={styles.title}>구매내역</h2>
                <button onClick={closeModal} className={styles.closeButton}>
                    ✕
                </button>
            </div>
            <div className={styles.itemList}>
                {purchaseItems.length === 0 ? (
                    <div className={styles.emptyMessage}>구매내역이 없습니다</div>
                ) : (
                    purchaseItems.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className={styles.item}
                        >
                            <img src={item.image} alt={item.name} className={styles.itemImage} />
                            <div className={styles.itemInfo}>
                                <div className={styles.itemName}>{item.name}</div>
                                <div className={styles.itemPrice}>{item.price.toLocaleString()}원</div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            <div className={styles.footer}>
                <span className={styles.footerText}>총수량: {purchaseItems.length}개</span>
                <div className={styles.divider} />
                <span className={styles.footerText}>보유 포인트: 100,000,000원</span>
                <div className={styles.divider} />
            </div>

            <div className={styles.buttonContainer}>
                <button onClick={closeModal} className={styles.button}>
                    닫기
                </button>
            </div>
        </motion.div>
    );
};

export default PurchaserModal;
