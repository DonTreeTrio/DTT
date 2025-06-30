import React from "react";

interface BuyListItemProps {
    buyType: boolean;
    buyDt: string;
    coinNm: string;
    buyPrice: string;
    buyTotalPrice: string;
    onClick?: () => void;
}

const BuyListItem = ({ buyType, buyDt, coinNm, buyPrice, buyTotalPrice, onClick }: BuyListItemProps) => {
    return (
        <div className="flex flex-col gap-2 p-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={onClick}>
            <div className="flex justify-between gap-4">
                <span className={`${buyType ? "text-red-800" : "text-blue-800"} font-bold`}>
                    {buyType ? "매수" : "매도"}
                </span>
                <span>{buyDt}</span>
            </div>

            <div className="flex justify-between gap-4">
                <span className="text-gray-800 font-bold">종목명</span>
                <span>{coinNm}</span>
            </div>

            <div className="flex justify-between gap-4">
                <span className="text-gray-800 font-bold">체결가격</span>
                <span>{buyPrice}</span>
            </div>

            <div className="flex justify-between gap-4">
                <span className="text-gray-800 font-bold">체결금액</span>
                <span>{buyTotalPrice}</span>
            </div>

            <div className="col-span-1 border-t border-gray-300" />
        </div>
    );
};

export default BuyListItem;
