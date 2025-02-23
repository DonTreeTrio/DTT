import React from "react";

interface CoinProps {
    coinImage?: string;
    coinName: string;
    coinPrice: number;
    holdCoin: number;
    holdPercent: number;
}

const Coin = ({ coinImage, coinName, coinPrice, holdCoin, holdPercent }: CoinProps) => {
    // 기준 값 설정
    const priceThreshold = 1000; // 예시 기준값
    const percentThreshold = 0; // 예시 기준값

    return (
        <div className="flex flex-row gap-5">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white"> </div>
            <div>
                <div className="flex flex-row gap-2 font-bold">
                    <span>{coinName}</span>
                    <span className={`${coinPrice < priceThreshold ? "text-blue-500" : "text-red-500"}`}>
                        {coinPrice}원
                    </span>
                </div>
                <div className="flex flex-row gap-2 font-bold">
                    <span>{holdCoin}원</span>
                    <span className={`${holdPercent < percentThreshold ? "text-blue-500" : "text-red-500"}`}>
                        {holdPercent}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Coin;
