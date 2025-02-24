'use client';

import Image from 'next/image';
import Logo from '../../../public/images/logo.png';

const LAYOUT_STYLES = {
  container: 'flex flex-col h-screen items-center justify-center bg-gray-50',
  titleContainer: 'flex items-center justify-center mb-10 gap-2',
  logo: 'w-[100px] h-[100px] rounded-sm',
  title: 'text-2xl font-bold text-black',
  content: 'w-full max-w-[500px] h-full rounded-lg bg-white shadow-lg md:h-3/4',
} as const;

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={LAYOUT_STYLES.container}>
      <div className={LAYOUT_STYLES.titleContainer}>
        <Image src={Logo} alt="logo" width={100} height={100} />
        <h1 className={LAYOUT_STYLES.title}>DTT(Don Tree Trio)</h1>
      </div>
      <div className={LAYOUT_STYLES.content}>{children}</div>
    </div>
  );
}
