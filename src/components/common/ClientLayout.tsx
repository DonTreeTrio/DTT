'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');
  const isMainPage = pathname === '/main';

  // 거래소 페이지만 1440px 너비로 제한 나머진 1200px
  const mainWidth = isMainPage ? 'max-w-[1440px]' : 'max-w-[1200px]';

  return (
    <div className="flex flex-col">
      {!isAuthPage && <Header />}
      <main className={`mx-auto w-full ${mainWidth}`}>{children}</main>
    </div>
  );
}
