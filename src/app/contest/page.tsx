"use client";

import { useState } from "react";

const tabs = ["일", "주", "월"];

const dummyData = [
    { rank: 1, name: "이인우", asset: 500000, invest: 500000, profit: 50000, rate: 10 },
    { rank: 2, name: "이인우", asset: 500000, invest: 500000, profit: 50000, rate: 10 },
    { rank: 3, name: "이인우", asset: 500000, invest: 500000, profit: 50000, rate: 10 },
    { rank: 4, name: "이인우", asset: 500000, invest: 500000, profit: 50000, rate: 10 },
    { rank: 30, name: "이인우", asset: 500000, invest: 500000, profit: -50000, rate: -10 },
];

const columns = [
    { key: "rank", label: "순위" },
    { key: "name", label: "이름" },
    { key: "asset", label: "총 자산" },
    { key: "invest", label: "투자액" },
    { key: "profit", label: "총 수익" },
    { key: "rate", label: "수익률" },
];

export default function ContestPage() {
    const [selectedTab, setSelectedTab] = useState("일");
    const [nameFilter, setNameFilter] = useState("");
    const [rankFilter, setRankFilter] = useState("");
    const [rateFilter, setRateFilter] = useState("");
    const [sortKey, setSortKey] = useState("rank");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const handleSort = (key: string) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };

    const filteredData = dummyData.filter((row) => {
        const nameMatch = nameFilter === "" || row.name.includes(nameFilter);
        const rankMatch = rankFilter === "" || row.rank.toString() === rankFilter;
        const rateMatch = rateFilter === "" || row.rate.toString() === rateFilter;
        return nameMatch && rankMatch && rateMatch;
    });

    const sortedData = [...filteredData].sort((a, b) => {
        const aValue = a[sortKey as keyof typeof a];
        const bValue = b[sortKey as keyof typeof b];
        if (typeof aValue === "number" && typeof bValue === "number") {
            return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        }
        if (typeof aValue === "string" && typeof bValue === "string") {
            return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        return 0;
    });

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">자선대회</h1>
            <div className="flex gap-2 mb-8">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`px-6 py-3 rounded-full border border-gray-200 bg-white shadow-sm text-lg font-medium transition-all ${selectedTab === tab ? "font-bold bg-gray-100" : "hover:bg-gray-50"}`}
                        onClick={() => setSelectedTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="text-center text-xl font-semibold mb-10">
                날짜별 주인공을 확인하고, 참고하여
                <br />
                효율적인 투자를 해보세요
            </div>
            <div className="flex justify-end text-sm text-gray-500 mb-3">2025. 02. 01. 23:04 기준</div>
            <div className="overflow-x-auto">
                <table className="min-w-full border-t-2 border-b-2 border-gray-200 text-center text-lg">
                    <thead>
                        <tr className="bg-gray-50 text-base">
                            {columns.map((col) => (
                                <th key={col.key} className="py-4 px-4 select-none">
                                    <div className="flex items-center justify-center gap-1">
                                        <span>{col.label}</span>
                                        <button
                                            onClick={() => handleSort(col.key)}
                                            className="ml-1 text-gray-400 hover:text-black focus:outline-none"
                                            aria-label={col.label + " 정렬"}
                                        >
                                            <span
                                                className={
                                                    sortKey === col.key && sortOrder === "asc" ? "text-blue-600" : ""
                                                }
                                            >
                                                ▲
                                            </span>
                                            <span
                                                className={
                                                    sortKey === col.key && sortOrder === "desc" ? "text-blue-600" : ""
                                                }
                                            >
                                                ▼
                                            </span>
                                        </button>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="py-10 text-gray-400 text-xl">
                                    검색 결과가 없습니다
                                </td>
                            </tr>
                        ) : (
                            sortedData.map((row) => (
                                <tr key={row.rank} className="border-t border-gray-100 text-lg">
                                    <td className="py-4 px-4">{row.rank}</td>
                                    <td className="py-4 px-4">{row.name}</td>
                                    <td className="py-4 px-4">{row.asset.toLocaleString()}원</td>
                                    <td className="py-4 px-4">{row.invest.toLocaleString()}원</td>
                                    <td
                                        className={`py-4 px-4 ${row.profit > 0 ? "text-red-500" : row.profit < 0 ? "text-blue-500" : ""}`}
                                    >
                                        {row.profit > 0 ? "+" : ""}
                                        {row.profit.toLocaleString()}원
                                    </td>
                                    <td
                                        className={`py-4 px-4 ${row.rate > 0 ? "text-red-500" : row.rate < 0 ? "text-blue-500" : ""}`}
                                    >
                                        {row.rate > 0 ? "+" : ""}
                                        {row.rate}%
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
