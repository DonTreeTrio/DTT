import React from "react";

const PurchaserModal = ({ purchaseItems, closeModal }: any) => {
    return (
        <>
            <h2 className="text-xl font-bold mb-4">구매내역</h2>
            <div className="flex flex-col gap-3">
                {purchaseItems.map((item: any) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-4 p-3 border border-gray-300 rounded-lg shadow-md"
                    >
                        <img src={item.image} alt={item.name} className="w-12 h-12" />
                        <div>
                            <div className="font-bold">{item.name}</div>
                            <div>{item.price}원</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-5">
                <div className="flex justify-between">
                    <span className="font-bold">총수량: 3개</span>
                    <span className="font-bold">보유 포인트: 100,000,000원</span>
                </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
                <button onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
                    닫기
                </button>
            </div>
        </>
    );
};

export default PurchaserModal;
