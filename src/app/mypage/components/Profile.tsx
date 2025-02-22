"use client";

import React, { useState } from "react";
import ProfileModal from "./ProfileModal";
import PurchaserModal from "./PurchaserModal";

type ModalType = "profile" | "purchase" | null;

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기/닫기 상태
    const [modalType, setModalType] = useState<ModalType>(null); // 모달 종류 상태

    const openModal = (type: ModalType) => {
        setModalType(type); // 모달 종류 설정
        setIsModalOpen(true); // 모달 열기
    };
    const closeModal = () => {
        setModalType(null); // 모달 종류 초기화
        setIsModalOpen(false); // 모달 닫기
    };

    const purchaseItems = [
        { id: 1, image: "https://via.placeholder.com/50", name: "상품 1", price: 50000 },
        { id: 2, image: "https://via.placeholder.com/50", name: "상품 2", price: 30000 },
        { id: 3, image: "https://via.placeholder.com/50", name: "상품 3", price: 20000 },
    ];

    return (
        <>
            <div className="flex flex-row items-center gap-5 p-5 bg-white shadow-md rounded-lg w-full h-full">
                <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center text-white">
                    프로필 사진
                </div>
                <div>
                    <div className="flex flex-row gap-5">
                        <h1 className="text-xl font-bold">
                            닉네임{" "}
                            <span onClick={() => openModal("profile")} className="cursor-pointer text-blue-500">
                                ✏️
                            </span>
                        </h1>
                        <span className="text-gray-500 shadow-md p-1 rounded-xl">내 순위: 10위</span>
                    </div>
                    <div className="flex flex-row items-center gap-3">
                        <span>
                            현재 보유 포인트: <b>100,000,000</b>
                        </span>
                        <span onClick={() => openModal("purchase")} className="cursor-pointer text-blue-500">
                            구매내역
                        </span>
                    </div>
                    <p>
                        지금 <span className="text-yellow-500">🍦 아이스크림 2개</span> 살 수 있어요!
                    </p>
                </div>
            </div>

            {/* 모달 */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50">
                    <div className="bg-white p-5 rounded-lg w-96">
                        {/* 내 정보 수정 모달 */}
                        {modalType === "profile" && <ProfileModal closeModal={closeModal} />}

                        {/* 구매내역 모달 */}
                        {modalType === "purchase" && (
                            <PurchaserModal closeModal={closeModal} purchaseItems={purchaseItems} />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
