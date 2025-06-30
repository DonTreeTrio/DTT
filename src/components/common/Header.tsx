"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// 헤더 스타일
// 스타일 상수 선언
const HEADER_STYLES = {
    container:
        "sticky top-0 left-0 w-full h-[5rem] flex items-center justify-between px-4 sm:px-8 shadow-md bg-white z-50",
    logo: "w-[70px] h-[70px] rounded-sm",
    link: "text-gray-600 hover:text-gray-800 transition-colors block px-4 py-2 sm:inline sm:px-0 sm:py-0",
    button: "px-4 py-2 text-white bg-[#179653] rounded-md transition-colors hover:bg-[#179653]/80",
    menu: "hidden sm:flex gap-6 items-center",
    mobileMenuButton: "sm:hidden flex items-center justify-center p-2 rounded-md focus:outline-none",
    mobileMenuOverlay: "fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-end",
    mobileMenuPanel: "w-2/3 max-w-xs bg-white h-full shadow-lg flex flex-col p-6",
    mobileMenuClose: "self-end mb-6 text-2xl text-gray-500 hover:text-gray-800",
};

export default function Header() {
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
        <header className={HEADER_STYLES.container}>
            <Link href="/">
                <Image src="/images/logo.png" alt="logo" width={70} height={70} className={HEADER_STYLES.logo} />
            </Link>
            {/* 데스크탑 메뉴 */}
            <nav className={HEADER_STYLES.menu}>
                <Link href="/main" className={HEADER_STYLES.link}>
                    거래소
                </Link>
                <Link href="/contest" className={HEADER_STYLES.link}>
                    자선대회
                </Link>
                <Link href="/purchase" className={HEADER_STYLES.link}>
                    상품구매
                </Link>
                <Link href="/mypage" className={HEADER_STYLES.link}>
                    마이페이지
                </Link>
                <button className={HEADER_STYLES.button} onClick={() => router.push("/auth/login")}>
                    로그인
                </button>
            </nav>
            {/* 모바일 햄버거 버튼 */}
            <button
                className={HEADER_STYLES.mobileMenuButton}
                aria-label="메뉴 열기"
                onClick={() => setMobileMenuOpen(true)}
            >
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            {/* 모바일 메뉴 오버레이 + 패널 애니메이션 */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className={HEADER_STYLES.mobileMenuOverlay}
                        role="dialog"
                        aria-modal="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <motion.div
                            className={HEADER_STYLES.mobileMenuPanel}
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className={HEADER_STYLES.mobileMenuClose}
                                aria-label="메뉴 닫기"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                ×
                            </button>
                            <Link href="/main" className={HEADER_STYLES.link} onClick={() => setMobileMenuOpen(false)}>
                                거래소
                            </Link>
                            <Link
                                href="/contest"
                                className={HEADER_STYLES.link}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                자선대회
                            </Link>
                            <Link
                                href="/purchase"
                                className={HEADER_STYLES.link}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                상품구매
                            </Link>
                            <Link
                                href="/mypage"
                                className={HEADER_STYLES.link}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                마이페이지
                            </Link>
                            <button
                                className={HEADER_STYLES.button + " mt-6"}
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    router.push("/auth/login");
                                }}
                            >
                                로그인
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
