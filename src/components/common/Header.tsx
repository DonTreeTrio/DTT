'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 헤더 스타일
// 스타일 상수 선언
const HEADER_STYLES = {
  container:
    'sticky top-0 left-0 w-full h-[5rem] flex items-center justify-around shadow-md bg-white z-50',
  logo: 'w-[70px] h-[70px] rounded-sm',
  link: 'text-gray-600 hover:text-gray-800 transition-colors',
  button:
    'px-4 py-2 text-white bg-[#179653] rounded-md transition-colors hover:bg-[#179653]/80',
} as const;

export default function Header() {
  const router = useRouter();
  return (
    <header className={HEADER_STYLES.container}>
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={70}
          height={70}
          className={HEADER_STYLES.logo}
        />
      </Link>
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
      <button
        className={HEADER_STYLES.button}
        onClick={() => router.push('/auth/login')}
      >
        로그인
      </button>
    </header>
  );
}
