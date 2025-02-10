'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 헤더 스타일
// 스타일 상수 선언
const HEADER_STYLES = {
  container: 'w-full flex justify-around items-center shadow-md',
  logo: 'rounded-sm',
  link: 'text-gray-600 hover:text-gray-800',
  button: 'bg-[#179653] text-white px-4 py-2 rounded-md hover:bg-[#179653]/80',
};

export default function Header() {
  const router = useRouter();
  return (
    <header className={HEADER_STYLES.container}>
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={100}
          height={100}
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
        onClick={() => router.push('/login')}
      >
        로그인
      </button>
    </header>
  );
}
