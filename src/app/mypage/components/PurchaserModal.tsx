"use client";

import BarcodeCollapse from "@/components/common/BarcodeCollapse";
import React, { useState } from "react";

const styles = {
    container: "flex flex-col gap-3",
    card: "border border-gray-300 rounded-lg shadow-md",
    cardHeader: "flex items-center gap-4 p-3 cursor-pointer hover:bg-gray-100 transition-all",
    image: "w-12 h-12",
    title: "font-bold",
    footer: "mt-5 flex flex-col gap-2", // 세로 정렬 + 간격 추가
    footerText: "font-bold",
    buttonContainer: "flex flex-col center gap-2 mt-4",
    button: "px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-600 transition-all",
    divider: "border border-gray-100",
};

const PurchaserModal = ({ purchaseItems, closeModal }: any) => {
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    const toggleExpand = (id: string) => {
        setExpandedItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    return (
        <>
            <h2 className="text-xl font-bold mb-4">구매내역</h2>
            <div className={styles.container}>
                {purchaseItems.map((item: any) => (
                    <div key={item.id} className={styles.card}>
                        <div className={styles.cardHeader} onClick={() => toggleExpand(item.id)}>
                            <img src={item.image} alt={item.name} className={styles.image} />
                            <div>
                                <div className={styles.title}>{item.name}</div>
                                <div>{item.price}원</div>
                            </div>
                        </div>

                        {/* 바코드 표시 컴포넌트 */}
                        <BarcodeCollapse isOpen={expandedItems.has(item.id)} barcode={item.barcode} />
                    </div>
                ))}
            </div>

            <div className={styles.footer}>
                <span className={styles.footerText}>총수량: 3개</span>
                <div className={styles.divider} />
                <span className={styles.footerText}>보유 포인트: 100,000,000원</span>
                <div className={styles.divider} />
            </div>

            <div className={styles.buttonContainer}>
                <button onClick={closeModal} className={styles.button}>
                    닫기
                </button>
            </div>
        </>
    );
};

export default PurchaserModal;
