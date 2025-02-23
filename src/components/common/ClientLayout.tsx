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

  return (
    <div className='flex flex-col'>
      {!isAuthPage && <Header />}
      <main className="mx-30 md:mx-auto w-full max-w-[1440px]">{children}</main>
    </div>
  );
}
