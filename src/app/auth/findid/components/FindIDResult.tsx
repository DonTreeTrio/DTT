'use client';

import Link from 'next/link';

const RESULT_STYLES = {
  container:
    'w-full h-full flex flex-col items-center justify-center max-w-md text-center space-y-6 bg-white',
  message: 'text-lg font-medium',
  email: 'text-xl font-bold text-black',
  description: 'text-sm text-gray-600',
  linkContainer: 'flex justify-center space-x-4 mt-8',
  link: 'text-sm text-gray-600 hover:text-gray-900 underline',
} as const;

interface FindIdResultProps {
  name: string;
  email: string;
}

export default function FindIDResult({ name, email }: FindIdResultProps) {
  return (
    <div className={RESULT_STYLES.container}>
      <p className={RESULT_STYLES.message}>
        {name}님이 생성하신 아이디는
        <br />
        <span className={RESULT_STYLES.email}>{email}</span>
        <br />
        입니다.
      </p>
      <p className={RESULT_STYLES.description}>
        개인정보 보호를 위해 아이디의 일부는 ***로 표시됩니다.
      </p>

      <div className={RESULT_STYLES.linkContainer}>
        <Link href="/auth/login" className={RESULT_STYLES.link}>
          로그인하러 가기
        </Link>
        <Link href="/auth/findpassword" className={RESULT_STYLES.link}>
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
}
