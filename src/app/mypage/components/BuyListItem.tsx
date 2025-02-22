import React from "react";

interface BuyListItemProps {
    buyType: boolean;
    buyDt: string;
    coinNm: string;
    buyPrice: string;
    buyTotalPrice: string;
}

const BuyListItem = ({ buyType, buyDt, coinNm, buyPrice, buyTotalPrice }: BuyListItemProps) => {
    return (
        <div className="flex flex-col gap-2">
            <div>
                <span className={`${buyType ? "text-red-800" : "text-blue-800"} font-bold`}>
                    {buyType ? "매수" : "매도"}
                </span>
                <span>{buyDt}</span>
            </div>
            <div>
                <span className="text-gray font-bold">종목명</span>
                <span>{coinNm}</span>
            </div>
            <div>
                <span className="text-gray-800 font-bold">체결가격</span>
                <span>{buyPrice}</span>
            </div>
            <div>
                <span className="text-gray-800 font-bold">체결금액</span>
                <span>{buyTotalPrice}</span>
            </div>
        </div>
    );
};

export default BuyListItem;
